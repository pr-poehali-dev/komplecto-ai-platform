import { useState } from "react";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const projects = [
  {
    id: 1,
    name: "ЖК Северный берег",
    client: "Застройщик «Мегаполис»",
    type: "Жилой комплекс",
    status: "В работе",
    statusTag: "green",
    progress: 72,
    budget: 4200000,
    spent: 3024000,
    items: 147,
    rooms: 8,
    deadline: "15 авг 2025",
    team: ["АИ", "МС", "ДК"],
  },
  {
    id: 2,
    name: "Офис Газпром нефть",
    client: "Газпром нефть, корп.",
    type: "Коммерческий",
    status: "Комплектация",
    statusTag: "orange",
    progress: 45,
    budget: 12800000,
    spent: 5760000,
    items: 312,
    rooms: 24,
    deadline: "30 сен 2025",
    team: ["АИ", "НВ"],
  },
  {
    id: 3,
    name: "Вилла Рублёво-44",
    client: "Частный клиент",
    type: "Частный дом",
    status: "Согласование",
    statusTag: "yellow",
    progress: 28,
    budget: 7100000,
    spent: 1988000,
    items: 89,
    rooms: 12,
    deadline: "1 дек 2025",
    team: ["АИ"],
  },
  {
    id: 4,
    name: "Ресторан Morozko",
    client: "ООО «Гастро Групп»",
    type: "Общепит",
    status: "Новый",
    statusTag: "blue",
    progress: 8,
    budget: 1900000,
    spent: 152000,
    items: 34,
    rooms: 5,
    deadline: "15 янв 2026",
    team: ["АИ", "ДК"],
  },
];

const rooms = [
  { name: "Мастер-спальня", items: 24, status: "Готово", pct: 100 },
  { name: "Ванная 1 этаж", items: 18, status: "В работе", pct: 60 },
  { name: "Гостиная", items: 41, status: "Подбор", pct: 35 },
  { name: "Кухня", items: 28, status: "Согласование", pct: 20 },
  { name: "Ванная 2 этаж", items: 12, status: "Не начато", pct: 0 },
];

export default function Projects() {
  const [selected, setSelected] = useState<number | null>(null);
  const [tab, setTab] = useState("rooms");

  const activeProject = projects.find((p) => p.id === selected);

  return (
    <div className="flex h-full">
      {/* Project list */}
      <div
        className="w-full md:w-80 flex-shrink-0 border-r overflow-y-auto"
        style={{
          borderColor: "var(--border-color)",
          background: "var(--surface-2)",
          display: selected && window.innerWidth < 768 ? "none" : undefined,
        }}
      >
        <div className="p-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
              Проекты
            </h2>
            <button className="btn-orange text-xs" style={{ padding: "5px 12px" }}>
              <Icon name="Plus" size={12} />
              Новый
            </button>
          </div>
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
          >
            <Icon name="Search" size={13} style={{ color: "var(--text-muted)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Поиск проектов...
            </span>
          </div>
        </div>

        <div className="p-2 space-y-1">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelected(p.id)}
              className="rounded-xl p-4 cursor-pointer transition-all"
              style={{
                background: selected === p.id ? "var(--surface-4)" : "transparent",
                border: `1px solid ${selected === p.id ? "var(--border-bright)" : "transparent"}`,
              }}
              onMouseEnter={(e) => {
                if (selected !== p.id) e.currentTarget.style.background = "var(--surface-3)";
              }}
              onMouseLeave={(e) => {
                if (selected !== p.id) e.currentTarget.style.background = "transparent";
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold truncate pr-2" style={{ color: "var(--text-primary)" }}>
                  {p.name}
                </div>
                <span className={`tag tag-${p.statusTag} flex-shrink-0`} style={{ fontSize: 10 }}>
                  {p.status}
                </span>
              </div>
              <div className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                {p.client}
              </div>
              <div className="progress-bar mb-1">
                <div className="progress-fill" style={{ width: `${p.progress}%` }} />
              </div>
              <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                <span>{p.progress}%</span>
                <span className="font-mono">{(p.budget / 1000000).toFixed(1)} млн ₽</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project detail */}
      <div className="flex-1 overflow-y-auto">
        {!activeProject ? (
          <div className="flex flex-col items-center justify-center h-full" style={{ color: "var(--text-muted)" }}>
            <Icon name="FolderOpen" size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p className="text-sm">Выберите проект</p>
          </div>
        ) : (
          <div className="p-4 md:p-6 animate-fade-in">
            {/* Mobile back button */}
            <button
              className="md:hidden flex items-center gap-2 mb-4 text-sm"
              style={{ color: "var(--text-muted)" }}
              onClick={() => setSelected(null)}
            >
              <Icon name="ChevronLeft" size={16} />
              Все проекты
            </button>
            {/* Project header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {activeProject.name}
                  </h1>
                  <span className={`tag tag-${activeProject.statusTag}`}>{activeProject.status}</span>
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>{activeProject.client}</span>
                  <span>·</span>
                  <span>{activeProject.type}</span>
                  <span>·</span>
                  <span>Дедлайн: {activeProject.deadline}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="btn-ghost text-xs" onClick={() => toast.info("Ссылка скопирована")}>
                  <Icon name="Share2" size={13} />
                  <span className="hidden md:inline">Поделиться</span>
                </button>
                <button className="btn-orange text-xs" onClick={() => toast.success("Переход к оформлению заказа")}>
                  <Icon name="ShoppingCart" size={13} />
                  Заказать
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Бюджет", val: `${(activeProject.budget / 1000000).toFixed(1)} млн ₽`, icon: "Wallet", color: "#FF7A00" },
                { label: "Потрачено", val: `${(activeProject.spent / 1000000).toFixed(1)} млн ₽`, icon: "CreditCard", color: "#0A84FF" },
                { label: "Позиций", val: String(activeProject.items), icon: "Package", color: "#34C759" },
                { label: "Комнат", val: String(activeProject.rooms), icon: "LayoutDashboard", color: "#FFD60A" },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={s.icon} size={13} style={{ color: s.color }} />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</span>
                  </div>
                  <div className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div
              className="rounded-xl p-4 mb-6"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
            >
              <div className="flex justify-between text-xs mb-2">
                <span style={{ color: "var(--text-secondary)" }}>Общий прогресс</span>
                <span className="font-mono" style={{ color: "var(--orange)" }}>{activeProject.progress}%</span>
              </div>
              <div className="progress-bar" style={{ height: 6 }}>
                <div className="progress-fill" style={{ width: `${activeProject.progress}%` }} />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-5 rounded-xl p-1" style={{ background: "var(--surface-3)", width: "fit-content" }}>
              {["rooms", "items", "orders", "docs"].map((t) => {
                const labels: Record<string, string> = { rooms: "Комнаты", items: "Позиции", orders: "Заказы", docs: "Документы" };
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: tab === t ? "var(--surface-5)" : "transparent",
                      color: tab === t ? "var(--text-primary)" : "var(--text-muted)",
                    }}
                  >
                    {labels[t]}
                  </button>
                );
              })}
            </div>

            {/* Rooms tab */}
            {tab === "rooms" && (
              <div className="space-y-2">
                {rooms.map((r, i) => (
                  <div
                    key={i}
                    className="card-premium flex items-center gap-4"
                    style={{ padding: "14px 18px" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--surface-5)", color: "var(--text-muted)" }}
                    >
                      <Icon name="Home" size={15} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{r.name}</span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{r.items} позиций</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div
                        className="text-xs font-semibold"
                        style={{
                          color: r.pct === 100 ? "#34C759" : r.pct > 50 ? "var(--orange)" : "var(--text-muted)",
                        }}
                      >
                        {r.status}
                      </div>
                      <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{r.pct}%</div>
                    </div>
                  </div>
                ))}
                <button
                  className="w-full py-3 rounded-xl text-xs transition-all"
                  style={{ border: "1px dashed var(--border-bright)", color: "var(--text-muted)" }}
                >
                  + Добавить комнату
                </button>
              </div>
            )}

            {tab === "items" && (
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: "var(--surface-3)", borderBottom: "1px solid var(--border-color)" }}>
                      {["Наименование", "Поставщик", "Кол-во", "Цена", "Статус"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: "var(--text-muted)" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Унитаз Villeroy & Boch", "ТД Аквасфера", "2 шт", "₽ 85 600", "Заказан"],
                      ["Плитка Emil Ceramica 60×60", "Cerama Nova", "48 м²", "₽ 184 320", "В наличии"],
                      ["Смеситель Grohe Grohtherm", "Grohe Official", "3 шт", "₽ 85 800", "Доставлен"],
                      ["Светильник Artemide Pirce", "LightPro", "6 шт", "₽ 1 122 000", "Под заказ"],
                      ["Ванна Jacob Delafon", "ТД Аквасфера", "1 шт", "₽ 67 400", "Согласование"],
                    ].map((row, i) => (
                      <tr
                        key={i}
                        style={{ borderBottom: "1px solid var(--border-color)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3" style={{ color: j === 0 ? "var(--text-primary)" : "var(--text-secondary)" }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "orders" && (
              <div className="space-y-3">
                {[
                  { n: "ТД Аквасфера", items: 3, amt: "₽ 153 000", status: "Доставлен", color: "#34C759" },
                  { n: "Cerama Nova", items: 1, amt: "₽ 184 320", status: "В пути", color: "#0A84FF" },
                  { n: "LightPro", items: 6, amt: "₽ 1 122 000", status: "Ожидание", color: "#6B6B6B" },
                ].map((o, i) => (
                  <div key={i} className="card-premium flex items-center gap-4" style={{ padding: "16px 20px" }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: o.color }} />
                    <div className="flex-1">
                      <div className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{o.n}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{o.items} позиций</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm" style={{ color: "var(--text-primary)" }}>{o.amt}</div>
                      <div className="text-xs" style={{ color: o.color }}>{o.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "docs" && (
              <div className="space-y-2">
                {["Смета 2025.pdf", "Дизайн-проект v3.pdf", "Договор поставки.docx", "Фото до ремонта.zip"].map((d, i) => (
                  <div
                    key={i}
                    className="card-premium flex items-center gap-3 cursor-pointer"
                    style={{ padding: "12px 16px" }}
                  >
                    <Icon name="FileText" size={16} style={{ color: "var(--orange)" }} />
                    <span className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>{d}</span>
                    <Icon name="Download" size={14} style={{ color: "var(--text-muted)" }} />
                  </div>
                ))}
                <button
                  className="w-full py-3 rounded-xl text-xs transition-all"
                  style={{ border: "1px dashed var(--border-bright)", color: "var(--text-muted)" }}
                >
                  + Загрузить документ
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}