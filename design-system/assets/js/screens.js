/* Every screen in the spec (section 18), grouped by module.
   [id, name, phase]. A screen with a built page gets its path in BUILT below. */
window.ZX = window.ZX || {};

ZX.modules = [
  { role: 'shared', id: 'A', name: 'Access and account', screens: [
    ['A01', 'Splash'], ['A02', 'Welcome'], ['A03', 'Sign in'], ['A04', 'Verify OTP'], ['A05', 'Sign up: your details'],
    ['A06', 'Find your company'], ['A07', 'Verify with machine details'], ['A08', 'Verification pending'],
    ['A09', 'Verification rejected'], ['A10', 'Complete profile'], ['A11', 'Terms and privacy'], ['A12', 'Company picker'],
    ['A13', 'App lock setup'], ['A14', 'App lock'], ['A15', 'Session expired'], ['A16', 'Account suspended or deactivated'],
    ['A17', 'Engineer first sign in'] ] },
  { role: 'shared', id: 'A2', name: 'Invitations, devices and account changes', screens: [
    ['A18', 'Accept invitation'], ['A19', 'Change mobile number'], ['A20', 'Number linked to two accounts'],
    ['A21', 'Verify email'], ['A22', 'Security alert'], ['A23', 'Device limit reached'], ['A24', 'Account deletion requested'],
    ['A25', 'Account deleted'] ] },
  { role: 'shared', id: 'S', name: 'System screens', screens: [
    ['S01', 'Force update'], ['S02', 'Maintenance'], ['S03', 'No internet'], ['S04', 'Generic error'], ['S05', 'Not found'],
    ['S06', 'No access'], ['S07', 'Permission needed'], ['S08', 'Invalid or expired link'], ['S09', 'About and version'] ] },
  { role: 'shared', id: 'S2', name: 'More system screens and sheets', screens: [
    ['S10', 'Phone storage full'], ['S11', 'Too many attempts'], ['S12', 'Unsupported phone software'],
    ['S13', 'Rooted or jailbroken warning'], ['S14', 'Update available'], ['S15', 'Use mobile data?'],
    ['S16', 'Phone date or time wrong'], ['S17', 'Share or export failed'], ['S18', 'Opening link'], ['S19', 'Biometric prompt help'] ] },

  { role: 'customer', id: 'C1', name: 'Home and search', screens: [['C101', 'Home'], ['C102', 'Search'], ['C103', 'Alerts list']] },
  { role: 'customer', id: 'C2', name: 'My machines', screens: [
    ['C201', 'My machines'], ['C202', 'Machine detail'], ['C203', 'Add machine'], ['C204', 'Report an unlisted machine'],
    ['C205', 'Scan QR'], ['C206', 'Edit machine'], ['C207', 'Machine history'], ['C208', 'History entry detail'],
    ['C209', 'Machine transfer or removal'], ['C210', 'Machine QR card', 2] ] },
  { role: 'customer', id: 'C3', name: 'Warranty', screens: [
    ['C301', 'Warranty list'], ['C302', 'Warranty details'], ['C303', 'New claim: choose machine'],
    ['C304', 'New claim: describe the problem'], ['C305', 'New claim: evidence'], ['C306', 'New claim: site and contact'],
    ['C307', 'New claim: review and submit'], ['C308', 'Claim detail and tracking'], ['C309', 'Extend warranty', 2],
    ['C310', 'Appeal a rejected claim'] ] },
  { role: 'customer', id: 'C4', name: 'AMC', screens: [
    ['C401', 'AMC overview'], ['C402', 'AMC contract detail'], ['C403', 'AMC plans'], ['C404', 'Buy AMC'], ['C405', 'Renew AMC'],
    ['C406', 'AMC visit schedule'], ['C407', 'Reschedule an AMC visit'], ['C408', 'Do not renew'] ] },
  { role: 'customer', id: 'C5', name: 'Service requests', screens: [
    ['C501', 'Support hub'], ['C502', 'Service requests list'], ['C503', 'Raise request: machine'],
    ['C504', 'Raise request: service type and issue'], ['C505', 'Raise request: photos and videos'],
    ['C506', 'Raise request: visit details'], ['C507', 'Raise request: review and submit'], ['C508', 'Service request detail'],
    ['C509', 'Estimate approval'], ['C510', 'Reschedule request'], ['C511', 'Cancel request'], ['C512', 'Service report'],
    ['C513', 'Confirm completion'], ['C514', 'Rate the service'], ['C515', 'Reopen request'], ['C516', 'Track engineer'] ] },
  { role: 'customer', id: 'C6', name: 'Questions and help', screens: [
    ['C601', 'Questions list'], ['C602', 'Ask a question'], ['C603', 'Question thread'], ['C604', 'Help and FAQ'],
    ['C605', 'Contact Zixom'], ['C606', 'Complaint or escalation'] ] },
  { role: 'customer', id: 'C7', name: 'Spare parts and orders', screens: [
    ['C701', 'Spare parts home'], ['C702', 'Part list for a machine'], ['C703', 'Part detail'], ['C704', 'Cart'],
    ['C705', 'Checkout'], ['C706', 'Request a part'], ['C707', 'Orders and requests'], ['C708', 'Order or request detail'],
    ['C709', 'Cancel order'], ['C710', 'Report a problem with a delivery'] ] },
  { role: 'customer', id: 'C8', name: 'Payments and invoices', screens: [
    ['C801', 'Payments hub'], ['C802', 'Invoice detail'], ['C803', 'Choose payment method'], ['C804', 'Payment processing'],
    ['C805', 'Payment success'], ['C806', 'Payment failed'], ['C807', 'Payment pending'], ['C808', 'Payment history'],
    ['C809', 'Receipt detail'], ['C810', 'Refunds'], ['C811', 'Billing details'], ['C812', 'Offline payment proof'],
    ['C813', 'Account statement'] ] },
  { role: 'customer', id: 'C9', name: 'Documents', screens: [['C901', 'Documents home'], ['C902', 'Document viewer'], ['C903', 'Upload a document']] },
  { role: 'customer', id: 'C10', name: 'Notifications', screens: [['C1001', 'Notification inbox'], ['C1002', 'Notification settings']] },
  { role: 'customer', id: 'C11', name: 'Profile, company and team', screens: [
    ['C1101', 'More menu'], ['C1102', 'Profile'], ['C1103', 'Company details'], ['C1104', 'Sites and plants'],
    ['C1105', 'Team members'], ['C1107', 'Security'], ['C1108', 'Settings'], ['C1109', 'Legal and policies'],
    ['C1110', 'Delete or deactivate account'], ['C1111', 'Log out'], ['C1112', 'Report a problem'] ] },
  { role: 'customer', id: 'C12', name: 'Product range and enquiry', screens: [
    ['C1201', 'Product range', 2], ['C1202', 'Product detail', 2], ['C1203', 'Enquiry form', 2] ] },
  { role: 'customer', id: 'C13', name: 'Announcements and first run', screens: [
    ['C1301', 'First run tour'], ['C1302', 'Announcements'], ['C1303', 'Announcement detail'], ['C1304', 'What is new'],
    ['C1305', 'Rate the app prompt'] ] },
  { role: 'customer', id: 'C14', name: 'Machine care', screens: [
    ['C1401', 'Running hours log'], ['C1402', 'Add running hours'], ['C1403', 'Machine notes'], ['C1404', 'Add or edit a note'],
    ['C1405', 'Machine operators'], ['C1406', 'Add or edit operator'], ['C1407', 'Machine photos'],
    ['C1408', 'Commissioning and training record'], ['C1409', 'Maintenance schedule', 2], ['C1410', 'Operator care checklist', 2],
    ['C1411', 'Update machine status'], ['C1412', 'Share machine card'] ] },
  { role: 'customer', id: 'C15', name: 'Service extras and emergency', screens: [
    ['C1501', 'Machine down emergency'], ['C1502', 'Urgent request'], ['C1503', 'Service history'], ['C1504', 'Charges explainer'],
    ['C1505', 'Response times'], ['C1506', 'Site picker'], ['C1507', 'Add site'], ['C1508', 'Service drafts'],
    ['C1509', 'Share ticket summary'], ['C1510', 'Visit slot picker'], ['C1511', 'Engineer profile'], ['C1512', 'Call engineer'],
    ['C1513', 'Arrival code', 2] ] },
  { role: 'customer', id: 'C16', name: 'Billing support', screens: [
    ['C1601', 'Dispute a charge'], ['C1602', 'Dispute status'], ['C1603', 'Credit notes'], ['C1604', 'Request invoice correction'],
    ['C1605', 'Saved payment methods', 2], ['C1607', 'Select invoices to pay'], ['C1608', 'Bank transfer details'] ] },
  { role: 'customer', id: 'C17', name: 'Document downloads', screens: [['C1701', 'Downloads'], ['C1702', 'Document versions'], ['C1703', 'Share document']] },
  { role: 'customer', id: 'C18', name: 'Profile and account extras', screens: [
    ['C1113', 'Companies'], ['C1114', 'Change primary contact'], ['C1115', 'Data and privacy'], ['C1116', 'About Zixom'],
    ['C1117', 'Invite sent'] ] },

  { role: 'engineer', id: 'E1', name: 'Today and duty status', screens: [['E101', 'Today'], ['E102', 'Sync queue'], ['E103', 'Duty status sheet']] },
  { role: 'engineer', id: 'E2', name: 'Assigned tickets', screens: [
    ['E201', 'Jobs list'], ['E202', 'Job detail'], ['E203', 'Accept or decline'], ['E204', 'Propose a different time'],
    ['E205', 'Start travel'], ['E206', 'Check in at site'], ['E207', 'Work in progress'], ['E208', 'Put on hold'],
    ['E209', 'Customer not available'], ['E210', 'Complete job'], ['E211', 'Escalate or ask for help'],
    ['E212', 'Request reassignment'], ['E213', 'Notes and comments'], ['E214', 'Reopened job'], ['E215', 'Job cancelled or reassigned'] ] },
  { role: 'engineer', id: 'E3', name: 'Machine history and knowledge', screens: [
    ['E301', 'Machine history'], ['E302', 'Machine detail'], ['E303', 'Find a machine'], ['E304', 'Documents and manuals'],
    ['E305', 'Troubleshooting guides', 2] ] },
  { role: 'engineer', id: 'E4', name: 'Visit report', screens: [
    ['E401', 'Visit report form'], ['E402', 'Parts used picker'], ['E403', 'Customer signature'], ['E404', 'Review and submit'],
    ['E405', 'Submitted report'], ['E406', 'Drafts and unsent reports'], ['E407', 'Create a follow up visit'],
    ['E408', 'Create an estimate on site'] ] },
  { role: 'engineer', id: 'E5', name: 'Spare parts for jobs', screens: [
    ['E501', 'Request parts'], ['E502', 'My parts requests'], ['E503', 'My stock', 2], ['E504', 'Return parts', 2] ] },
  { role: 'engineer', id: 'E7', name: 'Schedule and leave', screens: [['E701', 'Schedule'], ['E702', 'Leave and availability'], ['E703', 'Service area and skills']] },
  { role: 'engineer', id: 'E8', name: 'Inbox, profile and performance', screens: [
    ['E801', 'Inbox'], ['E802', 'Profile'], ['E803', 'Performance'], ['E804', 'Settings'], ['E805', 'Help and training'],
    ['E806', 'Report a problem'], ['E807', 'Log out'] ] },
  { role: 'engineer', id: 'E9', name: 'Safety and site', screens: [
    ['E901', 'Pre work safety checklist'], ['E902', 'Site access and contacts'], ['E903', 'Report a safety incident'],
    ['E904', 'Emergency help'], ['E905', 'Machine hazard notes'], ['E906', 'Site induction acknowledgement'] ] },
  { role: 'engineer', id: 'E10', name: 'Field tools and offline', screens: [
    ['E1001', 'Camera'], ['E1002', 'Annotate photo'], ['E1003', 'Video'], ['E1004', 'Voice to text'], ['E1005', 'Scan'],
    ['E1006', 'Offline data'], ['E1007', 'Sync conflict'], ['E1008', 'Upload queue'], ['E1009', 'End of day summary'],
    ['E1010', 'Weekly summary'], ['E1011', 'Team contacts'], ['E1012', 'Handover notes'], ['E1013', 'Location is off'],
    ['E1014', 'Low storage'], ['E1015', 'Low power mode'] ] },
  { role: 'engineer', id: 'E11', name: 'Job extras', screens: [
    ['E216', 'Job briefing'], ['E217', 'Running late'], ['E218', 'Parts on this job'], ['E219', 'Job timeline'],
    ['E220', 'Job attachments'], ['E221', 'Additional work found'], ['E222', 'Coverage check'], ['E223', 'Customer feedback'] ] },
  { role: 'engineer', id: 'E12', name: 'Report extras', screens: [
    ['E409', 'Report PDF preview'], ['E410', 'Checklist template'], ['E411', 'Recommendations'], ['E412', 'Machine status after visit'],
    ['E413', 'Edit time log'] ] },
  { role: 'engineer', id: 'E13', name: 'Schedule, leave and profile extras', screens: [
    ['E705', 'Holiday calendar'], ['E706', 'Leave detail'], ['E707', 'Change working hours request'],
    ['E808', 'Certifications and training'], ['E809', 'Change phone number request'], ['E810', 'App update notes'],
    ['E811', 'Notification alerts'] ] },
];

/* id -> page path, filled in as screens are built */
ZX.built = {};
