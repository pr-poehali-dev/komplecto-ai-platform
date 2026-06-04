import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  from: "user" | "komi";
  text: string;
  time: string;
  suggestions?: string[];
  products?: { name: string; price: string; saving?: string }[];
}

const initialMessages: Message[] = [
  {
    from: "komi",
    text: "Привет! Я KOMI — ваш AI-ассистент для комплектации объектов. Помогу подобрать товары, найти аналоги дешевле, оптимизировать бюджет и сформировать заказ. Чем могу помочь?",
    time: "сейчас",
    suggestions: [
      "Подобрать сантехнику для ванной",
      "Найти аналоги дешевле",
      "Оптимизировать бюджет проекта",
      "Сформировать спецификацию",
    ],
  },
];

const quickPrompts = [
  { icon: "Search", label: "Подобрать товары", prompt: "Подбери мне товары для" },
  { icon: "RefreshCw", label: "Найти аналог", prompt: "Найди аналог для" },
  { icon: "TrendingDown", label: "Снизить бюджет", prompt: "Как снизить бюджет на" },
  { icon: "FileText", label: "Спецификация", prompt: "Создай спецификацию для" },
  { icon: "Truck", label: "Сроки доставки", prompt: "Какие сроки доставки для" },
  { icon: "Star", label: "Рейтинг поставщика", prompt: "Оцени поставщика" },
];

const komiReplies: Record<string, Message> = {
  default: {
    from: "komi",
    text: "Понял задачу. Анализирую каталог из 340 000 товаров и базу 2 400 поставщиков...",
    time: "сейчас",
    products: [
      { name: "Fap Ceramiche Nobu 60×120", price: "4 800 ₽/м²", saving: "−23%" },
      { name: "Emil Ceramica Tele di Marmo", price: "3 840 ₽/м²", saving: "−34%" },
      { name: "Kerama Marazzi Монсеррат", price: "2 100 ₽/м²", saving: "−52%" },
    ],
  },
};

export default function KomiAI() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"chat" | "catalog" | "budget">("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const now = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [...prev, { from: "user", text: msg, time: now }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply: Message = {
        ...komiReplies.default,
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
        text: `Отлично! По запросу «${msg}» нашёл 3 лучших варианта с учётом наличия, срока доставки и цены. Рекомендую начать с Fap Ceramiche Nobu — оптимальное соотношение цены и качества, в наличии у 4 поставщиков, доставка 2-3 дня. Экономия vs Villeroy & Boch составит ${Math.round(Math.random() * 30 + 15)}%.`,
      };
      setMessages((prev) => [...prev, reply]);
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="flex h-full">
      {/* Left panel — context */}
      <aside
        className="w-64 flex-shrink-0 border-r flex flex-col"
        style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}
      >
        {/* KOMI header */}
        <div className="p-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center pulse-orange"
              style={{ background: "linear-gradient(135deg, #FF7A00, #FF8C1A)", color: "#000" }}
            >
              <Icon name="Sparkles" size={20} />
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>KOMI AI</div>
              <div className="text-xs flex items-center gap-1" style={{ color: "#34C759" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#34C759" }} />
                Активен
              </div>
            </div>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            AI-ассистент для подбора товаров, оптимизации бюджета и управления закупками
          </p>
        </div>

        {/* Mode switcher */}
        <div className="p-3 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Режим
          </div>
          {[
            { id: "chat", icon: "MessageSquare", label: "Чат" },
            { id: "catalog", icon: "Grid3X3", label: "Поиск в каталоге" },
            { id: "budget", icon: "TrendingDown", label: "Оптимизация бюджета" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as typeof mode)}
              className={`sidebar-link w-full text-left mb-0.5 ${mode === m.id ? "active" : ""}`}
            >
              <Icon name={m.icon} size={14} />
              <span className="text-xs">{m.label}</span>
            </button>
          ))}
        </div>

        {/* Quick prompts */}
        <div className="p-3 flex-1">
          <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Быстрые запросы
          </div>
          <div className="space-y-1">
            {quickPrompts.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q.prompt + " ")}
                className="w-full text-left rounded-lg px-3 py-2 transition-all text-xs flex items-center gap-2"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-4)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <Icon name={q.icon} size={13} style={{ color: "var(--text-muted)" }} />
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 border-t" style={{ borderColor: "var(--border-color)" }}>
          <div className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
            Сегодня
          </div>
          <div className="space-y-1">
            {[
              { label: "Запросов", val: "24" },
              { label: "Найдено аналогов", val: "8" },
              { label: "Сэкономлено", val: "₽ 47K" },
            ].map((s, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
                <span className="font-mono" style={{ color: "var(--text-primary)" }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 animate-fade-in ${m.from === "user" ? "flex-row-reverse" : ""}`}
            >
              {m.from === "komi" && (
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ background: "linear-gradient(135deg, #FF7A00, #FF8C1A)", color: "#000" }}
                >
                  <Icon name="Sparkles" size={14} />
                </div>
              )}
              <div style={{ maxWidth: "70%" }}>
                {m.from === "komi" ? (
                  <div className="komi-bubble">
                    <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>
                      {m.text}
                    </p>

                    {m.products && (
                      <div className="mt-3 space-y-2">
                        {m.products.map((p, j) => (
                          <div
                            key={j}
                            className="flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition-all"
                            style={{ background: "var(--surface-4)", border: "1px solid var(--border-color)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,122,0,0.3)")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                          >
                            <div>
                              <div className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{p.name}</div>
                              <div className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{p.price}</div>
                            </div>
                            {p.saving && (
                              <span className="tag tag-green">{p.saving}</span>
                            )}
                          </div>
                        ))}
                        <button className="btn-orange w-full text-xs mt-2" style={{ justifyContent: "center" }}>
                          Добавить в проект
                        </button>
                      </div>
                    )}

                    {m.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.suggestions.map((s, j) => (
                          <button
                            key={j}
                            onClick={() => sendMessage(s)}
                            className="text-xs px-3 py-1.5 rounded-full transition-all"
                            style={{
                              background: "var(--surface-4)",
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

                    <div className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>{m.time}</div>
                  </div>
                ) : (
                  <div className="user-bubble">
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{m.text}</p>
                    <div className="mt-1 text-xs text-right" style={{ color: "var(--text-muted)" }}>{m.time}</div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 animate-fade-in">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #FF7A00, #FF8C1A)", color: "#000" }}
              >
                <Icon name="Sparkles" size={14} />
              </div>
              <div className="komi-bubble flex items-center gap-2">
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: "var(--orange)",
                      animation: `pulse-orange 1.2s ease ${j * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4" style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}>
          <div
            className="flex items-end gap-3 rounded-xl p-3"
            style={{ background: "var(--surface-3)", border: "1px solid var(--border-bright)" }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Спросите KOMI о товарах, аналогах, бюджете..."
              className="flex-1 bg-transparent outline-none resize-none text-sm leading-relaxed"
              style={{ color: "var(--text-primary)", minHeight: 20, maxHeight: 120 }}
              rows={1}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
              style={{
                background: input.trim() ? "var(--orange)" : "var(--surface-5)",
                color: input.trim() ? "#000" : "var(--text-muted)",
              }}
            >
              <Icon name="ArrowUp" size={16} />
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Enter для отправки · Shift+Enter для новой строки
            </span>
            <div className="flex gap-2">
              <button className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                <Icon name="Paperclip" size={11} />
                Файл
              </button>
              <button className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                <Icon name="FolderOpen" size={11} />
                Проект
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
