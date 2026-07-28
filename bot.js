const fs = require('fs');
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
    { command: '/booking', description: '✂️ Миттєвий Запис у Салон' },
    { command: '/services', description: '💈 Послуги та Ціни' },
    { command: '/location', description: '📍 Локація у Ніцці (Côte d’Azur)' },
    { command: '/help', description: 'ℹ️ Підтримка 24/7' }
]).catch(e => console.error("setMyCommands error:", e));

bot.setChatMenuButton({
    menu_button: JSON.stringify({
        type: 'web_app',
        text: '🚀 Відкрити Салон',
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

// 🚀 LUXURY START GREETING & COMMANDS
const sendWelcome = (chatId, name) => {
    const opts = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{ text: "⚡ ЗАПИСАТИСЯ У САЛОН (MINI APP) 🚀", web_app: { url: webAppUrl } }],
                [{ text: "💈 Послуги & VIP Бар", web_app: { url: webAppUrl } }, { text: "🤖 3D AI Скан", web_app: { url: webAppUrl } }],
                [{ text: "📍 Локація (15 Promenade des Anglais 🇫🇷)", url: "https://maps.google.com/?q=15+Promenade+des+Anglais+Nice+France" }]
            ]
        }
    };

    bot.sendMessage(chatId,
        "👑 ⚡ <b>MEGAN 2.0 CYBER BEAUTY STUDIO 2026</b> ⚡ 👑\n\n" +
        "Bonjour, <b>" + name + "</b>! 👋\n\n" +
        "Ласкаво просимо до нашого преміального кибер-салону на Лазурному Березі у Ніцці! 🇫🇷\n\n" +
        "💈 <b>VOVAN BEAUTY STUDIO • Côte d’Azur</b>\n" +
        "📍 <i>15 Promenade des Anglais, 06000 Nice, France</i>\n" +
        "👑 <b>АВТОР РОЗРОБКИ: ПОТАПОВ В.М. • NICE 🇫🇷</b>\n\n" +
        "✂️ <b>Авторське моделювання зачісок & Барбершоп</b>\n" +
        "🤖 <b>3D AI Скульптор стилю MEGAN 2.0</b>\n" +
        "🍾 <b>VIP Бар у крісло (Dom Pérignon, Chivas, Espresso)</b>\n" +
        "💎 <b>Оплата TON, Apple Pay, Google Pay</b>\n\n" +
        "👇 <b>Натисніть кнопку нижче для запуску Mini App:</b>", opts);
};

bot.onText(/\/start/, async (msg) => {
    sendWelcome(msg.chat.id, msg.from.first_name || 'шановний клієнт');
});

bot.onText(/\/booking/, async (msg) => {
    sendWelcome(msg.chat.id, msg.from.first_name || 'шановний клієнт');
});

bot.onText(/\/services/, (msg) => {
    sendWelcome(msg.chat.id, msg.from.first_name || 'шановний клієнт');
});

bot.onText(/\/location/, (msg) => {
    sendWelcome(msg.chat.id, msg.from.first_name || 'шановний клієнт');
});

bot.onText(/\/help/, (msg) => {
    const opts = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{ text: "🚀 ВІДКРИТИ MINI APP ТА ЗАПИСАТИСЯ", web_app: { url: webAppUrl } }],
                [{ text: "💬 Чат підтримки", url: "https://t.me/VOVAN_BEAUTY_SUPPORT" }]
            ]
        }
    };
    bot.sendMessage(msg.chat.id,
        "ℹ️ <b>ПІДТРИМКА MEGAN 2.0</b>\n\n" +
        "З усіх питань запису, VIP Бару та послуг відкривайте Mini App або зв'яжіться з нашою цілодобовою підтримкою.", opts);
});

// ANY OTHER MESSAGE — ALWAYS DIRECTS TO MINI APP
bot.on('message', (msg) => {
    if (msg.contact || (msg.text && msg.text.startsWith('/'))) return;
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
        return;
    }

    sendWelcome(msg.chat.id, msg.from.first_name || 'шановний клієнт');
});

bot.on('polling_error', (error) => { console.log(error.code); });

app.listen(3000, () => {
    console.log("🚀 MEGAN 2.0 API Server running on port 3000");
});
