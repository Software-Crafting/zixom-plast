/* Overview demo data: the full work queue (D102), system health (D103), today board extras (D104) and the
   notification history (D106). The first queue items are ZXA.data.queue (dashboard card); same order and wording.
   Minutes: age is how long the item has waited, due is minutes to its target (negative = target missed). */
window.ZXA = window.ZXA || {};

Object.assign(ZXA.data, {
  /* rail types in spec order (D102); count comes from the items */
  queueTypes: [
    ['verification', 'Verification', 'user-check'], ['assign', 'Assign', 'user-plus'], ['estimates', 'Estimates', 'currency-inr'],
    ['reports', 'Reports', 'clipboard-text'], ['claims', 'Claims', 'shield-check'], ['appeals', 'Appeals', 'scale'],
    ['payments', 'Payments', 'receipt'], ['disputes', 'Disputes', 'flag'], ['refunds', 'Refunds', 'rotate-ccw'],
    ['parts', 'Parts', 'package'], ['orders', 'Orders', 'shopping-cart'], ['questions', 'Questions', 'chat-circle-dots'],
    ['complaints', 'Complaints', 'smiley-sad'], ['deletions', 'Deletions', 'user-x'], ['numbers', 'Number changes', 'smartphone'],
    ['leave', 'Leave', 'calendar-blank'], ['leads', 'Leads', 'chart-line-up'], ['followups', 'Follow ups', 'phone'],
    ['lowstock', 'Low stock', 'boxes'],
  ],

  /* 14 items, the sidebar count. act: [button, toast] decides here; go: page for actions that need a full form */
  workQueue: [
    { id: 'q1', type: 'assign', icon: 'siren', tone: 'red', down: true, title: 'Machine down, assign engineer', customer: 'Nova Cups Pvt Ltd',
      record: 'TKT-2026-0133', href: 'D403?t=TKT-2026-0133', age: 40, due: 200, priority: 'Urgent', go: ['Assign engineer', 'D404?t=TKT-2026-0133'],
      facts: [['Machine', 'CFM-450 Cup Former, ZP-CF-2108'], ['Site', 'Chakan unit, Pune'], ['Raised by', 'Imran Qureshi, +91 98220 43120'], ['Problem', 'Main motor will not start, MCB trips at once']] },
    { id: 'q2', type: 'assign', icon: 'clock-countdown', tone: 'amber', title: 'Offer to Sandeep expires in 18 min', customer: 'Shree Packaging Industries',
      record: 'TKT-2026-0123', href: 'D403?t=TKT-2026-0123', age: 1560, due: 18, priority: 'High', go: ['Reassign', 'D404?t=TKT-2026-0123'],
      facts: [['Engineer', 'Sandeep Yadav, not answered yet'], ['Window', 'Tue 24 Nov, 12 to 3 PM'], ['Machine', 'CFM-450 Cup Former, ZP-CF-2011']] },
    { id: 'q3', type: 'verification', icon: 'user-check', tone: 'blue', title: 'Verify Harish Patel', customer: 'Shree Packaging Industries',
      record: 'VER-2026-0018', href: 'D211?v=VER-2026-0018', age: 355, due: 185, priority: 'Normal', act: ['Approve and link', 'Harish Patel approved and linked to Shree Packaging. Push and SMS sent'],
      facts: [['Match', 'Exact match, 96'], ['Matched on', 'GSTIN, serial, email domain, city'], ['Mobile', '+91 98795 31420'], ['Serial', 'ZP-TF-2501']] },
    { id: 'q4', type: 'verification', icon: 'user-check', tone: 'amber', title: 'Verify Vikram Joshi', customer: 'Nova Cups (entered)',
      record: 'VER-2026-0019', href: 'D211?v=VER-2026-0019', age: 3990, due: -300, priority: 'Normal', go: ['Review request', 'D211?v=VER-2026-0019'],
      facts: [['Match', 'Partial match, 58'], ['Warning', 'Serial ZP-CF-2011 is registered to Shree Packaging'], ['Mobile', '+91 98901 22874'], ['Earlier', 'VER-2026-0014, rejected']] },
    { id: 'q5', type: 'verification', icon: 'user-check', tone: 'blue', title: 'Verify Meera Iyer', customer: 'Sai Thermoform Works (entered)',
      record: 'VER-2026-0020', href: 'D211?v=VER-2026-0020', age: 140, due: 400, priority: 'Normal', go: ['Review request', 'D211?v=VER-2026-0020'],
      facts: [['Match', 'No match'], ['City', 'Rajkot'], ['Serial', 'ZP-TF-1712, not in the register']] },
    { id: 'q6', type: 'payments', icon: 'receipt', tone: 'blue', title: 'Bank transfer proof, ₹3,540.00', customer: 'Shree Packaging Industries',
      record: 'INV-2026-0985', href: 'D912', age: 2690, due: 360, priority: 'Normal', act: ['Verify payment', 'Payment verified. Receipt sent to the customer'],
      facts: [['Amount', '₹3,540.00, matches the invoice'], ['UTR', 'HDFC0026119021'], ['Uploaded', 'Sat 21 Nov, 3:10 PM by Rakesh Mehta']] },
    { id: 'q7', type: 'reports', icon: 'clipboard-text', tone: 'blue', title: 'Review visit report', customer: 'Shree Packaging Industries',
      record: 'TKT-2026-0128', href: 'D403?t=TKT-2026-0128', age: 2830, due: 360, priority: 'High', go: ['Review report', 'D413?t=TKT-2026-0128'],
      facts: [['Engineer', 'Sandeep Yadav'], ['Report', 'SR-2026-0128, signed by Rakesh Mehta'], ['Work done', 'Replaced heater element zone 4']] },
    { id: 'q8', type: 'parts', icon: 'package', tone: 'amber', title: 'Chain set needed for this visit', customer: 'Shree Packaging Industries',
      record: 'SPR-2026-0031', href: 'D821', age: 105, due: 15, priority: 'Urgent', go: ['Open request', 'D821'],
      facts: [['Part', 'Industrial chain set, 12B, ZP-SP-003'], ['Stock', 'Out of stock in Ahmedabad'], ['For', 'TKT-2026-0126, Sandeep on site']] },
    { id: 'q9', type: 'claims', icon: 'shield-check', tone: 'blue', title: 'New warranty claim', customer: 'Shree Packaging Industries',
      record: 'WCL-2026-0040', href: 'D502', age: 1500, due: 1500, priority: 'Normal', go: ['Decide claim', 'D503'],
      facts: [['Machine', 'AFM-760 Single Station, ZP-TF-2310'], ['Problem', 'Heater zone 2 not reaching temperature']] },
    { id: 'q10', type: 'leave', icon: 'calendar-blank', tone: 'blue', title: 'Leave request, 18 Dec', customer: 'Sandeep Yadav',
      record: 'ZP-SE-014', href: 'D705', age: 4320, due: 2880, priority: 'Low', act: ['Approve leave', 'Leave approved. Sandeep is told'],
      facts: [['Dates', 'Fri 18 Dec, full day'], ['Reason', 'Personal work'], ['Jobs that day', 'None booked']] },
    { id: 'q11', type: 'estimates', icon: 'currency-inr', tone: 'blue', title: 'Estimate not answered, expires in 3 days', customer: 'Shree Packaging Industries',
      record: 'QT-2026-0041', href: 'D403?t=TKT-2026-0122', age: 150, due: 1200, priority: 'Normal', act: ['Send reminder', 'Reminder sent to Rakesh Mehta'],
      facts: [['Ticket', 'TKT-2026-0122, Scrap grinder'], ['Amount', '₹8,968.00 with GST'], ['Valid until', '26 Nov 2026']] },
    { id: 'q12', type: 'deletions', icon: 'user-x', tone: 'blue', title: 'Account deletion request', customer: 'Manoj Desai, Shree Packaging',
      record: 'DEL-2026-0007', href: 'D209', age: 4440, due: 38880, priority: 'Low', go: ['Open request', 'D209'],
      facts: [['Scheduled', '20 Dec 2026, after the 30 day wait'], ['Blockers', 'Open ticket TKT-2026-0130, unpaid INV-2026-0981']] },
    { id: 'q13', type: 'numbers', icon: 'smartphone', tone: 'blue', title: 'Mobile number change, old number lost', customer: 'Rakesh Mehta, Shree Packaging',
      record: 'MOB-0012', href: 'D215', age: 55, due: 485, priority: 'Normal', go: ['Check and decide', 'D215'],
      facts: [['Old', '+91 98250 11410, not verified'], ['New', '+91 99250 44718, verified'], ['Requested', 'Today, 11:05 AM']] },
    { id: 'q14', type: 'leads', icon: 'inbox', tone: 'blue', title: 'IndiaMART lead without owner', customer: 'Automatic vacuum forming machine, Pune',
      record: 'LD-2026-0049', href: 'D1103', age: 122, due: 238, priority: 'High', act: ['Take the lead', 'Lead LD-2026-0049 is now yours'],
      facts: [['Source', 'IndiaMART direct enquiry'], ['Contact', 'Prakash Jadhav, +91 98230 55107'], ['Need', 'Automatic vacuum forming machine, 2 stations']] },
  ],

  /* a row that arrives in the Live demo state */
  queueLive: { id: 'q15', type: 'assign', icon: 'wrench', tone: 'blue', title: 'New service request, assign engineer', customer: 'Shree Packaging Industries',
    record: 'TKT-2026-0120', href: 'D403?t=TKT-2026-0120', age: 1, due: 1440, priority: 'Normal', go: ['Assign engineer', 'D404?t=TKT-2026-0120'],
    facts: [['Machine', 'AFM-760 Single Station, ZP-TF-2310'], ['Type', 'Preventive maintenance']] },

  /* D103: one card per integration or job. state: ok, degraded, down */
  healthCards: [
    { key: 'razorpay', name: 'Razorpay webhooks', icon: 'credit-card', state: 'ok', value: 'Live', sub: 'Last webhook 4 min ago · 0 failed today', log: 'D1641' },
    { key: 'indiamart', name: 'IndiaMART webhook', icon: 'inbox', state: 'ok', value: '2 h ago', sub: 'Last lead received 9:58 AM · 3 today', log: 'D1641' },
    { key: 'push', name: 'Push delivery', icon: 'bell', state: 'ok', value: '98.6%', sub: '412 of 418 delivered today · 6 expired tokens', log: 'D1320' },
    { key: 'email', name: 'Email delivery', icon: 'envelope-simple', state: 'ok', value: '99.2%', sub: '126 sent today · 1 bounced', log: 'D1320' },
    { key: 'sms', name: 'SMS OTP provider', icon: 'chat-text', state: 'ok', value: '2.1 s', sub: 'Average delivery · 64 codes today', log: 'D1641' },
    { key: 'storage', name: 'Storage', icon: 'database', state: 'ok', value: '38%', sub: '19 GB of 50 GB · photos 14 GB', meter: 38, log: 'D1643' },
    { key: 'backup', name: 'Backups', icon: 'cloud-arrow-up', state: 'ok', value: '2:00 AM', sub: 'Last run today, 4 min, verified', log: 'D1643' },
    { key: 'adoption', name: 'App version adoption', icon: 'smartphone', state: 'ok', value: '72%', sub: 'On 1.4.2 · 3 people below 1.4.0', meter: 72, log: 'D1631' },
    { key: 'jobs', name: 'Background jobs', icon: 'server', state: 'ok', value: '0 failed', sub: '1,284 run in 24 h', log: 'D1641' },
  ],
  /* how cards read in the Degraded and Down demo states */
  healthIssues: {
    degraded: {
      indiamart: { state: 'degraded', value: '49 h ago', sub: 'No enquiry in 48 hours. Check the integration in IndiaMART' },
      push: { state: 'degraded', value: '91.0%', sub: '380 of 418 delivered · Firebase slow since 11:20' },
      jobs: { state: 'degraded', value: '2 failed', sub: 'Daily summary email, PDF for INV-2026-0985', retry: true },
    },
    down: {
      sms: { state: 'down', value: 'Down', sub: '3 failures in 10 minutes · customers cannot sign in with OTP', retry: true },
      razorpay: { state: 'degraded', value: '12 min ago', sub: '2 webhooks failed signature check (EC-A20)' },
      jobs: { state: 'degraded', value: '2 failed', sub: 'Daily summary email, PDF for INV-2026-0985', retry: true },
    },
  },
  healthEvents: [
    ['2026-11-23T11:20', 'Push delivery slow', 'Firebase answered in 8 s for 12 minutes. Recovered', 'amber'],
    ['2026-11-23T02:00', 'Backup completed', '4 min, 19 GB, checksum verified', 'green'],
    ['2026-11-22T18:44', 'Payment failed', 'INV-2026-0984 · bank declined', 'amber'],
    ['2026-11-21T07:30', 'Daily summary sent', 'To admin@zixom.in', 'green'],
  ],

  /* D106: notification types and older history (the first five are ZXA.data.notifications) */
  notificationTypes: [['service', 'Service'], ['verification', 'Accounts'], ['payments', 'Payments'], ['parts', 'Parts'], ['leads', 'Leads'], ['system', 'System']],
  notificationTypeOf: ['service', 'service', 'parts', 'leads', 'payments'],
  olderNotifications: [
    { type: 'verification', icon: 'user-check', tone: 'blue', title: 'New verification request', sub: 'Harish Patel · VER-2026-0018 · exact match', when: '2026-11-23T06:05', unread: true, href: 'D211?v=VER-2026-0018' },
    { type: 'verification', icon: 'smartphone', tone: 'blue', title: 'Mobile number change', sub: 'Rakesh Mehta · old number lost', when: '2026-11-23T11:05', unread: true, href: 'D215' },
    { type: 'service', icon: 'clipboard-text', tone: '', title: 'Report submitted', sub: 'TKT-2026-0128 · Sandeep Yadav', when: '2026-11-21T16:55', unread: false, href: 'D413?t=TKT-2026-0128' },
    { type: 'verification', icon: 'user-check', tone: 'amber', title: 'Verification waiting over 1 working day', sub: 'Vikram Joshi · VER-2026-0019', when: '2026-11-21T17:30', unread: false, href: 'D211?v=VER-2026-0019' },
    { type: 'payments', icon: 'warning-circle', tone: 'red', title: 'Payment failed', sub: 'INV-2026-0984 · ₹6,962.00 · bank declined', when: '2026-11-22T18:44', unread: false, href: 'D903' },
    { type: 'service', icon: 'currency-inr', tone: '', title: 'Estimate sent', sub: 'TKT-2026-0122 · ₹8,968.00', when: '2026-11-23T09:30', unread: false, href: 'D403?t=TKT-2026-0122' },
    { type: 'service', icon: 'shield-check', tone: 'blue', title: 'New warranty claim', sub: 'WCL-2026-0040 · Shree Packaging', when: '2026-11-22T10:40', unread: false, href: 'D502' },
    { type: 'verification', icon: 'user-x', tone: '', title: 'Account deletion request', sub: 'Manoj Desai · DEL-2026-0007', when: '2026-11-20T10:05', unread: false, href: 'D209' },
    { type: 'system', icon: 'cloud-arrow-up', tone: 'green', title: 'Backup completed', sub: 'Last night, 2:00 AM', when: '2026-11-23T02:04', unread: false, href: 'D1643' },
    { type: 'leads', icon: 'inbox', tone: 'blue', title: 'New IndiaMART lead', sub: 'Blister sealing machine · Rajkot', when: '2026-11-21T14:12', unread: false, href: 'D1103' },
    { type: 'parts', icon: 'boxes', tone: 'amber', title: 'Low stock', sub: 'Timer relay 24 V DC · 2 left, minimum 5', when: '2026-11-20T08:00', unread: false, href: 'D815' },
    { type: 'service', icon: 'star', tone: '', title: 'Rated 5 stars', sub: 'TKT-2026-0129 · Rakesh Mehta', when: '2026-10-29T17:20', unread: false, href: 'D403?t=TKT-2026-0129' },
    { type: 'payments', icon: 'check-circle', tone: 'green', title: 'Payment received', sub: 'INV-2026-0979 · ₹2,950.00', when: '2026-11-20T12:40', unread: false, href: 'D910' },
    { type: 'service', icon: 'clock-countdown', tone: 'amber', title: 'SLA breached', sub: 'TKT-2026-0130 · response target missed by 5 h', when: '2026-11-19T20:00', unread: false, href: 'D403?t=TKT-2026-0130' },
    { type: 'system', icon: 'smartphone', tone: '', title: 'App 1.4.2 released', sub: '72% of people updated', when: '2026-11-16T10:00', unread: false, href: 'D1631' },
    { type: 'leads', icon: 'phone', tone: 'amber', title: 'Follow up due', sub: 'LD-2026-0044 · call Sai Packaging', when: '2026-11-18T11:00', unread: false, href: 'D1103' },
  ],
});
