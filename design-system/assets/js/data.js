/* Demo data from spec section 16. Every screen reads from here so a flow can be followed
   from the customer app to the engineer app. All names are made up. Machine models are
   examples built from Zixom's product families, to be replaced with real models.
   Demo "today" is Monday 23 Nov 2026, IST. Dates are ISO strings. */
window.ZX = window.ZX || {};

ZX.data = {
  today: '2026-11-23',
  now: '2026-11-23T12:00',

  companies: [
    { id: 'shree', name: 'Shree Packaging Industries', city: 'Ahmedabad', code: 'ZP-C-0001',
      gstin: '24AAAAA0000A1Z5', sites: [
        { id: 'vatva', name: 'Vatva plant', address: 'Plot 214, Phase II, GIDC Vatva, Ahmedabad', pincode: '382445',
          contact: { name: 'Rakesh Mehta', phone: '+91 98250 11410' }, access: 'Gate 2. Security asks for the ticket number.' },
        { id: 'sanand', name: 'Sanand plant', address: 'Shed 18, Sanand GIDC II, Ahmedabad', pincode: '382110',
          contact: { name: 'Pooja Shah', phone: '+91 97140 22321' }, access: '' },
      ] },
    { id: 'nova', name: 'Nova Cups Pvt Ltd', city: 'Pune', code: 'ZP-C-0002', gstin: '27AAAAA0000A1Z3', sites: [
        { id: 'chakan', name: 'Chakan unit', address: 'Gat 112, Chakan MIDC Phase 1, Pune', pincode: '410501',
          contact: { name: 'Imran Qureshi', phone: '+91 98220 43120' }, access: '' },
      ] },
  ],

  users: [
    /* primary: this person is the company's primary contact (a flag, not a role) */
    { id: 'rakesh', name: 'Rakesh Mehta', initials: 'RM', mobile: '+91 98250 11410', email: 'rakesh@shreepack.example',
      designation: 'Plant head', companies: [{ id: 'shree', primary: true }, { id: 'nova', primary: false }] },
    { id: 'pooja', name: 'Pooja Shah', initials: 'PS', mobile: '+91 97140 22321', email: 'pooja@shreepack.example',
      designation: 'Maintenance supervisor', companies: [{ id: 'shree', primary: false }] },
    { id: 'imran', name: 'Imran Qureshi', initials: 'IQ', mobile: '+91 98220 43120', email: '',
      designation: 'Production manager', companies: [{ id: 'nova', primary: true }] },
  ],

  engineers: [
    { id: 'sandeep', name: 'Sandeep Yadav', initials: 'SY', code: 'ZP-SE-014', region: 'Ahmedabad',
      phone: '+91 99090 33114', designation: 'Senior service engineer', experience: '9 years',
      skills: ['Thermoforming', 'PLC', 'Vacuum'], rating: 4.7, visits: 312 },
    { id: 'anita', name: 'Anita Verma', initials: 'AV', code: 'ZP-SE-021', region: 'Pune',
      phone: '+91 98815 20761', designation: 'Service engineer', experience: '4 years',
      skills: ['Cup forming', 'Blister sealing'], rating: 4.5, visits: 128 },
  ],

  support: { agent: 'Neha', manager: 'Mr Kapoor', managerPhone: '+91 98240 55120', phone: '+91 99919 10097', email: 'info@zixom.in', hours: '24x7' },

  /* warrantyEnd and amc.end are relative to today, see section 16 table */
  machines: [
    { serial: 'ZP-TF-2310', company: 'shree', site: 'vatva', type: 'Thermoforming machine', model: 'AFM-760 Single Station',
      nickname: 'Line 1 former', installed: '2025-06-10', commissioned: '2025-06-24', warrantyEnd: '2027-06-21',
      amc: null, status: 'running', runningHours: 7840 },
    { serial: 'ZP-TF-2204', company: 'shree', site: 'vatva', type: 'Thermoforming machine', model: 'AFM-1000 Twin Station',
      nickname: 'Line 2 former', installed: '2025-11-20', commissioned: '2025-12-05', warrantyEnd: '2026-12-05',
      amc: null, status: 'repair', runningHours: 6120 },
    { serial: 'ZP-CF-2011', company: 'shree', site: 'sanand', type: 'Cup forming machine', model: 'CFM-450 Cup Former',
      nickname: '', installed: '2020-03-14', commissioned: '2020-03-28', warrantyEnd: '2021-03-28',
      amc: 'AMC-2026-0010', status: 'running', runningHours: 28410 },
    { serial: 'ZP-VF-1908', company: 'shree', site: 'sanand', type: 'Vacuum forming machine', model: 'SVF-600 Semi Auto Vacuum Former',
      nickname: 'Tray line', installed: '2019-08-02', commissioned: '2019-08-12', warrantyEnd: '2020-08-12',
      amc: 'AMC-2026-0011', status: 'running', runningHours: 31200 },
    { serial: 'ZP-PC-1805', company: 'shree', site: 'vatva', type: 'Plastic crusher', model: 'PCR-300 Scrap Crusher',
      nickname: 'Scrap grinder', installed: '2018-05-21', commissioned: '2018-05-30', warrantyEnd: '2019-05-30',
      amc: 'AMC-2026-0014', status: 'idle', runningHours: 15890 },
    { serial: 'ZP-TF-2501', company: 'shree', site: 'sanand', type: 'Thermoforming machine', model: 'AFM-650 Single Station',
      nickname: 'Second hand unit', installed: null, commissioned: null, warrantyEnd: null,
      amc: null, status: 'pending', runningHours: null },
  ],

  amc: [
    { number: 'AMC-2026-0010', plan: 'Preventive Plus', status: 'active', start: '2026-04-01', end: '2027-03-31',
      machines: ['ZP-CF-2011'], visitsIncluded: 6, visitsUsed: 2 },
    { number: 'AMC-2026-0011', plan: 'Essential', status: 'expiring', start: '2025-12-21', end: '2026-12-21',
      machines: ['ZP-VF-1908'], visitsIncluded: 4, visitsUsed: 3 },
    { number: 'AMC-2026-0014', plan: 'Essential', status: 'expired', start: '2025-11-20', end: '2026-11-20',
      machines: ['ZP-PC-1805'], visitsIncluded: 4, visitsUsed: 4 },
  ],

  /* service tickets TKT-2026-0120 to 0132, one per status */
  tickets: [
    { number: 'TKT-2026-0120', status: 'submitted', machine: 'ZP-TF-2310', type: 'Preventive maintenance', severity: null,
      coverage: 'warranty', created: '2026-11-23T09:12', summary: 'Six monthly check before the festive production run.' },
    { number: 'TKT-2026-0121', status: 'awaiting-info', machine: 'ZP-VF-1908', type: 'Breakdown or repair', severity: 'minor',
      coverage: 'amc', created: '2026-11-21T16:40', summary: 'Vacuum pressure drops after 20 minutes of running.' },
    { number: 'TKT-2026-0122', status: 'estimate', machine: 'ZP-PC-1805', type: 'Breakdown or repair', severity: 'production',
      coverage: 'chargeable', created: '2026-11-20T11:05', summary: 'Blade assembly makes a knocking sound under load.' },
    { number: 'TKT-2026-0123', status: 'assigned', machine: 'ZP-CF-2011', type: 'Breakdown or repair', severity: 'production',
      coverage: 'amc', created: '2026-11-22T10:30', engineer: 'sandeep', window: { date: '2026-11-24', slot: '12 to 3 PM' },
      summary: 'Cup rims are uneven on the left mould. Started after the heater was replaced.' },
    { number: 'TKT-2026-0124', status: 'scheduled', machine: 'ZP-TF-2310', type: 'Operator training', severity: null,
      coverage: 'chargeable', created: '2026-11-18T14:20', engineer: 'sandeep', window: { date: '2026-11-26', slot: '9 AM to 12 PM' },
      summary: 'Training for 4 new operators on the AFM PLC screens and mould change.' },
    { number: 'TKT-2026-0125', status: 'on-the-way', machine: 'ZP-VF-1908', type: 'Calibration or trial', severity: null,
      coverage: 'amc', created: '2026-11-19T09:00', engineer: 'sandeep', window: { date: '2026-11-23', slot: '12 to 3 PM' },
      eta: 35, summary: 'Heater zone calibration after the new sheet supplier.' },
    { number: 'TKT-2026-0126', status: 'in-progress', machine: 'ZP-TF-2204', type: 'Breakdown or repair', severity: 'down',
      coverage: 'warranty', created: '2026-11-23T07:45', engineer: 'sandeep', window: { date: '2026-11-23', slot: '9 AM to 12 PM' },
      summary: 'Machine stopped. Chain drive tripping with error E-17 on the HMI.' },
    { number: 'TKT-2026-0127', status: 'on-hold', machine: 'ZP-CF-2011', type: 'Spare part fitting', severity: 'minor',
      coverage: 'amc', created: '2026-11-16T12:10', engineer: 'sandeep', holdReason: 'Waiting for parts',
      summary: 'Replace worn PID controller on heater zone 3.' },
    { number: 'TKT-2026-0128', status: 'completed', machine: 'ZP-TF-2310', type: 'Breakdown or repair', severity: 'production',
      coverage: 'warranty', created: '2026-11-17T08:30', engineer: 'sandeep', summary: 'Sheet sagging before forming station.' },
    { number: 'TKT-2026-0129', status: 'closed', machine: 'ZP-VF-1908', type: 'Preventive maintenance', severity: null,
      coverage: 'amc', created: '2026-10-28T10:00', engineer: 'sandeep', rating: 5, summary: 'Quarterly preventive visit.' },
    { number: 'TKT-2026-0130', status: 'visit-failed', machine: 'ZP-PC-1805', type: 'Breakdown or repair', severity: 'minor',
      coverage: 'chargeable', created: '2026-11-12T15:00', engineer: 'sandeep', summary: 'Hopper sensor not detecting material.' },
    { number: 'TKT-2026-0131', status: 'cancelled', machine: 'ZP-TF-2204', type: 'Calibration or trial', severity: null,
      coverage: 'warranty', created: '2026-11-10T11:00', summary: 'Trial run with 0.8 mm PET sheet.' },
    { number: 'TKT-2026-0132', status: 'reopened', machine: 'ZP-TF-2310', type: 'Breakdown or repair', severity: 'minor',
      coverage: 'warranty', created: '2026-11-09T09:40', engineer: 'sandeep', summary: 'Cooling fan noise came back after two days.' },
  ],

  parts: [
    { number: 'ZP-SP-001', name: 'Ceramic heater element 650 W', category: 'Heaters', price: 2850, stock: 'in' },
    { number: 'ZP-SP-002', name: 'Timer relay 24 V DC', category: 'Timers', price: 1240, stock: 'low' },
    { number: 'ZP-SP-003', name: 'Industrial chain set, 12B', category: 'Industrial chains', price: 6400, stock: 'out' },
    { number: 'ZP-SP-004', name: 'PID temperature controller', category: 'PID controllers', price: null, stock: 'request' },
    { number: 'ZP-SP-005', name: 'Vacuum gauge, analogue', category: 'Others', price: 980, stock: 'discontinued', replacedBy: 'ZP-SP-006' },
  ],

  /* things that need the customer's attention, most urgent first (Home strip, C103) */
  alerts: [
    { tone: 'red', icon: 'receipt', title: 'Invoice overdue by 6 days', sub: 'INV-2026-0981, ₹15,340.00', mono: true, href: 'C802-invoice-detail.html' },
    { tone: 'red', icon: 'seal-check', title: 'AMC expired 3 days ago', sub: 'Scrap grinder. Renew within 4 days to keep it', href: 'C405-renew-amc.html' },
    { tone: 'amber', icon: 'currency-inr', title: 'Estimate waiting for approval', sub: 'TKT-2026-0122, ₹8,968.00', mono: true, href: 'C509-estimate.html' },
    { tone: 'amber', icon: 'shield-warning', title: 'Warranty ends in 12 days', sub: 'Line 2 former, AFM-1000', href: 'C302-warranty-details.html' },
    { tone: 'blue', icon: 'info', title: 'Zixom needs more information', sub: 'Claim WCL-2026-0042, reply by 27 Nov', href: 'C308-claim.html' },
  ],

  /* last events across the company, newest first */
  activity: [
    { icon: 'navigation-arrow', title: 'Engineer on the way', sub: 'TKT-2026-0125 · Tray line', when: '2026-11-23T11:48' },
    { icon: 'currency-inr', title: 'Estimate shared', sub: 'TKT-2026-0122 · Scrap grinder', when: '2026-11-23T09:30' },
    { icon: 'user', title: 'Engineer assigned', sub: 'TKT-2026-0123 · CFM-450 Cup Former', when: '2026-11-22T14:15' },
    { icon: 'truck', title: 'Order dispatched', sub: 'ORD-2026-0209 · Blue Dart', when: '2026-11-21T17:05' },
    { icon: 'check-circle', title: 'Payment received', sub: 'INV-2026-0979 · ₹2,950.00', when: '2026-11-20T12:40' },
  ],

  announcements: [
    { title: 'Heater elements now ship in 2 days', when: '2026-11-20', pinned: false,
      text: 'Ceramic heaters for the AFM range are now stocked in Ahmedabad and Pune.' },
  ],

  /* GST is 18 percent on every line. amount includes GST; paid is what was received so far */
  invoices: [
    { number: 'INV-2026-0980', type: 'Service', status: 'due', amount: 4720, issued: '2026-11-16', due: '2026-11-30', for: 'TKT-2026-0118',
      title: 'Blower motor repair, Scrap grinder', lines: [['Visit fee', 1, 700], ['Labour, hours', 2.5, 800], ['Motor bearing set', 1, 1300]] },
    /* AMC covers labour only, so parts fitted on an AMC visit are billed after it */
    { number: 'INV-2026-0981', type: 'Service', status: 'overdue', amount: 15340, issued: '2026-11-02', due: '2026-11-17', for: 'TKT-2026-0129',
      title: 'Parts fitted on AMC visit, Tray line', lines: [['Ceramic heater element 650 W', 4, 2850], ['Timer relay 24 V DC', 1, 1240], ['Consumables', 1, 360]] },
    { number: 'INV-2026-0982', type: 'AMC', status: 'paid', amount: 42480, paid: 42480, issued: '2026-03-25', due: '2026-04-01', for: 'AMC-2026-0010',
      title: 'Preventive Plus AMC, CFM-450, 1 year', receipt: 'RCP-2026-0650', lines: [['Preventive Plus, 1 machine, 1 year', 1, 36000]] },
    { number: 'INV-2026-0983', type: 'Service', status: 'processing', amount: 2360, issued: '2026-11-18', due: '2026-11-25', for: 'TKT-2026-0117',
      title: 'Heater zone calibration, Line 1 former', lines: [['Calibration, hours', 2.5, 800]] },
    { number: 'INV-2026-0984', type: 'Parts', status: 'due', amount: 6962, issued: '2026-11-19', due: '2026-12-03', for: 'ORD-2026-0207',
      title: 'Vacuum pump service kit', lastAttempt: 'failed', lines: [['Vacuum pump service kit', 1, 5400], ['Delivery', 1, 500]] },
    { number: 'INV-2026-0985', type: 'Service', status: 'verification', amount: 3540, issued: '2026-11-10', due: '2026-11-24', for: 'TKT-2026-0116',
      title: 'Chain tensioner replacement, Line 2 former', lines: [['Labour, hours', 2, 800], ['Chain tensioner', 1, 1400]] },
    { number: 'INV-2026-0986', type: 'AMC', status: 'due', amount: 28320, paid: 14160, issued: '2026-11-01', due: '2026-12-01', for: 'AMC-2026-0011',
      title: 'Essential AMC renewal, SVF-600, 1 year', lines: [['Essential, 1 machine, 1 year', 1, 24000]] },
    { number: 'INV-2026-0987', type: 'Service', status: 'paid', amount: 1180, paid: 1180, issued: '2026-10-21', due: '2026-11-04', for: 'TKT-2026-0112',
      title: 'Sensor cleaning, Tray line', creditNote: 'CN-2026-0012', lines: [['Labour, hours', 1.25, 800]] },
    { number: 'INV-2026-0988', type: 'AMC', status: 'due', amount: 42480, issued: '2026-11-20', due: '2026-11-30', for: 'AMC-2026-0012',
      title: 'Preventive Plus AMC, Line 2 former, 1 year', lines: [['Preventive Plus, 1 machine, 1 year', 1, 36000]] },
    { number: 'INV-2026-0989', type: 'AMC', status: 'overdue', amount: 14160, issued: '2026-10-25', due: '2026-11-08', for: 'AMC-2026-0013',
      title: 'Essential AMC, Line 1 former, 6 months', lines: [['Essential, 1 machine, 6 months', 1, 12000]] },
    /* drafts: created when the person chooses Pay now on renew or buy; not due until then */
    { number: 'INV-2026-0990', type: 'AMC', status: 'draft', amount: 28320, issued: '2026-11-23', due: '2026-11-27', for: 'AMC-2026-0014',
      title: 'Essential AMC renewal, Scrap grinder, 1 year', lines: [['Essential, 1 machine, 1 year', 1, 24000]] },
    { number: 'INV-2026-0991', type: 'AMC', status: 'draft', amount: 42480, issued: '2026-11-23', due: '2026-11-30', for: 'AMC-2026-0016',
      title: 'Preventive Plus AMC, 1 machine, 1 year', lines: [['Preventive Plus, 1 machine, 1 year', 1, 36000]] },
  ],

  /* estimate for extra work, shared on TKT-2026-0122. Valid 3 days */
  estimates: [
    { number: 'QT-2026-0041', ticket: 'TKT-2026-0122', status: 'shared', shared: '2026-11-23T09:30', validUntil: '2026-11-26',
      by: 'sandeep', note: 'Blade edges are chipped and the shaft key is worn. Replacing the blade set stops the knocking.',
      lines: [['Crusher blade set, 4 blades', 1, 4800], ['Labour, hours', 2, 800], ['Travel', 1, 1200]] },
  ],

  payments: [
    { receipt: 'RCP-2026-0650', invoice: 'INV-2026-0982', amount: 42480, method: 'UPI, PhonePe', txn: 'pay_Nz81kLq2Vx7D', when: '2026-03-28T11:20', status: 'paid' },
    { receipt: 'RCP-2026-0651', invoice: 'INV-2026-0986', amount: 14160, method: 'Bank transfer, UTR HDFC0026117745', txn: 'UTR HDFC0026117745', when: '2026-11-05T15:02', status: 'paid' },
    { receipt: 'RCP-2026-0652', invoice: 'INV-2026-0987', amount: 1180, method: 'Card, Visa 4417', txn: 'pay_Ny2QwPq8Ls1A', when: '2026-10-25T10:12', status: 'paid' },
    { receipt: null, invoice: 'INV-2026-0984', amount: 6962, method: 'Net banking, SBI', txn: 'pay_Oa3ReMv9Kt4B', when: '2026-11-22T18:44', status: 'failed', reason: 'Your bank declined the payment' },
    { receipt: null, invoice: 'INV-2026-0983', amount: 2360, method: 'UPI, Google Pay', txn: 'pay_Oa9TyHn2Jw6C', when: '2026-11-23T11:30', status: 'processing' },
  ],

  refunds: [
    { order: 'ORD-2026-0211', amount: 2950, status: 'initiated', started: '2026-11-21', expected: '2026-11-28', reason: 'Order cancelled before dispatch' },
  ],

  /* visit reports, customer copy */
  reports: [
    { ticket: 'TKT-2026-0128', number: 'SR-2026-0128', date: '2026-11-21', engineer: 'sandeep', timeOnSite: '2 h 40 min',
      findings: 'Top heater zone 4 element open circuit. Sheet sagged before reaching the forming station.',
      work: 'Replaced heater element in zone 4, checked all zones with a clamp meter, ran 30 trial sheets.',
      parts: [['ZP-SP-001', 'Ceramic heater element 650 W', 1, true]], status: 'Running',
      recommendations: 'Replace zone 3 element at the next AMC visit; it reads 8 percent low.',
      signedBy: 'Rakesh Mehta, Plant head', signedAt: '2026-11-21T16:52', chargeable: false },
  ],

  /* engineer app: Sandeep Yadav's day (spec section 16 engineer data) */
  engineerDay: {
    engineer: 'sandeep', duty: 'on-job',
    offer: { ticket: 'TKT-2026-0123', minutesLeft: 18, slot: { date: '2026-11-24', slot: '12 to 3 PM' }, distanceKm: 24 },
    today: [
      { ticket: 'TKT-2026-0126', slot: '9 AM to 12 PM', status: 'in-progress', checkedIn: '2026-11-23T09:32', distanceKm: 0 },
      { ticket: 'TKT-2026-0125', slot: '12 to 3 PM', status: 'on-the-way', etaMin: 35, distanceKm: 18 },
      { ticket: 'TKT-2026-0132', slot: '3 to 6 PM', status: 'scheduled', distanceKm: 6, overlapWarning: false },
      { ticket: 'TKT-2026-0127', slot: '4 to 6 PM', status: 'on-hold', distanceKm: 22, overlapWarning: true },
    ],
    tomorrow: ['TKT-2026-0123', 'TKT-2026-0124', 'TKT-2026-0120'],
    sync: [
      { kind: 'Photos', title: '4 photos, Line 2 former', ticket: 'TKT-2026-0126', saved: '2026-11-23T10:58', state: 'waiting' },
      { kind: 'Notes', title: 'Note: chain tension reading', ticket: 'TKT-2026-0126', saved: '2026-11-23T10:41', state: 'waiting' },
      { kind: 'Status changes', title: 'Checked in', ticket: 'TKT-2026-0126', saved: '2026-11-23T09:32', state: 'waiting' },
      { kind: 'Status changes', title: 'Visit failed', ticket: 'TKT-2026-0130', saved: '2026-11-22T17:20', state: 'failed',
        reason: 'Zixom moved this visit while you were offline' },
    ],
    partsRequests: [
      { number: 'SPR-2026-0031', ticket: 'TKT-2026-0126', part: 'ZP-SP-003', qty: 1, urgency: 'This visit', deliverTo: 'Site', status: 'Requested', when: '2026-11-23T10:15' },
      { number: 'SPR-2026-0030', ticket: 'TKT-2026-0127', part: 'ZP-SP-004', qty: 1, urgency: 'Next visit', deliverTo: 'Engineer', status: 'Approved', when: '2026-11-18T12:40' },
      { number: 'SPR-2026-0029', ticket: 'TKT-2026-0128', part: 'ZP-SP-001', qty: 1, urgency: 'This visit', deliverTo: 'Site', status: 'Delivered', when: '2026-11-19T16:05' },
    ],
    leave: [
      { from: '2026-12-04', to: '2026-12-05', reason: 'Family function', status: 'Approved', approver: 'Mr Kapoor' },
      { from: '2026-12-18', to: '2026-12-18', reason: 'Personal work', status: 'Pending', approver: 'Mr Kapoor' },
    ],
    inbox: [
      { icon: 'clock-countdown', title: 'New job, respond in 18 min', sub: 'TKT-2026-0123 · CFM-450 Cup Former, Sanand', when: '2026-11-23T11:42', unread: true, urgent: true },
      { icon: 'chat-text', title: 'Customer replied', sub: 'TKT-2026-0126 · "Spare chain is in the store room"', when: '2026-11-23T10:50', unread: true },
      { icon: 'package', title: 'Parts approved', sub: 'SPR-2026-0030 · PID temperature controller', when: '2026-11-22T15:10', unread: true },
      { icon: 'arrows-clockwise', title: 'Job reassigned to Anita', sub: 'TKT-2026-0119 · Nova Cups, Pune', when: '2026-11-21T09:05', unread: false },
      { icon: 'users', title: 'Message from Mr Kapoor', sub: 'Please close Friday reports by 7 PM', when: '2026-11-20T18:30', unread: false },
      { icon: 'calendar-check', title: 'Leave approved', sub: '4 to 5 Dec, family function', when: '2026-11-19T11:00', unread: false },
    ],
    performance: { period: 'November 2026', completed: 46, avgResponseHours: 3.1, firstVisitFix: 82, slaMet: 94, rating: 4.7 },
    /* checklist template for the thermoforming range (Pass, Fail or Not applicable) */
    checklist: ['Heater zones and elements', 'Industrial chains and sprockets', 'Timers and relays', 'PID controllers',
      'Vacuum system', 'Cooling system', 'Safety interlocks', 'Lubrication', 'Air pressure'],
    safety: ['Power is isolated and locked out', 'Heaters have cooled to a safe temperature',
      'Compressed air and hydraulic pressure are released', 'Guards and interlocks are in place', 'Work area is clear',
      'I am wearing the required protective equipment'],
  },
};
