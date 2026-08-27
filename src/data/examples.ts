/**
 * ════════════════════════════════════════════════════════════════
 *  examples.ts
 *  All example equations used in the demo gallery.
 *
 *  These are kept in a separate module so:
 *   - The main App component stays focused on layout.
 *   - The data can be reused (e.g. tests, snapshots, docs).
 *   - The list can grow without bloating other files.
 * ════════════════════════════════════════════════════════════════
 */

import type { ExampleEquation } from '../lib/katex-arabic/types';

interface EquationGroup {
  id: string;
  title: string;
  icon: string;
  iconBg: string;
  equations: ExampleEquation[];
}

export const equationGroups: EquationGroup[] = [
  {
    id: 'trigonometry',
    title: 'الدوال المثلثية',
    icon: '📐',
    iconBg: 'bg-blue-500',
    equations: [
      {
        title: 'متطابقة فيثاغورس المثلثية',
        latex: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1',
        description: 'أشهر المتطابقات المثلثية الأساسية، تربط بين مربعي الجيب وجيب التمام.',
        icon: '📐',
        borderColor: 'border-blue-500',
      },
      {
        title: 'قانون جمع الظل',
        latex: '\\tan(\\alpha + \\beta) = \\frac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha \\cdot \\tan\\beta}',
        description: 'يُستخدم لحساب ظل مجموع زاويتين.',
        icon: '📊',
        borderColor: 'border-green-500',
      },
      {
        title: 'صيغة الزاوية المضاعفة',
        latex: '\\sin(2\\theta) = 2\\sin(\\theta)\\cos(\\theta)',
        description: 'تُستخدم لتبسيط جيب ضعف الزاوية.',
        icon: '🔄',
        borderColor: 'border-purple-500',
      },
      {
        title: 'قاطع التمام والقاطع',
        latex: '\\sec(x) = \\frac{1}{\\cos(x)}, \\quad \\csc(x) = \\frac{1}{\\sin(x)}',
        description: 'تعريف دالتي القاطع وقاطع التمام.',
        icon: '📏',
        borderColor: 'border-sky-500',
      },
      {
        title: 'ظل التمام',
        latex: '\\cot(x) = \\frac{\\cos(x)}{\\sin(x)} = \\frac{1}{\\tan(x)}',
        description: 'تعريف دالة ظل التمام.',
        icon: '📉',
        borderColor: 'border-rose-500',
      },
      {
        title: 'الدوال المثلثية العكسية',
        latex: '\\arcsin(\\sin(x)) = x, \\quad \\arccos(\\cos(x)) = x',
        description: 'العلاقة بين الدوال المثلثية وعكوسها.',
        icon: '↩️',
        borderColor: 'border-fuchsia-500',
      },
    ],
  },
  {
    id: 'calculus',
    title: 'التفاضل والتكامل',
    icon: '∫',
    iconBg: 'bg-red-500',
    equations: [
      {
        title: 'تكامل غاوس',
        latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
        description: 'أحد أهم التكاملات في الرياضيات والإحصاء، يُستخدم في التوزيع الطبيعي.',
        icon: '∫',
        borderColor: 'border-red-500',
      },
      {
        title: 'تكامل محدد بحدود عربية',
        latex: '\\int_{0}^{1} \\dfrac{1}{1+x^2} dx = \\dfrac{\\pi}{4}',
        description: 'حدّا التكامل يُضبطان كـ RTL: الحد الأدنى يميناً والعلوي يساراً مع معكوس رمز التكامل.',
        icon: '∫',
        borderColor: 'border-rose-500',
      },
      {
        title: 'دالة معرفة بالقطع (حالتان)',
        latex: 'f(x) = \\begin{cases} x^2 & ، x \\geq 0 \\\\ 0 & ، x < 0 \\end{cases}',
        description: 'الدالة المتقطعة تُعرض على الطريقة العربية: القوس يميناً والقيم قرب القوس.',
        icon: '⚖️',
        borderColor: 'border-amber-500',
      },
      {
        title: 'دالة متقطعة (٣ حالات)',
        latex: 'f(x) = \\begin{cases} x^2 & ، x > 0 \\\\ 0 & ، x = 0 \\\\ -x & ، x < 0 \\end{cases}',
        description: 'دالة بثلاث حالات — فاصلة قبل كل شرط.',
        icon: '🔢',
        borderColor: 'border-orange-500',
      },
      {
        title: 'دالة متقطعة (٤ حالات)',
        latex: 'f(x) = \\begin{cases} 1 & ، x > 1 \\\\ x^2 & ، 0 \\leq x \\leq 1 \\\\ 0 & ، -1 \\leq x < 0 \\\\ -1 & ، x < -1 \\end{cases}',
        description: 'دالة بأربع حالات — فاصلة قبل كل شرط.',
        icon: '📊',
        borderColor: 'border-pink-500',
      },
      {
        title: 'جذور متداخلة',
        latex: '\\sqrt{a + \\sqrt{a + \\sqrt{a}}} = \\sqrt{1 + \\sqrt{2 + \\sqrt{3}}}',
        description: 'الجذور المتداخلة تُعكس بصرياً مع بقاء المحتوى مقروءاً.',
        icon: '🌿',
        borderColor: 'border-green-500',
      },
      {
        title: 'جذر نوني',
        latex: '\\sqrt[3]{\\frac{a}{b}} = \\frac{\\sqrt[3]{a}}{\\sqrt[3]{b}}',
        description: 'الجذور الأعلى (المرتَّبة) تُعكس مع بقاء دليل الجذر مقروءاً.',
        icon: '3',
        borderColor: 'border-teal-500',
      },
      {
        title: 'نهاية شهيرة',
        latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
        description: 'نهاية أساسية في التفاضل، تُستخدم في إثبات مشتقة الجيب.',
        icon: '🎯',
        borderColor: 'border-orange-500',
      },
      {
        title: 'قاعدة التكامل بالتجزئة',
        latex: '\\int u \\, dv = uv - \\int v \\, du',
        description: 'تقنية أساسية لحساب التكاملات المعقدة.',
        icon: '🧮',
        borderColor: 'border-teal-500',
      },
      {
        title: 'التكامل المزدوج',
        latex: '\\iint_D f(x,y) \\, dA = \\int_a^b \\int_c^d f(x,y) \\, dy \\, dx',
        description: 'تكامل على منطقة ثنائية الأبعاد.',
        icon: '∬',
        borderColor: 'border-amber-500',
      },
      {
        title: 'التكامل الثلاثي',
        latex: '\\iiint_V f(x,y,z) \\, dV',
        description: 'تكامل على حجم ثلاثي الأبعاد.',
        icon: '∭',
        borderColor: 'border-lime-500',
      },
      {
        title: 'التكامل الدائري (المغلق)',
        latex: '\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot d\\vec{S}',
        description: 'نظرية ستوكس للتكامل على مسار مغلق.',
        icon: '∮',
        borderColor: 'border-emerald-500',
      },
      {
        title: 'المشتقة الجزئية',
        latex: '\\frac{\\partial f}{\\partial x} = \\lim_{h \\to 0} \\frac{f(x+h, y) - f(x, y)}{h}',
        description: 'تعريف المشتقة الجزئية بالنسبة لـ x.',
        icon: '∂',
        borderColor: 'border-cyan-500',
      },
      {
        title: 'مؤثر نابلا (التدرج)',
        latex: '\\nabla f = \\frac{\\partial f}{\\partial x}\\hat{i} + \\frac{\\partial f}{\\partial y}\\hat{j} + \\frac{\\partial f}{\\partial z}\\hat{k}',
        description: 'متجه التدرج لدالة سُلّمية.',
        icon: '∇',
        borderColor: 'border-violet-500',
      },
      {
        title: 'النهاية العليا والدنيا',
        latex: '\\limsup_{n \\to \\infty} a_n \\geq \\liminf_{n \\to \\infty} a_n',
        description: 'العلاقة بين النهاية العليا والدنيا لمتتالية.',
        icon: '📊',
        borderColor: 'border-pink-500',
      },
    ],
  },
  {
    id: 'algebra',
    title: 'الجبر',
    icon: '✖️',
    iconBg: 'bg-indigo-500',
    equations: [
      {
        title: 'صيغة حل المعادلة التربيعية',
        latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
        description: 'الصيغة العامة لإيجاد جذور المعادلة من الدرجة الثانية.',
        icon: '✖️',
        borderColor: 'border-indigo-500',
      },
      {
        title: 'متطابقة أويلر',
        latex: 'e^{i\\pi} + 1 = 0',
        description: 'أجمل معادلة في الرياضيات! تربط خمسة ثوابت أساسية: e, i, π, 1, 0',
        icon: '⭐',
        borderColor: 'border-yellow-500',
      },
      {
        title: 'صيغة ذات الحدين (نيوتن)',
        latex: '(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k',
        description: 'تُستخدم لفك أقواس القوى العالية.',
        icon: '🔢',
        borderColor: 'border-pink-500',
      },
      {
        title: 'القوى والأسس',
        latex: 'x^{2} + y^{3} = z^{n}',
        description: 'مثال على الأسس والقوى.',
        icon: '📈',
        borderColor: 'border-blue-500',
      },
      {
        title: 'الأدلة السفلية',
        latex: 'a_{1} + a_{2} + a_{3} + \\cdots + a_{n}',
        description: 'مثال على الأدلة السفلية في المتتاليات.',
        icon: '📉',
        borderColor: 'border-green-500',
      },
      {
        title: 'القوى والأدلة معاً',
        latex: 'x_{i}^{2} + y_{j}^{3} = z_{k}^{n}',
        description: 'مثال يجمع بين القوى والأدلة.',
        icon: '🔗',
        borderColor: 'border-purple-500',
      },
      {
        title: 'الأس المركب',
        latex: 'e^{x^{2} + y^{2}} = e^{r^{2}}',
        description: 'أس يحتوي على تعبير رياضي.',
        icon: '🌀',
        borderColor: 'border-cyan-500',
      },
    ],
  },
  {
    id: 'matrices',
    title: 'المصفوفات',
    icon: '🔲',
    iconBg: 'bg-cyan-500',
    equations: [
      {
        title: 'ضرب المصفوفات',
        latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}',
        description: 'عملية ضرب مصفوفة ٢×٢ في متجه.',
        icon: '🔲',
        borderColor: 'border-cyan-500',
      },
      {
        title: 'محدد المصفوفة ٢×٢',
        latex: '\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc',
        description: 'قيمة عددية مرتبطة بالمصفوفة المربعة.',
        icon: '📋',
        borderColor: 'border-lime-500',
      },
      {
        title: 'المصفوفة المعكوسة',
        latex: 'A^{-1} = \\frac{1}{\\det(A)} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}',
        description: 'معكوس المصفوفة ٢×٢.',
        icon: '🔄',
        borderColor: 'border-purple-500',
      },
      {
        title: 'محدد المصفوفة ٣×٣',
        latex: '\\det \\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix}',
        description: 'محدد مصفوفة من الرتبة الثالثة.',
        icon: '🧊',
        borderColor: 'border-indigo-500',
      },
    ],
  },
  {
    id: 'roots',
    title: 'الجذور',
    icon: '√',
    iconBg: 'bg-green-500',
    equations: [
      {
        title: 'الجذر التربيعي',
        latex: '\\sqrt{a^2 + b^2} = c',
        description: 'الجذر التربيعي في نظرية فيثاغورس.',
        icon: '√',
        borderColor: 'border-green-500',
      },
      {
        title: 'الجذر النوني',
        latex: '\\sqrt[n]{x} = x^{\\frac{1}{n}}',
        description: 'العلاقة بين الجذر النوني والأس الكسري.',
        icon: '∛',
        borderColor: 'border-teal-500',
      },
      {
        title: 'الجذر التكعيبي',
        latex: '\\sqrt[3]{8} = 2, \\quad \\sqrt[3]{-27} = -3',
        description: 'أمثلة على الجذر التكعيبي.',
        icon: '🧊',
        borderColor: 'border-sky-500',
      },
      {
        title: 'جذور متداخلة',
        latex: '\\sqrt{\\sqrt{x}} = \\sqrt[4]{x} = x^{\\frac{1}{4}}',
        description: 'تبسيط الجذور المتداخلة.',
        icon: '🔲',
        borderColor: 'border-violet-500',
      },
      {
        title: 'الصيغة التربيعية المعقدة',
        latex: '\\sqrt{a + b\\sqrt{c}} = \\sqrt{\\frac{a + \\sqrt{a^2 - b^2c}}{2}} + \\sqrt{\\frac{a - \\sqrt{a^2 - b^2c}}{2}}',
        description: 'تبسيط جذر يحتوي جذراً.',
        icon: '🌀',
        borderColor: 'border-fuchsia-500',
      },
    ],
  },
  {
    id: 'logarithms',
    title: 'اللوغاريتمات',
    icon: '📊',
    iconBg: 'bg-emerald-500',
    equations: [
      {
        title: 'اللوغاريتم الطبيعي',
        latex: '\\ln(e^x) = x, \\quad e^{\\ln(x)} = x',
        description: 'خصائص اللوغاريتم الطبيعي.',
        icon: '📊',
        borderColor: 'border-emerald-500',
      },
      {
        title: 'اللوغاريتم العشري',
        latex: '\\log_{10}(1000) = 3',
        description: 'اللوغاريتم بالأساس ١٠.',
        icon: '🔢',
        borderColor: 'border-blue-500',
      },
      {
        title: 'قانون تغيير الأساس',
        latex: '\\log_a(x) = \\frac{\\ln(x)}{\\ln(a)} = \\frac{\\log_b(x)}{\\log_b(a)}',
        description: 'تحويل اللوغاريتم من أساس لآخر.',
        icon: '🔄',
        borderColor: 'border-orange-500',
      },
      {
        title: 'قوانين اللوغاريتمات',
        latex: '\\log(xy) = \\log(x) + \\log(y), \\quad \\log\\left(\\frac{x}{y}\\right) = \\log(x) - \\log(y)',
        description: 'قوانين الضرب والقسمة في اللوغاريتمات.',
        icon: '📐',
        borderColor: 'border-red-500',
      },
      {
        title: 'لوغاريتم القوة',
        latex: '\\log(x^n) = n \\cdot \\log(x)',
        description: 'قانون لوغاريتم القوة.',
        icon: '⚡',
        borderColor: 'border-yellow-500',
      },
    ],
  },
  {
    id: 'hyperbolic',
    title: 'الدوال الزائدية',
    icon: '〰️',
    iconBg: 'bg-pink-500',
    equations: [
      {
        title: 'الجيب الزائدي',
        latex: '\\sinh(x) = \\frac{e^x - e^{-x}}{2}',
        description: 'تعريف دالة الجيب الزائدي.',
        icon: '〰️',
        borderColor: 'border-pink-500',
      },
      {
        title: 'جيب التمام الزائدي',
        latex: '\\cosh(x) = \\frac{e^x + e^{-x}}{2}',
        description: 'تعريف دالة جيب التمام الزائدي.',
        icon: '📈',
        borderColor: 'border-purple-500',
      },
      {
        title: 'الظل الزائدي',
        latex: '\\tanh(x) = \\frac{\\sinh(x)}{\\cosh(x)} = \\frac{e^x - e^{-x}}{e^x + e^{-x}}',
        description: 'تعريف دالة الظل الزائدي.',
        icon: '📉',
        borderColor: 'border-indigo-500',
      },
      {
        title: 'متطابقة زائدية',
        latex: '\\cosh^2(x) - \\sinh^2(x) = 1',
        description: 'المتطابقة الأساسية للدوال الزائدية.',
        icon: '🔗',
        borderColor: 'border-cyan-500',
      },
    ],
  },
  {
    id: 'series',
    title: 'المتسلسلات والجداءات',
    icon: '♾️',
    iconBg: 'bg-violet-500',
    equations: [
      {
        title: 'متسلسلة بازل',
        latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
        description: 'مسألة بازل الشهيرة التي حلها أويلر.',
        icon: '♾️',
        borderColor: 'border-violet-500',
      },
      {
        title: 'متسلسلة تايلور للأسية',
        latex: 'e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}',
        description: 'تمثيل الدالة الأسية كمتسلسلة لانهائية.',
        icon: '📈',
        borderColor: 'border-amber-500',
      },
      {
        title: 'الجداء اللانهائي',
        latex: '\\prod_{n=1}^{\\infty} \\left(1 + \\frac{1}{n^2}\\right) = \\frac{\\sinh(\\pi)}{\\pi}',
        description: 'مثال على الجداء اللانهائي.',
        icon: '∏',
        borderColor: 'border-rose-500',
      },
      {
        title: 'متسلسلة الجيب',
        latex: '\\sin(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!}',
        description: 'متسلسلة تايلور لدالة الجيب.',
        icon: '〰️',
        borderColor: 'border-blue-500',
      },
      {
        title: 'متسلسلة جيب التمام',
        latex: '\\cos(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!}',
        description: 'متسلسلة تايلور لدالة جيب التمام.',
        icon: '📉',
        borderColor: 'border-green-500',
      },
      {
        title: 'المجموع الجزئي',
        latex: 'S_n = \\sum_{k=1}^{n} a_k = a_1 + a_2 + \\cdots + a_n',
        description: 'تعريف المجموع الجزئي لمتسلسلة.',
        icon: '➕',
        borderColor: 'border-orange-500',
      },
    ],
  },
  {
    id: 'brackets',
    title: 'الأقواس والحدود',
    icon: '( )',
    iconBg: 'bg-amber-500',
    equations: [
      {
        title: 'أنواع الأقواس',
        latex: '(a), [b], \\{c\\}, \\langle d \\rangle',
        description: 'الأقواس المستديرة والمربعة والمعقوفة والزاوية.',
        icon: '( )',
        borderColor: 'border-blue-500',
      },
      {
        title: 'الأقواس الكبيرة التلقائية',
        latex: '\\left( \\frac{a^2}{b^2} \\right)',
        description: 'أقواس تتكيف مع حجم المحتوى.',
        icon: '⟨⟩',
        borderColor: 'border-green-500',
      },
      {
        title: 'القيمة المطلقة والمعيار',
        latex: '|x| = \\sqrt{x^2}, \\quad \\|\\vec{v}\\| = \\sqrt{v_1^2 + v_2^2}',
        description: 'القيمة المطلقة ومعيار المتجه.',
        icon: '| |',
        borderColor: 'border-orange-500',
      },
      {
        title: 'دالة الأرضية والسقف',
        latex: '\\lfloor 3.7 \\rfloor = 3, \\quad \\lceil 3.2 \\rceil = 4',
        description: 'دالة الجزء الصحيح الأصغر والأكبر.',
        icon: '⌊⌋',
        borderColor: 'border-purple-500',
      },
    ],
  },
  {
    id: 'sets',
    title: 'المجموعات والمنطق',
    icon: '∪',
    iconBg: 'bg-indigo-500',
    equations: [
      {
        title: 'رموز المجموعات',
        latex: 'A \\cup B, \\quad A \\cap B, \\quad A \\setminus B',
        description: 'الاتحاد والتقاطع والفرق بين المجموعات.',
        icon: '∪',
        borderColor: 'border-indigo-500',
      },
      {
        title: 'الانتماء والاحتواء',
        latex: 'x \\in A, \\quad A \\subset B, \\quad A \\subseteq B',
        description: 'رموز العضوية والمجموعة الجزئية.',
        icon: '∈',
        borderColor: 'border-teal-500',
      },
      {
        title: 'المجموعات العددية',
        latex: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}',
        description: 'الطبيعية ⊂ الصحيحة ⊂ النسبية ⊂ الحقيقية ⊂ المركبة.',
        icon: 'ℕ',
        borderColor: 'border-cyan-500',
      },
      {
        title: 'المحددات الكمية',
        latex: '\\forall x \\in \\mathbb{R}: x^2 \\geq 0, \\quad \\exists y: y^2 = 2',
        description: 'لكل (∀) ويوجد (∃).',
        icon: '∀',
        borderColor: 'border-rose-500',
      },
    ],
  },
  {
    id: 'relations',
    title: 'العلاقات والأسهم',
    icon: '→',
    iconBg: 'bg-rose-500',
    equations: [
      {
        title: 'علامات المقارنة',
        latex: 'a < b, \\quad a > b, \\quad a \\leq b, \\quad a \\geq b',
        description: 'أصغر، أكبر، أصغر أو يساوي، أكبر أو يساوي.',
        icon: '⟨⟩',
        borderColor: 'border-blue-500',
      },
      {
        title: 'التساوي والتقريب',
        latex: 'a = b, \\quad a \\neq b, \\quad a \\approx b, \\quad a \\equiv b',
        description: 'يساوي، لا يساوي، تقريباً، مطابق.',
        icon: '≈',
        borderColor: 'border-green-500',
      },
      {
        title: 'الأسهم والاستلزام',
        latex: 'P \\Rightarrow Q, \\quad P \\Leftrightarrow Q, \\quad f: A \\to B',
        description: 'الاستلزام والتكافؤ والتطبيقات.',
        icon: '→',
        borderColor: 'border-red-500',
      },
    ],
  },
  {
    id: 'statistics',
    title: 'الإحصاء والاحتمالات',
    icon: '📊',
    iconBg: 'bg-sky-500',
    equations: [
      {
        title: 'المتوسط الحسابي',
        latex: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i',
        description: 'صيغة المتوسط الحسابي.',
        icon: '📊',
        borderColor: 'border-blue-500',
      },
      {
        title: 'الانحراف المعياري',
        latex: '\\sigma = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2}',
        description: 'صيغة الانحراف المعياري.',
        icon: 'σ',
        borderColor: 'border-green-500',
      },
      {
        title: 'الاحتمال الشرطي (بايز)',
        latex: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)}',
        description: 'صيغة بايز للاحتمال الشرطي.',
        icon: '🎲',
        borderColor: 'border-red-500',
      },
      {
        title: 'التوزيع الطبيعي',
        latex: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
        description: 'دالة كثافة التوزيع الطبيعي (غاوسي).',
        icon: '🔔',
        borderColor: 'border-pink-500',
      },
      {
        title: 'التوافيق',
        latex: '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}',
        description: 'صيغة التوافيق (اختيار k من n).',
        icon: '🔢',
        borderColor: 'border-indigo-500',
      },
    ],
  },
  {
    id: 'complex',
    title: 'الأعداد المركبة',
    icon: '𝑖',
    iconBg: 'bg-purple-500',
    equations: [
      {
        title: 'تعريف العدد التخيلي',
        latex: 'i^2 = -1, \\quad i = \\sqrt{-1}',
        description: 'الوحدة التخيلية ت (i) هي جذر سالب واحد.',
        icon: 'ت',
        borderColor: 'border-purple-500',
      },
      {
        title: 'الصورة الجبرية للعدد المركب',
        latex: 'z = x + iy',
        description: 'حيث س (x) الجزء الحقيقي و ص (y) الجزء التخيلي.',
        icon: '🔢',
        borderColor: 'border-blue-500',
      },
      {
        title: 'المرافق المركب',
        latex: '\\bar{z} = a - bi, \\quad z \\cdot \\bar{z} = a^2 + b^2',
        description: 'مرافق العدد المركب وحاصل ضربه بمرافقه.',
        icon: '🔄',
        borderColor: 'border-green-500',
      },
      {
        title: 'معيار العدد المركب',
        latex: '|z| = \\sqrt{a^2 + b^2} = \\sqrt{z \\cdot \\bar{z}}',
        description: 'المسافة من نقطة الأصل في المستوى المركب.',
        icon: '📏',
        borderColor: 'border-orange-500',
      },
      {
        title: 'الصورة القطبية',
        latex: 'z = r(\\cos\\theta + i\\sin\\theta) = re^{i\\theta}',
        description: 'حيث r = |z| و θ سعة العدد المركب.',
        icon: '🎯',
        borderColor: 'border-red-500',
      },
      {
        title: 'صيغة أويلر',
        latex: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta',
        description: 'العلاقة الأساسية بين الدالة الأسية والدوال المثلثية.',
        icon: '⭐',
        borderColor: 'border-yellow-500',
      },
      {
        title: 'متطابقة أويلر الشهيرة',
        latex: 'e^{i\\pi} + 1 = 0',
        description: 'أجمل معادلة تربط e و i و π و 1 و 0.',
        icon: '💎',
        borderColor: 'border-pink-500',
      },
      {
        title: 'صيغة دي موافر',
        latex: '(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)',
        description: 'لحساب قوى الأعداد المركبة.',
        icon: '📐',
        borderColor: 'border-indigo-500',
      },
      {
        title: 'جذور الواحد',
        latex: 'z^n = 1 \\Rightarrow z_k = e^{\\frac{2\\pi i k}{n}}, \\quad k = 0, 1, ..., n-1',
        description: 'الجذور النونية للواحد.',
        icon: '🌀',
        borderColor: 'border-cyan-500',
      },
      {
        title: 'قسمة الأعداد المركبة',
        latex: '\\frac{z_1}{z_2} = \\frac{z_1 \\cdot \\bar{z_2}}{|z_2|^2}',
        description: 'قسمة عددين مركبين باستخدام المرافق.',
        icon: '➗',
        borderColor: 'border-teal-500',
      },
      {
        title: 'ضرب الأعداد المركبة (القطبي)',
        latex: 'z_1 \\cdot z_2 = r_1 r_2 e^{i(\\theta_1 + \\theta_2)}',
        description: 'ضرب الأعداد في الصورة القطبية.',
        icon: '✖️',
        borderColor: 'border-lime-500',
      },
      {
        title: 'لوغاريتم العدد المركب',
        latex: '\\ln(z) = \\ln|z| + i\\arg(z)',
        description: 'اللوغاريتم الطبيعي للعدد المركب.',
        icon: '📊',
        borderColor: 'border-amber-500',
      },
    ],
  },
];

/**
 * Small, curated list of equations for the live editor's quick-pick row.
 */
export const editorExamples: ReadonlyArray<{ label: string; latex: string }> = [
  { label: 'فيثاغورس', latex: 'a^2 + b^2 = c^2' },
  { label: 'متطابقة مثلثية', latex: '\\sin^2(\\theta) + \\cos^2(\\theta) = 1' },
  { label: 'صيغة أويلر', latex: 'e^{i\\pi} + 1 = 0' },
  { label: 'تكامل غاوس', latex: '\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}' },
  { label: 'النهاية', latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1' },
  { label: 'بازل', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}' },
  { label: 'مصفوفة', latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
  { label: 'تربيعية', latex: '\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
];

/**
 * Side-by-side comparison examples (Latin vs Arabic).
 */
export const comparisonExamples: ReadonlyArray<{ title: string; latex: string }> = [
  { title: 'دالة مثلثية', latex: '\\sin(x) + \\cos(x) = 1' },
  { title: 'نهاية', latex: '\\lim_{x \\to \\infty} \\frac{1}{x} = 0' },
  { title: 'تكامل', latex: '\\int_0^1 x^2 dx = \\frac{1}{3}' },
  { title: 'مجموع', latex: '\\sum_{n=1}^{10} n = 55' },
];
