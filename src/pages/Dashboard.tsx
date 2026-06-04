import Icon from "@/components/ui/icon";

interface Props {
  onNavigate: (page: string) => void;
}

const stats = [
  { label: "Активных проектов", value: "12", delta: "+2 этот месяц", icon: "FolderOpen", color: "#FF7A00" },
  { label: "Заказов в работе", value: "34", delta: "+8 за неделю", icon: "Package", color: "#0A84FF" },
  { label: "Бюджет объектов", value: "₽ 18.4М", delta: "В рамках плана", icon: "Wallet", color: "#34C759" },
  { label: "Экономия KOMI", value: "₽ 2.1М", delta: "−11.4% от сметы", icon: "Sparkles", color: "#FF7A00" },
];

const projects = [
  {
    name: "ЖК Северный берег",
    client: "Застройщик «Мегаполис»",
    status: "В работе",
    statusColor: "#34C759",
    progress: 72,
    budget: "4.2 млн",
    items: 147,
    tag: "green",
  },
  {
    name: "Офис Газпром нефть",
    client: "Газпром нефть, корп.",
    status: "Комплектация",
    statusColor: "#FF7A00",
    progress: 45,
    budget: "12.8 млн",
    items: 312,
    tag: "orange",
  },
  {
    name: "Вилла Рублёво-44",
    client: "Частный клиент",
    status: "Согласование",
    statusColor: "#FFD60A",
    progress: 28,
    budget: "7.1 млн",
    items: 89,
    tag: "yellow",
  },
  {
    name: "Ресторан Morozko",
    client: "ООО «Гастро Групп»",
    status: "Новый",
    statusColor: "#0A84FF",
    progress: 8,
    budget: "1.9 млн",
    items: 34,
    tag: "blue",
  },
];

const orders = [
  { supplier: "ТД Аквасфера", items: 14, amount: "₽ 284 000", status: "Доставлен", color: "#34C759" },
  { supplier: "Cerama Nova", items: 6, amount: "₽ 97 500", status: "В пути", color: "#0A84FF" },
  { supplier: "Electro Pro", items: 22, amount: "₽ 156 000", status: "Сборка", color: "#FFD60A" },
  { supplier: "Sviet Design", items: 8, amount: "₽ 412 000", status: "Ожидание", color: "#6B6B6B" },
];

const komiRecs = [
  { text: "Нашёл аналог плитки Villeroy & Boch — экономия 23 400 ₽ для проекта «Вилла Рублёво»", icon: "Sparkles" },
  { text: "Оптимальный срок заказа освещения для ЖК Северный берег — сегодня последний день", icon: "Clock" },
  { text: "Поставщик Cerama Nova предлагает скидку 7% при заказе от 150 000 ₽", icon: "Tag" },
];

export default function Dashboard({ onNavigate }: Props) {
  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Доброе утро, Алексей
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Четверг, 4 июня 2025 · 12 активных объектов
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost text-sm" onClick={() => onNavigate("projects")}>
            <Icon name="Plus" size={14} />
            Новый проект
          </button>
          <button className="btn-orange text-sm" onClick={() => onNavigate("komi")}>
            <Icon name="Sparkles" size={14} />
            KOMI AI
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                <Icon name={s.icon} size={15} />
              </div>
              <Icon name="TrendingUp" size={13} style={{ color: "#34C759" }} />
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
              {s.value}
            </div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              {s.label}
            </div>
            <div className="text-xs mt-1" style={{ color: "#34C759" }}>
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Projects */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Активные проекты
            </h2>
            <button
              className="text-xs transition-colors"
              style={{ color: "var(--orange)" }}
              onClick={() => onNavigate("projects")}
            >
              Все проекты →
            </button>
          </div>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div
                key={i}
                className="card-premium cursor-pointer"
                style={{ padding: "16px 20px" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                      {p.name}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {p.client}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
                        {p.budget}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {p.items} позиций
                      </div>
                    </div>
                    <span
                      className={`tag tag-${p.tag}`}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="progress-bar flex-1">
                    <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="text-xs font-mono flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                    {p.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* KOMI Recommendations */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,122,0,0.15)", color: "var(--orange)" }}
              >
                <Icon name="Sparkles" size={11} />
              </div>
              <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Рекомендации KOMI
              </h2>
            </div>
            <div className="space-y-2">
              {komiRecs.map((r, i) => (
                <div
                  key={i}
                  className="komi-bubble cursor-pointer transition-all"
                  style={{ cursor: "pointer" }}
                >
                  <div className="flex items-start gap-2">
                    <Icon name={r.icon} size={12} style={{ color: "var(--orange)", marginTop: 2, flexShrink: 0 }} />
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {r.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-3 text-xs w-full py-2 rounded-lg transition-all"
              style={{ border: "1px dashed rgba(255,122,0,0.3)", color: "var(--orange)" }}
              onClick={() => onNavigate("komi")}
            >
              Открыть KOMI AI →
            </button>
          </div>

          {/* Recent orders */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Последние заказы
              </h2>
              <button className="text-xs" style={{ color: "var(--orange)" }}>
                Все →
              </button>
            </div>
            <div className="space-y-2">
              {orders.map((o, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all cursor-pointer"
                  style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-bright)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: o.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                      {o.supplier}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {o.items} позиций
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono" style={{ color: "var(--text-primary)" }}>
                      {o.amount}
                    </div>
                    <div className="text-xs" style={{ color: o.color }}>
                      {o.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mini analytics bar */}
      <div
        className="mt-6 rounded-xl p-5"
        style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Расходы по месяцам
          </h2>
          <button className="text-xs" style={{ color: "var(--orange)" }} onClick={() => onNavigate("analytics")}>
            Полная аналитика →
          </button>
        </div>
        <div className="flex items-end gap-2 h-20">
          {[35, 52, 41, 67, 58, 80, 72, 91, 65, 88, 94, 100].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t transition-all"
                style={{
                  height: `${h}%`,
                  background: i === 11
                    ? "var(--orange)"
                    : "var(--surface-5)",
                  minHeight: 4,
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"].map((m, i) => (
            <span key={i} className="text-xs flex-1 text-center" style={{ color: "var(--text-muted)", fontSize: 10 }}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
