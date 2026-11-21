/* Machine register demo data (spec module 3, section 17). Builds on the machines in ZX.data (six Shree machines)
   and ZXA.data (two Nova machines) and adds what only the dashboard holds: series and models, warranty terms and
   extensions, running hours, notes, operators, photos and unlisted machine reports. ZXA.mx at the bottom joins it
   for the pages. Warranty runs 12 months from the start date, which is the commissioning date as in the app (C302).
   Today is Mon 23 Nov 2026, 12:00. */
window.ZXA = window.ZXA || {};

Object.assign(ZXA.data, {
  series: [
    { name: 'Thermoforming', type: 'Thermoforming machine' },
    { name: 'Vacuum forming', type: 'Vacuum forming machine' },
    { name: 'Cup forming', type: 'Cup forming machine' },
    { name: 'Crusher', type: 'Plastic crusher' },
    { name: 'Blister sealing', type: 'Blister sealing machine' },
  ],

  /* model master (D312); specs are the defaults a new machine of the model starts with */
  models: [
    { name: 'AFM-760 Single Station', series: 'Thermoforming', months: 12, status: 'active', manuals: ['AFM-760 operating manual.pdf', 'AFM PLC screens guide.pdf'],
      parts: ['ZP-SP-001', 'ZP-SP-002', 'ZP-SP-003', 'ZP-SP-004'],
      specs: [['Forming area', '760 x 560 mm'], ['Sheet thickness', '0.2 to 1.8 mm'], ['Heaters', 'Infrared ceramic, PID'], ['Control', 'PLC with HMI'], ['Power', '62 kW, 415 V']] },
    { name: 'AFM-1000 Twin Station', series: 'Thermoforming', months: 12, status: 'active', manuals: ['AFM-1000 operating manual.pdf', 'AFM PLC screens guide.pdf'],
      parts: ['ZP-SP-001', 'ZP-SP-002', 'ZP-SP-003', 'ZP-SP-004', 'ZP-SP-005'],
      specs: [['Forming area', '1000 x 700 mm'], ['Sheet thickness', '0.2 to 2.0 mm'], ['Heaters', 'Infrared ceramic, PID'], ['Control', 'PLC with HMI'], ['Power', '96 kW, 415 V']] },
    { name: 'AFM-650 Single Station', series: 'Thermoforming', months: 12, status: 'active', manuals: ['AFM-650 operating manual.pdf'],
      parts: ['ZP-SP-001', 'ZP-SP-002', 'ZP-SP-004'],
      specs: [['Forming area', '650 x 450 mm'], ['Sheet thickness', '0.2 to 1.5 mm'], ['Heaters', 'Infrared ceramic, PID'], ['Control', 'PLC with HMI'], ['Power', '48 kW, 415 V']] },
    { name: 'AFM-500 Single Station', series: 'Thermoforming', months: 12, status: 'archived', manuals: ['AFM-500 operating manual.pdf'], parts: ['ZP-SP-001'],
      specs: [['Forming area', '500 x 400 mm'], ['Control', 'Relay panel']] },
    { name: 'SVF-600 Semi Auto Vacuum Former', series: 'Vacuum forming', months: 12, status: 'active', manuals: ['SVF-600 operating manual.pdf'],
      parts: ['ZP-SP-001', 'ZP-SP-005'],
      specs: [['Forming area', '600 x 450 mm'], ['Depth of draw', '200 mm'], ['Heaters', 'Infrared ceramic'], ['Operation', 'Semi automatic']] },
    { name: 'CFM-450 Cup Former', series: 'Cup forming', months: 12, status: 'active', manuals: ['CFM-450 operating manual.pdf'],
      parts: ['ZP-SP-002', 'ZP-SP-004'],
      specs: [['Cup diameter', '50 to 95 mm'], ['Output', 'Up to 18,000 cups per hour'], ['Heaters', 'Calrod, PID'], ['Control', 'PLC with HMI']] },
    { name: 'PCR-300 Scrap Crusher', series: 'Crusher', months: 12, status: 'active', manuals: ['PCR-300 operating manual.pdf'], parts: [],
      specs: [['Throat size', '300 x 200 mm'], ['Motor', '7.5 kW'], ['Blades', '4 rotating, 2 fixed'], ['Output', 'Up to 120 kg per hour']] },
    { name: 'BSM-300 Blister Sealer', series: 'Blister sealing', months: 12, status: 'active', manuals: ['BSM-300 operating manual.pdf'], parts: ['ZP-SP-002', 'ZP-SP-004'],
      specs: [['Sealing area', '300 x 250 mm'], ['Cycles', 'Up to 25 per minute'], ['Heater', 'Cast plate, PID'], ['Control', 'PLC with HMI']] },
  ],

  /* admin fields per machine; machines not listed get the defaults in ZXA.mx.info */
  machineInfo: {
    'ZP-TF-2310': {
      warrantyType: 'Extended', terms: 'Standard terms v3',
      extensions: [{ when: '2026-05-30', from: '2026-06-24', to: '2027-06-21', reason: 'Paid extension, 12 months', doc: 'Extension order, signed.pdf', by: 'Rajesh Goyal' }],
      hours: [
        ['2026-11-21', 7840, 'Engineer', 'Sandeep Yadav', 'TKT-2026-0128 visit report'],
        ['2026-11-16', 7690, 'Customer', 'Pooja Shah', 'App, meter photo'],
        ['2026-11-12', 7712, 'Customer', 'Pooja Shah', 'App, meter photo'],
        ['2026-10-31', 7420, 'Customer', 'Pooja Shah', 'App, meter photo'],
        ['2026-10-15', 7105, 'Customer', 'Rakesh Mehta', 'App'],
        ['2026-09-30', 6790, 'Engineer', 'Sandeep Yadav', 'TKT-2026-0098 visit report'],
        ['2026-09-15', 6440, 'Customer', 'Pooja Shah', 'App, meter photo'],
        ['2026-08-31', 6120, 'Customer', 'Pooja Shah', 'App'],
        ['2026-08-14', 5770, 'Admin', 'Rajesh Goyal', 'Phone call'],
      ],
      notes: [
        { when: '2026-11-21T16:40', by: 'Sandeep Yadav', source: 'Engineer', text: 'Zone 3 element reads 8 percent low. Replace at the next visit.', hidden: false, pinned: false },
        { when: '2026-11-12T10:05', by: 'Pooja Shah', source: 'App', text: 'Mould changed to the 6 cavity tray.', hidden: false, pinned: false },
        { when: '2026-06-24T17:30', by: 'Rajesh Goyal', source: 'Admin', text: 'Priority account. Call Rakesh before any visit; gate 2 only.', hidden: true, pinned: true },
      ],
      operators: [
        { name: 'Mahesh Parmar', mobile: '+91 98790 44120', trained: '2025-06-24', by: 'Sandeep Yadav' },
        { name: 'Kiran Solanki', mobile: '+91 97250 61834', trained: '2026-02-10', by: 'Sandeep Yadav' },
        { name: 'Dinesh Rathod', mobile: '+91 99040 27719', trained: null, by: '' },
      ],
      photos: [['Front, after install', 'image', '2025-06-24'], ['Nameplate', 'image', '2025-06-24'], ['Control panel', 'image', '2025-06-24'],
        ['Heater bank', 'image', '2026-11-21'], ['Trial run, 0:42', 'video-camera', '2025-06-24'], ['Mould area', 'image', '2026-11-12']],
      commissioning: { date: '2025-06-24', by: 'Sandeep Yadav', signedBy: 'Rakesh Mehta, Plant head', file: 'Commissioning report ZP-TF-2310.pdf' },
      docs: [['Commissioning report ZP-TF-2310.pdf', 'Commissioning', '2025-06-24'], ['AFM-760 operating manual.pdf', 'Manual', '2025-06-10'],
        ['Tax invoice, machine sale.pdf', 'Invoice', '2025-06-02'], ['Extension order, signed.pdf', 'Warranty', '2026-05-30']],
    },
    'ZP-TF-2204': {
      warrantyType: 'Standard', terms: 'Standard terms v3', extensions: [],
      hours: [['2026-11-19', 6120, 'Customer', 'Rakesh Mehta', 'App, meter photo'], ['2026-10-30', 5810, 'Customer', 'Rakesh Mehta', 'App'],
        ['2026-09-28', 5340, 'Engineer', 'Sandeep Yadav', 'TKT-2026-0101 visit report']],
      notes: [{ when: '2026-11-19T11:20', by: 'Rajesh Goyal', source: 'Admin', text: 'Warranty ends 5 Dec. Offer an AMC with the claim decision.', hidden: true, pinned: true }],
      statusLog: [['2026-11-23T07:50', 'Running', 'Repair', 'System, machine down ticket TKT-2026-0126']],
      operators: [{ name: 'Mahesh Parmar', mobile: '+91 98790 44120', trained: '2025-12-05', by: 'Sandeep Yadav' }],
      commissioning: { date: '2025-12-05', by: 'Sandeep Yadav', signedBy: 'Rakesh Mehta, Plant head', file: 'Commissioning report ZP-TF-2204.pdf' },
    },
    'ZP-CF-2011': { notes: [{ when: '2026-10-02T09:15', by: 'Rakesh Mehta', source: 'App', text: 'Running only the night shift until Diwali.', hidden: false, pinned: false }] },
    'ZP-TF-2501': { submittedBy: 'Pooja Shah', submitted: '2026-11-23T08:40' },
    'ZP-CF-2108': { runningHours: 21950 },
    'ZP-BS-2215': { runningHours: 14310 },
  },

  /* machines reported from the app that are not in the register (C204) */
  unlistedReports: [
    { id: 'u4', serial: 'ZP-TF-2501', company: 'shree', site: 'sanand', by: 'pooja', model: 'AFM-650 Single Station', year: '2021', status: 'new',
      submitted: '2026-11-23T08:40', text: 'Bought second hand from a unit in Rajkot. Nameplate photo attached. Please add it to our account.',
      photos: ['Nameplate', 'Machine front', 'Purchase invoice'] },
    { id: 'u3', serial: 'ZP-VF-2104', company: 'nova', site: 'chakan', by: 'imran', model: 'SVF-600 Semi Auto Vacuum Former', year: '2021', status: 'details',
      submitted: '2026-11-20T15:10', text: 'Vacuum former bought through a dealer in 2021. Not in the app.', photos: ['Nameplate'],
      asked: 'Please share the dealer invoice so we can confirm the installation date.' },
    { id: 'u2', serial: 'ZPTF2310', company: 'shree', site: 'vatva', by: 'rakesh', model: 'AFM-760', year: '2025', status: 'linked',
      submitted: '2026-11-02T11:30', text: 'Line 1 former not showing.', photos: ['Nameplate'], linked: 'ZP-TF-2310', decided: '2026-11-02T14:05' },
    { id: 'u1', serial: 'KP-77812', company: 'nova', site: 'chakan', by: 'imran', model: 'Granulator', year: '2019', status: 'rejected',
      submitted: '2026-10-27T10:00', text: 'Scrap granulator at the back of the unit.', photos: ['Nameplate', 'Machine'],
      reason: 'Not a Zixom machine. The nameplate shows another maker.', decided: '2026-10-28T09:40' },
  ],
});

/* ---------- joins and chips for the machine pages ---------- */
ZXA.mx = (() => {
  const r = ZXA.r;
  const a = ZXA.data;
  const DEFAULTS = { warrantyType: 'Standard', terms: 'Standard terms v3', extensions: [], hours: [], notes: [], operators: [], photos: [], docs: [] };
  const info = (serial) => ({ ...DEFAULTS, ...a.machineInfo[serial] });
  const series = (m) => a.series.find((s) => s.type === m.type)?.name ?? 'Others';
  const model = (m) => a.models.find((x) => x.name === m.model);
  const hours = (m) => m.runningHours ?? info(m.serial).runningHours ?? null;
  const baseEnd = (m) => info(m.serial).extensions[0]?.from ?? m.warrantyEnd;
  const warrantyStart = (m) => { const end = baseEnd(m); return end ? `${Number(end.slice(0, 4)) - 1}${end.slice(4)}` : null; };

  /* spec: In warranty, Expiring (60 days or fewer), Out of warranty */
  const EXPIRING_DAYS = 60;
  const warranty = (m) => {
    if (m.status === 'pending' || !m.warrantyEnd) return { state: 'none', label: 'Not verified', tone: '' };
    const left = r.daysFromToday(m.warrantyEnd);
    if (left < 0) return { state: 'out', label: 'Out of warranty', tone: '', left };
    if (left <= EXPIRING_DAYS) return { state: 'expiring', label: `Expiring in ${left} days`, tone: 'amber', left };
    return { state: 'in', label: 'In warranty', tone: 'green', left };
  };
  const warrantyTag = (m) => { const w = warranty(m); return r.tag(w.label, w.tone); };

  const amcOf = (m) => (m.amc ? r.amc(m.amc) : null);
  const AMC = { active: ['AMC active', 'blue'], expiring: ['AMC expiring', 'amber'], expired: ['AMC expired, grace', 'red'] };
  const amcTag = (m) => { const c = amcOf(m); return c ? r.tag(...AMC[c.status]) : '<span class="faint">None</span>'; };

  const STATUS = { running: ['Running', 'green'], idle: ['Idle', ''], repair: ['Repair', 'amber'], down: ['Repair', 'red', 'siren'],
    pending: ['Pending', 'outline', 'hourglass'], decommissioned: ['Decommissioned', 'outline'] };
  const statusTag = (s) => r.tag(...STATUS[s]);

  const DONE = ['closed', 'cancelled', 'rejected'];
  const tickets = (serial) => r.tickets.filter((t) => t.machine === serial);
  const openTickets = (serial) => tickets(serial).filter((t) => !DONE.includes(t.status));
  const serialOf = () => new URLSearchParams(location.search).get('m');
  const fromQuery = (fallback) => r.machine(serialOf() || fallback);
  const where = (m) => `${r.company(m.company).name.replace(/ (Industries|Pvt Ltd)$/, '')}, ${r.site(m.company, m.site).name}`;

  /* every event in a machine's life, newest first (D302 History tab, D314). Claims come from claims.js when loaded */
  const KIND = { install: ['Installation', 'factory', 'green'], service: ['Service', 'wrench', 'blue'], parts: ['Parts', 'package', 'amber'],
    claim: ['Claims', 'shield-check', 'blue'], note: ['Notes', 'sticky-note', ''], status: ['Status', 'toggle', ''], warranty: ['Warranty', 'certificate', 'green'] };
  const history = (m) => {
    const i = info(m.serial);
    const ev = (when, kind, title, sub, href = '') => ({ when, kind, title, sub, href, icon: KIND[kind][1], tone: KIND[kind][2] });
    const list = [];
    if (m.status === 'pending') list.push(ev(i.submitted, 'install', 'Added in the app', `${i.submittedBy} · waiting for verification`, 'D305'));
    if (m.installed) list.push(ev(`${m.installed}T10:00`, 'install', 'Installed', `${r.site(m.company, m.site).name}`));
    if (m.commissioned) list.push(ev(`${m.commissioned}T16:00`, 'install', 'Commissioned, warranty started', i.commissioning ? `${i.commissioning.by} · signed by ${i.commissioning.signedBy}` : 'Warranty 12 months'));
    i.extensions.forEach((x) => list.push(ev(`${x.when}T12:00`, 'warranty', `Warranty extended to ${r.date(x.to)}`, `${x.by} · ${x.reason}`, 'D307')));
    (i.statusLog || []).forEach(([when, from, to, by]) => list.push(ev(when, 'status', `Status: ${from} to ${to}`, by)));
    tickets(m.serial).forEach((t) => {
      list.push(ev(t.created, t.type === 'Spare part fitting' ? 'parts' : 'service', t.type, `${t.number} · ${r.ticketLabel(t.status)} · ${t.summary}`, `D403?t=${t.number}`));
      ZX.data.reports.filter((rep) => rep.ticket === t.number).forEach((rep) => rep.parts.forEach(([no, name, qty]) =>
        list.push(ev(`${rep.date}T15:00`, 'parts', `Part fitted: ${name}`, `${no} · qty ${qty} · ${t.number}`, `D403?t=${t.number}`))));
    });
    (ZXA.data.claims || []).filter((c) => c.machine === m.serial).forEach((c) =>
      list.push(ev(c.submitted, 'claim', `Warranty claim, ${c.category.toLowerCase()}`, `${c.number} · ${c.summary}`, `D502?c=${c.number}`)));
    i.notes.forEach((n) => list.push(ev(n.when, 'note', `Note by ${n.by}`, n.text)));
    return list.sort((p, q) => q.when.localeCompare(p.when));
  };

  /* ponytail: a look-alike QR pattern seeded by the text, not a real encoding; the live label uses a QR library on the server */
  const qr = (text, px = 120) => {
    const n = 25;
    let seed = [...text].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
    const bit = () => { seed = (seed * 1103515245 + 12345) >>> 0; return (seed >>> 16) & 1; };
    const corner = (x, y) => [[0, 0], [n - 7, 0], [0, n - 7]].find(([cx, cy]) => x >= cx - 1 && x <= cx + 7 && y >= cy - 1 && y <= cy + 7);
    let d = '';
    for (let y = 0; y < n; y += 1) for (let x = 0; x < n; x += 1) {
      const c = corner(x, y);
      const fx = c ? x - c[0] : 0;
      const fy = c ? y - c[1] : 0;
      const on = c ? (fx >= 0 && fx <= 6 && fy >= 0 && fy <= 6 && (fx % 6 === 0 || fy % 6 === 0 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4))) : bit();
      if (on) d += `M${x} ${y}h1v1h-1z`;
    }
    return `<svg viewBox="-2 -2 ${n + 4} ${n + 4}" width="${px}" height="${px}" role="img" aria-label="QR code for ${r.esc(text)}"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><path d="${d}" fill="#18222D"/></svg>`;
  };

  /* add and edit machine form (D303, D304); m is the machine being edited, or null for a new one */
  const form = (m) => {
    const v = (value) => (value ? ` value="${r.esc(value)}"` : '');
    const opt = (value, label, on) => `<option value="${r.esc(value)}"${on ? ' selected' : ''}>${r.esc(label)}</option>`;
    const mdl = m ? model(m) : a.models[0];
    const companies = ZX.data.companies;
    const co = companies.find((c) => c.id === (m?.company ?? 'shree'));
    return `
    <section class="form-section"><h3>Machine</h3><p>The serial is on the nameplate. It is unique and never reused.</p>
      <div class="form-grid">
        <div class="field"><label for="f-serial">Serial number</label><input class="input mono" id="f-serial" maxlength="20"${v(m?.serial)} placeholder="ZP-TF-2602" data-invalid-on="serial-exists errors">
          <span class="hint" data-when="ready warning">6 to 20 letters or digits</span>
          <span class="error" data-when="errors">${r.icon('warning-circle')}Enter 6 to 20 letters or digits</span>
          <span class="error" data-when="serial-exists">${r.icon('warning-circle')}ZP-TF-2310 is already in the register</span></div>
        <div class="field"><label for="f-model">Model</label><select class="select" id="f-model" data-invalid-on="errors">${m ? '' : opt('', 'Choose a model', false)}
          ${a.models.filter((x) => x.status === 'active').map((x) => opt(x.name, `${x.name} · ${x.series}`, m && x.name === m.model)).join('')}</select>
          <span class="error" data-when="errors">${r.icon('warning-circle')}Choose a model</span></div>
        <div class="field"><label for="f-company">Customer</label><select class="select" id="f-company">${companies.map((c) => opt(c.id, `${c.name} · ${c.code}`, c === co)).join('')}</select></div>
        <div class="field"><label for="f-site">Site</label><select class="select" id="f-site">${co.sites.map((x) => opt(x.id, x.name, m?.site === x.id)).join('')}</select></div>
        <div class="field"><label for="f-nick">Nickname <span class="opt">optional</span></label><input class="input" id="f-nick" maxlength="40"${v(m?.nickname)}><span class="hint">What the customer calls it, for example Line 1 former</span></div>
        <div class="field"><label for="f-hours">Running hours at handover</label><input class="input" id="f-hours" type="number" min="0" value="${m ? 0 : ''}"></div>
      </div></section>
    <section class="form-section"><h3>Dates and warranty</h3><p>Warranty is 12 months from the start date for all models.</p>
      <div class="form-grid">
        <div class="field"><label for="f-inst">Installed</label><input class="input" id="f-inst" type="date"${v(m?.installed)}></div>
        <div class="field"><label for="f-comm">Commissioned</label><input class="input" id="f-comm" type="date"${v(m?.commissioned)}></div>
        <div class="field"><label for="f-ws">Warranty start</label><input class="input" id="f-ws" type="date"${v(m ? warrantyStart(m) : '')}><span class="hint">Usually the commissioning date</span></div>
        <div class="field"><label for="f-we">Warranty end</label><input class="input" id="f-we" type="date"${v(m?.warrantyEnd)} data-invalid-on="errors">
          <span class="hint" data-when="ready serial-exists warning">Filled as start plus 12 months</span>
          <span class="error" data-when="errors">${r.icon('warning-circle')}Warranty end must be after the start</span></div>
        <div class="field"><label for="f-wt">Warranty type</label><select class="select" id="f-wt">${['Standard', 'Extended', 'None'].map((x) => opt(x, x, m && info(m.serial).warrantyType === x)).join('')}</select></div>
      </div></section>
    <section class="form-section"><h3>Specifications</h3><p>Filled from the model. Change only what differs on this machine.</p>
      <div class="form-grid">${(mdl?.specs || []).map(([k, val], n) => `<div class="field"><label for="f-spec${n}">${k}</label><input class="input" id="f-spec${n}" value="${r.esc(val)}"></div>`).join('')}</div></section>
    <section class="form-section"><h3>Documents and notes</h3><p>Invoice, commissioning report, manuals. PDF, JPG or PNG up to 10 MB each.</p>
      <div class="stack"><div class="drop">${r.icon('upload-simple')}<b>Drop files here or browse</b>Up to 10 files</div>
        <div class="field"><label for="f-note">Note <span class="opt">optional</span></label><textarea class="textarea" id="f-note" maxlength="500"></textarea></div></div></section>`;
  };
  /* marks fields invalid in the demo states that show their errors */
  const watchInvalid = () => {
    const sync = () => document.querySelectorAll('[data-invalid-on]').forEach((el) => {
      el.setAttribute('aria-invalid', String(el.dataset.invalidOn.split(' ').includes(document.body.dataset.state)));
    });
    new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ['data-state'] });
    sync();
  };

  return { form, watchInvalid, history, KIND, qr, info, series, model, hours, warrantyStart, baseEnd, warranty, warrantyTag, amcOf, amcTag, statusTag, STATUS, tickets, openTickets,
    fromQuery, where, all: r.machines };
})();
