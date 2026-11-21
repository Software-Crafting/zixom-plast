/* Documents demo data (D1401 to D1410). The uploaded library matches what the app lists in Documents (C901);
   applies: ['model', 'AFM-760'] for every machine of a model, ['machine', serial] or ['company', id].
   generated: files the system makes from records (service reports, invoices, AMC contracts, quotations). */
window.ZXA = window.ZXA || {};

ZXA.data.documents = [
  { id: 'afm760-manual', title: 'AFM-760 operating manual', type: 'Manual', applies: ['model', 'AFM-760'], version: '3.2', mb: 48, date: '2026-11-20',
    language: 'English', visible: true, downloads: 14, file: 'AFM-760-manual-v3.2.pdf', status: 'active',
    versions: [['3.2', '2026-11-20', 48, 'Heater zone chapter rewritten'], ['3.1', '2025-06-24', 46, 'First issue for this series']] },
  { id: 'afm1000-manual', title: 'AFM-1000 operating manual', type: 'Manual', applies: ['model', 'AFM-1000'], version: '2.0', mb: 52, date: '2025-11-20',
    language: 'English', visible: true, downloads: 9, file: 'AFM-1000-manual-v2.0.pdf', status: 'active', versions: [['2.0', '2025-11-20', 52, 'First issue']] },
  { id: 'afm1000-wiring', title: 'AFM-1000 wiring diagram', type: 'Datasheet', applies: ['machine', 'ZP-TF-2204'], version: '1.1', mb: 6, date: '2026-02-10',
    language: 'English', visible: true, downloads: 5, file: 'ZP-TF-2204-wiring.pdf', status: 'active',
    versions: [['1.1', '2026-02-10', 6, 'Chain drive interlock added'], ['1.0', '2025-12-05', 6, 'As commissioned']] },
  { id: 'afm1000-warranty', title: 'Warranty certificate, ZP-TF-2204', type: 'Certificate', applies: ['machine', 'ZP-TF-2204'], version: '1.0', mb: 0.4, date: '2025-12-05',
    language: 'English', visible: true, downloads: 3, file: 'ZP-TF-2204-warranty.pdf', status: 'active', versions: [['1.0', '2025-12-05', 0.4, 'Issued at commissioning']] },
  { id: 'afm760-parts', title: 'AFM-760 parts list', type: 'Datasheet', applies: ['model', 'AFM-760'], version: '1.4', mb: 2, date: '2025-06-24',
    language: 'English', visible: true, downloads: 21, file: 'AFM-760-parts-v1.4.xlsx', status: 'active', versions: [['1.4', '2025-06-24', 2, 'Prices removed']] },
  { id: 'afm760-commissioning', title: 'Commissioning report, ZP-TF-2310', type: 'Report', applies: ['machine', 'ZP-TF-2310'], version: '1.0', mb: 1.2, date: '2025-06-24',
    language: 'English', visible: true, downloads: 2, file: 'ZP-TF-2310-commissioning.pdf', status: 'active', versions: [['1.0', '2025-06-24', 1.2, 'Signed by Rakesh Mehta']] },
  { id: 'cfm450-manual', title: 'CFM-450 operating manual', type: 'Manual', applies: ['model', 'CFM-450'], version: '1.3', mb: 31, date: '2024-08-02',
    language: 'English', visible: true, downloads: 11, file: 'CFM-450-manual-v1.3.pdf', status: 'active', versions: [['1.3', '2024-08-02', 31, 'Mould change steps']] },
  { id: 'svf600-datasheet', title: 'SVF-600 datasheet', type: 'Datasheet', applies: ['model', 'SVF-600'], version: '1.0', mb: 0.9, date: '2024-03-11',
    language: 'English', visible: true, downloads: 4, file: 'SVF-600-datasheet.pdf', status: 'active', versions: [['1.0', '2024-03-11', 0.9, 'First issue']] },
  { id: 'range-brochure', title: 'Thermoforming range brochure 2026', type: 'Brochure', applies: ['all', ''], version: '2026', mb: 8.5, date: '2026-04-01',
    language: 'English', visible: true, downloads: 37, file: 'Zixom-thermoforming-2026.pdf', status: 'active', versions: [['2026', '2026-04-01', 8.5, 'New AFM-650']] },
  { id: 'nova-gst', title: 'GST registration, Nova Cups', type: 'Certificate', applies: ['company', 'nova'], version: '1.0', mb: 0.3, date: '2026-01-15',
    language: 'English', visible: false, downloads: 0, file: 'nova-gst.pdf', status: 'active', versions: [['1.0', '2026-01-15', 0.3, 'Uploaded by Admin']] },
  { id: 'bsm300-manual-hi', title: 'BSM-300 operating manual, Hindi', type: 'Manual', applies: ['model', 'BSM-300'], version: '1.0', mb: 18, date: '2026-11-23',
    language: 'Hindi', visible: false, downloads: 0, file: 'BSM-300-manual-hi.pdf', status: 'scanning', versions: [['1.0', '2026-11-23', 18, 'Translation, being checked']] },
  { id: 'afm500-manual', title: 'AFM-500 operating manual', type: 'Manual', applies: ['model', 'AFM-500'], version: '1.0', mb: 40, date: '2022-01-10',
    language: 'English', visible: false, downloads: 6, file: 'AFM-500-manual.pdf', status: 'archived', archived: '2026-09-14', versions: [['1.0', '2022-01-10', 40, 'Model discontinued']] },
];

ZXA.data.generated = [
  { kind: 'Service report', number: 'SR-2026-0128', record: 'TKT-2026-0128', page: 'D413', query: '?t=TKT-2026-0128', company: 'shree', when: '2026-11-21T17:05', kb: 820, status: 'ready', template: 'Service report v4' },
  { kind: 'Service report', number: 'SR-2026-0129', record: 'TKT-2026-0129', page: 'D403', query: '?t=TKT-2026-0129', company: 'shree', when: '2026-10-28T15:40', kb: 710, status: 'ready', template: 'Service report v4' },
  { kind: 'Service report', number: 'SR-2026-0117', record: 'TKT-2026-0117', page: 'D403', query: '?t=TKT-2026-0117', company: 'shree', when: '2026-11-14T17:30', kb: 640, status: 'ready', template: 'Service report v4' },
  { kind: 'Quotation', number: 'QT-2026-0041', record: 'TKT-2026-0122', page: 'D403', query: '?t=TKT-2026-0122', company: 'shree', when: '2026-11-23T09:30', kb: 310, status: 'ready', template: 'Estimate v2' },
  { kind: 'AMC contract', number: 'AMC-2026-0010', record: 'AMC-2026-0010', page: 'D602', query: '?amc=AMC-2026-0010', company: 'shree', when: '2026-04-01T10:00', kb: 600, status: 'ready', template: 'AMC contract v2' },
  { kind: 'AMC contract', number: 'AMC-2026-0011', record: 'AMC-2026-0011', page: 'D602', query: '?amc=AMC-2026-0011', company: 'shree', when: '2025-12-21T10:00', kb: 590, status: 'ready', template: 'AMC contract v1' },
  { kind: 'AMC contract', number: 'AMC-2026-0012', record: 'AMC-2026-0012', page: 'D602', query: '?amc=AMC-2026-0012', company: 'shree', when: '2026-11-20T12:10', kb: 0, status: 'failed', template: 'AMC contract v2',
    error: 'Could not create the PDF. Template field {machine_list} is empty.' },
  { kind: 'AMC contract', number: 'AMC-2026-0014', record: 'AMC-2026-0014', page: 'D602', query: '?amc=AMC-2026-0014', company: 'shree', when: '2025-11-20T10:00', kb: 580, status: 'ready', template: 'AMC contract v1' },
  /* invoices from ZX.data.invoices are added by the page; drafts have no PDF */
];
