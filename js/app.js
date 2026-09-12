/**
 * THE FINANCIAL & AUDIT CHRONICLE
 * Core Application Logic & Interactivity
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'financial_gazette_entities_v1';
  const THEME_KEY = 'financial_gazette_theme';

  // State
  let entities = [];
  let currentFilter = 'ALL';
  let searchQuery = '';

  // DOM Elements
  const entitiesGrid = document.getElementById('entities-grid');
  const searchInput = document.getElementById('search-input');
  const opinionFilter = document.getElementById('opinion-filter');
  const entityCountEl = document.getElementById('entity-count');
  const newDispatchBtn = document.getElementById('btn-new-dispatch');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const printBtn = document.getElementById('btn-print');
  const exportBtn = document.getElementById('btn-export');
  const resetBtn = document.getElementById('btn-reset');

  // Modals
  const dispatchModal = document.getElementById('dispatch-modal');
  const dossierModal = document.getElementById('dossier-modal');
  const dispatchForm = document.getElementById('dispatch-form');
  const closeDispatchBtn = document.getElementById('close-dispatch-modal');
  const cancelDispatchBtn = document.getElementById('btn-cancel-dispatch');
  const closeDossierBtn = document.getElementById('close-dossier-modal');
  const dossierContent = document.getElementById('dossier-content');

  // Initialize
  function init() {
    loadTheme();
    loadEntities();
    renderEntities();
    attachEventListeners();
    updateDateDisplay();
  }

  // Load Theme
  function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggleBtn) {
      themeToggleBtn.textContent = savedTheme === 'dark' ? '☀ Classic Newsprint' : '☾ Pressroom Dark';
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    if (themeToggleBtn) {
      themeToggleBtn.textContent = newTheme === 'dark' ? '☀ Classic Newsprint' : '☾ Pressroom Dark';
    }
  }

  // Load Entities from Storage or Fallback to DEFAULT_ENTITIES
  function loadEntities() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        entities = JSON.parse(stored);
      } else {
        entities = [...DEFAULT_ENTITIES];
        saveEntities();
      }
    } catch (e) {
      console.warn('Failed to parse localStorage, using default entities', e);
      entities = [...DEFAULT_ENTITIES];
    }
  }

  function saveEntities() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entities));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
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

  // Render Entities
  function renderEntities() {
    if (!entitiesGrid) return;

    const filtered = entities.filter(item => {
      const matchesSearch = 
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery) ||
        item.ticker.toLowerCase().includes(searchQuery) ||
        item.sector.toLowerCase().includes(searchQuery) ||
        item.headline.toLowerCase().includes(searchQuery) ||
        item.auditor.toLowerCase().includes(searchQuery);

      const matchesOpinion = 
        currentFilter === 'ALL' ||
        item.auditOpinion.toLowerCase().includes(currentFilter.toLowerCase());

      return matchesSearch && matchesOpinion;
    });

    if (entityCountEl) {
      entityCountEl.textContent = `${filtered.length} Dispatches Published`;
    }

    if (filtered.length === 0) {
      entitiesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; border: var(--border-thin); background-color: var(--paper-card);">
          <h3 style="font-family: var(--font-headline); font-size: 1.4rem; margin-bottom: 0.5rem;">No Corporate Dispatches Found</h3>
          <p style="font-family: var(--font-body); font-style: italic; color: var(--ink-secondary); margin-bottom: 1rem;">
            No entities match the query "${searchQuery}" under the selected audit filter.
          </p>
          <button class="news-button" onclick="document.getElementById('search-input').value=''; document.getElementById('search-input').dispatchEvent(new Event('input'));">
            Clear Search Filter
          </button>
        </div>
      `;
      return;
    }

    entitiesGrid.innerHTML = filtered.map(item => {
      const badgeClass = getBadgeClass(item.auditOpinion);
      const fin = item.financials || {};
      const targetUrl = item.pageUrl || `dossiers/${item.slug || item.id}.html`;

      return `
        <article class="entity-card" data-id="${item.id}">
          <header class="entity-header">
            <div class="entity-meta">
              <span><strong>${item.ticker}</strong> · ${item.exchange || 'EXCHANGE'}</span>
              <span>${item.fiscalYear || 'FY 2025'}</span>
            </div>
            <h3 class="entity-name">
              <a href="${targetUrl}" style="color: inherit; text-decoration: none;" title="Open Dedicated Page for ${escapeHTML(item.name)}">
                ${escapeHTML(item.name)}
              </a>
            </h3>
            <div class="entity-headline">“${escapeHTML(item.headline)}”</div>
            <div style="margin-top: 0.5rem;">
              <span class="audit-badge ${badgeClass}">${escapeHTML(item.auditOpinion)}</span>
            </div>
          </header>

          <div class="card-narrative">
            <p>${escapeHTML(item.leadParagraph)}</p>
          </div>

          <div class="audit-focus-box">
            <strong>Auditor: ${escapeHTML(item.auditor)}</strong>
            ${escapeHTML(item.auditFocus || 'No specific KAM highlight noted.')}
          </div>

          <div class="ledger-table-wrap">
            <table class="ledger-table">
              <tbody>
                <tr>
                  <td>Total Revenue</td>
                  <td>${escapeHTML(fin.revenue || 'N/A')}</td>
                </tr>
                <tr>
                  <td>Net Income</td>
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

          <footer class="card-actions">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <a href="${targetUrl}" class="news-button" style="text-decoration: none; padding: 0.35rem 0.65rem; font-size: 0.72rem;">
                Open Dedicated Page &rarr;
              </a>
              <button type="button" class="action-read" data-id="${item.id}" style="background:none; border:none; text-decoration:underline; font-size:0.72rem; cursor:pointer; color:var(--ink-secondary);">
                Quick View
              </button>
            </div>
            <div>
              <button type="button" class="action-edit" data-id="${item.id}" style="margin-right: 0.75rem;">Edit</button>
              <button type="button" class="action-delete" data-id="${item.id}" style="color: var(--stamp-danger);">Delete</button>
            </div>
          </footer>
        </article>
      `;
    }).join('');

    // Attach card event listeners
    entitiesGrid.querySelectorAll('.action-read').forEach(btn => {
      btn.addEventListener('click', () => openDossier(btn.dataset.id));
    });

    entitiesGrid.querySelectorAll('.action-edit').forEach(btn => {
      btn.addEventListener('click', () => editEntity(btn.dataset.id));
    });

    entitiesGrid.querySelectorAll('.action-delete').forEach(btn => {
      btn.addEventListener('click', () => deleteEntity(btn.dataset.id));
    });
  }

  // Open Full Dossier Modal
  function openDossier(id) {
    const item = entities.find(e => e.id === id);
    if (!item) return;

    const badgeClass = getBadgeClass(item.auditOpinion);
    const fin = item.financials || {};

    // Format markdown-like notes to HTML
    const formattedNotes = (item.fullAuditNotes || '')
      .split('\n\n')
      .map(block => {
        const trimmed = block.trim();
        if (trimmed.startsWith('### ')) {
          return `<h4 class="dossier-section-title">${escapeHTML(trimmed.replace('### ', ''))}</h4>`;
        }
        if (trimmed.length > 0) {
          return `<p>${escapeHTML(trimmed)}</p>`;
        }
        return '';
      })
      .join('');

    dossierContent.innerHTML = `
      <div class="dossier-masthead">
        <div class="kicker">${escapeHTML(item.sector)} · DATELINE: ${escapeHTML(item.dateline || 'NEW YORK')}</div>
        <h2 class="dossier-headline">${escapeHTML(item.name)}: ${escapeHTML(item.headline)}</h2>
        <div class="byline">FINANCIAL AUDIT DOSSIER · AUDITOR OF RECORD: <strong>${escapeHTML(item.auditor)}</strong></div>
        <span class="audit-badge ${badgeClass}" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
          OFFICIAL AUDIT OPINION: ${escapeHTML(item.auditOpinion)}
        </span>
      </div>

      <div class="dossier-meta-grid">
        <div><strong>TICKER:</strong> ${escapeHTML(item.ticker)}</div>
        <div><strong>EXCHANGE:</strong> ${escapeHTML(item.exchange || 'N/A')}</div>
        <div><strong>FISCAL YEAR:</strong> ${escapeHTML(item.fiscalYear || 'FY 2025')}</div>
        <div><strong>AUDITOR:</strong> ${escapeHTML(item.auditor)}</div>
      </div>

      <div class="dossier-body-text">
        <p style="font-size: 1.15rem; font-weight: 500; font-style: italic; border-left: 3px solid var(--rule-color); padding-left: 1rem; margin-bottom: 1.5rem;">
          ${escapeHTML(item.leadParagraph)}
        </p>

        <h4 class="dossier-section-title">Verified Balance Sheet & Ledger Highlights</h4>
        <div class="dossier-table-container">
          <table class="dossier-full-table">
            <thead>
              <tr>
                <th>Statement Metric</th>
                <th>Classification</th>
                <th>Reported Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Net Revenue</td>
                <td>Income Statement</td>
                <td>${escapeHTML(fin.revenue || 'N/A')}</td>
              </tr>
              <tr>
                <td>Net Income (GAAP)</td>
                <td>Income Statement</td>
                <td>${escapeHTML(fin.netIncome || 'N/A')}</td>
              </tr>
              <tr>
                <td>Operating Margin</td>
                <td>Operating Efficiency</td>
                <td>${escapeHTML(fin.operatingMargin || 'N/A')}</td>
              </tr>
              <tr>
                <td>Free Cash Flow</td>
                <td>Cash Flow Statement</td>
                <td>${escapeHTML(fin.freeCashFlow || 'N/A')}</td>
              </tr>
              <tr>
                <td>Total Term & Senior Debt</td>
                <td>Balance Sheet Liability</td>
                <td>${escapeHTML(fin.totalDebt || 'N/A')}</td>
              </tr>
              <tr>
                <td>Current Ratio</td>
                <td>Liquidity Metric</td>
                <td>${escapeHTML(fin.currentRatio || 'N/A')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="dossier-section-title">Critical Audit Matters (CAM) & Detailed Disclosures</h4>
        <div style="line-height: 1.7;">
          ${formattedNotes}
        </div>

        <div class="auditor-signature-block">
          <div>
            <div><strong>Attestation of Independent Audit Firm</strong></div>
            <p style="font-style: italic; max-width: 480px; margin-top: 0.35rem; color: var(--ink-secondary);">
              "${escapeHTML(item.auditorConclusion || 'The consolidated statements present fairly in all material respects the financial position.')}"
            </p>
          </div>
          <div style="text-align: right;">
            <div class="signature-line">${escapeHTML(item.auditor)}</div>
            <div style="font-size: 0.7rem; color: var(--ink-muted); margin-top: 0.25rem;">ENGAGEMENT PARTNER SIGN-OFF</div>
          </div>
        </div>
      </div>
    `;

    dossierModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDossier() {
    dossierModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open Compose / Edit Dispatch Modal
  function openDispatchModal(editItem = null) {
    dispatchForm.reset();
    document.getElementById('form-mode').value = editItem ? 'edit' : 'create';
    document.getElementById('edit-id').value = editItem ? editItem.id : '';

    const modalTitle = document.getElementById('dispatch-modal-title');
    if (modalTitle) {
      modalTitle.textContent = editItem ? 'Edit Corporate Audit Dispatch' : 'File New Corporate Audit Dispatch';
    }

    if (editItem) {
      document.getElementById('input-name').value = editItem.name || '';
      document.getElementById('input-ticker').value = editItem.ticker || '';
      document.getElementById('input-exchange').value = editItem.exchange || 'NASDAQ';
      document.getElementById('input-sector').value = editItem.sector || '';
      document.getElementById('input-dateline').value = editItem.dateline || '';
      document.getElementById('input-auditor').value = editItem.auditor || '';
      document.getElementById('input-opinion').value = editItem.auditOpinion || 'Unqualified / Clean';
      document.getElementById('input-fiscal-year').value = editItem.fiscalYear || 'FY 2025';
      document.getElementById('input-headline').value = editItem.headline || '';
      document.getElementById('input-lead').value = editItem.leadParagraph || '';
      
      const fin = editItem.financials || {};
      document.getElementById('input-rev').value = fin.revenue || '';
      document.getElementById('input-net-income').value = fin.netIncome || '';
      document.getElementById('input-op-margin').value = fin.operatingMargin || '';
      document.getElementById('input-fcf').value = fin.freeCashFlow || '';
      document.getElementById('input-debt').value = fin.totalDebt || '';
      document.getElementById('input-current-ratio').value = fin.currentRatio || '';

      document.getElementById('input-audit-focus').value = editItem.auditFocus || '';
      document.getElementById('input-full-notes').value = editItem.fullAuditNotes || '';
      document.getElementById('input-auditor-conclusion').value = editItem.auditorConclusion || '';
    }

    dispatchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDispatch() {
    dispatchModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function editEntity(id) {
    const item = entities.find(e => e.id === id);
    if (item) {
      openDispatchModal(item);
    }
  }

  function deleteEntity(id) {
    const item = entities.find(e => e.id === id);
    if (!item) return;

    const confirmDel = confirm(`Are you certain you wish to purge the audit dispatch for "${item.name}" from the gazette archive?`);
    if (confirmDel) {
      entities = entities.filter(e => e.id !== id);
      saveEntities();
      renderEntities();
    }
  }

  // Handle Form Submission
  function handleFormSubmit(e) {
    e.preventDefault();

    const mode = document.getElementById('form-mode').value;
    const editId = document.getElementById('edit-id').value;

    const name = document.getElementById('input-name').value.trim();
    const ticker = document.getElementById('input-ticker').value.trim().toUpperCase();
    const exchange = document.getElementById('input-exchange').value.trim();
    const sector = document.getElementById('input-sector').value.trim();
    const dateline = document.getElementById('input-dateline').value.trim().toUpperCase();
    const auditor = document.getElementById('input-auditor').value.trim();
    const auditOpinion = document.getElementById('input-opinion').value;
    const fiscalYear = document.getElementById('input-fiscal-year').value.trim();
    const headline = document.getElementById('input-headline').value.trim();
    const leadParagraph = document.getElementById('input-lead').value.trim();

    const financials = {
      revenue: document.getElementById('input-rev').value.trim() || 'N/A',
      netIncome: document.getElementById('input-net-income').value.trim() || 'N/A',
      operatingMargin: document.getElementById('input-op-margin').value.trim() || 'N/A',
      freeCashFlow: document.getElementById('input-fcf').value.trim() || 'N/A',
      totalDebt: document.getElementById('input-debt').value.trim() || 'N/A',
      currentRatio: document.getElementById('input-current-ratio').value.trim() || 'N/A',
    };

    const auditFocus = document.getElementById('input-audit-focus').value.trim();
    const fullAuditNotes = document.getElementById('input-full-notes').value.trim();
    const auditorConclusion = document.getElementById('input-auditor-conclusion').value.trim() || 
      'In our opinion, the consolidated financial statements present fairly, in all material respects, the financial position of the company.';

    if (!name || !headline || !leadParagraph) {
      alert('Please provide the Entity Name, Headline, and Lead Paragraph.');
      return;
    }

    if (mode === 'edit' && editId) {
      const idx = entities.findIndex(e => e.id === editId);
      if (idx !== -1) {
        entities[idx] = {
          ...entities[idx],
          name, ticker, exchange, sector, dateline, auditor,
          auditOpinion, fiscalYear, headline, leadParagraph,
          financials, auditFocus, fullAuditNotes, auditorConclusion
        };
      }
    } else {
      const newEntity = {
        id: 'dispatch_' + Date.now(),
        name, ticker, exchange, sector, dateline, auditor,
        auditOpinion, fiscalYear, headline, leadParagraph,
        financials, auditFocus, fullAuditNotes, auditorConclusion
      };
      entities.unshift(newEntity); // Add to the top of front page
    }

    saveEntities();
    renderEntities();
    closeDispatch();
  }

  // Export Data to JSON File
  function exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entities, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `financial_gazette_entities_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  // Reset to Default Entities
  function resetData() {
    const confirmReset = confirm("Reset all entries to default gazette entities? Any custom company cards created will be overwritten.");
    if (confirmReset) {
      entities = [...DEFAULT_ENTITIES];
      saveEntities();
      renderEntities();
    }
  }

  // Update Current Date Display
  function updateDateDisplay() {
    const dateEl = document.getElementById('newspaper-date');
    if (dateEl) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateEl.textContent = new Date().toLocaleDateString('en-US', options).toUpperCase();
    }
  }

  // Download Markdown file for content/ directory
  function downloadMarkdownPost() {
    const name = document.getElementById('input-name').value.trim() || 'Corporate Entity';
    const ticker = document.getElementById('input-ticker').value.trim().toUpperCase() || 'TICK';
    const exchange = document.getElementById('input-exchange').value.trim() || 'NASDAQ';
    const sector = document.getElementById('input-sector').value.trim() || 'General';
    const dateline = document.getElementById('input-dateline').value.trim().toUpperCase() || 'NEW YORK';
    const auditor = document.getElementById('input-auditor').value.trim() || 'Independent Auditor';
    const auditOpinion = document.getElementById('input-opinion').value;
    const fiscalYear = document.getElementById('input-fiscal-year').value.trim() || 'FY 2025';
    const headline = document.getElementById('input-headline').value.trim() || 'Annual Audit Review';
    const leadParagraph = document.getElementById('input-lead').value.trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'entity';

    const rev = document.getElementById('input-rev').value.trim() || 'N/A';
    const net = document.getElementById('input-net-income').value.trim() || 'N/A';
    const opMargin = document.getElementById('input-op-margin').value.trim() || 'N/A';
    const fcf = document.getElementById('input-fcf').value.trim() || 'N/A';
    const debt = document.getElementById('input-debt').value.trim() || 'N/A';
    const currentRatio = document.getElementById('input-current-ratio').value.trim() || 'N/A';
    const auditFocus = document.getElementById('input-audit-focus').value.trim() || '';
    const fullNotes = document.getElementById('input-full-notes').value.trim() || '';
    const conclusion = document.getElementById('input-auditor-conclusion').value.trim() || 
      'In our opinion, the consolidated financial statements present fairly, in all material respects.';

    const mdContent = `---
name: "${name}"
slug: ${slug}
ticker: ${ticker}
exchange: ${exchange}
sector: "${sector}"
dateline: "${dateline}"
auditor: "${auditor}"
auditOpinion: "${auditOpinion}"
fiscalYear: "${fiscalYear}"
headline: "${headline}"
revenue: "${rev}"
netIncome: "${net}"
operatingMargin: "${opMargin}"
freeCashFlow: "${fcf}"
totalDebt: "${debt}"
currentRatio: "${currentRatio}"
auditFocus: "${auditFocus}"
auditorConclusion: "${conclusion}"
---

${leadParagraph}

${fullNotes}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${slug}.md`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  // Attach Event Listeners
  function attachEventListeners() {
    const downloadMdBtn = document.getElementById('btn-download-md');
    if (downloadMdBtn) {
      downloadMdBtn.addEventListener('click', downloadMarkdownPost);
    }
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

    if (newDispatchBtn) {
      newDispatchBtn.addEventListener('click', () => openDispatchModal());
    }

    if (closeDispatchBtn) {
      closeDispatchBtn.addEventListener('click', closeDispatch);
    }

    if (cancelDispatchBtn) {
      cancelDispatchBtn.addEventListener('click', closeDispatch);
    }

    if (closeDossierBtn) {
      closeDossierBtn.addEventListener('click', closeDossier);
    }

    if (dispatchForm) {
      dispatchForm.addEventListener('submit', handleFormSubmit);
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', exportData);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', resetData);
    }

    // Close modals when clicking outside modal-content
    [dispatchModal, dossierModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            closeDispatch();
            closeDossier();
          }
        });
      }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDispatch();
        closeDossier();
      }
    });
  }

  // Helper: Escape HTML
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
