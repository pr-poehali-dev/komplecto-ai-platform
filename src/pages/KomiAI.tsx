import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface ProductSuggestion {
  name: string;
  brand: string;
  price: string;
  saving?: string;
  stock: string;
  delivery: string;
  rating: number;
}

interface Message {
  from: "user" | "komi";
  text: string;
  time: string;
  suggestions?: string[];
  products?: ProductSuggestion[];
  action?: { label: string; icon: string };
  type?: "info" | "warning" | "success";
}

// Умные ответы KOMI по ключевым словам
const smartReplies = (msg: string): Omit<Message, "from" | "time"> => {
  const m = msg.toLowerCase();

  if (m.includes("сантехник") || m.includes("унитаз") || m.includes("ванн") || m.includes("душ")) {
    return {
      text: "Нашёл 3 топовых варианта сантехники. Оптимальный выбор по соотношению цена/качество — Villeroy & Boch Subway 2.0. Это же предпочитают 78% профессионалов платформы. Могу сразу добавить в проект или показать аналоги дешевле.",
      products: [
        { name: "Villeroy & Boch Subway 2.0", brand: "V&B", price: "42 800 ₽", stock: "В наличии", delivery: "3–5 дн", rating: 4.8 },
        { name: "Roca Nexo Rimless", brand: "Roca", price: "28 400 ₽", saving: "−34%", stock: "В наличии", delivery: "2–4 дн", rating: 4.6 },
        { name: "Cersanit City Clean On", brand: "Cersanit", price: "18 900 ₽", saving: "−56%", stock: "В наличии", delivery: "1–2 дн", rating: 4.5 },
      ],
      action: { label: "Добавить лучший вариант в проект", icon: "Plus" },
      suggestions: ["Показать аналоги Villeroy & Boch", "Добавить в проект «ЖК Северный берег»", "Сравнить всех поставщиков"],
    };
  }

  if (m.includes("плитк") || m.includes("керамогранит") || m.includes("мрамор") || m.includes("напольн")) {
    return {
      text: "Отличный запрос! По плитке у меня 42 800+ позиций. Для жилых помещений рекомендую Emil Ceramica или Fap Ceramiche — итальянцы с безупречным качеством. Если бюджет ограничен — Kerama Marazzi даёт схожий результат на 45% дешевле.",
      products: [
        { name: "Emil Ceramica Tele di Marmo 60×60", brand: "Emil", price: "3 840 ₽/м²", stock: "В наличии", delivery: "1–3 дн", rating: 4.9 },
        { name: "Fap Ceramiche Roma Stone", brand: "Fap", price: "4 200 ₽/м²", stock: "В наличии", delivery: "2–5 дн", rating: 4.8 },
        { name: "Kerama Marazzi Монсеррат", brand: "KM", price: "2 100 ₽/м²", saving: "−45%", stock: "В наличии", delivery: "1–2 дн", rating: 4.7 },
      ],
      action: { label: "Рассчитать количество для комнаты", icon: "Calculator" },
      suggestions: ["Рассчитать плитку на 15 м²", "Найти затирку под эту плитку", "Показать напольную + настенную в комплекте"],
    };
  }

  if (m.includes("освещени") || m.includes("светильник") || m.includes("люстр") || m.includes("свет")) {
    return {
      text: "Освещение — один из самых важных элементов интерьера. Для жилых пространств рекомендую Artemide или Flos. Если бюджет не позволяет — есть достойные альтернативы от Ideal Lux с похожей эстетикой на 60% дешевле.",
      products: [
        { name: "Artemide Pirce подвесной", brand: "Artemide", price: "187 000 ₽", stock: "Под заказ", delivery: "14–21 дн", rating: 5.0 },
        { name: "Flos Skygarden", brand: "Flos", price: "84 000 ₽", saving: "−55%", stock: "Под заказ", delivery: "10–14 дн", rating: 4.9 },
        { name: "Ideal Lux Blow", brand: "Ideal Lux", price: "24 800 ₽", saving: "−87%", stock: "В наличии", delivery: "2–4 дн", rating: 4.6 },
      ],
      suggestions: ["Подобрать полный комплект для гостиной", "Посчитать освещение по нормам (люкс)", "Найти поставщика с наличием"],
    };
  }

  if (m.includes("бюджет") || m.includes("дешев") || m.includes("экономи") || m.includes("аналог") || m.includes("заменит")) {
    return {
      text: "Оптимизирую бюджет вашего проекта. Анализирую текущую корзину... Нашёл 4 позиции где можно сэкономить без потери качества. Общая потенциальная экономия — 312 400 ₽ (−18% от сметы).",
      products: [
        { name: "Hansgrohe Ecostat 1001 вместо Grohe", brand: "Hansgrohe", price: "19 400 ₽", saving: "−32%", stock: "В наличии", delivery: "2–3 дн", rating: 4.7 },
        { name: "Roca Nexo вместо V&B Subway", brand: "Roca", price: "28 400 ₽", saving: "−34%", stock: "В наличии", delivery: "2–4 дн", rating: 4.6 },
      ],
      action: { label: "Заменить все на экономные варианты", icon: "TrendingDown" },
      type: "success",
      suggestions: ["Показать все 4 замены", "Оставить только V&B, заменить остальное", "Сохранить оба варианта для клиента"],
    };
  }

  if (m.includes("спецификаци") || m.includes("смет") || m.includes("список") || m.includes("документ")) {
    return {
      text: "Генерирую спецификацию по проекту «ЖК Северный берег»... Готово! Документ содержит 147 позиций на сумму 4 200 000 ₽. Включены: артикулы, количество, цены, поставщики, сроки.",
      action: { label: "Скачать спецификацию .xlsx", icon: "Download" },
      type: "success",
      suggestions: ["Экспортировать в PDF", "Отправить клиенту по email", "Создать заказы у поставщиков"],
    };
  }

  if (m.includes("поставщик") || m.includes("доставк") || m.includes("срок") || m.includes("наличи")) {
    return {
      text: "Сравниваю поставщиков по вашему запросу. Лучший вариант по соотношению цена/скорость/надёжность — ТД Аквасфера: 97% доставок в срок, рейтинг 4.9, доставка по Москве 1–2 дня.",
      products: [
        { name: "ТД Аквасфера", brand: "97% в срок", price: "Базовая цена", stock: "Склад МСК", delivery: "1–2 дн", rating: 4.9 },
        { name: "Cerama Nova", brand: "94% в срок", price: "+5% к цене", stock: "Склад МСК", delivery: "1–3 дн", rating: 4.7 },
      ],
      suggestions: ["Связаться с ТД Аквасфера", "Сравнить условия доставки", "Оформить заказ напрямую"],
    };
  }

  if (m.includes("кухн") || m.includes("гарнитур") || m.includes("столешниц")) {
    return {
      text: "Кухонные гарнитуры — специализация 5 600+ товаров в каталоге. Для premium-сегмента рекомендую итальянских производителей. Под бюджет до 500К ₽ — отличный выбор от Leicht или Rational.",
      products: [
        { name: "Leicht Carre Pure Matt", brand: "Leicht", price: "от 480 000 ₽", stock: "Под заказ", delivery: "45–60 дн", rating: 4.9 },
        { name: "Rational iLive Matt", brand: "Rational", price: "от 320 000 ₽", saving: "−33%", stock: "Под заказ", delivery: "30–45 дн", rating: 4.8 },
      ],
      suggestions: ["Рассчитать кухню 12 м²", "Подобрать столешницу и фурнитуру", "Найти установщиков"],
    };
  }

  // Default fallback — умный универсальный ответ
  return {
    text: `Анализирую ваш запрос «${msg.slice(0, 60)}${msg.length > 60 ? "…" : ""}».\n\nНашёл 247 подходящих товаров в каталоге. Вот топ-3 по оценке соответствия, цене и наличию у проверенных поставщиков.`,
    products: [
      { name: "Grohe Grohtherm 3000 Cosmopolitan", brand: "Grohe", price: "28 600 ₽", saving: "−16%", stock: "В наличии", delivery: "2–4 дн", rating: 4.7 },
      { name: "Hansgrohe Ecostat 1001 CL", brand: "Hansgrohe", price: "19 400 ₽", saving: "−32%", stock: "В наличии", delivery: "2–3 дн", rating: 4.6 },
      { name: "Omnires Y chrome", brand: "Omnires", price: "14 200 ₽", saving: "−50%", stock: "В наличии", delivery: "1–2 дн", rating: 4.4 },
    ],
    action: { label: "Добавить лучший вариант в корзину", icon: "ShoppingCart" },
    suggestions: ["Уточнить запрос", "Найти ещё дешевле", "Показать все 247 результатов"],
  };
};

const quickPrompts = [
  { icon: "Droplets", label: "Сантехника для ванной", prompt: "Подбери сантехнику для ванной комнаты" },
  { icon: "Square", label: "Плитка для пола", prompt: "Найди плитку для пола в гостиной" },
  { icon: "Lightbulb", label: "Освещение гостиной", prompt: "Подбери освещение для гостиной" },
  { icon: "TrendingDown", label: "Снизить бюджет", prompt: "Оптимизируй бюджет и найди аналоги дешевле" },
  { icon: "FileText", label: "Создать спецификацию", prompt: "Создай спецификацию по текущему проекту" },
  { icon: "Truck", label: "Проверить поставщика", prompt: "Сравни поставщиков по надёжности и срокам" },
];

const initialMessages: Message[] = [
  {
    from: "komi",
    text: "Привет! Я KOMI — ваш AI-ассистент для комплектации объектов.\n\nПомогу подобрать товары из 340 000 позиций, найти аналоги дешевле, оптимизировать бюджет и сформировать заказ у лучших поставщиков.",
    time: "сейчас",
    suggestions: [
      "Подобрать сантехнику для ванной",
      "Найти аналоги дешевле",
      "Оптимизировать бюджет проекта",
      "Создать спецификацию",
    ],
  },
];

export default function KomiAI() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"chat" | "catalog" | "budget">("chat");
  const [savedCount, setSavedCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    const now = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { from: "user", text: msg, time: now }]);
    setInput("");
    setLoading(true);

    const delay = 900 + Math.random() * 800;
    setTimeout(() => {
      const replyData = smartReplies(msg);
      const reply: Message = {
        from: "komi",
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
        ...replyData,
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);
    }, delay);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left sidebar */}
      <aside
        className="w-72 flex-shrink-0 border-r flex flex-col overflow-hidden"
        style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}
      >
        {/* KOMI identity */}
        <div className="p-5 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 pulse-orange"
              style={{ background: "linear-gradient(135deg, #FF7A00, #FF5500)", color: "#000" }}
            >
              <Icon name="Sparkles" size={26} />
            </div>
            <div>
              <div className="font-black text-lg" style={{ color: "var(--text-primary)" }}>KOMI AI</div>
              <div className="flex items-center gap-1.5 text-sm" style={{ color: "#34C759" }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#34C759" }} />
                Онлайн · Готов помочь
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            AI-ассистент для подбора товаров, оптимизации бюджета и управления закупками
          </p>
        </div>

        {/* Mode switcher */}
        <div className="p-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Режим работы</div>
          <div className="space-y-1">
            {[
              { id: "chat", icon: "MessageSquare", label: "Умный чат", desc: "Вопросы и подбор" },
              { id: "catalog", icon: "Grid3X3", label: "Поиск в каталоге", desc: "340К+ товаров" },
              { id: "budget", icon: "TrendingDown", label: "Оптимизация", desc: "Снижение затрат" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as typeof mode)}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all"
                style={{
                  background: mode === m.id ? "var(--surface-4)" : "transparent",
                  borderLeft: mode === m.id ? "2px solid var(--orange)" : "2px solid transparent",
                }}
                onMouseEnter={(e) => { if (mode !== m.id) e.currentTarget.style.background = "var(--surface-3)"; }}
                onMouseLeave={(e) => { if (mode !== m.id) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon name={m.icon} size={16} style={{ color: mode === m.id ? "var(--orange)" : "var(--text-muted)", flexShrink: 0 }} />
                <div>
                  <div className="text-sm font-medium" style={{ color: mode === m.id ? "var(--text-primary)" : "var(--text-secondary)" }}>{m.label}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{m.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick prompts */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Быстрый запрос</div>
          <div className="space-y-1.5">
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q.prompt)}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all"
                style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,122,0,0.3)";
                  e.currentTarget.style.background = "var(--surface-4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.background = "var(--surface-3)";
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,122,0,0.1)", color: "var(--orange)" }}>
                  <Icon name={q.icon} size={15} />
                </div>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{q.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Today stats */}
        <div className="p-4 border-t" style={{ borderColor: "var(--border-color)" }}>
          <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Сессия</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: messages.filter(m => m.from === "user").length, label: "Запросов" },
              { val: messages.filter(m => m.products).length, label: "Подборок" },
              { val: savedCount, label: "Сохранено" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-2 text-center" style={{ background: "var(--surface-3)" }}>
                <div className="text-lg font-black" style={{ color: i === 0 ? "var(--orange)" : "var(--text-primary)" }}>{s.val}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)", fontSize: 10 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat header */}
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF7A00, #FF5500)", color: "#000" }}>
              <Icon name="Sparkles" size={17} />
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>KOMI — умный ассистент</div>
              <div className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                <span>340 000+ товаров</span>
                <span>·</span>
                <span>2 400 поставщиков</span>
                <span>·</span>
                <span style={{ color: "#34C759" }}>Онлайн</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-xl text-sm transition-all"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
              onClick={() => setMessages(initialMessages)}
            >
              <Icon name="RotateCcw" size={14} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 animate-fade-in ${m.from === "user" ? "flex-row-reverse" : ""}`}>
              {/* Avatar */}
              {m.from === "komi" ? (
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ background: "linear-gradient(135deg, #FF7A00, #FF5500)", color: "#000" }}
                >
                  <Icon name="Sparkles" size={16} />
                </div>
              ) : (
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold"
                  style={{ background: "var(--surface-4)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}
                >
                  ВЫ
                </div>
              )}

              <div style={{ maxWidth: "75%" }}>
                {m.from === "komi" ? (
                  <div>
                    {/* KOMI bubble */}
                    <div
                      className="rounded-2xl rounded-tl-sm p-4 mb-3"
                      style={{
                        background: "var(--surface-3)",
                        border: `1px solid ${m.type === "success" ? "rgba(52,199,89,0.2)" : m.type === "warning" ? "rgba(255,214,10,0.2)" : "var(--border-color)"}`,
                      }}
                    >
                      {/* Typing indicator for text with newlines */}
                      <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--text-secondary)" }}>
                        {m.text}
                      </p>
                      <div className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>{m.time}</div>
                    </div>

                    {/* Products */}
                    {m.products && (
                      <div className="space-y-2 mb-3">
                        {m.products.map((p, j) => (
                          <div
                            key={j}
                            className="rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all"
                            style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,122,0,0.3)")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                          >
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--surface-4)", color: "var(--text-muted)" }}>
                              <Icon name="Package" size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{p.name}</div>
                              <div className="text-xs flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
                                <span>{p.brand}</span>
                                <span>·</span>
                                <span style={{ color: p.stock === "В наличии" ? "#34C759" : "#FFD60A" }}>{p.stock}</span>
                                <span>·</span>
                                <span>{p.delivery}</span>
                                <span className="flex items-center gap-0.5">
                                  <Icon name="Star" size={9} style={{ color: "#FFD60A" }} />
                                  {p.rating}
                                </span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{p.price}</div>
                              {p.saving && <div className="text-xs" style={{ color: "#34C759" }}>{p.saving}</div>}
                            </div>
                            <button
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                              style={{ background: "var(--surface-4)", color: "var(--text-muted)" }}
                              onClick={() => setSavedCount(c => c + 1)}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.color = "#000"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-4)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                            >
                              <Icon name="Plus" size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action button */}
                    {m.action && (
                      <button
                        className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all mb-3"
                        style={{ background: "var(--orange)", color: "#000" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange-bright)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--orange)")}
                      >
                        <Icon name={m.action.icon} size={15} />
                        {m.action.label}
                      </button>
                    )}

                    {/* Suggestions chips */}
                    {m.suggestions && (
                      <div className="flex flex-wrap gap-2">
                        {m.suggestions.map((s, j) => (
                          <button
                            key={j}
                            onClick={() => sendMessage(s)}
                            className="text-sm px-3 py-1.5 rounded-full transition-all"
                            style={{
                              background: "var(--surface-3)",
                              border: "1px solid var(--border-color)",
                              color: "var(--text-secondary)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "rgba(255,122,0,0.4)";
                              e.currentTarget.style.color = "var(--orange)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "var(--border-color)";
                              e.currentTarget.style.color = "var(--text-secondary)";
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="rounded-2xl rounded-tr-sm px-4 py-3"
                    style={{ background: "var(--orange)" }}
                  >
                    <p className="text-sm leading-relaxed" style={{ color: "#000", fontWeight: 500 }}>{m.text}</p>
                    <div className="text-xs mt-1 text-right" style={{ color: "rgba(0,0,0,0.5)" }}>{m.time}</div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-4 animate-fade-in">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #FF7A00, #FF5500)", color: "#000" }}
              >
                <Icon name="Sparkles" size={16} />
              </div>
              <div className="rounded-2xl rounded-tl-sm px-4 py-3" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: "var(--orange)",
                        animation: `pulse-orange 1.2s ease ${j * 0.25}s infinite`,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                  <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>KOMI анализирует...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="border-t p-4" style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}>
          <div
            className="flex items-end gap-3 rounded-2xl p-3 transition-all"
            style={{
              background: "var(--surface-3)",
              border: "1px solid var(--border-bright)",
            }}
          >
            <div className="flex gap-1.5 pb-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Icon name="Paperclip" size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Icon name="FolderOpen" size={16} />
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              }}
              placeholder="Спросите о товарах, аналогах, бюджете или поставщиках..."
              className="flex-1 bg-transparent outline-none resize-none text-sm leading-relaxed"
              style={{ color: "var(--text-primary)", minHeight: 24, maxHeight: 120 }}
              rows={1}
            />

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
              style={{
                background: input.trim() && !loading ? "var(--orange)" : "var(--surface-5)",
                color: input.trim() && !loading ? "#000" : "var(--text-muted)",
              }}
            >
              {loading ? <Icon name="Loader" size={16} /> : <Icon name="ArrowUp" size={16} />}
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Enter — отправить · Shift+Enter — новая строка
            </span>
            <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
              <Icon name="Sparkles" size={11} style={{ color: "var(--orange)" }} />
              <span>Powered by KOMI AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
