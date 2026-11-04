// Buscador de problemas (portada): por número (II.8, IVa.17) o por palabras, con filtros por libro, geometría y comentario
(function () {
  const sec = document.getElementById("buscar");
  if (!sec || !window.INDICE) return;
  const T = {
    es: { all: "Todos los libros", greek: "Libros griegos (I–VI)", arabic: "Libros árabes (IV–VII)", book: "Libro ", arBook: "Libro árabe ", pol: "Números poligonales",
          gAll: "Toda la geometría", det: "Determinados (dimensión 0)", lin: "Lineales", g0: "Curvas de género 0", g1: "Curvas de género 1 (elípticas)", g2: "Curvas de género 2", sup: "Superficies y dimensión mayor",
          hist: "Solo con comentario histórico", ph: "Número (II.8, IVa.17) o palabras (cubo, triángulo, Fermat…)",
          n1: " problema encontrado", nN: " problemas encontrados", none: "Ningún problema coincide con la búsqueda.", more: "Mostrar todos",
          hint: "Escribe un número o unas palabras, o elige un filtro.", answer: "Respuesta: " },
    en: { all: "All books", greek: "Greek books (I–VI)", arabic: "Arabic books (IV–VII)", book: "Book ", arBook: "Arabic Book ", pol: "Polygonal numbers",
          gAll: "All geometry", det: "Determinate (dimension 0)", lin: "Linear", g0: "Curves of genus 0", g1: "Curves of genus 1 (elliptic)", g2: "Curves of genus 2", sup: "Surfaces and higher dimension",
          hist: "Only with historical commentary", ph: "Number (II.8, IVa.17) or words (cube, triangle, Fermat…)",
          n1: " problem found", nN: " problems found", none: "No problem matches the search.", more: "Show all",
          hint: "Type a number or some words, or choose a filter.", answer: "Answer: " } };
  const BOOKS = [["1", "I"], ["2", "II"], ["3", "III"], ["4", "IV"], ["5", "V"], ["6", "VI"], ["a4", "IV", 1], ["a5", "V", 1], ["a6", "VI", 1], ["a7", "VII", 1], ["p"]];
  const GREEK = ["1", "2", "3", "4", "5", "6"], ARABIC = ["a4", "a5", "a6", "a7"];
  const KEY = { i: "i", ii: "ii", iii: "iii", iv: "iv", v: "v", vi: "vi", iva: "a4", va: "a5", via: "a6", viia: "a7" };
  const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const strip = h => h.replace(/<[^>]+>/g, "");
  const single = !!document.querySelector("[data-view]");
  const lang = () => (window.getLang ? window.getLang() : "en");
  INDICE.forEach(e => { e.ts = norm(strip(e.gs + " " + e.rs)); e.te = norm(strip(e.ge + " " + e.re)); });
  const q = sec.querySelector("input[type=search]"), sb = sec.querySelector("select[name=libro]"), sg = sec.querySelector("select[name=geo]");
  const ch = sec.querySelector("input[name=hist]"), out = sec.querySelector(".results"), cnt = sec.querySelector(".count");
  let showAll = false;
  function options() {
    const t = T[lang()], vb = sb.value || "", vg = sg.value || "";
    sb.innerHTML = [["", t.all], ["g", t.greek], ["a", t.arabic]].concat(BOOKS.map(b => [b[0], b[0] === "p" ? t.pol : (b[2] ? t.arBook : t.book) + b[1]]))
      .map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
    sg.innerHTML = [["", t.gAll], ["det", t.det], ["lin", t.lin], ["g0", t.g0], ["g1", t.g1], ["g2", t.g2], ["sup", t.sup]]
      .map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
    sb.value = vb; sg.value = vg;
    q.placeholder = t.ph; sec.querySelector(".hist-l").textContent = t.hist;
  }
  function refId(s) {
    const m = s.trim().toLowerCase().match(/^(vii|vi|v|iv|iii|ii|i)(a?)\s*[.\s]\s*(\d{1,2})$/);
    if (!m) { const p = s.trim().toLowerCase().match(/^pol\.?\s*(\d)$/); return p ? "p-" + p[1] : null; }
    const k = KEY[m[1] + m[2]];
    return k ? k + "-" + (+m[3]) : null;
  }
  function href(e) { return single ? "#" + e.id : e.pg + "#" + e.id; }
  function run() {
    const t = T[lang()], text = q.value.trim(), vb = sb.value, vg = sg.value, onlyH = ch.checked;
    if (!text && !vb && !vg && !onlyH) { out.innerHTML = ""; cnt.textContent = t.hint; return; }
    const ref = text ? refId(text) : null;
    const words = ref ? [] : norm(text).split(/\s+/).filter(Boolean);
    const L = lang() === "es" ? "ts" : "te";
    const res = INDICE.filter(e => {
      if (ref && e.id !== ref) return false;
      if (vb === "g" && !GREEK.includes(e.b)) return false;
      if (vb === "a" && !ARABIC.includes(e.b)) return false;
      if (vb && vb !== "g" && vb !== "a" && e.b !== vb) return false;
      if (vg && e.k !== vg && e.k2 !== vg) return false;
      if (onlyH && !e.h) return false;
      return words.every(w => e[L].includes(w));
    });
    cnt.textContent = res.length ? res.length + (res.length === 1 ? t.n1 : t.nN) : t.none;
    const list = showAll ? res : res.slice(0, 40);
    out.innerHTML = list.map(e => `<li><a href="${href(e)}"><span class="r-lab">${e.l}</span><span class="r-g">${lang() === "es" ? e.gs : e.ge}</span></a>` +
      `<span class="r-ans">${t.answer}${lang() === "es" ? e.rs : e.re}</span></li>`).join("") +
      (res.length > list.length ? `<li class="r-more"><button type="button">${t.more} (${res.length})</button></li>` : "");
    const more = out.querySelector(".r-more button");
    if (more) more.addEventListener("click", () => { showAll = true; run(); });
  }
  [q, sb, sg, ch].forEach(el => el.addEventListener(el === q ? "input" : "change", () => { showAll = false; run(); }));
  sec.querySelector("form").addEventListener("submit", ev => { ev.preventDefault(); const a = out.querySelector("a"); if (a) a.click(); });
  out.addEventListener("click", ev => {        // en la versión de un solo archivo, ir al problema con el enrutador
    const a = ev.target.closest("a"); if (!a || !single || !window.__route) return;
    ev.preventDefault(); const id = a.getAttribute("href").slice(1);
    try { history.pushState(null, "", "#" + id); } catch (e) {}
    window.__route(id);
  });
  document.addEventListener("langchange", () => { options(); run(); });
  options(); run();
})();
