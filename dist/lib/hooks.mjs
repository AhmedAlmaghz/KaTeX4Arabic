import { useDeferredValue, useMemo } from "react";
import { r as renderArabicWithMeta, a as renderArabicBatch, p as processArabicLatex } from "./render.mjs";
const EMPTY_OPTIONS = Object.freeze({});
function useArabicKatex(latex, options = EMPTY_OPTIONS) {
  const deferredLatex = useDeferredValue(latex);
  return useMemo(() => {
    try {
      return renderArabicWithMeta(deferredLatex, options).html;
    } catch {
      return "";
    }
  }, [deferredLatex, options]);
}
function useArabicKatexResult(latex, options = EMPTY_OPTIONS) {
  const deferredLatex = useDeferredValue(latex);
  return useMemo(() => {
    const processedLatex = processArabicLatex(deferredLatex, options);
    const { html, error } = renderArabicWithMeta(deferredLatex, options);
    if (error !== null) {
      return { html: "", processedLatex, ok: false, error };
    }
    return { html, processedLatex, ok: true };
  }, [deferredLatex, options]);
}
function useArabicKatexBatch(items, options = EMPTY_OPTIONS) {
  const itemsKey = useMemo(
    () => items.map((it) => typeof it === "string" ? it : `${it.latex}|${JSON.stringify(it.options ?? {})}`).join("\0"),
    [items]
  );
  return useMemo(
    () => renderArabicBatch(items, options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [itemsKey, options]
  );
}
export {
  useArabicKatex,
  useArabicKatexBatch,
  useArabicKatexResult
};
//# sourceMappingURL=hooks.mjs.map
