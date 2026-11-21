/* Admin formats, lookups and status chips. Reuses the mobile formats in ZX.render (dates, rupees, escaping)
   and adds the Admin wording from spec section 11, where statuses read differently from the app. */
window.ZXA = window.ZXA || {};

(() => {
  const m = ZX.render;
  const { esc, icon, tag } = m;
  const d = ZX.data;
  const a = ZXA.data;

  /* ---------- lookups across the mobile and admin data ---------- */
  const machines = [...d.machines, ...a.machines];
  const machine = (serial) => machines.find((x) => x.serial === serial);
  const company = (id) => d.companies.find((c) => c.id === id);
  const site = (companyId, siteId) => company(companyId)?.sites.find((s) => s.id === siteId);
  const person = (id) => d.users.find((u) => u.id === id);
  const engineer = (id) => d.engineers.find((e) => e.id === id);

  /* every ticket with its company, site and admin fields */
  const tickets = [
    ...d.tickets.map((t) => {
      const mc = machine(t.machine);
      return { ...t, company: mc.company, site: mc.site, ...a.tickets[t.number] };
    }),
    ...a.extraTickets,
  ].sort((x, y) => y.number.localeCompare(x.number));
  const ticket = (number) => tickets.find((t) => t.number === number);

  /* ---------- status chips, Admin wording (section 11) ---------- */
  const TICKET = {
    'submitted': ['Submitted', 'blue'], 'awaiting-info': ['Awaiting information', 'amber'], 'estimate': ['Estimate shared', 'amber'],
    'assigned': ['Assigned', 'blue'], 'scheduled': ['Scheduled', 'blue'], 'on-the-way': ['On the way', 'blue'],
    'in-progress': ['In progress', 'blue'], 'on-hold': ['On hold', 'amber'], 'completed': ['Pending sign off', 'amber'],
    'closed': ['Closed', 'green'], 'visit-failed': ['Visit failed', 'red'], 'cancelled': ['Cancelled', ''],
    'rejected': ['Rejected', ''], 'reopened': ['Reopened', 'amber'],
  };
  const ticketTag = (status) => tag(...TICKET[status]);
  const ticketLabel = (status) => TICKET[status][0];
  const SEVERITY = { down: ['Machine down', 'red', 'siren'], production: ['Production affected', 'amber'], minor: ['Minor', ''] };
  const SHORT = { down: 'Down', production: 'Production', minor: 'Minor' };
  /* short: table cells, where the column header already says Severity */
  const severityTag = (s, short = false) => {
    if (!s) return '<span class="faint">–</span>';
    const [label, tone, ic] = SEVERITY[s];
    return tag(short ? SHORT[s] : label, tone, ic);
  };
  const COVERAGE = { warranty: ['Warranty', 'green'], amc: ['AMC', 'blue'], chargeable: ['Chargeable', 'outline'] };
  const coverageTag = (c) => tag(...COVERAGE[c]);
  const PRIORITY = { Urgent: 'red', High: 'amber', Normal: '', Low: 'outline' };
  const priorityTag = (p) => tag(p, PRIORITY[p]);
  const SLA_ICON = { ok: 'check-circle', risk: 'clock-countdown', breach: 'warning-circle', none: 'circle-pause' };
  const sla = ([label, state]) => `<span class="sla ${state}">${icon(SLA_ICON[state])}${esc(label)}</span>`;

  /* ---------- numbers ---------- */
  /* KPI style: lakh and crore (spec section 6) */
  const moneyShort = (n) => {
    if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
    if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
    return m.money(n).replace(/\.00$/, '');
  };
  const TREND_ICON = { up: 'arrow-up', down: 'arrow-down', flat: 'minus' };
  const trend = ([dir, value, sense = '']) => `<span class="trend ${dir} ${sense}">${icon(TREND_ICON[dir])}${esc(value)}</span>`;

  /* invoice, Admin wording (section 11): includes draft and partly paid, which the app never shows */
  const INVOICE = { draft: ['Draft', 'outline'], due: ['Due', 'amber'], overdue: ['Overdue', 'red'], processing: ['Processing', 'blue'],
    verification: ['Awaiting verification', 'blue'], partly: ['Partly paid', 'amber'], paid: ['Paid', 'green'], cancelled: ['Cancelled', ''] };
  const invoiceTag = (status) => {
    if (!INVOICE[status]) throw new Error(`Unknown invoice status ${status}`);
    return tag(...INVOICE[status]);
  };

  const avatar = (p, cls = '') => `<span class="avatar ${cls}">${esc(p.initials)}</span>`;
  const time = (iso) => iso.slice(11, 16);

  ZXA.r = { ...m, machines, machine, company, site, person, engineer, tickets, ticket, ticketTag, ticketLabel, severityTag, coverageTag,
    priorityTag, sla, moneyShort, trend, avatar, time, TICKET, invoiceTag, INVOICE };
})();
