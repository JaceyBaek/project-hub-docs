/**
 * doc-validator.js — 문서 검증표 자동 계산
 *
 * data-validate-rule="rule-name" 가 있는 행을 찾아 규칙별로 PASS/FAIL을 계산해
 * 같은 행의 결과 셀(data-validate-result)에 표시한다.
 *
 * 사용법:
 *   <table>
 *     <tr data-validate-rule="meta-bar"><td>...</td><td data-validate-result></td></tr>
 *   </table>
 *   <script src="../assets/doc-validator.js"></script>
 */
(function () {
  'use strict';

  /**
   * 규칙 정의 — DOM 을 받아 { ok: bool, detail: string } 반환
   */
  const RULES = {
    'meta-bar': (doc) => {
      const cells = doc.querySelectorAll('.cf-meta .m .v');
      const filled = [...cells].filter((c) => c.textContent.trim().length > 0).length;
      return { ok: filled >= 6, detail: `${filled}/6` };
    },
    'tags': (doc) => {
      const tags = doc.querySelectorAll('[data-tags] .tag, .tag');
      const required = ['phase', 'module', 'domain'];
      const text = [...tags].map((t) => t.textContent).join(' ');
      const have = required.filter((r) => text.includes(`#${r}`));
      return { ok: have.length === required.length, detail: `${have.length}/3` };
    },
    'overview-3-blocks': (doc) => {
      const blocks = doc.querySelectorAll('section[data-section-key="overview"] [data-chunk^="overview."]');
      return { ok: blocks.length >= 3, detail: `${blocks.length}/3` };
    },
    'glossary-min5': (doc) => {
      const rows = doc.querySelectorAll('[data-table-key="glossary"] tbody tr');
      return { ok: rows.length >= 5, detail: `${rows.length}/5` };
    },
    'persona-min2': (doc) => {
      const cards = doc.querySelectorAll('[data-chunk^="persona:"]');
      return { ok: cards.length >= 2, detail: `${cards.length}/2` };
    },
    'br-min3': (doc) => {
      const rows = doc.querySelectorAll('[data-table-key="business-requirements"] tbody tr');
      return { ok: rows.length >= 3, detail: `${rows.length}/3` };
    },
    'fr-min5': (doc) => {
      const rows = doc.querySelectorAll('[data-table-key="functional-requirements"] tbody tr');
      return { ok: rows.length >= 5, detail: `${rows.length}/5` };
    },
    'nfr-categories': (doc) => {
      const required = ['성능', '가용성', '보안', '호환성'];
      const cats = new Set(
        [...doc.querySelectorAll('[data-table-key="non-functional-requirements"] tbody tr')]
          .map((r) => r.getAttribute('data-category'))
          .filter(Boolean)
      );
      const have = required.filter((c) => cats.has(c));
      return { ok: have.length === required.length, detail: `${have.length}/4` };
    },
    'trace-required': (doc) => {
      const rows = doc.querySelectorAll('[data-req-id], [data-item-id]');
      const missing = [...rows].filter((r) => !(r.getAttribute('data-trace') || r.getAttribute('data-trace-up') || r.getAttribute('data-trace-down')));
      return { ok: missing.length === 0, detail: missing.length === 0 ? '전건' : `누락 ${missing.length}건` };
    },
    'constraints-assumptions': (doc) => {
      const c = doc.querySelectorAll('[data-chunk^="constraint:"]').length;
      const a = doc.querySelectorAll('[data-chunk^="assumption:"]').length;
      return { ok: c >= 1 && a >= 1, detail: `C:${c}/A:${a}` };
    },
    'ai-metadata': (doc) => {
      const required = ['doc-tags', 'doc-embedding-hints', 'doc-exclude-from-training'];
      const have = required.filter((n) => doc.querySelector(`meta[name="${n}"]`));
      return { ok: have.length === required.length, detail: `${have.length}/3` };
    },
    'id-format': (doc) => {
      const ids = [...doc.querySelectorAll('[data-req-id], [data-item-id]')].map((r) => r.getAttribute('data-req-id') || r.getAttribute('data-item-id'));
      const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
      const padded = ids.every((id) => /\d{2,}$/.test(id));
      const ok = dups.length === 0 && padded;
      return { ok, detail: dups.length > 0 ? `중복 ${dups.length}` : padded ? '정상' : 'pad 위반' };
    },
    // ───── 공통 ─────
    'chunks-min': (doc) => {
      const min = +(doc.body.dataset.minChunks || 3);
      const n = doc.querySelectorAll('main [data-chunk]').length;
      return { ok: n >= min, detail: `${n}/${min}` };
    },
    'trace-up-required': (doc) => {
      const items = doc.querySelectorAll('[data-item-id]');
      const miss = [...items].filter((r) => !r.getAttribute('data-trace-up'));
      return { ok: miss.length === 0, detail: miss.length === 0 ? '전건' : `누락 ${miss.length}` };
    },

    // ───── FLW ─────
    'flw-min-flows': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="flow:"]').length;
      return { ok: n >= 1, detail: `${n}/1` };
    },
    'flw-actors': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="actor:"]').length;
      return { ok: n >= 2, detail: `${n}/2` };
    },
    'flw-exception-min1': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="exception:"]').length;
      return { ok: n >= 1, detail: `${n}/1` };
    },

    // ───── SCR ─────
    'scr-min-screens': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="screen:"]').length;
      return { ok: n >= 1, detail: `${n}/1` };
    },
    'scr-fields-table': (doc) => {
      const n = doc.querySelectorAll('[data-table-key="screen-fields"] tbody tr').length;
      return { ok: n >= 1, detail: `${n} rows` };
    },
    'scr-actions-min1': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="action:"]').length;
      return { ok: n >= 1, detail: `${n}/1` };
    },

    // ───── ROLE ─────
    'role-min-roles': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="role:"]').length;
      return { ok: n >= 2, detail: `${n}/2` };
    },
    'role-permission-matrix': (doc) => {
      const n = doc.querySelectorAll('[data-table-key="permission-matrix"] tbody tr').length;
      return { ok: n >= 1, detail: `${n} rows` };
    },

    // ───── FUNC ─────
    'func-min': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="func:"]').length;
      return { ok: n >= 3, detail: `${n}/3` };
    },
    'func-signature': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="func:"] [data-field="signature"]').length;
      return { ok: n >= 1, detail: `${n}` };
    },

    // ───── UTC ─────
    'utc-min-cases': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="testcase:"]').length;
      return { ok: n >= 3, detail: `${n}/3` };
    },
    'utc-gwt': (doc) => {
      const cases = doc.querySelectorAll('[data-chunk^="testcase:"]');
      const ok = [...cases].every((c) => c.querySelector('[data-step="given"]') && c.querySelector('[data-step="when"]') && c.querySelector('[data-step="then"]'));
      return { ok, detail: ok ? '전건 G/W/T' : '미흡' };
    },

    // ───── ITS ─────
    'its-min-scenarios': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="scenario:"]').length;
      return { ok: n >= 2, detail: `${n}/2` };
    },
    'its-steps': (doc) => {
      const sc = doc.querySelectorAll('[data-chunk^="scenario:"]');
      const ok = [...sc].every((s) => s.querySelectorAll('[data-step]').length >= 2);
      return { ok, detail: ok ? '전건 ≥2 step' : '미흡' };
    },

    // ───── ARC ─────
    'arc-views': (doc) => {
      const required = ['logical', 'deployment', 'data', 'security'];
      const have = required.filter((v) => doc.querySelector(`section[data-section-key="${v}"]`));
      return { ok: have.length === required.length, detail: `${have.length}/4` };
    },

    // ───── OPM ─────
    'opm-procedures-min': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="procedure:"]').length;
      return { ok: n >= 3, detail: `${n}/3` };
    },
    'opm-incident-min1': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="incident:"]').length;
      return { ok: n >= 1, detail: `${n}/1` };
    },

    // ───── USM ─────
    'usm-tasks-min': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="task:"]').length;
      return { ok: n >= 3, detail: `${n}/3` };
    },

    // ───── CFG ─────
    'cfg-keys-min': (doc) => {
      const n = doc.querySelectorAll('[data-chunk^="config:"]').length;
      return { ok: n >= 3, detail: `${n}/3` };
    },
    'cfg-secret-marked': (doc) => {
      const cells = doc.querySelectorAll('[data-config-secret="true"]');
      const ok = [...cells].every((c) => c.querySelector('[data-pii="secret"]'));
      return { ok, detail: cells.length === 0 ? 'N/A' : ok ? '전건 마스킹' : '미흡' };
    },

    'project-id-prefix': (doc) => {
      const projectId = doc.querySelector('meta[name="project-id"]')?.getAttribute('content');
      if (!projectId) return { ok: false, detail: 'project-id 없음' };
      const ids = [...doc.querySelectorAll('[data-req-id], [data-item-id]')].map((r) => r.getAttribute('data-req-id') || r.getAttribute('data-item-id'));
      const violations = ids.filter((id) => !id.startsWith(projectId + '-'));
      return { ok: violations.length === 0, detail: violations.length === 0 ? projectId : `위반 ${violations.length}` };
    },
  };

  function paint(cell, ok, detail) {
    cell.textContent = ok ? `PASS · ${detail}` : `FAIL · ${detail}`;
    cell.classList.remove('ok', 'bad');
    cell.classList.add(ok ? 'ok' : 'bad');
  }

  function run() {
    const rows = document.querySelectorAll('tr[data-validate-rule]');
    let pass = 0, fail = 0;
    rows.forEach((row) => {
      const rule = row.getAttribute('data-validate-rule');
      const cell = row.querySelector('[data-validate-result]');
      if (!cell) return;
      const fn = RULES[rule];
      if (!fn) {
        paint(cell, false, `규칙 미정의: ${rule}`);
        fail++;
        return;
      }
      try {
        const { ok, detail } = fn(document);
        paint(cell, ok, detail);
        ok ? pass++ : fail++;
      } catch (e) {
        paint(cell, false, `오류: ${e.message}`);
        fail++;
      }
    });
    // 요약 표시 (선택)
    const summary = document.querySelector('[data-validate-summary]');
    if (summary) {
      summary.textContent = `${pass} PASS / ${fail} FAIL`;
      summary.classList.toggle('ok', fail === 0);
      summary.classList.toggle('bad', fail > 0);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
