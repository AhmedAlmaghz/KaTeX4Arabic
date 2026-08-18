"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const react = require("react");
const render = require("./render.cjs");
const EMPTY_OPTIONS = Object.freeze({});
function useArabicKatex(latex, options = EMPTY_OPTIONS) {
  const deferredLatex = react.useDeferredValue(latex);
  return react.useMemo(() => {
    try {
      return render.renderArabicWithMeta(deferredLatex, options).html;
    } catch {
      return "";
    }
  }, [deferredLatex, options]);
}
function useArabicKatexResult(latex, options = EMPTY_OPTIONS) {
  const deferredLatex = react.useDeferredValue(latex);
  return react.useMemo(() => {
    const processedLatex = render.processArabicLatex(deferredLatex, options);
    const { html, error } = render.renderArabicWithMeta(deferredLatex, options);
    if (error !== null) {
      return { html: "", processedLatex, ok: false, error };
    }
    return { html, processedLatex, ok: true };
  }, [deferredLatex, options]);
}
function useArabicKatexBatch(items, options = EMPTY_OPTIONS) {
  const itemsKey = react.useMemo(
    () => items.map((it) => typeof it === "string" ? it : `${it.latex}|${JSON.stringify(it.options ?? {})}`).join("\0"),
    [items]
  );
  return react.useMemo(
    () => render.renderArabicBatch(items, options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemsKey, options]
  );
}
exports.useArabicKatex = useArabicKatex;
exports.useArabicKatexBatch = useArabicKatexBatch;
exports.useArabicKatexResult = useArabicKatexResult;
//# sourceMappingURL=hooks.cjs.map
