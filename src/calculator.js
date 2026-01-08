document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('premium-form');
  const resultCard = document.getElementById('result-card');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // --- INPUT PARAMETERS ---
      const policyType = document.getElementById('policyType').value;
      const age = parseInt(document.getElementById('age').value);
      const sumAssured = parseInt(document.getElementById('sumAssured').value);
      const term = parseInt(document.getElementById('term').value);

      // --- STEP 1: VALIDATE INPUTS ---
      if (sumAssured % 1000 !== 0) {
        alert('Sum Assured must be in multiples of ₹1,000');
        return;
      }
      if (!policyType || !age || !sumAssured || !term) return;

      const maturityAge = age + term;

      // --- STEP 2: CALCULATE ANNUAL BONUS ---
      // Bonus Rate Lookup (₹ per ₹1,000 Sum Assured per annum) - UPDATED RATES
      let bonusRate = 0;
      switch (policyType) {
        case 'WLA':
          bonusRate = 76;
          break;
        case 'EA':
          bonusRate = 52;
          break;
        case 'CWLA':
          bonusRate = 76;
          break;
        case 'AEA':
          bonusRate = 48;
          break;
        case 'JLEA':
          bonusRate = 52;
          break; // Assumed EA rate
        default:
          bonusRate = 52;
      }

      // Convert Sum Assured into bonus units
      const bonusUnits = sumAssured / 1000;

      // Calculate yearly bonus
      const annualBonus = bonusUnits * bonusRate;

      // --- STEP 3: CALCULATE TOTAL BONUS ---
      const totalBonus = annualBonus * term;

      // --- STEP 4: APPLY TERMINAL BONUS (If Applicable) ---
      let terminalBonus = 0;
      // Applicable for EA, WLA, CWLA? User said "Endowment Assurance... Terminal Bonus applicable for terms >= 20 years"
      // Usually logic applies generally for long term, but let's stick to EA logic or apply if Term >= 20.
      if (
        (policyType === 'EA' ||
          policyType === 'WLA' ||
          policyType === 'CWLA') &&
        term >= 20
      ) {
        // Rate: ₹20 per ₹10,000 SA (max ₹1,000)
        terminalBonus = Math.min((sumAssured / 10000) * 20, 1000);
      }

      // --- STEP 5: CALCULATE MONTHLY PREMIUM ---

      // Interpolation Function for Premium Calculation
      // Uses the "Reference Points" provided (based on 1 Lakh SA)
      const getMonthlyPremiumFor1Lakh = (type, t) => {
        const interpolate = (x1, y1, x2, y2, x) => {
          return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
        };

        if (type === 'EA' || type === 'JLEA') {
          // Points: 5yr: 1720, 10yr: 835, 20yr: 395, 30yr: 255
          if (t <= 5) return 1720; // Cap at 5yr estimation
          if (t <= 10) return interpolate(5, 1720, 10, 835, t);
          if (t <= 20) return interpolate(10, 835, 20, 395, t);
          return interpolate(20, 395, 30, 255, t);
        }
        if (type === 'AEA') {
          // Points: 15yr: 655, 20yr: 495
          if (t <= 15) return 655; // AEA usually fixed terms 15/20
          return 495; // Just snap to nearest or interpolate? Let's interpolate if 15-20
          // But AEA is mainly 15 or 20. Let's strictly snap for now or return 495 if >17
        }
        if (type === 'CWLA' || type === 'WLA') {
          // CWLA 30yr: 195. EA 30yr is 255.
          // WLA is generally cheaper. Let's use EA curve scaled by ratio (195/255 = ~0.76)
          const eaPrem = getMonthlyPremiumFor1Lakh('EA', t);
          return eaPrem * 0.76;
        }
        return 0;
      };

      // Get Base Premium for 1 Lakh
      let basePrem1Lakh = getMonthlyPremiumFor1Lakh(policyType, term);

      // Scale to actual Sum Assured
      const saFactor = sumAssured / 100000;
      const grossMonthlyPremium = Math.ceil(basePrem1Lakh * saFactor);

      // Deduct Rebate
      // ₹1 per ₹20,000 SA (matches user's previous 5 rebate for 1L)
      let monthlyRebate = 0;
      if (sumAssured >= 20000) {
        monthlyRebate = Math.floor(sumAssured / 20000);
      }

      const netMonthlyPremium = grossMonthlyPremium - monthlyRebate;
      const gst = 0;
      const finalPremium = netMonthlyPremium + gst;

      // --- STEP 6: CALCULATE MATURITY AMOUNT ---
      const maturityAmount = sumAssured + totalBonus + terminalBonus;

      // --- STEP 7: OUTPUT ---
      const resultObj = {
        policyType,
        sumAssured,
        policyTerm: term,
        annualBonus,
        totalBonus,
        terminalBonus,
        monthlyPremium: finalPremium,
        maturityAmount,
      };

      console.log('Calculation Result:', resultObj);

      // --- UPDATE UI ---
      document.getElementById('monthly-premium').textContent = `₹${Math.ceil(
        finalPremium
      ).toLocaleString()}`;
      document.getElementById('yearly-premium').textContent = `₹${Math.ceil(
        finalPremium * 12
      ).toLocaleString()}`;
      document.getElementById(
        'maturity-benefit'
      ).textContent = `₹${maturityAmount.toLocaleString()}`;

      // Breakdown display
      const resultContainer = document.querySelector('.result-card');
      const existingExtras = resultContainer.querySelectorAll('.dynamic-row');
      existingExtras.forEach((e) => e.remove());

      let breakdownHTML = `
        <div class="dynamic-row" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.2); font-size: 0.9rem; color: #ccc;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
            <span>Gross Monthly:</span> <span>₹${grossMonthlyPremium}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
             <span>Rebate:</span> <span style="color: #4cd137;">-₹${monthlyRebate}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
             <span>Total Bonus:</span> <span style="color: var(--accent-gold);">+₹${totalBonus.toLocaleString()}</span>
          </div>
      `;

      if (terminalBonus > 0) {
        breakdownHTML += `
          <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
             <span>Terminal Bonus:</span> <span style="color: #fea47f;">+₹${terminalBonus.toLocaleString()}</span>
          </div>
        `;
      }

      breakdownHTML += `</div>`;

      const yearlyEl = document.getElementById('yearly-premium').parentElement;
      yearlyEl.insertAdjacentHTML('afterend', breakdownHTML);

      // Show Result
      resultCard.style.display = 'block';
      resultCard.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
