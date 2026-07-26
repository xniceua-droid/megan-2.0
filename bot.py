import os
import json
import logging
import asyncio
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
if not BOT_TOKEN:
    raise ValueError("Токен BOT_TOKEN не найден в файле .env!")

logging.basicConfig(level=logging.INFO)
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

WEB_APP_URL = "https://xniceua-droid.github.io/megan-2.0/"

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text="🎟 Записаться в Barbershop",
                web_app=WebAppInfo(url=WEB_APP_URL)
            )
        ]
    ])
    
    welcome_text = (
        f"🎩 <b>Добро пожаловать в Gentleman's Blade!</b>\n\n"
        f"Здравствуйте, {message.from_user.first_name}!\n"
        f"Классические стрижки и бритье опасной бритвой с 1954 года.\n\n"
        f"Нажмите на кнопку ниже, чтобы открыть салон, выбрать дату, время и забронировать удобный слот:"
    )
    
    await message.answer(welcome_text, reply_markup=kb, parse_mode="HTML")

# Обработчик данных, полученных через WebApp sendData
@dp.message(F.web_app_data)
async def handle_web_app_data(message: types.Message):
    try:
        data = json.loads(message.web_app_data.data)
        
        name = data.get("name", "Не указано")
        phone = data.get("phone", "Не указан")
        service = data.get("service", "Не указана")
        barber = data.get("barber", "Не указан")
        date_val = data.get("date", "Сегодня")
        time_val = data.get("time", "10:00")
        
        user_info = f"@{message.from_user.username}" if message.from_user.username else f"ID: {message.from_user.id}"

        response_text = (
            f"🎟 <b>НОВЫЙ ТАЛОН НА СТРИЖКУ!</b>\n"
            f"━━━━━━━━━━━━━━━━━━━━━━\n"
            f"👤 <b>Клиент:</b> {name}\n"
            f"📞 <b>Контакты:</b> {phone}\n"
            f"💬 <b>Telegram:</b> {user_info}\n"
            f"✂️ <b>Услуга:</b> {service}\n"
            f"💈 <b>Мастер:</b> {barber}\n"
            f"📅 <b>Дата:</b> {date_val}\n"
            f"⏰ <b>Время:</b> {time_val}\n"
            f"━━━━━━━━━━━━━━━━━━━━━━\n"
            f"✅ <i>Заявка успешно принята! Ждем вас!</i>"
        )
        
        await message.answer(response_text, parse_mode="HTML")
    except Exception as e:
        logging.error(f"Ошибка при обработке данных WebApp: {e}")
        await message.answer("⚠️ Произошла ошибка при обработке талона. Попробуйте еще раз.")

async def main():
    print("Bot Gentleman's Blade is running and ready for orders!")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
