(function () {
  const GROUPS = [
    { title: "Lemas sobre progresiones aritméticas", from: 1, to: 3 },
    { title: "El teorema de los números poligonales", from: 4, to: 4 },
    { title: "El último problema (incompleto)", from: 5, to: 5 }
  ];
  const EN_GROUPS = [
    "Lemmas on arithmetic progressions",
    "The theorem on polygonal numbers",
    "The last problem (incomplete)"
  ];

  const P = [
    { n: 1, g: "Si tres números difieren por igual (están en progresión aritmética), ocho veces el producto del mayor por el medio, más el cuadrado del menor, es un cuadrado, cuyo lado es el mayor más el doble del medio.",
      d: "números <var>a</var>, <var>a</var> + <var>d</var>, <var>a</var> + 2<var>d</var>",
      s: ["Diofanto lo demuestra geométricamente, al modo del libro II de los <em>Elementos</em>: llama AB, BC y CD a los tres números tomados en una recta, y usa que el producto de los extremos más el cuadrado de la semidiferencia es el cuadrado de la semisuma.",
          "En notación moderna: 8(<var>a</var> + 2<var>d</var>)(<var>a</var> + <var>d</var>) + <var>a</var><sup>2</sup> = 9<var>a</var><sup>2</sup> + 24<var>a</var><var>d</var> + 16<var>d</var><sup>2</sup> = (3<var>a</var> + 4<var>d</var>)<sup>2</sup>, y 3<var>a</var> + 4<var>d</var> = (<var>a</var> + 2<var>d</var>) + 2(<var>a</var> + <var>d</var>)."],
      r: "8 · mayor · medio + menor² = (mayor + 2 · medio)²" },
    { n: 2, g: "Si hay cuantos números se quiera en progresión aritmética, el mayor menos el menor es la diferencia multiplicada por el número de términos menos uno.",
      d: "<var>n</var> términos con diferencia <var>d</var>",
      s: ["Diofanto lo prueba para tres y cuatro términos y afirma que vale «de la misma manera» para cualquier cantidad: cada paso añade una diferencia, y hay <var>n</var> − 1 pasos.",
          "Último término = primero + (<var>n</var> − 1)<var>d</var>."],
      r: "mayor − menor = (n − 1) · d" },
    { n: 3, g: "Si hay cuantos números se quiera, empezando por la unidad y creciendo con una diferencia común, la suma de todos, multiplicada por ocho veces la diferencia, más el cuadrado de la diferencia menos dos, es un cuadrado cuyo lado, disminuido en dos, es la diferencia multiplicada por el doble del número de términos menos uno.",
      d: "1, 1 + <var>d</var>, 1 + 2<var>d</var>, …, 1 + (<var>n</var> − 1)<var>d</var>",
      s: ["Es la proposición central: Diofanto la demuestra combinando las dos anteriores, también con figuras de segmentos. La suma es <var>S</var> = <var>n</var> + <var>n</var>(<var>n</var> − 1)<var>d</var>/2.",
          "8<var>d</var><var>S</var> + (<var>d</var> − 2)<sup>2</sup> = 4<var>d</var><sup>2</sup><var>n</var><sup>2</sup> − 4<var>d</var><sup>2</sup><var>n</var> + <var>d</var><sup>2</sup> + 8<var>d</var><var>n</var> − 4<var>d</var> + 4 = (2<var>d</var><var>n</var> − <var>d</var> + 2)<sup>2</sup>, y el lado menos 2 es <var>d</var>(2<var>n</var> − 1)."],
      r: "8dS + (d − 2)² = (d(2n − 1) + 2)²" },
    { n: 4, g: "Todo número poligonal de <var>r</var> ángulos y lado <var>n</var>, multiplicado por ocho veces <var>r</var> − 2 y aumentado en el cuadrado de <var>r</var> − 4, es un cuadrado cuyo lado, disminuido en dos, es <var>r</var> − 2 multiplicado por el doble del lado menos uno. Y recíprocamente: de ahí se obtienen el lado y el número de ángulos de un poligonal dado.",
      d: "poligonal <var>P</var>, ángulos <var>r</var>, lado <var>n</var>; según la definición de Hipsicles, <var>P</var> es la suma de <var>n</var> términos de la progresión 1, 1 + (<var>r</var> − 2), 1 + 2(<var>r</var> − 2), …",
      s: ["Diofanto cita la definición de Hipsicles: los poligonales son sumas de progresiones aritméticas que empiezan en 1 con diferencia <var>r</var> − 2 (triangulares con 1, cuadrados con 2, pentagonales con 3…). Aplicando la proposición 3 con <var>d</var> = <var>r</var> − 2: 8(<var>r</var> − 2)<var>P</var> + (<var>r</var> − 4)<sup>2</sup> = (2 + (2<var>n</var> − 1)(<var>r</var> − 2))<sup>2</sup>.",
          "De ahí las reglas: dado <var>P</var> y <var>r</var>, el lado es <var>n</var> = (√(8(<var>r</var> − 2)<var>P</var> + (<var>r</var> − 4)<sup>2</sup>) − 2 + (<var>r</var> − 2))/(2(<var>r</var> − 2)); y dados <var>n</var> y <var>r</var>, <var>P</var> = ((2 + (2<var>n</var> − 1)(<var>r</var> − 2))<sup>2</sup> − (<var>r</var> − 4)<sup>2</sup>)/(8(<var>r</var> − 2)). Diofanto observa que así se puede hallar cuántos ángulos tiene un poligonal dado de lado dado.",
          "Ejemplo: 15 es triangular (<var>r</var> = 3): 8 · 15 + 1 = 121 = 11<sup>2</sup>, y (11 − 2 + 1)/2 = 5 es el lado. Y 22 es pentagonal: 8 · 3 · 22 + 1 = 529 = 23<sup>2</sup>, lado (23 − 2 + 3)/6 = 4."],
      r: "8(r − 2)P + (r − 4)² = (2 + (2n − 1)(r − 2))²" },
    { n: 5, g: "Dado un número, hallar de cuántas maneras puede ser poligonal.",
      d: "problema final, incompleto",
      s: ["El tratado se interrumpe en medio de este problema. Diofanto empieza por acotar: si <var>P</var> es poligonal de lado <var>n</var> y ángulos <var>r</var>, entonces 8(<var>r</var> − 2)<var>P</var> + (<var>r</var> − 4)<sup>2</sup> es un cuadrado, y razona con segmentos sobre la relación entre <var>P</var>, <var>n</var> y <var>r</var>; el texto conservado termina en una cadena de lemas geométricos sin llegar a la regla.",
          "En términos modernos: <var>P</var> es poligonal de lado <var>n</var> ≥ 2 si <var>r</var> = 2 + 2(<var>P</var> − <var>n</var>)/(<var>n</var>(<var>n</var> − 1)) es entero ≥ 3, lo que equivale a que <var>n</var>(<var>n</var> − 1)/2 divida a <var>P</var> − <var>n</var>: basta recorrer los lados <var>n</var> con <var>n</var>(<var>n</var> − 1)/2 ≤ <var>P</var> − <var>n</var>. Por ejemplo, 36 es triangular (lado 8), cuadrado (lado 6), 13-gonal (lado 3) y, como todo número, 36-gonal de lado 2."],
      r: "sin resolver en el texto; en la columna moderna, el recuento para cualquier P" }
  ];

  const EQ = {
    1: { f: ["8({a} + 2{d})({a} + {d}) + {a}² = (3{a} + 4{d})²"], d: "{a}, {d} cualesquiera",
         m: ["Identidad polinómica: ambos miembros desarrollan a 9{a}² + 24{a}{d} + 16{d}². Es el caso particular de ({p} + {q})² = ({p} − {q})² + 4{p}{q} que Diofanto usa en III.19 y V.7."],
         s: "a, d = var('a d')\nlhs = 8*(a + 2*d)*(a + d) + a^2\nrhs = (3*a + 4*d)^2\nprint(bool(lhs.expand() == rhs.expand()))\na, d = 3, 2\nprint(8*(a + 2*d)*(a + d) + a^2, sqrt(8*(a + 2*d)*(a + d) + a^2), (a + 2*d) + 2*(a + d))" },
    2: { f: ["{a}<sub>n</sub> − {a}<sub>1</sub> = ({n} − 1){d}"], d: "progresión aritmética",
         m: ["Inducción trivial sobre {n}: cada término añade {d}."],
         s: "n, d = var('n d')\nterms = [1 + k*d for k in range(0, 5)]   # n = 5\nprint(terms[-1] - terms[0], (5 - 1)*d)" },
    3: { f: ["{S} = {n} + {n}({n} − 1){d}/2", "8{d}{S} + ({d} − 2)² = ({d}(2{n} − 1) + 2)²"], d: "1, 1 + {d}, …, 1 + ({n} − 1){d}",
         m: ["Sustituyendo {S}: 8{d}{n} + 4{d}²{n}({n} − 1) + {d}² − 4{d} + 4 = 4{d}²{n}² − 4{d}²{n} + 8{d}{n} + {d}² − 4{d} + 4 = (2{d}{n} − {d} + 2)². Es la forma completada al cuadrado de la fórmula de la suma de una progresión aritmética."],
         s: "n, d = var('n d')\nS = n + n*(n - 1)*d/2\nprint(bool((8*d*S + (d - 2)^2).expand() == ((d*(2*n - 1) + 2)^2).expand()))\nprint([S.subs(n=k, d=3) for k in range(1, 7)])   # pentagonales: 1, 5, 12, 22, 35, 51" },
    4: { f: ["{P}({n}, {r}) = {n} + {n}({n} − 1)({r} − 2)/2", "8({r} − 2){P} + ({r} − 4)² = (2 + (2{n} − 1)({r} − 2))²"], d: "{r} ≥ 3, {n} ≥ 1",
         m: ["Es la proposición 3 con {d} = {r} − 2. Para los cuadrados ({r} = 4) dice 16{n}² = (4{n})²; para los triangulares ({r} = 3), 8{T} + 1 = (2{n} + 1)², la identidad que Diofanto ya usa en IV.38. Despejando, {n} = (√(8({r} − 2){P} + ({r} − 4)²) + {r} − 4)/(2({r} − 2))."],
         s: "def poly(n, r): return n + n*(n - 1)*(r - 2)/2\nfor n, r in [(5, 3), (4, 5), (3, 13), (6, 4)]:\n    P = poly(n, r)\n    side = (sqrt(8*(r - 2)*P + (r - 4)^2) + r - 4)/(2*(r - 2))\n    print(n, r, P, sqrt(8*(r - 2)*P + (r - 4)^2), side)" },
    5: { f: ["Dado {P}, hallar los pares ({n}, {r}) con {n} ≥ 2, {r} ≥ 3 y {P} = {n} + {n}({n} − 1)({r} − 2)/2"], d: "{P} dado",
         m: ["{r} = 2 + 2({P} − {n})/({n}({n} − 1)) debe ser entero: se recorren los {n} con {n}({n} − 1)/2 ≤ {P} − {n}. Todo {P} ≥ 3 es {P}-gonal de lado 2; 36 lo es de cuatro maneras."],
         s: "def ways(P):\n    out = []\n    n = 2\n    while n*(n - 1)/2 <= P - n:\n        num = 2*(P - n)\n        den = n*(n - 1)\n        if num % den:\n            n += 1\n            continue\n        out.append((n, 2 + num//den))\n        n += 1\n    return out\nfor P in [15, 22, 36, 225]:\n    print(P, ways(P))" }
  };

  const EN_P = {
    1: { g: "If three numbers differ by equal amounts (are in arithmetic progression), eight times the product of the greatest and the middle, plus the square of the least, is a square, whose side is the greatest plus twice the middle.", d: "numbers <var>a</var>, <var>a</var> + <var>d</var>, <var>a</var> + 2<var>d</var>",
         s: ["Diophantus proves it geometrically, in the manner of Book II of the <em>Elements</em>: he calls the three numbers AB, BC and CD taken on a line, and uses the fact that the product of the extremes plus the square of half the difference is the square of half the sum.", "In modern notation: 8(<var>a</var> + 2<var>d</var>)(<var>a</var> + <var>d</var>) + <var>a</var><sup>2</sup> = 9<var>a</var><sup>2</sup> + 24<var>a</var><var>d</var> + 16<var>d</var><sup>2</sup> = (3<var>a</var> + 4<var>d</var>)<sup>2</sup>, and 3<var>a</var> + 4<var>d</var> = (<var>a</var> + 2<var>d</var>) + 2(<var>a</var> + <var>d</var>)."], r: "8 · greatest · middle + least² = (greatest + 2 · middle)²" },
    2: { g: "If there are as many numbers as we please in arithmetic progression, the greatest minus the least is the difference multiplied by the number of terms minus one.", d: "<var>n</var> terms with difference <var>d</var>",
         s: ["Diophantus proves it for three and four terms and states that it holds “in the same way” for any number: each step adds one difference, and there are <var>n</var> − 1 steps.", "Last term = first + (<var>n</var> − 1)<var>d</var>."], r: "greatest − least = (n − 1) · d" },
    3: { g: "If there are as many numbers as we please, beginning from the unit and increasing by a common difference, the sum of all of them, multiplied by eight times the difference, plus the square of the difference minus two, is a square whose side, diminished by two, is the difference multiplied by twice the number of terms minus one.", d: "1, 1 + <var>d</var>, 1 + 2<var>d</var>, …, 1 + (<var>n</var> − 1)<var>d</var>",
         s: ["This is the central proposition: Diophantus proves it by combining the two preceding ones, again with line figures. The sum is <var>S</var> = <var>n</var> + <var>n</var>(<var>n</var> − 1)<var>d</var>/2.", "8<var>d</var><var>S</var> + (<var>d</var> − 2)<sup>2</sup> = 4<var>d</var><sup>2</sup><var>n</var><sup>2</sup> − 4<var>d</var><sup>2</sup><var>n</var> + <var>d</var><sup>2</sup> + 8<var>d</var><var>n</var> − 4<var>d</var> + 4 = (2<var>d</var><var>n</var> − <var>d</var> + 2)<sup>2</sup>, and the side minus 2 is <var>d</var>(2<var>n</var> − 1)."], r: "8dS + (d − 2)² = (d(2n − 1) + 2)²" },
    4: { g: "Every polygonal number with <var>r</var> angles and side <var>n</var>, multiplied by eight times <var>r</var> − 2 and increased by the square of <var>r</var> − 4, is a square whose side, diminished by two, is <var>r</var> − 2 multiplied by twice the side minus one. And conversely: from this the side and the number of angles of a given polygonal number are obtained.", d: "polygonal <var>P</var>, angles <var>r</var>, side <var>n</var>; by Hypsicles’s definition, <var>P</var> is the sum of <var>n</var> terms of the progression 1, 1 + (<var>r</var> − 2), 1 + 2(<var>r</var> − 2), …",
         s: ["Diophantus cites Hypsicles’s definition: polygonal numbers are sums of arithmetic progressions starting at 1 with difference <var>r</var> − 2 (triangular with 1, square with 2, pentagonal with 3…). Applying proposition 3 with <var>d</var> = <var>r</var> − 2: 8(<var>r</var> − 2)<var>P</var> + (<var>r</var> − 4)<sup>2</sup> = (2 + (2<var>n</var> − 1)(<var>r</var> − 2))<sup>2</sup>.", "Hence the rules: given <var>P</var> and <var>r</var>, the side is <var>n</var> = (√(8(<var>r</var> − 2)<var>P</var> + (<var>r</var> − 4)<sup>2</sup>) − 2 + (<var>r</var> − 2))/(2(<var>r</var> − 2)); and given <var>n</var> and <var>r</var>, <var>P</var> = ((2 + (2<var>n</var> − 1)(<var>r</var> − 2))<sup>2</sup> − (<var>r</var> − 4)<sup>2</sup>)/(8(<var>r</var> − 2)). Diophantus remarks that in this way one can find how many angles a given polygonal number of given side has.", "Example: 15 is triangular (<var>r</var> = 3): 8 · 15 + 1 = 121 = 11<sup>2</sup>, and (11 − 2 + 1)/2 = 5 is the side. And 22 is pentagonal: 8 · 3 · 22 + 1 = 529 = 23<sup>2</sup>, side (23 − 2 + 3)/6 = 4."], r: "8(r − 2)P + (r − 4)² = (2 + (2n − 1)(r − 2))²" },
    5: { g: "Given a number, to find in how many ways it can be polygonal.", d: "final problem, incomplete",
         s: ["The treatise breaks off in the middle of this problem. Diophantus begins by bounding: if <var>P</var> is polygonal with side <var>n</var> and <var>r</var> angles, then 8(<var>r</var> − 2)<var>P</var> + (<var>r</var> − 4)<sup>2</sup> is a square, and he reasons with line segments on the relation between <var>P</var>, <var>n</var> and <var>r</var>; the surviving text ends in a chain of geometrical lemmas without reaching the rule.", "In modern terms: <var>P</var> is polygonal with side <var>n</var> ≥ 2 if <var>r</var> = 2 + 2(<var>P</var> − <var>n</var>)/(<var>n</var>(<var>n</var> − 1)) is an integer ≥ 3, which is equivalent to <var>n</var>(<var>n</var> − 1)/2 dividing <var>P</var> − <var>n</var>: it suffices to run through the sides <var>n</var> with <var>n</var>(<var>n</var> − 1)/2 ≤ <var>P</var> − <var>n</var>. For instance, 36 is triangular (side 8), square (side 6), 13-gonal (side 3) and, like every number, 36-gonal with side 2."], r: "unsolved in the text; in the modern column, the count for any P" }
  };

  const EN_EQ = {
    1: { d: "any {a}, {d}", m: ["A polynomial identity: both sides expand to 9{a}² + 24{a}{d} + 16{d}². It is the special case of ({p} + {q})² = ({p} − {q})² + 4{p}{q} that Diophantus uses in III.19 and V.7."] },
    2: { d: "arithmetic progression", m: ["Trivial induction on {n}: each term adds {d}."] },
    3: { m: ["Substituting {S}: 8{d}{n} + 4{d}²{n}({n} − 1) + {d}² − 4{d} + 4 = 4{d}²{n}² − 4{d}²{n} + 8{d}{n} + {d}² − 4{d} + 4 = (2{d}{n} − {d} + 2)². It is the completed-square form of the sum of an arithmetic progression."] },
    4: { m: ["It is proposition 3 with {d} = {r} − 2. For squares ({r} = 4) it says 16{n}² = (4{n})²; for triangular numbers ({r} = 3), 8{T} + 1 = (2{n} + 1)², the identity Diophantus already uses in IV.38. Solving, {n} = (√(8({r} − 2){P} + ({r} − 4)²) + {r} − 4)/(2({r} − 2))."] },
    5: { f: ["Given {P}, find the pairs ({n}, {r}) with {n} ≥ 2, {r} ≥ 3 and {P} = {n} + {n}({n} − 1)({r} − 2)/2"], d: "{P} given", m: ["{r} = 2 + 2({P} − {n})/({n}({n} − 1)) must be an integer: run through the {n} with {n}({n} − 1)/2 ≤ {P} − {n}. Every {P} ≥ 3 is {P}-gonal with side 2; 36 is polygonal in four ways."] }
  };

  renderBook(document.querySelector('[data-book="p"]'), { book: "Pol.", id: "p", P, GROUPS, EQ, EN_GROUPS, EN_P, EN_EQ });
})();
