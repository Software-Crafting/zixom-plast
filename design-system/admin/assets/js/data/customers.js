/* Customers demo data (spec module 2). Builds on ZX.data companies and users
   (Shree Packaging ZP-C-0001, Nova Cups ZP-C-0002; Rakesh, Pooja, Imran) and adds what only the dashboard holds:
   company status and billing, more people, app access, requests from the app, unknown numbers, conflicts, devices,
   deletion and number change requests. No sign up: Zixom adds every person and sends app access by SMS (26 Nov 2026). ZXA.cx at the bottom joins it all for the pages. Today is Mon 23 Nov 2026, 12:00. */
window.ZXA = window.ZXA || {};

Object.assign(ZXA.data, {
  /* admin fields for the two mobile companies */
  companyInfo: {
    shree: { status: 'active', state: 'Gujarat', pan: 'AAAAA0000A', billing: 'Plot 214, Phase II, GIDC Vatva, Ahmedabad 382445',
      terms: 15, created: '2018-05-14', createdBy: 'Rajesh Goyal', notes: 'Priority account. Keep Mr Mehta updated by phone on machine down.' },
    nova: { status: 'active', state: 'Maharashtra', pan: 'AAAAA0000A', billing: 'Gat 112, Chakan MIDC Phase 1, Pune 410501',
      terms: 15, created: '2021-09-01', createdBy: 'Rajesh Goyal', notes: '' },
  },

  /* companies only the dashboard sees: a duplicate made by an import, one suspended, one deactivated */
  moreCompanies: [
    { id: 'shree-dup', name: 'Shree Packaging Inds.', city: 'Ahmedabad', code: 'ZP-C-0003', gstin: '24AAAAA0000A1Z5', status: 'pending',
      state: 'Gujarat', pan: '', billing: 'Plot 214, GIDC Vatva, Ahmedabad 382445', terms: 15, created: '2026-11-19', createdBy: 'Import, Rajesh Goyal',
      notes: 'Created by the 19 Nov customer import. Same GSTIN as ZP-C-0001.', machineCount: 0,
      sites: [{ id: 'vatva2', name: 'Vatva', address: 'Plot 214, GIDC Vatva, Ahmedabad', pincode: '382445', contact: { name: 'Rakesh M', phone: '+91 98250 11410' }, access: '' }] },
    { id: 'kaveri', name: 'Kaveri Polymers Pvt Ltd', city: 'Surat', code: 'ZP-C-0004', gstin: '24AAKCS4821M1Z2', status: 'suspended',
      state: 'Gujarat', pan: 'AAKCS4821M', billing: 'Plot 7, Sachin GIDC, Surat 394230', terms: 15, created: '2023-02-11', createdBy: 'Rajesh Goyal',
      notes: 'Suspended on 2 Nov for dues over 90 days.', machineCount: 2, dues: 86200, overdue: 86200,
      sites: [{ id: 'sachin', name: 'Sachin unit', address: 'Plot 7, Sachin GIDC, Surat', pincode: '394230', contact: { name: 'Nitin Kaveri', phone: '+91 98240 77310' }, access: '' }] },
    { id: 'ganga', name: 'Ganga Disposables', city: 'Faridabad', code: 'ZP-C-0005', gstin: '06AAFCG5512Q1ZB', status: 'deactivated',
      state: 'Haryana', pan: 'AAFCG5512Q', billing: 'Sector 24, Faridabad 121005', terms: 15, created: '2020-07-20', createdBy: 'Rajesh Goyal',
      notes: 'Deactivated 30 Sep 2026: plant closed.', machineCount: 1, deactivated: '2026-09-30', reason: 'Plant closed',
      sites: [{ id: 'sec24', name: 'Sector 24 unit', address: 'Sector 24, Faridabad', pincode: '121005', contact: { name: 'Ritu Bansal', phone: '+91 98110 64422' }, access: '' }] },
  ],

  /* admin fields for the mobile people and engineers. Permissions are flat: only the primary flag matters */
  peopleInfo: {
    rakesh: { status: 'active', sites: ['vatva', 'sanand'], lastActive: '2026-11-23T11:52', app: '1.4.2', joined: '2018-05-14' },
    pooja: { status: 'active', sites: ['sanand', 'vatva'], lastActive: '2026-11-23T07:40', app: '1.4.2', joined: '2022-03-02' },
    imran: { status: 'active', sites: ['chakan'], lastActive: '2026-11-23T11:24', app: '1.4.0', joined: '2021-09-01' },
    sandeep: { status: 'active', lastActive: '2026-11-23T11:58', app: '1.4.2', joined: '2017-04-03' },
    anita: { status: 'active', lastActive: '2026-11-23T11:40', app: '1.4.2', joined: '2022-08-16' },
  },
  morePeople: [
    { id: 'dinesh', name: 'Dinesh Rathod', initials: 'DR', mobile: '+91 99252 18806', email: 'dinesh@shreepack.example', designation: 'Machine operator',
      companies: [{ id: 'shree', primary: false }], sites: ['vatva'], status: 'invited', lastActive: null, app: null, joined: '2026-11-20' },
    { id: 'kunal', name: 'Kunal Shah', initials: 'KS', mobile: '+91 97249 30115', email: '', designation: 'Store keeper',
      companies: [{ id: 'shree', primary: false }], sites: ['sanand'], status: 'invited', lastActive: null, app: null, joined: '2026-11-06' },
    { id: 'manoj', name: 'Manoj Desai', initials: 'MD', mobile: '+91 98795 60214', email: 'manoj@shreepack.example', designation: 'Purchase executive',
      companies: [{ id: 'shree', primary: false }], sites: ['vatva'], status: 'active', lastActive: '2026-11-20T10:05', app: '1.3.9', joined: '2023-06-12' },
    { id: 'sneha', name: 'Sneha Kulkarni', initials: 'SK', mobile: '+91 97300 51288', email: 'sneha@novacups.example', designation: 'Maintenance engineer',
      companies: [{ id: 'nova', primary: false }], sites: ['chakan'], status: 'active', lastActive: '2026-11-22T17:30', app: '1.4.2', joined: '2026-11-18' },
    { id: 'syadav-nova', name: 'S. Yadav', initials: 'SY', mobile: '+91 99090 33114', email: '', designation: 'Fitter',
      companies: [{ id: 'nova', primary: false }], sites: ['chakan'], status: 'disabled', lastActive: null, app: null, joined: '2026-11-21' },
    { id: 'rakesh-dup', name: 'Rakesh M', initials: 'RM', mobile: '+91 98250 11411', email: 'rakesh@shreepack.example', designation: 'Plant head',
      companies: [{ id: 'shree-dup', primary: true }], sites: ['vatva2'], status: 'invited', lastActive: null, app: null, joined: '2026-11-19' },
    { id: 'nitin', name: 'Nitin Kaveri', initials: 'NK', mobile: '+91 98240 77310', email: 'nitin@kaveripoly.example', designation: 'Director',
      companies: [{ id: 'kaveri', primary: true }], sites: ['sachin'], status: 'active', lastActive: '2026-10-30T09:12', app: '1.3.9', joined: '2023-02-11' },
    { id: 'ritu', name: 'Ritu Bansal', initials: 'RB', mobile: '+91 98110 64422', email: 'ritu@gangadisp.example', designation: 'Owner',
      companies: [{ id: 'ganga', primary: true }], sites: ['sec24'], status: 'disabled', lastActive: '2026-09-28T16:40', app: '1.3.6', joined: '2020-07-20' },
  ],

  /* app access by SMS: sent is the last SMS. Invited over 7 days without a sign in shows as Never signed in */
  accessSent: { rakesh: '2018-05-14T12:00', pooja: '2022-03-02T10:00', imran: '2021-09-01T12:00', dinesh: '2026-11-20T15:30',
    kunal: '2026-11-06T11:30', manoj: '2023-06-12T10:00', sneha: '2026-11-18T10:02', 'syadav-nova': '2026-11-21T10:00',
    'rakesh-dup': '2026-11-19T12:00', nitin: '2023-02-11T12:00', ritu: '2020-07-20T12:00' },

  /* "Request a new user" from a primary contact in the app; lands in the work queue */
  appRequests: [
    { id: 'REQ-2026-0018', key: 'harish', status: 'pending', name: 'Harish Patel', mobile: '+91 98795 31420', email: 'harish@shreepack.example',
      designation: 'Shift engineer', company: 'shree', site: 'sanand', by: 'rakesh', submitted: '2026-11-23T06:05', note: 'Runs the new AFM-650 at Sanand.' },
    { id: 'REQ-2026-0017', key: 'sneha', status: 'added', name: 'Sneha Kulkarni', mobile: '+91 97300 51288', email: 'sneha@novacups.example',
      designation: 'Maintenance engineer', company: 'nova', site: 'chakan', by: 'imran', submitted: '2026-11-18T09:10', decided: ['Added by Rajesh Goyal', '2026-11-18T10:02'] },
    { id: 'REQ-2026-0016', key: 'arjun', status: 'declined', name: 'Arjun Pawar', mobile: '+91 98507 22146', email: '',
      designation: 'Contractor', company: 'nova', site: 'chakan', by: 'imran', submitted: '2026-11-02T09:45', decided: ['Declined: Not an employee of the customer', '2026-11-02T15:20'] },
  ],

  /* sign in tried from numbers Zixom has not added */
  unknownNumbers: [
    { mobile: '+91 98901 22874', attempts: 3, first: '2026-11-18T10:15', last: '2026-11-20T17:30', status: 'new' },
    { mobile: '+91 88004 52190', attempts: 1, first: '2026-11-14T11:05', last: '2026-11-14T11:05', status: 'ignored' },
  ],

  /* one number or email on two accounts (EC-A35); both sides with their last activity */
  conflicts: [
    { id: 'CONF-0004', kind: 'Mobile', value: '+91 99090 33114', opened: '2026-11-21T18:20', status: 'open',
      a: { person: 'sandeep', role: 'Engineer', last: 'Checked in at Vatva, today 09:32' },
      b: { person: 'syadav-nova', role: 'Customer', last: 'Added on 21 Nov, never signed in' } },
    { id: 'CONF-0003', kind: 'Email', value: 'rakesh@shreepack.example', opened: '2026-11-19T12:05', status: 'open',
      a: { person: 'rakesh', role: 'Customer', last: 'Signed in today 11:52' },
      b: { person: 'rakesh-dup', role: 'Customer', last: 'Created by the 19 Nov import, invited' } },
    { id: 'CONF-0002', kind: 'Mobile', value: '+91 98220 43120', opened: '2026-11-08T10:40', status: 'resolved',
      a: { person: 'imran', role: 'Customer', last: '' }, b: { person: 'pooja', role: 'Customer', last: '' },
      resolution: 'Kept on Imran Qureshi. Pooja Shah asked to use her own number', resolved: '2026-11-08T12:15' },
  ],

  /* registered devices; limit customers 2, engineers 1 */
  devices: [
    { person: 'rakesh', model: 'iPhone 13', os: 'iOS 18.1', app: '1.4.2', last: '2026-11-23T08:55', city: 'Ahmedabad', push: 'ok' },
    { person: 'rakesh', model: 'Samsung Galaxy M34', os: 'Android 14', app: '1.4.0', last: '2026-11-19T18:12', city: 'Ahmedabad', push: 'ok' },
    { person: 'pooja', model: 'Redmi Note 13', os: 'Android 14', app: '1.4.2', last: '2026-11-23T07:40', city: 'Ahmedabad', push: 'ok' },
    { person: 'imran', model: 'OnePlus Nord CE 3', os: 'Android 14', app: '1.4.0', last: '2026-11-23T11:24', city: 'Pune', push: 'expired' },
    { person: 'manoj', model: 'Realme 11', os: 'Android 13', app: '1.3.9', last: '2026-11-20T10:05', city: 'Ahmedabad', push: 'ok' },
    { person: 'sneha', model: 'iPhone 12', os: 'iOS 17.6', app: '1.4.2', last: '2026-11-22T17:30', city: 'Pune', push: 'ok' },
    { person: 'sandeep', model: 'Samsung Galaxy A54', os: 'Android 14', app: '1.4.2', last: '2026-11-23T11:58', city: 'Ahmedabad', push: 'ok' },
    { person: 'anita', model: 'Vivo V29', os: 'Android 14', app: '1.4.2', last: '2026-11-23T11:40', city: 'Pune', push: 'ok' },
  ],

  /* account deletion requests from the app (A24): 30 day wait, blockers stop approval (EC-A53) */
  deletions: [
    { number: 'DEL-2026-0007', person: 'manoj', company: 'shree', requested: '2026-11-20T10:05', scheduled: '2026-12-20', status: 'pending',
      reason: 'Left the company', blockers: [['Open ticket', 'TKT-2026-0130', 'D403', '?t=TKT-2026-0130'], ['Unpaid invoice', 'INV-2026-0981', 'D903', '']] },
    { number: 'DEL-2026-0006', person: 'ritu', company: 'ganga', requested: '2026-10-20T16:30', scheduled: '2026-11-19', status: 'pending',
      reason: 'Business closed', blockers: [] },
    { number: 'DEL-2026-0005', person: 'pooja', company: 'shree', requested: '2026-11-09T19:20', scheduled: '2026-12-09', status: 'cancelled',
      reason: 'Changed my mind', cancelled: '2026-11-10T09:02', blockers: [] },
    { number: 'DEL-2026-0004', name: 'Deleted person', company: 'kaveri', requested: '2026-09-12T11:00', scheduled: '2026-10-12', status: 'done',
      reason: 'Not using the app', done: '2026-10-12T02:00', blockers: [] },
  ],

  /* mobile number changes from the app (A19); the new number must be unused (EC-A35) */
  numberChanges: [
    { id: 'MOB-0012', person: 'rakesh', old: '+91 98250 11410', new: '+91 99250 44718', requested: '2026-11-23T11:05', status: 'pending',
      newVerified: true, oldVerified: false, note: 'Old number lost' },
    { id: 'MOB-0011', person: 'pooja', old: '+91 97140 22321', new: '+91 98220 43120', requested: '2026-11-08T10:30', status: 'rejected',
      newVerified: true, oldVerified: true, note: 'New number is on Imran Qureshi (EC-A35)' },
    { id: 'MOB-0010', person: 'imran', old: '+91 98220 43000', new: '+91 98220 43120', requested: '2026-10-02T12:10', status: 'approved',
      newVerified: true, oldVerified: true, note: 'Old number released 2 Oct' },
  ],

  /* company history (D202 History tab) */
  companyHistory: {
    shree: [
      ['2026-11-23T06:05', 'Rakesh Mehta', 'Requested Harish Patel as a new user in the app'],
      ['2026-11-20T15:30', 'Rajesh Goyal', 'Added Dinesh Rathod. App access sent by SMS'],
      ['2026-11-19T12:05', 'System', 'Possible duplicate: ZP-C-0003 has the same GSTIN'],
      ['2026-04-01T10:00', 'Rajesh Goyal', 'AMC-2026-0010 Preventive Plus activated'],
      ['2025-11-20T09:30', 'Rajesh Goyal', 'Machine ZP-TF-2204 added, Vatva plant'],
      ['2024-02-12T11:15', 'Rajesh Goyal', 'Credit terms: 30 → 15 days'],
      ['2018-05-14T12:00', 'Rajesh Goyal', 'Company created'],
    ],
  },
});

/* lookups across the mobile and admin customer data */
ZXA.cx = (() => {
  const d = ZX.data;
  const a = ZXA.data;
  const r = ZXA.r;
  const companies = [...d.companies.map((c) => ({ ...c, ...a.companyInfo[c.id] })), ...a.moreCompanies];
  const company = (id) => companies.find((c) => c.id === id);
  const engineers = d.engineers.map((e) => ({ ...e, mobile: e.phone, email: '', role: 'Engineer', companies: [], ...a.peopleInfo[e.id] }));
  const customers = [...d.users.map((u) => ({ ...u, ...a.peopleInfo[u.id] })), ...a.morePeople].map((p) => ({ ...p, role: 'Customer' }));
  const people = [...customers, ...engineers];
  const person = (id) => people.find((p) => p.id === id);
  const peopleOf = (companyId) => customers.filter((p) => p.companies.some((c) => c.id === companyId));
  const primaryOf = (companyId) => peopleOf(companyId).find((p) => p.companies.find((c) => c.id === companyId).primary);
  const machinesOf = (companyId) => r.machines.filter((m) => m.company === companyId);
  const machineCount = (c) => (c.machineCount ?? machinesOf(c.id).length);
  const ticketsOf = (companyId) => r.tickets.filter((t) => t.company === companyId);
  const openTicketsOf = (companyId) => ticketsOf(companyId).filter(r.isOpen);
  /* every mobile invoice is Shree's */
  const invoicesOf = (companyId) => (companyId === 'shree' ? d.invoices : []);
  const UNPAID = ['due', 'overdue', 'processing', 'verification'];
  const dues = (c) => c.dues ?? invoicesOf(c.id).filter((i) => UNPAID.includes(i.status)).reduce((sum, i) => sum + r.balance(i), 0);
  const overdue = (c) => c.overdue ?? invoicesOf(c.id).filter((i) => i.status === 'overdue').reduce((sum, i) => sum + r.balance(i), 0);
  const amcOf = (companyId) => (companyId === 'shree' ? d.amc : []);
  /* app access: Invited turns into Never signed in after 7 days without a sign in */
  const ACCESS = { invited: ['Invited', 'blue'], active: ['Active', 'green'], never: ['Never signed in', 'amber'], disabled: ['Disabled', ''] };
  const accessOf = (p) => {
    const sent = a.accessSent[p.id];
    if (p.status !== 'invited') return p.status === 'disabled' ? 'disabled' : 'active';
    return sent && r.daysFromToday(sent.slice(0, 10)) < -7 ? 'never' : 'invited';
  };
  const accessTag = (p) => r.tag(...ACCESS[accessOf(p)]);
  const appRequest = (key) => a.appRequests.find((x) => x.key === key);

  const COMPANY = { active: ['Active', 'green'], pending: ['Pending', 'amber'], suspended: ['Suspended', 'red'], deactivated: ['Deactivated', ''] };
  const PERSON = { invited: ['Invited', 'blue'], active: ['Active', 'green'], disabled: ['Disabled', ''], deleted: ['Deleted', 'outline'] };
  const companyTag = (s) => r.tag(...COMPANY[s]);
  const personTag = (s) => r.tag(...PERSON[s]);
  const roleTag = (p) => (p.role === 'Engineer' ? r.tag('Engineer', 'blue') : r.tag('Customer', 'outline'));
  const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();


  return { companies, company, customers, engineers, people, person, peopleOf, primaryOf, machinesOf, machineCount, ticketsOf, openTicketsOf,
    invoicesOf, dues, overdue, amcOf, accessOf, accessTag, appRequest, ACCESS, companyTag, personTag, roleTag, initials, COMPANY };
})();
