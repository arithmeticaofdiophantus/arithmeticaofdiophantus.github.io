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

// Buzón de sugerencias: un formulario que prepara el correo (la web es estática, sin servidor)
(function () {
  const T = {
    es: { title: "Buzón de sugerencias", intro: "Correcciones, comentarios o ideas para la web. Al enviar se abrirá tu programa de correo con el mensaje preparado.",
          pid: "Problema (opcional)", ph: "p. ej. II.8", name: "Nombre (opcional)", msg: "Mensaje", send: "Preparar el correo", cancel: "Cancelar", subj: "Sugerencia", sugg: "Sugerencia sobre" },
    en: { title: "Suggestion box", intro: "Corrections, comments or ideas for the site. Sending will open your e-mail program with the message ready.",
          pid: "Problem (optional)", ph: "e.g. II.8", name: "Name (optional)", msg: "Message", send: "Prepare the e-mail", cancel: "Cancel", subj: "Suggestion", sugg: "Suggestion about" } };
  const ADDR = ["enrique.gonzalez.jimenez", "uam.es"];
  function lang() { return window.getLang ? window.getLang() : "en"; }
  function mailto(pid, name, msg) {
    const t = T[lang()];
    const subject = "Diophantus · Arithmetica · " + (pid ? t.sugg + " " + pid : t.subj);
    const body = msg + (name ? "\n\n— " + name : "");
    return "mailto:" + ADDR.join("@") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }
  function build() {
    let d = document.getElementById("sugg-box");
    if (d) return d;
    d = document.createElement("dialog"); d.id = "sugg-box"; d.className = "sugg-box";
    d.innerHTML = '<form method="dialog"><h2></h2><p class="sb-intro"></p>' +
      '<label><span class="sb-pid"></span><input name="pid" autocomplete="off"></label>' +
      '<label><span class="sb-name"></span><input name="name" autocomplete="name"></label>' +
      '<label><span class="sb-msg"></span><textarea name="msg" rows="6" required></textarea></label>' +
      '<p class="sb-actions"><button value="cancel" formnovalidate class="sb-cancel"></button><button value="send" class="sb-send"></button></p></form>';
    document.body.appendChild(d);
    d.querySelector("form").addEventListener("submit", ev => {
      if (ev.submitter && ev.submitter.value === "cancel") return;
      const f = ev.target;
      location.href = mailto(f.pid.value.trim(), f.name.value.trim(), f.msg.value.trim());
    });
    return d;
  }
  function fill(d) {
    const t = T[lang()];
    d.querySelector("h2").textContent = t.title; d.querySelector(".sb-intro").textContent = t.intro;
    d.querySelector(".sb-pid").textContent = t.pid; d.querySelector("input[name=pid]").placeholder = t.ph;
    d.querySelector(".sb-name").textContent = t.name; d.querySelector(".sb-msg").textContent = t.msg;
    d.querySelector(".sb-send").textContent = t.send; d.querySelector(".sb-cancel").textContent = t.cancel;
  }
  document.addEventListener("click", ev => {
    const a = ev.target.closest(".open-box");
    if (!a) return;
    ev.preventDefault();
    const pid = a.dataset.pid || "";
    const d = build();
    if (typeof d.showModal !== "function") { location.href = mailto(pid, "", ""); return; }
    fill(d); d.querySelector("form").reset(); d.querySelector("input[name=pid]").value = pid;
    d.showModal(); d.querySelector(pid ? "textarea" : "input[name=pid]").focus();
  });
})();
