(function () {
  "use strict";

  /* ---------------------------------------------------------------
   * CONFIGURACIÓN DEL FORMULARIO
   *
   * 1) Creá el formulario en https://formspree.io y copiá el endpoint
   *    que empieza con https://formspree.io/f/ ...  después pegalo en
   *    el atributo action del <form> en index.html.
   *
   * 2) Para recibir cada consulta en el buzón de la profesional elegida,
   *    creá UN formulario por profesional y agregá acá el mapeo:
   *
   *      var DESTINATARIOS = {
   *        "rivas@estudiorgm.com":    "https://formspree.io/f/ID_DE_RIVAS",
   *        "methol@estudiorgm.com":   "https://formspree.io/f/ID_DE_METHOL",
   *        "gonzalez@estudiorgm.com": "https://formspree.io/f/ID_DE_GONZALEZ"
   *      };
   *
   *    Con el mapeo vacío, todo llega a un único buzón y el campo
   *    "para" indica a quién corresponde cada consulta.
   * --------------------------------------------------------------- */

  var DESTINATARIOS = {};

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var status = document.getElementById("form-status");
  var yearEl = document.getElementById("year");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setNav(open) {
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  navToggle.addEventListener("click", function () {
    setNav(!nav.classList.contains("is-open"));
  });

  Array.prototype.forEach.call(nav.querySelectorAll("a"), function (link) {
    link.addEventListener("click", function () {
      setNav(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setNav(false);
      navToggle.focus();
    }
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var form = document.getElementById("contact-form");

  if (form && status) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var btnLabel = submitBtn.textContent;
    var select = form.querySelector("#destinatario");
    var emailInput = form.querySelector("#email");

    function setStatus(message, kind) {
      status.textContent = message;
      status.className = "form-status form-status--" + kind;
      status.hidden = false;
    }

    function setBusy(busy) {
      submitBtn.disabled = busy;
      submitBtn.textContent = busy ? "Enviando…" : btnLabel;
      form.setAttribute("aria-busy", String(busy));
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var opcion = select.options[select.selectedIndex];
      var para = opcion ? opcion.getAttribute("data-email") : "";

      form.setAttribute("action", DESTINATARIOS[para] || form.getAttribute("action"));

      var data = new FormData(form);
      data.set("para", para);
      data.set("_replyto", emailInput.value);

      setBusy(true);
      status.hidden = true;

      fetch(form.getAttribute("action"), {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          form.reset();
          setStatus(
            "Gracias por tu consulta. Te respondemos a la brevedad.",
            "ok"
          );
        })
        .catch(function () {
          setStatus(
            "No pudimos enviar tu consulta. Revisá tu conexión e intentá de nuevo, " +
              "o escribinos directo por WhatsApp o por correo.",
            "error"
          );
        })
        .then(function () {
          setBusy(false);
        });
    });
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
