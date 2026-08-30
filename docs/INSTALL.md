# 📦 تعليمات التنصيب والاستخدام — حزمة `katex-arabic`

> دليل شامل لتثبيت واستخدام مكتبة **KaTeX Arabic** لعرض المعادلات الرياضية بالأسلوب العربي.

---

## 1️⃣ التنصيب

### المتطلبات
- **Node.js ≥ 18**
- **KaTeX ≥ 0.16** (اعتماد نظير إلزامي)
- **React ≥ 18** (اختياري — فقط إذا أردت استخدام الخطاطيف)

### أوامر التنصيب

```bash
# تثبيت الحزمة مع KaTeX
npm install katex4arabic katex

# إذا كنت تستخدم React وتريد الخطاطيف
npm install react react-dom
```

أو باستخدام yarn / pnpm:

```bash
yarn add katex-arabic katex
pnpm add katex-arabic katex
```

---

## 2️⃣ الاستيراد

الحزمة توفر ثلاثة مداخل (exports):

| المدخل | المحتوى |
| --- | --- |
| `katex-arabic` | الدوال الأساسية للعرض والمعالجة |
| `katex4arabic/hooks` | خطاطيف React (اختياري) |
| `katex4arabic/katex-arabic.css` | ملف الأنماط — **يجب استيراده مرة واحدة** |

```ts
// الدوال الأساسية
import { renderArabicToString, renderArabic, processLatex } from 'katex4arabic';

// خطاطيف React (اختياري)
import { useArabicKatex, useArabicKatexResult } from 'katex4arabic/hooks';

// ملف الأنماط — استورده مرة واحدة في نقطة دخول تطبيقك
import 'katex4arabic/katex-arabic.css';
```

---

## 2️⃣ أ) التثبيت عبر npm — بملف واحد فقط

بعد التنصيب، يمكنك استيراد **كامل المكتبة من ملف JS واحد** (KaTeX مدمج داخله):

```ts
import KaTeXArabic from 'katex4arabic/bundle';  // ملف واحد (يشمل KaTeX)
import 'katex4arabic/bundle.css';               // ملف CSS واحد

const html = KaTeXArabic.renderToString('x^2 + y^2 = z^2');
```

أو عبر CommonJS:

```ts
const KaTeXArabic = require('katex4arabic/bundle');
```

> ملاحظة: `bundle` يحزم KaTeX + كل تحويلاتنا في ملف واحد مصغّر للراحة التامّة.
> أما مدخل `katex4arabic` الأساسي فمصمّم للمشاريع الاحترافية (KaTeX كاعتماد نظير، بدون تكرار).

---

## 2️⃣ ب) التثبيت عبر CDN (ملفان فقط — بدون أي إعداد)

تُبنى الحزمة أيضاً كملفين جاهزين للتحميل المباشر عبر أي CDN:

| الملف | المحتوى |
| --- | --- |
| `katex-arabic.min.js` | ملف JS واحد (IIFE) يشمل **KaTeX بداخله** وكل التحويلات العربية |
| `katex-arabic.min.css` | ملف CSS واحد يضم `katex.min.css` + أنماط تحسين عرض الرموز العربية |

**الرابط من مستودع GitHub** (يعمل مباشرة قبل النشر):

```
https://cdn.jsdelivr.net/gh/AhmedAlmaghz/katex4arabic@main/dist/cdn/katex-arabic.min.js
https://cdn.jsdelivr.net/gh/AhmedAlmaghz/katex4arabic@main/dist/cdn/katex-arabic.min.css
```

> استبدل `@main` بفرعك الافتراضي (سيكون `master` في بعض المستودعات) أو بنسخة release مثل `@1.1.2`.
> بعد النشر على npm يعمل أيضاً:
> `https://cdn.jsdelivr.net/npm/katex4arabic/dist/cdn/katex-arabic.min.js` + ملف CSS بنفس المسار.

**مثال HTML كامل — لا يحتاج شيئاً سواهما:**

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <!-- ملف JS واحد يشمل KaTeX -->
  <script defer src="https://cdn.jsdelivr.net/gh/AhmedAlmaghz/katex4arabic@main/dist/cdn/katex-arabic.min.js"></script>
  <!-- ملف CSS واحد -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/AhmedAlmaghz/katex4arabic@main/dist/cdn/katex-arabic.min.css">
</head>
<body>
  <div id="eq">x^2 + y^2 = z^2</div>

  <script>
    window.addEventListener('DOMContentLoaded', () => {
      const el = document.getElementById('eq');
      // العرض الافتراضي جاهز — لا حاجة لتمرير أي خيارات
      KaTeXArabic.render(el.textContent.trim(), el);
    });
  </script>
</body>
</html>
```

المتغير العمومي `window.KaTeXArabic` يوفّر نفس واجهة KaTeX تماماً:

```js
const html = KaTeXArabic.renderToString('\\sin^2 x + \\cos^2 x = 1');
KaTeXArabic.render('\\int_0^1 x^2 dx', element);
KaTeXArabic.toArabicNumerals('123');            // '١٢٣'
KaTeXArabic.translateFunctions('sin');           // 'جا'
KaTeXArabic.resolveOptions({});                  // الخيارات الافتراضية
KaTeXArabic.VERSION;                             // '1.1.5'
```

---

## 3️⃣ الاستخدام

### أ) JavaScript عادي (Vanilla JS)

```ts
import { renderArabicToString } from 'katex4arabic';
import 'katex4arabic/katex-arabic.css';

const html = renderArabicToString('\\sin^2(x) + \\cos^2(x) = 1', {
  numerals: 'arabic',        // أرقام عربية-هندية ٠١٢…٩
  translateFuncs: true,      // sin → جا
  translateVars: true,       // x → س
  direction: 'rtl',          // اتجاه من اليمين لليسار
});

document.getElementById('equation').innerHTML = html;
// النتيجة: جا²(س) + جتا²(س) = ١
```

### ب) العرض داخل عنصر DOM مباشرة

```ts
import { renderArabic } from 'katex4arabic';

const element = document.getElementById('math');
// التوقيع: renderArabic(latex, element, options)
renderArabic('\\int_0^1 x^2 \\, dx', element, {
  fullArabicMode: true,       // تفعيل كل التحويلات العربية دفعة واحدة
  displayMode: true,         // عرض ككتلة (block) وليس سطريا
});
```

> ملاحظة: ترتيب الوسائط في `renderArabic` هو `(latex, element, options)` — النص أولاً ثم العنصر ثم الخيارات.

### ج) مع React (الخطاطيف)

```tsx
import { useArabicKatex } from 'katex4arabic/hooks';
import 'katex4arabic/katex-arabic.css';

function Equation({ latex }: { latex: string }) {
  const html = useArabicKatex(latex, { numerals: 'arabic' });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

وللحصول على نتيجة مفصّلة مع رسالة الخطأ (مفيد للمحررات):

```tsx
import { useArabicKatexResult } from 'katex4arabic/hooks';

function Editor({ latex }: { latex: string }) {
  const { html, ok, error, processedLatex } = useArabicKatexResult(latex);

  if (!ok) return <p className="error">{error}</p>;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

ولعرض قائمة معادلات دفعة واحدة (الأكثر كفاءة):

```tsx
import { useArabicKatexBatch } from 'katex4arabic/hooks';

function Gallery({ items }: { items: string[] }) {
  const results = useArabicKatexBatch(items, { fullArabicMode: true });
  return (
    <ul>
      {results.map((r, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: r.html }} />
      ))}
    </ul>
  );
}
```

---

## 4️⃣ الخيارات المتاحة (`options`)

يمكن تمرير أي مجموعة جزئية من الخيارات:

```ts
renderArabicToString(latex, {
  // ─── الأرقام ───
  numerals: 'arabic',        // 'arabic' (٠-٩) | 'extended' (۰-۹) | 'latin'
  formatNumbers: true,       // استخدام الفواصل العربية ٬ و ٫

  // ─── الترجمة ───
  translateFuncs: true,      // sin→جا، cos→جتا، lim→نها، log→لغ
  translateVars: true,       // x→س، y→ص، e→هـ
  translateDiffs: true,      // dx→د س

  // ─── عكس الرموز ───
  mirrorSymbols: true,       // عكس رموز المقارنة < > ≤ ≥
  mirrorBigOperators: true,  // عكس ∫ Σ ∏
  mirrorSqrt: true,          // عكس الجذر (الشرطة يمينا)
  mirrorBrackets: true,      // عكس الأقواس

  // ─── العرض ───
  direction: 'rtl',          // 'rtl' | 'ltr'
  displayMode: false,        // true = كتلة، false = سطري
  fullArabicMode: true,      // تفعيل كل التحويلات معا
  operatorScale: 1.08,       // تكبير بصري لأسماء الدوال العربية

  // ─── متقدم ───
  throwOnError: false,       // false = عرض رسالة خطأ بدل رمي استثناء
  macros: {},                // ماكروهات KaTeX إضافية
});
```

### جدول الخيارات الكامل

| الخيار | النوع | الافتراضي | الوصف |
| --- | --- | --- | --- |
| `numerals` | `arabic \| extended \| latin` | `arabic` | نظام الأرقام المعروض |
| `formatNumbers` | `boolean` | `true` | فواصل عربية `٬ ٫` في الأعداد |
| `translateFuncs` | `boolean` | `true` | ترجمة أسماء الدوال |
| `translateVars` | `boolean` | `true` | ترجمة المتغيرات اللاتينية |
| `translateDiffs` | `boolean` | `true` | ترجمة التفاضلات `dx → د س` |
| `mirrorSymbols` | `boolean` | `true` | عكس رموز المقارنة والأسهم |
| `mirrorBigOperators` | `boolean` | `true` | عكس `∫ Σ ∏` والحدود (الحد الأدنى يميناً والعلوي يساراً) |
| `mirrorSqrt` | `boolean` | `true` | عكس رمز الجذر `√` بجميع درجاته (تربيعية، نونية، متداخلة) |
| `mirrorBrackets` | `boolean` | `true` | عكس الأقواس الزاوية والكبيرة والدوال المتقطعة (`cases`) |
| `direction` | `rtl \| ltr` | `rtl` | اتجاه المعادلة |
| `fullArabicMode` | `boolean` | `true` | قراءة RTL للمعادلة كاملة |
| `operatorScale` | `number` | `1.05` | حجم العوامل العربية (0.9–1.25) |
| `fontFamily` | `string` | `Amiri` | خط النصوص العربية |
| `displayMode` | `boolean` | `false` | وضع العرض (block) مقابل السطري |
| `throwOnError` | `boolean` | `false` | إلقاء خطأ بدل العرض الودّي |
| `customFunctionMap` | `Record` | `{}` | تجاوز ترجمات الدوال |
| `customVariableMap` | `Record` | `{}` | تجاوز ترجمات المتغيرات |
| `macros` | `Record` | `{}` | ماكرو KaTeX إضافية |
| `minRuleThickness` | `number` | `0.04` | سماكة خطوط الكسور |

---

## 5️⃣ دوال مساعدة إضافية

```ts
import {
  toArabicNumerals,      // "123" → "١٢٣"
  fromArabicNumerals,    // "١٢٣" → "123"
  formatArabicNumber,    // تنسيق رقم بالفواصل العربية
  convertNumbersInText,  // تحويل الأرقام داخل نص
  translateFunctions,    // ترجمة أسماء الدوال فقط
  translateAll,          // كل الترجمات
  validateLatex,         // التحقق من صحة LaTeX
  processLatex,          // المعالجة دون عرض
  detectStructuralClass, // كشف البنية الخاصة (has-cases للدوال المتقطعة)
  clearRenderCache,      // مسح ذاكرة التخزين المؤقت
  VERSION,               // رقم إصدار المكتبة
} from 'katex4arabic';
```

---

## 6️⃣ ملاحظات مهمة

1. **ملف CSS إلزامي**: بدون استيراد `katex4arabic/katex-arabic.css` ستظهر المعادلات بدون تنسيق صحيح (محاذاة، خطوط، عكس الرموز).
2. **الخطوط العربية**: يفضّل تحميل خط عربي في صفحتك (مثل Amiri أو Noto Naskh Arabic) للحصول على أفضل تشكيل للحروف.
3. **الأداء**: الدوال تستخدم ذاكرة تخزين مؤقت (LRU cache) داخليا، فلا تقلق من استدعاء نفس المعادلة مرارا.
4. **الخطأ الآمن**: عند وجود خطأ في LaTeX، تعرض رسالة خطأ منسّقة بدلا من توقف التطبيق (ما لم تفعّل `throwOnError: true`).

---

## 7️⃣ مثال كامل سريع

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.18.4/dist/katex.min.css">
  <style>/* استورد katex-arabic.css هنا عبر أداة البناء */</style>
</head>
<body>
  <div id="math"></div>
  <script type="module">
    import { renderArabic } from 'katex4arabic';
    renderArabic(document.getElementById('math'),
      '\\lim_{x \\to \\infty} \\frac{\\sin(x)}{x} = 0',
      { fullArabicMode: true, displayMode: true });
  </script>
</body>
</html>
```

---

## 🔗 روابط ذات صلة

- [README الرئيسي](../README.md)
- [موقع KaTeX الرسمي](https://katex.org)
- [مستودع المشروع](https://github.com/ahmedalmaghz/KaTeX4Arabic)

---

## 📜 الترخيص

مفتوح المصدر، مبنية على [KaTeX](https://katex.org) (MIT).
بواسطة [Ahmed Almaghz](https://github.com/AhmedAlmaghz/KaTeX4Arabic) - 2026