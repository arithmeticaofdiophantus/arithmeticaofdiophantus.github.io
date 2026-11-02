// Idioma / Language: "en" (por defecto) o "es". Se recuerda en el navegador y se avisa a la página con el evento "langchange".
(function () {
  let lang = "en";
  try { lang = localStorage.getItem("diofanto-idioma") === "es" ? "es" : "en"; } catch (e) {}
  function apply() {
    document.documentElement.lang = lang;
    document.body.classList.toggle("lang-en", lang === "en");
    document.body.classList.toggle("lang-es", lang === "es");
    document.querySelectorAll(".langsw button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false"));
    if (!window.__titleEs) window.__titleEs = document.title;   // el título del HTML está en castellano
    const es = window.__titleEs;
    document.title = lang === "es" ? es : es.replace("Diofanto", "Diophantus").replace("Aritmética", "Arithmetica")
      .replace(/Libro (\S+) árabe/, "Arabic Book $1").replace("Libro", "Book").replace("Sobre los números poligonales", "On Polygonal Numbers");
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
  window.getLang = () => lang;
  document.addEventListener("click", ev => {
    const b = ev.target.closest(".langsw button");
    if (!b) return;
    lang = b.dataset.lang === "en" ? "en" : "es";
    try { localStorage.setItem("diofanto-idioma", lang); } catch (e) {}
    apply();
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply); else apply();
})();

// Enlace de contacto: la dirección se monta al cargar la página
document.querySelectorAll("a.mail").forEach(a => {
  const addr = a.dataset.u + "@" + a.dataset.d;
  a.href = "mailto:" + addr + "?subject=" + encodeURIComponent("Diofanto · Aritmética");
  a.textContent = addr;
});

// Portada: la lectura moderna de la ecuación de II.8 aparece término a término una sola vez
(function () {
  const n = document.querySelector(".notation");
  if (!n || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
  n.classList.add("anim");
  const raf = window.requestAnimationFrame || (f => setTimeout(f, 16));
  raf(() => raf(() => n.classList.add("on")));
})();

// Problema al azar: uno de los 290 problemas de los diez libros
(function () {
  const BOOKS = [["libro-1.html", "i", 39], ["libro-2.html", "ii", 35], ["libro-3.html", "iii", 21],
    ["libro-a4.html", "a4", 44], ["libro-a5.html", "a5", 16], ["libro-a6.html", "a6", 23], ["libro-a7.html", "a7", 18],
    ["libro-4.html", "iv", 40], ["libro-5.html", "v", 30], ["libro-6.html", "vi", 24]];
  document.addEventListener("click", ev => {
    const a = ev.target.closest(".random-problem");
    if (!a) return;
    ev.preventDefault();
    let k = Math.floor(Math.random() * BOOKS.reduce((t, b) => t + b[2], 0));
    let b = BOOKS[0];
    for (const x of BOOKS) { if (k < x[2]) { b = x; break; } k -= x[2]; }
    const id = b[1] + "-" + (k + 1);
    if (window.__route) {                       // versión en un solo archivo
      try { history.pushState(null, "", "#" + id); } catch (e) {}
      window.__route(id);
    } else location.href = b[0] + "#" + id;
  });
})();

// Buzón de sugerencias: envía a Formspree; si no es posible (sin conexión, o en un visor que lo bloquea), prepara el correo
(function () {
  const ENDPOINT = "https://formspree.io/f/myeenrbe";
  const T = {
    es: { title: "Buzón de sugerencias", intro: "Correcciones, comentarios o ideas para la web. El mensaje llega directamente al autor.",
          pid: "Problema (opcional)", ph: "p. ej. II.8", name: "Nombre (opcional)", email: "Tu correo (opcional, para poder responderte)",
          msg: "Mensaje", send: "Enviar", cancel: "Cancelar", close: "Cerrar", sending: "Enviando…",
          thanks: "¡Gracias! Tu mensaje se ha enviado.", fallback: "No se ha podido enviar desde aquí; se abrirá tu programa de correo con el mensaje preparado.",
          subj: "Sugerencia", sugg: "Sugerencia sobre" },
    en: { title: "Suggestion box", intro: "Corrections, comments or ideas for the site. Your message goes straight to the author.",
          pid: "Problem (optional)", ph: "e.g. II.8", name: "Name (optional)", email: "Your e-mail (optional, so the author can reply)",
          msg: "Message", send: "Send", cancel: "Cancel", close: "Close", sending: "Sending…",
          thanks: "Thank you! Your message has been sent.", fallback: "It could not be sent from here; your e-mail program will open with the message ready.",
          subj: "Suggestion", sugg: "Suggestion about" } };
  const ADDR = ["enrique.gonzalez.jimenez", "uam.es"];
  function lang() { return window.getLang ? window.getLang() : "en"; }
  function subject(pid) { const t = T[lang()]; return "Diophantus · Arithmetica · " + (pid ? t.sugg + " " + pid : t.subj); }
  function mailto(pid, name, msg) {
    const body = msg + (name ? "\n\n— " + name : "");
    return "mailto:" + ADDR.join("@") + "?subject=" + encodeURIComponent(subject(pid)) + "&body=" + encodeURIComponent(body);
  }
  function build() {
    let d = document.getElementById("sugg-box");
    if (d) return d;
    d = document.createElement("dialog"); d.id = "sugg-box"; d.className = "sugg-box";
    d.innerHTML = '<form><h2></h2><p class="sb-intro"></p>' +
      '<label><span class="sb-pid"></span><input name="problem" autocomplete="off"></label>' +
      '<label><span class="sb-name"></span><input name="name" autocomplete="name"></label>' +
      '<label><span class="sb-email"></span><input name="email" type="email" autocomplete="email"></label>' +
      '<label><span class="sb-msg"></span><textarea name="message" rows="6" required></textarea></label>' +
      '<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="sb-hp" aria-hidden="true">' +
      '<p class="sb-status" role="status"></p>' +
      '<p class="sb-actions"><button type="button" class="sb-cancel"></button><button type="submit" class="sb-send"></button></p></form>';
    document.body.appendChild(d);
    d.querySelector(".sb-cancel").addEventListener("click", () => d.close());
    d.querySelector("form").addEventListener("submit", async ev => {
      ev.preventDefault();
      const f = ev.target, t = T[lang()], st = d.querySelector(".sb-status"), send = d.querySelector(".sb-send");
      const pid = f.problem.value.trim(), name = f.name.value.trim(), msg = f.message.value.trim();
      if (send.dataset.done) { d.close(); return; }
      send.disabled = true; st.textContent = t.sending;
      const data = new FormData(f);
      data.append("_subject", subject(pid)); data.append("page", location.href); data.append("language", lang());
      try {
        const r = await fetch(ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error(r.status);
        st.textContent = t.thanks; f.querySelectorAll("label").forEach(l => l.hidden = true);
        d.querySelector(".sb-cancel").hidden = true; send.textContent = t.close; send.dataset.done = "1";
      } catch (e) {
        st.textContent = t.fallback;
        setTimeout(() => { location.href = mailto(pid, name, msg); }, 1200);
      } finally { send.disabled = false; }
    });
    return d;
  }
  function fill(d) {
    const t = T[lang()];
    d.querySelector("h2").textContent = t.title; d.querySelector(".sb-intro").textContent = t.intro;
    d.querySelector(".sb-pid").textContent = t.pid; d.querySelector("input[name=problem]").placeholder = t.ph;
    d.querySelector(".sb-name").textContent = t.name; d.querySelector(".sb-email").textContent = t.email;
    d.querySelector(".sb-msg").textContent = t.msg;
    d.querySelector(".sb-send").textContent = t.send; d.querySelector(".sb-cancel").textContent = t.cancel;
  }
  document.addEventListener("click", ev => {
    const a = ev.target.closest(".open-box");
    if (!a) return;
    ev.preventDefault();
    const pid = a.dataset.pid || "";
    const d = build();
    if (typeof d.showModal !== "function") { location.href = mailto(pid, "", ""); return; }
    const f = d.querySelector("form");
    f.reset(); f.querySelectorAll("label").forEach(l => l.hidden = false);
    d.querySelector(".sb-status").textContent = ""; d.querySelector(".sb-cancel").hidden = false;
    delete d.querySelector(".sb-send").dataset.done;
    fill(d); f.problem.value = pid;
    d.showModal(); d.querySelector(pid ? "textarea" : "input[name=problem]").focus();
  });
})();

// Modo nocturno: alterna entre claro y oscuro; por defecto sigue la preferencia del sistema
(function () {
  const root = document.documentElement;
  const mq = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  const current = () => root.getAttribute("data-theme") || (mq && mq.matches ? "dark" : "light");
  const LBL = { en: { dark: "Dark mode", light: "Light mode" }, es: { dark: "Modo nocturno", light: "Modo claro" } };
  function paint() {
    const dark = current() === "dark", l = LBL[window.getLang ? window.getLang() : "en"];
    document.querySelectorAll(".themesw").forEach(b => {
      b.textContent = dark ? "\u2600\uFE0E" : "\u263E";          // sol para volver a claro, luna para pasar a oscuro
      const t = dark ? l.light : l.dark;
      b.setAttribute("aria-label", t); b.title = t;
    });
  }
  document.addEventListener("click", ev => {
    if (!ev.target.closest(".themesw")) return;
    const next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("diofanto-tema", next); } catch (e) {}
    paint();
  });
  if (mq && mq.addEventListener) mq.addEventListener("change", paint);
  document.addEventListener("langchange", paint);
  paint();
})();
