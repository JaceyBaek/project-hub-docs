/**
 * meta-injector.js — <meta> 태그를 단일 소스로 메타바·AI 메타 블록·변경이력을 자동 채움
 *
 * 사용법:
 *   <head>
 *     <meta name="doc-owner" content="홍길동 (PM)">
 *     ...
 *   </head>
 *   <body>
 *     <div class="cf-meta" data-meta-auto>
 *       <div class="m"><div class="k">담당자</div><div class="v" data-meta-field="doc-owner"></div></div>
 *       ...
 *     </div>
 *     <div class="ai-meta" data-meta-auto></div>
 *     <table data-changelog-auto>...</table>
 *     <script src="../assets/meta-injector.js"></script>
 *   </body>
 *
 * 우선순위:
 *   - data-meta-field 가 있으면 그 셀에 <meta name="<field>"> 의 content 를 넣는다
 *   - data-meta-auto 가 있는 .ai-meta 블록은 통째로 재생성
 *   - data-changelog-auto 가 있는 표는 <meta name="doc-changelog"> JSON 으로 채움
 */
(function () {
  'use strict';

  function getMeta(name) {
    const el = document.querySelector(`meta[name="${name}"]`);
    return el ? el.getAttribute('content') : null;
  }

  function getMetaJSON(name) {
    const v = getMeta(name);
    if (!v) return null;
    try { return JSON.parse(v); } catch { return null; }
  }

  // ── 1. 개별 필드 매핑 (data-meta-field) ─────────────────────────
  function fillFields() {
    document.querySelectorAll('[data-meta-field]').forEach((el) => {
      const name = el.getAttribute('data-meta-field');
      const v = getMeta(name);
      if (v == null) return;
      // status 필드는 status 칩으로 렌더
      if (name === 'doc-status') {
        const slug = v.toLowerCase();
        el.innerHTML = `<span class="status ${slug}">${v}</span>`;
      } else if (name === 'doc-confluence') {
        el.className = (el.className + ' mono small').trim();
        el.textContent = v;
      } else {
        el.textContent = v;
      }
    });
  }

  // ── 2. AI 메타 블록 재생성 (data-meta-auto on .ai-meta) ──────────
  function renderAiMeta() {
    const block = document.querySelector('.ai-meta[data-meta-auto]');
    if (!block) return;
    const lines = [];
    const push = (k, v) => v && lines.push(`<span class="k">${k}:</span> ${v}`);

    push('project_id   ', getMeta('project-id'));
    push('doc_id       ', getMeta('doc-id'));
    push('version      ', getMeta('doc-version'));
    push('last_updated ', getMeta('doc-last-updated'));

    const tags = getMeta('doc-tags');
    if (tags) {
      const arr = tags.split(',').map((s) => `"${s.trim()}"`).join(', ');
      push('tags         ', `[${arr}]`);
    }
    const ents = getMeta('doc-primary-entities');
    if (ents) {
      const arr = ents.split(',').map((s) => `"${s.trim()}"`).join(', ');
      push('primary_entities', `[${arr}]`);
    }
    const hint = getMeta('doc-embedding-hints');
    if (hint) {
      lines.push(`<span class="k">embedding_hints:</span>`);
      lines.push(`  - "${hint}"`);
    }
    const related = getMeta('doc-related');
    if (related) {
      const arr = related.split(',').map((s) => `"${s.trim()}"`).join(', ');
      push('related_docs ', `[${arr}]`);
    }
    push('exclude_from_training', getMeta('doc-exclude-from-training') || 'false');
    push('chunk_strategy', `"${getMeta('doc-chunk-strategy') || 'heading-h2'}"`);

    const sup = getMeta('doc-superseded-by');
    if (sup) push('superseded_by', sup);

    block.innerHTML = lines.join('\n');
  }

  // ── 3. 변경이력 표 (data-changelog-auto) ────────────────────────
  // <meta name="doc-changelog" content='[{"version":"v0.1","date":"2026-04-24","author":"홍길동","note":"초안"}]'>
  function renderChangelog() {
    const tbody = document.querySelector('[data-changelog-auto] tbody');
    if (!tbody) return;
    const arr = getMetaJSON('doc-changelog');
    if (!Array.isArray(arr) || !arr.length) return;
    tbody.innerHTML = arr
      .map((r) => `<tr><td>${r.version || ''}</td><td>${r.date || ''}</td><td>${r.author || ''}</td><td>${r.note || ''}</td></tr>`)
      .join('');
  }

  // ── 4. 페이지 타이틀에 doc-id 자동 prefix ───────────────────────
  function syncTitle() {
    const docName = getMeta('doc-name-ko');
    const docId = getMeta('doc-id');
    if (docName && docId && document.title.indexOf(docId) < 0) {
      document.title = `${docId} · ${docName}`;
    }
  }

  function run() {
    fillFields();
    renderAiMeta();
    renderChangelog();
    syncTitle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
