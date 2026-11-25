/* Copied from the Software Crafting design system. Zixom change: "today" and "now" come from DS.now() when a page sets it
   (the prototype's demo date), otherwise the clock. */
/* Time picker: [data-ds-time-picker] holding .ds-input with an input.ds-input__control and a
   [data-ds-time-picker-toggle] button, plus an empty .ds-time-picker__popup that this script fills.
   Options: data-step (minutes, default 15), data-hour-cycle="12" for AM and PM, data-min and data-max ("09:00").
   The field shows "HH:MM", or "HH:MM AM" with a 12-hour cycle; typing "930", "9:30" or "9.30 pm" is understood.
   Clicking the text field opens the columns and keeps focus in the field for typing; the toggle moves focus into them.
   A readonly or disabled input never opens the columns. */
(() => {
  const pad = (number) => String(number).padStart(2, "0");
  const toMinutes = (text) => {
    const match = String(text).trim().toLowerCase().replace(/\./g, "").match(/^(\d{1,2}):?(\d{2})?\s*(a|p)?m?$/);
    if (!match) return null;
    let hours = Number(match[1]);
    const minutes = Number(match[2] ?? 0);
    if (match[3] && (hours < 1 || hours > 12)) return null;
    if (match[3] === "p" && hours < 12) hours += 12;
    if (match[3] === "a" && hours === 12) hours = 0;
    return hours < 24 && minutes < 60 ? hours * 60 + minutes : null;
  };
  const format = (total, twelve) => {
    const hours = Math.floor(total / 60);
    return twelve ? `${pad(hours % 12 || 12)}:${pad(total % 60)} ${hours < 12 ? "AM" : "PM"}` : `${pad(hours)}:${pad(total % 60)}`;
  };

  const parts = (root) => {
    const input = root.querySelector(".ds-input__control");
    const toggle = root.querySelector("[data-ds-time-picker-toggle]");
    const popup = root.querySelector(".ds-time-picker__popup");
    if (!input || !toggle || !popup) throw new Error("time-picker: needs an input, a [data-ds-time-picker-toggle] and a .ds-time-picker__popup");
    return { input, toggle, popup };
  };
  const settings = (root) => ({
    step: Number(root.dataset.step || 15),
    twelve: root.dataset.hourCycle === "12",
    min: toMinutes(root.dataset.min ?? "00:00"),
    max: toMinutes(root.dataset.max ?? "23:59"),
  });

  const column = (root, kind, label, items) => {
    const id = `${root.id || (root.id = `ds-tp-${Math.random().toString(36).slice(2, 8)}`)}-${kind}`;
    const options = items.map(([value, text]) => `<li class="ds-time-picker__option" role="option" id="${id}-${value}" data-value="${value}" aria-selected="false">${text}</li>`).join("");
    return `<div class="ds-time-picker__column"><div class="ds-time-picker__label" id="${id}-label">${label}</div>
      <div class="ds-scroll-area" data-ds-scroll-area><ul class="ds-time-picker__list ds-scroll ds-scroll--y" role="listbox" tabindex="0" data-kind="${kind}" aria-labelledby="${id}-label">${options}</ul></div></div>`;
  };

  const build = (root) => {
    const { popup } = parts(root);
    const { step, twelve } = settings(root);
    const hours = twelve ? Array.from({ length: 12 }, (_, index) => [index === 0 ? 12 : index, pad(index === 0 ? 12 : index)]) : Array.from({ length: 24 }, (_, index) => [index, pad(index)]);
    const minutes = Array.from({ length: Math.ceil(60 / step) }, (_, index) => [index * step, pad(index * step)]);
    popup.innerHTML = `<div class="ds-time-picker__columns">${column(root, "hour", "Hour", hours)}${column(root, "minute", "Min", minutes)}${twelve ? column(root, "period", "", [["am", "AM"], ["pm", "PM"]]) : ""}</div>
      <div class="ds-time-picker__foot"><button type="button" class="ds-btn ds-btn--ghost ds-btn--sm" data-ds-time-picker-now>Now</button><button type="button" class="ds-btn ds-btn--primary ds-btn--sm" data-ds-time-picker-done>Done</button></div>`;
  };

  /* Selected parts from the input value */
  const current = (root) => {
    const { twelve } = settings(root);
    const total = toMinutes(parts(root).input.value) ?? settings(root).min;
    const hours = Math.floor(total / 60);
    return { hour: twelve ? (hours % 12 || 12) : hours, minute: total % 60, period: hours < 12 ? "am" : "pm" };
  };
  const compose = (root, chosen) => {
    const { twelve } = settings(root);
    let hours = Number(chosen.hour);
    if (twelve) hours = (hours % 12) + (chosen.period === "pm" ? 12 : 0);
    return hours * 60 + Number(chosen.minute);
  };

  const sync = (root, center) => {
    const chosen = current(root);
    const { min, max } = settings(root);
    for (const list of parts(root).popup.querySelectorAll("[role=listbox]")) {
      const kind = list.dataset.kind;
      for (const option of list.querySelectorAll("[role=option]")) {
        const selected = String(chosen[kind]) === option.dataset.value;
        option.setAttribute("aria-selected", String(selected));
        option.toggleAttribute("data-active", selected);
        const candidate = compose(root, { ...chosen, [kind]: option.dataset.value });
        option.setAttribute("aria-disabled", String(kind !== "period" && (candidate < min || candidate > max)));
        if (selected) {
          list.setAttribute("aria-activedescendant", option.id);
          if (center) list.scrollTop = option.offsetTop - list.clientHeight / 2 + option.offsetHeight / 2;
        }
      }
    }
  };

  const setValue = (root, total, center = false) => {
    const { input } = parts(root);
    const { min, max, twelve } = settings(root);
    input.value = format(Math.max(min, Math.min(max, total)), twelve);
    input.removeAttribute("aria-invalid");
    input.dispatchEvent(new Event("change", { bubbles: true }));
    sync(root, center);
  };

  /* Zixom change: the popup opens in the top layer (a manual popover) like the date picker and select, so dialogs
     and scroll areas never clip it, and follows the field while the page scrolls. */
  const place = (root) => {
    const { input, popup } = parts(root);
    const rect = (input.closest(".ds-input") ?? input).getBoundingClientRect();
    const below = innerHeight - rect.bottom;
    const side = below < popup.offsetHeight + 8 && rect.top > below ? "top" : "bottom";
    popup.dataset.side = side;
    popup.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - popup.offsetWidth - 8))}px`;
    popup.style.top = `${side === "top" ? rect.top - popup.offsetHeight - 4 : rect.bottom + 4}px`;
  };
  const openRoots = new Set();
  addEventListener("scroll", () => openRoots.forEach(place), true);
  addEventListener("resize", () => openRoots.forEach(place));

  const open = (root, focusColumns = true) => {
    const { toggle, popup, input } = parts(root);
    if (input.readOnly || input.disabled) return;
    if (!popup.firstElementChild) build(root);
    if (!popup.hasAttribute("popover")) popup.setAttribute("popover", "manual");
    popup.hidden = false;
    if (!popup.matches(":popover-open")) popup.showPopover();
    openRoots.add(root);
    toggle.setAttribute("aria-expanded", "true");
    place(root);
    sync(root, true);
    if (focusColumns) popup.querySelector("[role=listbox]").focus();
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

  const choose = (root, option) => {
    if (option.getAttribute("aria-disabled") === "true") return;
    const kind = option.closest("[role=listbox]").dataset.kind;
    setValue(root, compose(root, { ...current(root), [kind]: option.dataset.value }));
  };

  document.addEventListener("click", (event) => {
    const root = event.target.closest("[data-ds-time-picker]");
    const path = event.composedPath();
    document.querySelectorAll("[data-ds-time-picker]").forEach((other) => { if (!path.includes(other)) close(other); });
    if (!root) return;
    if (event.target.closest("[data-ds-time-picker-toggle]")) return parts(root).popup.hidden ? open(root) : close(root, true);
    if (event.target === parts(root).input) return parts(root).popup.hidden && open(root, false);
    if (event.target.closest("[data-ds-time-picker-done]")) return close(root, true);
    if (event.target.closest("[data-ds-time-picker-now]")) {
      const now = window.DS?.now?.() ?? new Date();
      const { step } = settings(root);
      return setValue(root, now.getHours() * 60 + Math.round(now.getMinutes() / step) * step % 60, true);
    }
    const option = event.target.closest(".ds-time-picker__option");
    if (option) choose(root, option);
  });

  document.addEventListener("keydown", (event) => {
    const root = event.target.closest("[data-ds-time-picker]");
    if (!root) return;
    if (event.key === "Escape" && !parts(root).popup.hidden) {
      event.preventDefault();
      return close(root, true);
    }
    if (event.target.matches(".ds-input__control") && event.key === "ArrowDown" && event.altKey) {
      event.preventDefault();
      return open(root);
    }
    const list = event.target.closest(".ds-time-picker__list");
    if (!list) return;
    const options = [...list.querySelectorAll("[role=option]:not([aria-disabled=true])")];
    const index = options.indexOf(list.querySelector("[aria-selected=true]"));
    const moves = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: options.length - 1, PageDown: index + 4, PageUp: index - 4 };
    if (event.key in moves) {
      event.preventDefault();
      choose(root, options[Math.max(0, Math.min(options.length - 1, moves[event.key]))]);
      sync(root, true);
    } else if (event.key === "Enter") {
      event.preventDefault();
      close(root, true);
    }
  });

  document.addEventListener("change", (event) => {
    const root = event.target.closest("[data-ds-time-picker]");
    if (!root || !event.target.matches(".ds-input__control") || !event.isTrusted) return;
    const total = toMinutes(event.target.value);
    if (total === null) return event.target.value.trim() ? event.target.setAttribute("aria-invalid", "true") : null;
    setValue(root, total);
  });
})();
