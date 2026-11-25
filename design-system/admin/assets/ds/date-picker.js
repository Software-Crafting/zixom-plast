/* Date picker: [data-ds-date-picker] (add data-mode="range" for a range) holding .ds-input with the text input and a
   [data-ds-date-picker-toggle] button, and a .ds-date-picker__popup with a calendar. Needs calendar.js loaded first.
   Range values read "2026-03-10 to 2026-03-16". Presets: buttons with data-ds-date-picker-preset="<value>".
   Clicking the text field opens the calendar and keeps focus in the field, so typing still works;
   the toggle button opens it and moves focus into the grid. A readonly or disabled input never opens the calendar. */
(() => {
  if (!window.DS?.calendar) throw new Error("date-picker: load calendar.js before date-picker.js");
  const { parse } = window.DS.calendar;
  const SEPARATOR = " to ";

  const parts = (root) => {
    const input = root.querySelector(".ds-input__control");
    const toggle = root.querySelector("[data-ds-date-picker-toggle]");
    const popup = root.querySelector(".ds-date-picker__popup");
    const calendar = root.querySelector("[data-ds-calendar]");
    if (!input || !toggle || !popup || !calendar) throw new Error("date-picker: needs an input, a toggle, a popup and a calendar");
    return { input, toggle, popup, calendar, range: root.dataset.mode === "range" };
  };

  /* Text field value to calendar value, or null when it does not parse */
  const toCalendar = (text, range) => {
    const value = text.trim();
    if (!value) return "";
    if (!range) return parse(value) ? value : null;
    const [start, end] = value.split(SEPARATOR).map((part) => part.trim());
    if (!parse(start) || (end && !parse(end)) || (end && end < start)) return null;
    return end ? `${start}/${end}` : `${start}/`;
  };

  /* The popup opens in the top layer (a manual popover), so dialogs, scroll areas and cards never clip it. It sits
     under the field, or above it when there is no room below, and follows the field while the page scrolls. */
  const place = (root) => {
    const { input, popup } = parts(root);
    const rect = (input.closest(".ds-input") ?? input).getBoundingClientRect();
    const below = window.innerHeight - rect.bottom;
    const side = below < popup.offsetHeight + 8 && rect.top > below ? "top" : "bottom";
    popup.dataset.side = side;
    popup.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - popup.offsetWidth - 8))}px`;
    popup.style.top = `${side === "top" ? rect.top - popup.offsetHeight - 4 : rect.bottom + 4}px`;
  };
  const openRoots = new Set();
  const reposition = () => openRoots.forEach(place);
  addEventListener("scroll", reposition, true);
  addEventListener("resize", reposition);

  const open = (root, focusCalendar = true) => {
    const { input, toggle, popup, calendar, range } = parts(root);
    if (input.readOnly || input.disabled) return;
    const value = toCalendar(input.value, range);
    window.DS.calendar.set(calendar, value ?? "");
    if (!popup.hasAttribute("popover")) popup.setAttribute("popover", "manual");
    popup.hidden = false;
    if (!popup.matches(":popover-open")) popup.showPopover();
    openRoots.add(root);
    toggle.setAttribute("aria-expanded", "true");
    place(root);
    if (focusCalendar) window.DS.calendar.focus(calendar);
  };

  const close = (root, refocus) => {
    const { toggle, popup } = parts(root);
    if (popup.hidden) return;
    popup.hidden = true;
    if (popup.matches(":popover-open")) popup.hidePopover();
    openRoots.delete(root);
    toggle.setAttribute("aria-expanded", "false");
    if (refocus) toggle.focus();
  };

  const setValue = (root, text) => {
    const { input } = parts(root);
    input.value = text;
    input.removeAttribute("aria-invalid");
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-ds-date-picker-toggle]");
    if (toggle) {
      const root = toggle.closest("[data-ds-date-picker]");
      return parts(root).popup.hidden ? open(root) : close(root, true);
    }
    const field = event.target.closest("[data-ds-date-picker] .ds-input__control");
    if (field) {
      const root = field.closest("[data-ds-date-picker]");
      if (parts(root).popup.hidden) open(root, false);
      return;
    }
    const preset = event.target.closest("[data-ds-date-picker-preset]");
    if (preset) {
      const root = preset.closest("[data-ds-date-picker]");
      setValue(root, preset.dataset.dsDatePickerPreset);
      return close(root, true);
    }
    // composedPath, not contains: the calendar re-renders on click, detaching event.target.
    const path = event.composedPath();
    document.querySelectorAll("[data-ds-date-picker]").forEach((root) => { if (!path.includes(root)) close(root); });
  });

  document.addEventListener("ds-calendar-change", (event) => {
    const root = event.target.closest("[data-ds-date-picker]");
    if (!root) return;
    const { range } = parts(root);
    const { start, end } = event.detail;
    if (range && !end) return;
    setValue(root, range ? `${start}${SEPARATOR}${end}` : start);
    close(root, true);
  });

  document.addEventListener("change", (event) => {
    const root = event.target.closest("[data-ds-date-picker]");
    if (!root || !event.target.matches(".ds-input__control")) return;
    const valid = toCalendar(event.target.value, parts(root).range) !== null;
    if (valid) event.target.removeAttribute("aria-invalid");
    else event.target.setAttribute("aria-invalid", "true");
  });

  document.addEventListener("keydown", (event) => {
    const root = event.target.closest("[data-ds-date-picker]");
    if (!root) return;
    if (event.key === "Escape" && !parts(root).popup.hidden) {
      event.preventDefault();
      close(root, true);
    } else if (event.key === "ArrowDown" && event.altKey && event.target.matches(".ds-input__control")) {
      event.preventDefault();
      open(root);
    }
  });
})();
