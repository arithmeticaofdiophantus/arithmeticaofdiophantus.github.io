// Renderizado compartido de los libros / shared rendering of the books
const UI = {
  es: { dio: "Diofanto", takes: "Datos", cond: "Condición", answer: "Respuesta", ineq: "En ecuaciones", data: "Datos", modern: "Resolución moderna",
        run: "Ejecutar en SageMath", evalBtn: "Evaluar", problem: "Problema", nosage: "No se ha podido cargar SageMath Cell. Copia el código en",
        hideSol: "Ocultar soluciones", showSol: "Mostrar soluciones", hideEq: "Ocultar ecuaciones", showEq: "Mostrar ecuaciones",
        greekNum: "Numerales griegos", arabicNum: "Numerales arábigos", hist: "Comentario",
        geo: "Geometría", hideGeo: "Ocultar geometría", showGeo: "Mostrar geometría", model: "Modelo", param: "Parametrización", jac: "Jacobiano (modelo de Weierstrass mínimo)", cond: "Condición", conductor: "conductor", tors: "torsión", rank: "rango", gens: "generadores", mw: "grupo de Mordell–Weil", lmfdb: "en la LMFDB", lmfdbN: "curvas de conductor", pt: "punto de Diofanto", pts: "puntos racionales conocidos", magma: "Magma", sageCode: "SageMath", magmaBtn: "Abrir la calculadora Magma", magmaDone: "Copiado: pégalo en la calculadora (Ctrl+V) y pulsa Run", copyBtn: "Copiar el código", copied: "Copiado", openSage: "Abrir en SageMath Cell con el código cargado", nosage2: "Aquí no se puede incrustar la celda de SageMath; en su lugar:",
        kind: { det: "Dimensión 0: problema determinado (número finito de soluciones).", lin: "Variedad lineal de dimensión {d}.", conic: "Curva de género 0.", ell: "Curva de género 1 (curva elíptica).", g2: "Curva hiperelíptica de género 2.", var: "Variedad de dimensión {d}." }, slice: "La sección de Diofanto es una curva de género {g}." },
  en: { dio: "Diophantus", takes: "Given", cond: "Condition", answer: "Answer", ineq: "In equations", data: "Data", modern: "Modern solution",
        run: "Run in SageMath", evalBtn: "Evaluate", problem: "Problem", nosage: "SageMath Cell could not be loaded. Copy the code into",
        hideSol: "Hide solutions", showSol: "Show solutions", hideEq: "Hide equations", showEq: "Show equations",
        greekNum: "Greek numerals", arabicNum: "Arabic numerals", hist: "Commentary",
        geo: "Geometry", hideGeo: "Hide geometry", showGeo: "Show geometry", model: "Model", param: "Parametrization", jac: "Jacobian (minimal Weierstrass model)", conductor: "conductor", tors: "torsion", rank: "rank", gens: "generators", mw: "Mordell–Weil group", lmfdb: "in the LMFDB", lmfdbN: "curves of conductor", pt: "Diophantus’s point", pts: "known rational points", magma: "Magma", sageCode: "SageMath", magmaBtn: "Open the Magma calculator", magmaDone: "Copied: paste it into the calculator (Ctrl+V) and press Run", copyBtn: "Copy the code", copied: "Copied", openSage: "Open in SageMath Cell with the code loaded", nosage2: "The SageMath cell cannot be embedded here; instead:",
        kind: { det: "Dimension 0: a determinate problem (finitely many solutions).", lin: "Linear variety of dimension {d}.", conic: "Curve of genus 0.", ell: "Curve of genus 1 (elliptic curve).", g2: "Hyperelliptic curve of genus 2.", var: "Variety of dimension {d}." }, slice: "Diophantus’s section is a curve of genus {g}." }
};
function currentLang() { return (window.getLang && window.getLang()) || "es"; }
function greekNumeral(n) {
  const ones = ["", "α", "β", "γ", "δ", "ε", "ϛ", "ζ", "η", "θ"], tens = ["", "ι", "κ", "λ", "μ"];
  return tens[Math.floor(n / 10)] + ones[n % 10] + "΄";
}

// Bloque de geometría / geometry block (data in assets/geo.js)
function geoHTML(cfg, n, lang, T, esc) {
  const u = UI[lang];
  const G = window.GEO && window.GEO.G[cfg.id], g = G && G[n];
  if (!g) return "";
  const en = lang === "en";
  const txt = en ? (g.te || "") : (g.t || "");
  let h = "<div class=\"geo\"><p class=\"eqh\">" + u.geo + "</p>";
  let kind = u.kind[g.c].replace("{d}", g.d);
  if (g.c === "var" && g.g !== null && g.g !== undefined) kind += " " + u.slice.replace("{g}", g.g);
  h += "<p class=\"gkind\">" + kind + "</p>";
  if (g.m) h += "<p><b>" + u.model + ":</b> " + T(g.m) + "</p>";
  if (txt) h += "<p>" + T(txt) + "</p>";
  const par = en ? g.pe : g.p;
  if (par) h += "<p><b>" + u.param + ":</b> " + T(par) + "</p>";
  if (g.c === "ell" && g.e && window.GEO.ELL[g.e]) {
    const E = window.GEO.ELL[g.e], a = E.ainvs;
    const term = (c, m) => c === 0 ? "" : ((c > 0 ? " + " : " − ") + (Math.abs(c) === 1 && m ? "" : Math.abs(c)) + m);
    let lhs = "<var>y</var>²" + term(a[0], "<var>xy</var>") + term(a[2], "<var>y</var>");
    let rhs = "<var>x</var>³" + term(a[1], "<var>x</var>²") + term(a[3], "<var>x</var>") + term(a[4], "");
    const rk = E.rank[0] === E.rank[1] ? E.rank[0] : E.rank[0] + "–" + E.rank[1];
    const tors = E.tors === "[]" ? "0" : "Z/" + E.tors.replace(/[\[\] ]/g, "").split(",").join(" × Z/");
    const mw = (E.rank[0] > 0 ? "Z" + (E.rank[0] > 1 ? "<sup>" + E.rank[0] + "</sup>" : "") : "") + (tors !== "0" ? (E.rank[0] > 0 ? " × " : "") + tors : (E.rank[0] > 0 ? "" : "0"));
    h += "<p><b>" + u.jac + ":</b> " + lhs + " = " + rhs + " &nbsp;[" + a.join(", ") + "]</p>";
    h += "<p>" + u.conductor + " " + E.N + " · " + u.tors + " " + tors + " · " + u.rank + " " + rk + " · " + u.mw + " E(Q) ≅ " + mw + (E.gens && E.gens !== "[]" ? " · " + u.gens + " " + esc(E.gens) : "") + "</p>";
    h += "<p>" + u.lmfdb + ": " + (E.lmfdb ? "<a href=\"https://www.lmfdb.org/EllipticCurve/Q/" + E.lmfdb + "/\"><b>" + E.lmfdb + "</b></a> (Cremona " + E.cremona + ") · " : "") + "<a href=\"https://www.lmfdb.org/EllipticCurve/Q/?jump=%5B" + a.join("%2C") + "%5D\">[" + a.join(", ") + "]</a> · <a href=\"https://www.lmfdb.org/EllipticCurve/Q/" + E.N + "/\">" + u.lmfdbN + " " + E.N + "</a></p>";
    if (g.pt) h += "<p><b>" + u.pt + ":</b> " + T(g.pt) + "</p>";
  }
  if (g.c === "g2" && g.pts) h += "<p><b>" + u.pts + ":</b> " + T(g.pts) + "</p>";
  if (g.sg) h += "<p class=\"codeh\">" + u.sageCode + "</p><pre class=\"sage-code\">" + esc(g.sg) + "</pre><button class=\"sage-btn\" type=\"button\">" + u.run + "</button><div class=\"sage-cell\"></div>";
  if (g.mg) h += "<p class=\"codeh\">" + u.magma + "</p><div class=\"magma-wrap\"><pre class=\"sage-code magma-code\">" + esc(g.mg) + "</pre><button class=\"magma-btn\" type=\"button\">" + u.copyBtn + "</button> <a class=\"magma-link\" href=\"https://magma-maths.org/calc/\" target=\"_blank\" rel=\"noopener\">" + u.magmaBtn + "</a><span class=\"magma-msg\"></span></div>";
  return h + "</div>";
}
function renderBook(root, cfg) {
  if (!root) return;
  const T = s => s.replace(/\{([A-Za-z])(\d?)\}/g, (m, l, i) => "<var>" + l + "</var>" + (i ? "<sub>" + i + "</sub>" : ""));
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const rail = root.querySelector(".rail"), main = root.querySelector(".main"), numerals = root.querySelector(".numerals");

  function render() {
    const lang = currentLang(), u = UI[lang];
    rail.querySelectorAll("a").forEach(a => a.remove());
    main.innerHTML = "";
    numerals.querySelector("[data-num=griega]").title = u.greekNum;
    numerals.querySelector("[data-num=arabiga]").title = u.arabicNum;
    cfg.P.forEach(p => {
      const a = document.createElement("a");
      a.href = "#" + cfg.id + "-" + p.n;
      a.innerHTML = "<span class=\"g\">" + greekNumeral(p.n) + "</span><span class=\"r\">" + p.n + "</span>";
      a.title = u.problem + " " + cfg.book + "." + p.n;
      rail.appendChild(a);
    });
    cfg.GROUPS.forEach((gr, gi) => {
      const sec = document.createElement("section");
      sec.className = "group";
      sec.innerHTML = "<h2>" + (lang === "en" ? cfg.EN_GROUPS[gi] : gr.title) + "</h2>";
      cfg.P.filter(p0 => p0.n >= gr.from && p0.n <= gr.to).forEach(p0 => {
        const p = lang === "en" ? Object.assign({ n: p0.n }, cfg.EN_P[p0.n]) : p0;
        const e = lang === "en" ? Object.assign({}, cfg.EQ[p0.n], cfg.EN_EQ[p0.n]) : cfg.EQ[p0.n];
        const art = document.createElement("article");
        art.className = "prob";
        art.id = cfg.id + "-" + p.n;
        art.innerHTML =
          "<h3><span class=\"num\"><span class=\"g\">" + greekNumeral(p.n) + "<small>" + cfg.book + "." + p.n + "</small></span><span class=\"r\">" + p.n + "<small>" + greekNumeral(p.n) + "</small></span></span><span>" + p.g + "</span></h3>" +
          "<div class=\"cols\">" +
            "<div class=\"dio\">" +
              "<p class=\"eqh\">" + u.dio + "</p>" +
              "<p class=\"datos\"><b>" + u.takes + ":</b> " + p.d + ".</p>" +
              (p.c ? "<p class=\"cond\"><b>" + u.cond + ":</b> " + p.c + "</p>" : "") +
              "<div class=\"sol\">" + p.s.map(t => "<p>" + t + "</p>").join("") + "</div>" +
              "<span class=\"resp\">" + u.answer + ": " + p.r + "</span>" +
              (p.h ? "<div class=\"hist\"><p class=\"eqh\">" + u.hist + "</p><p>" + p.h + "</p></div>" : "") +
            "</div>" +
            "<div class=\"eq\">" +
              "<p class=\"eqh\">" + u.ineq + "</p>" +
              "<div class=\"eqs\">" + e.f.map(t => "<p>" + T(t) + "</p>").join("") + "</div>" +
              "<p class=\"datos\"><b>" + u.data + ":</b> " + T(e.d) + ".</p>" +
              "<div class=\"sol\"><p class=\"eqh\">" + u.modern + "</p>" + e.m.map(t => "<p>" + T(t) + "</p>").join("") +
                "<pre class=\"sage-code\">" + esc(e.s) + "</pre>" +
                "<button class=\"sage-btn\" type=\"button\">" + u.run + "</button>" +
                "<div class=\"sage-cell\"></div>" +
              "</div>" +
              geoHTML(cfg, p.n, lang, T, esc) +
            "</div>" +
          "</div>";
        sec.appendChild(art);
      });
      main.appendChild(sec);
    });
    applyToggles();
  }

  // Botones / toggles: hide solutions, show equations (remembered in the browser)
  const TOG = [["toggle-sol", "hide-sol", "diofanto-ocultar", "showSol", "hideSol"], ["toggle-eq", "show-eq", "diofanto-ecuaciones", "hideEq", "showEq"], ["toggle-geo", "show-geo", "diofanto-geometria", "hideGeo", "showGeo"]];
  function applyToggles() {
    const u = UI[currentLang()];
    TOG.forEach(([cls, bodyCls, key, onKey, offKey]) => {
      let on = false;
      try { on = localStorage.getItem(key) === "1"; } catch (e) {}
      document.body.classList.toggle(bodyCls, on);
      document.querySelectorAll("." + cls).forEach(b => { b.textContent = on ? u[onKey] : u[offKey]; b.setAttribute("aria-pressed", on ? "true" : "false"); });
    });
  }
  TOG.forEach(([cls, bodyCls, key]) => {
    root.querySelectorAll("." + cls).forEach(btn => btn.addEventListener("click", () => {
      const on = !document.body.classList.contains(bodyCls);
      try { localStorage.setItem(key, on ? "1" : "0"); } catch (e) {}
      applyToggles();
    }));
  });

  // Numeración del índice / index numerals: Greek (α΄, β΄…) or Arabic (1, 2…)
  function applyNumerals() {
    let arabic = false;
    try { arabic = localStorage.getItem("diofanto-numeracion") === "arabiga"; } catch (e) {}
    document.body.classList.toggle("num-arabic", arabic);
    document.querySelectorAll(".numerals button").forEach(b => b.setAttribute("aria-pressed", (b.dataset.num === "arabiga") === arabic ? "true" : "false"));
  }
  numerals.addEventListener("click", ev => {
    const b = ev.target.closest("button");
    if (!b) return;
    try { localStorage.setItem("diofanto-numeracion", b.dataset.num === "arabiga" ? "arabiga" : "griega"); } catch (e) {}
    applyNumerals();
  });
  applyNumerals();
  render();
  document.addEventListener("langchange", render);
}

// Celdas de SageMath / SageMath cells, created on demand (needs sagecell.sagemath.org).
// Si el script no puede cargarse (p. ej. por la política de seguridad de un visor), se ofrece un
// enlace permanente a sagecell.sagemath.org con el código ya cargado (?z=zlib+base64) y un botón de copia.
async function sagePermalink(code) {
  if (!window.CompressionStream) return null;
  const cs = new CompressionStream("deflate");
  const w = cs.writable.getWriter(); w.write(new TextEncoder().encode(code)); w.close();
  const buf = new Uint8Array(await new Response(cs.readable).arrayBuffer());
  let bin = ""; buf.forEach(b => bin += String.fromCharCode(b));
  return "https://sagecell.sagemath.org/?z=" + btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") + "&lang=sage";
}
function copyText(text, pre, msg, done) {
  const ok = () => { if (msg) msg.textContent = done; };
  const fallback = () => {
    try { const r = document.createRange(); r.selectNodeContents(pre); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); document.execCommand("copy"); } catch (e) {}
    ok();
  };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
}
document.addEventListener("click", ev => {
  const b = ev.target.closest(".sage-btn");
  if (!b) return;
  const u = UI[currentLang()];
  const pre = b.previousElementSibling, cell = b.nextElementSibling;
  const code = pre.textContent;
  if (window.sagecell) {
    b.remove();
    sagecell.makeSagecell({ inputLocation: cell, code: code, evalButtonText: u.evalBtn, autoeval: false, hide: ["fullScreen", "permalink", "language"] });
    return;
  }
  // sin sagecell: enlace con el código cargado + copia
  b.disabled = true;
  sagePermalink(code).then(url => {
    const link = url ? "<a href=\"" + url + "\" target=\"_blank\" rel=\"noopener\">" + u.openSage + "</a>" : "<a href=\"https://sagecell.sagemath.org/\" target=\"_blank\" rel=\"noopener\">sagecell.sagemath.org</a>";
    cell.innerHTML = "<p class=\"hint\">" + u.nosage2 + " " + link + " <button class=\"copy-btn\" type=\"button\">" + u.copyBtn + "</button> <span class=\"magma-msg\"></span></p>";
    cell.querySelector(".copy-btn").addEventListener("click", () => copyText(code, pre, cell.querySelector(".magma-msg"), u.copied));
    b.remove();
  });
});

// Magma: no hay API como la de SageCell; el enlace abre la calculadora y el botón copia el código
document.addEventListener("click", ev => {
  const b = ev.target.closest(".magma-btn");
  if (!b) return;
  const pre = b.previousElementSibling, msg = b.parentElement.querySelector(".magma-msg");
  copyText(pre.textContent, pre, msg, UI[currentLang()].magmaDone);
});
