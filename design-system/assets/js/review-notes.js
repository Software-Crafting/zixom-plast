/* Review notes: prototype only, never build this.
   During a client demo, write down what the client wants changed on the page you are on. Every page (mobile screen,
   admin page, screen map) has its own notes, saved in this browser's localStorage under one key, so nothing is sent
   anywhere. "All notes" lists every page with notes, links to it, and copies or downloads them as Markdown.
   Loaded by assets/js/ui.js (mobile) and admin/assets/js/admin-ui.js (admin). Self-contained: its own styles. */
(() => {
  if (window.ZXNotes) return;
  const KEY = 'zx-review-notes';
  const ROOT_MARK = /\/(screens|admin)\//;

  /* ---------- storage: { [page]: { title, notes: [{ id, text, done, created, updated }] } } ---------- */
  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
  };
  let storageOk = true;
  const write = (all) => {
    try { localStorage.setItem(KEY, JSON.stringify(all)); storageOk = true; } catch { storageOk = false; }
  };
  /* the page key is the path from the prototype root, so it is the same on file://, localhost and GitHub Pages */
  const pageKey = (() => {
    const path = decodeURIComponent(location.pathname);
    const match = path.match(ROOT_MARK);
    if (match) return path.slice(match.index + 1);
    return path.split('/').pop() || 'index.html';
  })();
  const pageTitle = () => (document.title || pageKey).replace(/^Zixom (Connect|Admin) - /, '');
  const notesOf = (all) => all[pageKey]?.notes ?? [];
  const save = (notes) => {
    const all = read();
    if (notes.length) all[pageKey] = { title: pageTitle(), notes };
    else delete all[pageKey];
    write(all);
  };
  const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const when = (iso) => new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

  /* ---------- styles, scoped to .rn- ---------- */
  const css = `
  .rn-fab{position:fixed; z-index:74; right:20px; bottom:20px; display:flex; align-items:center; gap:8px; height:40px; padding:0 14px 0 12px;
    border:0; border-radius:999px; background:#fff; color:#18222D; box-shadow:inset 0 0 0 1px rgba(24,34,45,.14), 0 10px 24px -14px rgba(24,34,45,.35);
    font:400 14px "Varela Round", Inter, system-ui, sans-serif; cursor:pointer; transition:transform .4s cubic-bezier(.3,1.4,.5,1)}
  .rn-fab:active{transform:scale(.95)}
  .rn-fab svg{width:18px; height:18px}
  .rn-fab b{min-width:20px; height:20px; padding:0 6px; display:grid; place-items:center; border-radius:999px; background:#C23B3B; color:#fff;
    font:700 11px Inter, system-ui, sans-serif}
  .rn-fab b[hidden]{display:none}
  body:has(.proto-fab) .rn-fab{right:auto; left:20px}
  body.plate .rn-fab{bottom:20px}
  .rn-panel{position:fixed; z-index:96; right:20px; bottom:72px; width:380px; max-width:calc(100vw - 16px); max-height:calc(100vh - 96px);
    display:flex; flex-direction:column; border-radius:20px; background:#fff; color:#18222D;
    box-shadow:inset 0 0 0 1px rgba(24,34,45,.1), 0 24px 48px -20px rgba(18,24,31,.45); font:400 14px/1.45 Inter, system-ui, sans-serif;
    transform-origin:bottom right; animation:rn-in .4s cubic-bezier(.3,1.3,.5,1) both}
  body:has(.proto-fab) .rn-panel{right:auto; left:20px; transform-origin:bottom left}
  @media (min-width:1101px){body.adm .rn-fab, body.adm .rn-panel{left:calc(var(--side, 0px) + 20px)}}
  .rn-panel[hidden]{display:none}
  .rn-panel.rn-closing{animation:rn-out .16s ease-in both}
  .rn-head{display:flex; align-items:flex-start; gap:8px; padding:16px 14px 10px 18px}
  .rn-head div{flex:1; min-width:0}
  .rn-head h2{margin:0; font:400 17px "Varela Round", Inter, system-ui, sans-serif}
  .rn-head p{margin:2px 0 0; font-size:12px; color:#76818C; white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
  .rn-x, .rn-icon{width:30px; height:30px; flex-shrink:0; display:grid; place-items:center; border:0; border-radius:50%; background:none; color:#55626F; cursor:pointer}
  .rn-x:hover, .rn-icon:hover{background:rgba(24,34,45,.06); color:#18222D}
  .rn-x svg, .rn-icon svg{width:16px; height:16px}
  .rn-new{padding:0 14px 12px}
  .rn-new textarea, .rn-edit{width:100%; min-height:72px; resize:vertical; padding:10px 12px; border:0; border-radius:12px; background:#F6F7F9;
    box-shadow:inset 0 0 0 1px rgba(24,34,45,.12); font:inherit; color:inherit; box-sizing:border-box}
  .rn-new textarea:focus, .rn-edit:focus{outline:0; background:#fff; box-shadow:inset 0 0 0 1.5px #4064D7, 0 0 0 4px #EFF3FD}
  .rn-row{display:flex; align-items:center; gap:8px; margin-top:8px; font-size:12px; color:#76818C}
  .rn-row span{flex:1}
  .rn-btn{height:32px; padding:0 14px; border:0; border-radius:999px; background:#263442; color:#fff; font:400 13px "Varela Round", Inter, sans-serif; cursor:pointer}
  .rn-btn.ghost{background:none; color:#364553}
  .rn-btn.ghost:hover{background:rgba(24,34,45,.06)}
  .rn-btn.danger{background:none; color:#C23B3B}
  .rn-btn:disabled{opacity:.4; cursor:default}
  .rn-list{flex:1; overflow-y:auto; margin:0; padding:0 8px 8px; list-style:none}
  .rn-item{display:grid; grid-template-columns:22px 1fr auto; gap:8px; padding:10px 8px; border-top:1px solid rgba(24,34,45,.08)}
  .rn-item input[type=checkbox]{width:16px; height:16px; margin:2px 0 0; accent-color:#263442; cursor:pointer}
  .rn-item p{margin:0; white-space:pre-wrap; overflow-wrap:anywhere}
  .rn-item.done p{color:#A0A9B2; text-decoration:line-through}
  .rn-item small{display:block; margin-top:2px; font-size:11px; color:#A0A9B2}
  .rn-item .rn-acts{display:flex; gap:2px; opacity:.5}
  .rn-item:hover .rn-acts, .rn-item:focus-within .rn-acts{opacity:1}
  .rn-empty{padding:18px; text-align:center; font-size:13px; color:#76818C}
  .rn-foot{display:flex; align-items:center; gap:6px; padding:10px 12px; border-top:1px solid rgba(24,34,45,.08)}
  .rn-foot span{flex:1}
  .rn-page{padding:10px 8px; border-top:1px solid rgba(24,34,45,.08)}
  .rn-page a{font-weight:600; color:#4064D7; text-decoration:none}
  .rn-page a:hover{text-decoration:underline}
  .rn-page ul{margin:6px 0 0; padding-left:18px}
  .rn-page li{margin-top:3px; white-space:pre-wrap; overflow-wrap:anywhere}
  .rn-page li.done{color:#A0A9B2; text-decoration:line-through}
  .rn-warn{margin:0 14px 10px; padding:8px 10px; border-radius:10px; background:#FDF2DF; color:#A86400; font-size:12px}
  @keyframes rn-in{from{opacity:0; transform:scale(.94) translateY(6px)}}
  @keyframes rn-out{to{opacity:0; transform:scale(.97)}}
  @media (max-width:640px){
    .rn-fab{right:auto; left:12px; bottom:12px; height:38px}
    .rn-fab span{display:none}
    .rn-panel, body:has(.proto-fab) .rn-panel{left:8px; right:8px; width:auto; bottom:60px}
  }
  @media print{.rn-fab, .rn-panel{display:none !important}}
  @media (prefers-reduced-motion:reduce){.rn-fab, .rn-panel{animation:none !important; transition:none !important}}`;

  const ICON = {
    note: '<path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
  };
  const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;

  const mount = () => {
    document.head.insertAdjacentHTML('beforeend', `<style id="rn-style">${css}</style>`);
    document.body.insertAdjacentHTML('beforeend', `
      <button class="rn-fab" type="button" aria-expanded="false" aria-controls="rn-panel" title="Review notes (Alt+N)">${svg('note')}<span>Notes</span><b hidden></b></button>
      <section class="rn-panel" id="rn-panel" aria-label="Review notes" hidden></section>`);
    const fab = document.querySelector('.rn-fab');
    const panel = document.getElementById('rn-panel');
    let view = 'page';
    let editing = null;

    const count = () => notesOf(read()).filter((n) => !n.done).length;
    const badge = () => {
      const n = count();
      const b = fab.querySelector('b');
      b.hidden = !n;
      b.textContent = n;
      fab.setAttribute('aria-label', `Review notes${n ? `, ${n} open` : ''}`);
    };

    const pageView = () => {
      const notes = notesOf(read());
      panel.innerHTML = `
        <div class="rn-head"><div><h2>Notes for this page</h2><p title="${esc(pageKey)}">${esc(pageTitle())}</p></div>
          <button class="rn-icon" type="button" data-rn="all" aria-label="All notes" title="All notes">${svg('list')}</button>
          <button class="rn-x" type="button" data-rn="close" aria-label="Close">${svg('x')}</button></div>
        ${storageOk ? '' : '<p class="rn-warn">This browser is not saving notes (private window or storage blocked). Copy them before closing.</p>'}
        <div class="rn-new"><textarea id="rn-text" placeholder="What did the client point out on this page?" aria-label="New note"></textarea>
          <div class="rn-row"><span>Enter to save · Shift+Enter for a new line</span><button class="rn-btn" type="button" data-rn="add">Save note</button></div></div>
        <ul class="rn-list">${notes.length ? notes.map((n) => (editing === n.id
          ? `<li class="rn-item" data-id="${n.id}"><span></span><div><textarea class="rn-edit" aria-label="Edit note">${esc(n.text)}</textarea>
              <div class="rn-row"><span></span><button class="rn-btn ghost" type="button" data-rn="cancel">Cancel</button><button class="rn-btn" type="button" data-rn="update">Save</button></div></div><span></span></li>`
          : `<li class="rn-item${n.done ? ' done' : ''}" data-id="${n.id}"><input type="checkbox" ${n.done ? 'checked' : ''} aria-label="Done" data-rn="done">
              <div><p>${esc(n.text)}</p><small>${when(n.updated || n.created)}${n.updated ? ', edited' : ''}</small></div>
              <span class="rn-acts"><button class="rn-icon" type="button" data-rn="edit" aria-label="Edit">${svg('edit')}</button>
              <button class="rn-icon" type="button" data-rn="delete" aria-label="Delete">${svg('trash')}</button></span></li>`)).join('')
          : '<li class="rn-empty">No notes on this page yet.</li>'}</ul>`;
      badge();
    };

    const allView = () => {
      const all = read();
      const pages = Object.entries(all).filter(([, p]) => p.notes?.length);
      const total = pages.reduce((sum, [, p]) => sum + p.notes.length, 0);
      const base = location.href.slice(0, location.href.length - (decodeURIComponent(location.pathname).endsWith(pageKey) ? encodeURI(pageKey).length : 0));
      panel.innerHTML = `
        <div class="rn-head"><button class="rn-icon" type="button" data-rn="page" aria-label="Back to this page">${svg('back')}</button>
          <div><h2>All notes</h2><p>${total} ${total === 1 ? 'note' : 'notes'} on ${pages.length} ${pages.length === 1 ? 'page' : 'pages'}</p></div>
          <button class="rn-x" type="button" data-rn="close" aria-label="Close">${svg('x')}</button></div>
        <div class="rn-list">${pages.length ? pages.sort(([a], [b]) => a.localeCompare(b)).map(([key, p]) => `
          <div class="rn-page"><a href="${esc(base + key)}">${esc(p.title)}</a> <small style="color:#A0A9B2">${esc(key)}</small>
            <ul>${p.notes.map((n) => `<li class="${n.done ? 'done' : ''}">${esc(n.text)}</li>`).join('')}</ul></div>`).join('')
          : '<p class="rn-empty">No notes yet.</p>'}</div>
        <div class="rn-foot"><button class="rn-btn danger" type="button" data-rn="clear" ${total ? '' : 'disabled'}>Clear all</button><span></span>
          <button class="rn-btn ghost" type="button" data-rn="copy" ${total ? '' : 'disabled'}>Copy</button>
          <button class="rn-btn" type="button" data-rn="download" ${total ? '' : 'disabled'}>Download</button></div>`;
    };

    const render = () => (view === 'all' ? allView() : pageView());
    const markdown = () => {
      const pages = Object.entries(read()).filter(([, p]) => p.notes?.length).sort(([a], [b]) => a.localeCompare(b));
      const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      return `# Client review notes, ${date}\n\n${pages.map(([key, p]) => `## ${p.title}\n\`${key}\`\n\n${p.notes.map((n) => `- [${n.done ? 'x' : ' '}] ${n.text.replace(/\n/g, '\n  ')}`).join('\n')}`).join('\n\n')}\n`;
    };

    const open = () => { view = 'page'; render(); panel.hidden = false; fab.setAttribute('aria-expanded', 'true'); panel.querySelector('#rn-text')?.focus(); };
    const close = () => {
      if (panel.hidden) return;
      panel.classList.add('rn-closing');
      fab.setAttribute('aria-expanded', 'false');
      setTimeout(() => { panel.hidden = true; panel.classList.remove('rn-closing'); }, 160);
    };
    const add = () => {
      const box = panel.querySelector('#rn-text');
      const text = box.value.trim();
      if (!text) { box.focus(); return; }
      save([...notesOf(read()), { id: uid(), text, done: false, created: new Date().toISOString() }]);
      pageView();
      panel.querySelector('#rn-text').focus();
    };
    const change = (id, fn) => save(notesOf(read()).flatMap((n) => (n.id === id ? fn(n) : [n])));

    fab.addEventListener('click', () => (panel.hidden ? open() : close()));
    panel.addEventListener('click', (event) => {
      const act = event.target.closest('[data-rn]')?.dataset.rn;
      if (!act) return;
      const id = event.target.closest('[data-id]')?.dataset.id;
      if (act === 'close') close();
      if (act === 'add') add();
      if (act === 'all') { view = 'all'; render(); }
      if (act === 'page') { view = 'page'; render(); }
      if (act === 'edit') { editing = id; pageView(); panel.querySelector('.rn-edit')?.focus(); }
      if (act === 'cancel') { editing = null; pageView(); }
      if (act === 'update') {
        const text = panel.querySelector('.rn-edit').value.trim();
        change(id, (n) => (text ? [{ ...n, text, updated: new Date().toISOString() }] : []));
        editing = null;
        pageView();
      }
      if (act === 'delete') { change(id, () => []); pageView(); }
      if (act === 'copy') navigator.clipboard?.writeText(markdown()).then(() => { event.target.textContent = 'Copied'; });
      if (act === 'download') {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([markdown()], { type: 'text/markdown' }));
        link.download = `client-review-notes-${new Date().toISOString().slice(0, 10)}.md`;
        link.click();
        URL.revokeObjectURL(link.href);
      }
      if (act === 'clear' && window.confirm('Delete every note on every page? This cannot be undone.')) { write({}); render(); badge(); }
    });
    panel.addEventListener('change', (event) => {
      if (event.target.dataset.rn !== 'done') return;
      change(event.target.closest('[data-id]').dataset.id, (n) => [{ ...n, done: event.target.checked }]);
      pageView();
    });
    panel.addEventListener('keydown', (event) => {
      event.stopPropagation();
      if (event.key === 'Escape') { close(); fab.focus(); }
      if (event.key === 'Enter' && !event.shiftKey && event.target.id === 'rn-text') { event.preventDefault(); add(); }
    });
    document.addEventListener('keydown', (event) => {
      if (event.altKey && (event.key === 'n' || event.key === 'N' || event.code === 'KeyN')) { event.preventDefault(); panel.hidden ? open() : close(); }
    });
    document.addEventListener('pointerdown', (event) => { if (!panel.hidden && !panel.contains(event.target) && !fab.contains(event.target)) close(); });
    /* another tab added notes: keep the badge and lists current */
    window.addEventListener('storage', (event) => { if (event.key === KEY) { badge(); if (!panel.hidden) render(); } });
    badge();
  };

  window.ZXNotes = { pageKey, read };
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
