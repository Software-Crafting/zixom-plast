/* Warranty claims demo data (spec module 5, section 17). WCL-2026-0040 to 0046 are the Shree claims the app shows
   (C301, C308, C310), with the same status, machine, category, dates and text; 0038 and 0039 are Nova claims only
   the dashboard sees (one past its information deadline, one for a machine out of warranty). ZXA.cl at the bottom
   joins them for the pages. Review target 2 working days, information wait 7 days, appeal answer 3 working days. */
window.ZXA = window.ZXA || {};

Object.assign(ZXA.data, {
  claims: [
    { number: 'WCL-2026-0040', status: 'submitted', machine: 'ZP-TF-2310', by: 'pooja', category: 'Heating', part: 'Ceramic heater element 650 W',
      started: '2026-11-21', stopped: false, code: '', submitted: '2026-11-22T15:10', due: '2026-11-25T12:00', evidence: [3, 0],
      summary: 'Heater zone 3 does not reach the set temperature. Corners of the cups stay thin.' },
    { number: 'WCL-2026-0041', status: 'under-review', machine: 'ZP-TF-2310', by: 'pooja', category: 'Mechanical', part: '',
      started: '2026-11-19', stopped: false, code: '', submitted: '2026-11-20T11:30', reviewed: '2026-11-21T10:15', due: '2026-11-24T11:30', evidence: [2, 1],
      summary: 'Mould clamp does not lock fully on the right side. Parts flash on one edge.' },
    { number: 'WCL-2026-0042', status: 'info-requested', machine: 'ZP-TF-2204', by: 'rakesh', category: 'Vacuum or pneumatic', part: 'Vacuum gauge, analogue',
      started: '2026-11-16', stopped: false, code: '', submitted: '2026-11-18T09:40', reviewed: '2026-11-19T11:00', requested: '2026-11-20T12:00',
      deadline: '2026-11-27', reminders: 1, questions: ['Share a video of the vacuum gauge during one forming cycle.', 'Add a photo of the seal.'],
      evidence: [4, 0], summary: 'Vacuum drops at the forming station. Corners do not form fully.' },
    { number: 'WCL-2026-0043', status: 'approved', machine: 'ZP-TF-2204', by: 'rakesh', category: 'Mechanical', part: 'Industrial chain set, 12B',
      started: '2026-11-22', stopped: true, code: 'E-17', submitted: '2026-11-22T18:30', reviewed: '2026-11-22T19:10', decided: '2026-11-23T07:40',
      coverage: 'Full', ticket: 'TKT-2026-0126', reason: 'Chain tensioner spring failed. Covered as a manufacturing defect.', evidence: [3, 1],
      summary: 'Chain drive trips with error E-17 on the HMI. Machine stopped.' },
    { number: 'WCL-2026-0044', status: 'rejected', machine: 'ZP-TF-2310', by: 'rakesh', category: 'Electrical', part: '',
      started: '2026-11-15', stopped: true, code: 'F-03', submitted: '2026-11-16T14:05', reviewed: '2026-11-17T10:00', decided: '2026-11-18T16:30',
      rejectReason: 'Out of scope: power supply', reason: 'The burnt supply cable shows a voltage surge from outside the machine. Damage from the power supply is not covered.',
      evidence: [2, 0], summary: 'Main motor fuse blew twice in one shift.',
      appeal: { submitted: '2026-11-20T10:15', due: '2026-11-25T10:15', status: 'open', evidence: ['Stabiliser log, 15 Nov.pdf', 'Motor terminal photo'],
        reason: 'Our line has a servo stabiliser. Its log shows no surge on 15 Nov. The cable burnt at the motor terminal.' } },
    { number: 'WCL-2026-0045', status: 'resolved', machine: 'ZP-TF-2310', by: 'pooja', category: 'Heating', part: 'Ceramic heater element 650 W',
      started: '2026-11-15', stopped: false, code: '', submitted: '2026-11-16T09:20', reviewed: '2026-11-16T15:00', decided: '2026-11-17T08:15',
      coverage: 'Full', ticket: 'TKT-2026-0128', reason: 'Heater element open circuit. Covered under warranty.', evidence: [3, 0],
      summary: 'Sheet sags before the forming station.' },
    { number: 'WCL-2026-0046', status: 'cancelled', machine: 'ZP-TF-2204', by: 'rakesh', category: 'Control or PLC', part: '',
      started: '2026-11-09', stopped: false, code: '', submitted: '2026-11-10T10:00', cancelled: '2026-11-11T09:30',
      reason: 'Fixed after a PLC restart.', evidence: [1, 0], summary: 'HMI freezes on recipe change.' },
    { number: 'WCL-2026-0039', status: 'submitted', machine: 'ZP-CF-2108', by: 'imran', category: 'Electrical', part: '',
      started: '2026-11-18', stopped: true, code: '', submitted: '2026-11-19T10:30', due: '2026-11-23T10:30', evidence: [2, 0],
      summary: 'Main motor overheats and trips after 40 minutes of running.' },
    { number: 'WCL-2026-0038', status: 'info-requested', machine: 'ZP-BS-2215', by: 'imran', category: 'Heating', part: 'PID temperature controller',
      started: '2026-11-14', stopped: false, code: 'H-02', submitted: '2026-11-16T12:20', reviewed: '2026-11-17T10:30', requested: '2026-11-18T11:00',
      deadline: '2026-11-21', reminders: 2, questions: ['Share the invoice for the warranty extension you mention.'],
      evidence: [1, 0], summary: 'Sealing plate temperature swings by 15 degrees.' },
  ],

  /* messages with the customer per claim; note: only Admins see it */
  claimMessages: {
    'WCL-2026-0041': [['them', 'The right clamp also leaks oil at the cylinder.', 'Pooja Shah · Sat 21 Nov, 9:02 AM']],
    'WCL-2026-0042': [['me', 'Please share a video of the vacuum gauge during one forming cycle and a photo of the seal.', 'You · Fri 20 Nov, 12:00 PM'],
      ['note', 'Gauge is the old analogue part (discontinued). Check the seal first.', 'You · Fri 20 Nov, 12:05 PM · only Admins see this']],
    'WCL-2026-0043': [['me', 'Approved. Sandeep is visiting this morning.', 'You · Mon 23 Nov, 7:40 AM']],
    'WCL-2026-0044': [['them', 'Our supply has a stabiliser. Can you check again?', 'Rakesh Mehta · Thu 19 Nov, 10:15 AM']],
  },

  /* message templates (D508); variables in braces */
  claimTemplates: [
    { id: 't1', kind: 'Rejection', name: 'Out of warranty', on: true, uses: 3,
      text: 'Your claim {claim} for {machine} ({serial}) is outside the warranty, which ended on {warranty_end}. We can send an engineer as a paid visit.' },
    { id: 't2', kind: 'Rejection', name: 'Not a defect', on: true, uses: 2,
      text: 'We checked claim {claim}. The problem on {machine} is not a manufacturing defect: {reason}. You can appeal within 7 days.' },
    { id: 't3', kind: 'Rejection', name: 'Misuse', on: true, uses: 0,
      text: 'Claim {claim} is not covered. The damage comes from running {machine} outside the manual: {reason}.' },
    { id: 't4', kind: 'Rejection', name: 'Unauthorised repair', on: true, uses: 1,
      text: 'Claim {claim} is not covered because {machine} was repaired by someone other than Zixom.' },
    { id: 't5', kind: 'Rejection', name: 'Insufficient evidence', on: true, uses: 1,
      text: 'We could not confirm the fault in claim {claim} from the photos. Please raise a new claim with a clear video.' },
    { id: 't6', kind: 'Rejection', name: 'Out of scope: power supply', on: true, uses: 1,
      text: 'Claim {claim}: {reason} Damage from the power supply is not covered. You can appeal within 7 days.' },
    { id: 't7', kind: 'Rejection', name: 'Other', on: true, uses: 0, text: 'Claim {claim}: {reason}' },
    { id: 't8', kind: 'Approval', name: 'Full cover', on: true, uses: 4,
      text: 'Claim {claim} is approved. Service request {ticket} is created at no charge. {engineer} will confirm the visit.' },
    { id: 't9', kind: 'Approval', name: 'Parts only', on: true, uses: 0,
      text: 'Claim {claim} is approved for parts. Labour for {ticket} is charged at the standard rate.' },
    { id: 't10', kind: 'Approval', name: 'Labour only', on: false, uses: 0,
      text: 'Claim {claim} is approved for labour. Parts for {ticket} are charged.' },
    { id: 't11', kind: 'Information request', name: 'Video of the fault', on: true, uses: 2,
      text: 'To decide claim {claim} we need: {questions}. Please reply by {deadline}.' },
  ],

  /* published and older versions of the warranty terms (D506) */
  policyVersions: [
    { version: 'v3', status: 'published', when: '2026-04-01', by: 'Rajesh Goyal', claims: 9, note: 'Power supply damage named as excluded' },
    { version: 'v2', status: 'old', when: '2025-08-15', by: 'Rajesh Goyal', claims: 21, note: 'Wear parts list added' },
    { version: 'v1', status: 'old', when: '2024-01-10', by: 'Rajesh Goyal', claims: 34, note: 'First version' },
  ],
  policy: {
    months: 12, start: 'Commissioning date',
    covered: ['Parts with a manufacturing defect', 'Engineer visits and labour', 'Heaters, PID controllers and timers', 'Chain drive, vacuum pump, PLC and HMI'],
    excluded: ['Misuse or running outside the manual', 'Consumables: moulds, blades, belts, filters', 'Damage from the power supply', 'Repairs by anyone other than Zixom'],
    wear: ['Cutting knives and blades', 'Belts and gaskets', 'Filters', 'Moulds and tooling', 'Fuses and lamps'],
    conditions: ['Genuine Zixom spare parts only', 'Operators trained by Zixom', 'Running hours logged at least monthly', 'Machine on a stabilised supply'],
    bySeries: [['Thermoforming', 'Heaters, chain drive, vacuum pump, PLC, HMI', 'Moulds, knives, belts'],
      ['Vacuum forming', 'Heaters, vacuum pump, timers', 'Moulds, gaskets'], ['Cup forming', 'Heaters, PID, drive, PLC', 'Moulds, cutting rings'],
      ['Crusher', 'Motor, bearings, body', 'Blades, screens'], ['Blister sealing', 'Sealing plate heater, PID, PLC', 'Gaskets, foil cutters']],
  },
});

/* ---------- joins and chips for the claim pages ---------- */
ZXA.cl = (() => {
  const r = ZXA.r;
  const a = ZXA.data;
  const STATUS = {
    'submitted': ['Submitted', 'blue'], 'under-review': ['Under review', 'blue'], 'info-requested': ['Information requested', 'amber'],
    'approved': ['Approved', 'green'], 'rejected': ['Rejected', 'red'], 'appeal': ['Appeal', 'amber'], 'resolved': ['Resolved', 'green'],
    'closed': ['Closed', ''], 'cancelled': ['Cancelled', ''],
  };
  /* Admin status (section 11): a rejected claim with an open appeal reads Appeal; the app keeps showing Rejected */
  const state = (c) => (c.status === 'rejected' && c.appeal?.status === 'open' ? 'appeal' : c.status);
  const tag = (c) => r.tag(...STATUS[state(c)]);
  const claims = a.claims.map((c) => {
    const m = r.machine(c.machine);
    return { ...c, company: m.company, site: m.site };
  }).sort((x, y) => y.submitted.localeCompare(x.submitted));
  const claim = (number) => claims.find((c) => c.number === number);
  const fromQuery = (fallback) => claim(new URLSearchParams(location.search).get('c') || fallback);

  const OPEN = ['submitted', 'under-review'];
  const hoursLeft = (iso) => Math.round((new Date(iso) - new Date(ZX.data.now)) / 3600000);
  /* review target: 2 working days from submission; claims past it are red */
  const review = (c) => {
    if (!OPEN.includes(c.status)) return '<span class="faint">–</span>';
    const h = hoursLeft(c.due);
    if (h < 0) return `<span class="sla breach">${r.icon('warning-circle')}Overdue ${-h < 24 ? `${-h} h` : `${Math.round(-h / 24)} d`}</span>`;
    return `<span class="sla ${h <= 24 ? 'risk' : 'ok'}">${r.icon(h <= 24 ? 'clock-countdown' : 'check-circle')}${h < 24 ? `${h} h left` : `${Math.round(h / 24)} d left`}</span>`;
  };
  const deadline = (c) => {
    if (c.status !== 'info-requested') return '<span class="faint">–</span>';
    const left = r.daysFromToday(c.deadline);
    return left < 0 ? `<span class="red-text strong">${r.date(c.deadline)}</span><span class="sub red-text">${-left} d past</span>`
      : `${r.date(c.deadline)}<span class="sub">${left} d left</span>`;
  };
  const age = (c) => {
    const h = Math.round((new Date(ZX.data.now) - new Date(c.submitted)) / 3600000);
    return h < 24 ? `${Math.max(1, h)} h` : `${Math.round(h / 24)} d`;
  };
  /* Approve is hidden when the warranty ended before the fault started (D503, F4) */
  const warrantyEnded = (c) => { const m = r.machine(c.machine); return !m.warrantyEnd || m.warrantyEnd < c.started; };
  const decision = (c) => ({
    approved: `Approved, ${c.coverage}`, resolved: `Approved, ${c.coverage}`, rejected: 'Rejected', cancelled: 'Withdrawn by customer',
  }[c.status] || '<span class="faint">Pending</span>');
  const isAppeal = (c) => Boolean(c.appeal);

  /* same machine and category within 30 days before: flagged as a possible duplicate */
  const duplicateOf = (c) => claims.find((o) => o !== c && o.machine === c.machine && o.category === c.category && o.status !== 'cancelled'
    && o.submitted < c.submitted && (new Date(c.submitted) - new Date(o.submitted)) / 86400000 <= 30);

  /* record head and Claim tab, shared by D502 and the pages that open over it (D503) */
  const head = (c) => {
    const m = r.machine(c.machine);
    const w = ZXA.mx.warranty(m);
    return `<nav class="crumbs" aria-label="Breadcrumb"><a href="#D501">Warranty claims</a>${r.icon('caret-right')}<span>${c.number}</span></nav>
      <div class="record-head"><h1>${c.number}</h1><span class="tags">${tag(c)}${ZXA.mx.warrantyTag(m)}</span></div>
      <div class="meta"><span>${r.icon('factory')}${m.model} · <span class="mono">${m.serial}</span></span>
        <span>${r.icon('shield-check')}Warranty ${m.warrantyEnd ? `ends ${r.date(m.warrantyEnd)}${w.left >= 0 ? `, ${w.left} days left` : ''}` : 'not started'}</span>
        <span>${r.icon('clock')}Submitted ${r.date(c.submitted)}, ${r.time(c.submitted)} · ${c.source || 'App'}</span>${OPEN.includes(c.status) ? review(c) : ''}</div>`;
  };
  const claimTab = (c) => {
    const p = r.person(c.by);
    const s = r.site(c.company, c.site);
    const shots = ['Fault close up', 'Machine', 'HMI screen', 'Nameplate'].slice(0, c.evidence[0]);
    return `<div class="stack">
      <div><h3 style="font-size:16px">Problem</h3><p style="margin-top:6px; color:var(--text-strong)">${r.esc(c.summary)}</p></div>
      <dl class="dl"><dt>Category</dt><dd>${c.category}</dd><dt>Part</dt><dd>${c.part || '<span class="faint">Not given</span>'}</dd>
        <dt>Started on</dt><dd>${r.date(c.started)}</dd><dt>Machine stopped</dt><dd>${c.stopped ? 'Yes' : 'No'}</dd>
        <dt>Error code</dt><dd>${c.code ? `<span class="mono">${c.code}</span>` : '<span class="faint">None</span>'}</dd></dl>
      <div><div class="row" style="margin-bottom:10px"><h3 class="grow" style="font-size:16px">Evidence</h3><button class="btn btn-sm btn-ghost" type="button" data-toast="All files downloaded">${r.icon('download-simple')}Download all</button></div>
        <div class="gallery">${shots.map((x) => `<div class="ph">${r.icon('image')}<small>${x}</small></div>`).join('')}${c.evidence[1] ? `<div class="ph">${r.icon('video-camera')}<small>Video, 0:38</small></div>` : ''}</div></div>
      <div class="grid cols-2" style="gap:20px">
        <dl class="dl stack"><dt>Contact</dt><dd>${p.name} · <a href="tel:${p.mobile.replace(/\s/g, '')}">${p.mobile}</a><br><span class="muted">${p.designation}</span></dd></dl>
        <dl class="dl stack"><dt>Site</dt><dd>${s.name}<br><span class="muted">${s.address}, ${s.pincode}</span></dd></dl></div>
    </div>`;
  };

  return { duplicateOf, head, claimTab, STATUS, state, tag, claims, claim, fromQuery, review, deadline, age, warrantyEnded, decision, isAppeal, hoursLeft, OPEN };
})();
