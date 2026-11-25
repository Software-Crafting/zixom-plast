/* Password reveal: <button data-ds-input-reveal>. Search clear: <button data-ds-input-clear>. Both inside .ds-input.
   Live search: .ds-input[data-ds-input-search] with a .ds-input__busy spinner. While the person types the box is
   aria-busy and the spinner shows; after a pause (data-ds-input-delay, default 300 ms) it fires "ds-input-search" with
   detail { value } and the clear button returns. For results from a server add data-ds-input-remote: the spinner
   stays until the page calls window.DS.input.done(box). */
(() => {
  const timers = new WeakMap();
  const done = (box) => box.removeAttribute("aria-busy");
  const search = (box, control) => {
    clearTimeout(timers.get(box));
    const value = control.value.trim();
    if (!value) { done(box); box.dispatchEvent(new CustomEvent("ds-input-search", { bubbles: true, detail: { value } })); return; }
    box.setAttribute("aria-busy", "true");
    timers.set(box, setTimeout(() => {
      box.dispatchEvent(new CustomEvent("ds-input-search", { bubbles: true, detail: { value } }));
      if (!box.hasAttribute("data-ds-input-remote")) done(box);
    }, Number(box.dataset.dsInputDelay ?? 300)));
  };
  document.addEventListener("input", (event) => {
    const box = event.target.closest?.("[data-ds-input-search]");
    if (box && event.target.matches(".ds-input__control")) search(box, event.target);
  });
  const controlOf = (button) => {
    const control = button.closest(".ds-input")?.querySelector(".ds-input__control");
    if (!control) throw new Error("input: action button needs a .ds-input__control in the same .ds-input");
    return control;
  };

  const toggleReveal = (button) => {
    const control = controlOf(button);
    const revealed = control.type === "password";
    control.type = revealed ? "text" : "password";
    button.setAttribute("aria-pressed", String(revealed));
    button.querySelector("use").setAttribute("href", revealed ? "#i-eye-off" : "#i-eye");
  };

  const clear = (button) => {
    const control = controlOf(button);
    control.value = "";
    control.dispatchEvent(new Event("input", { bubbles: true }));
    control.focus();
  };

  document.addEventListener("click", (event) => {
    const reveal = event.target.closest("[data-ds-input-reveal]");
    if (reveal) return toggleReveal(reveal);
    const clearButton = event.target.closest("[data-ds-input-clear]");
    if (clearButton) clear(clearButton);
  });
  window.DS = window.DS || {};
  window.DS.input = { done };
})();
