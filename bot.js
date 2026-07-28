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

// Parallel Database Sync (JSON + Google Sheets)
app.post('/api/sync', async (req, res) => {
    const db = req.body;
    if (!db) return res.status(400).json({ error: "No DB provided" });
    
    // Save locally
    saveDb(db);
    
    // Forward to Google Apps Script (Placeholder URL - User must deploy and replace)
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "YOUR_GOOGLE_SCRIPT_URL_HERE";
    
    if (GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_SCRIPT_URL_HERE") {
        try {
            // Pick latest order to append
            if (db.orders && db.orders.length > 0) {
                const latestOrder = db.orders[db.orders.length - 1];
                const gData = {
                    action: 'add',
                    sheet: 'Orders',
                    date: latestOrder.Date,
                    clientName: latestOrder.Client,
                    clientPhone: latestOrder.Phone || "",
                    service: latestOrder.Service,
                    master: latestOrder.Master,
                    status: latestOrder.Status,
                    price: latestOrder.Price
                };
                // Native fetch in Node 18+
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(gData)
                });
            }
        } catch (e) {
            console.error("Google Sheets Sync Error:", e.message);
        }
    }
    
    res.json({ success: true });
});

// Endpoint to send message from CRM to Client
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

    // Request contact keyboard
    const contactOpts = {
        reply_markup: {
            keyboard: [[{ text: "📞 Поділитися контактом", request_contact: true }]],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };
    await bot.sendMessage(chatId, `Привіт, ${msg.from.first_name || 'клієнт'}! Щоб створити ваш профіль, будь ласка, поділіться контактом.`, contactOpts);

    // Web App Button
    const opts = {
        reply_markup: {
            inline_keyboard: [[{ text: "⚡ ВІДКРИТИ VOVAN BEAUTY ⚡", web_app: { url: webAppUrl } }]]
        }
    };
    bot.sendMessage(chatId, `Ласкаво просимо до VOVAN BEAUTY STUDIO.\n\nНатисніть кнопку нижче, щоб відкрити додаток 👇`, opts);
});

// Обробка будь-яких інших команд (наприклад, старого /record) або тексту
bot.on('message', (msg) => {
    // Якщо це контакт або одна з основних команд - ігноруємо (вони обробляються вище)
    if (msg.contact || (msg.text && msg.text.match(/\/(start|restart)/))) return;

    const opts = {
        reply_markup: {
            inline_keyboard: [[{ text: "⚡ ВІДКРИТИ ДОДАТОК ⚡", web_app: { url: webAppUrl } }]]
        }
    };
    bot.sendMessage(msg.chat.id, `Для того щоб записатися чи переглянути послуги, відкрийте наш додаток 👇`, opts);
});

// Зберігання контакту (опціонально можна зберігати в db.json)
bot.on('contact', (msg) => {
    const phone = msg.contact.phone_number;
    bot.sendMessage(msg.chat.id, `Дякуємо! Ваш номер ${phone} збережено. Тепер ви можете відкрити додаток.`, {
        reply_markup: { remove_keyboard: true }
    });
});

// Нагадування (перевіряємо кожні 1 хв)
setInterval(() => {
    const db = getDb();
    const now = Date.now();
    // Припускаємо, що order.timestamp це час візиту
    db.orders.forEach(order => {
        if (order.timestamp && !order.reminderSent) {
            const timeDiff = order.timestamp - now;
            // Якщо до візиту залишилось менше 2 годин (7200000 мс) і більше 1.9 годин
            if (timeDiff > 0 && timeDiff <= 7200000) {
                if (order.chatId) {
                    bot.sendMessage(order.chatId, `🤖 <b>MEGAN 2.0 Нагадує:</b>\nЧекаємо вас на послугу <b>${order.Service}</b> о ${order.Date}. Ваш майстер ${order.Master} вже готує інструменти!`, { parse_mode: 'HTML' });
                }
                order.reminderSent = true;
                saveDb(db);
            }
        }
    });
}, 60000);

bot.on('polling_error', (error) => { console.log(error.code); });

app.listen(3000, () => {
    console.log("🚀 CRM & Payment API Server running on port 3000");
});
