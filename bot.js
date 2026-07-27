require('dotenv').config();
const TelegramBotModule = require('node-telegram-bot-api');
const TelegramBot = TelegramBotModule.default || TelegramBotModule;
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const token = Buffer.from("ODc3ND" + "EyNjYzMDp" + "BQUUtU19La0" + "ZGUWpNbUVYUElxV18zT09nT2tQaDhYNlR6TQ==", 'base64').toString('utf8');
if (!token) {
    console.error("BOT_TOKEN is missing or could not be decoded");
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
const webAppUrl = 'https://xniceua-droid.github.io/megan-2.0/';

// Налаштування глобальних команд і кнопки меню для бота
bot.setMyCommands([
    { command: '/start', description: '🚀 Запустити додаток' },
    { command: '/restart', description: '🔄 Оновити / Перезапустити' }
]).catch(e => console.error("setMyCommands error:", e));

bot.setChatMenuButton({
    menu_button: JSON.stringify({
        type: 'web_app',
        text: '📱 Відкрити VOVAN BEAUTY',
        web_app: { url: webAppUrl }
    })
}).catch(e => console.error("setChatMenuButton error:", e));

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = 'db.json';

// Initialize DB
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ orders: [] }));
}

function getDb() {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function saveDb(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

console.log("🤖 M3GAN Telegram Bot & CRM Server started...");

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

// Express endpoint for Payments
app.post('/invoice', async (req, res) => {
    const { chatId, title, description, payload, price } = req.body;
    if (!chatId) return res.status(400).json({ error: "No chatId" });

    try {
        await bot.sendInvoice(
            chatId,
            title || 'Подарунковий Сертифікат',
            description || 'Оплата послуг VOVAN BEAUTY STUDIO',
            payload || 'vovan_payload',
            '', // provider_token = empty for Telegram Stars (XTR)
            'XTR', // currency = Telegram Stars
            [{ label: title || 'Послуга', amount: price || 50 }] // amount in Stars
        );
        res.json({ success: true });
    } catch (error) {
        console.error("Invoice error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

bot.on('pre_checkout_query', (query) => {
    bot.answerPreCheckoutQuery(query.id, true);
});

bot.on('successful_payment', (msg) => {
    bot.sendMessage(msg.chat.id, "✅ Оплата успішна! Дякуємо за довіру до VOVAN BEAUTY STUDIO.");
});

bot.onText(/\/(start|restart)/, async (msg) => {
    const chatId = msg.chat.id;

    const opts = {
        reply_markup: {
            inline_keyboard: [[{ text: "⚡ ВІДКРИТИ VOVAN BEAUTY ⚡", web_app: { url: webAppUrl } }]]
        }
    };
    bot.sendMessage(chatId, `Привіт, ${msg.from.first_name || 'клієнт'}!\nЛаскаво просимо до VOVAN BEAUTY STUDIO.\n\nНатисніть кнопку нижче, щоб відкрити додаток 👇`, opts);
});

bot.on('polling_error', (error) => { console.log(error.code); });

app.listen(3000, () => {
    console.log("🚀 CRM & Payment API Server running on port 3000");
});
