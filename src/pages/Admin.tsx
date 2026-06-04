import { useState } from "react";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface Props {
  onNavigate: (page: string) => void;
}

type AdminSection = "overview" | "users" | "suppliers" | "products" | "orders" | "verifications" | "finance" | "settings";

const adminSections: { id: AdminSection; label: string; icon: string }[] = [
  { id: "overview", label: "Обзор", icon: "LayoutDashboard" },
  { id: "users", label: "Пользователи", icon: "Users" },
  { id: "suppliers", label: "Поставщики", icon: "Truck" },
  { id: "products", label: "Товары", icon: "Package" },
  { id: "orders", label: "Заказы", icon: "ShoppingCart" },
  { id: "verifications", label: "Верификации", icon: "ShieldCheck" },
  { id: "finance", label: "Финансы", icon: "Banknote" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

const mockUsers = [
  { id: 1, name: "Алексей Иванов", email: "a.ivanov@studio.ru", role: "professional", verified: true, joined: "12.03.2025", projects: 8, spent: "₽ 2.4М" },
  { id: 2, name: "Марина Соколова", email: "m.sokolova@design.ru", role: "professional", verified: true, joined: "20.01.2025", projects: 14, spent: "₽ 8.7М" },
  { id: 3, name: "ООО ДизайнПро", email: "info@designpro.ru", role: "supplier", verified: false, joined: "05.06.2025", projects: 0, spent: "₽ 0" },
  { id: 4, name: "Дмитрий Козлов", email: "d.kozlov@arch.ru", role: "professional", verified: true, joined: "14.02.2025", projects: 3, spent: "₽ 640К" },
  { id: 5, name: "ТД СтройМакс", email: "sales@stroymax.ru", role: "supplier", verified: true, joined: "01.11.2024", projects: 0, spent: "₽ 0" },
  { id: 6, name: "Наталья Петрова", email: "n.petrova@interio.ru", role: "professional", verified: false, joined: "02.06.2025", projects: 0, spent: "₽ 0" },
];

const mockVerifications = [
  { id: 1, name: "ООО ДизайнПро", email: "info@designpro.ru", role: "supplier", submitted: "03.06.2025", docs: ["Свидетельство ОГРН", "Прайс-лист"], status: "pending" },
  { id: 2, name: "Наталья Петрова", email: "n.petrova@interio.ru", role: "professional", submitted: "02.06.2025", docs: ["Паспорт", "Диплом дизайнера"], status: "pending" },
  { id: 3, name: "КерамикаОпт", email: "b2b@keramika.ru", role: "supplier", submitted: "01.06.2025", docs: ["Устав ООО", "Прайс-лист"], status: "reviewing" },
];

const mockOrders = [
  { id: "ORD-2841", buyer: "А. Иванов", supplier: "ТД Аквасфера", items: 14, amount: "₽ 284 000", status: "Доставлен", date: "01.06.2025", statusColor: "#34C759" },
  { id: "ORD-2840", buyer: "М. Соколова", supplier: "Cerama Nova", items: 6, amount: "₽ 97 500", status: "В пути", date: "30.05.2025", statusColor: "#0A84FF" },
  { id: "ORD-2839", buyer: "Д. Козлов", supplier: "Electro Pro", items: 22, amount: "₽ 156 000", status: "Сборка", date: "29.05.2025", statusColor: "#FFD60A" },
  { id: "ORD-2838", buyer: "А. Иванов", supplier: "Sviet Design", items: 8, amount: "₽ 412 000", status: "Ожидание", date: "28.05.2025", statusColor: "#6B6B6B" },
  { id: "ORD-2837", buyer: "М. Соколова", supplier: "Grohe Official", items: 3, amount: "₽ 85 800", status: "Отменён", date: "27.05.2025", statusColor: "#FF3B30" },
];

const mockProducts = [
  { id: 1, name: "Унитаз Villeroy & Boch Subway 2.0", category: "Сантехника", price: "₽ 42 800", stock: 48, supplier: "ТД Аквасфера", status: "active" },
  { id: 2, name: "Emil Ceramica Tele di Marmo 60×60", category: "Плитка", price: "₽ 3 840/м²", stock: 1200, supplier: "Cerama Nova", status: "active" },
  { id: 3, name: "Grohe Grohtherm 3000", category: "Сантехника", price: "₽ 28 600", stock: 23, supplier: "Grohe Official", status: "active" },
  { id: 4, name: "Artemide Pirce L", category: "Освещение", price: "₽ 187 000", stock: 4, supplier: "Sviet Design", status: "low_stock" },
  { id: 5, name: "Jacob Delafon Escal 170×75", category: "Сантехника", price: "₽ 67 400", stock: 0, supplier: "ТД Аквасфера", status: "out_of_stock" },
  { id: 6, name: "Leicht Carre Pure Matt", category: "Кухни", price: "от ₽ 480 000", stock: 2, supplier: "КухниПроф", status: "active" },
];

const kpiData = [
  { label: "Пользователей", value: "1 247", delta: "+34 сегодня", icon: "Users", color: "#0A84FF" },
  { label: "Поставщиков", value: "2 418", delta: "+12 за неделю", icon: "Truck", color: "#FF7A00" },
  { label: "Товаров в каталоге", value: "340 218", delta: "+482 сегодня", icon: "Package", color: "#34C759" },
  { label: "Оборот месяца", value: "₽ 84.2М", delta: "+18% к плану", icon: "TrendingUp", color: "#34C759" },
  { label: "Активных заказов", value: "847", delta: "+23 за час", icon: "ShoppingCart", color: "#FFD60A" },
  { label: "На верификации", value: "3", delta: "Ожидают проверки", icon: "ShieldCheck", color: "#FF3B30" },
];

export default function Admin({ onNavigate }: Props) {
  const [section, setSection] = useState<AdminSection>("overview");
  const [userSearch, setUserSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [verif, setVerif] = useState(mockVerifications);
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleVerify = (id: number, approved: boolean) => {
    setVerif((prev) => prev.filter((v) => v.id !== id));
    if (approved) {
      toast.success("Аккаунт верифицирован и активирован");
    } else {
      toast.error("Верификация отклонена, уведомление отправлено");
    }
  };

  const handleUserAction = (id: number, action: string) => {
    if (action === "block") {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.error("Пользователь заблокирован");
    } else if (action === "promote") {
      toast.success("Пользователь повышен до администратора");
    }
  };

  const TagStatus = ({ status }: { status: string }) => {
    const map: Record<string, { label: string; cls: string }> = {
      active: { label: "Активен", cls: "tag-green" },
      low_stock: { label: "Мало", cls: "tag-yellow" },
      out_of_stock: { label: "Нет", cls: "tag-red" },
      pending: { label: "Ожидание", cls: "tag-yellow" },
      reviewing: { label: "На проверке", cls: "tag-blue" },
      approved: { label: "Одобрен", cls: "tag-green" },
    };
    const s = map[status] || { label: status, cls: "tag-orange" };
    return <span className={`tag ${s.cls}`}>{s.label}</span>;
  };

  return (
    <div className="flex h-full">
      {/* Admin sidebar */}
      <aside className="w-56 flex-shrink-0 border-r flex flex-col" style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}>
        <div className="p-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,59,48,0.15)", color: "#FF3B30" }}>
              <Icon name="ShieldCheck" size={15} />
            </div>
            <span className="font-black text-sm" style={{ color: "var(--text-primary)" }}>Админ-панель</span>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Управление платформой</p>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {adminSections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all text-left"
              style={{
                background: section === s.id ? "rgba(255,59,48,0.12)" : "transparent",
                borderLeft: section === s.id ? "2px solid #FF3B30" : "2px solid transparent",
                color: section === s.id ? "var(--text-primary)" : "var(--text-muted)",
              }}
              onMouseEnter={(e) => { if (section !== s.id) e.currentTarget.style.background = "var(--surface-3)"; }}
              onMouseLeave={(e) => { if (section !== s.id) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon name={s.icon} size={16} style={{ color: section === s.id ? "#FF3B30" : "var(--text-muted)" }} />
              <span className="text-sm font-medium">{s.label}</span>
              {s.id === "verifications" && verif.length > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#FF3B30", color: "#fff" }}>{verif.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t" style={{ borderColor: "var(--border-color)" }}>
          <button
            onClick={() => onNavigate("dashboard")}
            className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Icon name="ArrowLeft" size={15} />
            Вернуться в платформу
          </button>
        </div>
      </aside>

      {/* Admin content */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* === OVERVIEW === */}
        {section === "overview" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Обзор платформы</h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Данные обновлены только что</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {kpiData.map((k, i) => (
                <div key={i} className="stat-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${k.color}18`, color: k.color }}>
                      <Icon name={k.icon} size={17} />
                    </div>
                    {i === 5 && verif.length > 0 && (
                      <button onClick={() => setSection("verifications")} className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(255,59,48,0.1)", color: "#FF3B30" }}>
                        Проверить →
                      </button>
                    )}
                  </div>
                  <div className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>{k.value}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{k.label}</div>
                  <div className="text-xs mt-1" style={{ color: k.color }}>{k.delta}</div>
                </div>
              ))}
            </div>

            {/* Revenue chart */}
            <div className="rounded-2xl p-5 mb-4" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-bold" style={{ color: "var(--text-primary)" }}>Оборот платформы</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>за последние 12 месяцев</div>
                </div>
                <span className="tag tag-green">+34% г/г</span>
              </div>
              <div className="flex items-end gap-2 h-28">
                {[22, 31, 27, 42, 38, 55, 48, 67, 59, 74, 82, 100].map((v, i) => (
                  <div key={i} className="flex-1 rounded-t-sm transition-all cursor-pointer"
                    style={{ height: `${v}%`, background: i === 11 ? "var(--orange)" : i >= 9 ? "rgba(255,122,0,0.4)" : "var(--surface-5)", minHeight: 4 }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  />
                ))}
              </div>
              <div className="flex mt-2">
                {["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"].map((m, i) => (
                  <span key={i} className="flex-1 text-center" style={{ fontSize: 10, color: "var(--text-muted)" }}>{m}</span>
                ))}
              </div>
            </div>

            {/* Recent orders */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
              <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border-color)", background: "var(--surface-3)" }}>
                <span className="font-bold" style={{ color: "var(--text-primary)" }}>Последние заказы</span>
                <button onClick={() => setSection("orders")} className="text-sm" style={{ color: "var(--orange)" }}>Все заказы →</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "var(--surface-3)", borderBottom: "1px solid var(--border-color)" }}>
                    {["ID", "Покупатель", "Поставщик", "Сумма", "Статус"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((o, i) => (
                    <tr key={i} style={{ borderBottom: i < mockOrders.length - 1 ? "1px solid var(--border-color)" : undefined }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-5 py-3 font-mono text-sm" style={{ color: "var(--text-muted)" }}>{o.id}</td>
                      <td className="px-5 py-3 text-sm" style={{ color: "var(--text-primary)" }}>{o.buyer}</td>
                      <td className="px-5 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>{o.supplier}</td>
                      <td className="px-5 py-3 font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{o.amount}</td>
                      <td className="px-5 py-3"><span className="text-sm font-medium" style={{ color: o.statusColor }}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === USERS === */}
        {section === "users" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Пользователи</h1>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{users.length} аккаунтов</p>
              </div>
              <button className="btn-orange" onClick={() => toast.info("Форма приглашения откроется")}>
                <Icon name="UserPlus" size={15} />
                Пригласить
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4 rounded-xl px-4 py-2.5" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <Icon name="Search" size={15} style={{ color: "var(--text-muted)" }} />
              <input
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Поиск по имени или email..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--text-primary)" }}
              />
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "var(--surface-3)", borderBottom: "1px solid var(--border-color)" }}>
                    {["Пользователь", "Роль", "Статус", "Проектов", "Оборот", "Зарегистрирован", "Действия"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} style={{ borderBottom: "1px solid var(--border-color)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "var(--orange)", color: "#000" }}>
                            {u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{u.name}</div>
                            <div className="text-xs" style={{ color: "var(--text-muted)" }}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`tag ${u.role === "supplier" ? "tag-blue" : "tag-orange"}`}>
                          {u.role === "supplier" ? "Поставщик" : "Профессионал"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`tag ${u.verified ? "tag-green" : "tag-yellow"}`}>
                          {u.verified ? "Верифицирован" : "Ожидание"}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm" style={{ color: "var(--text-secondary)" }}>{u.projects}</td>
                      <td className="px-4 py-3 font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{u.spent}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--text-muted)" }}>{u.joined}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-1 rounded-lg text-xs transition-all"
                            style={{ background: "var(--surface-4)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}
                            onClick={() => { toast.info(`Профиль ${u.name} открыт`); }}
                          >
                            Открыть
                          </button>
                          <button
                            className="px-3 py-1 rounded-lg text-xs transition-all"
                            style={{ background: "rgba(255,59,48,0.1)", color: "#FF3B30", border: "1px solid rgba(255,59,48,0.2)" }}
                            onClick={() => handleUserAction(u.id, "block")}
                          >
                            Блок
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === VERIFICATIONS === */}
        {section === "verifications" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Верификации</h1>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{verif.length} заявок ожидают проверки</p>
              </div>
            </div>

            {verif.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 rounded-2xl" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
                <Icon name="CheckCircle" size={48} style={{ color: "#34C759", marginBottom: 16, opacity: 0.6 }} />
                <p className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>Все заявки обработаны</p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Нет ожидающих верификаций</p>
              </div>
            ) : (
              <div className="space-y-4">
                {verif.map((v) => (
                  <div key={v.id} className="rounded-2xl p-5" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black" style={{ background: v.role === "supplier" ? "rgba(10,132,255,0.12)" : "rgba(255,122,0,0.12)", color: v.role === "supplier" ? "#0A84FF" : "var(--orange)" }}>
                          {v.name[0]}
                        </div>
                        <div>
                          <div className="font-bold" style={{ color: "var(--text-primary)" }}>{v.name}</div>
                          <div className="text-sm" style={{ color: "var(--text-muted)" }}>{v.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`tag ${v.role === "supplier" ? "tag-blue" : "tag-orange"}`}>
                          {v.role === "supplier" ? "Поставщик" : "Профессионал"}
                        </span>
                        <TagStatus status={v.status} />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Загруженные документы:</div>
                      <div className="flex gap-2 flex-wrap">
                        {v.docs.map((d, i) => (
                          <button
                            key={i}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all"
                            style={{ background: "var(--surface-4)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
                            onClick={() => toast.info(`Документ «${d}» открыт`)}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-bright)")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                          >
                            <Icon name="FileText" size={14} style={{ color: "var(--orange)" }} />
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>Подано: {v.submitted}</div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleVerify(v.id, false)}
                          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                          style={{ background: "rgba(255,59,48,0.12)", color: "#FF3B30", border: "1px solid rgba(255,59,48,0.2)" }}
                        >
                          <Icon name="X" size={14} />
                          Отклонить
                        </button>
                        <button
                          onClick={() => handleVerify(v.id, true)}
                          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all"
                          style={{ background: "rgba(52,199,89,0.12)", color: "#34C759", border: "1px solid rgba(52,199,89,0.2)" }}
                        >
                          <Icon name="Check" size={14} />
                          Одобрить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* === SUPPLIERS === */}
        {section === "suppliers" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Поставщики</h1>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>2 418 зарегистрированных</p>
              </div>
              <button className="btn-orange" onClick={() => toast.info("Форма добавления поставщика")}>
                <Icon name="Plus" size={15} /> Добавить
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "var(--surface-3)", borderBottom: "1px solid var(--border-color)" }}>
                    {["Компания", "Категория", "Рейтинг", "Товаров", "Заказов", "В срок", "Статус", "Действия"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "ТД Аквасфера", cat: "Сантехника", rating: 4.9, products: 4200, orders: 34, onTime: 97, verified: true },
                    { name: "Cerama Nova", cat: "Плитка", rating: 4.7, products: 18600, orders: 28, onTime: 94, verified: true },
                    { name: "Sviet Design", cat: "Освещение", rating: 5.0, products: 3400, orders: 15, onTime: 100, verified: true },
                    { name: "Electro Pro", cat: "Электрика", rating: 4.4, products: 9800, orders: 22, onTime: 89, verified: false },
                    { name: "МебельЭксперт", cat: "Мебель", rating: 4.3, products: 24000, orders: 11, onTime: 86, verified: false },
                    { name: "Grohe Official", cat: "Сантехника", rating: 4.6, products: 1200, orders: 19, onTime: 91, verified: true },
                  ].map((s, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border-color)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--text-primary)" }}>{s.name}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--text-muted)" }}>{s.cat}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={11} style={{ color: "#FFD60A" }} />
                          <span className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>{s.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm" style={{ color: "var(--text-secondary)" }}>{s.products.toLocaleString("ru")}</td>
                      <td className="px-4 py-3 font-mono text-sm" style={{ color: "var(--text-secondary)" }}>{s.orders}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono font-semibold" style={{ color: s.onTime >= 95 ? "#34C759" : s.onTime >= 90 ? "#FFD60A" : "#FF3B30" }}>{s.onTime}%</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`tag ${s.verified ? "tag-green" : "tag-yellow"}`}>{s.verified ? "Верифицирован" : "Ожидание"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs px-3 py-1.5 rounded-lg transition-all" style={{ background: "var(--surface-4)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}
                          onClick={() => toast.info(`Профиль ${s.name} открыт`)}>
                          Открыть
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === PRODUCTS === */}
        {section === "products" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Управление товарами</h1>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>340 218 товаров в каталоге</p>
              </div>
              <button className="btn-orange" onClick={() => toast.info("Форма добавления товара")}>
                <Icon name="Plus" size={15} /> Добавить товар
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4 rounded-xl px-4 py-2.5" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <Icon name="Search" size={15} style={{ color: "var(--text-muted)" }} />
              <input
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Поиск товаров..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--text-primary)" }}
              />
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "var(--surface-3)", borderBottom: "1px solid var(--border-color)" }}>
                    {["ID", "Товар", "Категория", "Цена", "Остаток", "Поставщик", "Статус", "Действия"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id} style={{ borderBottom: "1px solid var(--border-color)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>#{p.id}</td>
                      <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--text-primary)", maxWidth: 200 }}>{p.name}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--text-muted)" }}>{p.category}</td>
                      <td className="px-4 py-3 font-mono text-sm" style={{ color: "var(--text-primary)" }}>{p.price}</td>
                      <td className="px-4 py-3 font-mono text-sm" style={{ color: p.stock === 0 ? "#FF3B30" : p.stock < 10 ? "#FFD60A" : "#34C759" }}>{p.stock} шт</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>{p.supplier}</td>
                      <td className="px-4 py-3"><TagStatus status={p.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "var(--surface-4)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}
                            onClick={() => toast.info(`Редактирование ${p.name}`)}>
                            Ред.
                          </button>
                          <button className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,59,48,0.1)", color: "#FF3B30", border: "1px solid rgba(255,59,48,0.2)" }}
                            onClick={() => toast.error(`Товар удалён`)}>
                            Удал.
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === ORDERS === */}
        {section === "orders" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Все заказы</h1>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>847 активных заказов</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "var(--surface-3)", borderBottom: "1px solid var(--border-color)" }}>
                    {["ID заказа", "Покупатель", "Поставщик", "Позиций", "Сумма", "Дата", "Статус", "Действие"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((o, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border-color)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-4 py-3 font-mono text-sm" style={{ color: "var(--text-muted)" }}>{o.id}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--text-primary)" }}>{o.buyer}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>{o.supplier}</td>
                      <td className="px-4 py-3 font-mono text-sm" style={{ color: "var(--text-secondary)" }}>{o.items}</td>
                      <td className="px-4 py-3 font-mono text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{o.amount}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--text-muted)" }}>{o.date}</td>
                      <td className="px-4 py-3"><span className="text-sm font-semibold" style={{ color: o.statusColor }}>{o.status}</span></td>
                      <td className="px-4 py-3">
                        <button className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "var(--surface-4)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}
                          onClick={() => toast.info(`Заказ ${o.id} открыт`)}>
                          Детали
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === FINANCE === */}
        {section === "finance" && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Финансы платформы</h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>KOMI Capital · Комиссии · Выплаты</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Оборот за месяц", value: "₽ 84.2М", color: "#34C759" },
                { label: "Комиссия платформы (2.5%)", value: "₽ 2.1М", color: "var(--orange)" },
                { label: "KOMI Capital выдано", value: "₽ 18.5М", color: "#0A84FF" },
              ].map((f, i) => (
                <div key={i} className="stat-card">
                  <div className="text-2xl font-black mb-1" style={{ color: f.color }}>{f.value}</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>{f.label}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-5" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>Детальная финансовая аналитика в разработке</p>
            </div>
          </div>
        )}

        {/* === SETTINGS === */}
        {section === "settings" && (
          <div className="animate-fade-in max-w-xl">
            <div className="mb-6">
              <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Настройки платформы</h1>
            </div>
            <div className="space-y-3">
              {[
                { label: "Режим обслуживания", desc: "Временно закрыть доступ для пользователей", state: false },
                { label: "Автоверификация профессионалов", desc: "Верифицировать автоматически без документов", state: false },
                { label: "KOMI AI активен", desc: "Включить AI-ассистент для всех пользователей", state: true },
                { label: "KOMI Capital доступен", desc: "Включить финансовые продукты", state: true },
                { label: "Публичный каталог", desc: "Разрешить просмотр без регистрации", state: true },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl p-4" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{s.label}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.desc}</div>
                  </div>
                  <button
                    className="w-11 h-6 rounded-full relative transition-all flex-shrink-0"
                    style={{ background: s.state ? "var(--orange)" : "var(--surface-5)" }}
                    onClick={() => toast.success(`Настройка «${s.label}» изменена`)}
                  >
                    <div className="absolute top-1 w-4 h-4 rounded-full transition-all" style={{ background: "#fff", left: s.state ? "calc(100% - 20px)" : 4 }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
