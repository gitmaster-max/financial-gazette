#!/usr/bin/env python3
"""
The Financial & Audit Chronicle - Static Blog Generator
Generates clean, newspaper-style, Medium-like standalone blog posts for each company.
Zero placeholders, zero pop-ups, 100% owned static pages.
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
    is_first_p = True
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
            escaped = html.escape(b)
            escaped = re.sub(r"\*\*(.*?)\*\*", r"<strong>\1</strong>", escaped)
            if is_first_p:
                html_out.append(f'<p class="lead-para">{escaped}</p>')
                is_first_p = False
            else:
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

def build_dossier_html(meta, body_html, other_entities):
    slug = meta.get("slug", "entity")
    name = html.escape(meta.get("name", "Corporate Entity"))
    ticker = html.escape(meta.get("ticker", "N/A"))
    exchange = html.escape(meta.get("exchange", "NASDAQ"))
    sector = html.escape(meta.get("sector", "Enterprise"))
    dateline = html.escape(meta.get("dateline", "NEW YORK"))
    date = html.escape(meta.get("date", "September 12, 2026"))
    author = html.escape(meta.get("author", "Vijay Vittal"))
    reading_time = html.escape(meta.get("readingTime", "5 min read"))
    auditor = html.escape(meta.get("auditor", "Independent Audit Firm"))
    opinion = html.escape(meta.get("auditOpinion", "Unqualified / Clean"))
    fiscal_year = html.escape(meta.get("fiscalYear", "FY 2025"))
    headline = html.escape(meta.get("headline", "Annual Financial & Audit Review"))
    conclusion = html.escape(meta.get("auditorConclusion", "The consolidated statements present fairly in all material respects."))
    badge_class = get_badge_class(opinion)

    rev = html.escape(meta.get("revenue", "N/A"))
    net = html.escape(meta.get("netIncome", "N/A"))
    margin = html.escape(meta.get("operatingMargin", "N/A"))
    fcf = html.escape(meta.get("freeCashFlow", "N/A"))
    debt = html.escape(meta.get("totalDebt", "N/A"))
    current_ratio = html.escape(meta.get("currentRatio", "N/A"))
    audit_focus = html.escape(meta.get("auditFocus", "Key Audit Matter review."))

    # Generate more articles section
    related_html = []
    for other in other_entities[:3]:
        if other.get("slug") == slug:
            continue
        other_slug = other.get("slug", "")
        other_name = html.escape(other.get("name", ""))
        other_head = html.escape(other.get("headline", ""))
        other_date = html.escape(other.get("date", "September 2026"))
        related_html.append(f"""
          <div style="border-top: 1px solid var(--rule-light); padding: 0.85rem 0;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-muted); text-transform: uppercase;">
              {other.get("sector", "Enterprise")} · {other_date}
            </div>
            <h4 style="font-family: var(--font-headline); font-size: 1.15rem; margin: 0.25rem 0;">
              <a href="{other_slug}.html" style="color: var(--ink-primary); text-decoration: none;">{other_name}: “{other_head}”</a>
            </h4>
          </div>
        """)
    related_block = "\n".join(related_html)

    page_title = f"{name} ({ticker}) — Financial & Audit Analysis | The Financial & Audit Chronicle"
    meta_desc = f"In-depth financial review and audit analysis of {name} ({ticker}). Verified balance sheet metrics, key audit matters, and auditor opinion."

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{page_title}</title>
  <meta name="description" content="{meta_desc}">
  <link rel="stylesheet" href="../css/newspaper.css">
  <style>
    .article-container {{
      max-width: 820px;
      margin: 0 auto;
      padding: 1.5rem 0 4rem 0;
    }}
    .article-nav {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: var(--border-thin);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      text-transform: uppercase;
      margin-bottom: 2rem;
    }}
    .article-nav a {{
      color: var(--ink-primary);
      text-decoration: none;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }}
    .article-nav a:hover {{
      text-decoration: underline;
      color: var(--accent-gold);
    }}
    .post-meta-bar {{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      color: var(--ink-secondary);
      border-top: 1px solid var(--rule-light);
      border-bottom: 1px solid var(--rule-light);
      padding: 0.65rem 0;
      margin: 1.25rem 0 2rem 0;
    }}
    .post-meta-bar strong {{
      color: var(--ink-primary);
    }}
  </style>
</head>
<body>

  <div class="broadsheet-wrapper">

    <!-- Top Masthead Banner -->
    <header class="masthead">
      <div class="masthead-topbar">
        <div>THE INDEPENDENT JOURNAL OF CORPORATE ACCOUNTING</div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button id="theme-toggle" type="button">☾ Pressroom Dark</button>
          <span>|</span>
          <button id="btn-print" type="button" onclick="window.print()">🖶 Print Edition</button>
        </div>
      </div>

      <div class="masthead-title-container" style="padding: 0.85rem 0 0.5rem 0;">
        <div style="font-family: var(--font-headline); font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-muted);">
          The Financial &amp; Audit Chronicle
        </div>
        <h1 class="masthead-title" style="font-size: clamp(2rem, 4.5vw, 3.4rem); margin-top: 0.25rem;">
          <a href="../index.html" style="color: inherit; text-decoration: none;">The Broadsheet Ledger</a>
        </h1>
        <div class="masthead-motto">“Veritas in Numeris — Corporate Financial Review &amp; Audit Verification”</div>
      </div>

      <div class="masthead-subbar">
        <div class="col-left"><a href="../index.html" style="color: inherit; text-decoration: none;">&larr; Front Page</a></div>
        <div class="col-center">{sector.upper()}</div>
        <div class="col-right">{fiscal_year} FILING DISPATCH</div>
      </div>
    </header>

    <!-- Clean Breadcrumb Navigation -->
    <nav class="article-nav">
      <a href="../index.html">&larr; Return to All Company Dispatches</a>
      <span>AUDITOR OF RECORD: {auditor.upper()}</span>
    </nav>

    <!-- Main Article Body -->
    <main class="article-container">
      <article>
        <header>
          <div class="kicker">{sector} · DATELINE: {dateline}</div>
          <h1 class="lead-headline" style="font-size: clamp(2.2rem, 4vw, 3.2rem); margin-bottom: 0.75rem;">
            {name}: {headline}
          </h1>

          <div class="post-meta-bar">
            <span>By <strong>{author}</strong></span>
            <span>·</span>
            <time>{date}</time>
            <span>·</span>
            <span>{reading_time}</span>
            <span>·</span>
            <span><strong>{ticker}</strong> ({exchange})</span>
          </div>

          <div style="margin-bottom: 1.75rem;">
            <span class="audit-badge {badge_class}" style="font-size: 0.82rem; padding: 0.35rem 0.85rem;">
              AUDIT OPINION: {opinion}
            </span>
          </div>
        </header>

        <!-- Executive Financial Highlights Ledger -->
        <div class="stats-card" style="margin-bottom: 2rem; background-color: var(--paper-card); padding: 1.25rem;">
          <div class="section-tag" style="border-bottom: 2px solid var(--rule-color); margin-bottom: 0.75rem;">
            <span>VERIFIED FINANCIAL STATEMENT HIGHLIGHTS ({fiscal_year})</span>
            <span>SOURCE: 10-K FILING</span>
          </div>
          <table style="font-size: 0.82rem;">
            <tbody>
              <tr>
                <td>Total Net Revenue</td>
                <td>{rev}</td>
              </tr>
              <tr>
                <td>Net Income (GAAP)</td>
                <td>{net}</td>
              </tr>
              <tr>
                <td>Operating Margin</td>
                <td>{margin}</td>
              </tr>
              <tr>
                <td>Free Cash Flow</td>
                <td>{fcf}</td>
              </tr>
              <tr>
                <td>Long-Term Term Debt</td>
                <td>{debt}</td>
              </tr>
              <tr>
                <td>Current Ratio</td>
                <td>{current_ratio}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Key Audit Matter Callout -->
        <div class="audit-focus-box" style="margin-bottom: 2rem; padding: 1rem 1.25rem; font-size: 0.95rem; border-left: 4px solid var(--ink-primary);">
          <strong>Independent Auditor Focal Point (Critical Audit Matter):</strong>
          {audit_focus}
        </div>

        <!-- Article Text -->
        <div class="dossier-body-text" style="font-size: 1.1rem; line-height: 1.75;">
          {body_html}
        </div>

        <!-- Auditor Signature Block -->
        <div class="auditor-signature-block" style="margin-top: 3rem;">
          <div>
            <div><strong>Audit Attestation &amp; Opinion Summary</strong></div>
            <p style="font-style: italic; max-width: 480px; margin-top: 0.4rem; color: var(--ink-secondary);">
              “{conclusion}”
            </p>
          </div>
          <div style="text-align: right;">
            <div class="signature-line">{auditor}</div>
            <div style="font-size: 0.72rem; color: var(--ink-muted); margin-top: 0.25rem;">INDEPENDENT AUDITOR OF RECORD</div>
          </div>
        </div>

        <!-- Next / More Articles in the Blog -->
        <section style="margin-top: 4rem; border-top: var(--border-double); padding-top: 2rem;">
          <div class="section-tag" style="margin-bottom: 1rem;">
            <span>MORE FROM THE FINANCIAL &amp; AUDIT CHRONICLE</span>
          </div>
          {related_block}
        </section>

        <!-- Back Button -->
        <div style="margin-top: 2.5rem; text-align: center;">
          <a href="../index.html" class="news-button" style="text-decoration: none; padding: 0.65rem 1.5rem; font-size: 0.85rem;">
            &larr; Back to Gazette Front Page
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
        <a href="javascript:void(0)" onclick="window.print()">Print This Article</a>
      </div>
      <p>THE FINANCIAL &amp; AUDIT CHRONICLE · INDEPENDENT CORPORATE ACCOUNTING BLOG</p>
    </footer>

  </div>

  <script>
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

    # First pass: parse all
    parsed = []
    for fname in files:
        fpath = os.path.join(CONTENT_DIR, fname)
        meta, body = parse_markdown_file(fpath)
        slug = meta.get("slug", os.path.splitext(fname)[0])
        meta["slug"] = slug

        first_p = body.split("\n\n")[0].strip() if body else ""
        meta["leadParagraph"] = first_p
        parsed.append((meta, body, slug))

    # Second pass: build HTML with other_entities reference
    for meta, body, slug in parsed:
        body_html = markdown_to_html(body)
        other_entities = [m for m, b, s in parsed if s != slug]
        page_html = build_dossier_html(meta, body_html, other_entities)
        out_page_path = os.path.join(DOSSIERS_DIR, f"{slug}.html")

        with open(out_page_path, "w", encoding="utf-8") as out_f:
            out_f.write(page_html)
        print(f"  [OK] Generated blog post page: {out_page_path}")

        entity_obj = {
            "id": slug,
            "slug": slug,
            "pageUrl": f"dossiers/{slug}.html",
            "name": meta.get("name", "Corporate Entity"),
            "ticker": meta.get("ticker", "N/A"),
            "exchange": meta.get("exchange", "NASDAQ"),
            "sector": meta.get("sector", "General"),
            "dateline": meta.get("dateline", "NEW YORK"),
            "date": meta.get("date", "September 12, 2026"),
            "author": meta.get("author", "Vijay Vittal"),
            "readingTime": meta.get("readingTime", "5 min read"),
            "auditor": meta.get("auditor", "Independent Auditor"),
            "auditOpinion": meta.get("auditOpinion", "Unqualified / Clean"),
            "fiscalYear": meta.get("fiscalYear", "FY 2025"),
            "headline": meta.get("headline", ""),
            "leadParagraph": meta["leadParagraph"],
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
