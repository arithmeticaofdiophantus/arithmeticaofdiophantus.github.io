// Observaciones de Fermat: filtro y enlaces desde los problemas
(function () {
  const MAP = {"ii-8": [2], "ii-9": [3], "iii-8": [4], "iii-9": [5], "iii-15": [6], "iii-19": [7], "iv-2": [8, 9], "iv-10": [10], "iv-11": [11, 12], "iv-16": [13], "iv-17": [14], "iv-19": [15], "iv-20": [16], "iv-22": [17], "iv-29": [18], "iv-32": [19], "iv-38": [20], "iv-39": [21], "v-3": [22], "v-7": [23, 24], "v-9": [25, 26], "v-11": [27], "v-16": [28], "v-21": [29], "v-22": [30], "v-27": [31], "v-28": [32], "v-29": [33], "vi-3": [34], "vi-6": [35], "vi-7": [36], "vi-8": [37], "vi-10": [38], "vi-12": [39], "vi-13": [40], "vi-14": [41], "vi-17": [42], "vi-22": [43, 44], "vi-24": [45], "p-4": [46]};
  window.__fermatMark = function (bookId, main, lang) {
    Object.keys(MAP).forEach(pid => {
      if (pid.split("-")[0] !== bookId) return;
      const art = main.querySelector("#" + pid + " .dio");
      if (!art || art.querySelector(".fermat-tag")) return;
      const a = document.createElement("p");
      a.className = "fermat-tag";
      const ns = MAP[pid];
      a.innerHTML = (lang === "en" ? (ns.length > 1 ? "Fermat’s observations " : "Fermat’s observation ") : (ns.length > 1 ? "Observaciones de Fermat " : "Observación de Fermat ")) +
        ns.map(n => "<a href=\"" + (document.querySelector("[data-view]") ? "" : "fermat.html") + "#obs-" + n + "\">" + n + "</a>").join(lang === "en" ? " and " : " y ");
      const hist = art.querySelector(".hist");
      art.insertBefore(a, hist || null);
    });
  };
  document.addEventListener("click", ev => {
    const la = ev.target.closest(".lat-all");
    if (la) {
      const on = la.getAttribute("aria-pressed") !== "true";
      la.setAttribute("aria-pressed", on ? "true" : "false");
      document.querySelectorAll(".obs-latin").forEach(d => { d.open = on; });
      return;
    }
    const b = ev.target.closest(".obs-filter button[data-f]");
    if (!b) return;
    const f = b.dataset.f;
    document.querySelectorAll(".obs-filter button[data-f]").forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
    document.querySelectorAll(".obs").forEach(o => { o.hidden = f !== "all" && !o.dataset.types.split(" ").includes(f); });
  });
})();
