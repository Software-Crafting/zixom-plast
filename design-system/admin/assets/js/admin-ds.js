/* Bridge from the native fields pages are written with to the design system components in ../ds.
   Pages keep plain <select>, <input type="date|time|datetime-local">; this swaps in the copied components:
   - select:         the native stays hidden and keeps the value; a .ds-select is built from its options.
   - date and time:  the input itself becomes the .ds-input__control of a .ds-date-picker or .ds-time-picker
                     (type text, same ISO "YYYY-MM-DD" and 24 hour "HH:MM" values the native field had).
   - datetime-local: the native stays hidden; a date picker and a time picker side by side write it back.
   Page code keeps reading and setting .value and listening to change and input on the native element.
   Fields added later (drawers, rows) are picked up too. Loaded by admin-ui.js after the ds scripts. */
(() => {
  const { icon, esc } = ZXA.r;
  let uid = 0;
  const nextId = (prefix) => `${prefix}-${(uid += 1)}`;
  const fire = (el) => {
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const dsIcon = (name) => icon(name, 'ds-icon ds-icon--sm').replace('class="ic ', 'class="');
  const labelFor = (el) => (el.id ? document.querySelector(`label[for="${CSS.escape(el.id)}"]`) : null) || el.closest('label');
  /* call sync whenever page code sets the value, toggles disabled or swaps the options */
  const watch = (el, sync) => {
    const proto = Object.getPrototypeOf(el);
    ['value', 'selectedIndex'].forEach((prop) => {
      const native = Object.getOwnPropertyDescriptor(proto, prop);
      if (native) Object.defineProperty(el, prop, { configurable: true, get: () => native.get.call(el), set: (v) => { native.set.call(el, v); sync(); } });
    });
    new MutationObserver(sync).observe(el, { attributes: true, childList: true, subtree: true, characterData: true });
  };

  /* ---------- select ---------- */
  const select = (native) => {
    const id = nextId('dssel');
    const root = document.createElement('div');
    root.className = `ds-select${native.classList.contains('sm') ? ' ds-select--sm' : ''}${native.classList.contains('mono') ? ' mono' : ''}`;
    root.dataset.dsSelect = '';
    /* page classes (set-jump, w-md...) move to the component so page CSS that sizes or hides the field still applies */
    [...native.classList].filter((c) => !['select', 'sm', 'mono', 'input'].includes(c)).forEach((c) => root.classList.add(c));
    root.innerHTML = `<button type="button" class="ds-select__trigger" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="${id}-label ${id}-value">
        <span class="ds-select__value" id="${id}-value"></span>${dsIcon('caret-down').replace('ds-icon ds-icon--sm', 'ds-icon ds-icon--sm ds-select__chevron')}</button>
      <div class="ds-select__popup ds-scroll-area" data-ds-scroll-area hidden>
        <ul class="ds-select__list ds-scroll ds-scroll--y" role="listbox" tabindex="-1" aria-labelledby="${id}-label"></ul></div>
      <input type="hidden"><span class="ds-sr-only" id="${id}-label"></span>`;
    root.style.cssText = native.style.cssText;
    native.after(root);
    native.classList.add('ds-native');
    native.tabIndex = -1;
    const trigger = root.querySelector('.ds-select__trigger');
    const list = root.querySelector('[role=listbox]');
    const hidden = root.querySelector('input[type=hidden]');
    const option = (o, i) => `<li class="ds-select__option" role="option" id="${id}-o${i}" data-value="${esc(o.value)}" aria-selected="${o.selected}"
      ${o.disabled ? 'aria-disabled="true"' : ''}><span>${esc(o.textContent)}</span>${dsIcon('check').replace('ds-icon ds-icon--sm', 'ds-icon ds-icon--sm ds-select__check')}</li>`;
    let building = false;
    const sync = () => {
      if (building) return;
      building = true;
      let i = 0;
      list.innerHTML = [...native.children].map((child) => (child.tagName === 'OPTGROUP'
        ? `<li class="ds-select__group" role="presentation">${esc(child.label)}</li>${[...child.children].filter((o) => !o.hidden).map((o) => option(o, i += 1)).join('')}`
        : (child.hidden ? '' : option(child, i += 1)))).join('');
      const chosen = native.selectedOptions[0];
      const value = root.querySelector('.ds-select__value');
      value.textContent = chosen?.textContent || native.getAttribute('placeholder') || 'Select';
      value.toggleAttribute('data-placeholder', !chosen || chosen.value === '' && !chosen.textContent.trim());
      hidden.value = native.value;
      trigger.disabled = native.disabled;
      root.hidden = native.hidden;
      ['aria-invalid', 'aria-describedby'].forEach((a) => (native.hasAttribute(a) ? trigger.setAttribute(a, native.getAttribute(a)) : trigger.removeAttribute(a)));
      root.querySelector(`#${id}-label`).textContent = native.getAttribute('aria-label') || labelFor(native)?.textContent.trim() || '';
      building = false;
    };
    watch(native, sync);
    sync();
    hidden.addEventListener('change', (event) => {
      event.stopPropagation();
      native.value = hidden.value;
      fire(native);
    });
    labelFor(native)?.addEventListener('click', (event) => { if (!event.target.closest('.ds-select')) { event.preventDefault(); trigger.focus(); } });
  };

  /* ---------- date and time: the input becomes the control ---------- */
  const DATE_ICON = 'calendar-blank';
  const fieldBox = (input, kind, popupId) => {
    const root = document.createElement('div');
    root.className = kind === 'date' ? 'ds-date-picker' : 'ds-time-picker';
    root.dataset[kind === 'date' ? 'dsDatePicker' : 'dsTimePicker'] = '';
    const box = document.createElement('div');
    box.className = `ds-input${input.classList.contains('sm') ? ' ds-input--sm' : ''}`;
    root.style.cssText = input.style.cssText;
    input.removeAttribute('style');
    input.before(root);
    root.append(box);
    if (kind === 'time') box.insertAdjacentHTML('beforeend', dsIcon('clock').replace('ds-icon ds-icon--sm', 'ds-icon ds-icon--sm ds-input__icon'));
    box.append(input);
    const name = labelFor(input)?.textContent.trim() || (kind === 'date' ? 'date' : 'time');
    box.insertAdjacentHTML('beforeend', `<button type="button" class="ds-input__action" data-ds-${kind === 'date' ? 'date' : 'time'}-picker-toggle
      aria-label="Choose ${esc(name.toLowerCase())}" aria-haspopup="dialog" aria-expanded="false" aria-controls="${popupId}">${dsIcon(kind === 'date' ? DATE_ICON : 'caret-down')}</button>`);
    root.insertAdjacentHTML('beforeend', kind === 'date'
      ? `<div class="ds-date-picker__popup" id="${popupId}" role="dialog" aria-label="Choose ${esc(name.toLowerCase())}" hidden><div class="ds-calendar" data-ds-calendar></div></div>`
      : `<div class="ds-time-picker__popup" id="${popupId}" role="dialog" aria-label="Choose ${esc(name.toLowerCase())}" hidden></div>`);
    return root;
  };
  const limits = (root, input, kind) => {
    const target = kind === 'date' ? root.querySelector('[data-ds-calendar]') : root;
    const min = (input.getAttribute('min') || '').slice(kind === 'date' ? 0 : -5);
    const max = (input.getAttribute('max') || '').slice(kind === 'date' ? 0 : -5);
    if (min) target.dataset.min = kind === 'date' ? min.slice(0, 10) : min;
    if (max) target.dataset.max = kind === 'date' ? max.slice(0, 10) : max;
    if (kind === 'time' && input.getAttribute('step')) root.dataset.step = String(Math.max(1, Math.round(Number(input.getAttribute('step')) / 60)));
  };
  const dateOrTime = (input) => {
    const kind = input.type === 'date' ? 'date' : 'time';
    input.type = 'text';
    input.inputMode = 'numeric';
    input.autocomplete = 'off';
    if (!input.placeholder) input.placeholder = kind === 'date' ? 'YYYY-MM-DD' : 'HH:MM';
    input.classList.remove('input', 'sm');
    input.classList.add('ds-input__control');
    const root = fieldBox(input, kind, nextId(kind === 'date' ? 'dsdate' : 'dstime'));
    limits(root, input, kind);
  };

  /* ---------- datetime-local: a date picker and a time picker for one hidden native field ---------- */
  const dateTime = (native) => {
    const wrap = document.createElement('div');
    wrap.className = 'ds-datetime';
    native.after(wrap);
    native.classList.add('ds-native');
    native.tabIndex = -1;
    const date = document.createElement('input');
    const time = document.createElement('input');
    date.type = 'date';
    time.type = 'time';
    if (native.classList.contains('sm')) { date.classList.add('sm'); time.classList.add('sm'); }
    if (native.min) date.min = native.min.slice(0, 10);
    if (native.max) date.max = native.max.slice(0, 10);
    if (native.id) { date.setAttribute('aria-label', `${labelFor(native)?.textContent.trim() || 'Date'}, date`); time.setAttribute('aria-label', 'Time'); }
    wrap.append(date, time);
    dateOrTime(date);
    dateOrTime(time);
    const sync = () => {
      date.value = native.value.slice(0, 10);
      time.value = native.value.slice(11, 16);
      date.disabled = native.disabled;
      time.disabled = native.disabled;
      ['aria-invalid'].forEach((a) => [date, time].forEach((f) => (native.hasAttribute(a) ? f.setAttribute(a, native.getAttribute(a)) : f.removeAttribute(a))));
    };
    watch(native, sync);
    sync();
    const write = (event) => {
      event.stopPropagation();
      if (!date.value) return;
      native.value = `${date.value}T${time.value || '09:00'}`;
      fire(native);
    };
    [date, time].forEach((f) => { f.addEventListener('change', write); f.addEventListener('input', (e) => e.stopPropagation()); });
    labelFor(native)?.addEventListener('click', (event) => { event.preventDefault(); date.focus(); });
  };

  /* ---------- upgrade every field, now and later ---------- */
  const upgrade = (el) => {
    if (el.dataset.ds || el.closest('[data-native], .ds-select, .ds-date-picker, .ds-time-picker')) return;
    if (el.tagName === 'SELECT' && el.multiple) return;
    el.dataset.ds = el.tagName === 'SELECT' ? 'select' : el.type;
    if (el.tagName === 'SELECT') select(el);
    else if (el.type === 'datetime-local') dateTime(el);
    else dateOrTime(el);
  };
  const SELECTOR = 'select, input[type="date"], input[type="time"], input[type="datetime-local"]';
  const scan = (node) => {
    if (node.matches?.(SELECTOR)) upgrade(node);
    node.querySelectorAll?.(SELECTOR).forEach(upgrade);
  };
  /* the ds scripts draw three icons by their own ids; point them at the admin Lucide sprite */
  document.body.insertAdjacentHTML('afterbegin', `<svg aria-hidden="true" style="display:none">${[['chevron-left', 'caret-left'],
    ['chevron-right', 'caret-right'], ['chevron-down', 'caret-down']].map(([ds, ours]) => `<symbol id="i-${ds}" viewBox="0 0 24 24"><use href="#ph-${ours}"/></symbol>`).join('')}</svg>`);
  scan(document);
  new MutationObserver((records) => records.forEach((r) => r.addedNodes.forEach((n) => { if (n.nodeType === 1) scan(n); })))
    .observe(document.body, { childList: true, subtree: true });
})();
