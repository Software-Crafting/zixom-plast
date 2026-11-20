/* Shared prototype behaviour. Markup opts in with data attributes:
   data-open="id"        opens the overlay with that id, data-close closes it
   data-toast="text"     shows a 3 second toast inside the phone
   data-busy             shows the busy spinner on a button for a moment
   data-single           container whose buttons are single select (aria-pressed)
   role="tablist"        segmented control (aria-selected), role="radiogroup" choice cards
   .stepper              quantity stepper, 1 to 99
   .plate-states         prototype switch that sets data-state on .screen */
(() => {
  const { icon } = ZX.render;
  const TOAST_MS = 3000;
  const BUSY_MS = 900;

  /* ---------- tab bars ---------- */
  const TABS = {
    customer: [
      ['home', 'Home', 'house', 'C101-home.html'],
      ['machines', 'Machines', 'factory', 'C201-machines.html'],
      ['support', 'Support', 'headset', 'C501-support.html'],
      ['payments', 'Payments', 'wallet', 'C801-payments.html'],
      ['more', 'More', 'squares-four', 'C1101-more.html'],
    ],
    engineer: [
      ['today', 'Today', 'calendar-check', 'E101-today.html'],
      ['jobs', 'Jobs', 'clipboard-text', 'E201-jobs.html'],
      ['machines', 'Machines', 'factory', 'E303-find-machine.html'],
      ['inbox', 'Inbox', 'tray', 'E801-inbox.html'],
      ['profile', 'Profile', 'user-circle', 'E802-profile.html'],
    ],
  };
  document.querySelectorAll('.tabbar[data-tabs]').forEach((bar) => {
    const linkPrefix = bar.dataset.prefix ?? '';
    bar.setAttribute('aria-label', 'Main');
    bar.innerHTML = TABS[bar.dataset.tabs].map(([key, label, iconName, href]) => {
      const current = key === bar.dataset.active;
      return `<a class="tab" href="${current ? '#' : linkPrefix + href}" aria-label="${label}"${current ? ' aria-current="page"' : ''}>
        ${current ? `<span class="disc">${icon(iconName)}</span>` : icon(iconName)}<span class="label">${label}</span></a>`;
    }).join('');
  });

  /* ---------- overlays: alert, action sheet, bottom sheet ---------- */
  /* leave on the spring, then hide (motion.css animates .closing) */
  const EXIT_MS = 330;
  const close = (overlay) => {
    if (!overlay || overlay.hidden || overlay.classList.contains('closing')) return;
    overlay.classList.add('closing');
    window.setTimeout(() => { overlay.hidden = true; overlay.classList.remove('closing'); }, EXIT_MS);
  };
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open]');
    if (opener) {
      event.preventDefault();
      document.getElementById(opener.dataset.open).hidden = false;
      return;
    }
    const closer = event.target.closest('[data-close]');
    if (closer) {
      event.preventDefault();
      close(closer.closest('.overlay'));
      return;
    }
    /* a bottom sheet or action sheet closes on the backdrop, an alert needs an answer */
    if (event.target.classList.contains('overlay') && event.target.classList.contains('bottom')) close(event.target);
  });

  /* ---------- toast ---------- */
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-toast]');
    if (!trigger) return;
    const device = trigger.closest('.device') || document.querySelector('.device');
    device.querySelector('.toast')?.remove();
    device.insertAdjacentHTML('beforeend', `<div class="toast" role="status">${icon('check-circle')}${ZX.render.esc(trigger.dataset.toast)}</div>`);
    const toast = device.querySelector('.toast');
    window.setTimeout(() => toast.classList.add('closing'), TOAST_MS);
    window.setTimeout(() => toast.remove(), TOAST_MS + 330);
  });

  /* ---------- busy button ---------- */
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-busy]');
    if (!button) return;
    button.setAttribute('aria-busy', 'true');
    window.setTimeout(() => button.removeAttribute('aria-busy'), BUSY_MS);
  });

  /* ---------- segmented control thumb: motion.css slides it to the selected option ---------- */
  const placeThumb = (segment) => {
    if (!segment.classList.contains('segment')) return;
    const options = [...segment.children];
    segment.style.setProperty('--n', options.length);
    segment.style.setProperty('--i', Math.max(0, options.findIndex((o) => o.getAttribute('aria-selected') === 'true')));
  };
  document.querySelectorAll('.segment').forEach((segment) => {
    placeThumb(segment);
    requestAnimationFrame(() => segment.classList.add('ready'));
  });

  /* ---------- single select groups, segments, choice cards ---------- */
  document.addEventListener('click', (event) => {
    const pressed = event.target.closest('[data-single] > button:not(:disabled)');
    if (pressed) {
      pressed.parentElement.querySelectorAll(':scope > button').forEach((b) => b.setAttribute('aria-pressed', String(b === pressed)));
    }
    const tab = event.target.closest('[role="tablist"] > [role="tab"]');
    if (tab) {
      tab.parentElement.querySelectorAll('[role="tab"]').forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        const panel = t.getAttribute('aria-controls') && document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
        if (panel && selected) { panel.classList.remove('panel-in'); void panel.offsetWidth; panel.classList.add('panel-in'); }
      });
      placeThumb(tab.parentElement);
    }
    const choice = event.target.closest('[role="radiogroup"] > [role="radio"]:not(:disabled)');
    if (choice) {
      choice.parentElement.querySelectorAll('[role="radio"]').forEach((c) => c.setAttribute('aria-checked', String(c === choice)));
    }
  });

  /* ---------- quantity stepper ---------- */
  const MIN_QTY = 1;
  const MAX_QTY = 99;
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.stepper button');
    if (!button) return;
    const output = button.parentElement.querySelector('output');
    const next = Math.min(MAX_QTY, Math.max(MIN_QTY, Number(output.value) + Number(button.dataset.step)));
    output.value = next;
    output.textContent = next;
  });

  /* ---------- upload rows: pause, resume, retry, remove (prototype behaviour) ---------- */
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.file [data-file]');
    if (!button) return;
    const file = button.closest('.file');
    const meta = file.querySelector('.file-meta');
    const actions = file.querySelector('.actions');
    const action = button.dataset.file;
    if (action === 'remove') { file.remove(); return; }
    const set = (status, text, buttons) => {
      file.dataset.status = status;
      meta.innerHTML = text;
      actions.innerHTML = buttons;
    };
    const pause = `<button class="icon-btn" type="button" data-file="pause" aria-label="Pause">${icon('pause')}</button>`;
    const resume = `<button class="icon-btn" type="button" data-file="resume" aria-label="Resume">${icon('play')}</button>`;
    const remove = `<button class="icon-btn" type="button" data-file="remove" aria-label="Remove">${icon('x')}</button>`;
    if (action === 'pause') set('paused', `Paused at ${file.dataset.progress || 40}%`, resume + remove);
    if (action === 'resume' || action === 'retry') {
      set('uploading', 'Uploading', pause + remove);
      const bar = file.querySelector('.progress i');
      let progress = Number(file.dataset.progress || 40);
      const tick = window.setInterval(() => {
        if (file.dataset.status !== 'uploading') { window.clearInterval(tick); return; }
        progress = Math.min(100, progress + 12);
        file.dataset.progress = progress;
        if (bar) bar.style.width = `${progress}%`;
        meta.textContent = `Uploading ${progress}%`;
        if (progress === 100) {
          window.clearInterval(tick);
          set('done', `${icon('check-circle')}Uploaded`, remove);
        }
      }, 350);
    }
  });

  /* ---------- tab bar: the pill springs from the tab you left to the one you opened ---------- */
  const TAB_KEY = 'zx-tab-from';
  const SPRING = getComputedStyle(document.documentElement).getPropertyValue('--ease').trim();
  const tabs = [...document.querySelectorAll('.device .tab')];
  const current = tabs.findIndex((t) => t.getAttribute('aria-current') === 'page');
  let from = null;
  try { from = sessionStorage.getItem(TAB_KEY); sessionStorage.removeItem(TAB_KEY); } catch { /* storage blocked */ }
  if (from !== null && current >= 0 && Number(from) !== current && tabs[1]) {
    const step = tabs[1].getBoundingClientRect().left - tabs[0].getBoundingClientRect().left;
    tabs[current].animate([{ transform: `translateX(${(Number(from) - current) * step}px)` }, { transform: 'none' }],
      { duration: 500, easing: SPRING || 'ease-out' });
  }
  document.addEventListener('click', (event) => {
    const tab = event.target.closest('.device .tab');
    if (!tab || current < 0) return;
    try { sessionStorage.setItem(TAB_KEY, current); } catch { /* storage blocked: no glide */ }
  });

  /* ---------- prototype only: the state switch above the frame ----------
     .screen[data-state] holds the current state; an element with data-when="ready offline"
     shows only in those states. */
  const screen = document.querySelector('.screen[data-state]');
  const applyState = (state) => {
    screen.dataset.state = state;
    screen.querySelectorAll('[data-when]').forEach((el) => { el.hidden = !el.dataset.when.split(' ').includes(state); });
    screen.querySelectorAll('.overlay').forEach((overlay) => { overlay.hidden = true; });
    screen.querySelector('.root-scroll, .scroll')?.scrollTo({ top: 0 });
  };
  if (screen) {
    /* an overlay marked data-initial starts open, for screens that are a sheet or prompt */
    const initial = [...screen.querySelectorAll('.overlay[data-initial]')];
    applyState(screen.dataset.state);
    initial.forEach((overlay) => { overlay.hidden = false; });
  }
  document.querySelectorAll('.plate-states button[data-state]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.plate-states button[data-state]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      applyState(button.dataset.state); /* a data-open on the same button then opens its overlay */
    });
  });
})();
