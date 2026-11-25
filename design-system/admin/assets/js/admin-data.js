/* Admin demo data (spec section 17). Builds on the mobile data in ZX.data (read only) so a flow can be
   followed from the app to the dashboard: same companies, people, machines, tickets, invoices.
   Only what the dashboard adds lives here. Module pages may add more in assets/js/data/<module>.js.
   Demo today is Monday 23 Nov 2026, 12:00 IST. */
window.ZXA = window.ZXA || {};

ZXA.data = {
  admin: { name: 'Rajesh Goyal', initials: 'RG', role: 'Admin', title: 'Owner', email: 'admin@zixom.in', mobile: '+91 99919 10097' },
  health: { state: 'green', label: 'All systems healthy' },

  /* Nova Cups machines: the dashboard sees every company, the mobile demo shows Shree */
  machines: [
    { serial: 'ZP-CF-2108', company: 'nova', site: 'chakan', type: 'Cup forming machine', model: 'CFM-450 Cup Former',
      nickname: 'Cup line 1', installed: '2021-09-14', warrantyEnd: '2022-09-14', amc: null, status: 'down' },
    { serial: 'ZP-BS-2215', company: 'nova', site: 'chakan', type: 'Blister sealing machine', model: 'BSM-300 Blister Sealer',
      nickname: '', installed: '2022-02-10', warrantyEnd: '2023-02-10', amc: null, status: 'running' },
  ],

  /* admin view of every ticket in ZX.data.tickets plus older and other company tickets.
     sla: response target state (spec section 14); priority set by Admin; source: where it came from */
  tickets: {
    'TKT-2026-0120': { priority: 'Normal', source: 'App', by: 'pooja', sla: ['3 d 21 h left', 'ok'] },
    'TKT-2026-0121': { priority: 'Normal', source: 'App', by: 'rakesh', sla: ['Paused', 'none'] },
    'TKT-2026-0122': { priority: 'High', source: 'App', by: 'rakesh', sla: ['Paused', 'none'] },
    'TKT-2026-0123': { priority: 'High', source: 'App', by: 'pooja', sla: ['Offer 18 min left', 'risk'] },
    'TKT-2026-0124': { priority: 'Low', source: 'Phone', by: 'rakesh', sla: ['Met', 'ok'] },
    'TKT-2026-0125': { priority: 'Normal', source: 'App', by: 'pooja', sla: ['Met', 'ok'] },
    'TKT-2026-0126': { priority: 'Urgent', source: 'App', by: 'rakesh', sla: ['Met, 1 h 47 min', 'ok'] },
    'TKT-2026-0127': { priority: 'Normal', source: 'App', by: 'pooja', sla: ['Met', 'ok'] },
    'TKT-2026-0128': { priority: 'High', source: 'App', by: 'rakesh', sla: ['Met', 'ok'] },
    'TKT-2026-0129': { priority: 'Normal', source: 'AMC plan', by: 'rakesh', sla: ['Met', 'ok'] },
    'TKT-2026-0130': { priority: 'Normal', source: 'App', by: 'pooja', sla: ['Breached by 5 h', 'breach'] },
    'TKT-2026-0131': { priority: 'Low', source: 'App', by: 'rakesh', sla: ['Stopped', 'none'] },
    'TKT-2026-0132': { priority: 'Normal', source: 'App', by: 'rakesh', sla: ['2 h 10 min left', 'risk'] },
  },
  extraTickets: [
    { number: 'TKT-2026-0133', status: 'submitted', machine: 'ZP-CF-2108', company: 'nova', site: 'chakan', type: 'Breakdown or repair',
      severity: 'down', coverage: 'chargeable', created: '2026-11-23T11:20', priority: 'Urgent', source: 'App', by: 'imran',
      sla: ['3 h 20 min left', 'risk'], afterHours: false, summary: 'Cup line 1 stopped. Main motor will not start, MCB trips at once.' },
    { number: 'TKT-2026-0119', status: 'scheduled', machine: 'ZP-BS-2215', company: 'nova', site: 'chakan', type: 'Preventive maintenance',
      severity: null, coverage: 'chargeable', created: '2026-11-19T10:15', engineer: 'anita', window: { date: '2026-11-23', slot: '3 to 6 PM' },
      priority: 'Normal', source: 'Phone', by: 'imran', sla: ['Met', 'ok'], summary: 'Sealing plate temperature check and gasket change.' },
    { number: 'TKT-2026-0115', status: 'scheduled', machine: 'ZP-TF-2310', company: 'shree', site: 'vatva', type: 'Operator training',
      severity: null, coverage: 'chargeable', created: '2026-11-17T12:30', engineer: 'sandeep', window: { date: '2026-11-23', slot: '3 to 6 PM' },
      priority: 'Low', source: 'Phone', by: 'rakesh', sla: ['Met', 'ok'], summary: 'Mould change support for the new 250 ml tray.' },
    { number: 'TKT-2026-0114', status: 'completed', machine: 'ZP-CF-2108', company: 'nova', site: 'chakan', type: 'Spare part fitting',
      severity: 'minor', coverage: 'chargeable', created: '2026-11-20T16:00', engineer: 'anita', window: { date: '2026-11-23', slot: '9 AM to 12 PM' },
      priority: 'Normal', source: 'App', by: 'imran', sla: ['Met', 'ok'], summary: 'Replace worn cutting knife on the trim station.' },
    { number: 'TKT-2026-0118', status: 'closed', machine: 'ZP-PC-1805', company: 'shree', site: 'vatva', type: 'Breakdown or repair',
      severity: 'minor', coverage: 'chargeable', created: '2026-11-11T09:20', engineer: 'sandeep', rating: 4, priority: 'Normal',
      source: 'App', by: 'pooja', sla: ['Met', 'ok'], summary: 'Blower motor bearing noise.' },
    { number: 'TKT-2026-0117', status: 'closed', machine: 'ZP-TF-2310', company: 'shree', site: 'vatva', type: 'Calibration or trial',
      severity: null, coverage: 'chargeable', created: '2026-11-14T13:00', engineer: 'sandeep', rating: 5, priority: 'Normal',
      source: 'Email', by: 'rakesh', sla: ['Met', 'ok'], summary: 'Heater zone calibration.' },
  ],

  kpis: [
    { label: 'Open tickets', value: '15', trend: ['up', '2', 'bad'], foot: 'vs yesterday', href: 'D401' },
    { label: 'Unassigned', value: '4', trend: ['up', '1', 'bad'], foot: 'oldest 3 d', href: 'D401', query: '?view=unassigned' },
    { label: 'Machine down', value: '1', alert: true, trend: ['up', '1', 'bad'], foot: 'Nova Cups, 40 min', href: 'D425' },
    { label: 'SLA at risk', value: '2', trend: ['down', '1', 'good'], foot: '1 breached this week', href: 'D418' },
    { label: 'App requests', value: '2', trend: ['up', '1', 'bad'], foot: 'new user and machine', href: 'D102' },
    { label: 'Collected this month', value: '₹3.32 L', trend: ['up', '12%'], foot: 'vs October', href: 'D910' },
    { label: 'Overdue', value: '₹29,500', trend: ['up', '₹14,160', 'bad'], foot: '2 invoices', href: 'D901', query: '?view=overdue' },
    { label: 'Low stock parts', value: '3', trend: ['flat', '0'], foot: 'below minimum', href: 'D815' },
  ],

  /* top of the work queue (D102), most urgent first */
  queue: [
    { type: 'Assign', icon: 'siren', tone: 'red', title: 'Machine down, assign engineer', sub: 'Nova Cups · TKT-2026-0133', age: '40 min', due: 'Due in 3 h 20 min', href: 'D403' },
    { type: 'Assign', icon: 'clock-countdown', tone: 'amber', title: 'Offer to Sandeep expires in 18 min', sub: 'Shree Packaging · TKT-2026-0123', age: '1 d', due: 'Due in 18 min', href: 'D403' },
    { type: 'User requests', icon: 'user-plus', tone: 'blue', title: 'Add Harish Patel to the app', sub: 'Requested by Rakesh Mehta · Shree Packaging', age: '6 h', due: 'Due today', href: 'D205' },
    { type: 'Payments', icon: 'receipt', tone: 'blue', title: 'Bank transfer proof, ₹3,540.00', sub: 'Shree Packaging · INV-2026-0985', age: '2 d', due: 'Due today', href: 'D912' },
    { type: 'Reports', icon: 'clipboard-text', tone: 'blue', title: 'Review visit report', sub: 'Sandeep Yadav · TKT-2026-0128', age: '2 d', due: 'Due today', href: 'D413' },
    { type: 'Parts', icon: 'package', tone: 'amber', title: 'Chain set needed for this visit', sub: 'SPR-2026-0031 · Out of stock', age: '1 h 45 min', due: 'Urgent', href: 'D821' },
    { type: 'Claims', icon: 'shield-check', tone: 'blue', title: 'New warranty claim', sub: 'Shree Packaging · WCL-2026-0040', age: '1 d', due: 'Due tomorrow', href: 'D502' },
    { type: 'Leave', icon: 'calendar-blank', tone: 'blue', title: 'Leave request, 18 Dec', sub: 'Sandeep Yadav · Personal work', age: '3 d', due: '', href: 'D705' },
  ],

  /* today's visits for the dashboard mini schedule (spec: five for Sandeep, two for Anita) */
  visits: [
    { time: '09:00', ticket: 'TKT-2026-0126', engineer: 'sandeep', company: 'Shree Packaging', site: 'Vatva', status: 'in-progress' },
    { time: '10:30', ticket: 'TKT-2026-0114', engineer: 'anita', company: 'Nova Cups', site: 'Chakan', status: 'completed' },
    { time: '12:00', ticket: 'TKT-2026-0125', engineer: 'sandeep', company: 'Shree Packaging', site: 'Sanand', status: 'on-the-way' },
    { time: '15:00', ticket: 'TKT-2026-0132', engineer: 'sandeep', company: 'Shree Packaging', site: 'Vatva', status: 'scheduled' },
    { time: '15:00', ticket: 'TKT-2026-0119', engineer: 'anita', company: 'Nova Cups', site: 'Chakan', status: 'scheduled' },
    { time: '16:00', ticket: 'TKT-2026-0127', engineer: 'sandeep', company: 'Shree Packaging', site: 'Sanand', status: 'on-hold' },
    { time: '17:00', ticket: 'TKT-2026-0115', engineer: 'sandeep', company: 'Shree Packaging', site: 'Vatva', status: 'scheduled' },
  ],

  expiring: [
    { kind: 'Warranty', title: 'AFM-1000 Twin Station', sub: 'Shree Packaging · ZP-TF-2204', when: '2026-12-05', href: 'D302' },
    { kind: 'AMC', title: 'Essential, SVF-600', sub: 'Shree Packaging · AMC-2026-0011', when: '2026-12-21', href: 'D602' },
    { kind: 'AMC grace', title: 'Essential, PCR-300', sub: 'Shree Packaging · AMC-2026-0014', when: '2026-11-27', href: 'D602' },
  ],

  availability: [
    { engineer: 'sandeep', duty: 'Busy', tone: 'blue', now: 'On site, TKT-2026-0126', jobs: 5, next: 'Free after 6 PM' },
    { engineer: 'anita', duty: 'On duty', tone: 'green', now: 'Travelling to Chakan', jobs: 2, next: 'Free 12 to 3 PM' },
  ],

  feed: [
    { icon: 'navigation-arrow', title: 'Sandeep is on the way', sub: 'TKT-2026-0125 · ETA 35 min', when: '2026-11-23T11:48' },
    { icon: 'siren', tone: 'red', title: 'Machine down request', sub: 'Nova Cups · TKT-2026-0133', when: '2026-11-23T11:20' },
    { icon: 'package', title: 'Part request from Sandeep', sub: 'SPR-2026-0031 · Industrial chain set, 12B', when: '2026-11-23T10:15' },
    { icon: 'check-circle', tone: 'green', title: 'Checked in at Vatva', sub: 'Sandeep · TKT-2026-0126', when: '2026-11-23T09:32' },
    { icon: 'currency-inr', title: 'Estimate sent', sub: 'TKT-2026-0122 · ₹8,968.00', when: '2026-11-23T09:30' },
    { icon: 'user-plus', title: 'New user requested in the app', sub: 'Harish Patel · Shree Packaging', when: '2026-11-23T06:05' },
  ],

  notifications: [
    { icon: 'siren', tone: 'red', title: 'Machine down: Nova Cups', sub: 'TKT-2026-0133 · not assigned', when: '2026-11-23T11:20', unread: true, href: 'D403' },
    { icon: 'clock-countdown', tone: 'amber', title: 'Offer expires in 18 min', sub: 'TKT-2026-0123 · Sandeep Yadav', when: '2026-11-23T11:42', unread: true, href: 'D403' },
    { icon: 'package', tone: 'amber', title: 'Part needed for this visit', sub: 'SPR-2026-0031 · out of stock', when: '2026-11-23T10:15', unread: true, href: 'D821' },
    { icon: 'inbox', tone: 'blue', title: 'New IndiaMART lead', sub: 'Automatic vacuum forming machine · Pune', when: '2026-11-23T09:58', unread: true, href: 'D1103' },
    { icon: 'receipt', tone: 'blue', title: 'Offline payment proof', sub: 'INV-2026-0985 · ₹3,540.00', when: '2026-11-21T15:10', unread: false, href: 'D912' },
  ],

  /* sidebar counts */
  navCounts: { D102: 14, D206: 2, D401: [1, 'red'], D820: 1, D910: 1, D1001: 2, D1110: 3 },

  /* 30 days of service to 23 Nov: tickets raised, closed and response hours (target 4 h for machine down) */
  series: {
    days: ['25 Oct', '26', '27', '28', '29', '30', '31', '1 Nov', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
    raised: [3, 1, 4, 2, 3, 5, 2, 0, 1, 4, 3, 2, 5, 3, 1, 2, 4, 3, 5, 2, 3, 1, 2, 4, 3, 2, 3, 2, 2, 3],
    response: [3.4, 3.1, 4.2, 3.8, 3.0, 4.6, 3.3, 3.0, 2.8, 3.6, 3.9, 3.2, 4.4, 3.7, 3.1, 2.9, 3.5, 4.1, 4.8, 3.6, 3.2, 3.0, 2.7, 3.4, 3.6, 3.1, 3.3, 2.9, 3.0, 2.6],
    collected: { weeks: ['26 Oct', '2 Nov', '9 Nov', '16 Nov', '23 Nov'], paid: [86400, 112300, 74800, 99200, 45300], overdue: [0, 0, 14160, 29500, 29500] },
  },
};
