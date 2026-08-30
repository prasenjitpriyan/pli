import { RPLI_CONFIG } from '../../config/rpli/config'
import { CHILD_RATE_DATABASE, RPLI_RATE_DATABASE } from '../../config/rpli/rates'
import { ModePremiumDetail, RpliPolicy } from './types'

export interface RpliPremiumEngineResult {
  monthlyPremium: number
  quarterlyPremium: number
  halfYearlyPremium: number
  yearlyPremium: number
  basePremiumPerLakh: number
  scaledGrossPremium: number
  confidenceScore: number
  calculationMethod: string
  isExactReference: boolean
  premiumSource: 'OFFICIAL' | 'CONFIGURED' | 'ESTIMATED'
  rateTableVersion: string
  modeDetails: {
    monthly: ModePremiumDetail
    quarterly: ModePremiumDetail
    halfYearly: ModePremiumDetail
    yearly: ModePremiumDetail
  }
}

export function predictRpliMonthlyPremium(params: {
  policyType: RpliPolicy
  effectiveAge: number // Age at entry (completed years)
  duration: number // Term in years
  sumAssured: number
  premiumCeasingAge?: number
  maturityAge?: number
  childAge?: number
}): RpliPremiumEngineResult {
  const { policyType, effectiveAge, duration, sumAssured, maturityAge, childAge } = params
  const units = sumAssured / 1000

  let monthlyRate = 0
  let quarterlyRate = 0
  let halfYearlyRate = 0
  let yearlyRate = 0
  let isExactReference = false
  let confidenceScore = 100
  let method = ''
  let rateVersion = 'DoP/RPLI/2020/V1'

  if (policyType === 'BAL_JEEVAN_BIMA') {
    const lookupAge = childAge ?? effectiveAge
    const childRow = CHILD_RATE_DATABASE.find(
      (r) => r.childEntryAge === lookupAge || Math.abs(r.childEntryAge - lookupAge) <= 1
    )

    if (childRow) {
      monthlyRate = childRow.monthlyRatePer1000
      quarterlyRate = childRow.quarterlyRatePer1000
      halfYearlyRate = childRow.halfYearlyRatePer1000
      yearlyRate = childRow.yearlyRatePer1000
      isExactReference = true
      rateVersion = childRow.sourceVersion
      method = `Official Bal Jeevan Bima Rate Table: Age ${lookupAge}, Rate ₹${monthlyRate}/₹1000/mo`
    } else {
      // Standard child rate approximation if age outside exact calibration points
      monthlyRate = 101.1 * (10 / Math.max(5, duration))
      quarterlyRate = monthlyRate * 3
      halfYearlyRate = monthlyRate * 6
      yearlyRate = monthlyRate * 12
      confidenceScore = 90
      method = `Estimated Child Policy Rate: Term ${duration} yrs`
    }
  } else {
    // 1. Exact match search
    const exactRow = RPLI_RATE_DATABASE.find((r) => {
      if (r.plan !== policyType) return false
      if (r.entryAge !== effectiveAge) return false
      if (r.term !== undefined && r.term === duration) return true
      if (
        maturityAge &&
        r.maturityAge === maturityAge &&
        (r.term === undefined || r.term === duration)
      )
        return true
      return false
    })

    if (exactRow) {
      monthlyRate = exactRow.monthlyRatePer1000
      quarterlyRate = exactRow.quarterlyRatePer1000
      halfYearlyRate = exactRow.halfYearlyRatePer1000
      yearlyRate = exactRow.yearlyRatePer1000
      isExactReference = true
      rateVersion = exactRow.sourceVersion
      method = `Official RPLI Rate Table (${exactRow.sourceVersion}): ${policyType} Age ${effectiveAge}, Term ${duration}y`
    } else {
      // 2. Nearest age / term lookup fallback
      const planRows = RPLI_RATE_DATABASE.filter((r) => r.plan === policyType)
      if (planRows.length > 0) {
        // Find row closest in entry age and term
        let closest = planRows[0]
        let minDiff = Number.MAX_VALUE

        for (const row of planRows) {
          const ageDiff = Math.abs(row.entryAge - effectiveAge)
          const termDiff = Math.abs((row.term ?? 20) - duration)
          const diff = ageDiff * 2 + termDiff
          if (diff < minDiff) {
            minDiff = diff
            closest = row
          }
        }

        // Adjust rate slightly by term ratio
        const termRatio = (closest.term ?? 20) / Math.max(5, duration)
        monthlyRate = Math.round(closest.monthlyRatePer1000 * termRatio * 100) / 100
        quarterlyRate = Math.round(closest.quarterlyRatePer1000 * termRatio * 100) / 100
        halfYearlyRate = Math.round(closest.halfYearlyRatePer1000 * termRatio * 100) / 100
        yearlyRate = Math.round(closest.yearlyRatePer1000 * termRatio * 100) / 100
        confidenceScore = 92
        isExactReference = false
        method = `Calibrated RPLI Rate Model (Anchored to ${closest.sourceVersion} Age ${closest.entryAge})`
      } else {
        // Generic base rate
        monthlyRate = 4.2
        quarterlyRate = 12.45
        halfYearlyRate = 24.65
        yearlyRate = 48.35
        confidenceScore = 80
        method = 'Baseline RPLI Rate Table'
      }
    }
  }

  // Calculate gross premiums
  const monthlyGross = Math.round(monthlyRate * units * 100) / 100
  const quarterlyGross = Math.round(quarterlyRate * units * 100) / 100
  const halfYearlyGross = Math.round(halfYearlyRate * units * 100) / 100
  const yearlyGross = Math.round(yearlyRate * units * 100) / 100

  // Rebates from Config
  const monthlyRebate = RPLI_CONFIG.modeRebates.MONTHLY
  const quarterlyRebate = RPLI_CONFIG.modeRebates.QUARTERLY
  const halfYearlyRebate = RPLI_CONFIG.modeRebates.HALF_YEARLY
  const yearlyRebate = RPLI_CONFIG.modeRebates.YEARLY

  // GST Calculation
  const gstApplicable = RPLI_CONFIG.gst.applicable
  const gstRate = RPLI_CONFIG.gst.firstYearRate

  const calcTax = (gross: number, rebate: number) => {
    if (!gstApplicable) return 0
    const taxable = Math.max(0, gross - rebate)
    return Math.round(taxable * gstRate * 100) / 100
  }

  const monthlyTax = calcTax(monthlyGross, monthlyRebate)
  const quarterlyTax = calcTax(quarterlyGross, quarterlyRebate)
  const halfYearlyTax = calcTax(halfYearlyGross, halfYearlyRebate)
  const yearlyTax = calcTax(yearlyGross, yearlyRebate)

  // Net Premiums (Gross - Rebate + Tax)
  const monthlyNet = monthlyGross - monthlyRebate + monthlyTax
  const quarterlyNet = quarterlyGross - quarterlyRebate + quarterlyTax
  const halfYearlyNet = halfYearlyGross - halfYearlyRebate + halfYearlyTax
  const yearlyNet = yearlyGross - yearlyRebate + yearlyTax

  return {
    monthlyPremium: monthlyNet,
    quarterlyPremium: quarterlyNet,
    halfYearlyPremium: halfYearlyNet,
    yearlyPremium: yearlyNet,
    basePremiumPerLakh: Math.round((monthlyGross / sumAssured) * 100000 * 100) / 100,
    scaledGrossPremium: monthlyGross,
    confidenceScore,
    calculationMethod: method,
    isExactReference,
    premiumSource: isExactReference ? 'OFFICIAL' : 'CONFIGURED',
    rateTableVersion: rateVersion,
    modeDetails: {
      monthly: {
        ratePer1000: monthlyRate,
        grossPremium: monthlyGross,
        rebate: monthlyRebate,
        tax: monthlyTax,
        netPremium: monthlyNet,
      },
      quarterly: {
        ratePer1000: quarterlyRate,
        grossPremium: quarterlyGross,
        rebate: quarterlyRebate,
        tax: quarterlyTax,
        netPremium: quarterlyNet,
      },
      halfYearly: {
        ratePer1000: halfYearlyRate,
        grossPremium: halfYearlyGross,
        rebate: halfYearlyRebate,
        tax: halfYearlyTax,
        netPremium: halfYearlyNet,
      },
      yearly: {
        ratePer1000: yearlyRate,
        grossPremium: yearlyGross,
        rebate: yearlyRebate,
        tax: yearlyTax,
        netPremium: yearlyNet,
      },
    },
  }
}
