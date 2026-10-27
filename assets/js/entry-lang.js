/* Home page: switches the dictionary entry between English and Arabic. */
(function () {
  "use strict";

  var entry = document.getElementById("entry");
  if (!entry) return;

  var buttons = document.querySelectorAll("[data-set-lang]");
  var texts = entry.querySelectorAll("[data-en][data-ar]");

  function setLang(lang) {
    entry.lang = lang;
    entry.dir = lang === "ar" ? "rtl" : "ltr";

    texts.forEach(function (node) {
      node.textContent = node.dataset[lang];
    });

    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.setLang === lang));
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.dataset.setLang);
    });
  });
})();
