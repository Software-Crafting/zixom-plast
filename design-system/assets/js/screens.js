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

/* Canonical file name of every screen. Links between pages must use these names.
   A page lives at screens/<folder>/<file>.html, folder from ZX.pagePath below. */
ZX.files = Object.fromEntries(`
  A01-splash A02-welcome A03-sign-in A04-verify-otp A05-sign-up A06-find-company A07-verify-machine
  A08-verification-pending A09-verification-rejected A10-complete-profile A11-terms A12-company-picker
  A13-app-lock-setup A14-app-lock A15-session-expired A16-account-suspended A17-engineer-first-sign-in
  A18-accept-invitation A19-change-mobile A20-number-on-two-accounts A21-verify-email A22-security-alert
  A23-device-limit A24-deletion-requested A25-account-deleted
  S01-force-update S02-maintenance S03-no-internet S04-error S05-not-found S06-no-access S07-permission
  S08-invalid-link S09-about S10-storage-full S11-too-many-attempts S12-unsupported-os S13-rooted-warning
  S14-update-available S15-mobile-data S16-wrong-date S17-share-failed S18-opening-link S19-biometric-help
  C101-home C102-search C103-alerts
  C201-machines C202-machine-detail C203-add-machine C204-unlisted-machine C205-scan-qr C206-edit-machine
  C207-machine-history C208-history-entry C209-transfer-machine C210-machine-qr-card
  C301-warranty C302-warranty-details C303-claim-machine C304-claim-problem C305-claim-evidence C306-claim-site
  C307-claim-review C308-claim C309-extend-warranty C310-appeal-claim
  C401-amc C402-amc-contract C403-amc-plans C404-buy-amc C405-renew-amc C406-amc-visits
  C407-reschedule-amc-visit C408-do-not-renew
  C501-support C502-requests C503-raise-machine C504-raise-issue C505-raise-media C506-raise-visit
  C507-raise-review C508-request-detail C509-estimate C510-reschedule C511-cancel-request C512-service-report
  C513-confirm-completion C514-rate-service C515-reopen C516-track
  C601-questions C602-ask C603-thread C604-faq C605-contact C606-complaint
  C701-parts C702-machine-parts C703-part-detail C704-cart C705-checkout C706-request-part C707-orders
  C708-order-detail C709-cancel-order C710-delivery-problem
  C801-payments C802-invoice-detail C803-pay-method C804-payment-processing C805-payment-success
  C806-payment-failed C807-payment-pending C808-payment-history C809-receipt C810-refunds C811-billing-details
  C812-payment-proof C813-statement
  C901-documents C902-document-viewer C903-upload-document
  C1001-notifications C1002-notification-settings
  C1101-more C1102-profile C1103-company C1104-sites C1105-team C1107-security C1108-settings C1109-legal
  C1110-delete-account C1111-log-out C1112-report-problem
  C1201-products C1202-product-detail C1203-enquiry
  C1301-tour C1302-announcements C1303-announcement C1304-whats-new C1305-rate-app
  C1401-running-hours C1402-add-running-hours C1403-machine-notes C1404-edit-note C1405-operators
  C1406-edit-operator C1407-machine-photos C1408-commissioning C1409-maintenance-schedule C1410-care-checklist
  C1411-machine-status C1412-share-machine
  C1501-machine-down C1502-urgent-request C1503-service-history C1504-charges C1505-response-times
  C1506-site-picker C1507-add-site C1508-drafts C1509-share-ticket C1510-slot-picker C1511-engineer-profile
  C1512-call-engineer C1513-arrival-code
  C1601-dispute C1602-dispute-status C1603-credit-notes C1604-invoice-correction C1605-saved-methods
  C1607-select-invoices C1608-bank-transfer
  C1701-downloads C1702-document-versions C1703-share-document
  C1113-companies C1114-change-primary C1115-data-privacy C1116-about-zixom C1117-invite-sent
  E101-today E102-sync-queue E103-duty-status
  E201-jobs E202-job-detail E203-accept-job E204-propose-time E205-start-travel E206-check-in E207-work
  E208-hold E209-customer-unavailable E210-complete-job E211-escalate E212-reassign E213-notes
  E214-reopened-job E215-job-cancelled
  E301-machine-history E302-machine-detail E303-find-machine E304-documents E305-troubleshooting
  E401-report E402-parts-used E403-signature E404-report-review E405-report-submitted E406-drafts
  E407-follow-up E408-estimate
  E501-request-parts E502-parts-requests E503-stock E504-return-parts
  E701-schedule E702-leave E703-skills
  E801-inbox E802-profile E803-performance E804-settings E805-help E806-report-problem E807-log-out
  E901-safety-checklist E902-site-access E903-incident E904-emergency E905-hazards E906-induction
  E1001-camera E1002-annotate E1003-video E1004-voice E1005-scan E1006-offline-data E1007-sync-conflict
  E1008-upload-queue E1009-end-of-day E1010-weekly-summary E1011-team-contacts E1012-handover-notes
  E1013-location-off E1014-low-storage E1015-low-power
  E216-briefing E217-running-late E218-job-parts E219-timeline E220-attachments E221-extra-work
  E222-coverage E223-feedback
  E409-report-preview E410-checklist-template E411-recommendations E412-machine-status E413-time-log
  E705-holidays E706-leave-detail E707-working-hours E808-certifications E809-change-phone
  E810-update-notes E811-alert-sounds
`.trim().split(/\s+/).map((file) => [file.split('-')[0], file]));

const FOLDER = { A: 'access', S: 'system', C: 'customer', E: 'engineer' };
ZX.pagePath = (id) => `screens/${FOLDER[id[0]]}/${ZX.files[id]}.html`;

/* screens that have a page, added as each layer is built */
ZX.built = new Set(`
  A01 A02 A03 A04 A05 A06 A07 A08 A09 A10 A11 A12 A13 A14 A15 A16 A17 A18 A19 A20 A21 A22 A23 A24 A25
  S01 S02 S03 S04 S05 S06 S07 S08 S09 S10 S11 S12 S13 S14 S15 S16 S17 S18 S19
  C101 C102 C103 C201 C202 C203 C204 C205 C206 C207 C208 C209 C501 C502 C503 C504 C505 C506 C507 C508 C509 C510 C511 C512 C513 C514 C515 C516
  C801 C802 C803 C804 C805 C806 C807 C808 C809 C810 C811 C812 C813 C1501 C1502 C1504 C1505 C1506 C1510 C1511
  C1512 C1607 C1608
  C301 C302 C303 C304 C305 C306 C307 C308 C310 C401 C402 C403 C404 C405 C406 C407 C408 C601 C602 C603 C604 C605
  C606 C701 C702 C703 C704 C705 C706 C707 C708 C709 C710 C901 C902 C903 C1001 C1002 C1101 C1102 C1103 C1104 C1105
  C1107 C1108 C1109 C1110 C1111 C1112 C1113 C1114 C1115 C1116 C1117 C1301 C1302 C1303 C1304 C1305 C1401 C1402
  C1403 C1404 C1405 C1406 C1407 C1408 C1411 C1412 C1503 C1507 C1508 C1509 C1601 C1602 C1603 C1604 C1701 C1702 C1703
  E101 E102 E103 E201 E202 E203 E204 E205 E206 E207 E208 E209 E210 E211 E212 E213 E214 E215 E216 E217 E218 E219
  E220 E221 E222 E223 E301 E302 E303 E304 E401 E402 E403 E404 E405 E406 E407 E408 E409 E410 E411 E412 E413 E501
  E502 E701 E702 E703 E705 E706 E707 E801 E802 E803 E804 E805 E806 E807 E808 E809 E810 E811 E901 E902 E903 E904
  E905 E906 E1001 E1002 E1003 E1004 E1005 E1006 E1007 E1008 E1009 E1010 E1011 E1012 E1013 E1014 E1015
`.trim().split(/\s+/));
