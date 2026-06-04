import { useState } from "react";
import Icon from "@/components/ui/icon";

const suppliers = [
  { name: "ТД Аквасфера", category: "Сантехника", rating: 4.9, orders: 34, onTime: 97, location: "Москва", verified: true, products: 4200 },
  { name: "Cerama Nova", category: "Плитка и керамика", rating: 4.7, orders: 28, onTime: 94, location: "СПб", verified: true, products: 18600 },
  { name: "Electro Pro", category: "Электрика", rating: 4.4, orders: 22, onTime: 89, location: "Москва", verified: false, products: 9800 },
  { name: "Sviet Design", category: "Освещение", rating: 5.0, orders: 15, onTime: 100, location: "Москва", verified: true, products: 3400 },
  { name: "Grohe Official", category: "Сантехника", rating: 4.6, orders: 19, onTime: 91, location: "Москва", verified: true, products: 1200 },
  { name: "МебельЭксперт", category: "Мебель", rating: 4.3, orders: 11, onTime: 86, location: "Екатеринбург", verified: false, products: 24000 },
];

const categories = ["Все", "Сантехника", "Плитка", "Освещение", "Мебель", "Электрика", "Двери", "Кухни"];

export default function Suppliers() {
  const [activeCat, setActiveCat] = useState("Все");
  const [selected, setSelected] = useState<number | null>(null);

  const activeSupplier = selected !== null ? suppliers[selected] : null;

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Поставщики</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>2 400 верифицированных поставщика</p>
        </div>
        <button className="btn-orange text-sm">
          <Icon name="Plus" size={14} />
          Добавить поставщика
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className="px-3 py-1.5 rounded-full text-xs transition-all"
            style={{
              background: activeCat === c ? "var(--orange)" : "var(--surface-3)",
              color: activeCat === c ? "#000" : "var(--text-muted)",
              border: `1px solid ${activeCat === c ? "var(--orange)" : "var(--border-color)"}`,
              fontWeight: activeCat === c ? 600 : 400,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-3">
          {suppliers.map((s, i) => (
            <div
              key={i}
              className="card-premium cursor-pointer transition-all"
              style={{
                padding: "18px 20px",
                borderColor: selected === i ? "var(--orange)" : undefined,
              }}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{ background: "var(--surface-5)", color: "var(--text-secondary)" }}
                >
                  {s.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{s.name}</span>
                    {s.verified && (
                      <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#0A84FF" }}>
                        <Icon name="Check" size={9} style={{ color: "#fff" }} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>{s.category}</span>
                    <span>·</span>
                    <Icon name="MapPin" size={11} />
                    <span>{s.location}</span>
                    <span>·</span>
                    <span>{s.products.toLocaleString("ru")} товаров</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center mb-0.5">
                      <Icon name="Star" size={12} style={{ color: "#FFD60A" }} />
                      <span className="font-mono font-bold text-sm" style={{ color: "var(--text-primary)" }}>{s.rating}</span>
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Рейтинг</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono font-bold text-sm mb-0.5" style={{ color: s.onTime >= 95 ? "#34C759" : s.onTime >= 90 ? "#FFD60A" : "#FF3B30" }}>
                      {s.onTime}%
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>В срок</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono font-bold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>{s.orders}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Заказов</div>
                  </div>
                  <button
                    className="btn-ghost text-xs"
                    style={{ padding: "6px 14px" }}
                    onClick={(e) => { e.stopPropagation(); }}
                  >
                    Каталог
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supplier detail */}
        <div>
          {activeSupplier ? (
            <div className="rounded-xl overflow-hidden animate-fade-in" style={{ border: "1px solid var(--border-bright)" }}>
              <div className="p-5 border-b" style={{ borderColor: "var(--border-color)", background: "var(--surface-3)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold mb-3"
                  style={{ background: "var(--surface-4)", color: "var(--text-secondary)" }}>
                  {activeSupplier.name[0]}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-bold" style={{ color: "var(--text-primary)" }}>{activeSupplier.name}</div>
                  {activeSupplier.verified && <span className="tag tag-blue">Верифицирован</span>}
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{activeSupplier.category} · {activeSupplier.location}</div>
              </div>
              <div className="p-5 space-y-4" style={{ background: "var(--surface-3)" }}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Рейтинг", val: `${activeSupplier.rating}★`, color: "#FFD60A" },
                    { label: "В срок", val: `${activeSupplier.onTime}%`, color: activeSupplier.onTime >= 95 ? "#34C759" : "#FFD60A" },
                    { label: "Заказов", val: String(activeSupplier.orders), color: "var(--text-primary)" },
                    { label: "Товаров", val: activeSupplier.products.toLocaleString("ru"), color: "var(--text-primary)" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-lg p-3 text-center" style={{ background: "var(--surface-4)" }}>
                      <div className="font-bold text-sm" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <button className="btn-orange w-full text-xs" style={{ justifyContent: "center" }}>
                    <Icon name="MessageSquare" size={13} />
                    Написать поставщику
                  </button>
                  <button className="btn-ghost w-full text-xs" style={{ justifyContent: "center" }}>
                    <Icon name="Grid3X3" size={13} />
                    Открыть каталог
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-xl p-8 flex flex-col items-center text-center"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
            >
              <Icon name="Truck" size={36} style={{ color: "var(--text-muted)", marginBottom: 12, opacity: 0.3 }} />
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Выберите поставщика для просмотра деталей</p>
            </div>
          )}

          <div className="mt-4 rounded-xl p-4" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
            <div className="text-xs font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Топ по категориям</div>
            {[
              { cat: "Сантехника", name: "ТД Аквасфера", rating: "4.9" },
              { cat: "Плитка", name: "Cerama Nova", rating: "4.7" },
              { cat: "Освещение", name: "Sviet Design", rating: "5.0" },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--border-color)" }}>
                <div>
                  <div className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{t.cat}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={11} style={{ color: "#FFD60A" }} />
                  <span className="text-xs font-mono" style={{ color: "var(--text-primary)" }}>{t.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
