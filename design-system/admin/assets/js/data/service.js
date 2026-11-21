/* Service module demo data (spec module 4, section 17) on top of ZX.data and ZXA.data.
   Tickets, people, machines and parts are looked up through ZXA.r; only what the service pages add lives here.
   Demo today is Monday 23 Nov 2026, 12:00 IST. The last block holds the small render helpers the
   ticket overlay pages share (the ticket page behind a drawer or modal). */
(() => {
  const r = ZXA.r;

  const svc = {
    /* section 14 service rules (static demo values, D1605 and D1606) */
    rates: { visitFee: 1500, labour: 750, travelPerKm: 12, freeKm: 25, gst: 18, discountLimit: 5, estimateDays: 3 },
    slots: [['9 AM to 12 PM', 9, 12], ['12 to 3 PM', 12, 15], ['3 to 6 PM', 15, 18]],
    rescheduleLimit: 2,

    /* engineer facts the dashboard adds: distance in km from each site, last phone sync, skills needed per machine type */
    engineerInfo: {
      sandeep: { km: { vatva: 6, sanand: 24, chakan: 660 }, lastSync: '2026-11-23T11:58', nextFree: 'After 6 PM today', duty: 'Busy' },
      anita: { km: { vatva: 655, sanand: 640, chakan: 8 }, lastSync: '2026-11-23T11:40', nextFree: '12 to 3 PM today', duty: 'On duty' },
    },
    skillFor: { 'Thermoforming machine': 'Thermoforming', 'Cup forming machine': 'Cup forming', 'Vacuum forming machine': 'Vacuum',
      'Blister sealing machine': 'Blister sealing', 'Plastic crusher': 'Thermoforming' },

    /* customer's preferred slots per ticket (from the app, C506) */
    preferred: {
      'TKT-2026-0133': [['2026-11-23', '12 to 3 PM'], ['2026-11-23', '3 to 6 PM']],
      'TKT-2026-0120': [['2026-11-24', '9 AM to 12 PM'], ['2026-11-25', '9 AM to 12 PM']],
      'TKT-2026-0121': [['2026-11-24', '3 to 6 PM']],
      'TKT-2026-0122': [['2026-11-25', '12 to 3 PM'], ['2026-11-26', '12 to 3 PM']],
      'TKT-2026-0123': [['2026-11-24', '12 to 3 PM'], ['2026-11-25', '9 AM to 12 PM']],
    },
    reschedules: { 'TKT-2026-0123': 1, 'TKT-2026-0125': 1, 'TKT-2026-0124': 0 },

    /* booked visits: hours are 24 h; one row per block on the schedule */
    visits: [
      { ticket: 'TKT-2026-0126', engineer: 'sandeep', date: '2026-11-23', from: 9, to: 12 },
      { ticket: 'TKT-2026-0125', engineer: 'sandeep', date: '2026-11-23', from: 12, to: 15 },
      { ticket: 'TKT-2026-0132', engineer: 'sandeep', date: '2026-11-23', from: 15, to: 16 },
      { ticket: 'TKT-2026-0127', engineer: 'sandeep', date: '2026-11-23', from: 16, to: 18 },
      { ticket: 'TKT-2026-0115', engineer: 'sandeep', date: '2026-11-23', from: 17, to: 18 },
      { ticket: 'TKT-2026-0114', engineer: 'anita', date: '2026-11-23', from: 10.5, to: 12 },
      { ticket: 'TKT-2026-0119', engineer: 'anita', date: '2026-11-23', from: 15, to: 18 },
      { ticket: 'TKT-2026-0123', engineer: 'sandeep', date: '2026-11-24', from: 12, to: 15 },
      { ticket: 'TKT-2026-0130', engineer: 'sandeep', date: '2026-11-24', from: 15, to: 18 },
      { ticket: 'TKT-2026-0124', engineer: 'sandeep', date: '2026-11-26', from: 9, to: 12 },
    ],
    /* leave and weekly off, grey on the schedule (EC-A46). Leave dates come from the engineer app */
    off: [
      { engineer: 'sandeep', from: '2026-12-04', to: '2026-12-05', label: 'Leave', note: 'Family function', status: 'Approved' },
      { engineer: 'sandeep', from: '2026-12-18', to: '2026-12-18', label: 'Leave', note: 'Personal work', status: 'Pending' },
    ],

    /* estimates (D409). QT numbers 0036 to 0042 are service estimates; lines are [type, description, qty, unit, rate] */
    estimates: [
      { number: 'QT-2026-0042', ticket: 'TKT-2026-0133', status: 'Draft', created: '2026-11-23T11:50', validUntil: '2026-11-26',
        lines: [['Labour', 'Motor and starter check', 3, 'h', 750], ['Travel', 'Travel, 8 km', 1, 'trip', 0]] },
      { number: 'QT-2026-0041', ticket: 'TKT-2026-0122', status: 'Sent', created: '2026-11-23T09:30', validUntil: '2026-11-26',
        lines: [['Part', 'Crusher blade set, 4 blades', 1, 'set', 4800], ['Labour', 'Labour', 2, 'h', 800], ['Travel', 'Travel', 1, 'trip', 1200]] },
      { number: 'QT-2026-0040', ticket: 'TKT-2026-0127', status: 'Approved', created: '2026-11-17T15:20', validUntil: '2026-11-20',
        decided: ['Rakesh Mehta', '2026-11-18T10:05'], lines: [['Part', 'PID temperature controller', 1, 'pc', 4600]] },
      { number: 'QT-2026-0039', ticket: 'TKT-2026-0130', status: 'Rejected', created: '2026-11-14T12:00', validUntil: '2026-11-17',
        decided: ['Rakesh Mehta', '2026-11-15T09:40'], reason: 'We will buy the sensor locally.',
        lines: [['Part', 'Capacitive level sensor', 1, 'pc', 2200], ['Labour', 'Labour', 1, 'h', 750]] },
      { number: 'QT-2026-0038', ticket: 'TKT-2026-0119', status: 'Sent', created: '2026-11-21T11:30', validUntil: '2026-11-24',
        lines: [['Part', 'Sealing plate gasket set', 1, 'set', 1850], ['Labour', 'Labour', 1.5, 'h', 750]] },
      { number: 'QT-2026-0037-R2', ticket: 'TKT-2026-0114', status: 'Approved', created: '2026-11-21T10:10', validUntil: '2026-11-24',
        decided: ['Imran Qureshi', '2026-11-21T13:30'], lines: [['Part', 'Trim station cutting knife', 1, 'pc', 3200], ['Labour', 'Labour', 2, 'h', 750]] },
      { number: 'QT-2026-0037', ticket: 'TKT-2026-0114', status: 'Revised', created: '2026-11-20T17:00', validUntil: '2026-11-23',
        lines: [['Part', 'Trim station cutting knife', 1, 'pc', 3200], ['Labour', 'Labour', 3, 'h', 750]] },
      { number: 'QT-2026-0036', ticket: 'TKT-2026-0124', status: 'Expired', created: '2026-11-18T15:00', validUntil: '2026-11-21',
        lines: [['Labour', 'Operator training, 4 people', 6, 'h', 750]] },
    ],

    /* D413: checklist results and the time log for SR-2026-0128 */
    reportExtra: {
      'TKT-2026-0128': {
        visit: { travel: '2026-11-21T13:30', checkIn: '2026-11-21T14:05', checkOut: '2026-11-21T16:45' },
        reported: 'Sheet sagging before the forming station. Trays come out thin on one side.',
        rootCause: 'Heater element in top zone 4 open circuit, so the sheet edge stays cold and sags in the middle.',
        checklist: [['Heater zones and elements', 'Fail', 'Zone 4 open circuit, zone 3 reads 8 percent low'], ['Industrial chains and sprockets', 'Pass', ''],
          ['Timers and relays', 'Pass', ''], ['PID controllers', 'Pass', ''], ['Vacuum system', 'Pass', ''], ['Cooling system', 'Pass', ''],
          ['Safety interlocks', 'Pass', ''], ['Lubrication', 'N/A', 'Done at the last PM'], ['Air pressure', 'Pass', '6 bar']],
        parts: [
          { part: 'ZP-SP-001', name: 'Ceramic heater element 650 W', qty: 1, source: 'SPR-2026-0029, delivered to site', returned: 'Yes', warranty: true },
          { part: null, name: 'Thermocouple, K type, 1 m', qty: 1, source: 'Engineer van stock', returned: 'No', warranty: true },
        ],
        timeLog: [['Travel', '35 min'], ['On site', '2 h 40 min'], ['Trial run', '30 sheets']],
        customerRemarks: 'Line is running well now. Please check zone 3 at the next visit.',
      },
    },

    /* D415 reopen requests from the app (C515), within 7 days of closing */
    reopen: [
      { ticket: 'TKT-2026-0118', closed: '2026-11-16', when: '2026-11-23T10:20', by: 'pooja', status: 'Pending', photos: 2,
        reason: 'Blower motor bearing noise is back since Saturday night shift.' },
      { ticket: 'TKT-2026-0117', closed: '2026-11-18', when: '2026-11-22T17:45', by: 'rakesh', status: 'Pending', photos: 1,
        reason: 'Zone 2 still runs 6 degrees hot after the calibration.' },
      { ticket: 'TKT-2026-0129', closed: '2026-11-02', when: '2026-11-21T12:30', by: 'rakesh', status: 'Pending', photos: 0,
        reason: 'Vacuum leak again near the platen seal.' },
      { ticket: 'TKT-2026-0132', closed: '2026-11-14', when: '2026-11-16T09:10', by: 'rakesh', status: 'Accepted', photos: 1,
        reason: 'Cooling fan noise came back after two days.', decided: 'Reopened, assigned to Sandeep Yadav' },
    ],

    /* D416 reassignment requests from engineers (E212) */
    reassign: [
      { ticket: 'TKT-2026-0124', engineer: 'sandeep', when: '2026-11-23T11:15', status: 'Pending',
        reason: 'Sanand AMC visit runs late on Thursday. Cannot reach Vatva by 9 AM.' },
      { ticket: 'TKT-2026-0119', engineer: 'anita', when: '2026-11-23T11:48', status: 'Pending',
        reason: 'Vehicle breakdown on the way back from Talegaon.' },
      { ticket: 'TKT-2026-0119', engineer: 'sandeep', when: '2026-11-21T08:40', status: 'Approved',
        reason: 'Nova Cups is in Pune, outside my region.', decided: 'Moved to Anita Verma' },
      { ticket: 'TKT-2026-0127', engineer: 'sandeep', when: '2026-11-18T13:00', status: 'Declined',
        reason: 'Waiting for the PID controller.', decided: 'Hold the ticket instead; part arrives Tuesday' },
    ],

    /* D417 escalations from engineers (E211) */
    escalations: [
      { id: 'ESC-0018', ticket: 'TKT-2026-0126', engineer: 'sandeep', level: 'Technical help', when: '2026-11-23T11:30', status: 'Open', photos: 2,
        notes: 'E-17 comes back 2 minutes after start even with the new chain. Suspect the servo drive. Need wiring diagram for AFM-1000.' },
      { id: 'ESC-0017', ticket: 'TKT-2026-0119', engineer: 'anita', level: 'Senior engineer', when: '2026-11-23T09:05', status: 'Open', photos: 0,
        notes: 'Sealing plate temperature swings 12 degrees. Need a second opinion before changing the controller.' },
      { id: 'ESC-0016', ticket: 'TKT-2026-0127', engineer: 'sandeep', level: 'Manager', when: '2026-11-18T12:10', status: 'Resolved', photos: 1,
        notes: 'Customer wants the job finished today but the controller is not in stock.', resolved: 'Mr Kapoor called the customer. Hold agreed.' },
    ],

    /* D418 SLA breaches and near misses */
    breaches: [
      { ticket: 'TKT-2026-0130', target: 'Resolution', due: '2026-11-23T07:00', state: ['Breached by 5 h', 'breach'], owner: 'sandeep',
        reason: 'Customer not available, visit failed. Moved to 24 Nov.' },
      { ticket: 'TKT-2026-0133', target: 'Response', due: '2026-11-23T15:20', state: ['3 h 20 min left', 'risk'], owner: null, reason: '' },
      { ticket: 'TKT-2026-0132', target: 'Resolution', due: '2026-11-23T14:10', state: ['2 h 10 min left', 'risk'], owner: 'sandeep', reason: '' },
      { ticket: 'TKT-2026-0123', target: 'Accept', due: '2026-11-23T12:18', state: ['Offer 18 min left', 'risk'], owner: 'sandeep', reason: '' },
      { ticket: 'TKT-2026-0116', target: 'Response', due: '2026-11-09T15:00', state: ['Breached by 2 h', 'breach'], owner: 'sandeep', closed: true,
        company: 'shree', machine: 'ZP-TF-2204', severity: 'production', reason: 'Engineer stuck at Sanand, traffic on SG Highway.' },
    ],

    /* D420 ratings after closing (C514) */
    feedback: [
      { ticket: 'TKT-2026-0129', engineer: 'sandeep', by: 'rakesh', company: 'shree', rating: 5, when: '2026-11-03T10:12',
        tags: ['On time', 'Explained the work'], comment: 'Quick and clean preventive visit.' },
      { ticket: 'TKT-2026-0117', engineer: 'sandeep', by: 'rakesh', company: 'shree', rating: 5, when: '2026-11-18T18:20',
        tags: ['Fixed first time'], comment: '' },
      { ticket: 'TKT-2026-0118', engineer: 'sandeep', by: 'pooja', company: 'shree', rating: 4, when: '2026-11-16T17:05',
        tags: ['Polite'], comment: 'Good work. Had to wait for the bearing.' },
      { ticket: 'TKT-2026-0116', engineer: 'sandeep', by: 'pooja', company: 'shree', rating: 2, when: '2026-11-11T19:40',
        tags: ['Late'], comment: 'Engineer came 2 hours late and the line was down all morning.', low: true },
      { ticket: 'TKT-2026-0112', engineer: 'sandeep', by: 'rakesh', company: 'shree', rating: 4, when: '2026-10-22T12:00',
        tags: ['Clean work'], comment: '' },
      { ticket: 'TKT-2026-0108', engineer: 'anita', by: 'imran', company: 'nova', rating: 5, when: '2026-10-30T16:45',
        tags: ['On time', 'Fixed first time'], comment: 'Anita sorted the cup stacker in an hour.' },
    ],

    /* D421 extra work found on site (E221) */
    extraWork: [
      { ticket: 'TKT-2026-0126', engineer: 'sandeep', when: '2026-11-23T10:40', status: 'New', photos: 2, estimate: true,
        text: 'Drive sprocket teeth are worn. Replace the sprocket with the chain, about 1.5 h more.' },
      { ticket: 'TKT-2026-0119', engineer: 'anita', when: '2026-11-23T08:30', status: 'Estimate sent', photos: 1, estimate: true,
        text: 'Gasket set on the sealing plate is hard and cracked.', quote: 'QT-2026-0038' },
      { ticket: 'TKT-2026-0125', engineer: 'sandeep', when: '2026-11-22T16:10', status: 'Declined', photos: 0, estimate: false,
        text: 'Clean the vacuum tank while on site.', decided: 'Covered by AMC, no estimate needed' },
    ],

    /* D423 likely duplicates: same machine within 10 minutes, or similar text */
    duplicates: [
      { kind: 'Same machine within 10 minutes', a: 'TKT-2026-0133',
        b: { number: 'TKT-2026-0134', status: 'submitted', machine: 'ZP-CF-2108', company: 'nova', by: 'rakesh', created: '2026-11-23T11:26',
          severity: 'down', summary: 'Cup line 1 main motor not starting.' } },
    ],

    /* D425 machine down requests (C1501, C1502) */
    machineDown: [
      { ticket: 'TKT-2026-0133', acknowledged: false, calls: [['11:24', 'No answer']], afterHours: false },
      { ticket: 'TKT-2026-0126', acknowledged: '2026-11-23T07:52', calls: [['07:50', 'Spoke to Rakesh Mehta. Engineer sent']], afterHours: true },
    ],

    /* D426 items from the engineer app that could not merge (EC-A17) */
    sync: [
      { id: 'SYN-0042', ticket: 'TKT-2026-0130', engineer: 'sandeep', kind: 'Conflict', field: 'Status', when: '2026-11-22T17:20',
        mine: ['Visit failed', 'Customer not available, waited 25 min'], theirs: ['Scheduled, Tue 24 Nov, 3 to 6 PM', 'Moved by Rajesh Goyal at 16:55'] },
      { id: 'SYN-0041', ticket: 'TKT-2026-0128', engineer: 'sandeep', kind: 'Rejected field', field: 'Time on site', when: '2026-11-22T09:15',
        mine: ['3 h 10 min', 'Edited after the report was submitted'], theirs: ['2 h 40 min', 'From check in and check out'] },
      { id: 'SYN-0040', ticket: 'TKT-2026-0126', engineer: 'sandeep', kind: 'Late upload', field: 'Photos', when: '2026-11-23T10:58',
        mine: ['4 photos, Line 2 former', 'Taken 09:40 to 10:20'], theirs: ['2 photos', 'Report draft has 2 photos'] },
    ],
  };

  /* ---------- helpers the service pages share ---------- */
  const slotHours = (slot) => svc.slots.find(([label]) => label === slot);
  const visitsOn = (engineer, date) => svc.visits.filter((v) => v.engineer === engineer && v.date === date).sort((x, y) => x.from - y.from);
  const offOn = (engineer, date) => svc.off.find((o) => o.engineer === engineer && date >= o.from && date <= o.to);
  /* jobs that overlap a slot on a day (EC-A47) */
  const clashes = (engineer, date, slot, except = '') => {
    const [, from, to] = slotHours(slot);
    return visitsOn(engineer, date).filter((v) => v.ticket !== except && v.from < to && v.to > from);
  };
  /* the ticket in ?t=, else the page's default */
  const ticketFromQuery = (fallback) => r.ticket(new URLSearchParams(location.search).get('t') || fallback) || r.ticket(fallback);
  const hours = (h) => `${Math.floor(h) % 12 || 12}${h % 1 ? ':30' : ''} ${h < 12 ? 'AM' : 'PM'}`;

  /* the ticket page behind a drawer or modal: header, request card, customer and machine cards (a compact D403) */
  const backdrop = (t, actions = '') => {
    const m = r.machine(t.machine);
    const c = r.company(t.company);
    const s = r.site(t.company, t.site);
    const e = t.engineer ? r.engineer(t.engineer) : null;
    const p = r.person(t.by);
    return `<div class="detail-head"><div class="grow">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="#D401">Service tickets</a>${r.icon('caret-right')}<a href="#D403?t=${t.number}">${t.number}</a></nav>
        <div class="record-head"><h1>${t.number}</h1><span class="tags">${r.ticketTag(t.status)}${t.severity ? r.severityTag(t.severity) : ''}${r.coverageTag(t.coverage)}${r.priorityTag(t.priority)}</span></div>
        <div class="meta"><span>${r.icon('wrench')}${t.type}</span><span>${r.icon('clock')}Raised ${r.date(t.created)}, ${r.time(t.created)} · ${t.source}</span><span>${r.sla(t.sla)}</span></div></div>${actions ? `<div class="action-bar">${actions}</div>` : ''}</div>
      <div class="detail">
        <section class="card"><div class="card-head"><h2 class="grow">Request</h2></div><div class="card-body stack">
          <p style="color:var(--text-strong)">${r.esc(t.summary)}</p>
          <dl class="dl"><dt>Machine</dt><dd>${m.model}<br><span class="mono muted">${m.serial}</span></dd>
            <dt>Site</dt><dd>${s.name}, ${c.city}<br><span class="muted">${s.pincode}</span></dd>
            <dt>Window</dt><dd>${t.window ? `${r.dayDate(t.window.date)}, ${t.window.slot}` : '<span class="faint">Not set</span>'}</dd>
            <dt>Engineer</dt><dd>${e ? e.name : '<span class="red-text">Unassigned</span>'}</dd></dl></div></section>
        <aside><section class="card side-card"><div class="card-head"><h3 class="grow">Customer</h3></div><div class="card-body">
          <div class="who"><span class="avatar blue">${p.initials}</span><span><b>${p.name}</b><small>${c.name}</small></span></div></div></section>
          <section class="card side-card"><div class="card-head"><h3 class="grow">Machine</h3></div><div class="card-body">
          <div class="who"><span class="thumb">${r.icon('factory')}</span><span><b>${m.model}</b><small class="mono">${m.serial}</small></span></div></div></section></aside>
      </div>`;
  };

  /* ticket facts for a quick view drawer (schedule, map, lists) */
  const quickFacts = (t) => {
    const c = r.company(t.company);
    const s = r.site(t.company, t.site);
    const m = r.machine(t.machine);
    const e = t.engineer ? r.engineer(t.engineer) : null;
    return `<div class="tags">${r.ticketTag(t.status)}${t.severity ? r.severityTag(t.severity) : ''}${r.coverageTag(t.coverage)}${r.priorityTag(t.priority)}</div>
      <p>${r.esc(t.summary)}</p>
      <dl class="dl"><dt>SLA</dt><dd>${r.sla(t.sla)}</dd><dt>Customer</dt><dd>${c.name}<br><span class="muted">${s.name}, ${s.pincode}</span></dd>
        <dt>Machine</dt><dd>${m.model}<br><span class="mono muted">${m.serial}</span></dd>
        <dt>Engineer</dt><dd>${e ? `${e.name}<br><span class="muted">${e.phone}</span>` : '<span class="red-text">Unassigned</span>'}</dd>
        <dt>Window</dt><dd>${t.window ? `${r.dayDate(t.window.date)}, ${t.window.slot}` : 'Not set'}</dd></dl>`;
  };

  ZXA.data.service = svc;
  ZXA.svc = { slotHours, visitsOn, offOn, clashes, ticketFromQuery, hours, backdrop, quickFacts };
})();
