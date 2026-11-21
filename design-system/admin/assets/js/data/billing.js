/* Billing demo data (spec module 9, section 17) and the helpers its pages share.
   Builds on ZX.data.invoices, payments and refunds (read only): every Shree record there is reused as is and only
   the Admin fields are added here. Nova Cups records are new. Lines are [description, quantity, rate before GST]. */
window.ZXA = window.ZXA || {};

ZXA.data.billing = {
  /* static business profile on every invoice (section 17) */
  supplier: {
    name: 'Zixom Plast', address: 'Seekri, Ballabhgarh, Faridabad, Haryana 121004', state: 'Haryana', stateCode: '06',
    gstin: '06AAAAA0000A1Z5', pan: 'AAAAA0000A', phone: '+91 99919 10097', email: 'info@zixom.in',
    bank: { name: 'Sample Bank', account: '000000000000', ifsc: 'SAMP0000000', branch: 'Faridabad' },
    terms: 15, series: 'INV-2026-', next: 'INV-2026-0992', passwordAbove: 100000, writeOffLimit: 500,
    footer: 'Subject to Faridabad jurisdiction. This is a computer generated invoice.',
  },
  /* billing details per company: state decides CGST and SGST or IGST */
  billingOf: {
    shree: { state: 'Gujarat', stateCode: '24', address: 'Plot 214, Phase II, GIDC Vatva, Ahmedabad, Gujarat 382445', terms: 15, email: 'accounts@shreepack.example' },
    nova: { state: 'Maharashtra', stateCode: '27', address: 'Gat 112, Chakan MIDC Phase 1, Pune, Maharashtra 410501', terms: 15, email: 'accounts@novacups.example' },
  },

  /* Admin fields for the mobile invoices (all Shree). partly: some amount received */
  invoiceExtra: {
    'INV-2026-0986': { status: 'partly' },
  },
  /* Nova Cups invoices, older numbers, so the series stays in order */
  extraInvoices: [
    { number: 'INV-2026-0975', company: 'nova', type: 'Parts', status: 'paid', amount: 5546, paid: 5546, issued: '2026-10-12', due: '2026-10-27',
      for: 'ORD-2026-0205', title: 'PID temperature controller', creditNote: 'CN-2026-0011', receipt: 'RCP-2026-0648',
      lines: [['PID temperature controller', 1, 4200], ['Delivery', 1, 500]] },
    { number: 'INV-2026-0976', company: 'nova', type: 'Other', status: 'paid', amount: 5900, paid: 5900, issued: '2026-10-20', due: '2026-11-04',
      for: null, title: 'Operator training, Cup line 1, 1 day', receipt: 'RCP-2026-0649', lines: [['Operator training, day', 1, 5000]] },
    { number: 'INV-2026-0977', company: 'nova', type: 'Parts', status: 'partly', amount: 8260, paid: 8235, issued: '2026-11-12', due: '2026-11-27',
      for: 'ORD-2026-0206', title: 'Forming mould heater band set', lines: [['Heater band set, 6 pieces', 1, 6600], ['Delivery', 1, 400]] },
    { number: 'INV-2026-0979', company: 'nova', type: 'Other', status: 'cancelled', amount: 2360, issued: '2026-11-04', due: '2026-11-19',
      for: null, title: 'Site survey visit', cancelReason: 'Raised twice by mistake', lines: [['Site survey visit', 1, 2000]] },
  ],

  /* every payment the dashboard sees. id is the receipt, or the gateway or proof reference until there is one */
  paymentExtra: {
    'pay_Nz81kLq2Vx7D': { company: 'shree', kind: 'UPI', fee: 0 },
    'UTR HDFC0026117745': { company: 'shree', kind: 'Bank transfer', fee: 0, verifiedBy: 'Rajesh Goyal', verifiedAt: '2026-11-06T10:20' },
    'pay_Ny2QwPq8Ls1A': { company: 'shree', kind: 'Card', fee: 23.6, status: 'refund-initiated', refund: 'RFD-2026-003' },
    'pay_Oa3ReMv9Kt4B': { company: 'shree', kind: 'Net banking', fee: 0 },
    'pay_Oa9TyHn2Jw6C': { company: 'shree', kind: 'UPI', fee: 0, captured: 2300, flag: 'Amount mismatch' },
  },
  extraPayments: [
    { receipt: null, invoice: 'INV-2026-0985', company: 'shree', amount: 3540, kind: 'Bank transfer', method: 'Bank transfer, NEFT', txn: 'UTR HDFC0026118302',
      when: '2026-11-21T15:10', status: 'verification', proof: 'NEFT-advice-21Nov.jpg', paidOn: '2026-11-21', by: 'rakesh' },
    { receipt: null, invoice: 'INV-2026-0986', company: 'shree', amount: 14160, kind: 'Cheque', method: 'Cheque, HDFC Bank', txn: 'Cheque 004512',
      when: '2026-11-22T11:05', status: 'verification', proof: 'cheque-004512.jpg', paidOn: '2026-11-22', by: 'pooja', cheque: 'Awaiting clearance' },
    { receipt: null, order: 'ORD-2026-0211', company: 'shree', amount: 2950, kind: 'UPI', method: 'UPI, Google Pay', txn: 'pay_OZ4LmXc7Rb2E',
      when: '2026-11-20T16:40', status: 'refund-initiated', fee: 0, refund: 'RFD-2026-002' },
    { receipt: 'RCP-2026-0648', invoice: 'INV-2026-0975', company: 'nova', amount: 5546, kind: 'UPI', method: 'UPI, PhonePe', txn: 'pay_NvR2bQe5Hk8F',
      when: '2026-10-14T12:31', status: 'refunded', fee: 0, refund: 'RFD-2026-001', refunded: 590 },
    { receipt: 'RCP-2026-0649', invoice: 'INV-2026-0976', company: 'nova', amount: 5900, kind: 'UPI', method: 'UPI, Paytm', txn: 'pay_NxD7tUw1Gm3K',
      when: '2026-11-03T10:02', status: 'paid', fee: 0 },
    /* the customer paid twice within a minute; the second is refunded (refund failed, Retry) */
    { receipt: null, invoice: 'INV-2026-0976', company: 'nova', amount: 5900, kind: 'UPI', method: 'UPI, Paytm', txn: 'pay_NxD8aVz4Pn6L',
      when: '2026-11-03T10:03', status: 'paid', fee: 0, flag: 'Paid twice', refund: 'RFD-2026-004' },
    { receipt: null, invoice: 'INV-2026-0977', company: 'nova', amount: 8235, kind: 'Bank transfer', method: 'Bank transfer, NEFT', txn: 'UTR ICIC0026090311',
      when: '2026-11-14T09:40', status: 'paid', fee: 0, verifiedBy: 'Rajesh Goyal', verifiedAt: '2026-11-14T15:05', note: 'Bank charges of ₹25 deducted' },
  ],

  refunds: [
    { number: 'RFD-2026-004', payment: 'pay_NxD8aVz4Pn6L', company: 'nova', amount: 5900, reason: 'Paid twice', status: 'failed', started: '2026-11-04',
      failure: 'UPI id is no longer active. Ask the customer for bank details.', gateway: 'rfnd_NyH2kd81Lq' },
    { number: 'RFD-2026-003', payment: 'pay_Ny2QwPq8Ls1A', company: 'shree', amount: 236, reason: 'Dispute accepted', status: 'initiated', started: '2026-11-06',
      expected: '2026-11-28', creditNote: 'CN-2026-0012', dispute: 'DSP-2026-0004', gateway: 'rfnd_NzQ4hT2cVb' },
    { number: 'RFD-2026-002', payment: 'pay_OZ4LmXc7Rb2E', company: 'shree', amount: 2950, reason: 'Order cancelled before dispatch', status: 'initiated',
      started: '2026-11-21', expected: '2026-11-28', order: 'ORD-2026-0211', gateway: 'rfnd_Oa1MbW7xKe' },
    { number: 'RFD-2026-001', payment: 'pay_NvR2bQe5Hk8F', company: 'nova', amount: 590, reason: 'Billing error', status: 'processed', started: '2026-10-29',
      processed: '2026-11-04', creditNote: 'CN-2026-0011', gateway: 'rfnd_NwT6pL3sYa' },
  ],

  /* CN-2026-0012 is the note the app shows on INV-2026-0987 (C1603) */
  creditNotes: [
    { number: 'CN-2026-0012', invoice: 'INV-2026-0987', company: 'shree', amount: 236, reason: 'Billing error', note: 'Labour billed for 1.25 hours, worked 1 hour',
      issued: '2026-11-06', applied: 'Refunded', refund: 'RFD-2026-003', dispute: 'DSP-2026-0004', lines: [['Labour, hours', 0.25, 800]] },
    { number: 'CN-2026-0011', invoice: 'INV-2026-0975', company: 'nova', amount: 590, reason: 'Billing error', note: 'Delivery charged on an order collected at the works',
      issued: '2026-10-29', applied: 'Refunded', refund: 'RFD-2026-001', lines: [['Delivery', 1, 500]] },
  ],

  /* disputes raised in the app (C1601); line is the index into the invoice lines. Same numbers as C1602 */
  disputes: [
    { number: 'DSP-2026-0009', invoice: 'INV-2026-0980', line: 1, reason: 'Wrong amount', status: 'open', raised: '2026-11-23T10:12', by: 'pooja',
      text: 'Engineer was on site for 2 hours, not 2.5. Our gate register shows in at 10:05 and out at 12:10.', files: ['gate-register.jpg'] },
    { number: 'DSP-2026-0007', invoice: 'INV-2026-0981', line: 2, reason: 'Wrong amount', status: 'review', raised: '2026-11-19T16:30', by: 'rakesh',
      text: 'No consumables were used. The engineer used our own cleaning cloth and grease.', files: ['service-report-signed.pdf'] },
    { number: 'DSP-2026-0005', invoice: 'INV-2026-0982', line: 0, reason: 'Already paid', status: 'rejected', raised: '2026-11-02T11:00', by: 'rakesh', closed: '2026-11-05',
      text: 'We think this AMC was charged twice.', reply: 'Receipt RCP-2026-0650 paid this invoice once. There is no second charge on our side.', files: [] },
    { number: 'DSP-2026-0004', invoice: 'INV-2026-0987', line: 0, reason: 'Wrong amount', status: 'accepted', raised: '2026-10-28T09:40', by: 'pooja', closed: '2026-11-06',
      text: 'Engineer worked 1 hour, the invoice says 1.25 hours.', reply: 'Engineer worked 1 hour, not 1.25. We issued a credit note for the difference.',
      creditNote: 'CN-2026-0012', files: ['visit-photo.jpg'] },
  ],

  /* correction requests from the app (C1604). Same pending request as the app */
  corrections: [
    { invoice: 'INV-2026-0988', field: 'GSTIN', from: '24AAAAA0000A1Z5', to: '24AAAAA0000A2Z4', requested: '2026-11-23T09:15', by: 'rakesh', status: 'open',
      note: 'Our GSTIN changed after the merger of the two units.' },
    { invoice: 'INV-2026-0984', field: 'Billing address', from: 'Plot 214, Phase II, GIDC Vatva, Ahmedabad 382445', to: 'Shed 18, Sanand GIDC II, Ahmedabad 382110',
      requested: '2026-11-21T14:02', by: 'pooja', status: 'open', note: 'Kit was for the Sanand plant.' },
    { invoice: 'INV-2026-0976', field: 'Company name', from: 'Nova Cups Pvt Ltd', to: 'Nova Cups Private Limited', requested: '2026-11-13T12:20', by: 'imran',
      status: 'declined', reply: 'The GST return for October is filed. The registered name matches the GSTIN, so no change is needed.' },
    { invoice: 'INV-2026-0975', field: 'Billing address', from: 'Gat 112, Chakan MIDC Phase 1, Pune 410501', to: 'Gat 112, Chakan MIDC Phase 1, Pune 410501, Unit 2',
      requested: '2026-10-15T10:00', by: 'imran', status: 'done', reply: 'Corrected. Credit note and new invoice sent.' },
  ],

  /* reminders sent and planned: 3 days before, on the due date, then every 7 days while overdue */
  reminders: [
    { invoice: 'INV-2026-0989', when: '2026-11-22T10:00', rule: 'Overdue, every 7 days', channels: 'Push, email', status: 'sent' },
    { invoice: 'INV-2026-0985', when: '2026-11-21T10:00', rule: '3 days before', channels: 'Push, email', status: 'sent' },
    { invoice: 'INV-2026-0981', when: '2026-11-17T10:00', rule: 'On the due date', channels: 'Push, email', status: 'sent' },
    { invoice: 'INV-2026-0989', when: '2026-11-15T10:00', rule: 'Overdue, every 7 days', channels: 'Push, email', status: 'sent' },
    { invoice: 'INV-2026-0981', when: '2026-11-14T10:00', rule: '3 days before', channels: 'Push, email', status: 'sent' },
    { invoice: 'INV-2026-0989', when: '2026-11-08T10:00', rule: 'On the due date', channels: 'Push', status: 'sent', note: 'No email on record for Pooja Shah' },
    { invoice: 'INV-2026-0989', when: '2026-11-05T10:00', rule: '3 days before', channels: 'Push, email', status: 'sent' },
    { invoice: 'INV-2026-0981', when: '2026-11-24T10:00', rule: 'Overdue, every 7 days', channels: 'Push, email', status: 'planned' },
    { invoice: 'INV-2026-0983', when: '2026-11-25T10:00', rule: 'On the due date', channels: 'Push, email', status: 'paused', note: 'Online payment processing' },
    { invoice: 'INV-2026-0980', when: '2026-11-27T10:00', rule: '3 days before', channels: 'Push, email', status: 'planned' },
    { invoice: 'INV-2026-0988', when: '2026-11-27T10:00', rule: '3 days before', channels: 'Push, email', status: 'planned' },
    { invoice: 'INV-2026-0986', when: '2026-11-28T10:00', rule: '3 days before', channels: 'Push, email', status: 'planned' },
    { invoice: 'INV-2026-0984', when: '2026-11-30T10:00', rule: '3 days before', channels: 'Push, email', status: 'planned' },
  ],

  /* Razorpay settlements; payments are gateway ids. Fees include 18 percent GST on the fee */
  settlements: [
    { id: 'setl_Oa2HcT9wQm', date: '2026-11-21', payments: ['pay_OZ4LmXc7Rb2E'], expected: 2950, received: 2950, fees: 0, status: 'matched' },
    { id: 'setl_NxE1kP4yZr', date: '2026-11-04', payments: ['pay_NxD7tUw1Gm3K', 'pay_NxD8aVz4Pn6L'], expected: 11800, received: 11800, fees: 0, status: 'reconciled' },
    { id: 'setl_NyB3sF6uJd', date: '2026-10-26', payments: ['pay_Ny2QwPq8Ls1A'], expected: 1180, received: 1152.15, fees: 27.85, status: 'reconciled' },
    { id: 'setl_NvS8eR1aLc', date: '2026-10-15', payments: ['pay_NvR2bQe5Hk8F'], expected: 5546, received: 5546, fees: 0, status: 'reconciled' },
  ],

  /* small balance write offs (limit in Settings) and other adjustments */
  writeOffs: [
    { invoice: 'INV-2026-0962', company: 'shree', amount: 18, reason: 'Bank charges deducted by the customer\'s bank', when: '2026-09-15T12:10', by: 'Rajesh Goyal' },
    { invoice: 'INV-2026-0948', company: 'nova', amount: 0.4, reason: 'Rounding difference', when: '2026-07-02T10:30', by: 'Rajesh Goyal' },
  ],

  /* overdue follow up: calls and promises per invoice */
  followUps: {
    'INV-2026-0989': { last: { when: '2026-11-18T11:30', who: 'Rakesh Mehta', outcome: 'Promised to pay by 20 Nov' }, promise: '2026-11-20', broken: true,
      amc: 'AMC-2026-0013', amcStatus: 'Suspended' },
    'INV-2026-0981': { last: null, promise: null, dispute: 'DSP-2026-0007' },
  },
};

/* ---------- helpers the billing pages share ---------- */
ZXA.bill = (() => {
  const r = ZXA.r;
  const b = ZXA.data.billing;
  const { tag } = r;

  const invoices = [
    ...ZX.data.invoices.map((i) => ({ company: 'shree', ...i, ...b.invoiceExtra[i.number] })),
    ...b.extraInvoices,
  ].sort((x, y) => y.number.localeCompare(x.number));
  const invoice = (number) => invoices.find((i) => i.number === number);

  const payments = [
    ...ZX.data.payments.map((p) => ({ ...p, ...b.paymentExtra[p.txn] })),
    ...b.extraPayments,
  ].sort((x, y) => y.when.localeCompare(x.when));
  const payment = (id) => payments.find((p) => p.receipt === id || p.txn === id);
  const paymentId = (p) => p.receipt || p.txn;
  const refund = (number) => b.refunds.find((x) => x.number === number);
  const creditNote = (number) => b.creditNotes.find((x) => x.number === number);
  const dispute = (number) => b.disputes.find((x) => x.number === number);

  /* Admin wording, section 11 */
  const INVOICE = { draft: ['Draft', 'outline'], due: ['Due', 'amber'], overdue: ['Overdue', 'red'], processing: ['Processing', 'blue'],
    verification: ['Awaiting verification', 'amber'], partly: ['Partly paid', 'blue'], paid: ['Paid', 'green'], cancelled: ['Cancelled', ''] };
  const PAYMENT = { processing: ['Processing', 'blue'], paid: ['Paid', 'green'], failed: ['Failed', 'red'], verification: ['Awaiting verification', 'amber'],
    'refund-initiated': ['Refund initiated', 'blue'], refunded: ['Refunded', ''] };
  const REFUND = { initiated: ['Initiated', 'blue'], processed: ['Processed', 'green'], failed: ['Failed', 'red'] };
  const DISPUTE = { open: ['Open', 'amber'], review: ['Under review', 'blue'], accepted: ['Accepted', 'green'], rejected: ['Rejected', ''] };
  const CORRECTION = { open: ['Open', 'amber'], done: ['Reissued', 'green'], declined: ['Declined', ''] };
  const invoiceTag = (s) => tag(...INVOICE[s]);
  const paymentTag = (s) => tag(...PAYMENT[s]);
  const refundTag = (s) => tag(...REFUND[s]);
  const disputeTag = (s) => tag(...DISPUTE[s]);
  const correctionTag = (s) => tag(...CORRECTION[s]);
  const METHOD_ICON = { UPI: 'qr-code', Card: 'credit-card', 'Net banking': 'bank', Wallet: 'wallet', 'Bank transfer': 'bank', Cheque: 'banknote' };

  const balance = (inv) => (['cancelled', 'draft'].includes(inv.status) ? 0 : inv.amount - (inv.paid || 0));
  const daysOverdue = (inv) => (inv.status === 'overdue' ? -r.daysFromToday(inv.due) : 0);
  const billing = (companyId) => b.billingOf[companyId];

  /* where a linked record opens */
  const linkOf = (record) => {
    if (!record) return null;
    if (record.startsWith('TKT-')) return r.ticket(record) ? `D403?t=${record}` : null;
    if (record.startsWith('AMC-')) return 'D602';
    if (record.startsWith('ORD-')) return 'D831';
    return null;
  };
  const recordLink = (record) => {
    if (!record) return '<span class="faint">None</span>';
    const target = linkOf(record);
    return target ? `<a class="mono" href="#${target}">${record}</a>` : `<span class="mono">${record}</span>`;
  };

  /* HSN 8477 for machines and parts, SAC 998719 for service (section 17) */
  const SERVICE = /labour|visit|calibration|amc|training|travel|survey|essential|preventive|discount/i;
  const hsn = (description) => (SERVICE.test(description) ? '998719' : '8477');

  /* GST by place of supply: same state as the supplier is CGST + SGST, else IGST. lines may carry a discount percent */
  const tax = (lines, stateCode, rate = 18) => {
    const taxable = lines.reduce((sum, [, q, price, discount = 0]) => sum + q * price * (1 - discount / 100), 0);
    const gst = Math.round(taxable * rate) / 100;
    const intra = stateCode === b.supplier.stateCode;
    const exact = taxable + gst;
    const total = Math.round(exact);
    return { taxable, gst, intra, cgst: intra ? gst / 2 : 0, sgst: intra ? gst / 2 : 0, igst: intra ? 0 : gst, roundOff: total - exact, total };
  };

  /* amount in words, Indian system: "Rupees Five thousand eight hundred twenty nine only" */
  const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const two = (n) => (n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]} ${ONES[n % 10]}`.trim());
  const three = (n) => [n >= 100 ? `${ONES[Math.floor(n / 100)]} hundred` : '', two(n % 100)].filter(Boolean).join(' ');
  const words = (amount) => {
    const rupees = Math.floor(amount);
    if (rupees === 0) return 'Rupees zero only';
    const parts = [[1e7, 'crore'], [1e5, 'lakh'], [1e3, 'thousand']];
    let rest = rupees;
    const out = [];
    parts.forEach(([size, name]) => { const n = Math.floor(rest / size); if (n) out.push(`${n < 100 ? two(n) : three(n)} ${name}`); rest %= size; });
    if (rest) out.push(three(rest));
    return `Rupees ${out.join(' ')} only`;
  };

  /* invoice lines with HSN or SAC and the GST split; highlight marks a disputed line */
  const linesTable = (lines, companyId, highlight = -1) => {
    const t = tax(lines, billing(companyId).stateCode);
    const m = r.money;
    const taxRows = t.intra ? `<tr><td colspan="4">CGST 9%</td><td class="num">${m(t.cgst)}</td></tr><tr><td colspan="4">SGST 9%</td><td class="num">${m(t.sgst)}</td></tr>`
      : `<tr><td colspan="4">IGST 18%</td><td class="num">${m(t.igst)}</td></tr>`;
    return `<div class="table-wrap no-top" style="max-height:none"><table class="table compact"><thead><tr><th>Description</th><th>HSN or SAC</th><th class="num">Qty</th><th class="num">Rate</th><th class="num">Taxable</th></tr></thead>
      <tbody>${lines.map(([d, q, rate], i) => `<tr${i === highlight ? ' class="urgent" style="background:var(--red-50)"' : ''}><td>${d}${i === highlight ? '<span class="sub red-text">Disputed</span>' : ''}</td>
        <td class="mono">${hsn(d)}</td><td class="num">${q}</td><td class="num">${m(rate)}</td><td class="num">${m(q * rate)}</td></tr>`).join('')}</tbody>
      <tfoot><tr><td colspan="4">Taxable value</td><td class="num">${m(t.taxable)}</td></tr>${taxRows}
        ${Math.abs(t.roundOff) > 0.001 ? `<tr><td colspan="4">Round off</td><td class="num">${m(t.roundOff)}</td></tr>` : ''}
        <tr><td colspan="4">Total</td><td class="num">${m(t.total)}</td></tr></tfoot></table></div>
      <p class="muted" style="margin-top:8px; font-size:13px">${words(t.total)}</p>`;
  };

  /* money action modal body: password and reason (section 14) */
  const passwordFields = (id, reasons) => `
    <div class="field"><label for="${id}-reason">Reason</label><select class="select" id="${id}-reason">${reasons.map((x) => `<option>${x}</option>`).join('')}</select></div>
    <div class="field"><label for="${id}-pw">Your password</label><input class="input" id="${id}-pw" type="password" autocomplete="current-password" value="demo-password">
      <span class="hint">Money actions ask for your password again.</span></div>`;

  /* disputes are decided within 3 working days (Mon to Fri); older is red */
  const addWorkingDays = (iso, n) => {
    const d = new Date(`${iso.slice(0, 10)}T00:00`);
    for (let left = n; left > 0;) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) left -= 1; }
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const disputeDue = (x) => {
    const due = addWorkingDays(x.raised, 3);
    const days = r.daysFromToday(due);
    if (!['open', 'review'].includes(x.status)) return '<span class="faint">Decided</span>';
    if (days < 0) return `<span class="sla breach">${r.icon('warning-circle')}Over by ${-days} d</span>`;
    return `<span class="sla ${days <= 1 ? 'risk' : 'ok'}">${r.icon(days <= 1 ? 'clock-countdown' : 'check-circle')}By ${r.dayDate(due)}</span>`;
  };

  return { disputeDue, invoices, invoice, payments, payment, paymentId, refund, creditNote, dispute, invoiceTag, paymentTag, refundTag, disputeTag, correctionTag,
    INVOICE, PAYMENT, METHOD_ICON, linesTable, balance, daysOverdue, billing, linkOf, recordLink, hsn, tax, words, passwordFields };
})();

/* Payment detail (D911) and Create refund (D922, the same page with the refund modal open) share this render.
   It fills the ids of the payment page markup from ?p= (receipt or gateway id). */
ZXA.bill.renderPayment = (fallback) => {
  const r = ZXA.r;
  const B = ZXA.bill;
  const $ = (id) => document.getElementById(id);
  const ic = r.icon;
  const id = new URLSearchParams(location.search).get('p') || fallback;
  const p = B.payment(id);
  if (!p) { ZXA.initialState = 'not-found'; return null; }
  const c = r.company(p.company);
  const contact = r.person(p.company === 'nova' ? 'imran' : 'rakesh');
  const online = p.txn.startsWith('pay_');
  const refunds = ZXA.data.billing.refunds.filter((x) => x.payment === p.txn);
  const refunded = refunds.filter((x) => x.status !== 'failed').reduce((s, x) => s + x.amount, 0);
  const refundable = Math.max(0, p.amount - refunded);
  const title = p.receipt || p.txn;
  const feeTax = Math.round((p.fee || 0) * 18 / 118 * 100) / 100;

  document.title = `Zixom Admin - ${title}`;
  $('crumb').textContent = title;
  $('number').textContent = title;
  $('chips').innerHTML = `${B.paymentTag(p.status)}${p.flag ? r.tag(p.flag, 'red') : ''}`;
  $('meta').innerHTML = `<span>${ic(B.METHOD_ICON[p.kind])}${p.method}</span><span>${ic('clock')}${r.date(p.when)}, ${r.time(p.when)}</span><span>${ic('buildings')}${c.name}</span>
    <span>${ic('link')}${p.invoice ? `<a class="mono" href="${ZXA.href('D903', `?inv=${p.invoice}`)}">${p.invoice}</a>` : `<span class="mono">${p.order}</span>`}</span>`;

  /* actions allowed for the status (section 11) */
  const btn = (cls, label, attr) => `<${attr.startsWith('href') ? 'a' : 'button type="button"'} class="btn ${cls}" ${attr}>${label}</${attr.startsWith('href') ? 'a' : 'button'}>`;
  const receipt = btn('btn-secondary', 'Download receipt', 'data-toast="Receipt downloaded"');
  const refund = btn('btn-primary', 'Refund', 'data-open="refund"');
  const ACTIONS = {
    paid: receipt + (refundable ? refund : ''),
    'refund-initiated': receipt + (refundable ? btn('btn-secondary', 'Refund again', 'data-open="refund"') : '') + btn('btn-primary', 'Open refunds', `href="${ZXA.href('D923')}"`),
    refunded: receipt + (refundable ? refund : ''),
    processing: btn('btn-secondary', 'Mark as paid manually', 'data-open="manual"') + btn('btn-primary', 'Re-check status', 'data-busy data-toast="Razorpay says: still processing"'),
    failed: btn('btn-secondary', 'Re-check status', 'data-busy data-toast="Razorpay says: failed"') + btn('btn-primary', 'Contact customer', `href="tel:${contact.mobile.replace(/\s/g, '')}"`),
    verification: btn('btn-primary', 'Verify proof', `href="${ZXA.href('D912')}"`),
  };
  $('actions').innerHTML = ACTIONS[p.status];

  const banners = [];
  const banner = (tone, icon, text, extra = '') => `<div class="banner ${tone}">${ic(icon)}<span class="grow">${text}</span>${extra}</div>`;
  if (p.flag === 'Amount mismatch') banners.push(banner('amber', 'warning', `<b>Amount mismatch.</b> Razorpay captured ${r.money(p.captured)}; the invoice is ${r.money(p.amount)}. The invoice stays Processing until you review it.`));
  if (p.status === 'processing') banners.push(banner('', 'arrows-clockwise', '<b>Waiting for the bank.</b> Re-checked automatically every few minutes for 24 hours. Last check 12:00.'));
  if (p.status === 'failed') banners.push(banner('red', 'warning-circle', `<b>${p.reason}.</b> Any debit is returned by the bank in 5 to 7 working days. The customer sees this in the app.`));
  refunds.filter((x) => x.status === 'failed').forEach((x) => banners.push(banner('red', 'warning-circle', `<b>Refund ${x.number} failed.</b> ${x.failure}`,
    `<span class="btns"><a class="btn btn-sm btn-secondary" href="${ZXA.href('D923')}">Retry</a></span>`)));
  $('edge-banners').innerHTML = banners.join('');

  const m = r.money;
  $('tab-overview').innerHTML = `<div class="grid cols-2" style="gap:20px">
    <dl class="dl"><dt>Amount</dt><dd class="strong">${m(p.amount)}</dd><dt>Gateway fee</dt><dd>${online ? m((p.fee || 0) - feeTax) : '<span class="faint">None, offline</span>'}</dd>
      <dt>GST on fee</dt><dd>${online ? m(feeTax) : '<span class="faint">–</span>'}</dd><dt>Net to Zixom</dt><dd>${m(p.amount - (p.fee || 0))}</dd>
      <dt>Refunded</dt><dd>${m(refunded)}</dd><dt>Refundable</dt><dd class="strong">${m(refundable)}</dd></dl>
    <dl class="dl"><dt>Method</dt><dd>${p.method}</dd><dt>${online ? 'Payment id' : 'Reference'}</dt><dd class="mono">${p.txn}</dd>
      ${online ? `<dt>Order id</dt><dd class="mono">order_${p.txn.slice(4, 12)}Zx</dd>` : `<dt>Verified by</dt><dd>${p.verifiedBy ? `${p.verifiedBy}, ${r.dayDate(p.verifiedAt)}` : 'Not yet'}</dd>`}
      <dt>Receipt</dt><dd class="mono">${p.receipt || '<span class="faint">On payment</span>'}</dd>${p.note ? `<dt>Note</dt><dd>${p.note}</dd>` : ''}</dl></div>`;

  const t = (iso, add) => { const d = new Date(new Date(iso).getTime() + add * 1000); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`; };
  const EVENTS = online ? [['Created', 'circle', '', 0], ['Authorised', 'shield-check', 'blue', 14],
    ...(p.status === 'failed' ? [['Failed', 'x', 'red', 31]] : p.status === 'processing' ? [] : [['Captured', 'check', 'green', 18]])]
    : [['Proof uploaded', 'upload-simple', 'blue', 0], ...(p.verifiedBy ? [['Verified', 'check', 'green', 3600 * 5]] : [])];
  refunds.forEach((x) => EVENTS.push([`Refund ${x.number} ${x.status}`, 'rotate-ccw', x.status === 'failed' ? 'red' : 'blue', null, x.started]));
  $('tab-timeline').innerHTML = `<ol class="timeline">${EVENTS.reverse().map(([label, icon, tone, add, day]) => `<li><span class="node ${tone}">${ic(icon)}</span>
    <div><b>${label}</b><p>${day ? r.date(day) : `${r.date(p.when)} · ${t(p.when, add)}`}</p></div></li>`).join('')}</ol>`;

  /* webhook log: duplicate and late events are safe (EC-A18, EC-A19) */
  const hooks = online ? [['payment.authorized', 14, 'Processed'], ...(p.status === 'failed' ? [['payment.failed', 32, 'Processed']] : p.status === 'processing' ? [] : [['payment.captured', 19, 'Processed'],
    ['payment.captured', 47, 'Duplicate, ignored by payment id'], ['order.paid', 95, 'Late, already paid, no change']])] : [];
  $('tab-webhooks').innerHTML = hooks.length ? `<div class="table-wrap no-top" style="max-height:none"><table class="table compact"><thead><tr><th>Event</th><th>Received</th><th>Result</th></tr></thead><tbody>
    ${hooks.map(([e, add, res]) => `<tr><td class="mono">${e}</td><td class="nowrap">${t(p.when, add)}</td><td>${res.startsWith('Processed') ? r.tag(res, 'green') : r.tag(res, 'outline')}</td></tr>`).join('')}</tbody></table></div>`
    : `<div class="state"><span class="disc">${ic('plug')}</span><h3>No webhook events</h3><p>${online ? 'Waiting for Razorpay. Status is re-checked automatically.' : 'Offline payments have no gateway events.'}</p></div>`;

  const inv = p.invoice ? B.invoice(p.invoice) : null;
  $('side').innerHTML = `${inv ? `<section class="card side-card"><div class="card-head"><h3 class="grow">Invoice</h3><a class="card-link" href="${ZXA.href('D903', `?inv=${inv.number}`)}">Open</a></div>
      <div class="card-body"><dl class="dl"><dt>Number</dt><dd class="mono">${inv.number}</dd><dt>Status</dt><dd>${B.invoiceTag(inv.status)}</dd><dt>Amount</dt><dd>${m(inv.amount)}</dd>
        <dt>Balance</dt><dd class="strong">${m(B.balance(inv))}</dd></dl></div></section>` : `<section class="card side-card"><div class="card-head"><h3 class="grow">Order</h3><a class="card-link" href="${ZXA.href('D831')}">Open</a></div>
      <div class="card-body"><dl class="dl"><dt>Number</dt><dd class="mono">${p.order}</dd><dt>Status</dt><dd>${r.tag('Cancelled')}</dd></dl></div></section>`}
    <section class="card side-card"><div class="card-head"><h3 class="grow">Customer</h3><a class="card-link" href="${ZXA.href('D202')}">Open</a></div>
      <div class="card-body stack-sm"><div class="who"><span class="avatar blue">${contact.initials}</span><span><b>${c.name}</b><small>${contact.name} · ${contact.mobile}</small></span></div></div></section>
    <section class="card side-card"><div class="card-head"><h3 class="grow">Refunds</h3></div>
      <ul class="mini">${refunds.length ? refunds.map((x) => `<li data-href="D923"><span class="ic-disc">${ic('rotate-ccw')}</span><span class="grow"><b class="mono">${x.number}</b><small>${x.reason} · ${m(x.amount)}</small></span>${B.refundTag(x.status)}</li>`).join('')
        : '<li><span class="muted">No refunds</span></li>'}</ul></section>`;

  /* refund modal (D922) */
  $('rf-summary').innerHTML = `<dt>Payment</dt><dd class="mono">${title}</dd><dt>Paid</dt><dd>${m(p.amount)} · ${r.date(p.when)}</dd><dt>Method</dt><dd>${p.method}</dd>
    <dt>Refundable</dt><dd class="strong">${m(refundable)}${refunded ? ` <span class="muted">(${m(refunded)} refunded)</span>` : ''}</dd>`;
  $('rf-amount').value = refundable.toFixed(2);
  $('rf-title').textContent = `Refund ${m(refundable)}?`;
  $('rf-dest').innerHTML = online ? `<option>Original method, ${p.method}</option>` : '<option>Bank transfer, record the bank reference</option>';
  $('rf-ref').hidden = online;
  $('rf-max').textContent = `Maximum refundable is ${m(refundable)}.`;
  $('rf-pw').innerHTML = B.passwordFields('rfp', ['Customer request', 'Order cancelled', 'Dispute accepted', 'Paid twice', 'Billing error', 'Other']);
  $('mp-fields').innerHTML = B.passwordFields('mp', ['Money received in the bank statement', 'Razorpay dashboard shows captured', 'Other']);
  return p;
};

/* List pages: saved view tabs ([data-view] with a .n count) over rows that carry data-n, the index into items.
   Updates the "1 to n of n" text in #count. Also fills a skeleton tbody. */
ZXA.bill.listViews = (tableId, items, views, initial = 'all') => {
  const rows = () => [...document.querySelectorAll(`#${tableId} tbody tr`)];
  const show = (key) => {
    rows().forEach((row) => { row.hidden = !views[key](items[row.dataset.n]); });
    const shown = rows().filter((row) => !row.hidden).length;
    const count = document.getElementById('count');
    if (count) count.textContent = shown ? `1 to ${shown} of ${shown}` : '0 results';
  };
  document.querySelectorAll('[data-view]').forEach((tab) => {
    tab.querySelector('.n').textContent = items.filter(views[tab.dataset.view]).length;
    tab.addEventListener('click', () => show(tab.dataset.view));
  });
  show(initial);
};
ZXA.bill.skeleton = (tbodyId, cols = 6, rows = 10) => {
  document.getElementById(tbodyId).innerHTML = Array.from({ length: rows }, () => `<tr><td class="cb"></td>
    ${'<td><span class="sk sk-line" style="width:80%"></span></td>'.repeat(cols)}</tr>`).join('');
};
/* filter drawer chips toggle */
document.addEventListener('click', (event) => {
  const chip = event.target.closest('[data-chips] .chip');
  if (chip) chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
});
