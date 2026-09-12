#!/usr/bin/env python3
"""
The Financial & Audit Chronicle - Static Blog Generator
Builds standalone broadsheet HTML pages from content/*.md files,
and generates the front-page data layer.
"""

import os
import re
import json
import html

CONTENT_DIR = "content"
DOSSIERS_DIR = "dossiers"
DATA_JS_PATH = os.path.join("js", "data.js")

def parse_markdown_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()

    meta = {}
    body = text

    # Parse YAML frontmatter
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n(.*)$", text, re.DOTALL)
    if match:
        raw_meta = match.group(1)
        body = match.group(2)
        for line in raw_meta.split("\n"):
            line = line.strip()
            if not line or line.startswith("#") or ":" not in line:
                continue
            key, val = line.split(":", 1)
            meta[key.strip()] = val.strip().strip('"').strip("'")

    return meta, body.strip()

def markdown_to_html(md_text):
    blocks = md_text.split("\n\n")
    html_out = []
    for b in blocks:
        b = b.strip()
        if not b:
            continue
        if b.startswith("### "):
            title = html.escape(b.replace("### ", ""))
            html_out.append(f'<h3 class="dossier-section-title">{title}</h3>')
        elif b.startswith("## "):
            title = html.escape(b.replace("## ", ""))
            html_out.append(f'<h2 class="dossier-section-title" style="font-size: 1.4rem;">{title}</h2>')
        else:
            # Inline bold and escape
            escaped = html.escape(b)
            # basic bold replacement
            escaped = re.sub(r"\*\*(.*?)\*\*", r"<strong>\1</strong>", escaped)
            html_out.append(f'<p>{escaped}</p>')
    return "\n".join(html_out)

def get_badge_class(opinion):
    op = (opinion or "").lower()
    if "unqualified" in op or "clean" in op:
        return "badge-unqualified"
    if "emphasis" in op:
        return "badge-emphasis"
    if "qualified" in op:
        return "badge-qualified"
    return "badge-adverse"

def build_dossier_html(meta, body_html):
    slug = meta.get("slug", "entity")
    name = html.escape(meta.get("name", "Corporate Entity"))
    ticker = html.escape(meta.get("ticker", "N/A"))
    exchange = html.escape(meta.get("exchange", "NASDAQ"))
    sector = html.escape(meta.get("sector", "Enterprise"))
    dateline = html.escape(meta.get("dateline", "NEW YORK"))
    auditor = html.escape(meta.get("auditor", "Independent Audit Firm"))
    opinion = html.escape(meta.get("auditOpinion", "Unqualified / Clean"))
    fiscal_year = html.escape(meta.get("fiscalYear", "FY 2025"))
    headline = html.escape(meta.get("headline", "Annual Financial & Audit Dossier"))
    conclusion = html.escape(meta.get("auditorConclusion", "The consolidated statements present fairly in all material respects."))
    badge_class = get_badge_class(opinion)

    # Financials
    rev = html.escape(meta.get("revenue", "N/A"))
    net = html.escape(meta.get("netIncome", "N/A"))
    margin = html.escape(meta.get("operatingMargin", "N/A"))
    fcf = html.escape(meta.get("freeCashFlow", "N/A"))
    debt = html.escape(meta.get("totalDebt", "N/A"))
    current_ratio = html.escape(meta.get("currentRatio", "N/A"))
    audit_focus = html.escape(meta.get("auditFocus", "Key Audit Matter review."))

    page_title = f"{name} ({ticker}) — Audit Dossier & Financial Statements | The Financial & Audit Chronicle"
    meta_desc = f"Independent financial and audit dossier for {name} ({ticker}). Verified balance sheet metrics, key audit matters, and auditor opinion."

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{page_title}</title>
  <meta name="description" content="{meta_desc}">
  <link rel="stylesheet" href="../css/newspaper.css">
  <style>
    .return-banner {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.65rem 0;
      border-bottom: var(--border-thin);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }}
    .return-banner a {{
      color: var(--ink-primary);
      text-decoration: none;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }}
    .return-banner a:hover {{
      text-decoration: underline;
      color: var(--accent-gold);
    }}
    .dossier-page-container {{
      max-width: 900px;
      margin: 0 auto;
      padding: 1.5rem 0 4rem 0;
    }}
  </style>
</head>
<body>

  <div class="broadsheet-wrapper">

    <!-- Top Masthead Header -->
    <header class="masthead">
      <div class="masthead-topbar">
        <div>SPECIAL DOSSIER EDITION · DEDICATED COMPANY REPORT</div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button id="theme-toggle" type="button">☾ Pressroom Dark</button>
          <span>|</span>
          <button id="btn-print" type="button" onclick="window.print()">🖶 Print Broadsheet</button>
        </div>
      </div>

      <div class="masthead-title-container" style="padding: 0.75rem 0;">
        <h1 class="masthead-title" style="font-size: clamp(1.8rem, 4vw, 3.2rem);">The Financial &amp; Audit Chronicle</h1>
        <div class="masthead-motto">“Veritas in Numeris — All the Figures &amp; Disclosures Fit to Print”</div>
      </div>

      <div class="masthead-subbar">
        <div class="col-left">CORPORATE LEDGER ARCHIVE</div>
        <div class="col-center">AUDIT DOSSIER NO. {slug.upper()}</div>
        <div class="col-right">{fiscal_year} FILING</div>
      </div>
    </header>

    <!-- Return to Front Page Banner -->
    <nav class="return-banner">
      <a href="../index.html">&larr; Return to Gazette Front Page</a>
      <span>OFFICIAL INDEPENDENT AUDIT REVIEW</span>
    </nav>

    <!-- Dedicated Article Content -->
    <main class="dossier-page-container">
      <article>
        <div class="dossier-masthead">
          <div class="kicker">{sector} · DATELINE: {dateline}</div>
          <h2 class="dossier-headline">{name}: {headline}</h2>
          <div class="byline">FINANCIAL AUDIT DOSSIER · AUDITOR OF RECORD: <strong>{auditor}</strong></div>
          <div style="margin-top: 0.75rem;">
            <span class="audit-badge {badge_class}" style="font-size: 0.82rem; padding: 0.35rem 0.85rem;">
              OFFICIAL AUDIT OPINION: {opinion}
            </span>
          </div>
        </div>

        <div class="dossier-meta-grid">
          <div><strong>ENTITY:</strong> {name}</div>
          <div><strong>TICKER:</strong> {ticker} ({exchange})</div>
          <div><strong>FISCAL YEAR:</strong> {fiscal_year}</div>
          <div><strong>AUDITOR:</strong> {auditor}</div>
        </div>

        <div class="audit-focus-box" style="margin-bottom: 2rem; padding: 1rem; font-size: 0.95rem;">
          <strong>Auditor Focal Point / Key Audit Matter:</strong>
          {audit_focus}
        </div>

        <h3 class="dossier-section-title">Verified Financial Statement Metrics</h3>
        <div class="dossier-table-container">
          <table class="dossier-full-table">
            <thead>
              <tr>
                <th>Statement Metric</th>
                <th>Classification</th>
                <th>Reported Fiscal Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Net Revenue</td>
                <td>Income Statement</td>
                <td>{rev}</td>
              </tr>
              <tr>
                <td>Net Income (GAAP)</td>
                <td>Income Statement</td>
                <td>{net}</td>
              </tr>
              <tr>
                <td>Operating Margin</td>
                <td>Operating Efficiency</td>
                <td>{margin}</td>
              </tr>
              <tr>
                <td>Free Cash Flow</td>
                <td>Cash Flow Statement</td>
                <td>{fcf}</td>
              </tr>
              <tr>
                <td>Total Term &amp; Senior Debt</td>
                <td>Balance Sheet Liability</td>
                <td>{debt}</td>
              </tr>
              <tr>
                <td>Current Ratio</td>
                <td>Liquidity Metric</td>
                <td>{current_ratio}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="dossier-body-text" style="margin-top: 2rem;">
          {body_html}
        </div>

        <div class="auditor-signature-block">
          <div>
            <div><strong>Attestation of Independent Audit Firm</strong></div>
            <p style="font-style: italic; max-width: 520px; margin-top: 0.35rem; color: var(--ink-secondary);">
              “{conclusion}”
            </p>
          </div>
          <div style="text-align: right;">
            <div class="signature-line">{auditor}</div>
            <div style="font-size: 0.72rem; color: var(--ink-muted); margin-top: 0.25rem;">ENGAGEMENT PARTNER SIGN-OFF</div>
          </div>
        </div>

        <div style="margin-top: 3rem; text-align: center; border-top: var(--border-double); padding-top: 1.5rem;">
          <a href="../index.html" class="news-button" style="text-decoration: none; padding: 0.6rem 1.25rem; font-size: 0.85rem;">
            &larr; Back to All Entity Dossiers
          </a>
        </div>
      </article>
    </main>

    <!-- Footer -->
    <footer class="broadsheet-footer">
      <div class="footer-nav">
        <a href="../index.html">Front Page</a>
        <span>·</span>
        <a href="https://github.com/gitmaster-max/financial-gazette" target="_blank" rel="noopener">GitHub Repository</a>
        <span>·</span>
        <a href="javascript:void(0)" onclick="window.print()">Print Dossier</a>
      </div>
      <p>THE FINANCIAL &amp; AUDIT CHRONICLE · PUBLISHED UNDER EDITORIAL COMPLIANCE STANDARDS</p>
    </footer>

  </div>

  <script>
    // Theme toggle support on dedicated pages
    const THEME_KEY = 'financial_gazette_theme';
    const themeToggleBtn = document.getElementById('theme-toggle');
    function applyTheme() {{
      const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (themeToggleBtn) {{
        themeToggleBtn.textContent = savedTheme === 'dark' ? '☀ Classic Newsprint' : '☾ Pressroom Dark';
      }}
    }}
    if (themeToggleBtn) {{
      themeToggleBtn.addEventListener('click', () => {{
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(THEME_KEY, next);
        themeToggleBtn.textContent = next === 'dark' ? '☀ Classic Newsprint' : '☾ Pressroom Dark';
      }});
    }}
    applyTheme();
  </script>
</body>
</html>
"""

def main():
    os.makedirs(DOSSIERS_DIR, exist_ok=True)
    all_entities = []

    files = sorted([f for f in os.listdir(CONTENT_DIR) if f.endswith(".md")])
    print(f"Discovered {len(files)} markdown dossiers in {CONTENT_DIR}/")

    for fname in files:
        fpath = os.path.join(CONTENT_DIR, fname)
        meta, body = parse_markdown_file(fpath)
        slug = meta.get("slug", os.path.splitext(fname)[0])
        meta["slug"] = slug

        # Extract lead paragraph from body
        first_p = body.split("\n\n")[0].strip() if body else ""
        meta["leadParagraph"] = first_p

        # Render HTML for standalone page
        body_html = markdown_to_html(body)
        page_html = build_dossier_html(meta, body_html)
        out_page_path = os.path.join(DOSSIERS_DIR, f"{slug}.html")

        with open(out_page_path, "w", encoding="utf-8") as out_f:
            out_f.write(page_html)
        print(f"  [OK] Generated dedicated page: {out_page_path}")

        # Structure for data.js
        entity_obj = {
            "id": slug,
            "slug": slug,
            "pageUrl": f"dossiers/{slug}.html",
            "name": meta.get("name", "Corporate Entity"),
            "ticker": meta.get("ticker", "N/A"),
            "exchange": meta.get("exchange", "NASDAQ"),
            "sector": meta.get("sector", "General"),
            "dateline": meta.get("dateline", "NEW YORK"),
            "auditor": meta.get("auditor", "Independent Auditor"),
            "auditOpinion": meta.get("auditOpinion", "Unqualified / Clean"),
            "fiscalYear": meta.get("fiscalYear", "FY 2025"),
            "headline": meta.get("headline", ""),
            "leadParagraph": first_p,
            "financials": {
                "revenue": meta.get("revenue", "N/A"),
                "netIncome": meta.get("netIncome", "N/A"),
                "operatingMargin": meta.get("operatingMargin", "N/A"),
                "freeCashFlow": meta.get("freeCashFlow", "N/A"),
                "totalDebt": meta.get("totalDebt", "N/A"),
                "currentRatio": meta.get("currentRatio", "N/A")
            },
            "auditFocus": meta.get("auditFocus", ""),
            "fullAuditNotes": body,
            "auditorConclusion": meta.get("auditorConclusion", "")
        }
        all_entities.append(entity_obj)

    # Write data.js
    data_js_content = f"""/**
 * GENERATED CORPORATE ENTITIES DATASET
 * Built automatically from content/*.md by build.py
 */

const DEFAULT_ENTITIES = {json.dumps(all_entities, indent=2)};
"""
    with open(DATA_JS_PATH, "w", encoding="utf-8") as df:
        df.write(data_js_content)
    print(f"  [OK] Updated dataset: {DATA_JS_PATH}")
    print("Build complete!")

if __name__ == "__main__":
    main()
