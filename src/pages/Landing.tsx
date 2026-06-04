import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onEnter: () => void;
}

const stats = [
  { value: "2 400+", label: "Поставщиков" },
  { value: "340 000+", label: "Товаров в каталоге" },
  { value: "18%", label: "Средняя экономия" },
  { value: "4.9★", label: "Рейтинг платформы" },
];

const features = [
  {
    icon: "Sparkles",
    title: "KOMI AI",
    desc: "AI-ассистент подбирает товары, ищет аналоги и оптимизирует бюджет — в реальном времени.",
    tag: "AI-powered",
  },
  {
    icon: "ShoppingCart",
    title: "Multi-Supplier Checkout",
    desc: "Один заказ — несколько поставщиков. Автоматическое разделение, контроль сроков и статусов.",
    tag: "Уникально",
  },
  {
    icon: "BarChart2",
    title: "Аналитика",
    desc: "Дашборд эффективности по проектам, поставщикам, экономии и вознаграждениям.",
    tag: "Insights",
  },
  {
    icon: "Banknote",
    title: "KOMI Capital",
    desc: "Финансирование объектов, BNPL, факторинг поставщиков и тендерные гарантии.",
    tag: "Fintech",
  },
  {
    icon: "FolderOpen",
    title: "Управление проектами",
    desc: "Полный контроль объекта: комнаты, подборы, бюджеты, документы, статусы.",
    tag: "Workflow",
  },
  {
    icon: "Truck",
    title: "Экосистема поставщиков",
    desc: "2400+ верифицированных поставщиков. Рейтинги, сравнение цен и прямые переговоры.",
    tag: "Marketplace",
  },
];

const roles = [
  { icon: "Pencil", title: "Дизайнеры", desc: "Подбирайте материалы и мебель с AI за минуты" },
  { icon: "HardHat", title: "Строители", desc: "Управляйте закупками по всем объектам сразу" },
  { icon: "Building2", title: "Архитекторы", desc: "Спецификации, комплектация, статусы поставок" },
  { icon: "Boxes", title: "Поставщики", desc: "Прямой доступ к профессиональным закупщикам" },
];

export default function Landing({ onEnter }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "var(--surface-1)", color: "var(--text-primary)" }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 md:px-8 h-16"
        style={{
          background: "rgba(5,5,5,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs text-black"
            style={{ background: "var(--orange)" }}
          >
            К
          </div>
          <span className="font-bold tracking-tight text-sm" style={{ color: "var(--text-primary)" }}>
            КОМПЛЕКТО
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 mx-auto">
          {["Платформа", "Каталог", "Поставщикам", "Цены"].map((item) => (
            <span
              key={item}
              className="text-sm cursor-pointer transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <button className="btn-ghost text-xs" onClick={onEnter} style={{ padding: "7px 14px" }}>
            Войти
          </button>
          <button className="btn-orange text-xs" onClick={onEnter} style={{ padding: "7px 14px" }}>
            <span className="hidden md:inline">Попробовать бесплатно</span>
            <span className="md:hidden">Начать</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-8 text-center overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(255,122,0,0.08) 0%, transparent 70%)",
          }}
        />

        <div
          className={`relative z-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="tag tag-orange mb-6 mx-auto inline-flex">
            <Icon name="Sparkles" size={10} />
            AI Ecosystem · Construction & Procurement
          </div>

          <h1
            className="font-black leading-[1.05] mb-6 tracking-tight"
            style={{ fontSize: "clamp(42px, 6vw, 80px)", color: "var(--text-primary)" }}
          >
            Комплектация объектов{" "}
            <span className="text-gradient-orange">нового поколения</span>
          </h1>

          <p
            className="max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "var(--text-secondary)" }}
          >
            AI-платформа для дизайнеров, строителей и архитекторов. Один инструмент для подбора
            товаров, управления объектами, работы с поставщиками и финансирования.
          </p>

          <div className="flex items-center gap-4 justify-center flex-wrap">
            <button className="btn-orange" onClick={onEnter} style={{ padding: "12px 28px", fontSize: 15 }}>
              <Icon name="Zap" size={16} />
              Начать бесплатно
            </button>
            <button className="btn-ghost" onClick={onEnter} style={{ padding: "12px 24px", fontSize: 15 }}>
              <Icon name="Play" size={15} />
              Посмотреть демо
            </button>
          </div>

          <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            Без кредитной карты · 14 дней бесплатно · Отмена в любой момент
          </p>
        </div>

        {/* Preview mockup — hidden on small mobile */}
        <div
          className={`hidden sm:block relative z-10 mt-12 md:mt-16 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{
            border: "1px solid var(--border-bright)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(255,122,0,0.06)",
          }}
        >
          {/* Fake browser bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ background: "var(--surface-3)", borderColor: "var(--border-color)" }}
          >
            <div className="flex gap-1.5">
              {["#FF5F57", "#FFBD2E", "#28CA41"].map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div
              className="flex-1 max-w-xs mx-auto rounded px-3 py-1 text-xs text-center"
              style={{ background: "var(--surface-4)", color: "var(--text-muted)" }}
            >
              komplekto.ai/dashboard
            </div>
          </div>

          {/* Dashboard preview */}
          <div
            className="p-6"
            style={{ background: "var(--surface-2)", minHeight: 320 }}
          >
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: "Активных проектов", val: "12", icon: "FolderOpen", color: "#FF7A00" },
                { label: "Заказов в работе", val: "34", icon: "Package", color: "#0A84FF" },
                { label: "Бюджет (млн ₽)", val: "18.4", icon: "Wallet", color: "#34C759" },
                { label: "Экономия KOMI", val: "−12%", icon: "Sparkles", color: "#FF7A00" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="stat-card"
                  style={{ padding: "14px 16px" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={s.icon} size={14} style={{ color: s.color }} />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {s.label}
                    </span>
                  </div>
                  <div className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {s.val}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: "ЖК Северный берег", status: "В работе", progress: 72, budget: "4.2 млн" },
                { title: "Офис Газпром нефть", status: "Комплектация", progress: 45, budget: "12.8 млн" },
                { title: "Вилла Рублёво-44", status: "Согласование", progress: 28, budget: "7.1 млн" },
              ].map((p, i) => (
                <div
                  key={i}
                  className="card-premium"
                  style={{ padding: "14px 16px" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                      {p.title}
                    </span>
                    <span className="tag tag-orange" style={{ fontSize: 9 }}>
                      {p.status}
                    </span>
                  </div>
                  <div className="progress-bar mb-2">
                    <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {p.progress}%
                    </span>
                    <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                      {p.budget}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 md:px-8 py-12 md:py-16 border-y" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl font-black mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {s.value}
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-5 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <div className="tag tag-orange mb-4 mx-auto inline-flex">Возможности платформы</div>
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
            Всё для профессионала
            <br />в одном рабочем пространстве
          </h2>
          <p className="text-base md:text-lg" style={{ color: "var(--text-secondary)" }}>
            От подбора товаров до финансирования объекта
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="card-premium group"
              style={{ padding: "24px" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,122,0,0.12)", color: "var(--orange)" }}
                >
                  <Icon name={f.icon} size={18} />
                </div>
                <span className="tag tag-orange">{f.tag}</span>
              </div>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section
        className="px-5 md:px-8 py-16 md:py-24"
        style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border-color)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
              Для кого КОМПЛЕКТО?
            </h2>
            <p className="text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
              Единая платформа для всех участников строительного процесса
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roles.map((r, i) => (
              <div
                key={i}
                className="card-premium text-center"
                style={{ padding: "28px 20px" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(255,122,0,0.1)", color: "var(--orange)" }}
                >
                  <Icon name={r.icon} size={20} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {r.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KOMI AI Spotlight */}
      <section className="px-5 md:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="tag tag-orange mb-6 inline-flex">
              <Icon name="Sparkles" size={10} />
              KOMI AI
            </div>
            <h2 className="text-4xl font-black mb-6 leading-tight" style={{ color: "var(--text-primary)" }}>
              AI-ассистент,
              <br />
              <span className="text-gradient-orange">который экономит</span>
              <br />
              ваш бюджет
            </h2>
            <div className="space-y-4">
              {[
                "Подбор товаров по описанию проекта",
                "Поиск аналогов до -40% дешевле",
                "Оптимизация корзины и сроков доставки",
                "Генерация спецификаций за секунды",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,122,0,0.15)", color: "var(--orange)" }}
                  >
                    <Icon name="Check" size={11} />
                  </div>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <button className="btn-orange mt-8" onClick={onEnter} style={{ padding: "12px 24px" }}>
              <Icon name="Sparkles" size={15} />
              Попробовать KOMI
            </button>
          </div>

          {/* Chat preview */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid var(--border-bright)",
              background: "var(--surface-3)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{ borderColor: "var(--border-color)", background: "var(--surface-4)" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "var(--orange)", color: "#000" }}
              >
                <Icon name="Sparkles" size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                  KOMI
                </div>
                <div className="text-xs flex items-center gap-1" style={{ color: "#34C759" }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#34C759" }} />
                  Онлайн
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {[
                { from: "user", text: "Подбери мне итальянскую плитку для ванной 12м², бюджет до 180 000 ₽" },
                {
                  from: "komi",
                  text: "Нашёл 3 варианта в бюджете. Рекомендую Fap Ceramiche Nobu — 4 800 ₽/м², в наличии у 2 поставщиков. Сэкономлю 23 400 ₽ vs аналогичного Villeroy & Boch.",
                },
                { from: "user", text: "Добавь в проект и оформи заказ" },
                { from: "komi", text: "Готово! Добавлено 28 м² в проект «Квартира Петрова». Заказ сформирован у ТД Ceramica Nova. Доставка: 5−7 дней." },
              ].map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={m.from === "komi" ? "komi-bubble" : "user-bubble"}
                    style={{ maxWidth: "85%" }}
                  >
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-8 py-24 text-center relative overflow-hidden"
        style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border-color)" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,122,0,0.1) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
            Готов к запуску?
          </h2>
          <p className="mb-8 text-lg" style={{ color: "var(--text-secondary)" }}>
            Присоединяйтесь к тысячам профессионалов, которые уже работают умнее
          </p>
          <button className="btn-orange" onClick={onEnter} style={{ padding: "14px 36px", fontSize: 16 }}>
            <Icon name="Zap" size={18} />
            Начать бесплатно
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-8 py-8 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs text-black"
              style={{ background: "var(--orange)" }}
            >
              К
            </div>
            <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              КОМПЛЕКТО
            </span>
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025 КОМПЛЕКТО. AI ecosystem for construction & procurement.
          </span>
        </div>
      </footer>
    </div>
  );
}