# The Financial & Audit Chronicle

> *“Veritas in Numeris — All the Figures & Disclosures Fit to Print”*

A clean, minimalist, text-only web publication designed in the timeless aesthetic of a classic broadsheet newspaper. **The Financial & Audit Chronicle** is dedicated to publishing detailed financial and audit dossiers for major corporate entities, examining 10-K filings, Key Audit Matters (CAM), balance sheet reserves, and independent auditor opinions.

---

## Broadsheet Features & Aesthetics

- 📰 **Timeless Broadsheet Typography**:
  - Classic serif headlines powered by *Playfair Display*, *Newsreader*, and *EB Garamond*.
  - Monospaced tabular financial ledgers powered by *JetBrains Mono*.
  - Drop-cap lead paragraphs, authentic double-rule dividers, and hairline column rules.
- 🏢 **Entity Audit Dossier Cards**:
  - Dedicated broadsheet article card for each major corporation (pre-populated with *Apple Inc.*, *Berkshire Hathaway*, *The Boeing Company*, *Tesla, Inc.*, *Novo Nordisk*, *Microsoft*, and more).
  - Official auditor opinion badges (*Unqualified / Clean*, *Emphasis of Matter*, *Qualified*, *Adverse*).
  - Key financial ledger summary: Total Revenue, Net Income, Operating Margin, Free Cash Flow, Long-Term Debt, Current Ratio.
  - Critical Audit Matters (CAM) focus box with auditor firm of record.
- 🔍 **Interactive Broadsheet Capabilities**:
  - **Live Search & Filter**: Instantly search entities by name, ticker, auditor, or sector, or filter by audit opinion status.
  - **In-Depth Dossier Reader**: Click *"Read Full Dossier"* to inspect full footnote disclosures, financial statements, and formal auditor signature blocks.
  - **File New Corporate Dispatch**: Interactive compose modal allowing you to file new company audit dispatches directly from the browser with automatic localStorage persistence.
  - **Data Export & Archiving**: 1-click JSON export to back up or version-control newly composed dossiers.
  - **Pressroom Dark Mode**: Toggle between traditional warm newsprint paper (`#f7f4ec`) and evening pressroom dark ink (`#141517`).
  - **Printable Broadsheet**: Fully optimized `@media print` layout to print authentic paper editions or generate clean PDFs.
- ⚡ **Zero Bloat & Static Architecture**:
  - Pure HTML5, Vanilla CSS3, and modern Vanilla JavaScript.
  - Zero external npm frameworks or build steps required.
  - 100% compatible with GitHub Pages, Cloudflare Pages, or static hosting.

---

## Directory Structure

```text
financial-gazette/
├── index.html          # Main broadsheet layout, masthead, cards grid, and modal dialogs
├── css/
│   └── newspaper.css   # Broadsheet design system, typography, rules, and print styles
├── js/
│   ├── data.js         # Default dataset of corporate entities and audit dossiers
│   └── app.js          # Interactive search, filters, modals, composer, and localStorage
├── .gitignore          # Git exclusion rules
└── README.md           # Project documentation and editorial guide
```

---

## Quick Start / Running Locally

Since this is a clean, static web application, no dependencies or compilation are required.

### Option 1: Double-click to open
Simply double-click `index.html` in your file explorer to open it in your browser.

### Option 2: Run a local HTTP server
Using Python (built into most environments):
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

Using Node `npx serve`:
```bash
npx serve .
```

---

## Adding or Editing Corporate Entities

### Method A: Directly in the Browser (Visual)
1. Click the **"✍ File Entity Audit"** button on the editorial toolbar.
2. Fill in the entity name, ticker, auditor, opinion, headline, lead narrative, ledger figures, and audit disclosures.
3. Click **"Publish Dispatch to Gazette"**. The card is instantly rendered and saved to your browser's persistent storage.
4. Click **"Export JSON"** to download the updated dataset if you wish to commit it permanently into `js/data.js`.

### Method B: In Code (`js/data.js`)
Add a new entity object to the `DEFAULT_ENTITIES` array in `js/data.js`:

```javascript
{
  id: "googl",
  name: "Alphabet Inc.",
  ticker: "GOOGL",
  exchange: "NASDAQ",
  sector: "Internet Services & Software",
  dateline: "MOUNTAIN VIEW, CALIF.",
  auditor: "Ernst & Young LLP",
  auditOpinion: "Unqualified / Clean",
  fiscalYear: "FY 2025",
  headline: "Search Ad Cash Flows Fuel Multi-Billion Data Center and Silicon Capital Outlays",
  leadParagraph: "Alphabet's balance sheet maintains exceptional liquidity...",
  financials: {
    revenue: "$350.0 Billion",
    netIncome: "$88.0 Billion",
    operatingMargin: "32.0%",
    freeCashFlow: "$72.0 Billion",
    totalDebt: "$29.0 Billion",
    currentRatio: "2.10x"
  },
  auditFocus: "Key Audit Matter: Server equipment useful life assumptions and contingent regulatory reserves.",
  fullAuditNotes: "### 1. Server Depreciation...",
  auditorConclusion: "In our opinion, the consolidated financial statements present fairly..."
}
```

---

## Publishing to GitHub Pages

1. Push this repository to GitHub.
2. Navigate to your repository **Settings** &rarr; **Pages**.
3. Under **Branch**, select `main` and root folder `/`, then click **Save**.
4. Your broadsheet newspaper will be live at `https://<your-username>.github.io/financial-gazette/`.

---

## License

Published under the MIT License. Built for independent financial inquiry and corporate governance transparency.
