import { useState } from "react";
import Icon from "@/components/ui/icon";
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
  | "dashboard"
  | "catalog"
  | "projects"
  | "komi"
  | "capital"
  | "analytics"
  | "suppliers"
  | "chat"
  | "settings";

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

const bottomNavItems = [
  { id: "settings", label: "Настройки", icon: "Settings" },
];

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  if (page === "landing") {
    return <LandingPage onEnter={() => setPage("dashboard")} />;
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--surface-1)" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col h-full border-r flex-shrink-0 transition-all duration-300"
        style={{
          width: sidebarCollapsed ? 60 : 220,
          background: "var(--surface-2)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 h-14 border-b flex-shrink-0"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-black font-bold text-xs"
            style={{ background: "var(--orange)" }}
          >
            К
          </div>
          {!sidebarCollapsed && (
            <span
              className="font-bold tracking-tight text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              КОМПЛЕКТО
            </span>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="ml-auto opacity-40 hover:opacity-100 transition-opacity"
            style={{ color: "var(--text-secondary)" }}
          >
            <Icon name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} size={14} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id as Page)}
              className={`sidebar-link w-full text-left ${page === item.id ? "active" : ""}`}
              style={item.highlight && page !== item.id ? { color: "var(--orange)" } : {}}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon name={item.icon} size={16} className="flex-shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full font-mono"
                      style={{ background: "var(--orange)", color: "#000", fontSize: 10 }}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        <div className="divider mx-2" />

        <div className="py-3 px-2 space-y-0.5">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id as Page)}
              className={`sidebar-link w-full text-left ${page === item.id ? "active" : ""}`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon name={item.icon} size={16} className="flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}

          <div
            className="flex items-center gap-2 px-3 py-2 mt-1 rounded-lg cursor-pointer"
            style={{ borderTop: "1px solid var(--border-color)", paddingTop: 12, marginTop: 8 }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: "var(--orange)", color: "#000" }}
            >
              АИ
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                  Алексей И.
                </div>
                <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                  Professional
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="h-14 flex items-center gap-4 px-6 border-b flex-shrink-0"
          style={{ background: "var(--surface-2)", borderColor: "var(--border-color)" }}
        >
          <div
            className="flex items-center gap-2 flex-1 max-w-md rounded-lg px-3 py-2"
            style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
          >
            <Icon name="Search" size={14} style={{ color: "var(--text-muted)" }} />
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              Поиск товаров, проектов...
            </span>
            <span
              className="ml-auto text-xs font-mono"
              style={{ color: "var(--text-muted)", background: "var(--surface-5)", padding: "1px 6px", borderRadius: 4 }}
            >
              ⌘K
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              className="btn-ghost text-xs"
              onClick={() => setPage("komi")}
              style={{ padding: "6px 12px" }}
            >
              <Icon name="Sparkles" size={13} style={{ color: "var(--orange)" }} />
              <span>Спросить KOMI</span>
            </button>

            <div className="relative">
              <button
                className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: notifOpen ? "var(--surface-4)" : "transparent",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-secondary)",
                }}
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Icon name="Bell" size={15} />
                <span
                  className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--orange)" }}
                />
              </button>
              {notifOpen && (
                <div
                  className="absolute top-10 right-0 w-80 rounded-xl shadow-2xl z-50 overflow-hidden animate-scale-in"
                  style={{
                    background: "var(--surface-3)",
                    border: "1px solid var(--border-bright)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border-color)" }}>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      Уведомления
                    </span>
                  </div>
                  {[
                    { icon: "Package", text: "Товар от ТД «Аквасфера» доставлен", time: "2 мин назад", color: "#34C759" },
                    { icon: "Sparkles", text: "KOMI нашёл аналог Villeroy & Boch −34%", time: "15 мин назад", color: "var(--orange)" },
                    { icon: "MessageSquare", text: "Новое сообщение от поставщика Cerama", time: "1 час назад", color: "#0A84FF" },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-all"
                      style={{ borderBottom: i < 2 ? "1px solid var(--border-color)" : undefined }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-4)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${n.color}20`, color: n.color }}
                      >
                        <Icon name={n.icon} size={13} />
                      </div>
                      <div>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {n.text}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                          {n.time}
                        </p>
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
          {page === "dashboard" && <DashboardPage onNavigate={setPage} />}
          {page === "catalog" && <CatalogPage />}
          {page === "projects" && <ProjectsPage />}
          {page === "analytics" && <AnalyticsPage />}
          {page === "komi" && <KomiAIPage />}
          {page === "capital" && <KomiCapitalPage />}
          {page === "suppliers" && <SuppliersPage />}
          {page === "chat" && <ChatPage />}
          {page === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
