/* Engineers and safety (D701 to D736). Builds on ZX.data.engineers and ZX.data.engineerDay (read only);
   only what the dashboard adds lives here. Same values as the engineer app screens (E702, E705, E808, E903,
   E905, E1010, E1012) so a flow can be followed from the app. Today is Monday 23 Nov 2026, 12:00 IST. */
window.ZXA = window.ZXA || {};

ZXA.data.eng = {
  /* admin fields per engineer. duty comes from the app (On duty, Off duty, Busy); status is set here (section 11) */
  profiles: {
    sandeep: {
      status: 'Active', duty: 'Busy', email: 'sandeep.yadav@zixom.in', joined: '2017-08-01', mobile: '+91 99090 33114',
      now: 'On site, TKT-2026-0126', next: 'TKT-2026-0125 at 12 PM, Sanand', jobsToday: 5, lastActive: '2026-11-23T11:58',
      appVersion: '2.4.1', hours: 'Mon to Sat, 9 AM to 6 PM', area: ['Vatva and Naroda', 'Sanand', 'Changodar', 'Gandhinagar'],
      device: { model: 'Samsung Galaxy M34', os: 'Android 14', since: '2026-03-12', lastSeen: '2026-11-23T11:58', push: 'Delivering' },
      location: { mode: 'At site', place: 'Vatva plant, Gate 2', when: '2026-11-23T11:58' },
      notes: 'Lead engineer for the AFM range. Trains new engineers on PLC faults.',
      levels: { Thermoforming: 3, PLC: 2, Vacuum: 3 },
    },
    anita: {
      status: 'Active', duty: 'On duty', email: 'anita.verma@zixom.in', joined: '2022-06-15', mobile: '+91 98815 20761',
      now: 'Travelling to Chakan', next: 'TKT-2026-0119 at 3 PM, Chakan', jobsToday: 2, lastActive: '2026-11-23T11:55',
      appVersion: '2.4.1', hours: 'Mon to Sat, 9 AM to 6 PM', area: ['Chakan', 'Bhosari and Pimpri', 'Chinchwad', 'Talegaon'],
      device: { model: 'Redmi Note 13', os: 'Android 14', since: '2025-07-01', lastSeen: '2026-11-23T11:55', push: 'Delivering' },
      location: { mode: 'Travelling', place: 'Near Chakan MIDC Phase 1, ETA 20 min', when: '2026-11-23T11:55' },
      notes: 'Covers Nova Cups. Can support Ahmedabad for cup forming jobs.',
      levels: { 'Cup forming': 3, 'Blister sealing': 2 },
    },
  },
  /* visit slot of a ticket: its window, else the engineer app's today list */
  slot: (t) => t.window?.slot ?? ZX.data.engineerDay.today.find((x) => x.ticket === t.number)?.slot ?? '',
  DUTY_TONE: { 'On duty': 'green', Busy: 'blue', 'Off duty': '', 'On leave': 'amber' },

  /* jobs per engineer today, in slot order (dashboard: five for Sandeep, two for Anita) */
  today: {
    sandeep: ['TKT-2026-0126', 'TKT-2026-0125', 'TKT-2026-0132', 'TKT-2026-0127', 'TKT-2026-0115'],
    anita: ['TKT-2026-0114', 'TKT-2026-0119'],
  },

  /* leave (D705): Sandeep's from the app (engineerDay.leave) plus history; decisions by the Admin */
  leave: [
    { id: 'LV-2026-0018', engineer: 'sandeep', from: '2026-12-18', to: '2026-12-18', type: 'Casual', reason: 'Personal work', status: 'Pending',
      asked: '2026-11-20T09:10', conflicts: [['AMC-2026-0010', 'Planned AMC visit, CFM-450 Cup Former, Sanand']] },
    { id: 'LV-2026-0016', engineer: 'sandeep', from: '2026-12-04', to: '2026-12-05', type: 'Earned', reason: 'Family function', status: 'Approved',
      asked: '2026-11-17T18:20', decided: '2026-11-19T11:00', conflicts: [] },
    { id: 'LV-2026-0014', engineer: 'anita', from: '2026-11-02', to: '2026-11-07', type: 'Sick', reason: 'Fever, doctor advised rest', status: 'Approved',
      asked: '2026-11-02T07:40', decided: '2026-11-02T08:15', conflicts: [] },
    { id: 'LV-2026-0012', engineer: 'sandeep', from: '2026-11-09', to: '2026-11-09', type: 'Casual', reason: 'Personal work', status: 'Rejected',
      asked: '2026-11-05T10:00', decided: '2026-11-05T16:30', note: 'Gujarati New Year is already a holiday that day.', conflicts: [] },
  ],
  LEAVE_TONE: { Pending: 'amber', Approved: 'green', Rejected: 'red', Cancelled: '' },

  /* company holidays (D706); the app slot picker shows these as unavailable */
  holidays: [
    ['2026-11-09', 'Gujarati New Year', 'Ahmedabad'], ['2026-11-10', 'Bhai Bij', 'Ahmedabad'], ['2026-12-25', 'Christmas', 'All regions'],
    ['2027-01-14', 'Uttarayan', 'Ahmedabad'], ['2027-01-26', 'Republic Day', 'All regions'], ['2027-02-19', 'Shivaji Jayanti', 'Pune'],
    ['2027-03-22', 'Holi', 'All regions'],
  ],
  hours: [
    { region: 'Ahmedabad', days: 'Monday to Saturday', start: '09:00', end: '18:00', slots: '9 AM to 12 PM, 12 to 3 PM, 3 to 6 PM' },
    { region: 'Pune', days: 'Monday to Saturday', start: '09:00', end: '18:00', slots: '9 AM to 12 PM, 12 to 3 PM, 3 to 6 PM' },
  ],

  /* skills master (D707) with a level scale 1 Basic, 2 Skilled, 3 Expert */
  LEVELS: ['', 'Basic', 'Skilled', 'Expert'],
  skills: [
    { name: 'Thermoforming', machines: 'AFM range', status: 'Active' }, { name: 'PLC', machines: 'All PLC panels', status: 'Active' },
    { name: 'Vacuum', machines: 'SVF range', status: 'Active' }, { name: 'Cup forming', machines: 'CFM range', status: 'Active' },
    { name: 'Blister sealing', machines: 'BSM range', status: 'Active' }, { name: 'Hydraulics', machines: 'All', status: 'Active' },
    { name: 'Mould change', machines: 'AFM and CFM ranges', status: 'Active' }, { name: 'Mineral water plant', machines: 'Old range', status: 'Archived' },
  ],

  /* certifications (D708); Sandeep's match E808 */
  certs: [
    { engineer: 'sandeep', name: 'Electrical safety', number: 'ZP-CRT-0142', issued: '2024-11-01', expires: '2026-10-31' },
    { engineer: 'sandeep', name: 'AFM thermoforming range', number: 'ZP-CRT-0118', issued: '2025-04-12', expires: '2027-04-11' },
    { engineer: 'sandeep', name: 'Vacuum forming, SVF range', number: 'ZP-CRT-0121', issued: '2025-06-03', expires: '2027-06-02' },
    { engineer: 'sandeep', name: 'PLC and HMI, level 2', number: 'ZP-CRT-0133', issued: '2024-12-15', expires: '2026-12-14' },
    { engineer: 'anita', name: 'Electrical safety', number: 'ZP-CRT-0156', issued: '2025-08-10', expires: '2027-08-09' },
    { engineer: 'anita', name: 'CFM cup forming range', number: 'ZP-CRT-0161', issued: '2025-09-01', expires: '2027-08-31' },
    { engineer: 'anita', name: 'BSM blister sealing range', number: 'ZP-CRT-0164', issued: '2026-01-20', expires: '2028-01-19' },
  ],

  /* performance (D709). Sandeep's month matches engineerDay.performance */
  performance: {
    sandeep: { completed: 46, onTime: 91, firstVisitFix: 82, rating: 4.7, responseHours: 3.1, reopen: 2.2, travelMin: 38, utilisation: 86, slaMet: 94 },
    anita: { completed: 21, onTime: 88, firstVisitFix: 78, rating: 4.5, responseHours: 3.6, reopen: 4.8, travelMin: 44, utilisation: 64, slaMet: 92 },
  },
  weeks: ['5 Oct', '12 Oct', '19 Oct', '26 Oct', '2 Nov', '9 Nov', '16 Nov', '23 Nov'],
  jobsByWeek: { sandeep: [9, 11, 10, 12, 11, 10, 11, 5], anita: [6, 5, 7, 6, 0, 4, 5, 1] },
  ratingByWeek: { sandeep: [4.6, 4.7, 4.8, 4.6, 4.7, 4.6, 4.8, 4.7], anita: [4.4, 4.5, 4.3, 4.6, null, 4.5, 4.6, 4.5] },

  /* weekly summaries as submitted from the app (E1010); days: [date, jobs, hours] */
  summaries: [
    { engineer: 'sandeep', from: '2026-11-16', to: '2026-11-22', jobs: 11, hours: 38, firstVisitFix: 82, slaMet: 91, rating: 4.8, submitted: '2026-11-22T19:05',
      days: [['2026-11-16', 2, 7.5], ['2026-11-17', 3, 8], ['2026-11-18', 1, 4.5], ['2026-11-19', 2, 6.5], ['2026-11-20', 2, 7], ['2026-11-21', 1, 4.5]],
      note: 'Heater issue at Vatva fixed. Chain set for Line 2 still needed.' },
    { engineer: 'anita', from: '2026-11-16', to: '2026-11-22', jobs: 5, hours: 21, firstVisitFix: 80, slaMet: 100, rating: 4.6, submitted: '2026-11-22T18:40',
      days: [['2026-11-16', 1, 4], ['2026-11-17', 1, 5], ['2026-11-19', 1, 4], ['2026-11-20', 2, 8]], note: '' },
    { engineer: 'sandeep', from: '2026-11-09', to: '2026-11-15', jobs: 10, hours: 34, firstVisitFix: 80, slaMet: 90, rating: 4.6, submitted: '2026-11-15T20:10',
      days: [['2026-11-09', 2, 7], ['2026-11-10', 2, 6.5], ['2026-11-11', 1, 4], ['2026-11-12', 2, 6.5], ['2026-11-13', 2, 7], ['2026-11-14', 1, 3]], note: '',
      comment: ['Rajesh Goyal', 'Good week. Please log travel on the same day.'] },
    { engineer: 'anita', from: '2026-11-09', to: '2026-11-15', jobs: 4, hours: 15, firstVisitFix: 75, slaMet: 100, rating: 4.5, submitted: '2026-11-15T18:30',
      days: [['2026-11-10', 1, 4], ['2026-11-12', 2, 7], ['2026-11-14', 1, 4]], note: '' },
    { engineer: 'anita', from: '2026-11-02', to: '2026-11-08', jobs: 0, hours: 0, submitted: '2026-11-08T19:00', days: [], note: 'On sick leave.' },
  ],

  /* time logs per visit (E413); edits over 30 minutes need approval */
  timeLogs: [
    { ticket: 'TKT-2026-0126', engineer: 'sandeep', date: '2026-11-23', status: 'Needs approval',
      rows: [['Travel started', '08:50', '08:50'], ['Checked in', '09:32', '09:32'], ['Work started', '09:40', '09:00'], ['Work finished', '11:50', '11:50']],
      reason: 'Started on the chain before checking in; the gate log shows 8:58.' },
    { ticket: 'TKT-2026-0114', engineer: 'anita', date: '2026-11-23', status: 'Approved',
      rows: [['Travel started', '09:05', '09:05'], ['Checked in', '09:50', '09:50'], ['Work started', '09:55', '09:55'], ['Work finished', '11:20', '11:35']],
      reason: 'Forgot to stop the timer after the trial run.' },
    { ticket: 'TKT-2026-0128', engineer: 'sandeep', date: '2026-11-21', status: 'Approved',
      rows: [['Travel started', '13:10', '13:10'], ['Checked in', '13:45', '13:45'], ['Work started', '13:50', '13:50'], ['Work finished', '16:05', '16:05']] },
    { ticket: 'TKT-2026-0129', engineer: 'sandeep', date: '2026-10-30', status: 'Adjusted',
      rows: [['Travel started', '10:00', '10:00'], ['Checked in', '10:40', '10:40'], ['Work started', '10:45', '10:45'], ['Work finished', '14:30', '13:30']],
      reason: 'Lunch break was inside the work time.', adjusted: ['Rajesh Goyal', 'Lunch break removed, 1 h.'] },
  ],

  /* handover notes (E1012): only engineers see these, never the customer */
  handover: [
    { by: 'sandeep', when: '2026-11-23T10:41', ticket: 'TKT-2026-0126', machine: 'ZP-TF-2204', pinned: true, hidden: false,
      tried: 'Re tensioned the drive chain. E-17 cleared for 40 minutes, then came back.',
      remains: 'Fit Industrial chain set, 12B when SPR-2026-0031 arrives.', tips: 'Spare chain is in the store room behind the press.' },
    { by: 'anita', when: '2026-11-10T16:20', ticket: 'TKT-2026-0116', machine: 'ZP-TF-2204', pinned: false, hidden: false,
      tried: 'Replaced the chain tensioner.', remains: 'Left sprocket shows wear. Check at the next visit.', tips: 'Gate 2. Security asks for the ticket number.' },
    { by: 'sandeep', when: '2026-11-22T17:20', ticket: 'TKT-2026-0130', machine: 'ZP-PC-1805', pinned: false, hidden: false,
      tried: 'Customer not available, waited 20 minutes.', remains: 'Blower motor bearing noise not checked yet.', tips: 'Call Rakesh before 5 PM; the shed closes at 5:30.' },
    { by: 'sandeep', when: '2026-11-12T12:05', ticket: 'TKT-2026-0118', machine: 'ZP-PC-1805', pinned: false, hidden: true,
      tried: 'Test note, sent by mistake.', remains: '', tips: '' },
  ],

  /* problems reported from the engineer app (E806) */
  problems: [
    { number: 'PRB-2026-0087', engineer: 'sandeep', when: '2026-11-23T11:05', status: 'Open', app: '2.4.1', device: 'Samsung Galaxy M34, Android 14',
      text: 'Photos stay in Waiting to sync for TKT-2026-0126 even on Wi-Fi. Tried closing the app.', files: ['sync-queue.png'], logs: true },
    { number: 'PRB-2026-0084', engineer: 'anita', when: '2026-11-18T15:40', status: 'Replied', app: '2.4.1', device: 'Redmi Note 13, Android 14',
      text: 'Signature pad lags when the customer signs fast. Lines break up.', files: [], logs: true,
      reply: 'Thanks. Fixed in 2.4.2, out this week. Ask the customer to sign slowly until then.' },
    { number: 'PRB-2026-0079', engineer: 'sandeep', when: '2026-11-04T09:20', status: 'Fixed', app: '2.3.0', device: 'Samsung Galaxy M34, Android 14',
      text: 'Map opens the wrong Sanand plant address for ZP-VF-1908.', files: ['map.png'], logs: false, reply: 'Site pin corrected. Thanks.' },
  ],
  PROBLEM_TONE: { Open: 'amber', Replied: 'blue', Fixed: 'green' },

  /* service areas (D713): regions with pincodes and default engineers; drives the app pincode check (EC-A48) */
  regions: [
    { name: 'Ahmedabad', state: 'Gujarat', engineer: 'sandeep', pincodes: [
      ['382445', 'Vatva GIDC', true, 2], ['382330', 'Naroda', true, 0], ['382110', 'Sanand GIDC', true, 1], ['382213', 'Changodar', true, 0],
      ['382028', 'Gandhinagar Sector 28', true, 0], ['382721', 'Kalol', false, 0]] },
    { name: 'Pune', state: 'Maharashtra', engineer: 'anita', pincodes: [
      ['410501', 'Chakan MIDC', true, 1], ['411026', 'Bhosari and Pimpri', true, 0], ['411019', 'Chinchwad', true, 0], ['410507', 'Talegaon', true, 0],
      ['412105', 'Alandi', false, 0]] },
  ],

  /* broadcasts to engineers (D716), push */
  messages: [
    { title: 'Safety refresher on 1 Dec', text: 'Lock out and tag out refresher at the Ahmedabad office, 9 AM. Bring your safety shoes.', to: 'Ahmedabad region',
      status: 'Scheduled', when: '2026-11-28T09:00' },
    { title: 'Friday reports', text: 'Please close Friday reports by 7 PM.', to: 'All engineers', status: 'Sent', when: '2026-11-20T18:30', delivered: 2, opened: 2 },
    { title: 'App update 2.4.1', text: 'Update the Zixom Connect app from the Play Store before Monday.', to: 'All engineers', status: 'Sent', when: '2026-11-13T10:00', delivered: 2, opened: 2 },
    { title: 'Chain set stock', text: 'Industrial chain set 12B is out of stock in Ahmedabad. Request from Pune.', to: 'Sandeep Yadav', status: 'Sent', when: '2026-11-23T10:30', delivered: 1, opened: 0 },
  ],

  /* SOS (E904) and incidents (E903) */
  sos: [
    { number: 'SOS-2026-0004', engineer: 'sandeep', when: '2026-11-23T11:52', ticket: 'TKT-2026-0126', status: 'Active',
      location: 'Vatva plant, Line 2, 40 m from the site pin', locWhen: '2026-11-23T11:52' },
    { number: 'SOS-2026-0003', engineer: 'anita', when: '2026-10-02T15:14', ticket: null, status: 'Resolved', reason: 'False alarm: pressed by mistake in the pocket' },
    { number: 'SOS-2026-0002', engineer: 'sandeep', when: '2026-07-18T10:40', ticket: null, status: 'Resolved', reason: 'Minor cut, first aid on site. Incident INC-2026-0003' },
  ],
  incidents: [
    { number: 'INC-2026-0007', engineer: 'sandeep', when: '2026-11-23T10:05', kind: 'Near miss', severity: 'Medium', injury: false, status: 'New',
      machine: 'ZP-TF-2204', ticket: 'TKT-2026-0126', photos: 2,
      text: 'Chain guard slipped off its bracket while the line was isolated. Fell near my hand, no contact.',
      action: 'Stopped work, refitted the guard with new bolts, told the plant head.' },
    { number: 'INC-2026-0006', engineer: 'anita', when: '2026-11-12T14:30', kind: 'Injury', severity: 'High', injury: true, status: 'Under review',
      machine: 'ZP-CF-2108', ticket: null, photos: 1, text: 'Small burn on the left wrist from the forming heater cover. Cover had no warning label.',
      action: 'First aid at the Chakan unit. Asked Nova Cups to fit a label.', review: 'Label requested from Nova Cups. Heater hazard added to the register.' },
    { number: 'INC-2026-0005', engineer: 'sandeep', when: '2026-10-21T11:15', kind: 'Near miss', severity: 'Low', injury: false, status: 'Closed',
      machine: 'ZP-VF-1908', ticket: 'TKT-2026-0129', photos: 1, text: 'Oil on the floor next to the tray line. Nearly slipped.',
      action: 'Plant cleaned the floor. Customer told.', review: 'Closed. Site hazard added for Sanand.' },
    { number: 'INC-2026-0004', engineer: 'sandeep', when: '2026-09-09T16:00', kind: 'Unsafe condition', severity: 'Low', injury: false, status: 'Closed',
      machine: 'ZP-PC-1805', ticket: null, photos: 0, text: 'Crusher guard interlock bypassed with a wire.', action: 'Removed the bypass, told the plant head.', review: 'Closed.' },
  ],
  SEVERITY_TONE: { High: 'red', Medium: 'amber', Low: '' },
  INCIDENT_TONE: { New: 'blue', 'Under review': 'amber', Closed: 'green' },

  /* hazards per machine type or site (E905) */
  hazards: [
    { id: 'HZ-011', scope: 'Thermoforming machine', icon: 'fire', title: 'Hot surfaces', text: 'Heaters reach 400 °C. Wait 30 minutes after switch off.', added: '2025-04-02' },
    { id: 'HZ-012', scope: 'Thermoforming machine', icon: 'lightning', title: 'High voltage', text: '415 V in the main panel. Lock out at the isolator.', added: '2025-04-02' },
    { id: 'HZ-013', scope: 'Thermoforming machine', icon: 'gauge', title: 'Pressure', text: 'Compressed air at 6 bar. Bleed the line before opening.', added: '2025-04-02' },
    { id: 'HZ-014', scope: 'Thermoforming machine', icon: 'gear-six', title: 'Moving parts', text: 'Chain drive and platen can move on residual air.', added: '2026-11-23' },
    { id: 'HZ-021', scope: 'Cup forming machine', icon: 'fire', title: 'Hot surfaces', text: 'Heater cover has no label on older units. Wear gloves.', added: '2026-11-13' },
    { id: 'HZ-031', scope: 'Vacuum forming machine', icon: 'gauge', title: 'Vacuum', text: 'Release the vacuum before opening the clamp frame.', added: '2025-04-02' },
    { id: 'HZ-041', scope: 'Plastic crusher', icon: 'gear-six', title: 'Rotating blades', text: 'Blades coast for 2 minutes after stop.', added: '2025-04-02' },
    { id: 'HZ-101', scope: 'Vatva plant', icon: 'truck', title: 'Forklift lane', text: 'Forklifts pass behind Line 2. Wear the hi-vis vest.', added: '2025-09-15' },
    { id: 'HZ-102', scope: 'Sanand plant', icon: 'warning', title: 'Chemicals', text: 'Mould release spray stored next to the tray line.', added: '2026-10-22' },
  ],

  /* site access (E902) and induction (E906) */
  access: {
    vatva: { gate: 'Gate 2, GIDC Phase II road', security: 'Security asks for the ticket number and photo ID.', hours: '8 AM to 8 PM, Monday to Saturday',
      ppe: 'Safety shoes, hi-vis vest', parking: 'Visitor parking outside Gate 2', induction: true, updated: '2026-09-15' },
    sanand: { gate: 'Main gate, Shed 18', security: 'Sign the visitor register.', hours: '9 AM to 6 PM, Monday to Saturday',
      ppe: 'Safety shoes', parking: 'Inside, next to Shed 18', induction: false, updated: '2026-03-02' },
    chakan: { gate: 'Gate 1, Gat 112', security: 'Show the Zixom ID card. Phones stay at security in the clean room.', hours: '24 hours, 3 shifts',
      ppe: 'Safety shoes, hair net, ear plugs', parking: 'Two wheeler parking at Gate 1', induction: true, updated: '2026-06-11' },
  },
  /* [site, engineer, done date, valid until] ; null done = not done yet */
  inductions: [
    ['vatva', 'sandeep', '2026-01-15', '2027-01-14'], ['vatva', 'anita', null, null],
    ['chakan', 'anita', '2025-11-10', '2026-11-09'], ['chakan', 'sandeep', null, null],
  ],

  /* pre work safety checklist templates per machine type (E901); each report stores the version used */
  checklists: [
    { type: 'Thermoforming machine', version: 4, status: 'Draft', published: null, used: 0 },
    { type: 'Thermoforming machine', version: 3, status: 'Published', published: '2026-10-01', used: 41 },
    { type: 'Cup forming machine', version: 2, status: 'Published', published: '2026-06-20', used: 26 },
    { type: 'Vacuum forming machine', version: 2, status: 'Published', published: '2026-06-20', used: 14 },
    { type: 'Plastic crusher', version: 1, status: 'Published', published: '2025-04-02', used: 9 },
    { type: 'Blister sealing machine', version: 1, status: 'Published', published: '2025-04-02', used: 6 },
  ],
  /* checklist failures this month: an item answered No before work */
  checklistFailures: [
    { when: '2026-11-23T09:36', engineer: 'sandeep', ticket: 'TKT-2026-0126', item: 'Guards and interlocks are in place', version: 3, action: 'Refitted the chain guard' },
    { when: '2026-11-19T10:05', engineer: 'anita', ticket: 'TKT-2026-0114', item: 'Heaters have cooled to a safe temperature', version: 2, action: 'Waited 30 minutes' },
    { when: '2026-11-12T14:10', engineer: 'anita', ticket: null, item: 'I am wearing the required protective equipment', version: 2, action: 'Borrowed gloves from the plant' },
    { when: '2026-11-04T11:40', engineer: 'sandeep', ticket: 'TKT-2026-0130', item: 'Power is isolated and locked out', version: 3, action: 'Plant electrician isolated the panel' },
  ],
  safetyMonths: { labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], incidents: [0, 1, 0, 0, 0, 1], nearMisses: [1, 0, 1, 1, 1, 1], failures: [2, 3, 1, 2, 3, 4] },
};
