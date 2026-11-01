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
