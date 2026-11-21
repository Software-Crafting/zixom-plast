/* Reports, import and export demo data (spec section 15). Numbers follow the demo records in ZX.data and ZXA.data:
   8 machines, AMC-2026-0010 to 0015, invoices INV-2026-0980 to 0991, leads LD-2026-0040 to 0049,
   quotations QT-2026-0010 to 0014, orders ORD-2026-0213, ORD-2026-0214 and project PRJ-2026-001. */
window.ZXA = window.ZXA || {};

/* report library (D1501) and the chart behind each report (D1502).
   unit: n count, pct percent, money rupees, h hours. drill: the list a table row opens.
   Tickets is computed on the page from ZXA.r.tickets so it always matches the ticket list. */
ZXA.data.reportLibrary = [
  { group: 'Service', reports: [
    { key: 'tickets', title: 'Tickets', sub: 'By status, age, severity, engineer, region', icon: 'wrench', drill: 'D401' },
    { key: 'response', dim: 'Day', title: 'Response and resolution vs SLA', sub: 'Average hours against the target', icon: 'timer', drill: 'D418',
      chart: 'line', unit: 'h', labels: ZXA.data.series.days,
      series: [{ label: 'Average response', data: ZXA.data.series.response }, { label: 'Target', data: ZXA.data.series.days.map(() => 4), target: true }] },
    { key: 'first-fix', dim: 'Month', title: 'First time fix', sub: 'Closed on the first visit', icon: 'check-circle', drill: 'D401',
      chart: 'bar', unit: 'pct', labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], series: [{ label: 'First time fix', data: [78, 82, 80, 84, 85, 86] }] },
    { key: 'reopen', dim: 'Month', title: 'Reopen rate', sub: 'Reopened within 7 days', icon: 'rotate-ccw', drill: 'D415',
      chart: 'bar', unit: 'pct', labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], series: [{ label: 'Reopen rate', data: [4.2, 3.1, 5.0, 2.6, 3.4, 2.9] }] },
  ] },
  { group: 'Warranty and AMC', reports: [
    { key: 'claims', dim: 'Reason', title: 'Warranty claims', sub: 'Approved and rejected, by reason', icon: 'shield-check', drill: 'D501',
      chart: 'bar', unit: 'n', labels: ['Manufacturing defect', 'Part failed in warranty', 'Wrong operation', 'Outside warranty', 'Wear and tear'],
      series: [{ label: 'Approved', data: [4, 3, 0, 0, 0] }, { label: 'Rejected', data: [0, 0, 1, 1, 1] }] },
    { key: 'amc', dim: 'Status', title: 'AMC', sub: 'Active, expiring, renewal rate', icon: 'seal-check', drill: 'D601',
      chart: 'doughnut', unit: 'n', labels: ['Active', 'Expiring', 'Pending payment', 'Suspended', 'Expired, grace', 'Quote requested'],
      series: [{ label: 'Contracts', data: [1, 1, 1, 1, 1, 1] }] },
  ] },
  { group: 'Machines and parts', reports: [
    { key: 'machines', dim: 'State', title: 'Machines', sub: 'By state, series, warranty status', icon: 'factory', drill: 'D301',
      chart: 'bar', unit: 'n', labels: ['Running', 'Idle', 'In repair', 'Down', 'Pending verification'], series: [{ label: 'Machines', data: [4, 1, 1, 1, 1] }] },
    { key: 'parts', dim: 'Part', title: 'Parts', sub: 'Usage, stock value, low stock, slow movers', icon: 'package', drill: 'D810',
      chart: 'bar', unit: 'n', labels: ['Ceramic heater element 650 W', 'Timer relay 24 V DC', 'Motor bearing set', 'Industrial chain set 12B', 'Chain tensioner'],
      series: [{ label: 'Used, last 90 days', data: [14, 6, 4, 3, 2] }] },
  ] },
  { group: 'Money', reports: [
    { key: 'payments', dim: 'Age', title: 'Payments', sub: 'Collected, overdue, aging', icon: 'currency-inr', drill: 'D901',
      chart: 'bar', unit: 'money', labels: ['Not due', '1 to 15 days', '16 to 30 days', '31 to 60 days', 'Over 60 days'],
      series: [{ label: 'Outstanding', data: [74222, 29500, 0, 0, 0] }] },
  ] },
  { group: 'Sales', reports: [
    { key: 'leads', dim: 'Source', title: 'Lead sources and conversion', sub: 'Leads and wins by source', icon: 'chart-line-up', drill: 'D1101',
      chart: 'bar', unit: 'n', labels: ['IndiaMART', 'Phone', 'App', 'Email', 'Referral'], series: [{ label: 'Leads', data: [5, 2, 1, 1, 1] }, { label: 'Won', data: [1, 0, 0, 0, 0] }] },
    { key: 'quotations', dim: 'Status', title: 'Quotation conversion', sub: 'Sent, accepted, rejected', icon: 'file-text', drill: 'D1201',
      chart: 'bar', unit: 'n', labels: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Revised'], series: [{ label: 'Quotations', data: [1, 1, 1, 1, 1] }] },
    { key: 'orders', dim: 'Stage', title: 'Orders by stage', sub: 'Machine orders and turnkey projects', icon: 'milestone', drill: 'D1210',
      chart: 'bar', unit: 'n', labels: ['Confirmed', 'Design', 'Manufacturing', 'Testing', 'Dispatched', 'Installed', 'Commissioned'],
      series: [{ label: 'Orders', data: [0, 1, 1, 0, 0, 1, 0] }] },
  ] },
  { group: 'People and app', reports: [
    { key: 'engineers', dim: 'Engineer', title: 'Engineer performance', sub: 'Visits and on time arrival', icon: 'hard-hat', drill: 'D709',
      chart: 'bar', unit: 'n', labels: ['Sandeep Yadav', 'Anita Verma'], series: [{ label: 'Visits, November', data: [38, 21] }, { label: 'On time', data: [35, 19] }] },
    { key: 'ratings', dim: 'Rating', title: 'Customer ratings', sub: 'Stars after each visit', icon: 'star', drill: 'D420',
      chart: 'bar', unit: 'n', labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'], series: [{ label: 'Ratings', data: [18, 7, 2, 1, 0] }] },
    { key: 'adoption', dim: 'Week', title: 'App adoption', sub: 'Active people each week', icon: 'smartphone', drill: 'D1631',
      chart: 'line', unit: 'n', labels: ['26 Oct', '2 Nov', '9 Nov', '16 Nov', '23 Nov'],
      series: [{ label: 'Customers', data: [2, 3, 3, 3, 3] }, { label: 'Engineers', data: [2, 2, 2, 2, 2] }] },
  ] },
];

/* scheduled report emails (D1503) */
ZXA.data.schedules = [
  { name: 'Weekly service summary', report: 'tickets', when: 'Every Monday, 8:00 AM', to: ['admin@zixom.in'], format: 'PDF',
    status: 'active', last: '2026-11-23T08:00', lastOk: true, next: 'Mon 30 Nov, 8:00 AM' },
  { name: 'Monthly collections', report: 'payments', when: '1st of the month, 9:00 AM', to: ['admin@zixom.in', 'info@zixom.in'], format: 'Excel',
    status: 'active', last: '2026-11-01T09:00', lastOk: true, next: 'Tue 1 Dec, 9:00 AM' },
  { name: 'Daily open tickets', report: 'tickets', when: 'Every day, 7:00 AM', to: ['admin@zixom.in'], format: 'Excel',
    status: 'paused', last: '2026-11-15T07:00', lastOk: true, next: 'Paused' },
  { name: 'Quotation pipeline', report: 'quotations', when: 'Every Friday, 6:00 PM', to: ['admin@zixom.in', 'sales@zixom.in'], format: 'PDF',
    status: 'active', last: '2026-11-20T18:00', lastOk: false, error: 'sales@zixom.in: mailbox does not exist', next: 'Fri 27 Nov, 6:00 PM' },
];

/* import jobs (D1511). The setup imports on 2 Nov created the demo records */
ZXA.data.imports = [
  { id: 'IMP-0009', type: 'Machines', file: 'nova_machines_update.xlsx', rows: 3, created: 0, updated: 2, skipped: 0, errors: 1,
    status: 'done', by: 'Rajesh Goyal', when: '2026-11-23T10:20', undoUntil: '2026-11-24T10:20' },
  { id: 'IMP-0008', type: 'IndiaMART history', file: 'indiamart_enquiries_2026.csv', rows: 0, created: 0, updated: 0, skipped: 0, errors: 0,
    status: 'failed', reason: 'No header row found. Download the template and try again.', by: 'Rajesh Goyal', when: '2026-11-21T17:45' },
  { id: 'IMP-0007', type: 'Leads', file: 'trade_fair_leads.xlsx', rows: 4, created: 4, updated: 0, skipped: 0, errors: 0,
    status: 'undone', undoneBy: 'Rajesh Goyal', undoneAt: '2026-11-12T16:30', by: 'Rajesh Goyal', when: '2026-11-12T15:10' },
  { id: 'IMP-0006', type: 'Leads', file: 'leads_open.xlsx', rows: 10, created: 10, updated: 0, skipped: 0, errors: 0, status: 'done', by: 'Rajesh Goyal', when: '2026-11-02T12:40' },
  { id: 'IMP-0005', type: 'Stock', file: 'stock_opening.xlsx', rows: 20, created: 20, updated: 0, skipped: 0, errors: 0, status: 'done', by: 'Rajesh Goyal', when: '2026-11-02T12:10' },
  { id: 'IMP-0004', type: 'Spare parts', file: 'parts_catalogue.xlsx', rows: 20, created: 20, updated: 0, skipped: 0, errors: 0, status: 'done', by: 'Rajesh Goyal', when: '2026-11-02T11:55' },
  { id: 'IMP-0003', type: 'Machines', file: 'machines_register.xlsx', rows: 8, created: 8, updated: 0, skipped: 0, errors: 0, status: 'done', by: 'Rajesh Goyal', when: '2026-11-02T11:30' },
  { id: 'IMP-0002', type: 'People', file: 'customer_people.xlsx', rows: 3, created: 3, updated: 0, skipped: 0, errors: 0, status: 'done', by: 'Rajesh Goyal', when: '2026-11-02T11:05' },
  { id: 'IMP-0001', type: 'Customers', file: 'customers.xlsx', rows: 2, created: 2, updated: 0, skipped: 0, errors: 0, status: 'done', by: 'Rajesh Goyal', when: '2026-11-02T10:50' },
];

/* background exports (D1520): over 5,000 rows, link valid 7 days */
ZXA.data.exports = [
  { name: 'Activity log, 1 Oct to 23 Nov', source: 'D1640', format: 'XLSX', rows: 18420, size: '2.4 MB', status: 'ready', when: '2026-11-23T11:05', expires: '2026-11-30' },
  { name: 'Delivery log, last 90 days', source: 'D1320', format: 'CSV', rows: 12806, status: 'running', progress: 62, when: '2026-11-23T11:52' },
  { name: 'IndiaMART log, last 90 days', source: 'D1112', format: 'XLSX', rows: 8640, status: 'failed', error: 'The export timed out', when: '2026-11-22T19:10' },
  { name: 'Activity log, September', source: 'D1640', format: 'XLSX', rows: 15204, size: '2.0 MB', status: 'expired', when: '2026-10-02T09:30', expires: '2026-10-09' },
];
