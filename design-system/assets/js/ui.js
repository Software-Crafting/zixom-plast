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

  /* ---------- fake status bar (prototype chrome) ---------- */
  const SIGNALS = `<svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><path fill="currentColor" d="M1 8h2.6v3.4H1zM5.4 5.8H8v5.6H5.4zM9.8 3.4h2.6v8H9.8zM14.2 1h2.6v10.4h-2.6z"/></svg>
    <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"><path fill="currentColor" d="M8 2.6c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .8 10.4 10.4 0 0 0 .8 3.7L2 5c1.6-1.5 3.7-2.4 6-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.6 6.6 0 0 0 8 4.4a6.6 6.6 0 0 0-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3zm0 3.5L10 8a2.9 2.9 0 0 0-4 0z"/></svg>
    <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true"><rect x=".6" y=".6" width="22" height="10.8" rx="3.4" fill="none" stroke="currentColor" opacity=".4"/><rect x="2.2" y="2.2" width="17" height="7.6" rx="2" fill="currentColor"/><path d="M24.2 4.2v3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".4"/></svg>`;
  document.querySelectorAll('.status:empty').forEach((bar) => {
    bar.innerHTML = `<span>9:41</span><span class="signals">${SIGNALS}</span>`;
  });

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
  const close = (overlay) => { overlay.hidden = true; };
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
    window.setTimeout(() => toast.remove(), TOAST_MS);
  });

  /* ---------- busy button ---------- */
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-busy]');
    if (!button) return;
    button.setAttribute('aria-busy', 'true');
    window.setTimeout(() => button.removeAttribute('aria-busy'), BUSY_MS);
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
      });
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

  /* ---------- prototype only: the state switch above the frame ----------
     .screen[data-state] holds the current state; an element with data-when="ready offline"
     shows only in those states. */
  const screen = document.querySelector('.screen[data-state]');
  const applyState = (state) => {
    screen.dataset.state = state;
    screen.querySelectorAll('[data-when]').forEach((el) => { el.hidden = !el.dataset.when.split(' ').includes(state); });
    screen.querySelectorAll('.overlay').forEach((overlay) => { overlay.hidden = true; });
    screen.querySelector('.scroll')?.scrollTo({ top: 0 });
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
