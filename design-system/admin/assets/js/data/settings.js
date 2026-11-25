/* Administration and settings (spec sections 14 and 16). Data for pages/settings/ plus the two things every settings
   page shares: the settings sub-navigation and the setting row (current value, default, where used, history).
   Values follow section 14; the app reads them and picks up a change within 15 minutes (EC-A62). */
window.ZXA = window.ZXA || {};

ZXA.data.settings = {
  /* sub-navigation groups: [page id, label, icon, one line for the overview card, last changed] */
  groups: [
    ['General', [
      ['D1601', 'Overview', 'squares-four', 'Every setting in one place', null],
      ['D1604', 'Business profile', 'buildings', 'Name, GSTIN, bank, phones shown in the app', '2026-11-02'],
      ['D1602', 'Users', 'users', '1 Admin, 1 invitation pending', '2026-11-21'],
    ]],
    ['Service', [
      ['D1605', 'Service rules', 'timer', 'Response targets, accept window, check in radius', '2026-11-12'],
      ['D1606', 'Rates and charges', 'currency-inr', 'Visit fee, labour, travel, surcharge', '2026-10-28'],
      ['D1607', 'Service slots', 'calendar-range', '3 visit slots, 4 hours notice', '2026-09-14'],
      ['D1615', 'Regions and pincodes', 'map-pinned', 'Ahmedabad and Pune service areas', '2026-11-05'],
      ['D1613', 'Checklist templates', 'clipboard-check', 'Visit checklists per machine type', '2026-11-18'],
      ['D1614', 'Reasons lists', 'list-checks', 'Decline, hold, cancel, reject and more', '2026-10-09'],
    ]],
    ['Money and documents', [
      ['D1609', 'Payment rules', 'credit-card', 'Methods, offline proof, invoice reminders', '2026-10-21'],
      ['D1611', 'Number series', 'tag', 'Prefixes and next numbers', '2026-04-01'],
      ['D1612', 'Document templates', 'file-text', 'Invoice, estimate, report and other PDFs', '2026-11-16'],
    ]],
    ['App', [
      ['D1630', 'App control', 'smartphone', 'Versions, force update, maintenance, switches', '2026-11-20'],
      ['D1631', 'App adoption', 'bar-chart', 'People by app version and OS', null],
      ['D1616', 'App texts', 'note-pencil', 'Terms, privacy policy, welcome texts', '2026-10-01'],
      ['D1610', 'Files and media', 'image', 'Photo, video and file limits', '2026-08-30'],
      ['D1608', 'Sign in and security', 'lock-simple', 'Codes, locks, sessions, devices', '2026-09-02'],
    ]],
    ['Connections', [
      ['D1620', 'Integrations', 'plug', '8 services, all healthy', '2026-11-19'],
      ['D1621', 'Razorpay', 'wallet', 'Live mode, webhook verified', '2026-11-19'],
      ['D1622', 'Email and SMS', 'mail-check', 'Sender, DLT templates, delivery', '2026-10-14'],
      ['D1641', 'Integration log', 'activity', 'Webhooks and API calls, 90 days', null],
    ]],
    ['Records', [
      ['D1640', 'Activity log', 'history', 'Every Admin action, kept 3 years', null],
      ['D1642', 'Data privacy', 'shield', 'Data export, deletion, retention', '2026-07-11'],
      ['D1643', 'Backups', 'database', 'Daily at 2:00 AM, last run succeeded', '2026-11-23'],
      ['D1644', 'Help and user guide', 'book-open', 'Guide and keyboard shortcuts', null],
    ]],
  ],

  /* change history of settings (section 15: key, value, default, changed by, changed at, reason) */
  history: [
    { page: 'D1605', key: 'radius', label: 'Check in radius', old: '250 m', new: '300 m', when: '2026-11-12T10:20', reason: 'Sanand plant gate is far from the shed' },
    { page: 'D1605', key: 'down', label: 'Response target, Machine down', old: '6 hours', new: '4 hours', when: '2026-10-02T09:05', reason: 'Agreed with customers at launch' },
    { page: 'D1605', key: 'accept', label: 'Engineer accept window', old: '45 minutes', new: '30 minutes', when: '2026-09-18T15:40', reason: 'Faster assignment for machine down' },
    { page: 'D1606', key: 'visit', label: 'Visit fee', old: '₹1,200.00', new: '₹1,500.00', when: '2026-10-28T11:00', reason: 'New rate card from 1 November' },
    { page: 'D1606', key: 'labour', label: 'Labour rate', old: '₹700.00 per hour', new: '₹750.00 per hour', when: '2026-10-28T11:00', reason: 'New rate card from 1 November' },
    { page: 'D1607', key: 'notice', label: 'Minimum notice', old: '6 hours', new: '4 hours', when: '2026-09-14T12:30', reason: '' },
    { page: 'D1608', key: 'admin-idle', label: 'Admin idle timeout', old: '60 minutes', new: '30 minutes', when: '2026-09-02T17:15', reason: '' },
    { page: 'D1609', key: 'reminders', label: 'Invoice reminders', old: 'On the due date', new: '3 days before, on the due date, every 7 days', when: '2026-10-21T10:45', reason: '' },
    { page: 'D1610', key: 'photos', label: 'Photos per request', old: '6', new: '10', when: '2026-08-30T14:10', reason: '' },
    { page: 'D1604', key: 'hours', label: 'Working hours', old: 'Mon to Sat, 9:30 AM to 6 PM', new: 'Mon to Sat, 9 AM to 6 PM', when: '2026-11-02T09:30', reason: '' },
  ],

  admins: [
    { id: 'rajesh', name: 'Rajesh Goyal', initials: 'RG', email: 'admin@zixom.in', mobile: '+91 99919 10097', title: 'Owner',
      status: 'Active', lastSignIn: '2026-11-23T08:42', since: '2026-04-01', you: true },
    { id: 'priya', name: 'Priya Nair', initials: 'PN', email: 'priya.nair@zixom.in', mobile: '+91 98110 45218', title: 'Service coordinator',
      status: 'Invited', invited: '2026-11-21T16:10', expires: '2026-11-28' },
  ],

  /* every Admin action (section 15: time, admin, record, action, old and new values, IP, browser). Read only, kept 3 years */
  activity: [
    ['2026-11-23T11:58', 'Ticket', 'TKT-2026-0126', 'D403?t=TKT-2026-0126', 'Added internal note', '', 'Customer is a priority account'],
    ['2026-11-23T10:41', 'Part request', 'SPR-2026-0031', 'D821', 'Changed urgency', 'Normal', 'Urgent'],
    ['2026-11-23T09:30', 'Estimate', 'TKT-2026-0122', 'D403?t=TKT-2026-0122', 'Sent estimate', 'Draft', '₹8,968.00 shared'],
    ['2026-11-23T08:42', 'Sign in', 'admin@zixom.in', 'D011', 'Signed in', '', 'Chrome on Windows'],
    ['2026-11-23T07:58', 'Ticket', 'TKT-2026-0126', 'D403?t=TKT-2026-0126', 'Assigned engineer', 'None', 'Sandeep Yadav'],
    ['2026-11-23T07:52', 'Ticket', 'TKT-2026-0126', 'D403?t=TKT-2026-0126', 'Changed priority', 'High', 'Urgent'],
    ['2026-11-22T18:05', 'Invoice', 'INV-2026-0987', 'D903', 'Issued credit note', '', 'CN-2026-001, ₹1,180.00'],
    ['2026-11-22T17:40', 'Refund', 'RFD-2026-001', 'D923', 'Created refund', '', '₹2,950.00 to original method'],
    ['2026-11-21T16:10', 'Admin user', 'priya.nair@zixom.in', 'D1602', 'Invited Admin', '', 'Priya Nair, valid 7 days'],
    ['2026-11-21T15:12', 'Payment', 'INV-2026-0985', 'D912', 'Opened offline proof', '', 'Bank transfer, ₹3,540.00'],
    ['2026-11-20T12:30', 'Setting', 'App control', 'D1630', 'Changed latest version, Android', '2.3.1', '2.4.0'],
    ['2026-11-19T11:05', 'Integration', 'Razorpay', 'D1621', 'Switched mode', 'Test', 'Live'],
    ['2026-11-18T16:20', 'Setting', 'Checklist templates', 'D1613', 'Published checklist', 'Thermoforming v3', 'Thermoforming v4'],
    ['2026-11-16T10:00', 'Setting', 'Document templates', 'D1612', 'Published template', 'Invoice v2', 'Invoice v3'],
    ['2026-11-14T14:25', 'Machine', 'ZP-TF-2204', 'D302', 'Changed status', 'Running', 'In repair'],
    ['2026-11-12T10:20', 'Setting', 'Service rules', 'D1605', 'Changed check in radius', '250 m', '300 m'],
    ['2026-11-11T09:44', 'Customer', 'ZP-C-0002', 'D202', 'Changed credit terms', '15 days', '30 days'],
    ['2026-11-05T13:02', 'Setting', 'Service areas', 'D713', 'Added pincode', '', '410501 Chakan, Pune'],
    ['2026-11-02T09:30', 'Setting', 'Business profile', 'D1604', 'Changed working hours', 'Mon to Sat, 9:30 AM to 6 PM', 'Mon to Sat, 9 AM to 6 PM'],
    ['2026-10-28T11:00', 'Setting', 'Rates and charges', 'D1606', 'Changed visit fee', '₹1,200.00', '₹1,500.00'],
  ].map(([when, type, record, href, action, old, now]) => ({ when, type, record, href, action, old, now, ip: '49.36.112.18', browser: 'Chrome 131 on Windows' })),

  /* webhook and API calls with status (section 16); kept 90 days */
  integrationLog: [
    { id: 'evt_1', when: '2026-11-23T11:56:12', service: 'Razorpay', event: 'payment.captured', dir: 'In', status: 'Success', ms: 182, record: 'INV-2026-0982', recordHref: 'D903' },
    { id: 'evt_2', when: '2026-11-23T11:20:40', service: 'Push (Firebase)', event: 'Machine down alert to Admin', dir: 'Out', status: 'Success', ms: 240, record: 'TKT-2026-0133', recordHref: 'D403?t=TKT-2026-0133' },
    { id: 'evt_3', when: '2026-11-23T10:15:05', service: 'Push (Firebase)', event: 'Part request update to Sandeep', dir: 'Out', status: 'Success', ms: 198, record: 'SPR-2026-0031', recordHref: 'D821' },
    { id: 'evt_4', when: '2026-11-23T09:58:31', service: 'IndiaMART', event: 'Lead push, Direct enquiry', dir: 'In', status: 'Success', ms: 96, record: 'LD-2026-0049', recordHref: 'D1103' },
    { id: 'evt_5', when: '2026-11-23T09:30:02', service: 'Email', event: 'Estimate to rakesh@shreepack.example', dir: 'Out', status: 'Success', ms: 410, record: 'TKT-2026-0122', recordHref: 'D403?t=TKT-2026-0122' },
    { id: 'evt_6', when: '2026-11-23T08:41:55', service: 'Email', event: 'Sign in code to admin@zixom.in', dir: 'Out', status: 'Success', ms: 380, record: '', recordHref: '' },
    { id: 'evt_7', when: '2026-11-23T07:14:09', service: 'Razorpay', event: 'payment.failed', dir: 'In', status: 'Success', ms: 150, record: 'INV-2026-0984', recordHref: 'D903' },
    { id: 'evt_8', when: '2026-11-23T06:02:47', service: 'Razorpay', event: 'Unknown event, bad signature', dir: 'In', status: 'Rejected 401', ms: 12, record: '', recordHref: '' },
    { id: 'evt_9', when: '2026-11-23T02:00:00', service: 'Backups', event: 'Daily backup', dir: 'Out', status: 'Success', ms: 241000, record: '', recordHref: '' },
    { id: 'evt_10', when: '2026-11-22T19:31:20', service: 'SMS (OTP)', event: 'Sign in code to +91 98220 43120', dir: 'Out', status: 'Success', ms: 620, record: '', recordHref: '' },
    { id: 'evt_11', when: '2026-11-22T17:40:33', service: 'Razorpay', event: 'refund.processed', dir: 'In', status: 'Success', ms: 170, record: 'RFD-2026-001', recordHref: 'D923' },
    { id: 'evt_12', when: '2026-11-22T16:05:10', service: 'IndiaMART', event: 'Lead push, same query id', dir: 'In', status: 'Duplicate ignored', ms: 41, record: 'LD-2026-0047', recordHref: 'D1103' },
    { id: 'evt_13', when: '2026-11-22T14:48:00', service: 'IndiaMART', event: 'Lead push, no mobile or email', dir: 'In', status: 'Failed', ms: 88, record: '', recordHref: '' },
    { id: 'evt_14', when: '2026-11-22T11:12:44', service: 'Email', event: 'Invoice to imran@novacups.example', dir: 'Out', status: 'Bounced', ms: 395, record: 'INV-2026-0986', recordHref: 'D903' },
    { id: 'evt_15', when: '2026-11-21T15:10:18', service: 'Push (Firebase)', event: 'Payment proof received', dir: 'Out', status: 'Failed', ms: 230, record: 'INV-2026-0985', recordHref: 'D903' },
  ],

  backups: [
    ['2026-11-23T02:00', 'Success', '4 min 1 s', '1.84 GB'], ['2026-11-22T02:00', 'Success', '3 min 52 s', '1.83 GB'],
    ['2026-11-21T02:00', 'Success', '3 min 58 s', '1.82 GB'], ['2026-11-20T02:00', 'Success', '3 min 49 s', '1.81 GB'],
    ['2026-11-19T02:00', 'Success', '3 min 55 s', '1.80 GB'], ['2026-11-18T02:00', 'Success', '3 min 47 s', '1.79 GB'],
    ['2026-11-17T02:18', 'Success, retried', '4 min 10 s', '1.78 GB'], ['2026-11-17T02:00', 'Failed', '0 min 30 s', '-'],
    ['2026-11-16T02:00', 'Success', '3 min 40 s', '1.77 GB'], ['2026-11-15T02:00', 'Success', '3 min 44 s', '1.76 GB'],
  ],

  /* people on each app version (the demo app users from ZX.data, so numbers match) */
  appUsers: [
    { name: 'Rakesh Mehta', role: 'Customer', os: 'iOS 18.1', version: '2.4.0', seen: '2026-11-23T10:50', now: true },
    { name: 'Pooja Shah', role: 'Customer', os: 'Android 14', version: '2.4.0', seen: '2026-11-23T09:12', now: true },
    { name: 'Imran Qureshi', role: 'Customer', os: 'Android 13', version: '2.3.1', seen: '2026-11-23T11:20', now: true },
    { name: 'Sandeep Yadav', role: 'Engineer', os: 'Android 14', version: '2.4.0', seen: '2026-11-23T11:58', now: true },
    { name: 'Anita Verma', role: 'Engineer', os: 'Android 11', version: '2.2.0', seen: '2026-11-23T11:40', now: false },
  ],
};

/* ---------- shared settings page parts ---------- */
ZXA.set = (() => {
  const { icon, esc, date, time } = ZXA.r;
  const S = ZXA.data.settings;
  const items = S.groups.flatMap(([, list]) => list);
  const ACTIVE = { D1603: 'D1602' };

  const nav = (current) => `${S.groups.map(([group, list]) => `<div class="set-group-label">${group}</div>
    ${list.map(([id, label, ic]) => `<a href="#${id}"${id === current ? ' aria-current="page"' : ''}>${icon(ic)}<span>${label}</span></a>`).join('')}`).join('')}`;
  const jump = (current) => `<label class="sr-only" for="set-jump">Settings section</label><select class="select set-jump" id="set-jump">
    ${S.groups.map(([group, list]) => `<optgroup label="${group}">${list.map(([id, label]) => `<option value="${id}"${id === current ? ' selected' : ''}>${label}</option>`).join('')}</optgroup>`).join('')}</select>`;

  const changedText = (key) => {
    const last = S.history.filter((h) => h.key === key).sort((x, y) => y.when.localeCompare(x.when))[0];
    return last ? `Changed ${date(last.when)}` : 'Not changed since setup';
  };

  /* controls */
  const num = (id, value, unit, min, max, extra = '') => `<div class="set-unit"><input class="input" type="number" id="${id}" value="${value}"
    min="${min}" max="${max}" data-unit="${esc(unit)}" ${extra}><span>${esc(unit)}</span></div>`;
  const select = (id, options, value, extra = '') => `<select class="select" id="${id}" ${extra}>${options.map((o) => `<option${o === value ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`;

  /* one setting: what it is, its control, then default, where used, history and reset */
  const row = (r) => `<div class="set-row">
    <div class="set-what"><label for="${r.id}">${r.label}</label>${r.hint ? `<small>${r.hint}</small>` : ''}</div>
    <div class="set-control">${r.control}<span class="error" hidden></span></div>
    <div class="set-meta"><span>Default <b>${r.def}</b></span><span>${icon(r.used.startsWith('App') ? 'smartphone' : 'monitor')}${r.used}</span>
      <span>${changedText(r.key ?? r.id)}</span>
      <span class="set-links"><button class="btn btn-link" type="button" data-history="${r.key ?? r.id}">History</button>
        <button class="btn btn-link" type="button" data-reset="${esc(r.reset ?? '')}" data-for="${r.id}" hidden>Reset to default</button></span></div>
  </div>`;
  const group = (title, sub, rows) => `<section class="card set-card"><div class="card-head"><div class="grow"><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div></div>
    <div class="set-rows">${rows.map(row).join('')}</div></section>`;

  const historyRows = (key) => {
    const list = S.history.filter((h) => h.page === document.body.dataset.page && (!key || h.key === key));
    return list.length ? `<ol class="timeline">${list.map((h) => `<li><span class="node">${icon('history')}</span><div><b>${esc(h.label)}</b>
      <div class="diff" style="margin-top:6px"><span class="old">${esc(h.old)}</span><span class="new">${esc(h.new)}</span></div>
      <p style="margin-top:6px">Rajesh Goyal${h.reason ? ` · ${esc(h.reason)}` : ''}</p></div><small>${date(h.when)}, ${time(h.when)}</small></li>`).join('')}</ol>`
      : `<div class="state"><span class="disc">${icon('history')}</span><h3>No changes yet</h3><p>This setting still has its default value.</p></div>`;
  };

  const OVERLAYS = `
  <div class="overlay right" id="set-history" hidden><div class="drawer" role="dialog" aria-labelledby="set-history-title">
    <div class="drawer-head"><div class="grow"><h2 id="set-history-title">Change history</h2><p>Every change with who, when and why.</p></div>
      <button class="icon-btn" type="button" data-close aria-label="Close">${icon('x')}</button></div>
    <div class="drawer-body" id="set-history-body"></div>
    <div class="drawer-foot"><a class="btn btn-secondary" href="#D1640">Open activity log</a><span class="grow"></span><button class="btn btn-primary" type="button" data-close>Close</button></div></div></div>
  <div class="overlay center" id="set-reason" hidden><div class="modal" role="dialog" aria-labelledby="set-reason-title">
    <div class="modal-head"><span class="disc amber">${icon('timer')}</span><div class="grow"><h2 id="set-reason-title">Save target changes?</h2>
      <p>New tickets use the new targets. Tickets already open keep theirs.</p></div></div>
    <div class="modal-body"><div class="field"><label for="set-reason-text">Reason</label><textarea class="textarea" id="set-reason-text" maxlength="300" placeholder="Why the targets change"></textarea>
      <span class="error" hidden>${icon('warning-circle')}Enter a reason</span><span class="hint">Saved in the change history and the activity log.</span></div></div>
    <div class="modal-foot"><button class="btn btn-ghost" type="button" data-close>Cancel</button><button class="btn btn-primary" type="button" data-confirm-save>Save changes</button></div></div></div>`;

  const LOADING = `<div data-when="loading" class="stack"><div class="card pad stack"><span class="sk sk-title"></span><span class="sk sk-line"></span><span class="sk sk-line" style="width:80%"></span></div>
    <div class="card pad stack"><span class="sk sk-title" style="width:30%"></span><span class="sk sk-block"></span><span class="sk sk-line" style="width:60%"></span></div></div>`;
  const ERROR = `<div data-when="error" class="card"><div class="state page"><span class="disc red">${icon('warning-circle')}</span><h3>Something went wrong</h3>
    <p>We could not load this.</p><div class="btns"><button class="btn btn-primary" type="button" data-busy>Try again</button><a class="btn btn-secondary" href="#D101">Go to dashboard</a></div>
    <p class="code mono">Request id 7f3a-91c2-4be0</p></div></div>`;

  /* ---------- form: Save is enabled once something changed; min and max are checked on blur and on Save.
     Skip validation (prototype panel) turns Save on without a change and lets min, max and the reason pass ---------- */
  const fields = (form) => [...form.querySelectorAll('input:not([type="search"]), select, textarea')];
  const changed = (el) => {
    if (el.type === 'checkbox' || el.type === 'radio') return el.checked !== el.defaultChecked;
    if (el.tagName === 'SELECT') return [...el.options].some((o) => o.selected !== o.defaultSelected);
    return el.value !== el.defaultValue;
  };
  const ruleMessage = (el) => {
    if (el.required && !el.value.trim()) return 'Required';
    if (el.type === 'number' && !el.validity.valid) return `Use ${el.min} to ${el.max} ${el.dataset.unit || ''}`.trim();
    return el.dataset.check ? ZXA.set.checks[el.dataset.check]?.(el) || '' : '';
  };
  const validate = (el) => {
    if (!el.matches('input[type="number"], [required]')) return true;
    const box = el.closest('.set-control, .field, td');
    const error = box?.querySelector('.error');
    const message = ZXA.demo.skipValidation() ? '' : ruleMessage(el);
    el.setAttribute('aria-invalid', String(Boolean(message)));
    if (error) { error.hidden = !message; error.innerHTML = message ? `${icon('warning-circle')}${esc(message)}` : ''; }
    return !message;
  };
  const refresh = (form) => {
    const count = fields(form).filter(changed).length;
    const button = document.querySelector(`[data-save="${form.id}"]`);
    if (button) button.disabled = !(ZXA.demo.skipValidation() || count);
    const note = document.querySelector(`.form-bar[data-for="${form.id}"] .grow`);
    if (note) note.textContent = count ? `${count} unsaved ${count === 1 ? 'change' : 'changes'}` : 'The app picks up saved changes within 15 minutes';
    form.querySelectorAll('[data-reset]').forEach((b) => { b.hidden = document.getElementById(b.dataset.for)?.value === b.dataset.reset; });
  };
  const save = (form) => {
    fields(form).forEach((el) => {
      if (el.type === 'checkbox' || el.type === 'radio') el.defaultChecked = el.checked;
      else if (el.tagName === 'SELECT') [...el.options].forEach((o) => { o.defaultSelected = o.selected; });
      else el.defaultValue = el.value;
    });
    refresh(form);
    ZXA.ui.toast(form.dataset.saved || 'Saved. The app picks this up within 15 minutes');
  };
  const bindForms = () => {
    document.querySelectorAll('[data-set-form]').forEach((form) => {
      form.addEventListener('input', () => refresh(form));
      form.addEventListener('change', () => refresh(form));
      form.addEventListener('focusout', (event) => { if (event.target.matches('input, textarea')) validate(event.target); });
      refresh(form);
    });
    document.addEventListener('change', (event) => {
      if (event.target.matches('[data-skip-validation]')) document.querySelectorAll('[data-set-form]').forEach(refresh);
    });
    document.addEventListener('click', (event) => {
      const reset = event.target.closest('[data-reset]');
      if (reset) {
        const el = document.getElementById(reset.dataset.for);
        el.value = reset.dataset.reset;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        validate(el);
      }
      const history = event.target.closest('[data-history]');
      if (history) {
        document.getElementById('set-history-body').innerHTML = historyRows(history.dataset.history);
        ZXA.ui.openOverlay('set-history');
      }
      const saveButton = event.target.closest('[data-save]');
      if (saveButton) {
        const form = document.getElementById(saveButton.dataset.save);
        const invalid = fields(form).filter((el) => !validate(el));
        if (invalid.length) { invalid[0].focus(); ZXA.ui.toast(`Fix ${invalid.length} ${invalid.length === 1 ? 'field' : 'fields'} before saving`, 'info'); return; }
        if (fields(form).some((el) => changed(el) && el.hasAttribute('data-reason'))) { ZXA.set.pending = form; ZXA.ui.openOverlay('set-reason'); return; }
        save(form);
      }
      if (event.target.closest('[data-confirm-save]')) {
        const text = document.getElementById('set-reason-text');
        const ok = ZXA.demo.skipValidation() || text.value.trim().length > 0;
        text.setAttribute('aria-invalid', String(!ok));
        text.parentElement.querySelector('.error').hidden = ok;
        if (!ok) { text.focus(); return; }
        ZXA.ui.closeOverlay(document.getElementById('set-reason'));
        text.value = '';
        save(ZXA.set.pending);
      }
    });
  };

  /* draws the sub-navigation, adds the loading and error blocks a page does not draw, binds the forms */
  const frame = () => {
    const page = document.body.dataset.page;
    const current = ACTIVE[page] || page;
    document.getElementById('set-nav').innerHTML = nav(current);
    const main = document.querySelector('.set-main');
    const head = main.querySelector(':scope > .page-head, :scope > .detail-head');
    if (head) head.insertAdjacentHTML('afterend', jump(current)); else main.insertAdjacentHTML('afterbegin', jump(current));
    const has = (state) => [...main.querySelectorAll('[data-when]')].some((el) => el.dataset.when.split(' ').includes(state));
    if (!has('loading')) main.insertAdjacentHTML('beforeend', LOADING);
    if (!has('error')) main.insertAdjacentHTML('beforeend', ERROR);
    document.body.insertAdjacentHTML('beforeend', OVERLAYS);
    document.getElementById('set-jump').addEventListener('change', (event) => ZXA.ui.go(event.target.value));
    bindForms();
  };

  return { items, nav, num, select, row, group, frame, validate, checks: {}, changedText };
})();
