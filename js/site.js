(function () {
  "use strict";

  var C = window.ELETROSILVA || {};
  var PLACEHOLDER = /X{3,}|PREENCHER|FORM_ENDPOINT|^$/i;

  function isReal(value) {
    return typeof value === "string" && value.trim() !== "" && !PLACEHOLDER.test(value);
  }

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function norm(str) {
    return String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  function track(event, params) {
    var payload = Object.assign({ event: event }, params || {});
    window.dataLayer.push(payload);
    if (typeof window.gtag === "function" && isReal(C.ga4Id)) {
      window.gtag("event", event, params || {});
    }
  }

  function fireAdsConversion() {
    if (!isReal(C.adsId) || !isReal(C.adsLabel)) return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", {
      send_to: C.adsId + "/" + C.adsLabel,
    });
  }

  function loadTracking() {
    if (isReal(C.gtmId)) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(C.gtmId);
      document.head.appendChild(s);
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    }
    if (isReal(C.ga4Id) || isReal(C.adsId)) {
      var g = document.createElement("script");
      g.async = true;
      g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(isReal(C.ga4Id) ? C.ga4Id : C.adsId);
      document.head.appendChild(g);
      window.gtag("js", new Date());
      if (isReal(C.ga4Id)) window.gtag("config", C.ga4Id);
      if (isReal(C.adsId)) window.gtag("config", C.adsId);
    }
  }

  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "gclid"];

  function captureUtms() {
    var params = new URLSearchParams(window.location.search);
    var stored = {};
    try {
      stored = JSON.parse(sessionStorage.getItem("es_utm") || "{}");
    } catch (e) {
      stored = {};
    }
    UTM_KEYS.forEach(function (k) {
      var v = params.get(k);
      if (v) stored[k] = v;
    });
    sessionStorage.setItem("es_utm", JSON.stringify(stored));
    return stored;
  }

  function utmQuery() {
    var stored = {};
    try {
      stored = JSON.parse(sessionStorage.getItem("es_utm") || "{}");
    } catch (e) {
      stored = {};
    }
    return stored;
  }

  function utmText() {
    var u = utmQuery();
    var parts = [];
    UTM_KEYS.forEach(function (k) {
      if (u[k]) parts.push(k + "=" + u[k]);
    });
    return parts.length ? " | origem: " + parts.join(" ") : "";
  }

  function waUrl(message) {
    var text = encodeURIComponent(message + utmText());
    var num = isReal(C.whatsapp) ? C.whatsapp.replace(/\D/g, "") : "";
    if (!num) return "#contato";
    return "https://wa.me/" + num + "?text=" + text;
  }

  function telHref() {
    if (!isReal(C.phoneTel) && !isReal(C.phoneDisplay)) return "#contato";
    var raw = isReal(C.phoneTel) ? C.phoneTel : C.phoneDisplay;
    var digits = String(raw).replace(/\D/g, "");
    if (!digits) return "#contato";
    if (digits.length <= 11) digits = "55" + digits;
    return "tel:+" + digits;
  }

  function fillConfig() {
    $all("[data-fill]").forEach(function (el) {
      var key = el.getAttribute("data-fill");
      if (C[key] == null) return;
      if (isReal(C[key])) {
        el.textContent = C[key];
        return;
      }
      var hide = el.closest("[data-optional]") || el.closest(".stat");
      if (hide) hide.hidden = true;
    });
    $all("[data-href=phone]").forEach(function (el) {
      el.setAttribute("href", telHref());
    });
    $all("[data-href=email]").forEach(function (el) {
      if (!isReal(C.email)) {
        var row = el.closest("[data-email-row]") || el.closest("li") || el;
        row.hidden = true;
        return;
      }
      el.hidden = false;
      el.setAttribute("href", "mailto:" + C.email);
    });
    $all("[data-href=instagram]").forEach(function (el) {
      if (!isReal(C.instagram)) {
        el.hidden = true;
        return;
      }
      el.hidden = false;
      el.setAttribute("href", C.instagram);
    });
    $all("[data-wa]").forEach(function (el) {
      var ctx = el.getAttribute("data-wa") || "Olá! Vim pelo site e preciso de um orçamento.";
      el.setAttribute("href", waUrl(ctx));
    });
  }

  var KW_MAP = {
    "eletricista rio de janeiro": "Eletricista no Rio de Janeiro: residencial, predial e industrial",
    "eletricista rj": "Eletricista RJ: instalação e manutenção elétrica no Rio",
    "eletricista predial rio de janeiro": "Eletricista predial no Rio de Janeiro: condomínios e edifícios",
    "instalacao eletrica residencial": "Instalação Elétrica Residencial no Rio de Janeiro",
    "instalacao eletrica residencial rio de janeiro": "Instalação Elétrica Residencial no Rio de Janeiro",
    "instalacao eletrica predial": "Instalação Elétrica Predial no Rio de Janeiro",
    "instalacao eletrica industrial": "Instalação Elétrica Industrial no Rio de Janeiro",
    "instalacao eletrica industrial rio de janeiro": "Instalação Elétrica Industrial no Rio de Janeiro",
    "montagem de painel eletrico": "Montagem de Painel Elétrico no Rio de Janeiro",
    "montagem painel eletrico": "Montagem de Painel Elétrico no RJ",
    "montagem de painel eletrico rj": "Montagem de Painel Elétrico no RJ",
    "padrao eletrico": "Instalação de Padrão Elétrico Light no Rio de Janeiro",
    "padrao eletrico light": "Padrão elétrico Light no Rio de Janeiro: do projeto à ligação",
    "padrao de entrada light": "Padrão de Entrada Light no Rio de Janeiro",
    "automacao residencial": "Automação Residencial no Rio de Janeiro",
    "automacao residencial rio de janeiro": "Automação Residencial no Rio de Janeiro",
    "automacao predial": "Automação Predial no Rio de Janeiro",
    "automacao industrial": "Automação Industrial no Rio de Janeiro",
    "manutencao de motores eletricos": "Manutenção de Motores Elétricos no Rio de Janeiro",
    "manutencao de motores eletricos rj": "Manutenção de Motores Elétricos no RJ",
    "reforma quadro eletrico": "Reforma de Quadro e PC Elétrico no Rio de Janeiro",
    "reforma pc eletrico": "Reforma de PC Elétrico no Rio de Janeiro",
    "sistemas inteligentes": "Sistemas Inteligentes para Casa e Prédio no Rio de Janeiro",
    "instalacao de motores eletricos": "Instalação de Motores Elétricos no Rio de Janeiro",
  };

  function applyHeadline() {
    var h1 = $("[data-dynamic-h1]");
    if (!h1) return;
    var kw = new URLSearchParams(window.location.search).get("kw");
    if (!kw) return;
    var mapped = KW_MAP[norm(kw)];
    if (mapped) h1.textContent = mapped;
  }

  function bindHeader() {
    var header = $(".header");
    var btn = $(".menu-btn");
    var mobile = $(".nav-mobile");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-compact", window.scrollY > 12);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (btn && mobile) {
      btn.addEventListener("click", function () {
        var open = !mobile.classList.contains("is-open");
        mobile.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $all("a", mobile).forEach(function (a) {
        a.addEventListener("click", function () {
          mobile.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function bindClicks() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (href.indexOf("wa.me") !== -1 || a.hasAttribute("data-wa")) {
        track("click_whatsapp", { page: location.pathname });
        fireAdsConversion();
      }
      if (href.indexOf("tel:") === 0) {
        track("click_phone", { page: location.pathname });
        fireAdsConversion();
      }
    });
  }

  function bindFaq() {
    $all(".faq-item").forEach(function (item) {
      var btn = $("button", item);
      var panel = $(".faq-panel", item);
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  function bindReveal() {
    var nodes = $all(".reveal");
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (n) {
        n.classList.add("is-in");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  function bindScroll75() {
    var sent = false;
    window.addEventListener(
      "scroll",
      function () {
        if (sent) return;
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        if (window.scrollY / max >= 0.75) {
          sent = true;
          track("scroll_75", { page: location.pathname });
        }
      },
      { passive: true }
    );
  }

  function bindFloatWa() {
    var el = $(".wa-float");
    if (!el) return;
    window.addEventListener(
      "scroll",
      function () {
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        var ratio = max > 0 ? window.scrollY / max : 0;
        el.classList.toggle("is-visible", ratio >= 0.25);
      },
      { passive: true }
    );
  }

  function bindLightbox() {
    var box = $(".lightbox");
    if (!box) return;
    var title = $(".lightbox-title", box);
    var body = $(".lightbox-body", box);
    var close = $(".lightbox-close", box);
    function hide() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
    }
    $all("[data-lightbox]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        title.textContent = btn.getAttribute("data-title") || "Obra";
        body.textContent = btn.getAttribute("data-caption") || "";
        box.classList.add("is-open");
        box.setAttribute("aria-hidden", "false");
        close.focus();
      });
    });
    close.addEventListener("click", hide);
    box.addEventListener("click", function (e) {
      if (e.target === box) hide();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") hide();
    });
  }

  function maskPhone(value) {
    var d = value.replace(/\D/g, "").slice(0, 11);
    if (d.length === 0) return "";
    if (d.length <= 2) return "(" + d;
    if (d.length <= 7) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  }

  function validPhone(value) {
    var d = value.replace(/\D/g, "");
    return d.length === 11 && d.slice(0, 2) === "21" && d.charAt(2) === "9";
  }

  function setInvalid(field, on) {
    field.classList.toggle("is-invalid", on);
    var input = $("input, select, textarea", field);
    if (input) input.setAttribute("aria-invalid", on ? "true" : "false");
  }

  function bindForm() {
    var form = $("#lead-form");
    if (!form) return;
    var started = false;
    var t0 = Date.now();
    var phone = $("#f-whatsapp");
    if (phone) {
      phone.addEventListener("input", function () {
        var pos = phone.selectionStart;
        var before = phone.value;
        phone.value = maskPhone(phone.value);
        if (document.activeElement === phone && pos === before.length) {
          phone.setSelectionRange(phone.value.length, phone.value.length);
        }
      });
    }
    var utm = utmQuery();
    UTM_KEYS.forEach(function (k) {
      var hidden = document.getElementById("f-" + k);
      if (hidden && utm[k]) hidden.value = utm[k];
    });
    form.addEventListener(
      "focusin",
      function () {
        if (started) return;
        started = true;
        track("form_start", { page: location.pathname });
      },
      true
    );

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var nome = $("#f-nome");
      var wa = $("#f-whatsapp");
      var serv = $("#f-servico");
      var perfil = $("#f-perfil");
      var lgpd = $("#f-lgpd");
      var hp = $("#f-website");

      setInvalid(nome.closest(".field"), !nome.value.trim() || nome.value.trim().length < 2);
      if (!nome.value.trim() || nome.value.trim().length < 2) ok = false;

      setInvalid(wa.closest(".field"), !validPhone(wa.value));
      if (!validPhone(wa.value)) ok = false;

      setInvalid(serv.closest(".field"), !serv.value);
      if (!serv.value) ok = false;

      setInvalid(perfil.closest(".field"), !perfil.value);
      if (!perfil.value) ok = false;

      setInvalid(lgpd.closest(".field"), !lgpd.checked);
      if (!lgpd.checked) ok = false;

      if (hp && hp.value) return;
      if (Date.now() - t0 < 4000) {
        ok = false;
        alert("Aguarde um instante e envie novamente.");
      }
      if (!ok) return;

      var utm = utmQuery();
      var payload = {
        nome: nome.value.trim(),
        whatsapp: wa.value.trim(),
        servico: serv.value,
        perfil: perfil.value,
        bairro: $("#f-bairro").value,
        mensagem: $("#f-mensagem").value.trim(),
        page: location.pathname,
        utm: utm,
      };

      window.dataLayer.push({
        event: "generate_lead",
        service_type: payload.servico,
        client_profile: payload.perfil,
      });
      track("form_submit", { service_type: payload.servico, client_profile: payload.perfil });

      var btn = $("button[type=submit]", form);
      btn.classList.add("is-loading");
      btn.textContent = "Enviando…";

      function goThanks() {
        window.location.href = (form.getAttribute("data-thanks") || "obrigado.html") + "?ok=1";
      }

      if (isReal(C.formEndpoint)) {
        fetch(C.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        })
          .then(function (res) {
            if (!res.ok) throw new Error("fail");
            goThanks();
          })
          .catch(function () {
            mailtoFallback(payload);
            goThanks();
          });
      } else {
        mailtoFallback(payload);
        goThanks();
      }
    });
  }

  function mailtoFallback(payload) {
    try {
      sessionStorage.setItem("es_lead", JSON.stringify(payload));
    } catch (err) {}
    if (!isReal(C.email)) return;
    var lines = [
      "Nome: " + payload.nome,
      "WhatsApp: " + payload.whatsapp,
      "Serviço: " + payload.servico,
      "Perfil: " + payload.perfil,
      "Bairro: " + payload.bairro,
      "Mensagem: " + payload.mensagem,
      "Página: " + payload.page,
      "UTM: " + JSON.stringify(payload.utm),
    ];
    var href =
      "mailto:" +
      encodeURIComponent(C.email) +
      "?subject=" +
      encodeURIComponent("Orçamento ELETROSILVA") +
      "&body=" +
      encodeURIComponent(lines.join("\n"));
    window.open(href, "_blank", "noopener");
  }

  function bindThanks() {
    if (document.body.getAttribute("data-page") !== "obrigado") return;
    track("generate_lead", { page: "obrigado" });
    fireAdsConversion();
  }

  function viewService() {
    var slug = document.body.getAttribute("data-service");
    if (slug) track("view_service_" + slug, { page: location.pathname });
  }

  loadTracking();
  captureUtms();
  fillConfig();
  applyHeadline();
  bindHeader();
  bindClicks();
  bindFaq();
  bindReveal();
  bindScroll75();
  bindFloatWa();
  bindLightbox();
  bindForm();
  bindThanks();
  viewService();
})();
