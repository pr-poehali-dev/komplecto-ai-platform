import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  user?: { name: string; email: string; role: string; verified: boolean };
}

const sections = [
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "account", label: "Аккаунт", icon: "Settings" },
  { id: "notifications", label: "Уведомления", icon: "Bell" },
  { id: "komi", label: "KOMI AI", icon: "Sparkles" },
  { id: "billing", label: "Биллинг", icon: "CreditCard" },
  { id: "team", label: "Команда", icon: "Users" },
];

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className="w-10 h-6 rounded-full transition-all flex-shrink-0 relative"
    style={{ background: checked ? "var(--orange)" : "var(--surface-5)" }}
  >
    <div
      className="absolute top-1 w-4 h-4 rounded-full transition-all"
      style={{ background: "#fff", left: checked ? "calc(100% - 20px)" : "4px" }}
    />
  </button>
);

export default function Settings({ user }: Props) {
  const [activeSection, setActiveSection] = useState("profile");
  const [notifs, setNotifs] = useState({ orders: true, komi: true, suppliers: false, news: false });
  const [komiSettings, setKomiSettings] = useState({ autoSuggest: true, budgetAlert: true, analogs: true, reports: false });

  return (
    <div className="flex h-full">
      {/* Left nav */}
      <aside className="w-56 flex-shrink-0 border-r p-4" style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}>
        <div className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Настройки</div>
        <nav className="space-y-0.5">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`sidebar-link w-full text-left ${activeSection === s.id ? "active" : ""}`}
            >
              <Icon name={s.icon} size={14} />
              <span className="text-xs">{s.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeSection === "profile" && (
          <div className="max-w-xl animate-fade-in">
            <h2 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>Профиль</h2>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
                style={{ background: "var(--orange)", color: "#000" }}>АИ</div>
              <div>
                <div className="font-semibold" style={{ color: "var(--text-primary)" }}>Алексей Иванов</div>
                <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>Professional · Москва</div>
                <button className="btn-ghost text-xs">Изменить фото</button>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Имя", val: "Алексей" },
                { label: "Фамилия", val: "Иванов" },
                { label: "Email", val: "a.ivanov@studio.ru" },
                { label: "Телефон", val: "+7 (903) 123-45-67" },
                { label: "Компания", val: "Design Studio AI" },
                { label: "Роль", val: "Дизайнер интерьера" },
              ].map((f, i) => (
                <div key={i}>
                  <label className="text-xs mb-1.5 block" style={{ color: "var(--text-muted)" }}>{f.label}</label>
                  <input
                    defaultValue={f.val}
                    className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all"
                    style={{
                      background: "var(--surface-3)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--orange)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
                  />
                </div>
              ))}
              <button className="btn-orange text-sm mt-2">Сохранить изменения</button>
            </div>
          </div>
        )}

        {activeSection === "notifications" && (
          <div className="max-w-xl animate-fade-in">
            <h2 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>Уведомления</h2>
            <div className="space-y-3">
              {[
                { key: "orders" as const, label: "Статусы заказов", desc: "Изменения статусов, доставка, оплата" },
                { key: "komi" as const, label: "Рекомендации KOMI", desc: "Аналоги, экономия, предложения" },
                { key: "suppliers" as const, label: "Сообщения поставщиков", desc: "Новые сообщения в чатах" },
                { key: "news" as const, label: "Новости платформы", desc: "Обновления, новые функции" },
              ].map((n) => (
                <div
                  key={n.key}
                  className="flex items-center justify-between rounded-xl px-4 py-4"
                  style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                >
                  <div>
                    <div className="text-sm font-medium mb-0.5" style={{ color: "var(--text-primary)" }}>{n.label}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{n.desc}</div>
                  </div>
                  <Toggle
                    checked={notifs[n.key]}
                    onChange={() => setNotifs((p) => ({ ...p, [n.key]: !p[n.key] }))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "komi" && (
          <div className="max-w-xl animate-fade-in">
            <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>KOMI AI</h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Настройте поведение вашего AI-ассистента</p>
            <div className="space-y-3">
              {[
                { key: "autoSuggest" as const, label: "Автоподсказки в каталоге", desc: "KOMI предлагает аналоги при просмотре товаров" },
                { key: "budgetAlert" as const, label: "Предупреждения о бюджете", desc: "Уведомлять при превышении плана" },
                { key: "analogs" as const, label: "Поиск аналогов", desc: "Автоматически искать более дешёвые варианты" },
                { key: "reports" as const, label: "Еженедельные отчёты", desc: "Сводка экономии и рекомендаций за неделю" },
              ].map((n) => (
                <div
                  key={n.key}
                  className="flex items-center justify-between rounded-xl px-4 py-4"
                  style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                >
                  <div>
                    <div className="text-sm font-medium mb-0.5" style={{ color: "var(--text-primary)" }}>{n.label}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{n.desc}</div>
                  </div>
                  <Toggle
                    checked={komiSettings[n.key]}
                    onChange={() => setKomiSettings((p) => ({ ...p, [n.key]: !p[n.key] }))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "billing" && (
          <div className="max-w-xl animate-fade-in">
            <h2 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>Биллинг</h2>
            <div
              className="rounded-xl p-5 mb-4"
              style={{ background: "linear-gradient(135deg, rgba(255,122,0,0.15), rgba(255,140,26,0.08))", border: "1px solid rgba(255,122,0,0.3)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold" style={{ color: "var(--text-primary)" }}>Professional Plan</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>Активен до 1 июля 2025</div>
                </div>
                <span className="tag tag-orange">Активен</span>
              </div>
              <div className="text-2xl font-black" style={{ color: "var(--orange)" }}>₽ 4 900 <span className="text-sm font-normal" style={{ color: "var(--text-muted)" }}>/мес</span></div>
            </div>
            <div className="space-y-2">
              {["Неограниченные проекты", "KOMI AI без лимитов", "Multi-supplier checkout", "KOMI Capital доступ", "Приоритетная поддержка"].map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(255,122,0,0.15)", color: "var(--orange)" }}>
                    <Icon name="Check" size={10} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeSection === "account" || activeSection === "team") && (
          <div className="flex flex-col items-center justify-center h-64 animate-fade-in" style={{ color: "var(--text-muted)" }}>
            <Icon name="Settings" size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p className="text-sm">Этот раздел в разработке</p>
          </div>
        )}
      </div>
    </div>
  );
}