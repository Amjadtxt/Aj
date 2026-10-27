/* Home page: renders the first three projects as "Selected work". */
(function () {
  "use strict";

  var list = document.getElementById("featured-works");
  var projects = (window.Aj && window.Aj.projects) || [];
  if (!list) return;

  list.innerHTML = projects.slice(0, 3).map(function (project) {
    return window.Aj.renderWork(project, "portfolio/#" + encodeURIComponent(project.id));
  }).join("");
})();
