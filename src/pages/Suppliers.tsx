import { useState } from "react";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const allSuppliers = [
  { id: 1, name: "ТД Аквасфера", category: "Сантехника", rating: 4.9, orders: 34, onTime: 97, location: "Москва", verified: true, products: 4200, since: "2019", desc: "Официальный дистрибьютор Villeroy & Boch, Jacob Delafon, Ravak. Собственный склад 2000 м²." },
  { id: 2, name: "Cerama Nova", category: "Плитка и керамика", rating: 4.7, orders: 28, onTime: 94, location: "Санкт-Петербург", verified: true, products: 18600, since: "2015", desc: "Крупнейший импортёр итальянской и испанской керамики. Прямые поставки от Emil Ceramica, Fap, Marazzi." },
  { id: 3, name: "Sviet Design", category: "Освещение", rating: 5.0, orders: 15, onTime: 100, location: "Москва", verified: true, products: 3400, since: "2017", desc: "Эксклюзивный представитель Artemide, Flos и Vibia в России. Все позиции под заказ из Италии." },
  { id: 4, name: "Electro Pro", category: "Электрика", rating: 4.4, orders: 22, onTime: 89, location: "Москва", verified: false, products: 9800, since: "2020", desc: "Поставщик электрооборудования и автоматики. Legrand, ABB, Schneider Electric." },
  { id: 5, name: "Grohe Official", category: "Сантехника", rating: 4.6, orders: 19, onTime: 91, location: "Москва", verified: true, products: 1200, since: "2016", desc: "Официальный дилер Grohe и Hansgrohe. Полная линейка смесителей, душевых систем, термостатов." },
  { id: 6, name: "МебельЭксперт", category: "Мебель", rating: 4.3, orders: 11, onTime: 86, location: "Екатеринбург", verified: false, products: 24000, since: "2018", desc: "Мебель для жилых и коммерческих помещений. ИКЕА, Hoff, корпусная мебель на заказ." },
  { id: 7, name: "BathPro", category: "Сантехника", rating: 4.5, orders: 17, onTime: 93, location: "Москва", verified: true, products: 2800, since: "2021", desc: "Ванны, поддоны, душевые кабины. Акрил, сталь, чугун. Доставка по Москве 1-2 дня." },
  { id: 8, name: "ПлиткаОпт", category: "Плитка и керамика", rating: 4.4, orders: 31, onTime: 88, location: "Москва", verified: false, products: 31000, since: "2014", desc: "Оптовые поставки плитки российского и китайского производства. Kerama Marazzi, Laparet, Paradyz." },
  { id: 9, name: "LightPro Москва", category: "Освещение", rating: 4.6, orders: 24, onTime: 95, location: "Москва", verified: true, products: 5600, since: "2016", desc: "Умное освещение и классические светильники. Philips Hue, IKEA Tradfri, Nowodvorski." },
  { id: 10, name: "Bella Ceramica", category: "Плитка и керамика", rating: 4.8, orders: 19, onTime: 97, location: "Москва", verified: true, products: 12400, since: "2013", desc: "Элитная плитка и мозаика. Atlas Concorde, Imola, Ragno. Подбор и дизайн-проект бесплатно." },
  { id: 11, name: "КухниПроф", category: "Кухни", rating: 4.7, orders: 8, onTime: 90, location: "Москва", verified: true, products: 840, since: "2019", desc: "Кухонные гарнитуры Leicht, Rational, Häcker. Замер, дизайн, монтаж под ключ." },
  { id: 12, name: "ДверейМного", category: "Двери", rating: 4.2, orders: 14, onTime: 82, location: "Казань", verified: false, products: 6200, since: "2017", desc: "Межкомнатные и входные двери. Porta Doors, Profil Doors, Bunescu. Доставка по РФ." },
];

const categories = ["Все", "Сантехника", "Плитка и керамика", "Освещение", "Мебель", "Электрика", "Двери", "Кухни"];

export default function Suppliers() {
  const [activeCat, setActiveCat] = useState("Все");
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = allSuppliers.filter((s) => {
    const catMatch = activeCat === "Все" || s.category === activeCat;
    const searchMatch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const activeSupplier = selected !== null ? allSuppliers.find((s) => s.id === selected) : null;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Поставщики</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{allSuppliers.length} партнёров · {allSuppliers.filter(s => s.verified).length} верифицированы</p>
        </div>
        <button className="btn-orange text-sm" onClick={() => toast.info("Форма регистрации поставщика")}>
          <Icon name="Plus" size={14} />
          <span className="hidden md:inline">Добавить поставщика</span>
          <span className="md:hidden">Добавить</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
        <Icon name="Search" size={15} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск поставщиков..."
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: "var(--text-primary)" }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ color: "var(--text-muted)" }}>
            <Icon name="X" size={14} />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all flex-shrink-0"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Supplier list */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 rounded-2xl" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <Icon name="Search" size={40} style={{ color: "var(--text-muted)", opacity: 0.3, marginBottom: 12 }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Поставщики не найдены</p>
            </div>
          )}
          {filtered.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              className="rounded-2xl cursor-pointer transition-all"
              style={{
                padding: "16px 20px",
                background: "var(--surface-3)",
                border: `1px solid ${selected === s.id ? "var(--orange)" : "var(--border-color)"}`,
              }}
              onMouseEnter={(e) => { if (selected !== s.id) e.currentTarget.style.borderColor = "var(--border-bright)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { if (selected !== s.id) e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0" style={{ background: "var(--surface-5)", color: "var(--text-secondary)" }}>
                  {s.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{s.name}</span>
                    {s.verified && (
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#0A84FF" }}>
                        <Icon name="Check" size={9} style={{ color: "#fff" }} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs flex-wrap" style={{ color: "var(--text-muted)" }}>
                    <span>{s.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Icon name="MapPin" size={11} />{s.location}</span>
                    <span>·</span>
                    <span>{s.products.toLocaleString("ru")} товаров</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-5 flex-shrink-0">
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={12} style={{ color: "#FFD60A" }} />
                      <span className="font-bold text-sm font-mono" style={{ color: "var(--text-primary)" }}>{s.rating}</span>
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Рейтинг</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm font-mono" style={{ color: s.onTime >= 95 ? "#34C759" : s.onTime >= 90 ? "#FFD60A" : "#FF3B30" }}>{s.onTime}%</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>В срок</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm font-mono" style={{ color: "var(--text-primary)" }}>{s.orders}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Заказов</div>
                  </div>
                  <button
                    className="btn-ghost text-xs"
                    style={{ padding: "7px 14px" }}
                    onClick={(e) => { e.stopPropagation(); toast.success(`Открыт каталог ${s.name}`); }}
                  >
                    Каталог
                  </button>
                </div>
              </div>
              {/* Mobile stats */}
              <div className="md:hidden flex items-center gap-4 mt-3 pt-3" style={{ borderTop: "1px solid var(--border-color)" }}>
                <span className="flex items-center gap-1 text-xs"><Icon name="Star" size={11} style={{ color: "#FFD60A" }} /><span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{s.rating}</span></span>
                <span className="text-xs font-mono" style={{ color: s.onTime >= 95 ? "#34C759" : "#FFD60A" }}>{s.onTime}% в срок</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{s.orders} заказов</span>
                <button className="ml-auto text-xs px-3 py-1.5 rounded-lg" style={{ background: "var(--surface-4)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
                  onClick={(e) => { e.stopPropagation(); toast.success(`Каталог ${s.name}`); }}>
                  Каталог
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Supplier detail */}
        <div className="space-y-4">
          {activeSupplier ? (
            <div className="rounded-2xl overflow-hidden animate-fade-in sticky top-6" style={{ border: "1px solid var(--border-bright)" }}>
              <div className="p-5 border-b" style={{ borderColor: "var(--border-color)", background: "var(--surface-3)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black mb-3" style={{ background: "var(--surface-4)", color: "var(--text-secondary)" }}>
                  {activeSupplier.name[0]}
                </div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <div className="font-black text-lg" style={{ color: "var(--text-primary)" }}>{activeSupplier.name}</div>
                  {activeSupplier.verified && <span className="tag tag-blue">Верифицирован</span>}
                </div>
                <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>{activeSupplier.category} · {activeSupplier.location} · с {activeSupplier.since}</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{activeSupplier.desc}</p>
              </div>
              <div className="p-5 space-y-4" style={{ background: "var(--surface-3)" }}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Рейтинг", val: `${activeSupplier.rating} ★`, color: "#FFD60A" },
                    { label: "В срок", val: `${activeSupplier.onTime}%`, color: activeSupplier.onTime >= 95 ? "#34C759" : "#FFD60A" },
                    { label: "Заказов", val: String(activeSupplier.orders), color: "var(--text-primary)" },
                    { label: "Товаров", val: activeSupplier.products.toLocaleString("ru"), color: "var(--text-primary)" },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl p-3 text-center" style={{ background: "var(--surface-4)" }}>
                      <div className="font-bold text-sm" style={{ color: stat.color }}>{stat.val}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                <button className="btn-orange w-full" style={{ justifyContent: "center" }} onClick={() => toast.success(`Чат с ${activeSupplier.name} открыт`)}>
                  <Icon name="MessageSquare" size={15} />
                  Написать поставщику
                </button>
                <button className="btn-ghost w-full" style={{ justifyContent: "center" }} onClick={() => toast.info(`Каталог ${activeSupplier.name}`)}>
                  <Icon name="Grid3X3" size={15} />
                  Открыть каталог
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-8 flex flex-col items-center text-center" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <Icon name="Truck" size={36} style={{ color: "var(--text-muted)", marginBottom: 12, opacity: 0.3 }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Выберите поставщика для просмотра деталей</p>
            </div>
          )}

          {/* Top suppliers */}
          <div className="rounded-2xl p-4" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
            <div className="text-sm font-bold mb-3" style={{ color: "var(--text-primary)" }}>Топ по надёжности</div>
            {allSuppliers.sort((a, b) => b.onTime - a.onTime).slice(0, 4).map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "var(--border-color)" }}>
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{s.name}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="progress-bar w-16">
                    <div className="progress-fill" style={{ width: `${s.onTime}%` }} />
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: "#34C759" }}>{s.onTime}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
