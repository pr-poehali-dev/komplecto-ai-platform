import { useState } from "react";
import Icon from "@/components/ui/icon";

type AuthStep = "choose" | "login" | "register-pro" | "register-sup" | "verify" | "verify-pending";

interface User {
  name: string;
  email: string;
  role: "professional" | "supplier";
  verified: boolean;
}

interface Props {
  onAuth: (user: User) => void;
}

const professions = [
  "Дизайнер интерьера",
  "Архитектор",
  "Строительная компания",
  "Прораб / Комплектовщик",
  "Студия дизайна",
  "Другое",
];

const supplierCategories = [
  "Сантехника",
  "Плитка и керамика",
  "Освещение",
  "Мебель и декор",
  "Двери и окна",
  "Электрика",
  "Кухни",
  "Отделочные материалы",
];

export default function Auth({ onAuth }: Props) {
  const [step, setStep] = useState<AuthStep>("choose");
  const [role, setRole] = useState<"professional" | "supplier">("professional");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "",
    company: "", inn: "", profession: "", category: "",
    city: "", site: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agree, setAgree] = useState(false);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const validateLogin = () => {
    const e: Record<string, string> = {};
    if (!form.email) e.email = "Введите email";
    if (!form.password) e.password = "Введите пароль";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateRegPro = () => {
    const e: Record<string, string> = {};
    if (!form.name) e.name = "Введите имя";
    if (!form.email) e.email = "Введите email";
    if (!form.phone) e.phone = "Введите телефон";
    if (!form.profession) e.profession = "Выберите специализацию";
    if (!form.password || form.password.length < 6) e.password = "Минимум 6 символов";
    if (!agree) e.agree = "Необходимо согласие";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateRegSup = () => {
    const e: Record<string, string> = {};
    if (!form.company) e.company = "Введите название";
    if (!form.inn) e.inn = "Введите ИНН";
    if (!form.email) e.email = "Введите email";
    if (!form.phone) e.phone = "Введите телефон";
    if (!form.category) e.category = "Выберите категорию";
    if (!form.password || form.password.length < 6) e.password = "Минимум 6 символов";
    if (!agree) e.agree = "Необходимо согласие";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = () => {
    if (!validateLogin()) return;
    onAuth({ name: form.email.split("@")[0], email: form.email, role: "professional", verified: true });
  };

  const handleRegisterPro = () => {
    if (!validateRegPro()) return;
    setStep("verify");
  };

  const handleRegisterSup = () => {
    if (!validateRegSup()) return;
    setStep("verify");
  };

  const handleVerifySubmit = () => {
    setStep("verify-pending");
  };

  const InputField = ({
    label, k, type = "text", placeholder, error, hint,
  }: {
    label: string; k: string; type?: string; placeholder?: string; error?: string; hint?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
        {label}
      </label>
      <input
        type={type}
        value={(form as Record<string, string>)[k]}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
        style={{
          background: "var(--surface-3)",
          border: `1px solid ${error ? "#FF3B30" : "var(--border-color)"}`,
          color: "var(--text-primary)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--orange)")}
        onBlur={(e) => (e.target.style.borderColor = error ? "#FF3B30" : "var(--border-color)")}
      />
      {error && <p className="text-xs mt-1" style={{ color: "#FF3B30" }}>{error}</p>}
      {hint && !error && <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{hint}</p>}
    </div>
  );

  const SelectField = ({
    label, k, options, placeholder, error,
  }: {
    label: string; k: string; options: string[]; placeholder?: string; error?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
        {label}
      </label>
      <select
        value={(form as Record<string, string>)[k]}
        onChange={(e) => set(k, e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all appearance-none cursor-pointer"
        style={{
          background: "var(--surface-3)",
          border: `1px solid ${error ? "#FF3B30" : "var(--border-color)"}`,
          color: (form as Record<string, string>)[k] ? "var(--text-primary)" : "var(--text-muted)",
        }}
      >
        <option value="" disabled>{placeholder || "Выберите..."}</option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "var(--surface-3)", color: "var(--text-primary)" }}>{o}</option>
        ))}
      </select>
      {error && <p className="text-xs mt-1" style={{ color: "#FF3B30" }}>{error}</p>}
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{ background: "var(--surface-1)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,122,0,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black text-sm" style={{ background: "var(--orange)" }}>К</div>
          <span className="font-black text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>КОМПЛЕКТО</span>
        </div>

        {/* === CHOOSE === */}
        {step === "choose" && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-black text-center mb-2" style={{ color: "var(--text-primary)" }}>
              Добро пожаловать
            </h1>
            <p className="text-center mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
              Войдите или создайте аккаунт
            </p>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setStep("login")}
                className="w-full rounded-xl py-4 text-sm font-semibold transition-all"
                style={{ background: "var(--orange)", color: "#000" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange-bright)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--orange)")}
              >
                Войти в аккаунт
              </button>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>или зарегистрируйтесь</span>
              <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setRole("professional"); setStep("register-pro"); }}
                className="rounded-xl p-5 text-left transition-all"
                style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(255,122,0,0.12)", color: "var(--orange)" }}>
                  <Icon name="HardHat" size={20} />
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>Профессионал</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>Дизайнер, строитель, архитектор, прораб</div>
              </button>
              <button
                onClick={() => { setRole("supplier"); setStep("register-sup"); }}
                className="rounded-xl p-5 text-left transition-all"
                style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(10,132,255,0.12)", color: "#0A84FF" }}>
                  <Icon name="Truck" size={20} />
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>Поставщик</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>Поставщик товаров для строительства</div>
              </button>
            </div>
          </div>
        )}

        {/* === LOGIN === */}
        {step === "login" && (
          <div className="animate-fade-in">
            <button onClick={() => setStep("choose")} className="flex items-center gap-1 mb-6 text-sm transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)" }}>
              <Icon name="ChevronLeft" size={16} /> Назад
            </button>
            <h1 className="text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>Вход</h1>
            <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>Введите данные вашего аккаунта</p>
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
            >
              <InputField label="Email" k="email" type="email" placeholder="you@company.ru" error={errors.email} />
              <InputField label="Пароль" k="password" type="password" placeholder="••••••••" error={errors.password} />
              <button className="text-xs text-right w-full" style={{ color: "var(--orange)" }}>Забыли пароль?</button>
              <button
                onClick={handleLogin}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: "var(--orange)", color: "#000" }}
              >
                Войти
              </button>
            </div>
            <p className="text-center text-sm mt-4" style={{ color: "var(--text-muted)" }}>
              Нет аккаунта?{" "}
              <button onClick={() => setStep("choose")} style={{ color: "var(--orange)" }}>
                Зарегистрироваться
              </button>
            </p>
            {/* Demo entry */}
            <button
              onClick={() => onAuth({ name: "Алексей И.", email: "demo@komplekto.ai", role: "professional", verified: true })}
              className="mt-3 w-full py-3 rounded-xl text-sm transition-all"
              style={{ border: "1px dashed var(--border-bright)", color: "var(--text-muted)" }}
            >
              Войти как демо-пользователь
            </button>
          </div>
        )}

        {/* === REGISTER PROFESSIONAL === */}
        {step === "register-pro" && (
          <div className="animate-fade-in">
            <button onClick={() => setStep("choose")} className="flex items-center gap-1 mb-6 text-sm hover:opacity-70" style={{ color: "var(--text-muted)" }}>
              <Icon name="ChevronLeft" size={16} /> Назад
            </button>
            <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Регистрация</h1>
            <div className="flex items-center gap-2 mb-6">
              <span className="tag tag-orange">Профессионал</span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>· дизайнер, строитель, архитектор</span>
            </div>
            <div className="rounded-2xl p-6 space-y-4" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Имя и фамилия" k="name" placeholder="Алексей Иванов" error={errors.name} />
                <SelectField label="Специализация" k="profession" options={professions} placeholder="Выберите" error={errors.profession} />
              </div>
              <InputField label="Email" k="email" type="email" placeholder="you@company.ru" error={errors.email} />
              <InputField label="Телефон" k="phone" type="tel" placeholder="+7 (900) 000-00-00" error={errors.phone} />
              <InputField label="Компания (необязательно)" k="company" placeholder="Название студии или компании" />
              <InputField label="Город" k="city" placeholder="Москва" />
              <InputField label="Пароль" k="password" type="password" placeholder="Минимум 6 символов" error={errors.password} />
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  className="w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 flex-shrink-0"
                  style={{ borderColor: errors.agree ? "#FF3B30" : agree ? "var(--orange)" : "var(--border-bright)", background: agree ? "var(--orange)" : "transparent" }}
                  onClick={() => setAgree(!agree)}
                >
                  {agree && <Icon name="Check" size={12} style={{ color: "#000" }} />}
                </div>
                <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Я принимаю{" "}
                  <span style={{ color: "var(--orange)" }}>условия использования</span>
                  {" "}и{" "}
                  <span style={{ color: "var(--orange)" }}>политику конфиденциальности</span>
                </span>
              </label>
              {errors.agree && <p className="text-xs" style={{ color: "#FF3B30" }}>{errors.agree}</p>}
              <button
                onClick={handleRegisterPro}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: "var(--orange)", color: "#000" }}
              >
                Создать аккаунт
              </button>
            </div>
            <p className="text-center text-sm mt-4" style={{ color: "var(--text-muted)" }}>
              Уже есть аккаунт?{" "}
              <button onClick={() => setStep("login")} style={{ color: "var(--orange)" }}>Войти</button>
            </p>
          </div>
        )}

        {/* === REGISTER SUPPLIER === */}
        {step === "register-sup" && (
          <div className="animate-fade-in">
            <button onClick={() => setStep("choose")} className="flex items-center gap-1 mb-6 text-sm hover:opacity-70" style={{ color: "var(--text-muted)" }}>
              <Icon name="ChevronLeft" size={16} /> Назад
            </button>
            <h1 className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>Регистрация поставщика</h1>
            <div className="flex items-center gap-2 mb-6">
              <span className="tag tag-blue">Поставщик</span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>· требуется верификация</span>
            </div>
            <div className="rounded-2xl p-6 space-y-4" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <InputField label="Название компании" k="company" placeholder="ООО «Название»" error={errors.company} />
              <div className="grid grid-cols-2 gap-3">
                <InputField label="ИНН" k="inn" placeholder="7700000000" error={errors.inn} hint="10 или 12 цифр" />
                <SelectField label="Категория товаров" k="category" options={supplierCategories} placeholder="Выберите" error={errors.category} />
              </div>
              <InputField label="Контактный email" k="email" type="email" placeholder="sales@company.ru" error={errors.email} />
              <InputField label="Телефон" k="phone" type="tel" placeholder="+7 (900) 000-00-00" error={errors.phone} />
              <InputField label="Сайт компании (необязательно)" k="site" placeholder="https://company.ru" />
              <InputField label="Город / Регион" k="city" placeholder="Москва и МО" />
              <InputField label="Пароль" k="password" type="password" placeholder="Минимум 6 символов" error={errors.password} />

              <div className="rounded-xl p-4" style={{ background: "rgba(10,132,255,0.08)", border: "1px solid rgba(10,132,255,0.2)" }}>
                <div className="flex items-start gap-2">
                  <Icon name="Info" size={14} style={{ color: "#0A84FF", marginTop: 1, flexShrink: 0 }} />
                  <p className="text-xs leading-relaxed" style={{ color: "#0A84FF" }}>
                    Для поставщиков обязательна верификация. После регистрации наш менеджер свяжется с вами в течение 1–2 рабочих дней.
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  className="w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 flex-shrink-0"
                  style={{ borderColor: agree ? "var(--orange)" : "var(--border-bright)", background: agree ? "var(--orange)" : "transparent" }}
                  onClick={() => setAgree(!agree)}
                >
                  {agree && <Icon name="Check" size={12} style={{ color: "#000" }} />}
                </div>
                <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Я принимаю{" "}<span style={{ color: "var(--orange)" }}>условия для поставщиков</span>{" "}и{" "}
                  <span style={{ color: "var(--orange)" }}>политику конфиденциальности</span>
                </span>
              </label>
              {errors.agree && <p className="text-xs" style={{ color: "#FF3B30" }}>{errors.agree}</p>}

              <button
                onClick={handleRegisterSup}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: "var(--orange)", color: "#000" }}
              >
                Подать заявку
              </button>
            </div>
          </div>
        )}

        {/* === VERIFY UPLOAD === */}
        {step === "verify" && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>Верификация</h1>
            <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
              Для активации аккаунта загрузите документы. Это займёт 1–2 рабочих дня.
            </p>

            <div className="space-y-3 mb-6">
              {(role === "professional"
                ? [
                    { icon: "User", label: "Фото удостоверения личности", hint: "Паспорт или водительское удостоверение" },
                    { icon: "Briefcase", label: "Подтверждение профессии", hint: "Диплом, портфолио или лицензия" },
                  ]
                : [
                    { icon: "FileText", label: "Свидетельство о регистрации", hint: "ОГРН или ИНН юрлица" },
                    { icon: "Package", label: "Прайс-лист или каталог", hint: "Актуальный прайс товаров" },
                    { icon: "Building2", label: "Реквизиты компании", hint: "Юридический адрес и банковские реквизиты" },
                  ]
              ).map((doc, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-all"
                  style={{ background: "var(--surface-3)", border: "1px dashed var(--border-bright)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--orange)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-bright)")}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--surface-4)", color: "var(--text-muted)" }}>
                    <Icon name={doc.icon} size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{doc.label}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{doc.hint}</div>
                  </div>
                  <Icon name="Upload" size={16} style={{ color: "var(--text-muted)" }} />
                </div>
              ))}
            </div>

            <button
              onClick={handleVerifySubmit}
              className="w-full py-3.5 rounded-xl font-bold text-sm mb-3 transition-all"
              style={{ background: "var(--orange)", color: "#000" }}
            >
              Отправить на проверку
            </button>
            <button
              onClick={() => onAuth({ name: form.name || form.company || "Пользователь", email: form.email, role, verified: false })}
              className="w-full py-3 rounded-xl text-sm"
              style={{ border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
            >
              Пропустить, загружу позже
            </button>
          </div>
        )}

        {/* === VERIFY PENDING === */}
        {step === "verify-pending" && (
          <div className="animate-fade-in text-center">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 pulse-orange"
              style={{ background: "rgba(255,122,0,0.12)", color: "var(--orange)" }}
            >
              <Icon name="Clock" size={40} />
            </div>
            <h1 className="text-2xl font-black mb-3" style={{ color: "var(--text-primary)" }}>
              Документы на проверке
            </h1>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Ваши документы отправлены на верификацию. Мы проверим их в течение{" "}
              <strong style={{ color: "var(--orange)" }}>1–2 рабочих дней</strong>{" "}
              и уведомим вас по email.
            </p>

            <div className="rounded-2xl p-5 mb-6 text-left space-y-3" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              {[
                { step: "1", label: "Документы получены", done: true },
                { step: "2", label: "Проверка менеджером", done: false },
                { step: "3", label: "Активация аккаунта", done: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: s.done ? "rgba(52,199,89,0.15)" : "var(--surface-4)",
                      color: s.done ? "#34C759" : "var(--text-muted)",
                      border: `1px solid ${s.done ? "rgba(52,199,89,0.3)" : "var(--border-color)"}`,
                    }}
                  >
                    {s.done ? <Icon name="Check" size={12} /> : s.step}
                  </div>
                  <span className="text-sm" style={{ color: s.done ? "var(--text-primary)" : "var(--text-muted)" }}>{s.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onAuth({ name: form.name || form.company || "Пользователь", email: form.email, role, verified: false })}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all"
              style={{ background: "var(--orange)", color: "#000" }}
            >
              Войти в ограниченный режим
            </button>
            <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
              В ограниченном режиме доступен просмотр каталога и KOMI AI
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
