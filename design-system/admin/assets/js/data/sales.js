/* Sales demo data (spec section 11 and 17): leads LD-2026-0040 to 0049 across every stage, calls, follow ups,
   duplicates, the IndiaMART inbox (12 entries), webhook log and product mapping. The one owner is the Admin.
   Quotation numbers link to QT-2026-0010 to 0014 (D1203). */
ZXA.data.leadStages = ['New', 'Contacted', 'Requirement understood', 'Quotation sent', 'Negotiation', 'Won', 'Lost'];

ZXA.data.leads = [
  { number: 'LD-2026-0049', stage: 'New', source: 'IndiaMART', imType: 'W', imQuery: '2948817361', priority: 'High',
    name: 'Vikram Joshi', company: 'Joshi Polypack', mobile: '+91 98230 41877', email: 'vikram@joshipolypack.example', city: 'Pune', state: 'Maharashtra',
    product: 'Automatic vacuum forming machine', requirement: 'Need an automatic vacuum forming machine for 1,200 x 800 mm food trays, about 20 cycles a minute.',
    value: 1850000, created: '2026-11-23T09:58', lastContact: null, followUp: '2026-11-23T15:00' },
  { number: 'LD-2026-0048', stage: 'New', source: 'IndiaMART', imType: 'P', imQuery: '2948790125', priority: 'High', flag: 'Missed call',
    name: 'Harpreet Singh', company: 'Punjab Thermo Plast', mobile: '+91 98140 66231', email: '', city: 'Ludhiana', state: 'Punjab',
    product: 'Heater elements', requirement: 'Missed call through IndiaMART. Asked about ceramic heater elements on the catalog.',
    value: 45000, created: '2026-11-23T08:30', lastContact: null, followUp: '2026-11-23T13:00' },
  { number: 'LD-2026-0047', stage: 'Contacted', source: 'IndiaMART', imType: 'B', imQuery: '2947552018', priority: 'Normal',
    name: 'Mehul Patel', company: 'Patel Pharma Pack', mobile: '+91 99250 18842', email: 'mehul@patelpharma.example', city: 'Rajkot', state: 'Gujarat',
    product: 'Blister sealing machine', requirement: 'Blister sealing machine for tablet strips, 40 strokes a minute. Consumed buy lead.',
    value: 1200000, created: '2026-11-19T14:20', lastContact: '2026-11-19T16:05', followUp: '2026-11-21T11:00' },
  { number: 'LD-2026-0046', stage: 'Requirement understood', source: 'IndiaMART', imType: 'WA', imQuery: '2946108844', priority: 'High',
    name: 'Srinivas Reddy', company: 'Deccan Foods Packaging', mobile: '+91 98480 27715', email: 'srinivas@deccanfoods.example', city: 'Hyderabad', state: 'Telangana',
    product: 'Thermoforming machine', requirement: 'Skin packing line for frozen food, 600 mm web. Wants a trial with their film.',
    value: 2400000, created: '2026-11-17T12:40', lastContact: '2026-11-20T11:30', followUp: '2026-11-25T11:00', quotation: 'QT-2026-0010' },
  { number: 'LD-2026-0045', stage: 'Quotation sent', source: 'Phone', priority: 'Normal',
    name: 'Sunil Agarwal', company: 'Agarwal Beverages', mobile: '+91 98260 51190', email: 'sunil@agarwalbev.example', city: 'Indore', state: 'Madhya Pradesh',
    product: 'Mineral water plant', requirement: '2,000 litres an hour mineral water plant with a bottle filling line.',
    value: 3200000, created: '2026-11-09T10:15', lastContact: '2026-11-18T15:40', followUp: '2026-11-24T11:00', quotation: 'QT-2026-0011' },
  { number: 'LD-2026-0044', stage: 'Negotiation', source: 'Email', priority: 'Normal',
    name: 'Kavita Nair', company: 'Coastal Foods', mobile: '+91 94470 33018', email: 'kavita@coastalfoods.example', city: 'Kochi', state: 'Kerala',
    product: 'Thermoforming machine', requirement: 'AFM-760 for seafood trays. Asking for 5 percent off and free installation.',
    value: 2650000, created: '2026-10-28T09:00', lastContact: '2026-11-21T12:10', followUp: '2026-11-26T15:00', quotation: 'QT-2026-0014-R2' },
  { number: 'LD-2026-0043', stage: 'Won', source: 'Referral', priority: 'Normal', referredBy: 'Rakesh Mehta, Shree Packaging',
    name: 'Nilesh Desai', company: 'Desai Plastics', mobile: '+91 98790 44512', email: 'nilesh@desaiplastics.example', city: 'Surat', state: 'Gujarat',
    product: 'Moulds', requirement: 'Two 250 ml tray moulds for their thermoforming line.',
    value: 640000, created: '2026-10-20T11:30', lastContact: '2026-11-16T17:20', followUp: null, quotation: 'QT-2026-0012', wonNote: 'QT-2026-0012 accepted on 16 Nov' },
  { number: 'LD-2026-0042', stage: 'Lost', source: 'IndiaMART', imType: 'V', imQuery: '2942270391', priority: 'Low',
    name: 'Rohit Jain', company: 'Jain Disposables', mobile: '+91 94140 70262', email: 'rohit@jaindisposables.example', city: 'Jaipur', state: 'Rajasthan',
    product: 'Cup forming machine', requirement: 'Viewed the CFM-450 on the catalog. Wanted a price for a 2 cavity cup former.',
    value: 1500000, created: '2026-11-02T18:10', lastContact: '2026-11-12T12:00', followUp: null, quotation: 'QT-2026-0013', lostReason: 'Price, chose a local supplier' },
  { number: 'LD-2026-0041', stage: 'Requirement understood', source: 'App', priority: 'Normal', customer: 'shree',
    name: 'Rakesh Mehta', company: 'Shree Packaging Industries', mobile: '+91 98250 11410', email: 'rakesh@shreepack.example', city: 'Ahmedabad', state: 'Gujarat',
    product: 'Moulds', requirement: 'Product enquiry from the app: a 500 ml tray mould for the AFM-760 at Vatva.',
    value: 380000, created: '2026-11-14T16:45', lastContact: '2026-11-20T10:00', followUp: '2026-11-27T11:00' },
  { number: 'LD-2026-0040', stage: 'Contacted', source: 'Phone', priority: 'Normal',
    name: 'V Joshi', company: 'Joshi Poly Pack', mobile: '+91 98230 41877', email: '', city: 'Pune', state: 'Maharashtra',
    product: 'Automatic vacuum forming machine', requirement: 'Called for a price list of vacuum forming machines.',
    value: 0, created: '2026-10-12T12:20', lastContact: '2026-10-12T12:30', followUp: '2026-12-01T11:00' },
];

/* calls: [lead, time, minutes, outcome, notes, next step] */
ZXA.data.leadCalls = [
  ['LD-2026-0049', '2026-11-23T10:20', 0, 'No answer', 'Rang twice, sent a WhatsApp.', 'Call again at 3 PM'],
  ['LD-2026-0048', '2026-11-23T09:05', 0, 'Busy', 'Line busy.', 'Call after lunch'],
  ['LD-2026-0044', '2026-11-21T12:10', 14, 'Connected', 'Wants 5 percent off and free installation. Sent R2.', 'Wait for their reply on R2'],
  ['LD-2026-0046', '2026-11-20T11:30', 22, 'Connected', 'Film width 600 mm, frozen food. Trial at Faridabad possible.', 'Send draft quotation'],
  ['LD-2026-0041', '2026-11-20T10:00', 8, 'Connected', 'Needs the 500 ml tray drawing first.', 'Get drawing from Rakesh'],
  ['LD-2026-0047', '2026-11-19T16:05', 6, 'Connected', 'Interested, asked for a video of the BSM-300 running.', 'Send video and price'],
  ['LD-2026-0045', '2026-11-18T15:40', 11, 'Connected', 'Quotation received, comparing with one other supplier.', 'Follow up on Tue'],
  ['LD-2026-0042', '2026-11-12T12:00', 5, 'Connected', 'Chose a local supplier on price.', 'Mark lost'],
  ['LD-2026-0040', '2026-10-12T12:30', 3, 'Wrong number', 'Number given was for the accounts desk.', 'None'],
];

ZXA.data.indiamart = {
  health: { state: 'green', label: 'Healthy', lastReceived: '2026-11-23T09:58', count24: 3, success: '99.2%', lastError: 'Timeout writing lead, 22 Nov 19:42' },
  webhook: 'https://admin.zixom.in/api/indiamart/webhook',
  key: 'zxim_live_7f3a91c24be0d1a8',
  /* [time, query id, type, name, mobile, email, company, city, product, message, state, lead, note] */
  inbox: [
    ['2026-11-23T09:58', '2948817361', 'W', 'Vikram Joshi', '+91 98230 41877', 'vikram@joshipolypack.example', 'Joshi Polypack', 'Pune', 'Automatic Vacuum Forming Machine', 'Need an automatic vacuum forming machine for food trays.', 'created', 'LD-2026-0049'],
    ['2026-11-23T09:58', '2948817361', 'W', 'Vikram Joshi', '+91 98230 41877', 'vikram@joshipolypack.example', 'Joshi Polypack', 'Pune', 'Automatic Vacuum Forming Machine', 'Need an automatic vacuum forming machine for food trays.', 'duplicate', 'LD-2026-0049', 'Same query id received again, ignored'],
    ['2026-11-23T08:30', '2948790125', 'P', 'Harpreet Singh', '+91 98140 66231', '', 'Punjab Thermo Plast', 'Ludhiana', 'Heater Element', 'Missed call, 0 seconds.', 'created', 'LD-2026-0048', 'Missed call'],
    ['2026-11-22T19:42', '2948633002', 'B', 'Amit Kulkarni', '+91 98500 21907', 'amit@kulkarnipack.example', 'Kulkarni Packaging', 'Nagpur', 'Blister Packing Machine', 'Blister machine for hardware parts.', 'failed', null, 'Timeout writing lead'],
    ['2026-11-22T11:15', '2948520417', 'W', 'Rakesh Mehta', '+91 98250 11410', 'rakesh@shreepack.example', 'Shree Packaging Industries', 'Ahmedabad', 'Plastic Moulds', 'Price for a 500 ml tray mould.', 'matched', 'LD-2026-0041', 'Existing customer ZP-C-0001'],
    ['2026-11-21T16:40', '2948311986', 'BL', '', '', '', 'Shiv Shakti Polymers', 'Kanpur', 'Thermoforming Machine', 'Looking for a thermoforming machine, 3 station.', 'incomplete', null, 'Contact missing'],
    ['2026-11-20T15:00', '2948190033', 'W', 'Test lead', '+91 99919 10097', 'info@zixom.in', 'Zixom setup test', 'Faridabad', 'Thermoforming Machine', 'Test enquiry sent from IndiaMART setup.', 'created', null, 'Test lead, deleted'],
    ['2026-11-20T10:25', '2948102214', 'V', 'Imran Qureshi', '+91 98220 43120', '', 'Nova Cups Pvt Ltd', 'Pune', 'Disposable Cup Making Machine', 'Viewed CFM-450 spare parts.', 'matched', null, 'Existing customer ZP-C-0002'],
    ['2026-11-19T14:20', '2947552018', 'B', 'Mehul Patel', '+91 99250 18842', 'mehul@patelpharma.example', 'Patel Pharma Pack', 'Rajkot', 'Blister Packing Machine', 'Blister sealing machine for tablet strips.', 'created', 'LD-2026-0047', 'Consumed buy lead'],
    ['2026-11-18T09:10', '2947409961', 'W', 'Farhan Shaikh', '98250 1234', '', 'Shaikh Plastics', 'Surat', 'Plastic Moulds', 'Need moulds for cups.', 'incomplete', null, 'Mobile has 8 digits'],
    ['2026-11-17T12:40', '2946108844', 'WA', 'Srinivas Reddy', '+91 98480 27715', 'srinivas@deccanfoods.example', 'Deccan Foods Packaging', 'Hyderabad', 'Skin Packaging Machine', 'Skin packing machine for frozen food.', 'created', 'LD-2026-0046'],
    ['2026-11-02T18:10', '2942270391', 'V', 'Rohit Jain', '+91 94140 70262', 'rohit@jaindisposables.example', 'Jain Disposables', 'Jaipur', 'Disposable Cup Making Machine', 'Viewed the cup forming machine catalog.', 'created', 'LD-2026-0042'],
  ],
  /* webhook requests: [time, response code, query id, outcome, detail] */
  log: [
    ['2026-11-23T09:58:41', 200, '2948817361', 'Duplicate', 'Same query id, ignored'],
    ['2026-11-23T09:58:12', 200, '2948817361', 'Created lead', 'LD-2026-0049'],
    ['2026-11-23T08:30:05', 200, '2948790125', 'Created lead', 'LD-2026-0048'],
    ['2026-11-22T19:42:20', 200, '2948633002', 'Failed', 'Timeout writing lead'],
    ['2026-11-22T11:15:33', 200, '2948520417', 'Matched existing', 'Customer ZP-C-0001'],
    ['2026-11-22T09:02:10', 401, '2948498120', 'Rejected', 'Old key, rotated 21 Nov 18:00'],
    ['2026-11-22T09:01:55', 401, '2948498120', 'Rejected', 'Old key, rotated 21 Nov 18:00'],
    ['2026-11-21T16:40:02', 200, '2948311986', 'Incomplete', 'No mobile or email'],
    ['2026-11-20T15:00:00', 200, '2948190033', 'Created lead', 'Test lead from setup'],
    ['2026-11-20T10:25:47', 200, '2948102214', 'Matched existing', 'Customer ZP-C-0002'],
    ['2026-11-19T14:20:18', 200, '2947552018', 'Created lead', 'LD-2026-0047'],
    ['2026-11-18T09:10:40', 200, '2947409961', 'Incomplete', 'Mobile has 8 digits'],
    ['2026-11-17T12:40:09', 200, '2946108844', 'Created lead', 'LD-2026-0046'],
    ['2026-11-02T18:10:51', 200, '2942270391', 'Created lead', 'LD-2026-0042'],
  ],
  /* IndiaMART product name -> Zixom range, enquiries in 90 days */
  mapping: [
    ['Automatic Vacuum Forming Machine', 'Vacuum forming machines', 14],
    ['Thermoforming Machine', 'Thermoforming machines', 11],
    ['Skin Packaging Machine', 'Thermoforming machines', 3],
    ['Blister Packing Machine', 'Blister sealing machines', 8],
    ['Disposable Cup Making Machine', 'Cup forming machines', 6],
    ['Mineral Water Plant', 'Water treatment plants', 4],
    ['Plastic Moulds', 'Moulds', 5],
    ['Heater Element', 'Spare parts', 2],
  ],
  unmapped: [['Paper Plate Making Machine', 3], ['Shrink Wrapping Machine', 2], ['Plastic Crusher Machine', 1]],
};

/* lead sources report, Jun to Nov 2026 */
ZXA.data.leadReport = {
  months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  bySource: {
    IndiaMART: [6, 8, 7, 9, 11, 5],
    Phone: [3, 2, 4, 3, 2, 2],
    Email: [1, 1, 2, 1, 2, 1],
    App: [0, 1, 1, 2, 1, 1],
    Referral: [1, 0, 1, 1, 1, 1],
  },
  /* [source, leads, quotations, won, won value] for the six months */
  totals: [
    ['IndiaMART', 46, 14, 4, 5260000],
    ['Phone', 16, 8, 3, 4180000],
    ['Email', 8, 4, 1, 1950000],
    ['App', 6, 3, 2, 720000],
    ['Referral', 5, 4, 3, 2140000],
  ],
};

/* lookups and chips for the sales pages */
ZXA.sales = (() => {
  const { tag } = ZXA.r;
  const STAGE = { 'New': 'blue', 'Contacted': 'blue', 'Requirement understood': 'blue', 'Quotation sent': 'amber', 'Negotiation': 'amber', 'Won': 'green', 'Lost': '' };
  const IM_TYPE = { W: 'Direct', B: 'Buy lead', BL: 'Buy lead', P: 'Call', V: 'Catalog view', BIZ: 'Catalog view', WA: 'WhatsApp' };
  const IM_STATE = { created: ['Created lead', 'green'], matched: ['Matched existing', 'blue'], duplicate: ['Duplicate', ''], incomplete: ['Incomplete', 'amber'], failed: ['Failed', 'red'] };
  const lead = (number) => ZXA.data.leads.find((l) => l.number === number);
  const overdue = (l) => Boolean(l.followUp) && l.followUp < ZX.data.now && !['Won', 'Lost'].includes(l.stage);
  return {
    STAGE, IM_TYPE, IM_STATE, lead, overdue,
    stageTag: (stage) => tag(stage, STAGE[stage]),
    imTypeTag: (code) => tag(`${code} ${IM_TYPE[code] ?? 'Unknown'}`, 'outline'),
    imStateTag: (state) => tag(...IM_STATE[state]),
    open: (l) => !['Won', 'Lost'].includes(l.stage),
  };
})();
