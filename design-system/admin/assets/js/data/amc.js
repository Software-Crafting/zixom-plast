/* AMC module demo data (spec module 6, section 17): plans, contracts, visits, renewals and requests.
   Contracts 0010, 0011 and 0014 extend ZX.data.amc; 0012, 0013, 0015 and 0016 match the app (C401, C402, C404)
   and the AMC invoices in ZX.data.invoices. Prices follow the app and the invoices (Essential ₹24,000,
   Preventive Plus ₹36,000 per machine per year before GST), not the lower Q15 defaults. */
window.ZXA = window.ZXA || {};

(() => {
  const d = ZX.data;

  /* price per machine per year before GST, by series; 2 years 5 percent off, 3 years 10 percent off */
  const SERIES = ['Thermoforming (AFM)', 'Cup forming (CFM)', 'Vacuum forming (SVF)', 'Blister sealing (BSM)', 'Plastic crusher (PCR)'];
  const TERM_DISCOUNT = { 1: 0, 2: 5, 3: 10 };
  const EXCLUSIONS = ['Moulds, tooling and sheet material', 'Damage from misuse, fire or power surges', 'Parts outside the plan terms'];
  const plans = [
    { name: 'Essential', status: 'published', price: 24000, visits: 4, response: '48 hours', parts: '5% off parts', discount: 5,
      summary: 'Quarterly preventive visit and breakdown cover.',
      includes: ['Preventive visit every quarter', 'Breakdown visits at no charge', 'Labour included'], excludes: EXCLUSIONS,
      prices: [24000, 24000, 24000, 18000, 24000], inUse: 3 },
    { name: 'Preventive Plus', status: 'published', price: 36000, visits: 6, response: '24 hours', parts: '10% off parts', discount: 10,
      summary: 'A visit every 2 months with heater and vacuum checks.',
      includes: ['Preventive visit every 2 months', 'Breakdown visits at no charge', 'Heater and vacuum check each visit'], excludes: EXCLUSIONS,
      prices: [36000, 36000, 36000, 30000, 36000], inUse: 3 },
    { name: 'Comprehensive', status: 'published', price: 54000, visits: 12, response: '8 hours', parts: 'Wear parts included', discount: 15,
      summary: 'Monthly visit, wear parts included.', notFor: 'Not for plastic crushers',
      includes: ['Monthly preventive visit', 'Breakdown visits at no charge', 'Heaters, belts and seals included'], excludes: EXCLUSIONS,
      prices: [54000, 54000, 54000, 48000, null], inUse: 1 },
    { name: 'Crusher Care', status: 'draft', price: 15000, visits: 2, response: '48 hours', parts: '5% off parts', discount: 5,
      summary: 'Blade check and sharpening twice a year.',
      includes: ['Preventive visit every 6 months', 'Blade sharpening once a year', 'Labour included'], excludes: EXCLUSIONS,
      prices: [null, null, null, null, 15000], inUse: 0 },
  ];

  /* admin fields on top of ZX.data.amc, plus the contracts the app shows from its own sample list */
  const extra = {
    'AMC-2026-0010': { company: 'shree', site: 'sanand', years: 1, value: 36000, invoices: ['INV-2026-0982'], created: '2026-03-24', by: 'rakesh' },
    'AMC-2026-0011': { company: 'shree', site: 'sanand', years: 1, value: 24000, invoices: ['INV-2026-0986'], created: '2025-12-15', by: 'rakesh',
      renewal: 'INV-2026-0986', reminders: ['2026-10-22', '2026-11-21', null, null] },
    'AMC-2026-0014': { company: 'shree', site: 'vatva', years: 1, value: 24000, invoices: ['INV-2026-0990'], created: '2025-11-14', by: 'pooja',
      renewal: 'INV-2026-0990', reminders: ['2026-09-21', '2026-10-21', '2026-11-13', '2026-11-20'] },
  };
  const contracts = [
    ...d.amc.map((c) => ({ ...c, ...extra[c.number] })),
    { number: 'AMC-2026-0012', plan: 'Preventive Plus', status: 'pending', start: '2026-12-06', end: '2027-12-05', machines: ['ZP-TF-2204'],
      visitsIncluded: 6, visitsUsed: 0, company: 'shree', site: 'vatva', years: 1, value: 36000, invoices: ['INV-2026-0988'], created: '2026-11-20', by: 'rakesh',
      from: 'Quote request, converted 20 Nov' },
    { number: 'AMC-2026-0013', plan: 'Essential', status: 'suspended', start: '2026-07-01', end: '2027-06-30', machines: ['ZP-TF-2310'],
      visitsIncluded: 4, visitsUsed: 1, company: 'shree', site: 'vatva', years: 1, value: 24000, invoices: ['INV-2026-0989'], created: '2026-06-24', by: 'rakesh',
      suspended: { on: '2026-11-15', reason: 'Non payment', note: 'Second half yearly instalment INV-2026-0989 overdue since 8 Nov.' } },
    { number: 'AMC-2026-0015', plan: 'Comprehensive', status: 'quote', start: '2027-04-01', end: '2029-03-31', machines: ['ZP-CF-2011', 'ZP-VF-1908'],
      visitsIncluded: 24, visitsUsed: 0, company: 'shree', site: 'sanand', years: 2, value: 205200, invoices: [], created: '2026-11-20', by: 'rakesh' },
    { number: 'AMC-2026-0016', plan: 'Preventive Plus', status: 'pending', start: '2026-12-01', end: '2027-11-30', machines: ['ZP-BS-2215'],
      visitsIncluded: 6, visitsUsed: 0, company: 'nova', site: 'chakan', years: 1, value: 36000, invoices: ['INV-2026-0991'], created: '2026-11-23', by: 'rakesh',
      from: 'Bought in the app, Pay now not completed' },
    { number: 'AMC-2026-0017', plan: 'Essential', status: 'quote', start: '2026-12-15', end: '2027-12-14', machines: ['ZP-CF-2108'],
      visitsIncluded: 4, visitsUsed: 0, company: 'nova', site: 'chakan', years: 1, value: 24000, invoices: [], created: '2026-11-17', by: 'imran' },
  ].sort((x, y) => y.number.localeCompare(x.number));

  /* planned AMC visits; n is the visit number within the contract. Planned has no ticket yet; Scheduled has one */
  const visits = [
    { amc: 'AMC-2026-0011', n: 1, due: '2026-02-18', status: 'done', engineer: 'sandeep' },
    { amc: 'AMC-2026-0011', n: 2, due: '2026-05-20', status: 'done', engineer: 'sandeep' },
    { amc: 'AMC-2026-0011', n: 3, due: '2026-10-21', status: 'done', engineer: 'sandeep', ticket: 'TKT-2026-0129', report: 'SR-2026-0129', moved: '2026-10-28' },
    { amc: 'AMC-2026-0011', n: 4, due: '2026-11-30', status: 'planned', slot: '9 AM to 12 PM' },
    { amc: 'AMC-2026-0010', n: 1, due: '2026-06-10', status: 'done', engineer: 'sandeep' },
    { amc: 'AMC-2026-0010', n: 2, due: '2026-08-12', status: 'done', engineer: 'sandeep' },
    { amc: 'AMC-2026-0010', n: 3, due: '2026-10-14', status: 'missed', engineer: 'sandeep', why: 'Machine was not free on the day.' },
    { amc: 'AMC-2026-0010', n: 4, due: '2026-12-12', status: 'planned', slot: '9 AM to 12 PM', engineer: 'sandeep', request: true },
    { amc: 'AMC-2026-0010', n: 5, due: '2027-02-10', status: 'planned', slot: '9 AM to 12 PM' },
    { amc: 'AMC-2026-0010', n: 6, due: '2027-03-17', status: 'planned', slot: '9 AM to 12 PM' },
    { amc: 'AMC-2026-0013', n: 1, due: '2026-08-26', status: 'done', engineer: 'sandeep' },
    { amc: 'AMC-2026-0013', n: 2, due: '2026-11-25', status: 'on-hold', why: 'AMC suspended' },
    { amc: 'AMC-2026-0014', n: 4, due: '2026-10-07', status: 'done', engineer: 'sandeep' },
  ];

  /* customers who chose Do not renew in the app (C408) */
  const notRenewing = [
    { amc: 'AMC-2025-0007', company: 'nova', machine: 'ZP-CF-2108', plan: 'Essential', ended: '2026-09-30', reason: 'Price is too high',
      comment: 'Budget for next year is approved in April. Call us then.', by: 'imran', on: '2026-09-02', status: 'open' },
    { amc: 'AMC-2025-0004', company: 'nova', machine: 'ZP-BS-2215', plan: 'Essential', ended: '2026-08-31', reason: 'We did not use the visits',
      comment: '', by: 'imran', on: '2026-08-10', status: 'won', outcome: 'Bought Preventive Plus, AMC-2026-0016' },
    { amc: 'AMC-2025-0002', company: 'shree', machine: 'ZP-TF-1702', model: 'AFM-500 Single Station', plan: 'Essential', ended: '2026-09-14',
      reason: 'Machine sold or retired', comment: 'Old AFM-500 sold to a scrap dealer.', by: 'rakesh', on: '2026-09-14', status: 'closed' },
  ];

  /* visit reschedule requests from the app (C407) */
  const reschedules = [
    { id: 'RSR-2026-0006', amc: 'AMC-2026-0010', n: 4, original: '2026-12-12', slot: '9 AM to 12 PM', requested: ['2026-12-15', '2026-12-16', '2026-12-17'],
      reason: 'Production run', note: 'Festive order on the cup line until 14 Dec.', by: 'rakesh', on: '2026-11-23T10:05', status: 'pending' },
    { id: 'RSR-2026-0005', amc: 'AMC-2026-0011', n: 3, original: '2026-10-21', slot: '9 AM to 12 PM', requested: ['2026-10-28'],
      reason: 'Plant closed', note: 'Diwali shutdown.', by: 'pooja', on: '2026-10-12T15:40', status: 'approved', decided: '2026-10-28' },
    { id: 'RSR-2026-0004', amc: 'AMC-2026-0010', n: 3, original: '2026-10-14', slot: '9 AM to 12 PM', requested: ['2026-10-14'],
      reason: 'Contact not available', note: 'Can the engineer come at 4 PM instead?', by: 'pooja', on: '2026-10-14T08:10', status: 'declined',
      why: 'Less than 4 hours before the window. Visit kept.' },
  ];

  const STATUS = { quote: ['Quote requested', 'blue'], pending: ['Pending payment', 'amber'], active: ['Active', 'green'], expiring: ['Expiring', 'amber'],
    suspended: ['Suspended', 'red'], expired: ['Expired', 'red'], cancelled: ['Cancelled', ''] };
  const VISIT = { planned: ['Planned', 'outline'], scheduled: ['Scheduled', 'blue'], done: ['Done', 'green'], missed: ['Missed', 'red'],
    rescheduled: ['Rescheduled', 'amber'], 'on-hold': ['On hold', 'amber'] };
  const INVOICE = { draft: ['Draft', 'outline'], due: ['Due', 'amber'], overdue: ['Overdue', 'red'], processing: ['Processing', 'blue'],
    verification: ['Awaiting verification', 'amber'], paid: ['Paid', 'green'], cancelled: ['Cancelled', ''] };
  const GRACE_DAYS = 7;

  ZXA.data.amc = { plans, contracts, visits, notRenewing, reschedules, SERIES, TERM_DISCOUNT, GRACE_DAYS };

  /* small lookups and chips for the AMC pages */
  const { tag, daysFromToday } = ZX.render;
  const contract = (number) => contracts.find((c) => c.number === number);
  ZXA.amc = {
    contract,
    plan: (name) => plans.find((p) => p.name === name),
    visitsOf: (number) => visits.filter((v) => v.amc === number).sort((x, y) => x.due.localeCompare(y.due)),
    visit: (number, n) => visits.find((v) => v.amc === number && v.n === Number(n)),
    tag: (status) => tag(...STATUS[status]),
    label: (status) => STATUS[status][0],
    visitTag: (status) => tag(...VISIT[status]),
    /* days left in the 7 day grace period after the end date; 0 or less means a renewal is a new contract */
    graceLeft: (c) => GRACE_DAYS + daysFromToday(c.end),
    /* Admin invoice wording (section 11); the app's invoiceTag has no Draft or Partly paid */
    invoiceTag: (inv) => (inv.paid && inv.paid < inv.amount ? tag('Partly paid', 'amber') : tag(...INVOICE[inv.status])),
    STATUS,
  };
})();
