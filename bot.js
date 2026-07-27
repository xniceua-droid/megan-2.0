require('dotenv').config();
const TelegramBotModule = require('node-telegram-bot-api');
const TelegramBot = TelegramBotModule.default || TelegramBotModule;
const express = require('express');
const cors = require('cors');

const token = process.env.BOT_TOKEN;
if (!token) {
    console.error("BOT_TOKEN is missing in .env");
    process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
const webAppUrl = 'https://xniceua-droid.github.io/megan-2.0/';

const app = express();
app.use(cors());
app.use(express.json());

console.log("🤖 M3GAN Telegram Bot started...");

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
    try {
        await bot.setChatMenuButton({
            chat_id: chatId,
            menu_button: JSON.stringify({ type: 'web_app', text: 'Відкрити App', web_app: { url: webAppUrl } })
        });
    } catch (e) { console.log(e.message); }

    const opts = {
        reply_markup: {
            inline_keyboard: [[{ text: "⚡ ВІДКРИТИ VOVAN BEAUTY ⚡", web_app: { url: webAppUrl } }]]
        }
    };
    bot.sendMessage(chatId, `Привіт, ${msg.from.first_name || 'клієнт'}!\nЛаскаво просимо до VOVAN BEAUTY STUDIO.\n\nНатисніть кнопку нижче 👇`, opts);
});

bot.on('polling_error', (error) => { console.log(error.code); });

app.listen(3000, () => {
    console.log("🚀 Payment API Server running on port 3000");
});
