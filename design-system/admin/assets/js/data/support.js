/* Support demo data (spec section 10 and 17): questions, complaints, canned replies, categories, FAQ.
   QRY-2026-0030 to 0033 are the same questions the customer app shows (C601, C603); the replies come
   from the display names Neha (support agent) and Mr Kapoor (service manager), which are not users.
   Messages: [from, text, time, extra] where from is customer, zixom (display name in by) or note. */
ZXA.data.supportCategories = [
  { name: 'Technical or operation', questions: 14, order: 1 },
  { name: 'Spare parts and price', questions: 9, order: 2 },
  { name: 'Warranty or AMC', questions: 6, order: 3 },
  { name: 'Billing or invoice', questions: 5, order: 4 },
  { name: 'Training', questions: 2, order: 5 },
  { name: 'Complaint', questions: 3, order: 6, note: 'Needs a ticket or order; goes to the service manager' },
  { name: 'Other', questions: 1, order: 7 },
];

ZXA.data.questions = [
  { number: 'QRY-2026-0030', status: 'open', category: 'Technical or operation', subject: 'Heater settings for 0.8 mm PET sheet',
    company: 'shree', by: 'rakesh', machine: 'ZP-TF-2310', opened: '2026-11-23T10:12', last: '2026-11-23T10:48', waiting: '2026-11-23T10:48',
    messages: [
      ['customer', 'Can we run 0.8 mm PET sheet on the AFM-760 without changing the heater settings?', '2026-11-23T10:12'],
      ['zixom', 'Which sheet supplier, and what top heater setting do you use now?', '2026-11-23T10:31', { by: 'Neha' }],
      ['note', 'Ask Sandeep for the recipe he used at Sanand last month.', '2026-11-23T10:35'],
      ['customer', 'Supplier is Polyfab. Top heater runs at 68 percent.', '2026-11-23T10:48', { file: ['image', 'heater-screen.jpg', '1.4 MB'] }],
    ] },
  { number: 'QRY-2026-0029', status: 'open', category: 'Spare parts and price', subject: 'Lead time for a spare cutting knife',
    company: 'nova', by: 'imran', machine: 'ZP-CF-2108', opened: '2026-11-23T06:40', last: '2026-11-23T06:40', waiting: '2026-11-23T06:40',
    messages: [['customer', 'How many days for a spare cutting knife for the CFM-450? We want one in stock.', '2026-11-23T06:40']] },
  { number: 'QRY-2026-0033', status: 'open', complaint: true, category: 'Complaint', subject: 'Engineer arrived after our site closed',
    company: 'shree', by: 'pooja', ticket: 'TKT-2026-0130', owner: 'Mr Kapoor', severity: 'High', opened: '2026-11-22T15:30', last: '2026-11-22T16:05',
    messages: [
      ['customer', 'The engineer came at 6:40 PM for TKT-2026-0130. Our site closes at 6 PM, so the visit failed.', '2026-11-22T15:30'],
      ['zixom', 'Sorry about this. Your complaint is with Mr Kapoor, our service manager. He will call you by Tue 24 Nov.', '2026-11-22T16:05', { by: 'Mr Kapoor' }],
      ['note', 'Sandeep was held at Sanand on TKT-2026-0125. Offer a revisit with no visit fee.', '2026-11-22T16:20'],
    ] },
  { number: 'QRY-2026-0031', status: 'answered', category: 'Billing or invoice', subject: 'GSTIN missing on invoice',
    company: 'shree', by: 'rakesh', invoice: 'INV-2026-0980', opened: '2026-11-20T15:20', last: '2026-11-23T08:40',
    messages: [
      ['customer', 'Please add our GSTIN on INV-2026-0980. It shows only the company name.', '2026-11-20T15:20'],
      ['zixom', 'Done. The revised invoice shows GSTIN 24AAAAA0000A1Z5.', '2026-11-23T08:40', { by: 'Neha', file: ['file-pdf', 'INV-2026-0980.pdf', '180 KB'] }],
    ] },
  { number: 'QRY-2026-0028', status: 'open', complaint: true, category: 'Complaint', subject: 'Parts order delivered without the gasket kit',
    company: 'nova', by: 'imran', order: 'ORD-2026-0208', owner: 'Neha', severity: 'Normal', opened: '2026-11-20T11:05', last: '2026-11-20T11:05',
    messages: [['customer', 'ORD-2026-0208 arrived today but the gasket kit is missing from the box.', '2026-11-20T11:05']] },
  { number: 'QRY-2026-0032', status: 'closed', category: 'Spare parts and price', subject: 'Price for crusher blade set',
    company: 'shree', by: 'pooja', machine: 'ZP-PC-1805', opened: '2026-11-12T11:00', last: '2026-11-13T15:10', rating: 5,
    messages: [
      ['customer', 'What is the price of a blade set for the PCR-300 crusher?', '2026-11-12T11:00'],
      ['zixom', 'Crusher blade set: ₹7,600.00 plus GST. It ships in 3 days.', '2026-11-12T13:25', { by: 'Neha' }],
      ['customer', 'Thanks, that helps.', '2026-11-13T15:10'],
    ] },
  { number: 'QRY-2026-0024', status: 'closed', complaint: true, category: 'Complaint', subject: 'Repeat breakdown after the October visit',
    company: 'shree', by: 'rakesh', ticket: 'TKT-2026-0117', owner: 'Mr Kapoor', severity: 'High', opened: '2026-11-15T09:30', last: '2026-11-17T17:00',
    outcome: 'Revisit at no charge', rating: 4,
    messages: [['customer', 'Heater zone 3 drifted again two days after calibration.', '2026-11-15T09:30'],
      ['zixom', 'Sandeep will revisit on Tue 17 Nov at no charge.', '2026-11-15T12:10', { by: 'Mr Kapoor' }]] },
];

ZXA.data.cannedReplies = [
  { title: 'Ask for photos', category: 'Technical or operation', used: 18, text: 'Hello {customer_name}, please send a photo of the HMI screen and the part for {machine}. It helps us answer faster.' },
  { title: 'Price with GST', category: 'Spare parts and price', used: 12, text: '{part}: {price} plus GST 18%. It ships in {days} days from Faridabad.' },
  { title: 'Warranty covers it', category: 'Warranty or AMC', used: 7, text: 'Good news, {machine} is in warranty until {warranty_end}. Raise a claim from Support, Warranty.' },
  { title: 'Invoice corrected', category: 'Billing or invoice', used: 5, text: 'Done. The revised invoice {invoice} is in the app under Payments.' },
  { title: 'Complaint received', category: 'Complaint', used: 3, text: 'Sorry about this, {customer_name}. Your complaint is with Mr Kapoor, our service manager. He will call you by {date}.' },
  { title: 'Training slot', category: 'Training', used: 2, text: 'We can train your operators at {site} on {date}. Reply here to confirm the time.', archived: true },
];

/* FAQ shown in the app (C604): [topic, question, answer, views, helpful yes, helpful no, published] */
ZXA.data.faq = [
  ['Machines', 'Where do I find the serial number?', 'On the nameplate fixed to the machine frame. It starts with ZP, for example ZP-TF-2310.', 412, 61, 3, true],
  ['Machines', 'Parts form unevenly. What should I check?', 'Check each heater zone reading and clean the reflectors. If it continues, raise a service request with a photo.', 268, 34, 9, true],
  ['Warranty', 'When does my warranty end?', 'Open the machine. It shows the end date and days left. We remind you 60, 30 and 7 days before.', 355, 52, 2, true],
  ['Warranty', 'How do I claim warranty?', 'Support, Warranty, New claim. Add photos of the problem and Zixom replies in the app.', 198, 27, 4, true],
  ['AMC', 'What if my AMC expires?', 'Renew within 7 days to keep the same plan with no gap. After that it is a new contract.', 144, 19, 6, true],
  ['AMC', 'How many visits are left?', 'Open the AMC contract. It shows visits included and used.', 121, 22, 1, true],
  ['Service', 'How fast will an engineer come?', 'Machine down: within 4 hours. Production affected: 1 working day. Minor: 3 working days.', 389, 48, 11, true],
  ['Service', 'Can I change or cancel a visit?', 'Yes, until the engineer is on the way. After that, call support.', 176, 25, 3, true],
  ['Payments', 'How can I pay?', 'UPI, card, net banking, or bank transfer with proof. Full payment only.', 301, 44, 2, true],
  ['Payments', 'My payment failed but money was deducted', 'Any amount deducted is returned in 5 to 7 working days.', 92, 10, 5, true],
  ['Account', 'How many phones can I use?', 'Two phones per account. Sign out on one to add another.', 88, 14, 1, true],
  ['Account', 'Who in my company can pay invoices?', 'Everyone in your company can pay, approve estimates and add machines.', 73, 9, 2, true],
  ['Service', 'Do you train new operators?', 'Yes. Ask for operator training from Support, Service. It is chargeable outside warranty.', 0, 0, 0, false],
];

/* searches in the app FAQ with no result: [phrase, count, last searched] */
ZXA.data.unansweredSearches = [
  ['chain tension', 9, '2026-11-23T10:05'],
  ['mould change time', 6, '2026-11-22T17:40'],
  ['gst invoice download', 5, '2026-11-23T08:15'],
  ['heater element price', 4, '2026-11-21T12:30'],
  ['operator training', 3, '2026-11-20T11:00'],
  ['vacuum pump oil', 2, '2026-11-19T16:20'],
  ['hindi manual', 2, '2026-11-18T10:45'],
];

/* lookups and chips for the support pages */
ZXA.support = (() => {
  const { tag } = ZXA.r;
  const STATUS = { open: ['Open', 'blue'], answered: ['Answered', 'green'], closed: ['Closed', ''] };
  const question = (number) => ZXA.data.questions.find((q) => q.number === number);
  /* waiting: customer wrote last and nobody has answered yet */
  const waitingHours = (q) => (q.waiting ? (new Date(ZX.data.now) - new Date(q.waiting)) / 3600000 : 0);
  const related = (q) => (q.ticket ? ['wrench', q.ticket, 'D403', `?t=${q.ticket}`] : q.order ? ['shopping-cart', q.order, 'D831', '']
    : q.invoice ? ['receipt', q.invoice, 'D903', ''] : q.machine ? ['factory', ZXA.r.machine(q.machine).model, 'D302', ''] : null);
  return { STATUS, question, waitingHours, related, statusTag: (s) => tag(...STATUS[s]) };
})();
