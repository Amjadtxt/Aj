/* Shared helpers: HTML escaping and the project list item template. */
(function (global) {
  "use strict";

  var Aj = (global.Aj = global.Aj || {});

  var ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

  Aj.escapeHtml = function (value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return ESCAPES[c];
    });
  };

  /**
   * Returns the markup for one project entry.
   * With `href` the title is a link (home page); without it, a button that
   * opens the details dialog (portfolio page).
   */
  Aj.renderWork = function (project, href) {
    var e = Aj.escapeHtml;

    var title = href
      ? '<a class="work__link" href="' + e(href) + '">' + e(project.title) + "</a>"
      : '<button class="work__link" type="button" data-project="' + e(project.id) + '">' + e(project.title) + "</button>";

    var tags = (project.tech || []).slice(0, 4).map(function (t) {
      return '<li class="tag">' + e(t) + "</li>";
    }).join("");

    return (
      '<li class="work">' +
        '<div class="work__head">' +
          '<h3 class="work__title">' + title + "</h3>" +
          '<p class="work__kind">' + e(project.category) + "</p>" +
        "</div>" +
        '<p class="work__desc">' + e(project.description) + "</p>" +
        '<ul class="tags">' + tags + "</ul>" +
      "</li>"
    );
  };
})(window);
