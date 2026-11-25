/* Shared behaviour. Markup opts in with attributes:
   data-open="id"      opens the drawer or modal .overlay with that id; data-close closes it (Esc and the backdrop too)
   data-menu="id"      toggles the .menu or .popover with that id under its trigger
   data-toast="text"   shows a toast; data-busy shows a spinner on the button for a moment
   data-href="D403"    a row or card that opens an admin page (page id or a relative file)
   data-single         buttons inside are single select (aria-pressed); role="tablist" switches tab panels
   .table              sortable headers, row checkboxes with a .bulk-bar[data-for], column chooser (data-col)
   .search[data-filter="selector"]   filters the rows or [data-search-item] inside that element
   data-when="ready offline"         content shown in those demo states (body[data-state]) */
(() => {
  const { icon, esc } = ZXA.r;
  const EXIT_MS = 260;
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* ---------- leave on the spring, then hide ---------- */
  const leave = (el, done) => {
    if (!el || el.hidden || el.classList.contains('closing')) return;
    el.classList.add('closing');
    window.setTimeout(() => { el.hidden = true; el.classList.remove('closing'); done?.(); }, EXIT_MS);
  };

  /* ---------- overlays: drawers and modals ---------- */
  const openOverlay = (id) => {
    const overlay = document.getElementById(id);
    if (!overlay) throw new Error(`No overlay with id "${id}"`);
    overlay.hidden = false;
    overlay.querySelector('[autofocus]')?.focus();
    return overlay;
  };
  const closeOverlay = (overlay) => leave(overlay);

  /* ---------- menus and popovers, anchored under the trigger ---------- */
  let openMenu = null;
  const closeMenu = () => { if (openMenu) { leave(openMenu.menu); openMenu.trigger.setAttribute('aria-expanded', 'false'); openMenu = null; } };
  const placeMenu = (menu, trigger) => {
    const box = trigger.getBoundingClientRect();
    menu.style.top = `${box.bottom + 6}px`;
    const alignLeft = box.left + menu.offsetWidth < window.innerWidth - 12 && box.left < window.innerWidth / 2;
    menu.style.left = alignLeft ? `${box.left}px` : 'auto';
    menu.style.right = alignLeft ? 'auto' : `${window.innerWidth - box.right}px`;
    menu.style.setProperty('--origin', alignLeft ? 'top left' : 'top right');
  };
  const toggleMenu = (trigger) => {
    const menu = document.getElementById(trigger.dataset.menu);
    if (!menu) throw new Error(`No menu with id "${trigger.dataset.menu}"`);
    if (openMenu?.menu === menu) { closeMenu(); return; }
    closeMenu();
    if (menu.parentElement !== document.body) document.body.append(menu);
    menu.hidden = false;
    placeMenu(menu, trigger);
    trigger.setAttribute('aria-expanded', 'true');
    openMenu = { menu, trigger };
  };

  /* ---------- toast ---------- */
  const TOAST_MS = 3200;
  const toast = (text, kind = '') => {
    document.querySelector('.toast')?.remove();
    document.body.insertAdjacentHTML('beforeend',
      `<div class="toast ${kind}" role="status">${icon(kind === 'info' ? 'info' : 'check-circle')}${esc(text)}</div>`);
    const el = document.querySelector('.toast');
    window.setTimeout(() => el.classList.add('closing'), TOAST_MS);
    window.setTimeout(() => el.remove(), TOAST_MS + 300);
  };

  /* ---------- page links: data-href takes a page id (D403) or a file ---------- */
  const go = (target) => {
    if (/^D\d+/.test(target)) {
      const [id, query = ''] = target.split(/(?=\?)/);
      window.location.href = ZXA.isBuilt(id) ? ZXA.href(id, query) : `${ZXA.root}index.html#${id}`;
    } else window.location.href = target;
  };
  /* links written as href="#D403" resolve to the page file, so pages never hard code paths */
  $$('a[href^="#D"]').forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    link.href = ZXA.isBuilt(id.split('?')[0]) ? ZXA.href(...id.split(/(?=\?)/)) : `${ZXA.root}index.html#${id.split('?')[0]}`;
  });

  /* ---------- one click handler for the opt-in attributes ---------- */
  document.addEventListener('click', (event) => {
    const t = event.target;
    const hashLink = t.closest('a[href^="#D"]');
    if (hashLink) { event.preventDefault(); go(hashLink.getAttribute('href').slice(1)); return; }
    const menuTrigger = t.closest('[data-menu]');
    if (menuTrigger) { event.preventDefault(); toggleMenu(menuTrigger); return; }
    if (openMenu && !t.closest('.menu, .popover')) closeMenu();
    if (openMenu && t.closest('.menu button, .menu a')) closeMenu();

    const opener = t.closest('[data-open]');
    if (opener) { event.preventDefault(); openOverlay(opener.dataset.open); }
    const closer = t.closest('[data-close]');
    if (closer) { event.preventDefault(); closeOverlay(closer.closest('.overlay')); }
    if (t.classList.contains('overlay') && !t.hasAttribute('data-static')) closeOverlay(t);

    const toaster = t.closest('[data-toast]');
    if (toaster) toast(toaster.dataset.toast);
    const busy = t.closest('[data-busy]');
    if (busy) { busy.setAttribute('aria-busy', 'true'); window.setTimeout(() => busy.removeAttribute('aria-busy'), 900); }

    const single = t.closest('[data-single] > button');
    if (single) $$(':scope > button', single.parentElement).forEach((b) => b.setAttribute('aria-pressed', String(b === single)));

    const tab = t.closest('[role="tablist"] [role="tab"]');
    if (tab) selectTab(tab);

    const row = t.closest('[data-href]');
    if (row && !t.closest('a, button, input, label, select, textarea')) go(row.dataset.href);
    const drawerRow = t.closest('tr[data-drawer]');
    if (drawerRow && !t.closest('a, button, input, label')) {
      const overlay = openOverlay(drawerRow.dataset.drawer);
      overlay.dispatchEvent(new CustomEvent('zxa:row', { detail: drawerRow }));
    }

    const removeChip = t.closest('.chip.applied .x');
    if (removeChip) { removeChip.closest('.chip').remove(); toast('Filter removed', 'info'); }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (openMenu) { closeMenu(); return; }
    const overlays = $$('.overlay:not([hidden]):not([data-static])');
    closeOverlay(overlays.at(-1));
  });
  window.addEventListener('scroll', closeMenu, { passive: true });
  window.addEventListener('resize', closeMenu);

  /* ---------- tabs and segments ---------- */
  const placeThumb = (list) => {
    if (!list.classList.contains('segment')) return;
    const selected = list.querySelector('[aria-selected="true"]');
    let thumb = list.querySelector('.thumb-bg');
    if (!thumb) { thumb = document.createElement('span'); thumb.className = 'thumb-bg'; list.prepend(thumb); }
    if (selected) { thumb.style.left = `${selected.offsetLeft}px`; thumb.style.width = `${selected.offsetWidth}px`; }
  };
  const selectTab = (tab) => {
    const list = tab.closest('[role="tablist"]');
    $$('[role="tab"]', list).forEach((other) => {
      const selected = other === tab;
      other.setAttribute('aria-selected', String(selected));
      const panel = other.getAttribute('aria-controls');
      if (panel) document.getElementById(panel).hidden = !selected;
    });
    placeThumb(list);
  };
  $$('.segment[role="tablist"]').forEach((list) => requestAnimationFrame(() => placeThumb(list)));

  /* ---------- tables: sort, select with bulk bar, column chooser ---------- */
  const cellValue = (row, index) => {
    const cell = row.children[index];
    return cell?.dataset.sort ?? cell?.textContent.trim() ?? '';
  };
  $$('.table th.sortable').forEach((th) => {
    th.insertAdjacentHTML('beforeend', icon('arrow-up', 'sort'));
    th.addEventListener('click', () => {
      const table = th.closest('table');
      const index = [...th.parentElement.children].indexOf(th);
      const direction = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
      $$('th[aria-sort]', table).forEach((other) => other.removeAttribute('aria-sort'));
      th.setAttribute('aria-sort', direction);
      const body = table.tBodies[0];
      const rows = [...body.rows].sort((x, y) => cellValue(x, index).localeCompare(cellValue(y, index), 'en', { numeric: true }));
      if (direction === 'descending') rows.reverse();
      body.append(...rows);
    });
  });

  const syncSelection = (table) => {
    const boxes = $$('tbody .cb input', table);
    const checked = boxes.filter((b) => b.checked);
    boxes.forEach((b) => b.closest('tr').setAttribute('aria-selected', String(b.checked)));
    const all = table.querySelector('thead .cb input');
    if (all) { all.checked = checked.length === boxes.length && boxes.length > 0; all.indeterminate = checked.length > 0 && !all.checked; }
    const bar = document.querySelector(`.bulk-bar[data-for="${table.id}"]`);
    if (!bar) return;
    bar.querySelector('[data-count]').textContent = `${checked.length} selected`;
    if (checked.length && bar.hidden) bar.hidden = false;
    if (!checked.length) leave(bar);
  };
  document.addEventListener('change', (event) => {
    const box = event.target.closest('.table .cb input');
    if (!box) return;
    const table = box.closest('table');
    if (box.closest('thead')) $$('tbody .cb input', table).forEach((b) => { if (!b.closest('tr').hidden) b.checked = box.checked; });
    syncSelection(table);
  });
  document.addEventListener('click', (event) => {
    const clear = event.target.closest('.bulk-bar [data-clear]');
    if (!clear) return;
    const table = document.getElementById(clear.closest('.bulk-bar').dataset.for);
    $$('.cb input', table).forEach((b) => { b.checked = false; });
    syncSelection(table);
  });
  /* column chooser: a checkbox with data-col="3" and data-table="id" shows or hides that column */
  document.addEventListener('change', (event) => {
    const box = event.target.closest('input[data-col]');
    if (!box) return;
    const table = document.getElementById(box.dataset.table);
    const index = Number(box.dataset.col);
    $$('tr', table).forEach((row) => row.children[index]?.classList.toggle('col-hidden', !box.checked));
  });

  /* ---------- list search: after 2 characters and a 300 ms pause; spinner, then a clear button ---------- */
  const SEARCH_DELAY = 300;
  $$('.search[data-filter]').forEach((box) => {
    const input = box.querySelector('input');
    const target = document.querySelector(box.dataset.filter);
    if (!target) throw new Error(`Search target ${box.dataset.filter} not found`);
    const items = () => $$('[data-search-item], tbody > tr', target);
    const noResults = document.querySelector(box.dataset.empty || '[data-noresults]');
    let timer;
    const tail = document.createElement('span');
    tail.style.display = 'contents';
    input.after(tail);
    const apply = () => {
      const query = input.value.trim().toLowerCase();
      const active = query.length >= 2;
      let shown = 0;
      /* search-miss, not hidden: saved views and tabs own the hidden attribute */
      items().forEach((item) => {
        item.classList.toggle('search-miss', active && !item.textContent.toLowerCase().includes(query));
        if (!item.hidden && !item.classList.contains('search-miss')) shown += 1;
      });
      if (noResults) noResults.hidden = shown > 0;
      tail.innerHTML = input.value ? `<button class="search-clear" type="button" aria-label="Clear search">${icon('x')}</button>` : '';
    };
    input.addEventListener('input', () => {
      window.clearTimeout(timer);
      tail.innerHTML = input.value.trim().length >= 2 ? '<span class="search-spin" aria-label="Searching"></span>' : '';
      timer = window.setTimeout(apply, input.value.trim().length >= 2 ? SEARCH_DELAY : 0);
    });
    box.addEventListener('click', (event) => {
      if (!event.target.closest('.search-clear')) return;
      input.value = '';
      apply();
      input.focus();
    });
  });
  document.addEventListener('click', (event) => {
    const clear = event.target.closest('[data-clear-search]');
    if (!clear) return;
    $$('.search[data-filter] input').forEach((input) => { input.value = ''; input.dispatchEvent(new Event('input')); });
  });

  /* ---------- demo states (spec section 17: any page can be forced into a state) ----------
     A page marks content with data-when. The shell covers the states a page does not draw itself:
     offline and stale show a banner over the ready page, session opens the sign in again dialog,
     loading, slow and error get a generic block when the page has none. */
  const OVERLAY_STATES = ['offline', 'stale', 'session', 'sos'];
  const pageHas = (state) => $$('[data-when]').some((el) => el.dataset.when.split(' ').includes(state));
  const setState = (state) => {
    document.body.dataset.state = state;
    const drawn = OVERLAY_STATES.includes(state) && !pageHas(state) ? 'ready' : state;
    const fallback = ['loading', 'slow', 'error'].includes(drawn) && !pageHas(drawn === 'slow' ? 'loading' : drawn);
    $$('[data-when]').forEach((el) => {
      const states = el.dataset.when.split(' ');
      el.hidden = !(states.includes(drawn) || (drawn === 'slow' && states.includes('loading'))) || (fallback && states.includes('ready'));
    });
    /* no results: the list shows its own no matching results block */
    $$('[data-noresults]').forEach((block) => {
      block.hidden = state !== 'no-results';
      block.parentElement.classList.toggle('show-noresults', state === 'no-results');
    });
    document.querySelector('.state-fallback')?.remove();
    if (fallback) document.querySelector('.content').insertAdjacentHTML('beforeend', ZXA.fallbackState(drawn));
    $$('.content .btn-primary').forEach((b) => b.toggleAttribute('aria-disabled', state === 'offline'));
    ZXA.shellBanners?.(state);
    if (state === 'session' && document.getElementById('session-expired')) openOverlay('session-expired');
  };
  ZXA.fallbackState = (state) => (state === 'error'
    ? `<div class="card state-fallback"><div class="state page"><span class="disc red">${icon('warning-circle')}</span>
        <h3>Something went wrong</h3><p>We could not load this.</p>
        <div class="btns"><button class="btn btn-primary" type="button" data-busy>Try again</button><a class="btn btn-secondary" href="#D101">Go to dashboard</a></div>
        <p class="code mono">Request id 7f3a-91c2-4be0</p></div></div>`
    : `<div class="card pad state-fallback stack" aria-busy="true"><span class="sk sk-title"></span>
        ${'<span class="sk sk-line"></span>'.repeat(3)}<span class="sk sk-block"></span>${'<span class="sk sk-line"></span>'.repeat(2)}
        ${state === 'slow' ? `<p class="slow-note">${icon('clock')}Taking longer than usual</p>` : ''}</div>`);

  /* ---------- charts: Chart.js with the design tokens ---------- */
  const css = getComputedStyle(document.documentElement);
  ZXA.colors = { slate: css.getPropertyValue('--slate-800').trim(), blue: css.getPropertyValue('--blue').trim(),
    sky: css.getPropertyValue('--sky').trim(), green: css.getPropertyValue('--green').trim(), amber: css.getPropertyValue('--amber').trim(),
    red: css.getPropertyValue('--red').trim(), grid: 'rgba(24,34,45,.06)', muted: css.getPropertyValue('--slate-500').trim() };
  ZXA.chart = (canvas, config) => {
    if (!window.Chart) throw new Error('Chart.js is not loaded on this page');
    Chart.defaults.font.family = css.getPropertyValue('--font-body');
    Chart.defaults.font.size = 12;
    Chart.defaults.color = ZXA.colors.muted;
    const base = { responsive: true, maintainAspectRatio: false, animation: { duration: 700, easing: 'easeOutQuart' },
      plugins: { legend: { display: false }, tooltip: { backgroundColor: '#18222D', padding: 10, cornerRadius: 10, displayColors: false } },
      scales: { x: { grid: { display: false }, border: { display: false } },
        y: { grid: { color: ZXA.colors.grid }, border: { display: false }, beginAtZero: true, ticks: { maxTicksLimit: 5 } } } };
    const options = { ...base, ...config.options, plugins: { ...base.plugins, ...config.options?.plugins },
      scales: config.options?.scales === false ? {} : { x: { ...base.scales.x, ...config.options?.scales?.x }, y: { ...base.scales.y, ...config.options?.scales?.y } } };
    return new Chart(canvas, { ...config, options });
  };

  /* mobile screen previews: show only the phone, not the plate chrome around it (same origin) */
  const PLATE_ONLY = 'body.plate{display:block !important; padding:11px !important; background:transparent !important; min-height:0 !important}'
    + '.plate-label,.plate-states,.plate-info,.plate-note{display:none !important}';
  $$('.phone-preview iframe').forEach((frame) => frame.addEventListener('load', () => {
    const doc = frame.contentDocument;
    if (doc) doc.head.insertAdjacentHTML('beforeend', `<style>${PLATE_ONLY}</style>`);
  }));

  /* Skip validation (prototype panel): the browser's own required and pattern checks step aside too */
  const syncNoValidate = () => $$('form').forEach((form) => { form.noValidate = ZXA.demo.skipValidation(); });
  syncNoValidate();
  document.addEventListener('change', (event) => { if (event.target.matches('[data-skip-validation]')) syncNoValidate(); });

  ZXA.ui = { openOverlay, closeOverlay, toast, go, setState, leave };
  setState(ZXA.initialState || document.body.dataset.state || 'ready');

  /* select, date and time fields use the design system components in ../ds (see admin-ds.js); scripts run in order.
     The calendar's today and the time picker's now are the demo's Monday 23 Nov 2026, 12:00 IST. */
  window.DS = window.DS || {};
  window.DS.now = () => new Date(ZX.data.now);
  ['ds/popover.js', 'ds/scroll-area.js', 'ds/calendar.js', 'ds/date-picker.js', 'ds/time-picker.js', 'ds/select.js', 'js/admin-ds.js']
    .forEach((file) => {
      const script = document.createElement('script');
      script.src = `${ZXA.root}assets/${file}`;
      script.async = false;
      document.body.append(script);
    });
})();
