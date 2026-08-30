# Rural Postal Life Insurance (RPLI) Google Sheets & Apps Script Setup Guide

## 1. Sheet Setup Structure

Create the following 9 sheets in your Google Sheets workbook:

1. **`INPUTS`** — User parameters (DOB, Start Date, Sum Assured, Plan, Mode, Age Proof, Rural Resident).
2. **`CONFIG`** — Limits, Mode Rebates (₹50, ₹150, ₹300, ₹600), GST Rate, Medical thresholds.
3. **`RPLI_RATES`** — Official adult mode rates per ₹1,000 Sum Assured.
4. **`CHILD_RATES`** — Bal Jeevan Bima child rates per ₹1,000 Sum Assured.
5. **`BONUS_RATES`** — Official declared bonus rates.
6. **`CALCULATOR`** — Full computation grid.
7. **`QUOTATION`** — Customer presentation slip.
8. **`VALIDATION`** — Integrity & bounds checks.
9. **`CHANGE_LOG`** — Version control & Gazette audit records.

---

## 2. Google Apps Script Installation

1. Open your Google Spreadsheet.
2. Navigate to **Extensions** > **Apps Script**.
3. Replace the default code with the contents of [`RPLI_Calculator.gs`](file:///Users/pd/Github/pli/google-sheets/RPLI_Calculator.gs).
4. Save the project as `RPLI_Engine`.
5. In any cell of your spreadsheet, use:
   ```excel
   =RPLI_QUOTE(INPUTS!B4, INPUTS!B5, "ENDOWMENT", 1000000, 60, "YEARLY", "STANDARD", "YES")
   ```

---

## 3. Official Formula References for `CALCULATOR` Sheet

### Proposer Age (Exact Calendar DATEDIF):
```excel
=DATEDIF(INPUTS!B4, INPUTS!B5, "Y")
```

### Child DOB Future Check:
```excel
=IF(INPUTS!B11 > TODAY(), "INVALID - FUTURE DOB", IF(INPUTS!B11 > INPUTS!B5, "INVALID - CHILD NOT YET BORN", DATEDIF(INPUTS!B11, INPUTS!B5, "Y")))
```

### Table-Driven Rate Lookup (`XLOOKUP`):
```excel
=XLOOKUP(1, (RPLI_RATES!A:A=PolicyType)*(RPLI_RATES!C:C=EntryAge)*(RPLI_RATES!D:D=MaturityAge), RPLI_RATES!I:I, "RATE NOT FOUND")
```

### Mode Rebates from Config:
```excel
=SWITCH(PremiumMode, "MONTHLY", CONFIG!B8, "QUARTERLY", CONFIG!B9, "HALF-YEARLY", CONFIG!B10, "YEARLY", CONFIG!B11, 0)
```

### Net Premium:
```excel
=GrossPremium - ModeRebate + GST
```
