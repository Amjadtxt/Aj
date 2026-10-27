/* Portfolio page: category filter, search, and project details dialog. */
(function () {
  "use strict";

  var Aj = window.Aj;
  var projects = Aj.projects || [];
  var e = Aj.escapeHtml;

  var tabsEl = document.getElementById("category-tabs");
  var searchEl = document.getElementById("search");
  var listEl = document.getElementById("project-list");
  var emptyEl = document.getElementById("empty");
  var countEl = document.getElementById("count");
  var dialog = document.getElementById("project-dialog");

  var activeCategory = "All";

  function categories() {
    var unique = projects.map(function (p) { return p.category; })
      .filter(function (c, i, all) { return c && all.indexOf(c) === i; });
    return ["All"].concat(unique);
  }

  function renderTabs() {
    tabsEl.innerHTML = categories().map(function (c) {
      return '<button class="tab" type="button" data-category="' + e(c) +
        '" aria-pressed="' + (c === activeCategory) + '">' + e(c) + "</button>";
    }).join("");
  }

  function filtered() {
    var query = searchEl.value.trim().toLowerCase();
    return projects.filter(function (p) {
      var inCategory = activeCategory === "All" || p.category === activeCategory;
      var haystack = [p.title, p.description].concat(p.tech || []).join(" ").toLowerCase();
      return inCategory && (!query || haystack.indexOf(query) !== -1);
    });
  }

  function renderList() {
    var items = filtered();
    listEl.innerHTML = items.map(function (p) { return Aj.renderWork(p); }).join("");
    emptyEl.hidden = items.length > 0;
    countEl.textContent = items.length + (items.length === 1 ? " project" : " projects");
  }

  function openProject(id) {
    var p = projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;

    document.getElementById("dialog-kind").textContent = p.category + (p.status ? ", " + p.status : "");
    document.getElementById("dialog-title").textContent = p.title;
    document.getElementById("dialog-desc").textContent = p.description;
    document.getElementById("dialog-tags").innerHTML = (p.tech || []).map(function (t) {
      return '<li class="tag">' + e(t) + "</li>";
    }).join("");

    var link = document.getElementById("dialog-link");
    link.hidden = !p.link;
    if (p.link) link.href = p.link;

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id) openProject(id);
  }

  tabsEl.addEventListener("click", function (event) {
    var tab = event.target.closest("[data-category]");
    if (!tab) return;
    activeCategory = tab.dataset.category;
    renderTabs();
    renderList();
  });

  searchEl.addEventListener("input", renderList);

  listEl.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-project]");
    if (trigger) openProject(trigger.dataset.project);
  });

  // Click on the backdrop closes the dialog
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  // Keep the URL tidy once the dialog is closed
  dialog.addEventListener("close", function () {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  });

  window.addEventListener("hashchange", openFromHash);

  renderTabs();
  renderList();
  openFromHash();
})();
