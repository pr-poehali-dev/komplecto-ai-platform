import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Toaster, toast } from "sonner";
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
import AdminPage from "@/pages/Admin";

type Page =
  | "landing" | "auth" | "dashboard" | "catalog" | "projects"
  | "komi" | "capital" | "analytics" | "suppliers" | "chat"
  | "settings" | "admin";

interface User {
  name: string;
  email: string;
  role: "professional" | "supplier" | "admin";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  function useIsMobile() {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
      const check = () => setMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);
    return mobile;
  }

  const handleAuth = (u: User) => {
    setUser(u);
    setPage("dashboard");
    toast.success(`Добро пожаловать, ${u.name.split(" ")[0]}!`);
  };

  const navigate = (p: string) => {
    setPage(p as Page);
    setMobileMenuOpen(false);
  };

  if (page === "landing") return <LandingPage onEnter={() => setPage("auth")} />;
  if (page === "auth" || !user) return <AuthPage onAuth={handleAuth} />;

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const searchResults = searchQuery.length > 1 ? [
    { label: "Унитаз Villeroy & Boch", cat: "Каталог", page: "catalog" },
    { label: "Плитка Emil Ceramica", cat: "Каталог", page: "catalog" },
    { label: "ЖК Северный берег", cat: "Проекты", page: "projects" },
    { label: "ТД Аквасфера", cat: "Поставщики", page: "suppliers" },
    { label: "KOMI AI — спросить", cat: "AI", page: "komi" },
  ].filter(r => r.label.toLowerCase().includes(searchQuery.toLowerCase())) : [];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--surface-1)" }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "var(--surface-3)", border: "1px solid var(--border-bright)", color: "var(--text-primary)", fontFamily: "Golos Text, sans-serif" },
        }}
      />

      {/* Verification banner */}
      {!user.verified && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-3 py-2.5 px-4 flex-wrap"
          style={{ background: "rgba(255,122,0,0.12)", borderBottom: "1px solid rgba(255,122,0,0.25)" }}
        >
          <Icon name="Clock" size={14} style={{ color: "var(--orange)" }} />
          <span className="text-sm text-center" style={{ color: "var(--orange)" }}>
            Аккаунт на верификации — доступ откроется после проверки (1–2 дня)
          </span>
          <button
            className="text-xs px-3 py-1 rounded-full flex-shrink-0"
            style={{ background: "rgba(255,122,0,0.2)", color: "var(--orange)", border: "1px solid rgba(255,122,0,0.3)" }}
            onClick={() => toast.info("Откройте Настройки → загрузите документы")}
          >
            Загрузить документы
          </button>
        </div>
      )}

      {/* Mobile Overlay */}
      {mobileMenuOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR — desktop always visible, mobile drawer */}
      <aside
        className="flex flex-col h-full border-r flex-shrink-0 transition-all duration-300 z-50"
        style={{
          width: isMobile ? 280 : (sidebarCollapsed ? 68 : 240),
          background: "var(--surface-2)",
          borderColor: "var(--border-color)",
          marginTop: !user.verified ? 40 : 0,
          position: isMobile ? "fixed" : "relative",
          left: isMobile ? (mobileMenuOpen ? 0 : -300) : 0,
          top: !user.verified ? 40 : 0,
          bottom: 0,
          transition: isMobile ? "left 0.3s ease" : "width 0.3s ease",
          boxShadow: isMobile && mobileMenuOpen ? "4px 0 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 border-b flex-shrink-0" style={{ borderColor: "var(--border-color)", height: 60 }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-black font-black text-sm" style={{ background: "var(--orange)" }}>К</div>
          {(!sidebarCollapsed || isMobile) && (
            <span className="font-black tracking-tight text-base flex-1" style={{ color: "var(--text-primary)" }}>КОМПЛЕКТО</span>
          )}
          {!isMobile && (
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-6 h-6 rounded-md flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity" style={{ color: "var(--text-secondary)" }}>
              <Icon name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} size={14} />
            </button>
          )}
          {isMobile && (
            <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: "var(--text-muted)" }}>
              <Icon name="X" size={18} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            const isActive = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                title={sidebarCollapsed && !isMobile ? item.label : undefined}
                className="w-full flex items-center gap-3 rounded-xl transition-all"
                style={{
                  padding: (sidebarCollapsed && !isMobile) ? "11px 14px" : "11px 14px",
                  justifyContent: (sidebarCollapsed && !isMobile) ? "center" : "flex-start",
                  background: isActive ? "var(--surface-4)" : "transparent",
                  borderLeft: isActive ? "2px solid var(--orange)" : "2px solid transparent",
                  color: isActive ? "var(--text-primary)" : item.highlight ? "var(--orange)" : "var(--text-muted)",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--surface-3)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon name={item.icon} size={18} className="flex-shrink-0" />
                {(!sidebarCollapsed || isMobile) && (
                  <>
                    <span className="flex-1 text-left font-medium text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: "var(--orange)", color: "#000" }}>{item.badge}</span>
                    )}
                  </>
                )}
              </button>
            );
          })}

          {/* Admin link */}
          {user.role === "admin" && (
            <button
              onClick={() => navigate("admin")}
              className="w-full flex items-center gap-3 rounded-xl transition-all mt-2"
              style={{
                padding: "11px 14px",
                background: page === "admin" ? "rgba(255,59,48,0.15)" : "transparent",
                borderLeft: page === "admin" ? "2px solid #FF3B30" : "2px solid transparent",
                color: "#FF3B30",
              }}
              onMouseEnter={(e) => { if (page !== "admin") e.currentTarget.style.background = "rgba(255,59,48,0.08)"; }}
              onMouseLeave={(e) => { if (page !== "admin") e.currentTarget.style.background = "transparent"; }}
            >
              <Icon name="ShieldCheck" size={18} className="flex-shrink-0" />
              {(!sidebarCollapsed || isMobile) && <span className="flex-1 text-left font-medium text-sm">Админ-панель</span>}
            </button>
          )}
        </nav>

        <div className="mx-3 h-px" style={{ background: "var(--border-color)" }} />

        {/* Bottom */}
        <div className="py-3 px-2 space-y-0.5">
          <button
            onClick={() => navigate("settings")}
            className="w-full flex items-center gap-3 rounded-xl transition-all"
            style={{
              padding: "11px 14px",
              justifyContent: (sidebarCollapsed && !isMobile) ? "center" : "flex-start",
              background: page === "settings" ? "var(--surface-4)" : "transparent",
              color: page === "settings" ? "var(--text-primary)" : "var(--text-muted)",
            }}
            onMouseEnter={(e) => { if (page !== "settings") e.currentTarget.style.background = "var(--surface-3)"; }}
            onMouseLeave={(e) => { if (page !== "settings") e.currentTarget.style.background = "transparent"; }}
          >
            <Icon name="Settings" size={18} />
            {(!sidebarCollapsed || isMobile) && <span className="font-medium text-sm">Настройки</span>}
          </button>

          {/* User card */}
          <div
            className="flex items-center gap-3 rounded-xl cursor-pointer transition-all"
            style={{ padding: "11px 14px", borderTop: "1px solid var(--border-color)", paddingTop: 14, marginTop: 8,
              justifyContent: (sidebarCollapsed && !isMobile) ? "center" : "flex-start" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() => { navigate("settings"); toast.info("Откройте настройки профиля"); }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 relative" style={{ background: "var(--orange)", color: "#000" }}>
              {initials}
              {!user.verified && (
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center" style={{ background: "#FFD60A", border: "1.5px solid var(--surface-2)" }}>
                  <Icon name="Clock" size={6} style={{ color: "#000" }} />
                </div>
              )}
            </div>
            {(!sidebarCollapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate text-sm" style={{ color: "var(--text-primary)" }}>{user.name}</div>
                <div className="text-xs flex items-center gap-1" style={{ color: user.verified ? "#34C759" : "#FFD60A" }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: user.verified ? "#34C759" : "#FFD60A" }} />
                  {user.verified ? (user.role === "admin" ? "Администратор" : user.role === "supplier" ? "Поставщик" : "Professional") : "На верификации"}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ marginTop: !user.verified ? 40 : 0 }}>
        {/* Topbar */}
        <header className="flex items-center gap-3 px-4 md:px-6 border-b flex-shrink-0" style={{ height: 60, background: "var(--surface-2)", borderColor: "var(--border-color)" }}>
          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
            >
              <Icon name="Menu" size={18} />
            </button>
          )}

          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 cursor-text transition-all"
              style={{ background: "var(--surface-3)", border: `1px solid ${searchOpen ? "rgba(255,122,0,0.4)" : "var(--border-color)"}` }}
              onClick={() => setSearchOpen(true)}
            >
              <Icon name="Search" size={15} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              {searchOpen ? (
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => { setTimeout(() => { setSearchOpen(false); setSearchQuery(""); }, 200); }}
                  placeholder="Поиск товаров, проектов..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "var(--text-primary)" }}
                />
              ) : (
                <span className="text-sm flex-1" style={{ color: "var(--text-muted)" }}>
                  {isMobile ? "Поиск..." : "Поиск товаров, проектов, поставщиков..."}
                </span>
              )}
              {!isMobile && !searchOpen && (
                <span className="font-mono text-xs px-2 py-0.5 rounded-md flex-shrink-0" style={{ color: "var(--text-muted)", background: "var(--surface-5)" }}>⌘K</span>
              )}
            </div>

            {/* Search dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-12 left-0 right-0 rounded-xl shadow-2xl z-50 overflow-hidden animate-scale-in" style={{ background: "var(--surface-3)", border: "1px solid var(--border-bright)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
                {searchResults.map((r, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all"
                    style={{ borderBottom: i < searchResults.length - 1 ? "1px solid var(--border-color)" : undefined }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-4)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    onMouseDown={() => { navigate(r.page); setSearchQuery(""); setSearchOpen(false); }}
                  >
                    <Icon name="Search" size={13} style={{ color: "var(--text-muted)" }} />
                    <span className="flex-1 text-sm" style={{ color: "var(--text-primary)" }}>{r.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--surface-5)", color: "var(--text-muted)" }}>{r.cat}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* KOMI button — hidden on very small mobile */}
            {!isMobile && (
              <button
                className="flex items-center gap-2 rounded-xl px-4 py-2 transition-all text-sm font-medium"
                style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
                onClick={() => { navigate("komi"); toast("KOMI AI открыт"); }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,122,0,0.4)"; e.currentTarget.style.color = "var(--orange)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
              >
                <Icon name="Sparkles" size={15} style={{ color: "var(--orange)" }} />
                Спросить KOMI
              </button>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{ background: notifOpen ? "var(--surface-4)" : "var(--surface-3)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Icon name="Bell" size={17} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: "var(--orange)" }} />
              </button>

              {notifOpen && (
                <div
                  className="absolute top-12 right-0 rounded-2xl shadow-2xl z-50 overflow-hidden animate-scale-in"
                  style={{ background: "var(--surface-3)", border: "1px solid var(--border-bright)", boxShadow: "0 24px 80px rgba(0,0,0,0.6)", width: 320 }}
                >
                  <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
                    <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Уведомления</span>
                    <button className="text-xs" style={{ color: "var(--orange)" }} onClick={() => { setNotifOpen(false); toast.success("Все уведомления прочитаны"); }}>Прочитать все</button>
                  </div>
                  {[
                    { icon: "Package", text: "Товар от ТД «Аквасфера» доставлен", time: "2 мин", color: "#34C759", page: "catalog" },
                    { icon: "Sparkles", text: "KOMI нашёл аналог — экономия 23 400 ₽", time: "15 мин", color: "var(--orange)", page: "komi" },
                    { icon: "MessageSquare", text: "Новое сообщение от Cerama Nova", time: "1 час", color: "#0A84FF", page: "chat" },
                    { icon: "CreditCard", text: "Платёж по KOMI Capital подтверждён", time: "3 часа", color: "#34C759", page: "capital" },
                  ].map((n, i) => (
                    <button
                      key={i}
                      className="w-full flex items-start gap-3 px-5 py-3.5 text-left transition-all"
                      style={{ borderBottom: i < 3 ? "1px solid var(--border-color)" : undefined }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-4)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      onClick={() => { navigate(n.page); setNotifOpen(false); }}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${n.color}20`, color: n.color }}>
                        <Icon name={n.icon} size={14} />
                      </div>
                      <div>
                        <p className="text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>{n.text}</p>
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{n.time} назад</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {page === "dashboard" && <DashboardPage onNavigate={navigate} user={user} />}
          {page === "catalog" && <CatalogPage />}
          {page === "projects" && <ProjectsPage />}
          {page === "analytics" && <AnalyticsPage />}
          {page === "komi" && <KomiAIPage />}
          {page === "capital" && <KomiCapitalPage />}
          {page === "suppliers" && <SuppliersPage />}
          {page === "chat" && <ChatPage />}
          {page === "settings" && <SettingsPage user={user} />}
          {page === "admin" && <AdminPage onNavigate={navigate} />}
        </main>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <nav
            className="flex-shrink-0 flex items-center justify-around px-2 py-2 border-t"
            style={{ background: "var(--surface-2)", borderColor: "var(--border-color)", paddingBottom: "calc(8px + env(safe-area-inset-bottom))" }}
          >
            {[
              { id: "dashboard", icon: "LayoutDashboard", label: "Обзор" },
              { id: "catalog", icon: "Grid3X3", label: "Каталог" },
              { id: "komi", icon: "Sparkles", label: "KOMI" },
              { id: "chat", icon: "MessageSquare", label: "Чаты" },
              { id: "projects", icon: "FolderOpen", label: "Проекты" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all flex-1"
                style={{ color: page === item.id ? "var(--orange)" : "var(--text-muted)", background: page === item.id ? "rgba(255,122,0,0.1)" : "transparent" }}
              >
                <Icon name={item.icon} size={20} />
                <span style={{ fontSize: 10, fontWeight: page === item.id ? 600 : 400 }}>{item.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
