import { useState } from "react";
import Icon from "@/components/ui/icon";

const chats = [
  { id: 1, name: "ТД Аквасфера", type: "supplier", lastMsg: "Отгрузка завтра в 10:00, всё готово", time: "14:32", unread: 2, online: true },
  { id: 2, name: "KOMI AI", type: "komi", lastMsg: "Нашёл аналог Grohe на 18% дешевле", time: "12:15", unread: 0, online: true },
  { id: 3, name: "Cerama Nova", type: "supplier", lastMsg: "Счёт выставлен, ждём оплату", time: "11:40", unread: 1, online: false },
  { id: 4, name: "LightPro Москва", type: "supplier", lastMsg: "Уточните модель светильника?", time: "вчера", unread: 0, online: false },
  { id: 5, name: "Иванов А.В.", type: "professional", lastMsg: "Отправил обновлённую смету", time: "вчера", unread: 0, online: true },
];

const messagesByChat: Record<number, { from: string; text: string; time: string }[]> = {
  1: [
    { from: "other", text: "Добрый день! Ваш заказ №1247 собран и готов к отгрузке.", time: "13:20" },
    { from: "me", text: "Отлично, когда планируете доставку?", time: "13:35" },
    { from: "other", text: "Отгрузка завтра в 10:00, всё готово. Ориентировочное время доставки — до 16:00.", time: "14:32" },
  ],
  2: [
    { from: "other", text: "Привет! Я проанализировал ваши последние заказы и нашёл аналог Grohe Grohtherm за 23 400 ₽ — на 18% дешевле.", time: "12:10" },
    { from: "me", text: "Расскажи подробнее, что за аналог?", time: "12:13" },
    { from: "other", text: "Hansgrohe Ecostat Comfort — аналогичные характеристики, лучшая оценка 4.8★, в наличии у 3 поставщиков. Срок доставки 2-3 дня.", time: "12:15" },
  ],
  3: [
    { from: "other", text: "Добрый день! Счёт №887 выставлен на сумму 184 320 ₽. Ждём оплату.", time: "11:40" },
  ],
};

export default function Chat() {
  const [active, setActive] = useState<number>(1);
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState(messagesByChat);

  const sendMsg = () => {
    if (!input.trim()) return;
    const now = new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
    setLocalMessages((prev) => ({
      ...prev,
      [active]: [...(prev[active] || []), { from: "me", text: input.trim(), time: now }],
    }));
    setInput("");
  };

  const activeChat = chats.find((c) => c.id === active);
  const messages = localMessages[active] || [];

  return (
    <div className="flex h-full">
      {/* Chat list */}
      <aside
        className="w-72 flex-shrink-0 border-r flex flex-col"
        style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}
      >
        <div className="p-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <h2 className="font-bold text-sm mb-3" style={{ color: "var(--text-primary)" }}>Чаты</h2>
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
          >
            <Icon name="Search" size={13} style={{ color: "var(--text-muted)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Поиск...</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((c) => (
            <div
              key={c.id}
              onClick={() => setActive(c.id)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all"
              style={{
                background: active === c.id ? "var(--surface-4)" : "transparent",
                borderLeft: active === c.id ? "2px solid var(--orange)" : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (active !== c.id) e.currentTarget.style.background = "var(--surface-3)";
              }}
              onMouseLeave={(e) => {
                if (active !== c.id) e.currentTarget.style.background = "transparent";
              }}
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    background: c.type === "komi" ? "linear-gradient(135deg, #FF7A00, #FF8C1A)" : "var(--surface-5)",
                    color: c.type === "komi" ? "#000" : "var(--text-secondary)",
                  }}
                >
                  {c.type === "komi" ? <Icon name="Sparkles" size={16} /> : c.name[0]}
                </div>
                {c.online && (
                  <div
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                    style={{ background: "#34C759", borderColor: "var(--surface-2)" }}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>{c.name}</span>
                  <span className="text-xs flex-shrink-0 ml-2" style={{ color: "var(--text-muted)" }}>{c.time}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{c.lastMsg}</span>
                  {c.unread > 0 && (
                    <span
                      className="flex-shrink-0 ml-2 text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold"
                      style={{ background: "var(--orange)", color: "#000", fontSize: 9 }}
                    >
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t" style={{ borderColor: "var(--border-color)" }}>
          <button className="btn-ghost w-full text-xs" style={{ justifyContent: "center" }}>
            <Icon name="Plus" size={13} />
            Новый чат
          </button>
        </div>
      </aside>

      {/* Chat window */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div
          className="flex items-center gap-3 px-6 py-4 border-b"
          style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}
        >
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
              style={{
                background: activeChat?.type === "komi" ? "linear-gradient(135deg, #FF7A00, #FF8C1A)" : "var(--surface-4)",
                color: activeChat?.type === "komi" ? "#000" : "var(--text-secondary)",
              }}
            >
              {activeChat?.type === "komi" ? <Icon name="Sparkles" size={16} /> : activeChat?.name[0]}
            </div>
            {activeChat?.online && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                style={{ background: "#34C759", borderColor: "var(--surface-2)" }} />
            )}
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{activeChat?.name}</div>
            <div className="text-xs" style={{ color: activeChat?.online ? "#34C759" : "var(--text-muted)" }}>
              {activeChat?.online ? "Онлайн" : "Не в сети"}
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="btn-ghost text-xs" style={{ padding: "6px 12px" }}>
              <Icon name="Phone" size={13} />
            </button>
            <button className="btn-ghost text-xs" style={{ padding: "6px 12px" }}>
              <Icon name="MoreHorizontal" size={13} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} animate-fade-in`}>
              <div
                className="max-w-sm rounded-xl px-4 py-3"
                style={{
                  background: m.from === "me" ? "var(--orange)" : "var(--surface-3)",
                  border: m.from === "me" ? "none" : "1px solid var(--border-color)",
                }}
              >
                <p className="text-sm leading-relaxed" style={{ color: m.from === "me" ? "#000" : "var(--text-secondary)" }}>
                  {m.text}
                </p>
                <div className="text-xs mt-1 text-right" style={{ color: m.from === "me" ? "rgba(0,0,0,0.5)" : "var(--text-muted)" }}>
                  {m.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-4" style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}>
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "var(--surface-3)", border: "1px solid var(--border-bright)" }}
          >
            <button style={{ color: "var(--text-muted)" }}>
              <Icon name="Paperclip" size={16} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Написать сообщение..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--text-primary)" }}
            />
            <button
              onClick={sendMsg}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{
                background: input.trim() ? "var(--orange)" : "var(--surface-5)",
                color: input.trim() ? "#000" : "var(--text-muted)",
              }}
            >
              <Icon name="Send" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
