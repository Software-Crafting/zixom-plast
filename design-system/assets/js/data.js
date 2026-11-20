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

  support: { agent: 'Neha', manager: 'Mr Kapoor', phone: '+91 99919 10097', email: 'info@zixom.in', hours: '24x7' },

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
      coverage: 'chargeable', created: '2026-11-18T14:20', engineer: 'sandeep', window: { date: '2026-11-26', slot: '9 to 12 AM' },
      summary: 'Training for 4 new operators on the AFM PLC screens and mould change.' },
    { number: 'TKT-2026-0125', status: 'on-the-way', machine: 'ZP-VF-1908', type: 'Calibration or trial', severity: null,
      coverage: 'amc', created: '2026-11-19T09:00', engineer: 'sandeep', window: { date: '2026-11-23', slot: '12 to 3 PM' },
      eta: 35, summary: 'Heater zone calibration after the new sheet supplier.' },
    { number: 'TKT-2026-0126', status: 'in-progress', machine: 'ZP-TF-2204', type: 'Breakdown or repair', severity: 'down',
      coverage: 'warranty', created: '2026-11-23T07:45', engineer: 'sandeep', window: { date: '2026-11-23', slot: '9 to 12 AM' },
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

  invoices: [
    { number: 'INV-2026-0980', type: 'Service', status: 'due', amount: 4720, due: '2026-11-30', for: 'TKT-2026-0128' },
    { number: 'INV-2026-0981', type: 'Parts', status: 'overdue', amount: 15340, due: '2026-11-17', for: 'ORD-2026-0208' },
    { number: 'INV-2026-0982', type: 'AMC', status: 'paid', amount: 42480, due: '2026-04-01', for: 'AMC-2026-0010', receipt: 'RCP-2026-0650' },
    { number: 'INV-2026-0983', type: 'Service', status: 'processing', amount: 2360, due: '2026-11-25', for: 'TKT-2026-0129' },
  ],
};
