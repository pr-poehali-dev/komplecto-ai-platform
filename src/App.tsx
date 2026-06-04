import { useState } from "react";
import Icon from "@/components/ui/icon";
import AuthPage from "@/pages/Auth";
import LandingPage from "@/pages/Landing";
import DashboardPage from "@/pages/Dashboard";
import CatalogPage from "@/pages/Catalog";
import ProjectsPage from "@/pages/Projects";
import KomiAIPage from "@/pages/KomiAI";
import KomiCapitalPage from "@/pages/KomiCapital";
import AnalyticsPage from "@/pages/Analytics";
import SuppliersPage from "@/pages/Suppliers";
import ChatPage from "@/pages/Chat";
import SettingsPage from "@/pages/Settings";

type Page =
  | "landing"
  | "auth"
  | "dashboard"
  | "catalog"
  | "projects"
  | "komi"
  | "capital"
  | "analytics"
  | "suppliers"
  | "chat"
  | "settings";

interface User {
  name: string;
  email: string;
  role: "professional" | "supplier";
  verified: boolean;
}

const navItems = [
  { id: "dashboard", label: "Обзор", icon: "LayoutDashboard" },
  { id: "projects", label: "Проекты", icon: "FolderOpen" },
  { id: "catalog", label: "Каталог", icon: "Grid3X3" },
  { id: "analytics", label: "Аналитика", icon: "BarChart2" },
  { id: "komi", label: "KOMI AI", icon: "Sparkles", highlight: true },
  { id: "capital", label: "KOMI Capital", icon: "Banknote" },
  { id: "suppliers", label: "Поставщики", icon: "Truck" },
  { id: "chat", label: "Чаты", icon: "MessageSquare", badge: 3 },
];

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [user, setUser] = useState<User | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleAuth = (u: User) => {
    setUser(u);
    setPage("dashboard");
  };

  if (page === "landing") {
    return <LandingPage onEnter={() => setPage("auth")} />;
  }

  if (page === "auth" || !user) {
    return <AuthPage onAuth={handleAuth} />;
  }

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--surface-1)" }}>
      {/* Verification banner */}
      {!user.verified && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 py-2.5 px-6"
          style={{ background: "rgba(255,122,0,0.12)", borderBottom: "1px solid rgba(255,122,0,0.25)" }}
        >
          <Icon name="Clock" size={14} style={{ color: "var(--orange)" }} />
          <span className="text-sm" style={{ color: "var(--orange)" }}>
            Аккаунт на верификации — полный доступ откроется после проверки документов (1–2 дня)
          </span>
          <button
            className="ml-2 text-xs px-3 py-1 rounded-full"
            style={{ background: "rgba(255,122,0,0.2)", color: "var(--orange)", border: "1px solid rgba(255,122,0,0.3)" }}
          >
            Загрузить документы
          </button>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className="flex flex-col h-full border-r flex-shrink-0 transition-all duration-300"
        style={{
          width: sidebarCollapsed ? 68 : 240,
          background: "var(--surface-2)",
          borderColor: "var(--border-color)",
          marginTop: !user.verified ? 40 : 0,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 border-b flex-shrink-0"
          style={{ borderColor: "var(--border-color)", height: 60 }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-black font-black text-sm"
            style={{ background: "var(--orange)" }}
          >
            К
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <span className="font-black tracking-tight text-base" style={{ color: "var(--text-primary)" }}>
                КОМПЛЕКТО
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-6 h-6 rounded-md flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity flex-shrink-0"
            style={{ color: "var(--text-secondary)" }}
          >
            <Icon name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} size={14} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = page === item.id;
            const isHighlight = item.highlight;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id as Page)}
                title={sidebarCollapsed ? item.label : undefined}
                className="w-full flex items-center gap-3 rounded-xl transition-all"
                style={{
                  padding: sidebarCollapsed ? "10px 12px" : "10px 14px",
                  justifyContent: sidebarCollapsed ? "center" : "flex-start",
                  background: isActive ? "var(--surface-4)" : "transparent",
                  borderLeft: isActive ? "2px solid var(--orange)" : "2px solid transparent",
                  color: isActive
                    ? "var(--text-primary)"
                    : isHighlight
                    ? "var(--orange)"
                    : "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "var(--surface-3)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon name={item.icon} size={18} className="flex-shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left font-medium" style={{ fontSize: 14 }}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className="text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                        style={{ background: "var(--orange)", color: "#000", fontSize: 10 }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mx-3 h-px" style={{ background: "var(--border-color)" }} />

        {/* Bottom */}
        <div className="py-4 px-3 space-y-1">
          <button
            onClick={() => setPage("settings")}
            className="w-full flex items-center gap-3 rounded-xl transition-all"
            style={{
              padding: sidebarCollapsed ? "10px 12px" : "10px 14px",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
              background: page === "settings" ? "var(--surface-4)" : "transparent",
              color: page === "settings" ? "var(--text-primary)" : "var(--text-muted)",
            }}
            onMouseEnter={(e) => {
              if (page !== "settings") e.currentTarget.style.background = "var(--surface-3)";
            }}
            onMouseLeave={(e) => {
              if (page !== "settings") e.currentTarget.style.background = "transparent";
            }}
          >
            <Icon name="Settings" size={18} />
            {!sidebarCollapsed && <span className="font-medium" style={{ fontSize: 14 }}>Настройки</span>}
          </button>

          {/* User card */}
          <div
            className="flex items-center gap-3 rounded-xl cursor-pointer mt-2 transition-all"
            style={{
              padding: sidebarCollapsed ? "10px 12px" : "10px 14px",
              justifyContent: sidebarCollapsed ? "center" : "flex-start",
              borderTop: "1px solid var(--border-color)",
              paddingTop: 14,
              marginTop: 8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 relative"
              style={{ background: "var(--orange)", color: "#000" }}
            >
              {initials}
              {!user.verified && (
                <div
                  className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center"
                  style={{ background: "#FFD60A", border: "1.5px solid var(--surface-2)" }}
                >
                  <Icon name="Clock" size={7} style={{ color: "#000" }} />
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate" style={{ fontSize: 13, color: "var(--text-primary)" }}>
                  {user.name}
                </div>
                <div className="text-xs truncate flex items-center gap-1" style={{ color: user.verified ? "#34C759" : "#FFD60A" }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: user.verified ? "#34C759" : "#FFD60A" }} />
                  {user.verified ? (user.role === "supplier" ? "Поставщик" : "Professional") : "На верификации"}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{ marginTop: !user.verified ? 40 : 0 }}
      >
        {/* Topbar */}
        <header
          className="flex items-center gap-4 px-6 border-b flex-shrink-0"
          style={{
            height: 60,
            background: "var(--surface-2)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-3 flex-1 max-w-lg rounded-xl px-4 py-2.5 cursor-text transition-all"
            style={{
              background: "var(--surface-3)",
              border: "1px solid var(--border-color)",
            }}
          >
            <Icon name="Search" size={15} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <span style={{ color: "var(--text-muted)", fontSize: 14 }}>
              Поиск товаров, проектов, поставщиков...
            </span>
            <span
              className="ml-auto font-mono text-xs px-2 py-0.5 rounded-md flex-shrink-0"
              style={{ color: "var(--text-muted)", background: "var(--surface-5)" }}
            >
              ⌘K
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              className="flex items-center gap-2 rounded-xl px-4 py-2 transition-all text-sm font-medium"
              style={{
                background: "var(--surface-3)",
                border: "1px solid var(--border-color)",
                color: "var(--text-secondary)",
              }}
              onClick={() => setPage("komi")}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,122,0,0.4)";
                e.currentTarget.style.color = "var(--orange)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <Icon name="Sparkles" size={15} style={{ color: "var(--orange)" }} />
              Спросить KOMI
            </button>

            {/* Notif */}
            <div className="relative">
              <button
                className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: notifOpen ? "var(--surface-4)" : "var(--surface-3)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-secondary)",
                }}
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Icon name="Bell" size={17} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: "var(--orange)" }} />
              </button>

              {notifOpen && (
                <div
                  className="absolute top-12 right-0 w-88 rounded-2xl shadow-2xl z-50 overflow-hidden animate-scale-in"
                  style={{
                    background: "var(--surface-3)",
                    border: "1px solid var(--border-bright)",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                    width: 340,
                  }}
                >
                  <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
                    <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Уведомления</span>
                    <button className="text-xs" style={{ color: "var(--orange)" }}>Прочитать все</button>
                  </div>
                  {[
                    { icon: "Package", text: "Товар от ТД «Аквасфера» доставлен в проект «ЖК Северный берег»", time: "2 мин назад", color: "#34C759" },
                    { icon: "Sparkles", text: "KOMI нашёл аналог Villeroy & Boch — экономия 23 400 ₽", time: "15 мин назад", color: "var(--orange)" },
                    { icon: "MessageSquare", text: "Новое сообщение от поставщика Cerama Nova", time: "1 час назад", color: "#0A84FF" },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 px-5 py-4 cursor-pointer transition-all"
                      style={{ borderBottom: i < 2 ? "1px solid var(--border-color)" : undefined }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-4)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${n.color}20`, color: n.color }}
                      >
                        <Icon name={n.icon} size={14} />
                      </div>
                      <div>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{n.text}</p>
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {page === "dashboard" && <DashboardPage onNavigate={setPage} user={user} />}
          {page === "catalog" && <CatalogPage />}
          {page === "projects" && <ProjectsPage />}
          {page === "analytics" && <AnalyticsPage />}
          {page === "komi" && <KomiAIPage />}
          {page === "capital" && <KomiCapitalPage />}
          {page === "suppliers" && <SuppliersPage />}
          {page === "chat" && <ChatPage />}
          {page === "settings" && <SettingsPage user={user} />}
        </main>
      </div>
    </div>
  );
}
