import { useState } from "react";
import Icon from "@/components/ui/icon";

const products = [
  {
    id: "project-loan",
    icon: "Building2",
    title: "Кредит на объект",
    desc: "Финансирование закупок материалов и оборудования для строительных проектов",
    rate: "от 12.5%",
    limit: "до ₽ 50 млн",
    term: "до 36 мес",
    tag: "Популярный",
    tagColor: "orange",
    color: "#FF7A00",
    features: ["Без залога до 5 млн", "Решение за 24 часа", "Частичное погашение без штрафа"],
  },
  {
    id: "bnpl",
    icon: "CreditCard",
    title: "BNPL — Купи сейчас",
    desc: "Разбивка платежа поставщику на 4 части без переплаты для профессионалов",
    rate: "0% на 90 дней",
    limit: "до ₽ 5 млн",
    term: "до 90 дней",
    tag: "Без %",
    tagColor: "green",
    color: "#34C759",
    features: ["0% переплата первые 90 дней", "Оплата в 4 этапа", "Автоматическое списание"],
  },
  {
    id: "factoring",
    icon: "ArrowRightLeft",
    title: "Факторинг поставщиков",
    desc: "Мгновенная оплата поставщику, отсрочка платежа до 120 дней для покупателя",
    rate: "от 1.5%/мес",
    limit: "до ₽ 100 млн",
    term: "до 120 дней",
    tag: "Для бизнеса",
    tagColor: "blue",
    color: "#0A84FF",
    features: ["Поставщик получает деньги сразу", "Отсрочка до 120 дней", "Весь объём заказа"],
  },
  {
    id: "overdraft",
    icon: "Zap",
    title: "Овердрафт счёта",
    desc: "Автоматическое пополнение счёта при нехватке средств на закупку",
    rate: "от 15%",
    limit: "до ₽ 10 млн",
    term: "30 дней",
    tag: "Авто",
    tagColor: "yellow",
    color: "#FFD60A",
    features: ["Подключается за 5 минут", "Автопогашение при поступлении", "Без ежемесячных платежей"],
  },
  {
    id: "tender",
    icon: "Shield",
    title: "Тендерная гарантия",
    desc: "Банковская гарантия для участия в тендерах и конкурсах на строительные объекты",
    rate: "от 0.8%",
    limit: "до ₽ 200 млн",
    term: "до 24 мес",
    tag: "B2B",
    tagColor: "blue",
    color: "#0A84FF",
    features: ["Электронная гарантия за 2 часа", "Все виды тендеров", "Партнёрство с топ-банками"],
  },
  {
    id: "escrow",
    icon: "Lock",
    title: "Эскроу-счёт",
    desc: "Безопасные расчёты между заказчиком и поставщиком через защищённый счёт",
    rate: "0.3% от суммы",
    limit: "любая сумма",
    term: "до завершения",
    tag: "Безопасно",
    tagColor: "green",
    color: "#34C759",
    features: ["Деньги заморожены до подтверждения", "Защита обеих сторон", "Арбитраж при спорах"],
  },
];

const transactions = [
  { type: "Кредит на объект", project: "ЖК Северный берег", amount: "₽ 2 400 000", status: "Активный", date: "12 мая 2025", color: "#FF7A00" },
  { type: "BNPL", project: "Офис Газпром нефть", amount: "₽ 480 000", status: "Погашен", date: "3 апр 2025", color: "#34C759" },
  { type: "Эскроу", project: "Вилла Рублёво-44", amount: "₽ 1 100 000", status: "В процессе", date: "28 мая 2025", color: "#0A84FF" },
];

export default function KomiCapital() {
  const [selected, setSelected] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);

  const active = products.find((p) => p.id === selected);

  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>KOMI Capital</h1>
            <span className="tag tag-orange">Fintech</span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Финансовые инструменты для строительства и закупок
          </p>
        </div>
        <div
          className="rounded-xl p-4 text-right"
          style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
        >
          <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Ваш кредитный лимит</div>
          <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>₽ 18 500 000</div>
          <div className="text-xs" style={{ color: "#34C759" }}>Доступно: ₽ 16 100 000</div>
        </div>
      </div>

      {/* Limit bar */}
      <div
        className="rounded-xl p-5 mb-6"
        style={{ background: "linear-gradient(135deg, rgba(255,122,0,0.1), rgba(255,140,26,0.05))", border: "1px solid rgba(255,122,0,0.2)" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,122,0,0.2)", color: "var(--orange)" }}
          >
            <Icon name="Banknote" size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Использовано лимита</span>
              <span className="text-sm font-mono" style={{ color: "var(--orange)" }}>₽ 2 400 000 / ₽ 18 500 000</span>
            </div>
            <div className="progress-bar" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: "13%" }} />
            </div>
          </div>
          <div className="text-2xl font-black" style={{ color: "var(--text-muted)" }}>13%</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Products */}
        <div className="col-span-2">
          <div className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Финансовые продукты</div>
          <div className="grid grid-cols-2 gap-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="card-premium cursor-pointer transition-all"
                style={{
                  padding: "20px",
                  borderColor: selected === p.id ? p.color : undefined,
                  boxShadow: selected === p.id ? `0 0 0 1px ${p.color}40` : undefined,
                }}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${p.color}18`, color: p.color }}
                  >
                    <Icon name={p.icon} size={18} />
                  </div>
                  <span className={`tag tag-${p.tagColor}`}>{p.tag}</span>
                </div>
                <div className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{p.title}</div>
                <div className="text-xs mb-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.desc}</div>
                <div className="flex gap-3 text-xs">
                  <div>
                    <div style={{ color: "var(--text-muted)" }}>Ставка</div>
                    <div className="font-mono font-semibold" style={{ color: p.color }}>{p.rate}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)" }}>Лимит</div>
                    <div className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{p.limit}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text-muted)" }}>Срок</div>
                    <div className="font-mono font-semibold" style={{ color: "var(--text-secondary)" }}>{p.term}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Selected product detail */}
          {active ? (
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--surface-3)", border: `1px solid ${active.color}40` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${active.color}20`, color: active.color }}>
                  <Icon name={active.icon} size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{active.title}</div>
                  <div className="text-xs font-mono" style={{ color: active.color }}>{active.rate}</div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {active.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${active.color}20`, color: active.color }}>
                      <Icon name="Check" size={10} />
                    </div>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button
                className="btn-orange w-full text-sm"
                style={{ justifyContent: "center", background: active.color }}
                onClick={() => setApplying(true)}
              >
                <Icon name="ArrowRight" size={14} />
                Подать заявку
              </button>
              {applying && (
                <div className="mt-3 p-3 rounded-lg text-xs text-center animate-fade-in"
                  style={{ background: "rgba(52,199,89,0.1)", border: "1px solid rgba(52,199,89,0.2)", color: "#34C759" }}>
                  ✓ Заявка отправлена! Решение в течение 24 ч
                </div>
              )}
            </div>
          ) : (
            <div
              className="rounded-xl p-5 flex flex-col items-center text-center"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
            >
              <Icon name="Banknote" size={32} style={{ color: "var(--text-muted)", marginBottom: 12, opacity: 0.4 }} />
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Выберите финансовый продукт для просмотра деталей
              </p>
            </div>
          )}

          {/* Transactions */}
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
            <div className="px-4 py-3 border-b text-xs font-semibold" style={{ borderColor: "var(--border-color)", background: "var(--surface-3)", color: "var(--text-primary)" }}>
              История
            </div>
            {transactions.map((t, i) => (
              <div
                key={i}
                className="px-4 py-3 flex items-center gap-3 transition-all cursor-pointer"
                style={{ borderBottom: i < transactions.length - 1 ? "1px solid var(--border-color)" : undefined }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-3)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: t.color }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>{t.type}</div>
                  <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{t.project}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-mono" style={{ color: "var(--text-primary)" }}>{t.amount}</div>
                  <div className="text-xs" style={{ color: t.color }}>{t.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
