import { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = [
  { id: "all", label: "Все категории", icon: "Grid3X3", count: 340218 },
  { id: "plumbing", label: "Сантехника", icon: "Droplets", count: 18420 },
  { id: "tile", label: "Плитка и керамика", icon: "Square", count: 42800 },
  { id: "lighting", label: "Освещение", icon: "Lightbulb", count: 23500 },
  { id: "furniture", label: "Мебель", icon: "Armchair", count: 67000 },
  { id: "doors", label: "Двери", icon: "DoorOpen", count: 9800 },
  { id: "kitchen", label: "Кухни", icon: "ChefHat", count: 5600 },
  { id: "electrical", label: "Электрика", icon: "Zap", count: 31000 },
  { id: "decor", label: "Декор", icon: "Palette", count: 88000 },
];

const products = [
  {
    id: 1,
    name: "Унитаз подвесной Villeroy & Boch Subway 2.0",
    brand: "Villeroy & Boch",
    sku: "VB-5614R001",
    category: "Сантехника",
    price: 42800,
    oldPrice: 54000,
    rating: 4.8,
    reviews: 234,
    stock: "В наличии",
    stockColor: "#34C759",
    suppliers: 3,
    delivery: "3–5 дней",
    tag: "Хит",
    tagColor: "orange",
    description: "Подвесной унитаз серии Subway 2.0 от Villeroy & Boch — эталон европейского качества. Безободковая конструкция DirectFlush обеспечивает максимальную гигиену. Глазурь CeramicPlus отталкивает воду и загрязнения.",
    specs: [
      { k: "Тип", v: "Подвесной, безободковый" },
      { k: "Размер", v: "370 × 560 × 345 мм" },
      { k: "Цвет", v: "Альпийский белый" },
      { k: "Материал", v: "Санфарфор" },
      { k: "Гарантия", v: "5 лет" },
      { k: "Страна", v: "Германия" },
    ],
    supplierList: [
      { name: "ТД Аквасфера", price: 42800, stock: "В наличии", delivery: "3–5 дней", rating: 4.9 },
      { name: "SanPro Москва", price: 45200, stock: "В наличии", delivery: "1–2 дня", rating: 4.6 },
      { name: "Grohe Official", price: 47000, stock: "В наличии", delivery: "2–3 дня", rating: 4.7 },
    ],
    analogues: [
      { name: "Roca Nexo Rimless", price: 28400, saving: "−34%" },
      { name: "Cersanit City Clean On", price: 18900, saving: "−56%" },
    ],
  },
  {
    id: 2,
    name: "Плитка керамогранит Emil Ceramica Tele di Marmo",
    brand: "Emil Ceramica",
    sku: "EC-TDM-6060",
    category: "Плитка",
    price: 3840,
    oldPrice: null,
    rating: 4.9,
    reviews: 187,
    stock: "В наличии",
    stockColor: "#34C759",
    suppliers: 5,
    delivery: "1–3 дня",
    tag: "Новинка",
    tagColor: "blue",
    description: "Крупноформатный керамогранит итальянского производителя Emil Ceramica. Коллекция Tele di Marmo имитирует натуральный мрамор с фотографической точностью. Подходит для пола и стен в жилых и коммерческих пространствах.",
    specs: [
      { k: "Размер", v: "600 × 600 × 9 мм" },
      { k: "Поверхность", v: "Полированная / Матовая" },
      { k: "Класс нагрузки", v: "PEI 4" },
      { k: "Морозостойкость", v: "Да" },
      { k: "Страна", v: "Италия" },
      { k: "Упаковка", v: "1.44 м² / 4 шт" },
    ],
    supplierList: [
      { name: "Cerama Nova", price: 3840, stock: "В наличии", delivery: "1–3 дня", rating: 4.7 },
      { name: "ПлиткаОпт", price: 4100, stock: "В наличии", delivery: "2–4 дня", rating: 4.4 },
      { name: "Bella Ceramica", price: 3950, stock: "Под заказ", delivery: "7–10 дней", rating: 4.8 },
    ],
    analogues: [
      { name: "Kerama Marazzi Монсеррат", price: 2100, saving: "−45%" },
      { name: "Laparet Olimpus", price: 1640, saving: "−57%" },
    ],
  },
  {
    id: 3,
    name: "Смеситель встроенный Grohe Grohtherm 3000",
    brand: "Grohe",
    sku: "GR-34274002",
    category: "Сантехника",
    price: 28600,
    oldPrice: 34000,
    rating: 4.7,
    reviews: 412,
    stock: "В наличии",
    stockColor: "#34C759",
    suppliers: 4,
    delivery: "2–4 дня",
    tag: "−16%",
    tagColor: "green",
    description: "Встраиваемый термостатический смеситель Grohe Grohtherm 3000 с функцией SafeStop при температуре 38°C. Технология TurboStat обеспечивает молниеносную реакцию на изменение давления воды.",
    specs: [
      { k: "Тип", v: "Термостатический встраиваемый" },
      { k: "Расход воды", v: "35 л/мин" },
      { k: "Макс. давление", v: "10 бар" },
      { k: "Покрытие", v: "StarLight Chrome" },
      { k: "Гарантия", v: "5 лет" },
      { k: "Страна", v: "Германия" },
    ],
    supplierList: [
      { name: "Grohe Official", price: 28600, stock: "В наличии", delivery: "2–4 дня", rating: 4.9 },
      { name: "ТД Аквасфера", price: 29800, stock: "В наличии", delivery: "3–5 дней", rating: 4.9 },
    ],
    analogues: [
      { name: "Hansgrohe Ecostat 1001 CL", price: 19400, saving: "−32%" },
      { name: "Omnires Y", price: 14200, saving: "−50%" },
    ],
  },
  {
    id: 4,
    name: "Подвесной светильник Artemide Pirce",
    brand: "Artemide",
    sku: "AR-PIRCE-L",
    category: "Освещение",
    price: 187000,
    oldPrice: null,
    rating: 5.0,
    reviews: 45,
    stock: "Под заказ",
    stockColor: "#FFD60A",
    suppliers: 2,
    delivery: "14–21 день",
    tag: "Premium",
    tagColor: "yellow",
    description: "Культовый подвесной светильник Artemide Pirce — символ итальянского дизайна. Спиральная алюминиевая структура создаёт эффект парящего диска. Регулируемая яркость через диммер. Дизайн: Карим Рашид.",
    specs: [
      { k: "Диаметр", v: "1200 мм" },
      { k: "Источник света", v: "LED 105W, 3000K" },
      { k: "Материал", v: "Алюминий анодированный" },
      { k: "Управление", v: "Диммер в комплекте" },
      { k: "Страна", v: "Италия" },
      { k: "Степень защиты", v: "IP20" },
    ],
    supplierList: [
      { name: "Sviet Design", price: 187000, stock: "Под заказ", delivery: "14–21 день", rating: 5.0 },
      { name: "LightPro Москва", price: 194000, stock: "Под заказ", delivery: "21–28 дней", rating: 4.6 },
    ],
    analogues: [
      { name: "Flos Skygarden", price: 84000, saving: "−55%" },
      { name: "De Majo Dolce Vita", price: 61000, saving: "−67%" },
    ],
  },
  {
    id: 5,
    name: "Ванна акриловая Jacob Delafon Escal 170×75",
    brand: "Jacob Delafon",
    sku: "JD-E5BA098L",
    category: "Сантехника",
    price: 67400,
    oldPrice: 82000,
    rating: 4.6,
    reviews: 98,
    stock: "В наличии",
    stockColor: "#34C759",
    suppliers: 3,
    delivery: "5–7 дней",
    tag: "−18%",
    tagColor: "green",
    description: "Акриловая ванна Jacob Delafon Escal асимметричной формы с удобным подголовником. Усиленный акрил толщиной 7 мм с металлическим каркасом. Идеально для просторных ванных комнат.",
    specs: [
      { k: "Размер", v: "1700 × 750 × 580 мм" },
      { k: "Объём", v: "280 л" },
      { k: "Материал", v: "Акрил 7 мм" },
      { k: "Вес", v: "38 кг" },
      { k: "Гарантия", v: "10 лет" },
      { k: "Страна", v: "Франция" },
    ],
    supplierList: [
      { name: "ТД Аквасфера", price: 67400, stock: "В наличии", delivery: "5–7 дней", rating: 4.9 },
      { name: "BathPro", price: 69800, stock: "В наличии", delivery: "3–5 дней", rating: 4.5 },
    ],
    analogues: [
      { name: "Ravak Classic 170", price: 38000, saving: "−44%" },
      { name: "STWORKI Монтэ 170", price: 29900, saving: "−56%" },
    ],
  },
  {
    id: 6,
    name: "Душевой поддон Ravak Gigant Pro 80×80",
    brand: "Ravak",
    sku: "RV-XA03G401010",
    category: "Сантехника",
    price: 18900,
    oldPrice: null,
    rating: 4.5,
    reviews: 156,
    stock: "В наличии",
    stockColor: "#34C759",
    suppliers: 6,
    delivery: "1–2 дня",
    tag: null,
    tagColor: null,
    description: "Мелкий акриловый поддон Ravak Gigant Pro с антискользящим покрытием SlimLine и регулируемыми ножками. Минималистичный дизайн органично вписывается в любой интерьер.",
    specs: [
      { k: "Размер", v: "800 × 800 × 30 мм" },
      { k: "Материал", v: "Акрил" },
      { k: "Высота", v: "30 мм (мелкий)" },
      { k: "Нагрузка", v: "до 200 кг" },
      { k: "Гарантия", v: "10 лет" },
      { k: "Страна", v: "Чехия" },
    ],
    supplierList: [
      { name: "ТД Аквасфера", price: 18900, stock: "В наличии", delivery: "1–2 дня", rating: 4.9 },
      { name: "SanPro Москва", price: 19400, stock: "В наличии", delivery: "2–3 дня", rating: 4.6 },
    ],
    analogues: [
      { name: "BAS Nevada 80×80", price: 12400, saving: "−34%" },
      { name: "Lemark Base 80×80", price: 9800, saving: "−48%" },
    ],
  },
];

type Product = typeof products[0];

function ProductModal({ product, onClose, onAddToCart }: { product: Product; onClose: () => void; onAddToCart: () => void }) {
  const [activeTab, setActiveTab] = useState<"specs" | "suppliers" | "analogues">("specs");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col animate-scale-in"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border-bright)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
        }}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between p-6 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{product.brand}</span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>·</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "var(--surface-4)", color: "var(--text-muted)" }}>{product.sku}</span>
              {product.tag && <span className={`tag tag-${product.tagColor}`}>{product.tag}</span>}
            </div>
            <h2 className="text-xl font-bold leading-snug" style={{ color: "var(--text-primary)" }}>{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
            style={{ background: "var(--surface-4)", color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-5)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--surface-4)")}
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 grid grid-cols-5 gap-6">
            {/* Left: image + price */}
            <div className="col-span-2">
              {/* Image */}
              <div
                className="w-full rounded-xl flex items-center justify-center mb-4"
                style={{ background: "var(--surface-3)", height: 200, border: "1px solid var(--border-color)" }}
              >
                <Icon name="Package" size={56} style={{ color: "var(--surface-5)" }} />
              </div>

              {/* Price block */}
              <div className="rounded-xl p-4 mb-3" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
                    {product.price.toLocaleString("ru")} ₽
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm line-through mb-0.5" style={{ color: "var(--text-muted)" }}>
                      {product.oldPrice.toLocaleString("ru")} ₽
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium" style={{ color: product.stockColor }}>{product.stock}</span>
                  <span style={{ color: "var(--text-muted)" }}>·</span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{product.delivery}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Icon key={s} name="Star" size={13} style={{ color: s <= Math.floor(product.rating) ? "#FFD60A" : "var(--surface-5)" }} />
                    ))}
                  </div>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{product.rating} ({product.reviews} отзывов)</span>
                </div>

                <button
                  onClick={handleAdd}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: added ? "rgba(52,199,89,0.15)" : "var(--orange)",
                    color: added ? "#34C759" : "#000",
                    border: added ? "1px solid rgba(52,199,89,0.3)" : "none",
                  }}
                >
                  {added ? "✓ Добавлено в корзину" : "В корзину"}
                </button>
              </div>

              {/* KOMI */}
              <div
                className="rounded-xl p-3 flex items-start gap-2 cursor-pointer transition-all"
                style={{ background: "rgba(255,122,0,0.08)", border: "1px solid rgba(255,122,0,0.2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,122,0,0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,122,0,0.2)")}
              >
                <Icon name="Sparkles" size={15} style={{ color: "var(--orange)", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--orange)" }}>Спросить KOMI</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Подобрать аналог, уточнить характеристики или добавить в проект</div>
                </div>
              </div>
            </div>

            {/* Right: tabs */}
            <div className="col-span-3">
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>{product.description}</p>

              {/* Tabs */}
              <div className="flex gap-1 mb-4 rounded-xl p-1" style={{ background: "var(--surface-3)", width: "fit-content" }}>
                {(["specs", "suppliers", "analogues"] as const).map((t) => {
                  const labels = { specs: "Характеристики", suppliers: `Поставщики (${product.supplierList.length})`, analogues: "Аналоги" };
                  return (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: activeTab === t ? "var(--surface-5)" : "transparent",
                        color: activeTab === t ? "var(--text-primary)" : "var(--text-muted)",
                      }}
                    >
                      {labels[t]}
                    </button>
                  );
                })}
              </div>

              {/* Specs */}
              {activeTab === "specs" && (
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
                  {product.specs.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center py-3 px-4"
                      style={{ borderBottom: i < product.specs.length - 1 ? "1px solid var(--border-color)" : undefined, background: i % 2 === 0 ? "var(--surface-3)" : "transparent" }}
                    >
                      <span className="flex-1 text-sm" style={{ color: "var(--text-muted)" }}>{s.k}</span>
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{s.v}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Suppliers */}
              {activeTab === "suppliers" && (
                <div className="space-y-2">
                  {product.supplierList.map((s, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4 flex items-center gap-4 transition-all cursor-pointer"
                      style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-bright)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                    >
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: "var(--surface-4)", color: "var(--text-secondary)" }}>
                        {s.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{s.name}</div>
                        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                          <span style={{ color: s.stock === "В наличии" ? "#34C759" : "#FFD60A" }}>{s.stock}</span>
                          <span>· {s.delivery}</span>
                          <span className="flex items-center gap-0.5">
                            <Icon name="Star" size={10} style={{ color: "#FFD60A" }} />
                            {s.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold" style={{ color: i === 0 ? "var(--orange)" : "var(--text-primary)" }}>
                          {s.price.toLocaleString("ru")} ₽
                        </div>
                        {i === 0 && <div className="text-xs" style={{ color: "var(--orange)" }}>Лучшая цена</div>}
                      </div>
                      <button
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0"
                        style={{ background: "var(--orange)", color: "#000" }}
                      >
                        Купить
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Analogues */}
              {activeTab === "analogues" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3 rounded-xl p-3" style={{ background: "rgba(255,122,0,0.08)", border: "1px solid rgba(255,122,0,0.2)" }}>
                    <Icon name="Sparkles" size={14} style={{ color: "var(--orange)" }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>KOMI нашёл аналоги — похожие характеристики, ниже цена</span>
                  </div>
                  {product.analogues.map((a, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer"
                      style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(52,199,89,0.3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                    >
                      <div>
                        <div className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>{a.name}</div>
                        <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{a.price.toLocaleString("ru")} ₽</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="tag tag-green text-sm">{a.saving}</span>
                        <button className="btn-ghost text-xs" style={{ padding: "6px 14px" }}>Смотреть</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  const [activeCat, setActiveCat] = useState("all");
  const [cart, setCart] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  const toggleCart = (id: number) => {
    setCart((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="flex h-full">
      {openProduct && (
        <ProductModal
          product={openProduct}
          onClose={() => setOpenProduct(null)}
          onAddToCart={() => toggleCart(openProduct.id)}
        />
      )}

      {/* Sidebar filters */}
      <aside
        className="w-60 flex-shrink-0 border-r overflow-y-auto"
        style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}
      >
        <div className="p-5">
          <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Категории
          </div>
          <div className="space-y-0.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all text-left"
                style={{
                  background: activeCat === c.id ? "var(--surface-4)" : "transparent",
                  borderLeft: activeCat === c.id ? "2px solid var(--orange)" : "2px solid transparent",
                  color: activeCat === c.id ? "var(--text-primary)" : "var(--text-muted)",
                }}
                onMouseEnter={(e) => { if (activeCat !== c.id) e.currentTarget.style.background = "var(--surface-3)"; }}
                onMouseLeave={(e) => { if (activeCat !== c.id) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon name={c.icon} size={15} className="flex-shrink-0" />
                <span className="flex-1 text-sm">{c.label}</span>
                <span className="font-mono text-xs" style={{ color: "var(--text-muted)", fontSize: 11 }}>
                  {c.count >= 1000 ? `${(c.count / 1000).toFixed(0)}K` : c.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px mx-5" style={{ background: "var(--border-color)" }} />

        <div className="p-5 space-y-5">
          {/* Price */}
          <div>
            <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Цена</div>
            <div className="flex gap-2">
              {["от 0 ₽", "до 500К ₽"].map((v, i) => (
                <div key={i} className="flex-1 rounded-lg px-3 py-2 text-sm" style={{ background: "var(--surface-4)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}>
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div>
            <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Наличие</div>
            {["В наличии", "Под заказ", "Все"].map((s, i) => (
              <label key={i} className="flex items-center gap-3 mb-2.5 cursor-pointer">
                <div
                  className="w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: i === 0 ? "var(--orange)" : "var(--border-bright)", background: i === 0 ? "var(--orange)" : "transparent" }}
                >
                  {i === 0 && <Icon name="Check" size={10} style={{ color: "#000" }} />}
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{s}</span>
              </label>
            ))}
          </div>

          {/* Brands */}
          <div>
            <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Бренды</div>
            {["Villeroy & Boch", "Grohe", "Hansgrohe", "Roca", "Artemide", "IKEA"].map((b, i) => (
              <label key={i} className="flex items-center gap-3 mb-2.5 cursor-pointer">
                <div className="w-4 h-4 rounded-md border flex-shrink-0" style={{ borderColor: "var(--border-bright)" }} />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{b}</span>
              </label>
            ))}
          </div>

          <button className="btn-orange w-full" style={{ justifyContent: "center", fontSize: 14 }}>
            Применить фильтры
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 z-10" style={{ borderColor: "var(--border-color)", background: "var(--surface-1)" }}>
          <div>
            <h1 className="text-xl font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>Каталог товаров</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>340 218 товаров · 2 400 поставщиков</p>
          </div>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button className="btn-orange">
                <Icon name="ShoppingCart" size={15} />
                Корзина ({cart.length})
              </button>
            )}
            <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <Icon name="SlidersHorizontal" size={14} style={{ color: "var(--text-muted)" }} />
              <select
                className="bg-transparent text-sm outline-none cursor-pointer"
                style={{ color: "var(--text-secondary)" }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Популярные</option>
                <option value="price_asc">Сначала дешевле</option>
                <option value="price_desc">Сначала дороже</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* KOMI banner */}
          <div
            className="rounded-2xl p-4 mb-6 flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, rgba(255,122,0,0.1), rgba(255,140,26,0.04))", border: "1px solid rgba(255,122,0,0.2)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,122,0,0.2)", color: "var(--orange)" }}>
              <Icon name="Sparkles" size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>KOMI подберёт товары для вашего проекта</div>
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Опишите задачу — KOMI найдёт лучшие варианты с оптимальной ценой</div>
            </div>
            <button className="btn-orange flex-shrink-0">
              <Icon name="Sparkles" size={14} />
              Спросить KOMI
            </button>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-3 gap-5">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl overflow-hidden group cursor-pointer transition-all"
                style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                onClick={() => setOpenProduct(p)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-bright)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                <div className="relative h-48 flex items-center justify-center" style={{ background: "var(--surface-4)" }}>
                  <Icon name="Package" size={48} style={{ color: "var(--surface-5)" }} />
                  {p.tag && <span className={`absolute top-3 left-3 tag tag-${p.tagColor}`}>{p.tag}</span>}
                  <button
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(0,0,0,0.4)", color: "var(--text-muted)", backdropFilter: "blur(8px)" }}
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    <Icon name="Heart" size={14} />
                  </button>
                </div>

                <div className="p-5">
                  <div className="text-xs mb-1 font-medium" style={{ color: "var(--text-muted)" }}>{p.brand}</div>
                  <div className="text-sm font-semibold mb-3 leading-snug" style={{ color: "var(--text-primary)" }}>{p.name}</div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Icon key={s} name="Star" size={11} style={{ color: s <= Math.floor(p.rating) ? "#FFD60A" : "var(--surface-5)" }} />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{p.rating} · {p.reviews} отз.</span>
                  </div>

                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-xl font-black" style={{ color: "var(--text-primary)" }}>
                        {p.price.toLocaleString("ru")} ₽
                      </div>
                      {p.oldPrice && (
                        <div className="text-sm line-through" style={{ color: "var(--text-muted)" }}>
                          {p.oldPrice.toLocaleString("ru")} ₽
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium" style={{ color: p.stockColor }}>{p.stock}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{p.suppliers} пост. · {p.delivery}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
                      style={{
                        background: cart.includes(p.id) ? "rgba(52,199,89,0.15)" : "var(--orange)",
                        color: cart.includes(p.id) ? "#34C759" : "#000",
                        border: cart.includes(p.id) ? "1px solid rgba(52,199,89,0.3)" : "none",
                      }}
                      onClick={(e) => { e.stopPropagation(); toggleCart(p.id); }}
                    >
                      {cart.includes(p.id) ? "✓ В корзине" : "В корзину"}
                    </button>
                    <button
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                      style={{ background: "var(--surface-4)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
                      onClick={(e) => { e.stopPropagation(); setOpenProduct(p); }}
                    >
                      <Icon name="Maximize2" size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
