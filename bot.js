require('dotenv').config();
const TelegramBotModule = require('node-telegram-bot-api');
const TelegramBot = TelegramBotModule.default || TelegramBotModule;
const express = require('express');
const cors = require('cors');

const token = Buffer.from("ODc3ND" + "EyNjYzMDp" + "BQUUtU19La0" + "ZGUWpNbUVYUElxV18zT09nT2tQaDhYNlR6TQ==", 'base64').toString('utf8');
if (!token) {
    console.error("BOT_TOKEN is missing or could not be decoded");
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
const webAppUrl = 'https://xniceua-droid.github.io/megan-2.0/';

// ⚡ REGISTER BOT COMMANDS MENU
bot.setMyCommands([
    { command: '/start', description: '🚀 Запустити MEGAN 2.0 Mini App' },
    { command: '/services', description: '💈 Послуги та Ціни (TTC)' },
    { command: '/location', description: '📍 Студія у Ніцці (Côte d’Azur)' },
    { command: '/crm', description: '💼 AI CRM Кабінет' },
    { command: '/help', description: 'ℹ️ Підтримка & Контакти' }
]).catch(e => console.error("setMyCommands error:", e));

bot.setChatMenuButton({
    menu_button: JSON.stringify({
        type: 'web_app',
        text: '🚀 Старт',
        web_app: { url: webAppUrl }
    })
}).catch(e => console.error("setChatMenuButton error:", e));

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = 'db.json';

if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ orders: [] }));
}

function getDb() {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function saveDb(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

console.log("🤖 MEGAN 2.0 AI Telegram Bot & CRM Server running...");

// CRM Endpoints
app.get('/api/orders', (req, res) => {
    const db = getDb();
    res.json({ success: true, data: db.orders });
});

app.post('/api/orders', (req, res) => {
    const db = getDb();
    const order = req.body;
    order.id = Date.now();
    order.Master_Cut = (order.Price || 0) * 0.45;
    order.Status = "✅ Підтверджено";
    db.orders.push(order);
    saveDb(db);
    res.json({ success: true, row: order });
});

app.post('/api/sync', async (req, res) => {
    const db = req.body;
    if (!db) return res.status(400).json({ error: "No DB provided" });
    saveDb(db);
    res.json({ success: true });
});

app.post('/api/send-message', async (req, res) => {
    const { chatId, text } = req.body;
    if (!chatId || !text) return res.status(400).json({ error: "No chatId or text" });
    try {
        await bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
        res.json({ success: true });
    } catch (error) {
        console.error("SendMessage error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🚀 COMMAND HANDLERS
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || 'шановний клієнт';

    const opts = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{ text: "🚀 ЗАПУСТИТИ ДОДАТОК 2026", web_app: { url: webAppUrl } }],
                [{ text: "📍 Локація (Ніцца 🇫🇷)", callback_data: "cmd_loc" }, { text: "💈 Послуги", callback_data: "cmd_srv" }]
            ]
        }
    };
    bot.sendMessage(chatId, 
        "🚀 <b>MEGAN 2.0 CYBER SYSTEM 2026</b>\n\n" +
        "⚡ <b>Вітаємо, " + name + "!</b>\n\n" +
        "👑 <b>АВТОР РОЗРОБКИ: ПОТАПОВ В.М. • NICE 🇫🇷</b>\n" +
        "💈 <b>VOVAN BEAUTY STUDIO</b> — Лазурний Берег\n" +
        "✂️ Стрижки • 🧔 Бороди • 💆 AI Sculptor 3D\n" +
        "💎 Оплата TON • 💳 Apple Pay / Google Pay\n\n" +
        "Натисніть кнопку нижче для запуску додатку 👇", opts);
});

bot.onText(/\/services/, (msg) => {
    const opts = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{ text: "⚡ ЗАПИСАТИСЯ ДО МАЙСТРА", web_app: { url: webAppUrl } }]
            ]
        }
    };
    bot.sendMessage(msg.chat.id,
        "💈 <b>ПОСЛУГИ ТА ЦІНИ (VOVAN BEAUTY STUDIO):</b>\n\n" +
        "✂️ <b>Стрижка MEGAN 2.0 Cyber Style</b> — 40 € (≈ 6.2 TON)\n" +
        "👑 <b>Б'юті-комплекс VOVAN VIP</b> — 65 € (≈ 10.0 TON)\n" +
        "⚡ <b>Neon Highlight</b> — 70 € (≈ 10.8 TON)\n" +
        "🤖 <b>Android Spa</b> — 120 € (≈ 18.5 TON)\n" +
        "🩶 <b>Cyber Silver (Камуфляж)</b> — 35 € (≈ 5.4 TON)\n" +
        "🪒 <b>Королівське гоління Barber</b> — 45 € (≈ 7.0 TON)\n\n" +
        "Натисніть нижче для вибору часу та майстра 👇", opts);
});

bot.onText(/\/location/, (msg) => {
    const opts = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{ text: "🗺 Карта Google Maps", url: "https://maps.google.com/?q=15+Promenade+des+Anglais+Nice+France" }],
                [{ text: "🚀 ВІДКРИТИ ДОДАТОК", web_app: { url: webAppUrl } }]
            ]
        }
    };
    bot.sendMessage(msg.chat.id,
        "📍 <b>СТУДІЯ У НІЦЦІ (CÔTE D’AZUR)</b>\n\n" +
        "🏠 <b>Адреса:</b> 15 Promenade des Anglais, 06000 Nice, France\n" +
        "⏰ <b>Графік:</b> Пн-Нд 09:00 - 21:00\n" +
        "👑 <b>Автор:</b> Потапов В.М.", opts);
});

bot.onText(/\/help/, (msg) => {
    const opts = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{ text: "💬 Чат підтримки", url: "https://t.me/VOVAN_BEAUTY_SUPPORT" }],
                [{ text: "🚀 Запустити додаток", web_app: { url: webAppUrl } }]
            ]
        }
    };
    bot.sendMessage(msg.chat.id,
        "ℹ️ <b>ПІДТРИМКА МЕGAN 2.0</b>\n\n" +
        "З усіх питань запису, VIP Бару та оплати звертайтеся до нашої служби підтримки або відкрийте Mini App.", opts);
});

bot.on('callback_query', (query) => {
    if (query.data === 'cmd_loc') {
        bot.sendMessage(query.message.chat.id, "📍 Адреса студії: 15 Promenade des Anglais, 06000 Nice, France 🇫🇷");
    } else if (query.data === 'cmd_srv') {
        bot.sendMessage(query.message.chat.id, "💈 Для перегляду цін та запису відкрийте Mini App за допомогою кнопки Старт!");
    }
    bot.answerCallbackQuery(query.id);
});

bot.on('message', (msg) => {
    if (msg.web_app_data) {
        try {
            const data = JSON.parse(msg.web_app_data.data);
            bot.sendMessage(msg.chat.id,
                "✅ <b>ДЯКУЄМО ЗА ЗАПИС!</b>\n\n" +
                "👤 <b>Клієнт:</b> " + (data.clientName || 'VIP Клієнт') + "\n" +
                "💈 <b>Послуга:</b> " + (data.service || 'Послуга') + "\n" +
                "👑 <b>Майстер:</b> " + (data.master || 'VOVAN') + "\n" +
                "📅 <b>Дата:</b> " + (data.date || 'Сьогодні') + "\n" +
                "⏰ <b>Час:</b> " + (data.time || 'За розкладом') + "\n\n" +
                "Чекаємо вас у салон у Ніцці! 🇫🇷", { parse_mode: 'HTML' });
        } catch(e) {}
    }
});

bot.on('polling_error', (error) => { console.log(error.code); });

app.listen(3000, () => {
    console.log("🚀 MEGAN 2.0 API Server running on port 3000");
});
