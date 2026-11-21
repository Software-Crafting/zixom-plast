/* Parts module demo data (spec module 8 and section 17): catalogue, one stock location (Q12), suppliers,
   a 60 day stock ledger, part requests from engineers and customer orders. Parts ZP-SP-001 to 005, the
   requests SPR-2026-0026 to 0031 and the orders ORD-2026-0205 to 0212 are the same records the mobile
   app shows (ZX.data and screens C701 to C710, E502); this file only adds the Admin fields.
   Also holds the small lookups and status chips every parts page shares (ZXA.parts). */
(() => {
  const d = ZX.data;
  const { tag } = ZXA.r;
  const mobile = Object.fromEntries(d.parts.map((p) => [p.number, p]));

  /* series a part fits; the compatibility matrix spreads them over the models */
  const MODELS = [['AFM-650', 'AFM'], ['AFM-760', 'AFM'], ['AFM-1000', 'AFM'], ['CFM-450', 'CFM'], ['SVF-600', 'SVF'], ['PCR-300', 'PCR'], ['BSM-300', 'BSM']];
  const CATEGORIES = [
    { name: 'Heaters', order: 1, status: 'active' }, { name: 'Timers', order: 2, status: 'active' },
    { name: 'Industrial chains', order: 3, status: 'active' }, { name: 'PID controllers', order: 4, status: 'active' },
    { name: 'Others', order: 5, status: 'active' }, { name: 'Sensors', order: 6, status: 'archived' },
  ];
  const SUPPLIERS = [
    { id: 'thermal', name: 'Thermal Elements India', city: 'Ahmedabad', contact: 'Mitesh Patel', phone: '+91 98250 64712', email: 'sales@thermalelements.example', gstin: '24AABCT4412K1Z6', status: 'active' },
    { id: 'volta', name: 'Volta Controls Pvt Ltd', city: 'Mumbai', contact: 'Sneha Rao', phone: '+91 98201 33450', email: 'orders@voltacontrols.example', gstin: '27AACCV2231L1Z9', status: 'active' },
    { id: 'shakti', name: 'Shakti Chains and Sprockets', city: 'Rajkot', contact: 'Hardik Joshi', phone: '+91 98790 21867', email: 'hardik@shaktichains.example', gstin: '24AAKFS7710M1Z3', status: 'active' },
    { id: 'vacuumtech', name: 'Vacuumtech Engineering', city: 'Pune', contact: 'Prakash Kulkarni', phone: '+91 98220 71904', email: 'prakash@vacuumtech.example', gstin: '27AAHFV5521N1Z1', status: 'active' },
    { id: 'deccan', name: 'Deccan Motor Spares', city: 'Pune', contact: 'Farhan Shaikh', phone: '+91 97660 18245', email: 'farhan@deccanspares.example', gstin: '27ABCFD9012P1Z5', status: 'active' },
    { id: 'gih', name: 'Gujarat Instrument House', city: 'Vadodara', contact: 'Ketan Desai', phone: '+91 98242 50318', email: '', gstin: '24AADFG3345Q1Z8', status: 'archived' },
  ];

  /* [number, name, category, price, cost, onHand, reserved, minimum, reorder qty, lead days, supplier, fits, HSN, unit]
     price null means On request. Reserved: ORD-2026-0207 (approved, waiting for payment) and SPR-2026-0030 (approved) */
  const ROWS = [
    ['ZP-SP-001', null, null, null, 1710, 17, 0, 6, 20, 7, 'thermal', 'AFM CFM SVF', '8516', 'Piece'],
    ['ZP-SP-002', null, null, null, 720, 3, 0, 5, 10, 5, 'volta', 'AFM CFM SVF PCR', '8536', 'Piece'],
    ['ZP-SP-003', null, null, null, 4100, 0, 0, 2, 4, 12, 'shakti', 'AFM', '7315', 'Set'],
    ['ZP-SP-004', null, null, null, 2600, 6, 1, 2, 4, 5, 'volta', 'AFM CFM SVF', '9032', 'Piece'],
    ['ZP-SP-005', null, null, null, 520, 2, 0, 0, 0, 0, 'vacuumtech', 'AFM SVF', '9026', 'Piece'],
    ['ZP-SP-006', 'Digital vacuum gauge', 'Others', 1450, 880, 9, 0, 3, 6, 7, 'vacuumtech', 'AFM SVF', '9026', 'Piece'],
    ['ZP-SP-007', 'Vacuum pump service kit', 'Others', 5400, 3300, 4, 1, 2, 4, 10, 'vacuumtech', 'AFM SVF', '8414', 'Kit'],
    ['ZP-SP-008', 'Thermocouple, J type', 'Heaters', 1050, 560, 26, 0, 10, 20, 7, 'thermal', 'AFM CFM SVF', '9025', 'Piece'],
    ['ZP-SP-009', 'Heater reflector plate', 'Heaters', 1980, 1150, 10, 0, 4, 8, 10, 'thermal', 'AFM', '8516', 'Piece'],
    ['ZP-SP-010', 'Solid state relay 40 A', 'Timers', 1680, 980, 12, 0, 4, 10, 5, 'volta', 'AFM CFM PCR', '8536', 'Piece'],
    ['ZP-SP-011', 'Drive sprocket 12B, 21 teeth', 'Industrial chains', 2350, 1400, 5, 0, 2, 4, 12, 'shakti', 'AFM', '8483', 'Piece'],
    ['ZP-SP-012', 'Chain tensioner', 'Industrial chains', 1400, 820, 6, 0, 3, 6, 12, 'shakti', 'AFM', '8483', 'Piece'],
    ['ZP-SP-013', 'Cycle timer, analogue', 'Timers', 1890, 1100, 4, 0, 2, 0, 7, 'volta', 'CFM PCR', '9106', 'Piece'],
    ['ZP-SP-014', 'Cycle timer, digital', 'Timers', 2450, 1450, 7, 0, 2, 5, 7, 'volta', 'AFM CFM PCR', '9106', 'Piece'],
    ['ZP-SP-015', 'PID controller, 4 zone', 'PID controllers', 8600, 5200, 3, 0, 1, 2, 10, 'volta', 'AFM CFM', '9032', 'Piece'],
    ['ZP-SP-016', 'Vacuum pump oil, 1 litre', 'Others', 420, 230, 40, 0, 12, 24, 5, 'vacuumtech', 'AFM SVF', '2710', 'Litre'],
    ['ZP-SP-017', 'Sealing plate gasket', 'Others', 760, 400, 14, 0, 4, 10, 7, 'vacuumtech', 'BSM', '4016', 'Piece'],
    ['ZP-SP-018', 'Crusher blade set, 4 blades', 'Others', 4800, 2900, 1, 0, 2, 4, 14, 'deccan', 'PCR', '8208', 'Set'],
    ['ZP-SP-019', 'Motor bearing set', 'Others', 1300, 750, 8, 0, 3, 6, 5, 'deccan', 'PCR CFM', '8482', 'Set'],
    ['ZP-SP-020', 'Cooling fan 230 V', 'Others', 1850, 1050, 6, 0, 2, 4, 7, 'deccan', 'AFM CFM SVF', '8414', 'Piece'],
  ];
  /* descriptions and specifications, the same text the app shows on C703 */
  const INFO = {
    'ZP-SP-001': ['Ceramic infrared element for the top and bottom heater banks.', [['Power', '650 W'], ['Voltage', '230 V AC'], ['Size', '245 × 60 mm'], ['Warranty', '6 months']]],
    'ZP-SP-002': ['Multi range on delay relay for forming and cooling cycles.', [['Supply', '24 V DC'], ['Range', '0.1 s to 10 min'], ['Contacts', '2 changeover'], ['Mount', 'DIN rail']]],
    'ZP-SP-003': ['Duplex roller chain for the sheet transport drive.', [['Pitch', '19.05 mm, 12B'], ['Length', '5 m with connector'], ['Material', 'Alloy steel'], ['Warranty', '3 months']]],
    'ZP-SP-004': ['Single loop controller for one heater zone.', [['Input', 'J or K thermocouple'], ['Output', 'SSR drive'], ['Size', '48 × 48 mm'], ['Supply', '230 V AC']]],
    'ZP-SP-005': ['Dial gauge for the vacuum line.', [['Range', '0 to −1 bar'], ['Dial', '63 mm'], ['Connection', '¼ inch BSP']]],
    'ZP-SP-006': ['Digital gauge with backlit display for the vacuum line.', [['Range', '0 to −1 bar'], ['Accuracy', '±1 percent'], ['Connection', '¼ inch BSP'], ['Supply', '2 × AA']]],
  };
  const HIDDEN = ['ZP-SP-017'];

  const parts = ROWS.map(([number, name, category, price, cost, onHand, reserved, min, reorder, lead, supplier, fits, hsn, unit]) => {
    const app = mobile[number] || {};
    const [description = '', specs = []] = INFO[number] || [];
    return { number, name: app.name ?? name, category: app.category ?? category, price: app.number ? app.price : price,
      discontinued: app.stock === 'discontinued', replacedBy: app.replacedBy || null, cost, onHand, reserved, min, reorder, lead,
      supplier, fits: fits.split(' '), hsn, unit, gst: 18, visible: !HIDDEN.includes(number), description, specs };
  });
  const part = (number) => parts.find((p) => p.number === number);
  const available = (p) => p.onHand - p.reserved;
  /* stock chip rules (module 8): Discontinued when marked, On request without a price, Out at zero, Low at or below minimum */
  const state = (p) => {
    if (p.discontinued) return 'discontinued';
    if (p.price === null) return 'request';
    if (available(p) <= 0) return 'out';
    return available(p) <= p.min ? 'low' : 'in';
  };
  const belowMin = (p) => !p.discontinued && available(p) <= p.min;
  const stockTag = (p) => ZXA.r.stockTag(state(p));
  const price = (p) => (p.price === null ? '<span class="muted">On request</span>' : ZXA.r.money(p.price));
  const supplier = (id) => SUPPLIERS.find((s) => s.id === id);

  /* ---------- stock ledger, 25 Sep to 23 Nov. [when, part, type, quantity, reference, note]. Balances run back from on hand ---------- */
  const TYPES = { receipt: ['Receipt', 'green'], ticket: ['Issue to ticket', 'blue'], order: ['Issue to order', 'blue'],
    engineer: ['Issue to engineer', 'blue'], return: ['Return', ''], adjust: ['Adjustment', 'amber'] };
  const MOVES = [
    ['2026-09-28T11:20', 'ZP-SP-001', 'receipt', 8, 'TEI/26-27/0412', 'Thermal Elements India'],
    ['2026-09-28T11:20', 'ZP-SP-008', 'receipt', 30, 'TEI/26-27/0412', 'Thermal Elements India'],
    ['2026-10-03T15:40', 'ZP-SP-016', 'receipt', 48, 'VT/26-27/188', 'Vacuumtech Engineering'],
    ['2026-10-06T12:10', 'ZP-SP-002', 'receipt', 6, 'VC/2627/0931', 'Volta Controls Pvt Ltd'],
    ['2026-10-06T12:10', 'ZP-SP-010', 'receipt', 12, 'VC/2627/0931', 'Volta Controls Pvt Ltd'],
    ['2026-10-09T10:30', 'ZP-SP-001', 'engineer', -4, 'Sandeep Yadav', 'Breakdown kit, Ahmedabad'],
    ['2026-10-09T10:30', 'ZP-SP-008', 'engineer', -4, 'Anita Verma', 'Breakdown kit, Pune'],
    ['2026-10-14T16:05', 'ZP-SP-003', 'receipt', 2, 'SCS/1456', 'Shakti Chains and Sprockets'],
    ['2026-10-14T16:05', 'ZP-SP-012', 'receipt', 6, 'SCS/1456', 'Shakti Chains and Sprockets'],
    ['2026-10-20T13:15', 'ZP-SP-006', 'receipt', 10, 'VT/26-27/241', 'Vacuumtech Engineering'],
    ['2026-10-20T13:15', 'ZP-SP-007', 'receipt', 4, 'VT/26-27/241', 'Vacuumtech Engineering'],
    ['2026-10-22T10:00', 'ZP-SP-016', 'engineer', -6, 'Sandeep Yadav', 'AMC visit stock'],
    ['2026-10-26T09:10', 'ZP-SP-003', 'engineer', -1, 'Sandeep Yadav', 'Breakdown kit, Ahmedabad'],
    ['2026-10-30T09:40', 'ZP-SP-001', 'ticket', -4, 'TKT-2026-0129', 'AMC visit, billed on INV-2026-0981'],
    ['2026-10-30T09:40', 'ZP-SP-002', 'ticket', -1, 'TKT-2026-0129', 'AMC visit, billed on INV-2026-0981'],
    ['2026-10-31T17:20', 'ZP-SP-001', 'engineer', -2, 'Anita Verma', 'Breakdown kit, Pune'],
    ['2026-11-03T11:45', 'ZP-SP-018', 'engineer', -1, 'Sandeep Yadav', 'PCR-300 breakdown kit'],
    ['2026-11-04T14:30', 'ZP-SP-004', 'receipt', 6, 'VC/2627/1102', 'Volta Controls Pvt Ltd'],
    ['2026-11-04T14:30', 'ZP-SP-014', 'receipt', 5, 'VC/2627/1102', 'Volta Controls Pvt Ltd'],
    ['2026-11-05T11:00', 'ZP-SP-005', 'order', -1, 'ORD-2026-0212', 'Packed'],
    ['2026-11-08T10:20', 'ZP-SP-012', 'ticket', -1, 'TKT-2026-0116', 'Chain tensioner replacement'],
    ['2026-11-10T17:15', 'ZP-SP-016', 'adjust', -2, 'Count correction', 'Monthly count'],
    ['2026-11-12T12:00', 'ZP-SP-002', 'order', -2, 'ORD-2026-0210', 'Packed'],
    ['2026-11-12T12:00', 'ZP-SP-006', 'order', -1, 'ORD-2026-0210', 'Packed'],
    ['2026-11-13T16:30', 'ZP-SP-008', 'return', 1, 'Anita Verma', 'Unused, back from the breakdown kit'],
    ['2026-11-14T09:50', 'ZP-SP-019', 'ticket', -1, 'TKT-2026-0118', 'Blower motor repair'],
    ['2026-11-15T12:40', 'ZP-SP-003', 'adjust', -1, 'Damage', 'Side plate cracked in storage'],
    ['2026-11-16T11:00', 'ZP-SP-002', 'engineer', -1, 'SPR-2026-0027', 'Sandeep Yadav, next visit'],
    ['2026-11-18T10:45', 'ZP-SP-001', 'receipt', 24, 'TEI/26-27/0590', 'Thermal Elements India. Notify me sent to 2 customers'],
    ['2026-11-18T12:00', 'ZP-SP-001', 'ticket', -2, 'SPR-2026-0028', 'TKT-2026-0125, courier to site'],
    ['2026-11-19T17:30', 'ZP-SP-001', 'ticket', -1, 'SPR-2026-0029', 'TKT-2026-0128, warranty'],
    ['2026-11-20T15:10', 'ZP-SP-008', 'order', -4, 'ORD-2026-0209', 'Packed'],
    ['2026-11-20T15:10', 'ZP-SP-010', 'order', -2, 'ORD-2026-0209', 'Packed'],
    ['2026-11-22T16:30', 'ZP-SP-001', 'order', -4, 'ORD-2026-0208', 'Packed'],
    ['2026-11-22T16:30', 'ZP-SP-002', 'order', -1, 'ORD-2026-0208', 'Packed'],
    ['2026-11-23T09:15', 'ZP-SP-019', 'receipt', 6, 'DMS/2026/377', 'Deccan Motor Spares'],
    ['2026-11-23T09:15', 'ZP-SP-020', 'receipt', 4, 'DMS/2026/377', 'Deccan Motor Spares'],
  ];
  const running = Object.fromEntries(parts.map((p) => [p.number, p.onHand]));
  const ledger = [...MOVES].reverse().map(([when, number, type, qty, ref, note], i) => {
    const balance = running[number];
    running[number] -= qty;
    if (running[number] < 0) throw new Error(`Ledger for ${number} goes below zero before ${when}`);
    return { id: MOVES.length - i, when, part: number, type, qty, ref, note, balance, by: 'Rajesh Goyal' };
  });
  const typeTag = (type) => tag(...TYPES[type]);

  /* ---------- part requests: engineers (SPR) from the engineer app; lines are [part, qty, unit price before GST] ---------- */
  const SPR_STATUS = { submitted: ['Submitted', 'blue'], approved: ['Approved', 'blue'], partly: ['Partly approved', 'amber'], 'on-order': ['On order', 'amber'],
    issued: ['Issued', 'blue'], dispatched: ['Dispatched', 'blue'], delivered: ['Delivered', 'green'], rejected: ['Rejected', ''] };
  const FROM_APP = { Requested: 'submitted', Approved: 'approved', Issued: 'issued', Dispatched: 'dispatched', Delivered: 'delivered', Rejected: 'rejected' };
  const E502 = [
    { number: 'SPR-2026-0028', ticket: 'TKT-2026-0125', part: 'ZP-SP-001', qty: 2, urgency: 'This visit', deliverTo: 'Courier', status: 'Dispatched', when: '2026-11-17T14:20', courier: 'Blue Dart', tracking: '7710224418' },
    { number: 'SPR-2026-0027', ticket: 'TKT-2026-0124', part: 'ZP-SP-002', qty: 1, urgency: 'Next visit', deliverTo: 'Engineer', status: 'Issued', when: '2026-11-16T11:00' },
    { number: 'SPR-2026-0026', ticket: 'TKT-2026-0130', part: 'ZP-SP-005', qty: 1, urgency: 'Next visit', deliverTo: 'Site', status: 'Rejected', when: '2026-11-13T09:30', reason: 'Discontinued. Request ZP-SP-006 instead.' },
  ];
  const ADMIN_SPR = {
    'SPR-2026-0031': { note: 'Chain jumped the sprocket and two links are stretched. Need the full 12B set.', photos: 2 },
    'SPR-2026-0030': { note: 'Zone 2 controller display is dead. Fit at the next visit.', photos: 1, price: 3950, approved: '2026-11-22T15:10',
      priceNote: 'Price entered by Admin; Shree Packaging approved it in the app on 22 Nov' },
    'SPR-2026-0029': { note: 'Zone 4 element open circuit.', photos: 1, approved: '2026-11-19T16:40', issued: '2026-11-19T17:30', delivered: '2026-11-20T10:40' },
    'SPR-2026-0028': { note: 'Two elements read low on the bottom bank.', photos: 0, approved: '2026-11-17T15:00', issued: '2026-11-18T12:00', dispatched: '2026-11-18T12:30' },
    'SPR-2026-0027': { note: 'Spare relay for the operator training visit.', photos: 0, approved: '2026-11-16T10:20', issued: '2026-11-16T11:00' },
    'SPR-2026-0026': { note: 'Gauge glass broken.', photos: 1, rejected: '2026-11-13T10:05' },
  };
  const requests = [...d.engineerDay.partsRequests, ...E502].map((x) => {
    const t = ZXA.r.ticket(x.ticket);
    const p = part(x.part);
    const extra = ADMIN_SPR[x.number] || {};
    /* warranty jobs: parts at zero; AMC covers labour only, so parts are chargeable */
    const rate = t.coverage === 'warranty' ? 0 : (extra.price ?? p.price);
    return { ...x, ...extra, status: FROM_APP[x.status], engineer: 'sandeep', company: t.company, site: t.site, coverage: t.coverage,
      lines: [[x.part, x.qty, rate]] };
  }).sort((a, b) => b.number.localeCompare(a.number));
  const request = (number) => requests.find((x) => x.number === number);
  const sprTag = (status) => tag(...SPR_STATUS[status]);
  /* needed for this visit turns red once the request is over 2 hours old (module 8, D820) */
  const urgencyTag = (x) => {
    if (x.urgency !== 'This visit') return tag(x.urgency, 'outline');
    const open = ['submitted', 'approved', 'on-order'].includes(x.status);
    const hours = (new Date(d.now) - new Date(x.when)) / 3600000;
    return tag('This visit', open ? (hours > 2 ? 'red' : 'amber') : '', open && hours > 2 ? 'siren' : '');
  };

  /* ---------- customer orders, the same eight the app lists (C707, C708). items are [part, qty, rate before GST] ---------- */
  const ORDER_STATUS = { submitted: ['Submitted', 'blue'], quoted: ['Quoted', 'amber'], approved: ['Approved', 'blue'], pending: ['Pending payment', 'amber'],
    paid: ['Paid', 'blue'], packed: ['Packed', 'blue'], dispatched: ['Dispatched', 'blue'], delivered: ['Delivered', 'green'],
    cancelled: ['Cancelled', ''], return: ['Return requested', 'amber'] };
  const PAY_STATUS = { 'not-due': ['Quote first', 'outline'], unpaid: ['Unpaid', 'amber'], failed: ['Payment failed', 'red'], paid: ['Paid', 'green'],
    refunding: ['Refund initiated', 'amber'] };
  const orders = [
    { number: 'ORD-2026-0205', status: 'submitted', request: true, by: 'rakesh', company: 'shree', site: 'sanand', machine: 'ZP-CF-2011', created: '2026-11-23T10:15',
      items: [['ZP-SP-004', 2, null]], delivery: 0, pay: 'not-due', note: 'Two spare controllers for the cup former heater zones.' },
    { number: 'ORD-2026-0206', status: 'quoted', request: true, by: 'rakesh', company: 'shree', site: 'vatva', machine: 'ZP-TF-2310', created: '2026-11-19T15:30',
      quoted: '2026-11-20T11:00', validUntil: '2026-11-26', items: [['ZP-SP-003', 1, 6400]], delivery: 600, pay: 'not-due',
      quoteNote: 'Chain set is on order. Dispatch about 3 Dec after payment.' },
    { number: 'ORD-2026-0207', status: 'pending', request: true, by: 'pooja', company: 'shree', site: 'sanand', machine: 'ZP-VF-1908', created: '2026-11-17T12:05',
      quoted: '2026-11-18T10:00', approved: '2026-11-19T10:20', invoice: 'INV-2026-0984', items: [['ZP-SP-007', 1, 5400]], delivery: 500, pay: 'failed',
      payNote: 'Net banking, SBI, declined by the bank on 22 Nov, 6:44 PM' },
    { number: 'ORD-2026-0208', status: 'packed', by: 'rakesh', company: 'shree', site: 'vatva', created: '2026-11-02T09:40', paid: '2026-11-02T09:46',
      packed: '2026-11-22T16:30', items: [['ZP-SP-001', 4, 2850], ['ZP-SP-002', 1, 1240]], delivery: 360, pay: 'paid', method: 'UPI, PhonePe',
      boxes: 1, weight: 3.2 },
    { number: 'ORD-2026-0209', status: 'dispatched', by: 'rakesh', company: 'shree', site: 'vatva', created: '2026-11-16T11:00', paid: '2026-11-16T11:04',
      packed: '2026-11-20T15:10', dispatched: '2026-11-21T17:05', expected: '2026-11-25', courier: 'Blue Dart', tracking: '79351204466', boxes: 1, weight: 2.4,
      items: [['ZP-SP-008', 4, 1050], ['ZP-SP-010', 2, 1680]], delivery: 360, pay: 'paid', method: 'Card, Visa 4417' },
    { number: 'ORD-2026-0210', status: 'delivered', by: 'pooja', company: 'shree', site: 'sanand', created: '2026-11-10T14:20', paid: '2026-11-10T14:25',
      packed: '2026-11-12T12:00', dispatched: '2026-11-13T17:40', delivered: '2026-11-20T13:10', courier: 'Blue Dart', tracking: '79351187320', boxes: 1, weight: 1.6,
      items: [['ZP-SP-002', 2, 1240], ['ZP-SP-006', 1, 1450]], delivery: 360, pay: 'paid', method: 'UPI, Google Pay', problem: true },
    { number: 'ORD-2026-0211', status: 'cancelled', by: 'rakesh', company: 'shree', site: 'vatva', created: '2026-11-19T09:00', paid: '2026-11-19T09:05',
      cancelled: '2026-11-21T10:30', cancelledBy: 'Rakesh Mehta in the app', cancelReason: 'Ordered by mistake', items: [['ZP-SP-008', 2, 1050]], delivery: 400,
      pay: 'refunding', method: 'UPI, PhonePe', refund: d.refunds.find((x) => x.order === 'ORD-2026-0211') },
    { number: 'ORD-2026-0212', status: 'return', by: 'pooja', company: 'shree', site: 'sanand', created: '2026-11-04T10:00', paid: '2026-11-04T10:06',
      packed: '2026-11-05T11:00', dispatched: '2026-11-06T16:00', delivered: '2026-11-12T12:30', returned: '2026-11-16T09:15', courier: 'Blue Dart',
      tracking: '79351152981', boxes: 1, weight: 0.6, items: [['ZP-SP-005', 1, 980]], delivery: 300, pay: 'paid', method: 'Net banking, HDFC' },
  ];
  const order = (number) => orders.find((o) => o.number === number);
  const orderTag = (status) => tag(...ORDER_STATUS[status]);
  const payTag = (o) => tag(...PAY_STATUS[o.pay]);
  /* invoice lines: items with a price plus delivery; GST 18 percent through ZX.render.totals */
  const orderLines = (o) => [...o.items.filter(([, , rate]) => rate !== null).map(([n, qty, rate]) => [part(n).name, qty, rate]),
    ...(o.delivery ? [['Delivery', 1, o.delivery]] : [])];
  const orderTotal = (o) => (o.items.some(([, , rate]) => rate === null) ? null : ZXA.r.totals(orderLines(o)).total);

  /* ---------- returns and delivery problems from the app (C709, C710) ---------- */
  const issues = [
    { order: 'ORD-2026-0210', kind: 'Delivery problem', reason: 'Damaged on arrival', item: 'ZP-SP-006', qty: 1, when: '2026-11-22T18:20', by: 'pooja',
      text: 'Display is cracked across the top. Box was dented on arrival.', photos: 3, query: 'QRY-2026-0034', status: 'new' },
    { order: 'ORD-2026-0212', kind: 'Return', reason: 'Damaged part: dial glass cracked', item: 'ZP-SP-005', qty: 1, when: '2026-11-16T09:15', by: 'pooja',
      text: 'Dial glass was cracked when we opened the box.', photos: 2, status: 'new' },
  ];

  /* ---------- notify me: customers waiting for a part to come back in stock ---------- */
  const notify = [
    { part: 'ZP-SP-003', person: 'rakesh', company: 'shree', asked: '2026-11-16T10:05', status: 'waiting' },
    { part: 'ZP-SP-003', person: 'imran', company: 'nova', asked: '2026-11-19T14:40', status: 'waiting' },
    { part: 'ZP-SP-001', person: 'imran', company: 'nova', asked: '2026-11-05T12:30', status: 'sent', sent: '2026-11-18T10:45' },
    { part: 'ZP-SP-001', person: 'pooja', company: 'shree', asked: '2026-11-09T16:10', status: 'sent', sent: '2026-11-18T10:45' },
  ];

  /* reorder state for parts at or below minimum (D815) */
  const reorder = {
    'ZP-SP-003': { status: 'ordered', on: '2026-11-20', expected: '2026-12-02', qty: 4 },
    'ZP-SP-002': { status: 'open' },
    'ZP-SP-018': { status: 'open' },
  };

  const priceChanges = [
    { id: 'PC-3', title: 'Heaters, plus 5 percent', parts: ['ZP-SP-001', 'ZP-SP-008', 'ZP-SP-009'], percent: 5, effective: '2026-12-01', status: 'scheduled', by: 'Rajesh Goyal', created: '2026-11-21T16:40' },
    { id: 'PC-2', title: 'Digital vacuum gauge', parts: ['ZP-SP-006'], from: 1390, to: 1450, effective: '2026-11-04', status: 'applied', by: 'Rajesh Goyal', created: '2026-11-04T10:15' },
    { id: 'PC-1', title: 'Timers, plus 3 percent', parts: ['ZP-SP-002', 'ZP-SP-010', 'ZP-SP-013', 'ZP-SP-014'], percent: 3, effective: '2026-10-01', status: 'applied', by: 'Rajesh Goyal', created: '2026-09-29T12:00' },
  ];

  ZXA.data.parts = { parts, categories: CATEGORIES, models: MODELS, suppliers: SUPPLIERS, ledger, requests, orders, issues, notify, reorder, priceChanges,
    location: 'Main store' };
  ZXA.parts = { part, available, state, belowMin, stockTag, price, supplier, typeTag, TYPES, request, sprTag, urgencyTag, SPR_STATUS,
    order, orderTag, payTag, orderLines, orderTotal, ORDER_STATUS, PAY_STATUS };
})();
