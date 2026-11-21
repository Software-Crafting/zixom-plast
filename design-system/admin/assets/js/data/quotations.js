/* Quotations, orders and turnkey projects (spec sections 11, 12 and 17). Leads come from data/sales.js
   (LD-2026-0042 to 0046 hold QT-2026-0010 to 0014); customers, people and engineers from ZX.data.
   Zixom is in Haryana and every buyer is out of state, so GST is IGST 18 percent. Amounts exclude GST. */
window.ZXA = window.ZXA || {};

/* product master (D1204). kind: Machine, Mould, Plant, Service. options: [name, rate] */
ZXA.data.products = [
  { code: 'AFM-760', name: 'AFM-760 Single Station', family: 'Thermoforming', kind: 'Machine', rate: 2250000, gst: 18, hsn: '8477',
    spec: 'Forming area 760 x 450 mm, sheet 0.2 to 1.8 mm, up to 25 cycles a minute, PP, PS, PET',
    options: [['Servo plug assist', 240000], ['Skin pack top film unit', 150000], ['Auto stacker', 185000]], brochure: 'AFM-760 brochure.pdf', status: 'active' },
  { code: 'AFM-1000', name: 'AFM-1000 Twin Station', family: 'Thermoforming', kind: 'Machine', rate: 4150000, gst: 18, hsn: '8477',
    spec: 'Forming area 1000 x 600 mm, form and cut in two stations, up to 30 cycles a minute',
    options: [['Servo plug assist', 280000], ['Auto stacker', 210000]], brochure: 'AFM-1000 brochure.pdf', status: 'active' },
  { code: 'CFM-450', name: 'CFM-450 Cup Former', family: 'Cup forming', kind: 'Machine', rate: 1320000, gst: 18, hsn: '8477',
    spec: 'Cups 65 to 450 ml, up to 40 strokes a minute, PP and PS sheet',
    options: [['Auto counting and packing', 260000]], brochure: 'CFM-450 brochure.pdf', status: 'active' },
  { code: 'AVF-900', name: 'AVF-900 Automatic Vacuum Former', family: 'Vacuum forming', kind: 'Machine', rate: 1850000, gst: 18, hsn: '8477',
    spec: 'Forming area 1200 x 800 mm, sheet up to 6 mm, ceramic heaters top and bottom',
    options: [['Plug assist', 120000]], brochure: 'AVF-900 brochure.pdf', status: 'active' },
  { code: 'SVF-600', name: 'SVF-600 Semi Auto Vacuum Former', family: 'Vacuum forming', kind: 'Machine', rate: 980000, gst: 18, hsn: '8477',
    spec: 'Forming area 600 x 450 mm, sheet up to 4 mm, manual load', options: [], brochure: 'SVF-600 brochure.pdf', status: 'active' },
  { code: 'BSM-300', name: 'BSM-300 Blister Sealer', family: 'Blister sealing', kind: 'Machine', rate: 640000, gst: 18, hsn: '8477',
    spec: 'Sealing area 300 x 250 mm, rotary table, 8 to 12 cycles a minute',
    options: [['Change parts, one format', 42500]], brochure: 'BSM-300 brochure.pdf', status: 'active' },
  { code: 'PCR-300', name: 'PCR-300 Scrap Crusher', family: 'Crusher', kind: 'Machine', rate: 285000, gst: 18, hsn: '8477',
    spec: '300 mm rotor, 7.5 kW motor, 150 to 200 kg an hour', options: [], brochure: 'PCR-300 brochure.pdf', status: 'active' },
  { code: 'MWP-2000', name: 'Mineral water plant, 2,000 LPH', family: 'Water plants', kind: 'Plant', rate: 2400000, gst: 18, hsn: '8421',
    spec: 'RO with UV and ozone, 2,000 litres an hour, SS 304 tanks',
    options: [['Bottle filling line, 40 bottles a minute', 650000]], brochure: 'Water plant brochure.pdf', status: 'active' },
  { code: 'MLD-T250', name: 'Tray mould 250 ml, 8 cavity', family: 'Moulds', kind: 'Mould', rate: 320000, gst: 18, hsn: '8480',
    spec: 'Aluminium, water cooled, for the AFM range', options: [], brochure: '', status: 'active' },
  { code: 'MLD-C200', name: 'Cup mould 200 ml', family: 'Moulds', kind: 'Mould', rate: 180000, gst: 18, hsn: '8480',
    spec: 'Steel, for the CFM-450', options: [], brochure: '', status: 'active' },
  { code: 'MLD-C300', name: 'Cup mould 300 ml', family: 'Moulds', kind: 'Mould', rate: 195000, gst: 18, hsn: '8480',
    spec: 'Steel, for the CFM-450', options: [], brochure: '', status: 'active' },
  { code: 'SRV-INST', name: 'Installation, commissioning and training', family: 'Services', kind: 'Service', rate: 60000, gst: 18, hsn: '998719',
    spec: 'Per machine. Engineer on site up to 3 days, operator training for 2 people', options: [], brochure: '', status: 'active' },
  { code: 'AFM-650', name: 'AFM-650 Single Station', family: 'Thermoforming', kind: 'Machine', rate: 1980000, gst: 18, hsn: '8477',
    spec: 'Forming area 650 x 400 mm. Replaced by the AFM-760', options: [], brochure: 'AFM-650 brochure.pdf', status: 'archived' },
];

/* terms templates (D1205). payment: [label, percent, when] */
ZXA.data.termTemplates = [
  { id: 'machine', name: 'Standard machine sale', type: 'Terms and conditions', default: true, updated: '2026-09-14',
    text: ['Prices are ex works Faridabad. Freight, insurance and unloading at actuals.', 'Delivery 10 to 12 weeks from the advance and drawing approval.',
      'Installation and commissioning by Zixom engineers. Power, compressed air and foundation by the buyer.',
      'Warranty 12 months from the installation date. Wear parts, heaters and misuse are not covered.', 'GST extra as applicable. Disputes under Faridabad jurisdiction.'] },
  { id: 'turnkey', name: 'Turnkey project', type: 'Terms and conditions', default: false, updated: '2026-08-02',
    text: ['Scope as per the attached layout. Civil work, utilities and chiller by the buyer.', 'Delivery 16 to 20 weeks from layout approval.',
      'Factory acceptance test at Faridabad before dispatch.', 'Warranty 12 months from commissioning.'] },
  { id: 'moulds', name: 'Moulds and spares', type: 'Terms and conditions', default: false, updated: '2026-07-21',
    text: ['Delivery 6 to 8 weeks for moulds, 1 week for spares in stock.', 'Mould trial at Faridabad with the buyer\'s sheet.', 'Warranty 6 months against manufacturing defects.'] },
  { id: 'p-30-40-30', name: '30 / 40 / 30', type: 'Payment terms', default: true, updated: '2026-06-10',
    payment: [['Advance', 30, 'With the order'], ['Before dispatch', 40, 'After factory test'], ['After commissioning', 30, 'Within 15 days']] },
  { id: 'p-40-40-20', name: '40 / 40 / 20', type: 'Payment terms', default: false, updated: '2026-11-21',
    payment: [['Advance', 40, 'With the order'], ['Before dispatch', 40, 'After factory test'], ['After commissioning', 20, 'Within 15 days']] },
  { id: 'p-50-50', name: '50 / 50', type: 'Payment terms', default: false, updated: '2026-06-10',
    payment: [['Advance', 50, 'With the order'], ['Before dispatch', 50, 'After trial']] },
];

/* lines: [product code, description, qty, rate, discount percent] */
ZXA.data.quotations = [
  { number: 'QT-2026-0014', rev: 'R2', status: 'revised', lead: 'LD-2026-0044', title: 'AFM-760 for seafood trays', created: '2026-10-29T11:00',
    sent: '2026-11-21T12:30', viewed: '2026-11-22T10:12', views: 2, validUntil: '2026-12-21', terms: 'machine', payment: 'p-40-40-20',
    delivery: '10 to 12 weeks from the advance', discountReason: 'Free installation agreed on the call of 21 Nov to close the order',
    lines: [['AFM-760', 'AFM-760 Single Station', 1, 2250000, 4], ['MLD-T250', 'Tray mould 250 ml, 8 cavity', 1, 320000, 0],
      ['SRV-INST', 'Installation, commissioning and training', 1, 80000, 100]],
    revisions: [{ rev: 'R1', status: 'revised', sent: '2026-10-30T16:20', viewed: '2026-10-31T09:40', payment: 'p-30-40-30',
      lines: [['AFM-760', 'AFM-760 Single Station', 1, 2250000, 0], ['MLD-T250', 'Tray mould 250 ml, 8 cavity', 1, 320000, 0],
        ['SRV-INST', 'Installation, commissioning and training', 1, 80000, 0]] }] },
  { number: 'QT-2026-0013', rev: '', status: 'rejected', lead: 'LD-2026-0042', title: 'Cup former, 2 cavity', created: '2026-11-03T10:30',
    sent: '2026-11-04T15:10', viewed: '2026-11-04T18:22', views: 3, validUntil: '2026-12-04', terms: 'machine', payment: 'p-30-40-30',
    delivery: '10 to 12 weeks from the advance', rejected: '2026-11-12T12:00', rejectReason: 'Price, chose a local supplier',
    lines: [['CFM-450', 'CFM-450 Cup Former', 1, 1320000, 0], ['MLD-C200', 'Cup mould 200 ml', 1, 180000, 0]], revisions: [] },
  { number: 'QT-2026-0012', rev: '', status: 'accepted', lead: 'LD-2026-0043', title: 'Two 250 ml tray moulds', created: '2026-11-04T12:00',
    sent: '2026-11-05T11:15', viewed: '2026-11-05T13:02', views: 4, validUntil: '2026-12-05', terms: 'moulds', payment: 'p-50-50',
    delivery: '6 to 8 weeks from the advance', accepted: '2026-11-16T17:20', acceptedBy: 'Nilesh Desai, by email with the signed PDF',
    order: 'ORD-2026-0213', lines: [['MLD-T250', 'Tray mould 250 ml, 8 cavity', 2, 320000, 0]], revisions: [] },
  { number: 'QT-2026-0011', rev: '', status: 'sent', lead: 'LD-2026-0045', title: 'Mineral water plant with filling line', created: '2026-11-12T10:00',
    sent: '2026-11-13T17:45', viewed: null, views: 0, validUntil: '2026-12-13', terms: 'turnkey', payment: 'p-30-40-30',
    delivery: '12 to 14 weeks from layout approval',
    lines: [['MWP-2000', 'Mineral water plant, 2,000 LPH', 1, 2400000, 0], ['MWP-2000', 'Bottle filling line, 40 bottles a minute', 1, 650000, 0],
      ['SRV-INST', 'Installation, commissioning and training', 1, 150000, 0]], revisions: [] },
  { number: 'QT-2026-0010', rev: '', status: 'draft', lead: 'LD-2026-0046', title: 'Skin packing line, 600 mm', created: '2026-11-20T15:30',
    sent: null, viewed: null, views: 0, validUntil: null, terms: 'machine', payment: 'p-30-40-30', delivery: '10 to 12 weeks from the advance',
    autosaved: '2026-11-23T11:58',
    lines: [['AFM-760', 'AFM-760 Single Station', 1, 2250000, 0], ['AFM-760', 'Skin pack top film unit', 1, 150000, 0]], revisions: [] },
];

/* sales orders and turnkey projects (D1210). Stages in order; payments: [label, percent, state, date, how] */
ZXA.data.stages = ['confirmed', 'design', 'manufacturing', 'testing', 'dispatched', 'installed', 'commissioned'];
ZXA.data.orders = [
  { number: 'PRJ-2026-001', kind: 'Turnkey project', company: 'nova', site: 'chakan', contact: 'imran', title: 'Second cup line, Chakan',
    source: 'Purchase order NC/PO/2026/118, 29 Aug 2026', confirmed: '2026-08-31', stage: 'manufacturing', stageSince: '2026-10-21', expected: '2027-01-15', late: 0,
    lines: [['CFM-450', 'CFM-450 Cup Former', 1, 1320000, 0], ['MLD-C200', 'Cup mould 200 ml', 1, 180000, 0], ['MLD-C300', 'Cup mould 300 ml', 1, 195000, 0],
      ['PCR-300', 'PCR-300 Scrap Crusher', 1, 285000, 0], ['SRV-INST', 'Installation, commissioning and training', 2, 60000, 0]],
    payments: [['Advance', 30, 'received', '2026-09-02', 'Bank transfer, UTR HDFC0026084412'], ['Before dispatch', 40, 'not-due', '2026-12-15', ''],
      ['After commissioning', 30, 'not-due', '2027-01-30', '']],
    machines: [['CFM-450 Cup Former', 'ZP-CF-2603', 'In build'], ['PCR-300 Scrap Crusher', 'ZP-PC-2605', 'Built, in store']],
    milestones: [
      { title: 'Layout and design approval', owner: 'Design team', due: '2026-09-15', done: '2026-09-12', status: 'done', note: 'Layout signed by Imran Qureshi.', photos: 2 },
      { title: 'Mould design and trial', owner: 'Tool room', due: '2026-10-20', done: '2026-10-20', status: 'done', note: 'Trial with Nova Cups sheet, 200 and 300 ml passed.', photos: 6 },
      { title: 'Machine build', owner: 'Production, Faridabad', due: '2026-11-30', status: 'in-progress', note: 'Frame, heaters and forming station assembled.', photos: 4 },
      { title: 'Factory acceptance test', owner: 'Quality', due: '2026-12-05', newDue: '2026-12-12', status: 'delayed', reason: 'Servo motor from the supplier is late by one week.', photos: 0 },
      { title: 'Dispatch, installation and commissioning', owner: 'Service, Anita Verma', due: '2027-01-15', status: 'not-started', note: '', photos: 0 },
    ] },
  { number: 'ORD-2026-0214', kind: 'Machine order', company: 'shree', site: 'sanand', contact: 'rakesh', title: 'Scrap crusher, Sanand',
    source: 'Accepted by phone by Rakesh Mehta, 2 Oct 2026, 11:40', confirmed: '2026-10-02', stage: 'installed', stageSince: '2026-11-18', expected: '2026-11-16', late: 7,
    lateReason: 'Site power connection was not ready until 18 Nov.',
    lines: [['PCR-300', 'PCR-300 Scrap Crusher', 1, 285000, 0], ['SRV-INST', 'Installation, commissioning and training', 1, 60000, 0]],
    payments: [['Advance', 30, 'received', '2026-10-03', 'UPI, PhonePe'], ['Before dispatch', 40, 'received', '2026-11-11', 'Bank transfer, UTR HDFC0026119021'],
      ['After commissioning', 30, 'not-due', '2026-12-06', '']],
    machines: [['PCR-300 Scrap Crusher', 'ZP-PC-2604', 'Installed, not in the register']],
    dispatch: { date: '2026-11-12', transporter: 'VRL Logistics', docket: 'VRL-FBD-448120', vehicle: 'HR 51 BT 4471' },
    install: { date: '2026-11-18', engineer: 'sandeep', commissioned: '2026-11-21', trial: '2 hours with HIPS scrap, 180 kg an hour', signedBy: 'Pooja Shah, Maintenance supervisor' },
    milestones: [] },
  { number: 'ORD-2026-0213', kind: 'Mould order', lead: 'LD-2026-0043', contactName: 'Nilesh Desai', title: 'Two 250 ml tray moulds',
    source: 'QT-2026-0012, accepted 16 Nov 2026', quotation: 'QT-2026-0012', confirmed: '2026-11-17', stage: 'design', stageSince: '2026-11-18', expected: '2027-01-08', late: 0,
    lines: [['MLD-T250', 'Tray mould 250 ml, 8 cavity', 2, 320000, 0]],
    payments: [['Advance', 50, 'received', '2026-11-18', 'Bank transfer, UTR ICIC0026771203'], ['Before dispatch', 50, 'not-due', '2026-12-28', '']],
    machines: [], milestones: [] },
];

/* lookups, totals and chips for the quotation and order pages */
ZXA.q = (() => {
  const { tag, money } = ZXA.r;
  const d = ZXA.data;
  const GST = 0.18;
  const DISCOUNT_LIMIT = 5;
  const quotation = (number) => d.quotations.find((q) => q.number === number || `${q.number}-${q.rev}` === number);
  const numberOf = (q) => (q.rev ? `${q.number}-${q.rev}` : q.number);
  const product = (code) => d.products.find((p) => p.code === code);
  const order = (number) => d.orders.find((o) => o.number === number);
  const template = (id) => d.termTemplates.find((t) => t.id === id);
  const lead = (number) => d.leads.find((l) => l.number === number);

  const lineAmount = ([, , qty, rate, disc]) => Math.round(qty * rate * (100 - disc)) / 100;
  const totals = (lines) => {
    const gross = lines.reduce((sum, [, , qty, rate]) => sum + qty * rate, 0);
    const taxable = lines.reduce((sum, line) => sum + lineAmount(line), 0);
    const gst = Math.round(taxable * GST * 100) / 100;
    return { gross, discount: gross - taxable, taxable, gst, total: taxable + gst };
  };

  /* who the quotation or order is for: a customer company or a lead */
  const party = (record) => {
    if (record.company) {
      const c = ZXA.r.company(record.company);
      const p = ZXA.r.person(record.contact);
      return { kind: 'Customer', name: c.name, sub: `${c.code} · ${c.city}`, contact: p, page: 'D202', query: `?c=${c.id}` };
    }
    const l = lead(record.lead);
    return { kind: 'Lead', name: l.company, sub: `${l.number} · ${l.city}`, contact: { name: l.name, mobile: l.mobile, email: l.email, initials: l.name.split(' ').map((w) => w[0]).join('') },
      page: 'D1103', query: `?l=${l.number}`, state: l.state };
  };

  const QUOTE = { draft: ['Draft', ''], sent: ['Sent', 'blue'], viewed: ['Viewed', 'blue'], accepted: ['Accepted', 'green'],
    rejected: ['Rejected', 'red'], expired: ['Expired', 'amber'], revised: ['Revised', 'amber'] };
  const quoteTag = (status) => tag(...QUOTE[status]);
  const STAGE = { confirmed: 'Confirmed', design: 'Design', manufacturing: 'Manufacturing', testing: 'Testing', dispatched: 'Dispatched',
    installed: 'Installed', commissioned: 'Commissioned' };
  const stageTag = (stage) => tag(STAGE[stage], stage === 'commissioned' ? 'green' : 'blue');
  const MILESTONE = { 'not-started': ['Not started', ''], 'in-progress': ['In progress', 'blue'], done: ['Done', 'green'], delayed: ['Delayed', 'red'] };
  const milestoneTag = (status) => tag(...MILESTONE[status]);
  const PAYMENT = { received: ['Received', 'green'], due: ['Due', 'amber'], 'not-due': ['Not due', ''] };
  const paymentTag = (state) => tag(...PAYMENT[state]);
  const lateTag = (o) => (o.late ? tag(`Late ${o.late} d`, 'red') : '');

  const received = (o) => {
    const total = totals(o.lines).total;
    const pct = o.payments.filter((p) => p[2] === 'received').reduce((sum, p) => sum + p[1], 0);
    return { pct, amount: Math.round(total * pct) / 100, total };
  };
  const productsText = (lines) => [...new Set(lines.map(([, desc]) => desc))].slice(0, 2).join(', ') + (lines.length > 2 ? ` +${lines.length - 2}` : '');

  return { GST, DISCOUNT_LIMIT, quotation, numberOf, product, order, template, lead, lineAmount, totals, party, quoteTag, QUOTE,
    stageTag, STAGE, milestoneTag, MILESTONE, paymentTag, lateTag, received, productsText, money };
})();
