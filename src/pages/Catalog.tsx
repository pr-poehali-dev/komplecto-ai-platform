import { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = [
  { id: "all", label: "Все", icon: "Grid3X3", count: 340218 },
  { id: "plumbing", label: "Сантехника", icon: "Droplets", count: 18420 },
  { id: "tile", label: "Плитка", icon: "Square", count: 42800 },
  { id: "lighting", label: "Освещение", icon: "Lightbulb", count: 23500 },
  { id: "furniture", label: "Мебель", icon: "Armchair", count: 67000 },
  { id: "doors", label: "Двери", icon: "DoorOpen", count: 9800 },
  { id: "kitchen", label: "Кухни", icon: "ChefHat", count: 5600 },
  { id: "electrical", label: "Электрика", icon: "Zap", count: 31000 },
  { id: "decor", label: "Декор", icon: "Palette", count: 88000 },
];

const products = [
  {
    name: "Унитаз подвесной Villeroy & Boch Subway 2.0",
    brand: "Villeroy & Boch",
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
  },
  {
    name: "Плитка керамогранит Emil Ceramica Tele di Marmo",
    brand: "Emil Ceramica",
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
  },
  {
    name: "Смеситель встроенный Grohe Grohtherm 3000",
    brand: "Grohe",
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
  },
  {
    name: "Подвесной светильник Artemide Pirce",
    brand: "Artemide",
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
  },
  {
    name: "Ванна акриловая Jacob Delafon Escal 170×75",
    brand: "Jacob Delafon",
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
  },
  {
    name: "Душевой поддон Ravak Gigant Pro 80×80",
    brand: "Ravak",
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
  },
];

export default function Catalog() {
  const [activeCat, setActiveCat] = useState("all");
  const [cart, setCart] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("popular");

  const toggleCart = (i: number) => {
    setCart((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar filters */}
      <aside
        className="w-56 flex-shrink-0 border-r overflow-y-auto p-4"
        style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}
      >
        <div className="mb-6">
          <div className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Категории
          </div>
          <div className="space-y-0.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`sidebar-link w-full text-left ${activeCat === c.id ? "active" : ""}`}
              >
                <Icon name={c.icon} size={14} />
                <span className="flex-1 text-xs">{c.label}</span>
                <span className="text-xs font-mono" style={{ color: "var(--text-muted)", fontSize: 10 }}>
                  {(c.count / 1000).toFixed(0)}K
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="divider mb-4" />

        <div className="mb-5">
          <div className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Цена
          </div>
          <div className="flex gap-2">
            <div
              className="flex-1 rounded-lg px-2 py-1.5 text-xs"
              style={{ background: "var(--surface-4)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
            >
              от 0 ₽
            </div>
            <div
              className="flex-1 rounded-lg px-2 py-1.5 text-xs"
              style={{ background: "var(--surface-4)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
            >
              до 500К ₽
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Наличие
          </div>
          {["В наличии", "Под заказ", "Все"].map((s, i) => (
            <label key={i} className="flex items-center gap-2 mb-2 cursor-pointer">
              <div
                className="w-4 h-4 rounded border flex items-center justify-center"
                style={{ borderColor: i === 0 ? "var(--orange)" : "var(--border-bright)", background: i === 0 ? "var(--orange)" : "transparent" }}
              >
                {i === 0 && <Icon name="Check" size={10} style={{ color: "#000" }} />}
              </div>
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {s}
              </span>
            </label>
          ))}
        </div>

        <div className="mb-5">
          <div className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Бренды
          </div>
          {["Villeroy & Boch", "Grohe", "Hansgrohe", "Roca", "IKEA", "Artemide"].map((b, i) => (
            <label key={i} className="flex items-center gap-2 mb-2 cursor-pointer">
              <div
                className="w-4 h-4 rounded border"
                style={{ borderColor: "var(--border-bright)", background: "transparent" }}
              />
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {b}
              </span>
            </label>
          ))}
        </div>

        <button className="btn-orange w-full text-xs" style={{ justifyContent: "center" }}>
          Применить фильтры
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              Каталог товаров
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              340 218 товаров от 2 400 поставщиков
            </p>
          </div>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button className="btn-orange text-xs">
                <Icon name="ShoppingCart" size={13} />
                Корзина ({cart.length})
              </button>
            )}
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
            >
              <Icon name="SlidersHorizontal" size={13} style={{ color: "var(--text-muted)" }} />
              <select
                className="bg-transparent text-xs outline-none"
                style={{ color: "var(--text-secondary)" }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Популярные</option>
                <option value="price_asc">Дешевле</option>
                <option value="price_desc">Дороже</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
            <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
              <button className="px-2.5 py-2" style={{ background: "var(--surface-4)", color: "var(--orange)" }}>
                <Icon name="Grid2X2" size={14} />
              </button>
              <button className="px-2.5 py-2" style={{ background: "var(--surface-3)", color: "var(--text-muted)" }}>
                <Icon name="List" size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* KOMI banner */}
        <div
          className="rounded-xl p-4 mb-6 flex items-center gap-4"
          style={{
            background: "linear-gradient(135deg, rgba(255,122,0,0.1), rgba(255,140,26,0.05))",
            border: "1px solid rgba(255,122,0,0.2)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,122,0,0.2)", color: "var(--orange)" }}
          >
            <Icon name="Sparkles" size={18} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
              KOMI подберёт товары для вашего проекта
            </div>
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Опишите задачу — KOMI найдёт лучшие варианты с оптимальной ценой
            </div>
          </div>
          <button className="btn-orange text-xs flex-shrink-0">
            <Icon name="Sparkles" size={12} />
            Спросить KOMI
          </button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-3 gap-4">
          {products.map((p, i) => (
            <div
              key={i}
              className="card-premium overflow-hidden group"
            >
              {/* Image placeholder */}
              <div
                className="relative h-44 flex items-center justify-center mb-0"
                style={{ background: "var(--surface-4)" }}
              >
                <Icon name="Package" size={40} style={{ color: "var(--surface-5)" }} />
                {p.tag && (
                  <span className={`absolute top-3 left-3 tag tag-${p.tagColor}`}>
                    {p.tag}
                  </span>
                )}
                <button
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  style={{
                    background: "var(--surface-3)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-muted)",
                  }}
                >
                  <Icon name="Heart" size={13} />
                </button>
              </div>

              <div className="p-4">
                <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                  {p.brand}
                </div>
                <div
                  className="text-sm font-medium mb-3 leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {p.name}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon
                        key={s}
                        name="Star"
                        size={11}
                        style={{ color: s <= Math.floor(p.rating) ? "#FFD60A" : "var(--surface-5)" }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                    {p.rating} ({p.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                      {p.price.toLocaleString("ru")} ₽
                    </div>
                    {p.oldPrice && (
                      <div
                        className="text-xs line-through"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {p.oldPrice.toLocaleString("ru")} ₽
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs" style={{ color: p.stockColor }}>
                      {p.stock}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {p.suppliers} поставщика · {p.delivery}
                    </div>
                  </div>
                </div>

                <button
                  className={`w-full text-xs py-2 rounded-lg font-semibold transition-all ${
                    cart.includes(i) ? "" : ""
                  }`}
                  style={{
                    background: cart.includes(i) ? "rgba(52,199,89,0.15)" : "var(--orange)",
                    color: cart.includes(i) ? "#34C759" : "#000",
                    border: cart.includes(i) ? "1px solid rgba(52,199,89,0.3)" : "none",
                  }}
                  onClick={() => toggleCart(i)}
                >
                  {cart.includes(i) ? "✓ В корзине" : "В корзину"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
