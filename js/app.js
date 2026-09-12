/**
 * THE FINANCIAL & AUDIT CHRONICLE
 * Front-Page Blog Logic & Search Navigation
 * Zero Pop-ups · Direct Page Navigation · Pure Newspaper Blog
 */

(function () {
  'use strict';

  const THEME_KEY = 'financial_gazette_theme';

  // State
  const entities = Array.isArray(DEFAULT_ENTITIES) ? DEFAULT_ENTITIES : [];
  let currentFilter = 'ALL';
  let searchQuery = '';

  // DOM Elements
  const entitiesGrid = document.getElementById('entities-grid');
  const searchInput = document.getElementById('search-input');
  const opinionFilter = document.getElementById('opinion-filter');
  const entityCountEl = document.getElementById('entity-count');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const printBtn = document.getElementById('btn-print');

  // Initialize
  function init() {
    loadTheme();
    renderEntities();
    attachEventListeners();
    updateDateDisplay();
  }

  // Theme Management
  function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggleBtn) {
      themeToggleBtn.textContent = savedTheme === 'dark' ? '☀ Classic Newsprint' : '☾ Pressroom Dark';
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    if (themeToggleBtn) {
      themeToggleBtn.textContent = nextTheme === 'dark' ? '☀ Classic Newsprint' : '☾ Pressroom Dark';
    }
  }

  // Helper: Format badge class
  function getBadgeClass(opinion) {
    const op = (opinion || '').toLowerCase();
    if (op.includes('unqualified') || op.includes('clean')) return 'badge-unqualified';
    if (op.includes('emphasis')) return 'badge-emphasis';
    if (op.includes('qualified')) return 'badge-qualified';
    return 'badge-adverse';
  }

  // Render Articles
  function renderEntities() {
    if (!entitiesGrid) return;

    const filtered = entities.filter(item => {
      const q = searchQuery;
      const matchesSearch = 
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.ticker.toLowerCase().includes(q) ||
        item.sector.toLowerCase().includes(q) ||
        item.headline.toLowerCase().includes(q) ||
        item.auditor.toLowerCase().includes(q);

      const matchesOpinion = 
        currentFilter === 'ALL' ||
        item.auditOpinion.toLowerCase().includes(currentFilter.toLowerCase());

      return matchesSearch && matchesOpinion;
    });

    if (entityCountEl) {
      entityCountEl.textContent = `${filtered.length} Article${filtered.length === 1 ? '' : 's'} Published`;
    }

    if (filtered.length === 0) {
      entitiesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; border: var(--border-thin); background-color: var(--paper-card);">
          <h3 style="font-family: var(--font-headline); font-size: 1.4rem; margin-bottom: 0.5rem;">No Dispatches Found</h3>
          <p style="font-family: var(--font-body); font-style: italic; color: var(--ink-secondary); margin-bottom: 1.25rem;">
            No published articles match the search query "${escapeHTML(searchQuery)}" under the selected filter.
          </p>
          <button class="news-button" type="button" id="btn-clear-search">
            View All Dispatches
          </button>
        </div>
      `;
      const clearBtn = document.getElementById('btn-clear-search');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          if (opinionFilter) opinionFilter.value = 'ALL';
          searchQuery = '';
          currentFilter = 'ALL';
          renderEntities();
        });
      }
      return;
    }

    entitiesGrid.innerHTML = filtered.map(item => {
      const badgeClass = getBadgeClass(item.auditOpinion);
      const fin = item.financials || {};
      const targetUrl = item.pageUrl || `dossiers/${item.slug || item.id}.html`;
      const author = item.author || 'Vijay Vittal';
      const date = item.date || 'September 12, 2026';
      const readingTime = item.readingTime || '5 min read';

      return `
        <article class="entity-card" data-id="${item.id}">
          <header class="entity-header">
            <div class="entity-meta">
              <span><strong>${escapeHTML(item.sector)}</strong></span>
              <span>${escapeHTML(date)}</span>
            </div>

            <h3 class="entity-name" style="margin: 0.4rem 0;">
              <a href="${targetUrl}" class="blog-card-link">
                ${escapeHTML(item.name)}: “${escapeHTML(item.headline)}”
              </a>
            </h3>

            <div class="author-byline-bar">
              <span>By <strong>${escapeHTML(author)}</strong></span>
              <span>·</span>
              <span>${escapeHTML(readingTime)}</span>
              <span>·</span>
              <span><strong>${escapeHTML(item.ticker)}</strong> (${escapeHTML(item.exchange || 'NASDAQ')})</span>
            </div>

            <div style="margin-top: 0.5rem;">
              <span class="audit-badge ${badgeClass}">${escapeHTML(item.auditOpinion)}</span>
            </div>
          </header>

          <div class="card-narrative">
            <p>${escapeHTML(item.leadParagraph)}</p>
          </div>

          <div class="audit-focus-box">
            <strong>Auditor of Record: ${escapeHTML(item.auditor)}</strong>
            ${escapeHTML(item.auditFocus || 'Comprehensive Key Audit Matter examination.')}
          </div>

          <div class="ledger-table-wrap">
            <table class="ledger-table">
              <tbody>
                <tr>
                  <td>Total Net Revenue</td>
                  <td>${escapeHTML(fin.revenue || 'N/A')}</td>
                </tr>
                <tr>
                  <td>Net Income (GAAP)</td>
                  <td>${escapeHTML(fin.netIncome || 'N/A')}</td>
                </tr>
                <tr>
                  <td>Operating Margin</td>
                  <td>${escapeHTML(fin.operatingMargin || 'N/A')}</td>
                </tr>
                <tr>
                  <td>Free Cash Flow</td>
                  <td>${escapeHTML(fin.freeCashFlow || 'N/A')}</td>
                </tr>
                <tr>
                  <td>Long-Term Debt</td>
                  <td>${escapeHTML(fin.totalDebt || 'N/A')}</td>
                </tr>
                <tr>
                  <td>Current Ratio</td>
                  <td>${escapeHTML(fin.currentRatio || 'N/A')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <footer class="card-actions" style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px solid var(--rule-light);">
            <a href="${targetUrl}" class="news-button" style="text-decoration: none; width: 100%; justify-content: center; text-align: center; padding: 0.5rem;">
              Read Full Story &rarr;
            </a>
          </footer>
        </article>
      `;
    }).join('');
  }

  // Update Newspaper Header Date
  function updateDateDisplay() {
    const dateEl = document.getElementById('newspaper-date');
    if (dateEl) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = new Date().toLocaleDateString('en-US', options).toUpperCase();
    }
  }

  // Attach Event Listeners
  function attachEventListeners() {
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderEntities();
      });
    }

    if (opinionFilter) {
      opinionFilter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderEntities();
      });
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }
  }

  // Escape HTML helper
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
