/* Communication demo data: announcements (D1301), what's new (D1303), notification templates and rules
   (D1310, D1311, D1325, spec section 12) and the delivery log (D1320). People and records come from ZX.data.
   Audience sizes follow the demo data: 3 customer people in 2 companies, 2 engineers. */
window.ZXA = window.ZXA || {};

/* ANN-2026-001 to 003 as spec section 17; 004 to 007 are the older notices the app shows (C1302) */
ZXA.data.announcements = [
  { number: 'ANN-2026-001', kind: 'Safety', title: 'Check heater guard interlocks on AFM machines', status: 'sent', pinned: true,
    text: 'Test the guard interlock before each shift. Stop the machine if the heater runs with the guard open.',
    audience: 'All customers', count: 3, sent: '2026-11-22T10:00', showTo: '2026-12-22', delivery: 'Push and email',
    reach: { delivered: 2, failed: 1, opened: 2 }, link: 'None', by: 'Rajesh Goyal' },
  { number: 'ANN-2026-002', kind: 'Spare parts', title: 'Year end parts orders close on 24 Dec', status: 'scheduled', pinned: false,
    text: 'Place spare part orders by 24 Dec for dispatch before the new year. Orders after that ship from 2 Jan.',
    audience: 'All customers', count: 3, scheduled: '2026-12-01T10:00', showTo: '2026-12-24', delivery: 'Push and email', link: 'Screen: Parts', by: 'Rajesh Goyal' },
  { number: 'ANN-2026-003', kind: 'Service', title: 'Book your 2027 AMC early', status: 'draft', pinned: false,
    text: 'Renew before 31 Dec and keep your visit dates for the new year.',
    audience: 'Region: Ahmedabad', count: 2, saved: '2026-11-23T11:40', delivery: 'In app only', link: 'Screen: AMC plans', by: 'Rajesh Goyal' },
  { number: 'ANN-2026-004', kind: 'Spare parts', title: 'Heater elements now ship in 2 days', status: 'sent', pinned: false,
    text: 'Ceramic heaters for the AFM range are now stocked in Ahmedabad and Pune.',
    audience: 'Machine series: AFM', count: 2, sent: '2026-11-20T11:00', showTo: '2026-12-20', delivery: 'Push', reach: { delivered: 2, failed: 0, opened: 1 }, link: 'Screen: Parts', by: 'Rajesh Goyal' },
  { number: 'ANN-2026-005', kind: 'App news', title: 'Reschedule AMC visits in the app', status: 'sent', pinned: false,
    text: 'Move an AMC visit yourself, and download reports faster.',
    audience: 'All customers', count: 3, sent: '2026-11-18T09:30', showTo: '2026-12-18', delivery: 'In app only', reach: { delivered: 3, failed: 0, opened: 3 }, link: 'Screen: What is new', by: 'Rajesh Goyal' },
  { number: 'ANN-2026-006', kind: 'Support', title: 'Field visits paused on 25 Dec', status: 'sent', pinned: false,
    text: 'Phone, WhatsApp and email support stay open 24x7.',
    audience: 'All customers', count: 3, sent: '2026-11-16T12:00', showTo: '2026-12-26', delivery: 'Push and email', reach: { delivered: 3, failed: 0, opened: 2 }, link: 'None', by: 'Rajesh Goyal' },
  { number: 'ANN-2026-007', kind: 'Spare parts', title: 'PID controllers now on request', status: 'expired', pinned: false,
    text: 'Ask for a price from the part page in the app.',
    audience: 'All customers', count: 3, sent: '2026-11-02T10:00', showTo: '2026-11-16', delivery: 'Push', reach: { delivered: 3, failed: 0, opened: 2 }, link: 'Screen: Parts', by: 'Rajesh Goyal' },
  { number: 'ANN-2026-008', kind: 'Service', title: 'New visit slots from 1 Dec', status: 'withdrawn', pinned: false,
    text: 'Sent to the wrong region and withdrawn the same day.',
    audience: 'Region: Pune', count: 1, sent: '2026-11-12T15:00', withdrawn: '2026-11-12T15:20', delivery: 'Push', reach: { delivered: 1, failed: 0, opened: 0 }, link: 'None', by: 'Rajesh Goyal' },
];
ZXA.data.annStatus = { draft: ['Draft', ''], scheduled: ['Scheduled', 'blue'], sent: ['Sent', 'green'], withdrawn: ['Withdrawn', 'outline'], expired: ['Expired', 'outline'] };

/* audience sizes for the live count in D1302 */
ZXA.data.audiences = {
  'All customers': 3, 'Region: Ahmedabad': 2, 'Region: Pune': 1, 'Company: Shree Packaging Industries': 2, 'Company: Nova Cups Pvt Ltd': 1,
  'Machine series: AFM': 2, 'Machine series: CFM': 2, 'Machine series: BSM': 1, 'Machine series: Skin packing': 0, 'All engineers': 2, 'Custom list': 0,
};

/* release notes the app shows once after an update (C1304) */
ZXA.data.releases = [
  { version: '1.2.0', status: 'draft', date: null, apps: 'Customer and engineer', entries: [
    ['scan', 'Scan the machine QR', 'Open a machine from its nameplate QR code.'],
    ['file-text', 'Statements', 'Download a statement of account for any month.'] ] },
  { version: '1.1.0', status: 'published', date: '2026-11-18', apps: 'Customer', entries: [
    ['calendar-check', 'Reschedule AMC visits', 'Move a visit without calling us.'],
    ['file-pdf', 'Faster report downloads', 'Service reports open in a second.'],
    ['bell', 'Quiet hours', 'No notifications from 9 PM to 7 AM.'],
    ['wrench', 'Bug fixes', 'Smoother photo uploads on slow networks.'] ] },
  { version: '1.0.2', status: 'published', date: '2026-10-06', apps: 'Engineer', entries: [
    ['cloud-arrow-up', 'Offline sync', 'Reports saved offline upload as soon as you are back.'],
    ['signature', 'Customer sign off', 'Sign on the phone or confirm with a code.'] ] },
  { version: '1.0.0', status: 'published', date: '2026-08-01', apps: 'Customer and engineer', entries: [
    ['sparkles', 'Zixom Connect is here', 'Raise requests, track engineers and pay invoices in one app.'] ] },
];

/* section 12, sent to customers and engineers. critical templates cannot be disabled (OTP, assignment) */
ZXA.data.templates = [
  { key: 'otp', event: 'Sign in code', to: 'Customer, Engineer', opens: 'Sign in', timing: 'On request', channels: ['SMS'], critical: true,
    title: 'Zixom sign in code', body: '{code} is your Zixom Connect code. It expires in 5 minutes. Do not share it.' },
  { key: 'account', event: 'Account approved or rejected', to: 'Customer', opens: 'A08 or Home', timing: 'On decision', channels: ['Push', 'Email', 'SMS'],
    title: 'Your account is ready', body: 'Welcome to Zixom Connect, {name}. You can now raise requests for {company}.' },
  { key: 'info', event: 'Information requested', to: 'Customer', opens: 'Related screen', timing: 'On send', channels: ['Push', 'Email'],
    title: 'Zixom needs more information', body: 'Please reply on {record} by {date} so we can continue.' },
  { key: 'assigned', event: 'Engineer assigned with visit window', to: 'Customer', opens: 'C508', timing: 'On assignment', channels: ['Push', 'Email'], critical: true,
    title: '{engineer} is assigned to {ticket}', body: 'Visit on {date}, {window} for your {machine}. Track the engineer in the app.' },
  { key: 'rescheduled', event: 'Visit rescheduled by Admin', to: 'Customer, Engineer', opens: 'C508, E202', timing: 'On change', channels: ['Push', 'Email'],
    title: 'Visit moved to {date}', body: '{ticket} is now on {date}, {window}. Reply in the app if this does not suit you.' },
  { key: 'estimate', event: 'Estimate sent or revised', to: 'Customer', opens: 'C509', timing: 'On send, reminder after 24 hours, expiry warning', channels: ['Push', 'Email'],
    title: 'Estimate ready for {ticket}', body: '{amount} for your {machine}. Valid until {date}. Approve or reject in the app.' },
  { key: 'claim', event: 'Claim decision', to: 'Customer', opens: 'C308', timing: 'On decision', channels: ['Push', 'Email'],
    title: 'Decision on claim {claim}', body: 'Your warranty claim for {machine} has a decision. Open the app to see it.' },
  { key: 'report', event: 'Report approved and sent', to: 'Customer', opens: 'C512', timing: 'On approval or 24 hours after submission', channels: ['Push', 'Email'],
    title: 'Service report for {ticket}', body: 'The report for your {machine} is ready. Please confirm the work is done.' },
  { key: 'invoice', event: 'Invoice issued', to: 'Customer', opens: 'C802', timing: 'On issue', channels: ['Push', 'Email'],
    title: 'Invoice {invoice} issued', body: '{amount} due on {date}. Pay in the app by UPI, card or bank transfer.' },
  { key: 'payment', event: 'Payment received, failed or verified', to: 'Customer', opens: 'C805, C806, C802', timing: 'Immediately', channels: ['Push', 'Email'],
    title: 'Payment received for {invoice}', body: 'We received {amount}. Your receipt {receipt} is in the app.' },
  { key: 'refund', event: 'Refund initiated or processed', to: 'Customer', opens: 'C802', timing: 'On each step', channels: ['Push', 'Email'],
    title: 'Refund of {amount} started', body: 'The money returns to your original method in 5 to 7 working days.' },
  { key: 'order', event: 'Order quoted, packed, dispatched, delivered', to: 'Customer', opens: 'C708', timing: 'On change', channels: ['Push'],
    title: 'Order {order} is {status}', body: 'Open the app to see the details and tracking.' },
  { key: 'question', event: 'Question reply', to: 'Customer', opens: 'C603', timing: 'Immediately', channels: ['Push'],
    title: 'Zixom replied', body: '{agent} replied to your question {question}.' },
  { key: 'warranty', event: 'Warranty ending', to: 'Customer', opens: 'C302', timing: '60, 30 and 7 days before', channels: ['Push', 'Email'],
    title: 'Warranty ends on {date}', body: 'Your {machine} warranty ends in {days} days. Look at AMC plans to stay covered.' },
  { key: 'amc-renewal', event: 'AMC renewal', to: 'Customer', opens: 'C405', timing: '60, 30, 7 days before and on the end date', channels: ['Push', 'Email'],
    title: 'AMC {amc} ends on {date}', body: 'Renew now to keep your preventive visits for {machine}.' },
  { key: 'amc-visit', event: 'AMC visit due', to: 'Customer, Engineer', opens: 'C406, E701', timing: '7 days and 1 day before', channels: ['Push'],
    title: 'AMC visit on {date}', body: 'Preventive visit for {machine}, {window}.' },
  { key: 'payment-due', event: 'Payment due or overdue', to: 'Customer', opens: 'C802', timing: '3 days before, on the due date, then weekly', channels: ['Push', 'Email'],
    title: 'Invoice {invoice} is due', body: '{amount} is due on {date}. Pay in the app.' },
  { key: 'announcement', event: 'Announcement', to: 'Customers or engineers', opens: 'C1303', timing: 'Now or scheduled', channels: ['Push', 'Email'],
    title: '{title}', body: '{text}' },
  { key: 'offer', event: 'New assignment offer', to: 'Engineer', opens: 'E203', timing: 'Immediately, time sensitive', channels: ['Push', 'SMS'], critical: true, urgent: true,
    title: 'New job, respond in 30 min', body: '{ticket} · {machine}, {site}. Accept or decline in the app.' },
  { key: 'reassigned', event: 'Job reassigned or cancelled', to: 'Engineer', opens: 'E215', timing: 'Immediately', channels: ['Push'], critical: true,
    title: '{ticket} was reassigned', body: 'This job is no longer yours. Nothing to do.' },
  { key: 'reply', event: 'Customer reply or reopen', to: 'Engineer', opens: 'E202', timing: 'Immediately', channels: ['Push'],
    title: 'Customer replied on {ticket}', body: '"{message}"' },
  { key: 'part', event: 'Part request update', to: 'Engineer', opens: 'E502', timing: 'On change', channels: ['Push'],
    title: 'Part request {request} {status}', body: '{part} for {ticket}.' },
  { key: 'leave', event: 'Leave decision', to: 'Engineer', opens: 'E706', timing: 'On decision', channels: ['Push'],
    title: 'Leave {status}', body: 'Your leave on {date} is {status}.' },
  { key: 'escalation', event: 'Escalation response', to: 'Engineer', opens: 'E202', timing: 'On reply', channels: ['Push'], urgent: true,
    title: 'Reply on escalation {ticket}', body: '{message}' },
  { key: 'response-risk', event: 'Response time about to be missed', to: 'Engineer', opens: 'E202', timing: '30 minutes before the limit', channels: ['Push'], urgent: true,
    title: '30 min left on {ticket}', body: 'Update the job or call Zixom if you are running late.' },
];
/* templates switched off by Admin in the demo */
ZXA.data.templatesOff = ['order'];

/* section 12, sent to Admin */
ZXA.data.adminAlerts = [
  ['New user request or missing machine from the app', 'Bell, work queue', 'On arrival; reminder at 1 working day'],
  ['New service request', 'Bell, work queue', 'Immediately'],
  ['Machine down request', 'Bell, sound, email', 'Immediately, repeats every 5 minutes until acknowledged'],
  ['Ticket unassigned over 60 minutes', 'Bell, email', 'Default 60 minutes'],
  ['Engineer offer declined or expired', 'Bell', 'Immediately'],
  ['SLA at risk or breached', 'Bell, email', 'At 80 percent and at 100 percent of target'],
  ['Report submitted', 'Bell', 'On submission'],
  ['Estimate approved or rejected', 'Bell', 'Immediately'],
  ['New claim, claim reply, appeal', 'Bell', 'Immediately'],
  ['Offline payment proof uploaded', 'Bell', 'Immediately'],
  ['Payment failed or amount mismatch', 'Bell', 'Immediately'],
  ['Dispute opened', 'Bell, email', 'Immediately'],
  ['Low stock', 'Bell, daily summary', 'When stock crosses the minimum'],
  ['Part needed for this visit', 'Bell, sound', 'Immediately'],
  ['New question or complaint', 'Bell', 'Immediately'],
  ['New lead from IndiaMART', 'Bell, email', 'Immediately'],
  ['Follow up due', 'Bell', 'At the set time'],
  ['Engineer SOS or serious incident', 'Banner, sound, email, SMS', 'Immediately'],
  ['Integration failure', 'Bell, email', 'After 3 failures in 10 minutes'],
  ['Backup failed', 'Bell, email', 'On failure'],
  ['Deletion request, number change, leave request', 'Bell, work queue', 'On arrival'],
  ['Daily summary', 'Email', '7:30 AM IST'],
];

/* delivery log, last 90 days kept. to: person id (users), engineer id or a raw address */
ZXA.data.deliveries = [
  { id: 'NTF-48213', when: '2026-11-23T11:48', to: 'rakesh', channel: 'Push', event: 'Engineer on the way', ref: 'TKT-2026-0125', status: 'delivered' },
  { id: 'NTF-48212', when: '2026-11-23T11:42', to: 'sandeep', channel: 'Push', event: 'New assignment offer', ref: 'TKT-2026-0123', status: 'delivered' },
  { id: 'NTF-48211', when: '2026-11-23T11:42', to: 'sandeep', channel: 'SMS', event: 'New assignment offer', ref: 'TKT-2026-0123', status: 'sent' },
  { id: 'NTF-48210', when: '2026-11-23T11:20', to: 'imran', channel: 'SMS', event: 'Request received', ref: 'TKT-2026-0133', status: 'delivered',
    note: 'No email on file, sent by SMS instead (EC-A61)' },
  { id: 'NTF-48209', when: '2026-11-23T10:50', to: 'sandeep', channel: 'Push', event: 'Customer reply', ref: 'TKT-2026-0126', status: 'delivered' },
  { id: 'NTF-48208', when: '2026-11-23T09:30', to: 'rakesh', channel: 'Push', event: 'Estimate sent', ref: 'TKT-2026-0122', status: 'delivered' },
  { id: 'NTF-48207', when: '2026-11-23T09:30', to: 'rakesh', channel: 'Email', event: 'Estimate sent', ref: 'TKT-2026-0122', status: 'delivered' },
  { id: 'NTF-48206', when: '2026-11-23T07:30', to: 'admin', channel: 'Email', event: 'Daily summary', ref: '', status: 'delivered' },
  { id: 'NTF-48205', when: '2026-11-22T10:00', to: 'pooja', channel: 'Push', event: 'Announcement', ref: 'ANN-2026-001', status: 'failed',
    error: 'Device token not registered', note: 'Email sent as backup (EC-A26)' },
  { id: 'NTF-48204', when: '2026-11-22T10:00', to: 'pooja', channel: 'Email', event: 'Announcement', ref: 'ANN-2026-001', status: 'delivered', note: 'Backup for a failed push' },
  { id: 'NTF-48203', when: '2026-11-22T10:00', to: 'rakesh', channel: 'Push', event: 'Announcement', ref: 'ANN-2026-001', status: 'delivered' },
  { id: 'NTF-48202', when: '2026-11-22T10:00', to: 'imran', channel: 'Push', event: 'Announcement', ref: 'ANN-2026-001', status: 'delivered' },
  { id: 'NTF-48201', when: '2026-11-22T14:15', to: 'pooja', channel: 'Push', event: 'Engineer assigned', ref: 'TKT-2026-0123', status: 'failed',
    error: 'Device token not registered', note: 'Email sent as backup (EC-A26)' },
  { id: 'NTF-48200', when: '2026-11-17T09:00', to: 'rakesh', channel: 'Email', event: 'Payment overdue', ref: 'INV-2026-0981', status: 'bounced',
    error: '550 Mailbox full', note: 'Person card shows Email not working (EC-A27)' },
  { id: 'NTF-48199', when: '2026-11-21T09:05', to: 'anita', channel: 'Push', event: 'Job reassigned', ref: 'TKT-2026-0119', status: 'delivered' },
  { id: 'NTF-48198', when: '2026-11-23T12:00', to: 'rakesh', channel: 'Push', event: 'AMC renewal, 7 days', ref: 'AMC-2026-0014', status: 'queued',
    note: 'Waiting in the send queue' },
  { id: 'NTF-48197', when: '2026-11-23T06:05', to: '+91 98250 77812', channel: 'SMS', event: 'Sign in code', ref: '', status: 'delivered' },
  { id: 'NTF-48196', when: '2026-11-20T11:00', to: 'rakesh', channel: 'Push', event: 'Announcement', ref: 'ANN-2026-004', status: 'delivered' },
];
ZXA.data.deliveryStatus = { queued: ['Queued', ''], sent: ['Sent', 'blue'], delivered: ['Delivered', 'green'], failed: ['Failed', 'red'], bounced: ['Bounced', 'amber'] };
