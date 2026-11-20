/* Formatting and HTML templates for components that show data.
   Each template returns a string; a page puts it where it needs it. */
window.ZX = window.ZX || {};

(() => {
  const { data } = ZX;
  const DAY_MS = 86400000;

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (name, cls = '') => `<svg class="ic ${cls}" aria-hidden="true"><use href="#ph-${name}"/></svg>`;

  /* ---------- formats (spec section 6) ---------- */
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const toDate = (iso) => new Date(`${iso.slice(0, 10)}T00:00:00`);
  const date = (iso) => { const d = toDate(iso); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
  const dayDate = (iso) => { const d = toDate(iso); return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`; };
  const daysFromToday = (iso) => Math.round((toDate(iso) - toDate(data.today)) / DAY_MS);
  /* relative time for recent items: 12 min ago, 3 h ago, Yesterday, then the date */
  const ago = (isoDateTime) => {
    const minutes = Math.round((new Date(data.now) - new Date(isoDateTime)) / 60000);
    if (minutes < 60) return `${Math.max(1, minutes)} min ago`;
    if (minutes < 24 * 60 && isoDateTime.slice(0, 10) === data.today) return `${Math.round(minutes / 60)} h ago`;
    const days = -daysFromToday(isoDateTime);
    if (days === 1) return 'Yesterday';
    return days < 7 ? DAYS[toDate(isoDateTime).getDay()] : dayDate(isoDateTime);
  };
  /* invoice and estimate maths: lines are [description, quantity, rate before GST] */
  const GST_RATE = 0.18;
  const totals = (lines) => {
    const subtotal = lines.reduce((sum, [, quantity, rate]) => sum + quantity * rate, 0);
    const gst = Math.round(subtotal * GST_RATE * 100) / 100;
    return { subtotal, gst, total: subtotal + gst };
  };
  const balance = (invoice) => invoice.amount - (invoice.paid || 0);
  const money = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  const count = (n) => (n > 99 ? '99+' : String(n));

  /* ---------- lookups ---------- */
  const machine = (serial) => data.machines.find((m) => m.serial === serial);
  const engineer = (id) => data.engineers.find((e) => e.id === id);
  const amc = (number) => data.amc.find((a) => a.number === number);

  /* ---------- status to tag ---------- */
  const tag = (label, tone = '', iconName = '') => `<span class="tag ${tone}">${iconName ? icon(iconName) : ''}${esc(label)}</span>`;

  const TICKET_STATUS = {
    'submitted': ['Received', 'blue'], 'awaiting-info': ['We need more information', 'amber'],
    'estimate': ['Estimate ready', 'amber'], 'assigned': ['Engineer assigned', 'blue'],
    'scheduled': ['Visit scheduled', 'blue'], 'on-the-way': ['Engineer on the way', 'blue'],
    'in-progress': ['Work in progress', 'blue'], 'on-hold': ['On hold', 'amber'],
    'completed': ['Please confirm', 'amber'], 'closed': ['Resolved', 'green'],
    'visit-failed': ['Visit could not be completed', 'red'], 'cancelled': ['Cancelled', ''],
    'reopened': ['Reopened', 'amber'],
  };
  const ticketTag = (status) => tag(...TICKET_STATUS[status]);

  const COVERAGE = { warranty: ['Warranty', 'green'], amc: ['Under AMC', 'blue'], chargeable: ['Chargeable', ''] };
  const coverageTag = (coverage) => tag(...COVERAGE[coverage]);

  const SEVERITY = { down: ['Machine down', 'red', 'siren'], production: ['Production affected', 'amber', 'warning'], minor: ['Minor', '', ''] };
  const severityTag = (severity) => (severity ? tag(...SEVERITY[severity]) : '');

  const warrantyTag = (m) => {
    if (m.status === 'pending') return tag('Pending verification', '', 'hourglass');
    const left = daysFromToday(m.warrantyEnd);
    if (left < 0) return tag('Out of warranty');
    if (left <= 30) return tag(`Warranty ends in ${left} days`, 'amber');
    return tag(`In warranty, ${left} days left`, 'green', 'shield-check');
  };

  const amcTag = (m) => {
    if (!m.amc) return '';
    const contract = amc(m.amc);
    const left = daysFromToday(contract.end);
    if (contract.status === 'expired') return tag(`AMC expired ${-left} days ago`, 'red');
    if (left <= 60) return tag(`AMC ends in ${left} days`, 'amber');
    return tag('Under AMC', 'blue');
  };

  const STOCK = { in: ['In stock', 'green'], low: ['Low stock', 'amber'], out: ['Out of stock', 'red'],
    request: ['On request', ''], discontinued: ['Discontinued', ''] };
  const stockTag = (stock) => tag(...STOCK[stock]);

  const INVOICE_STATUS = { due: ['Due', 'amber'], overdue: ['Overdue', 'red'], paid: ['Paid', 'green'],
    processing: ['Processing', 'blue'], verification: ['Awaiting verification', ''] };
  const invoiceTag = (status) => tag(...INVOICE_STATUS[status]);

  /* ---------- machine type to placeholder icon ---------- */
  const MACHINE_ICON = { 'Thermoforming machine': 'factory', 'Cup forming machine': 'cube',
    'Vacuum forming machine': 'stack', 'Plastic crusher': 'gear-six' };
  const thumb = (m, size = '') => `<span class="thumb ${size}" aria-hidden="true">${icon(MACHINE_ICON[m.type] || 'factory')}</span>`;

  /* ---------- components ---------- */
  /* a ticket is open until it is closed or cancelled; visit failed waits for a reschedule (spec section 11) */
  const isOpen = (ticket) => !['closed', 'cancelled'].includes(ticket.status);
  const openTickets = (serial) => data.tickets.filter((t) => t.machine === serial && isOpen(t)).length;

  const machineCard = (m, href = '#') => {
    const open = openTickets(m.serial);
    return `<a class="machine" href="${esc(href)}">
      ${thumb(m)}
      <span class="info">
        <h3>${esc(m.model)}</h3>
        ${m.nickname ? `<p class="nick">${esc(m.nickname)}</p>` : ''}
        <p class="serial mono">${esc(m.serial)}</p>
      </span>
      ${open ? `<span class="badge" aria-label="${open} open requests">${icon('wrench')}${open}</span>` : ''}
      <span class="tags">${warrantyTag(m)}${amcTag(m)}</span>
    </a>`;
  };

  const ticketCard = (t, href = '#') => {
    const m = machine(t.machine);
    const eng = t.engineer ? engineer(t.engineer) : null;
    const when = t.window ? `${dayDate(t.window.date)}, ${t.window.slot}` : `Raised ${dayDate(t.created)}`;
    return `<a class="ticket" href="${esc(href)}">
      <span class="top"><span class="num mono">${esc(t.number)}</span>${ticketTag(t.status)}</span>
      <h3>${esc(m.nickname || m.model)}</h3>
      <p>${esc(t.summary)}</p>
      <span class="row-flex">${coverageTag(t.coverage)}${severityTag(t.severity)}</span>
      <span class="foot">
        <span>${icon('calendar-blank')}${esc(when)}</span>
        ${eng ? `<span>${icon('user')}${esc(eng.name)}</span>` : ''}
      </span>
    </a>`;
  };

  const engineerCard = (e) => `<div class="person">
      <span class="avatar">${esc(e.initials)}</span>
      <span class="grow"><b>${esc(e.name)}</b>
        <span>${esc(e.designation)} · <span class="rating">${icon('star')}${e.rating}</span></span></span>
      <a class="icon-btn dark" href="tel:${esc(e.phone.replace(/\s/g, ''))}" aria-label="Call ${esc(e.name)}">${icon('phone')}</a>
    </div>`;

  const alertCard = (a) => `<a class="alert-card ${a.tone}" href="${esc(a.href)}">
      <span class="disc">${icon(a.icon)}</span><b>${esc(a.title)}</b>
      <span${a.mono ? ' class="mono"' : ''}>${esc(a.sub)}</span>${icon('caret-right', 'ic-16')}</a>`;

  ZX.render = { isOpen, esc, icon, tag, date, dayDate, daysFromToday, ago, money, count, alertCard, totals, balance, machine, engineer, amc,
    ticketTag, coverageTag, severityTag, warrantyTag, amcTag, stockTag, invoiceTag, thumb,
    machineCard, ticketCard, engineerCard };
})();
