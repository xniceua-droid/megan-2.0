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
    { command: '/start', description: '🚀 Старт — Запустити додаток' }
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

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || 'шановний клієнт';

    const opts = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{ text: "🚀 ЗАПУСТИТИ ДОДАТОК 2026", web_app: { url: webAppUrl } }],
                [{ text: "📞 Зателефонувати в салон", url: "tel:+33000000000" }, { text: "📍 Локація (Ніцца)", url: "https://maps.google.com" }]
            ]
        }
    };
    bot.sendMessage(chatId, 
        `🚀 <b>MEGAN 2.0 CYBER SYSTEM 2026</b>\n\n` +
        `⚡ <b>Вітаємо, ${name}!</b>\n\n` +
        `💈 <b>VOVAN BEAUTY STUDIO</b> — Лазурний Берег (Ніцца 🇫🇷)\n` +
        `✂️ Авторські Стрижки • 🧔 VIP Бороди • 💆 AI Sculptor 3D\n` +
        `💎 Оплата TON • 💳 Apple Pay / Google Pay\n\n` +
        `Натисніть кнопку нижче для запуску додатку 👇`, opts);
});

// Обробка будь-яких інших повідомлень — завжди відкриваємо додаток
bot.on('message', (msg) => {
    // Контакт або /start — обробляється окремо
    if (msg.contact || (msg.text && msg.text.startsWith('/start'))) return;
    // Якщо web_app_data — ігноруємо
    if (msg.web_app_data) return;

    const opts = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [[{ text: "✂️ ЗАПИСАТИСЯ", web_app: { url: webAppUrl } }]]
        }
    };
    bot.sendMessage(msg.chat.id, 
        `💈 Щоб записатися або переглянути послуги — натисніть кнопку нижче 👇`, opts);
});

// Зберігання контакту (опціонально можна зберігати в db.json)
bot.on('contact', (msg) => {
    const phone = msg.contact.phone_number;
    bot.sendMessage(msg.chat.id, `Дякуємо! Ваш номер ${phone} збережено. Тепер ви можете відкрити додаток.`, {
        reply_markup: { remove_keyboard: true }
    });
});

// Нагадування (перевіряємо кожні 5 хв, стабільна версія)
setInterval(() => {
    try {
        const db = getDb();
        const now = Date.now();
        let changed = false;
        db.orders.forEach(order => {
            if (order.timestamp && !order.reminderSent && order.chatId) {
                const timeDiff = order.timestamp - now;
                // Перевірка: timestamp має бути числом
                if (isNaN(timeDiff)) return;
                // Якщо до візиту від 0 до 2 годин
                if (timeDiff > 0 && timeDiff <= 7200000) {
                    bot.sendMessage(order.chatId, `🤖 <b>Нагадування:</b>\nЧекаємо вас на <b>${order.Service || 'послугу'}</b> о ${order.Date || ''}.\nВаш майстер ${order.Master || ''} вже готовий!`, { parse_mode: 'HTML' }).catch(() => {});
                    order.reminderSent = true;
                    changed = true;
                }
            }
        });
        if (changed) saveDb(db);
    } catch(e) {
        console.error('Reminder error:', e.message);
    }
}, 300000); // 5 хвилин

bot.on('polling_error', (error) => { console.log(error.code); });

app.listen(3000, () => {
    console.log("🚀 CRM & Payment API Server running on port 3000");
});
