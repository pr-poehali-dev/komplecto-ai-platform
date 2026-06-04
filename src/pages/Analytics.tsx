import Icon from "@/components/ui/icon";

const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
const revenueData = [28, 35, 32, 48, 52, 61, 58, 74, 68, 82, 90, 100];
const savingsData = [4, 6, 5, 9, 11, 13, 12, 16, 14, 18, 21, 23];

const supplierPerf = [
  { name: "ТД Аквасфера", orders: 34, onTime: 97, avg: "4.9", amount: "₽ 2.4М" },
  { name: "Cerama Nova", orders: 28, onTime: 94, avg: "4.7", amount: "₽ 1.8М" },
  { name: "Electro Pro", orders: 22, onTime: 89, avg: "4.4", amount: "₽ 980К" },
  { name: "Sviet Design", orders: 15, onTime: 100, avg: "5.0", amount: "₽ 3.2М" },
  { name: "Grohe Official", orders: 19, onTime: 91, avg: "4.6", amount: "₽ 1.1М" },
];

const projectStats = [
  { name: "ЖК Северный берег", budget: 4200000, spent: 3024000, savings: 380000, pct: 72 },
  { name: "Офис Газпром нефть", budget: 12800000, spent: 5760000, savings: 840000, pct: 45 },
  { name: "Вилла Рублёво-44", budget: 7100000, spent: 1988000, savings: 210000, pct: 28 },
  { name: "Ресторан Morozko", budget: 1900000, spent: 152000, savings: 18000, pct: 8 },
];

const StatCard = ({ label, value, delta, icon, color }: { label: string; value: string; delta: string; icon: string; color: string }) => (
  <div className="stat-card">
    <div className="flex items-center justify-between mb-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18`, color }}>
        <Icon name={icon} size={15} />
      </div>
      <span className="text-xs font-mono" style={{ color: "#34C759" }}>{delta}</span>
    </div>
    <div className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{value}</div>
    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</div>
  </div>
);

export default function Analytics() {
  const maxVal = Math.max(...revenueData);

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Аналитика</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Данные за 2025 год · Обновлено сегодня</p>
        </div>
        <div className="flex gap-2">
          {["7 дней", "30 дней", "3 мес", "Год"].map((p, i) => (
            <button
              key={p}
              className="px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: i === 3 ? "var(--orange)" : "var(--surface-3)",
                color: i === 3 ? "#000" : "var(--text-muted)",
                border: `1px solid ${i === 3 ? "var(--orange)" : "var(--border-color)"}`,
                fontWeight: i === 3 ? 600 : 400,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Оборот за год" value="₽ 26.9М" delta="+34% г/г" icon="TrendingUp" color="#34C759" />
        <StatCard label="Экономия KOMI" value="₽ 1.45М" delta="+18% к плану" icon="Sparkles" color="#FF7A00" />
        <StatCard label="Завершено заказов" value="218" delta="+12% г/г" icon="Package" color="#0A84FF" />
        <StatCard label="NPS платформы" value="74" delta="+6 пунктов" icon="Star" color="#FFD60A" />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Revenue chart */}
        <div className="rounded-xl p-5" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Оборот по месяцам</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>в млн ₽</div>
            </div>
            <span className="tag tag-green">+34% г/г</span>
          </div>
          <div className="flex items-end gap-1.5 h-32 mb-2">
            {revenueData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm transition-all cursor-pointer group relative"
                  style={{
                    height: `${(v / maxVal) * 100}%`,
                    background: i >= 10 ? "var(--orange)" : "var(--surface-5)",
                    minHeight: 4,
                  }}
                  onMouseEnter={(e) => {
                    if (i < 10) e.currentTarget.style.background = "var(--surface-4)";
                  }}
                  onMouseLeave={(e) => {
                    if (i < 10) e.currentTarget.style.background = "var(--surface-5)";
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {months.map((m, i) => (
              <span key={i} className="text-center flex-1" style={{ fontSize: 9, color: "var(--text-muted)" }}>
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Savings chart */}
        <div className="rounded-xl p-5" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Экономия KOMI AI</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>в % от бюджета</div>
            </div>
            <span className="tag tag-orange">AI-оптимизация</span>
          </div>
          <div className="flex items-end gap-1.5 h-32 mb-2">
            {savingsData.map((v, i) => (
              <div key={i} className="flex-1">
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${(v / 25) * 100}%`,
                    background: `rgba(255,122,0,${0.3 + (v / 25) * 0.7})`,
                    minHeight: 4,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            {months.map((m, i) => (
              <span key={i} className="text-center flex-1" style={{ fontSize: 9, color: "var(--text-muted)" }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Supplier performance */}
      <div className="rounded-xl overflow-hidden mb-6" style={{ border: "1px solid var(--border-color)" }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border-color)", background: "var(--surface-3)" }}>
          <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Эффективность поставщиков</div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>Топ-5 за период</span>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: "var(--surface-3)", borderBottom: "1px solid var(--border-color)" }}>
              {["Поставщик", "Заказов", "В срок", "Рейтинг", "Оборот", "Статус"].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-semibold" style={{ color: "var(--text-muted)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {supplierPerf.map((s, i) => (
              <tr
                key={i}
                style={{ borderBottom: i < supplierPerf.length - 1 ? "1px solid var(--border-color)" : undefined }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: "var(--surface-4)", color: "var(--text-secondary)" }}>
                      {s.name[0]}
                    </div>
                    <span style={{ color: "var(--text-primary)" }}>{s.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 font-mono" style={{ color: "var(--text-secondary)" }}>{s.orders}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="progress-bar w-16">
                      <div className="progress-fill" style={{ width: `${s.onTime}%` }} />
                    </div>
                    <span className="font-mono" style={{ color: s.onTime >= 95 ? "#34C759" : s.onTime >= 90 ? "#FFD60A" : "#FF3B30" }}>
                      {s.onTime}%
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={11} style={{ color: "#FFD60A" }} />
                    <span className="font-mono" style={{ color: "var(--text-primary)" }}>{s.avg}</span>
                  </div>
                </td>
                <td className="px-5 py-4 font-mono" style={{ color: "var(--text-primary)" }}>{s.amount}</td>
                <td className="px-5 py-4">
                  <span className={`tag ${s.onTime >= 95 ? "tag-green" : s.onTime >= 90 ? "tag-yellow" : "tag-orange"}`}>
                    {s.onTime >= 95 ? "Отличный" : s.onTime >= 90 ? "Хороший" : "Средний"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Projects breakdown */}
      <div className="rounded-xl p-5" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
        <div className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Расходы по проектам</div>
        <div className="space-y-4">
          {projectStats.map((p, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono" style={{ color: "var(--text-muted)" }}>
                    {(p.spent / 1000000).toFixed(1)} / {(p.budget / 1000000).toFixed(1)} млн ₽
                  </span>
                  <span className="tag tag-green">−{(p.savings / 1000).toFixed(0)}К KOMI</span>
                </div>
              </div>
              <div className="progress-bar" style={{ height: 5 }}>
                <div className="progress-fill" style={{ width: `${p.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
