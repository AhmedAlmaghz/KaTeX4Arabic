# KaTeX Arabic 🌙

مكتبة احترافية لعرض المعادلات الرياضية بالأسلوب العربي، مبنية على
[KaTeX](https://katex.org). تحوّل المعادلات اللاتينية إلى شكل عربي قراءةً
ومظهراً: أرقام عربية-هندية، ترجمة أسماء الدوال والمتغيرات، عكس الرموز
للتوافق مع الاتجاه من اليمين إلى اليسار — مع تكافؤ بصري مع التنسيق
اللاتيني في **الشكل والحجم والمحاذاة**.

هذا المستودع يحتوي على:

- **مكتبة** `src/lib/katex-arabic` — قلب المعالجة العربية (مستقل عن الواجهة).
- **تطبيق عرض تجريبي** — معرض معادلات، محرر مباشر، مقارنة لاتيني/عربي، وتوثيق.

---

## ✨ المزايا

| الميزة | الوصف |
| --- | --- |
| 🔢 أرقام عربية | تحويل تلقائي إلى عربية-هندية `٠١٢…٩` أو فارسية `۰۱۲…۹` |
| 📐 ترجمة الدوال | `sin → جا`، `cos → جتا`، `lim → نها`، `log → لغ` … |
| 🔤 ترجمة المتغيرات | `x → س`، `y → ص`، `dx → د س`، `e → هـ` … |
| 🔄 عكس الرموز | تكامل ومجموع وجذر وأقواس ورموز مقارنة ومجموعات وأسهم معكوسة بصرياً |
| 🔀 الدوال المتقطعة | قوس `cases` يُعرض يميناً بالأسلوب العربي عبر فئة `has-cases` التلقائية |
| 🌙 وضع RTL كامل | المعادلة بأكملها تُقرأ من اليمين لليسار |
| 📏 تكافؤ لاتيني | أحجام وخطوط أساس ومحاذاة مطابقة لتنسيق KaTeX اللاتيني |
| 🎨 تخصيص بصري | متغيرات CSS + خيار `operatorScale` للتحكم الدقيق |
| 🛡️ إخفاء آمن | عدم المساس بنصوص `\text{}` وحماية من إعادة المعالجة |
| ♿ إمكانية وصول | `aria-label`، لوحة مفاتيح، ودعم وضع الطباعة |

---

## 🚀 التشغيل السريع

```bash
npm install        # تثبيت الاعتماديات
npm run dev        # تشغيل بيئة التطوير
npm run build      # بناء تطبيق العرض (ملفات JS/CSS منفصلة)
npm run build:all  # بناء المكتبة القابلة للنشر (JS + أنواع + CSS)
npm run preview    # معاينة البناء
npm run typecheck  # فحص الأنواع (TypeScript)
npm test           # تشغيل الاختبارات (Vitest)
npm run check      # فحص شامل: typecheck + tests + build
```

> متطلب: Node.js ≥ 18

---

## 📦 التثبيت كحزمة npm

> 📖 **دليل التنصيب والاستخدام الكامل**: [docs/INSTALL.md](docs/INSTALL.md)

```bash
npm install katex4arabic
```

الحزمة تتطلب `katex` كاعتماد نظير (peer dependency)، و`react` اختيارياً
لاستخدام الخطاطيف والمكوّنات:

```bash
npm install katex
```

### الاستيراد

```ts
// الدوال الأساسية
import { renderArabicToString, renderArabic, processLatex } from 'katex4arabic';

// خطاطيف React (اختياري)
import { useArabicKatex, useArabicKatexResult } from 'katex4arabic/hooks';

// ملف الأنماط — يجب استيراده مرة واحدة في تطبيقك
import 'katex4arabic/katex-arabic.css';
```

---

## 📦 كحزمة npm — استيراد وتحميل بملف واحد فقط

بعد `npm install katex4arabic katex`، يمكن استيراد **كامل المكتبة من ملف​​ JS واحد** (KaTeX مدمج داخله — صفر إعداد):

```ts
import KaTeXArabic from 'katex4arabic/bundle';  // ملف واحد (يشمل KaTeX)
import 'katex4arabic/bundle.css';               // ملف CSS واحد

const html = KaTeXArabic.renderToString('x^2 + y^2 = z^2');
```

أو في بيئة CommonJS:

```ts
const KaTeXArabic = require('katex4arabic/bundle');
```

---

## 🚀 الاستخدام عبر CDN (ملفان فقط — صفر إعداد)

تُنشر الحزمة أيضاً كملفين جاهزين للتحميل المباشر — **KaTeX مدمج داخل ملف JS واحد** وغير مطلوب تحميله منفصلاً:

**الرابط من مستودع GitHub** (يعمل مباشرة، قبل النشر على npm):

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <script defer src="https://cdn.jsdelivr.net/gh/AhmedAlmaghz/katex4arabic@main/dist/cdn/katex-arabic.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/AhmedAlmaghz/katex4arabic@main/dist/cdn/katex-arabic.min.css">
</head>
<body>
  <div id="eq">x^2 + y^2 = z^2</div>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      KaTeXArabic.render(document.getElementById('eq').textContent.trim(),
                         document.getElementById('eq'));
    });
  </script>
</body>
</html>
```

> بعد النشر على npm يعمل الرابط الأقصر أيضاً:
> `https://cdn.jsdelivr.net/npm/katex4arabic/dist/cdn/katex-arabic.min.js` —
> مع ملف CSS بنفس المسار، ويعمل `https://cdn.jsdelivr.net/npm/katex4arabic` على نقطة دخول jsDelivr مباشرة.

المتغير العمومي `window.KaTeXArabic` بنفس واجهة `katex`:

```js
const html = KaTeXArabic.renderToString('\\sin^2 x + \\cos^2 x = 1'); // ← افتراضياً: أرقام عربية + جا/جتا + RTL
KaTeXArabic.render('\\int_0^1 x^2 dx', element);                       // (latex, element, options?)
KaTeXArabic.toArabicNumerals('123');                                   // '١٢٣'
KaTeXArabic.VERSION;                                                  // '1.1.5'
```

> الدليل التفصيلي: [docs/INSTALL.md](docs/INSTALL.md)

---

## 📁 بنية المشروع

```
├── index.html                  # نقطة الدخول + تحميل الخطوط العربية
├── vite.config.ts              # إعدادات Vite لتطبيق العرض (React + Tailwind)
├── vite.lib.config.ts          # إعدادات بناء المكتبة (ESM + CJS)
├── tsconfig.lib.json           # إعدادات إصدار أنواع TypeScript للمكتبة
├── src/
│   ├── App.tsx                 # جذر التطبيق وأقسامه
│   ├── main.tsx                # نقطة الإقلاع
│   ├── index.css               # الأنماط العامة (Tailwind + المكوّنات)
│   ├── katex-arabic.css        # نسق عرض المعادلات (يُنسخ إلى dist/lib)
│   ├── components/             # مكوّنات الواجهة
│   │   ├── MathEquation.tsx    # <MathEquation> / <MathBlock> / <MathInline>
│   │   ├── OptionsPanel.tsx    # لوحة إعدادات العرض
│   │   ├── LiveEditor.tsx      # محرر مباشر مع تحقق فوري
│   │   ├── ComparisonDemo.tsx  # مقارنة لاتيني/عربي
│   │   └── …
│   ├── data/examples.ts        # معادلات المعرض
│   └── lib/katex-arabic/       # ★ المكتبة الأساسية
│       ├── index.ts            # الواجهة العامة (public API)
│       ├── render.ts           # دوال العرض (renderToString, render, batch)
│       ├── rtlRenderer.ts      # خط أنابيب المعالجة + القيم الافتراضية
│       ├── arabicNumerals.ts   # تحويل الأرقام وتنسيق الفواصل
│       ├── arabicFunctions.ts  # ترجمة الدوال والمتغيرات والتفاضلات
│       ├── arabicSymbols.ts    # عكس الرموز (مقارنة/أسهم/أقواس)
│       ├── protectedRegions.ts # حماية نصوص \text{} من المعالجة
│       ├── hooks.ts            # خطاطيف React جاهزة للعرض
│       ├── types.ts            # أنواع TypeScript
│       └── __tests__/          # اختبارات الوحدات والخط الأنبوبي
└── package.json
```

---

## 💻 استخدام المكتبة
### Vanilla JS

```ts
import { renderArabicToString } from 'katex4arabic';
import 'katex4arabic/katex-arabic.css';

const html = renderArabicToString('\\sin^2(x) + \\cos^2(x) = 1', {
  numerals: 'arabic',
  translateFuncs: true,
  mirrorSymbols: true,
});
document.getElementById('eq')!.innerHTML = html;
```

### معالجة LaTeX فقط (بدون عرض)

```ts
import { processLatex, validateLatex } from 'katex4arabic';

const processed = processLatex('\\sin(x) + dx');
// → "\\operatorname{جا}(\\text{س}) + \\text{د}\\text{س}"

if (validateLatex('\\frac{1}{2} + x') === null) {
  // الطرح سليم
}
```

### العرض الدفعي (Batch)

لعرض قائمة معادلات دفعة واحدة بكفاءة أعلى (خيارات تُحلّل مرة واحدة
وذاكرة التخزين المؤقت مشتركة):

```ts
import { renderArabicBatch } from 'katex4arabic';

const results = renderArabicBatch(
  ['x = 1', { latex: 'y = 2', options: { numerals: 'latin' } }],
  { numerals: 'arabic' },
);
// results[i] = { html, error }
```

### التخزين المؤقت والأداء

تُخزَّن نتائج العرض داخلياً في ذاكرة LRU (٢٥٦ مدخلاً) بحيث يكون
إعادة عرض نفس المعادلة بنفس الخيارات شبه مجاني. لمسح الذاكرة
(مثلاً عند تغيّر الخيارات جذرياً أو في الاختبارات):

```ts
import { clearRenderCache } from 'katex4arabic';
clearRenderCache();
```

> **حماية المدخلات:** أي مدخل أطول من `MAX_INPUT_LENGTH` (٢٠٬٠٠٠ حرف)
> يُقتَصّ تلقائياً لحماية خط الأنابيب من التكلفة الأسوأ، والمدخلات
> الفارغة تُعاد كما هي دون معالجة.

### React

```tsx
import { MathBlock, MathInline } from './components/MathEquation';

<MathBlock
  latex="\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}"
  options={{ numerals: 'arabic', translateFuncs: true }}
/>

<p>التعريف هو <MathInline latex="f(x) = x^2" /></p>
```

### خطاطيف React

```tsx
import { useArabicKatex, useArabicKatexResult } from 'katex4arabic/hooks';

const html = useArabicKatex('x^2 + y^2', { numerals: 'arabic' });
const { ok, error } = useArabicKatexResult(latex, options);
```

---

## ⚙️ خيارات التهيئة

| الخيار | النوع | الافتراضي | الوصف |
| --- | --- | --- | --- |
| `numerals` | `arabic \| extended \| latin` | `arabic` | نظام الأرقام المعروض |
| `formatNumbers` | `boolean` | `true` | فواصل عربية `٬ ٫` في الأعداد |
| `translateFuncs` | `boolean` | `true` | ترجمة أسماء الدوال |
| `translateVars` | `boolean` | `true` | ترجمة المتغيرات اللاتينية |
| `translateDiffs` | `boolean` | `true` | ترجمة التفاضلات `dx → د س` |
| `mirrorSymbols` | `boolean` | `true` | عكس رموز المقارنة والأسهم |
| `mirrorBigOperators` | `boolean` | `true` | عكس `∫ Σ ∏` بصرياً |
| `mirrorSqrt` | `boolean` | `true` | عكس رمز الجذر `√` |
| `mirrorBrackets` | `boolean` | `true` | عكس الأقواس الزاوية والكبيرة |
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

## 🎨 التوافق البصري مع اللاتينية

تقوم `katex-arabic.css` بتطبيع مقاييس النصوص العربية لتطابق مخرجات KaTeX
اللاتينية: خط أساس موحّد، ارتفاع سطر مضبوط، ومنع قصّ النتوءات والحركات.
لمزيد من الدقة، تتحكم هذه المتغيرات بالتخصيص:

| المتغير | الوظيفة | الافتراضي |
| --- | --- | --- |
| `--ka-op-scale` | حجم العوامل والنصوص العربية داخل المعادلة | `1.05` |
| `--ka-font-family` | عائلة خط النصوص العربية | `Amiri` |
| `--ka-color` | لون المعادلة | `inherit` |
| `--ka-line-height` | ارتفاع السطر المحيط | `1.6` |

```css
.math-equation { --ka-op-scale: 1.08; }
```

قيمة `1.08`–`1.1` تعوّض عادةً الفرق البصري في حجم الحروف بين الخطوط
العربية و`KaTeX_Main`. تُوسَّط الأسس والأدلة والكسور والجذور والمصفوفات
على المحور الرياضي، تماماً كما في المعادلة اللاتينية.

---

## 🧪 الاختبارات

```bash
npm test          # تشغيل كامل
npm run test:watch
```

تغطي الاختبارات: تحويل الأرقام ذهاباً وإياباً، ترجمة الدوال والمتغيرات
مع حماية `\text{}`، عكس الرموز، وسلامة خط الأنابيب الكامل مع كل الخيارات.

---

## 📜 الترخيص

مفتوح المصدر، مبنية على [KaTeX](https://katex.org) (MIT).
بواسطة [ِAhmed Almaghz](https://github.com/AhmedAlmaghz/KaTeX4Arabic) - 2026