/* Draws the app shell around a page: sidebar, top bar (global search, Create, bell, help, system health),
   the banners across the top, and the prototype panel. A page is <body class="adm" data-page="D401">
   with a <main class="content">. data-nav on body picks the sidebar item when it is not the page's own. */
(() => {
  const { icon, esc, ago } = ZXA.r;
  const body = document.body;
  const pageId = body.dataset.page;
  const page = pageId ? ZXA.page(pageId) : null;
  const href = (id, query) => (ZXA.isBuilt(id) ? ZXA.href(id, query) : `${ZXA.root}index.html#${id}`);
  const a = ZXA.data;

  /* sidebar item for this page: data-nav, else the page itself, else the closest item before it in its module */
  const navIds = ZXA.nav.flatMap(([, items]) => items.map(([id]) => id));
  const activeNav = () => {
    if (body.dataset.nav) return body.dataset.nav;
    if (navIds.includes(pageId)) return pageId;
    const n = Number(pageId.slice(1));
    const sameModule = navIds.filter((id) => ZXA.page(id).module === page.module && Number(id.slice(1)) <= n);
    return sameModule.at(-1) ?? null;
  };

  const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage blocked: the default is fine */ } } };

  if (body.classList.contains('adm')) {
    const current = activeNav();
    if (store.get('zxa-collapsed') === '1') body.classList.add('collapsed');
    const count = (id) => {
      const c = a.navCounts[id];
      if (!c) return '';
      const [n, tone] = Array.isArray(c) ? c : [c, ''];
      return `<span class="count ${tone}">${n}</span>`;
    };
    const side = `<aside class="side" aria-label="Main">
      <div class="side-top"><a class="brand" href="${href('D101')}"><span class="logo"><img src="${ZXA.root}../assets/brand/zixom-logo.png" alt=""></span>
        <span><b>Admin</b><small>Zixom Connect</small></span></a>
      <button class="collapse" type="button" aria-label="Collapse sidebar" data-tip="Collapse">${icon('panel-left')}</button></div>
      <nav>${ZXA.nav.map(([group, items]) => `<div class="group"><span>${group}</span>
        ${items.map(([id, label, ic]) => `<a class="item" href="${href(id)}"${id === current ? ' aria-current="page"' : ''} data-tip="${label}">
          ${icon(ic)}<span>${label}</span>${count(id)}</a>`).join('')}</div>`).join('')}</nav>
      <a class="me" href="${href('D009')}"><span class="avatar dark">${a.admin.initials}</span>
        <span><b>${esc(a.admin.name)}</b><small>${a.admin.role} · ${a.admin.title}</small></span>${icon('caret-right')}</a>
    </aside>`;

    const unread = a.notifications.filter((n) => n.unread).length;
    const top = `<header class="top">
      <button class="icon-btn menu-btn" type="button" aria-label="Open menu">${icon('list')}</button>
      <div class="gsearch"><label class="search">${icon('magnifying-glass')}
        <input type="search" placeholder="Search tickets, customers, machines, invoices" aria-label="Search everything" autocomplete="off">
        <kbd>/</kbd></label></div>
      <span class="spacer"></span>
      <button class="health" type="button" data-menu="health-pop"><span class="dot ${a.health.state === 'green' ? '' : a.health.state}"></span><span>${a.health.label}</span></button>
      <a class="icon-btn" href="${href('D1644')}" aria-label="Help" data-tip="Help">${icon('question')}</a>
      <button class="icon-btn" type="button" aria-label="Notifications, ${unread} new" data-menu="bell-pop">${icon('bell')}<span class="badge">${unread}</span></button>
      <button class="btn btn-primary btn-sm" type="button" data-menu="create-menu">${icon('plus')}Create</button>
    </header>`;

    const content = document.querySelector('main.content');
    if (!content) throw new Error('Admin page needs <main class="content">');
    const main = document.createElement('div');
    main.className = 'main';
    content.before(main);
    main.innerHTML = `${top}<div class="shell-banners"></div>`;
    main.append(content);
    main.insertAdjacentHTML('beforebegin', side);

    const menus = `
    <div class="menu" id="create-menu" hidden>
      ${[['D402', 'New ticket', 'wrench'], ['D203', 'Customer', 'buildings'], ['D303', 'Machine', 'factory'], ['D1102', 'Lead', 'chart-line-up'],
        ['D1202', 'Quotation', 'file-text'], ['D902', 'Invoice', 'receipt'], ['D1302', 'Announcement', 'megaphone']]
        .map(([id, label, ic]) => `<a href="${href(id)}">${icon(ic)}${label}</a>`).join('')}
    </div>
    <div class="popover" id="bell-pop" hidden>
      <div class="popover-head"><h3>Notifications</h3><button class="btn btn-link" type="button" data-toast="All marked as read">Mark all read</button></div>
      <ul class="mini">${a.notifications.map((n) => `<li class="${n.unread ? 'unread' : ''}" data-href="${n.href}">
        <span class="ic-disc ${n.tone}">${icon(n.icon)}</span><span class="grow"><b>${esc(n.title)}</b><small>${esc(n.sub)}</small></span>
        <span class="end">${ago(n.when)}</span></li>`).join('')}</ul>
      <div class="popover-foot"><a href="${href('D106')}">See all notifications</a></div>
    </div>
    <div class="popover" id="health-pop" hidden>
      <div class="popover-head"><h3>System health</h3></div>
      <ul class="mini">${[['Razorpay', 'Live, last webhook 4 min ago'], ['IndiaMART', 'Last enquiry 2 h ago'], ['Push (Firebase)', 'Delivering'],
        ['Email', 'Delivering'], ['SMS (OTP)', 'Delivering'], ['Backups', 'Last run 2:00 AM']]
        .map(([name, sub]) => `<li><span class="dot"></span><span class="grow"><b>${name}</b><small>${sub}</small></span></li>`).join('')}</ul>
      <div class="popover-foot"><a href="${href('D103')}">Open alerts and system health</a></div>
    </div>
    <div class="overlay center" id="session-expired" data-static hidden>
      <div class="modal" role="alertdialog" aria-labelledby="session-title">
        <div class="modal-head"><span class="disc">${icon('lock-simple')}</span><div class="grow"><h2 id="session-title">Your session ended</h2>
          <p>Sign in again to continue. Your changes on this page are saved.</p></div></div>
        <div class="modal-foot"><a class="btn btn-primary" href="${href('D001')}">Sign in</a></div>
      </div>
    </div>`;
    body.insertAdjacentHTML('beforeend', menus);

    body.querySelector('.side .collapse').addEventListener('click', () => {
      body.classList.toggle('collapsed');
      store.set('zxa-collapsed', body.classList.contains('collapsed') ? '1' : '0');
    });
    body.querySelector('.top .menu-btn').addEventListener('click', () => body.classList.add('side-open'));
    document.addEventListener('click', (event) => {
      if (body.classList.contains('side-open') && !event.target.closest('.side, .menu-btn')) body.classList.remove('side-open');
    });
    const topBar = body.querySelector('.top');
    const onScroll = () => topBar.classList.toggle('scrolled', window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- global search: results as you type, Enter opens the full results page (D105) ---------- */
    const input = topBar.querySelector('.gsearch input');
    const results = document.createElement('div');
    results.className = 'menu cmd';
    results.hidden = true;
    body.append(results);
    const pages = ZXA.nav.flatMap(([, items]) => items.map(([id, label, ic]) => ({ id, label, ic })));
    const records = [
      ...ZXA.r.tickets.map((t) => ({ id: 'D403', label: t.number, sub: ZXA.r.machine(t.machine).model, ic: 'wrench', mono: true })),
      ...ZX.data.companies.map((c) => ({ id: 'D202', label: c.name, sub: c.code, ic: 'buildings' })),
      ...ZXA.r.machines.map((m) => ({ id: 'D302', label: m.serial, sub: m.model, ic: 'factory', mono: true })),
      ...ZX.data.invoices.map((i) => ({ id: 'D903', label: i.number, sub: i.title, ic: 'receipt', mono: true })),
      ...ZX.data.users.map((u) => ({ id: 'D202', label: u.name, sub: u.designation, ic: 'user' })),
    ];
    const renderResults = () => {
      const q = input.value.trim().toLowerCase();
      const pageHits = pages.filter((p) => !q || p.label.toLowerCase().includes(q)).slice(0, q ? 4 : 5);
      const recordHits = q.length >= 2 ? records.filter((r) => `${r.label} ${r.sub}`.toLowerCase().includes(q)).slice(0, 7) : [];
      const row = (r) => `<a href="${href(r.id)}">${icon(r.ic)}<span class="${r.mono ? 'mono' : ''}">${esc(r.label)}</span>${r.sub ? `<small>${esc(r.sub)}</small>` : ''}</a>`;
      results.innerHTML = `${recordHits.length ? `<div class="label">Records</div>${recordHits.map(row).join('')}` : ''}
        ${q.length >= 2 && !recordHits.length ? `<div class="label">No records match "${esc(q)}"</div>` : ''}
        ${pageHits.length ? `<div class="label">${q ? 'Pages' : 'Go to'}</div>${pageHits.map(row).join('')}` : ''}
        <div class="cmd-foot"><span><kbd>Enter</kbd> all results</span><span><kbd>Esc</kbd> close</span></div>`;
      const box = input.closest('.search').getBoundingClientRect();
      results.style.top = `${box.bottom + 6}px`;
      results.style.left = `${box.left}px`;
      results.style.width = `${Math.max(box.width, 420)}px`;
      results.hidden = false;
    };
    input.addEventListener('focus', renderResults);
    input.addEventListener('input', renderResults);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && input.value.trim().length >= 2) window.location.href = href('D105', `?q=${encodeURIComponent(input.value.trim())}`);
      if (event.key === 'Escape') { input.blur(); results.hidden = true; }
    });
    document.addEventListener('click', (event) => { if (!event.target.closest('.gsearch, .cmd')) results.hidden = true; });
    document.addEventListener('keydown', (event) => {
      if (event.key === '/' && !event.target.closest('input, textarea, select, [contenteditable]')) { event.preventDefault(); input.focus(); }
    });
  }

  /* ---------- banners across the top for demo states ---------- */
  ZXA.shellBanners = (state) => {
    const holder = document.querySelector('.shell-banners');
    if (!holder) return;
    const BANNERS = {
      offline: `<div class="banner dark center">${icon('wifi-slash')}<span class="grow"><b>You are offline.</b> Changes will not be saved until you are back online.</span>
        <span class="btns"><button class="btn btn-sm btn-secondary" type="button" data-busy>Try again</button></span></div>`,
      stale: `<div class="banner amber center">${icon('arrows-clockwise')}<span class="grow"><b>This record changed.</b> Another Admin saved changes a moment ago.</span>
        <span class="btns"><button class="btn btn-sm btn-secondary" type="button" data-toast="Showing both versions">Compare</button>
        <button class="btn btn-sm btn-primary" type="button" data-toast="Reloaded">Reload</button></span></div>`,
      sos: `<div class="sos-bar" role="alert">${icon('siren')}SOS from Sandeep Yadav at 11:52 AM · Vatva plant
        <a class="btn btn-sm btn-secondary" href="${href('D730')}">Open</a></div>`,
    };
    holder.innerHTML = BANNERS[state] ?? '';
  };

  /* ---------- prototype panel: demo states, notes, matching mobile screen. Not part of the product ---------- */
  const source = document.querySelector('aside.proto');
  const GLOBAL_STATES = ['offline', 'slow', 'stale', 'session'];
  const LABELS = { ready: 'Ready', loading: 'Loading', empty: 'Empty', error: 'Error', offline: 'Offline', slow: 'Slow network',
    stale: 'Stale data', session: 'Session expired', partial: 'Partial error', sos: 'SOS', 'no-results': 'No results' };
  const own = (source?.dataset.states || 'ready loading error').split(' ');
  const states = [...new Set([...own, ...(source?.dataset.global === 'none' ? [] : GLOBAL_STATES)])];
  const label = (s) => LABELS[s] ?? s.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
  const initial = body.dataset.state || 'ready';

  body.insertAdjacentHTML('beforeend', `
    <button class="proto-fab" type="button" aria-expanded="false">${icon('sticky-note')}Prototype<span class="state-now">${label(initial)}</span></button>
    <section class="proto-panel" hidden aria-label="Prototype panel">
      <header><b>${page ? `${page.id} ${esc(page.name)}` : 'Prototype'}<small>${page ? esc(ZXA.modules.find((m) => m.key === page.module).title) : ''}</small></b>
        <button class="icon-btn sm" type="button" data-proto-close aria-label="Close">${icon('x')}</button></header>
      <div class="body">
        <div><h4>Demo state</h4><div class="proto-states">${states.map((s) => `<button type="button" data-proto-state="${s}" aria-pressed="${s === initial}">${label(s)}</button>`).join('')}</div></div>
        ${source?.dataset.mobile ? `<a class="proto-mobile" href="${source.dataset.mobile}">${icon('device-mobile')}<span class="grow">Matching app screen</span>${icon('external-link')}</a>` : ''}
        <div class="proto-notes">${source ? source.innerHTML : ''}</div>
        <a class="proto-mobile" href="${ZXA.root}index.html">${icon('squares-four')}<span class="grow">Screen map</span></a>
      </div>
    </section>`);
  const fab = body.querySelector('.proto-fab');
  const panel = body.querySelector('.proto-panel');
  fab.addEventListener('click', () => {
    if (panel.hidden) { panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); } else ZXA.ui.leave(panel);
  });
  panel.addEventListener('click', (event) => {
    if (event.target.closest('[data-proto-close]')) ZXA.ui.leave(panel);
    const button = event.target.closest('[data-proto-state]');
    if (!button) return;
    panel.querySelectorAll('[data-proto-state]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    fab.querySelector('.state-now').textContent = label(button.dataset.protoState);
    ZXA.ui.setState(button.dataset.protoState);
  });
  ZXA.initialState = initial;
})();
