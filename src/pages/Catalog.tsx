import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

const categories = [
  { id: "all", label: "Все", icon: "Grid3X3", count: 340218 },
  { id: "plumbing", label: "Сантехника", icon: "Droplets", count: 18420 },
  { id: "tile", label: "Плитка", icon: "Square", count: 42800 },
  { id: "lighting", label: "Освещение", icon: "Lightbulb", count: 23500 },
  { id: "furniture", label: "Мебель", icon: "Armchair", count: 67000 },
  { id: "electrical", label: "Электрика", icon: "Zap", count: 31000 },
  { id: "doors", label: "Двери", icon: "DoorOpen", count: 9800 },
  { id: "kitchen", label: "Кухни", icon: "ChefHat", count: 5600 },
  { id: "decor", label: "Декор", icon: "Palette", count: 88000 },
];

const allBrands = ["Villeroy & Boch", "Grohe", "Hansgrohe", "Artemide", "Flos", "Kerama Marazzi", "Emil Ceramica", "IKEA", "Philips", "Legrand", "Ravak", "Jacob Delafon", "Roca", "Fap Ceramiche", "Leicht"];

const products = [
  {
    id: 1, name: "Унитаз подвесной Villeroy & Boch Subway 2.0", brand: "Villeroy & Boch", sku: "VB-5614R001",
    category: "plumbing", price: 42800, oldPrice: 54000, rating: 4.8, reviews: 234,
    stock: "В наличии", stockColor: "#34C759", suppliers: 3, delivery: "3–5 дней", tag: "Хит", tagColor: "orange",
    description: "Подвесной унитаз серии Subway 2.0 — безободковая конструкция DirectFlush. Глазурь CeramicPlus отталкивает загрязнения.",
    specs: [{ k: "Тип", v: "Подвесной, безободковый" }, { k: "Размер", v: "370×560×345 мм" }, { k: "Материал", v: "Санфарфор" }, { k: "Гарантия", v: "5 лет" }, { k: "Страна", v: "Германия" }],
    supplierList: [{ name: "ТД Аквасфера", price: 42800, stock: "В наличии", delivery: "3–5 дн", rating: 4.9 }, { name: "SanPro Москва", price: 45200, stock: "В наличии", delivery: "1–2 дн", rating: 4.6 }, { name: "BathPro", price: 46000, stock: "В наличии", delivery: "2–3 дн", rating: 4.5 }],
    analogues: [{ name: "Roca Nexo Rimless", price: 28400, saving: "−34%" }, { name: "Cersanit City", price: 18900, saving: "−56%" }],
  },
  {
    id: 2, name: "Плитка Emil Ceramica Tele di Marmo 60×60", brand: "Emil Ceramica", sku: "EC-TDM-6060",
    category: "tile", price: 3840, oldPrice: null, rating: 4.9, reviews: 187,
    stock: "В наличии", stockColor: "#34C759", suppliers: 5, delivery: "1–3 дня", tag: "Новинка", tagColor: "blue",
    description: "Крупноформатный керамогранит, имитирует натуральный мрамор с фотографической точностью.",
    specs: [{ k: "Размер", v: "600×600×9 мм" }, { k: "Поверхность", v: "Полированная" }, { k: "Класс нагрузки", v: "PEI 4" }, { k: "Страна", v: "Италия" }, { k: "Упаковка", v: "1.44 м² / 4 шт" }],
    supplierList: [{ name: "Cerama Nova", price: 3840, stock: "В наличии", delivery: "1–3 дн", rating: 4.7 }, { name: "Bella Ceramica", price: 3950, stock: "Под заказ", delivery: "7–10 дн", rating: 4.8 }],
    analogues: [{ name: "Kerama Marazzi Монсеррат", price: 2100, saving: "−45%" }, { name: "Laparet Olimpus", price: 1640, saving: "−57%" }],
  },
  {
    id: 3, name: "Смеситель термостатический Grohe Grohtherm 3000", brand: "Grohe", sku: "GR-34274002",
    category: "plumbing", price: 28600, oldPrice: 34000, rating: 4.7, reviews: 412,
    stock: "В наличии", stockColor: "#34C759", suppliers: 4, delivery: "2–4 дня", tag: "−16%", tagColor: "green",
    description: "Встраиваемый термостатический смеситель с SafeStop 38°C и технологией TurboStat.",
    specs: [{ k: "Тип", v: "Термостатический" }, { k: "Расход воды", v: "35 л/мин" }, { k: "Покрытие", v: "StarLight Chrome" }, { k: "Гарантия", v: "5 лет" }, { k: "Страна", v: "Германия" }],
    supplierList: [{ name: "Grohe Official", price: 28600, stock: "В наличии", delivery: "2–4 дн", rating: 4.9 }, { name: "ТД Аквасфера", price: 29800, stock: "В наличии", delivery: "3–5 дн", rating: 4.9 }],
    analogues: [{ name: "Hansgrohe Ecostat 1001", price: 19400, saving: "−32%" }, { name: "Omnires Y", price: 14200, saving: "−50%" }],
  },
  {
    id: 4, name: "Подвесной светильник Artemide Pirce L", brand: "Artemide", sku: "AR-PIRCE-L",
    category: "lighting", price: 187000, oldPrice: null, rating: 5.0, reviews: 45,
    stock: "Под заказ", stockColor: "#FFD60A", suppliers: 2, delivery: "14–21 день", tag: "Premium", tagColor: "yellow",
    description: "Культовый итальянский светильник. Спиральная алюминиевая структура, диммер в комплекте. Дизайн Карим Рашид.",
    specs: [{ k: "Диаметр", v: "1200 мм" }, { k: "LED", v: "105W, 3000K" }, { k: "Управление", v: "Диммер" }, { k: "Страна", v: "Италия" }, { k: "IP", v: "IP20" }],
    supplierList: [{ name: "Sviet Design", price: 187000, stock: "Под заказ", delivery: "14–21 дн", rating: 5.0 }, { name: "LightPro Москва", price: 194000, stock: "Под заказ", delivery: "21–28 дн", rating: 4.6 }],
    analogues: [{ name: "Flos Skygarden", price: 84000, saving: "−55%" }, { name: "De Majo Dolce Vita", price: 61000, saving: "−67%" }],
  },
  {
    id: 5, name: "Ванна акриловая Jacob Delafon Escal 170×75", brand: "Jacob Delafon", sku: "JD-E5BA098L",
    category: "plumbing", price: 67400, oldPrice: 82000, rating: 4.6, reviews: 98,
    stock: "В наличии", stockColor: "#34C759", suppliers: 3, delivery: "5–7 дней", tag: "−18%", tagColor: "green",
    description: "Акриловая ванна асимметричной формы с подголовником. Акрил 7 мм, металлический каркас.",
    specs: [{ k: "Размер", v: "1700×750×580 мм" }, { k: "Объём", v: "280 л" }, { k: "Материал", v: "Акрил 7 мм" }, { k: "Гарантия", v: "10 лет" }, { k: "Страна", v: "Франция" }],
    supplierList: [{ name: "ТД Аквасфера", price: 67400, stock: "В наличии", delivery: "5–7 дн", rating: 4.9 }, { name: "BathPro", price: 69800, stock: "В наличии", delivery: "3–5 дн", rating: 4.5 }],
    analogues: [{ name: "Ravak Classic 170", price: 38000, saving: "−44%" }, { name: "STWORKI Монтэ 170", price: 29900, saving: "−56%" }],
  },
  {
    id: 6, name: "Душевой поддон Ravak Gigant Pro 80×80", brand: "Ravak", sku: "RV-XA03G401010",
    category: "plumbing", price: 18900, oldPrice: null, rating: 4.5, reviews: 156,
    stock: "В наличии", stockColor: "#34C759", suppliers: 6, delivery: "1–2 дня", tag: null, tagColor: null,
    description: "Мелкий акриловый поддон с антискользящим покрытием SlimLine и регулируемыми ножками.",
    specs: [{ k: "Размер", v: "800×800×30 мм" }, { k: "Нагрузка", v: "200 кг" }, { k: "Гарантия", v: "10 лет" }, { k: "Страна", v: "Чехия" }],
    supplierList: [{ name: "ТД Аквасфера", price: 18900, stock: "В наличии", delivery: "1–2 дн", rating: 4.9 }, { name: "SanPro Москва", price: 19400, stock: "В наличии", delivery: "2–3 дн", rating: 4.6 }],
    analogues: [{ name: "BAS Nevada 80×80", price: 12400, saving: "−34%" }, { name: "Lemark Base 80×80", price: 9800, saving: "−48%" }],
  },
  {
    id: 7, name: "Светильник Flos Skygarden 320", brand: "Flos", sku: "FL-SKY-320",
    category: "lighting", price: 84000, oldPrice: null, rating: 4.9, reviews: 67,
    stock: "Под заказ", stockColor: "#FFD60A", suppliers: 2, delivery: "10–14 дней", tag: "Бестселлер", tagColor: "orange",
    description: "Подвесной светильник с лепным гипсовым декором. Дизайн Марсель Вандерс.",
    specs: [{ k: "Диаметр", v: "320 мм" }, { k: "Материал", v: "Гипс, алюминий" }, { k: "Лампа", v: "E27, до 60W" }, { k: "Страна", v: "Италия" }],
    supplierList: [{ name: "Sviet Design", price: 84000, stock: "Под заказ", delivery: "10–14 дн", rating: 5.0 }, { name: "LightPro Москва", price: 88000, stock: "Под заказ", delivery: "14–21 дн", rating: 4.6 }],
    analogues: [{ name: "Nowodvorski Cameleon", price: 24000, saving: "−71%" }, { name: "Ideal Lux Blow", price: 18600, saving: "−78%" }],
  },
  {
    id: 8, name: "Kerama Marazzi Монсеррат белый 60×60", brand: "Kerama Marazzi", sku: "KM-SG60MONT",
    category: "tile", price: 2100, oldPrice: 2600, rating: 4.7, reviews: 521,
    stock: "В наличии", stockColor: "#34C759", suppliers: 8, delivery: "1–2 дня", tag: "Хит", tagColor: "orange",
    description: "Популярный керамогранит под мрамор российского производства. Отличное качество по доступной цене.",
    specs: [{ k: "Размер", v: "600×600×10 мм" }, { k: "Поверхность", v: "Лаппатированная" }, { k: "Страна", v: "Россия" }, { k: "Упаковка", v: "1.44 м² / 4 шт" }],
    supplierList: [{ name: "ПлиткаОпт", price: 2100, stock: "В наличии", delivery: "1–2 дн", rating: 4.4 }, { name: "Cerama Nova", price: 2300, stock: "В наличии", delivery: "1–3 дн", rating: 4.7 }, { name: "Bella Ceramica", price: 2250, stock: "В наличии", delivery: "2–4 дн", rating: 4.8 }],
    analogues: [{ name: "Laparet Olimpus White", price: 1640, saving: "−22%" }, { name: "Global Tile Mramor", price: 1420, saving: "−32%" }],
  },
  {
    id: 9, name: "Hansgrohe Ecostat 1001 CL термостат", brand: "Hansgrohe", sku: "HG-13211000",
    category: "plumbing", price: 19400, oldPrice: null, rating: 4.6, reviews: 289,
    stock: "В наличии", stockColor: "#34C759", suppliers: 3, delivery: "2–3 дня", tag: null, tagColor: null,
    description: "Встраиваемый термостат для ванны/душа. Индивидуальная регулировка температуры. SafeStop 38°C.",
    specs: [{ k: "Тип", v: "Встраиваемый термостат" }, { k: "Расход", v: "20 л/мин" }, { k: "Страна", v: "Германия" }, { k: "Гарантия", v: "3 года" }],
    supplierList: [{ name: "Grohe Official", price: 19400, stock: "В наличии", delivery: "2–3 дн", rating: 4.9 }, { name: "ТД Аквасфера", price: 20200, stock: "В наличии", delivery: "3–5 дн", rating: 4.9 }],
    analogues: [{ name: "Omnires Y Chrome", price: 14200, saving: "−27%" }, { name: "Vitra Solid S", price: 11800, saving: "−39%" }],
  },
  {
    id: 10, name: "IKEA KALLAX стеллаж 182×77", brand: "IKEA", sku: "IK-KALLAX-8",
    category: "furniture", price: 12990, oldPrice: null, rating: 4.4, reviews: 1240,
    stock: "В наличии", stockColor: "#34C759", suppliers: 1, delivery: "1–3 дня", tag: null, tagColor: null,
    description: "Универсальный стеллаж с 8 ячейками. Подходит для хранения, разделения комнаты или как TV-тумба.",
    specs: [{ k: "Размер", v: "182×77×39 см" }, { k: "Ячеек", v: "8 шт" }, { k: "Нагрузка", v: "13 кг/полку" }, { k: "Материал", v: "ДСП меламин" }, { k: "Страна", v: "Польша" }],
    supplierList: [{ name: "МебельЭксперт", price: 12990, stock: "В наличии", delivery: "1–3 дн", rating: 4.3 }],
    analogues: [{ name: "Hoff Mono стеллаж", price: 8990, saving: "−31%" }, { name: "Leroy Merlin Basic", price: 6800, saving: "−48%" }],
  },
  {
    id: 11, name: "Legrand Inspiria розетка двойная с USB", brand: "Legrand", sku: "LG-673620",
    category: "electrical", price: 3200, oldPrice: 4100, rating: 4.6, reviews: 342,
    stock: "В наличии", stockColor: "#34C759", suppliers: 4, delivery: "1–2 дня", tag: "−22%", tagColor: "green",
    description: "Двойная розетка с двумя USB-A портами (2.1А). Стиль Inspiria — плоский дизайн, белый цвет.",
    specs: [{ k: "Ток", v: "16А" }, { k: "USB", v: "2×USB-A 2.1А" }, { k: "Степень защиты", v: "IP21" }, { k: "Страна", v: "Франция" }],
    supplierList: [{ name: "Electro Pro", price: 3200, stock: "В наличии", delivery: "1–2 дн", rating: 4.4 }, { name: "ElectroMir", price: 3450, stock: "В наличии", delivery: "2–4 дн", rating: 4.3 }],
    analogues: [{ name: "Schneider Asfora USB", price: 2100, saving: "−34%" }, { name: "ABB Basic55 USB", price: 1640, saving: "−49%" }],
  },
  {
    id: 12, name: "Porta Doors эко-шпон Порта-21 Wenge", brand: "Porta Doors", sku: "PD-P21-WE-70",
    category: "doors", price: 14800, oldPrice: null, rating: 4.5, reviews: 178,
    stock: "В наличии", stockColor: "#34C759", suppliers: 2, delivery: "5–7 дней", tag: null, tagColor: null,
    description: "Межкомнатная дверь Порта-21 в эко-шпоне венге. Полотно 70×200 см, притвор 10 мм. Комплектующие в наборе.",
    specs: [{ k: "Размер", v: "70×200×3.5 см" }, { k: "Материал", v: "Эко-шпон, МДФ" }, { k: "Цвет", v: "Венге" }, { k: "Страна", v: "Россия" }],
    supplierList: [{ name: "ДверейМного", price: 14800, stock: "В наличии", delivery: "5–7 дн", rating: 4.2 }, { name: "ДвериОпт", price: 15600, stock: "В наличии", delivery: "3–5 дн", rating: 4.5 }],
    analogues: [{ name: "Profil Doors 8X Wenge", price: 11200, saving: "−24%" }, { name: "Velldoris 100U", price: 9800, saving: "−34%" }],
  },
  {
    id: 13, name: "Кухня Leicht Carre Pure Matt", brand: "Leicht", sku: "LT-CARRE-PM",
    category: "kitchen", price: 480000, oldPrice: null, rating: 4.9, reviews: 12,
    stock: "Под заказ", stockColor: "#FFD60A", suppliers: 1, delivery: "45–60 дней", tag: "Premium", tagColor: "yellow",
    description: "Немецкий кухонный гарнитур в матовом исполнении. Фасады Carre Pure, фурнитура Blum. Изготовление под заказ.",
    specs: [{ k: "Стиль", v: "Современный / Минималистичный" }, { k: "Фасады", v: "МДФ Matt Lacquer" }, { k: "Фурнитура", v: "Blum Tandem" }, { k: "Страна", v: "Германия" }, { k: "Гарантия", v: "15 лет" }],
    supplierList: [{ name: "КухниПроф", price: 480000, stock: "Под заказ", delivery: "45–60 дн", rating: 4.7 }],
    analogues: [{ name: "Rational iLive Matt", price: 320000, saving: "−33%" }, { name: "Häcker Systemat", price: 280000, saving: "−42%" }],
  },
  {
    id: 14, name: "Fap Ceramiche Roma Stone 75×75", brand: "Fap Ceramiche", sku: "FAP-RS7575",
    category: "tile", price: 4200, oldPrice: null, rating: 4.8, reviews: 94,
    stock: "В наличии", stockColor: "#34C759", suppliers: 3, delivery: "2–5 дней", tag: "Новинка", tagColor: "blue",
    description: "Крупноформатный керамогранит под натуральный камень. Матовая поверхность, 4 декора, прямоугольный рельеф.",
    specs: [{ k: "Размер", v: "750×750×10 мм" }, { k: "Поверхность", v: "Матовая рельефная" }, { k: "Класс нагрузки", v: "PEI 5" }, { k: "Страна", v: "Италия" }],
    supplierList: [{ name: "Bella Ceramica", price: 4200, stock: "В наличии", delivery: "2–5 дн", rating: 4.8 }, { name: "Cerama Nova", price: 4400, stock: "В наличии", delivery: "1–3 дн", rating: 4.7 }],
    analogues: [{ name: "Italon Contempora", price: 2800, saving: "−33%" }, { name: "Cersanit Normandie", price: 1900, saving: "−55%" }],
  },
  {
    id: 15, name: "Philips Hue Play Gradient накладной", brand: "Philips", sku: "PH-HUE-PLAY",
    category: "lighting", price: 8900, oldPrice: null, rating: 4.7, reviews: 203,
    stock: "В наличии", stockColor: "#34C759", suppliers: 2, delivery: "1–2 дня", tag: null, tagColor: null,
    description: "Умный накладной LED-светильник с поддержкой 16 млн цветов. Управление через Hue Bridge, голосом или приложением.",
    specs: [{ k: "Тип", v: "LED накладной" }, { k: "Мощность", v: "6W" }, { k: "Цветов", v: "16 млн" }, { k: "Управление", v: "Bluetooth / Hue Bridge" }, { k: "Страна", v: "Нидерланды" }],
    supplierList: [{ name: "LightPro Москва", price: 8900, stock: "В наличии", delivery: "1–2 дн", rating: 4.6 }, { name: "Electro Pro", price: 9200, stock: "В наличии", delivery: "2–3 дн", rating: 4.4 }],
    analogues: [{ name: "IKEA Tradfri панель", price: 1990, saving: "−78%" }, { name: "Yeelight LED strip", price: 2400, saving: "−73%" }],
  },
  {
    id: 16, name: "IKEA BESTÅ тумба с дверцами 120×42", brand: "IKEA", sku: "IK-BESTA-120",
    category: "furniture", price: 18990, oldPrice: 22990, rating: 4.3, reviews: 876,
    stock: "В наличии", stockColor: "#34C759", suppliers: 1, delivery: "1–3 дня", tag: "−17%", tagColor: "green",
    description: "Тумба BESTÅ с двумя дверцами Selsviken — глянцевый белый. Плавное закрывание Softclose.",
    specs: [{ k: "Размер", v: "120×42×38 см" }, { k: "Дверцы", v: "Selsviken глянец белый" }, { k: "Петли", v: "Softclose" }, { k: "Страна", v: "Польша / Китай" }],
    supplierList: [{ name: "МебельЭксперт", price: 18990, stock: "В наличии", delivery: "1–3 дн", rating: 4.3 }],
    analogues: [{ name: "Hoff Basic тумба 120", price: 11200, saving: "−41%" }, { name: "MrMark Basel 120", price: 9800, saving: "−48%" }],
  },
  {
    id: 17, name: "ABB Basic55 выключатель двойной", brand: "ABB", sku: "ABB-2CDS272101R0011",
    category: "electrical", price: 890, oldPrice: null, rating: 4.5, reviews: 567,
    stock: "В наличии", stockColor: "#34C759", suppliers: 5, delivery: "1–2 дня", tag: null, tagColor: null,
    description: "Двойной клавишный выключатель серии Basic55. Белый глянцевый пластик, монтаж под рамку.",
    specs: [{ k: "Тип", v: "Двойной выключатель" }, { k: "Ток", v: "10А" }, { k: "Монтаж", v: "Встраиваемый" }, { k: "Страна", v: "Германия" }],
    supplierList: [{ name: "Electro Pro", price: 890, stock: "В наличии", delivery: "1–2 дн", rating: 4.4 }, { name: "ElectroMir", price: 960, stock: "В наличии", delivery: "2–3 дн", rating: 4.3 }],
    analogues: [{ name: "Legrand Valena Life", price: 780, saving: "−12%" }, { name: "Schneider Asfora", price: 520, saving: "−42%" }],
  },
  {
    id: 18, name: "Roca Nexo Rimless унитаз подвесной", brand: "Roca", sku: "RC-A34H470000",
    category: "plumbing", price: 28400, oldPrice: 32000, rating: 4.6, reviews: 167,
    stock: "В наличии", stockColor: "#34C759", suppliers: 3, delivery: "2–4 дня", tag: "−11%", tagColor: "green",
    description: "Безободковый подвесной унитаз с технологией Rimless для лучшей гигиены. Матовая белая поверхность.",
    specs: [{ k: "Тип", v: "Подвесной, безободковый" }, { k: "Размер", v: "360×540×340 мм" }, { k: "Цвет", v: "Белый матовый" }, { k: "Гарантия", v: "5 лет" }, { k: "Страна", v: "Испания" }],
    supplierList: [{ name: "ТД Аквасфера", price: 28400, stock: "В наличии", delivery: "2–4 дн", rating: 4.9 }, { name: "BathPro", price: 29600, stock: "В наличии", delivery: "3–5 дн", rating: 4.5 }],
    analogues: [{ name: "Cersanit City Clean On", price: 18900, saving: "−34%" }, { name: "Vitra S50 Rim-Ex", price: 21400, saving: "−25%" }],
  },
];

type Product = typeof products[0];

function ProductModal({ product, onClose, inCart, onToggleCart }: { product: Product; onClose: () => void; inCart: boolean; onToggleCart: () => void }) {
  const [activeTab, setActiveTab] = useState<"specs" | "suppliers" | "analogues">("specs");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full md:max-w-3xl max-h-[92vh] md:max-h-[90vh] overflow-hidden flex flex-col animate-scale-in"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border-bright)",
          borderRadius: "20px 20px 0 0",
          ...(window.innerWidth >= 768 ? { borderRadius: 20, boxShadow: "0 40px 120px rgba(0,0,0,0.7)" } : {}),
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b" style={{ borderColor: "var(--border-color)" }}>
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{product.brand}</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: "var(--surface-4)", color: "var(--text-muted)" }}>{product.sku}</span>
              {product.tag && <span className={`tag tag-${product.tagColor}`}>{product.tag}</span>}
            </div>
            <h2 className="text-lg font-bold leading-snug" style={{ color: "var(--text-primary)" }}>{product.name}</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--surface-4)", color: "var(--text-muted)" }}>
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-5">
            {/* Price + cart */}
            <div className="md:col-span-2">
              <div className="rounded-xl p-4 mb-3" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>{product.price.toLocaleString("ru")} ₽</span>
                  {product.oldPrice && <span className="text-sm line-through mb-0.5" style={{ color: "var(--text-muted)" }}>{product.oldPrice.toLocaleString("ru")} ₽</span>}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium" style={{ color: product.stockColor }}>{product.stock}</span>
                  <span style={{ color: "var(--text-muted)" }}>·</span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{product.delivery}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <Icon key={s} name="Star" size={11} style={{ color: s <= Math.floor(product.rating) ? "#FFD60A" : "var(--surface-5)" }} />)}</div>
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{product.rating} ({product.reviews})</span>
                </div>
                <button
                  onClick={onToggleCart}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                  style={{ background: inCart ? "rgba(52,199,89,0.15)" : "var(--orange)", color: inCart ? "#34C759" : "#000", border: inCart ? "1px solid rgba(52,199,89,0.3)" : "none" }}
                >
                  {inCart ? "✓ В корзине" : "В корзину"}
                </button>
              </div>
              <div className="rounded-xl p-3 flex items-start gap-2 cursor-pointer" style={{ background: "rgba(255,122,0,0.08)", border: "1px solid rgba(255,122,0,0.2)" }}>
                <Icon name="Sparkles" size={15} style={{ color: "var(--orange)", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--orange)" }}>Спросить KOMI</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Найти аналог дешевле или добавить в проект</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="md:col-span-3">
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{product.description}</p>
              <div className="flex gap-1 mb-4 rounded-xl p-1 overflow-x-auto" style={{ background: "var(--surface-3)", width: "fit-content", maxWidth: "100%" }}>
                {(["specs", "suppliers", "analogues"] as const).map((t) => {
                  const labels = { specs: "Характеристики", suppliers: `Поставщики (${product.supplierList.length})`, analogues: "Аналоги" };
                  return (
                    <button key={t} onClick={() => setActiveTab(t)} className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                      style={{ background: activeTab === t ? "var(--surface-5)" : "transparent", color: activeTab === t ? "var(--text-primary)" : "var(--text-muted)" }}>
                      {labels[t]}
                    </button>
                  );
                })}
              </div>

              {activeTab === "specs" && (
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
                  {product.specs.map((s, i) => (
                    <div key={i} className="flex items-center py-3 px-4" style={{ borderBottom: i < product.specs.length - 1 ? "1px solid var(--border-color)" : undefined, background: i % 2 === 0 ? "var(--surface-3)" : "transparent" }}>
                      <span className="flex-1 text-sm" style={{ color: "var(--text-muted)" }}>{s.k}</span>
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{s.v}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "suppliers" && (
                <div className="space-y-2">
                  {product.supplierList.map((s, i) => (
                    <div key={i} className="rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-all"
                      style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-bright)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                    >
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: "var(--surface-4)", color: "var(--text-secondary)" }}>{s.name[0]}</div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{s.name}</div>
                        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                          <span style={{ color: s.stock === "В наличии" ? "#34C759" : "#FFD60A" }}>{s.stock}</span>
                          <span>· {s.delivery}</span>
                          <span className="flex items-center gap-0.5"><Icon name="Star" size={10} style={{ color: "#FFD60A" }} />{s.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold" style={{ color: i === 0 ? "var(--orange)" : "var(--text-primary)" }}>{s.price.toLocaleString("ru")} ₽</div>
                        {i === 0 && <div className="text-xs" style={{ color: "var(--orange)" }}>Лучшая цена</div>}
                      </div>
                      <button className="px-3 py-2 rounded-lg text-sm font-medium flex-shrink-0" style={{ background: "var(--orange)", color: "#000" }}
                        onClick={() => toast.success(`Переход к ${s.name}`)}>
                        Купить
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "analogues" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3 rounded-xl p-3" style={{ background: "rgba(255,122,0,0.08)", border: "1px solid rgba(255,122,0,0.2)" }}>
                    <Icon name="Sparkles" size={14} style={{ color: "var(--orange)" }} />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>KOMI нашёл аналоги — похожее качество, ниже цена</span>
                  </div>
                  {product.analogues.map((a, i) => (
                    <div key={i} className="rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all"
                      style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(52,199,89,0.3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-color)")}
                    >
                      <div>
                        <div className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>{a.name}</div>
                        <div className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{a.price.toLocaleString("ru")} ₽</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="tag tag-green">{a.saving}</span>
                        <button className="btn-ghost text-xs" style={{ padding: "6px 12px" }} onClick={() => toast.info(`Поиск ${a.name}`)}>Смотреть</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  const [activeCat, setActiveCat] = useState("all");
  const [cart, setCart] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [openProduct, setOpenProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMax, setPriceMax] = useState(500000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleCart = (id: number) => {
    const adding = !cart.includes(id);
    setCart((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
    const p = products.find(p => p.id === id);
    if (adding) toast.success(`${p?.name.slice(0, 30)}... добавлен в корзину`);
    else toast("Товар удалён из корзины");
  };

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (activeCat !== "all" && p.category !== activeCat) return false;
      if (p.price > priceMax) return false;
      if (inStockOnly && p.stock !== "В наличии") return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
    if (sortBy === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [activeCat, priceMax, inStockOnly, selectedBrands, searchQuery, sortBy]);

  const FilterPanel = () => (
    <div className="space-y-5">
      {/* Categories */}
      <div>
        <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Категории</div>
        <div className="space-y-0.5">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveCat(c.id)}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all text-left"
              style={{ background: activeCat === c.id ? "var(--surface-4)" : "transparent", borderLeft: activeCat === c.id ? "2px solid var(--orange)" : "2px solid transparent", color: activeCat === c.id ? "var(--text-primary)" : "var(--text-muted)" }}
              onMouseEnter={(e) => { if (activeCat !== c.id) e.currentTarget.style.background = "var(--surface-3)"; }}
              onMouseLeave={(e) => { if (activeCat !== c.id) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon name={c.icon} size={14} className="flex-shrink-0" />
              <span className="flex-1 text-sm">{c.label}</span>
              <span className="font-mono text-xs" style={{ color: "var(--text-muted)", fontSize: 10 }}>{c.count >= 1000 ? `${(c.count / 1000).toFixed(0)}K` : c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px" style={{ background: "var(--border-color)" }} />

      {/* Price */}
      <div>
        <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Цена до</div>
        <div className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>{priceMax.toLocaleString("ru")} ₽</div>
        <input type="range" min={1000} max={500000} step={1000} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full cursor-pointer" style={{ accentColor: "var(--orange)" }} />
        <div className="flex justify-between text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          <span>1 000 ₽</span><span>500 000 ₽</span>
        </div>
      </div>

      <div className="h-px" style={{ background: "var(--border-color)" }} />

      {/* Stock */}
      <div>
        <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Наличие</div>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            className="w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0"
            style={{ borderColor: inStockOnly ? "var(--orange)" : "var(--border-bright)", background: inStockOnly ? "var(--orange)" : "transparent" }}
            onClick={() => setInStockOnly(!inStockOnly)}
          >
            {inStockOnly && <Icon name="Check" size={11} style={{ color: "#000" }} />}
          </div>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Только в наличии</span>
        </label>
      </div>

      <div className="h-px" style={{ background: "var(--border-color)" }} />

      {/* Brands */}
      <div>
        <div className="text-xs font-bold mb-3 uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Бренды</div>
        {allBrands.map((b) => (
          <label key={b} className="flex items-center gap-3 mb-2.5 cursor-pointer">
            <div
              className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
              style={{ borderColor: selectedBrands.includes(b) ? "var(--orange)" : "var(--border-bright)", background: selectedBrands.includes(b) ? "var(--orange)" : "transparent" }}
              onClick={() => toggleBrand(b)}
            >
              {selectedBrands.includes(b) && <Icon name="Check" size={9} style={{ color: "#000" }} />}
            </div>
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{b}</span>
          </label>
        ))}
      </div>

      <button
        className="btn-orange w-full"
        style={{ justifyContent: "center", fontSize: 14 }}
        onClick={() => { setShowFilters(false); toast.success(`Найдено ${filtered.length} товаров`); }}
      >
        Применить · {filtered.length} товаров
      </button>
    </div>
  );

  return (
    <div className="flex h-full">
      {openProduct && (
        <ProductModal
          product={openProduct}
          onClose={() => setOpenProduct(null)}
          inCart={cart.includes(openProduct.id)}
          onToggleCart={() => toggleCart(openProduct.id)}
        />
      )}

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex md:hidden" onClick={() => setShowFilters(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative ml-auto w-72 h-full overflow-y-auto p-5" style={{ background: "var(--surface-2)", zIndex: 10 }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Фильтры</span>
              <button onClick={() => setShowFilters(false)} style={{ color: "var(--text-muted)" }}><Icon name="X" size={18} /></button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-60 flex-shrink-0 border-r overflow-y-auto" style={{ borderColor: "var(--border-color)", background: "var(--surface-2)" }}>
        <div className="p-4">
          <FilterPanel />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b sticky top-0 z-10" style={{ borderColor: "var(--border-color)", background: "var(--surface-1)" }}>
          <div>
            <h1 className="text-lg md:text-xl font-bold" style={{ color: "var(--text-primary)" }}>Каталог</h1>
            <p className="text-xs md:text-sm" style={{ color: "var(--text-muted)" }}>{filtered.length} товаров · {allBrands.length} брендов</p>
          </div>
          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button className="btn-orange text-sm" onClick={() => toast.success(`Корзина: ${cart.length} товаров`)}>
                <Icon name="ShoppingCart" size={15} />
                <span className="hidden md:inline">Корзина</span> ({cart.length})
              </button>
            )}
            {/* Mobile filter button */}
            <button
              className="md:hidden flex items-center gap-2 rounded-xl px-3 py-2 text-sm"
              style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)", color: "var(--text-secondary)" }}
              onClick={() => setShowFilters(true)}
            >
              <Icon name="SlidersHorizontal" size={15} />
              Фильтры
              {(inStockOnly || selectedBrands.length > 0 || priceMax < 500000) && (
                <span className="w-2 h-2 rounded-full" style={{ background: "var(--orange)" }} />
              )}
            </button>
            <div className="flex items-center gap-2 rounded-xl px-3 py-2 hidden md:flex" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <Icon name="SlidersHorizontal" size={14} style={{ color: "var(--text-muted)" }} />
              <select className="bg-transparent text-sm outline-none cursor-pointer" style={{ color: "var(--text-secondary)" }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Популярные</option>
                <option value="price_asc">Дешевле</option>
                <option value="price_desc">Дороже</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-5">
          {/* Search */}
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-4" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
            <Icon name="Search" size={15} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск в каталоге..."
              className="flex-1 bg-transparent outline-none text-sm" style={{ color: "var(--text-primary)" }} />
            {searchQuery && <button onClick={() => setSearchQuery("")} style={{ color: "var(--text-muted)" }}><Icon name="X" size={14} /></button>}
          </div>

          {/* KOMI banner */}
          <div className="rounded-2xl p-4 mb-5 flex items-center gap-4" style={{ background: "linear-gradient(135deg, rgba(255,122,0,0.1), rgba(255,140,26,0.04))", border: "1px solid rgba(255,122,0,0.2)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,122,0,0.2)", color: "var(--orange)" }}>
              <Icon name="Sparkles" size={20} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>KOMI подберёт товары за секунды</div>
              <div className="text-sm hidden md:block" style={{ color: "var(--text-secondary)" }}>Опишите задачу — AI найдёт лучшие варианты с оптимальной ценой</div>
            </div>
            <button className="btn-orange flex-shrink-0 text-sm" onClick={() => toast.info("Открывается KOMI AI...")}>
              <Icon name="Sparkles" size={14} />
              <span className="hidden md:inline">Спросить KOMI</span>
              <span className="md:hidden">KOMI</span>
            </button>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl" style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}>
              <Icon name="Search" size={48} style={{ color: "var(--text-muted)", opacity: 0.3, marginBottom: 16 }} />
              <p className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>Товары не найдены</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Попробуйте изменить фильтры или поисковый запрос</p>
              <button className="btn-ghost mt-4 text-sm" onClick={() => { setActiveCat("all"); setSearchQuery(""); setPriceMax(500000); setInStockOnly(false); setSelectedBrands([]); }}>
                Сбросить фильтры
              </button>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl overflow-hidden group cursor-pointer transition-all"
                style={{ background: "var(--surface-3)", border: "1px solid var(--border-color)" }}
                onClick={() => setOpenProduct(p)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-bright)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div className="relative h-40 flex items-center justify-center" style={{ background: "var(--surface-4)" }}>
                  <Icon name="Package" size={44} style={{ color: "var(--surface-5)" }} />
                  {p.tag && <span className={`absolute top-3 left-3 tag tag-${p.tagColor}`}>{p.tag}</span>}
                  <button
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "rgba(0,0,0,0.4)", color: "var(--text-muted)", backdropFilter: "blur(8px)" }}
                    onClick={(e) => { e.stopPropagation(); toast("Добавлено в избранное ♥"); }}
                  >
                    <Icon name="Heart" size={13} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-xs mb-1 font-medium" style={{ color: "var(--text-muted)" }}>{p.brand}</div>
                  <div className="text-sm font-semibold mb-3 leading-snug" style={{ color: "var(--text-primary)" }}>{p.name}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <Icon key={s} name="Star" size={10} style={{ color: s <= Math.floor(p.rating) ? "#FFD60A" : "var(--surface-5)" }} />)}</div>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{p.rating} · {p.reviews}</span>
                  </div>
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <div className="text-lg font-black" style={{ color: "var(--text-primary)" }}>{p.price.toLocaleString("ru")} ₽</div>
                      {p.oldPrice && <div className="text-sm line-through" style={{ color: "var(--text-muted)" }}>{p.oldPrice.toLocaleString("ru")} ₽</div>}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium" style={{ color: p.stockColor }}>{p.stock}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{p.delivery}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all"
                      style={{ background: cart.includes(p.id) ? "rgba(52,199,89,0.15)" : "var(--orange)", color: cart.includes(p.id) ? "#34C759" : "#000", border: cart.includes(p.id) ? "1px solid rgba(52,199,89,0.3)" : "none" }}
                      onClick={(e) => { e.stopPropagation(); toggleCart(p.id); }}
                    >
                      {cart.includes(p.id) ? "✓ В корзине" : "В корзину"}
                    </button>
                    <button
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
                      style={{ background: "var(--surface-4)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
                      onClick={(e) => { e.stopPropagation(); setOpenProduct(p); }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-5)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-4)"; }}
                    >
                      <Icon name="Maximize2" size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
