/* Contact page: sends the message through the option set in config.js. */
(function () {
  "use strict";

  var config = (window.Aj && window.Aj.config) || {};
  var form = document.getElementById("contact-form");
  var status = document.getElementById("contact-status");
  if (!form) return;

  function show(message) {
    status.textContent = message;
    status.hidden = false;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);

    if (config.formEndpoint) {
      fetch(config.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      }).then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        form.reset();
        show("Thanks " + data.get("name") + ", your message is on its way.");
      }).catch(function () {
        show("The message could not be sent. Please try the links instead.");
      });
      return;
    }

    if (config.contactEmail) {
      var subject = "Message from " + data.get("name");
      var body = data.get("message") + "\n\n" + data.get("name") + " (" + data.get("email") + ")";
      window.location.href = "mailto:" + config.contactEmail +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      show("Opening your mail app…");
      return;
    }

    show("The form is not connected yet. Please reach out through the links on this page.");
  });
})();
