/* Sign in and account demo data (spec D0, section 14 sign in rules). The only Admin is ZXA.data.admin. */
ZXA.data.account = {
  version: 'Dashboard 1.0.0',
  maskedEmail: 'a***@zixom.in',
  lastSignIn: '2026-11-23T09:02',
  memberSince: '2026-04-01',

  /* D011: browsers and devices signed in as this Admin */
  sessions: [
    { id: 's1', browser: 'Chrome 131 on Windows', icon: 'laptop', city: 'Faridabad, Haryana', active: '2026-11-23T12:00', started: '2026-11-23T09:02', current: true },
    { id: 's2', browser: 'Safari on iPhone', icon: 'smartphone', city: 'Faridabad, Haryana', active: '2026-11-23T08:15', started: '2026-11-20T19:40' },
    { id: 's3', browser: 'Edge 131 on Windows', icon: 'monitor', city: 'New Delhi, Delhi', active: '2026-11-21T17:30', started: '2026-11-21T10:05' },
  ],

  /* D012: this Admin's own actions from the activity log (D1640), newest first. href opens the record */
  activity: [
    { when: '2026-11-23T11:05', type: 'Tickets', icon: 'user-check', action: 'Assigned engineer', record: 'TKT-2026-0123', href: 'D403?t=TKT-2026-0123', detail: 'Sandeep Yadav, visit Mon 23 Nov' },
    { when: '2026-11-23T09:30', type: 'Tickets', icon: 'currency-inr', action: 'Sent estimate', record: 'TKT-2026-0122', href: 'D403?t=TKT-2026-0122', detail: '₹8,968.00 to Shree Packaging Industries' },
    { when: '2026-11-23T09:02', type: 'Account', icon: 'log-in', action: 'Signed in', record: '', href: 'D011', detail: 'Chrome on Windows, Faridabad' },
    { when: '2026-11-21T15:40', type: 'Money', icon: 'receipt', action: 'Issued invoice', record: 'INV-2026-0984', href: 'D903', detail: 'Vacuum pump service kit, ₹6,962.00' },
    { when: '2026-11-21T11:12', type: 'Customers', icon: 'user-check', action: 'Approved verification', record: 'ZP-C-0002', href: 'D202', detail: 'Imran Qureshi, Nova Cups Pvt Ltd' },
    { when: '2026-11-20T16:20', type: 'Tickets', icon: 'wrench', action: 'Created ticket', record: 'TKT-2026-0114', href: 'D403?t=TKT-2026-0114', detail: 'Spare part fitting, Nova Cups, Chakan' },
    { when: '2026-11-19T10:15', type: 'Tickets', icon: 'wrench', action: 'Created ticket', record: 'TKT-2026-0119', href: 'D403?t=TKT-2026-0119', detail: 'Preventive maintenance, phone call from Imran' },
    { when: '2026-11-18T14:02', type: 'Money', icon: 'receipt', action: 'Issued invoice', record: 'INV-2026-0983', href: 'D903', detail: 'Heater zone calibration, ₹2,360.00' },
    { when: '2026-11-17T18:30', type: 'Settings', icon: 'gear-six', action: 'Changed service slots', record: '', href: 'D1607', detail: 'Evening slot ends 6 PM' },
    { when: '2026-11-16T12:45', type: 'Money', icon: 'receipt', action: 'Issued invoice', record: 'INV-2026-0980', href: 'D903', detail: 'Blower motor repair, ₹4,720.00' },
    { when: '2026-11-14T09:10', type: 'Account', icon: 'key', action: 'Changed password', record: '', href: 'D010', detail: 'Other sessions signed out' },
  ],

  /* D013: which alerts by email and in the bell. locked: SOS and integration failures cannot be turned off */
  alerts: [
    { key: 'new-ticket', label: 'New service request', sub: 'From the app, phone or email', email: false, bell: true },
    { key: 'unassigned', label: 'Ticket not assigned', sub: 'After a set time', email: true, bell: true, minutes: 30 },
    { key: 'sla', label: 'Response target at risk or breached', sub: 'Section 14 targets', email: true, bell: true },
    { key: 'claims', label: 'Warranty claims and appeals', sub: 'New, information received, appeal', email: false, bell: true },
    { key: 'payments', label: 'Payments', sub: 'Received, failed, proof to verify', email: true, bell: true },
    { key: 'stock', label: 'Low stock', sub: 'Below the minimum level', email: false, bell: true },
    { key: 'leads', label: 'New leads', sub: 'IndiaMART and website enquiries', email: true, bell: true },
    { key: 'sos', label: 'Engineer SOS', sub: 'From the engineer app', email: true, bell: true, locked: true },
    { key: 'integration', label: 'Integration failures', sub: 'Razorpay, IndiaMART, email, SMS', email: true, bell: true, locked: true },
  ],

  /* D014: drafts not yet saved when signing out */
  unsaved: [
    { what: 'Estimate draft', record: 'TKT-2026-0127', where: 'Line 2 former, Shree Packaging' },
    { what: 'Invoice draft', record: 'TKT-2026-0128', where: '2 lines, not issued' },
  ],
};
