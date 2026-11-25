/* Copied from the Software Crafting design system. Zixom change: "today" and "now" come from DS.now() when a page sets it
   (the prototype's demo date), otherwise the clock. */
/* Date grid. <div class="ds-calendar" data-ds-calendar> with optional data-mode="range", data-value="2026-03-14"
   (range: "2026-03-10/2026-03-16"), data-min, data-max, data-month="2026-03", data-week-start (0 Sunday, default 1 Monday).
   Fires "ds-calendar-change" with detail { value, start, end } as ISO dates. Keyboard follows the WAI-ARIA date grid.
   The month and year buttons in the header open pickers over the grid; arrows page a year (months) or 12 years (years). */
(() => {
  const iso = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const parse = (text) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(text ?? "")) return null;
    const [y, m, d] = text.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return iso(date) === text ? date : null;
  };
  const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
  const addMonths = (date, months) => {
    const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
    const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), last));
  };
  const lang = () => document.documentElement.lang || undefined;

  const state = new WeakMap();

  const read = (root) => {
    const [start, end] = (root.dataset.value || "").split("/").map(parse);
    const today = window.DS?.now?.() ?? new Date();
    const month = root.dataset.month ? parse(`${root.dataset.month}-01`) : start ?? today;
    return { start, end, focus: start ?? new Date(month.getFullYear(), month.getMonth(), Math.min(today.getDate(), 28)), min: parse(root.dataset.min), max: parse(root.dataset.max), view: "days", enter: false };
  };
  const YEARS_PER_PAGE = 12;
  const clamp = (s, date) => (s.min && date < s.min ? s.min : s.max && date > s.max ? s.max : date);

  const disabled = (s, date) => (s.min && date < s.min) || (s.max && date > s.max);

  const render = (root, focusDay = false) => {
    const s = state.get(root);
    const weekStart = Number(root.dataset.weekStart ?? 1);
    const first = new Date(s.focus.getFullYear(), s.focus.getMonth(), 1);
    const gridStart = addDays(first, -((first.getDay() - weekStart + 7) % 7));
    const title = new Intl.DateTimeFormat(lang(), { month: "long", year: "numeric" }).format(first);
    const monthName = new Intl.DateTimeFormat(lang(), { month: "long" });
    const dayLabel = new Intl.DateTimeFormat(lang(), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const weekday = new Intl.DateTimeFormat(lang(), { weekday: "short" });
    const weekdayLong = new Intl.DateTimeFormat(lang(), { weekday: "long" });
    const todayIso = iso(window.DS?.now?.() ?? new Date());
    const id = root.id || (root.id = `ds-cal-${Math.random().toString(36).slice(2, 8)}`);
    const year = first.getFullYear();
    const nav = {
      days: { step: "month", prevOff: s.min && new Date(year, first.getMonth(), 0) < s.min, nextOff: s.max && addMonths(first, 1) > s.max },
      months: { step: "year", prevOff: s.min && year - 1 < s.min.getFullYear(), nextOff: s.max && year + 1 > s.max.getFullYear() },
      years: { step: "12 years", prevOff: s.min && s.yearPage - 1 < s.min.getFullYear(), nextOff: s.max && s.yearPage + YEARS_PER_PAGE > s.max.getFullYear() },
    }[s.view];

    let rows = "";
    for (let week = 0; week < 6; week++) {
      rows += "<tr>";
      for (let day = 0; day < 7; day++) {
        const date = addDays(gridStart, week * 7 + day);
        const key = iso(date);
        const attrs = [`data-date="${key}"`, `aria-label="${dayLabel.format(date)}"`, `tabindex="${key === iso(s.focus) ? 0 : -1}"`];
        if (date.getMonth() !== first.getMonth()) attrs.push("data-outside");
        if (key === todayIso) attrs.push('aria-current="date"');
        if (disabled(s, date)) attrs.push("disabled");
        const isStart = s.start && key === iso(s.start);
        const isEnd = s.end && key === iso(s.end);
        if (isStart || isEnd) attrs.push("data-selected");
        if (s.start && s.end && date > s.start && date < s.end) attrs.push("data-in-range");
        if (root.dataset.mode === "range" && isStart && s.end) attrs.push("data-range-start");
        if (root.dataset.mode === "range" && isEnd) attrs.push("data-range-end");
        rows += `<td class="ds-calendar__cell" role="gridcell" aria-selected="${Boolean(isStart || isEnd)}"><button type="button" class="ds-calendar__day" ${attrs.join(" ")}>${date.getDate()}</button></td>`;
      }
      rows += "</tr>";
    }
    const heads = Array.from({ length: 7 }, (_, i) => addDays(gridStart, i)).map((date) => `<th class="ds-calendar__weekday" scope="col" abbr="${weekdayLong.format(date)}">${weekday.format(date)}</th>`).join("");
    const chevron = '<svg class="ds-icon ds-icon--sm" aria-hidden="true"><use href="#i-chevron-down"/></svg>';
    const trigger = (view, text, label) => `<button type="button" class="ds-calendar__pick" data-ds-calendar-view="${view}" aria-label="${label}" aria-haspopup="listbox" aria-expanded="${s.view === view}" aria-controls="${id}-picker">${text}${chevron}</button>`;
    root.innerHTML = `
      <div class="ds-calendar__head">
        <button type="button" class="ds-calendar__nav" data-ds-calendar-move="-1" aria-label="Previous ${nav.step}"${nav.prevOff ? " disabled" : ""}><svg class="ds-icon ds-icon--sm" aria-hidden="true"><use href="#i-chevron-left"/></svg></button>
        <div class="ds-calendar__title">
          <span class="ds-sr-only" id="${id}-title" aria-live="polite">${title}</span>
          ${trigger("months", monthName.format(first), `Choose month, ${monthName.format(first)}`)}${trigger("years", year, `Choose year, ${year}`)}
        </div>
        <button type="button" class="ds-calendar__nav" data-ds-calendar-move="1" aria-label="Next ${nav.step}"${nav.nextOff ? " disabled" : ""}><svg class="ds-icon ds-icon--sm" aria-hidden="true"><use href="#i-chevron-right"/></svg></button>
      </div>
      <table class="ds-calendar__grid" role="grid" aria-labelledby="${id}-title"${s.view === "days" ? "" : " inert"}><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>
      ${s.view === "days" ? "" : picker(s, id, first)}`;
    s.enter = false;
    if (focusDay) root.querySelector(`[data-date="${iso(s.focus)}"]`)?.focus();
  };

  /* Month or year options over the grid. Selected and focusable option first gets tabindex 0. */
  const picker = (s, id, first) => {
    const year = first.getFullYear();
    const monthName = new Intl.DateTimeFormat(lang(), { month: "short" });
    const options = s.view === "months"
      ? Array.from({ length: 12 }, (_, month) => ({
        value: month, text: monthName.format(new Date(year, month, 1)), selected: month === first.getMonth(),
        off: (s.min && new Date(year, month + 1, 0) < s.min) || (s.max && new Date(year, month, 1) > s.max),
      }))
      : Array.from({ length: YEARS_PER_PAGE }, (_, i) => {
        const value = s.yearPage + i;
        return { value, text: value, selected: value === year, off: (s.min && value < s.min.getFullYear()) || (s.max && value > s.max.getFullYear()) };
      });
    const current = options.find((option) => option.selected && !option.off) ?? options.find((option) => !option.off);
    const items = options.map((option) => `<button type="button" class="ds-calendar__option" role="option" data-ds-calendar-pick="${option.value}" aria-selected="${option.selected}" tabindex="${option === current ? 0 : -1}"${option.off ? " disabled" : ""}>${option.text}</button>`).join("");
    return `<div class="ds-calendar__picker" id="${id}-picker" role="listbox" aria-label="${s.view === "months" ? "Months" : "Years"}"${s.enter ? " data-enter" : ""}>${items}</div>`;
  };

  const openPicker = (root, view) => {
    const s = state.get(root);
    s.view = view;
    s.yearPage = s.focus.getFullYear() - 4; // selected year lands in the second row
    s.enter = true;
    render(root);
    root.querySelector('.ds-calendar__option[tabindex="0"]')?.focus();
  };

  /* Springs out, then the day grid comes back; focus returns to the trigger or the focused day */
  const closePicker = (root, focus) => {
    const s = state.get(root);
    const panel = root.querySelector(".ds-calendar__picker");
    const view = s.view;
    const finish = () => {
      s.view = "days";
      render(root, focus === "day");
      if (focus === "trigger") root.querySelector(`[data-ds-calendar-view="${view}"]`)?.focus();
    };
    if (!panel) return finish();
    panel.setAttribute("data-leave", "");
    panel.addEventListener("animationend", finish, { once: true });
  };

  const emit = (root) => {
    const s = state.get(root);
    const start = s.start ? iso(s.start) : "";
    const end = s.end ? iso(s.end) : "";
    root.dataset.value = root.dataset.mode === "range" ? (start ? `${start}/${end}` : "") : start;
    root.dispatchEvent(new CustomEvent("ds-calendar-change", { bubbles: true, detail: { value: root.dataset.value, start, end } }));
  };

  const select = (root, date) => {
    const s = state.get(root);
    if (disabled(s, date)) return;
    if (root.dataset.mode === "range") {
      if (!s.start || s.end || date < s.start) { s.start = date; s.end = null; } else { s.end = date; }
    } else {
      s.start = date;
    }
    s.focus = date;
    render(root, true);
    emit(root);
  };

  const init = (root) => {
    state.set(root, read(root));
    render(root);
  };

  /* Public API for components that host a calendar, such as the date picker */
  window.DS = window.DS || {};
  window.DS.calendar = {
    set(root, value) { root.dataset.value = value; state.set(root, read(root)); render(root); },
    focus(root) { render(root, true); },
    parse, iso,
  };

  document.addEventListener("click", (event) => {
    const root = event.target.closest("[data-ds-calendar]");
    if (!root) return;
    const s = state.get(root);
    const move = event.target.closest("[data-ds-calendar-move]");
    if (move) {
      const step = Number(move.dataset.dsCalendarMove);
      if (s.view === "years") s.yearPage += step * YEARS_PER_PAGE;
      else s.focus = addMonths(s.focus, s.view === "months" ? step * 12 : step);
      render(root);
      root.querySelector(`[data-ds-calendar-move="${move.dataset.dsCalendarMove}"]`).focus();
      return;
    }
    const view = event.target.closest("[data-ds-calendar-view]");
    if (view) return s.view === view.dataset.dsCalendarView ? closePicker(root, "trigger") : openPicker(root, view.dataset.dsCalendarView);
    const pick = event.target.closest("[data-ds-calendar-pick]");
    if (pick) {
      const value = Number(pick.dataset.dsCalendarPick);
      const { focus } = s;
      const target = s.view === "months" ? new Date(focus.getFullYear(), value, 1) : new Date(value, focus.getMonth(), 1);
      const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
      s.focus = clamp(s, new Date(target.getFullYear(), target.getMonth(), Math.min(focus.getDate(), last)));
      return closePicker(root, "day");
    }
    const day = event.target.closest(".ds-calendar__day");
    if (day) select(root, parse(day.dataset.date));
  });

  document.addEventListener("keydown", (event) => {
    const option = event.target.closest?.("[data-ds-calendar] .ds-calendar__option");
    const pickerRoot = event.target.closest?.("[data-ds-calendar]");
    if (pickerRoot && event.key === "Escape" && state.get(pickerRoot)?.view !== "days") {
      event.preventDefault();
      event.stopImmediatePropagation(); // close the picker only, not a date picker popup around it
      return closePicker(pickerRoot, "trigger");
    }
    if (option) {
      const options = [...option.parentElement.querySelectorAll(".ds-calendar__option:not(:disabled)")];
      const all = [...option.parentElement.children];
      const index = all.indexOf(option);
      const steps = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 };
      let next = null;
      if (steps[event.key] !== undefined) next = all[index + steps[event.key]];
      else if (event.key === "Home") next = options[0];
      else if (event.key === "End") next = options.at(-1);
      if (next && !next.disabled) {
        event.preventDefault();
        option.tabIndex = -1;
        next.tabIndex = 0;
        next.focus();
      } else if (steps[event.key] !== undefined) {
        event.preventDefault();
      }
      return;
    }
    const day = event.target.closest("[data-ds-calendar] .ds-calendar__day");
    if (!day) return;
    const root = day.closest("[data-ds-calendar]");
    const s = state.get(root);
    const current = parse(day.dataset.date);
    const weekStart = Number(root.dataset.weekStart ?? 1);
    const offset = (current.getDay() - weekStart + 7) % 7;
    const moves = {
      ArrowLeft: () => addDays(current, -1), ArrowRight: () => addDays(current, 1),
      ArrowUp: () => addDays(current, -7), ArrowDown: () => addDays(current, 7),
      Home: () => addDays(current, -offset), End: () => addDays(current, 6 - offset),
      PageUp: () => addMonths(current, event.shiftKey ? -12 : -1), PageDown: () => addMonths(current, event.shiftKey ? 12 : 1),
    };
    if (moves[event.key]) {
      event.preventDefault();
      s.focus = moves[event.key]();
      render(root, true);
    }
  });

  document.querySelectorAll("[data-ds-calendar]").forEach(init);
})();
