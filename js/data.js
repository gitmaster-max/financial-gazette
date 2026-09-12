/**
 * DEFAULT CORPORATE ENTITIES DATASET
 * The Financial & Audit Chronicle
 * Comprehensive financial metrics & audit dossiers for major corporate entities
 */

const DEFAULT_ENTITIES = [
  {
    id: "aapl",
    name: "Apple Inc.",
    ticker: "AAPL",
    exchange: "NASDAQ",
    sector: "Technology Hardware & Services",
    dateline: "CUPERTINO, CALIF.",
    auditor: "Ernst & Young LLP",
    auditOpinion: "Unqualified / Clean",
    fiscalYear: "FY 2025",
    headline: "Record Services Cash Flow Masks Hardware Lengthening Cycles as Balance Sheet Approaches Net-Neutral",
    leadParagraph: "A microscopic inspection of Apple Inc.'s annual filing reveals an increasingly bifurcated financial organism. While device margins faced mild compression from tariff provisions and silicon fabrication costs, the recurring Services apparatus generated staggering cash margins exceeding 74%, cementing an unqualified audit certification.",
    financials: {
      revenue: "$391.04 Billion",
      netIncome: "$93.74 Billion",
      operatingMargin: "31.5%",
      freeCashFlow: "$108.81 Billion",
      totalDebt: "$106.63 Billion",
      currentRatio: "0.99x"
    },
    auditFocus: "Key Audit Matter: Recognition and deferral of software upgrade rights on bundled iOS units, and valuation of multi-year cloud services vendor commitments.",
    fullAuditNotes: `
### 1. Revenue Recognition & Deferred Service Obligations
The independent auditor, Ernst & Young LLP, singled out the allocation of transaction price across bundled hardware and software upgrade rights as a Critical Audit Matter (CAM). Apple continues to defer significant portions of upfront iPhone receipts into multi-quarter service amortizations. No material misstatements were noted in the timing of deferred revenue recognition.

### 2. Capital Structure & The Net-Neutral Strategy
Total term debt stands at $106.63 Billion with a heavily laddered maturity schedule extending through 2060. The treasury team retired $12.4 Billion of maturing notes while executing $95 Billion in open-market share repurchases. Working capital maintains its negative operating cycle (-58 days), effectively funding operations through vendor payables.

### 3. Supply Chain Commitments & Inventory Turn
Finished goods inventory turned 38 times throughout the fiscal calendar, demonstrating peerless lean manufacturing discipline. Off-balance-sheet manufacturing purchase obligations aggregated to $34.2 Billion, primarily with contract assemblers and custom semiconductor foundries.

### 4. Contingent Tax & Regulatory Liabilities
Notes to the financial statements detail ongoing appeals regarding EU State Aid and digital market levies. Audit scrutiny confirmed that tax reserve allowances under ASC 740 remain conservative and adequately accounted for against adverse rulings.
    `,
    auditorConclusion: "In our opinion, the consolidated financial statements present fairly, in all material respects, the financial position of Apple Inc. and subsidiaries as of September 27, 2025, in conformity with U.S. generally accepted accounting principles (GAAP)."
  },
  {
    id: "brk",
    name: "Berkshire Hathaway Inc.",
    ticker: "BRK.A / BRK.B",
    exchange: "NYSE",
    sector: "Financial Conglomerate & Insurance",
    dateline: "OMAHA, NEB.",
    auditor: "Deloitte & Touche LLP",
    auditOpinion: "Unqualified / Clean",
    fiscalYear: "FY 2025",
    headline: "Mammoth $325 Billion Treasury Hoard Anchors Fortress Balance Sheet Amid Equity Trimming",
    leadParagraph: "The Oracle's ledger remains an impenetrable fortress of liquidity. Deloitte's audit highlights a record accumulation of short-dated United States Treasury Bills, outpacing the Federal Reserve's own liquid reserves, while underwriting discipline across GEICO generated pristine float expansion.",
    financials: {
      revenue: "$364.48 Billion",
      netIncome: "$89.02 Billion",
      operatingMargin: "14.2%",
      freeCashFlow: "$41.50 Billion",
      totalDebt: "$123.85 Billion",
      currentRatio: "1.82x"
    },
    auditFocus: "Key Audit Matter: Actuarial valuation of unpaid losses and loss adjustment expenses across National Indemnity and GEICO reinsurance contracts.",
    fullAuditNotes: `
### 1. Liquid Asset Composition & Treasury Bills
Over $325 Billion resides in short-term U.S. Treasury Bills yielding between 4.1% and 4.6%. The audit verified physical custody and electronic book-entry titles across Federal Reserve depositories. Net investment income surged past $13 Billion annually.

### 2. Insurance Float & Loss Reserve Testing
Insurance float liabilities expanded to $171 Billion with an average negative cost of capital. Deloitte tested loss reserves utilizing independent actuarial specialists. Historical reserve development exhibited mild favorable redundancies, affirming prudent conservative provisioning.

### 3. Equity Method & Fair Value Adjustments
Unrealized mark-to-market swings in the equity portfolio (including multi-billion positions in American Express, Coca-Cola, and remaining Apple holdings) were correctly reflected in other comprehensive income per GAAP standards.

### 4. Capital Reinvestment & Share Repurchases
Share repurchases were dialed back to near-zero as market valuations exceeded internal intrinsic value thresholds, illustrating unwavering fiduciary discipline over size-seeking deployment.
    `,
    auditorConclusion: "The financial statements present fairly, in all material respects, the financial position of Berkshire Hathaway Inc. and the results of its operations and its cash flows in accordance with U.S. GAAP."
  },
  {
    id: "ba",
    name: "The Boeing Company",
    ticker: "BA",
    exchange: "NYSE",
    sector: "Aerospace & Defense",
    dateline: "ARLINGTON, VA.",
    auditor: "Deloitte & Touche LLP",
    auditOpinion: "Emphasis of Matter",
    fiscalYear: "FY 2025",
    headline: "Audit Opinion Emphasizes Liquidity Covenants, Fixed-Price Defense Write-Downs, and FAA Production Caps",
    leadParagraph: "A sobering financial autopsy emerges from Boeing's balance sheet. Deloitte issued an explanatory 'Emphasis of Matter' paragraph citing severe commercial delivery lags, cash burn on fixed-price government defense contracts, and ongoing credit facility renegotiations following labor disruptions.",
    financials: {
      revenue: "$66.82 Billion",
      netIncome: "-$8.42 Billion",
      operatingMargin: "-12.6%",
      freeCashFlow: "-$14.30 Billion",
      totalDebt: "$58.20 Billion",
      currentRatio: "1.05x"
    },
    auditFocus: "Key Audit Matter & Emphasis of Matter: Program accounting estimates on the 777X development timeline, fixed-price defense cost overruns (KC-46), and debt covenant headroom.",
    fullAuditNotes: `
### 1. Program Accounting & Inventory Valuation
Boeing utilizes program accounting under ASC 606, aggregating cost blocks over anticipated production lifecycles. Deloitte required substantial impairment testing on the 777X program block, resulting in a pre-tax reach-forward loss provision of $2.6 Billion.

### 2. Cash Burn & Capital Raises
Free cash flow was deeply negative at -$14.3 Billion, driven by working capital accumulation in uncompleted airframes and supplier buffer stocks. Management executed a dilutive $21 Billion equity and depositary share offering to satisfy rating agency investment-grade thresholds.

### 3. Defense Fixed-Price Contract Liabilities
The Defense, Space & Security (BDS) division continued to bleed capital on the KC-46A Pegasus tanker and Air Force One replacement programs. Fixed-price contracts leave zero margin for engineering revisions or inflation slippage.

### 4. Going Concern & Debt Headroom
While an outright going-concern qualification was averted through the Q4 equity infusion, auditor commentary underscores that any sustained production shutdown or FAA regulatory constraint would breach debt-to-capitalization covenants.
    `,
    auditorConclusion: "Without modifying our opinion, we draw attention to Note 3 to the financial statements, which describes the significant estimates and uncertainties regarding aircraft production stabilization and liquidity requirements."
  },
  {
    id: "tsla",
    name: "Tesla, Inc.",
    ticker: "TSLA",
    exchange: "NASDAQ",
    sector: "Automotive & Clean Energy",
    dateline: "AUSTIN, TEXAS",
    auditor: "PricewaterhouseCoopers LLP",
    auditOpinion: "Unqualified / Clean",
    fiscalYear: "FY 2025",
    headline: "Automotive Margins Stabilize as Energy Storage Deployment Accelerates; Regulatory Credits Remain Material",
    leadParagraph: "Tesla's broadsheet ledger reflects an enterprise in the midst of a strategic pivot. While electric vehicle average selling prices stabilized following steep discounting cycles, the Megapack energy storage division grew into a high-margin operating pillar, buttressed by $2.1 Billion in pure-profit regulatory credit sales.",
    financials: {
      revenue: "$97.68 Billion",
      netIncome: "$7.21 Billion",
      operatingMargin: "7.4%",
      freeCashFlow: "$6.25 Billion",
      totalDebt: "$7.82 Billion",
      currentRatio: "1.73x"
    },
    auditFocus: "Key Audit Matter: Valuation and timing of Full Self-Driving (FSD) deferred revenue recognition, and warranty accrual estimates for battery pack longevity.",
    fullAuditNotes: `
### 1. Deferred Revenue & FSD Releases
Tesla deferred $3.4 Billion in customer payments for its Full Self-Driving capability. PwC thoroughly tested the percentage-of-completion models and feature-release milestones triggering revenue recognition. Auditor verification satisfied that unrecognized balances appropriately remain as current liabilities.

### 2. Automotive Regulatory Credits
Automotive regulatory credits contributed $2.14 Billion directly to operating income. The audit inspected counterparty sales agreements with legacy automakers. These credits represented approximately 29% of GAAP net income, a key concentration risk disclosed in Notes.

### 3. Warranty Reserves & Battery Replacement
Warranty reserves were adjusted upward to 2.4% of automotive revenue to account for aging fleet battery servicing. Independent testing confirmed the adequacy of the statistical models utilized.

### 4. Capital Expenditures & AI Compute Infrastructure
Capex reached $11.5 Billion, predominantly routed into GPU cluster procurement for autonomous driving training. All compute hardware was capitalized with 3-year straight-line depreciation schedules.
    `,
    auditorConclusion: "The financial statements present fairly, in all material respects, the financial position of Tesla, Inc. at December 31, 2025, and the results of its operations in conformity with accounting principles generally accepted in the United States."
  },
  {
    id: "nvo",
    name: "Novo Nordisk A/S",
    ticker: "NVO",
    exchange: "CPH / NYSE",
    sector: "Pharmaceuticals & Biotechnology",
    dateline: "BAGSVÆRD, DENMARK",
    auditor: "PricewaterhouseCoopers Statsautoriseret",
    auditOpinion: "Unqualified / Clean",
    fiscalYear: "FY 2025",
    headline: "Blockbuster GLP-1 Sales Propel 36% Operating Margin; U.S. Rebate Deductions Scrutinized by Auditors",
    leadParagraph: "The Danish pharmaceutical powerhouse delivered another year of torrid top-line expansion, driven by Ozempic and Wegovy. PwC's Copenhagen team scrutinized complex gross-to-net rebate calculations in the North American commercial channel, affirming clean books and exemplary return on invested capital.",
    financials: {
      revenue: "DKK 289.4 Billion (~$42.1B)",
      netIncome: "DKK 102.3 Billion (~$14.9B)",
      operatingMargin: "44.6%",
      freeCashFlow: "DKK 84.1 Billion (~$12.2B)",
      totalDebt: "DKK 32.5 Billion (~$4.7B)",
      currentRatio: "1.18x"
    },
    auditFocus: "Key Audit Matter: Estimation of gross-to-net rebates, chargebacks, and returns under U.S. Medicaid and pharmacy benefit manager (PBM) agreements.",
    fullAuditNotes: `
### 1. Gross-to-Net (GTN) Deductions
The primary audit challenge centered on estimation of Medicaid rebates and PBM discounts. Rebate provisions are settled up to 12 months in arrears. PwC verified historical rebate true-ups against actual cash disbursements, finding less than 1.2% variance.

### 2. Unprecedented Production Capex
To satisfy staggering global demand, Novo invested DKK 48 Billion in expanding fill-finish capacity and acquired Catalent manufacturing sites. The audit verified title, environmental permits, and capital expenditure capitalization criteria under IFRS.

### 3. Intellectual Property & Patent Protection
Intangible assets were tested for impairment. Patent exclusivity timelines for semaglutide extend through 2031-2032 in key jurisdictions, supporting historical amortization schedules.

### 4. Shareholder Returns & Cash Conversion
Over 80% of net income was returned to shareholders via cash dividends and continuous share buyback tranches, maintaining a nearly zero net-debt balance sheet.
    `,
    auditorConclusion: "In our opinion, the consolidated financial statements give a true and fair view of the Group's financial position at 31 December 2025 and of its financial performance in accordance with IFRS Accounting Standards."
  },
  {
    id: "msft",
    name: "Microsoft Corporation",
    ticker: "MSFT",
    exchange: "NASDAQ",
    sector: "Cloud Infrastructure & Software",
    dateline: "REDMOND, WASH.",
    auditor: "Deloitte & Touche LLP",
    auditOpinion: "Unqualified / Clean",
    fiscalYear: "FY 2025",
    headline: "Intelligent Cloud Surpasses $110B Run-Rate; Massive AI Server Capex Extends Depreciation Schedules",
    leadParagraph: "Microsoft's broadsheet disclosure confirms the enterprise cloud transition is in full stride. Deloitte's audit team focused on the capital expenditures supporting generative AI infrastructure, noting that revisions to useful asset lives on data center server blades lowered annual depreciation drag by $2.8 Billion.",
    financials: {
      revenue: "$245.12 Billion",
      netIncome: "$88.14 Billion",
      operatingMargin: "43.1%",
      freeCashFlow: "$74.07 Billion",
      totalDebt: "$103.20 Billion",
      currentRatio: "1.24x"
    },
    auditFocus: "Key Audit Matter: Useful life estimations for cloud servers and network assets, and income tax reserves on cross-border intellectual property transfers.",
    fullAuditNotes: `
### 1. Server Depreciation & Useful Life Estimates
Microsoft depreciates its server infrastructure over six years and network equipment over six years. Deloitte deployed engineering specialists to test decommissioning logs and failure rates. The audit affirmed that server longevity assumptions reflect operational realities.

### 2. Commercial Remaining Performance Obligations (RPO)
Commercial RPO expanded to $269 Billion, with approximately 45% expected to be recognized as revenue within 12 months. PwC validated contract sample terms against milestone billing systems.

### 3. Activision Blizzard Integration & Goodwill
Goodwill impairment testing showed no indicators of impairment across the gaming division. Purchase price allocation adjustments were formally finalized with clean audit sign-offs.

### 4. IRS Proposed Tax Assessment Dispute
Notes explain ongoing disputes with the Internal Revenue Service concerning transfer pricing between 2004 and 2013. The company maintained sufficient uncertain tax position reserves under ASC 740.
    `,
    auditorConclusion: "We have audited the accompanying consolidated financial statements of Microsoft Corporation. In our opinion, the statements present fairly the financial condition and results of operations in accordance with U.S. GAAP."
  }
];
