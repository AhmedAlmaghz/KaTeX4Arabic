var i1 = Object.defineProperty;
var s1 = (r, e, t) => e in r ? i1(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var Ze = (r, e, t) => s1(r, typeof e != "symbol" ? e + "" : e, t);
class S extends Error {
  // The underlying error message without any context added.
  constructor(e, t) {
    var a = "KaTeX parse error: " + e, n, s, o = t && t.loc;
    if (o && o.start <= o.end) {
      var h = o.lexer.input;
      n = o.start, s = o.end, n === h.length ? a += " at end of input: " : a += " at position " + (n + 1) + ": ";
      var m = h.slice(n, s).replace(/[^]/g, "$&̲"), d;
      n > 15 ? d = "…" + h.slice(n - 15, n) : d = h.slice(0, n);
      var v;
      s + 15 < h.length ? v = h.slice(s, s + 15) + "…" : v = h.slice(s), a += d + m + v;
    }
    super(a), this.name = "ParseError", this.position = void 0, this.length = void 0, this.rawMessage = void 0, Object.setPrototypeOf(this, S.prototype), this.position = n, n != null && s != null && (this.length = s - n), this.rawMessage = e;
  }
}
var l1 = /([A-Z])/g, o1 = (r) => r.replace(l1, "-$1").toLowerCase(), u1 = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#x27;"
}, h1 = /[&><"']/g, i0 = (r) => String(r).replace(h1, (e) => u1[e]), De = (r) => r.type === "ordgroup" || r.type === "color" ? r.body.length === 1 ? De(r.body[0]) : r : r.type === "font" ? De(r.body) : r, c1 = /* @__PURE__ */ new Set(["mathord", "textord", "atom"]), q0 = (r) => c1.has(De(r).type), m1 = (r) => {
  var e = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(r);
  return e ? e[2] !== ":" || !/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(e[1]) ? null : e[1].toLowerCase() : "_relative";
}, ct = {
  displayMode: {
    type: "boolean",
    description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
    cli: "-d, --display-mode"
  },
  output: {
    type: {
      enum: ["htmlAndMathml", "html", "mathml"]
    },
    description: "Determines the markup language of the output.",
    cli: "-F, --format <type>"
  },
  leqno: {
    type: "boolean",
    description: "Render display math in leqno style (left-justified tags)."
  },
  fleqn: {
    type: "boolean",
    description: "Render display math flush left."
  },
  throwOnError: {
    type: "boolean",
    default: !0,
    cli: "-t, --no-throw-on-error",
    cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
  },
  errorColor: {
    type: "string",
    default: "#cc0000",
    cli: "-c, --error-color <color>",
    cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
    cliProcessor: (r) => "#" + r
  },
  macros: {
    type: "object",
    cli: "-m, --macro <def>",
    cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
    cliDefault: [],
    cliProcessor: (r, e) => (e.push(r), e)
  },
  minRuleThickness: {
    type: "number",
    description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
    processor: (r) => Math.max(0, r),
    cli: "--min-rule-thickness <size>",
    cliProcessor: parseFloat
  },
  colorIsTextColor: {
    type: "boolean",
    description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
    cli: "-b, --color-is-text-color"
  },
  strict: {
    type: [{
      enum: ["warn", "ignore", "error"]
    }, "boolean", "function"],
    description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
    cli: "-S, --strict",
    cliDefault: !1
  },
  trust: {
    type: ["boolean", "function"],
    description: "Trust the input, enabling all HTML features such as \\url.",
    cli: "-T, --trust"
  },
  maxSize: {
    type: "number",
    default: 1 / 0,
    description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
    processor: (r) => Math.max(0, r),
    cli: "-s, --max-size <n>",
    cliProcessor: parseInt
  },
  maxExpand: {
    type: "number",
    default: 1e3,
    description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
    processor: (r) => Math.max(0, r),
    cli: "-e, --max-expand <n>",
    cliProcessor: (r) => r === "Infinity" ? 1 / 0 : parseInt(r)
  },
  globalGroup: {
    type: "boolean",
    cli: !1
  }
};
function d1(r) {
  if (typeof r != "string")
    return r.enum[0];
  switch (r) {
    case "boolean":
      return !1;
    case "string":
      return "";
    case "number":
      return 0;
    case "object":
      return {};
    default:
      throw new Error("Unexpected schema type; settings must declare an explicit default.");
  }
}
function f1(r) {
  if (Object.prototype.hasOwnProperty.call(r, "default") && r.default !== void 0)
    return r.default;
  var e = Array.isArray(r.type) ? r.type[0] : r.type;
  return d1(e);
}
function p1(r, e, t, a) {
  var n = Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0, s = Object.prototype.hasOwnProperty.call(a, "processor") ? a.processor : void 0;
  r[e] = n !== void 0 ? s ? s(n) : n : f1(a);
}
class Rt {
  constructor(e) {
    e === void 0 && (e = {}), this.displayMode = void 0, this.output = void 0, this.leqno = void 0, this.fleqn = void 0, this.throwOnError = void 0, this.errorColor = void 0, this.macros = void 0, this.minRuleThickness = void 0, this.colorIsTextColor = void 0, this.strict = void 0, this.trust = void 0, this.maxSize = void 0, this.maxExpand = void 0, this.globalGroup = void 0, e = e || {};
    for (var t of Object.keys(ct)) {
      var a = ct[t];
      a && p1(this, t, e, a);
    }
  }
  /**
   * Report nonstrict (non-LaTeX-compatible) input.
   * Can safely not be called if `this.strict` is false in JavaScript.
   */
  reportNonstrict(e, t, a) {
    var n = this.strict;
    if (typeof n == "function" && (n = n(e, t, a)), !(!n || n === "ignore")) {
      if (n === !0 || n === "error")
        throw new S("LaTeX-incompatible input and strict mode is set to 'error': " + (t + " [" + e + "]"), a);
      n === "warn" ? typeof console != "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")) : typeof console != "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + n + "': " + t + " [" + e + "]"));
    }
  }
  /**
   * Check whether to apply strict (LaTeX-adhering) behavior for unusual
   * input (like `\\`).  Unlike `nonstrict`, will not throw an error;
   * instead, "error" translates to a return value of `true`, while "ignore"
   * translates to a return value of `false`.  May still print a warning:
   * "warn" prints a warning and returns `false`.
   * This is for the second category of `errorCode`s listed in the README.
   */
  useStrictBehavior(e, t, a) {
    var n = this.strict;
    if (typeof n == "function")
      try {
        n = n(e, t, a);
      } catch (s) {
        n = "error";
      }
    return !n || n === "ignore" ? !1 : n === !0 || n === "error" ? !0 : n === "warn" ? (typeof console != "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")), !1) : (typeof console != "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + n + "': " + t + " [" + e + "]")), !1);
  }
  /**
   * Check whether to test potentially dangerous input, and return
   * `true` (trusted) or `false` (untrusted).  The sole argument `context`
   * should be an object with `command` field specifying the relevant LaTeX
   * command (as a string starting with `\`), and any other arguments, etc.
   * If `context` has a `url` field, a `protocol` field will automatically
   * get added by this function (changing the specified object).
   */
  isTrusted(e) {
    if ("url" in e && e.url && !e.protocol) {
      var t = m1(e.url);
      if (t == null)
        return !1;
      e.protocol = t;
    }
    var a = typeof this.trust == "function" ? this.trust(e) : this.trust;
    return !!a;
  }
}
class F0 {
  constructor(e, t, a) {
    this.id = void 0, this.size = void 0, this.cramped = void 0, this.id = e, this.size = t, this.cramped = a;
  }
  /**
   * Get the style of a superscript given a base in the current style.
   */
  sup() {
    return w0[v1[this.id]];
  }
  /**
   * Get the style of a subscript given a base in the current style.
   */
  sub() {
    return w0[g1[this.id]];
  }
  /**
   * Get the style of a fraction numerator given the fraction in the current
   * style.
   */
  fracNum() {
    return w0[b1[this.id]];
  }
  /**
   * Get the style of a fraction denominator given the fraction in the current
   * style.
   */
  fracDen() {
    return w0[y1[this.id]];
  }
  /**
   * Get the cramped version of a style (in particular, cramping a cramped style
   * doesn't change the style).
   */
  cramp() {
    return w0[x1[this.id]];
  }
  /**
   * Get a text or display version of this style.
   */
  text() {
    return w0[w1[this.id]];
  }
  /**
   * Return true if this style is tightly spaced (scriptstyle/scriptscriptstyle)
   */
  isTight() {
    return this.size >= 2;
  }
}
var Nt = 0, Re = 1, te = 2, B0 = 3, ce = 4, v0 = 5, re = 6, o0 = 7, w0 = [new F0(Nt, 0, !1), new F0(Re, 0, !0), new F0(te, 1, !1), new F0(B0, 1, !0), new F0(ce, 2, !1), new F0(v0, 2, !0), new F0(re, 3, !1), new F0(o0, 3, !0)], v1 = [ce, v0, ce, v0, re, o0, re, o0], g1 = [v0, v0, v0, v0, o0, o0, o0, o0], b1 = [te, B0, ce, v0, re, o0, re, o0], y1 = [B0, B0, v0, v0, o0, o0, o0, o0], x1 = [Re, Re, B0, B0, v0, v0, o0, o0], w1 = [Nt, Re, te, B0, te, B0, te, B0], I = {
  DISPLAY: w0[Nt],
  TEXT: w0[te],
  SCRIPT: w0[ce],
  SCRIPTSCRIPT: w0[re]
}, mt = [{
  // Latin characters beyond the Latin-1 characters we have metrics for.
  // Needed for Czech, Hungarian and Turkish text, for example.
  name: "latin",
  blocks: [
    [256, 591],
    // Latin Extended-A and Latin Extended-B
    [768, 879]
    // Combining Diacritical marks
  ]
}, {
  // The Cyrillic script used by Russian and related languages.
  // A Cyrillic subset used to be supported as explicitly defined
  // symbols in symbols.js
  name: "cyrillic",
  blocks: [[1024, 1279]]
}, {
  // Armenian
  name: "armenian",
  blocks: [[1328, 1423]]
}, {
  // The Brahmic scripts of South and Southeast Asia
  // Devanagari (0900–097F)
  // Bengali (0980–09FF)
  // Gurmukhi (0A00–0A7F)
  // Gujarati (0A80–0AFF)
  // Oriya (0B00–0B7F)
  // Tamil (0B80–0BFF)
  // Telugu (0C00–0C7F)
  // Kannada (0C80–0CFF)
  // Malayalam (0D00–0D7F)
  // Sinhala (0D80–0DFF)
  // Thai (0E00–0E7F)
  // Lao (0E80–0EFF)
  // Tibetan (0F00–0FFF)
  // Myanmar (1000–109F)
  name: "brahmic",
  blocks: [[2304, 4255]]
}, {
  name: "georgian",
  blocks: [[4256, 4351]]
}, {
  // Chinese and Japanese.
  // The "k" in cjk is for Korean, but we've separated Korean out
  name: "cjk",
  blocks: [
    [12288, 12543],
    // CJK symbols and punctuation, Hiragana, Katakana
    [19968, 40879],
    // CJK ideograms
    [65280, 65376]
    // Fullwidth punctuation
    // TODO: add halfwidth Katakana and Romanji glyphs
  ]
}, {
  // Korean
  name: "hangul",
  blocks: [[44032, 55215]]
}];
function k1(r) {
  for (var e = 0; e < mt.length; e++)
    for (var t = mt[e], a = 0; a < t.blocks.length; a++) {
      var n = t.blocks[a];
      if (r >= n[0] && r <= n[1])
        return t.name;
    }
  return null;
}
var qe = [];
mt.forEach((r) => r.blocks.forEach((e) => qe.push(...e)));
function _r(r) {
  for (var e = 0; e < qe.length; e += 2)
    if (r >= qe[e] && r <= qe[e + 1])
      return !0;
  return !1;
}
var a0 = (r) => r + " " + r, ee = 80, S1 = function(e, t) {
  return "M95," + (622 + e + t) + `
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l` + e / 2.075 + " -" + e + `
c5.3,-9.3,12,-14,20,-14
H400000v` + (40 + e) + `H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M` + (834 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, A1 = function(e, t) {
  return "M263," + (601 + e + t) + `c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l` + e / 2.084 + " -" + e + `
c4.7,-7.3,11,-11,19,-11
H40000v` + (40 + e) + `H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, z1 = function(e, t) {
  return "M983 " + (10 + e + t) + `
l` + e / 3.13 + " -" + e + `
c4,-6.7,10,-10,18,-10 H400000v` + (40 + e) + `
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, M1 = function(e, t) {
  return "M424," + (2398 + e + t) + `
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l` + e / 4.223 + " -" + e + `c4,-6.7,10,-10,18,-10 H400000
v` + (40 + e) + `H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M` + (1001 + e) + " " + t + `
h400000v` + (40 + e) + "h-400000z";
}, T1 = function(e, t) {
  return "M473," + (2713 + e + t) + `
c339.3,-1799.3,509.3,-2700,510,-2702 l` + e / 5.298 + " -" + e + `
c3.3,-7.3,9.3,-11,18,-11 H400000v` + (40 + e) + `H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "H1017.7z";
}, C1 = function(e) {
  var t = e / 2;
  return "M400000 " + e + " H0 L" + t + " 0 l65 45 L145 " + (e - 80) + " H400000z";
}, B1 = function(e, t, a) {
  var n = a - 54 - t - e;
  return "M702 " + (e + t) + "H400000" + (40 + e) + `
H742v` + n + `l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ` + t + "H400000v" + (40 + e) + "H742z";
}, D1 = function(e, t, a) {
  t = 1e3 * t;
  var n = "";
  switch (e) {
    case "sqrtMain":
      n = S1(t, ee);
      break;
    case "sqrtSize1":
      n = A1(t, ee);
      break;
    case "sqrtSize2":
      n = z1(t, ee);
      break;
    case "sqrtSize3":
      n = M1(t, ee);
      break;
    case "sqrtSize4":
      n = T1(t, ee);
      break;
    case "sqrtTall":
      n = B1(t, ee, a);
  }
  return n;
}, q1 = function(e, t) {
  switch (e) {
    case "⎜":
      return a0("M291 0 H417 V" + t + " H291z");
    case "∣":
      return a0("M145 0 H188 V" + t + " H145z");
    case "∥":
      return a0("M145 0 H188 V" + t + " H145z") + a0("M367 0 H410 V" + t + " H367z");
    case "⎟":
      return a0("M457 0 H583 V" + t + " H457z");
    case "⎢":
      return a0("M319 0 H403 V" + t + " H319z");
    case "⎥":
      return a0("M263 0 H347 V" + t + " H263z");
    case "⎪":
      return a0("M384 0 H504 V" + t + " H384z");
    case "⏐":
      return a0("M312 0 H355 V" + t + " H312z");
    case "‖":
      return a0("M257 0 H300 V" + t + " H257z") + a0("M478 0 H521 V" + t + " H478z");
    default:
      return "";
  }
}, cr = {
  // The doubleleftarrow geometry is from glyph U+21D0 in the font KaTeX Main
  doubleleftarrow: `M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`,
  // doublerightarrow is from glyph U+21D2 in font KaTeX Main
  doublerightarrow: `M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`,
  // leftarrow is from glyph U+2190 in font KaTeX Main
  leftarrow: `M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`,
  // overbrace is from glyphs U+23A9/23A8/23A7 in font KaTeX_Size4-Regular
  leftbrace: `M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`,
  leftbraceunder: `M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`,
  // overgroup is from the MnSymbol package (public domain)
  leftgroup: `M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`,
  leftgroupunder: `M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`,
  // Harpoons are from glyph U+21BD in font KaTeX Main
  leftharpoon: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`,
  leftharpoonplus: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`,
  leftharpoondown: `M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`,
  leftharpoondownplus: `M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`,
  // hook is from glyph U+21A9 in font KaTeX Main
  lefthook: `M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`,
  leftlinesegment: a0("M40 281 V428 H0 V94 H40 V241 H400000 v40z"),
  leftbracketunder: a0("M0 0 h120 V290 H399995 v120 H0z"),
  leftbracketover: a0("M0 440 h120 V150 H399995 v-120 H0z"),
  leftmapsto: a0("M40 281 V448H0V74H40V241H400000v40z"),
  // tofrom is from glyph U+21C4 in font KaTeX AMS Regular
  leftToFrom: `M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`,
  longequal: a0("M0 50 h400000 v40H0z m0 194h40000v40H0z"),
  midbrace: `M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`,
  midbraceunder: `M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`,
  oiintSize1: `M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`,
  oiintSize2: `M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`,
  oiiintSize1: `M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`,
  oiiintSize2: `M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`,
  rightarrow: `M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`,
  rightbrace: `M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`,
  rightbraceunder: `M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`,
  rightgroup: `M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`,
  rightgroupunder: `M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`,
  rightharpoon: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`,
  rightharpoonplus: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`,
  rightharpoondown: `M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`,
  rightharpoondownplus: `M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`,
  righthook: `M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`,
  rightlinesegment: a0("M399960 241 V94 h40 V428 h-40 V281 H0 v-40z"),
  rightbracketunder: a0("M399995 0 h-120 V290 H0 v120 H400000z"),
  rightbracketover: a0("M399995 440 h-120 V150 H0 v-120 H399995z"),
  rightToFrom: `M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`,
  // twoheadleftarrow is from glyph U+219E in font KaTeX AMS Regular
  twoheadleftarrow: `M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`,
  twoheadrightarrow: `M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`,
  // tilde1 is a modified version of a glyph from the MnSymbol package
  tilde1: `M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`,
  // ditto tilde2, tilde3, & tilde4
  tilde2: `M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`,
  tilde3: `M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`,
  tilde4: `M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`,
  // vec is from glyph U+20D7 in font KaTeX Main
  vec: `M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`,
  // widehat1 is a modified version of a glyph from the MnSymbol package
  widehat1: `M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`,
  // ditto widehat2, widehat3, & widehat4
  widehat2: `M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  widehat3: `M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  widehat4: `M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  // widecheck paths are all inverted versions of widehat
  widecheck1: `M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`,
  widecheck2: `M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  widecheck3: `M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  widecheck4: `M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  // The next ten paths support reaction arrows from the mhchem package.
  // Arrows for \ce{<-->} are offset from xAxis by 0.22ex, per mhchem in LaTeX
  // baraboveleftarrow is mostly from glyph U+2190 in font KaTeX Main
  baraboveleftarrow: `M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`,
  // rightarrowabovebar is mostly from glyph U+2192, KaTeX Main
  rightarrowabovebar: `M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`,
  // The short left harpoon has 0.5em (i.e. 500 units) kern on the left end.
  // Ref from mhchem.sty: \rlap{\raisebox{-.22ex}{$\kern0.5em
  baraboveshortleftharpoon: `M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`,
  rightharpoonaboveshortbar: `M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`,
  shortbaraboveleftharpoon: `M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`,
  shortrightharpoonabovebar: `M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z`
}, R1 = function(e, t) {
  switch (e) {
    case "lbrack":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + t + ` v1759 v84 h347 v-84
H403z M403 1759 V0 H319 V1759 v` + t + " v1759 v84 h84z";
    case "rbrack":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + t + ` v1759 H0 v84 H347z
M347 1759 V0 H263 V1759 v` + t + " v1759 h84z";
    case "vert":
      return "M145 15 v585 v" + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t + " v585 h43z";
    case "doublevert":
      return "M145 15 v585 v" + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t + ` v585 h43z
M367 15 v585 v` + t + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v` + t + " v585 h43z";
    case "lfloor":
      return "M319 602 V0 H403 V602 v" + t + ` v1715 h263 v84 H319z
MM319 602 V0 H403 V602 v` + t + " v1715 H319z";
    case "rfloor":
      return "M319 602 V0 H403 V602 v" + t + ` v1799 H0 v-84 H319z
MM319 602 V0 H403 V602 v` + t + " v1715 H319z";
    case "lceil":
      return "M403 1759 V84 H666 V0 H319 V1759 v" + t + ` v602 h84z
M403 1759 V0 H319 V1759 v` + t + " v602 h84z";
    case "rceil":
      return "M347 1759 V0 H0 V84 H263 V1759 v" + t + ` v602 h84z
M347 1759 V0 h-84 V1759 v` + t + " v602 h84z";
    case "lparen":
      return `M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1
c-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,
-36,557 l0,` + (t + 84) + `c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,
949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9
c0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,
-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189
l0,-` + (t + 92) + `c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,
-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z`;
    case "rparen":
      return `M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,
63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5
c11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,` + (t + 9) + `
c-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664
c-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11
c0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17
c242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558
l0,-` + (t + 144) + `c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,
-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z`;
    default:
      throw new Error("Unknown stretchy delimiter.");
  }
};
function N1(r) {
  return "toText" in r;
}
class ie {
  // Never used; needed for satisfying interface.
  constructor(e) {
    this.children = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.children = e, this.classes = [], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = {};
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  /** Convert the fragment into a node. */
  toNode() {
    for (var e = document.createDocumentFragment(), t = 0; t < this.children.length; t++)
      e.appendChild(this.children[t].toNode());
    return e;
  }
  /** Convert the fragment into HTML markup. */
  toMarkup() {
    for (var e = "", t = 0; t < this.children.length; t++)
      e += this.children[t].toMarkup();
    return e;
  }
  /**
   * Converts the math node into a string, similar to innerText. Applies to
   * MathDomNode's only.
   */
  toText() {
    return this.children.map((e) => {
      if (N1(e))
        return e.toText();
      throw new Error("Expected MathDomNode with toText, got " + e.constructor.name);
    }).join("");
  }
}
var dt = {
  // https://en.wikibooks.org/wiki/LaTeX/Lengths and
  // https://tex.stackexchange.com/a/8263
  pt: 1,
  // TeX point
  mm: 7227 / 2540,
  // millimeter
  cm: 7227 / 254,
  // centimeter
  in: 72.27,
  // inch
  bp: 803 / 800,
  // big (PostScript) points
  pc: 12,
  // pica
  dd: 1238 / 1157,
  // didot
  cc: 14856 / 1157,
  // cicero (12 didot)
  nd: 685 / 642,
  // new didot
  nc: 1370 / 107,
  // new cicero (12 new didot)
  sp: 1 / 65536,
  // scaled point (TeX's internal smallest unit)
  // https://tex.stackexchange.com/a/41371
  px: 803 / 800
  // \pdfpxdimen defaults to 1 bp in pdfTeX and LuaTeX
}, E1 = {
  ex: !0,
  em: !0,
  mu: !0
}, ea = function(e) {
  return typeof e != "string" && (e = e.unit), e in dt || e in E1 || e === "ex";
}, J = function(e, t) {
  var a;
  if (e.unit in dt)
    a = dt[e.unit] / t.fontMetrics().ptPerEm / t.sizeMultiplier;
  else if (e.unit === "mu")
    a = t.fontMetrics().cssEmPerMu;
  else {
    var n;
    if (t.style.isTight() ? n = t.havingStyle(t.style.text()) : n = t, e.unit === "ex")
      a = n.fontMetrics().xHeight;
    else if (e.unit === "em")
      a = n.fontMetrics().quad;
    else
      throw new S("Invalid unit: '" + e.unit + "'");
    n !== t && (a *= n.sizeMultiplier / t.sizeMultiplier);
  }
  return Math.min(e.number * a, t.maxSize);
}, z = function(e) {
  return +e.toFixed(4) + "em";
}, P0 = function(e) {
  return e.filter((t) => t).join(" ");
}, Et = function(e) {
  var t = "";
  for (var a of Object.keys(e)) {
    var n = e[a];
    n !== void 0 && (t += o1(a) + ":" + n + ";");
  }
  return t;
}, ta = function(e, t, a) {
  if (this.classes = e || [], this.attributes = {}, this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = a || {}, t) {
    t.style.isTight() && this.classes.push("mtight");
    var n = t.getColor();
    n && (this.style.color = n);
  }
}, ra = function(e) {
  var t = document.createElement(e);
  t.className = P0(this.classes), Object.assign(t.style, this.style);
  for (var a of Object.keys(this.attributes))
    t.setAttribute(a, this.attributes[a]);
  for (var n = 0; n < this.children.length; n++)
    t.appendChild(this.children[n].toNode());
  return t;
}, I1 = /[\s"'>/=\x00-\x1f]/, aa = function(e) {
  var t = "<" + e;
  this.classes.length && (t += ' class="' + i0(P0(this.classes)) + '"');
  var a = Et(this.style);
  a && (t += ' style="' + i0(a) + '"');
  for (var n of Object.keys(this.attributes)) {
    if (I1.test(n))
      throw new S("Invalid attribute name '" + n + "'");
    t += " " + n + '="' + i0(this.attributes[n]) + '"';
  }
  t += ">";
  for (var s = 0; s < this.children.length; s++)
    t += this.children[s].toMarkup();
  return t += "</" + e + ">", t;
};
class se {
  constructor(e, t, a, n) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.width = void 0, this.maxFontSize = void 0, this.style = void 0, this.italic = void 0, ta.call(this, e, a, n), this.children = t || [];
  }
  /**
   * Sets an arbitrary attribute on the span. Warning: use this wisely. Not
   * all browsers support attributes the same, and having too many custom
   * attributes is probably bad.
   */
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    return ra.call(this, "span");
  }
  toMarkup() {
    return aa.call(this, "span");
  }
}
class Ie {
  constructor(e, t, a, n) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, ta.call(this, t, n), this.children = a || [], this.setAttribute("href", e);
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    return ra.call(this, "a");
  }
  toMarkup() {
    return aa.call(this, "a");
  }
}
class O1 {
  constructor(e, t, a) {
    this.src = void 0, this.alt = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.alt = t, this.src = e, this.classes = ["mord"], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = a;
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  toNode() {
    var e = document.createElement("img");
    return e.src = this.src, e.alt = this.alt, e.className = "mord", Object.assign(e.style, this.style), e;
  }
  toMarkup() {
    var e = '<img src="' + i0(this.src) + '"' + (' alt="' + i0(this.alt) + '"'), t = Et(this.style);
    return t && (e += ' style="' + i0(t) + '"'), e += "'/>", e;
  }
}
var F1 = {
  î: "ı̂",
  ï: "ı̈",
  í: "ı́",
  // 'ī': '\u0131\u0304', // enable when we add Extended Latin
  ì: "ı̀"
};
class d0 {
  constructor(e, t, a, n, s, o, h, m) {
    this.text = void 0, this.height = void 0, this.depth = void 0, this.italic = void 0, this.skew = void 0, this.width = void 0, this.maxFontSize = void 0, this.classes = void 0, this.style = void 0, this.text = e, this.height = t || 0, this.depth = a || 0, this.italic = n || 0, this.skew = s || 0, this.width = o || 0, this.classes = h || [], this.style = m || {}, this.maxFontSize = 0;
    var d = k1(this.text.charCodeAt(0));
    d && this.classes.push(d + "_fallback"), /[îïíì]/.test(this.text) && (this.text = F1[this.text]);
  }
  hasClass(e) {
    return this.classes.includes(e);
  }
  /**
   * Creates a text node or span from a symbol node. Note that a span is only
   * created if it is needed.
   */
  toNode() {
    var e = document.createTextNode(this.text), t = null;
    return this.italic > 0 && (t = document.createElement("span"), t.style.marginRight = z(this.italic)), this.classes.length > 0 && (t = t || document.createElement("span"), t.className = P0(this.classes)), Object.keys(this.style).length > 0 && (t = t || document.createElement("span"), Object.assign(t.style, this.style)), t ? (t.appendChild(e), t) : e;
  }
  /**
   * Creates markup for a symbol node.
   */
  toMarkup() {
    var e = !1, t = "<span";
    this.classes.length && (e = !0, t += ' class="', t += i0(P0(this.classes)), t += '"');
    var a = "";
    this.italic > 0 && (a += "margin-right:" + z(this.italic) + ";"), a += Et(this.style), a && (e = !0, t += ' style="' + i0(a) + '"');
    var n = i0(this.text);
    return e ? (t += ">", t += n, t += "</span>", t) : n;
  }
}
class D0 {
  constructor(e, t) {
    this.children = void 0, this.attributes = void 0, this.children = e || [], this.attributes = t || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "svg");
    for (var a of Object.keys(this.attributes))
      t.setAttribute(a, this.attributes[a]);
    for (var n = 0; n < this.children.length; n++)
      t.appendChild(this.children[n].toNode());
    return t;
  }
  toMarkup() {
    var e = '<svg xmlns="http://www.w3.org/2000/svg"';
    for (var t of Object.keys(this.attributes))
      e += " " + t + '="' + i0(this.attributes[t]) + '"';
    e += ">";
    for (var a = 0; a < this.children.length; a++)
      e += this.children[a].toMarkup();
    return e += "</svg>", e;
  }
}
class G0 {
  constructor(e, t) {
    this.pathName = void 0, this.alternate = void 0, this.pathName = e, this.alternate = t;
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "path");
    return this.alternate ? t.setAttribute("d", this.alternate) : t.setAttribute("d", cr[this.pathName]), t;
  }
  toMarkup() {
    return this.alternate ? '<path d="' + i0(this.alternate) + '"/>' : '<path d="' + i0(cr[this.pathName]) + '"/>';
  }
}
class ft {
  constructor(e) {
    this.attributes = void 0, this.attributes = e || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "line");
    for (var a of Object.keys(this.attributes))
      t.setAttribute(a, this.attributes[a]);
    return t;
  }
  toMarkup() {
    var e = "<line";
    for (var t of Object.keys(this.attributes))
      e += " " + t + '="' + i0(this.attributes[t]) + '"';
    return e += "/>", e;
  }
}
function H1(r) {
  if (r instanceof d0)
    return r;
  throw new Error("Expected symbolNode but got " + String(r) + ".");
}
function L1(r) {
  if (r instanceof se)
    return r;
  throw new Error("Expected span<HtmlDomNode> but got " + String(r) + ".");
}
var P1 = (r) => r instanceof se || r instanceof Ie || r instanceof ie, k0 = {
  "AMS-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.68889, 0, 0, 0.72222],
    66: [0, 0.68889, 0, 0, 0.66667],
    67: [0, 0.68889, 0, 0, 0.72222],
    68: [0, 0.68889, 0, 0, 0.72222],
    69: [0, 0.68889, 0, 0, 0.66667],
    70: [0, 0.68889, 0, 0, 0.61111],
    71: [0, 0.68889, 0, 0, 0.77778],
    72: [0, 0.68889, 0, 0, 0.77778],
    73: [0, 0.68889, 0, 0, 0.38889],
    74: [0.16667, 0.68889, 0, 0, 0.5],
    75: [0, 0.68889, 0, 0, 0.77778],
    76: [0, 0.68889, 0, 0, 0.66667],
    77: [0, 0.68889, 0, 0, 0.94445],
    78: [0, 0.68889, 0, 0, 0.72222],
    79: [0.16667, 0.68889, 0, 0, 0.77778],
    80: [0, 0.68889, 0, 0, 0.61111],
    81: [0.16667, 0.68889, 0, 0, 0.77778],
    82: [0, 0.68889, 0, 0, 0.72222],
    83: [0, 0.68889, 0, 0, 0.55556],
    84: [0, 0.68889, 0, 0, 0.66667],
    85: [0, 0.68889, 0, 0, 0.72222],
    86: [0, 0.68889, 0, 0, 0.72222],
    87: [0, 0.68889, 0, 0, 1],
    88: [0, 0.68889, 0, 0, 0.72222],
    89: [0, 0.68889, 0, 0, 0.72222],
    90: [0, 0.68889, 0, 0, 0.66667],
    107: [0, 0.68889, 0, 0, 0.55556],
    160: [0, 0, 0, 0, 0.25],
    165: [0, 0.675, 0.025, 0, 0.75],
    174: [0.15559, 0.69224, 0, 0, 0.94666],
    240: [0, 0.68889, 0, 0, 0.55556],
    295: [0, 0.68889, 0, 0, 0.54028],
    710: [0, 0.825, 0, 0, 2.33334],
    732: [0, 0.9, 0, 0, 2.33334],
    770: [0, 0.825, 0, 0, 2.33334],
    771: [0, 0.9, 0, 0, 2.33334],
    989: [0.08167, 0.58167, 0, 0, 0.77778],
    1008: [0, 0.43056, 0.04028, 0, 0.66667],
    8245: [0, 0.54986, 0, 0, 0.275],
    8463: [0, 0.68889, 0, 0, 0.54028],
    8487: [0, 0.68889, 0, 0, 0.72222],
    8498: [0, 0.68889, 0, 0, 0.55556],
    8502: [0, 0.68889, 0, 0, 0.66667],
    8503: [0, 0.68889, 0, 0, 0.44445],
    8504: [0, 0.68889, 0, 0, 0.66667],
    8513: [0, 0.68889, 0, 0, 0.63889],
    8592: [-0.03598, 0.46402, 0, 0, 0.5],
    8594: [-0.03598, 0.46402, 0, 0, 0.5],
    8602: [-0.13313, 0.36687, 0, 0, 1],
    8603: [-0.13313, 0.36687, 0, 0, 1],
    8606: [0.01354, 0.52239, 0, 0, 1],
    8608: [0.01354, 0.52239, 0, 0, 1],
    8610: [0.01354, 0.52239, 0, 0, 1.11111],
    8611: [0.01354, 0.52239, 0, 0, 1.11111],
    8619: [0, 0.54986, 0, 0, 1],
    8620: [0, 0.54986, 0, 0, 1],
    8621: [-0.13313, 0.37788, 0, 0, 1.38889],
    8622: [-0.13313, 0.36687, 0, 0, 1],
    8624: [0, 0.69224, 0, 0, 0.5],
    8625: [0, 0.69224, 0, 0, 0.5],
    8630: [0, 0.43056, 0, 0, 1],
    8631: [0, 0.43056, 0, 0, 1],
    8634: [0.08198, 0.58198, 0, 0, 0.77778],
    8635: [0.08198, 0.58198, 0, 0, 0.77778],
    8638: [0.19444, 0.69224, 0, 0, 0.41667],
    8639: [0.19444, 0.69224, 0, 0, 0.41667],
    8642: [0.19444, 0.69224, 0, 0, 0.41667],
    8643: [0.19444, 0.69224, 0, 0, 0.41667],
    8644: [0.1808, 0.675, 0, 0, 1],
    8646: [0.1808, 0.675, 0, 0, 1],
    8647: [0.1808, 0.675, 0, 0, 1],
    8648: [0.19444, 0.69224, 0, 0, 0.83334],
    8649: [0.1808, 0.675, 0, 0, 1],
    8650: [0.19444, 0.69224, 0, 0, 0.83334],
    8651: [0.01354, 0.52239, 0, 0, 1],
    8652: [0.01354, 0.52239, 0, 0, 1],
    8653: [-0.13313, 0.36687, 0, 0, 1],
    8654: [-0.13313, 0.36687, 0, 0, 1],
    8655: [-0.13313, 0.36687, 0, 0, 1],
    8666: [0.13667, 0.63667, 0, 0, 1],
    8667: [0.13667, 0.63667, 0, 0, 1],
    8669: [-0.13313, 0.37788, 0, 0, 1],
    8672: [-0.064, 0.437, 0, 0, 1.334],
    8674: [-0.064, 0.437, 0, 0, 1.334],
    8705: [0, 0.825, 0, 0, 0.5],
    8708: [0, 0.68889, 0, 0, 0.55556],
    8709: [0.08167, 0.58167, 0, 0, 0.77778],
    8717: [0, 0.43056, 0, 0, 0.42917],
    8722: [-0.03598, 0.46402, 0, 0, 0.5],
    8724: [0.08198, 0.69224, 0, 0, 0.77778],
    8726: [0.08167, 0.58167, 0, 0, 0.77778],
    8733: [0, 0.69224, 0, 0, 0.77778],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8737: [0, 0.69224, 0, 0, 0.72222],
    8738: [0.03517, 0.52239, 0, 0, 0.72222],
    8739: [0.08167, 0.58167, 0, 0, 0.22222],
    8740: [0.25142, 0.74111, 0, 0, 0.27778],
    8741: [0.08167, 0.58167, 0, 0, 0.38889],
    8742: [0.25142, 0.74111, 0, 0, 0.5],
    8756: [0, 0.69224, 0, 0, 0.66667],
    8757: [0, 0.69224, 0, 0, 0.66667],
    8764: [-0.13313, 0.36687, 0, 0, 0.77778],
    8765: [-0.13313, 0.37788, 0, 0, 0.77778],
    8769: [-0.13313, 0.36687, 0, 0, 0.77778],
    8770: [-0.03625, 0.46375, 0, 0, 0.77778],
    8774: [0.30274, 0.79383, 0, 0, 0.77778],
    8776: [-0.01688, 0.48312, 0, 0, 0.77778],
    8778: [0.08167, 0.58167, 0, 0, 0.77778],
    8782: [0.06062, 0.54986, 0, 0, 0.77778],
    8783: [0.06062, 0.54986, 0, 0, 0.77778],
    8785: [0.08198, 0.58198, 0, 0, 0.77778],
    8786: [0.08198, 0.58198, 0, 0, 0.77778],
    8787: [0.08198, 0.58198, 0, 0, 0.77778],
    8790: [0, 0.69224, 0, 0, 0.77778],
    8791: [0.22958, 0.72958, 0, 0, 0.77778],
    8796: [0.08198, 0.91667, 0, 0, 0.77778],
    8806: [0.25583, 0.75583, 0, 0, 0.77778],
    8807: [0.25583, 0.75583, 0, 0, 0.77778],
    8808: [0.25142, 0.75726, 0, 0, 0.77778],
    8809: [0.25142, 0.75726, 0, 0, 0.77778],
    8812: [0.25583, 0.75583, 0, 0, 0.5],
    8814: [0.20576, 0.70576, 0, 0, 0.77778],
    8815: [0.20576, 0.70576, 0, 0, 0.77778],
    8816: [0.30274, 0.79383, 0, 0, 0.77778],
    8817: [0.30274, 0.79383, 0, 0, 0.77778],
    8818: [0.22958, 0.72958, 0, 0, 0.77778],
    8819: [0.22958, 0.72958, 0, 0, 0.77778],
    8822: [0.1808, 0.675, 0, 0, 0.77778],
    8823: [0.1808, 0.675, 0, 0, 0.77778],
    8828: [0.13667, 0.63667, 0, 0, 0.77778],
    8829: [0.13667, 0.63667, 0, 0, 0.77778],
    8830: [0.22958, 0.72958, 0, 0, 0.77778],
    8831: [0.22958, 0.72958, 0, 0, 0.77778],
    8832: [0.20576, 0.70576, 0, 0, 0.77778],
    8833: [0.20576, 0.70576, 0, 0, 0.77778],
    8840: [0.30274, 0.79383, 0, 0, 0.77778],
    8841: [0.30274, 0.79383, 0, 0, 0.77778],
    8842: [0.13597, 0.63597, 0, 0, 0.77778],
    8843: [0.13597, 0.63597, 0, 0, 0.77778],
    8847: [0.03517, 0.54986, 0, 0, 0.77778],
    8848: [0.03517, 0.54986, 0, 0, 0.77778],
    8858: [0.08198, 0.58198, 0, 0, 0.77778],
    8859: [0.08198, 0.58198, 0, 0, 0.77778],
    8861: [0.08198, 0.58198, 0, 0, 0.77778],
    8862: [0, 0.675, 0, 0, 0.77778],
    8863: [0, 0.675, 0, 0, 0.77778],
    8864: [0, 0.675, 0, 0, 0.77778],
    8865: [0, 0.675, 0, 0, 0.77778],
    8872: [0, 0.69224, 0, 0, 0.61111],
    8873: [0, 0.69224, 0, 0, 0.72222],
    8874: [0, 0.69224, 0, 0, 0.88889],
    8876: [0, 0.68889, 0, 0, 0.61111],
    8877: [0, 0.68889, 0, 0, 0.61111],
    8878: [0, 0.68889, 0, 0, 0.72222],
    8879: [0, 0.68889, 0, 0, 0.72222],
    8882: [0.03517, 0.54986, 0, 0, 0.77778],
    8883: [0.03517, 0.54986, 0, 0, 0.77778],
    8884: [0.13667, 0.63667, 0, 0, 0.77778],
    8885: [0.13667, 0.63667, 0, 0, 0.77778],
    8888: [0, 0.54986, 0, 0, 1.11111],
    8890: [0.19444, 0.43056, 0, 0, 0.55556],
    8891: [0.19444, 0.69224, 0, 0, 0.61111],
    8892: [0.19444, 0.69224, 0, 0, 0.61111],
    8901: [0, 0.54986, 0, 0, 0.27778],
    8903: [0.08167, 0.58167, 0, 0, 0.77778],
    8905: [0.08167, 0.58167, 0, 0, 0.77778],
    8906: [0.08167, 0.58167, 0, 0, 0.77778],
    8907: [0, 0.69224, 0, 0, 0.77778],
    8908: [0, 0.69224, 0, 0, 0.77778],
    8909: [-0.03598, 0.46402, 0, 0, 0.77778],
    8910: [0, 0.54986, 0, 0, 0.76042],
    8911: [0, 0.54986, 0, 0, 0.76042],
    8912: [0.03517, 0.54986, 0, 0, 0.77778],
    8913: [0.03517, 0.54986, 0, 0, 0.77778],
    8914: [0, 0.54986, 0, 0, 0.66667],
    8915: [0, 0.54986, 0, 0, 0.66667],
    8916: [0, 0.69224, 0, 0, 0.66667],
    8918: [0.0391, 0.5391, 0, 0, 0.77778],
    8919: [0.0391, 0.5391, 0, 0, 0.77778],
    8920: [0.03517, 0.54986, 0, 0, 1.33334],
    8921: [0.03517, 0.54986, 0, 0, 1.33334],
    8922: [0.38569, 0.88569, 0, 0, 0.77778],
    8923: [0.38569, 0.88569, 0, 0, 0.77778],
    8926: [0.13667, 0.63667, 0, 0, 0.77778],
    8927: [0.13667, 0.63667, 0, 0, 0.77778],
    8928: [0.30274, 0.79383, 0, 0, 0.77778],
    8929: [0.30274, 0.79383, 0, 0, 0.77778],
    8934: [0.23222, 0.74111, 0, 0, 0.77778],
    8935: [0.23222, 0.74111, 0, 0, 0.77778],
    8936: [0.23222, 0.74111, 0, 0, 0.77778],
    8937: [0.23222, 0.74111, 0, 0, 0.77778],
    8938: [0.20576, 0.70576, 0, 0, 0.77778],
    8939: [0.20576, 0.70576, 0, 0, 0.77778],
    8940: [0.30274, 0.79383, 0, 0, 0.77778],
    8941: [0.30274, 0.79383, 0, 0, 0.77778],
    8994: [0.19444, 0.69224, 0, 0, 0.77778],
    8995: [0.19444, 0.69224, 0, 0, 0.77778],
    9416: [0.15559, 0.69224, 0, 0, 0.90222],
    9484: [0, 0.69224, 0, 0, 0.5],
    9488: [0, 0.69224, 0, 0, 0.5],
    9492: [0, 0.37788, 0, 0, 0.5],
    9496: [0, 0.37788, 0, 0, 0.5],
    9585: [0.19444, 0.68889, 0, 0, 0.88889],
    9586: [0.19444, 0.74111, 0, 0, 0.88889],
    9632: [0, 0.675, 0, 0, 0.77778],
    9633: [0, 0.675, 0, 0, 0.77778],
    9650: [0, 0.54986, 0, 0, 0.72222],
    9651: [0, 0.54986, 0, 0, 0.72222],
    9654: [0.03517, 0.54986, 0, 0, 0.77778],
    9660: [0, 0.54986, 0, 0, 0.72222],
    9661: [0, 0.54986, 0, 0, 0.72222],
    9664: [0.03517, 0.54986, 0, 0, 0.77778],
    9674: [0.11111, 0.69224, 0, 0, 0.66667],
    9733: [0.19444, 0.69224, 0, 0, 0.94445],
    10003: [0, 0.69224, 0, 0, 0.83334],
    10016: [0, 0.69224, 0, 0, 0.83334],
    10731: [0.11111, 0.69224, 0, 0, 0.66667],
    10846: [0.19444, 0.75583, 0, 0, 0.61111],
    10877: [0.13667, 0.63667, 0, 0, 0.77778],
    10878: [0.13667, 0.63667, 0, 0, 0.77778],
    10885: [0.25583, 0.75583, 0, 0, 0.77778],
    10886: [0.25583, 0.75583, 0, 0, 0.77778],
    10887: [0.13597, 0.63597, 0, 0, 0.77778],
    10888: [0.13597, 0.63597, 0, 0, 0.77778],
    10889: [0.26167, 0.75726, 0, 0, 0.77778],
    10890: [0.26167, 0.75726, 0, 0, 0.77778],
    10891: [0.48256, 0.98256, 0, 0, 0.77778],
    10892: [0.48256, 0.98256, 0, 0, 0.77778],
    10901: [0.13667, 0.63667, 0, 0, 0.77778],
    10902: [0.13667, 0.63667, 0, 0, 0.77778],
    10933: [0.25142, 0.75726, 0, 0, 0.77778],
    10934: [0.25142, 0.75726, 0, 0, 0.77778],
    10935: [0.26167, 0.75726, 0, 0, 0.77778],
    10936: [0.26167, 0.75726, 0, 0, 0.77778],
    10937: [0.26167, 0.75726, 0, 0, 0.77778],
    10938: [0.26167, 0.75726, 0, 0, 0.77778],
    10949: [0.25583, 0.75583, 0, 0, 0.77778],
    10950: [0.25583, 0.75583, 0, 0, 0.77778],
    10955: [0.28481, 0.79383, 0, 0, 0.77778],
    10956: [0.28481, 0.79383, 0, 0, 0.77778],
    57350: [0.08167, 0.58167, 0, 0, 0.22222],
    57351: [0.08167, 0.58167, 0, 0, 0.38889],
    57352: [0.08167, 0.58167, 0, 0, 0.77778],
    57353: [0, 0.43056, 0.04028, 0, 0.66667],
    57356: [0.25142, 0.75726, 0, 0, 0.77778],
    57357: [0.25142, 0.75726, 0, 0, 0.77778],
    57358: [0.41951, 0.91951, 0, 0, 0.77778],
    57359: [0.30274, 0.79383, 0, 0, 0.77778],
    57360: [0.30274, 0.79383, 0, 0, 0.77778],
    57361: [0.41951, 0.91951, 0, 0, 0.77778],
    57366: [0.25142, 0.75726, 0, 0, 0.77778],
    57367: [0.25142, 0.75726, 0, 0, 0.77778],
    57368: [0.25142, 0.75726, 0, 0, 0.77778],
    57369: [0.25142, 0.75726, 0, 0, 0.77778],
    57370: [0.13597, 0.63597, 0, 0, 0.77778],
    57371: [0.13597, 0.63597, 0, 0, 0.77778]
  },
  "Caligraphic-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.68333, 0, 0.19445, 0.79847],
    66: [0, 0.68333, 0.03041, 0.13889, 0.65681],
    67: [0, 0.68333, 0.05834, 0.13889, 0.52653],
    68: [0, 0.68333, 0.02778, 0.08334, 0.77139],
    69: [0, 0.68333, 0.08944, 0.11111, 0.52778],
    70: [0, 0.68333, 0.09931, 0.11111, 0.71875],
    71: [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
    72: [0, 0.68333, 965e-5, 0.11111, 0.84452],
    73: [0, 0.68333, 0.07382, 0, 0.54452],
    74: [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
    75: [0, 0.68333, 0.01445, 0.05556, 0.76195],
    76: [0, 0.68333, 0, 0.13889, 0.68972],
    77: [0, 0.68333, 0, 0.13889, 1.2009],
    78: [0, 0.68333, 0.14736, 0.08334, 0.82049],
    79: [0, 0.68333, 0.02778, 0.11111, 0.79611],
    80: [0, 0.68333, 0.08222, 0.08334, 0.69556],
    81: [0.09722, 0.68333, 0, 0.11111, 0.81667],
    82: [0, 0.68333, 0, 0.08334, 0.8475],
    83: [0, 0.68333, 0.075, 0.13889, 0.60556],
    84: [0, 0.68333, 0.25417, 0, 0.54464],
    85: [0, 0.68333, 0.09931, 0.08334, 0.62583],
    86: [0, 0.68333, 0.08222, 0, 0.61278],
    87: [0, 0.68333, 0.08222, 0.08334, 0.98778],
    88: [0, 0.68333, 0.14643, 0.13889, 0.7133],
    89: [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
    90: [0, 0.68333, 0.07944, 0.13889, 0.72473],
    160: [0, 0, 0, 0, 0.25]
  },
  "Fraktur-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69141, 0, 0, 0.29574],
    34: [0, 0.69141, 0, 0, 0.21471],
    38: [0, 0.69141, 0, 0, 0.73786],
    39: [0, 0.69141, 0, 0, 0.21201],
    40: [0.24982, 0.74947, 0, 0, 0.38865],
    41: [0.24982, 0.74947, 0, 0, 0.38865],
    42: [0, 0.62119, 0, 0, 0.27764],
    43: [0.08319, 0.58283, 0, 0, 0.75623],
    44: [0, 0.10803, 0, 0, 0.27764],
    45: [0.08319, 0.58283, 0, 0, 0.75623],
    46: [0, 0.10803, 0, 0, 0.27764],
    47: [0.24982, 0.74947, 0, 0, 0.50181],
    48: [0, 0.47534, 0, 0, 0.50181],
    49: [0, 0.47534, 0, 0, 0.50181],
    50: [0, 0.47534, 0, 0, 0.50181],
    51: [0.18906, 0.47534, 0, 0, 0.50181],
    52: [0.18906, 0.47534, 0, 0, 0.50181],
    53: [0.18906, 0.47534, 0, 0, 0.50181],
    54: [0, 0.69141, 0, 0, 0.50181],
    55: [0.18906, 0.47534, 0, 0, 0.50181],
    56: [0, 0.69141, 0, 0, 0.50181],
    57: [0.18906, 0.47534, 0, 0, 0.50181],
    58: [0, 0.47534, 0, 0, 0.21606],
    59: [0.12604, 0.47534, 0, 0, 0.21606],
    61: [-0.13099, 0.36866, 0, 0, 0.75623],
    63: [0, 0.69141, 0, 0, 0.36245],
    65: [0, 0.69141, 0, 0, 0.7176],
    66: [0, 0.69141, 0, 0, 0.88397],
    67: [0, 0.69141, 0, 0, 0.61254],
    68: [0, 0.69141, 0, 0, 0.83158],
    69: [0, 0.69141, 0, 0, 0.66278],
    70: [0.12604, 0.69141, 0, 0, 0.61119],
    71: [0, 0.69141, 0, 0, 0.78539],
    72: [0.06302, 0.69141, 0, 0, 0.7203],
    73: [0, 0.69141, 0, 0, 0.55448],
    74: [0.12604, 0.69141, 0, 0, 0.55231],
    75: [0, 0.69141, 0, 0, 0.66845],
    76: [0, 0.69141, 0, 0, 0.66602],
    77: [0, 0.69141, 0, 0, 1.04953],
    78: [0, 0.69141, 0, 0, 0.83212],
    79: [0, 0.69141, 0, 0, 0.82699],
    80: [0.18906, 0.69141, 0, 0, 0.82753],
    81: [0.03781, 0.69141, 0, 0, 0.82699],
    82: [0, 0.69141, 0, 0, 0.82807],
    83: [0, 0.69141, 0, 0, 0.82861],
    84: [0, 0.69141, 0, 0, 0.66899],
    85: [0, 0.69141, 0, 0, 0.64576],
    86: [0, 0.69141, 0, 0, 0.83131],
    87: [0, 0.69141, 0, 0, 1.04602],
    88: [0, 0.69141, 0, 0, 0.71922],
    89: [0.18906, 0.69141, 0, 0, 0.83293],
    90: [0.12604, 0.69141, 0, 0, 0.60201],
    91: [0.24982, 0.74947, 0, 0, 0.27764],
    93: [0.24982, 0.74947, 0, 0, 0.27764],
    94: [0, 0.69141, 0, 0, 0.49965],
    97: [0, 0.47534, 0, 0, 0.50046],
    98: [0, 0.69141, 0, 0, 0.51315],
    99: [0, 0.47534, 0, 0, 0.38946],
    100: [0, 0.62119, 0, 0, 0.49857],
    101: [0, 0.47534, 0, 0, 0.40053],
    102: [0.18906, 0.69141, 0, 0, 0.32626],
    103: [0.18906, 0.47534, 0, 0, 0.5037],
    104: [0.18906, 0.69141, 0, 0, 0.52126],
    105: [0, 0.69141, 0, 0, 0.27899],
    106: [0, 0.69141, 0, 0, 0.28088],
    107: [0, 0.69141, 0, 0, 0.38946],
    108: [0, 0.69141, 0, 0, 0.27953],
    109: [0, 0.47534, 0, 0, 0.76676],
    110: [0, 0.47534, 0, 0, 0.52666],
    111: [0, 0.47534, 0, 0, 0.48885],
    112: [0.18906, 0.52396, 0, 0, 0.50046],
    113: [0.18906, 0.47534, 0, 0, 0.48912],
    114: [0, 0.47534, 0, 0, 0.38919],
    115: [0, 0.47534, 0, 0, 0.44266],
    116: [0, 0.62119, 0, 0, 0.33301],
    117: [0, 0.47534, 0, 0, 0.5172],
    118: [0, 0.52396, 0, 0, 0.5118],
    119: [0, 0.52396, 0, 0, 0.77351],
    120: [0.18906, 0.47534, 0, 0, 0.38865],
    121: [0.18906, 0.47534, 0, 0, 0.49884],
    122: [0.18906, 0.47534, 0, 0, 0.39054],
    160: [0, 0, 0, 0, 0.25],
    8216: [0, 0.69141, 0, 0, 0.21471],
    8217: [0, 0.69141, 0, 0, 0.21471],
    58112: [0, 0.62119, 0, 0, 0.49749],
    58113: [0, 0.62119, 0, 0, 0.4983],
    58114: [0.18906, 0.69141, 0, 0, 0.33328],
    58115: [0.18906, 0.69141, 0, 0, 0.32923],
    58116: [0.18906, 0.47534, 0, 0, 0.50343],
    58117: [0, 0.69141, 0, 0, 0.33301],
    58118: [0, 0.62119, 0, 0, 0.33409],
    58119: [0, 0.47534, 0, 0, 0.50073]
  },
  "Main-Bold": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.35],
    34: [0, 0.69444, 0, 0, 0.60278],
    35: [0.19444, 0.69444, 0, 0, 0.95833],
    36: [0.05556, 0.75, 0, 0, 0.575],
    37: [0.05556, 0.75, 0, 0, 0.95833],
    38: [0, 0.69444, 0, 0, 0.89444],
    39: [0, 0.69444, 0, 0, 0.31944],
    40: [0.25, 0.75, 0, 0, 0.44722],
    41: [0.25, 0.75, 0, 0, 0.44722],
    42: [0, 0.75, 0, 0, 0.575],
    43: [0.13333, 0.63333, 0, 0, 0.89444],
    44: [0.19444, 0.15556, 0, 0, 0.31944],
    45: [0, 0.44444, 0, 0, 0.38333],
    46: [0, 0.15556, 0, 0, 0.31944],
    47: [0.25, 0.75, 0, 0, 0.575],
    48: [0, 0.64444, 0, 0, 0.575],
    49: [0, 0.64444, 0, 0, 0.575],
    50: [0, 0.64444, 0, 0, 0.575],
    51: [0, 0.64444, 0, 0, 0.575],
    52: [0, 0.64444, 0, 0, 0.575],
    53: [0, 0.64444, 0, 0, 0.575],
    54: [0, 0.64444, 0, 0, 0.575],
    55: [0, 0.64444, 0, 0, 0.575],
    56: [0, 0.64444, 0, 0, 0.575],
    57: [0, 0.64444, 0, 0, 0.575],
    58: [0, 0.44444, 0, 0, 0.31944],
    59: [0.19444, 0.44444, 0, 0, 0.31944],
    60: [0.08556, 0.58556, 0, 0, 0.89444],
    61: [-0.10889, 0.39111, 0, 0, 0.89444],
    62: [0.08556, 0.58556, 0, 0, 0.89444],
    63: [0, 0.69444, 0, 0, 0.54305],
    64: [0, 0.69444, 0, 0, 0.89444],
    65: [0, 0.68611, 0, 0, 0.86944],
    66: [0, 0.68611, 0, 0, 0.81805],
    67: [0, 0.68611, 0, 0, 0.83055],
    68: [0, 0.68611, 0, 0, 0.88194],
    69: [0, 0.68611, 0, 0, 0.75555],
    70: [0, 0.68611, 0, 0, 0.72361],
    71: [0, 0.68611, 0, 0, 0.90416],
    72: [0, 0.68611, 0, 0, 0.9],
    73: [0, 0.68611, 0, 0, 0.43611],
    74: [0, 0.68611, 0, 0, 0.59444],
    75: [0, 0.68611, 0, 0, 0.90138],
    76: [0, 0.68611, 0, 0, 0.69166],
    77: [0, 0.68611, 0, 0, 1.09166],
    78: [0, 0.68611, 0, 0, 0.9],
    79: [0, 0.68611, 0, 0, 0.86388],
    80: [0, 0.68611, 0, 0, 0.78611],
    81: [0.19444, 0.68611, 0, 0, 0.86388],
    82: [0, 0.68611, 0, 0, 0.8625],
    83: [0, 0.68611, 0, 0, 0.63889],
    84: [0, 0.68611, 0, 0, 0.8],
    85: [0, 0.68611, 0, 0, 0.88472],
    86: [0, 0.68611, 0.01597, 0, 0.86944],
    87: [0, 0.68611, 0.01597, 0, 1.18888],
    88: [0, 0.68611, 0, 0, 0.86944],
    89: [0, 0.68611, 0.02875, 0, 0.86944],
    90: [0, 0.68611, 0, 0, 0.70277],
    91: [0.25, 0.75, 0, 0, 0.31944],
    92: [0.25, 0.75, 0, 0, 0.575],
    93: [0.25, 0.75, 0, 0, 0.31944],
    94: [0, 0.69444, 0, 0, 0.575],
    95: [0.31, 0.13444, 0.03194, 0, 0.575],
    97: [0, 0.44444, 0, 0, 0.55902],
    98: [0, 0.69444, 0, 0, 0.63889],
    99: [0, 0.44444, 0, 0, 0.51111],
    100: [0, 0.69444, 0, 0, 0.63889],
    101: [0, 0.44444, 0, 0, 0.52708],
    102: [0, 0.69444, 0.10903, 0, 0.35139],
    103: [0.19444, 0.44444, 0.01597, 0, 0.575],
    104: [0, 0.69444, 0, 0, 0.63889],
    105: [0, 0.69444, 0, 0, 0.31944],
    106: [0.19444, 0.69444, 0, 0, 0.35139],
    107: [0, 0.69444, 0, 0, 0.60694],
    108: [0, 0.69444, 0, 0, 0.31944],
    109: [0, 0.44444, 0, 0, 0.95833],
    110: [0, 0.44444, 0, 0, 0.63889],
    111: [0, 0.44444, 0, 0, 0.575],
    112: [0.19444, 0.44444, 0, 0, 0.63889],
    113: [0.19444, 0.44444, 0, 0, 0.60694],
    114: [0, 0.44444, 0, 0, 0.47361],
    115: [0, 0.44444, 0, 0, 0.45361],
    116: [0, 0.63492, 0, 0, 0.44722],
    117: [0, 0.44444, 0, 0, 0.63889],
    118: [0, 0.44444, 0.01597, 0, 0.60694],
    119: [0, 0.44444, 0.01597, 0, 0.83055],
    120: [0, 0.44444, 0, 0, 0.60694],
    121: [0.19444, 0.44444, 0.01597, 0, 0.60694],
    122: [0, 0.44444, 0, 0, 0.51111],
    123: [0.25, 0.75, 0, 0, 0.575],
    124: [0.25, 0.75, 0, 0, 0.31944],
    125: [0.25, 0.75, 0, 0, 0.575],
    126: [0.35, 0.34444, 0, 0, 0.575],
    160: [0, 0, 0, 0, 0.25],
    163: [0, 0.69444, 0, 0, 0.86853],
    168: [0, 0.69444, 0, 0, 0.575],
    172: [0, 0.44444, 0, 0, 0.76666],
    176: [0, 0.69444, 0, 0, 0.86944],
    177: [0.13333, 0.63333, 0, 0, 0.89444],
    184: [0.17014, 0, 0, 0, 0.51111],
    198: [0, 0.68611, 0, 0, 1.04166],
    215: [0.13333, 0.63333, 0, 0, 0.89444],
    216: [0.04861, 0.73472, 0, 0, 0.89444],
    223: [0, 0.69444, 0, 0, 0.59722],
    230: [0, 0.44444, 0, 0, 0.83055],
    247: [0.13333, 0.63333, 0, 0, 0.89444],
    248: [0.09722, 0.54167, 0, 0, 0.575],
    305: [0, 0.44444, 0, 0, 0.31944],
    338: [0, 0.68611, 0, 0, 1.16944],
    339: [0, 0.44444, 0, 0, 0.89444],
    567: [0.19444, 0.44444, 0, 0, 0.35139],
    710: [0, 0.69444, 0, 0, 0.575],
    711: [0, 0.63194, 0, 0, 0.575],
    713: [0, 0.59611, 0, 0, 0.575],
    714: [0, 0.69444, 0, 0, 0.575],
    715: [0, 0.69444, 0, 0, 0.575],
    728: [0, 0.69444, 0, 0, 0.575],
    729: [0, 0.69444, 0, 0, 0.31944],
    730: [0, 0.69444, 0, 0, 0.86944],
    732: [0, 0.69444, 0, 0, 0.575],
    733: [0, 0.69444, 0, 0, 0.575],
    915: [0, 0.68611, 0, 0, 0.69166],
    916: [0, 0.68611, 0, 0, 0.95833],
    920: [0, 0.68611, 0, 0, 0.89444],
    923: [0, 0.68611, 0, 0, 0.80555],
    926: [0, 0.68611, 0, 0, 0.76666],
    928: [0, 0.68611, 0, 0, 0.9],
    931: [0, 0.68611, 0, 0, 0.83055],
    933: [0, 0.68611, 0, 0, 0.89444],
    934: [0, 0.68611, 0, 0, 0.83055],
    936: [0, 0.68611, 0, 0, 0.89444],
    937: [0, 0.68611, 0, 0, 0.83055],
    8211: [0, 0.44444, 0.03194, 0, 0.575],
    8212: [0, 0.44444, 0.03194, 0, 1.14999],
    8216: [0, 0.69444, 0, 0, 0.31944],
    8217: [0, 0.69444, 0, 0, 0.31944],
    8220: [0, 0.69444, 0, 0, 0.60278],
    8221: [0, 0.69444, 0, 0, 0.60278],
    8224: [0.19444, 0.69444, 0, 0, 0.51111],
    8225: [0.19444, 0.69444, 0, 0, 0.51111],
    8242: [0, 0.55556, 0, 0, 0.34444],
    8407: [0, 0.72444, 0.15486, 0, 0.575],
    8463: [0, 0.69444, 0, 0, 0.66759],
    8465: [0, 0.69444, 0, 0, 0.83055],
    8467: [0, 0.69444, 0, 0, 0.47361],
    8472: [0.19444, 0.44444, 0, 0, 0.74027],
    8476: [0, 0.69444, 0, 0, 0.83055],
    8501: [0, 0.69444, 0, 0, 0.70277],
    8592: [-0.10889, 0.39111, 0, 0, 1.14999],
    8593: [0.19444, 0.69444, 0, 0, 0.575],
    8594: [-0.10889, 0.39111, 0, 0, 1.14999],
    8595: [0.19444, 0.69444, 0, 0, 0.575],
    8596: [-0.10889, 0.39111, 0, 0, 1.14999],
    8597: [0.25, 0.75, 0, 0, 0.575],
    8598: [0.19444, 0.69444, 0, 0, 1.14999],
    8599: [0.19444, 0.69444, 0, 0, 1.14999],
    8600: [0.19444, 0.69444, 0, 0, 1.14999],
    8601: [0.19444, 0.69444, 0, 0, 1.14999],
    8636: [-0.10889, 0.39111, 0, 0, 1.14999],
    8637: [-0.10889, 0.39111, 0, 0, 1.14999],
    8640: [-0.10889, 0.39111, 0, 0, 1.14999],
    8641: [-0.10889, 0.39111, 0, 0, 1.14999],
    8656: [-0.10889, 0.39111, 0, 0, 1.14999],
    8657: [0.19444, 0.69444, 0, 0, 0.70277],
    8658: [-0.10889, 0.39111, 0, 0, 1.14999],
    8659: [0.19444, 0.69444, 0, 0, 0.70277],
    8660: [-0.10889, 0.39111, 0, 0, 1.14999],
    8661: [0.25, 0.75, 0, 0, 0.70277],
    8704: [0, 0.69444, 0, 0, 0.63889],
    8706: [0, 0.69444, 0.06389, 0, 0.62847],
    8707: [0, 0.69444, 0, 0, 0.63889],
    8709: [0.05556, 0.75, 0, 0, 0.575],
    8711: [0, 0.68611, 0, 0, 0.95833],
    8712: [0.08556, 0.58556, 0, 0, 0.76666],
    8715: [0.08556, 0.58556, 0, 0, 0.76666],
    8722: [0.13333, 0.63333, 0, 0, 0.89444],
    8723: [0.13333, 0.63333, 0, 0, 0.89444],
    8725: [0.25, 0.75, 0, 0, 0.575],
    8726: [0.25, 0.75, 0, 0, 0.575],
    8727: [-0.02778, 0.47222, 0, 0, 0.575],
    8728: [-0.02639, 0.47361, 0, 0, 0.575],
    8729: [-0.02639, 0.47361, 0, 0, 0.575],
    8730: [0.18, 0.82, 0, 0, 0.95833],
    8733: [0, 0.44444, 0, 0, 0.89444],
    8734: [0, 0.44444, 0, 0, 1.14999],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8739: [0.25, 0.75, 0, 0, 0.31944],
    8741: [0.25, 0.75, 0, 0, 0.575],
    8743: [0, 0.55556, 0, 0, 0.76666],
    8744: [0, 0.55556, 0, 0, 0.76666],
    8745: [0, 0.55556, 0, 0, 0.76666],
    8746: [0, 0.55556, 0, 0, 0.76666],
    8747: [0.19444, 0.69444, 0.12778, 0, 0.56875],
    8764: [-0.10889, 0.39111, 0, 0, 0.89444],
    8768: [0.19444, 0.69444, 0, 0, 0.31944],
    8771: [222e-5, 0.50222, 0, 0, 0.89444],
    8773: [0.027, 0.638, 0, 0, 0.894],
    8776: [0.02444, 0.52444, 0, 0, 0.89444],
    8781: [222e-5, 0.50222, 0, 0, 0.89444],
    8801: [222e-5, 0.50222, 0, 0, 0.89444],
    8804: [0.19667, 0.69667, 0, 0, 0.89444],
    8805: [0.19667, 0.69667, 0, 0, 0.89444],
    8810: [0.08556, 0.58556, 0, 0, 1.14999],
    8811: [0.08556, 0.58556, 0, 0, 1.14999],
    8826: [0.08556, 0.58556, 0, 0, 0.89444],
    8827: [0.08556, 0.58556, 0, 0, 0.89444],
    8834: [0.08556, 0.58556, 0, 0, 0.89444],
    8835: [0.08556, 0.58556, 0, 0, 0.89444],
    8838: [0.19667, 0.69667, 0, 0, 0.89444],
    8839: [0.19667, 0.69667, 0, 0, 0.89444],
    8846: [0, 0.55556, 0, 0, 0.76666],
    8849: [0.19667, 0.69667, 0, 0, 0.89444],
    8850: [0.19667, 0.69667, 0, 0, 0.89444],
    8851: [0, 0.55556, 0, 0, 0.76666],
    8852: [0, 0.55556, 0, 0, 0.76666],
    8853: [0.13333, 0.63333, 0, 0, 0.89444],
    8854: [0.13333, 0.63333, 0, 0, 0.89444],
    8855: [0.13333, 0.63333, 0, 0, 0.89444],
    8856: [0.13333, 0.63333, 0, 0, 0.89444],
    8857: [0.13333, 0.63333, 0, 0, 0.89444],
    8866: [0, 0.69444, 0, 0, 0.70277],
    8867: [0, 0.69444, 0, 0, 0.70277],
    8868: [0, 0.69444, 0, 0, 0.89444],
    8869: [0, 0.69444, 0, 0, 0.89444],
    8900: [-0.02639, 0.47361, 0, 0, 0.575],
    8901: [-0.02639, 0.47361, 0, 0, 0.31944],
    8902: [-0.02778, 0.47222, 0, 0, 0.575],
    8968: [0.25, 0.75, 0, 0, 0.51111],
    8969: [0.25, 0.75, 0, 0, 0.51111],
    8970: [0.25, 0.75, 0, 0, 0.51111],
    8971: [0.25, 0.75, 0, 0, 0.51111],
    8994: [-0.13889, 0.36111, 0, 0, 1.14999],
    8995: [-0.13889, 0.36111, 0, 0, 1.14999],
    9651: [0.19444, 0.69444, 0, 0, 1.02222],
    9657: [-0.02778, 0.47222, 0, 0, 0.575],
    9661: [0.19444, 0.69444, 0, 0, 1.02222],
    9667: [-0.02778, 0.47222, 0, 0, 0.575],
    9711: [0.19444, 0.69444, 0, 0, 1.14999],
    9824: [0.12963, 0.69444, 0, 0, 0.89444],
    9825: [0.12963, 0.69444, 0, 0, 0.89444],
    9826: [0.12963, 0.69444, 0, 0, 0.89444],
    9827: [0.12963, 0.69444, 0, 0, 0.89444],
    9837: [0, 0.75, 0, 0, 0.44722],
    9838: [0.19444, 0.69444, 0, 0, 0.44722],
    9839: [0.19444, 0.69444, 0, 0, 0.44722],
    10216: [0.25, 0.75, 0, 0, 0.44722],
    10217: [0.25, 0.75, 0, 0, 0.44722],
    10815: [0, 0.68611, 0, 0, 0.9],
    10927: [0.19667, 0.69667, 0, 0, 0.89444],
    10928: [0.19667, 0.69667, 0, 0, 0.89444],
    57376: [0.19444, 0.69444, 0, 0, 0]
  },
  "Main-BoldItalic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.11417, 0, 0.38611],
    34: [0, 0.69444, 0.07939, 0, 0.62055],
    35: [0.19444, 0.69444, 0.06833, 0, 0.94444],
    37: [0.05556, 0.75, 0.12861, 0, 0.94444],
    38: [0, 0.69444, 0.08528, 0, 0.88555],
    39: [0, 0.69444, 0.12945, 0, 0.35555],
    40: [0.25, 0.75, 0.15806, 0, 0.47333],
    41: [0.25, 0.75, 0.03306, 0, 0.47333],
    42: [0, 0.75, 0.14333, 0, 0.59111],
    43: [0.10333, 0.60333, 0.03306, 0, 0.88555],
    44: [0.19444, 0.14722, 0, 0, 0.35555],
    45: [0, 0.44444, 0.02611, 0, 0.41444],
    46: [0, 0.14722, 0, 0, 0.35555],
    47: [0.25, 0.75, 0.15806, 0, 0.59111],
    48: [0, 0.64444, 0.13167, 0, 0.59111],
    49: [0, 0.64444, 0.13167, 0, 0.59111],
    50: [0, 0.64444, 0.13167, 0, 0.59111],
    51: [0, 0.64444, 0.13167, 0, 0.59111],
    52: [0.19444, 0.64444, 0.13167, 0, 0.59111],
    53: [0, 0.64444, 0.13167, 0, 0.59111],
    54: [0, 0.64444, 0.13167, 0, 0.59111],
    55: [0.19444, 0.64444, 0.13167, 0, 0.59111],
    56: [0, 0.64444, 0.13167, 0, 0.59111],
    57: [0, 0.64444, 0.13167, 0, 0.59111],
    58: [0, 0.44444, 0.06695, 0, 0.35555],
    59: [0.19444, 0.44444, 0.06695, 0, 0.35555],
    61: [-0.10889, 0.39111, 0.06833, 0, 0.88555],
    63: [0, 0.69444, 0.11472, 0, 0.59111],
    64: [0, 0.69444, 0.09208, 0, 0.88555],
    65: [0, 0.68611, 0, 0, 0.86555],
    66: [0, 0.68611, 0.0992, 0, 0.81666],
    67: [0, 0.68611, 0.14208, 0, 0.82666],
    68: [0, 0.68611, 0.09062, 0, 0.87555],
    69: [0, 0.68611, 0.11431, 0, 0.75666],
    70: [0, 0.68611, 0.12903, 0, 0.72722],
    71: [0, 0.68611, 0.07347, 0, 0.89527],
    72: [0, 0.68611, 0.17208, 0, 0.8961],
    73: [0, 0.68611, 0.15681, 0, 0.47166],
    74: [0, 0.68611, 0.145, 0, 0.61055],
    75: [0, 0.68611, 0.14208, 0, 0.89499],
    76: [0, 0.68611, 0, 0, 0.69777],
    77: [0, 0.68611, 0.17208, 0, 1.07277],
    78: [0, 0.68611, 0.17208, 0, 0.8961],
    79: [0, 0.68611, 0.09062, 0, 0.85499],
    80: [0, 0.68611, 0.0992, 0, 0.78721],
    81: [0.19444, 0.68611, 0.09062, 0, 0.85499],
    82: [0, 0.68611, 0.02559, 0, 0.85944],
    83: [0, 0.68611, 0.11264, 0, 0.64999],
    84: [0, 0.68611, 0.12903, 0, 0.7961],
    85: [0, 0.68611, 0.17208, 0, 0.88083],
    86: [0, 0.68611, 0.18625, 0, 0.86555],
    87: [0, 0.68611, 0.18625, 0, 1.15999],
    88: [0, 0.68611, 0.15681, 0, 0.86555],
    89: [0, 0.68611, 0.19803, 0, 0.86555],
    90: [0, 0.68611, 0.14208, 0, 0.70888],
    91: [0.25, 0.75, 0.1875, 0, 0.35611],
    93: [0.25, 0.75, 0.09972, 0, 0.35611],
    94: [0, 0.69444, 0.06709, 0, 0.59111],
    95: [0.31, 0.13444, 0.09811, 0, 0.59111],
    97: [0, 0.44444, 0.09426, 0, 0.59111],
    98: [0, 0.69444, 0.07861, 0, 0.53222],
    99: [0, 0.44444, 0.05222, 0, 0.53222],
    100: [0, 0.69444, 0.10861, 0, 0.59111],
    101: [0, 0.44444, 0.085, 0, 0.53222],
    102: [0.19444, 0.69444, 0.21778, 0, 0.4],
    103: [0.19444, 0.44444, 0.105, 0, 0.53222],
    104: [0, 0.69444, 0.09426, 0, 0.59111],
    105: [0, 0.69326, 0.11387, 0, 0.35555],
    106: [0.19444, 0.69326, 0.1672, 0, 0.35555],
    107: [0, 0.69444, 0.11111, 0, 0.53222],
    108: [0, 0.69444, 0.10861, 0, 0.29666],
    109: [0, 0.44444, 0.09426, 0, 0.94444],
    110: [0, 0.44444, 0.09426, 0, 0.64999],
    111: [0, 0.44444, 0.07861, 0, 0.59111],
    112: [0.19444, 0.44444, 0.07861, 0, 0.59111],
    113: [0.19444, 0.44444, 0.105, 0, 0.53222],
    114: [0, 0.44444, 0.11111, 0, 0.50167],
    115: [0, 0.44444, 0.08167, 0, 0.48694],
    116: [0, 0.63492, 0.09639, 0, 0.385],
    117: [0, 0.44444, 0.09426, 0, 0.62055],
    118: [0, 0.44444, 0.11111, 0, 0.53222],
    119: [0, 0.44444, 0.11111, 0, 0.76777],
    120: [0, 0.44444, 0.12583, 0, 0.56055],
    121: [0.19444, 0.44444, 0.105, 0, 0.56166],
    122: [0, 0.44444, 0.13889, 0, 0.49055],
    126: [0.35, 0.34444, 0.11472, 0, 0.59111],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.69444, 0.11473, 0, 0.59111],
    176: [0, 0.69444, 0, 0, 0.94888],
    184: [0.17014, 0, 0, 0, 0.53222],
    198: [0, 0.68611, 0.11431, 0, 1.02277],
    216: [0.04861, 0.73472, 0.09062, 0, 0.88555],
    223: [0.19444, 0.69444, 0.09736, 0, 0.665],
    230: [0, 0.44444, 0.085, 0, 0.82666],
    248: [0.09722, 0.54167, 0.09458, 0, 0.59111],
    305: [0, 0.44444, 0.09426, 0, 0.35555],
    338: [0, 0.68611, 0.11431, 0, 1.14054],
    339: [0, 0.44444, 0.085, 0, 0.82666],
    567: [0.19444, 0.44444, 0.04611, 0, 0.385],
    710: [0, 0.69444, 0.06709, 0, 0.59111],
    711: [0, 0.63194, 0.08271, 0, 0.59111],
    713: [0, 0.59444, 0.10444, 0, 0.59111],
    714: [0, 0.69444, 0.08528, 0, 0.59111],
    715: [0, 0.69444, 0, 0, 0.59111],
    728: [0, 0.69444, 0.10333, 0, 0.59111],
    729: [0, 0.69444, 0.12945, 0, 0.35555],
    730: [0, 0.69444, 0, 0, 0.94888],
    732: [0, 0.69444, 0.11472, 0, 0.59111],
    733: [0, 0.69444, 0.11472, 0, 0.59111],
    915: [0, 0.68611, 0.12903, 0, 0.69777],
    916: [0, 0.68611, 0, 0, 0.94444],
    920: [0, 0.68611, 0.09062, 0, 0.88555],
    923: [0, 0.68611, 0, 0, 0.80666],
    926: [0, 0.68611, 0.15092, 0, 0.76777],
    928: [0, 0.68611, 0.17208, 0, 0.8961],
    931: [0, 0.68611, 0.11431, 0, 0.82666],
    933: [0, 0.68611, 0.10778, 0, 0.88555],
    934: [0, 0.68611, 0.05632, 0, 0.82666],
    936: [0, 0.68611, 0.10778, 0, 0.88555],
    937: [0, 0.68611, 0.0992, 0, 0.82666],
    8211: [0, 0.44444, 0.09811, 0, 0.59111],
    8212: [0, 0.44444, 0.09811, 0, 1.18221],
    8216: [0, 0.69444, 0.12945, 0, 0.35555],
    8217: [0, 0.69444, 0.12945, 0, 0.35555],
    8220: [0, 0.69444, 0.16772, 0, 0.62055],
    8221: [0, 0.69444, 0.07939, 0, 0.62055]
  },
  "Main-Italic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.12417, 0, 0.30667],
    34: [0, 0.69444, 0.06961, 0, 0.51444],
    35: [0.19444, 0.69444, 0.06616, 0, 0.81777],
    37: [0.05556, 0.75, 0.13639, 0, 0.81777],
    38: [0, 0.69444, 0.09694, 0, 0.76666],
    39: [0, 0.69444, 0.12417, 0, 0.30667],
    40: [0.25, 0.75, 0.16194, 0, 0.40889],
    41: [0.25, 0.75, 0.03694, 0, 0.40889],
    42: [0, 0.75, 0.14917, 0, 0.51111],
    43: [0.05667, 0.56167, 0.03694, 0, 0.76666],
    44: [0.19444, 0.10556, 0, 0, 0.30667],
    45: [0, 0.43056, 0.02826, 0, 0.35778],
    46: [0, 0.10556, 0, 0, 0.30667],
    47: [0.25, 0.75, 0.16194, 0, 0.51111],
    48: [0, 0.64444, 0.13556, 0, 0.51111],
    49: [0, 0.64444, 0.13556, 0, 0.51111],
    50: [0, 0.64444, 0.13556, 0, 0.51111],
    51: [0, 0.64444, 0.13556, 0, 0.51111],
    52: [0.19444, 0.64444, 0.13556, 0, 0.51111],
    53: [0, 0.64444, 0.13556, 0, 0.51111],
    54: [0, 0.64444, 0.13556, 0, 0.51111],
    55: [0.19444, 0.64444, 0.13556, 0, 0.51111],
    56: [0, 0.64444, 0.13556, 0, 0.51111],
    57: [0, 0.64444, 0.13556, 0, 0.51111],
    58: [0, 0.43056, 0.0582, 0, 0.30667],
    59: [0.19444, 0.43056, 0.0582, 0, 0.30667],
    61: [-0.13313, 0.36687, 0.06616, 0, 0.76666],
    63: [0, 0.69444, 0.1225, 0, 0.51111],
    64: [0, 0.69444, 0.09597, 0, 0.76666],
    65: [0, 0.68333, 0, 0, 0.74333],
    66: [0, 0.68333, 0.10257, 0, 0.70389],
    67: [0, 0.68333, 0.14528, 0, 0.71555],
    68: [0, 0.68333, 0.09403, 0, 0.755],
    69: [0, 0.68333, 0.12028, 0, 0.67833],
    70: [0, 0.68333, 0.13305, 0, 0.65277],
    71: [0, 0.68333, 0.08722, 0, 0.77361],
    72: [0, 0.68333, 0.16389, 0, 0.74333],
    73: [0, 0.68333, 0.15806, 0, 0.38555],
    74: [0, 0.68333, 0.14028, 0, 0.525],
    75: [0, 0.68333, 0.14528, 0, 0.76888],
    76: [0, 0.68333, 0, 0, 0.62722],
    77: [0, 0.68333, 0.16389, 0, 0.89666],
    78: [0, 0.68333, 0.16389, 0, 0.74333],
    79: [0, 0.68333, 0.09403, 0, 0.76666],
    80: [0, 0.68333, 0.10257, 0, 0.67833],
    81: [0.19444, 0.68333, 0.09403, 0, 0.76666],
    82: [0, 0.68333, 0.03868, 0, 0.72944],
    83: [0, 0.68333, 0.11972, 0, 0.56222],
    84: [0, 0.68333, 0.13305, 0, 0.71555],
    85: [0, 0.68333, 0.16389, 0, 0.74333],
    86: [0, 0.68333, 0.18361, 0, 0.74333],
    87: [0, 0.68333, 0.18361, 0, 0.99888],
    88: [0, 0.68333, 0.15806, 0, 0.74333],
    89: [0, 0.68333, 0.19383, 0, 0.74333],
    90: [0, 0.68333, 0.14528, 0, 0.61333],
    91: [0.25, 0.75, 0.1875, 0, 0.30667],
    93: [0.25, 0.75, 0.10528, 0, 0.30667],
    94: [0, 0.69444, 0.06646, 0, 0.51111],
    95: [0.31, 0.12056, 0.09208, 0, 0.51111],
    97: [0, 0.43056, 0.07671, 0, 0.51111],
    98: [0, 0.69444, 0.06312, 0, 0.46],
    99: [0, 0.43056, 0.05653, 0, 0.46],
    100: [0, 0.69444, 0.10333, 0, 0.51111],
    101: [0, 0.43056, 0.07514, 0, 0.46],
    102: [0.19444, 0.69444, 0.21194, 0, 0.30667],
    103: [0.19444, 0.43056, 0.08847, 0, 0.46],
    104: [0, 0.69444, 0.07671, 0, 0.51111],
    105: [0, 0.65536, 0.1019, 0, 0.30667],
    106: [0.19444, 0.65536, 0.14467, 0, 0.30667],
    107: [0, 0.69444, 0.10764, 0, 0.46],
    108: [0, 0.69444, 0.10333, 0, 0.25555],
    109: [0, 0.43056, 0.07671, 0, 0.81777],
    110: [0, 0.43056, 0.07671, 0, 0.56222],
    111: [0, 0.43056, 0.06312, 0, 0.51111],
    112: [0.19444, 0.43056, 0.06312, 0, 0.51111],
    113: [0.19444, 0.43056, 0.08847, 0, 0.46],
    114: [0, 0.43056, 0.10764, 0, 0.42166],
    115: [0, 0.43056, 0.08208, 0, 0.40889],
    116: [0, 0.61508, 0.09486, 0, 0.33222],
    117: [0, 0.43056, 0.07671, 0, 0.53666],
    118: [0, 0.43056, 0.10764, 0, 0.46],
    119: [0, 0.43056, 0.10764, 0, 0.66444],
    120: [0, 0.43056, 0.12042, 0, 0.46389],
    121: [0.19444, 0.43056, 0.08847, 0, 0.48555],
    122: [0, 0.43056, 0.12292, 0, 0.40889],
    126: [0.35, 0.31786, 0.11585, 0, 0.51111],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.66786, 0.10474, 0, 0.51111],
    176: [0, 0.69444, 0, 0, 0.83129],
    184: [0.17014, 0, 0, 0, 0.46],
    198: [0, 0.68333, 0.12028, 0, 0.88277],
    216: [0.04861, 0.73194, 0.09403, 0, 0.76666],
    223: [0.19444, 0.69444, 0.10514, 0, 0.53666],
    230: [0, 0.43056, 0.07514, 0, 0.71555],
    248: [0.09722, 0.52778, 0.09194, 0, 0.51111],
    338: [0, 0.68333, 0.12028, 0, 0.98499],
    339: [0, 0.43056, 0.07514, 0, 0.71555],
    710: [0, 0.69444, 0.06646, 0, 0.51111],
    711: [0, 0.62847, 0.08295, 0, 0.51111],
    713: [0, 0.56167, 0.10333, 0, 0.51111],
    714: [0, 0.69444, 0.09694, 0, 0.51111],
    715: [0, 0.69444, 0, 0, 0.51111],
    728: [0, 0.69444, 0.10806, 0, 0.51111],
    729: [0, 0.66786, 0.11752, 0, 0.30667],
    730: [0, 0.69444, 0, 0, 0.83129],
    732: [0, 0.66786, 0.11585, 0, 0.51111],
    733: [0, 0.69444, 0.1225, 0, 0.51111],
    915: [0, 0.68333, 0.13305, 0, 0.62722],
    916: [0, 0.68333, 0, 0, 0.81777],
    920: [0, 0.68333, 0.09403, 0, 0.76666],
    923: [0, 0.68333, 0, 0, 0.69222],
    926: [0, 0.68333, 0.15294, 0, 0.66444],
    928: [0, 0.68333, 0.16389, 0, 0.74333],
    931: [0, 0.68333, 0.12028, 0, 0.71555],
    933: [0, 0.68333, 0.11111, 0, 0.76666],
    934: [0, 0.68333, 0.05986, 0, 0.71555],
    936: [0, 0.68333, 0.11111, 0, 0.76666],
    937: [0, 0.68333, 0.10257, 0, 0.71555],
    8211: [0, 0.43056, 0.09208, 0, 0.51111],
    8212: [0, 0.43056, 0.09208, 0, 1.02222],
    8216: [0, 0.69444, 0.12417, 0, 0.30667],
    8217: [0, 0.69444, 0.12417, 0, 0.30667],
    8220: [0, 0.69444, 0.1685, 0, 0.51444],
    8221: [0, 0.69444, 0.06961, 0, 0.51444],
    8463: [0, 0.68889, 0, 0, 0.54028]
  },
  "Main-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.27778],
    34: [0, 0.69444, 0, 0, 0.5],
    35: [0.19444, 0.69444, 0, 0, 0.83334],
    36: [0.05556, 0.75, 0, 0, 0.5],
    37: [0.05556, 0.75, 0, 0, 0.83334],
    38: [0, 0.69444, 0, 0, 0.77778],
    39: [0, 0.69444, 0, 0, 0.27778],
    40: [0.25, 0.75, 0, 0, 0.38889],
    41: [0.25, 0.75, 0, 0, 0.38889],
    42: [0, 0.75, 0, 0, 0.5],
    43: [0.08333, 0.58333, 0, 0, 0.77778],
    44: [0.19444, 0.10556, 0, 0, 0.27778],
    45: [0, 0.43056, 0, 0, 0.33333],
    46: [0, 0.10556, 0, 0, 0.27778],
    47: [0.25, 0.75, 0, 0, 0.5],
    48: [0, 0.64444, 0, 0, 0.5],
    49: [0, 0.64444, 0, 0, 0.5],
    50: [0, 0.64444, 0, 0, 0.5],
    51: [0, 0.64444, 0, 0, 0.5],
    52: [0, 0.64444, 0, 0, 0.5],
    53: [0, 0.64444, 0, 0, 0.5],
    54: [0, 0.64444, 0, 0, 0.5],
    55: [0, 0.64444, 0, 0, 0.5],
    56: [0, 0.64444, 0, 0, 0.5],
    57: [0, 0.64444, 0, 0, 0.5],
    58: [0, 0.43056, 0, 0, 0.27778],
    59: [0.19444, 0.43056, 0, 0, 0.27778],
    60: [0.0391, 0.5391, 0, 0, 0.77778],
    61: [-0.13313, 0.36687, 0, 0, 0.77778],
    62: [0.0391, 0.5391, 0, 0, 0.77778],
    63: [0, 0.69444, 0, 0, 0.47222],
    64: [0, 0.69444, 0, 0, 0.77778],
    65: [0, 0.68333, 0, 0, 0.75],
    66: [0, 0.68333, 0, 0, 0.70834],
    67: [0, 0.68333, 0, 0, 0.72222],
    68: [0, 0.68333, 0, 0, 0.76389],
    69: [0, 0.68333, 0, 0, 0.68056],
    70: [0, 0.68333, 0, 0, 0.65278],
    71: [0, 0.68333, 0, 0, 0.78472],
    72: [0, 0.68333, 0, 0, 0.75],
    73: [0, 0.68333, 0, 0, 0.36111],
    74: [0, 0.68333, 0, 0, 0.51389],
    75: [0, 0.68333, 0, 0, 0.77778],
    76: [0, 0.68333, 0, 0, 0.625],
    77: [0, 0.68333, 0, 0, 0.91667],
    78: [0, 0.68333, 0, 0, 0.75],
    79: [0, 0.68333, 0, 0, 0.77778],
    80: [0, 0.68333, 0, 0, 0.68056],
    81: [0.19444, 0.68333, 0, 0, 0.77778],
    82: [0, 0.68333, 0, 0, 0.73611],
    83: [0, 0.68333, 0, 0, 0.55556],
    84: [0, 0.68333, 0, 0, 0.72222],
    85: [0, 0.68333, 0, 0, 0.75],
    86: [0, 0.68333, 0.01389, 0, 0.75],
    87: [0, 0.68333, 0.01389, 0, 1.02778],
    88: [0, 0.68333, 0, 0, 0.75],
    89: [0, 0.68333, 0.025, 0, 0.75],
    90: [0, 0.68333, 0, 0, 0.61111],
    91: [0.25, 0.75, 0, 0, 0.27778],
    92: [0.25, 0.75, 0, 0, 0.5],
    93: [0.25, 0.75, 0, 0, 0.27778],
    94: [0, 0.69444, 0, 0, 0.5],
    95: [0.31, 0.12056, 0.02778, 0, 0.5],
    97: [0, 0.43056, 0, 0, 0.5],
    98: [0, 0.69444, 0, 0, 0.55556],
    99: [0, 0.43056, 0, 0, 0.44445],
    100: [0, 0.69444, 0, 0, 0.55556],
    101: [0, 0.43056, 0, 0, 0.44445],
    102: [0, 0.69444, 0.07778, 0, 0.30556],
    103: [0.19444, 0.43056, 0.01389, 0, 0.5],
    104: [0, 0.69444, 0, 0, 0.55556],
    105: [0, 0.66786, 0, 0, 0.27778],
    106: [0.19444, 0.66786, 0, 0, 0.30556],
    107: [0, 0.69444, 0, 0, 0.52778],
    108: [0, 0.69444, 0, 0, 0.27778],
    109: [0, 0.43056, 0, 0, 0.83334],
    110: [0, 0.43056, 0, 0, 0.55556],
    111: [0, 0.43056, 0, 0, 0.5],
    112: [0.19444, 0.43056, 0, 0, 0.55556],
    113: [0.19444, 0.43056, 0, 0, 0.52778],
    114: [0, 0.43056, 0, 0, 0.39167],
    115: [0, 0.43056, 0, 0, 0.39445],
    116: [0, 0.61508, 0, 0, 0.38889],
    117: [0, 0.43056, 0, 0, 0.55556],
    118: [0, 0.43056, 0.01389, 0, 0.52778],
    119: [0, 0.43056, 0.01389, 0, 0.72222],
    120: [0, 0.43056, 0, 0, 0.52778],
    121: [0.19444, 0.43056, 0.01389, 0, 0.52778],
    122: [0, 0.43056, 0, 0, 0.44445],
    123: [0.25, 0.75, 0, 0, 0.5],
    124: [0.25, 0.75, 0, 0, 0.27778],
    125: [0.25, 0.75, 0, 0, 0.5],
    126: [0.35, 0.31786, 0, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    163: [0, 0.69444, 0, 0, 0.76909],
    167: [0.19444, 0.69444, 0, 0, 0.44445],
    168: [0, 0.66786, 0, 0, 0.5],
    172: [0, 0.43056, 0, 0, 0.66667],
    176: [0, 0.69444, 0, 0, 0.75],
    177: [0.08333, 0.58333, 0, 0, 0.77778],
    182: [0.19444, 0.69444, 0, 0, 0.61111],
    184: [0.17014, 0, 0, 0, 0.44445],
    198: [0, 0.68333, 0, 0, 0.90278],
    215: [0.08333, 0.58333, 0, 0, 0.77778],
    216: [0.04861, 0.73194, 0, 0, 0.77778],
    223: [0, 0.69444, 0, 0, 0.5],
    230: [0, 0.43056, 0, 0, 0.72222],
    247: [0.08333, 0.58333, 0, 0, 0.77778],
    248: [0.09722, 0.52778, 0, 0, 0.5],
    305: [0, 0.43056, 0, 0, 0.27778],
    338: [0, 0.68333, 0, 0, 1.01389],
    339: [0, 0.43056, 0, 0, 0.77778],
    567: [0.19444, 0.43056, 0, 0, 0.30556],
    710: [0, 0.69444, 0, 0, 0.5],
    711: [0, 0.62847, 0, 0, 0.5],
    713: [0, 0.56778, 0, 0, 0.5],
    714: [0, 0.69444, 0, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0, 0, 0.5],
    729: [0, 0.66786, 0, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.75],
    732: [0, 0.66786, 0, 0, 0.5],
    733: [0, 0.69444, 0, 0, 0.5],
    915: [0, 0.68333, 0, 0, 0.625],
    916: [0, 0.68333, 0, 0, 0.83334],
    920: [0, 0.68333, 0, 0, 0.77778],
    923: [0, 0.68333, 0, 0, 0.69445],
    926: [0, 0.68333, 0, 0, 0.66667],
    928: [0, 0.68333, 0, 0, 0.75],
    931: [0, 0.68333, 0, 0, 0.72222],
    933: [0, 0.68333, 0, 0, 0.77778],
    934: [0, 0.68333, 0, 0, 0.72222],
    936: [0, 0.68333, 0, 0, 0.77778],
    937: [0, 0.68333, 0, 0, 0.72222],
    8211: [0, 0.43056, 0.02778, 0, 0.5],
    8212: [0, 0.43056, 0.02778, 0, 1],
    8216: [0, 0.69444, 0, 0, 0.27778],
    8217: [0, 0.69444, 0, 0, 0.27778],
    8220: [0, 0.69444, 0, 0, 0.5],
    8221: [0, 0.69444, 0, 0, 0.5],
    8224: [0.19444, 0.69444, 0, 0, 0.44445],
    8225: [0.19444, 0.69444, 0, 0, 0.44445],
    8230: [0, 0.123, 0, 0, 1.172],
    8242: [0, 0.55556, 0, 0, 0.275],
    8407: [0, 0.71444, 0.15382, 0, 0.5],
    8463: [0, 0.68889, 0, 0, 0.54028],
    8465: [0, 0.69444, 0, 0, 0.72222],
    8467: [0, 0.69444, 0, 0.11111, 0.41667],
    8472: [0.19444, 0.43056, 0, 0.11111, 0.63646],
    8476: [0, 0.69444, 0, 0, 0.72222],
    8501: [0, 0.69444, 0, 0, 0.61111],
    8592: [-0.13313, 0.36687, 0, 0, 1],
    8593: [0.19444, 0.69444, 0, 0, 0.5],
    8594: [-0.13313, 0.36687, 0, 0, 1],
    8595: [0.19444, 0.69444, 0, 0, 0.5],
    8596: [-0.13313, 0.36687, 0, 0, 1],
    8597: [0.25, 0.75, 0, 0, 0.5],
    8598: [0.19444, 0.69444, 0, 0, 1],
    8599: [0.19444, 0.69444, 0, 0, 1],
    8600: [0.19444, 0.69444, 0, 0, 1],
    8601: [0.19444, 0.69444, 0, 0, 1],
    8614: [0.011, 0.511, 0, 0, 1],
    8617: [0.011, 0.511, 0, 0, 1.126],
    8618: [0.011, 0.511, 0, 0, 1.126],
    8636: [-0.13313, 0.36687, 0, 0, 1],
    8637: [-0.13313, 0.36687, 0, 0, 1],
    8640: [-0.13313, 0.36687, 0, 0, 1],
    8641: [-0.13313, 0.36687, 0, 0, 1],
    8652: [0.011, 0.671, 0, 0, 1],
    8656: [-0.13313, 0.36687, 0, 0, 1],
    8657: [0.19444, 0.69444, 0, 0, 0.61111],
    8658: [-0.13313, 0.36687, 0, 0, 1],
    8659: [0.19444, 0.69444, 0, 0, 0.61111],
    8660: [-0.13313, 0.36687, 0, 0, 1],
    8661: [0.25, 0.75, 0, 0, 0.61111],
    8704: [0, 0.69444, 0, 0, 0.55556],
    8706: [0, 0.69444, 0.05556, 0.08334, 0.5309],
    8707: [0, 0.69444, 0, 0, 0.55556],
    8709: [0.05556, 0.75, 0, 0, 0.5],
    8711: [0, 0.68333, 0, 0, 0.83334],
    8712: [0.0391, 0.5391, 0, 0, 0.66667],
    8715: [0.0391, 0.5391, 0, 0, 0.66667],
    8722: [0.08333, 0.58333, 0, 0, 0.77778],
    8723: [0.08333, 0.58333, 0, 0, 0.77778],
    8725: [0.25, 0.75, 0, 0, 0.5],
    8726: [0.25, 0.75, 0, 0, 0.5],
    8727: [-0.03472, 0.46528, 0, 0, 0.5],
    8728: [-0.05555, 0.44445, 0, 0, 0.5],
    8729: [-0.05555, 0.44445, 0, 0, 0.5],
    8730: [0.2, 0.8, 0, 0, 0.83334],
    8733: [0, 0.43056, 0, 0, 0.77778],
    8734: [0, 0.43056, 0, 0, 1],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8739: [0.25, 0.75, 0, 0, 0.27778],
    8741: [0.25, 0.75, 0, 0, 0.5],
    8743: [0, 0.55556, 0, 0, 0.66667],
    8744: [0, 0.55556, 0, 0, 0.66667],
    8745: [0, 0.55556, 0, 0, 0.66667],
    8746: [0, 0.55556, 0, 0, 0.66667],
    8747: [0.19444, 0.69444, 0.11111, 0, 0.41667],
    8764: [-0.13313, 0.36687, 0, 0, 0.77778],
    8768: [0.19444, 0.69444, 0, 0, 0.27778],
    8771: [-0.03625, 0.46375, 0, 0, 0.77778],
    8773: [-0.022, 0.589, 0, 0, 0.778],
    8776: [-0.01688, 0.48312, 0, 0, 0.77778],
    8781: [-0.03625, 0.46375, 0, 0, 0.77778],
    8784: [-0.133, 0.673, 0, 0, 0.778],
    8801: [-0.03625, 0.46375, 0, 0, 0.77778],
    8804: [0.13597, 0.63597, 0, 0, 0.77778],
    8805: [0.13597, 0.63597, 0, 0, 0.77778],
    8810: [0.0391, 0.5391, 0, 0, 1],
    8811: [0.0391, 0.5391, 0, 0, 1],
    8826: [0.0391, 0.5391, 0, 0, 0.77778],
    8827: [0.0391, 0.5391, 0, 0, 0.77778],
    8834: [0.0391, 0.5391, 0, 0, 0.77778],
    8835: [0.0391, 0.5391, 0, 0, 0.77778],
    8838: [0.13597, 0.63597, 0, 0, 0.77778],
    8839: [0.13597, 0.63597, 0, 0, 0.77778],
    8846: [0, 0.55556, 0, 0, 0.66667],
    8849: [0.13597, 0.63597, 0, 0, 0.77778],
    8850: [0.13597, 0.63597, 0, 0, 0.77778],
    8851: [0, 0.55556, 0, 0, 0.66667],
    8852: [0, 0.55556, 0, 0, 0.66667],
    8853: [0.08333, 0.58333, 0, 0, 0.77778],
    8854: [0.08333, 0.58333, 0, 0, 0.77778],
    8855: [0.08333, 0.58333, 0, 0, 0.77778],
    8856: [0.08333, 0.58333, 0, 0, 0.77778],
    8857: [0.08333, 0.58333, 0, 0, 0.77778],
    8866: [0, 0.69444, 0, 0, 0.61111],
    8867: [0, 0.69444, 0, 0, 0.61111],
    8868: [0, 0.69444, 0, 0, 0.77778],
    8869: [0, 0.69444, 0, 0, 0.77778],
    8872: [0.249, 0.75, 0, 0, 0.867],
    8900: [-0.05555, 0.44445, 0, 0, 0.5],
    8901: [-0.05555, 0.44445, 0, 0, 0.27778],
    8902: [-0.03472, 0.46528, 0, 0, 0.5],
    8904: [5e-3, 0.505, 0, 0, 0.9],
    8942: [0.03, 0.903, 0, 0, 0.278],
    8943: [-0.19, 0.313, 0, 0, 1.172],
    8945: [-0.1, 0.823, 0, 0, 1.282],
    8968: [0.25, 0.75, 0, 0, 0.44445],
    8969: [0.25, 0.75, 0, 0, 0.44445],
    8970: [0.25, 0.75, 0, 0, 0.44445],
    8971: [0.25, 0.75, 0, 0, 0.44445],
    8994: [-0.14236, 0.35764, 0, 0, 1],
    8995: [-0.14236, 0.35764, 0, 0, 1],
    9136: [0.244, 0.744, 0, 0, 0.412],
    9137: [0.244, 0.745, 0, 0, 0.412],
    9651: [0.19444, 0.69444, 0, 0, 0.88889],
    9657: [-0.03472, 0.46528, 0, 0, 0.5],
    9661: [0.19444, 0.69444, 0, 0, 0.88889],
    9667: [-0.03472, 0.46528, 0, 0, 0.5],
    9711: [0.19444, 0.69444, 0, 0, 1],
    9824: [0.12963, 0.69444, 0, 0, 0.77778],
    9825: [0.12963, 0.69444, 0, 0, 0.77778],
    9826: [0.12963, 0.69444, 0, 0, 0.77778],
    9827: [0.12963, 0.69444, 0, 0, 0.77778],
    9837: [0, 0.75, 0, 0, 0.38889],
    9838: [0.19444, 0.69444, 0, 0, 0.38889],
    9839: [0.19444, 0.69444, 0, 0, 0.38889],
    10216: [0.25, 0.75, 0, 0, 0.38889],
    10217: [0.25, 0.75, 0, 0, 0.38889],
    10222: [0.244, 0.744, 0, 0, 0.412],
    10223: [0.244, 0.745, 0, 0, 0.412],
    10229: [0.011, 0.511, 0, 0, 1.609],
    10230: [0.011, 0.511, 0, 0, 1.638],
    10231: [0.011, 0.511, 0, 0, 1.859],
    10232: [0.024, 0.525, 0, 0, 1.609],
    10233: [0.024, 0.525, 0, 0, 1.638],
    10234: [0.024, 0.525, 0, 0, 1.858],
    10236: [0.011, 0.511, 0, 0, 1.638],
    10815: [0, 0.68333, 0, 0, 0.75],
    10927: [0.13597, 0.63597, 0, 0, 0.77778],
    10928: [0.13597, 0.63597, 0, 0, 0.77778],
    57376: [0.19444, 0.69444, 0, 0, 0]
  },
  "Math-BoldItalic": {
    32: [0, 0, 0, 0, 0.25],
    48: [0, 0.44444, 0, 0, 0.575],
    49: [0, 0.44444, 0, 0, 0.575],
    50: [0, 0.44444, 0, 0, 0.575],
    51: [0.19444, 0.44444, 0, 0, 0.575],
    52: [0.19444, 0.44444, 0, 0, 0.575],
    53: [0.19444, 0.44444, 0, 0, 0.575],
    54: [0, 0.64444, 0, 0, 0.575],
    55: [0.19444, 0.44444, 0, 0, 0.575],
    56: [0, 0.64444, 0, 0, 0.575],
    57: [0.19444, 0.44444, 0, 0, 0.575],
    65: [0, 0.68611, 0, 0, 0.86944],
    66: [0, 0.68611, 0.04835, 0, 0.8664],
    67: [0, 0.68611, 0.06979, 0, 0.81694],
    68: [0, 0.68611, 0.03194, 0, 0.93812],
    69: [0, 0.68611, 0.05451, 0, 0.81007],
    70: [0, 0.68611, 0.15972, 0, 0.68889],
    71: [0, 0.68611, 0, 0, 0.88673],
    72: [0, 0.68611, 0.08229, 0, 0.98229],
    73: [0, 0.68611, 0.07778, 0, 0.51111],
    74: [0, 0.68611, 0.10069, 0, 0.63125],
    75: [0, 0.68611, 0.06979, 0, 0.97118],
    76: [0, 0.68611, 0, 0, 0.75555],
    77: [0, 0.68611, 0.11424, 0, 1.14201],
    78: [0, 0.68611, 0.11424, 0, 0.95034],
    79: [0, 0.68611, 0.03194, 0, 0.83666],
    80: [0, 0.68611, 0.15972, 0, 0.72309],
    81: [0.19444, 0.68611, 0, 0, 0.86861],
    82: [0, 0.68611, 421e-5, 0, 0.87235],
    83: [0, 0.68611, 0.05382, 0, 0.69271],
    84: [0, 0.68611, 0.15972, 0, 0.63663],
    85: [0, 0.68611, 0.11424, 0, 0.80027],
    86: [0, 0.68611, 0.25555, 0, 0.67778],
    87: [0, 0.68611, 0.15972, 0, 1.09305],
    88: [0, 0.68611, 0.07778, 0, 0.94722],
    89: [0, 0.68611, 0.25555, 0, 0.67458],
    90: [0, 0.68611, 0.06979, 0, 0.77257],
    97: [0, 0.44444, 0, 0, 0.63287],
    98: [0, 0.69444, 0, 0, 0.52083],
    99: [0, 0.44444, 0, 0, 0.51342],
    100: [0, 0.69444, 0, 0, 0.60972],
    101: [0, 0.44444, 0, 0, 0.55361],
    102: [0.19444, 0.69444, 0.11042, 0, 0.56806],
    103: [0.19444, 0.44444, 0.03704, 0, 0.5449],
    104: [0, 0.69444, 0, 0, 0.66759],
    105: [0, 0.69326, 0, 0, 0.4048],
    106: [0.19444, 0.69326, 0.0622, 0, 0.47083],
    107: [0, 0.69444, 0.01852, 0, 0.6037],
    108: [0, 0.69444, 88e-4, 0, 0.34815],
    109: [0, 0.44444, 0, 0, 1.0324],
    110: [0, 0.44444, 0, 0, 0.71296],
    111: [0, 0.44444, 0, 0, 0.58472],
    112: [0.19444, 0.44444, 0, 0, 0.60092],
    113: [0.19444, 0.44444, 0.03704, 0, 0.54213],
    114: [0, 0.44444, 0.03194, 0, 0.5287],
    115: [0, 0.44444, 0, 0, 0.53125],
    116: [0, 0.63492, 0, 0, 0.41528],
    117: [0, 0.44444, 0, 0, 0.68102],
    118: [0, 0.44444, 0.03704, 0, 0.56666],
    119: [0, 0.44444, 0.02778, 0, 0.83148],
    120: [0, 0.44444, 0, 0, 0.65903],
    121: [0.19444, 0.44444, 0.03704, 0, 0.59028],
    122: [0, 0.44444, 0.04213, 0, 0.55509],
    160: [0, 0, 0, 0, 0.25],
    915: [0, 0.68611, 0.15972, 0, 0.65694],
    916: [0, 0.68611, 0, 0, 0.95833],
    920: [0, 0.68611, 0.03194, 0, 0.86722],
    923: [0, 0.68611, 0, 0, 0.80555],
    926: [0, 0.68611, 0.07458, 0, 0.84125],
    928: [0, 0.68611, 0.08229, 0, 0.98229],
    931: [0, 0.68611, 0.05451, 0, 0.88507],
    933: [0, 0.68611, 0.15972, 0, 0.67083],
    934: [0, 0.68611, 0, 0, 0.76666],
    936: [0, 0.68611, 0.11653, 0, 0.71402],
    937: [0, 0.68611, 0.04835, 0, 0.8789],
    945: [0, 0.44444, 0, 0, 0.76064],
    946: [0.19444, 0.69444, 0.03403, 0, 0.65972],
    947: [0.19444, 0.44444, 0.06389, 0, 0.59003],
    948: [0, 0.69444, 0.03819, 0, 0.52222],
    949: [0, 0.44444, 0, 0, 0.52882],
    950: [0.19444, 0.69444, 0.06215, 0, 0.50833],
    951: [0.19444, 0.44444, 0.03704, 0, 0.6],
    952: [0, 0.69444, 0.03194, 0, 0.5618],
    953: [0, 0.44444, 0, 0, 0.41204],
    954: [0, 0.44444, 0, 0, 0.66759],
    955: [0, 0.69444, 0, 0, 0.67083],
    956: [0.19444, 0.44444, 0, 0, 0.70787],
    957: [0, 0.44444, 0.06898, 0, 0.57685],
    958: [0.19444, 0.69444, 0.03021, 0, 0.50833],
    959: [0, 0.44444, 0, 0, 0.58472],
    960: [0, 0.44444, 0.03704, 0, 0.68241],
    961: [0.19444, 0.44444, 0, 0, 0.6118],
    962: [0.09722, 0.44444, 0.07917, 0, 0.42361],
    963: [0, 0.44444, 0.03704, 0, 0.68588],
    964: [0, 0.44444, 0.13472, 0, 0.52083],
    965: [0, 0.44444, 0.03704, 0, 0.63055],
    966: [0.19444, 0.44444, 0, 0, 0.74722],
    967: [0.19444, 0.44444, 0, 0, 0.71805],
    968: [0.19444, 0.69444, 0.03704, 0, 0.75833],
    969: [0, 0.44444, 0.03704, 0, 0.71782],
    977: [0, 0.69444, 0, 0, 0.69155],
    981: [0.19444, 0.69444, 0, 0, 0.7125],
    982: [0, 0.44444, 0.03194, 0, 0.975],
    1009: [0.19444, 0.44444, 0, 0, 0.6118],
    1013: [0, 0.44444, 0, 0, 0.48333],
    57649: [0, 0.44444, 0, 0, 0.39352],
    57911: [0.19444, 0.44444, 0, 0, 0.43889]
  },
  "Math-Italic": {
    32: [0, 0, 0, 0, 0.25],
    48: [0, 0.43056, 0, 0, 0.5],
    49: [0, 0.43056, 0, 0, 0.5],
    50: [0, 0.43056, 0, 0, 0.5],
    51: [0.19444, 0.43056, 0, 0, 0.5],
    52: [0.19444, 0.43056, 0, 0, 0.5],
    53: [0.19444, 0.43056, 0, 0, 0.5],
    54: [0, 0.64444, 0, 0, 0.5],
    55: [0.19444, 0.43056, 0, 0, 0.5],
    56: [0, 0.64444, 0, 0, 0.5],
    57: [0.19444, 0.43056, 0, 0, 0.5],
    65: [0, 0.68333, 0, 0.13889, 0.75],
    66: [0, 0.68333, 0.05017, 0.08334, 0.75851],
    67: [0, 0.68333, 0.07153, 0.08334, 0.71472],
    68: [0, 0.68333, 0.02778, 0.05556, 0.82792],
    69: [0, 0.68333, 0.05764, 0.08334, 0.7382],
    70: [0, 0.68333, 0.13889, 0.08334, 0.64306],
    71: [0, 0.68333, 0, 0.08334, 0.78625],
    72: [0, 0.68333, 0.08125, 0.05556, 0.83125],
    73: [0, 0.68333, 0.07847, 0.11111, 0.43958],
    74: [0, 0.68333, 0.09618, 0.16667, 0.55451],
    75: [0, 0.68333, 0.07153, 0.05556, 0.84931],
    76: [0, 0.68333, 0, 0.02778, 0.68056],
    77: [0, 0.68333, 0.10903, 0.08334, 0.97014],
    78: [0, 0.68333, 0.10903, 0.08334, 0.80347],
    79: [0, 0.68333, 0.02778, 0.08334, 0.76278],
    80: [0, 0.68333, 0.13889, 0.08334, 0.64201],
    81: [0.19444, 0.68333, 0, 0.08334, 0.79056],
    82: [0, 0.68333, 773e-5, 0.08334, 0.75929],
    83: [0, 0.68333, 0.05764, 0.08334, 0.6132],
    84: [0, 0.68333, 0.13889, 0.08334, 0.58438],
    85: [0, 0.68333, 0.10903, 0.02778, 0.68278],
    86: [0, 0.68333, 0.22222, 0, 0.58333],
    87: [0, 0.68333, 0.13889, 0, 0.94445],
    88: [0, 0.68333, 0.07847, 0.08334, 0.82847],
    89: [0, 0.68333, 0.22222, 0, 0.58056],
    90: [0, 0.68333, 0.07153, 0.08334, 0.68264],
    97: [0, 0.43056, 0, 0, 0.52859],
    98: [0, 0.69444, 0, 0, 0.42917],
    99: [0, 0.43056, 0, 0.05556, 0.43276],
    100: [0, 0.69444, 0, 0.16667, 0.52049],
    101: [0, 0.43056, 0, 0.05556, 0.46563],
    102: [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
    103: [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
    104: [0, 0.69444, 0, 0, 0.57616],
    105: [0, 0.65952, 0, 0, 0.34451],
    106: [0.19444, 0.65952, 0.05724, 0, 0.41181],
    107: [0, 0.69444, 0.03148, 0, 0.5206],
    108: [0, 0.69444, 0.01968, 0.08334, 0.29838],
    109: [0, 0.43056, 0, 0, 0.87801],
    110: [0, 0.43056, 0, 0, 0.60023],
    111: [0, 0.43056, 0, 0.05556, 0.48472],
    112: [0.19444, 0.43056, 0, 0.08334, 0.50313],
    113: [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
    114: [0, 0.43056, 0.02778, 0.05556, 0.45116],
    115: [0, 0.43056, 0, 0.05556, 0.46875],
    116: [0, 0.61508, 0, 0.08334, 0.36111],
    117: [0, 0.43056, 0, 0.02778, 0.57246],
    118: [0, 0.43056, 0.03588, 0.02778, 0.48472],
    119: [0, 0.43056, 0.02691, 0.08334, 0.71592],
    120: [0, 0.43056, 0, 0.02778, 0.57153],
    121: [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
    122: [0, 0.43056, 0.04398, 0.05556, 0.46505],
    160: [0, 0, 0, 0, 0.25],
    915: [0, 0.68333, 0.13889, 0.08334, 0.61528],
    916: [0, 0.68333, 0, 0.16667, 0.83334],
    920: [0, 0.68333, 0.02778, 0.08334, 0.76278],
    923: [0, 0.68333, 0, 0.16667, 0.69445],
    926: [0, 0.68333, 0.07569, 0.08334, 0.74236],
    928: [0, 0.68333, 0.08125, 0.05556, 0.83125],
    931: [0, 0.68333, 0.05764, 0.08334, 0.77986],
    933: [0, 0.68333, 0.13889, 0.05556, 0.58333],
    934: [0, 0.68333, 0, 0.08334, 0.66667],
    936: [0, 0.68333, 0.11, 0.05556, 0.61222],
    937: [0, 0.68333, 0.05017, 0.08334, 0.7724],
    945: [0, 0.43056, 37e-4, 0.02778, 0.6397],
    946: [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
    947: [0.19444, 0.43056, 0.05556, 0, 0.51773],
    948: [0, 0.69444, 0.03785, 0.05556, 0.44444],
    949: [0, 0.43056, 0, 0.08334, 0.46632],
    950: [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
    951: [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
    952: [0, 0.69444, 0.02778, 0.08334, 0.46944],
    953: [0, 0.43056, 0, 0.05556, 0.35394],
    954: [0, 0.43056, 0, 0, 0.57616],
    955: [0, 0.69444, 0, 0, 0.58334],
    956: [0.19444, 0.43056, 0, 0.02778, 0.60255],
    957: [0, 0.43056, 0.06366, 0.02778, 0.49398],
    958: [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
    959: [0, 0.43056, 0, 0.05556, 0.48472],
    960: [0, 0.43056, 0.03588, 0, 0.57003],
    961: [0.19444, 0.43056, 0, 0.08334, 0.51702],
    962: [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
    963: [0, 0.43056, 0.03588, 0, 0.57141],
    964: [0, 0.43056, 0.1132, 0.02778, 0.43715],
    965: [0, 0.43056, 0.03588, 0.02778, 0.54028],
    966: [0.19444, 0.43056, 0, 0.08334, 0.65417],
    967: [0.19444, 0.43056, 0, 0.05556, 0.62569],
    968: [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
    969: [0, 0.43056, 0.03588, 0, 0.62245],
    977: [0, 0.69444, 0, 0.08334, 0.59144],
    981: [0.19444, 0.69444, 0, 0.08334, 0.59583],
    982: [0, 0.43056, 0.02778, 0, 0.82813],
    1009: [0.19444, 0.43056, 0, 0.08334, 0.51702],
    1013: [0, 0.43056, 0, 0.05556, 0.4059],
    57649: [0, 0.43056, 0, 0.02778, 0.32246],
    57911: [0.19444, 0.43056, 0, 0.08334, 0.38403]
  },
  "SansSerif-Bold": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.36667],
    34: [0, 0.69444, 0, 0, 0.55834],
    35: [0.19444, 0.69444, 0, 0, 0.91667],
    36: [0.05556, 0.75, 0, 0, 0.55],
    37: [0.05556, 0.75, 0, 0, 1.02912],
    38: [0, 0.69444, 0, 0, 0.83056],
    39: [0, 0.69444, 0, 0, 0.30556],
    40: [0.25, 0.75, 0, 0, 0.42778],
    41: [0.25, 0.75, 0, 0, 0.42778],
    42: [0, 0.75, 0, 0, 0.55],
    43: [0.11667, 0.61667, 0, 0, 0.85556],
    44: [0.10556, 0.13056, 0, 0, 0.30556],
    45: [0, 0.45833, 0, 0, 0.36667],
    46: [0, 0.13056, 0, 0, 0.30556],
    47: [0.25, 0.75, 0, 0, 0.55],
    48: [0, 0.69444, 0, 0, 0.55],
    49: [0, 0.69444, 0, 0, 0.55],
    50: [0, 0.69444, 0, 0, 0.55],
    51: [0, 0.69444, 0, 0, 0.55],
    52: [0, 0.69444, 0, 0, 0.55],
    53: [0, 0.69444, 0, 0, 0.55],
    54: [0, 0.69444, 0, 0, 0.55],
    55: [0, 0.69444, 0, 0, 0.55],
    56: [0, 0.69444, 0, 0, 0.55],
    57: [0, 0.69444, 0, 0, 0.55],
    58: [0, 0.45833, 0, 0, 0.30556],
    59: [0.10556, 0.45833, 0, 0, 0.30556],
    61: [-0.09375, 0.40625, 0, 0, 0.85556],
    63: [0, 0.69444, 0, 0, 0.51945],
    64: [0, 0.69444, 0, 0, 0.73334],
    65: [0, 0.69444, 0, 0, 0.73334],
    66: [0, 0.69444, 0, 0, 0.73334],
    67: [0, 0.69444, 0, 0, 0.70278],
    68: [0, 0.69444, 0, 0, 0.79445],
    69: [0, 0.69444, 0, 0, 0.64167],
    70: [0, 0.69444, 0, 0, 0.61111],
    71: [0, 0.69444, 0, 0, 0.73334],
    72: [0, 0.69444, 0, 0, 0.79445],
    73: [0, 0.69444, 0, 0, 0.33056],
    74: [0, 0.69444, 0, 0, 0.51945],
    75: [0, 0.69444, 0, 0, 0.76389],
    76: [0, 0.69444, 0, 0, 0.58056],
    77: [0, 0.69444, 0, 0, 0.97778],
    78: [0, 0.69444, 0, 0, 0.79445],
    79: [0, 0.69444, 0, 0, 0.79445],
    80: [0, 0.69444, 0, 0, 0.70278],
    81: [0.10556, 0.69444, 0, 0, 0.79445],
    82: [0, 0.69444, 0, 0, 0.70278],
    83: [0, 0.69444, 0, 0, 0.61111],
    84: [0, 0.69444, 0, 0, 0.73334],
    85: [0, 0.69444, 0, 0, 0.76389],
    86: [0, 0.69444, 0.01528, 0, 0.73334],
    87: [0, 0.69444, 0.01528, 0, 1.03889],
    88: [0, 0.69444, 0, 0, 0.73334],
    89: [0, 0.69444, 0.0275, 0, 0.73334],
    90: [0, 0.69444, 0, 0, 0.67223],
    91: [0.25, 0.75, 0, 0, 0.34306],
    93: [0.25, 0.75, 0, 0, 0.34306],
    94: [0, 0.69444, 0, 0, 0.55],
    95: [0.35, 0.10833, 0.03056, 0, 0.55],
    97: [0, 0.45833, 0, 0, 0.525],
    98: [0, 0.69444, 0, 0, 0.56111],
    99: [0, 0.45833, 0, 0, 0.48889],
    100: [0, 0.69444, 0, 0, 0.56111],
    101: [0, 0.45833, 0, 0, 0.51111],
    102: [0, 0.69444, 0.07639, 0, 0.33611],
    103: [0.19444, 0.45833, 0.01528, 0, 0.55],
    104: [0, 0.69444, 0, 0, 0.56111],
    105: [0, 0.69444, 0, 0, 0.25556],
    106: [0.19444, 0.69444, 0, 0, 0.28611],
    107: [0, 0.69444, 0, 0, 0.53056],
    108: [0, 0.69444, 0, 0, 0.25556],
    109: [0, 0.45833, 0, 0, 0.86667],
    110: [0, 0.45833, 0, 0, 0.56111],
    111: [0, 0.45833, 0, 0, 0.55],
    112: [0.19444, 0.45833, 0, 0, 0.56111],
    113: [0.19444, 0.45833, 0, 0, 0.56111],
    114: [0, 0.45833, 0.01528, 0, 0.37222],
    115: [0, 0.45833, 0, 0, 0.42167],
    116: [0, 0.58929, 0, 0, 0.40417],
    117: [0, 0.45833, 0, 0, 0.56111],
    118: [0, 0.45833, 0.01528, 0, 0.5],
    119: [0, 0.45833, 0.01528, 0, 0.74445],
    120: [0, 0.45833, 0, 0, 0.5],
    121: [0.19444, 0.45833, 0.01528, 0, 0.5],
    122: [0, 0.45833, 0, 0, 0.47639],
    126: [0.35, 0.34444, 0, 0, 0.55],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.69444, 0, 0, 0.55],
    176: [0, 0.69444, 0, 0, 0.73334],
    180: [0, 0.69444, 0, 0, 0.55],
    184: [0.17014, 0, 0, 0, 0.48889],
    305: [0, 0.45833, 0, 0, 0.25556],
    567: [0.19444, 0.45833, 0, 0, 0.28611],
    710: [0, 0.69444, 0, 0, 0.55],
    711: [0, 0.63542, 0, 0, 0.55],
    713: [0, 0.63778, 0, 0, 0.55],
    728: [0, 0.69444, 0, 0, 0.55],
    729: [0, 0.69444, 0, 0, 0.30556],
    730: [0, 0.69444, 0, 0, 0.73334],
    732: [0, 0.69444, 0, 0, 0.55],
    733: [0, 0.69444, 0, 0, 0.55],
    915: [0, 0.69444, 0, 0, 0.58056],
    916: [0, 0.69444, 0, 0, 0.91667],
    920: [0, 0.69444, 0, 0, 0.85556],
    923: [0, 0.69444, 0, 0, 0.67223],
    926: [0, 0.69444, 0, 0, 0.73334],
    928: [0, 0.69444, 0, 0, 0.79445],
    931: [0, 0.69444, 0, 0, 0.79445],
    933: [0, 0.69444, 0, 0, 0.85556],
    934: [0, 0.69444, 0, 0, 0.79445],
    936: [0, 0.69444, 0, 0, 0.85556],
    937: [0, 0.69444, 0, 0, 0.79445],
    8211: [0, 0.45833, 0.03056, 0, 0.55],
    8212: [0, 0.45833, 0.03056, 0, 1.10001],
    8216: [0, 0.69444, 0, 0, 0.30556],
    8217: [0, 0.69444, 0, 0, 0.30556],
    8220: [0, 0.69444, 0, 0, 0.55834],
    8221: [0, 0.69444, 0, 0, 0.55834]
  },
  "SansSerif-Italic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.05733, 0, 0.31945],
    34: [0, 0.69444, 316e-5, 0, 0.5],
    35: [0.19444, 0.69444, 0.05087, 0, 0.83334],
    36: [0.05556, 0.75, 0.11156, 0, 0.5],
    37: [0.05556, 0.75, 0.03126, 0, 0.83334],
    38: [0, 0.69444, 0.03058, 0, 0.75834],
    39: [0, 0.69444, 0.07816, 0, 0.27778],
    40: [0.25, 0.75, 0.13164, 0, 0.38889],
    41: [0.25, 0.75, 0.02536, 0, 0.38889],
    42: [0, 0.75, 0.11775, 0, 0.5],
    43: [0.08333, 0.58333, 0.02536, 0, 0.77778],
    44: [0.125, 0.08333, 0, 0, 0.27778],
    45: [0, 0.44444, 0.01946, 0, 0.33333],
    46: [0, 0.08333, 0, 0, 0.27778],
    47: [0.25, 0.75, 0.13164, 0, 0.5],
    48: [0, 0.65556, 0.11156, 0, 0.5],
    49: [0, 0.65556, 0.11156, 0, 0.5],
    50: [0, 0.65556, 0.11156, 0, 0.5],
    51: [0, 0.65556, 0.11156, 0, 0.5],
    52: [0, 0.65556, 0.11156, 0, 0.5],
    53: [0, 0.65556, 0.11156, 0, 0.5],
    54: [0, 0.65556, 0.11156, 0, 0.5],
    55: [0, 0.65556, 0.11156, 0, 0.5],
    56: [0, 0.65556, 0.11156, 0, 0.5],
    57: [0, 0.65556, 0.11156, 0, 0.5],
    58: [0, 0.44444, 0.02502, 0, 0.27778],
    59: [0.125, 0.44444, 0.02502, 0, 0.27778],
    61: [-0.13, 0.37, 0.05087, 0, 0.77778],
    63: [0, 0.69444, 0.11809, 0, 0.47222],
    64: [0, 0.69444, 0.07555, 0, 0.66667],
    65: [0, 0.69444, 0, 0, 0.66667],
    66: [0, 0.69444, 0.08293, 0, 0.66667],
    67: [0, 0.69444, 0.11983, 0, 0.63889],
    68: [0, 0.69444, 0.07555, 0, 0.72223],
    69: [0, 0.69444, 0.11983, 0, 0.59722],
    70: [0, 0.69444, 0.13372, 0, 0.56945],
    71: [0, 0.69444, 0.11983, 0, 0.66667],
    72: [0, 0.69444, 0.08094, 0, 0.70834],
    73: [0, 0.69444, 0.13372, 0, 0.27778],
    74: [0, 0.69444, 0.08094, 0, 0.47222],
    75: [0, 0.69444, 0.11983, 0, 0.69445],
    76: [0, 0.69444, 0, 0, 0.54167],
    77: [0, 0.69444, 0.08094, 0, 0.875],
    78: [0, 0.69444, 0.08094, 0, 0.70834],
    79: [0, 0.69444, 0.07555, 0, 0.73611],
    80: [0, 0.69444, 0.08293, 0, 0.63889],
    81: [0.125, 0.69444, 0.07555, 0, 0.73611],
    82: [0, 0.69444, 0.08293, 0, 0.64584],
    83: [0, 0.69444, 0.09205, 0, 0.55556],
    84: [0, 0.69444, 0.13372, 0, 0.68056],
    85: [0, 0.69444, 0.08094, 0, 0.6875],
    86: [0, 0.69444, 0.1615, 0, 0.66667],
    87: [0, 0.69444, 0.1615, 0, 0.94445],
    88: [0, 0.69444, 0.13372, 0, 0.66667],
    89: [0, 0.69444, 0.17261, 0, 0.66667],
    90: [0, 0.69444, 0.11983, 0, 0.61111],
    91: [0.25, 0.75, 0.15942, 0, 0.28889],
    93: [0.25, 0.75, 0.08719, 0, 0.28889],
    94: [0, 0.69444, 0.0799, 0, 0.5],
    95: [0.35, 0.09444, 0.08616, 0, 0.5],
    97: [0, 0.44444, 981e-5, 0, 0.48056],
    98: [0, 0.69444, 0.03057, 0, 0.51667],
    99: [0, 0.44444, 0.08336, 0, 0.44445],
    100: [0, 0.69444, 0.09483, 0, 0.51667],
    101: [0, 0.44444, 0.06778, 0, 0.44445],
    102: [0, 0.69444, 0.21705, 0, 0.30556],
    103: [0.19444, 0.44444, 0.10836, 0, 0.5],
    104: [0, 0.69444, 0.01778, 0, 0.51667],
    105: [0, 0.67937, 0.09718, 0, 0.23889],
    106: [0.19444, 0.67937, 0.09162, 0, 0.26667],
    107: [0, 0.69444, 0.08336, 0, 0.48889],
    108: [0, 0.69444, 0.09483, 0, 0.23889],
    109: [0, 0.44444, 0.01778, 0, 0.79445],
    110: [0, 0.44444, 0.01778, 0, 0.51667],
    111: [0, 0.44444, 0.06613, 0, 0.5],
    112: [0.19444, 0.44444, 0.0389, 0, 0.51667],
    113: [0.19444, 0.44444, 0.04169, 0, 0.51667],
    114: [0, 0.44444, 0.10836, 0, 0.34167],
    115: [0, 0.44444, 0.0778, 0, 0.38333],
    116: [0, 0.57143, 0.07225, 0, 0.36111],
    117: [0, 0.44444, 0.04169, 0, 0.51667],
    118: [0, 0.44444, 0.10836, 0, 0.46111],
    119: [0, 0.44444, 0.10836, 0, 0.68334],
    120: [0, 0.44444, 0.09169, 0, 0.46111],
    121: [0.19444, 0.44444, 0.10836, 0, 0.46111],
    122: [0, 0.44444, 0.08752, 0, 0.43472],
    126: [0.35, 0.32659, 0.08826, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.67937, 0.06385, 0, 0.5],
    176: [0, 0.69444, 0, 0, 0.73752],
    184: [0.17014, 0, 0, 0, 0.44445],
    305: [0, 0.44444, 0.04169, 0, 0.23889],
    567: [0.19444, 0.44444, 0.04169, 0, 0.26667],
    710: [0, 0.69444, 0.0799, 0, 0.5],
    711: [0, 0.63194, 0.08432, 0, 0.5],
    713: [0, 0.60889, 0.08776, 0, 0.5],
    714: [0, 0.69444, 0.09205, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0.09483, 0, 0.5],
    729: [0, 0.67937, 0.07774, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.73752],
    732: [0, 0.67659, 0.08826, 0, 0.5],
    733: [0, 0.69444, 0.09205, 0, 0.5],
    915: [0, 0.69444, 0.13372, 0, 0.54167],
    916: [0, 0.69444, 0, 0, 0.83334],
    920: [0, 0.69444, 0.07555, 0, 0.77778],
    923: [0, 0.69444, 0, 0, 0.61111],
    926: [0, 0.69444, 0.12816, 0, 0.66667],
    928: [0, 0.69444, 0.08094, 0, 0.70834],
    931: [0, 0.69444, 0.11983, 0, 0.72222],
    933: [0, 0.69444, 0.09031, 0, 0.77778],
    934: [0, 0.69444, 0.04603, 0, 0.72222],
    936: [0, 0.69444, 0.09031, 0, 0.77778],
    937: [0, 0.69444, 0.08293, 0, 0.72222],
    8211: [0, 0.44444, 0.08616, 0, 0.5],
    8212: [0, 0.44444, 0.08616, 0, 1],
    8216: [0, 0.69444, 0.07816, 0, 0.27778],
    8217: [0, 0.69444, 0.07816, 0, 0.27778],
    8220: [0, 0.69444, 0.14205, 0, 0.5],
    8221: [0, 0.69444, 316e-5, 0, 0.5]
  },
  "SansSerif-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.31945],
    34: [0, 0.69444, 0, 0, 0.5],
    35: [0.19444, 0.69444, 0, 0, 0.83334],
    36: [0.05556, 0.75, 0, 0, 0.5],
    37: [0.05556, 0.75, 0, 0, 0.83334],
    38: [0, 0.69444, 0, 0, 0.75834],
    39: [0, 0.69444, 0, 0, 0.27778],
    40: [0.25, 0.75, 0, 0, 0.38889],
    41: [0.25, 0.75, 0, 0, 0.38889],
    42: [0, 0.75, 0, 0, 0.5],
    43: [0.08333, 0.58333, 0, 0, 0.77778],
    44: [0.125, 0.08333, 0, 0, 0.27778],
    45: [0, 0.44444, 0, 0, 0.33333],
    46: [0, 0.08333, 0, 0, 0.27778],
    47: [0.25, 0.75, 0, 0, 0.5],
    48: [0, 0.65556, 0, 0, 0.5],
    49: [0, 0.65556, 0, 0, 0.5],
    50: [0, 0.65556, 0, 0, 0.5],
    51: [0, 0.65556, 0, 0, 0.5],
    52: [0, 0.65556, 0, 0, 0.5],
    53: [0, 0.65556, 0, 0, 0.5],
    54: [0, 0.65556, 0, 0, 0.5],
    55: [0, 0.65556, 0, 0, 0.5],
    56: [0, 0.65556, 0, 0, 0.5],
    57: [0, 0.65556, 0, 0, 0.5],
    58: [0, 0.44444, 0, 0, 0.27778],
    59: [0.125, 0.44444, 0, 0, 0.27778],
    61: [-0.13, 0.37, 0, 0, 0.77778],
    63: [0, 0.69444, 0, 0, 0.47222],
    64: [0, 0.69444, 0, 0, 0.66667],
    65: [0, 0.69444, 0, 0, 0.66667],
    66: [0, 0.69444, 0, 0, 0.66667],
    67: [0, 0.69444, 0, 0, 0.63889],
    68: [0, 0.69444, 0, 0, 0.72223],
    69: [0, 0.69444, 0, 0, 0.59722],
    70: [0, 0.69444, 0, 0, 0.56945],
    71: [0, 0.69444, 0, 0, 0.66667],
    72: [0, 0.69444, 0, 0, 0.70834],
    73: [0, 0.69444, 0, 0, 0.27778],
    74: [0, 0.69444, 0, 0, 0.47222],
    75: [0, 0.69444, 0, 0, 0.69445],
    76: [0, 0.69444, 0, 0, 0.54167],
    77: [0, 0.69444, 0, 0, 0.875],
    78: [0, 0.69444, 0, 0, 0.70834],
    79: [0, 0.69444, 0, 0, 0.73611],
    80: [0, 0.69444, 0, 0, 0.63889],
    81: [0.125, 0.69444, 0, 0, 0.73611],
    82: [0, 0.69444, 0, 0, 0.64584],
    83: [0, 0.69444, 0, 0, 0.55556],
    84: [0, 0.69444, 0, 0, 0.68056],
    85: [0, 0.69444, 0, 0, 0.6875],
    86: [0, 0.69444, 0.01389, 0, 0.66667],
    87: [0, 0.69444, 0.01389, 0, 0.94445],
    88: [0, 0.69444, 0, 0, 0.66667],
    89: [0, 0.69444, 0.025, 0, 0.66667],
    90: [0, 0.69444, 0, 0, 0.61111],
    91: [0.25, 0.75, 0, 0, 0.28889],
    93: [0.25, 0.75, 0, 0, 0.28889],
    94: [0, 0.69444, 0, 0, 0.5],
    95: [0.35, 0.09444, 0.02778, 0, 0.5],
    97: [0, 0.44444, 0, 0, 0.48056],
    98: [0, 0.69444, 0, 0, 0.51667],
    99: [0, 0.44444, 0, 0, 0.44445],
    100: [0, 0.69444, 0, 0, 0.51667],
    101: [0, 0.44444, 0, 0, 0.44445],
    102: [0, 0.69444, 0.06944, 0, 0.30556],
    103: [0.19444, 0.44444, 0.01389, 0, 0.5],
    104: [0, 0.69444, 0, 0, 0.51667],
    105: [0, 0.67937, 0, 0, 0.23889],
    106: [0.19444, 0.67937, 0, 0, 0.26667],
    107: [0, 0.69444, 0, 0, 0.48889],
    108: [0, 0.69444, 0, 0, 0.23889],
    109: [0, 0.44444, 0, 0, 0.79445],
    110: [0, 0.44444, 0, 0, 0.51667],
    111: [0, 0.44444, 0, 0, 0.5],
    112: [0.19444, 0.44444, 0, 0, 0.51667],
    113: [0.19444, 0.44444, 0, 0, 0.51667],
    114: [0, 0.44444, 0.01389, 0, 0.34167],
    115: [0, 0.44444, 0, 0, 0.38333],
    116: [0, 0.57143, 0, 0, 0.36111],
    117: [0, 0.44444, 0, 0, 0.51667],
    118: [0, 0.44444, 0.01389, 0, 0.46111],
    119: [0, 0.44444, 0.01389, 0, 0.68334],
    120: [0, 0.44444, 0, 0, 0.46111],
    121: [0.19444, 0.44444, 0.01389, 0, 0.46111],
    122: [0, 0.44444, 0, 0, 0.43472],
    126: [0.35, 0.32659, 0, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.67937, 0, 0, 0.5],
    176: [0, 0.69444, 0, 0, 0.66667],
    184: [0.17014, 0, 0, 0, 0.44445],
    305: [0, 0.44444, 0, 0, 0.23889],
    567: [0.19444, 0.44444, 0, 0, 0.26667],
    710: [0, 0.69444, 0, 0, 0.5],
    711: [0, 0.63194, 0, 0, 0.5],
    713: [0, 0.60889, 0, 0, 0.5],
    714: [0, 0.69444, 0, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0, 0, 0.5],
    729: [0, 0.67937, 0, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.66667],
    732: [0, 0.67659, 0, 0, 0.5],
    733: [0, 0.69444, 0, 0, 0.5],
    915: [0, 0.69444, 0, 0, 0.54167],
    916: [0, 0.69444, 0, 0, 0.83334],
    920: [0, 0.69444, 0, 0, 0.77778],
    923: [0, 0.69444, 0, 0, 0.61111],
    926: [0, 0.69444, 0, 0, 0.66667],
    928: [0, 0.69444, 0, 0, 0.70834],
    931: [0, 0.69444, 0, 0, 0.72222],
    933: [0, 0.69444, 0, 0, 0.77778],
    934: [0, 0.69444, 0, 0, 0.72222],
    936: [0, 0.69444, 0, 0, 0.77778],
    937: [0, 0.69444, 0, 0, 0.72222],
    8211: [0, 0.44444, 0.02778, 0, 0.5],
    8212: [0, 0.44444, 0.02778, 0, 1],
    8216: [0, 0.69444, 0, 0, 0.27778],
    8217: [0, 0.69444, 0, 0, 0.27778],
    8220: [0, 0.69444, 0, 0, 0.5],
    8221: [0, 0.69444, 0, 0, 0.5]
  },
  "Script-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.7, 0.22925, 0, 0.80253],
    66: [0, 0.7, 0.04087, 0, 0.90757],
    67: [0, 0.7, 0.1689, 0, 0.66619],
    68: [0, 0.7, 0.09371, 0, 0.77443],
    69: [0, 0.7, 0.18583, 0, 0.56162],
    70: [0, 0.7, 0.13634, 0, 0.89544],
    71: [0, 0.7, 0.17322, 0, 0.60961],
    72: [0, 0.7, 0.29694, 0, 0.96919],
    73: [0, 0.7, 0.19189, 0, 0.80907],
    74: [0.27778, 0.7, 0.19189, 0, 1.05159],
    75: [0, 0.7, 0.31259, 0, 0.91364],
    76: [0, 0.7, 0.19189, 0, 0.87373],
    77: [0, 0.7, 0.15981, 0, 1.08031],
    78: [0, 0.7, 0.3525, 0, 0.9015],
    79: [0, 0.7, 0.08078, 0, 0.73787],
    80: [0, 0.7, 0.08078, 0, 1.01262],
    81: [0, 0.7, 0.03305, 0, 0.88282],
    82: [0, 0.7, 0.06259, 0, 0.85],
    83: [0, 0.7, 0.19189, 0, 0.86767],
    84: [0, 0.7, 0.29087, 0, 0.74697],
    85: [0, 0.7, 0.25815, 0, 0.79996],
    86: [0, 0.7, 0.27523, 0, 0.62204],
    87: [0, 0.7, 0.27523, 0, 0.80532],
    88: [0, 0.7, 0.26006, 0, 0.94445],
    89: [0, 0.7, 0.2939, 0, 0.70961],
    90: [0, 0.7, 0.24037, 0, 0.8212],
    160: [0, 0, 0, 0, 0.25]
  },
  "Size1-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.35001, 0.85, 0, 0, 0.45834],
    41: [0.35001, 0.85, 0, 0, 0.45834],
    47: [0.35001, 0.85, 0, 0, 0.57778],
    91: [0.35001, 0.85, 0, 0, 0.41667],
    92: [0.35001, 0.85, 0, 0, 0.57778],
    93: [0.35001, 0.85, 0, 0, 0.41667],
    123: [0.35001, 0.85, 0, 0, 0.58334],
    125: [0.35001, 0.85, 0, 0, 0.58334],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.72222, 0, 0, 0.55556],
    732: [0, 0.72222, 0, 0, 0.55556],
    770: [0, 0.72222, 0, 0, 0.55556],
    771: [0, 0.72222, 0, 0, 0.55556],
    8214: [-99e-5, 0.601, 0, 0, 0.77778],
    8593: [1e-5, 0.6, 0, 0, 0.66667],
    8595: [1e-5, 0.6, 0, 0, 0.66667],
    8657: [1e-5, 0.6, 0, 0, 0.77778],
    8659: [1e-5, 0.6, 0, 0, 0.77778],
    8719: [0.25001, 0.75, 0, 0, 0.94445],
    8720: [0.25001, 0.75, 0, 0, 0.94445],
    8721: [0.25001, 0.75, 0, 0, 1.05556],
    8730: [0.35001, 0.85, 0, 0, 1],
    8739: [-599e-5, 0.606, 0, 0, 0.33333],
    8741: [-599e-5, 0.606, 0, 0, 0.55556],
    8747: [0.30612, 0.805, 0.19445, 0, 0.47222],
    8748: [0.306, 0.805, 0.19445, 0, 0.47222],
    8749: [0.306, 0.805, 0.19445, 0, 0.47222],
    8750: [0.30612, 0.805, 0.19445, 0, 0.47222],
    8896: [0.25001, 0.75, 0, 0, 0.83334],
    8897: [0.25001, 0.75, 0, 0, 0.83334],
    8898: [0.25001, 0.75, 0, 0, 0.83334],
    8899: [0.25001, 0.75, 0, 0, 0.83334],
    8968: [0.35001, 0.85, 0, 0, 0.47222],
    8969: [0.35001, 0.85, 0, 0, 0.47222],
    8970: [0.35001, 0.85, 0, 0, 0.47222],
    8971: [0.35001, 0.85, 0, 0, 0.47222],
    9168: [-99e-5, 0.601, 0, 0, 0.66667],
    10216: [0.35001, 0.85, 0, 0, 0.47222],
    10217: [0.35001, 0.85, 0, 0, 0.47222],
    10752: [0.25001, 0.75, 0, 0, 1.11111],
    10753: [0.25001, 0.75, 0, 0, 1.11111],
    10754: [0.25001, 0.75, 0, 0, 1.11111],
    10756: [0.25001, 0.75, 0, 0, 0.83334],
    10758: [0.25001, 0.75, 0, 0, 0.83334]
  },
  "Size2-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.65002, 1.15, 0, 0, 0.59722],
    41: [0.65002, 1.15, 0, 0, 0.59722],
    47: [0.65002, 1.15, 0, 0, 0.81111],
    91: [0.65002, 1.15, 0, 0, 0.47222],
    92: [0.65002, 1.15, 0, 0, 0.81111],
    93: [0.65002, 1.15, 0, 0, 0.47222],
    123: [0.65002, 1.15, 0, 0, 0.66667],
    125: [0.65002, 1.15, 0, 0, 0.66667],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.75, 0, 0, 1],
    732: [0, 0.75, 0, 0, 1],
    770: [0, 0.75, 0, 0, 1],
    771: [0, 0.75, 0, 0, 1],
    8719: [0.55001, 1.05, 0, 0, 1.27778],
    8720: [0.55001, 1.05, 0, 0, 1.27778],
    8721: [0.55001, 1.05, 0, 0, 1.44445],
    8730: [0.65002, 1.15, 0, 0, 1],
    8747: [0.86225, 1.36, 0.44445, 0, 0.55556],
    8748: [0.862, 1.36, 0.44445, 0, 0.55556],
    8749: [0.862, 1.36, 0.44445, 0, 0.55556],
    8750: [0.86225, 1.36, 0.44445, 0, 0.55556],
    8896: [0.55001, 1.05, 0, 0, 1.11111],
    8897: [0.55001, 1.05, 0, 0, 1.11111],
    8898: [0.55001, 1.05, 0, 0, 1.11111],
    8899: [0.55001, 1.05, 0, 0, 1.11111],
    8968: [0.65002, 1.15, 0, 0, 0.52778],
    8969: [0.65002, 1.15, 0, 0, 0.52778],
    8970: [0.65002, 1.15, 0, 0, 0.52778],
    8971: [0.65002, 1.15, 0, 0, 0.52778],
    10216: [0.65002, 1.15, 0, 0, 0.61111],
    10217: [0.65002, 1.15, 0, 0, 0.61111],
    10752: [0.55001, 1.05, 0, 0, 1.51112],
    10753: [0.55001, 1.05, 0, 0, 1.51112],
    10754: [0.55001, 1.05, 0, 0, 1.51112],
    10756: [0.55001, 1.05, 0, 0, 1.11111],
    10758: [0.55001, 1.05, 0, 0, 1.11111]
  },
  "Size3-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.95003, 1.45, 0, 0, 0.73611],
    41: [0.95003, 1.45, 0, 0, 0.73611],
    47: [0.95003, 1.45, 0, 0, 1.04445],
    91: [0.95003, 1.45, 0, 0, 0.52778],
    92: [0.95003, 1.45, 0, 0, 1.04445],
    93: [0.95003, 1.45, 0, 0, 0.52778],
    123: [0.95003, 1.45, 0, 0, 0.75],
    125: [0.95003, 1.45, 0, 0, 0.75],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.75, 0, 0, 1.44445],
    732: [0, 0.75, 0, 0, 1.44445],
    770: [0, 0.75, 0, 0, 1.44445],
    771: [0, 0.75, 0, 0, 1.44445],
    8730: [0.95003, 1.45, 0, 0, 1],
    8968: [0.95003, 1.45, 0, 0, 0.58334],
    8969: [0.95003, 1.45, 0, 0, 0.58334],
    8970: [0.95003, 1.45, 0, 0, 0.58334],
    8971: [0.95003, 1.45, 0, 0, 0.58334],
    10216: [0.95003, 1.45, 0, 0, 0.75],
    10217: [0.95003, 1.45, 0, 0, 0.75]
  },
  "Size4-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [1.25003, 1.75, 0, 0, 0.79167],
    41: [1.25003, 1.75, 0, 0, 0.79167],
    47: [1.25003, 1.75, 0, 0, 1.27778],
    91: [1.25003, 1.75, 0, 0, 0.58334],
    92: [1.25003, 1.75, 0, 0, 1.27778],
    93: [1.25003, 1.75, 0, 0, 0.58334],
    123: [1.25003, 1.75, 0, 0, 0.80556],
    125: [1.25003, 1.75, 0, 0, 0.80556],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.825, 0, 0, 1.8889],
    732: [0, 0.825, 0, 0, 1.8889],
    770: [0, 0.825, 0, 0, 1.8889],
    771: [0, 0.825, 0, 0, 1.8889],
    8730: [1.25003, 1.75, 0, 0, 1],
    8968: [1.25003, 1.75, 0, 0, 0.63889],
    8969: [1.25003, 1.75, 0, 0, 0.63889],
    8970: [1.25003, 1.75, 0, 0, 0.63889],
    8971: [1.25003, 1.75, 0, 0, 0.63889],
    9115: [0.64502, 1.155, 0, 0, 0.875],
    9116: [1e-5, 0.6, 0, 0, 0.875],
    9117: [0.64502, 1.155, 0, 0, 0.875],
    9118: [0.64502, 1.155, 0, 0, 0.875],
    9119: [1e-5, 0.6, 0, 0, 0.875],
    9120: [0.64502, 1.155, 0, 0, 0.875],
    9121: [0.64502, 1.155, 0, 0, 0.66667],
    9122: [-99e-5, 0.601, 0, 0, 0.66667],
    9123: [0.64502, 1.155, 0, 0, 0.66667],
    9124: [0.64502, 1.155, 0, 0, 0.66667],
    9125: [-99e-5, 0.601, 0, 0, 0.66667],
    9126: [0.64502, 1.155, 0, 0, 0.66667],
    9127: [1e-5, 0.9, 0, 0, 0.88889],
    9128: [0.65002, 1.15, 0, 0, 0.88889],
    9129: [0.90001, 0, 0, 0, 0.88889],
    9130: [0, 0.3, 0, 0, 0.88889],
    9131: [1e-5, 0.9, 0, 0, 0.88889],
    9132: [0.65002, 1.15, 0, 0, 0.88889],
    9133: [0.90001, 0, 0, 0, 0.88889],
    9143: [0.88502, 0.915, 0, 0, 1.05556],
    10216: [1.25003, 1.75, 0, 0, 0.80556],
    10217: [1.25003, 1.75, 0, 0, 0.80556],
    57344: [-499e-5, 0.605, 0, 0, 1.05556],
    57345: [-499e-5, 0.605, 0, 0, 1.05556],
    57680: [0, 0.12, 0, 0, 0.45],
    57681: [0, 0.12, 0, 0, 0.45],
    57682: [0, 0.12, 0, 0, 0.45],
    57683: [0, 0.12, 0, 0, 0.45]
  },
  "Typewriter-Regular": {
    32: [0, 0, 0, 0, 0.525],
    33: [0, 0.61111, 0, 0, 0.525],
    34: [0, 0.61111, 0, 0, 0.525],
    35: [0, 0.61111, 0, 0, 0.525],
    36: [0.08333, 0.69444, 0, 0, 0.525],
    37: [0.08333, 0.69444, 0, 0, 0.525],
    38: [0, 0.61111, 0, 0, 0.525],
    39: [0, 0.61111, 0, 0, 0.525],
    40: [0.08333, 0.69444, 0, 0, 0.525],
    41: [0.08333, 0.69444, 0, 0, 0.525],
    42: [0, 0.52083, 0, 0, 0.525],
    43: [-0.08056, 0.53055, 0, 0, 0.525],
    44: [0.13889, 0.125, 0, 0, 0.525],
    45: [-0.08056, 0.53055, 0, 0, 0.525],
    46: [0, 0.125, 0, 0, 0.525],
    47: [0.08333, 0.69444, 0, 0, 0.525],
    48: [0, 0.61111, 0, 0, 0.525],
    49: [0, 0.61111, 0, 0, 0.525],
    50: [0, 0.61111, 0, 0, 0.525],
    51: [0, 0.61111, 0, 0, 0.525],
    52: [0, 0.61111, 0, 0, 0.525],
    53: [0, 0.61111, 0, 0, 0.525],
    54: [0, 0.61111, 0, 0, 0.525],
    55: [0, 0.61111, 0, 0, 0.525],
    56: [0, 0.61111, 0, 0, 0.525],
    57: [0, 0.61111, 0, 0, 0.525],
    58: [0, 0.43056, 0, 0, 0.525],
    59: [0.13889, 0.43056, 0, 0, 0.525],
    60: [-0.05556, 0.55556, 0, 0, 0.525],
    61: [-0.19549, 0.41562, 0, 0, 0.525],
    62: [-0.05556, 0.55556, 0, 0, 0.525],
    63: [0, 0.61111, 0, 0, 0.525],
    64: [0, 0.61111, 0, 0, 0.525],
    65: [0, 0.61111, 0, 0, 0.525],
    66: [0, 0.61111, 0, 0, 0.525],
    67: [0, 0.61111, 0, 0, 0.525],
    68: [0, 0.61111, 0, 0, 0.525],
    69: [0, 0.61111, 0, 0, 0.525],
    70: [0, 0.61111, 0, 0, 0.525],
    71: [0, 0.61111, 0, 0, 0.525],
    72: [0, 0.61111, 0, 0, 0.525],
    73: [0, 0.61111, 0, 0, 0.525],
    74: [0, 0.61111, 0, 0, 0.525],
    75: [0, 0.61111, 0, 0, 0.525],
    76: [0, 0.61111, 0, 0, 0.525],
    77: [0, 0.61111, 0, 0, 0.525],
    78: [0, 0.61111, 0, 0, 0.525],
    79: [0, 0.61111, 0, 0, 0.525],
    80: [0, 0.61111, 0, 0, 0.525],
    81: [0.13889, 0.61111, 0, 0, 0.525],
    82: [0, 0.61111, 0, 0, 0.525],
    83: [0, 0.61111, 0, 0, 0.525],
    84: [0, 0.61111, 0, 0, 0.525],
    85: [0, 0.61111, 0, 0, 0.525],
    86: [0, 0.61111, 0, 0, 0.525],
    87: [0, 0.61111, 0, 0, 0.525],
    88: [0, 0.61111, 0, 0, 0.525],
    89: [0, 0.61111, 0, 0, 0.525],
    90: [0, 0.61111, 0, 0, 0.525],
    91: [0.08333, 0.69444, 0, 0, 0.525],
    92: [0.08333, 0.69444, 0, 0, 0.525],
    93: [0.08333, 0.69444, 0, 0, 0.525],
    94: [0, 0.61111, 0, 0, 0.525],
    95: [0.09514, 0, 0, 0, 0.525],
    96: [0, 0.61111, 0, 0, 0.525],
    97: [0, 0.43056, 0, 0, 0.525],
    98: [0, 0.61111, 0, 0, 0.525],
    99: [0, 0.43056, 0, 0, 0.525],
    100: [0, 0.61111, 0, 0, 0.525],
    101: [0, 0.43056, 0, 0, 0.525],
    102: [0, 0.61111, 0, 0, 0.525],
    103: [0.22222, 0.43056, 0, 0, 0.525],
    104: [0, 0.61111, 0, 0, 0.525],
    105: [0, 0.61111, 0, 0, 0.525],
    106: [0.22222, 0.61111, 0, 0, 0.525],
    107: [0, 0.61111, 0, 0, 0.525],
    108: [0, 0.61111, 0, 0, 0.525],
    109: [0, 0.43056, 0, 0, 0.525],
    110: [0, 0.43056, 0, 0, 0.525],
    111: [0, 0.43056, 0, 0, 0.525],
    112: [0.22222, 0.43056, 0, 0, 0.525],
    113: [0.22222, 0.43056, 0, 0, 0.525],
    114: [0, 0.43056, 0, 0, 0.525],
    115: [0, 0.43056, 0, 0, 0.525],
    116: [0, 0.55358, 0, 0, 0.525],
    117: [0, 0.43056, 0, 0, 0.525],
    118: [0, 0.43056, 0, 0, 0.525],
    119: [0, 0.43056, 0, 0, 0.525],
    120: [0, 0.43056, 0, 0, 0.525],
    121: [0.22222, 0.43056, 0, 0, 0.525],
    122: [0, 0.43056, 0, 0, 0.525],
    123: [0.08333, 0.69444, 0, 0, 0.525],
    124: [0.08333, 0.69444, 0, 0, 0.525],
    125: [0.08333, 0.69444, 0, 0, 0.525],
    126: [0, 0.61111, 0, 0, 0.525],
    127: [0, 0.61111, 0, 0, 0.525],
    160: [0, 0, 0, 0, 0.525],
    176: [0, 0.61111, 0, 0, 0.525],
    184: [0.19445, 0, 0, 0, 0.525],
    305: [0, 0.43056, 0, 0, 0.525],
    567: [0.22222, 0.43056, 0, 0, 0.525],
    711: [0, 0.56597, 0, 0, 0.525],
    713: [0, 0.56555, 0, 0, 0.525],
    714: [0, 0.61111, 0, 0, 0.525],
    715: [0, 0.61111, 0, 0, 0.525],
    728: [0, 0.61111, 0, 0, 0.525],
    730: [0, 0.61111, 0, 0, 0.525],
    770: [0, 0.61111, 0, 0, 0.525],
    771: [0, 0.61111, 0, 0, 0.525],
    776: [0, 0.61111, 0, 0, 0.525],
    915: [0, 0.61111, 0, 0, 0.525],
    916: [0, 0.61111, 0, 0, 0.525],
    920: [0, 0.61111, 0, 0, 0.525],
    923: [0, 0.61111, 0, 0, 0.525],
    926: [0, 0.61111, 0, 0, 0.525],
    928: [0, 0.61111, 0, 0, 0.525],
    931: [0, 0.61111, 0, 0, 0.525],
    933: [0, 0.61111, 0, 0, 0.525],
    934: [0, 0.61111, 0, 0, 0.525],
    936: [0, 0.61111, 0, 0, 0.525],
    937: [0, 0.61111, 0, 0, 0.525],
    8216: [0, 0.61111, 0, 0, 0.525],
    8217: [0, 0.61111, 0, 0, 0.525],
    8242: [0, 0.61111, 0, 0, 0.525],
    9251: [0.11111, 0.21944, 0, 0, 0.525]
  }
}, Ke = {
  slant: [0.25, 0.25, 0.25],
  // sigma1
  space: [0, 0, 0],
  // sigma2
  stretch: [0, 0, 0],
  // sigma3
  shrink: [0, 0, 0],
  // sigma4
  xHeight: [0.431, 0.431, 0.431],
  // sigma5
  quad: [1, 1.171, 1.472],
  // sigma6
  extraSpace: [0, 0, 0],
  // sigma7
  num1: [0.677, 0.732, 0.925],
  // sigma8
  num2: [0.394, 0.384, 0.387],
  // sigma9
  num3: [0.444, 0.471, 0.504],
  // sigma10
  denom1: [0.686, 0.752, 1.025],
  // sigma11
  denom2: [0.345, 0.344, 0.532],
  // sigma12
  sup1: [0.413, 0.503, 0.504],
  // sigma13
  sup2: [0.363, 0.431, 0.404],
  // sigma14
  sup3: [0.289, 0.286, 0.294],
  // sigma15
  sub1: [0.15, 0.143, 0.2],
  // sigma16
  sub2: [0.247, 0.286, 0.4],
  // sigma17
  supDrop: [0.386, 0.353, 0.494],
  // sigma18
  subDrop: [0.05, 0.071, 0.1],
  // sigma19
  delim1: [2.39, 1.7, 1.98],
  // sigma20
  delim2: [1.01, 1.157, 1.42],
  // sigma21
  axisHeight: [0.25, 0.25, 0.25],
  // sigma22
  // These font metrics are extracted from TeX by using tftopl on cmex10.tfm;
  // they correspond to the font parameters of the extension fonts (family 3).
  // See the TeXbook, page 441. In AMSTeX, the extension fonts scale; to
  // match cmex7, we'd use cmex7.tfm values for script and scriptscript
  // values.
  defaultRuleThickness: [0.04, 0.049, 0.049],
  // xi8; cmex7: 0.049
  bigOpSpacing1: [0.111, 0.111, 0.111],
  // xi9
  bigOpSpacing2: [0.166, 0.166, 0.166],
  // xi10
  bigOpSpacing3: [0.2, 0.2, 0.2],
  // xi11
  bigOpSpacing4: [0.6, 0.611, 0.611],
  // xi12; cmex7: 0.611
  bigOpSpacing5: [0.1, 0.143, 0.143],
  // xi13; cmex7: 0.143
  // The \sqrt rule width is taken from the height of the surd character.
  // Since we use the same font at all sizes, this thickness doesn't scale.
  sqrtRuleThickness: [0.04, 0.04, 0.04],
  // This value determines how large a pt is, for metrics which are defined
  // in terms of pts.
  // This value is also used in katex.scss; if you change it make sure the
  // values match.
  ptPerEm: [10, 10, 10],
  // The space between adjacent `|` columns in an array definition. From
  // `\showthe\doublerulesep` in LaTeX. Equals 2.0 / ptPerEm.
  doubleRuleSep: [0.2, 0.2, 0.2],
  // The width of separator lines in {array} environments. From
  // `\showthe\arrayrulewidth` in LaTeX. Equals 0.4 / ptPerEm.
  arrayRuleWidth: [0.04, 0.04, 0.04],
  // Two values from LaTeX source2e:
  fboxsep: [0.3, 0.3, 0.3],
  //        3 pt / ptPerEm
  fboxrule: [0.04, 0.04, 0.04]
  // 0.4 pt / ptPerEm
}, mr = {
  // Latin-1
  Å: "A",
  Ð: "D",
  Þ: "o",
  å: "a",
  ð: "d",
  þ: "o",
  // Cyrillic
  А: "A",
  Б: "B",
  В: "B",
  Г: "F",
  Д: "A",
  Е: "E",
  Ж: "K",
  З: "3",
  И: "N",
  Й: "N",
  К: "K",
  Л: "N",
  М: "M",
  Н: "H",
  О: "O",
  П: "N",
  Р: "P",
  С: "C",
  Т: "T",
  У: "y",
  Ф: "O",
  Х: "X",
  Ц: "U",
  Ч: "h",
  Ш: "W",
  Щ: "W",
  Ъ: "B",
  Ы: "X",
  Ь: "B",
  Э: "3",
  Ю: "X",
  Я: "R",
  а: "a",
  б: "b",
  в: "a",
  г: "r",
  д: "y",
  е: "e",
  ж: "m",
  з: "e",
  и: "n",
  й: "n",
  к: "n",
  л: "n",
  м: "m",
  н: "n",
  о: "o",
  п: "n",
  р: "p",
  с: "c",
  т: "o",
  у: "y",
  ф: "b",
  х: "x",
  ц: "n",
  ч: "n",
  ш: "w",
  щ: "w",
  ъ: "a",
  ы: "m",
  ь: "a",
  э: "e",
  ю: "m",
  я: "r"
};
function G1(r, e) {
  k0[r] = e;
}
function It(r, e, t) {
  if (!k0[e])
    throw new Error("Font metrics not found for font: " + e + ".");
  var a = r.charCodeAt(0), n = k0[e][a];
  if (!n && r[0] in mr && (a = mr[r[0]].charCodeAt(0), n = k0[e][a]), !n && t === "text" && _r(a) && (n = k0[e][77]), n)
    return {
      depth: n[0],
      height: n[1],
      italic: n[2],
      skew: n[3],
      width: n[4]
    };
}
var Je = {};
function U1(r) {
  var e;
  if (r >= 5 ? e = 0 : r >= 3 ? e = 1 : e = 2, !Je[e]) {
    var t = Je[e] = {
      cssEmPerMu: Ke.quad[e] / 18
    };
    for (var a of Object.keys(Ke))
      t[a] = Ke[a][e];
  }
  return Je[e];
}
var W = {
  math: {},
  text: {}
};
function i(r, e, t, a, n, s) {
  W[r][n] = {
    font: e,
    group: t,
    replace: a
  }, s && a && (W[r][a] = W[r][n]);
}
var l = "math", w = "text", u = "main", f = "ams", Y = "accent-token", D = "bin", u0 = "close", le = "inner", N = "mathord", t0 = "op-token", f0 = "open", ve = "punct", p = "rel", R0 = "spacing", g = "textord";
i(l, u, p, "≡", "\\equiv", !0);
i(l, u, p, "≺", "\\prec", !0);
i(l, u, p, "≻", "\\succ", !0);
i(l, u, p, "∼", "\\sim", !0);
i(l, u, p, "⊥", "\\perp");
i(l, u, p, "⪯", "\\preceq", !0);
i(l, u, p, "⪰", "\\succeq", !0);
i(l, u, p, "≃", "\\simeq", !0);
i(l, u, p, "∣", "\\mid", !0);
i(l, u, p, "≪", "\\ll", !0);
i(l, u, p, "≫", "\\gg", !0);
i(l, u, p, "≍", "\\asymp", !0);
i(l, u, p, "∥", "\\parallel");
i(l, u, p, "⋈", "\\bowtie", !0);
i(l, u, p, "⌣", "\\smile", !0);
i(l, u, p, "⊑", "\\sqsubseteq", !0);
i(l, u, p, "⊒", "\\sqsupseteq", !0);
i(l, u, p, "≐", "\\doteq", !0);
i(l, u, p, "⌢", "\\frown", !0);
i(l, u, p, "∋", "\\ni", !0);
i(l, u, p, "∝", "\\propto", !0);
i(l, u, p, "⊢", "\\vdash", !0);
i(l, u, p, "⊣", "\\dashv", !0);
i(l, u, p, "∋", "\\owns");
i(l, u, ve, ".", "\\ldotp");
i(l, u, ve, "⋅", "\\cdotp");
i(l, u, ve, "⋅", "·");
i(w, u, g, "⋅", "·");
i(l, u, g, "#", "\\#");
i(w, u, g, "#", "\\#");
i(l, u, g, "&", "\\&");
i(w, u, g, "&", "\\&");
i(l, u, g, "ℵ", "\\aleph", !0);
i(l, u, g, "∀", "\\forall", !0);
i(l, u, g, "ℏ", "\\hbar", !0);
i(l, u, g, "∃", "\\exists", !0);
i(l, u, g, "∇", "\\nabla", !0);
i(l, u, g, "♭", "\\flat", !0);
i(l, u, g, "ℓ", "\\ell", !0);
i(l, u, g, "♮", "\\natural", !0);
i(l, u, g, "♣", "\\clubsuit", !0);
i(l, u, g, "℘", "\\wp", !0);
i(l, u, g, "♯", "\\sharp", !0);
i(l, u, g, "♢", "\\diamondsuit", !0);
i(l, u, g, "ℜ", "\\Re", !0);
i(l, u, g, "♡", "\\heartsuit", !0);
i(l, u, g, "ℑ", "\\Im", !0);
i(l, u, g, "♠", "\\spadesuit", !0);
i(l, u, g, "§", "\\S", !0);
i(w, u, g, "§", "\\S");
i(l, u, g, "¶", "\\P", !0);
i(w, u, g, "¶", "\\P");
i(l, u, g, "†", "\\dag");
i(w, u, g, "†", "\\dag");
i(w, u, g, "†", "\\textdagger");
i(l, u, g, "‡", "\\ddag");
i(w, u, g, "‡", "\\ddag");
i(w, u, g, "‡", "\\textdaggerdbl");
i(l, u, u0, "⎱", "\\rmoustache", !0);
i(l, u, f0, "⎰", "\\lmoustache", !0);
i(l, u, u0, "⟯", "\\rgroup", !0);
i(l, u, f0, "⟮", "\\lgroup", !0);
i(l, u, D, "∓", "\\mp", !0);
i(l, u, D, "⊖", "\\ominus", !0);
i(l, u, D, "⊎", "\\uplus", !0);
i(l, u, D, "⊓", "\\sqcap", !0);
i(l, u, D, "∗", "\\ast");
i(l, u, D, "⊔", "\\sqcup", !0);
i(l, u, D, "◯", "\\bigcirc", !0);
i(l, u, D, "∙", "\\bullet", !0);
i(l, u, D, "‡", "\\ddagger");
i(l, u, D, "≀", "\\wr", !0);
i(l, u, D, "⨿", "\\amalg");
i(l, u, D, "&", "\\And");
i(l, u, p, "⟵", "\\longleftarrow", !0);
i(l, u, p, "⇐", "\\Leftarrow", !0);
i(l, u, p, "⟸", "\\Longleftarrow", !0);
i(l, u, p, "⟶", "\\longrightarrow", !0);
i(l, u, p, "⇒", "\\Rightarrow", !0);
i(l, u, p, "⟹", "\\Longrightarrow", !0);
i(l, u, p, "↔", "\\leftrightarrow", !0);
i(l, u, p, "⟷", "\\longleftrightarrow", !0);
i(l, u, p, "⇔", "\\Leftrightarrow", !0);
i(l, u, p, "⟺", "\\Longleftrightarrow", !0);
i(l, u, p, "↦", "\\mapsto", !0);
i(l, u, p, "⟼", "\\longmapsto", !0);
i(l, u, p, "↗", "\\nearrow", !0);
i(l, u, p, "↩", "\\hookleftarrow", !0);
i(l, u, p, "↪", "\\hookrightarrow", !0);
i(l, u, p, "↘", "\\searrow", !0);
i(l, u, p, "↼", "\\leftharpoonup", !0);
i(l, u, p, "⇀", "\\rightharpoonup", !0);
i(l, u, p, "↙", "\\swarrow", !0);
i(l, u, p, "↽", "\\leftharpoondown", !0);
i(l, u, p, "⇁", "\\rightharpoondown", !0);
i(l, u, p, "↖", "\\nwarrow", !0);
i(l, u, p, "⇌", "\\rightleftharpoons", !0);
i(l, f, p, "≮", "\\nless", !0);
i(l, f, p, "", "\\@nleqslant");
i(l, f, p, "", "\\@nleqq");
i(l, f, p, "⪇", "\\lneq", !0);
i(l, f, p, "≨", "\\lneqq", !0);
i(l, f, p, "", "\\@lvertneqq");
i(l, f, p, "⋦", "\\lnsim", !0);
i(l, f, p, "⪉", "\\lnapprox", !0);
i(l, f, p, "⊀", "\\nprec", !0);
i(l, f, p, "⋠", "\\npreceq", !0);
i(l, f, p, "⋨", "\\precnsim", !0);
i(l, f, p, "⪹", "\\precnapprox", !0);
i(l, f, p, "≁", "\\nsim", !0);
i(l, f, p, "", "\\@nshortmid");
i(l, f, p, "∤", "\\nmid", !0);
i(l, f, p, "⊬", "\\nvdash", !0);
i(l, f, p, "⊭", "\\nvDash", !0);
i(l, f, p, "⋪", "\\ntriangleleft");
i(l, f, p, "⋬", "\\ntrianglelefteq", !0);
i(l, f, p, "⊊", "\\subsetneq", !0);
i(l, f, p, "", "\\@varsubsetneq");
i(l, f, p, "⫋", "\\subsetneqq", !0);
i(l, f, p, "", "\\@varsubsetneqq");
i(l, f, p, "≯", "\\ngtr", !0);
i(l, f, p, "", "\\@ngeqslant");
i(l, f, p, "", "\\@ngeqq");
i(l, f, p, "⪈", "\\gneq", !0);
i(l, f, p, "≩", "\\gneqq", !0);
i(l, f, p, "", "\\@gvertneqq");
i(l, f, p, "⋧", "\\gnsim", !0);
i(l, f, p, "⪊", "\\gnapprox", !0);
i(l, f, p, "⊁", "\\nsucc", !0);
i(l, f, p, "⋡", "\\nsucceq", !0);
i(l, f, p, "⋩", "\\succnsim", !0);
i(l, f, p, "⪺", "\\succnapprox", !0);
i(l, f, p, "≆", "\\ncong", !0);
i(l, f, p, "", "\\@nshortparallel");
i(l, f, p, "∦", "\\nparallel", !0);
i(l, f, p, "⊯", "\\nVDash", !0);
i(l, f, p, "⋫", "\\ntriangleright");
i(l, f, p, "⋭", "\\ntrianglerighteq", !0);
i(l, f, p, "", "\\@nsupseteqq");
i(l, f, p, "⊋", "\\supsetneq", !0);
i(l, f, p, "", "\\@varsupsetneq");
i(l, f, p, "⫌", "\\supsetneqq", !0);
i(l, f, p, "", "\\@varsupsetneqq");
i(l, f, p, "⊮", "\\nVdash", !0);
i(l, f, p, "⪵", "\\precneqq", !0);
i(l, f, p, "⪶", "\\succneqq", !0);
i(l, f, p, "", "\\@nsubseteqq");
i(l, f, D, "⊴", "\\unlhd");
i(l, f, D, "⊵", "\\unrhd");
i(l, f, p, "↚", "\\nleftarrow", !0);
i(l, f, p, "↛", "\\nrightarrow", !0);
i(l, f, p, "⇍", "\\nLeftarrow", !0);
i(l, f, p, "⇏", "\\nRightarrow", !0);
i(l, f, p, "↮", "\\nleftrightarrow", !0);
i(l, f, p, "⇎", "\\nLeftrightarrow", !0);
i(l, f, p, "△", "\\vartriangle");
i(l, f, g, "ℏ", "\\hslash");
i(l, f, g, "▽", "\\triangledown");
i(l, f, g, "◊", "\\lozenge");
i(l, f, g, "Ⓢ", "\\circledS");
i(l, f, g, "®", "\\circledR");
i(w, f, g, "®", "\\circledR");
i(l, f, g, "∡", "\\measuredangle", !0);
i(l, f, g, "∄", "\\nexists");
i(l, f, g, "℧", "\\mho");
i(l, f, g, "Ⅎ", "\\Finv", !0);
i(l, f, g, "⅁", "\\Game", !0);
i(l, f, g, "‵", "\\backprime");
i(l, f, g, "▲", "\\blacktriangle");
i(l, f, g, "▼", "\\blacktriangledown");
i(l, f, g, "■", "\\blacksquare");
i(l, f, g, "⧫", "\\blacklozenge");
i(l, f, g, "★", "\\bigstar");
i(l, f, g, "∢", "\\sphericalangle", !0);
i(l, f, g, "∁", "\\complement", !0);
i(l, f, g, "ð", "\\eth", !0);
i(w, u, g, "ð", "ð");
i(l, f, g, "╱", "\\diagup");
i(l, f, g, "╲", "\\diagdown");
i(l, f, g, "□", "\\square");
i(l, f, g, "□", "\\Box");
i(l, f, g, "◊", "\\Diamond");
i(l, f, g, "¥", "\\yen", !0);
i(w, f, g, "¥", "\\yen", !0);
i(l, f, g, "✓", "\\checkmark", !0);
i(w, f, g, "✓", "\\checkmark");
i(l, f, g, "ℶ", "\\beth", !0);
i(l, f, g, "ℸ", "\\daleth", !0);
i(l, f, g, "ℷ", "\\gimel", !0);
i(l, f, g, "ϝ", "\\digamma", !0);
i(l, f, g, "ϰ", "\\varkappa");
i(l, f, f0, "┌", "\\@ulcorner", !0);
i(l, f, u0, "┐", "\\@urcorner", !0);
i(l, f, f0, "└", "\\@llcorner", !0);
i(l, f, u0, "┘", "\\@lrcorner", !0);
i(l, f, p, "≦", "\\leqq", !0);
i(l, f, p, "⩽", "\\leqslant", !0);
i(l, f, p, "⪕", "\\eqslantless", !0);
i(l, f, p, "≲", "\\lesssim", !0);
i(l, f, p, "⪅", "\\lessapprox", !0);
i(l, f, p, "≊", "\\approxeq", !0);
i(l, f, D, "⋖", "\\lessdot");
i(l, f, p, "⋘", "\\lll", !0);
i(l, f, p, "≶", "\\lessgtr", !0);
i(l, f, p, "⋚", "\\lesseqgtr", !0);
i(l, f, p, "⪋", "\\lesseqqgtr", !0);
i(l, f, p, "≑", "\\doteqdot");
i(l, f, p, "≓", "\\risingdotseq", !0);
i(l, f, p, "≒", "\\fallingdotseq", !0);
i(l, f, p, "∽", "\\backsim", !0);
i(l, f, p, "⋍", "\\backsimeq", !0);
i(l, f, p, "⫅", "\\subseteqq", !0);
i(l, f, p, "⋐", "\\Subset", !0);
i(l, f, p, "⊏", "\\sqsubset", !0);
i(l, f, p, "≼", "\\preccurlyeq", !0);
i(l, f, p, "⋞", "\\curlyeqprec", !0);
i(l, f, p, "≾", "\\precsim", !0);
i(l, f, p, "⪷", "\\precapprox", !0);
i(l, f, p, "⊲", "\\vartriangleleft");
i(l, f, p, "⊴", "\\trianglelefteq");
i(l, f, p, "⊨", "\\vDash", !0);
i(l, f, p, "⊪", "\\Vvdash", !0);
i(l, f, p, "⌣", "\\smallsmile");
i(l, f, p, "⌢", "\\smallfrown");
i(l, f, p, "≏", "\\bumpeq", !0);
i(l, f, p, "≎", "\\Bumpeq", !0);
i(l, f, p, "≧", "\\geqq", !0);
i(l, f, p, "⩾", "\\geqslant", !0);
i(l, f, p, "⪖", "\\eqslantgtr", !0);
i(l, f, p, "≳", "\\gtrsim", !0);
i(l, f, p, "⪆", "\\gtrapprox", !0);
i(l, f, D, "⋗", "\\gtrdot");
i(l, f, p, "⋙", "\\ggg", !0);
i(l, f, p, "≷", "\\gtrless", !0);
i(l, f, p, "⋛", "\\gtreqless", !0);
i(l, f, p, "⪌", "\\gtreqqless", !0);
i(l, f, p, "≖", "\\eqcirc", !0);
i(l, f, p, "≗", "\\circeq", !0);
i(l, f, p, "≜", "\\triangleq", !0);
i(l, f, p, "∼", "\\thicksim");
i(l, f, p, "≈", "\\thickapprox");
i(l, f, p, "⫆", "\\supseteqq", !0);
i(l, f, p, "⋑", "\\Supset", !0);
i(l, f, p, "⊐", "\\sqsupset", !0);
i(l, f, p, "≽", "\\succcurlyeq", !0);
i(l, f, p, "⋟", "\\curlyeqsucc", !0);
i(l, f, p, "≿", "\\succsim", !0);
i(l, f, p, "⪸", "\\succapprox", !0);
i(l, f, p, "⊳", "\\vartriangleright");
i(l, f, p, "⊵", "\\trianglerighteq");
i(l, f, p, "⊩", "\\Vdash", !0);
i(l, f, p, "∣", "\\shortmid");
i(l, f, p, "∥", "\\shortparallel");
i(l, f, p, "≬", "\\between", !0);
i(l, f, p, "⋔", "\\pitchfork", !0);
i(l, f, p, "∝", "\\varpropto");
i(l, f, p, "◀", "\\blacktriangleleft");
i(l, f, p, "∴", "\\therefore", !0);
i(l, f, p, "∍", "\\backepsilon");
i(l, f, p, "▶", "\\blacktriangleright");
i(l, f, p, "∵", "\\because", !0);
i(l, f, p, "⋘", "\\llless");
i(l, f, p, "⋙", "\\gggtr");
i(l, f, D, "⊲", "\\lhd");
i(l, f, D, "⊳", "\\rhd");
i(l, f, p, "≂", "\\eqsim", !0);
i(l, u, p, "⋈", "\\Join");
i(l, f, p, "≑", "\\Doteq", !0);
i(l, f, D, "∔", "\\dotplus", !0);
i(l, f, D, "∖", "\\smallsetminus");
i(l, f, D, "⋒", "\\Cap", !0);
i(l, f, D, "⋓", "\\Cup", !0);
i(l, f, D, "⩞", "\\doublebarwedge", !0);
i(l, f, D, "⊟", "\\boxminus", !0);
i(l, f, D, "⊞", "\\boxplus", !0);
i(l, f, D, "⋇", "\\divideontimes", !0);
i(l, f, D, "⋉", "\\ltimes", !0);
i(l, f, D, "⋊", "\\rtimes", !0);
i(l, f, D, "⋋", "\\leftthreetimes", !0);
i(l, f, D, "⋌", "\\rightthreetimes", !0);
i(l, f, D, "⋏", "\\curlywedge", !0);
i(l, f, D, "⋎", "\\curlyvee", !0);
i(l, f, D, "⊝", "\\circleddash", !0);
i(l, f, D, "⊛", "\\circledast", !0);
i(l, f, D, "⋅", "\\centerdot");
i(l, f, D, "⊺", "\\intercal", !0);
i(l, f, D, "⋒", "\\doublecap");
i(l, f, D, "⋓", "\\doublecup");
i(l, f, D, "⊠", "\\boxtimes", !0);
i(l, f, p, "⇢", "\\dashrightarrow", !0);
i(l, f, p, "⇠", "\\dashleftarrow", !0);
i(l, f, p, "⇇", "\\leftleftarrows", !0);
i(l, f, p, "⇆", "\\leftrightarrows", !0);
i(l, f, p, "⇚", "\\Lleftarrow", !0);
i(l, f, p, "↞", "\\twoheadleftarrow", !0);
i(l, f, p, "↢", "\\leftarrowtail", !0);
i(l, f, p, "↫", "\\looparrowleft", !0);
i(l, f, p, "⇋", "\\leftrightharpoons", !0);
i(l, f, p, "↶", "\\curvearrowleft", !0);
i(l, f, p, "↺", "\\circlearrowleft", !0);
i(l, f, p, "↰", "\\Lsh", !0);
i(l, f, p, "⇈", "\\upuparrows", !0);
i(l, f, p, "↿", "\\upharpoonleft", !0);
i(l, f, p, "⇃", "\\downharpoonleft", !0);
i(l, u, p, "⊶", "\\origof", !0);
i(l, u, p, "⊷", "\\imageof", !0);
i(l, f, p, "⊸", "\\multimap", !0);
i(l, f, p, "↭", "\\leftrightsquigarrow", !0);
i(l, f, p, "⇉", "\\rightrightarrows", !0);
i(l, f, p, "⇄", "\\rightleftarrows", !0);
i(l, f, p, "↠", "\\twoheadrightarrow", !0);
i(l, f, p, "↣", "\\rightarrowtail", !0);
i(l, f, p, "↬", "\\looparrowright", !0);
i(l, f, p, "↷", "\\curvearrowright", !0);
i(l, f, p, "↻", "\\circlearrowright", !0);
i(l, f, p, "↱", "\\Rsh", !0);
i(l, f, p, "⇊", "\\downdownarrows", !0);
i(l, f, p, "↾", "\\upharpoonright", !0);
i(l, f, p, "⇂", "\\downharpoonright", !0);
i(l, f, p, "⇝", "\\rightsquigarrow", !0);
i(l, f, p, "⇝", "\\leadsto");
i(l, f, p, "⇛", "\\Rrightarrow", !0);
i(l, f, p, "↾", "\\restriction");
i(l, u, g, "‘", "`");
i(l, u, g, "$", "\\$");
i(w, u, g, "$", "\\$");
i(w, u, g, "$", "\\textdollar");
i(l, u, g, "%", "\\%");
i(w, u, g, "%", "\\%");
i(l, u, g, "_", "\\_");
i(w, u, g, "_", "\\_");
i(w, u, g, "_", "\\textunderscore");
i(l, u, g, "∠", "\\angle", !0);
i(l, u, g, "∞", "\\infty", !0);
i(l, u, g, "′", "\\prime");
i(l, u, g, "△", "\\triangle");
i(l, u, g, "Γ", "\\Gamma", !0);
i(l, u, g, "Δ", "\\Delta", !0);
i(l, u, g, "Θ", "\\Theta", !0);
i(l, u, g, "Λ", "\\Lambda", !0);
i(l, u, g, "Ξ", "\\Xi", !0);
i(l, u, g, "Π", "\\Pi", !0);
i(l, u, g, "Σ", "\\Sigma", !0);
i(l, u, g, "Υ", "\\Upsilon", !0);
i(l, u, g, "Φ", "\\Phi", !0);
i(l, u, g, "Ψ", "\\Psi", !0);
i(l, u, g, "Ω", "\\Omega", !0);
i(l, u, g, "A", "Α");
i(l, u, g, "B", "Β");
i(l, u, g, "E", "Ε");
i(l, u, g, "Z", "Ζ");
i(l, u, g, "H", "Η");
i(l, u, g, "I", "Ι");
i(l, u, g, "K", "Κ");
i(l, u, g, "M", "Μ");
i(l, u, g, "N", "Ν");
i(l, u, g, "O", "Ο");
i(l, u, g, "P", "Ρ");
i(l, u, g, "T", "Τ");
i(l, u, g, "X", "Χ");
i(l, u, g, "¬", "\\neg", !0);
i(l, u, g, "¬", "\\lnot");
i(l, u, g, "⊤", "\\top");
i(l, u, g, "⊥", "\\bot");
i(l, u, g, "∅", "\\emptyset");
i(l, f, g, "∅", "\\varnothing");
i(l, u, N, "α", "\\alpha", !0);
i(l, u, N, "β", "\\beta", !0);
i(l, u, N, "γ", "\\gamma", !0);
i(l, u, N, "δ", "\\delta", !0);
i(l, u, N, "ϵ", "\\epsilon", !0);
i(l, u, N, "ζ", "\\zeta", !0);
i(l, u, N, "η", "\\eta", !0);
i(l, u, N, "θ", "\\theta", !0);
i(l, u, N, "ι", "\\iota", !0);
i(l, u, N, "κ", "\\kappa", !0);
i(l, u, N, "λ", "\\lambda", !0);
i(l, u, N, "μ", "\\mu", !0);
i(l, u, N, "ν", "\\nu", !0);
i(l, u, N, "ξ", "\\xi", !0);
i(l, u, N, "ο", "\\omicron", !0);
i(l, u, N, "π", "\\pi", !0);
i(l, u, N, "ρ", "\\rho", !0);
i(l, u, N, "σ", "\\sigma", !0);
i(l, u, N, "τ", "\\tau", !0);
i(l, u, N, "υ", "\\upsilon", !0);
i(l, u, N, "ϕ", "\\phi", !0);
i(l, u, N, "χ", "\\chi", !0);
i(l, u, N, "ψ", "\\psi", !0);
i(l, u, N, "ω", "\\omega", !0);
i(l, u, N, "ε", "\\varepsilon", !0);
i(l, u, N, "ϑ", "\\vartheta", !0);
i(l, u, N, "ϖ", "\\varpi", !0);
i(l, u, N, "ϱ", "\\varrho", !0);
i(l, u, N, "ς", "\\varsigma", !0);
i(l, u, N, "φ", "\\varphi", !0);
i(l, u, D, "∗", "*", !0);
i(l, u, D, "+", "+");
i(l, u, D, "−", "-", !0);
i(l, u, D, "⋅", "\\cdot", !0);
i(l, u, D, "∘", "\\circ", !0);
i(l, u, D, "÷", "\\div", !0);
i(l, u, D, "±", "\\pm", !0);
i(l, u, D, "×", "\\times", !0);
i(l, u, D, "∩", "\\cap", !0);
i(l, u, D, "∪", "\\cup", !0);
i(l, u, D, "∖", "\\setminus", !0);
i(l, u, D, "∧", "\\land");
i(l, u, D, "∨", "\\lor");
i(l, u, D, "∧", "\\wedge", !0);
i(l, u, D, "∨", "\\vee", !0);
i(l, u, g, "√", "\\surd");
i(l, u, f0, "⟨", "\\langle", !0);
i(l, u, f0, "∣", "\\lvert");
i(l, u, f0, "∥", "\\lVert");
i(l, u, u0, "?", "?");
i(l, u, u0, "!", "!");
i(l, u, u0, "⟩", "\\rangle", !0);
i(l, u, u0, "∣", "\\rvert");
i(l, u, u0, "∥", "\\rVert");
i(l, u, p, "=", "=");
i(l, u, p, ":", ":");
i(l, u, p, "≈", "\\approx", !0);
i(l, u, p, "≅", "\\cong", !0);
i(l, u, p, "≥", "\\ge");
i(l, u, p, "≥", "\\geq", !0);
i(l, u, p, "←", "\\gets");
i(l, u, p, ">", "\\gt", !0);
i(l, u, p, "∈", "\\in", !0);
i(l, u, p, "", "\\@not");
i(l, u, p, "⊂", "\\subset", !0);
i(l, u, p, "⊃", "\\supset", !0);
i(l, u, p, "⊆", "\\subseteq", !0);
i(l, u, p, "⊇", "\\supseteq", !0);
i(l, f, p, "⊈", "\\nsubseteq", !0);
i(l, f, p, "⊉", "\\nsupseteq", !0);
i(l, u, p, "⊨", "\\models");
i(l, u, p, "←", "\\leftarrow", !0);
i(l, u, p, "≤", "\\le");
i(l, u, p, "≤", "\\leq", !0);
i(l, u, p, "<", "\\lt", !0);
i(l, u, p, "→", "\\rightarrow", !0);
i(l, u, p, "→", "\\to");
i(l, f, p, "≱", "\\ngeq", !0);
i(l, f, p, "≰", "\\nleq", !0);
i(l, u, R0, " ", "\\ ");
i(l, u, R0, " ", "\\space");
i(l, u, R0, " ", "\\nobreakspace");
i(w, u, R0, " ", "\\ ");
i(w, u, R0, " ", " ");
i(w, u, R0, " ", "\\space");
i(w, u, R0, " ", "\\nobreakspace");
i(l, u, R0, "", "\\nobreak");
i(l, u, R0, "", "\\allowbreak");
i(l, u, ve, ",", ",");
i(l, u, ve, ";", ";");
i(l, f, D, "⊼", "\\barwedge", !0);
i(l, f, D, "⊻", "\\veebar", !0);
i(l, u, D, "⊙", "\\odot", !0);
i(l, u, D, "⊕", "\\oplus", !0);
i(l, u, D, "⊗", "\\otimes", !0);
i(l, u, g, "∂", "\\partial", !0);
i(l, u, D, "⊘", "\\oslash", !0);
i(l, f, D, "⊚", "\\circledcirc", !0);
i(l, f, D, "⊡", "\\boxdot", !0);
i(l, u, D, "△", "\\bigtriangleup");
i(l, u, D, "▽", "\\bigtriangledown");
i(l, u, D, "†", "\\dagger");
i(l, u, D, "⋄", "\\diamond");
i(l, u, D, "⋆", "\\star");
i(l, u, D, "◃", "\\triangleleft");
i(l, u, D, "▹", "\\triangleright");
i(l, u, f0, "{", "\\{");
i(w, u, g, "{", "\\{");
i(w, u, g, "{", "\\textbraceleft");
i(l, u, u0, "}", "\\}");
i(w, u, g, "}", "\\}");
i(w, u, g, "}", "\\textbraceright");
i(l, u, f0, "{", "\\lbrace");
i(l, u, u0, "}", "\\rbrace");
i(l, u, f0, "[", "\\lbrack", !0);
i(w, u, g, "[", "\\lbrack", !0);
i(l, u, u0, "]", "\\rbrack", !0);
i(w, u, g, "]", "\\rbrack", !0);
i(l, u, f0, "(", "\\lparen", !0);
i(l, u, u0, ")", "\\rparen", !0);
i(w, u, g, "<", "\\textless", !0);
i(w, u, g, ">", "\\textgreater", !0);
i(l, u, f0, "⌊", "\\lfloor", !0);
i(l, u, u0, "⌋", "\\rfloor", !0);
i(l, u, f0, "⌈", "\\lceil", !0);
i(l, u, u0, "⌉", "\\rceil", !0);
i(l, u, g, "\\", "\\backslash");
i(l, u, g, "∣", "|");
i(l, u, g, "∣", "\\vert");
i(w, u, g, "|", "\\textbar", !0);
i(l, u, g, "∥", "\\|");
i(l, u, g, "∥", "\\Vert");
i(w, u, g, "∥", "\\textbardbl");
i(w, u, g, "~", "\\textasciitilde");
i(w, u, g, "\\", "\\textbackslash");
i(w, u, g, "^", "\\textasciicircum");
i(l, u, p, "↑", "\\uparrow", !0);
i(l, u, p, "⇑", "\\Uparrow", !0);
i(l, u, p, "↓", "\\downarrow", !0);
i(l, u, p, "⇓", "\\Downarrow", !0);
i(l, u, p, "↕", "\\updownarrow", !0);
i(l, u, p, "⇕", "\\Updownarrow", !0);
i(l, u, t0, "∐", "\\coprod");
i(l, u, t0, "⋁", "\\bigvee");
i(l, u, t0, "⋀", "\\bigwedge");
i(l, u, t0, "⨄", "\\biguplus");
i(l, u, t0, "⋂", "\\bigcap");
i(l, u, t0, "⋃", "\\bigcup");
i(l, u, t0, "∫", "\\int");
i(l, u, t0, "∫", "\\intop");
i(l, u, t0, "∬", "\\iint");
i(l, u, t0, "∭", "\\iiint");
i(l, u, t0, "∏", "\\prod");
i(l, u, t0, "∑", "\\sum");
i(l, u, t0, "⨂", "\\bigotimes");
i(l, u, t0, "⨁", "\\bigoplus");
i(l, u, t0, "⨀", "\\bigodot");
i(l, u, t0, "∮", "\\oint");
i(l, u, t0, "∯", "\\oiint");
i(l, u, t0, "∰", "\\oiiint");
i(l, u, t0, "⨆", "\\bigsqcup");
i(l, u, t0, "∫", "\\smallint");
i(w, u, le, "…", "\\textellipsis");
i(l, u, le, "…", "\\mathellipsis");
i(w, u, le, "…", "\\ldots", !0);
i(l, u, le, "…", "\\ldots", !0);
i(l, u, le, "⋯", "\\@cdots", !0);
i(l, u, le, "⋱", "\\ddots", !0);
i(l, u, g, "⋮", "\\varvdots");
i(w, u, g, "⋮", "\\varvdots");
i(l, u, Y, "ˊ", "\\acute");
i(l, u, Y, "ˋ", "\\grave");
i(l, u, Y, "¨", "\\ddot");
i(l, u, Y, "~", "\\tilde");
i(l, u, Y, "ˉ", "\\bar");
i(l, u, Y, "˘", "\\breve");
i(l, u, Y, "ˇ", "\\check");
i(l, u, Y, "^", "\\hat");
i(l, u, Y, "⃗", "\\vec");
i(l, u, Y, "˙", "\\dot");
i(l, u, Y, "˚", "\\mathring");
i(l, u, N, "", "\\@imath");
i(l, u, N, "", "\\@jmath");
i(l, u, g, "ı", "ı");
i(l, u, g, "ȷ", "ȷ");
i(w, u, g, "ı", "\\i", !0);
i(w, u, g, "ȷ", "\\j", !0);
i(w, u, g, "ß", "\\ss", !0);
i(w, u, g, "æ", "\\ae", !0);
i(w, u, g, "œ", "\\oe", !0);
i(w, u, g, "ø", "\\o", !0);
i(w, u, g, "Æ", "\\AE", !0);
i(w, u, g, "Œ", "\\OE", !0);
i(w, u, g, "Ø", "\\O", !0);
i(w, u, Y, "ˊ", "\\'");
i(w, u, Y, "ˋ", "\\`");
i(w, u, Y, "ˆ", "\\^");
i(w, u, Y, "˜", "\\~");
i(w, u, Y, "ˉ", "\\=");
i(w, u, Y, "˘", "\\u");
i(w, u, Y, "˙", "\\.");
i(w, u, Y, "¸", "\\c");
i(w, u, Y, "˚", "\\r");
i(w, u, Y, "ˇ", "\\v");
i(w, u, Y, "¨", '\\"');
i(w, u, Y, "˝", "\\H");
i(w, u, Y, "◯", "\\textcircled");
var na = {
  "--": !0,
  "---": !0,
  "``": !0,
  "''": !0
};
i(w, u, g, "–", "--", !0);
i(w, u, g, "–", "\\textendash");
i(w, u, g, "—", "---", !0);
i(w, u, g, "—", "\\textemdash");
i(w, u, g, "‘", "`", !0);
i(w, u, g, "‘", "\\textquoteleft");
i(w, u, g, "’", "'", !0);
i(w, u, g, "’", "\\textquoteright");
i(w, u, g, "“", "``", !0);
i(w, u, g, "“", "\\textquotedblleft");
i(w, u, g, "”", "''", !0);
i(w, u, g, "”", "\\textquotedblright");
i(l, u, g, "°", "\\degree", !0);
i(w, u, g, "°", "\\degree");
i(w, u, g, "°", "\\textdegree", !0);
i(l, u, g, "£", "\\pounds");
i(l, u, g, "£", "\\mathsterling", !0);
i(w, u, g, "£", "\\pounds");
i(w, u, g, "£", "\\textsterling", !0);
i(l, f, g, "✠", "\\maltese");
i(w, f, g, "✠", "\\maltese");
var dr = '0123456789/@."';
for (var Qe = 0; Qe < dr.length; Qe++) {
  var fr = dr.charAt(Qe);
  i(l, u, g, fr, fr);
}
var pr = '0123456789!@*()-=+";:?/.,';
for (var _e = 0; _e < pr.length; _e++) {
  var vr = pr.charAt(_e);
  i(w, u, g, vr, vr);
}
var Ne = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var et = 0; et < Ne.length; et++) {
  var Se = Ne.charAt(et);
  i(l, u, N, Se, Se), i(w, u, g, Se, Se);
}
i(l, f, g, "C", "ℂ");
i(w, f, g, "C", "ℂ");
i(l, f, g, "H", "ℍ");
i(w, f, g, "H", "ℍ");
i(l, f, g, "N", "ℕ");
i(w, f, g, "N", "ℕ");
i(l, f, g, "P", "ℙ");
i(w, f, g, "P", "ℙ");
i(l, f, g, "Q", "ℚ");
i(w, f, g, "Q", "ℚ");
i(l, f, g, "R", "ℝ");
i(w, f, g, "R", "ℝ");
i(l, f, g, "Z", "ℤ");
i(w, f, g, "Z", "ℤ");
i(l, u, N, "h", "ℎ");
i(w, u, N, "h", "ℎ");
var E;
for (var s0 = 0; s0 < Ne.length; s0++) {
  var Q = Ne.charAt(s0);
  E = String.fromCharCode(55349, 56320 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E), E = String.fromCharCode(55349, 56372 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E), E = String.fromCharCode(55349, 56424 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E), E = String.fromCharCode(55349, 56580 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E), E = String.fromCharCode(55349, 56684 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E), E = String.fromCharCode(55349, 56736 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E), E = String.fromCharCode(55349, 56788 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E), E = String.fromCharCode(55349, 56840 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E), E = String.fromCharCode(55349, 56944 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E), s0 < 26 && (E = String.fromCharCode(55349, 56632 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E), E = String.fromCharCode(55349, 56476 + s0), i(l, u, N, Q, E), i(w, u, g, Q, E));
}
E = "𝕜";
i(l, u, N, "k", E);
i(w, u, g, "k", E);
for (var j0 = 0; j0 < 10; j0++) {
  var H0 = j0.toString();
  E = String.fromCharCode(55349, 57294 + j0), i(l, u, N, H0, E), i(w, u, g, H0, E), E = String.fromCharCode(55349, 57314 + j0), i(l, u, N, H0, E), i(w, u, g, H0, E), E = String.fromCharCode(55349, 57324 + j0), i(l, u, N, H0, E), i(w, u, g, H0, E), E = String.fromCharCode(55349, 57334 + j0), i(l, u, N, H0, E), i(w, u, g, H0, E);
}
var pt = "ÐÞþ";
for (var tt = 0; tt < pt.length; tt++) {
  var Ae = pt.charAt(tt);
  i(l, u, N, Ae, Ae), i(w, u, g, Ae, Ae);
}
var vt = {
  mathClass: "mathbf",
  textClass: "textbf",
  font: "Main-Bold"
}, gr = {
  mathClass: "mathnormal",
  textClass: "textit",
  font: "Math-Italic"
}, br = {
  mathClass: "boldsymbol",
  textClass: "boldsymbol",
  font: "Main-BoldItalic"
}, V1 = {
  mathClass: "mathscr",
  textClass: "textscr",
  font: "Script-Regular"
}, W0 = {
  mathClass: "",
  textClass: "",
  font: ""
}, yr = {
  mathClass: "mathfrak",
  textClass: "textfrak",
  font: "Fraktur-Regular"
}, xr = {
  mathClass: "mathbb",
  textClass: "textbb",
  font: "AMS-Regular"
}, wr = {
  mathClass: "mathboldfrak",
  textClass: "textboldfrak",
  font: "Fraktur-Regular"
}, gt = {
  mathClass: "mathsf",
  textClass: "textsf",
  font: "SansSerif-Regular"
}, bt = {
  mathClass: "mathboldsf",
  textClass: "textboldsf",
  font: "SansSerif-Bold"
}, kr = {
  mathClass: "mathitsf",
  textClass: "textitsf",
  font: "SansSerif-Italic"
}, yt = {
  mathClass: "mathtt",
  textClass: "texttt",
  font: "Typewriter-Regular"
}, Sr = [
  vt,
  vt,
  // A-Z, a-z
  gr,
  gr,
  // A-Z, a-z
  br,
  br,
  // A-Z, a-z
  // Map fancy A-Z letters to script, not calligraphic.
  // This aligns with unicode-math and math fonts (except Cambria Math).
  V1,
  W0,
  // A-Z script, a-z — no font
  W0,
  W0,
  // A-Z bold script, a-z bold script — no font
  yr,
  yr,
  // A-Z, a-z
  xr,
  xr,
  // A-Z double-struck, k double-struck
  // Note that we are using a bold font, but font metrics for regular Fraktur.
  wr,
  wr,
  // A-Z, a-z
  gt,
  gt,
  // A-Z, a-z
  bt,
  bt,
  // A-Z, a-z
  kr,
  kr,
  // A-Z, a-z
  W0,
  W0,
  // A-Z bold italic sans, a-z bold italic sans - no font
  yt,
  yt
  // A-Z, a-z
], $1 = [
  vt,
  // 0-9
  W0,
  // 0-9 double-struck. No KaTeX font.
  gt,
  // 0-9
  bt,
  // 0-9
  yt
  // 0-9
], j1 = (r) => {
  var e = r.charCodeAt(0), t = r.charCodeAt(1), a = (e - 55296) * 1024 + (t - 56320) + 65536;
  if (119808 <= a && a < 120484) {
    var n = Math.floor((a - 119808) / 26);
    return Sr[n];
  } else if (120782 <= a && a <= 120831) {
    var s = Math.floor((a - 120782) / 10);
    return $1[s];
  } else {
    if (a === 120485 || a === 120486)
      return Sr[0];
    if (120486 < a && a < 120782)
      return W0;
    throw new S("Unsupported character: " + r);
  }
}, Oe = function(e, t, a) {
  if (W[a][e]) {
    var n = W[a][e].replace;
    n && (e = n);
  }
  return {
    value: e,
    metrics: It(e, t, a)
  };
}, l0 = function(e, t, a, n, s) {
  var o = Oe(e, t, a), h = o.metrics;
  e = o.value;
  var m;
  if (h) {
    var d = h.italic;
    (a === "text" || n && n.font === "mathit") && (d = 0), m = new d0(e, h.height, h.depth, d, h.skew, h.width, s);
  } else
    typeof console != "undefined" && console.warn("No character metrics " + ("for '" + e + "' in style '" + t + "' and mode '" + a + "'")), m = new d0(e, 0, 0, 0, 0, 0, s);
  if (n) {
    m.maxFontSize = n.sizeMultiplier, n.style.isTight() && m.classes.push("mtight");
    var v = n.getColor();
    v && (m.style.color = v);
  }
  return m;
}, Ot = function(e, t, a, n) {
  return n === void 0 && (n = []), a.font === "boldsymbol" && Oe(e, "Main-Bold", t).metrics ? l0(e, "Main-Bold", t, a, n.concat(["mathbf"])) : e === "\\" || W[t][e].font === "main" ? l0(e, "Main-Regular", t, a, n) : l0(e, "AMS-Regular", t, a, n.concat(["amsrm"]));
}, X1 = function(e, t, a) {
  return a !== "textord" && Oe(e, "Math-BoldItalic", t).metrics ? {
    fontName: "Math-BoldItalic",
    fontClass: "boldsymbol"
  } : {
    fontName: "Main-Bold",
    fontClass: "mathbf"
  };
}, Fe = function(e, t) {
  var a = e.type === "mathord" ? "mathord" : "textord", n = e.mode, s = e.text, o = ["mord"], h = t.font, m = t.fontFamily, d = t.fontWeight, v = t.fontShape, b = n === "math" || n === "text" && !!h, y = b ? h : m, x = "", M = "";
  if (s.charCodeAt(0) === 55349) {
    var T = j1(s);
    x = T.font, M = T[n + "Class"];
  }
  if (x)
    return l0(s, x, n, t, o.concat(M));
  if (y) {
    var C, q;
    if (y === "boldsymbol") {
      var R = X1(s, n, a);
      C = R.fontName, q = [R.fontClass];
    } else b ? (C = xt[h].fontName, q = [h]) : (C = ze(m, d, v), q = [m, d, v]);
    if (Oe(s, C, n).metrics)
      return l0(s, C, n, t, o.concat(q));
    if (Object.prototype.hasOwnProperty.call(na, s) && C.slice(0, 10) === "Typewriter") {
      for (var O = [], F = 0; F < s.length; F++)
        O.push(l0(s[F], C, n, t, o.concat(q)));
      return N0(O);
    }
  }
  if (a === "mathord")
    return l0(s, "Math-Italic", n, t, o.concat(["mathnormal"]));
  if (a === "textord") {
    var P = W[n][s] && W[n][s].font;
    if (P === "ams") {
      var L = ze("amsrm", d, v);
      return l0(s, L, n, t, o.concat("amsrm", d, v));
    } else if (P === "main" || !P) {
      var G = ze("textrm", d, v);
      return l0(s, G, n, t, o.concat(d, v));
    } else {
      var $ = ze(P, d, v);
      return l0(s, $, n, t, o.concat($, d, v));
    }
  } else
    throw new Error("unexpected type: " + a + " in makeOrd");
}, W1 = (r, e) => {
  if (P0(r.classes) !== P0(e.classes) || r.skew !== e.skew || r.maxFontSize !== e.maxFontSize || r.italic !== 0 && r.hasClass("mathnormal"))
    return !1;
  if (r.classes.length === 1) {
    var t = r.classes[0];
    if (t === "mbin" || t === "mord")
      return !1;
  }
  for (var a of Object.keys(r.style))
    if (r.style[a] !== e.style[a])
      return !1;
  for (var n of Object.keys(e.style))
    if (r.style[n] !== e.style[n])
      return !1;
  return !0;
}, ia = (r) => {
  for (var e = 0; e < r.length - 1; e++) {
    var t = r[e], a = r[e + 1];
    t instanceof d0 && a instanceof d0 && W1(t, a) && (t.text += a.text, t.height = Math.max(t.height, a.height), t.depth = Math.max(t.depth, a.depth), t.italic = a.italic, r.splice(e + 1, 1), e--);
  }
  return r;
}, Ft = function(e) {
  for (var t = 0, a = 0, n = 0, s = 0; s < e.children.length; s++) {
    var o = e.children[s];
    o.height > t && (t = o.height), o.depth > a && (a = o.depth), o.maxFontSize > n && (n = o.maxFontSize);
  }
  e.height = t, e.depth = a, e.maxFontSize = n;
}, k = function(e, t, a, n) {
  var s = new se(e, t, a, n);
  return Ft(s), s;
}, U0 = (r, e, t, a) => new se(r, e, t, a), ae = function(e, t, a) {
  var n = k([e], [], t);
  return n.height = Math.max(a || t.fontMetrics().defaultRuleThickness, t.minRuleThickness), n.style.borderBottomWidth = z(n.height), n.maxFontSize = 1, n;
}, Y1 = function(e, t, a, n) {
  var s = new Ie(e, t, a, n);
  return Ft(s), s;
}, N0 = function(e) {
  var t = new ie(e);
  return Ft(t), t;
}, ne = function(e, t) {
  return e instanceof ie ? k([], [e], t) : e;
}, Z1 = function(e) {
  if (e.positionType === "individualShift") {
    for (var t = e.children, a = [t[0]], n = -t[0].shift - t[0].elem.depth, s = n, o = 1; o < t.length; o++) {
      var h = -t[o].shift - s - t[o].elem.depth, m = h - (t[o - 1].elem.height + t[o - 1].elem.depth);
      s = s + h, a.push({
        type: "kern",
        size: m
      }), a.push(t[o]);
    }
    return {
      children: a,
      depth: n
    };
  }
  var d;
  if (e.positionType === "top") {
    for (var v = e.positionData, b = 0; b < e.children.length; b++) {
      var y = e.children[b];
      v -= y.type === "kern" ? y.size : y.elem.height + y.elem.depth;
    }
    d = v;
  } else if (e.positionType === "bottom")
    d = -e.positionData;
  else {
    var x = e.children[0];
    if (x.type !== "elem")
      throw new Error('First child must have type "elem".');
    if (e.positionType === "shift")
      d = -x.elem.depth - e.positionData;
    else if (e.positionType === "firstBaseline")
      d = -x.elem.depth;
    else
      throw new Error("Invalid positionType " + e.positionType + ".");
  }
  return {
    children: e.children,
    depth: d
  };
}, U = function(e, t) {
  for (var a = Z1(e), n = a.children, s = a.depth, o = 0, h = 0; h < n.length; h++) {
    var m = n[h];
    if (m.type === "elem") {
      var d = m.elem;
      o = Math.max(o, d.maxFontSize, d.height);
    }
  }
  o += 2;
  var v = k(["pstrut"], []);
  v.style.height = z(o);
  for (var b = [], y = s, x = s, M = s, T = 0; T < n.length; T++) {
    var C = n[T];
    if (C.type === "kern")
      M += C.size;
    else {
      var q = C.elem, R = C.wrapperClasses || [], O = C.wrapperStyle || {}, F = k(R, [v, q], void 0, O);
      F.style.top = z(-o - M - q.depth), C.marginLeft && (F.style.marginLeft = C.marginLeft), C.marginRight && (F.style.marginRight = C.marginRight), b.push(F), M += q.height + q.depth;
    }
    y = Math.min(y, M), x = Math.max(x, M);
  }
  var P = k(["vlist"], b);
  P.style.height = z(x);
  var L;
  if (y < 0) {
    var G = k([], []), $ = k(["vlist"], [G]);
    $.style.height = z(-y);
    var j = k(["vlist-s"], [new d0("​")]);
    L = [k(["vlist-r"], [P, j]), k(["vlist-r"], [$])];
  } else
    L = [k(["vlist-r"], [P])];
  var Z = k(["vlist-t"], L);
  return L.length === 2 && Z.classes.push("vlist-t2"), Z.height = x, Z.depth = -y, Z;
}, sa = (r, e) => {
  var t = k(["mspace"], [], e), a = J(r, e);
  return t.style.marginRight = z(a), t;
}, ze = (r, e, t) => {
  var a, n;
  switch (r) {
    case "amsrm":
      a = "AMS";
      break;
    case "textrm":
      a = "Main";
      break;
    case "textsf":
      a = "SansSerif";
      break;
    case "texttt":
      a = "Typewriter";
      break;
    default:
      a = r;
  }
  return e === "textbf" && t === "textit" ? n = "BoldItalic" : e === "textbf" ? n = "Bold" : t === "textit" ? n = "Italic" : n = "Regular", a + "-" + n;
}, xt = {
  // styles
  mathbf: {
    variant: "bold",
    fontName: "Main-Bold"
  },
  mathrm: {
    variant: "normal",
    fontName: "Main-Regular"
  },
  textit: {
    variant: "italic",
    fontName: "Main-Italic"
  },
  mathit: {
    variant: "italic",
    fontName: "Main-Italic"
  },
  mathnormal: {
    variant: "italic",
    fontName: "Math-Italic"
  },
  mathsfit: {
    variant: "sans-serif-italic",
    fontName: "SansSerif-Italic"
  },
  // "boldsymbol" is missing because they require the use of multiple fonts:
  // Math-BoldItalic and Main-Bold.  This is handled by a special case in
  // makeOrd which ends up calling boldsymbol.
  // families
  mathbb: {
    variant: "double-struck",
    fontName: "AMS-Regular"
  },
  mathcal: {
    variant: "script",
    fontName: "Caligraphic-Regular"
  },
  mathfrak: {
    variant: "fraktur",
    fontName: "Fraktur-Regular"
  },
  mathscr: {
    variant: "script",
    fontName: "Script-Regular"
  },
  mathsf: {
    variant: "sans-serif",
    fontName: "SansSerif-Regular"
  },
  mathtt: {
    variant: "monospace",
    fontName: "Typewriter-Regular"
  }
}, la = {
  //   path, width, height
  vec: ["vec", 0.471, 0.714],
  // values from the font glyph
  oiintSize1: ["oiintSize1", 0.957, 0.499],
  // oval to overlay the integrand
  oiintSize2: ["oiintSize2", 1.472, 0.659],
  oiiintSize1: ["oiiintSize1", 1.304, 0.499],
  oiiintSize2: ["oiiintSize2", 1.98, 0.659]
}, oa = function(e, t) {
  var a = la[e], n = a[0], s = a[1], o = a[2], h = new G0(n), m = new D0([h], {
    width: z(s),
    height: z(o),
    // Override CSS rule `.katex svg { width: 100% }`
    style: "width:" + z(s),
    viewBox: "0 0 " + 1e3 * s + " " + 1e3 * o,
    preserveAspectRatio: "xMinYMin"
  }), d = U0(["katex-overlay"], [m], t);
  return d.height = o, d.style.height = z(o), d.style.width = z(s), d;
}, K = {
  number: 3,
  unit: "mu"
}, X0 = {
  number: 4,
  unit: "mu"
}, T0 = {
  number: 5,
  unit: "mu"
}, K1 = {
  mord: {
    mop: K,
    mbin: X0,
    mrel: T0,
    minner: K
  },
  mop: {
    mord: K,
    mop: K,
    mrel: T0,
    minner: K
  },
  mbin: {
    mord: X0,
    mop: X0,
    mopen: X0,
    minner: X0
  },
  mrel: {
    mord: T0,
    mop: T0,
    mopen: T0,
    minner: T0
  },
  mopen: {},
  mclose: {
    mop: K,
    mbin: X0,
    mrel: T0,
    minner: K
  },
  mpunct: {
    mord: K,
    mop: K,
    mrel: T0,
    mopen: K,
    mclose: K,
    mpunct: K,
    minner: K
  },
  minner: {
    mord: K,
    mop: K,
    mbin: X0,
    mrel: T0,
    mopen: K,
    mpunct: K,
    minner: K
  }
}, J1 = {
  mord: {
    mop: K
  },
  mop: {
    mord: K,
    mop: K
  },
  mbin: {},
  mrel: {},
  mopen: {},
  mclose: {
    mop: K
  },
  mpunct: {},
  minner: {
    mop: K
  }
}, ua = {}, me = {}, de = {};
function B(r) {
  for (var e = r.type, t = r.names, a = r.htmlBuilder, n = r.mathmlBuilder, s = 0; s < t.length; ++s)
    ua[t[s]] = r;
  e && (a && (me[e] = a), n && (de[e] = n));
}
function Y0(r) {
  var e = r.type, t = r.htmlBuilder, a = r.mathmlBuilder;
  t && (me[e] = t), a && (de[e] = a);
}
var fe = function(e) {
  return e.type === "ordgroup" && e.body.length === 1 ? e.body[0] : e;
}, _ = function(e) {
  return e.type === "ordgroup" ? e.body : [e];
}, Q1 = /* @__PURE__ */ new Set(["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"]), _1 = /* @__PURE__ */ new Set(["rightmost", "mrel", "mclose", "mpunct"]), en = {
  display: I.DISPLAY,
  text: I.TEXT,
  script: I.SCRIPT,
  scriptscript: I.SCRIPTSCRIPT
}, tn = {
  mord: "mord",
  mop: "mop",
  mbin: "mbin",
  mrel: "mrel",
  mopen: "mopen",
  mclose: "mclose",
  mpunct: "mpunct",
  minner: "minner"
}, n0 = function(e, t, a, n) {
  n === void 0 && (n = [null, null]);
  for (var s = [], o = 0; o < e.length; o++) {
    var h = V(e[o], t);
    if (h instanceof ie) {
      var m = h.children;
      s.push(...m);
    } else
      s.push(h);
  }
  if (ia(s), !a)
    return s;
  var d = t;
  if (e.length === 1) {
    var v = e[0];
    v.type === "sizing" ? d = t.havingSize(v.size) : v.type === "styling" && (d = t.havingStyle(en[v.style]));
  }
  var b = k([n[0] || "leftmost"], [], t), y = k([n[1] || "rightmost"], [], t), x = a === "root";
  return wt(s, (M, T) => {
    var C = T.classes[0], q = M.classes[0];
    C === "mbin" && _1.has(q) ? T.classes[0] = "mord" : q === "mbin" && Q1.has(C) && (M.classes[0] = "mord");
  }, {
    node: b
  }, y, x), wt(s, (M, T) => {
    var C, q, R = St(T), O = St(M), F = R && O ? M.hasClass("mtight") ? (C = J1[R]) == null ? void 0 : C[O] : (q = K1[R]) == null ? void 0 : q[O] : null;
    if (F)
      return sa(F, d);
  }, {
    node: b
  }, y, x), s;
}, wt = function(e, t, a, n, s) {
  n && e.push(n);
  for (var o = 0; o < e.length; o++) {
    var h = e[o], m = ha(h);
    if (m) {
      wt(m.children, t, a, null, s);
      continue;
    }
    var d = !h.hasClass("mspace");
    if (d) {
      var v = t(h, a.node);
      v && (a.insertAfter ? a.insertAfter(v) : (e.unshift(v), o++));
    }
    d ? a.node = h : s && h.hasClass("katex-newline") && (a.node = k(["leftmost"])), a.insertAfter = /* @__PURE__ */ ((b) => (y) => {
      e.splice(b + 1, 0, y), o++;
    })(o);
  }
  n && e.pop();
}, ha = function(e) {
  return e instanceof ie || e instanceof Ie || e instanceof se && e.hasClass("enclosing") ? e : null;
}, kt = function(e, t) {
  var a = ha(e);
  if (a) {
    var n = a.children;
    if (n.length) {
      if (t === "right")
        return kt(n[n.length - 1], "right");
      if (t === "left")
        return kt(n[0], "left");
    }
  }
  return e;
}, St = function(e, t) {
  if (!e)
    return null;
  t && (e = kt(e, t));
  var a = e.classes[0];
  return tn[a] || null;
}, pe = function(e, t) {
  var a = ["nulldelimiter"].concat(e.baseSizingClasses());
  return k(t.concat(a));
}, V = function(e, t, a) {
  if (!e)
    return k();
  if (me[e.type]) {
    var n = me[e.type](e, t);
    if (a && t.size !== a.size) {
      n = k(t.sizingClasses(a), [n], t);
      var s = t.sizeMultiplier / a.sizeMultiplier;
      n.height *= s, n.depth *= s;
    }
    return n;
  } else
    throw new S("Got group of unknown type: '" + e.type + "'");
};
function Me(r, e) {
  var t = k(["katex-base"], r, e), a = k(["katex-strut"]);
  return a.style.height = z(t.height + t.depth), t.depth && (a.style.verticalAlign = z(-t.depth)), t.children.unshift(a), t;
}
function At(r, e) {
  var t = null;
  r.length === 1 && r[0].type === "tag" && (t = r[0].tag, r = r[0].body);
  var a = n0(r, e, "root"), n;
  a.length === 2 && a[1].hasClass("katex-tag") && (n = a.pop());
  for (var s = [], o = [], h = 0; h < a.length; h++)
    if (o.push(a[h]), a[h].hasClass("mbin") || a[h].hasClass("mrel") || a[h].hasClass("allowbreak")) {
      for (var m = !1; h < a.length - 1 && a[h + 1].hasClass("mspace") && !a[h + 1].hasClass("katex-newline"); )
        h++, o.push(a[h]), a[h].hasClass("nobreak") && (m = !0);
      m || (s.push(Me(o, e)), o = []);
    } else a[h].hasClass("katex-newline") && (o.pop(), o.length > 0 && (s.push(Me(o, e)), o = []), s.push(a[h]));
  o.length > 0 && s.push(Me(o, e));
  var d;
  t ? (d = Me(n0(t, e, !0), e), d.classes = ["katex-tag"], s.push(d)) : n && s.push(n);
  var v = k(["katex-html"], s);
  if (v.setAttribute("aria-hidden", "true"), d) {
    var b = d.children[0];
    b.style.height = z(v.height + v.depth), v.depth && (b.style.verticalAlign = z(-v.depth));
  }
  return v;
}
function ca(r) {
  return new ie(r);
}
class A {
  constructor(e, t, a) {
    this.type = void 0, this.attributes = void 0, this.children = void 0, this.classes = void 0, this.type = e, this.attributes = {}, this.children = t || [], this.classes = a || [];
  }
  /**
   * Sets an attribute on a MathML node. MathML depends on attributes to convey a
   * semantic content, so this is used heavily.
   */
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  /**
   * Gets an attribute on a MathML node.
   */
  getAttribute(e) {
    return this.attributes[e];
  }
  /**
   * Converts the math node into a MathML-namespaced DOM element.
   */
  toNode() {
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
    for (var t of Object.entries(this.attributes)) {
      var a = t[0], n = t[1];
      e.setAttribute(a, n);
    }
    this.classes.length > 0 && (e.className = P0(this.classes));
    for (var s = 0; s < this.children.length; s++)
      if (this.children[s] instanceof e0 && this.children[s + 1] instanceof e0) {
        for (var o = this.children[s].toText() + this.children[++s].toText(); this.children[s + 1] instanceof e0; )
          o += this.children[++s].toText();
        e.appendChild(new e0(o).toNode());
      } else
        e.appendChild(this.children[s].toNode());
    return e;
  }
  /**
   * Converts the math node into an HTML markup string.
   */
  toMarkup() {
    var e = "<" + this.type;
    for (var t of Object.entries(this.attributes)) {
      var a = t[0], n = t[1];
      e += " " + a + '="', e += i0(n), e += '"';
    }
    this.classes.length > 0 && (e += ' class ="' + i0(P0(this.classes)) + '"'), e += ">";
    for (var s = 0; s < this.children.length; s++)
      e += this.children[s].toMarkup();
    return e += "</" + this.type + ">", e;
  }
  /**
   * Converts the math node into a string, similar to innerText, but escaped.
   */
  toText() {
    return this.children.map((e) => e.toText()).join("");
  }
}
class e0 {
  constructor(e) {
    this.text = void 0, this.text = e;
  }
  /**
   * Converts the text node into a DOM text node.
   */
  toNode() {
    return document.createTextNode(this.text);
  }
  /**
   * Converts the text node into escaped HTML markup
   * (representing the text itself).
   */
  toMarkup() {
    return i0(this.toText());
  }
  /**
   * Converts the text node into a string
   * (representing the text itself).
   */
  toText() {
    return this.text;
  }
}
class ma {
  /**
   * Create a Space node with width given in CSS ems.
   */
  constructor(e) {
    this.width = void 0, this.character = void 0, this.width = e, e >= 0.05555 && e <= 0.05556 ? this.character = " " : e >= 0.1666 && e <= 0.1667 ? this.character = " " : e >= 0.2222 && e <= 0.2223 ? this.character = " " : e >= 0.2777 && e <= 0.2778 ? this.character = "  " : e >= -0.05556 && e <= -0.05555 ? this.character = " ⁣" : e >= -0.1667 && e <= -0.1666 ? this.character = " ⁣" : e >= -0.2223 && e <= -0.2222 ? this.character = " ⁣" : e >= -0.2778 && e <= -0.2777 ? this.character = " ⁣" : this.character = null;
  }
  /**
   * Converts the math node into a MathML-namespaced DOM element.
   */
  toNode() {
    if (this.character)
      return document.createTextNode(this.character);
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
    return e.setAttribute("width", z(this.width)), e;
  }
  /**
   * Converts the math node into an HTML markup string.
   */
  toMarkup() {
    return this.character ? "<mtext>" + this.character + "</mtext>" : '<mspace width="' + z(this.width) + '"/>';
  }
  /**
   * Converts the math node into a string, similar to innerText.
   */
  toText() {
    return this.character ? this.character : " ";
  }
}
var rn = /* @__PURE__ */ new Set(["\\imath", "\\jmath"]), an = /* @__PURE__ */ new Set(["mrow", "mtable"]), g0 = function(e, t, a) {
  var n, s;
  return W[t][e] && W[t][e].replace && e.charCodeAt(0) !== 55349 && !(Object.prototype.hasOwnProperty.call(na, e) && ((a == null || (n = a.fontFamily) == null ? void 0 : n.slice(4, 6)) === "tt" || (a == null || (s = a.font) == null ? void 0 : s.slice(4, 6)) === "tt")) && (e = W[t][e].replace), new e0(e);
}, Ht = function(e) {
  return e.length === 1 ? e[0] : new A("mrow", e);
}, nn = {
  mathit: "italic",
  boldsymbol: (r) => r.type === "textord" ? "bold" : "bold-italic",
  mathbf: "bold",
  mathbb: "double-struck",
  mathsfit: "sans-serif-italic",
  mathfrak: "fraktur",
  mathscr: "script",
  mathcal: "script",
  mathsf: "sans-serif",
  mathtt: "monospace"
}, Lt = (r, e) => {
  if (r.mode === "text") {
    if (e.fontFamily === "texttt")
      return "monospace";
    if (e.fontFamily === "textsf")
      return e.fontShape === "textit" && e.fontWeight === "textbf" ? "sans-serif-bold-italic" : e.fontShape === "textit" ? "sans-serif-italic" : e.fontWeight === "textbf" ? "bold-sans-serif" : "sans-serif";
    if (e.fontShape === "textit" && e.fontWeight === "textbf")
      return "bold-italic";
    if (e.fontShape === "textit")
      return "italic";
    if (e.fontWeight === "textbf")
      return "bold";
  }
  var t = e.font;
  if (!t || t === "mathnormal")
    return null;
  var a = r.mode, n = nn[t];
  if (n)
    return typeof n == "function" ? n(r) : n;
  var s = r.text;
  if (rn.has(s))
    return null;
  if (W[a][s]) {
    var o = W[a][s].replace;
    o && (s = o);
  }
  var h = xt[t].fontName;
  return It(s, h, a) ? xt[t].variant : null;
};
function rt(r) {
  if (!r)
    return !1;
  if (r.type === "mi" && r.children.length === 1) {
    var e = r.children[0];
    return e instanceof e0 && e.text === ".";
  } else if (r.type === "mo" && r.children.length === 1 && r.getAttribute("separator") === "true" && r.getAttribute("lspace") === "0em" && r.getAttribute("rspace") === "0em") {
    var t = r.children[0];
    return t instanceof e0 && t.text === ",";
  } else
    return !1;
}
var p0 = function(e, t, a) {
  if (e.length === 1) {
    var n = X(e[0], t);
    return a && n instanceof A && n.type === "mo" && (n.setAttribute("lspace", "0em"), n.setAttribute("rspace", "0em")), [n];
  }
  for (var s = [], o, h = 0; h < e.length; h++) {
    var m = X(e[h], t);
    if (m instanceof A && o instanceof A) {
      if (m.type === "mtext" && o.type === "mtext" && m.getAttribute("mathvariant") === o.getAttribute("mathvariant")) {
        o.children.push(...m.children);
        continue;
      } else if (m.type === "mn" && o.type === "mn") {
        o.children.push(...m.children);
        continue;
      } else if (rt(m) && o.type === "mn") {
        o.children.push(...m.children);
        continue;
      } else if (m.type === "mn" && rt(o))
        m.children = [...o.children, ...m.children], s.pop();
      else if ((m.type === "msup" || m.type === "msub") && m.children.length >= 1 && (o.type === "mn" || rt(o))) {
        var d = m.children[0];
        d instanceof A && d.type === "mn" && (d.children = [...o.children, ...d.children], s.pop());
      } else if (o.type === "mi" && o.children.length === 1) {
        var v = o.children[0];
        if (v instanceof e0 && v.text === "̸" && (m.type === "mo" || m.type === "mi" || m.type === "mn")) {
          var b = m.children[0];
          b instanceof e0 && b.text.length > 0 && (b.text = b.text.slice(0, 1) + "̸" + b.text.slice(1), s.pop());
        }
      }
    }
    s.push(m), o = m;
  }
  return s;
}, V0 = function(e, t, a) {
  return Ht(p0(e, t, a));
}, X = function(e, t) {
  if (!e)
    return new A("mrow");
  if (de[e.type])
    return de[e.type](e, t);
  throw new S("Got group of unknown type: '" + e.type + "'");
};
function Ar(r, e, t, a, n) {
  var s = p0(r, t), o;
  s.length === 1 && s[0] instanceof A && an.has(s[0].type) ? o = s[0] : o = new A("mrow", s);
  var h = new A("annotation", [new e0(e)]);
  h.setAttribute("encoding", "application/x-tex");
  var m = new A("semantics", [o, h]), d = new A("math", [m]);
  d.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), a && d.setAttribute("display", "block");
  var v = n ? "katex" : "katex-mathml";
  return k([v], [d]);
}
var sn = [
  // Each element contains [textsize, scriptsize, scriptscriptsize].
  // The size mappings are taken from TeX with \normalsize=10pt.
  [1, 1, 1],
  // size1: [5, 5, 5]              \tiny
  [2, 1, 1],
  // size2: [6, 5, 5]
  [3, 1, 1],
  // size3: [7, 5, 5]              \scriptsize
  [4, 2, 1],
  // size4: [8, 6, 5]              \footnotesize
  [5, 2, 1],
  // size5: [9, 6, 5]              \small
  [6, 3, 1],
  // size6: [10, 7, 5]             \normalsize
  [7, 4, 2],
  // size7: [12, 8, 6]             \large
  [8, 6, 3],
  // size8: [14.4, 10, 7]          \Large
  [9, 7, 6],
  // size9: [17.28, 12, 10]        \LARGE
  [10, 8, 7],
  // size10: [20.74, 14.4, 12]     \huge
  [11, 10, 9]
  // size11: [24.88, 20.74, 17.28] \HUGE
], zr = [
  // fontMetrics.js:getGlobalMetrics also uses size indexes, so if
  // you change size indexes, change that function.
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1,
  1.2,
  1.44,
  1.728,
  2.074,
  2.488
], Mr = function(e, t) {
  return t.size < 2 ? e : sn[e - 1][t.size - 1];
};
class C0 {
  constructor(e) {
    this.style = void 0, this.color = void 0, this.size = void 0, this.textSize = void 0, this.phantom = void 0, this.font = void 0, this.fontFamily = void 0, this.fontWeight = void 0, this.fontShape = void 0, this.sizeMultiplier = void 0, this.maxSize = void 0, this.minRuleThickness = void 0, this._fontMetrics = void 0, this.style = e.style, this.color = e.color, this.size = e.size || C0.BASESIZE, this.textSize = e.textSize || this.size, this.phantom = !!e.phantom, this.font = e.font || "", this.fontFamily = e.fontFamily || "", this.fontWeight = e.fontWeight || "", this.fontShape = e.fontShape || "", this.sizeMultiplier = zr[this.size - 1], this.maxSize = e.maxSize, this.minRuleThickness = e.minRuleThickness, this._fontMetrics = void 0;
  }
  /**
   * Returns a new options object with the same properties as "this".  Properties
   * from "extension" will be copied to the new options object.
   */
  extend(e) {
    var t = {
      style: this.style,
      size: this.size,
      textSize: this.textSize,
      color: this.color,
      phantom: this.phantom,
      font: this.font,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      fontShape: this.fontShape,
      maxSize: this.maxSize,
      minRuleThickness: this.minRuleThickness
    };
    return Object.assign(t, e), new C0(t);
  }
  /**
   * Return an options object with the given style. If `this.style === style`,
   * returns `this`.
   */
  havingStyle(e) {
    return this.style === e ? this : this.extend({
      style: e,
      size: Mr(this.textSize, e)
    });
  }
  /**
   * Return an options object with a cramped version of the current style. If
   * the current style is cramped, returns `this`.
   */
  havingCrampedStyle() {
    return this.havingStyle(this.style.cramp());
  }
  /**
   * Return an options object with the given size and in at least `\textstyle`.
   * Returns `this` if appropriate.
   */
  havingSize(e) {
    return this.size === e && this.textSize === e ? this : this.extend({
      style: this.style.text(),
      size: e,
      textSize: e,
      sizeMultiplier: zr[e - 1]
    });
  }
  /**
   * Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
   * changes to at least `\textstyle`.
   */
  havingBaseStyle(e) {
    e = e || this.style.text();
    var t = Mr(C0.BASESIZE, e);
    return this.size === t && this.textSize === C0.BASESIZE && this.style === e ? this : this.extend({
      style: e,
      size: t
    });
  }
  /**
   * Remove the effect of sizing changes such as \Huge.
   * Keep the effect of the current style, such as \scriptstyle.
   */
  havingBaseSizing() {
    var e;
    switch (this.style.id) {
      case 4:
      case 5:
        e = 3;
        break;
      case 6:
      case 7:
        e = 1;
        break;
      default:
        e = 6;
    }
    return this.extend({
      style: this.style.text(),
      size: e
    });
  }
  /**
   * Create a new options object with the given color.
   */
  withColor(e) {
    return this.extend({
      color: e
    });
  }
  /**
   * Create a new options object with "phantom" set to true.
   */
  withPhantom() {
    return this.extend({
      phantom: !0
    });
  }
  /**
   * Creates a new options object with the given math font or old text font.
   * @type {[type]}
   */
  withFont(e) {
    return this.extend({
      font: e
    });
  }
  /**
   * Create a new options objects with the given fontFamily.
   */
  withTextFontFamily(e) {
    return this.extend({
      fontFamily: e,
      font: ""
    });
  }
  /**
   * Creates a new options object with the given font weight
   */
  withTextFontWeight(e) {
    return this.extend({
      fontWeight: e,
      font: ""
    });
  }
  /**
   * Creates a new options object with the given font weight
   */
  withTextFontShape(e) {
    return this.extend({
      fontShape: e,
      font: ""
    });
  }
  /**
   * Return the CSS sizing classes required to switch from enclosing options
   * `oldOptions` to `this`. Returns an array of classes.
   */
  sizingClasses(e) {
    return e.size !== this.size ? ["katex-sizing", "reset-size" + e.size, "size" + this.size] : [];
  }
  /**
   * Return the CSS sizing classes required to switch to the base size. Like
   * `this.havingSize(BASESIZE).sizingClasses(this)`.
   */
  baseSizingClasses() {
    return this.size !== C0.BASESIZE ? ["katex-sizing", "reset-size" + this.size, "size" + C0.BASESIZE] : [];
  }
  /**
   * Return the font metrics for this size.
   */
  fontMetrics() {
    return this._fontMetrics || (this._fontMetrics = U1(this.size)), this._fontMetrics;
  }
  /**
   * Gets the CSS color of the current options object
   */
  getColor() {
    return this.phantom ? "transparent" : this.color;
  }
}
C0.BASESIZE = 6;
var da = function(e) {
  return new C0({
    style: e.displayMode ? I.DISPLAY : I.TEXT,
    maxSize: e.maxSize,
    minRuleThickness: e.minRuleThickness
  });
}, fa = function(e, t) {
  if (t.displayMode) {
    var a = ["katex-display"];
    t.leqno && a.push("leqno"), t.fleqn && a.push("fleqn"), e = k(a, [e]);
  }
  return e;
}, ln = function(e, t, a) {
  var n = da(a), s;
  if (a.output === "mathml")
    return Ar(e, t, n, a.displayMode, !0);
  if (a.output === "html") {
    var o = At(e, n);
    s = k(["katex"], [o]);
  } else {
    var h = Ar(e, t, n, a.displayMode, !1), m = At(e, n);
    s = k(["katex"], [h, m]);
  }
  return fa(s, a);
}, on = function(e, t, a) {
  var n = da(a), s = At(e, n), o = k(["katex"], [s]);
  return fa(o, a);
}, un = {
  widehat: "^",
  widecheck: "ˇ",
  widetilde: "~",
  utilde: "~",
  overleftarrow: "←",
  underleftarrow: "←",
  xleftarrow: "←",
  overrightarrow: "→",
  underrightarrow: "→",
  xrightarrow: "→",
  underbrace: "⏟",
  overbrace: "⏞",
  underbracket: "⎵",
  overbracket: "⎴",
  overgroup: "⏠",
  undergroup: "⏡",
  overleftrightarrow: "↔",
  underleftrightarrow: "↔",
  xleftrightarrow: "↔",
  Overrightarrow: "⇒",
  xRightarrow: "⇒",
  overleftharpoon: "↼",
  xleftharpoonup: "↼",
  overrightharpoon: "⇀",
  xrightharpoonup: "⇀",
  xLeftarrow: "⇐",
  xLeftrightarrow: "⇔",
  xhookleftarrow: "↩",
  xhookrightarrow: "↪",
  xmapsto: "↦",
  xrightharpoondown: "⇁",
  xleftharpoondown: "↽",
  xrightleftharpoons: "⇌",
  xleftrightharpoons: "⇋",
  xtwoheadleftarrow: "↞",
  xtwoheadrightarrow: "↠",
  xlongequal: "=",
  xtofrom: "⇄",
  xrightleftarrows: "⇄",
  xrightequilibrium: "⇌",
  // Not a perfect match.
  xleftequilibrium: "⇋",
  // None better available.
  "\\cdrightarrow": "→",
  "\\cdleftarrow": "←",
  "\\cdlongequal": "="
}, He = function(e) {
  var t = new A("mo", [new e0(un[e.replace(/^\\/, "")])]);
  return t.setAttribute("stretchy", "true"), t;
}, hn = {
  //   path(s), minWidth, height, align
  overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
  overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
  underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
  underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
  xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
  "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
  // CD minwwidth2.5pc
  xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
  "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
  Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
  xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
  xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
  overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
  xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
  xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
  overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
  xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
  xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
  xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
  "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
  xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
  xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
  overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
  overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
  underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
  underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
  xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
  xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
  xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
  xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
  xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
  xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
  overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
  underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
  overbracket: [["leftbracketover", "rightbracketover"], 1.6, 440],
  underbracket: [["leftbracketunder", "rightbracketunder"], 1.6, 410],
  overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
  undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
  xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
  xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
  // The next three arrows are from the mhchem package.
  // In mhchem.sty, min-length is 2.0em. But these arrows might appear in the
  // document as \xrightarrow or \xrightleftharpoons. Those have
  // min-length = 1.75em, so we set min-length on these next three to match.
  xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
  xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
  xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
}, cn = /* @__PURE__ */ new Set(["widehat", "widecheck", "widetilde", "utilde"]), Le = function(e, t) {
  function a() {
    var m = 4e5, d = e.label.slice(1);
    if (cn.has(d) && "base" in e) {
      var v = e.base.type === "ordgroup" ? e.base.body.length : 1, b, y, x;
      if (v > 5)
        d === "widehat" || d === "widecheck" ? (b = 420, m = 2364, x = 0.42, y = d + "4") : (b = 312, m = 2340, x = 0.34, y = "tilde4");
      else {
        var M = [1, 1, 2, 2, 3, 3][v];
        d === "widehat" || d === "widecheck" ? (m = [0, 1062, 2364, 2364, 2364][M], b = [0, 239, 300, 360, 420][M], x = [0, 0.24, 0.3, 0.3, 0.36, 0.42][M], y = d + M) : (m = [0, 600, 1033, 2339, 2340][M], b = [0, 260, 286, 306, 312][M], x = [0, 0.26, 0.286, 0.3, 0.306, 0.34][M], y = "tilde" + M);
      }
      var T = new G0(y), C = new D0([T], {
        width: "100%",
        height: z(x),
        viewBox: "0 0 " + m + " " + b,
        preserveAspectRatio: "none"
      });
      return {
        span: U0([], [C], t),
        minWidth: 0,
        height: x
      };
    } else {
      var q = [], R = hn[d];
      if (!R)
        throw new Error('No SVG data for "' + d + '".');
      var O = R[0], F = R[1], P = R[2], L = P / 1e3, G = O.length, $, j;
      if (G === 1) {
        if (R.length !== 4)
          throw new Error('Expected 4-tuple for single-path SVG data "' + d + '".');
        $ = ["hide-tail"], j = [R[3]];
      } else if (G === 2)
        $ = ["halfarrow-left", "halfarrow-right"], j = ["xMinYMin", "xMaxYMin"];
      else if (G === 3)
        $ = ["brace-left", "brace-center", "brace-right"], j = ["xMinYMin", "xMidYMin", "xMaxYMin"];
      else
        throw new Error(`Correct katexImagesData or update code here to support
                    ` + G + " children.");
      for (var Z = 0; Z < G; Z++) {
        var c0 = new G0(O[Z]), r0 = new D0([c0], {
          width: "400em",
          height: z(L),
          viewBox: "0 0 " + m + " " + P,
          preserveAspectRatio: j[Z] + " slice"
        }), M0 = U0([$[Z]], [r0], t);
        if (G === 1)
          return {
            span: M0,
            minWidth: F,
            height: L
          };
        M0.style.height = z(L), q.push(M0);
      }
      return {
        span: k(["katex-stretchy"], q, t),
        minWidth: F,
        height: L
      };
    }
  }
  var n = a(), s = n.span, o = n.minWidth, h = n.height;
  return s.height = h, s.style.height = z(h), o > 0 && (s.style.minWidth = z(o)), s;
}, mn = function(e, t, a, n, s) {
  var o, h = e.height + e.depth + a + n;
  if (/fbox|color|angl/.test(t)) {
    if (o = k(["katex-stretchy", t], [], s), t === "fbox") {
      var m = s.color && s.getColor();
      m && (o.style.borderColor = m);
    }
  } else {
    var d = [];
    /^[bx]cancel$/.test(t) && d.push(new ft({
      x1: "0",
      y1: "0",
      x2: "100%",
      y2: "100%",
      "stroke-width": "0.046em"
    })), /^x?cancel$/.test(t) && d.push(new ft({
      x1: "0",
      y1: "100%",
      x2: "100%",
      y2: "0",
      "stroke-width": "0.046em"
    }));
    var v = new D0(d, {
      width: "100%",
      height: z(h)
    });
    o = U0([], [v], s);
  }
  return o.height = h, o.style.height = z(h), o;
}, dn = ["bin", "close", "inner", "open", "punct", "rel"], fn = ["accent-token", "mathord", "op-token", "spacing", "textord"], pn = new Set(dn), vn = new Set(fn);
function gn(r) {
  return pn.has(r);
}
function H(r, e) {
  if (!r || r.type !== e)
    throw new Error("Expected node of type " + e + ", but got " + (r ? "node of type " + r.type : String(r)));
  return r;
}
function Pe(r) {
  var e = Ge(r);
  if (!e)
    throw new Error("Expected node of symbol group type, but got " + (r ? "node of type " + r.type : String(r)));
  return e;
}
function Ge(r) {
  return r.type === "atom" || vn.has(r.type) ? r : null;
}
function Pt(r, e, t) {
  var a = "";
  for (var n of r.body)
    if (n.type === "textord")
      a += n.text;
    else if (t && n.type === "spacing" && n.text === " ")
      a += " ";
    else
      throw new S(e, r);
  return a;
}
var pa = (r) => {
  if (r instanceof d0)
    return r;
  if (P1(r) && r.children.length === 1)
    return pa(r.children[0]);
}, va = (r, e) => {
  var t, a, n;
  r && r.type === "supsub" ? (a = H(r.base, "accent"), t = a.base, r.base = t, n = L1(V(r, e)), r.base = a) : (a = H(r, "accent"), t = a.base);
  var s = V(t, e.havingCrampedStyle()), o = a.isShifty && q0(t), h = 0;
  if (o) {
    var m, d;
    h = (m = (d = pa(s)) == null ? void 0 : d.skew) != null ? m : 0;
  }
  var v = a.label === "\\c", b = v ? s.height + s.depth : Math.min(s.height, e.fontMetrics().xHeight), y;
  if (a.isStretchy)
    y = Le(a, e), y = U({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: s
      }, {
        type: "elem",
        elem: y,
        wrapperClasses: ["svg-align"],
        wrapperStyle: h > 0 ? {
          width: "calc(100% - " + z(2 * h) + ")",
          marginLeft: z(2 * h)
        } : void 0
      }]
    });
  else {
    var x, M;
    a.label === "\\vec" ? (x = oa("vec", e), M = la.vec[1]) : (x = Fe({
      type: "textord",
      mode: a.mode,
      text: a.label
    }, e), x = H1(x), x.italic = 0, M = x.width, v && (b += x.depth)), y = k(["accent-body"], [x]);
    var T = a.label === "\\textcircled";
    T && (y.classes.push("accent-full"), b = s.height);
    var C = h;
    T || (C -= M / 2), y.style.left = z(C), a.label === "\\textcircled" && (y.style.top = ".2em"), y = U({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: s
      }, {
        type: "kern",
        size: -b
      }, {
        type: "elem",
        elem: y
      }]
    });
  }
  var q = k(["mord", "katex-accent"], [y], e);
  return n ? (n.children[0] = q, n.height = Math.max(q.height, n.height), n.classes[0] = "mord", n) : q;
}, bn = (r, e) => {
  var t = r.isStretchy ? He(r.label) : new A("mo", [g0(r.label, r.mode)]), a = new A("mover", [X(r.base, e), t]);
  return a.setAttribute("accent", "true"), a;
}, yn = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((r) => "\\" + r).join("|"));
B({
  type: "accent",
  names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
  numArgs: 1,
  handler: (r, e) => {
    var t = fe(e[0]), a = !yn.test(r.funcName), n = !a || r.funcName === "\\widehat" || r.funcName === "\\widetilde" || r.funcName === "\\widecheck";
    return {
      type: "accent",
      mode: r.parser.mode,
      label: r.funcName,
      isStretchy: a,
      isShifty: n,
      base: t
    };
  },
  htmlBuilder: va,
  mathmlBuilder: bn
});
B({
  type: "accent",
  names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"],
  numArgs: 1,
  allowedInText: !0,
  allowedInMath: !0,
  // unless in strict mode
  argTypes: ["primitive"],
  handler: (r, e) => {
    var t = e[0], a = r.parser.mode;
    return a === "math" && (r.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + r.funcName + " works only in text mode"), a = "text"), {
      type: "accent",
      mode: a,
      label: r.funcName,
      isStretchy: !1,
      isShifty: !0,
      base: t
    };
  }
});
B({
  type: "accentUnder",
  names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
  numArgs: 1,
  handler: (r, e) => {
    var t = r.parser, a = r.funcName, n = e[0];
    return {
      type: "accentUnder",
      mode: t.mode,
      label: a,
      base: n
    };
  },
  htmlBuilder: (r, e) => {
    var t = V(r.base, e), a = Le(r, e), n = r.label === "\\utilde" ? 0.12 : 0, s = U({
      positionType: "top",
      positionData: t.height,
      children: [{
        type: "elem",
        elem: a,
        wrapperClasses: ["svg-align"]
      }, {
        type: "kern",
        size: n
      }, {
        type: "elem",
        elem: t
      }]
    });
    return k(["mord", "accentunder"], [s], e);
  },
  mathmlBuilder: (r, e) => {
    var t = He(r.label), a = new A("munder", [X(r.base, e), t]);
    return a.setAttribute("accentunder", "true"), a;
  }
});
var Te = (r) => {
  var e = new A("mpadded", r ? [r] : []);
  return e.setAttribute("width", "+0.6em"), e.setAttribute("lspace", "0.3em"), e;
};
B({
  type: "xArrow",
  names: [
    "\\xleftarrow",
    "\\xrightarrow",
    "\\xLeftarrow",
    "\\xRightarrow",
    "\\xleftrightarrow",
    "\\xLeftrightarrow",
    "\\xhookleftarrow",
    "\\xhookrightarrow",
    "\\xmapsto",
    "\\xrightharpoondown",
    "\\xrightharpoonup",
    "\\xleftharpoondown",
    "\\xleftharpoonup",
    "\\xrightleftharpoons",
    "\\xleftrightharpoons",
    "\\xlongequal",
    "\\xtwoheadrightarrow",
    "\\xtwoheadleftarrow",
    "\\xtofrom",
    // The next 3 functions are here to support the mhchem extension.
    // Direct use of these functions is discouraged and may break someday.
    "\\xrightleftarrows",
    "\\xrightequilibrium",
    "\\xleftequilibrium",
    // The next 3 functions are here only to support the {CD} environment.
    "\\\\cdrightarrow",
    "\\\\cdleftarrow",
    "\\\\cdlongequal"
  ],
  numArgs: 1,
  numOptionalArgs: 1,
  handler(r, e, t) {
    var a = r.parser, n = r.funcName;
    return {
      type: "xArrow",
      mode: a.mode,
      label: n,
      body: e[0],
      below: t[0]
    };
  },
  htmlBuilder(r, e) {
    var t = e.style, a = e.havingStyle(t.sup()), n = ne(V(r.body, a, e), e), s = r.label.slice(0, 2) === "\\x" ? "x" : "cd";
    n.classes.push(s + "-arrow-pad");
    var o;
    r.below && (a = e.havingStyle(t.sub()), o = ne(V(r.below, a, e), e), o.classes.push(s + "-arrow-pad"));
    var h = Le(r, e), m = -e.fontMetrics().axisHeight + 0.5 * h.height, d = -e.fontMetrics().axisHeight - 0.5 * h.height - 0.111;
    (n.depth > 0.25 || r.label === "\\xleftequilibrium") && (d -= n.depth);
    var v;
    if (o) {
      var b = -e.fontMetrics().axisHeight + o.height + 0.5 * h.height + 0.111;
      v = U({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: n,
          shift: d
        }, {
          type: "elem",
          elem: h,
          shift: m,
          wrapperClasses: ["svg-align"]
        }, {
          type: "elem",
          elem: o,
          shift: b
        }]
      });
    } else
      v = U({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: n,
          shift: d
        }, {
          type: "elem",
          elem: h,
          shift: m,
          wrapperClasses: ["svg-align"]
        }]
      });
    return k(["mrel", "x-arrow"], [v], e);
  },
  mathmlBuilder(r, e) {
    var t = He(r.label);
    t.setAttribute("minsize", r.label.charAt(0) === "x" ? "1.75em" : "3.0em");
    var a;
    if (r.body) {
      var n = Te(X(r.body, e));
      if (r.below) {
        var s = Te(X(r.below, e));
        a = new A("munderover", [t, s, n]);
      } else
        a = new A("mover", [t, n]);
    } else if (r.below) {
      var o = Te(X(r.below, e));
      a = new A("munder", [t, o]);
    } else
      a = Te(), a = new A("mover", [t, a]);
    return a;
  }
});
function xn(r, e) {
  var t = n0(r.body, e, !0);
  return k([r.mclass], t, e);
}
function wn(r, e) {
  var t, a = p0(r.body, e);
  return r.mclass === "minner" ? t = new A("mpadded", a) : r.mclass === "mord" ? r.isCharacterBox ? (t = a[0], t.type = "mi") : t = new A("mi", a) : (r.isCharacterBox ? (t = a[0], t.type = "mo") : t = new A("mo", a), r.mclass === "mbin" ? (t.attributes.lspace = "0.22em", t.attributes.rspace = "0.22em") : r.mclass === "mpunct" ? (t.attributes.lspace = "0em", t.attributes.rspace = "0.17em") : (r.mclass === "mopen" || r.mclass === "mclose") && (t.attributes.lspace = "0em", t.attributes.rspace = "0em")), t;
}
B({
  type: "mclass",
  names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
  numArgs: 1,
  primitive: !0,
  handler(r, e) {
    var t = r.parser, a = r.funcName, n = e[0];
    return {
      type: "mclass",
      mode: t.mode,
      mclass: "m" + a.slice(5),
      body: _(n),
      isCharacterBox: q0(n)
    };
  },
  htmlBuilder: xn,
  mathmlBuilder: wn
});
var Ue = (r) => {
  var e = r.type === "ordgroup" && r.body.length ? r.body[0] : r;
  return e.type === "atom" && (e.family === "bin" || e.family === "rel") ? "m" + e.family : "mord";
};
B({
  type: "mclass",
  names: ["\\@binrel"],
  numArgs: 2,
  handler(r, e) {
    var t = r.parser;
    return {
      type: "mclass",
      mode: t.mode,
      mclass: Ue(e[0]),
      body: _(e[1]),
      isCharacterBox: q0(e[1])
    };
  }
});
B({
  type: "mclass",
  names: ["\\stackrel", "\\overset", "\\underset"],
  numArgs: 2,
  handler(r, e) {
    var t = r.parser, a = r.funcName, n = e[1], s = e[0], o;
    a !== "\\stackrel" ? o = Ue(n) : o = "mrel";
    var h = {
      type: "op",
      mode: n.mode,
      limits: !0,
      alwaysHandleSupSub: !0,
      parentIsSupSub: !1,
      symbol: !1,
      suppressBaseShift: a !== "\\stackrel",
      body: _(n)
    }, m = a === "\\underset" ? {
      type: "supsub",
      mode: s.mode,
      base: h,
      sub: s
    } : {
      type: "supsub",
      mode: s.mode,
      base: h,
      sup: s
    };
    return {
      type: "mclass",
      mode: t.mode,
      mclass: o,
      body: [m],
      isCharacterBox: q0(m)
    };
  }
});
B({
  type: "pmb",
  names: ["\\pmb"],
  numArgs: 1,
  allowedInText: !0,
  handler(r, e) {
    var t = r.parser;
    return {
      type: "pmb",
      mode: t.mode,
      mclass: Ue(e[0]),
      body: _(e[0])
    };
  },
  htmlBuilder(r, e) {
    var t = n0(r.body, e, !0), a = k([r.mclass], t, e);
    return a.style.textShadow = "0.02em 0.01em 0.04px", a;
  },
  mathmlBuilder(r, e) {
    var t = p0(r.body, e), a = new A("mstyle", t);
    return a.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"), a;
  }
});
var kn = {
  ">": "\\\\cdrightarrow",
  "<": "\\\\cdleftarrow",
  "=": "\\\\cdlongequal",
  A: "\\uparrow",
  V: "\\downarrow",
  "|": "\\Vert",
  ".": "no arrow"
}, Tr = () => ({
  type: "styling",
  body: [],
  mode: "math",
  style: "display",
  resetFont: !0
}), Cr = (r) => r.type === "textord" && r.text === "@", Sn = (r, e) => (r.type === "mathord" || r.type === "atom") && r.text === e;
function An(r, e, t) {
  var a = kn[r];
  switch (a) {
    case "\\\\cdrightarrow":
    case "\\\\cdleftarrow":
      return t.callFunction(a, [e[0]], [e[1]]);
    case "\\uparrow":
    case "\\downarrow": {
      var n = t.callFunction("\\\\cdleft", [e[0]], []), s = {
        type: "atom",
        text: a,
        mode: "math",
        family: "rel"
      }, o = t.callFunction("\\Big", [s], []), h = t.callFunction("\\\\cdright", [e[1]], []), m = {
        type: "ordgroup",
        mode: "math",
        body: [n, o, h]
      };
      return t.callFunction("\\\\cdparent", [m], []);
    }
    case "\\\\cdlongequal":
      return t.callFunction("\\\\cdlongequal", [], []);
    case "\\Vert": {
      var d = {
        type: "textord",
        text: "\\Vert",
        mode: "math"
      };
      return t.callFunction("\\Big", [d], []);
    }
    default:
      return {
        type: "textord",
        text: " ",
        mode: "math"
      };
  }
}
function zn(r) {
  var e = [];
  for (r.gullet.beginGroup(), r.gullet.macros.set("\\cr", "\\\\\\relax"), r.gullet.beginGroup(); ; ) {
    e.push(r.parseExpression(!1, "\\\\")), r.gullet.endGroup(), r.gullet.beginGroup();
    var t = r.fetch().text;
    if (t === "&" || t === "\\\\")
      r.consume();
    else if (t === "\\end") {
      e[e.length - 1].length === 0 && e.pop();
      break;
    } else
      throw new S("Expected \\\\ or \\cr or \\end", r.nextToken);
  }
  for (var a = [], n = [a], s = 0; s < e.length; s++) {
    for (var o = e[s], h = Tr(), m = 0; m < o.length; m++)
      if (!Cr(o[m]))
        h.body.push(o[m]);
      else {
        a.push(h), m += 1;
        var d = Pe(o[m]).text, v = new Array(2);
        if (v[0] = {
          type: "ordgroup",
          mode: "math",
          body: []
        }, v[1] = {
          type: "ordgroup",
          mode: "math",
          body: []
        }, !"=|.".includes(d)) if ("<>AV".includes(d))
          for (var b = 0; b < 2; b++) {
            for (var y = !0, x = m + 1; x < o.length; x++) {
              if (Sn(o[x], d)) {
                y = !1, m = x;
                break;
              }
              if (Cr(o[x]))
                throw new S("Missing a " + d + " character to complete a CD arrow.", o[x]);
              v[b].body.push(o[x]);
            }
            if (y)
              throw new S("Missing a " + d + " character to complete a CD arrow.", o[m]);
          }
        else
          throw new S('Expected one of "<>AV=|." after @', o[m]);
        var M = An(d, v, r), T = {
          type: "styling",
          body: [M],
          mode: "math",
          style: "display",
          // CD is always displaystyle.
          resetFont: !0
        };
        a.push(T), h = Tr();
      }
    s % 2 === 0 ? a.push(h) : a.shift(), a = [], n.push(a);
  }
  r.gullet.endGroup(), r.gullet.endGroup();
  var C = new Array(n[0].length).fill({
    type: "align",
    align: "c",
    pregap: 0.25,
    // CD package sets \enskip between columns.
    postgap: 0.25
    // So pre and post each get half an \enskip, i.e. 0.25em.
  });
  return {
    type: "array",
    mode: "math",
    body: n,
    arraystretch: 1,
    addJot: !0,
    rowGaps: [null],
    cols: C,
    colSeparationType: "CD",
    hLinesBeforeRow: new Array(n.length + 1).fill([])
  };
}
B({
  type: "cdlabel",
  names: ["\\\\cdleft", "\\\\cdright"],
  numArgs: 1,
  handler(r, e) {
    var t = r.parser, a = r.funcName;
    return {
      type: "cdlabel",
      mode: t.mode,
      side: a.slice(4),
      label: e[0]
    };
  },
  htmlBuilder(r, e) {
    var t = e.havingStyle(e.style.sup()), a = ne(V(r.label, t, e), e);
    return a.classes.push("cd-label-" + r.side), a.style.bottom = z(0.8 - a.depth), a.height = 0, a.depth = 0, a;
  },
  mathmlBuilder(r, e) {
    var t = new A("mrow", [X(r.label, e)]);
    return t = new A("mpadded", [t]), t.setAttribute("width", "0"), r.side === "left" && t.setAttribute("lspace", "-1width"), t.setAttribute("voffset", "0.7em"), t = new A("mstyle", [t]), t.setAttribute("displaystyle", "false"), t.setAttribute("scriptlevel", "1"), t;
  }
});
B({
  type: "cdlabelparent",
  names: ["\\\\cdparent"],
  numArgs: 1,
  handler(r, e) {
    var t = r.parser;
    return {
      type: "cdlabelparent",
      mode: t.mode,
      fragment: e[0]
    };
  },
  htmlBuilder(r, e) {
    var t = ne(V(r.fragment, e), e);
    return t.classes.push("cd-vert-arrow"), t;
  },
  mathmlBuilder(r, e) {
    return new A("mrow", [X(r.fragment, e)]);
  }
});
B({
  type: "textord",
  names: ["\\@char"],
  numArgs: 1,
  allowedInText: !0,
  handler(r, e) {
    var t = r.parser, a = H(e[0], "ordgroup"), n = Pt(a, "\\@char has non-numeric argument"), s = parseInt(n), o;
    if (isNaN(s))
      throw new S("\\@char has non-numeric argument " + n);
    if (s < 0 || s >= 1114111)
      throw new S("\\@char with invalid code point " + n);
    return s <= 65535 ? o = String.fromCharCode(s) : (s -= 65536, o = String.fromCharCode((s >> 10) + 55296, (s & 1023) + 56320)), {
      type: "textord",
      mode: t.mode,
      text: o
    };
  }
});
var Mn = (r, e) => {
  var t = n0(r.body, e.withColor(r.color), !1);
  return N0(t);
}, Tn = (r, e) => {
  var t = p0(r.body, e.withColor(r.color)), a = new A("mstyle", t);
  return a.setAttribute("mathcolor", r.color), a;
};
B({
  type: "color",
  names: ["\\textcolor"],
  numArgs: 2,
  allowedInText: !0,
  argTypes: ["color", "original"],
  handler(r, e) {
    var t = r.parser, a = H(e[0], "color-token").color, n = e[1];
    return {
      type: "color",
      mode: t.mode,
      color: a,
      body: _(n)
    };
  },
  htmlBuilder: Mn,
  mathmlBuilder: Tn
});
B({
  type: "color",
  names: ["\\color"],
  numArgs: 1,
  allowedInText: !0,
  argTypes: ["color"],
  handler(r, e) {
    var t = r.parser, a = r.breakOnTokenText, n = H(e[0], "color-token").color;
    t.gullet.macros.set("\\current@color", n);
    var s = t.parseExpression(!0, a);
    return {
      type: "color",
      mode: t.mode,
      color: n,
      body: s
    };
  }
});
B({
  type: "cr",
  names: ["\\\\"],
  numArgs: 0,
  numOptionalArgs: 0,
  allowedInText: !0,
  handler(r, e, t) {
    var a = r.parser, n = a.gullet.future().text === "[" ? a.parseSizeGroup(!0) : null, s = !a.settings.displayMode || !a.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
    return {
      type: "cr",
      mode: a.mode,
      newLine: s,
      size: n && H(n, "size").value
    };
  },
  // The following builders are called only at the top level,
  // not within tabular/array environments.
  htmlBuilder(r, e) {
    var t = k(["mspace"], [], e);
    return r.newLine && (t.classes.push("katex-newline"), r.size && (t.style.marginTop = z(J(r.size, e)))), t;
  },
  mathmlBuilder(r, e) {
    var t = new A("mspace");
    return r.newLine && (t.setAttribute("linebreak", "newline"), r.size && t.setAttribute("height", z(J(r.size, e)))), t;
  }
});
var zt = {
  "\\global": "\\global",
  "\\long": "\\\\globallong",
  "\\\\globallong": "\\\\globallong",
  "\\def": "\\gdef",
  "\\gdef": "\\gdef",
  "\\edef": "\\xdef",
  "\\xdef": "\\xdef",
  "\\let": "\\\\globallet",
  "\\futurelet": "\\\\globalfuture"
}, ga = (r) => {
  var e = r.text;
  if (/^(?:[\\{}$&#^_]|EOF)$/.test(e))
    throw new S("Expected a control sequence", r);
  return e;
}, Cn = (r) => {
  var e = r.gullet.popToken();
  return e.text === "=" && (e = r.gullet.popToken(), e.text === " " && (e = r.gullet.popToken())), e;
}, ba = (r, e, t, a) => {
  var n = r.gullet.macros.get(t.text);
  n == null && (t.noexpand = !0, n = {
    tokens: [t],
    numArgs: 0,
    // reproduce the same behavior in expansion
    unexpandable: !r.gullet.isExpandable(t.text)
  }), r.gullet.macros.set(e, n, a);
};
B({
  type: "internal",
  names: [
    "\\global",
    "\\long",
    "\\\\globallong"
    // can’t be entered directly
  ],
  numArgs: 0,
  allowedInText: !0,
  handler(r) {
    var e = r.parser, t = r.funcName;
    e.consumeSpaces();
    var a = e.fetch();
    if (zt[a.text])
      return (t === "\\global" || t === "\\\\globallong") && (a.text = zt[a.text]), H(e.parseFunction(), "internal");
    throw new S("Invalid token after macro prefix", a);
  }
});
B({
  type: "internal",
  names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
  numArgs: 0,
  allowedInText: !0,
  primitive: !0,
  handler(r) {
    var e = r.parser, t = r.funcName, a = e.gullet.popToken(), n = a.text;
    if (/^(?:[\\{}$&#^_]|EOF)$/.test(n))
      throw new S("Expected a control sequence", a);
    for (var s = 0, o, h = [[]]; e.gullet.future().text !== "{"; )
      if (a = e.gullet.popToken(), a.text === "#") {
        if (e.gullet.future().text === "{") {
          o = e.gullet.future(), h[s].push("{");
          break;
        }
        if (a = e.gullet.popToken(), !/^[1-9]$/.test(a.text))
          throw new S('Invalid argument number "' + a.text + '"');
        if (parseInt(a.text) !== s + 1)
          throw new S('Argument number "' + a.text + '" out of order');
        s++, h.push([]);
      } else {
        if (a.text === "EOF")
          throw new S("Expected a macro definition");
        h[s].push(a.text);
      }
    var m = e.gullet.consumeArg(), d = m.tokens;
    return o && d.unshift(o), (t === "\\edef" || t === "\\xdef") && (d = e.gullet.expandTokens(d), d.reverse()), e.gullet.macros.set(n, {
      tokens: d,
      numArgs: s,
      delimiters: h
    }, t === zt[t]), {
      type: "internal",
      mode: e.mode
    };
  }
});
B({
  type: "internal",
  names: [
    "\\let",
    "\\\\globallet"
    // can’t be entered directly
  ],
  numArgs: 0,
  allowedInText: !0,
  primitive: !0,
  handler(r) {
    var e = r.parser, t = r.funcName, a = ga(e.gullet.popToken());
    e.gullet.consumeSpaces();
    var n = Cn(e);
    return ba(e, a, n, t === "\\\\globallet"), {
      type: "internal",
      mode: e.mode
    };
  }
});
B({
  type: "internal",
  names: [
    "\\futurelet",
    "\\\\globalfuture"
    // can’t be entered directly
  ],
  numArgs: 0,
  allowedInText: !0,
  primitive: !0,
  handler(r) {
    var e = r.parser, t = r.funcName, a = ga(e.gullet.popToken()), n = e.gullet.popToken(), s = e.gullet.popToken();
    return ba(e, a, s, t === "\\\\globalfuture"), e.gullet.pushToken(s), e.gullet.pushToken(n), {
      type: "internal",
      mode: e.mode
    };
  }
});
var ue = function(e, t, a) {
  var n = W.math[e] && W.math[e].replace, s = It(n || e, t, a);
  if (!s)
    throw new Error("Unsupported symbol " + e + " and font size " + t + ".");
  return s;
}, Gt = function(e, t, a, n) {
  var s = a.havingBaseStyle(t), o = k(n.concat(s.sizingClasses(a)), [e], a), h = s.sizeMultiplier / a.sizeMultiplier;
  return o.height *= h, o.depth *= h, o.maxFontSize = s.sizeMultiplier, o;
}, ya = function(e, t, a) {
  var n = t.havingBaseStyle(a), s = (1 - t.sizeMultiplier / n.sizeMultiplier) * t.fontMetrics().axisHeight;
  e.classes.push("delimcenter"), e.style.top = z(s), e.height -= s, e.depth += s;
}, Bn = function(e, t, a, n, s, o) {
  var h = l0(e, "Main-Regular", s, n), m = Gt(h, t, n, o);
  return ya(m, n, t), m;
}, Dn = function(e, t, a, n) {
  return l0(e, "Size" + t + "-Regular", a, n);
}, xa = function(e, t, a, n, s, o) {
  var h = Dn(e, t, s, n), m = Gt(k(["delimsizing", "size" + t], [h], n), I.TEXT, n, o);
  return a && ya(m, n, I.TEXT), m;
}, at = function(e, t, a) {
  var n;
  t === "Size1-Regular" ? n = "delim-size1" : n = "delim-size4";
  var s = k(["delimsizinginner", n], [k([], [l0(e, t, a)])]);
  return {
    type: "elem",
    elem: s
  };
}, nt = function(e, t, a) {
  var n = k0["Size4-Regular"][e.charCodeAt(0)] ? k0["Size4-Regular"][e.charCodeAt(0)][4] : k0["Size1-Regular"][e.charCodeAt(0)][4], s = new G0("inner", q1(e, Math.round(1e3 * t))), o = new D0([s], {
    width: z(n),
    height: z(t),
    // Override CSS rule `.katex svg { width: 100% }`
    style: "width:" + z(n),
    viewBox: "0 0 " + 1e3 * n + " " + Math.round(1e3 * t),
    preserveAspectRatio: "xMinYMin"
  }), h = U0([], [o], a);
  return h.height = t, h.style.height = z(t), h.style.width = z(n), {
    type: "elem",
    elem: h
  };
}, Mt = 8e-3, Ce = {
  type: "kern",
  size: -1 * Mt
}, qn = /* @__PURE__ */ new Set(["|", "\\lvert", "\\rvert", "\\vert"]), Rn = /* @__PURE__ */ new Set(["\\|", "\\lVert", "\\rVert", "\\Vert"]), wa = function(e, t, a, n, s, o) {
  var h, m, d, v, b = "", y = 0;
  h = d = v = e, m = null;
  var x = "Size1-Regular";
  e === "\\uparrow" ? d = v = "⏐" : e === "\\Uparrow" ? d = v = "‖" : e === "\\downarrow" ? h = d = "⏐" : e === "\\Downarrow" ? h = d = "‖" : e === "\\updownarrow" ? (h = "\\uparrow", d = "⏐", v = "\\downarrow") : e === "\\Updownarrow" ? (h = "\\Uparrow", d = "‖", v = "\\Downarrow") : qn.has(e) ? (d = "∣", b = "vert", y = 333) : Rn.has(e) ? (d = "∥", b = "doublevert", y = 556) : e === "[" || e === "\\lbrack" ? (h = "⎡", d = "⎢", v = "⎣", x = "Size4-Regular", b = "lbrack", y = 667) : e === "]" || e === "\\rbrack" ? (h = "⎤", d = "⎥", v = "⎦", x = "Size4-Regular", b = "rbrack", y = 667) : e === "\\lfloor" || e === "⌊" ? (d = h = "⎢", v = "⎣", x = "Size4-Regular", b = "lfloor", y = 667) : e === "\\lceil" || e === "⌈" ? (h = "⎡", d = v = "⎢", x = "Size4-Regular", b = "lceil", y = 667) : e === "\\rfloor" || e === "⌋" ? (d = h = "⎥", v = "⎦", x = "Size4-Regular", b = "rfloor", y = 667) : e === "\\rceil" || e === "⌉" ? (h = "⎤", d = v = "⎥", x = "Size4-Regular", b = "rceil", y = 667) : e === "(" || e === "\\lparen" ? (h = "⎛", d = "⎜", v = "⎝", x = "Size4-Regular", b = "lparen", y = 875) : e === ")" || e === "\\rparen" ? (h = "⎞", d = "⎟", v = "⎠", x = "Size4-Regular", b = "rparen", y = 875) : e === "\\{" || e === "\\lbrace" ? (h = "⎧", m = "⎨", v = "⎩", d = "⎪", x = "Size4-Regular") : e === "\\}" || e === "\\rbrace" ? (h = "⎫", m = "⎬", v = "⎭", d = "⎪", x = "Size4-Regular") : e === "\\lgroup" || e === "⟮" ? (h = "⎧", v = "⎩", d = "⎪", x = "Size4-Regular") : e === "\\rgroup" || e === "⟯" ? (h = "⎫", v = "⎭", d = "⎪", x = "Size4-Regular") : e === "\\lmoustache" || e === "⎰" ? (h = "⎧", v = "⎭", d = "⎪", x = "Size4-Regular") : (e === "\\rmoustache" || e === "⎱") && (h = "⎫", v = "⎩", d = "⎪", x = "Size4-Regular");
  var M = ue(h, x, s), T = M.height + M.depth, C = ue(d, x, s), q = C.height + C.depth, R = ue(v, x, s), O = R.height + R.depth, F = 0, P = 1;
  if (m !== null) {
    var L = ue(m, x, s);
    F = L.height + L.depth, P = 2;
  }
  var G = T + O + F, $ = Math.max(0, Math.ceil((t - G) / (P * q))), j = G + $ * P * q, Z = n.fontMetrics().axisHeight;
  a && (Z *= n.sizeMultiplier);
  var c0 = j / 2 - Z, r0 = [];
  if (b.length > 0) {
    var M0 = j - T - O, x0 = Math.round(j * 1e3), b0 = R1(b, Math.round(M0 * 1e3)), E0 = new G0(b, b0), K0 = z(y / 1e3), J0 = z(x0 / 1e3), We = new D0([E0], {
      width: K0,
      height: J0,
      viewBox: "0 0 " + y + " " + x0
    }), I0 = U0([], [We], n);
    I0.height = x0 / 1e3, I0.style.width = K0, I0.style.height = J0, r0.push({
      type: "elem",
      elem: I0
    });
  } else {
    if (r0.push(at(v, x, s)), r0.push(Ce), m === null) {
      var O0 = j - T - O + 2 * Mt;
      r0.push(nt(d, O0, n));
    } else {
      var oe = (j - T - O - F) / 2 + 2 * Mt;
      r0.push(nt(d, oe, n)), r0.push(Ce), r0.push(at(m, x, s)), r0.push(Ce), r0.push(nt(d, oe, n));
    }
    r0.push(Ce), r0.push(at(h, x, s));
  }
  var y0 = n.havingBaseStyle(I.TEXT), ge = U({
    positionType: "bottom",
    positionData: c0,
    children: r0
  });
  return Gt(k(["delimsizing", "mult"], [ge], y0), I.TEXT, n, o);
}, it = 80, st = 0.08, lt = function(e, t, a, n, s) {
  var o = D1(e, n, a), h = new G0(e, o), m = new D0([h], {
    // Note: 1000:1 ratio of viewBox to document em width.
    width: "400em",
    height: z(t),
    viewBox: "0 0 400000 " + a,
    preserveAspectRatio: "xMinYMin slice"
  });
  return U0(["hide-tail"], [m], s);
}, Nn = function(e, t) {
  var a = t.havingBaseSizing(), n = Ma("\\surd", e * a.sizeMultiplier, za, a), s = a.sizeMultiplier, o = Math.max(0, t.minRuleThickness - t.fontMetrics().sqrtRuleThickness), h, m, d, v, b;
  return n.type === "small" ? (v = 1e3 + 1e3 * o + it, e < 1 ? s = 1 : e < 1.4 && (s = 0.7), m = (1 + o + st) / s, d = (1 + o) / s, h = lt("sqrtMain", m, v, o, t), h.style.minWidth = "0.853em", b = 0.833 / s) : n.type === "large" ? (v = (1e3 + it) * he[n.size], d = (he[n.size] + o) / s, m = (he[n.size] + o + st) / s, h = lt("sqrtSize" + n.size, m, v, o, t), h.style.minWidth = "1.02em", b = 1 / s) : (m = e + o + st, d = e + o, v = Math.floor(1e3 * e + o) + it, h = lt("sqrtTall", m, v, o, t), h.style.minWidth = "0.742em", b = 1.056), h.height = d, h.style.height = z(m), {
    span: h,
    advanceWidth: b,
    // Calculate the actual line width.
    // This actually should depend on the chosen font -- e.g. \boldmath
    // should use the thicker surd symbols from e.g. KaTeX_Main-Bold, and
    // have thicker rules.
    ruleWidth: (t.fontMetrics().sqrtRuleThickness + o) * s
  };
}, ka = /* @__PURE__ */ new Set(["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "\\surd"]), En = /* @__PURE__ */ new Set(["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱"]), Sa = /* @__PURE__ */ new Set(["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"]), he = [0, 1.2, 1.8, 2.4, 3], Aa = function(e, t, a, n, s) {
  if (e === "<" || e === "\\lt" || e === "⟨" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle"), ka.has(e) || Sa.has(e))
    return xa(e, t, !1, a, n, s);
  if (En.has(e))
    return wa(e, he[t], !1, a, n, s);
  throw new S("Illegal delimiter: '" + e + "'");
}, In = [{
  type: "small",
  style: I.SCRIPTSCRIPT
}, {
  type: "small",
  style: I.SCRIPT
}, {
  type: "small",
  style: I.TEXT
}, {
  type: "large",
  size: 1
}, {
  type: "large",
  size: 2
}, {
  type: "large",
  size: 3
}, {
  type: "large",
  size: 4
}], On = [{
  type: "small",
  style: I.SCRIPTSCRIPT
}, {
  type: "small",
  style: I.SCRIPT
}, {
  type: "small",
  style: I.TEXT
}, {
  type: "stack"
}], za = [{
  type: "small",
  style: I.SCRIPTSCRIPT
}, {
  type: "small",
  style: I.SCRIPT
}, {
  type: "small",
  style: I.TEXT
}, {
  type: "large",
  size: 1
}, {
  type: "large",
  size: 2
}, {
  type: "large",
  size: 3
}, {
  type: "large",
  size: 4
}, {
  type: "stack"
}], Fn = function(e) {
  if (e.type === "small")
    return "Main-Regular";
  if (e.type === "large")
    return "Size" + e.size + "-Regular";
  if (e.type === "stack")
    return "Size4-Regular";
  var t = e.type;
  throw new Error("Add support for delim type '" + t + "' here.");
}, Ma = function(e, t, a, n) {
  for (var s = Math.min(2, 3 - n.style.size), o = s; o < a.length; o++) {
    var h = a[o];
    if (h.type === "stack")
      break;
    var m = ue(e, Fn(h), "math"), d = m.height + m.depth;
    if (h.type === "small") {
      var v = n.havingBaseStyle(h.style);
      d *= v.sizeMultiplier;
    }
    if (d > t)
      return h;
  }
  return a[a.length - 1];
}, Tt = function(e, t, a, n, s, o) {
  e === "<" || e === "\\lt" || e === "⟨" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle");
  var h;
  Sa.has(e) ? h = In : ka.has(e) ? h = za : h = On;
  var m = Ma(e, t, h, n);
  return m.type === "small" ? Bn(e, m.style, a, n, s, o) : m.type === "large" ? xa(e, m.size, a, n, s, o) : wa(e, t, a, n, s, o);
}, ot = function(e, t, a, n, s, o) {
  var h = n.fontMetrics().axisHeight * n.sizeMultiplier, m = 901, d = 5 / n.fontMetrics().ptPerEm, v = Math.max(t - h, a + h), b = Math.max(
    // In real TeX, calculations are done using integral values which are
    // 65536 per pt, or 655360 per em. So, the division here truncates in
    // TeX but doesn't here, producing different results. If we wanted to
    // exactly match TeX's calculation, we could do
    //   Math.floor(655360 * maxDistFromAxis / 500) *
    //    delimiterFactor / 655360
    // (To see the difference, compare
    //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
    // in TeX and KaTeX)
    v / 500 * m,
    2 * v - d
  );
  return Tt(e, b, !0, n, s, o);
}, Br = {
  "\\bigl": {
    mclass: "mopen",
    size: 1
  },
  "\\Bigl": {
    mclass: "mopen",
    size: 2
  },
  "\\biggl": {
    mclass: "mopen",
    size: 3
  },
  "\\Biggl": {
    mclass: "mopen",
    size: 4
  },
  "\\bigr": {
    mclass: "mclose",
    size: 1
  },
  "\\Bigr": {
    mclass: "mclose",
    size: 2
  },
  "\\biggr": {
    mclass: "mclose",
    size: 3
  },
  "\\Biggr": {
    mclass: "mclose",
    size: 4
  },
  "\\bigm": {
    mclass: "mrel",
    size: 1
  },
  "\\Bigm": {
    mclass: "mrel",
    size: 2
  },
  "\\biggm": {
    mclass: "mrel",
    size: 3
  },
  "\\Biggm": {
    mclass: "mrel",
    size: 4
  },
  "\\big": {
    mclass: "mord",
    size: 1
  },
  "\\Big": {
    mclass: "mord",
    size: 2
  },
  "\\bigg": {
    mclass: "mord",
    size: 3
  },
  "\\Bigg": {
    mclass: "mord",
    size: 4
  }
}, Hn = /* @__PURE__ */ new Set(["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "<", ">", "\\langle", "⟨", "\\rangle", "⟩", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."]);
function Dr(r) {
  return "isMiddle" in r;
}
function Ve(r, e) {
  var t = Ge(r);
  if (t && Hn.has(t.text))
    return t;
  throw t ? new S("Invalid delimiter '" + t.text + "' after '" + e.funcName + "'", r) : new S("Invalid delimiter type '" + r.type + "'", r);
}
B({
  type: "delimsizing",
  names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
  numArgs: 1,
  argTypes: ["primitive"],
  handler: (r, e) => {
    var t = Ve(fe(e[0]), r);
    return {
      type: "delimsizing",
      mode: r.parser.mode,
      size: Br[r.funcName].size,
      mclass: Br[r.funcName].mclass,
      delim: t.text
    };
  },
  htmlBuilder: (r, e) => r.delim === "." ? k([r.mclass]) : Aa(r.delim, r.size, e, r.mode, [r.mclass]),
  mathmlBuilder: (r) => {
    var e = [];
    r.delim !== "." && e.push(g0(r.delim, r.mode));
    var t = new A("mo", e);
    r.mclass === "mopen" || r.mclass === "mclose" ? t.setAttribute("fence", "true") : t.setAttribute("fence", "false"), t.setAttribute("stretchy", "true");
    var a = z(he[r.size]);
    return t.setAttribute("minsize", a), t.setAttribute("maxsize", a), t;
  }
});
function qr(r) {
  if (!r.body)
    throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
B({
  type: "leftright-right",
  names: ["\\right"],
  numArgs: 1,
  primitive: !0,
  handler: (r, e) => {
    var t = r.parser.gullet.macros.get("\\current@color");
    if (t && typeof t != "string")
      throw new S("\\current@color set to non-string in \\right");
    return {
      type: "leftright-right",
      mode: r.parser.mode,
      delim: Ve(e[0], r).text,
      color: t
      // undefined if not set via \color
    };
  }
});
B({
  type: "leftright",
  names: ["\\left"],
  numArgs: 1,
  primitive: !0,
  handler: (r, e) => {
    var t = Ve(e[0], r), a = r.parser;
    ++a.leftrightDepth;
    var n = a.parseExpression(!1);
    --a.leftrightDepth, a.expect("\\right", !1);
    var s = H(a.parseFunction(), "leftright-right");
    return {
      type: "leftright",
      mode: a.mode,
      body: n,
      left: t.text,
      right: s.delim,
      rightColor: s.color
    };
  },
  htmlBuilder: (r, e) => {
    qr(r);
    for (var t = n0(r.body, e, !0, ["mopen", "mclose"]), a = 0, n = 0, s = !1, o = 0; o < t.length; o++) {
      var h = t[o];
      Dr(h) ? s = !0 : (a = Math.max(t[o].height, a), n = Math.max(t[o].depth, n));
    }
    a *= e.sizeMultiplier, n *= e.sizeMultiplier;
    var m;
    if (r.left === "." ? m = pe(e, ["mopen"]) : m = ot(r.left, a, n, e, r.mode, ["mopen"]), t.unshift(m), s)
      for (var d = 1; d < t.length; d++) {
        var v = t[d];
        if (Dr(v)) {
          var b = v.isMiddle;
          t[d] = ot(b.delim, a, n, b.options, r.mode, []);
        }
      }
    var y;
    if (r.right === ".")
      y = pe(e, ["mclose"]);
    else {
      var x = r.rightColor ? e.withColor(r.rightColor) : e;
      y = ot(r.right, a, n, x, r.mode, ["mclose"]);
    }
    return t.push(y), k(["minner"], t, e);
  },
  mathmlBuilder: (r, e) => {
    qr(r);
    var t = p0(r.body, e);
    if (r.left !== ".") {
      var a = new A("mo", [g0(r.left, r.mode)]);
      a.setAttribute("fence", "true"), t.unshift(a);
    }
    if (r.right !== ".") {
      var n = new A("mo", [g0(r.right, r.mode)]);
      n.setAttribute("fence", "true"), r.rightColor && n.setAttribute("mathcolor", r.rightColor), t.push(n);
    }
    return Ht(t);
  }
});
B({
  type: "middle",
  names: ["\\middle"],
  numArgs: 1,
  primitive: !0,
  handler: (r, e) => {
    var t = Ve(e[0], r);
    if (!r.parser.leftrightDepth)
      throw new S("\\middle without preceding \\left", t);
    return {
      type: "middle",
      mode: r.parser.mode,
      delim: t.text
    };
  },
  htmlBuilder: (r, e) => {
    var t;
    return r.delim === "." ? t = pe(e, []) : (t = Aa(r.delim, 1, e, r.mode, []), t.isMiddle = {
      delim: r.delim,
      options: e
    }), t;
  },
  mathmlBuilder: (r, e) => {
    var t = r.delim === "\\vert" || r.delim === "|" ? g0("|", "text") : g0(r.delim, r.mode), a = new A("mo", [t]);
    return a.setAttribute("fence", "true"), a.setAttribute("lspace", "0.05em"), a.setAttribute("rspace", "0.05em"), a;
  }
});
var Ln = (r, e) => {
  var t = ne(V(r.body, e), e), a = r.label.slice(1), n = e.sizeMultiplier, s, o, h = q0(r.body);
  if (a === "sout")
    s = k(["katex-stretchy", "katex-sout"]), s.height = e.fontMetrics().defaultRuleThickness / n, o = -0.5 * e.fontMetrics().xHeight;
  else if (a === "phase") {
    var m = J({
      number: 0.6,
      unit: "pt"
    }, e), d = J({
      number: 0.35,
      unit: "ex"
    }, e), v = e.havingBaseSizing();
    n = n / v.sizeMultiplier;
    var b = t.height + t.depth + m + d;
    t.style.paddingLeft = z(b / 2 + m);
    var y = Math.floor(1e3 * b * n), x = C1(y), M = new D0([new G0("phase", x)], {
      width: "400em",
      height: z(y / 1e3),
      viewBox: "0 0 400000 " + y,
      preserveAspectRatio: "xMinYMin slice"
    });
    s = U0(["hide-tail"], [M], e), s.style.height = z(b), o = t.depth + m + d;
  } else {
    /cancel/.test(a) ? h || t.classes.push("cancel-pad") : a === "angl" ? t.classes.push("anglpad") : t.classes.push("boxpad");
    var T, C, q = 0;
    /box/.test(a) ? (q = Math.max(
      e.fontMetrics().fboxrule,
      // default
      e.minRuleThickness
    ), T = e.fontMetrics().fboxsep + (a === "colorbox" ? 0 : q), C = T) : a === "angl" ? (q = Math.max(e.fontMetrics().defaultRuleThickness, e.minRuleThickness), T = 4 * q, C = Math.max(0, 0.25 - t.depth)) : (T = h ? 0.2 : 0, C = T), s = mn(t, a, T, C, e), /fbox|boxed|fcolorbox/.test(a) ? (s.style.borderStyle = "solid", s.style.borderWidth = z(q)) : a === "angl" && q !== 0.049 && (s.style.borderTopWidth = z(q), s.style.borderRightWidth = z(q)), o = t.depth + C, r.backgroundColor && (s.style.backgroundColor = r.backgroundColor, r.borderColor && (s.style.borderColor = r.borderColor));
  }
  var R;
  if (r.backgroundColor)
    R = U({
      positionType: "individualShift",
      children: [
        // Put the color background behind inner;
        {
          type: "elem",
          elem: s,
          shift: o
        },
        {
          type: "elem",
          elem: t,
          shift: 0
        }
      ]
    });
  else {
    var O = /cancel|phase/.test(a) ? ["svg-align"] : [];
    R = U({
      positionType: "individualShift",
      children: [
        // Write the \cancel stroke on top of inner.
        {
          type: "elem",
          elem: t,
          shift: 0
        },
        {
          type: "elem",
          elem: s,
          shift: o,
          wrapperClasses: O
        }
      ]
    });
  }
  return /cancel/.test(a) && (R.height = t.height, R.depth = t.depth), /cancel/.test(a) && !h ? k(["mord", "cancel-lap"], [R], e) : k(["mord"], [R], e);
}, Pn = (r, e) => {
  var t, a = new A(r.label.includes("colorbox") ? "mpadded" : "menclose", [X(r.body, e)]);
  switch (r.label) {
    case "\\cancel":
      a.setAttribute("notation", "updiagonalstrike");
      break;
    case "\\bcancel":
      a.setAttribute("notation", "downdiagonalstrike");
      break;
    case "\\phase":
      a.setAttribute("notation", "phasorangle");
      break;
    case "\\sout":
      a.setAttribute("notation", "horizontalstrike");
      break;
    case "\\fbox":
      a.setAttribute("notation", "box");
      break;
    case "\\angl":
      a.setAttribute("notation", "actuarial");
      break;
    case "\\fcolorbox":
    case "\\colorbox":
      if (t = e.fontMetrics().fboxsep * e.fontMetrics().ptPerEm, a.setAttribute("width", "+" + 2 * t + "pt"), a.setAttribute("height", "+" + 2 * t + "pt"), a.setAttribute("lspace", t + "pt"), a.setAttribute("voffset", t + "pt"), r.label === "\\fcolorbox") {
        var n = Math.max(
          e.fontMetrics().fboxrule,
          // default
          e.minRuleThickness
        );
        a.setAttribute("style", "border: " + z(n) + " solid " + r.borderColor);
      }
      break;
    case "\\xcancel":
      a.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
      break;
  }
  return r.backgroundColor && a.setAttribute("mathbackground", r.backgroundColor), a;
};
B({
  type: "enclose",
  names: ["\\colorbox"],
  numArgs: 2,
  allowedInText: !0,
  argTypes: ["color", "hbox"],
  handler(r, e, t) {
    var a = r.parser, n = r.funcName, s = H(e[0], "color-token").color, o = e[1];
    return {
      type: "enclose",
      mode: a.mode,
      label: n,
      backgroundColor: s,
      body: o
    };
  },
  htmlBuilder: Ln,
  mathmlBuilder: Pn
});
B({
  type: "enclose",
  names: ["\\fcolorbox"],
  numArgs: 3,
  allowedInText: !0,
  argTypes: ["color", "color", "hbox"],
  handler(r, e, t) {
    var a = r.parser, n = r.funcName, s = H(e[0], "color-token").color, o = H(e[1], "color-token").color, h = e[2];
    return {
      type: "enclose",
      mode: a.mode,
      label: n,
      backgroundColor: o,
      borderColor: s,
      body: h
    };
  }
});
B({
  type: "enclose",
  names: ["\\fbox"],
  numArgs: 1,
  argTypes: ["hbox"],
  allowedInText: !0,
  handler(r, e) {
    var t = r.parser;
    return {
      type: "enclose",
      mode: t.mode,
      label: "\\fbox",
      body: e[0]
    };
  }
});
B({
  type: "enclose",
  names: ["\\cancel", "\\bcancel", "\\xcancel", "\\phase"],
  numArgs: 1,
  handler(r, e) {
    var t = r.parser, a = r.funcName, n = e[0];
    return {
      type: "enclose",
      mode: t.mode,
      label: a,
      body: n
    };
  }
});
B({
  type: "enclose",
  names: ["\\sout"],
  numArgs: 1,
  allowedInText: !0,
  handler(r, e) {
    var t = r.parser, a = r.funcName;
    t.mode === "math" && t.settings.reportNonstrict("mathVsSout", "LaTeX's \\sout works only in text mode");
    var n = e[0];
    return {
      type: "enclose",
      mode: t.mode,
      label: a,
      body: n
    };
  }
});
B({
  type: "enclose",
  names: ["\\angl"],
  numArgs: 1,
  argTypes: ["hbox"],
  allowedInText: !1,
  handler(r, e) {
    var t = r.parser;
    return {
      type: "enclose",
      mode: t.mode,
      label: "\\angl",
      body: e[0]
    };
  }
});
var Ta = {};
function S0(r) {
  for (var e = r.type, t = r.names, a = r.props, n = r.handler, s = r.htmlBuilder, o = r.mathmlBuilder, h = {
    type: e,
    numArgs: a.numArgs || 0,
    allowedInText: !1,
    numOptionalArgs: 0,
    handler: n
  }, m = 0; m < t.length; ++m)
    Ta[t[m]] = h;
  s && (me[e] = s), o && (de[e] = o);
}
var Ca = {};
function c(r, e) {
  Ca[r] = e;
}
class h0 {
  // End offset, zero-based exclusive.
  constructor(e, t, a) {
    this.lexer = void 0, this.start = void 0, this.end = void 0, this.lexer = e, this.start = t, this.end = a;
  }
  /**
   * Merges two `SourceLocation`s from location providers, given they are
   * provided in order of appearance.
   * - Returns the first one's location if only the first is provided.
   * - Returns a merged range of the first and the last if both are provided
   *   and their lexers match.
   * - Otherwise, returns null.
   */
  static range(e, t) {
    return t ? !e || !e.loc || !t.loc || e.loc.lexer !== t.loc.lexer ? null : new h0(e.loc.lexer, e.loc.start, t.loc.end) : e && e.loc;
  }
}
class m0 {
  // used in \noexpand
  constructor(e, t) {
    this.text = void 0, this.loc = void 0, this.noexpand = void 0, this.treatAsRelax = void 0, this.text = e, this.loc = t;
  }
  /**
   * Given a pair of tokens (this and endToken), compute a `Token` encompassing
   * the whole input range enclosed by these two.
   */
  range(e, t) {
    return new m0(t, h0.range(this, e));
  }
}
function Rr(r) {
  var e = [];
  r.consumeSpaces();
  var t = r.fetch().text;
  for (t === "\\relax" && (r.consume(), r.consumeSpaces(), t = r.fetch().text); t === "\\hline" || t === "\\hdashline"; )
    r.consume(), e.push(t === "\\hdashline"), r.consumeSpaces(), t = r.fetch().text;
  return e;
}
var $e = (r) => {
  var e = r.parser.settings;
  if (!e.displayMode)
    throw new S("{" + r.envName + "} can be used only in display mode.");
}, Gn = /* @__PURE__ */ new Set(["gather", "gather*"]);
function Ut(r) {
  if (!r.includes("ed"))
    return !r.includes("*");
}
function $0(r, e, t) {
  var a = e.hskipBeforeAndAfter, n = e.addJot, s = e.cols, o = e.arraystretch, h = e.colSeparationType, m = e.autoTag, d = e.singleRow, v = e.emptySingleRow, b = e.maxNumCols, y = e.leqno;
  if (r.gullet.beginGroup(), d || r.gullet.macros.set("\\cr", "\\\\\\relax"), !o) {
    var x = r.gullet.expandMacroAsText("\\arraystretch");
    if (x == null)
      o = 1;
    else if (o = parseFloat(x), !o || o < 0)
      throw new S("Invalid \\arraystretch: " + x);
  }
  r.gullet.beginGroup();
  var M = [], T = [M], C = [], q = [], R = m != null ? [] : void 0;
  function O() {
    m && r.gullet.macros.set("\\@eqnsw", "1", !0);
  }
  function F() {
    R && (r.gullet.macros.get("\\df@tag") ? (R.push(r.subparse([new m0("\\df@tag")])), r.gullet.macros.set("\\df@tag", void 0, !0)) : R.push(!!m && r.gullet.macros.get("\\@eqnsw") === "1"));
  }
  for (O(), q.push(Rr(r)); ; ) {
    var P = r.parseExpression(!1, d ? "\\end" : "\\\\");
    r.gullet.endGroup(), r.gullet.beginGroup();
    var L = {
      type: "ordgroup",
      mode: r.mode,
      body: P
    };
    t && (L = {
      type: "styling",
      mode: r.mode,
      style: t,
      resetFont: !0,
      body: [L]
    }), M.push(L);
    var G = r.fetch().text;
    if (G === "&") {
      if (b && M.length === b) {
        if (d || h)
          throw new S("Too many tab characters: &", r.nextToken);
        r.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
      }
      r.consume();
    } else if (G === "\\end") {
      F(), M.length === 1 && L.type === "styling" && L.body.length === 1 && L.body[0].type === "ordgroup" && L.body[0].body.length === 0 && (T.length > 1 || !v) && T.pop(), q.length < T.length + 1 && q.push([]);
      break;
    } else if (G === "\\\\") {
      r.consume();
      var $ = void 0;
      r.gullet.future().text !== " " && ($ = r.parseSizeGroup(!0)), C.push($ ? $.value : null), F(), q.push(Rr(r)), M = [], T.push(M), O();
    } else
      throw new S("Expected & or \\\\ or \\cr or \\end", r.nextToken);
  }
  return r.gullet.endGroup(), r.gullet.endGroup(), {
    type: "array",
    mode: r.mode,
    addJot: n,
    arraystretch: o,
    body: T,
    cols: s,
    rowGaps: C,
    hskipBeforeAndAfter: a,
    hLinesBeforeRow: q,
    colSeparationType: h,
    tags: R,
    leqno: y
  };
}
function Vt(r) {
  return r.slice(0, 1) === "d" ? "display" : "text";
}
var A0 = function(e, t) {
  var a, n, s = e.body.length, o = e.hLinesBeforeRow, h = 0, m = new Array(s), d = [], v = Math.max(
    // From LaTeX \showthe\arrayrulewidth. Equals 0.04 em.
    t.fontMetrics().arrayRuleWidth,
    t.minRuleThickness
  ), b = 1 / t.fontMetrics().ptPerEm, y = 5 * b;
  if (e.colSeparationType && e.colSeparationType === "small") {
    var x = t.havingStyle(I.SCRIPT).sizeMultiplier;
    y = 0.2778 * (x / t.sizeMultiplier);
  }
  var M = e.colSeparationType === "CD" ? J({
    number: 3,
    unit: "ex"
  }, t) : 12 * b, T = 3 * b, C = e.arraystretch * M, q = 0.7 * C, R = 0.3 * C, O = 0;
  function F(we) {
    for (var ke = 0; ke < we.length; ++ke)
      ke > 0 && (O += 0.25), d.push({
        pos: O,
        isDashed: we[ke]
      });
  }
  for (F(o[0]), a = 0; a < e.body.length; ++a) {
    var P = e.body[a], L = q, G = R;
    h < P.length && (h = P.length);
    var $ = {
      cells: new Array(P.length),
      height: 0,
      depth: 0,
      pos: 0
    };
    for (n = 0; n < P.length; ++n) {
      var j = V(P[n], t);
      G < j.depth && (G = j.depth), L < j.height && (L = j.height), $.cells[n] = j;
    }
    var Z = e.rowGaps[a], c0 = 0;
    Z && (c0 = J(Z, t), c0 > 0 && (c0 += R, G < c0 && (G = c0), c0 = 0)), e.addJot && a < e.body.length - 1 && (G += T), $.height = L, $.depth = G, O += L, $.pos = O, O += G + c0, m[a] = $, F(o[a + 1]);
  }
  var r0 = O / 2 + t.fontMetrics().axisHeight, M0 = e.cols || [], x0 = [], b0, E0, K0 = [];
  if (e.tags && e.tags.some((we) => we))
    for (a = 0; a < s; ++a) {
      var J0 = m[a], We = J0.pos - r0, I0 = e.tags[a], O0 = void 0;
      I0 === !0 ? O0 = k(["eqn-num"], [], t) : I0 === !1 ? O0 = k([], [], t) : O0 = k([], n0(I0, t, !0), t), O0.depth = J0.depth, O0.height = J0.height, K0.push({
        type: "elem",
        elem: O0,
        shift: We
      });
    }
  for (
    n = 0, E0 = 0;
    // Continue while either there are more columns or more column
    // descriptions, so trailing separators don't get lost.
    n < h || E0 < M0.length;
    ++n, ++E0
  ) {
    for (var oe, y0 = M0[E0], ge = !0; ((rr = y0) == null ? void 0 : rr.type) === "separator"; ) {
      var rr;
      if (ge || (b0 = k(["arraycolsep"], []), b0.style.width = z(t.fontMetrics().doubleRuleSep), x0.push(b0)), y0.separator === "|" || y0.separator === ":") {
        var Ja = y0.separator === "|" ? "solid" : "dashed", Q0 = k(["vertical-separator"], [], t);
        Q0.style.height = z(O), Q0.style.borderRightWidth = z(v), Q0.style.borderRightStyle = Ja, Q0.style.margin = "0 " + z(-v / 2);
        var ar = O - r0;
        ar && (Q0.style.verticalAlign = z(-ar)), x0.push(Q0);
      } else
        throw new S("Invalid separator type: " + y0.separator);
      E0++, y0 = M0[E0], ge = !1;
    }
    if (!(n >= h)) {
      var _0 = void 0;
      if (n > 0 || e.hskipBeforeAndAfter) {
        var nr, ir;
        _0 = (nr = (ir = y0) == null ? void 0 : ir.pregap) != null ? nr : y, _0 !== 0 && (b0 = k(["arraycolsep"], []), b0.style.width = z(_0), x0.push(b0));
      }
      var sr = [];
      for (a = 0; a < s; ++a) {
        var be = m[a], ye = be.cells[n];
        if (ye) {
          var Qa = be.pos - r0;
          ye.depth = be.depth, ye.height = be.height, sr.push({
            type: "elem",
            elem: ye,
            shift: Qa
          });
        }
      }
      var _a = U({
        positionType: "individualShift",
        children: sr
      }), e1 = k(["col-align-" + (((oe = y0) == null ? void 0 : oe.align) || "c")], [_a]);
      if (x0.push(e1), n < h - 1 || e.hskipBeforeAndAfter) {
        var lr, or;
        _0 = (lr = (or = y0) == null ? void 0 : or.postgap) != null ? lr : y, _0 !== 0 && (b0 = k(["arraycolsep"], []), b0.style.width = z(_0), x0.push(b0));
      }
    }
  }
  var xe = k(["mtable"], x0);
  if (d.length > 0) {
    for (var t1 = ae("katex-hline", t, v), r1 = ae("katex-hdashline", t, v), Ye = [{
      type: "elem",
      elem: xe,
      shift: 0
    }]; d.length > 0; ) {
      var ur = d.pop(), hr = ur.pos - r0;
      ur.isDashed ? Ye.push({
        type: "elem",
        elem: r1,
        shift: hr
      }) : Ye.push({
        type: "elem",
        elem: t1,
        shift: hr
      });
    }
    xe = U({
      positionType: "individualShift",
      children: Ye
    });
  }
  if (K0.length === 0)
    return k(["mord"], [xe], t);
  var a1 = U({
    positionType: "individualShift",
    children: K0
  }), n1 = k(["katex-tag"], [a1], t);
  return N0([xe, n1]);
}, Un = {
  c: "center ",
  l: "left ",
  r: "right "
}, z0 = function(e, t) {
  for (var a = [], n = new A("mtd", [], ["mtr-glue"]), s = new A("mtd", [], ["mml-eqn-num"]), o = 0; o < e.body.length; o++) {
    for (var h = e.body[o], m = [], d = 0; d < h.length; d++)
      m.push(new A("mtd", [X(h[d], t)]));
    e.tags && e.tags[o] && (m.unshift(n), m.push(n), e.leqno ? m.unshift(s) : m.push(s)), a.push(new A("mtr", m));
  }
  var v = new A("mtable", a), b = e.arraystretch === 0.5 ? 0.1 : 0.16 + e.arraystretch - 1 + (e.addJot ? 0.09 : 0);
  v.setAttribute("rowspacing", z(b));
  var y = "", x = "";
  if (e.cols && e.cols.length > 0) {
    var M = e.cols, T = "", C = !1, q = 0, R = M.length;
    M[0].type === "separator" && (y += "top ", q = 1), M[M.length - 1].type === "separator" && (y += "bottom ", R -= 1);
    for (var O = q; O < R; O++) {
      var F = M[O];
      F.type === "align" ? (x += Un[F.align], C && (T += "none "), C = !0) : F.type === "separator" && C && (T += F.separator === "|" ? "solid " : "dashed ", C = !1);
    }
    v.setAttribute("columnalign", x.trim()), /[sd]/.test(T) && v.setAttribute("columnlines", T.trim());
  }
  if (e.colSeparationType === "align") {
    for (var P = e.cols || [], L = "", G = 1; G < P.length; G++)
      L += G % 2 ? "0em " : "1em ";
    v.setAttribute("columnspacing", L.trim());
  } else e.colSeparationType === "alignat" || e.colSeparationType === "gather" ? v.setAttribute("columnspacing", "0em") : e.colSeparationType === "small" ? v.setAttribute("columnspacing", "0.2778em") : e.colSeparationType === "CD" ? v.setAttribute("columnspacing", "0.5em") : v.setAttribute("columnspacing", "1em");
  var $ = "", j = e.hLinesBeforeRow;
  y += j[0].length > 0 ? "left " : "", y += j[j.length - 1].length > 0 ? "right " : "";
  for (var Z = 1; Z < j.length - 1; Z++)
    $ += j[Z].length === 0 ? "none " : j[Z][0] ? "dashed " : "solid ";
  return /[sd]/.test($) && v.setAttribute("rowlines", $.trim()), y !== "" && (v = new A("menclose", [v]), v.setAttribute("notation", y.trim())), e.arraystretch && e.arraystretch < 1 && (v = new A("mstyle", [v]), v.setAttribute("scriptlevel", "1")), v;
}, Ba = function(e, t) {
  e.envName.includes("ed") || $e(e);
  var a = [], n = e.envName === "split", s = $0(e.parser, {
    cols: a,
    addJot: !0,
    autoTag: n ? void 0 : Ut(e.envName),
    emptySingleRow: !0,
    colSeparationType: e.envName.includes("at") ? "alignat" : "align",
    maxNumCols: n ? 2 : void 0,
    leqno: e.parser.settings.leqno
  }, "display"), o = 0, h = 0, m = {
    type: "ordgroup",
    mode: e.mode,
    body: []
  };
  if (t[0] && t[0].type === "ordgroup") {
    var d = "Number of columns should be a positive integer", v = Pt(t[0], d);
    if (!/^[0-9]+$/.test(v) || Number(v) < 1)
      throw new S(d, t[0]);
    o = Number(v), h = o * 2;
  }
  var b = !h;
  s.body.forEach(function(T) {
    for (var C = 1; C < T.length; C += 2) {
      var q = H(T[C], "styling"), R = H(q.body[0], "ordgroup");
      R.body.unshift(m);
    }
    if (b)
      h < T.length && (h = T.length);
    else {
      var O = T.length / 2;
      if (o < O)
        throw new S("Too many math in a row: " + ("expected " + o + ", but got " + O), T[0]);
    }
  });
  for (var y = 0; y < h; ++y) {
    var x = "r", M = 0;
    y % 2 === 1 ? x = "l" : y > 0 && b && (M = 1), a[y] = {
      type: "align",
      align: x,
      pregap: M,
      postgap: 0
    };
  }
  return s.colSeparationType = b ? "align" : "alignat", s;
};
S0({
  type: "array",
  names: ["array", "darray"],
  props: {
    numArgs: 1
  },
  handler(r, e) {
    var t = Ge(e[0]), a = t ? [e[0]] : H(e[0], "ordgroup").body, n = a.map(function(o) {
      var h = Pe(o), m = h.text;
      if ("lcr".includes(m))
        return {
          type: "align",
          align: m
        };
      if (m === "|")
        return {
          type: "separator",
          separator: "|"
        };
      if (m === ":")
        return {
          type: "separator",
          separator: ":"
        };
      throw new S("Unknown column alignment: " + m, o);
    }), s = {
      cols: n,
      hskipBeforeAndAfter: !0,
      // \@preamble in lttab.dtx
      maxNumCols: n.length
    };
    return $0(r.parser, s, Vt(r.envName));
  },
  htmlBuilder: A0,
  mathmlBuilder: z0
});
S0({
  type: "array",
  names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"],
  props: {
    numArgs: 0
  },
  handler(r) {
    var e = {
      matrix: null,
      pmatrix: ["(", ")"],
      bmatrix: ["[", "]"],
      Bmatrix: ["\\{", "\\}"],
      vmatrix: ["|", "|"],
      Vmatrix: ["\\Vert", "\\Vert"]
    }[r.envName.replace("*", "")], t = "c", a = {
      hskipBeforeAndAfter: !1,
      cols: [{
        type: "align",
        align: t
      }]
    };
    if (r.envName.charAt(r.envName.length - 1) === "*") {
      var n = r.parser;
      if (n.consumeSpaces(), n.fetch().text === "[") {
        if (n.consume(), n.consumeSpaces(), t = n.fetch().text, !"lcr".includes(t))
          throw new S("Expected l or c or r", n.nextToken);
        n.consume(), n.consumeSpaces(), n.expect("]"), n.consume(), a.cols = [{
          type: "align",
          align: t
        }];
      }
    }
    var s = $0(r.parser, a, Vt(r.envName)), o = Math.max(0, ...s.body.map((h) => h.length));
    return s.cols = new Array(o).fill({
      type: "align",
      align: t
    }), e ? {
      type: "leftright",
      mode: r.mode,
      body: [s],
      left: e[0],
      right: e[1],
      rightColor: void 0
      // \right uninfluenced by \color in array
    } : s;
  },
  htmlBuilder: A0,
  mathmlBuilder: z0
});
S0({
  type: "array",
  names: ["smallmatrix"],
  props: {
    numArgs: 0
  },
  handler(r) {
    var e = {
      arraystretch: 0.5
    }, t = $0(r.parser, e, "script");
    return t.colSeparationType = "small", t;
  },
  htmlBuilder: A0,
  mathmlBuilder: z0
});
S0({
  type: "array",
  names: ["subarray"],
  props: {
    numArgs: 1
  },
  handler(r, e) {
    var t = Ge(e[0]), a = t ? [e[0]] : H(e[0], "ordgroup").body, n = a.map(function(h) {
      var m = Pe(h), d = m.text;
      if ("lc".includes(d))
        return {
          type: "align",
          align: d
        };
      throw new S("Unknown column alignment: " + d, h);
    });
    if (n.length > 1)
      throw new S("{subarray} can contain only one column");
    var s = {
      cols: n,
      hskipBeforeAndAfter: !1,
      arraystretch: 0.5
    }, o = $0(r.parser, s, "script");
    if (o.body.length > 0 && o.body[0].length > 1)
      throw new S("{subarray} can contain only one column");
    return o;
  },
  htmlBuilder: A0,
  mathmlBuilder: z0
});
S0({
  type: "array",
  names: ["cases", "dcases", "rcases", "drcases"],
  props: {
    numArgs: 0
  },
  handler(r) {
    var e = {
      arraystretch: 1.2,
      cols: [{
        type: "align",
        align: "l",
        pregap: 0,
        // TODO(kevinb) get the current style.
        // For now we use the metrics for TEXT style which is what we were
        // doing before.  Before attempting to get the current style we
        // should look at TeX's behavior especially for \over and matrices.
        postgap: 1
        /* 1em quad */
      }, {
        type: "align",
        align: "l",
        pregap: 0,
        postgap: 0
      }]
    }, t = $0(r.parser, e, Vt(r.envName));
    return {
      type: "leftright",
      mode: r.mode,
      body: [t],
      left: r.envName.includes("r") ? "." : "\\{",
      right: r.envName.includes("r") ? "\\}" : ".",
      rightColor: void 0
    };
  },
  htmlBuilder: A0,
  mathmlBuilder: z0
});
S0({
  type: "array",
  names: ["align", "align*", "aligned", "split"],
  props: {
    numArgs: 0
  },
  handler: Ba,
  htmlBuilder: A0,
  mathmlBuilder: z0
});
S0({
  type: "array",
  names: ["gathered", "gather", "gather*"],
  props: {
    numArgs: 0
  },
  handler(r) {
    Gn.has(r.envName) && $e(r);
    var e = {
      cols: [{
        type: "align",
        align: "c"
      }],
      addJot: !0,
      colSeparationType: "gather",
      autoTag: Ut(r.envName),
      emptySingleRow: !0,
      leqno: r.parser.settings.leqno
    };
    return $0(r.parser, e, "display");
  },
  htmlBuilder: A0,
  mathmlBuilder: z0
});
S0({
  type: "array",
  names: ["alignat", "alignat*", "alignedat"],
  props: {
    numArgs: 1
  },
  handler: Ba,
  htmlBuilder: A0,
  mathmlBuilder: z0
});
S0({
  type: "array",
  names: ["equation", "equation*"],
  props: {
    numArgs: 0
  },
  handler(r) {
    $e(r);
    var e = {
      autoTag: Ut(r.envName),
      emptySingleRow: !0,
      singleRow: !0,
      maxNumCols: 1,
      leqno: r.parser.settings.leqno
    };
    return $0(r.parser, e, "display");
  },
  htmlBuilder: A0,
  mathmlBuilder: z0
});
S0({
  type: "array",
  names: ["CD"],
  props: {
    numArgs: 0
  },
  handler(r) {
    return $e(r), zn(r.parser);
  },
  htmlBuilder: A0,
  mathmlBuilder: z0
});
c("\\nonumber", "\\gdef\\@eqnsw{0}");
c("\\notag", "\\nonumber");
B({
  type: "text",
  // Doesn't matter what this is.
  names: ["\\hline", "\\hdashline"],
  numArgs: 0,
  allowedInText: !0,
  allowedInMath: !0,
  handler(r, e) {
    throw new S(r.funcName + " valid only within array environment");
  }
});
var Nr = Ta;
B({
  type: "environment",
  names: ["\\begin", "\\end"],
  numArgs: 1,
  argTypes: ["text"],
  handler(r, e) {
    var t = r.parser, a = r.funcName, n = e[0];
    if (n.type !== "ordgroup")
      throw new S("Invalid environment name", n);
    var s = Pt(n, "Environment name should contain only text characters and spaces", !0);
    if (a === "\\begin") {
      if (!Object.prototype.hasOwnProperty.call(Nr, s))
        throw new S("No such environment: " + s, n);
      var o = Nr[s], h = t.parseArguments("\\begin{" + s + "}", o), m = h.args, d = h.optArgs, v = {
        mode: t.mode,
        envName: s,
        parser: t
      }, b = o.handler(v, m, d);
      t.expect("\\end", !1);
      var y = t.nextToken, x = H(t.parseFunction(), "environment");
      if (x.name !== s)
        throw new S("Mismatch: \\begin{" + s + "} matched by \\end{" + x.name + "}", y);
      return b;
    }
    return {
      type: "environment",
      mode: t.mode,
      name: s,
      nameGroup: n
    };
  }
});
var Vn = (r, e) => {
  var t = r.font, a = e.withFont(t);
  return V(r.body, a);
}, $n = (r, e) => {
  var t = r.font, a = e.withFont(t);
  return X(r.body, a);
}, Er = {
  "\\Bbb": "\\mathbb",
  "\\bold": "\\mathbf",
  "\\frak": "\\mathfrak"
};
B({
  type: "font",
  names: [
    // styles, except \boldsymbol defined below
    "\\mathrm",
    "\\mathit",
    "\\mathbf",
    "\\mathnormal",
    "\\mathsfit",
    // families
    "\\mathbb",
    "\\mathcal",
    "\\mathfrak",
    "\\mathscr",
    "\\mathsf",
    "\\mathtt",
    // aliases, except \bm defined below
    "\\Bbb",
    "\\bold",
    "\\frak"
  ],
  numArgs: 1,
  allowedInArgument: !0,
  handler: (r, e) => {
    var t = r.parser, a = r.funcName, n = fe(e[0]), s = a in Er ? Er[a] : a;
    return {
      type: "font",
      mode: t.mode,
      font: s.slice(1),
      body: n
    };
  },
  htmlBuilder: Vn,
  mathmlBuilder: $n
});
B({
  type: "mclass",
  names: ["\\boldsymbol", "\\bm"],
  numArgs: 1,
  handler: (r, e) => {
    var t = r.parser, a = e[0];
    return {
      type: "mclass",
      mode: t.mode,
      mclass: Ue(a),
      body: [{
        type: "font",
        mode: t.mode,
        font: "boldsymbol",
        body: a
      }],
      isCharacterBox: q0(a)
    };
  }
});
B({
  type: "font",
  names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
  numArgs: 0,
  allowedInText: !0,
  handler: (r, e) => {
    var t = r.parser, a = r.funcName, n = r.breakOnTokenText, s = t.mode, o = t.parseExpression(!0, n);
    return {
      type: "font",
      mode: s,
      font: "math" + a.slice(1),
      body: {
        type: "ordgroup",
        mode: t.mode,
        body: o
      }
    };
  }
});
var jn = (r, e) => {
  var t = e.style, a = t.fracNum(), n = t.fracDen(), s;
  s = e.havingStyle(a);
  var o = V(r.numer, s, e);
  if (r.continued) {
    var h = 8.5 / e.fontMetrics().ptPerEm, m = 3.5 / e.fontMetrics().ptPerEm;
    o.height = o.height < h ? h : o.height, o.depth = o.depth < m ? m : o.depth;
  }
  s = e.havingStyle(n);
  var d = V(r.denom, s, e), v, b, y;
  r.hasBarLine ? (r.barSize ? (b = J(r.barSize, e), v = ae("frac-line", e, b)) : v = ae("frac-line", e), b = v.height, y = v.height) : (v = null, b = 0, y = e.fontMetrics().defaultRuleThickness);
  var x, M, T;
  t.size === I.DISPLAY.size ? (x = e.fontMetrics().num1, b > 0 ? M = 3 * y : M = 7 * y, T = e.fontMetrics().denom1) : (b > 0 ? (x = e.fontMetrics().num2, M = y) : (x = e.fontMetrics().num3, M = 3 * y), T = e.fontMetrics().denom2);
  var C;
  if (v) {
    var R = e.fontMetrics().axisHeight;
    x - o.depth - (R + 0.5 * b) < M && (x += M - (x - o.depth - (R + 0.5 * b))), R - 0.5 * b - (d.height - T) < M && (T += M - (R - 0.5 * b - (d.height - T)));
    var O = -(R - 0.5 * b);
    C = U({
      positionType: "individualShift",
      children: [{
        type: "elem",
        elem: d,
        shift: T
      }, {
        type: "elem",
        elem: v,
        shift: O
      }, {
        type: "elem",
        elem: o,
        shift: -x
      }]
    });
  } else {
    var q = x - o.depth - (d.height - T);
    q < M && (x += 0.5 * (M - q), T += 0.5 * (M - q)), C = U({
      positionType: "individualShift",
      children: [{
        type: "elem",
        elem: d,
        shift: T
      }, {
        type: "elem",
        elem: o,
        shift: -x
      }]
    });
  }
  s = e.havingStyle(t), C.height *= s.sizeMultiplier / e.sizeMultiplier, C.depth *= s.sizeMultiplier / e.sizeMultiplier;
  var F;
  t.size === I.DISPLAY.size ? F = e.fontMetrics().delim1 : t.size === I.SCRIPTSCRIPT.size ? F = e.havingStyle(I.SCRIPT).fontMetrics().delim2 : F = e.fontMetrics().delim2;
  var P, L;
  return r.leftDelim == null ? P = pe(e, ["mopen"]) : P = Tt(r.leftDelim, F, !0, e.havingStyle(t), r.mode, ["mopen"]), r.continued ? L = k([]) : r.rightDelim == null ? L = pe(e, ["mclose"]) : L = Tt(r.rightDelim, F, !0, e.havingStyle(t), r.mode, ["mclose"]), k(["mord"].concat(s.sizingClasses(e)), [P, k(["mfrac"], [C]), L], e);
}, Xn = (r, e) => {
  var t = new A("mfrac", [X(r.numer, e), X(r.denom, e)]);
  if (!r.hasBarLine)
    t.setAttribute("linethickness", "0px");
  else if (r.barSize) {
    var a = J(r.barSize, e);
    t.setAttribute("linethickness", z(a));
  }
  if (r.leftDelim != null || r.rightDelim != null) {
    var n = [];
    if (r.leftDelim != null) {
      var s = new A("mo", [new e0(r.leftDelim.replace("\\", ""))]);
      s.setAttribute("fence", "true"), n.push(s);
    }
    if (n.push(t), r.rightDelim != null) {
      var o = new A("mo", [new e0(r.rightDelim.replace("\\", ""))]);
      o.setAttribute("fence", "true"), n.push(o);
    }
    return Ht(n);
  }
  return t;
}, Da = (r, e) => {
  if (!e)
    return r;
  var t = {
    type: "styling",
    mode: r.mode,
    style: e,
    body: [r]
  };
  return t;
};
B({
  type: "genfrac",
  names: [
    "\\cfrac",
    "\\dfrac",
    "\\frac",
    "\\tfrac",
    "\\dbinom",
    "\\binom",
    "\\tbinom",
    "\\\\atopfrac",
    // can’t be entered directly
    "\\\\bracefrac",
    "\\\\brackfrac"
    // ditto
  ],
  numArgs: 2,
  allowedInArgument: !0,
  handler: (r, e) => {
    var t = r.parser, a = r.funcName, n = e[0], s = e[1], o, h = null, m = null;
    switch (a) {
      case "\\cfrac":
      case "\\dfrac":
      case "\\frac":
      case "\\tfrac":
        o = !0;
        break;
      case "\\\\atopfrac":
        o = !1;
        break;
      case "\\dbinom":
      case "\\binom":
      case "\\tbinom":
        o = !1, h = "(", m = ")";
        break;
      case "\\\\bracefrac":
        o = !1, h = "\\{", m = "\\}";
        break;
      case "\\\\brackfrac":
        o = !1, h = "[", m = "]";
        break;
      default:
        throw new Error("Unrecognized genfrac command");
    }
    var d = a === "\\cfrac", v = null;
    return d || a.startsWith("\\d") ? v = "display" : a.startsWith("\\t") && (v = "text"), Da({
      type: "genfrac",
      mode: t.mode,
      numer: n,
      denom: s,
      continued: d,
      hasBarLine: o,
      leftDelim: h,
      rightDelim: m,
      barSize: null
    }, v);
  },
  htmlBuilder: jn,
  mathmlBuilder: Xn
});
B({
  type: "infix",
  names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
  numArgs: 0,
  infix: !0,
  handler(r) {
    var e = r.parser, t = r.funcName, a = r.token, n;
    switch (t) {
      case "\\over":
        n = "\\frac";
        break;
      case "\\choose":
        n = "\\binom";
        break;
      case "\\atop":
        n = "\\\\atopfrac";
        break;
      case "\\brace":
        n = "\\\\bracefrac";
        break;
      case "\\brack":
        n = "\\\\brackfrac";
        break;
      default:
        throw new Error("Unrecognized infix genfrac command");
    }
    return {
      type: "infix",
      mode: e.mode,
      replaceWith: n,
      token: a
    };
  }
});
var Ir = ["display", "text", "script", "scriptscript"], Or = function(e) {
  var t = null;
  return e.length > 0 && (t = e, t = t === "." ? null : t), t;
};
B({
  type: "genfrac",
  names: ["\\genfrac"],
  numArgs: 6,
  allowedInArgument: !0,
  argTypes: ["math", "math", "size", "text", "math", "math"],
  handler(r, e) {
    var t = r.parser, a = e[4], n = e[5], s = fe(e[0]), o = s.type === "atom" && s.family === "open" ? Or(s.text) : null, h = fe(e[1]), m = h.type === "atom" && h.family === "close" ? Or(h.text) : null, d = H(e[2], "size"), v, b = null;
    d.isBlank ? v = !0 : (b = d.value, v = b.number > 0);
    var y = null, x = e[3];
    if (x.type === "ordgroup") {
      if (x.body.length > 0) {
        var M = H(x.body[0], "textord");
        y = Ir[Number(M.text)];
      }
    } else
      x = H(x, "textord"), y = Ir[Number(x.text)];
    return Da({
      type: "genfrac",
      mode: t.mode,
      numer: a,
      denom: n,
      continued: !1,
      hasBarLine: v,
      barSize: b,
      leftDelim: o,
      rightDelim: m
    }, y);
  }
});
B({
  type: "infix",
  names: ["\\above"],
  numArgs: 1,
  argTypes: ["size"],
  infix: !0,
  handler(r, e) {
    var t = r.parser;
    r.funcName;
    var a = r.token;
    return {
      type: "infix",
      mode: t.mode,
      replaceWith: "\\\\abovefrac",
      size: H(e[0], "size").value,
      token: a
    };
  }
});
B({
  type: "genfrac",
  names: ["\\\\abovefrac"],
  numArgs: 3,
  argTypes: ["math", "size", "math"],
  handler: (r, e) => {
    var t = r.parser;
    r.funcName;
    var a = e[0], n = H(e[1], "infix").size;
    if (!n)
      throw new Error("\\\\abovefrac expected size, but got " + String(n));
    var s = e[2], o = n.number > 0;
    return {
      type: "genfrac",
      mode: t.mode,
      numer: a,
      denom: s,
      continued: !1,
      hasBarLine: o,
      barSize: n,
      leftDelim: null,
      rightDelim: null
    };
  }
});
var qa = (r, e) => {
  var t = e.style, a, n;
  r.type === "supsub" ? (a = r.sup ? V(r.sup, e.havingStyle(t.sup()), e) : V(r.sub, e.havingStyle(t.sub()), e), n = H(r.base, "horizBrace")) : n = H(r, "horizBrace");
  var s = V(n.base, e.havingBaseStyle(I.DISPLAY)), o = Le(n, e), h;
  if (n.isOver ? h = U({
    positionType: "firstBaseline",
    children: [{
      type: "elem",
      elem: s
    }, {
      type: "kern",
      size: 0.1
    }, {
      type: "elem",
      elem: o,
      wrapperClasses: ["svg-align"]
    }]
  }) : h = U({
    positionType: "bottom",
    positionData: s.depth + 0.1 + o.height,
    children: [{
      type: "elem",
      elem: o,
      wrapperClasses: ["svg-align"]
    }, {
      type: "kern",
      size: 0.1
    }, {
      type: "elem",
      elem: s
    }]
  }), a) {
    var m = k(["minner", n.isOver ? "mover" : "munder"], [h], e);
    n.isOver ? h = U({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: m
      }, {
        type: "kern",
        size: 0.2
      }, {
        type: "elem",
        elem: a
      }]
    }) : h = U({
      positionType: "bottom",
      positionData: m.depth + 0.2 + a.height + a.depth,
      children: [{
        type: "elem",
        elem: a
      }, {
        type: "kern",
        size: 0.2
      }, {
        type: "elem",
        elem: m
      }]
    });
  }
  return k(["minner", n.isOver ? "mover" : "munder"], [h], e);
}, Wn = (r, e) => {
  var t = He(r.label);
  return new A(r.isOver ? "mover" : "munder", [X(r.base, e), t]);
};
B({
  type: "horizBrace",
  names: ["\\overbrace", "\\underbrace", "\\overbracket", "\\underbracket"],
  numArgs: 1,
  handler(r, e) {
    var t = r.parser, a = r.funcName;
    return {
      type: "horizBrace",
      mode: t.mode,
      label: a,
      isOver: a.includes("\\over"),
      base: e[0]
    };
  },
  htmlBuilder: qa,
  mathmlBuilder: Wn
});
B({
  type: "href",
  names: ["\\href"],
  numArgs: 2,
  argTypes: ["url", "original"],
  allowedInText: !0,
  handler: (r, e) => {
    var t = r.parser, a = e[1], n = H(e[0], "url").url;
    return t.settings.isTrusted({
      command: "\\href",
      url: n
    }) ? {
      type: "href",
      mode: t.mode,
      href: n,
      body: _(a)
    } : t.formatUnsupportedCmd("\\href");
  },
  htmlBuilder: (r, e) => {
    var t = n0(r.body, e, !1);
    return Y1(r.href, [], t, e);
  },
  mathmlBuilder: (r, e) => {
    var t = V0(r.body, e);
    return t instanceof A || (t = new A("mrow", [t])), t.setAttribute("href", r.href), t;
  }
});
B({
  type: "href",
  names: ["\\url"],
  numArgs: 1,
  argTypes: ["url"],
  allowedInText: !0,
  handler: (r, e) => {
    var t = r.parser, a = H(e[0], "url").url;
    if (!t.settings.isTrusted({
      command: "\\url",
      url: a
    }))
      return t.formatUnsupportedCmd("\\url");
    for (var n = [], s = 0; s < a.length; s++) {
      var o = a[s];
      o === "~" && (o = "\\textasciitilde"), n.push({
        type: "textord",
        mode: "text",
        text: o
      });
    }
    var h = {
      type: "text",
      mode: t.mode,
      font: "\\texttt",
      body: n
    };
    return {
      type: "href",
      mode: t.mode,
      href: a,
      body: _(h)
    };
  }
});
B({
  type: "hbox",
  names: ["\\hbox"],
  numArgs: 1,
  argTypes: ["text"],
  allowedInText: !0,
  primitive: !0,
  handler(r, e) {
    var t = r.parser;
    return {
      type: "hbox",
      mode: t.mode,
      body: _(e[0])
    };
  },
  htmlBuilder(r, e) {
    var t = n0(r.body, e.withFont(""), !1);
    return N0(t);
  },
  mathmlBuilder(r, e) {
    return new A("mrow", p0(r.body, e.withFont("")));
  }
});
B({
  type: "html",
  names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
  numArgs: 2,
  argTypes: ["raw", "original"],
  allowedInText: !0,
  handler: (r, e) => {
    var t = r.parser, a = r.funcName;
    r.token;
    var n = H(e[0], "raw").string, s = e[1];
    t.settings.strict && t.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
    var o, h = {};
    switch (a) {
      case "\\htmlClass":
        h.class = n, o = {
          command: "\\htmlClass",
          class: n
        };
        break;
      case "\\htmlId":
        h.id = n, o = {
          command: "\\htmlId",
          id: n
        };
        break;
      case "\\htmlStyle":
        h.style = n, o = {
          command: "\\htmlStyle",
          style: n
        };
        break;
      case "\\htmlData": {
        for (var m = "{,}", d = [], v = "", b = 0; b < n.length; b++)
          n.startsWith(m, b) ? (v += ",", b += m.length - 1) : n[b] === "," ? (d.push(v), v = "") : v += n[b];
        d.push(v);
        for (var y = 0; y < d.length; y++) {
          var x = d[y], M = x.indexOf("=");
          if (M < 0)
            throw new S("\\htmlData key/value '" + x + "' missing equals sign");
          var T = x.slice(0, M), C = x.slice(M + 1);
          h["data-" + T.trim()] = C;
        }
        o = {
          command: "\\htmlData",
          attributes: h
        };
        break;
      }
      default:
        throw new Error("Unrecognized html command");
    }
    return t.settings.isTrusted(o) ? {
      type: "html",
      mode: t.mode,
      attributes: h,
      body: _(s)
    } : t.formatUnsupportedCmd(a);
  },
  htmlBuilder: (r, e) => {
    var t = n0(r.body, e, !1), a = ["enclosing"];
    r.attributes.class && a.push(...r.attributes.class.trim().split(/\s+/));
    var n = k(a, t, e);
    for (var s of Object.entries(r.attributes)) {
      var o = s[0], h = s[1];
      o !== "class" && n.setAttribute(o, h);
    }
    return n;
  },
  mathmlBuilder: (r, e) => V0(r.body, e)
});
B({
  type: "htmlmathml",
  names: ["\\html@mathml"],
  numArgs: 2,
  allowedInArgument: !0,
  allowedInText: !0,
  handler: (r, e) => {
    var t = r.parser;
    return {
      type: "htmlmathml",
      mode: t.mode,
      html: _(e[0]),
      mathml: _(e[1])
    };
  },
  htmlBuilder: (r, e) => {
    var t = n0(r.html, e, !1);
    return N0(t);
  },
  mathmlBuilder: (r, e) => V0(r.mathml, e)
});
var ut = function(e) {
  if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e))
    return {
      number: +e,
      unit: "bp"
    };
  var t = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
  if (!t)
    throw new S("Invalid size: '" + e + "' in \\includegraphics");
  var a = {
    number: +(t[1] + t[2]),
    // sign + magnitude, cast to number
    unit: t[3]
  };
  if (!ea(a))
    throw new S("Invalid unit: '" + a.unit + "' in \\includegraphics.");
  return a;
};
B({
  type: "includegraphics",
  names: ["\\includegraphics"],
  numArgs: 1,
  numOptionalArgs: 1,
  argTypes: ["raw", "url"],
  allowedInText: !1,
  handler: (r, e, t) => {
    var a = r.parser, n = {
      number: 0,
      unit: "em"
    }, s = {
      number: 0.9,
      unit: "em"
    }, o = {
      number: 0,
      unit: "em"
    }, h = "";
    if (t[0])
      for (var m = H(t[0], "raw").string, d = m.split(","), v = 0; v < d.length; v++) {
        var b = d[v].split("=");
        if (b.length === 2) {
          var y = b[1].trim();
          switch (b[0].trim()) {
            case "alt":
              h = y;
              break;
            case "width":
              n = ut(y);
              break;
            case "height":
              s = ut(y);
              break;
            case "totalheight":
              o = ut(y);
              break;
            default:
              throw new S("Invalid key: '" + b[0] + "' in \\includegraphics.");
          }
        }
      }
    var x = H(e[0], "url").url;
    return h === "" && (h = x, h = h.replace(/^.*[\\/]/, ""), h = h.substring(0, h.lastIndexOf("."))), a.settings.isTrusted({
      command: "\\includegraphics",
      url: x
    }) ? {
      type: "includegraphics",
      mode: a.mode,
      alt: h,
      width: n,
      height: s,
      totalheight: o,
      src: x
    } : a.formatUnsupportedCmd("\\includegraphics");
  },
  htmlBuilder: (r, e) => {
    var t = J(r.height, e), a = 0;
    r.totalheight.number > 0 && (a = J(r.totalheight, e) - t);
    var n = 0;
    r.width.number > 0 && (n = J(r.width, e));
    var s = {
      height: z(t + a)
    };
    n > 0 && (s.width = z(n)), a > 0 && (s.verticalAlign = z(-a));
    var o = new O1(r.src, r.alt, s);
    return o.height = t, o.depth = a, o;
  },
  mathmlBuilder: (r, e) => {
    var t = new A("mglyph", []);
    t.setAttribute("alt", r.alt);
    var a = J(r.height, e), n = 0;
    if (r.totalheight.number > 0 && (n = J(r.totalheight, e) - a, t.setAttribute("valign", z(-n))), t.setAttribute("height", z(a + n)), r.width.number > 0) {
      var s = J(r.width, e);
      t.setAttribute("width", z(s));
    }
    return t.setAttribute("src", r.src), t;
  }
});
B({
  type: "kern",
  names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
  numArgs: 1,
  argTypes: ["size"],
  primitive: !0,
  allowedInText: !0,
  handler(r, e) {
    var t = r.parser, a = r.funcName, n = H(e[0], "size");
    if (t.settings.strict) {
      var s = a[1] === "m", o = n.value.unit === "mu";
      s ? (o || t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " supports only mu units, " + ("not " + n.value.unit + " units")), t.mode !== "math" && t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " works only in math mode")) : o && t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " doesn't support mu units");
    }
    return {
      type: "kern",
      mode: t.mode,
      dimension: n.value
    };
  },
  htmlBuilder(r, e) {
    return sa(r.dimension, e);
  },
  mathmlBuilder(r, e) {
    var t = J(r.dimension, e);
    return new ma(t);
  }
});
B({
  type: "lap",
  names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
  numArgs: 1,
  allowedInText: !0,
  handler: (r, e) => {
    var t = r.parser, a = r.funcName, n = e[0];
    return {
      type: "lap",
      mode: t.mode,
      alignment: a.slice(5),
      body: n
    };
  },
  htmlBuilder: (r, e) => {
    var t;
    r.alignment === "clap" ? (t = k([], [V(r.body, e)]), t = k(["katex-inner"], [t], e)) : t = k(["katex-inner"], [V(r.body, e)]);
    var a = k(["katex-fix"], []), n = k([r.alignment], [t, a], e), s = k(["katex-strut"]);
    return s.style.height = z(n.height + n.depth), n.depth && (s.style.verticalAlign = z(-n.depth)), n.children.unshift(s), n = k(["katex-thinbox"], [n], e), k(["mord", "katex-vbox"], [n], e);
  },
  mathmlBuilder: (r, e) => {
    var t = new A("mpadded", [X(r.body, e)]);
    if (r.alignment !== "rlap") {
      var a = r.alignment === "llap" ? "-1" : "-0.5";
      t.setAttribute("lspace", a + "width");
    }
    return t.setAttribute("width", "0px"), t;
  }
});
B({
  type: "styling",
  names: ["\\(", "$"],
  numArgs: 0,
  allowedInText: !0,
  allowedInMath: !1,
  handler(r, e) {
    var t = r.funcName, a = r.parser, n = a.mode;
    a.switchMode("math");
    var s = t === "\\(" ? "\\)" : "$", o = a.parseExpression(!1, s);
    return a.expect(s), a.switchMode(n), {
      type: "styling",
      mode: a.mode,
      style: "text",
      resetFont: !0,
      body: o
    };
  }
});
B({
  type: "text",
  // Doesn't matter what this is.
  names: ["\\)", "\\]"],
  numArgs: 0,
  allowedInText: !0,
  allowedInMath: !1,
  handler(r, e) {
    throw new S("Mismatched " + r.funcName);
  }
});
var Fr = (r, e) => {
  switch (e.style.size) {
    case I.DISPLAY.size:
      return r.display;
    case I.TEXT.size:
      return r.text;
    case I.SCRIPT.size:
      return r.script;
    case I.SCRIPTSCRIPT.size:
      return r.scriptscript;
    default:
      return r.text;
  }
};
B({
  type: "mathchoice",
  names: ["\\mathchoice"],
  numArgs: 4,
  primitive: !0,
  handler: (r, e) => {
    var t = r.parser;
    return {
      type: "mathchoice",
      mode: t.mode,
      display: _(e[0]),
      text: _(e[1]),
      script: _(e[2]),
      scriptscript: _(e[3])
    };
  },
  htmlBuilder: (r, e) => {
    var t = Fr(r, e), a = n0(t, e, !1);
    return N0(a);
  },
  mathmlBuilder: (r, e) => {
    var t = Fr(r, e);
    return V0(t, e);
  }
});
var Ra = (r, e, t, a, n, s, o) => {
  r = k([], [r]);
  var h = t && q0(t), m, d;
  if (e) {
    var v = V(e, a.havingStyle(n.sup()), a);
    d = {
      elem: v,
      kern: Math.max(a.fontMetrics().bigOpSpacing1, a.fontMetrics().bigOpSpacing3 - v.depth)
    };
  }
  if (t) {
    var b = V(t, a.havingStyle(n.sub()), a);
    m = {
      elem: b,
      kern: Math.max(a.fontMetrics().bigOpSpacing2, a.fontMetrics().bigOpSpacing4 - b.height)
    };
  }
  var y;
  if (d && m) {
    var x = a.fontMetrics().bigOpSpacing5 + m.elem.height + m.elem.depth + m.kern + r.depth + o;
    y = U({
      positionType: "bottom",
      positionData: x,
      children: [{
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }, {
        type: "elem",
        elem: m.elem,
        marginLeft: z(-s)
      }, {
        type: "kern",
        size: m.kern
      }, {
        type: "elem",
        elem: r
      }, {
        type: "kern",
        size: d.kern
      }, {
        type: "elem",
        elem: d.elem,
        marginLeft: z(s)
      }, {
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }]
    });
  } else if (m) {
    var M = r.height - o;
    y = U({
      positionType: "top",
      positionData: M,
      children: [{
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }, {
        type: "elem",
        elem: m.elem,
        marginLeft: z(-s)
      }, {
        type: "kern",
        size: m.kern
      }, {
        type: "elem",
        elem: r
      }]
    });
  } else if (d) {
    var T = r.depth + o;
    y = U({
      positionType: "bottom",
      positionData: T,
      children: [{
        type: "elem",
        elem: r
      }, {
        type: "kern",
        size: d.kern
      }, {
        type: "elem",
        elem: d.elem,
        marginLeft: z(s)
      }, {
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }]
    });
  } else
    return r;
  var C = [y];
  if (m && s !== 0 && !h) {
    var q = k(["mspace"], [], a);
    q.style.marginRight = z(s), C.unshift(q);
  }
  return k(["mop", "op-limits"], C, a);
}, Na = /* @__PURE__ */ new Set(["\\smallint"]), Ea = (r, e) => {
  var t, a, n = !1, s;
  r.type === "supsub" ? (t = r.sup, a = r.sub, s = H(r.base, "op"), n = !0) : s = H(r, "op");
  var o = e.style, h = !1;
  o.size === I.DISPLAY.size && s.symbol && !Na.has(s.name) && (h = !0);
  var m, d;
  if (s.symbol) {
    var v = h ? "Size2-Regular" : "Size1-Regular", b = "";
    if ((s.name === "\\oiint" || s.name === "\\oiiint") && (b = s.name.slice(1), s.name = b === "oiint" ? "\\iint" : "\\iiint"), m = l0(s.name, v, "math", e, ["mop", "op-symbol", h ? "large-op" : "small-op"]), d = m.italic, b.length > 0) {
      var y = oa(b + "Size" + (h ? "2" : "1"), e);
      m = U({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: m,
          shift: 0
        }, {
          type: "elem",
          elem: y,
          shift: h ? 0.08 : 0
        }]
      }), s.name = "\\" + b, m.classes.unshift("mop"), m.italic = d;
    }
  } else if (s.body) {
    var x = n0(s.body, e, !0);
    x.length === 1 && x[0] instanceof d0 ? (m = x[0], m.classes[0] = "mop") : m = k(["mop"], x, e);
  } else {
    for (var M = [], T = 1; T < s.name.length; T++)
      M.push(Ot(s.name[T], s.mode, e));
    m = k(["mop"], M, e);
  }
  var C = 0, q = 0;
  if ((m instanceof d0 || s.name === "\\oiint" || s.name === "\\oiiint") && !s.suppressBaseShift) {
    var R;
    C = (m.height - m.depth) / 2 - e.fontMetrics().axisHeight, q = (R = m.italic) != null ? R : 0;
  }
  return n ? Ra(m, t, a, e, o, q, C) : (C && (m.style.position = "relative", m.style.top = z(C)), m);
}, Yn = (r, e) => {
  var t;
  if (r.symbol)
    t = new A("mo", [g0(r.name, r.mode)]), Na.has(r.name) && t.setAttribute("largeop", "false");
  else if (r.body)
    t = new A("mo", p0(r.body, e));
  else {
    t = new A("mi", [new e0(r.name.slice(1))]);
    var a = new A("mo", [g0("⁡", "text")]);
    r.parentIsSupSub ? t = new A("mrow", [t, a]) : t = ca([t, a]);
  }
  return t;
}, Zn = {
  "∏": "\\prod",
  "∐": "\\coprod",
  "∑": "\\sum",
  "⋀": "\\bigwedge",
  "⋁": "\\bigvee",
  "⋂": "\\bigcap",
  "⋃": "\\bigcup",
  "⨀": "\\bigodot",
  "⨁": "\\bigoplus",
  "⨂": "\\bigotimes",
  "⨄": "\\biguplus",
  "⨆": "\\bigsqcup"
};
B({
  type: "op",
  names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "∏", "∐", "∑", "⋀", "⋁", "⋂", "⋃", "⨀", "⨁", "⨂", "⨄", "⨆"],
  numArgs: 0,
  handler: (r, e) => {
    var t = r.parser, a = r.funcName, n = a;
    return n.length === 1 && (n = Zn[n]), {
      type: "op",
      mode: t.mode,
      limits: !0,
      parentIsSupSub: !1,
      symbol: !0,
      name: n
    };
  },
  htmlBuilder: Ea,
  mathmlBuilder: Yn
});
B({
  type: "op",
  names: ["\\mathop"],
  numArgs: 1,
  primitive: !0,
  handler: (r, e) => {
    var t = r.parser, a = e[0];
    return {
      type: "op",
      mode: t.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !1,
      body: _(a)
    };
  }
});
var Kn = {
  "∫": "\\int",
  "∬": "\\iint",
  "∭": "\\iiint",
  "∮": "\\oint",
  "∯": "\\oiint",
  "∰": "\\oiiint"
};
B({
  type: "op",
  names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
  numArgs: 0,
  handler(r) {
    var e = r.parser, t = r.funcName;
    return {
      type: "op",
      mode: e.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !1,
      name: t
    };
  }
});
B({
  type: "op",
  names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
  numArgs: 0,
  handler(r) {
    var e = r.parser, t = r.funcName;
    return {
      type: "op",
      mode: e.mode,
      limits: !0,
      parentIsSupSub: !1,
      symbol: !1,
      name: t
    };
  }
});
B({
  type: "op",
  names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "∫", "∬", "∭", "∮", "∯", "∰"],
  numArgs: 0,
  allowedInArgument: !0,
  handler(r) {
    var e = r.parser, t = r.funcName, a = t;
    return a.length === 1 && (a = Kn[a]), {
      type: "op",
      mode: e.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !0,
      name: a
    };
  }
});
var Ia = (r, e) => {
  var t, a, n = !1, s;
  r.type === "supsub" ? (t = r.sup, a = r.sub, s = H(r.base, "operatorname"), n = !0) : s = H(r, "operatorname");
  var o;
  if (s.body.length > 0) {
    for (var h = s.body.map((b) => {
      var y = "text" in b ? b.text : void 0;
      return typeof y == "string" ? {
        type: "textord",
        mode: b.mode,
        text: y
      } : b;
    }), m = n0(h, e.withFont("mathrm"), !0), d = 0; d < m.length; d++) {
      var v = m[d];
      v instanceof d0 && (v.text = v.text.replace(/\u2212/, "-").replace(/\u2217/, "*"));
    }
    o = k(["mop"], m, e);
  } else
    o = k(["mop"], [], e);
  return n ? Ra(o, t, a, e, e.style, 0, 0) : o;
}, Jn = (r, e) => {
  for (var t = p0(r.body, e.withFont("mathrm")), a = !0, n = 0; n < t.length; n++) {
    var s = t[n];
    if (!(s instanceof ma)) if (s instanceof A)
      switch (s.type) {
        case "mi":
        case "mn":
        case "mspace":
        case "mtext":
          break;
        // Do nothing yet.
        case "mo": {
          var o = s.children[0];
          s.children.length === 1 && o instanceof e0 ? o.text = o.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : a = !1;
          break;
        }
        default:
          a = !1;
      }
    else
      a = !1;
  }
  if (a) {
    var h = t.map((v) => v.toText()).join("");
    t = [new e0(h)];
  }
  var m = new A("mi", t);
  m.setAttribute("mathvariant", "normal");
  var d = new A("mo", [g0("⁡", "text")]);
  return r.parentIsSupSub ? new A("mrow", [m, d]) : ca([m, d]);
};
B({
  type: "operatorname",
  names: ["\\operatorname@", "\\operatornamewithlimits"],
  numArgs: 1,
  handler: (r, e) => {
    var t = r.parser, a = r.funcName, n = e[0];
    return {
      type: "operatorname",
      mode: t.mode,
      body: _(n),
      alwaysHandleSupSub: a === "\\operatornamewithlimits",
      limits: !1,
      parentIsSupSub: !1
    };
  },
  htmlBuilder: Ia,
  mathmlBuilder: Jn
});
c("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
Y0({
  type: "ordgroup",
  htmlBuilder(r, e) {
    return r.semisimple ? N0(n0(r.body, e, !1)) : k(["mord"], n0(r.body, e, !0), e);
  },
  mathmlBuilder(r, e) {
    return V0(r.body, e, !0);
  }
});
B({
  type: "overline",
  names: ["\\overline"],
  numArgs: 1,
  handler(r, e) {
    var t = r.parser, a = e[0];
    return {
      type: "overline",
      mode: t.mode,
      body: a
    };
  },
  htmlBuilder(r, e) {
    var t = V(r.body, e.havingCrampedStyle()), a = ae("overline-line", e), n = e.fontMetrics().defaultRuleThickness, s = U({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: t
      }, {
        type: "kern",
        size: 3 * n
      }, {
        type: "elem",
        elem: a
      }, {
        type: "kern",
        size: n
      }]
    });
    return k(["mord", "katex-overline"], [s], e);
  },
  mathmlBuilder(r, e) {
    var t = new A("mo", [new e0("‾")]);
    t.setAttribute("stretchy", "true");
    var a = new A("mover", [X(r.body, e), t]);
    return a.setAttribute("accent", "true"), a;
  }
});
B({
  type: "phantom",
  names: ["\\phantom"],
  numArgs: 1,
  allowedInText: !0,
  handler: (r, e) => {
    var t = r.parser, a = e[0];
    return {
      type: "phantom",
      mode: t.mode,
      body: _(a)
    };
  },
  htmlBuilder: (r, e) => {
    var t = n0(r.body, e.withPhantom(), !1);
    return N0(t);
  },
  mathmlBuilder: (r, e) => {
    var t = p0(r.body, e);
    return new A("mphantom", t);
  }
});
c("\\hphantom", "\\smash{\\phantom{#1}}");
B({
  type: "vphantom",
  names: ["\\vphantom"],
  numArgs: 1,
  allowedInText: !0,
  handler: (r, e) => {
    var t = r.parser, a = e[0];
    return {
      type: "vphantom",
      mode: t.mode,
      body: a
    };
  },
  htmlBuilder: (r, e) => {
    var t = k(["katex-inner"], [V(r.body, e.withPhantom())]), a = k(["katex-fix"], []);
    return k(["mord", "rlap"], [t, a], e);
  },
  mathmlBuilder: (r, e) => {
    var t = p0(_(r.body), e), a = new A("mphantom", t), n = new A("mpadded", [a]);
    return n.setAttribute("width", "0px"), n;
  }
});
B({
  type: "raisebox",
  names: ["\\raisebox"],
  numArgs: 2,
  argTypes: ["size", "hbox"],
  allowedInText: !0,
  handler(r, e) {
    var t = r.parser, a = H(e[0], "size").value, n = e[1];
    return {
      type: "raisebox",
      mode: t.mode,
      dy: a,
      body: n
    };
  },
  htmlBuilder(r, e) {
    var t = V(r.body, e), a = J(r.dy, e);
    return U({
      positionType: "shift",
      positionData: -a,
      children: [{
        type: "elem",
        elem: t
      }]
    });
  },
  mathmlBuilder(r, e) {
    var t = new A("mpadded", [X(r.body, e)]), a = r.dy.number + r.dy.unit;
    return t.setAttribute("voffset", a), t;
  }
});
B({
  type: "internal",
  names: ["\\relax"],
  numArgs: 0,
  allowedInText: !0,
  allowedInArgument: !0,
  handler(r) {
    var e = r.parser;
    return {
      type: "internal",
      mode: e.mode
    };
  }
});
B({
  type: "rule",
  names: ["\\rule"],
  numArgs: 2,
  numOptionalArgs: 1,
  allowedInText: !0,
  allowedInMath: !0,
  argTypes: ["size", "size", "size"],
  handler(r, e, t) {
    var a = r.parser, n = t[0], s = H(e[0], "size"), o = H(e[1], "size");
    return {
      type: "rule",
      mode: a.mode,
      shift: n && H(n, "size").value,
      width: s.value,
      height: o.value
    };
  },
  htmlBuilder(r, e) {
    var t = k(["mord", "katex-rule"], [], e), a = J(r.width, e), n = J(r.height, e), s = r.shift ? J(r.shift, e) : 0;
    return t.style.borderRightWidth = z(a), t.style.borderTopWidth = z(n), t.style.bottom = z(s), t.width = a, t.height = n + s, t.depth = -s, t.maxFontSize = n * 1.125 * e.sizeMultiplier, t;
  },
  mathmlBuilder(r, e) {
    var t = J(r.width, e), a = J(r.height, e), n = r.shift ? J(r.shift, e) : 0, s = e.color && e.getColor() || "black", o = new A("mspace");
    o.setAttribute("mathbackground", s), o.setAttribute("width", z(t)), o.setAttribute("height", z(a));
    var h = new A("mpadded", [o]);
    return n >= 0 ? h.setAttribute("height", z(n)) : (h.setAttribute("height", z(n)), h.setAttribute("depth", z(-n))), h.setAttribute("voffset", z(n)), h;
  }
});
function Oa(r, e, t) {
  for (var a = n0(r, e, !1), n = e.sizeMultiplier / t.sizeMultiplier, s = 0; s < a.length; s++) {
    var o = a[s].classes.indexOf("katex-sizing");
    o < 0 ? Array.prototype.push.apply(a[s].classes, e.sizingClasses(t)) : a[s].classes[o + 1] === "reset-size" + e.size && (a[s].classes[o + 1] = "reset-size" + t.size), a[s].height *= n, a[s].depth *= n;
  }
  return N0(a);
}
var Hr = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], Qn = (r, e) => {
  var t = e.havingSize(r.size);
  return Oa(r.body, t, e);
};
B({
  type: "sizing",
  names: Hr,
  numArgs: 0,
  allowedInText: !0,
  handler: (r, e) => {
    var t = r.breakOnTokenText, a = r.funcName, n = r.parser, s = n.parseExpression(!1, t);
    return {
      type: "sizing",
      mode: n.mode,
      // Figure out what size to use based on the list of functions above
      size: Hr.indexOf(a) + 1,
      body: s
    };
  },
  htmlBuilder: Qn,
  mathmlBuilder: (r, e) => {
    var t = e.havingSize(r.size), a = p0(r.body, t), n = new A("mstyle", a);
    return n.setAttribute("mathsize", z(t.sizeMultiplier)), n;
  }
});
B({
  type: "smash",
  names: ["\\smash"],
  numArgs: 1,
  numOptionalArgs: 1,
  allowedInText: !0,
  handler: (r, e, t) => {
    var a = r.parser, n = !1, s = !1, o = t[0] && H(t[0], "ordgroup");
    if (o)
      for (var h, m = 0; m < o.body.length; ++m) {
        var d = o.body[m];
        if (h = Pe(d).text, h === "t")
          n = !0;
        else if (h === "b")
          s = !0;
        else {
          n = !1, s = !1;
          break;
        }
      }
    else
      n = !0, s = !0;
    var v = e[0];
    return {
      type: "smash",
      mode: a.mode,
      body: v,
      smashHeight: n,
      smashDepth: s
    };
  },
  htmlBuilder: (r, e) => {
    var t = k([], [V(r.body, e)]);
    if (!r.smashHeight && !r.smashDepth)
      return t;
    if (r.smashHeight && (t.height = 0), r.smashDepth && (t.depth = 0), r.smashHeight && r.smashDepth)
      return k(["mord", "katex-smash"], [t], e);
    if (t.children)
      for (var a = 0; a < t.children.length; a++)
        r.smashHeight && (t.children[a].height = 0), r.smashDepth && (t.children[a].depth = 0);
    var n = U({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: t
      }]
    });
    return k(["mord"], [n], e);
  },
  mathmlBuilder: (r, e) => {
    var t = new A("mpadded", [X(r.body, e)]);
    return r.smashHeight && t.setAttribute("height", "0px"), r.smashDepth && t.setAttribute("depth", "0px"), t;
  }
});
B({
  type: "sqrt",
  names: ["\\sqrt"],
  numArgs: 1,
  numOptionalArgs: 1,
  handler(r, e, t) {
    var a = r.parser, n = t[0], s = e[0];
    return {
      type: "sqrt",
      mode: a.mode,
      body: s,
      index: n
    };
  },
  htmlBuilder(r, e) {
    var t = V(r.body, e.havingCrampedStyle());
    t.height === 0 && (t.height = e.fontMetrics().xHeight), t = ne(t, e);
    var a = e.fontMetrics(), n = a.defaultRuleThickness, s = n;
    e.style.id < I.TEXT.id && (s = e.fontMetrics().xHeight);
    var o = n + s / 4, h = t.height + t.depth + o + n, m = Nn(h, e), d = m.span, v = m.ruleWidth, b = m.advanceWidth, y = d.height - v;
    y > t.height + t.depth + o && (o = (o + y - t.height - t.depth) / 2);
    var x = d.height - t.height - o - v;
    t.style.paddingLeft = z(b);
    var M = U({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: t,
        wrapperClasses: ["svg-align"]
      }, {
        type: "kern",
        size: -(t.height + x)
      }, {
        type: "elem",
        elem: d
      }, {
        type: "kern",
        size: v
      }]
    });
    if (r.index) {
      var T = e.havingStyle(I.SCRIPTSCRIPT), C = V(r.index, T, e), q = 0.6 * (M.height - M.depth), R = U({
        positionType: "shift",
        positionData: -q,
        children: [{
          type: "elem",
          elem: C
        }]
      }), O = k(["katex-root"], [R]);
      return k(["mord", "sqrt"], [O, M], e);
    } else
      return k(["mord", "sqrt"], [M], e);
  },
  mathmlBuilder(r, e) {
    var t = r.body, a = r.index;
    return a ? new A("mroot", [X(t, e), X(a, e)]) : new A("msqrt", [X(t, e)]);
  }
});
var Ct = {
  display: I.DISPLAY,
  text: I.TEXT,
  script: I.SCRIPT,
  scriptscript: I.SCRIPTSCRIPT
};
function _n(r) {
  return r in Ct;
}
B({
  type: "styling",
  names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
  numArgs: 0,
  allowedInText: !0,
  primitive: !0,
  handler(r, e) {
    var t = r.breakOnTokenText, a = r.funcName, n = r.parser, s = n.parseExpression(!0, t), o = a.slice(1, a.length - 5);
    if (!_n(o))
      throw new Error("Unknown style: " + o);
    return {
      type: "styling",
      mode: n.mode,
      // Figure out what style to use by pulling out the style from
      // the function name
      style: o,
      body: s
    };
  },
  htmlBuilder(r, e) {
    var t = Ct[r.style], a = e.havingStyle(t);
    return r.resetFont && (a = a.withFont("")), Oa(r.body, a, e);
  },
  mathmlBuilder(r, e) {
    var t = Ct[r.style], a = e.havingStyle(t);
    r.resetFont && (a = a.withFont(""));
    var n = p0(r.body, a), s = new A("mstyle", n), o = {
      display: ["0", "true"],
      text: ["0", "false"],
      script: ["1", "false"],
      scriptscript: ["2", "false"]
    }, h = o[r.style];
    return s.setAttribute("scriptlevel", h[0]), s.setAttribute("displaystyle", h[1]), s;
  }
});
var ei = function(e, t) {
  var a = e.base;
  if (a)
    if (a.type === "op") {
      var n = a.limits && (t.style.size === I.DISPLAY.size || a.alwaysHandleSupSub);
      return n ? Ea : null;
    } else if (a.type === "operatorname") {
      var s = a.alwaysHandleSupSub && (t.style.size === I.DISPLAY.size || a.limits);
      return s ? Ia : null;
    } else {
      if (a.type === "accent")
        return q0(a.base) ? va : null;
      if (a.type === "horizBrace") {
        var o = !e.sub;
        return o === a.isOver ? qa : null;
      } else
        return null;
    }
  else return null;
};
Y0({
  type: "supsub",
  htmlBuilder(r, e) {
    var t = ei(r, e);
    if (t)
      return t(r, e);
    var a = r.base, n = r.sup, s = r.sub, o = V(a, e), h, m, d = e.fontMetrics(), v = 0, b = 0, y = a && q0(a);
    if (n) {
      var x = e.havingStyle(e.style.sup());
      h = V(n, x, e), y || (v = o.height - x.fontMetrics().supDrop * x.sizeMultiplier / e.sizeMultiplier);
    }
    if (s) {
      var M = e.havingStyle(e.style.sub());
      m = V(s, M, e), y || (b = o.depth + M.fontMetrics().subDrop * M.sizeMultiplier / e.sizeMultiplier);
    }
    var T;
    e.style === I.DISPLAY ? T = d.sup1 : e.style.cramped ? T = d.sup3 : T = d.sup2;
    var C = e.sizeMultiplier, q = z(0.5 / d.ptPerEm / C), R = null;
    if (m) {
      var O = r.base && r.base.type === "op" && r.base.name && (r.base.name === "\\oiint" || r.base.name === "\\oiiint");
      if (o instanceof d0 || O) {
        var F;
        R = z(-((F = o.italic) != null ? F : 0));
      }
    }
    var P;
    if (h && m) {
      v = Math.max(v, T, h.depth + 0.25 * d.xHeight), b = Math.max(b, d.sub2);
      var L = d.defaultRuleThickness, G = 4 * L;
      if (v - h.depth - (m.height - b) < G) {
        b = G - (v - h.depth) + m.height;
        var $ = 0.8 * d.xHeight - (v - h.depth);
        $ > 0 && (v += $, b -= $);
      }
      var j = [{
        type: "elem",
        elem: m,
        shift: b,
        marginRight: q,
        marginLeft: R
      }, {
        type: "elem",
        elem: h,
        shift: -v,
        marginRight: q
      }];
      P = U({
        positionType: "individualShift",
        children: j
      });
    } else if (m) {
      b = Math.max(b, d.sub1, m.height - 0.8 * d.xHeight);
      var Z = [{
        type: "elem",
        elem: m,
        marginLeft: R,
        marginRight: q
      }];
      P = U({
        positionType: "shift",
        positionData: b,
        children: Z
      });
    } else if (h)
      v = Math.max(v, T, h.depth + 0.25 * d.xHeight), P = U({
        positionType: "shift",
        positionData: -v,
        children: [{
          type: "elem",
          elem: h,
          marginRight: q
        }]
      });
    else
      throw new Error("supsub must have either sup or sub.");
    var c0 = St(o, "right") || "mord";
    return k([c0], [o, k(["msupsub"], [P])], e);
  },
  mathmlBuilder(r, e) {
    var t = !1, a, n;
    r.base && r.base.type === "horizBrace" && (n = !!r.sup, n === r.base.isOver && (t = !0, a = r.base.isOver)), r.base && (r.base.type === "op" || r.base.type === "operatorname") && (r.base.parentIsSupSub = !0);
    var s = [X(r.base, e)];
    r.sub && s.push(X(r.sub, e)), r.sup && s.push(X(r.sup, e));
    var o;
    if (t)
      o = a ? "mover" : "munder";
    else if (r.sub)
      if (r.sup) {
        var d = r.base;
        d && d.type === "op" && d.limits && e.style === I.DISPLAY || d && d.type === "operatorname" && d.alwaysHandleSupSub && (e.style === I.DISPLAY || d.limits) ? o = "munderover" : o = "msubsup";
      } else {
        var m = r.base;
        m && m.type === "op" && m.limits && (e.style === I.DISPLAY || m.alwaysHandleSupSub) || m && m.type === "operatorname" && m.alwaysHandleSupSub && (m.limits || e.style === I.DISPLAY) ? o = "munder" : o = "msub";
      }
    else {
      var h = r.base;
      h && h.type === "op" && h.limits && (e.style === I.DISPLAY || h.alwaysHandleSupSub) || h && h.type === "operatorname" && h.alwaysHandleSupSub && (h.limits || e.style === I.DISPLAY) ? o = "mover" : o = "msup";
    }
    return new A(o, s);
  }
});
Y0({
  type: "atom",
  htmlBuilder(r, e) {
    return Ot(r.text, r.mode, e, ["m" + r.family]);
  },
  mathmlBuilder(r, e) {
    var t = new A("mo", [g0(r.text, r.mode)]);
    if (r.family === "bin") {
      var a = Lt(r, e);
      a === "bold-italic" && t.setAttribute("mathvariant", a);
    } else r.family === "punct" ? t.setAttribute("separator", "true") : (r.family === "open" || r.family === "close") && t.setAttribute("stretchy", "false");
    return t;
  }
});
var Fa = {
  mi: "italic",
  mn: "normal",
  mtext: "normal"
};
Y0({
  type: "mathord",
  htmlBuilder(r, e) {
    return Fe(r, e);
  },
  mathmlBuilder(r, e) {
    var t = new A("mi", [g0(r.text, r.mode, e)]), a = Lt(r, e) || "italic";
    return a !== Fa[t.type] && t.setAttribute("mathvariant", a), t;
  }
});
Y0({
  type: "textord",
  htmlBuilder(r, e) {
    return Fe(r, e);
  },
  mathmlBuilder(r, e) {
    var t = g0(r.text, r.mode, e), a = Lt(r, e) || "normal", n;
    return r.mode === "text" ? n = new A("mtext", [t]) : /[0-9]/.test(r.text) ? n = new A("mn", [t]) : r.text === "\\prime" ? n = new A("mo", [t]) : n = new A("mi", [t]), a !== Fa[n.type] && n.setAttribute("mathvariant", a), n;
  }
});
var Lr = /* @__PURE__ */ new Map([["\\nobreak", "nobreak"], ["\\allowbreak", "allowbreak"]]), Pr = /* @__PURE__ */ new Map([[" ", {}], ["\\ ", {}], ["~", {
  className: "nobreak"
}], ["\\space", {}], ["\\nobreakspace", {
  className: "nobreak"
}]]);
Y0({
  type: "spacing",
  htmlBuilder(r, e) {
    var t = Pr.get(r.text), a = Lr.get(r.text);
    if (t) {
      var n = t.className || "";
      if (r.mode === "text") {
        var s = Fe(r, e);
        return s.classes.push(n), s;
      } else
        return k(["mspace", n], [Ot(r.text, r.mode, e)], e);
    } else {
      if (a)
        return k(["mspace", a], [], e);
      throw new S('Unknown type of space "' + r.text + '"');
    }
  },
  mathmlBuilder(r, e) {
    var t;
    if (Pr.has(r.text))
      t = new A("mtext", [new e0(" ")]);
    else {
      if (Lr.has(r.text))
        return new A("mspace");
      throw new S('Unknown type of space "' + r.text + '"');
    }
    return t;
  }
});
var Gr = () => {
  var r = new A("mtd", []);
  return r.setAttribute("width", "50%"), r;
};
Y0({
  type: "tag",
  mathmlBuilder(r, e) {
    var t = new A("mtable", [new A("mtr", [Gr(), new A("mtd", [V0(r.body, e)]), Gr(), new A("mtd", [V0(r.tag, e)])])]);
    return t.setAttribute("width", "100%"), t;
  }
});
var Ur = {
  "\\text": void 0,
  "\\textrm": "textrm",
  "\\textsf": "textsf",
  "\\texttt": "texttt",
  "\\textnormal": "textrm"
}, Vr = {
  "\\textbf": "textbf",
  "\\textmd": "textmd"
}, ti = {
  "\\textit": "textit",
  "\\textup": "textup"
}, $r = (r, e) => {
  var t = r.font;
  if (t) {
    if (Ur[t])
      return e.withTextFontFamily(Ur[t]);
    if (Vr[t])
      return e.withTextFontWeight(Vr[t]);
    if (t === "\\emph")
      return e.fontShape === "textit" ? e.withTextFontShape("textup") : e.withTextFontShape("textit");
  } else return e;
  return e.withTextFontShape(ti[t]);
};
B({
  type: "text",
  names: [
    // Font families
    "\\text",
    "\\textrm",
    "\\textsf",
    "\\texttt",
    "\\textnormal",
    // Font weights
    "\\textbf",
    "\\textmd",
    // Font Shapes
    "\\textit",
    "\\textup",
    "\\emph"
  ],
  numArgs: 1,
  argTypes: ["text"],
  allowedInArgument: !0,
  allowedInText: !0,
  handler(r, e) {
    var t = r.parser, a = r.funcName, n = e[0];
    return {
      type: "text",
      mode: t.mode,
      body: _(n),
      font: a
    };
  },
  htmlBuilder(r, e) {
    var t = $r(r, e), a = n0(r.body, t, !0);
    return k(["mord", "text"], a, t);
  },
  mathmlBuilder(r, e) {
    var t = $r(r, e);
    return V0(r.body, t);
  }
});
B({
  type: "underline",
  names: ["\\underline"],
  numArgs: 1,
  allowedInText: !0,
  handler(r, e) {
    var t = r.parser;
    return {
      type: "underline",
      mode: t.mode,
      body: e[0]
    };
  },
  htmlBuilder(r, e) {
    var t = V(r.body, e), a = ae("underline-line", e), n = e.fontMetrics().defaultRuleThickness, s = U({
      positionType: "top",
      positionData: t.height,
      children: [{
        type: "kern",
        size: n
      }, {
        type: "elem",
        elem: a
      }, {
        type: "kern",
        size: 3 * n
      }, {
        type: "elem",
        elem: t
      }]
    });
    return k(["mord", "katex-underline"], [s], e);
  },
  mathmlBuilder(r, e) {
    var t = new A("mo", [new e0("‾")]);
    t.setAttribute("stretchy", "true");
    var a = new A("munder", [X(r.body, e), t]);
    return a.setAttribute("accentunder", "true"), a;
  }
});
B({
  type: "vcenter",
  names: ["\\vcenter"],
  numArgs: 1,
  argTypes: ["original"],
  // In LaTeX, \vcenter can act only on a box.
  allowedInText: !1,
  handler(r, e) {
    var t = r.parser;
    return {
      type: "vcenter",
      mode: t.mode,
      body: e[0]
    };
  },
  htmlBuilder(r, e) {
    var t = V(r.body, e), a = e.fontMetrics().axisHeight, n = 0.5 * (t.height - a - (t.depth + a));
    return U({
      positionType: "shift",
      positionData: n,
      children: [{
        type: "elem",
        elem: t
      }]
    });
  },
  mathmlBuilder(r, e) {
    var t = new A("mpadded", [X(r.body, e)], ["vcenter"]);
    return new A("mrow", [t]);
  }
});
B({
  type: "verb",
  names: ["\\verb"],
  numArgs: 0,
  allowedInText: !0,
  handler(r, e, t) {
    throw new S("\\verb ended by end of line instead of matching delimiter");
  },
  htmlBuilder(r, e) {
    for (var t = jr(r), a = [], n = e.havingStyle(e.style.text()), s = 0; s < t.length; s++) {
      var o = t[s];
      o === "~" && (o = "\\textasciitilde"), a.push(l0(o, "Typewriter-Regular", r.mode, n, ["mord", "texttt"]));
    }
    return k(["mord", "text"].concat(n.sizingClasses(e)), ia(a), n);
  },
  mathmlBuilder(r, e) {
    var t = new e0(jr(r)), a = new A("mtext", [t]);
    return a.setAttribute("mathvariant", "monospace"), a;
  }
});
var jr = (r) => r.body.replace(/ /g, r.star ? "␣" : " "), L0 = ua, Ha = `[ \r
	]`, ri = "\\\\[a-zA-Z@]+", ai = "\\\\[^\uD800-\uDFFF]", ni = "(" + ri + ")" + Ha + "*", ii = `\\\\(
|[ \r	]+
?)[ \r	]*`, Bt = "[̀-ͯ]", si = new RegExp(Bt + "+$"), li = "(" + Ha + "+)|" + // whitespace
(ii + "|") + // \whitespace
"([!-\\[\\]-‧‪-퟿豈-￿]" + // single codepoint
(Bt + "*") + // ...plus accents
"|[\uD800-\uDBFF][\uDC00-\uDFFF]" + // surrogate pair
(Bt + "*") + // ...plus accents
"|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + // \verb unstarred
("|" + ni) + // \macroName + spaces
("|" + ai + ")");
class Xr {
  constructor(e, t) {
    this.input = void 0, this.settings = void 0, this.tokenRegex = void 0, this.catcodes = void 0, this.input = e, this.settings = t, this.tokenRegex = new RegExp(li, "g"), this.catcodes = {
      "%": 14,
      // comment character
      "~": 13
      // active character
    };
  }
  setCatcode(e, t) {
    this.catcodes[e] = t;
  }
  /**
   * This function lexes a single token.
   */
  lex() {
    var e = this.input, t = this.tokenRegex.lastIndex;
    if (t === e.length)
      return new m0("EOF", new h0(this, t, t));
    var a = this.tokenRegex.exec(e);
    if (a === null || a.index !== t)
      throw new S("Unexpected character: '" + e[t] + "'", new m0(e[t], new h0(this, t, t + 1)));
    var n = a[6] || a[3] || (a[2] ? "\\ " : " ");
    if (this.catcodes[n] === 14) {
      var s = e.indexOf(`
`, this.tokenRegex.lastIndex);
      return s === -1 ? (this.tokenRegex.lastIndex = e.length, this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = s + 1, this.lex();
    }
    return new m0(n, new h0(this, t, this.tokenRegex.lastIndex));
  }
}
class oi {
  /**
   * Both arguments are optional.  The first argument is an object of
   * built-in mappings which never change.  The second argument is an object
   * of initial (global-level) mappings, which will constantly change
   * according to any global/top-level `set`s done.
   */
  constructor(e, t) {
    e === void 0 && (e = {}), t === void 0 && (t = {}), this.current = void 0, this.builtins = void 0, this.undefStack = void 0, this.current = t, this.builtins = e, this.undefStack = [];
  }
  /**
   * Start a new nested group, affecting future local `set`s.
   */
  beginGroup() {
    this.undefStack.push({});
  }
  /**
   * End current nested group, restoring values before the group began.
   */
  endGroup() {
    if (this.undefStack.length === 0)
      throw new S("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
    var e = this.undefStack.pop();
    for (var t of Object.keys(e))
      e[t] === void 0 ? delete this.current[t] : this.current[t] = e[t];
  }
  /**
   * Ends all currently nested groups (if any), restoring values before the
   * groups began.  Useful in case of an error in the middle of parsing.
   */
  endGroups() {
    for (; this.undefStack.length > 0; )
      this.endGroup();
  }
  /**
   * Detect whether `name` has a definition.  Equivalent to
   * `get(name) != null`.
   */
  has(e) {
    return Object.prototype.hasOwnProperty.call(this.current, e) || Object.prototype.hasOwnProperty.call(this.builtins, e);
  }
  /**
   * Get the current value of a name, or `undefined` if there is no value.
   *
   * Note: Do not use `if (namespace.get(...))` to detect whether a macro
   * is defined, as the definition may be the empty string which evaluates
   * to `false` in JavaScript.  Use `if (namespace.get(...) != null)` or
   * `if (namespace.has(...))`.
   */
  get(e) {
    return Object.prototype.hasOwnProperty.call(this.current, e) ? this.current[e] : Object.prototype.hasOwnProperty.call(this.builtins, e) ? this.builtins[e] : void 0;
  }
  /**
   * Set the current value of a name, and optionally set it globally too.
   * Local set() sets the current value and (when appropriate) adds an undo
   * operation to the undo stack.  Global set() may change the undo
   * operation at every level, so takes time linear in their number.
   * A value of undefined means to delete existing definitions.
   */
  set(e, t, a) {
    if (a === void 0 && (a = !1), a) {
      for (var n = 0; n < this.undefStack.length; n++)
        delete this.undefStack[n][e];
      this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e] = t);
    } else {
      var s = this.undefStack[this.undefStack.length - 1];
      s && !Object.prototype.hasOwnProperty.call(s, e) && (s[e] = Object.prototype.hasOwnProperty.call(this.current, e) ? this.current[e] : void 0);
    }
    t == null ? delete this.current[e] : this.current[e] = t;
  }
}
var ui = Ca;
c("\\noexpand", function(r) {
  var e = r.popToken();
  return r.isExpandable(e.text) && (e.noexpand = !0, e.treatAsRelax = !0), {
    tokens: [e],
    numArgs: 0
  };
});
c("\\expandafter", function(r) {
  var e = r.popToken();
  return r.expandOnce(!0), {
    tokens: [e],
    numArgs: 0
  };
});
c("\\@firstoftwo", function(r) {
  var e = r.consumeArgs(2);
  return {
    tokens: e[0],
    numArgs: 0
  };
});
c("\\@secondoftwo", function(r) {
  var e = r.consumeArgs(2);
  return {
    tokens: e[1],
    numArgs: 0
  };
});
c("\\@ifnextchar", function(r) {
  var e = r.consumeArgs(3);
  r.consumeSpaces();
  var t = r.future();
  return e[0].length === 1 && e[0][0].text === t.text ? {
    tokens: e[1],
    numArgs: 0
  } : {
    tokens: e[2],
    numArgs: 0
  };
});
c("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
c("\\TextOrMath", function(r) {
  var e = r.consumeArgs(2);
  return r.mode === "text" ? {
    tokens: e[0],
    numArgs: 0
  } : {
    tokens: e[1],
    numArgs: 0
  };
});
var Wr = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
c("\\char", function(r) {
  var e = r.popToken(), t, a = 0;
  if (e.text === "'")
    t = 8, e = r.popToken();
  else if (e.text === '"')
    t = 16, e = r.popToken();
  else if (e.text === "`")
    if (e = r.popToken(), e.text[0] === "\\")
      a = e.text.charCodeAt(1);
    else {
      if (e.text === "EOF")
        throw new S("\\char` missing argument");
      a = e.text.charCodeAt(0);
    }
  else
    t = 10;
  if (t) {
    if (a = Wr[e.text], a == null || a >= t)
      throw new S("Invalid base-" + t + " digit " + e.text);
    for (var n; (n = Wr[r.future().text]) != null && n < t; )
      a *= t, a += n, r.popToken();
  }
  return "\\@char{" + a + "}";
});
var $t = (r, e, t, a) => {
  var n = r.consumeArg().tokens;
  if (n.length !== 1)
    throw new S("\\newcommand's first argument must be a macro name");
  var s = n[0].text, o = r.isDefined(s);
  if (o && !e)
    throw new S("\\newcommand{" + s + "} attempting to redefine " + (s + "; use \\renewcommand"));
  if (!o && !t)
    throw new S("\\renewcommand{" + s + "} when command " + s + " does not yet exist; use \\newcommand");
  var h = 0;
  if (n = r.consumeArg().tokens, n.length === 1 && n[0].text === "[") {
    for (var m = "", d = r.expandNextToken(); d.text !== "]" && d.text !== "EOF"; )
      m += d.text, d = r.expandNextToken();
    if (!m.match(/^\s*[0-9]+\s*$/))
      throw new S("Invalid number of arguments: " + m);
    h = parseInt(m), n = r.consumeArg().tokens;
  }
  return o && a || r.macros.set(s, {
    tokens: n,
    numArgs: h
  }), "";
};
c("\\newcommand", (r) => $t(r, !1, !0, !1));
c("\\renewcommand", (r) => $t(r, !0, !1, !1));
c("\\providecommand", (r) => $t(r, !0, !0, !0));
c("\\message", (r) => {
  var e = r.consumeArgs(1)[0];
  return console.log(e.reverse().map((t) => t.text).join("")), "";
});
c("\\errmessage", (r) => {
  var e = r.consumeArgs(1)[0];
  return console.error(e.reverse().map((t) => t.text).join("")), "";
});
c("\\show", (r) => {
  var e = r.popToken(), t = e.text;
  return console.log(e, r.macros.get(t), L0[t], W.math[t], W.text[t]), "";
});
c("\\bgroup", "{");
c("\\egroup", "}");
c("~", "\\nobreakspace");
c("\\lq", "`");
c("\\rq", "'");
c("\\aa", "\\r a");
c("\\AA", "\\r A");
c("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}");
c("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
c("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}");
c("ℬ", "\\mathscr{B}");
c("ℰ", "\\mathscr{E}");
c("ℱ", "\\mathscr{F}");
c("ℋ", "\\mathscr{H}");
c("ℐ", "\\mathscr{I}");
c("ℒ", "\\mathscr{L}");
c("ℳ", "\\mathscr{M}");
c("ℛ", "\\mathscr{R}");
c("ℭ", "\\mathfrak{C}");
c("ℌ", "\\mathfrak{H}");
c("ℨ", "\\mathfrak{Z}");
c("\\Bbbk", "\\Bbb{k}");
c("\\llap", "\\mathllap{\\textrm{#1}}");
c("\\rlap", "\\mathrlap{\\textrm{#1}}");
c("\\clap", "\\mathclap{\\textrm{#1}}");
c("\\mathstrut", "\\vphantom{(}");
c("\\underbar", "\\underline{\\text{#1}}");
c("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}\\nobreak}{\\char"338}');
c("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}");
c("\\ne", "\\neq");
c("≠", "\\neq");
c("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}");
c("∉", "\\notin");
c("≘", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}");
c("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}");
c("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}");
c("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}");
c("≝", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}");
c("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}");
c("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}");
c("⟂", "\\perp");
c("‼", "\\mathclose{!\\mkern-0.8mu!}");
c("∌", "\\notni");
c("⌜", "\\ulcorner");
c("⌝", "\\urcorner");
c("⌞", "\\llcorner");
c("⌟", "\\lrcorner");
c("©", "\\copyright");
c("®", "\\textregistered");
c("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
c("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
c("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
c("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
c("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
c("⋮", "\\vdots");
c("\\varGamma", "\\mathit{\\Gamma}");
c("\\varDelta", "\\mathit{\\Delta}");
c("\\varTheta", "\\mathit{\\Theta}");
c("\\varLambda", "\\mathit{\\Lambda}");
c("\\varXi", "\\mathit{\\Xi}");
c("\\varPi", "\\mathit{\\Pi}");
c("\\varSigma", "\\mathit{\\Sigma}");
c("\\varUpsilon", "\\mathit{\\Upsilon}");
c("\\varPhi", "\\mathit{\\Phi}");
c("\\varPsi", "\\mathit{\\Psi}");
c("\\varOmega", "\\mathit{\\Omega}");
c("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
c("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
c("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
c("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
c("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
c("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
c("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
c("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
var Yr = {
  ",": "\\dotsc",
  "\\not": "\\dotsb",
  // \keybin@ checks for the following:
  "+": "\\dotsb",
  "=": "\\dotsb",
  "<": "\\dotsb",
  ">": "\\dotsb",
  "-": "\\dotsb",
  "*": "\\dotsb",
  ":": "\\dotsb",
  // Symbols whose definition starts with \DOTSB:
  "\\DOTSB": "\\dotsb",
  "\\coprod": "\\dotsb",
  "\\bigvee": "\\dotsb",
  "\\bigwedge": "\\dotsb",
  "\\biguplus": "\\dotsb",
  "\\bigcap": "\\dotsb",
  "\\bigcup": "\\dotsb",
  "\\prod": "\\dotsb",
  "\\sum": "\\dotsb",
  "\\bigotimes": "\\dotsb",
  "\\bigoplus": "\\dotsb",
  "\\bigodot": "\\dotsb",
  "\\bigsqcup": "\\dotsb",
  "\\And": "\\dotsb",
  "\\longrightarrow": "\\dotsb",
  "\\Longrightarrow": "\\dotsb",
  "\\longleftarrow": "\\dotsb",
  "\\Longleftarrow": "\\dotsb",
  "\\longleftrightarrow": "\\dotsb",
  "\\Longleftrightarrow": "\\dotsb",
  "\\mapsto": "\\dotsb",
  "\\longmapsto": "\\dotsb",
  "\\hookrightarrow": "\\dotsb",
  "\\doteq": "\\dotsb",
  // Symbols whose definition starts with \mathbin:
  "\\mathbin": "\\dotsb",
  // Symbols whose definition starts with \mathrel:
  "\\mathrel": "\\dotsb",
  "\\relbar": "\\dotsb",
  "\\Relbar": "\\dotsb",
  "\\xrightarrow": "\\dotsb",
  "\\xleftarrow": "\\dotsb",
  // Symbols whose definition starts with \DOTSI:
  "\\DOTSI": "\\dotsi",
  "\\int": "\\dotsi",
  "\\oint": "\\dotsi",
  "\\iint": "\\dotsi",
  "\\iiint": "\\dotsi",
  "\\iiiint": "\\dotsi",
  "\\idotsint": "\\dotsi",
  // Symbols whose definition starts with \DOTSX:
  "\\DOTSX": "\\dotsx"
}, hi = /* @__PURE__ */ new Set(["bin", "rel"]);
c("\\dots", function(r) {
  var e = "\\dotso", t = r.expandAfterFuture().text;
  return t in Yr ? e = Yr[t] : (t.slice(0, 4) === "\\not" || t in W.math && hi.has(W.math[t].group)) && (e = "\\dotsb"), e;
});
var jt = {
  // \rightdelim@ checks for the following:
  ")": !0,
  "]": !0,
  "\\rbrack": !0,
  "\\}": !0,
  "\\rbrace": !0,
  "\\rangle": !0,
  "\\rceil": !0,
  "\\rfloor": !0,
  "\\rgroup": !0,
  "\\rmoustache": !0,
  "\\right": !0,
  "\\bigr": !0,
  "\\biggr": !0,
  "\\Bigr": !0,
  "\\Biggr": !0,
  // \extra@ also tests for the following:
  $: !0,
  // \extrap@ checks for the following:
  ";": !0,
  ".": !0,
  ",": !0
};
c("\\dotso", function(r) {
  var e = r.future().text;
  return e in jt ? "\\ldots\\," : "\\ldots";
});
c("\\dotsc", function(r) {
  var e = r.future().text;
  return e in jt && e !== "," ? "\\ldots\\," : "\\ldots";
});
c("\\cdots", function(r) {
  var e = r.future().text;
  return e in jt ? "\\@cdots\\," : "\\@cdots";
});
c("\\dotsb", "\\cdots");
c("\\dotsm", "\\cdots");
c("\\dotsi", "\\!\\cdots");
c("\\dotsx", "\\ldots\\,");
c("\\DOTSI", "\\relax");
c("\\DOTSB", "\\relax");
c("\\DOTSX", "\\relax");
c("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
c("\\,", "\\tmspace+{3mu}{.1667em}");
c("\\thinspace", "\\,");
c("\\>", "\\mskip{4mu}");
c("\\:", "\\tmspace+{4mu}{.2222em}");
c("\\medspace", "\\:");
c("\\;", "\\tmspace+{5mu}{.2777em}");
c("\\thickspace", "\\;");
c("\\!", "\\tmspace-{3mu}{.1667em}");
c("\\negthinspace", "\\!");
c("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
c("\\negthickspace", "\\tmspace-{5mu}{.277em}");
c("\\enspace", "\\kern.5em ");
c("\\enskip", "\\hskip.5em\\relax");
c("\\quad", "\\hskip1em\\relax");
c("\\qquad", "\\hskip2em\\relax");
c("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
c("\\tag@paren", "\\tag@literal{({#1})}");
c("\\tag@literal", (r) => {
  if (r.macros.get("\\df@tag"))
    throw new S("Multiple \\tag");
  return "\\gdef\\df@tag{\\text{#1}}";
});
c("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
c("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
c("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
c("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
c("\\newline", "\\\\\\relax");
c("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
var La = z(k0["Main-Regular"][84][1] - 0.7 * k0["Main-Regular"][65][1]);
c("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + La + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
c("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + La + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
c("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
c("\\@hspace", "\\hskip #1\\relax");
c("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
c("\\ordinarycolon", ":");
c("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
c("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
c("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
c("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
c("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
c("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
c("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
c("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
c("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
c("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
c("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
c("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
c("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
c("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
c("∷", "\\dblcolon");
c("∹", "\\eqcolon");
c("≔", "\\coloneqq");
c("≕", "\\eqqcolon");
c("⩴", "\\Coloneqq");
c("\\ratio", "\\vcentcolon");
c("\\coloncolon", "\\dblcolon");
c("\\colonequals", "\\coloneqq");
c("\\coloncolonequals", "\\Coloneqq");
c("\\equalscolon", "\\eqqcolon");
c("\\equalscoloncolon", "\\Eqqcolon");
c("\\colonminus", "\\coloneq");
c("\\coloncolonminus", "\\Coloneq");
c("\\minuscolon", "\\eqcolon");
c("\\minuscoloncolon", "\\Eqcolon");
c("\\coloncolonapprox", "\\Colonapprox");
c("\\coloncolonsim", "\\Colonsim");
c("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
c("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
c("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
c("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
c("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}");
c("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
c("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
c("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
c("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
c("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
c("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
c("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
c("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
c("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}");
c("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}");
c("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}");
c("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}");
c("\\nleqq", "\\html@mathml{\\@nleqq}{≰}");
c("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}");
c("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}");
c("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}");
c("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}");
c("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}");
c("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}");
c("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}");
c("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}");
c("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}");
c("\\imath", "\\html@mathml{\\@imath}{ı}");
c("\\jmath", "\\html@mathml{\\@jmath}{ȷ}");
c("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}");
c("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}");
c("⟦", "\\llbracket");
c("⟧", "\\rrbracket");
c("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}");
c("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}");
c("⦃", "\\lBrace");
c("⦄", "\\rBrace");
c("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}");
c("⦵", "\\minuso");
c("\\darr", "\\downarrow");
c("\\dArr", "\\Downarrow");
c("\\Darr", "\\Downarrow");
c("\\lang", "\\langle");
c("\\rang", "\\rangle");
c("\\uarr", "\\uparrow");
c("\\uArr", "\\Uparrow");
c("\\Uarr", "\\Uparrow");
c("\\N", "\\mathbb{N}");
c("\\R", "\\mathbb{R}");
c("\\Z", "\\mathbb{Z}");
c("\\alef", "\\aleph");
c("\\alefsym", "\\aleph");
c("\\Alpha", "\\mathrm{A}");
c("\\Beta", "\\mathrm{B}");
c("\\bull", "\\bullet");
c("\\Chi", "\\mathrm{X}");
c("\\clubs", "\\clubsuit");
c("\\cnums", "\\mathbb{C}");
c("\\Complex", "\\mathbb{C}");
c("\\Dagger", "\\ddagger");
c("\\diamonds", "\\diamondsuit");
c("\\empty", "\\emptyset");
c("\\Epsilon", "\\mathrm{E}");
c("\\Eta", "\\mathrm{H}");
c("\\exist", "\\exists");
c("\\harr", "\\leftrightarrow");
c("\\hArr", "\\Leftrightarrow");
c("\\Harr", "\\Leftrightarrow");
c("\\hearts", "\\heartsuit");
c("\\image", "\\Im");
c("\\infin", "\\infty");
c("\\Iota", "\\mathrm{I}");
c("\\isin", "\\in");
c("\\Kappa", "\\mathrm{K}");
c("\\larr", "\\leftarrow");
c("\\lArr", "\\Leftarrow");
c("\\Larr", "\\Leftarrow");
c("\\lrarr", "\\leftrightarrow");
c("\\lrArr", "\\Leftrightarrow");
c("\\Lrarr", "\\Leftrightarrow");
c("\\Mu", "\\mathrm{M}");
c("\\natnums", "\\mathbb{N}");
c("\\Nu", "\\mathrm{N}");
c("\\Omicron", "\\mathrm{O}");
c("\\plusmn", "\\pm");
c("\\rarr", "\\rightarrow");
c("\\rArr", "\\Rightarrow");
c("\\Rarr", "\\Rightarrow");
c("\\real", "\\Re");
c("\\reals", "\\mathbb{R}");
c("\\Reals", "\\mathbb{R}");
c("\\Rho", "\\mathrm{P}");
c("\\sdot", "\\cdot");
c("\\sect", "\\S");
c("\\spades", "\\spadesuit");
c("\\sub", "\\subset");
c("\\sube", "\\subseteq");
c("\\supe", "\\supseteq");
c("\\Tau", "\\mathrm{T}");
c("\\thetasym", "\\vartheta");
c("\\weierp", "\\wp");
c("\\Zeta", "\\mathrm{Z}");
c("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
c("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
c("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
c("\\bra", "\\mathinner{\\langle{#1}|}");
c("\\ket", "\\mathinner{|{#1}\\rangle}");
c("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
c("\\Bra", "\\left\\langle#1\\right|");
c("\\Ket", "\\left|#1\\right\\rangle");
var Pa = (r) => (e) => {
  var t = e.consumeArg().tokens, a = e.consumeArg().tokens, n = e.consumeArg().tokens, s = e.consumeArg().tokens, o = e.macros.get("|"), h = e.macros.get("\\|");
  e.macros.beginGroup();
  var m = (b) => (y) => {
    r && (y.macros.set("|", o), n.length && y.macros.set("\\|", h));
    var x = b;
    if (!b && n.length) {
      var M = y.future();
      M.text === "|" && (y.popToken(), x = !0);
    }
    return {
      tokens: x ? n : a,
      numArgs: 0
    };
  };
  e.macros.set("|", m(!1)), n.length && e.macros.set("\\|", m(!0));
  var d = e.consumeArg().tokens, v = e.expandTokens([
    ...s,
    ...d,
    ...t
    // reversed
  ]);
  return e.macros.endGroup(), {
    tokens: v.reverse(),
    numArgs: 0
  };
};
c("\\bra@ket", Pa(!1));
c("\\bra@set", Pa(!0));
c("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
c("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
c("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
c("\\angln", "{\\angl n}");
c("\\blue", "\\textcolor{##6495ed}{#1}");
c("\\orange", "\\textcolor{##ffa500}{#1}");
c("\\pink", "\\textcolor{##ff00af}{#1}");
c("\\red", "\\textcolor{##df0030}{#1}");
c("\\green", "\\textcolor{##28ae7b}{#1}");
c("\\gray", "\\textcolor{gray}{#1}");
c("\\purple", "\\textcolor{##9d38bd}{#1}");
c("\\blueA", "\\textcolor{##ccfaff}{#1}");
c("\\blueB", "\\textcolor{##80f6ff}{#1}");
c("\\blueC", "\\textcolor{##63d9ea}{#1}");
c("\\blueD", "\\textcolor{##11accd}{#1}");
c("\\blueE", "\\textcolor{##0c7f99}{#1}");
c("\\tealA", "\\textcolor{##94fff5}{#1}");
c("\\tealB", "\\textcolor{##26edd5}{#1}");
c("\\tealC", "\\textcolor{##01d1c1}{#1}");
c("\\tealD", "\\textcolor{##01a995}{#1}");
c("\\tealE", "\\textcolor{##208170}{#1}");
c("\\greenA", "\\textcolor{##b6ffb0}{#1}");
c("\\greenB", "\\textcolor{##8af281}{#1}");
c("\\greenC", "\\textcolor{##74cf70}{#1}");
c("\\greenD", "\\textcolor{##1fab54}{#1}");
c("\\greenE", "\\textcolor{##0d923f}{#1}");
c("\\goldA", "\\textcolor{##ffd0a9}{#1}");
c("\\goldB", "\\textcolor{##ffbb71}{#1}");
c("\\goldC", "\\textcolor{##ff9c39}{#1}");
c("\\goldD", "\\textcolor{##e07d10}{#1}");
c("\\goldE", "\\textcolor{##a75a05}{#1}");
c("\\redA", "\\textcolor{##fca9a9}{#1}");
c("\\redB", "\\textcolor{##ff8482}{#1}");
c("\\redC", "\\textcolor{##f9685d}{#1}");
c("\\redD", "\\textcolor{##e84d39}{#1}");
c("\\redE", "\\textcolor{##bc2612}{#1}");
c("\\maroonA", "\\textcolor{##ffbde0}{#1}");
c("\\maroonB", "\\textcolor{##ff92c6}{#1}");
c("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
c("\\maroonD", "\\textcolor{##ca337c}{#1}");
c("\\maroonE", "\\textcolor{##9e034e}{#1}");
c("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
c("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
c("\\purpleC", "\\textcolor{##aa87ff}{#1}");
c("\\purpleD", "\\textcolor{##7854ab}{#1}");
c("\\purpleE", "\\textcolor{##543b78}{#1}");
c("\\mintA", "\\textcolor{##f5f9e8}{#1}");
c("\\mintB", "\\textcolor{##edf2df}{#1}");
c("\\mintC", "\\textcolor{##e0e5cc}{#1}");
c("\\grayA", "\\textcolor{##f6f7f7}{#1}");
c("\\grayB", "\\textcolor{##f0f1f2}{#1}");
c("\\grayC", "\\textcolor{##e3e5e6}{#1}");
c("\\grayD", "\\textcolor{##d6d8da}{#1}");
c("\\grayE", "\\textcolor{##babec2}{#1}");
c("\\grayF", "\\textcolor{##888d93}{#1}");
c("\\grayG", "\\textcolor{##626569}{#1}");
c("\\grayH", "\\textcolor{##3b3e40}{#1}");
c("\\grayI", "\\textcolor{##21242c}{#1}");
c("\\kaBlue", "\\textcolor{##314453}{#1}");
c("\\kaGreen", "\\textcolor{##71B307}{#1}");
var Ga = {
  "^": !0,
  // Parser.js
  _: !0,
  // Parser.js
  "\\limits": !0,
  // Parser.js
  "\\nolimits": !0
  // Parser.js
};
class ci {
  constructor(e, t, a) {
    this.settings = void 0, this.expansionCount = void 0, this.lexer = void 0, this.macros = void 0, this.stack = void 0, this.mode = void 0, this.settings = t, this.expansionCount = 0, this.feed(e), this.macros = new oi(ui, t.macros), this.mode = a, this.stack = [];
  }
  /**
   * Feed a new input string to the same MacroExpander
   * (with existing macros etc.).
   */
  feed(e) {
    this.lexer = new Xr(e, this.settings);
  }
  /**
   * Switches between "text" and "math" modes.
   */
  switchMode(e) {
    this.mode = e;
  }
  /**
   * Start a new group nesting within all namespaces.
   */
  beginGroup() {
    this.macros.beginGroup();
  }
  /**
   * End current group nesting within all namespaces.
   */
  endGroup() {
    this.macros.endGroup();
  }
  /**
   * Ends all currently nested groups (if any), restoring values before the
   * groups began.  Useful in case of an error in the middle of parsing.
   */
  endGroups() {
    this.macros.endGroups();
  }
  /**
   * Returns the topmost token on the stack, without expanding it.
   * Similar in behavior to TeX's `\futurelet`.
   */
  future() {
    return this.stack.length === 0 && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1];
  }
  /**
   * Remove and return the next unexpanded token.
   */
  popToken() {
    return this.future(), this.stack.pop();
  }
  /**
   * Add a given token to the token stack.  In particular, this get be used
   * to put back a token returned from one of the other methods.
   */
  pushToken(e) {
    this.stack.push(e);
  }
  /**
   * Append an array of tokens to the token stack.
   */
  pushTokens(e) {
    this.stack.push(...e);
  }
  /**
   * Find an macro argument without expanding tokens and append the array of
   * tokens to the token stack. Uses Token as a container for the result.
   */
  scanArgument(e) {
    var t, a, n;
    if (e) {
      if (this.consumeSpaces(), this.future().text !== "[")
        return null;
      t = this.popToken();
      var s = this.consumeArg(["]"]);
      n = s.tokens, a = s.end;
    } else {
      var o = this.consumeArg();
      n = o.tokens, t = o.start, a = o.end;
    }
    return this.pushToken(new m0("EOF", a.loc)), this.pushTokens(n), new m0("", h0.range(t, a));
  }
  /**
   * Consume all following space tokens, without expansion.
   */
  consumeSpaces() {
    for (; ; ) {
      var e = this.future();
      if (e.text === " ")
        this.stack.pop();
      else
        break;
    }
  }
  /**
   * Consume an argument from the token stream, and return the resulting array
   * of tokens and start/end token.
   */
  consumeArg(e) {
    var t = [], a = e && e.length > 0;
    a || this.consumeSpaces();
    var n = this.future(), s, o = 0, h = 0;
    do {
      if (s = this.popToken(), t.push(s), s.text === "{")
        ++o;
      else if (s.text === "}") {
        if (--o, o === -1)
          throw new S("Extra }", s);
      } else if (s.text === "EOF")
        throw new S("Unexpected end of input in a macro argument, expected '" + (e && a ? e[h] : "}") + "'", s);
      if (e && a)
        if ((o === 0 || o === 1 && e[h] === "{") && s.text === e[h]) {
          if (++h, h === e.length) {
            t.splice(-h, h);
            break;
          }
        } else
          h = 0;
    } while (o !== 0 || a);
    return n.text === "{" && t[t.length - 1].text === "}" && (t.pop(), t.shift()), t.reverse(), {
      tokens: t,
      start: n,
      end: s
    };
  }
  /**
   * Consume the specified number of (delimited) arguments from the token
   * stream and return the resulting array of arguments.
   */
  consumeArgs(e, t) {
    if (t) {
      if (t.length !== e + 1)
        throw new S("The length of delimiters doesn't match the number of args!");
      for (var a = t[0], n = 0; n < a.length; n++) {
        var s = this.popToken();
        if (a[n] !== s.text)
          throw new S("Use of the macro doesn't match its definition", s);
      }
    }
    for (var o = [], h = 0; h < e; h++)
      o.push(this.consumeArg(t && t[h + 1]).tokens);
    return o;
  }
  /**
   * Increment `expansionCount` by the specified amount.
   * Throw an error if it exceeds `maxExpand`.
   */
  countExpansion(e) {
    if (this.expansionCount += e, this.expansionCount > this.settings.maxExpand)
      throw new S("Too many expansions: infinite loop or need to increase maxExpand setting");
  }
  /**
   * Expand the next token only once if possible.
   *
   * If the token is expanded, the resulting tokens will be pushed onto
   * the stack in reverse order, and the number of such tokens will be
   * returned.  This number might be zero or positive.
   *
   * If not, the return value is `false`, and the next token remains at the
   * top of the stack.
   *
   * In either case, the next token will be on the top of the stack,
   * or the stack will be empty (in case of empty expansion
   * and no other tokens).
   *
   * Used to implement `expandAfterFuture` and `expandNextToken`.
   *
   * If expandableOnly, only expandable tokens are expanded and
   * an undefined control sequence results in an error.
   */
  expandOnce(e) {
    var t = this.popToken(), a = t.text, n = t.noexpand ? null : this._getExpansion(a);
    if (n == null || e && n.unexpandable) {
      if (e && n == null && a[0] === "\\" && !this.isDefined(a))
        throw new S("Undefined control sequence: " + a);
      return this.pushToken(t), !1;
    }
    this.countExpansion(1);
    var s = n.tokens, o = this.consumeArgs(n.numArgs, n.delimiters);
    if (n.numArgs) {
      s = s.slice();
      for (var h = s.length - 1; h >= 0; --h) {
        var m = s[h];
        if (m.text === "#") {
          if (h === 0)
            throw new S("Incomplete placeholder at end of macro body", m);
          if (m = s[--h], m.text === "#")
            s.splice(h + 1, 1);
          else if (/^[1-9]$/.test(m.text))
            s.splice(h, 2, ...o[+m.text - 1]);
          else
            throw new S("Not a valid argument number", m);
        }
      }
    }
    return this.pushTokens(s), s.length;
  }
  /**
   * Expand the next token only once (if possible), and return the resulting
   * top token on the stack (without removing anything from the stack).
   * Similar in behavior to TeX's `\expandafter\futurelet`.
   * Equivalent to expandOnce() followed by future().
   */
  expandAfterFuture() {
    return this.expandOnce(), this.future();
  }
  /**
   * Recursively expand first token, then return first non-expandable token.
   */
  expandNextToken() {
    for (; ; )
      if (this.expandOnce() === !1) {
        var e = this.stack.pop();
        return e.treatAsRelax && (e.text = "\\relax"), e;
      }
  }
  /**
   * Fully expand the given macro name and return the resulting list of
   * tokens, or return `undefined` if no such macro is defined.
   */
  expandMacro(e) {
    return this.macros.has(e) ? this.expandTokens([new m0(e)]) : void 0;
  }
  /**
   * Fully expand the given token stream and return the resulting list of
   * tokens.  Note that the input tokens are in reverse order, but the
   * output tokens are in forward order.
   */
  expandTokens(e) {
    var t = [], a = this.stack.length;
    for (this.pushTokens(e); this.stack.length > a; )
      if (this.expandOnce(!0) === !1) {
        var n = this.stack.pop();
        n.treatAsRelax && (n.noexpand = !1, n.treatAsRelax = !1), t.push(n);
      }
    return this.countExpansion(t.length), t;
  }
  /**
   * Fully expand the given macro name and return the result as a string,
   * or return `undefined` if no such macro is defined.
   */
  expandMacroAsText(e) {
    var t = this.expandMacro(e);
    return t && t.map((a) => a.text).join("");
  }
  /**
   * Returns the expanded macro as a reversed array of tokens and a macro
   * argument count.  Or returns `null` if no such macro.
   */
  _getExpansion(e) {
    var t = this.macros.get(e);
    if (t == null)
      return t;
    if (e.length === 1) {
      var a = this.lexer.catcodes[e];
      if (a != null && a !== 13)
        return;
    }
    var n = typeof t == "function" ? t(this) : t;
    if (typeof n == "string") {
      var s = 0;
      if (n.includes("#"))
        for (var o = n.replace(/##/g, ""); o.includes("#" + (s + 1)); )
          ++s;
      for (var h = new Xr(n, this.settings), m = [], d = h.lex(); d.text !== "EOF"; )
        m.push(d), d = h.lex();
      m.reverse();
      var v = {
        tokens: m,
        numArgs: s
      };
      return v;
    }
    return n;
  }
  /**
   * Determine whether a command is currently "defined" (has some
   * functionality), meaning that it's a macro (in the current group),
   * a function, a symbol, or one of the special commands listed in
   * `implicitCommands`.
   */
  isDefined(e) {
    return this.macros.has(e) || Object.prototype.hasOwnProperty.call(L0, e) || Object.prototype.hasOwnProperty.call(W.math, e) || Object.prototype.hasOwnProperty.call(W.text, e) || Object.prototype.hasOwnProperty.call(Ga, e);
  }
  /**
   * Determine whether a command is expandable.
   */
  isExpandable(e) {
    var t = this.macros.get(e);
    return t != null ? typeof t == "string" || typeof t == "function" || !t.unexpandable : Object.prototype.hasOwnProperty.call(L0, e) && !L0[e].primitive;
  }
}
var Zr = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/, Be = Object.freeze({
  "₊": "+",
  "₋": "-",
  "₌": "=",
  "₍": "(",
  "₎": ")",
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
  "ₐ": "a",
  "ₑ": "e",
  "ₕ": "h",
  "ᵢ": "i",
  "ⱼ": "j",
  "ₖ": "k",
  "ₗ": "l",
  "ₘ": "m",
  "ₙ": "n",
  "ₒ": "o",
  "ₚ": "p",
  "ᵣ": "r",
  "ₛ": "s",
  "ₜ": "t",
  "ᵤ": "u",
  "ᵥ": "v",
  "ₓ": "x",
  "ᵦ": "β",
  "ᵧ": "γ",
  "ᵨ": "ρ",
  "ᵩ": "ϕ",
  "ᵪ": "χ",
  "⁺": "+",
  "⁻": "-",
  "⁼": "=",
  "⁽": "(",
  "⁾": ")",
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "ᴬ": "A",
  "ᴮ": "B",
  "ᴰ": "D",
  "ᴱ": "E",
  "ᴳ": "G",
  "ᴴ": "H",
  "ᴵ": "I",
  "ᴶ": "J",
  "ᴷ": "K",
  "ᴸ": "L",
  "ᴹ": "M",
  "ᴺ": "N",
  "ᴼ": "O",
  "ᴾ": "P",
  "ᴿ": "R",
  "ᵀ": "T",
  "ᵁ": "U",
  "ⱽ": "V",
  "ᵂ": "W",
  "ᵃ": "a",
  "ᵇ": "b",
  "ᶜ": "c",
  "ᵈ": "d",
  "ᵉ": "e",
  "ᶠ": "f",
  "ᵍ": "g",
  ʰ: "h",
  "ⁱ": "i",
  ʲ: "j",
  "ᵏ": "k",
  ˡ: "l",
  "ᵐ": "m",
  ⁿ: "n",
  "ᵒ": "o",
  "ᵖ": "p",
  ʳ: "r",
  ˢ: "s",
  "ᵗ": "t",
  "ᵘ": "u",
  "ᵛ": "v",
  ʷ: "w",
  ˣ: "x",
  ʸ: "y",
  "ᶻ": "z",
  "ᵝ": "β",
  "ᵞ": "γ",
  "ᵟ": "δ",
  "ᵠ": "ϕ",
  "ᵡ": "χ",
  "ᶿ": "θ"
}), ht = {
  "́": {
    text: "\\'",
    math: "\\acute"
  },
  "̀": {
    text: "\\`",
    math: "\\grave"
  },
  "̈": {
    text: '\\"',
    math: "\\ddot"
  },
  "̃": {
    text: "\\~",
    math: "\\tilde"
  },
  "̄": {
    text: "\\=",
    math: "\\bar"
  },
  "̆": {
    text: "\\u",
    math: "\\breve"
  },
  "̌": {
    text: "\\v",
    math: "\\check"
  },
  "̂": {
    text: "\\^",
    math: "\\hat"
  },
  "̇": {
    text: "\\.",
    math: "\\dot"
  },
  "̊": {
    text: "\\r",
    math: "\\mathring"
  },
  "̋": {
    text: "\\H"
  },
  "̧": {
    text: "\\c"
  }
}, Kr = {
  á: "á",
  à: "à",
  ä: "ä",
  ǟ: "ǟ",
  ã: "ã",
  ā: "ā",
  ă: "ă",
  ắ: "ắ",
  ằ: "ằ",
  ẵ: "ẵ",
  ǎ: "ǎ",
  â: "â",
  ấ: "ấ",
  ầ: "ầ",
  ẫ: "ẫ",
  ȧ: "ȧ",
  ǡ: "ǡ",
  å: "å",
  ǻ: "ǻ",
  ḃ: "ḃ",
  ć: "ć",
  ḉ: "ḉ",
  č: "č",
  ĉ: "ĉ",
  ċ: "ċ",
  ç: "ç",
  ď: "ď",
  ḋ: "ḋ",
  ḑ: "ḑ",
  é: "é",
  è: "è",
  ë: "ë",
  ẽ: "ẽ",
  ē: "ē",
  ḗ: "ḗ",
  ḕ: "ḕ",
  ĕ: "ĕ",
  ḝ: "ḝ",
  ě: "ě",
  ê: "ê",
  ế: "ế",
  ề: "ề",
  ễ: "ễ",
  ė: "ė",
  ȩ: "ȩ",
  ḟ: "ḟ",
  ǵ: "ǵ",
  ḡ: "ḡ",
  ğ: "ğ",
  ǧ: "ǧ",
  ĝ: "ĝ",
  ġ: "ġ",
  ģ: "ģ",
  ḧ: "ḧ",
  ȟ: "ȟ",
  ĥ: "ĥ",
  ḣ: "ḣ",
  ḩ: "ḩ",
  í: "í",
  ì: "ì",
  ï: "ï",
  ḯ: "ḯ",
  ĩ: "ĩ",
  ī: "ī",
  ĭ: "ĭ",
  ǐ: "ǐ",
  î: "î",
  ǰ: "ǰ",
  ĵ: "ĵ",
  ḱ: "ḱ",
  ǩ: "ǩ",
  ķ: "ķ",
  ĺ: "ĺ",
  ľ: "ľ",
  ļ: "ļ",
  ḿ: "ḿ",
  ṁ: "ṁ",
  ń: "ń",
  ǹ: "ǹ",
  ñ: "ñ",
  ň: "ň",
  ṅ: "ṅ",
  ņ: "ņ",
  ó: "ó",
  ò: "ò",
  ö: "ö",
  ȫ: "ȫ",
  õ: "õ",
  ṍ: "ṍ",
  ṏ: "ṏ",
  ȭ: "ȭ",
  ō: "ō",
  ṓ: "ṓ",
  ṑ: "ṑ",
  ŏ: "ŏ",
  ǒ: "ǒ",
  ô: "ô",
  ố: "ố",
  ồ: "ồ",
  ỗ: "ỗ",
  ȯ: "ȯ",
  ȱ: "ȱ",
  ő: "ő",
  ṕ: "ṕ",
  ṗ: "ṗ",
  ŕ: "ŕ",
  ř: "ř",
  ṙ: "ṙ",
  ŗ: "ŗ",
  ś: "ś",
  ṥ: "ṥ",
  š: "š",
  ṧ: "ṧ",
  ŝ: "ŝ",
  ṡ: "ṡ",
  ş: "ş",
  ẗ: "ẗ",
  ť: "ť",
  ṫ: "ṫ",
  ţ: "ţ",
  ú: "ú",
  ù: "ù",
  ü: "ü",
  ǘ: "ǘ",
  ǜ: "ǜ",
  ǖ: "ǖ",
  ǚ: "ǚ",
  ũ: "ũ",
  ṹ: "ṹ",
  ū: "ū",
  ṻ: "ṻ",
  ŭ: "ŭ",
  ǔ: "ǔ",
  û: "û",
  ů: "ů",
  ű: "ű",
  ṽ: "ṽ",
  ẃ: "ẃ",
  ẁ: "ẁ",
  ẅ: "ẅ",
  ŵ: "ŵ",
  ẇ: "ẇ",
  ẘ: "ẘ",
  ẍ: "ẍ",
  ẋ: "ẋ",
  ý: "ý",
  ỳ: "ỳ",
  ÿ: "ÿ",
  ỹ: "ỹ",
  ȳ: "ȳ",
  ŷ: "ŷ",
  ẏ: "ẏ",
  ẙ: "ẙ",
  ź: "ź",
  ž: "ž",
  ẑ: "ẑ",
  ż: "ż",
  Á: "Á",
  À: "À",
  Ä: "Ä",
  Ǟ: "Ǟ",
  Ã: "Ã",
  Ā: "Ā",
  Ă: "Ă",
  Ắ: "Ắ",
  Ằ: "Ằ",
  Ẵ: "Ẵ",
  Ǎ: "Ǎ",
  Â: "Â",
  Ấ: "Ấ",
  Ầ: "Ầ",
  Ẫ: "Ẫ",
  Ȧ: "Ȧ",
  Ǡ: "Ǡ",
  Å: "Å",
  Ǻ: "Ǻ",
  Ḃ: "Ḃ",
  Ć: "Ć",
  Ḉ: "Ḉ",
  Č: "Č",
  Ĉ: "Ĉ",
  Ċ: "Ċ",
  Ç: "Ç",
  Ď: "Ď",
  Ḋ: "Ḋ",
  Ḑ: "Ḑ",
  É: "É",
  È: "È",
  Ë: "Ë",
  Ẽ: "Ẽ",
  Ē: "Ē",
  Ḗ: "Ḗ",
  Ḕ: "Ḕ",
  Ĕ: "Ĕ",
  Ḝ: "Ḝ",
  Ě: "Ě",
  Ê: "Ê",
  Ế: "Ế",
  Ề: "Ề",
  Ễ: "Ễ",
  Ė: "Ė",
  Ȩ: "Ȩ",
  Ḟ: "Ḟ",
  Ǵ: "Ǵ",
  Ḡ: "Ḡ",
  Ğ: "Ğ",
  Ǧ: "Ǧ",
  Ĝ: "Ĝ",
  Ġ: "Ġ",
  Ģ: "Ģ",
  Ḧ: "Ḧ",
  Ȟ: "Ȟ",
  Ĥ: "Ĥ",
  Ḣ: "Ḣ",
  Ḩ: "Ḩ",
  Í: "Í",
  Ì: "Ì",
  Ï: "Ï",
  Ḯ: "Ḯ",
  Ĩ: "Ĩ",
  Ī: "Ī",
  Ĭ: "Ĭ",
  Ǐ: "Ǐ",
  Î: "Î",
  İ: "İ",
  Ĵ: "Ĵ",
  Ḱ: "Ḱ",
  Ǩ: "Ǩ",
  Ķ: "Ķ",
  Ĺ: "Ĺ",
  Ľ: "Ľ",
  Ļ: "Ļ",
  Ḿ: "Ḿ",
  Ṁ: "Ṁ",
  Ń: "Ń",
  Ǹ: "Ǹ",
  Ñ: "Ñ",
  Ň: "Ň",
  Ṅ: "Ṅ",
  Ņ: "Ņ",
  Ó: "Ó",
  Ò: "Ò",
  Ö: "Ö",
  Ȫ: "Ȫ",
  Õ: "Õ",
  Ṍ: "Ṍ",
  Ṏ: "Ṏ",
  Ȭ: "Ȭ",
  Ō: "Ō",
  Ṓ: "Ṓ",
  Ṑ: "Ṑ",
  Ŏ: "Ŏ",
  Ǒ: "Ǒ",
  Ô: "Ô",
  Ố: "Ố",
  Ồ: "Ồ",
  Ỗ: "Ỗ",
  Ȯ: "Ȯ",
  Ȱ: "Ȱ",
  Ő: "Ő",
  Ṕ: "Ṕ",
  Ṗ: "Ṗ",
  Ŕ: "Ŕ",
  Ř: "Ř",
  Ṙ: "Ṙ",
  Ŗ: "Ŗ",
  Ś: "Ś",
  Ṥ: "Ṥ",
  Š: "Š",
  Ṧ: "Ṧ",
  Ŝ: "Ŝ",
  Ṡ: "Ṡ",
  Ş: "Ş",
  Ť: "Ť",
  Ṫ: "Ṫ",
  Ţ: "Ţ",
  Ú: "Ú",
  Ù: "Ù",
  Ü: "Ü",
  Ǘ: "Ǘ",
  Ǜ: "Ǜ",
  Ǖ: "Ǖ",
  Ǚ: "Ǚ",
  Ũ: "Ũ",
  Ṹ: "Ṹ",
  Ū: "Ū",
  Ṻ: "Ṻ",
  Ŭ: "Ŭ",
  Ǔ: "Ǔ",
  Û: "Û",
  Ů: "Ů",
  Ű: "Ű",
  Ṽ: "Ṽ",
  Ẃ: "Ẃ",
  Ẁ: "Ẁ",
  Ẅ: "Ẅ",
  Ŵ: "Ŵ",
  Ẇ: "Ẇ",
  Ẍ: "Ẍ",
  Ẋ: "Ẋ",
  Ý: "Ý",
  Ỳ: "Ỳ",
  Ÿ: "Ÿ",
  Ỹ: "Ỹ",
  Ȳ: "Ȳ",
  Ŷ: "Ŷ",
  Ẏ: "Ẏ",
  Ź: "Ź",
  Ž: "Ž",
  Ẑ: "Ẑ",
  Ż: "Ż",
  ά: "ά",
  ὰ: "ὰ",
  ᾱ: "ᾱ",
  ᾰ: "ᾰ",
  έ: "έ",
  ὲ: "ὲ",
  ή: "ή",
  ὴ: "ὴ",
  ί: "ί",
  ὶ: "ὶ",
  ϊ: "ϊ",
  ΐ: "ΐ",
  ῒ: "ῒ",
  ῑ: "ῑ",
  ῐ: "ῐ",
  ό: "ό",
  ὸ: "ὸ",
  ύ: "ύ",
  ὺ: "ὺ",
  ϋ: "ϋ",
  ΰ: "ΰ",
  ῢ: "ῢ",
  ῡ: "ῡ",
  ῠ: "ῠ",
  ώ: "ώ",
  ὼ: "ὼ",
  Ύ: "Ύ",
  Ὺ: "Ὺ",
  Ϋ: "Ϋ",
  Ῡ: "Ῡ",
  Ῠ: "Ῠ",
  Ώ: "Ώ",
  Ὼ: "Ὼ"
};
class je {
  constructor(e, t) {
    this.mode = void 0, this.gullet = void 0, this.settings = void 0, this.leftrightDepth = void 0, this.nextToken = void 0, this.mode = "math", this.gullet = new ci(e, t, this.mode), this.settings = t, this.leftrightDepth = 0, this.nextToken = null;
  }
  /**
   * Checks a result to make sure it has the right type, and throws an
   * appropriate error otherwise.
   */
  expect(e, t) {
    if (t === void 0 && (t = !0), this.fetch().text !== e)
      throw new S("Expected '" + e + "', got '" + this.fetch().text + "'", this.fetch());
    t && this.consume();
  }
  /**
   * Discards the current lookahead token, considering it consumed.
   */
  consume() {
    this.nextToken = null;
  }
  /**
   * Return the current lookahead token, or if there isn't one (at the
   * beginning, or if the previous lookahead token was consume()d),
   * fetch the next token as the new lookahead token and return it.
   */
  fetch() {
    return this.nextToken == null && (this.nextToken = this.gullet.expandNextToken()), this.nextToken;
  }
  /**
   * Switches between "text" and "math" modes.
   */
  switchMode(e) {
    this.mode = e, this.gullet.switchMode(e);
  }
  /**
   * Main parsing function, which parses an entire input.
   */
  parse() {
    this.settings.globalGroup || this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
    try {
      var e = this.parseExpression(!1);
      return this.expect("EOF"), this.settings.globalGroup || this.gullet.endGroup(), e;
    } finally {
      this.gullet.endGroups();
    }
  }
  /**
   * Fully parse a separate sequence of tokens as a separate job.
   * Tokens should be specified in reverse order, as in a MacroDefinition.
   */
  subparse(e) {
    var t = this.nextToken;
    this.consume(), this.gullet.pushToken(new m0("}")), this.gullet.pushTokens(e);
    var a = this.parseExpression(!1);
    return this.expect("}"), this.nextToken = t, a;
  }
  /**
   * Parses an "expression", which is a list of atoms.
   *
   * `breakOnInfix`: Should the parsing stop when we hit infix nodes? This
   *                 happens when functions have higher precedence than infix
   *                 nodes in implicit parses.
   *
   * `breakOnTokenText`: The text of the token that the expression should end
   *                     with, or `null` if something else should end the
   *                     expression.
   */
  parseExpression(e, t) {
    for (var a = []; ; ) {
      this.mode === "math" && this.consumeSpaces();
      var n = this.fetch();
      if (je.endOfExpression.has(n.text) || t && n.text === t || e && L0[n.text] && L0[n.text].infix)
        break;
      var s = this.parseAtom(t);
      if (s) {
        if (s.type === "internal")
          continue;
      } else break;
      a.push(s);
    }
    return this.mode === "text" && this.formLigatures(a), this.handleInfixNodes(a);
  }
  /**
   * Rewrites infix operators such as \over with corresponding commands such
   * as \frac.
   *
   * There can only be one infix operator per group.  If there's more than one
   * then the expression is ambiguous.  This can be resolved by adding {}.
   */
  handleInfixNodes(e) {
    for (var t = -1, a, n = 0; n < e.length; n++) {
      var s = e[n];
      if (s.type === "infix") {
        if (t !== -1)
          throw new S("only one infix operator per group", s.token);
        t = n, a = s.replaceWith;
      }
    }
    if (t !== -1 && a) {
      var o, h, m = e.slice(0, t), d = e.slice(t + 1);
      m.length === 1 && m[0].type === "ordgroup" ? o = m[0] : o = {
        type: "ordgroup",
        mode: this.mode,
        body: m
      }, d.length === 1 && d[0].type === "ordgroup" ? h = d[0] : h = {
        type: "ordgroup",
        mode: this.mode,
        body: d
      };
      var v;
      return a === "\\\\abovefrac" ? v = this.callFunction(a, [o, e[t], h], []) : v = this.callFunction(a, [o, h], []), [v];
    } else
      return e;
  }
  /**
   * Handle a subscript or superscript with nice errors.
   */
  handleSupSubscript(e) {
    var t = this.fetch(), a = t.text;
    this.consume(), this.consumeSpaces();
    var n;
    do {
      var s;
      n = this.parseGroup(e);
    } while (((s = n) == null ? void 0 : s.type) === "internal");
    if (!n)
      throw new S("Expected group after '" + a + "'", t);
    return n;
  }
  /**
   * Converts the textual input of an unsupported command into a text node
   * contained within a color node whose color is determined by errorColor
   */
  formatUnsupportedCmd(e) {
    for (var t = [], a = 0; a < e.length; a++)
      t.push({
        type: "textord",
        mode: "text",
        text: e[a]
      });
    var n = {
      type: "text",
      mode: this.mode,
      body: t
    }, s = {
      type: "color",
      mode: this.mode,
      color: this.settings.errorColor,
      body: [n]
    };
    return s;
  }
  /**
   * Parses a group with optional super/subscripts.
   */
  parseAtom(e) {
    var t = this.parseGroup("atom", e);
    if ((t == null ? void 0 : t.type) === "internal" || this.mode === "text")
      return t;
    for (var a, n; ; ) {
      this.consumeSpaces();
      var s = this.fetch();
      if (s.text === "\\limits" || s.text === "\\nolimits") {
        if (t && t.type === "op")
          t.limits = s.text === "\\limits", t.alwaysHandleSupSub = !0;
        else if (t && t.type === "operatorname")
          t.alwaysHandleSupSub && (t.limits = s.text === "\\limits");
        else
          throw new S("Limit controls must follow a math operator", s);
        this.consume();
      } else if (s.text === "^") {
        if (a)
          throw new S("Double superscript", s);
        a = this.handleSupSubscript("superscript");
      } else if (s.text === "_") {
        if (n)
          throw new S("Double subscript", s);
        n = this.handleSupSubscript("subscript");
      } else if (s.text === "'") {
        if (a)
          throw new S("Double superscript", s);
        var o = {
          type: "textord",
          mode: this.mode,
          text: "\\prime"
        }, h = [o];
        for (this.consume(); this.fetch().text === "'"; )
          h.push(o), this.consume();
        this.fetch().text === "^" && h.push(this.handleSupSubscript("superscript")), a = {
          type: "ordgroup",
          mode: this.mode,
          body: h
        };
      } else if (Be[s.text]) {
        var m = Zr.test(s.text), d = [];
        for (d.push(new m0(Be[s.text])), this.consume(); ; ) {
          var v = this.fetch().text;
          if (!Be[v] || Zr.test(v) !== m)
            break;
          d.unshift(new m0(Be[v])), this.consume();
        }
        var b = this.subparse(d);
        m ? n = {
          type: "ordgroup",
          mode: "math",
          body: b
        } : a = {
          type: "ordgroup",
          mode: "math",
          body: b
        };
      } else
        break;
    }
    return a && n ? {
      type: "supsub",
      mode: this.mode,
      base: t,
      sup: a,
      sub: n
    } : a ? {
      type: "supsub",
      mode: this.mode,
      base: t,
      sup: a
    } : n ? {
      type: "supsub",
      mode: this.mode,
      base: t,
      sub: n
    } : t;
  }
  /**
   * Parses an entire function, including its base and all of its arguments.
   */
  parseFunction(e, t) {
    var a = this.fetch(), n = a.text, s = L0[n];
    if (!s)
      return null;
    if (this.consume(), t && t !== "atom" && !s.allowedInArgument)
      throw new S("Got function '" + n + "' with no arguments" + (t ? " as " + t : ""), a);
    if (this.mode === "text" && !s.allowedInText)
      throw new S("Can't use function '" + n + "' in text mode", a);
    if (this.mode === "math" && s.allowedInMath === !1)
      throw new S("Can't use function '" + n + "' in math mode", a);
    var o = this.parseArguments(n, s), h = o.args, m = o.optArgs;
    return this.callFunction(n, h, m, a, e);
  }
  /**
   * Call a function handler with a suitable context and arguments.
   */
  callFunction(e, t, a, n, s) {
    var o = {
      funcName: e,
      parser: this,
      token: n,
      breakOnTokenText: s
    }, h = L0[e];
    if (h && h.handler)
      return h.handler(o, t, a);
    throw new S("No function handler for " + e);
  }
  /**
   * Parses the arguments of a function or environment
   */
  parseArguments(e, t) {
    var a, n = (a = t.numOptionalArgs) != null ? a : 0, s = t.numArgs + n;
    if (s === 0)
      return {
        args: [],
        optArgs: []
      };
    for (var o = [], h = [], m = 0; m < s; m++) {
      var d, v = (d = t.argTypes) == null ? void 0 : d[m], b = m < n;
      ("primitive" in t && t.primitive && v == null || // \sqrt expands into primitive if optional argument doesn't exist
      t.type === "sqrt" && m === 1 && h[0] == null) && (v = "primitive");
      var y = this.parseGroupOfType("argument to '" + e + "'", v, b);
      if (b)
        h.push(y);
      else if (y != null)
        o.push(y);
      else
        throw new S("Null argument, please report this as a bug");
    }
    return {
      args: o,
      optArgs: h
    };
  }
  /**
   * Parses a group when the mode is changing.
   */
  parseGroupOfType(e, t, a) {
    switch (t) {
      case "color":
        return this.parseColorGroup(a);
      case "size":
        return this.parseSizeGroup(a);
      case "url":
        return this.parseUrlGroup(a);
      case "math":
      case "text":
        return this.parseArgumentGroup(a, t);
      case "hbox": {
        var n = this.parseArgumentGroup(a, "text");
        return n != null ? {
          type: "styling",
          mode: n.mode,
          body: [n],
          style: "text",
          // simulate \textstyle
          resetFont: !0
        } : null;
      }
      case "raw": {
        var s = this.parseStringGroup(a);
        return s != null ? {
          type: "raw",
          mode: "text",
          string: s.text
        } : null;
      }
      case "primitive": {
        if (a)
          throw new S("A primitive argument cannot be optional");
        var o = this.parseGroup(e);
        if (o == null)
          throw new S("Expected group as " + e, this.fetch());
        return o;
      }
      case "original":
      case void 0:
        return this.parseArgumentGroup(a);
      default:
        throw new S("Unknown group type as " + e, this.fetch());
    }
  }
  /**
   * Discard any space tokens, fetching the next non-space token.
   */
  consumeSpaces() {
    for (; this.fetch().text === " "; )
      this.consume();
  }
  /**
   * Parses a group, essentially returning the string formed by the
   * brace-enclosed tokens plus some position information.
   */
  parseStringGroup(e) {
    var t = this.gullet.scanArgument(e);
    if (t == null)
      return null;
    for (var a = "", n; (n = this.fetch()).text !== "EOF"; )
      a += n.text, this.consume();
    return this.consume(), t.text = a, t;
  }
  /**
   * Parses a regex-delimited group: the largest sequence of tokens
   * whose concatenated strings match `regex`. Returns the string
   * formed by the tokens plus some position information.
   */
  parseRegexGroup(e, t) {
    for (var a = this.fetch(), n = a, s = "", o; (o = this.fetch()).text !== "EOF" && e.test(s + o.text); )
      n = o, s += n.text, this.consume();
    if (s === "")
      throw new S("Invalid " + t + ": '" + a.text + "'", a);
    return a.range(n, s);
  }
  /**
   * Parses a color description.
   */
  parseColorGroup(e) {
    var t = this.parseStringGroup(e);
    if (t == null)
      return null;
    var a = /^(#[a-f0-9]{3,4}|#[a-f0-9]{6}|#[a-f0-9]{8}|[a-f0-9]{6}|[a-z]+)$/i.exec(t.text);
    if (!a)
      throw new S("Invalid color: '" + t.text + "'", t);
    var n = a[0];
    return /^[0-9a-f]{6}$/i.test(n) && (n = "#" + n), {
      type: "color-token",
      mode: this.mode,
      color: n
    };
  }
  /**
   * Parses a size specification, consisting of magnitude and unit.
   */
  parseSizeGroup(e) {
    var t, a = !1;
    if (this.gullet.consumeSpaces(), !e && this.gullet.future().text !== "{" ? t = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size") : t = this.parseStringGroup(e), !t)
      return null;
    !e && t.text.length === 0 && (t.text = "0pt", a = !0);
    var n = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);
    if (!n)
      throw new S("Invalid size: '" + t.text + "'", t);
    var s = {
      number: +(n[1] + n[2]),
      // sign + magnitude, cast to number
      unit: n[3]
    };
    if (!ea(s))
      throw new S("Invalid unit: '" + s.unit + "'", t);
    return {
      type: "size",
      mode: this.mode,
      value: s,
      isBlank: a
    };
  }
  /**
   * Parses an URL, checking escaped letters and allowed protocols,
   * and setting the catcode of % as an active character (as in \hyperref).
   */
  parseUrlGroup(e) {
    this.gullet.lexer.setCatcode("%", 13), this.gullet.lexer.setCatcode("~", 12);
    var t = this.parseStringGroup(e);
    if (this.gullet.lexer.setCatcode("%", 14), this.gullet.lexer.setCatcode("~", 13), t == null)
      return null;
    var a = t.text.replace(/\\([#$%&~_^{}])/g, "$1");
    return {
      type: "url",
      mode: this.mode,
      url: a
    };
  }
  /**
   * Parses an argument with the mode specified.
   */
  parseArgumentGroup(e, t) {
    var a = this.gullet.scanArgument(e);
    if (a == null)
      return null;
    var n = this.mode;
    t && this.switchMode(t), this.gullet.beginGroup();
    var s = this.parseExpression(!1, "EOF");
    this.expect("EOF"), this.gullet.endGroup();
    var o = {
      type: "ordgroup",
      mode: this.mode,
      loc: a.loc,
      body: s
    };
    return t && this.switchMode(n), o;
  }
  /**
   * Parses an ordinary group, which is either a single nucleus (like "x")
   * or an expression in braces (like "{x+y}") or an implicit group, a group
   * that starts at the current position, and ends right before a higher explicit
   * group ends, or at EOF.
   */
  parseGroup(e, t) {
    var a = this.fetch(), n = a.text, s;
    if (n === "{" || n === "\\begingroup") {
      this.consume();
      var o = n === "{" ? "}" : "\\endgroup";
      this.gullet.beginGroup();
      var h = this.parseExpression(!1, o), m = this.fetch();
      this.expect(o), this.gullet.endGroup(), s = {
        type: "ordgroup",
        mode: this.mode,
        loc: h0.range(a, m),
        body: h,
        // A group formed by \begingroup...\endgroup is a semi-simple group
        // which doesn't affect spacing in math mode, i.e., is transparent.
        // https://tex.stackexchange.com/questions/1930/when-should-one-
        // use-begingroup-instead-of-bgroup
        semisimple: n === "\\begingroup" || void 0
      };
    } else if (s = this.parseFunction(t, e) || this.parseSymbol(), s == null && n[0] === "\\" && !Object.prototype.hasOwnProperty.call(Ga, n)) {
      if (this.settings.throwOnError)
        throw new S("Undefined control sequence: " + n, a);
      s = this.formatUnsupportedCmd(n), this.consume();
    }
    return s;
  }
  /**
   * Form ligature-like combinations of characters for text mode.
   * This includes inputs like "--", "---", "``" and "''".
   * The result will simply replace multiple textord nodes with a single
   * character in each value by a single textord node having multiple
   * characters in its value.  The representation is still ASCII source.
   * The group will be modified in place.
   */
  formLigatures(e) {
    for (var t = e.length - 1, a = 0; a < t; ++a) {
      var n = e[a];
      if (n.type === "textord") {
        var s = n.text, o = e[a + 1];
        if (!(!o || o.type !== "textord")) {
          if (s === "-" && o.text === "-") {
            var h = e[a + 2];
            a + 1 < t && h && h.type === "textord" && h.text === "-" ? (e.splice(a, 3, {
              type: "textord",
              mode: "text",
              loc: h0.range(n, h),
              text: "---"
            }), t -= 2) : (e.splice(a, 2, {
              type: "textord",
              mode: "text",
              loc: h0.range(n, o),
              text: "--"
            }), t -= 1);
          }
          (s === "'" || s === "`") && o.text === s && (e.splice(a, 2, {
            type: "textord",
            mode: "text",
            loc: h0.range(n, o),
            text: s + s
          }), t -= 1);
        }
      }
    }
  }
  /**
   * Parse a single symbol out of the string. Here, we handle single character
   * symbols and special functions like \verb.
   */
  parseSymbol() {
    var e = this.fetch(), t = e.text;
    if (/^\\verb[^a-zA-Z]/.test(t)) {
      this.consume();
      var a = t.slice(5), n = a.charAt(0) === "*";
      if (n && (a = a.slice(1)), a.length < 2 || a.charAt(0) !== a.slice(-1))
        throw new S(`\\verb assertion failed --
                    please report what input caused this bug`);
      return a = a.slice(1, -1), {
        type: "verb",
        mode: "text",
        body: a,
        star: n
      };
    }
    Object.prototype.hasOwnProperty.call(Kr, t[0]) && !W[this.mode][t[0]] && (this.settings.strict && this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + t[0] + '" used in math mode', e), t = Kr[t[0]] + t.slice(1));
    var s = si.exec(t);
    s && (t = t.substring(0, s.index), t === "i" ? t = "ı" : t === "j" && (t = "ȷ"));
    var o;
    if (W[this.mode][t]) {
      this.settings.strict && this.mode === "math" && pt.includes(t) && this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + t[0] + '" used in math mode', e);
      var h = W[this.mode][t].group, m = h0.range(e), d;
      gn(h) ? d = {
        type: "atom",
        mode: this.mode,
        family: h,
        loc: m,
        text: t
      } : d = {
        type: h,
        mode: this.mode,
        loc: m,
        text: t
      }, o = d;
    } else if (t.charCodeAt(0) >= 128)
      this.settings.strict && (_r(t.charCodeAt(0)) ? this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + t[0] + '" used in math mode', e) : this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + t[0] + '"' + (" (" + t.charCodeAt(0) + ")"), e)), o = {
        type: "textord",
        mode: "text",
        loc: h0.range(e),
        text: t
      };
    else
      return null;
    if (this.consume(), s)
      for (var v = 0; v < s[0].length; v++) {
        var b = s[0][v];
        if (!ht[b])
          throw new S("Unknown accent ' " + b + "'", e);
        var y = ht[b][this.mode] || ht[b].text;
        if (!y)
          throw new S("Accent " + b + " unsupported in " + this.mode + " mode", e);
        o = {
          type: "accent",
          mode: this.mode,
          loc: h0.range(e),
          label: y,
          isStretchy: !1,
          isShifty: !0,
          base: o
        };
      }
    return o;
  }
}
je.endOfExpression = /* @__PURE__ */ new Set(["}", "\\endgroup", "\\end", "\\right", "&"]);
var Xt = function(e, t) {
  if (!(typeof e == "string" || e instanceof String))
    throw new TypeError("KaTeX can only parse string typed expression");
  var a = new je(e, t);
  delete a.gullet.macros.current["\\df@tag"];
  var n = a.parse();
  if (delete a.gullet.macros.current["\\current@color"], delete a.gullet.macros.current["\\color"], a.gullet.macros.get("\\df@tag")) {
    if (!t.displayMode)
      throw new S("\\tag works only in display equations");
    n = [{
      type: "tag",
      mode: "text",
      body: n,
      tag: a.subparse([new m0("\\df@tag")])
    }];
  }
  return n;
}, Ua = function(e, t, a) {
  t.textContent = "";
  var n = Wt(e, a).toNode();
  t.appendChild(n);
};
typeof document != "undefined" && document.compatMode !== "CSS1Compat" && (typeof console != "undefined" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."), Ua = function() {
  throw new S("KaTeX doesn't work in quirks mode.");
});
var mi = function(e, t) {
  var a = Wt(e, t).toMarkup();
  return a;
}, di = function(e, t) {
  var a = new Rt(t);
  return Xt(e, a);
}, Va = function(e, t, a) {
  if (a.throwOnError || !(e instanceof S))
    throw e;
  var n = k(["katex-error"], [new d0(t)]);
  return n.setAttribute("title", e.toString()), n.setAttribute("style", "color:" + a.errorColor), n;
}, Wt = function(e, t) {
  var a = new Rt(t);
  try {
    var n = Xt(e, a);
    return ln(n, e, a);
  } catch (s) {
    return Va(s, e, a);
  }
}, fi = function(e, t) {
  var a = new Rt(t);
  try {
    var n = Xt(e, a);
    return on(n, e, a);
  } catch (s) {
    return Va(s, e, a);
  }
}, pi = "0.18.4", vi = {
  Span: se,
  Anchor: Ie,
  SymbolNode: d0,
  SvgNode: D0,
  PathNode: G0,
  LineNode: ft
}, $a = {
  /**
   * Current KaTeX version
   */
  version: pi,
  /**
   * Renders the given LaTeX into an HTML+MathML combination, and adds
   * it as a child to the specified DOM node.
   */
  render: Ua,
  /**
   * Renders the given LaTeX into an HTML+MathML combination string,
   * for sending to the client.
   */
  renderToString: mi,
  /**
   * KaTeX error, usually during parsing.
   */
  ParseError: S,
  /**
   * The schema of Settings
   */
  SETTINGS_SCHEMA: ct,
  /**
   * Parses the given LaTeX into KaTeX's internal parse tree structure,
   * without rendering to HTML or MathML.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __parse: di,
  /**
   * Renders the given LaTeX into an HTML+MathML internal DOM tree
   * representation, without flattening that representation to a string.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __renderToDomTree: Wt,
  /**
   * Renders the given LaTeX into an HTML internal DOM tree representation,
   * without MathML and without flattening that representation to a string.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __renderToHTMLTree: fi,
  /**
   * extends internal font metrics object with a new object
   * each key in the new object represents a font name
  */
  __setFontMetrics: G1,
  /**
   * adds a new symbol to builtin symbols table
   */
  __defineSymbol: i,
  /**
   * adds a new function to builtin function list,
   * which directly produce parse tree elements
   * and have their own html/mathml builders
   */
  __defineFunction: B,
  /**
   * adds a new macro to builtin macro list
   */
  __defineMacro: c,
  /**
   * Expose the dom tree node types, which can be useful for type checking nodes.
   *
   * NOTE: These methods are not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __domTree: vi
};
const Yt = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"], ja = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"], gi = {
  arabic: Yt,
  extended: ja
};
function Zt(r, e = "arabic") {
  if (e === "latin") return String(r);
  const t = gi[e];
  return String(r).replace(/[0-9]/g, (a) => t[Number(a)]);
}
function bi(r) {
  return String(r).replace(/[٠-٩]/g, (e) => String(Yt.indexOf(e))).replace(/[۰-۹]/g, (e) => String(ja.indexOf(e)));
}
function Kt(r) {
  return r.replace(/,/g, "٬").replace(/\./g, "٫").replace(/[0-9]/g, (e) => Yt[Number(e)]);
}
function yi(r, e = "arabic", t = !0) {
  return e === "latin" ? r : r.replace(/\d+(?:[.,]\d+)*/g, (a) => t ? Kt(a) : Zt(a, e));
}
function xi(r) {
  return /[٠-٩۰-۹]/.test(r);
}
const wi = [
  "text",
  "textnormal",
  "textbf",
  "textit",
  "textrm",
  "mathrm",
  "mathbf",
  "mathit",
  "mathtt",
  "mathsf",
  "mathscr",
  "mathfrak",
  "mathbb",
  "mathcal",
  "color",
  "textcolor",
  "operatorname",
  "operatorname*",
  "operatornamewithlimits"
], Jr = new RegExp(
  `\\\\(?:${wi.join("|")})\\{[^}]*\\}`,
  "g"
);
function Jt(r) {
  const e = [];
  let t;
  for (Jr.lastIndex = 0; (t = Jr.exec(r)) !== null; )
    e.push({ start: t.index, end: t.index + t[0].length });
  e.sort((n, s) => n.start - s.start);
  const a = [];
  for (const n of e) {
    const s = a[a.length - 1];
    s && n.start <= s.end ? s.end = Math.max(s.end, n.end) : a.push({ ...n });
  }
  return a;
}
function Qt(r, e) {
  for (const t of e) {
    if (r >= t.start && r < t.end) return !0;
    if (t.start > r) break;
  }
  return !1;
}
const ki = {
  // ─── Basic trigonometric ─────────────────────────────────
  "\\sin": "\\operatorname{جا}",
  "\\cos": "\\operatorname{جتا}",
  "\\tan": "\\operatorname{ظا}",
  "\\cot": "\\operatorname{ظتا}",
  "\\sec": "\\operatorname{قا}",
  "\\csc": "\\operatorname{قتا}",
  // ─── Inverse trigonometric ───────────────────────────────
  "\\arcsin": "\\operatorname{جا}^{-1}",
  "\\arccos": "\\operatorname{جتا}^{-1}",
  "\\arctan": "\\operatorname{ظا}^{-1}",
  "\\arccot": "\\operatorname{ظتا}^{-1}",
  "\\arcsec": "\\operatorname{قا}^{-1}",
  "\\arccsc": "\\operatorname{قتا}^{-1}",
  // ─── Hyperbolic ──────────────────────────────────────────
  "\\sinh": "\\operatorname{جـا}",
  // جيب زائدي
  "\\cosh": "\\operatorname{جتـا}",
  // جيب تمام زائدي
  "\\tanh": "\\operatorname{ظـا}",
  // ظل زائدي
  "\\coth": "\\operatorname{ظتـا}",
  // ظل تمام زائدي
  "\\sech": "\\operatorname{قـا}",
  // قاطع زائدي
  "\\csch": "\\operatorname{قتـا}",
  // قاطع تمام زائدي
  // ─── Logarithms & exponentials ───────────────────────────
  "\\ln": "\\operatorname{لو}",
  "\\log": "\\operatorname{لغ}",
  "\\lg": "\\operatorname{لغ}",
  // ─── Limits (kept as \arabiLim; translated separately) ───
  "\\liminf": "\\operatorname*{نها}",
  // ─── Maxima / minima ─────────────────────────────────────
  "\\max": "\\operatorname*{أقصى}",
  "\\min": "\\operatorname*{أدنى}",
  "\\sup": "\\operatorname*{حد\\,أعلى}",
  "\\inf": "\\operatorname*{حد\\,أدنى}",
  // ─── Linear algebra ──────────────────────────────────────
  "\\det": "\\operatorname{محدد}",
  "\\dim": "\\operatorname{بعد}",
  "\\ker": "\\operatorname{نواة}",
  "\\rank": "\\operatorname{رتبة}",
  "\\tr": "\\operatorname{أثر}",
  "\\diag": "\\operatorname{قطري}",
  "\\span": "\\operatorname{مدى}",
  "\\null": "\\operatorname{فضاء\\,صفري}",
  // ─── Number theory ───────────────────────────────────────
  "\\gcd": "\\operatorname{ق.م.أ}",
  "\\lcm": "\\operatorname{م.م.أ}",
  "\\mod": "\\operatorname{باقي}",
  "\\bmod": "\\operatorname{باقي}",
  // ─── Probability & statistics ────────────────────────────
  "\\Pr": "\\operatorname{حا}",
  "\\P": "\\operatorname{حا}",
  // ─── Complex & argument ──────────────────────────────────
  "\\arg": "\\operatorname{سعة}",
  "\\deg": "\\operatorname{درجة}",
  "\\sgn": "\\operatorname{إشا}",
  "\\Re": "\\operatorname{حق}",
  "\\Im": "\\operatorname{تخ}",
  "\\hom": "\\operatorname{تشا}",
  "\\Hom": "\\operatorname{تشا}",
  // ─── Special operator forms (preserved as-is) ────────────
  // \sum, \prod, \int stay — they are mirrored visually via CSS.
  "\\sum": "\\sum",
  "\\prod": "\\prod",
  "\\coprod": "\\coprod",
  "\\int": "\\int",
  "\\iint": "\\iint",
  "\\iiint": "\\iiint",
  "\\oint": "\\oint",
  "\\partial": "\\partial",
  "\\nabla": "\\nabla",
  "\\infty": "\\infty",
  "\\lim": "\\lim",
  // processed via arabiLim pathway
  "\\limsup": "\\operatorname*{نها}",
  // ─── Special marker used internally for limit translation ─
  // \arabiLim is a sentinel that the translator pipeline replaces
  // with the proper \operatorname* form. Users normally do not write this.
  "\\arabiLim": "\\operatorname*{نها}"
  // '\\lim': '\\operatorname*{نها}',
}, Dt = {
  // ─── Lowercase ───────────────────────────────────────────
  x: "س",
  y: "ص",
  z: "ع",
  a: "أ",
  b: "ب",
  c: "جـ",
  d: "د",
  e: "هـ",
  // Euler's number
  f: "ف",
  g: "ق",
  h: "ح",
  i: "ت",
  // imaginary unit
  j: "ج",
  k: "ك",
  l: "ل",
  m: "م",
  n: "ن",
  o: "ع",
  p: "ب",
  q: "ق",
  r: "ر",
  s: "ز",
  t: "ت",
  // u: 'ث',
  // v: 'ڤ',
  // w: 'و',
  // ─── Uppercase ───────────────────────────────────────────
  A: "أ",
  B: "ب",
  C: "جـ",
  D: "د",
  E: "هـ",
  F: "ف",
  G: "ق",
  H: "ح",
  I: "ت",
  J: "ج",
  K: "ك",
  L: "ل",
  M: "م",
  N: "ن",
  O: "ع",
  P: "ح",
  Q: "ق",
  R: "ر",
  S: "ز",
  T: "ت",
  U: "ث",
  V: "ڤ",
  W: "و",
  X: "س",
  Y: "ص",
  Z: "ز"
};
function Si(r) {
  return r.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
function _t(r, e = {}) {
  const t = { ...ki, ...e }, a = Jt(r), n = /\\[a-zA-Z]+/g;
  let s = "", o = 0, h;
  for (; (h = n.exec(r)) !== null; ) {
    const m = h[0], d = h.index + m.length, v = r[d], y = !!v && /[A-Za-z]/.test(v) ? void 0 : t[m];
    if (y !== void 0 && !Qt(h.index, a)) {
      s += r.slice(o, h.index) + y, o = d;
      continue;
    }
    s += r.slice(o, d), o = d;
  }
  return s += r.slice(o), s;
}
function Xe(r) {
  let e = r;
  return e = e.replace(
    /\bd([xyztruvs])\b/g,
    (t, a) => {
      var s;
      return `\\text{د}\\text{${(s = Dt[a]) != null ? s : a}}`;
    }
  ), e = e.replace(
    /d\\(theta|phi|rho|alpha|beta|gamma|delta)\b/g,
    (t, a) => `\\text{د}\\${a}`
  ), e = e.replace(
    /\bd([AVS])\b/g,
    (t, a) => {
      var s;
      return `\\text{د}\\text{${(s = Dt[a]) != null ? s : a}}`;
    }
  ), e;
}
function er(r, e = {}) {
  const t = { ...Dt, ...e }, a = Object.keys(t);
  if (a.length === 0) return r;
  const n = a.sort((h, m) => m.length - h.length), s = Jt(r), o = new RegExp(
    `(?<![A-Za-z\\\\])(${n.map(Si).join("|")})(?![A-Za-z])`,
    "g"
  );
  return r.replace(o, (h, m, d, v) => {
    const b = Number(d);
    return Qt(b, s) ? h : `\\text{${t[h]}}`;
  });
}
function Ai(r) {
  return Xe(r);
}
function zi(r, e = {}) {
  const {
    functions: t = !0,
    variables: a = !0,
    differentials: n = !0,
    customFunctionMap: s = {},
    customVariableMap: o = {}
  } = e;
  let h = r;
  return n && (h = Xe(h)), t && (h = _t(h, s)), a && (h = er(h, o)), h;
}
const Mi = {
  "<": ">",
  ">": "<",
  "\\lt": "\\gt",
  "\\gt": "\\lt",
  "\\leq": "\\geq",
  "\\geq": "\\leq",
  "\\le": "\\ge",
  "\\ge": "\\le",
  "\\leqslant": "\\geqslant",
  "\\geqslant": "\\leqslant",
  "\\lesssim": "\\gtrsim",
  "\\gtrsim": "\\lesssim",
  "\\ll": "\\gg",
  "\\gg": "\\ll",
  "\\nless": "\\ngtr",
  "\\ngtr": "\\nless",
  "\\nleq": "\\ngeq",
  "\\ngeq": "\\nleq"
}, Ti = {
  "\\to": "\\gets",
  "\\gets": "\\to",
  "\\rightarrow": "\\leftarrow",
  "\\leftarrow": "\\rightarrow",
  "\\longrightarrow": "\\longleftarrow",
  "\\longleftarrow": "\\longrightarrow",
  "\\Rightarrow": "\\Leftarrow",
  "\\Leftarrow": "\\Rightarrow",
  "\\Longrightarrow": "\\Longleftarrow",
  "\\Longleftarrow": "\\Longrightarrow",
  "\\hookrightarrow": "\\hookleftarrow",
  "\\hookleftarrow": "\\hookrightarrow",
  "\\mapsto": "\\mapsfrom",
  "\\mapsfrom": "\\mapsto",
  "\\rightleftharpoons": "\\leftrightharpoons",
  "\\leftrightharpoons": "\\rightleftharpoons"
}, Ci = {
  "\\langle": "\\rangle",
  "\\rangle": "\\langle",
  "\\lceil": "\\rceil",
  "\\rceil": "\\lceil",
  "\\lfloor": "\\rfloor",
  "\\rfloor": "\\lfloor",
  "\\lbrace": "\\rbrace",
  "\\rbrace": "\\lbrace",
  "\\lbrack": "\\rbrack",
  "\\rbrack": "\\lbrack"
}, Bi = {
  "\\sum": "\\sum",
  // mirrored via CSS
  "\\prod": "\\prod",
  // mirrored via CSS
  "\\int": "\\int",
  // mirrored via CSS
  "\\iint": "\\iint",
  "\\iiint": "\\iiint",
  "\\oint": "\\oint"
}, Di = {
  ...Mi,
  ...Ti,
  ...Ci,
  ...Bi
};
function qi(r) {
  return r.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
function Ri(r) {
  const e = qi(r);
  return r.length === 1 ? new RegExp(`(?<![A-Za-z\\\\])${e}(?![A-Za-z])`, "g") : new RegExp(e + "(?![A-Za-z])", "g");
}
function Xa(r, e = !0) {
  if (!e) return r;
  const t = Object.entries(Di).sort(
    (o, h) => h[0].length - o[0].length
  ), a = new RegExp(
    t.map(([o]) => `(?:${Ri(o).source})`).join("|"),
    "g"
  ), n = new Map(
    t.map(([o, h]) => [o, h])
  ), s = Jt(r);
  return r.replace(a, (...o) => {
    var d;
    const h = o[0], m = o[1];
    return Qt(m, s) ? h : (d = n.get(h)) != null ? d : h;
  });
}
const Qr = 2e4, Ni = 256;
class Ei {
  constructor(e) {
    Ze(this, "capacity");
    Ze(this, "map", /* @__PURE__ */ new Map());
    this.capacity = e;
  }
  get(e) {
    const t = this.map.get(e);
    return t !== void 0 && (this.map.delete(e), this.map.set(e, t)), t;
  }
  set(e, t) {
    if (this.map.has(e))
      this.map.delete(e);
    else if (this.map.size >= this.capacity) {
      const a = this.map.keys().next().value;
      a !== void 0 && this.map.delete(a);
    }
    this.map.set(e, t);
  }
  clear() {
    this.map.clear();
  }
  get size() {
    return this.map.size;
  }
}
const qt = new Ei(Ni);
function Ii() {
  qt.clear();
}
function Oi(r, e) {
  return [
    r,
    e.numerals,
    e.formatNumbers,
    e.translateFuncs,
    e.translateVars,
    e.translateDiffs,
    JSON.stringify(e.customFunctionMap),
    JSON.stringify(e.customVariableMap),
    e.mirrorSymbols,
    e.mirrorBigOperators,
    e.mirrorSqrt,
    e.mirrorBrackets,
    e.direction,
    e.fontFamily,
    e.displayMode,
    e.fullArabicMode,
    e.operatorScale,
    JSON.stringify(e.macros),
    e.output,
    String(e.strict),
    e.trust,
    e.minRuleThickness
  ].join("|");
}
const Wa = {
  // Numerals
  numerals: "arabic",
  formatNumbers: !0,
  // Translation
  translateFuncs: !0,
  translateVars: !0,
  translateDiffs: !0,
  customFunctionMap: {},
  customVariableMap: {},
  // Mirroring
  mirrorSymbols: !0,
  mirrorBigOperators: !0,
  mirrorSqrt: !0,
  mirrorBrackets: !0,
  // Rendering
  direction: "rtl",
  fontFamily: "Amiri",
  displayMode: !1,
  fullArabicMode: !0,
  // 1.05 compensates for the x-height difference between Arabic fonts
  // (Amiri et al.) and KaTeX_Main, so Arabic operator names (جا، جتا…)
  // visually match the size of their Latin counterparts out of the box.
  operatorScale: 1.05,
  // KaTeX
  macros: {},
  throwOnError: !1,
  output: "html",
  strict: !1,
  trust: !1,
  minRuleThickness: 0.04
};
function Z0(r = {}) {
  return { ...Wa, ...r };
}
function tr(r, e = {}) {
  const t = Z0(e);
  let a = r.length > Qr ? r.slice(0, Qr) : r;
  return a.trim() && (t.translateFuncs && (a = a.replace(/\\lim(?![A-Za-z])/g, "\\arabiLim")), t.translateDiffs && (a = Xe(a)), t.translateFuncs && (a = _t(a, t.customFunctionMap)), t.translateVars && (a = er(a, t.customVariableMap)), t.mirrorSymbols && (a = Xa(a, !0)), t.numerals !== "latin" && (a = Fi(a, t.numerals, t.formatNumbers))), a;
}
function Fi(r, e, t) {
  let a = "", n = 0;
  for (; n < r.length; ) {
    const s = r[n];
    if (s && /[0-9]/.test(s)) {
      const o = n > 0 ? r[n - 1] : "";
      if (o && /[A-Za-z]/.test(o))
        a += s;
      else {
        let h = n;
        for (; h < r.length; ) {
          const d = r[h];
          if (d && /[0-9.,]/.test(d))
            h++;
          else
            break;
        }
        const m = r.slice(n, h);
        a += t ? Kt(m) : Zt(m, e), n = h;
        continue;
      }
    } else
      a += s != null ? s : "";
    n++;
  }
  return a;
}
function Ya(r = {}) {
  return {
    // Trigonometric
    "\\جا": "\\operatorname{جا}",
    "\\جتا": "\\operatorname{جتا}",
    "\\ظا": "\\operatorname{ظا}",
    "\\ظتا": "\\operatorname{ظتا}",
    "\\قا": "\\operatorname{قا}",
    "\\قتا": "\\operatorname{قتا}",
    // Logarithms
    "\\لو": "\\operatorname{لو}",
    "\\لغ": "\\operatorname{لغ}",
    // Limits
    "\\نها": "\\operatorname*{نها}",
    "\\نهى": "\\operatorname*{نها}",
    // Max/min
    "\\اقصى": "\\operatorname*{أقصى}",
    "\\ادنى": "\\operatorname*{أدنى}",
    // Imaginary / constants
    "\\ت": "\\text{ت}",
    "\\هـ": "\\text{هـ}",
    ...r
  };
}
function Za(r) {
  const e = Z0(r), t = ["katex-arabic"];
  return e.mirrorBigOperators && t.push("mirror-big-ops"), e.mirrorSqrt && t.push("mirror-sqrt"), e.mirrorBrackets && t.push("mirror-brackets"), e.mirrorSymbols && t.push("mirror-symbols"), e.fullArabicMode && t.push("full-rtl-mode"), e.displayMode ? t.push("is-display") : t.push("is-inline"), t;
}
function Hi(r, e) {
  const t = Z0(e);
  return `<span class="${Za(t).join(" ")}" dir="${t.direction}" style="font-family:'${t.fontFamily}','KaTeX_Main',serif;direction:${t.direction};--ka-op-scale:${t.operatorScale};">${r}</span>`;
}
function Li(r) {
  return r.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function Ka(r, e = {}) {
  return Ee(r, e).html;
}
function Ee(r, e = {}) {
  var o;
  const t = Z0(e), a = Oi(r, t), n = qt.get(a);
  if (n !== void 0)
    return { html: n, error: null };
  const s = tr(r, t);
  try {
    const h = $a.renderToString(s, {
      displayMode: t.displayMode,
      throwOnError: !0,
      output: t.output,
      strict: t.strict,
      trust: t.trust,
      minRuleThickness: t.minRuleThickness,
      macros: {
        ...Ya(t.macros),
        ...(o = t.macros) != null ? o : {}
      }
    }), m = Hi(h, t);
    return qt.set(a, m), { html: m, error: null };
  } catch (h) {
    const m = h instanceof Error ? h.message : String(h);
    if (t.throwOnError)
      throw h instanceof Error ? h : new Error(m);
    return console.error("[katex-arabic] render failed:", m, `
LaTeX:`, r), {
      html: `<span class="katex-arabic katex-arabic--error" dir="rtl" role="alert" style="color:#dc2626;font-family:monospace;"><span class="katex-arabic__error-icon" aria-hidden="true">⚠</span> <span class="katex-arabic__error-text">${Li(r)}</span></span>`,
      error: m
    };
  }
}
function Pi(r, e, t = {}) {
  const a = Ka(r, t);
  e.innerHTML = a, $i(e, t);
}
function Gi(r, e = {}) {
  return r.map((t) => typeof t == "string" ? Ee(t, e) : Ee(t.latex, { ...e, ...t.options }));
}
function Ui(r, e = {}) {
  return tr(r, e);
}
function Vi(r, e = {}) {
  const t = Z0(e), a = tr(r, t);
  try {
    return $a.renderToString(a, {
      displayMode: t.displayMode,
      throwOnError: !0,
      strict: t.strict,
      trust: t.trust
    }), null;
  } catch (n) {
    return n instanceof Error ? n.message : String(n);
  }
}
function $i(r, e) {
  const t = Z0(e), a = r.querySelector(".katex");
  a && (a.setAttribute("dir", t.direction), a.style.fontFamily = `'${t.fontFamily}', 'KaTeX_Main', serif`, a.style.direction = t.direction);
}
const ji = "1.1.2", Wi = {
  // ─── Rendering ───────────────────────────────────────────
  render: Pi,
  renderToString: Ka,
  renderWithMeta: Ee,
  renderBatch: Gi,
  // ─── Text processing ─────────────────────────────────────
  process: Ui,
  validate: Vi,
  // ─── Numerals ────────────────────────────────────────────
  toArabicNumerals: Zt,
  fromArabicNumerals: bi,
  formatArabicNumber: Kt,
  convertNumbersInText: yi,
  isArabicDigit: xi,
  // ─── Translation ─────────────────────────────────────────
  translateFunctions: _t,
  translateVariables: er,
  translateDifferentials: Xe,
  translateSpecialPatterns: Ai,
  translateAll: zi,
  // ─── Mirroring ───────────────────────────────────────────
  applyMirroredSymbols: Xa,
  // ─── Options / cache ─────────────────────────────────────
  resolveOptions: Z0,
  buildCssClasses: Za,
  getArabicMacros: Ya,
  clearCache: Ii,
  DEFAULT_OPTIONS: Wa,
  VERSION: ji
};
export {
  Wi as default
};
