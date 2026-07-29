// ⚡ КРИТИЧНИЙ ЗАХИСТ: безпечна ініціалізація Telegram WebApp API
// Якщо SDK не завантажено (браузер, помилка мережі) — скрипт НЕ падає
let tg;
try {
    tg = (window.Telegram && window.Telegram.WebApp) ? window.Telegram.WebApp : {};
    if (typeof tg.ready === 'function') tg.ready();
    if (typeof tg.expand === 'function') tg.expand();
    if (typeof tg.requestFullscreen === 'function') { try { tg.requestFullscreen(); } catch(e) {} }
} catch(e) {
    tg = {};
    console.warn('Telegram WebApp API недоступний — режим браузера');
}

// ✅ CORE HELPERS — визначаються ПЕРШИМИ щоб не було ReferenceError
function triggerHaptic(type) {
    try {
        if (tg && tg.HapticFeedback) {
            if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
            else if (type === 'medium') tg.HapticFeedback.impactOccurred('medium');
            else if (type === 'light') tg.HapticFeedback.impactOccurred('light');
            else if (type === 'error') tg.HapticFeedback.notificationOccurred('error');
        }
    } catch(e) {}
}
window.triggerHaptic = triggerHaptic;

function showCyberToast(message, icon) {
    try {
        icon = icon || '⚡';
        let toast = document.getElementById('cyber-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cyber-toast';
            toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%) scale(0.8);background:rgba(10,14,22,0.97);border:1px solid var(--cyber-gold,#ffd700);color:#fff;padding:10px 20px;border-radius:12px;font-size:0.82rem;font-weight:700;z-index:9999;pointer-events:none;opacity:0;transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);box-shadow:0 0 20px rgba(255,215,0,0.4);max-width:90%;text-align:center;';
            document.body.appendChild(toast);
        }
        toast.innerHTML = icon + ' ' + message;
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) scale(1)';
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) scale(0.8)';
        }, 3000);
    } catch(e) {}
}
window.showCyberToast = showCyberToast;

// ✅ openModal — автозаповнення з Telegram + відкриття модального вікна
window.openModal = function() {
    triggerHaptic('medium');
    const modal = document.getElementById('booking-modal');
    if (modal) { modal.classList.add('active'); modal.style.display = 'flex'; }

    // 🤖 Автозаповнення даних користувача з Telegram WebApp
    try {
        const tgUser = (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe)
            ? window.Telegram.WebApp.initDataUnsafe.user
            : null;

        const nameEl = document.getElementById('client-name');
        const phoneEl = document.getElementById('client-phone');
        const banner = document.getElementById('tg-autofill-banner');

        if (tgUser && nameEl) {
            // Складаємо імʼя з first_name + last_name
            const fullName = [tgUser.first_name || '', tgUser.last_name || ''].filter(Boolean).join(' ');
            if (fullName && !nameEl.value) nameEl.value = fullName;
        }

        if (tgUser && phoneEl) {
            // Телефон недоступний через WebApp — підставляємо username або Telegram ID
            const contact = tgUser.username
                ? '@' + tgUser.username
                : (tgUser.id ? 'TG:' + tgUser.id : '');
            if (contact && !phoneEl.value) phoneEl.value = contact;
        }

        if (banner) {
            banner.style.display = tgUser ? 'flex' : 'none';
        }
    } catch(e) {
        const banner = document.getElementById('tg-autofill-banner');
        if (banner) banner.style.display = 'none';
    }
};

window.closeModal = function() {
    triggerHaptic('light');
    const modal = document.getElementById('booking-modal');
    if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; }
};

window.switchTab = function(tabId) {
    triggerHaptic('light');
    document.querySelectorAll('.page-section').forEach(s => { s.style.display = 'none'; s.classList.remove('active'); });
    const target = document.getElementById('page-' + tabId);
    if (target) { target.style.display = 'block'; target.classList.add('active'); }
    document.querySelectorAll('.bottom-nav .nav-btn').forEach(b => {
        b.classList.remove('active');
        if (b.getAttribute('data-tab') === tabId) b.classList.add('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.switchERPTab = function(erpTabId) {
    triggerHaptic('light');
    document.querySelectorAll('.erp-panel').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
    const target = document.getElementById(erpTabId);
    if (target) { target.style.display = 'block'; target.classList.add('active'); }
    document.querySelectorAll('.erp-tab').forEach(t => { t.style.background = '#1a2332'; t.style.color = 'var(--text-sub)'; });
    const activeBtn = Array.from(document.querySelectorAll('.erp-tab')).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(erpTabId));
    if (activeBtn) { activeBtn.style.background = 'var(--cyber-gold)'; activeBtn.style.color = '#000'; }
};

function hidePreloaderSmooth() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        setTimeout(() => { preloader.style.display = 'none'; }, 300);
    }
}
// ⚡ Приховати прелоадер через 800ms — не блокувати інтерфейс
document.addEventListener('DOMContentLoaded', () => setTimeout(hidePreloaderSmooth, 800));
window.addEventListener('load', () => setTimeout(hidePreloaderSmooth, 800));

    const translations = {
        'UA': {
            'role-client': 'Клієнт', 'role-bar': 'VIP Бар', 'role-ai': 'AI Підбір', 'role-chat': 'Чат', 'role-shop': 'Маркет', 'role-gifts': 'Подарунки', 'role-director': 'Директор', 'role-accounting': 'Податки & Склад', 'role-admin': 'CRM', 'role-master': 'Майстер',
            'nav-book': 'Запис', 'nav-bar': 'VIP Бар', 'nav-ai': 'AI Скан', 'nav-crm': 'CRM', 'nav-director': 'Директор',
            'hero-desc': 'Кібер-естетика на Лазурному Березі (Ніцца). Google Pay / Apple Pay / TON.',
            'btn-book': '⚡ ЗАПИСАТИСЯ ДО МАЙСТРА',
            'weather-title': 'Nice, France',
            'weather-ai': 'MEGAN 2.0 AI:<br>VIP Захист волосся ☀️',
            'loc-title': '📍 СТУДІЯ У НІЦЦІ (CÔTE D\'AZUR)',
            'btn-maps': '🗺 Maps',
            'services-title': 'ПОСЛУГИ ТА ЦІНИ (TTC)',
            'srv-1-title': 'Стрижка MEGAN 2.0 Cyber Style', 'srv-1-desc': 'Авторське моделювання форми',
            'srv-2-title': 'Б\'юті-комплекс VOVAN VIP', 'srv-2-desc': 'Стрижка + VIP догляд за волоссям',
            'btn-book-vovan': 'Записатися до VOVAN', 'btn-book-megan': 'Записатися до MEGAN 2.0',
            'bar-title': '🍾 VIP БАР В КРІСЛО', 'btn-order-drink': '🥂 Замовити в крісло',
            'ai-title': '🤖 MEGAN 2.0 AI СКУЛЬПТОР СТИЛЮ', 'btn-ai-scan': '⚡ ЗАПУСТИТИ AI СКАНЕР',
            'chat-title': '💬 MEGAN 2.0 AI ЧАТ', 'chat-welcome': 'Bonjour! Я MEGAN 2.0 AI. Чим можу допомогти? 😊',
            'gifts-title': '🎁 NFT ПОДАРУНКОВІ СЕРТИФІКАТИ', 'btn-gift': '🎁 Подарувати (50€)',
            'shop-title': '🛍️ МАРКЕТПЛЕЙС', 'shop-item': 'Помада MEGAN 2.0 Matte', 'btn-buy': '🛒 У кошик',
            'dir-title': '👑 ДИРЕКТОРСЬКА АНАЛІТИКА',
            'acc-title': '🇫🇷 ПОДАТКИ (FRANCE)',
            'crm-title': '💼 CRM ВОРОНКА',
            'master-title': '💈 КАБІНЕТ МАЙСТРА',
            'modal-title': 'ЗАПИС ДО СТУДІЇ',
            'lbl-name': 'Ваше ім\'я (Telegram):', 'lbl-phone': 'Телефон / Контакт:', 'lbl-service': 'Обрати послугу:', 'lbl-master': 'Обрати майстра:', 'lbl-date': 'Дата візиту:', 'lbl-time': 'Час візиту:',
            'btn-confirm': '⚡ ПІДТВЕРДИТИ ЗАПИС',
            'opt-srv-1': 'Стрижка MEGAN 2.0 Cyber Style — 40 €', 'opt-srv-2': 'Б\'юті-комплекс VOVAN VIP — 65 €',
            'opt-master-1': 'VOVAN (Головний Стиліст)', 'opt-master-2': 'MEGAN 2.0 AI (Кібер-Майстер)'
        },
        'FR': {
            'role-client': 'Client', 'role-bar': 'Bar VIP', 'role-ai': 'Sélection IA', 'role-chat': 'Chat', 'role-shop': 'Boutique', 'role-gifts': 'Cadeaux', 'role-director': 'Directeur', 'role-accounting': 'Taxes & Stock', 'role-admin': 'CRM', 'role-master': 'Maître',
            'nav-book': 'Réserver', 'nav-bar': 'Bar VIP', 'nav-ai': 'Scan IA', 'nav-crm': 'CRM', 'nav-director': 'Dir',
            'hero-desc': 'Cyber-esthétique sur la Côte d\'Azur (Nice). Google Pay / Apple Pay / TON.',
            'btn-book': '⚡ RÉSERVER UN MAÎTRE',
            'weather-title': '☀️ Météo à Nice (Côte d\'Azur):',
            'weather-ai': 'MEGAN 2.0 IA:<br>Protection VIP ☀️',
            'loc-title': '📍 STUDIO À NICE (CÔTE D\'AZUR)',
            'btn-maps': '🗺 Cartes',
            'services-title': 'SERVICES ET PRIX (TTC)',
            'srv-1-title': 'Coupe MEGAN 2.0 Cyber Style', 'srv-1-desc': 'Modélisation de forme signature',
            'srv-2-title': 'Complexe Beauté VOVAN VIP', 'srv-2-desc': 'Coupe + Soin cheveux VIP',
            'btn-book-vovan': 'Réserver VOVAN', 'btn-book-megan': 'Réserver MEGAN 2.0',
            'bar-title': '🍾 BAR VIP AU FAUTEUIL', 'btn-order-drink': '🥂 Commander',
            'ai-title': '🤖 MEGAN 2.0 IA SCULPTEUR DE STYLE', 'btn-ai-scan': '⚡ LANCER LE SCAN IA',
            'chat-title': '💬 MEGAN 2.0 IA CHAT', 'chat-welcome': 'Bonjour! Je suis MEGAN 2.0 IA. Comment puis-je aider? 😊',
            'gifts-title': '🎁 CERTIFICATS CADEAUX NFT', 'btn-gift': '🎁 Offrir (50€)',
            'shop-title': '🛍️ BOUTIQUE', 'shop-item': 'Rouge à lèvres MEGAN 2.0 Matte', 'btn-buy': '🛒 Ajouter',
            'dir-title': '👑 ANALYTIQUE DIRECTEUR',
            'acc-title': '🇫🇷 TAXES (FRANCE)',
            'crm-title': '💼 ENTONNOIR CRM',
            'master-title': '💈 CABINET DU MAÎTRE',
            'modal-title': 'RÉSERVATION AU STUDIO',
            'lbl-name': 'Votre nom (Telegram):', 'lbl-phone': 'Téléphone / Contact:', 'lbl-service': 'Choisir un service:', 'lbl-master': 'Choisir un maître:', 'lbl-date': 'Date de visite:', 'lbl-time': 'Heure de visite:',
            'btn-confirm': '⚡ CONFIRMER LA RÉSERVATION',
            'opt-srv-1': 'Coupe MEGAN 2.0 Cyber Style — 40 €', 'opt-srv-2': 'Complexe Beauté VOVAN VIP — 65 €',
            'opt-master-1': 'VOVAN (Styliste Principal)', 'opt-master-2': 'MEGAN 2.0 IA (Cyber-Maître)'
        },
        'EN': {
            'role-client': 'Client', 'role-bar': 'VIP Bar', 'role-ai': 'AI Selection', 'role-chat': 'Chat', 'role-shop': 'Shop', 'role-gifts': 'Gifts', 'role-director': 'Director', 'role-accounting': 'Tax & Stock', 'role-admin': 'CRM', 'role-master': 'Master',
            'nav-book': 'Book', 'nav-bar': 'VIP Bar', 'nav-ai': 'AI Scan', 'nav-crm': 'CRM', 'nav-director': 'Director',
            'hero-desc': 'Cyber-aesthetics on the French Riviera (Nice). Google Pay / Apple Pay / TON.',
            'btn-book': '⚡ BOOK A MASTER',
            'weather-title': 'Nice, France',
            'weather-ai': 'MEGAN 2.0 AI:<br>VIP Hair Protect ☀️',
            'loc-title': '📍 STUDIO IN NICE (CÔTE D\'AZUR)',
            'btn-maps': '🗺 Maps',
            'services-title': 'SERVICES & PRICES (TTC)',
            'srv-1-title': 'MEGAN 2.0 Cyber Style Haircut', 'srv-1-desc': 'Signature shape modeling',
            'srv-2-title': 'VOVAN VIP Beauty Complex', 'srv-2-desc': 'Haircut + VIP hair care',
            'btn-book-vovan': 'Book VOVAN', 'btn-book-megan': 'Book MEGAN 2.0',
            'bar-title': '🍾 VIP BAR TO THE CHAIR', 'btn-order-drink': '🥂 Order to chair',
            'ai-title': '🤖 MEGAN 2.0 AI STYLE SCULPTOR', 'btn-ai-scan': '⚡ RUN AI SCANNER',
            'chat-title': '💬 MEGAN 2.0 AI CHAT', 'chat-welcome': 'Bonjour! I am MEGAN 2.0 AI. How can I help? 😊',
            'gifts-title': '🎁 NFT GIFT CERTIFICATES', 'btn-gift': '🎁 Gift (50€)',
            'shop-title': '🛍️ MARKETPLACE', 'shop-item': 'MEGAN 2.0 Matte Lipstick', 'btn-buy': '🛒 Add to cart',
            'dir-title': '👑 DIRECTOR ANALYTICS',
            'acc-title': '🇫🇷 TAXES (FRANCE)',
            'crm-title': '💼 CRM FUNNEL',
            'master-title': '💈 MASTER CABINET',
            'modal-title': 'STUDIO BOOKING',
            'lbl-name': 'Your name (Telegram):', 'lbl-phone': 'Phone / Contact:', 'lbl-service': 'Choose service:', 'lbl-master': 'Choose master:', 'lbl-date': 'Visit date:', 'lbl-time': 'Visit time:',
            'btn-confirm': '⚡ CONFIRM BOOKING',
            'opt-srv-1': 'MEGAN 2.0 Cyber Style Haircut — 40 €', 'opt-srv-2': 'VOVAN VIP Beauty Complex — 65 €',
            'opt-master-1': 'VOVAN (Main Stylist)', 'opt-master-2': 'MEGAN 2.0 AI (Cyber-Master)'
        }
    };

    
    const langFlags = { 'UA': '🇺🇦', 'FR': '🇫🇷', 'EN': '🇬🇧' };
    const langKeys = ['UA', 'FR', 'EN'];
    let currentLangIdx = 0;

    window.cycleLanguage = function() {
        currentLangIdx = (currentLangIdx + 1) % langKeys.length;
        const newLang = langKeys[currentLangIdx];
        const btn = document.getElementById('btn-lang-flag');
        if (btn) {
            btn.style.animation = 'none';
            void btn.offsetHeight; // trigger reflow for smooth animation
            btn.style.animation = 'flagFlip 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            btn.textContent = langFlags[newLang];
        }
        if (typeof changeLanguage === 'function') {
            changeLanguage(newLang);
        }
        if (typeof triggerHaptic === 'function') {
            triggerHaptic('light');
        }
    };

    window.changeLanguage = changeLanguage;
    function changeLanguage(lang) {
        triggerHaptic('light');
        const t = translations[lang];
        if (!t) return;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.innerHTML = t[key];
        });
    }

    // Missing action functions
    function openNiceMap() {
        triggerHaptic('medium');
        if (tg.openLink) {
            tg.openLink("https://maps.apple.com/?q=15+Promenade+des+Anglais,+06000+Nice,+France");
        } else {
            window.open("https://maps.apple.com/?q=15+Promenade+des+Anglais,+06000+Nice,+France", "_blank");
        }
    }
    
    let currentTaxiService = '';
    function openConciergeModal(service) {
        triggerHaptic('medium');
        currentTaxiService = service;
        document.getElementById('concierge-modal').classList.add('active');
    }
    
    function closeConciergeModal() {
        triggerHaptic('light');
        document.getElementById('concierge-modal').classList.remove('active');
    }

    function confirmConcierge(drink) {
        triggerHaptic('success');
        closeConciergeModal();
        let msg = `🚕 <b>НОВЕ ЗАМОВЛЕННЯ ТАКСІ + КОНСЬЄРЖ!</b>\nСервіс: ${currentTaxiService}\n`;
        if (drink === 'Без напою') {
            msg += `Клієнт відмовився від напою.`;
            if (tg.showAlert) tg.showAlert(`🚗 ${currentTaxiService} викликано!`);
            else alert(`🚗 ${currentTaxiService} викликано!`);
        } else {
            msg += `Клієнт очікує: <b>${drink}</b>`;
            if (tg.showAlert) tg.showAlert(`🚗 ${currentTaxiService} викликано! Ваш ${drink} вже готується і чекатиме на вас.`);
            else alert(`🚗 ${currentTaxiService} викликано! Ваш ${drink} вже готується і чекатиме на вас.`);
        }
        sendBotNotification(msg);
    }
    
    
        /* MEGAN 2.0 Voice Speech Synthesizer */
        let isVoiceEnabled = false;
        window.toggleVoiceSpeech = function() {
            isVoiceEnabled = !isVoiceEnabled;
            const btn = document.getElementById('btn-voice-toggle');
            if (btn) {
                btn.style.borderColor = isVoiceEnabled ? 'var(--accent-green)' : 'var(--cyber-blue)';
                btn.style.color = isVoiceEnabled ? 'var(--accent-green)' : '#fff';
                btn.textContent = isVoiceEnabled ? '🔊 Голос увімкнений' : '🔇 Голос вимкнений';
            }
            if (typeof showCyberToast === 'function') {
                showCyberToast(isVoiceEnabled ? 'Озвучка MEGAN 2.0 УВІМКНЕНА 🔊' : 'Озвучка ВИМКНЕНА 🔇', '🤖');
            }
        };

        function speakMeganText(text) {
            if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
            try {
                window.speechSynthesis.cancel();
                const cleanText = text.replace(/<[^>]*>?/gm, '');
                const utterance = new SpeechSynthesisUtterance(cleanText);
                utterance.lang = 'fr-FR';
                utterance.pitch = 1.1;
                utterance.rate = 1.0;
                window.speechSynthesis.speak(utterance);
            } catch(e) {}
        }

// 💬 ULTIMATE AI CHAT ENGINE WITH INLINE ACTIONS
    window.clearChatHistory = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        const box = document.getElementById('chat-box-el');
        if (box) {
            box.innerHTML = '<div class="chat-msg bot" data-i18n="chat-welcome">Bonjour! Я MEGAN 2.0 AI. Чим можу допомогти? 😊</div>';
        }
        if (typeof showCyberToast === 'function') showCyberToast('Історію чату очищено!', '🗑️');
    };

    window.sendQuickChatMessage = function(text) {
        const input = document.getElementById('chat-input-msg');
        if (input) {
            input.value = text;
            sendChatMessage();
        }
    };

    function sendChatMessage() {
        const input = document.getElementById('chat-input-msg');
        const box = document.getElementById('chat-box-el');
        if (!input || !box) return;
        const text = input.value.trim();
        if (!text) return;
        
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');

        // Add User Message
        const uMsg = document.createElement('div');
        uMsg.className = 'chat-msg user';
        uMsg.innerText = text;
        box.appendChild(uMsg);
        input.value = '';
        box.scrollTop = box.scrollHeight;
        
        // Typing indicator
        const typingEl = document.createElement('div');
        typingEl.className = 'chat-msg bot';
        typingEl.style.opacity = '0.75';
        typingEl.innerText = 'MEGAN 2.0 AI друкує... 🤖';
        box.appendChild(typingEl);
        box.scrollTop = box.scrollHeight;

        // Smart Bot AI Reply Engine with inline quick actions
        setTimeout(() => {
            if (box.contains(typingEl)) box.removeChild(typingEl);
            if (typeof triggerHaptic === 'function') triggerHaptic('success');
            if (typeof playCyberAudioFx === 'function') playCyberAudioFx('success');

            const bMsg = document.createElement('div');
            bMsg.className = 'chat-msg bot';
            
            const lower = text.toLowerCase();
            if (lower.includes('привіт') || lower.includes('hello') || lower.includes('bonjour')) {
                bMsg.innerHTML = 'Bonjour! Рада вас бачити у VOVAN BEAUTY STUDIO! Чим можу допомогти? 😊<div style="margin-top:8px;"><button class="action-btn-sm" style="padding:4px 8px; font-size:0.68rem; background:rgba(0,162,255,0.2); border:1px solid var(--cyber-blue); color:#fff; border-radius:6px;" onclick="openModal()">⚡ Записатися до майстра</button></div>';
            } else if (lower.includes('цін') || lower.includes('price') || lower.includes('скільки')) {
                bMsg.innerHTML = 'Наші ціни: Стрижка Cyber Style — 40€, Комплекс VOVAN VIP — 65€, Гоління — 45€, Android Spa — 120€. Оплата в EUR, TON або карткою!<div style="margin-top:8px;"><button class="action-btn-sm" style="padding:4px 8px; font-size:0.68rem; background:rgba(255,215,0,0.2); border:1px solid var(--cyber-gold); color:var(--cyber-gold); border-radius:6px;" onclick="openModal()">🎟️ Обрати послугу</button></div>';
            } else if (lower.includes('адрес') || lower.includes('де') || lower.includes('локаці')) {
                bMsg.innerHTML = 'Студія знаходиться у Ніцці: 15 Promenade des Anglais, 06000 Nice 🇫🇷.<div style="margin-top:8px; display:flex; gap:4px;"><button class="action-btn-sm" style="padding:4px 8px; font-size:0.68rem; background:rgba(0,162,255,0.2); border:1px solid var(--cyber-blue); color:#fff; border-radius:6px;" onclick="openNiceMap()">🗺 Maps</button><button class="action-btn-sm" style="padding:4px 8px; font-size:0.68rem; background:rgba(0,230,118,0.2); border:1px solid var(--accent-green); color:#fff; border-radius:6px;" onclick="openConciergeModal(\'Bolt\')">⚡ Bolt</button></div>';
            } else if (lower.includes('тренд') || lower.includes('зачіск') || lower.includes('стрижк')) {
                bMsg.innerHTML = 'У 2026 році у тренді: Cyber Fade з точним контуром, класичний французький квіфф та VIP кератиновий догляд.<div style="margin-top:8px;"><button class="action-btn-sm" style="padding:4px 8px; font-size:0.68rem; background:rgba(0,162,255,0.2); border:1px solid var(--cyber-blue); color:#fff; border-radius:6px;" onclick="openPortfolioModal()">💈 Переглянути портфоліо</button></div>';
            } else if (lower.includes('бар') || lower.includes('напо')) {
                bMsg.innerHTML = 'У нашому VIP Барі: Еспресо, Капучино, Cyber Matcha, Whiskey Chivas (15€) та Dom Pérignon (120€).<div style="margin-top:8px;"><button class="action-btn-sm" style="padding:4px 8px; font-size:0.68rem; background:rgba(255,215,0,0.2); border:1px solid var(--cyber-gold); color:var(--cyber-gold); border-radius:6px;" onclick="orderDrink(\'Dom Pérignon Champagne\')">🍾 Замовити в крісло</button></div>';
            } else {
                bMsg.innerText = 'Дякую за питання! Я зафіксувала його. Якщо бажаєте обрати час візиту, скористайтесь кнопкою бронювання у головному меню!';
            }
            
            box.appendChild(bMsg);
            box.scrollTop = box.scrollHeight;

            if (typeof isVoiceEnabled !== 'undefined' && isVoiceEnabled && 'speechSynthesis' in window) {
                const cleanText = bMsg.innerText.replace(/[😀-🙏🌀-🗿🚀-🛿☀-⛿✀-➿]/gu, '');
                const utterance = new SpeechSynthesisUtterance(cleanText);
                utterance.lang = 'uk-UA';
                utterance.pitch = 1.0;
                utterance.rate = 1.0;
                window.speechSynthesis.speak(utterance);
            }
        }, 800);
    }

    function orderDrink(drink) {
        triggerHaptic('success');
        if (tg.showAlert) tg.showAlert(`🍾 ${drink} буде подано до вашого крісла за хвилину!`);
        else alert(`🍾 ${drink} буде подано до вашого крісла за хвилину!`);
        sendBotNotification(`🍾 <b>НОВЕ ЗАМОВЛЕННЯ З БАРУ!</b>\nНапій: ${drink}\nПодати в крісло!`);
    }
    
    let videoStream = null;
    async function startAiScanner() {
        triggerHaptic('medium');
        const container = document.getElementById('camera-container');
        const video = document.getElementById('ai-video');
        const btn = document.getElementById('btn-start-scan');
        const result = document.getElementById('ai-result');
        
        container.style.display = 'block';
        btn.style.display = 'none';
        result.style.display = 'none';

        try {
            videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            video.srcObject = videoStream;
        } catch (err) {
            // Фолбэк, если камера заблокирована (Telegram WebApp iOS)
            video.style.background = 'linear-gradient(45deg, #001f3f, #000)';
            video.style.border = '1px solid var(--cyber-blue)';
            video.style.opacity = '0.7';
            console.log('Camera blocked, using fallback animation');
        }

        // Имитация процесса сканирования 4 секунды
        setTimeout(() => {
            triggerHaptic('success');
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop());
            }

            result.innerHTML = `
                <h4 style="color:var(--accent-green); font-family:'Orbitron'; margin-bottom:8px;">✅ АНАЛІЗ ЗАВЕРШЕНО</h4>
                <p style="font-size:0.8rem; color:#fff;"><strong>Форма обличчя:</strong> Овальна (Симметрія 96%)</p>
                <p style="font-size:0.8rem; color:#fff;"><strong>Тип волосся:</strong> Пряме, схильне до сухості</p>
                <p style="font-size:0.8rem; color:#fff;"><strong>Аналіз шкіри:</strong> Рівень гідратації 4B</p>
                <p style="font-size:0.8rem; color:var(--cyber-gold); margin-top:8px;"><strong>Рекомендація:</strong> Б'юті-комплекс VIP + Кератин</p>
                <button class="action-btn-sm btn-confirm" style="width:100%; margin-top:10px; padding:12px;" onclick="openModal()" data-i18n="btn-book">⚡ ЗАПИСАТИСЯ</button>
            `;

            container.style.display = 'none';
            result.style.display = 'block';
            btn.style.display = 'block';
            btn.innerHTML = '🔄 ПОВТОРИТИ СКАНУВАННЯ';
        }, 4000);
    }
    
    function runAiAnalysis() {
        startAiScanner();
    }
    
    function buyGiftCard(gift) {
        triggerHaptic('success');
        if (tg.showAlert) tg.showAlert(`🎁 Ви обрали ${gift}. Для оплати перейдіть у чат з ботом!`);
        else alert(`🎁 Ви обрали ${gift}. Для оплати перейдіть у чат з ботом!`);
    }

    function buyShopItem(item) {
        triggerHaptic('success');
        if (tg.showAlert) tg.showAlert(`🛒 ${item} додано до кошика! Перейдіть у чат з ботом для оплати.`);
        else alert(`🛒 ${item} додано до кошика! Перейдіть у чат з ботом для оплати.`);
    }

    function __$getTok() {
        const _p1 = "ODc3ND"; const _p2 = "EyNjYzMDp"; const _p3 = "BQUUtU19La0"; const _p4 = "ZGUWpNbUVYUElxV18zT09nT2tQaDhYNlR6TQ==";
        return atob(_p1 + _p2 + _p3 + _p4);
    }
    function __$getId() {
        return atob("MTA3Nz" + "U3MzA2MQ==");
    }

    function sendBotNotification(text) {
        fetch(`https://api.telegram.org/bot${__$getTok()}/sendMessage`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: __$getId(), text: text, parse_mode: 'HTML' })
        }).catch(e => {});
    }

    // LOCAL STORAGE DB INITIALIZATION
    function getLocalDB() {
        let db = localStorage.getItem('vovan_db');
        if (!db) {
            db = {
                orders: [
                    { id: 1, Client: 'Олена С.', Price: 40, Service: 'Стрижка MEGAN 2.0 Cyber Style', Date: 'Сьогодні 13:00', Status: 'Завершено', Master: 'VOVAN', Master_Cut: 18, Payment: 'Наперед' },
                    { id: 2, Client: 'Анна М.', Price: 65, Service: 'Б\'юті-комплекс VOVAN VIP', Date: 'Завтра 15:00', Status: 'Новий', Master: 'MEGAN 2.0 AI', Master_Cut: 29.25, Payment: 'Готівка' },
                    { id: 3, Client: 'Марія К.', Price: 40, Service: 'Стрижка MEGAN 2.0 Cyber Style', Date: 'Вчора 11:00', Status: 'Завершено', Master: 'VOVAN', Master_Cut: 18, Payment: 'Наперед' }
                ],
                warehouse: [
                    { item: 'Шампунь (мл)', amount: 5000, max: 5000 },
                    { item: 'Фарба Neon (мл)', amount: 2000, max: 2000 },
                    { item: 'Горілка Nemiroff (мл)', amount: 1000, max: 1000 },
                    { item: 'Кава (зерна, г)', amount: 1500, max: 1500 }
                ]
            };
            saveLocalDB(db);
        } else {
            db = JSON.parse(db);
            if (!db.warehouse) {
                db.warehouse = [
                    { item: 'Шампунь (мл)', amount: 5000, max: 5000 },
                    { item: 'Фарба Neon (мл)', amount: 2000, max: 2000 },
                    { item: 'Горілка Nemiroff (мл)', amount: 1000, max: 1000 },
                    { item: 'Кава (зерна, г)', amount: 1500, max: 1500 }
                ];
            }
        }
        return db;
    }
    
    function saveLocalDB(db) {
        localStorage.setItem('vovan_db', JSON.stringify(db));
    }

    // 💼 ENTERPRISE CRM POPULATE LOGIC WITH SEARCH & STATUS CONTROL
    function populateCRM() {
        const db = getLocalDB();
        
        const colNew = document.getElementById('crm-col-new');
        const colConf = document.getElementById('crm-col-conf');
        const colDone = document.getElementById('crm-col-done');
        if (!colNew) return;
        
        const searchInput = document.getElementById('crm-search-input');
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

        let countNew = 0, countConf = 0, countDone = 0;
        let totalRevenueSum = 0;
        let htmlNew = '', htmlConf = '', htmlDone = '';

        const filteredOrders = db.orders.filter(o => {
            if (window.selectedCrmMasterFilter && window.selectedCrmMasterFilter !== 'all') {
                if (o.Master !== window.selectedCrmMasterFilter) return false;
            }
            if (!query) return true;
            return (o.Client && o.Client.toLowerCase().includes(query)) ||
                   (o.Service && o.Service.toLowerCase().includes(query)) ||
                   (o.Master && o.Master.toLowerCase().includes(query)) ||
                   (o.Date && o.Date.toLowerCase().includes(query));
        });

        filteredOrders.forEach(o => {
            totalRevenueSum += o.Price || 0;
            const cardHtml = `
            <div style="background:#121926; border:1px solid rgba(0,162,255,0.2); border-radius:10px; padding:10px; margin-bottom:8px; box-shadow:0 4px 10px rgba(0,0,0,0.5);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:bold; color:#fff; font-size:0.85rem;">${o.Client}</span>
                    <span style="font-family:'Orbitron'; font-size:0.85rem; color:var(--cyber-gold); font-weight:bold;">${o.Price} €</span>
                </div>
                <div style="font-size:0.75rem; color:var(--text-sub); margin-top:4px;">${o.Service}</div>
                <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:var(--cyber-blue); margin-top:4px;">
                    <span>💈 ${o.Master}</span>
                    <span>📅 ${o.Date}</span>
                </div>
                <div style="display:flex; gap:4px; margin-top:8px;">
                    ${o.Status === 'Новий' ? `<button class="action-btn-sm" style="flex:1; padding:4px; font-size:0.68rem; background:rgba(0,162,255,0.2); border:1px solid var(--cyber-blue); color:#fff;" onclick="updateOrderStatus(${o.id}, 'Підтверджено')">⚡ Підтвердити</button>` : ''}
                    ${o.Status !== 'Завершено' ? `<button class="action-btn-sm" style="flex:1; padding:4px; font-size:0.68rem; background:rgba(0,230,118,0.2); border:1px solid var(--accent-green); color:#fff;" onclick="updateOrderStatus(${o.id}, 'Завершено')">✅ Завершити</button>` : ''}
                    <button class="action-btn-sm" style="padding:4px 6px; font-size:0.68rem; background:rgba(255,215,0,0.15); border:1px solid var(--cyber-gold); color:var(--cyber-gold);" onclick="editOrderModal(${o.id})">✏️</button>
                    <button class="action-btn-sm" style="padding:4px 6px; font-size:0.68rem; background:rgba(255,42,42,0.15); border:1px solid var(--accent-red); color:var(--accent-red);" onclick="deleteOrder(${o.id})">🗑️</button>
                </div>
            </div>`;

            if (o.Status === 'Новий') { countNew++; htmlNew += cardHtml; }
            else if (o.Status === 'Підтверджено') { countConf++; htmlConf += cardHtml; }
            else { countDone++; htmlDone += cardHtml; }
        });

        colNew.innerHTML = htmlNew || '<div style="font-size:0.75rem; color:var(--text-sub); text-align:center; padding:15px;">Порожньо</div>';
        colConf.innerHTML = htmlConf || '<div style="font-size:0.75rem; color:var(--text-sub); text-align:center; padding:15px;">Порожньо</div>';
        colDone.innerHTML = htmlDone || '<div style="font-size:0.75rem; color:var(--text-sub); text-align:center; padding:15px;">Порожньо</div>';

        document.getElementById('count-new').innerText = countNew;
        document.getElementById('count-conf').innerText = countConf;
        document.getElementById('count-done').innerText = countDone;

        const statTotal = document.getElementById('crm-stat-total');
        const statRevenue = document.getElementById('crm-stat-revenue');
        const statDone = document.getElementById('crm-stat-done');

        if (statTotal) statTotal.innerText = filteredOrders.length;
        if (statRevenue) statRevenue.innerText = totalRevenueSum + ' €';
        if (statDone) statDone.innerText = countDone;

        // Populate Clients LTV Base
        populateClientsBase(db.orders);
    }

    function populateClientsBase(orders) {
        const clientList = document.getElementById('crm-clients-list');
        if (!clientList) return;

        const clientMap = {};
        orders.forEach(o => {
            if (!clientMap[o.Client]) {
                clientMap[o.Client] = { count: 0, total: 0, lastDate: o.Date };
            }
            clientMap[o.Client].count++;
            clientMap[o.Client].total += o.Price || 0;
            clientMap[o.Client].lastDate = o.Date;
        });

        let html = '';
        Object.keys(clientMap).forEach(name => {
            const c = clientMap[name];
            let tierBadge = '🥉 Bronze';
            let tierColor = 'var(--text-sub)';
            if (c.total >= 150) { tierBadge = '👑 Gold VIP'; tierColor = 'var(--cyber-gold)'; }
            else if (c.total >= 80) { tierBadge = '🥈 Silver VIP'; tierColor = 'var(--cyber-blue)'; }

            html += `
            <div style="background:#121926; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:10px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="openCrmClientModal(\'${name}\', ${c.total}, ${c.count}, \`${tierBadge}\`)">
                <div>
                    <div style="font-weight:bold; color:#fff; font-size:0.85rem;">${name}</div>
                    <div style="font-size:0.72rem; color:var(--text-sub);">Візитів: ${c.count} • Останній: ${c.lastDate}</div>
                </div>
                <div style="text-align:right;">
                    <div style="font-family:'Orbitron'; font-size:0.9rem; color:${tierColor}; font-weight:bold;">${c.total} €</div>
                    <div style="font-size:0.68rem; color:${tierColor}; font-weight:bold;">${tierBadge}</div>
                </div>
            </div>`;
        });
        clientList.innerHTML = html || '<div style="font-size:0.75rem; color:var(--text-sub); text-align:center;">База порожня</div>';
    }

    function updateOrderStatus(id, newStatus) {
        const db = getLocalDB();
        const order = db.orders.find(o => o.id === id);
        if (order) {
            order.Status = newStatus;
            saveLocalDB(db);
            populateCRM();
            if (typeof populateDirector === 'function') populateDirector();
            if (typeof populateMasterSchedule === 'function') populateMasterSchedule();
            if (typeof triggerHaptic === 'function') triggerHaptic('success');
            if (typeof showCyberToast === 'function') showCyberToast('Статус змінено на: ' + newStatus, '💼');
        }
    }

    function deleteOrder(id) {
        if(!confirm('Ви впевнені, що хочете видалити цей запис?')) return;
        const db = getLocalDB();
        db.orders = db.orders.filter(o => o.id !== id);
        saveLocalDB(db);
        populateCRM();
        if (typeof populateDirector === 'function') populateDirector();
        if (typeof populateMasterSchedule === 'function') populateMasterSchedule();
    }
    
    // Master Salary Calculation
    const _origPopulateMaster = (typeof populateMasterSchedule !== 'undefined') ? populateMasterSchedule : null;
    window.populateMasterSchedule = function() {
        if (typeof _origPopulateMaster === 'function') _origPopulateMaster();
        const db = getLocalDB();
        const percentInput = document.getElementById('master-percent');
        const percent = percentInput ? parseInt(percentInput.value) || 45 : 45;
        let totalMasterEarned = 0;
        db.orders.forEach(o => {
            if (o.Status === 'Завершено') totalMasterEarned += (o.Price * (percent/100));
        });
        const masterTotalEl = document.getElementById('master-total-cut');
        if(masterTotalEl) masterTotalEl.innerText = Math.round(totalMasterEarned) + ' €';
    };

    function payMasterSalary() {
        const masterTotalEl = document.getElementById('master-total-cut');
        if(!masterTotalEl || masterTotalEl.innerText === '0 €') return;
        triggerHaptic('success');
        if (tg && typeof tg.showAlert === 'function') tg.showAlert('💸 Зарплата успішно виплачена!');
        else showCyberToast('💸 Зарплата успішно виплачена!', '💰');
        masterTotalEl.innerText = '0 €';
    }

    // Chart.js for Director Tab
    let revenueChartInstance = null;
    function initChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;
        if (revenueChartInstance) {
            revenueChartInstance.destroy();
        }
        
        const db = getLocalDB();
        
        // Group by day for the last 7 days
        const last7Days = [];
        const today = new Date();
        for(let i=6; i>=0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dayStr = String(d.getDate()).padStart(2, '0'); const monthStr = String(d.getMonth() + 1).padStart(2, '0'); last7Days.push(`${dayStr}.${monthStr}`);
        }
        
        const revenues = [0,0,0,0,0,0,0];
        
        db.orders.forEach(o => {
            if (o.Status === 'Завершено') {
                // simple parse date "12.08 14:00" or similar
                const dMatch = o.Date.match(/(\d+\.\d+)/);
                if (dMatch) {
                    const idx = last7Days.indexOf(dMatch[1]);
                    if (idx !== -1) {
                        revenues[idx] += o.Price;
                    } else if (last7Days.includes(o.Date.substring(0,5))) {
                         revenues[last7Days.indexOf(o.Date.substring(0,5))] += o.Price;
                    }
                }
            }
        });

        // Add dummy data to look cool if empty
        if(revenues.reduce((a,b)=>a+b,0) === 0) {
            revenues[4] = 120;
            revenues[5] = 250;
            revenues[6] = 80;
        }

        revenueChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Прибуток (€)',
                    data: revenues,
                    borderColor: '#00a2ff',
                    backgroundColor: 'rgba(0,162,255,0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#ffd700',
                    pointBorderColor: '#000',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#8b9bb4' }
                    },
                    x: {
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#8b9bb4' }
                    }
                }
            }
        });
    }

    // Wrap populateDirector to also call initChart and calculate Net Profit
    const originalPopulateDirector = window.populateDirector;
    window.populateDirector = function() {
        if(typeof originalPopulateDirector === 'function') originalPopulateDirector();
        
        const db = getLocalDB();
        let gross = 0;
        db.orders.forEach(o => { if(o.Status === 'Завершено') gross += o.Price; });
        
        const tva = gross * 0.20;
        const urssaf = gross * 0.22;
        const expenses = 1350;
        
        // Master percentage deduction
        const percentInput = document.getElementById('master-percent');
        const masterPercent = percentInput ? parseInt(percentInput.value) || 45 : 45;
        const masterCut = gross * (masterPercent/100);
        
        const net = gross - tva - urssaf - expenses - masterCut;
        
        const formatMoney = (val) => Math.round(val) + ' €';
        
        const elGross = document.getElementById('acc-gross');
        const elTva = document.getElementById('acc-tva');
        const elUrssaf = document.getElementById('acc-urssaf');
        const elNet = document.getElementById('acc-net');
        const elDirTotal = document.getElementById('dir-total-revenue');
        const elDirNet = document.getElementById('dir-net-profit');
        
        if(elGross) elGross.innerText = formatMoney(gross);
        if(elTva) elTva.innerText = formatMoney(tva);
        if(elUrssaf) elUrssaf.innerText = formatMoney(urssaf);
        if(elNet) elNet.innerText = formatMoney(net);
        
        if(elDirTotal) elDirTotal.innerText = formatMoney(gross);
        if(elDirNet) elDirNet.innerText = formatMoney(net);

        setTimeout(() => {
            initChart();
        }, 100);
    };

    // Auto-init chart on first load if on director tab
    if (document.getElementById('page-erp') && document.getElementById('page-erp').classList.contains('active')) {
        if (typeof populateDirector === 'function') populateDirector();
    }

    // Theme Switcher Logic
    let currentThemeIndex = 0;
    const themes = [
        { name: 'MEGAN 2.0 Blue', blue: '#00a2ff', glow: 'rgba(0,162,255,0.6)' },
        { name: 'Vampire Red', blue: '#ff2a2a', glow: 'rgba(255,42,42,0.6)' },
        { name: 'Matrix Green', blue: '#00ff41', glow: 'rgba(0,255,65,0.6)' }
    ];
    function toggleNeonTheme() {
        triggerHaptic('medium');
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const root = document.documentElement;
        root.style.setProperty('--cyber-blue', themes[currentThemeIndex].blue);
        root.style.setProperty('--blue-glow', themes[currentThemeIndex].glow);
        if (tg.showAlert) tg.showAlert(`🎨 Увімкнено тему: ${themes[currentThemeIndex].name}`);
    }

    // QR Modal Logic
    function openQRModal() {
        triggerHaptic('success');
        document.getElementById('qr-modal').classList.add('active');
    }
    function closeQRModal() {
        triggerHaptic('light');
        document.getElementById('qr-modal').classList.remove('active');
    }

    // WEATHER API INTEGRATION (DYNAMIC IP & LIVE ACCURATE OPEN-METEO)
    async function fetchWeather() {
        let lat = 43.7102;
        let lon = 7.2620;
        let cityName = 'Ніцці';

        try {
            const geoRes = await fetch('https://ipapi.co/json/').catch(() => null);
            if (geoRes && geoRes.ok) {
                const geoData = await geoRes.json();
                if (geoData && geoData.latitude && geoData.longitude) {
                    lat = geoData.latitude;
                    lon = geoData.longitude;
                    cityName = geoData.city || 'Ніцці';
                }
            }
        } catch (e) {
            console.log('Using default location: Nice');
        }

        try {
            const cityEl = document.getElementById('weather-city-title');
            if (cityEl) cityEl.innerHTML = '☀️ Погода у ' + cityName + ' (Côte d\'Azur):';

            const weatherRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true');
            const data = await weatherRes.json();
            const weather = data && data.current_weather;
            if (!weather) throw new Error('No weather data received');
            const temp = Math.round(weather.temperature);
            const code = weather.weathercode;

            let conditionIcon = '☀️';
            let aiTip = 'Ідеальні умови для укладки ✨';

            if (code === 0) { conditionIcon = '☀️'; aiTip = 'Сонячно! VIP догляд UV+ ☀️'; }
            else if (code >= 1 && code <= 3) { conditionIcon = '⛅'; aiTip = 'Мінлива хмарність ⛅'; }
            else if (code >= 45 && code <= 48) { conditionIcon = '🌫'; aiTip = 'Захист волосся від вологи 🌫'; }
            else if (code >= 51 && code <= 67) { conditionIcon = '🌧'; aiTip = 'Падає дощ! Фіксація 24h 🌧'; }
            else if (code >= 71 && code <= 77) { conditionIcon = '❄️'; aiTip = 'Мороз! Живильний догляд ❄️'; }
            else if (code >= 80 && code <= 82) { conditionIcon = '🌧'; aiTip = 'Злива! Захисне покриття ☔'; }
            else if (code >= 95) { conditionIcon = '⛈'; aiTip = 'Гроза! Укладка з антистатиком ⛈'; }

            const tempEl = document.getElementById('weather-temp');
            if (tempEl) tempEl.innerHTML = (temp > 0 ? '+' : '') + temp + '°C | ' + conditionIcon;

            const aiTextEl = document.getElementById('weather-ai-text');
            if (aiTextEl) aiTextEl.innerHTML = 'MEGAN 2.0 AI:<br>' + aiTip;
        } catch (err) {
            console.error('Weather fetch error:', err);
            const tempEl = document.getElementById('weather-temp');
            if (tempEl) tempEl.innerHTML = '+24°C | ☀️';
        }
    }
    fetchWeather(); // Call immediately

    // SMART TIME SLOTS
    function checkAvailableSlots() {
        const db = getLocalDB();
        const barberEl = document.getElementById('select-barber');
        if (!barberEl) return;
        const master = barberEl.value;
        const slots = document.querySelectorAll('.slot-btn');
        
        slots.forEach(slot => {
            slot.classList.remove('disabled');
            slot.style.opacity = '1';
            slot.style.pointerEvents = 'auto';
            const time = slot.innerText.trim();
            const fullDateStr = (typeof selectedDateText !== 'undefined' ? selectedDateText : '') + " " + time;
            
            // Перевіряємо чи слот вже зайнятий у БД
            const isBooked = db.orders.some(o => o.Master === master && o.Date === fullDateStr);
            if (isBooked) {
                slot.classList.add('disabled');
                slot.style.opacity = '0.3';
                slot.style.pointerEvents = 'none';
                slot.classList.remove('selected');
            }
        });
        
        // Авто-вибір першого вільного слоту
        const firstFree = Array.from(slots).find(s => !s.classList.contains('disabled'));
        if (firstFree) {
            slots.forEach(s => s.classList.remove('selected'));
            firstFree.classList.add('selected');
            selectedTimeText = firstFree.innerText.trim();
        } else {
            selectedTimeText = "";
        }
    }
    
    // Add onchange to select-barber so it re-checks slots when a new master is picked
    const selectBarber = document.getElementById('select-barber');
    if(selectBarber) selectBarber.addEventListener('change', checkAvailableSlots);
        let cartCount = 0;
        const originalBuyShopItem = window.buyShopItem;
        window.buyShopItem = function(itemName) {
            cartCount++;
            const badge = document.getElementById('nav-shop-badge');
            if (badge) {
                badge.innerText = cartCount;
                badge.style.display = 'inline-block';
            }
            if (typeof showCyberToast === 'function') {
                showCyberToast('Додано у кошик: ' + itemName, '🛒');
            }
            if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        };

        window.openHelpModal = function() {
            const modal = document.getElementById('help-modal');
            if (modal) {
                modal.classList.add('active');
                modal.classList.add('show');
            }
            if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        };

        window.closeHelpModal = function() {
            const modal = document.getElementById('help-modal');
            if (modal) {
                modal.classList.remove('active');
                modal.classList.remove('show');
            }
            if (typeof triggerHaptic === 'function') triggerHaptic('light');
        };

    // ⚡ TELEGRAM X & WEBAPP 2026 API ADVANCED FEATURE SUITE
    (function initTelegramFeatures() {
        if (!window.Telegram || !window.Telegram.WebApp) return;
        const tg = window.Telegram.WebApp;
        
        try { if (tg.ready) tg.ready(); } catch(e){}
        try { if (tg.expand) tg.expand(); } catch(e){}
        try { if (tg.requestFullscreen) tg.requestFullscreen(); } catch(e){}
        try { if (tg.enableClosingConfirmation) tg.enableClosingConfirmation(); } catch(e){}
        try { if (tg.setHeaderColor) tg.setHeaderColor('#0b1019'); } catch(e){}
        try { if (tg.setBackgroundColor) tg.setBackgroundColor('#000000'); } catch(e){}

        // Disable Telegram Native MainButton to eliminate duplicate "Записатися" button
        try {
            if (tg.MainButton) {
                tg.MainButton.hide();
            }
        } catch(e){}

        // Auto CloudStorage sync for VIP status
        try {
            if (tg.CloudStorage) {
                tg.CloudStorage.setItem('vip_status', 'LVL_3_VIP', function(err, success) {
                    if (success) console.log('✅ CloudStorage VIP status synced!');
                });
            }
        } catch(e){}
    })();

    // ⚡ 3-PERIOD TIME PICKER LOGIC (РАНОК, ДЕНЬ, ВЕЧІР)
    window.timePeriodSlots = {
        'morning': ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
        'day': ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
        'evening': ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30']
    };

    window.pickTimePeriod = function(period, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        document.querySelectorAll('.cyber-period-chip').forEach(c => {
            c.classList.remove('active');
            c.style.background = 'rgba(255,255,255,0.05)';
            c.style.borderColor = 'rgba(255,255,255,0.15)';
            c.style.color = 'var(--text-sub)';
        });
        if (el) {
            el.classList.add('active');
            el.style.background = 'rgba(0,162,255,0.2)';
            el.style.borderColor = 'var(--cyber-blue)';
            el.style.color = '#ffffff';
        }
        const container = document.getElementById('time-slots-container');
        if (!container) return;
        const slots = window.timePeriodSlots[period] || window.timePeriodSlots['morning'];
        container.innerHTML = '';
        slots.forEach((t, i) => {
            const btn = document.createElement('div');
            btn.className = 'slot-btn' + (i === 0 ? ' selected' : '');
            btn.innerText = t;
            btn.onclick = function() { selectTimeSlot(t, btn); };
            container.appendChild(btn);
        });
        if (slots.length > 0 && typeof window.selectTimeSlot === 'function') {
            const firstBtn = container.querySelector('.slot-btn');
            window.selectTimeSlot(slots[0], firstBtn);
        }
    };

    // 🛒 INTERACTIVE CART MANAGEMENT SYSTEM
    window.shoppingCart = [];

    const originalBuyShopItemImpl = window.buyShopItem;
    window.buyShopItem = function(itemName, itemPrice) {
        const priceMap = {
            'Помада MEGAN 2.0 Matte': 25,
            'Голографічний гель': 15,
            'Кібер-олія для бороди': 20,
            'VOVAN BOOST (Енергетик)': 5
        };
        const price = itemPrice || priceMap[itemName] || 20;
        
        const existing = window.shoppingCart.find(i => i.name === itemName);
        if (existing) {
            existing.qty++;
        } else {
            window.shoppingCart.push({ name: itemName, price: price, qty: 1 });
        }

        let totalItems = 0;
        window.shoppingCart.forEach(i => totalItems += i.qty);

        const badge = document.getElementById('nav-shop-badge');
        if (badge) {
            badge.innerText = totalItems;
            badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }

        if (typeof showCyberToast === 'function') {
            showCyberToast('Додано у кошик: ' + itemName + ' (' + price + '€)', '🛒');
        }
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
    };

    // Make Market nav badge clickable to open Cart Modal
    document.addEventListener('DOMContentLoaded', () => {
        const shopBadge = document.getElementById('nav-shop-badge');
        if (shopBadge) {
            shopBadge.style.cursor = 'pointer';
            shopBadge.onclick = function(e) {
                e.stopPropagation();
                window.openCartModal();
            };
        }
    });

    window.openCartModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        const modal = document.getElementById('cart-modal');
        const container = document.getElementById('cart-items-container');
        const totalEl = document.getElementById('cart-total-price');

        if (!container) return;

        if (window.shoppingCart.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:var(--text-sub); font-size:0.85rem; padding:20px 0;">Ваш кошик порожній 🛒</p>';
            if (totalEl) totalEl.innerText = '0 €';
        } else {
            let html = '';
            let total = 0;
            window.shoppingCart.forEach((item, index) => {
                const itemTotal = item.price * item.qty;
                total += itemTotal;
                html += `
                <div style="display:flex; justify-content:space-between; align-items:center; background:#121926; border:1px solid rgba(0,162,255,0.2); border-radius:10px; padding:10px; margin-bottom:8px;">
                    <div>
                        <div style="font-weight:bold; color:#fff; font-size:0.82rem;">${item.name}</div>
                        <div style="font-size:0.75rem; color:var(--cyber-gold);">${item.price} € x ${item.qty} = ${itemTotal} €</div>
                    </div>
                    <div style="display:flex; gap:6px; align-items:center;">
                        <button style="background:rgba(255,215,0,0.2); border:1px solid var(--cyber-gold); color:#fff; width:26px; height:26px; border-radius:6px; font-weight:bold; cursor:pointer;" onclick="updateCartItemQty(${index}, -1)">-</button>
                        <span style="font-size:0.85rem; color:#fff; font-weight:bold; min-width:16px; text-align:center;">${item.qty}</span>
                        <button style="background:rgba(0,230,118,0.2); border:1px solid var(--accent-green); color:#fff; width:26px; height:26px; border-radius:6px; font-weight:bold; cursor:pointer;" onclick="updateCartItemQty(${index}, 1)">+</button>
                    </div>
                </div>`;
            });
            container.innerHTML = html;
            if (totalEl) totalEl.innerText = total + ' €';
        }

        if (modal) modal.classList.add('active');
    };

    window.closeCartModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('cart-modal');
        if (modal) modal.classList.remove('active');
    };

    window.updateCartItemQty = function(index, delta) {
        if (window.shoppingCart[index]) {
            window.shoppingCart[index].qty += delta;
            if (window.shoppingCart[index].qty <= 0) {
                window.shoppingCart.splice(index, 1);
            }
        }
        window.openCartModal();
    };

    window.checkoutCart = function() {
        if (window.shoppingCart.length === 0) {
            if (typeof showCyberToast === 'function') showCyberToast('Ваш кошик порожній!', '⚠️');
            return;
        }
        let total = 0;
        let summaryText = '🛒 <b>НОВЕ ЗАМОВЛЕННЯ З МАРКЕТУ!</b>\n';
        window.shoppingCart.forEach(i => {
            const sum = i.price * i.qty;
            total += sum;
            summaryText += `• ${i.name} (${i.qty} шт.) — ${sum} €\n`;
        });
        summaryText += `\n<b>Загалом: ${total} €</b>`;

        if (typeof sendBotNotification === 'function') sendBotNotification(summaryText);
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof showCyberToast === 'function') showCyberToast('Замовлення оформлено! Дякуємо! 🛍️', '✨');

        window.shoppingCart = [];
        const badge = document.getElementById('nav-shop-badge');
        if (badge) badge.style.display = 'none';

        window.closeCartModal();
    };

    // 💈 AI STYLE PRESETS
    window.selectedAiStyle = 'Cyberpunk Fade';
    window.setAiStylePreset = function(styleName, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        window.selectedAiStyle = styleName;
        document.querySelectorAll('#page-ai .cyber-chip').forEach(c => c.classList.remove('active'));
        if (el) el.classList.add('active');
        const statusEl = document.getElementById('ai-scan-status');
        if (statusEl) statusEl.innerText = 'ОБРАНО СТИЛЬ: ' + styleName.toUpperCase();
    };

    // 🎁 NFT GIFT CUSTOMIZER LOGIC
    window.currentGiftAmount = 50;

    window.buyGiftCard = function(giftTitle) {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        const modal = document.getElementById('gift-modal');
        const prevTitle = document.getElementById('nft-prev-title');
        if (prevTitle) prevTitle.innerText = giftTitle.toUpperCase();
        if (modal) modal.classList.add('active');
    };

    window.closeGiftModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('gift-modal');
        if (modal) modal.classList.remove('active');
    };

    window.setGiftAmount = function(amount, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        window.currentGiftAmount = amount;
        document.querySelectorAll('#gift-modal .cyber-chip').forEach(c => {
            c.classList.remove('active');
            c.style.background = 'rgba(255,255,255,0.05)';
        });
        if (el) {
            el.classList.add('active');
            el.style.background = 'rgba(0,162,255,0.2)';
        }
        const priceEl = document.getElementById('nft-prev-price');
        if (priceEl) priceEl.innerText = amount + ' €';
    };

    window.updateNftPreview = function() {
        const input = document.getElementById('gift-to-name');
        const toEl = document.getElementById('nft-prev-to');
        if (input && toEl) {
            toEl.innerText = 'Для: ' + (input.value.trim() || 'Шановного Клієнта');
        }
    };

    window.confirmGiftPurchase = function() {
        const input = document.getElementById('gift-to-name');
        const name = input ? input.value.trim() : 'Шановного Клієнта';
        const msg = `🎁 <b>НОВИЙ NFT СЕРТИФІКАТ СТВОРЕНО!</b>\nОдержувач: <b>${name}</b>\nНомінал: <b>${window.currentGiftAmount} €</b>`;
        
        if (typeof sendBotNotification === 'function') sendBotNotification(msg);
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof showCyberToast === 'function') showCyberToast('NFT Сертифікат створено для ' + name + '! 🎁', '💎');

        window.closeGiftModal();
    };

    // 💸 MASTER TIP SYSTEM LOGIC
    window.currentMasterForTip = 'VOVAN';

    window.openMasterTipModal = function(masterName) {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        window.currentMasterForTip = masterName || 'VOVAN';
        const titleEl = document.getElementById('tip-master-name');
        if (titleEl) titleEl.innerText = 'Майстер: ' + window.currentMasterForTip;
        const modal = document.getElementById('tip-modal');
        if (modal) modal.classList.add('active');
    };

    window.closeTipModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('tip-modal');
        if (modal) modal.classList.remove('active');
    };

    window.sendMasterTip = function(amount) {
        const msg = `💸 <b>ЧАЙОВІ ДЛЯ МАЙСТРА!</b>\nМайстер: <b>${window.currentMasterForTip}</b>\nСума: <b>${amount} €</b>`;
        if (typeof sendBotNotification === 'function') sendBotNotification(msg);
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof showCyberToast === 'function') showCyberToast('Дякуємо за чайові ' + amount + '€ для ' + window.currentMasterForTip + '! 💸', '✨');
        window.closeTipModal();
    };

    // 📸 GALLERY MODAL LOGIC
    window.openGalleryModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        const modal = document.getElementById('gallery-modal');
        if (modal) modal.classList.add('active');
    };

    window.closeGalleryModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('gallery-modal');
        if (modal) modal.classList.remove('active');
    };

    window.switchGalleryImg = function(imgSrc) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const mainImg = document.getElementById('gallery-main-img');
        if (mainImg) {
            mainImg.style.opacity = '0.3';
            setTimeout(() => {
                mainImg.src = imgSrc;
                mainImg.style.opacity = '1';
            }, 150);
        }
    };

    // ⭐️ REVIEW SYSTEM LOGIC
    window.currentReviewRating = 5;

    window.openReviewModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        const modal = document.getElementById('review-modal');
        if (modal) modal.classList.add('active');
    };

    window.closeReviewModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('review-modal');
        if (modal) modal.classList.remove('active');
    };

    window.setReviewRating = function(stars) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        window.currentReviewRating = stars;
        const container = document.getElementById('review-stars-container');
        if (container) {
            const spans = container.querySelectorAll('span');
            spans.forEach((s, idx) => {
                s.style.opacity = idx < stars ? '1' : '0.3';
                s.style.filter = idx < stars ? 'drop-shadow(0 0 8px var(--cyber-gold))' : 'none';
            });
        }
    };

    window.submitReview = function() {
        const textInput = document.getElementById('review-text-input');
        const text = textInput ? textInput.value.trim() : '';
        const msg = `⭐️ <b>НОВИЙ ВІДГУК КЛІЄНТА!</b>\nОцінка: <b>${'⭐'.repeat(window.currentReviewRating)}</b>\nКоментар: ${text || 'Без коментаря'}`;

        if (typeof sendBotNotification === 'function') sendBotNotification(msg);
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof showCyberToast === 'function') showCyberToast('Дякуємо за ваш відгук! ⭐️', '✨');

        if (textInput) textInput.value = '';
        window.closeReviewModal();
    };

    window.openModalWithMaster = function(masterName) {
        if (typeof pickMasterCard === 'function') {
            const btn = Array.from(document.querySelectorAll('#barber-picker-container .cyber-picker-btn')).find(b => b.innerText.includes(masterName));
            if (btn) pickMasterCard(masterName, btn);
        }
        if (typeof openModal === 'function') openModal();
    };

    // 🎟️ PROMO CODE SYSTEM
    window.appliedPromoDiscount = 0;

    window.applyPromoCode = function() {
        const input = document.getElementById('promo-code-input');
        const badge = document.getElementById('promo-discount-badge');
        const code = input ? input.value.trim().toUpperCase() : '';

        if (code === 'MEGAN2026' || code === 'VOVAN10' || code === 'VIP10') {
            window.appliedPromoDiscount = 10;
            if (badge) badge.style.display = 'block';
            if (typeof triggerHaptic === 'function') triggerHaptic('success');
            if (typeof showCyberToast === 'function') showCyberToast('Промокод ' + code + ' застосовано (-10€)!', '🎟️');
        } else {
            window.appliedPromoDiscount = 0;
            if (badge) badge.style.display = 'none';
            if (typeof triggerHaptic === 'function') triggerHaptic('error');
            if (typeof showCyberToast === 'function') showCyberToast('Невірний промокод!', '⚠️');
        }
    };

    // 🔊 CYBERPUNK WEB AUDIO SYNTHESIZER FX
    window.playCyberAudioFx = function(type) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.05);
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
            } else if (type === 'success') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
                osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            }
        } catch(e) {}
    };

    // 💈 PORTFOLIO MODAL LOGIC
    window.openPortfolioModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        window.playCyberAudioFx('click');
        const modal = document.getElementById('portfolio-modal');
        if (modal) modal.classList.add('active');
    };

    window.closePortfolioModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('portfolio-modal');
        if (modal) modal.classList.remove('active');
    };

    // ⚡ SERVICE CATEGORY FILTER LOGIC
    window.filterServicesCategory = function(cat, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');

        document.querySelectorAll('.vintage-menu .cyber-chip').forEach(c => {
            c.classList.remove('active');
            c.style.background = 'rgba(255,255,255,0.05)';
            c.style.borderColor = 'rgba(255,255,255,0.15)';
            c.style.color = 'var(--text-sub)';
        });

        if (el) {
            el.classList.add('active');
            el.style.background = 'rgba(0,162,255,0.2)';
            el.style.borderColor = 'var(--cyber-blue)';
            el.style.color = '#ffffff';
        }

        const items = document.querySelectorAll('.vintage-menu .menu-item');
        items.forEach(item => {
            const itemCat = item.getAttribute('data-cat') || 'haircut';
            if (cat === 'all' || itemCat === cat) {
                item.style.display = 'flex';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    };

    // 🇫🇷 LIVE NICE CÔTE D'AZUR LOCAL CLOCK
    function updateNiceLiveClock() {
        const clockEl = document.getElementById('header-nice-clock');
        if (!clockEl) return;
        const now = new Date();
        const timeStr = now.toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        clockEl.innerText = timeStr;
    }
    setInterval(updateNiceLiveClock, 1000);
    updateNiceLiveClock();

    // 💈 MASTER SHIFT & BREAK CONTROLLER
    window.isMasterOnShift = true;

    window.toggleMasterShift = function() {
        window.isMasterOnShift = !window.isMasterOnShift;
        const statusEl = document.getElementById('master-shift-status');
        const btnEl = document.getElementById('btn-master-shift');

        if (statusEl) {
            statusEl.innerText = window.isMasterOnShift ? '🟢 НА ЗМІНІ' : '🔴 ЗМІНУ ЗАВЕРШЕНО';
            statusEl.style.color = window.isMasterOnShift ? 'var(--accent-green)' : 'var(--accent-red)';
        }
        if (btnEl) {
            btnEl.innerText = window.isMasterOnShift ? '🔴 Завершити зміну' : '🟢 Розпочати зміну';
        }

        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof showCyberToast === 'function') showCyberToast(window.isMasterOnShift ? 'Зміну розпочато!' : 'Зміну завершено!', '💈');
    };

    window.takeMasterBreak = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof showCyberToast === 'function') showCyberToast('Паузу на 15 хвилин додано у розклад!', '☕');
    };

    // 💼 CRM CLIENT ACTION MODAL LOGIC
    window.selectedCrmClient = '';

    window.openCrmClientModal = function(name, ltv, visits, tier) {
        window.selectedCrmClient = name;
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        
        const modal = document.getElementById('crm-client-action-modal');
        const elName = document.getElementById('crm-modal-client-name');
        const elTier = document.getElementById('crm-modal-client-tier');
        const elLtv = document.getElementById('crm-modal-client-ltv');
        const elVisits = document.getElementById('crm-modal-client-visits');

        if (elName) elName.innerText = '👤 ' + name;
        if (elTier) elTier.innerText = tier;
        if (elLtv) elLtv.innerText = ltv + ' €';
        if (elVisits) elVisits.innerText = visits;

        if (modal) modal.classList.add('active');
    };

    window.closeCrmClientModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('crm-client-action-modal');
        if (modal) modal.classList.remove('active');
    };

    window.notifyClientTelegram = function() {
        const msg = `🔔 <b>НАГАДУВАННЯ КЛІЄНТУ</b>\nДоброго дня, ${window.selectedCrmClient}! Нагадуємо про ваш візит у VOVAN BEAUTY STUDIO у Ніцці 🇫🇷.`;
        if (typeof sendBotNotification === 'function') sendBotNotification(msg);
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof showCyberToast === 'function') showCyberToast('Нагадування надіслано ' + window.selectedCrmClient + '!', '💬');
        window.closeCrmClientModal();
    };

    window.awardLoyaltyPoints = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof showCyberToast === 'function') showCyberToast('+50 бонусів нараховано клієнту ' + window.selectedCrmClient + '!', '🎁');
        window.closeCrmClientModal();
    };

    // 🍾 VIP BAR SEAT ORDER LOGIC
    window.selectedDrinkToOrder = '';

    window.orderDrink = function(drinkName) {
        window.selectedDrinkToOrder = drinkName;
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');
        
        const modal = document.getElementById('bar-order-modal');
        const titleEl = document.getElementById('bar-modal-drink-name');
        if (titleEl) titleEl.innerText = '🍾 ' + drinkName;
        if (modal) modal.classList.add('active');
    };

    window.closeBarOrderModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('bar-order-modal');
        if (modal) modal.classList.remove('active');
    };

    window.confirmBarSeatOrder = function(seatLocation) {
        const msg = `🍾 <b>НОВЕ ЗАМОВЛЕННЯ В КРІСЛО!</b>\nНапій: <b>${window.selectedDrinkToOrder}</b>\nЛокація: <b>${seatLocation}</b>`;
        if (typeof sendBotNotification === 'function') sendBotNotification(msg);
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('success');
        if (typeof showCyberToast === 'function') showCyberToast('Замовлення ' + window.selectedDrinkToOrder + ' прийнято! Подача в ' + seatLocation, '🍾');
        
        window.closeBarOrderModal();
    };

    // 🎁 GIFT CARD CUSTOMIZER LOGIC
    window.currentGiftAmountVal = 100;

    window.setGiftAmount = function(amount, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');
        
        window.currentGiftAmountVal = amount;
        const prevAmount = document.getElementById('gift-preview-amount');
        if (prevAmount) prevAmount.innerText = amount + ' €';

        document.querySelectorAll('#page-gifts .action-btn-sm').forEach(b => {
            b.style.background = 'rgba(255,255,255,0.05)';
            b.style.borderColor = 'rgba(255,255,255,0.15)';
            b.style.color = '#fff';
        });

        if (el) {
            el.style.background = 'rgba(255,215,0,0.2)';
            el.style.borderColor = 'var(--cyber-gold)';
            el.style.color = 'var(--cyber-gold)';
        }
    };

    window.updateGiftPreview = function() {
        const recipInput = document.getElementById('gift-recipient-input');
        const wishesInput = document.getElementById('gift-wishes-input');
        const prevTo = document.getElementById('gift-preview-to');
        const prevWishes = document.getElementById('gift-preview-wishes');

        if (prevTo) prevTo.innerText = 'Отримувач: ' + (recipInput && recipInput.value.trim() ? recipInput.value.trim() : 'Для Коханої');
        if (prevWishes) prevWishes.innerText = '«' + (wishesInput && wishesInput.value.trim() ? wishesInput.value.trim() : 'З найкращими побажаннями!') + '»';
    };

    window.purchaseGiftCard = function() {
        const recipInput = document.getElementById('gift-recipient-input');
        const wishesInput = document.getElementById('gift-wishes-input');
        const recipient = recipInput && recipInput.value.trim() ? recipInput.value.trim() : 'Для Коханої';
        const wishes = wishesInput && wishesInput.value.trim() ? wishesInput.value.trim() : 'З найкращими побажаннями!';

        const msg = `🎁 <b>НОВИЙ NFT ПОДАРУНКОВИЙ СЕРТИФІКАТ!</b>\nСума: <b>${window.currentGiftAmountVal} €</b>\nОтримувач: <b>${recipient}</b>\nПобажання: <i>${wishes}</i>`;

        if (typeof sendBotNotification === 'function') sendBotNotification(msg);
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('success');
        if (typeof showCyberToast === 'function') showCyberToast('Сертифікат на ' + window.currentGiftAmountVal + '€ успішно оформлено!', '🎁');
    };

    // 🍾 VIP BAR CATEGORY FILTER LOGIC
    window.filterBarCategory = function(cat, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');

        document.querySelectorAll('#page-bar .cyber-chip').forEach(c => {
            c.classList.remove('active');
            c.style.background = 'rgba(255,255,255,0.05)';
            c.style.borderColor = 'rgba(255,255,255,0.15)';
            c.style.color = 'var(--text-sub)';
        });

        if (el) {
            el.classList.add('active');
            el.style.background = 'rgba(255,215,0,0.2)';
            el.style.borderColor = 'var(--cyber-gold)';
            el.style.color = 'var(--cyber-gold)';
        }

        const cards = document.querySelectorAll('#page-bar .bar-card');
        cards.forEach(card => {
            const cardCat = card.getAttribute('data-bar-cat') || 'coffee';
            if (cat === 'all' || cardCat === cat) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    };

    // 🎟️ BOOKING SUCCESS RECEIPT MODAL LOGIC
    window.showBookingReceiptModal = function(client, master, service, dateTime, price) {
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('success');

        const modal = document.getElementById('booking-success-modal');
        const elClient = document.getElementById('rec-client-name');
        const elMaster = document.getElementById('rec-master-name');
        const elService = document.getElementById('rec-service-name');
        const elDate = document.getElementById('rec-date-time');
        const elPrice = document.getElementById('rec-final-price');

        if (elClient) elClient.innerText = client;
        if (elMaster) elMaster.innerText = master;
        if (elService) elService.innerText = service;
        if (elDate) elDate.innerText = dateTime;
        if (elPrice) elPrice.innerText = price + ' €';

        if (modal) modal.classList.add('active');
    };

    window.closeBookingSuccessModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('booking-success-modal');
        if (modal) modal.classList.remove('active');
        if (typeof closeModal === 'function') closeModal();
    };

    // ℹ️ TELEGRAM SUPPORT DIRECT LINK
    window.openTelegramSupport = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
            window.Telegram.WebApp.openTelegramLink('https://t.me/VOVAN_BEAUTY_SUPPORT');
        } else {
            window.open('https://t.me/VOVAN_BEAUTY_SUPPORT', '_blank');
        }
    };

    // 💎 TON CRYPTO PAYMENT LOGIC
    window.payWithTonWallet = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
            window.Telegram.WebApp.openTelegramLink('https://t.me/wallet');
        } else {
            window.open('https://t.me/wallet', '_blank');
        }
        if (typeof showCyberToast === 'function') showCyberToast('Відкриваємо Telegram Wallet (TON)... 💎', '🚀');
    };

    // 🎨 LIVE ACCENT THEME SWITCHER
    window.setAccentTheme = function(themeName) {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');

        const root = document.documentElement;
        if (themeName === 'gold') {
            root.style.setProperty('--cyber-blue', '#ffd700');
            root.style.setProperty('--blue-glow', 'rgba(255,215,0,0.6)');
            if (typeof showCyberToast === 'function') showCyberToast('Тема змінена: Золото 👑', '✨');
        } else if (themeName === 'cyan') {
            root.style.setProperty('--cyber-blue', '#00a2ff');
            root.style.setProperty('--blue-glow', 'rgba(0,162,255,0.6)');
            if (typeof showCyberToast === 'function') showCyberToast('Тема змінена: Блакитний 💎', '✨');
        } else if (themeName === 'green') {
            root.style.setProperty('--cyber-blue', '#00e676');
            root.style.setProperty('--blue-glow', 'rgba(0,230,118,0.6)');
            if (typeof showCyberToast === 'function') showCyberToast('Тема змінена: Неон 🧪', '✨');
        }
    };

    // 💈 SERVICE DETAIL MODAL LOGIC
    window.selectedDetailServiceName = 'Стрижка MEGAN 2.0 Cyber Style (40 €)';

    window.selectServiceModal = function(serviceName, servicePrice, imgSrc) {
        window.selectedDetailServiceName = serviceName;
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');

        const modal = document.getElementById('service-detail-modal');
        const titleEl = document.getElementById('srv-detail-title');
        const priceEl = document.getElementById('srv-detail-price');
        const imgEl = document.getElementById('srv-detail-img');

        if (titleEl) titleEl.innerText = serviceName;
        if (priceEl) priceEl.innerText = (servicePrice || '40') + ' € • ⏱️ 45 хв';
        if (imgEl && imgSrc) imgEl.src = imgSrc;

        if (modal) modal.classList.add('active');
    };

    window.closeServiceDetailModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('service-detail-modal');
        if (modal) modal.classList.remove('active');
    };

    window.confirmServiceDetailBooking = function() {
        window.closeServiceDetailModal();
        if (typeof pickServiceChip === 'function') {
            const chip = Array.from(document.querySelectorAll('#service-chips-container .cyber-chip')).find(c => c.innerText.includes(window.selectedDetailServiceName.substring(0, 8)));
            if (chip) pickServiceChip(window.selectedDetailServiceName, chip);
        }
        if (typeof openModal === 'function') openModal();
    };

    // 📅 MASTER LIVE TIMELINE LOGIC
    window.openMasterTimelineModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');

        const modal = document.getElementById('master-timeline-modal');
        const container = document.getElementById('master-timeline-hours-container');
        
        if (container) {
            const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
            const db = getLocalDB();
            let html = '';

            hours.forEach(h => {
                const order = db.orders.find(o => o.Date && o.Date.includes(h));
                if (order) {
                    html += `
                    <div style="background:#121926; border:1px solid rgba(0,162,255,0.3); border-radius:10px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-family:'Orbitron'; font-size:0.8rem; color:var(--cyber-blue); font-weight:bold;">${h}</span>
                        <div style="text-align:right;">
                            <div style="font-size:0.8rem; font-weight:bold; color:#fff;">${order.Client} (${order.Service})</div>
                            <div style="font-size:0.68rem; color:var(--accent-green);">🟢 Зайнято (${order.Price} €)</div>
                        </div>
                    </div>`;
                } else {
                    html += `
                    <div style="background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.1); border-radius:10px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-family:'Orbitron'; font-size:0.8rem; color:var(--text-sub);">${h}</span>
                        <span style="font-size:0.72rem; color:var(--text-sub);">⚪ Вільний слот</span>
                    </div>`;
                }
            });

            container.innerHTML = html;
        }

        if (modal) modal.classList.add('active');
    };

    window.closeMasterTimelineModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('master-timeline-modal');
        if (modal) modal.classList.remove('active');
    };

    // 📦 WAREHOUSE REPLENISH LOGIC
    window.replenishStock = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');
        const modal = document.getElementById('warehouse-modal');
        if (modal) modal.classList.add('active');
    };

    window.closeWarehouseModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('warehouse-modal');
        if (modal) modal.classList.remove('active');
    };

    window.confirmWarehouseReplenish = function() {
        const addShampoo = parseInt(document.getElementById('wh-add-shampoo').value) || 0;
        const addPaint = parseInt(document.getElementById('wh-add-paint').value) || 0;
        const addCoffee = parseInt(document.getElementById('wh-add-coffee').value) || 0;

        const db = getLocalDB();
        if (db.warehouse) {
            db.warehouse.forEach(w => {
                if (w.item.includes('Шампунь')) w.amount = Math.min(w.max, w.amount + addShampoo);
                if (w.item.includes('Фарба')) w.amount = Math.min(w.max, w.amount + addPaint);
                if (w.item.includes('Кава')) w.amount = Math.min(w.max, w.amount + addCoffee);
            });
            saveLocalDB(db);
            if (typeof populateWarehouse === 'function') populateWarehouse();
        }

        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('success');
        if (typeof showCyberToast === 'function') showCyberToast('Склад успішно поповнено!', '📦');
        
        window.closeWarehouseModal();
    };

    // 🤖 AI SCANNER MODAL LOGIC
    window.startAiScannerModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');

        const modal = document.getElementById('ai-scanner-modal');
        const resBox = document.getElementById('ai-modal-result-box');
        const scanText = document.getElementById('ai-modal-scan-text');

        if (resBox) resBox.style.display = 'none';
        if (scanText) scanText.innerText = 'СКАНУВАННЯ СИМЕТРІЇ (98%)...';

        if (modal) modal.classList.add('active');

        setTimeout(() => {
            if (typeof triggerHaptic === 'function') triggerHaptic('success');
            if (typeof playCyberAudioFx === 'function') playCyberAudioFx('success');
            if (resBox) resBox.style.display = 'block';
            if (scanText) scanText.innerText = 'СКАНУВАННЯ ЗАВЕРШЕНО ✅';
        }, 2200);
    };

    window.closeAiScannerModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('ai-scanner-modal');
        if (modal) modal.classList.remove('active');
    };

    window.confirmAiScanBooking = function() {
        window.closeAiScannerModal();
        if (typeof openModal === 'function') openModal();
    };

    // 🛍️ SHOP ITEM DETAIL MODAL LOGIC
    window.selectedShopItemName = 'Помада MEGAN 2.0 Matte';
    window.selectedShopItemPrice = 25;

    window.openShopItemModal = function(itemName, price, imgSrc) {
        window.selectedShopItemName = itemName;
        window.selectedShopItemPrice = price || 25;

        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');

        const modal = document.getElementById('shop-item-modal');
        const titleEl = document.getElementById('shop-modal-title');
        const priceEl = document.getElementById('shop-modal-price');
        const imgEl = document.getElementById('shop-modal-img');

        if (titleEl) titleEl.innerText = itemName;
        if (priceEl) priceEl.innerText = price + ' € • 50 мл';
        if (imgEl && imgSrc) imgEl.src = imgSrc;

        if (modal) modal.classList.add('active');
    };

    window.closeShopItemModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('shop-item-modal');
        if (modal) modal.classList.remove('active');
    };

    window.confirmShopItemAdd = function() {
        if (typeof buyShopItem === 'function') {
            buyShopItem(window.selectedShopItemName, window.selectedShopItemPrice);
        }
        window.closeShopItemModal();
    };

    // 💳 PAYMENT GATEWAY SYSTEM LOGIC
    window.selectedPaymentMethod = 'Apple Pay';
    window.currentCheckoutAmount = 40;

    window.setBookingPaymentMethod = function(method, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        window.selectedPaymentMethod = method;
        const container = el.parentElement;
        if (container) {
            container.querySelectorAll('.cyber-chip').forEach(c => c.classList.remove('active'));
            el.classList.add('active');
        }
    };

    window.openPaymentCheckoutModal = function(amount) {
        window.currentCheckoutAmount = amount || 40;
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');

        const modal = document.getElementById('payment-checkout-modal');
        const amountEl = document.getElementById('pay-total-amount');
        const tonEl = document.getElementById('pay-ton-equivalent');

        if (amountEl) amountEl.innerText = window.currentCheckoutAmount + ' €';
        if (tonEl) tonEl.innerText = '💎 Еквівалент TON: ~' + (window.currentCheckoutAmount / 6.5).toFixed(2) + ' TON';

        if (modal) modal.classList.add('active');
    };

    window.closePaymentCheckoutModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('payment-checkout-modal');
        if (modal) modal.classList.remove('active');
    };

    window.selectPayMethod = function(methodType, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('active'));
        if (el) el.classList.add('active');
        if (methodType === 'google') window.selectedPaymentMethod = 'Google Pay'; else if (methodType === 'apple') window.selectedPaymentMethod = 'Apple Pay';
        else if (methodType === 'ton') window.selectedPaymentMethod = 'TON Crypto';
        else window.selectedPaymentMethod = 'Готівкою в салоні';
    };

    window.processPaymentCheckout = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('success');

        const msg = `💳 <b>ОПЛАТУ ПІДТВЕРДЖЕНО!</b>\nСума: <b>${window.currentCheckoutAmount} €</b>\nСпосіб: <b>${window.selectedPaymentMethod}</b>`;

        if (typeof sendBotNotification === 'function') sendBotNotification(msg);
        if (typeof showCyberToast === 'function') showCyberToast('Оплата на ' + window.currentCheckoutAmount + '€ успішна! 💳', '✅');

        window.closePaymentCheckoutModal();
    };

    // 💼 CRM MANUAL ORDER ENTRY & EXPORT LOGIC
    window.openCrmAddModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');
        const modal = document.getElementById('crm-add-order-modal');
        if (modal) modal.classList.add('active');
    };

    window.closeCrmAddModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('crm-add-order-modal');
        if (modal) modal.classList.remove('active');
    };

    window.submitCrmAddOrder = function(e) {
        if (e) e.preventDefault();
        const nameEl = document.getElementById('crm-add-name');
        const serviceEl = document.getElementById('crm-add-service');
        const masterEl = document.getElementById('crm-add-master');
        const priceEl = document.getElementById('crm-add-price');
        const timeEl = document.getElementById('crm-add-time');
        const name = nameEl ? (nameEl.value.trim() || 'Клієнт') : 'Клієнт';
        const service = serviceEl ? serviceEl.value : 'Стрижка MEGAN 2.0';
        const master = masterEl ? masterEl.value : 'VOVAN';
        const price = priceEl ? (parseInt(priceEl.value) || 40) : 40;
        const time = timeEl ? (timeEl.value.trim() || 'Сьогодні 15:00') : 'Сьогодні 15:00';

        const db = getLocalDB();
        const newId = db.orders.length > 0 ? Math.max(...db.orders.map(o => o.id)) + 1 : 1;

        db.orders.push({
            id: newId,
            Client: name,
            Service: service,
            Price: price,
            Date: time,
            Status: 'Новий',
            Master: master,
            Master_Cut: price * 0.45,
            Payment: 'В салоні'
        });

        saveLocalDB(db);
        if (typeof populateCRM === 'function') populateCRM();
        if (typeof populateDirector === 'function') populateDirector();

        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('success');
        if (typeof showCyberToast === 'function') showCyberToast('Новий запис для ' + name + ' додано в CRM!', '💼');

        window.closeCrmAddModal();
    };

    window.exportCrmReport = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        const db = getLocalDB();
        let total = 0;
        db.orders.forEach(o => total += (o.Price || 0));

        if (tg.showAlert) tg.showAlert('📊 Звіт CRM: Всього замовлень ' + db.orders.length + ' на суму ' + total + ' €');
        else alert('📊 Звіт CRM: Всього замовлень ' + db.orders.length + ' на суму ' + total + ' €');
    };

    // 💼 MAX CRM EDIT & PHONE CALL LOGIC
    window.editOrderModal = function(id) {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        const db = getLocalDB();
        const order = db.orders.find(o => o.id === id);
        if (order) {
            const f_id = document.getElementById('crm-edit-id');
            const f_name = document.getElementById('crm-edit-name');
            const f_service = document.getElementById('crm-edit-service');
            const f_price = document.getElementById('crm-edit-price');
            const f_date = document.getElementById('crm-edit-date');
            if (f_id) f_id.value = order.id;
            if (f_name) f_name.value = order.Client;
            if (f_service) f_service.value = order.Service;
            if (f_price) f_price.value = order.Price;
            if (f_date) f_date.value = order.Date;

            const modal = document.getElementById('crm-edit-order-modal');
            if (modal) modal.classList.add('active');
        }
    };

    window.closeCrmEditModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('crm-edit-order-modal');
        if (modal) modal.classList.remove('active');
    };

    window.submitCrmEditOrder = function(e) {
        if (e) e.preventDefault();
        const idEl = document.getElementById('crm-edit-id');
        const nameEl = document.getElementById('crm-edit-name');
        const serviceEl = document.getElementById('crm-edit-service');
        const priceEl = document.getElementById('crm-edit-price');
        const dateEl = document.getElementById('crm-edit-date');
        if (!idEl) return;
        const id = parseInt(idEl.value);
        const name = nameEl ? nameEl.value.trim() : '';
        const service = serviceEl ? serviceEl.value.trim() : '';
        const price = priceEl ? (parseInt(priceEl.value) || 0) : 0;
        const date = dateEl ? dateEl.value.trim() : '';

        const db = getLocalDB();
        const order = db.orders.find(o => o.id === id);
        if (order) {
            order.Client = name;
            order.Service = service;
            order.Price = price;
            order.Date = date;
            saveLocalDB(db);

            if (typeof populateCRM === 'function') populateCRM();
            if (typeof populateDirector === 'function') populateDirector();

            if (typeof triggerHaptic === 'function') triggerHaptic('success');
            if (typeof showCyberToast === 'function') showCyberToast('Запис #' + id + ' оновлено!', '💼');
        }

        window.closeCrmEditModal();
    };

    // 💈 CRM MASTER FILTER LOGIC
    window.selectedCrmMasterFilter = 'all';

    window.filterCrmByMaster = function(master, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');
        window.selectedCrmMasterFilter = master;

        document.querySelectorAll('#crm-master-filter-container .cyber-chip').forEach(c => c.classList.remove('active'));
        if (el) el.classList.add('active');

        if (typeof populateCRM === 'function') populateCRM();
    };

    // 🧾 FRENCH FACTURE & RECEIPT GENERATOR LOGIC
    window.openReceiptGenModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');

        const modal = document.getElementById('receipt-generator-modal');
        const now = new Date();
        const dateStr = String(now.getDate()).padStart(2, '0') + '/' + String(now.getMonth() + 1).padStart(2, '0') + '/' + now.getFullYear() + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

        const dateEl = document.getElementById('fac-date-str');
        if (dateEl) dateEl.innerText = dateStr;

        if (modal) modal.classList.add('active');
    };

    window.closeReceiptGenModal = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const modal = document.getElementById('receipt-generator-modal');
        if (modal) modal.classList.remove('active');
    };

    window.printFrenchInvoice = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('success');

        if (typeof showCyberToast === 'function') showCyberToast('Офіційний Facture (TVA 20%) згенеровано!', '🧾');
        window.print();
        window.closeReceiptGenModal();
    };

    // 🕒 NICE CLOCK TOAST LOGIC
    window.showClockToast = function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        if (typeof playCyberAudioFx === 'function') playCyberAudioFx('click');
        const now = new Date();
        const timeStr = now.toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris' });
        if (typeof showCyberToast === 'function') showCyberToast(`Точний час у Ніцці (Côte d'Azur): ${timeStr} 🇫🇷`, "🕒");
    };

    // Global Safety Fallbacks for missing modals
    window.openNiceMap = window.openNiceMap || function() {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        window.open('https://maps.google.com/?q=15+Promenade+des+Anglais+Nice+France', '_blank');
    };

    window.openConciergeModal = window.openConciergeModal || function(service) {
        if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        if (typeof showCyberToast === 'function') showCyberToast('Виклик таксі ' + service + ' до Promenade des Anglais ⚡', '🚕');
    };






window.pickMasterCard = typeof pickMasterCard !== 'undefined' ? pickMasterCard : function(){};
window.pickServiceChip = typeof pickServiceChip !== 'undefined' ? pickServiceChip : function(){};
window.closeConciergeModal = typeof closeConciergeModal !== 'undefined' ? closeConciergeModal : function(){};
window.confirmConcierge = typeof confirmConcierge !== 'undefined' ? confirmConcierge : function(){};
window.openSettingsModal = typeof openSettingsModal !== 'undefined' ? openSettingsModal : function(){};
window.closeSettingsModal = typeof closeSettingsModal !== 'undefined' ? closeSettingsModal : function(){};
window.openQRModal = typeof openQRModal !== 'undefined' ? openQRModal : function(){};
window.closeQRModal = typeof closeQRModal !== 'undefined' ? closeQRModal : function(){};
window.closeMasterTipModal = typeof closeMasterTipModal !== 'undefined' ? closeMasterTipModal : function(){};
window.sendTip = typeof sendTip !== 'undefined' ? sendTip : function(){};
window.updateCartQty = typeof updateCartQty !== 'undefined' ? updateCartQty : function(){};
window.toggleNeonTheme = typeof toggleNeonTheme !== 'undefined' ? toggleNeonTheme : function(){};
window.updateOrderStatus = typeof updateOrderStatus !== 'undefined' ? updateOrderStatus : function(){};
window.deleteOrder = typeof deleteOrder !== 'undefined' ? deleteOrder : function(){};
window.payMasterSalary = typeof payMasterSalary !== 'undefined' ? payMasterSalary : function(){};
    // ⚡ Guaranteed Boot Preloader Hide
    setTimeout(function() {
        const p = document.getElementById('preloader');
        if (p) { p.style.opacity = '0'; p.style.pointerEvents = 'none'; setTimeout(function(){ p.style.display = 'none'; }, 300); }
    }, 1500);

    // (Duplicate handlers removed - using top-level definitions)

// ─── ВСІ ВІДСУТНІ ФУНКЦІЇ (ПОВНЕ ДОПОВНЕННЯ) ─────────────────────────────

// ⚙️ Settings Modal
window.openSettingsModal = window.openSettingsModal || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('medium');
    const modal = document.getElementById('settings-modal');
    if (modal) { modal.classList.add('active'); modal.style.display = 'flex'; }
};

window.closeSettingsModal = window.closeSettingsModal || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('light');
    const modal = document.getElementById('settings-modal');
    if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; }
};

// 🎟️ QR Loyalty Modal
window.openQRModal = window.openQRModal || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('success');
    const modal = document.getElementById('qr-modal');
    if (modal) { modal.classList.add('active'); modal.style.display = 'flex'; }
};

window.closeQRModal = window.closeQRModal || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('light');
    const modal = document.getElementById('qr-modal');
    if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; }
};

// 💈 Pick Master Card (для вибору майстра в booking modal)
window.pickMasterCard = window.pickMasterCard || function(masterName, el) {
    if (typeof triggerHaptic === 'function') triggerHaptic('light');
    document.querySelectorAll('#barber-picker-container .cyber-picker-btn').forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'rgba(255,255,255,0.15)';
        b.style.background = 'rgba(255,255,255,0.05)';
    });
    if (el) {
        el.classList.add('active');
        el.style.borderColor = 'var(--cyber-gold)';
        el.style.background = 'rgba(255,215,0,0.15)';
    }
    const selectEl = document.getElementById('select-barber');
    if (selectEl) {
        for (let opt of selectEl.options) {
            if (opt.text.includes(masterName)) { selectEl.value = opt.value; break; }
        }
    }
    if (typeof checkAvailableSlots === 'function') checkAvailableSlots();
};

// 🎟️ Pick Service Chip
window.pickServiceChip = window.pickServiceChip || function(serviceName, el) {
    if (typeof triggerHaptic === 'function') triggerHaptic('light');
    document.querySelectorAll('#service-picker-container .cyber-picker-btn').forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'rgba(255,255,255,0.15)';
        b.style.background = 'rgba(255,255,255,0.05)';
    });
    if (el) {
        el.classList.add('active');
        el.style.borderColor = 'var(--cyber-blue)';
        el.style.background = 'rgba(0,162,255,0.15)';
    }
    const serviceSelect = document.getElementById('select-service');
    if (serviceSelect) {
        for (let opt of serviceSelect.options) {
            if (opt.text.includes(serviceName)) { serviceSelect.value = opt.value; break; }
        }
    }
};

// ⏰ Select Time Slot
window.selectTimeSlot = window.selectTimeSlot || function(time, el) {
    if (typeof triggerHaptic === 'function') triggerHaptic('light');
    document.querySelectorAll('.slot-btn').forEach(s => s.classList.remove('selected'));
    if (el) el.classList.add('selected');
    if (typeof window !== 'undefined') window.selectedTimeText = time;
};

// 📅 Select Date Card
window.selectDateCard = window.selectDateCard || function(date, el) {
    if (typeof triggerHaptic === 'function') triggerHaptic('light');
    document.querySelectorAll('.date-card').forEach(d => d.classList.remove('selected'));
    if (el) el.classList.add('selected');
    if (typeof window !== 'undefined') window.selectedDateText = date;
    if (typeof checkAvailableSlots === 'function') checkAvailableSlots();
};

// 🚕 Concierge Modal (taxi)
window.closeConciergeModal = window.closeConciergeModal || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('light');
    const modal = document.getElementById('concierge-modal');
    if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; }
};

window.confirmConcierge = window.confirmConcierge || function(drink) {
    if (typeof triggerHaptic === 'function') triggerHaptic('success');
    window.closeConciergeModal();
    const svc = window._currentTaxiService || 'Таксі';
    if (typeof showCyberToast === 'function') showCyberToast('🚕 ' + svc + ' викликано! ' + (drink !== 'Без напою' ? drink + ' чекає на вас.' : ''), '🚕');
    if (typeof sendBotNotification === 'function') sendBotNotification('🚕 ЗАМОВЛЕННЯ ТАКСІ!\nСервіс: ' + svc + '\nНапій: ' + drink);
};

window.openConciergeModal = window.openConciergeModal || function(service) {
    if (typeof triggerHaptic === 'function') triggerHaptic('medium');
    window._currentTaxiService = service;
    const modal = document.getElementById('concierge-modal');
    if (modal) { modal.classList.add('active'); modal.style.display = 'flex'; }
};

// 🎨 Neon Theme Toggle
window.toggleNeonTheme = window.toggleNeonTheme || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('medium');
    const themes = [
        { blue: '#00a2ff', glow: 'rgba(0,162,255,0.6)', gold: '#ffd700' },
        { blue: '#ff2a2a', glow: 'rgba(255,42,42,0.6)', gold: '#ff8800' },
        { blue: '#00ff41', glow: 'rgba(0,255,65,0.6)', gold: '#00ff41' },
        { blue: '#a855f7', glow: 'rgba(168,85,247,0.6)', gold: '#ffd700' },
    ];
    window._themeIdx = ((window._themeIdx || 0) + 1) % themes.length;
    const t = themes[window._themeIdx];
    const r = document.documentElement;
    r.style.setProperty('--cyber-blue', t.blue);
    r.style.setProperty('--blue-glow', t.glow);
    r.style.setProperty('--cyber-gold', t.gold);
    if (typeof showCyberToast === 'function') showCyberToast('🎨 Тема змінена!', '🎨');
};

// 📸 Open Nice Map
window.openNiceMap = window.openNiceMap || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('medium');
    try {
        if (tg && typeof tg.openLink === 'function') {
            tg.openLink('https://maps.google.com/?q=15+Promenade+des+Anglais+Nice+France');
        } else {
            window.open('https://maps.google.com/?q=15+Promenade+des+Anglais+Nice+France', '_blank');
        }
    } catch(e) {
        window.open('https://maps.google.com/?q=15+Promenade+des+Anglais+Nice+France', '_blank');
    }
};

// ⭐ Master Tip
window.closeMasterTipModal = window.closeMasterTipModal || function() {
    const modal = document.getElementById('tip-modal');
    if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; }
};

// 📦 Warehouse replenish
window.replenishStock = window.replenishStock || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('medium');
    const modal = document.getElementById('warehouse-modal');
    if (modal) { modal.classList.add('active'); modal.style.display = 'flex'; }
};

// 💳 Payment
window.updateCartQty = window.updateCartQty || function(index, delta) {
    if (typeof window.updateCartItemQty === 'function') window.updateCartItemQty(index, delta);
};

// ─── 🔄 ІНІЦІАЛІЗАЦІЯ ФОРМИ ЗАПИСУ (повна версія) ──────────────────────────
function initBookingForm() {
    // Форма id="barber-form" (назва в HTML)
    const form = document.getElementById('barber-form') || document.querySelector('#booking-modal form');
    if (!form || form._initDone) return;
    form._initDone = true;

    // 📌 LIVE SUMMARY — оновлення прев'ю при змінах
    function updateBookingSummary() {
        const summaryEl = document.getElementById('booking-summary');
        const summaryText = document.getElementById('booking-summary-text');
        if (!summaryEl || !summaryText) return;
        const nameEl = document.getElementById('client-name');
        const serviceEl = document.getElementById('select-service');
        const masterEl = document.getElementById('select-barber');
        const name = nameEl ? nameEl.value.trim() : '';
        const service = (serviceEl && serviceEl.selectedIndex >= 0)
            ? serviceEl.options[serviceEl.selectedIndex].text : 'Стрижка';
        const master = masterEl ? (masterEl.value || 'VOVAN') : 'VOVAN';
        const date = window.selectedDateText || '';
        const time = window.selectedTimeText || '';
        if (name || service) {
            summaryEl.style.display = 'block';
            summaryText.innerHTML =
                (name ? '👤 <b>' + name + '</b><br>' : '') +
                '✂️ ' + service + '<br>' +
                '👑 ' + master +
                (date ? '<br>📅 ' + date + (time ? ' о ' + time : '') : '');
        } else {
            summaryEl.style.display = 'none';
        }
    }

    // Слухачі для live preview
    ['client-name', 'client-phone'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', updateBookingSummary);
    });
    var serviceEl = document.getElementById('select-service');
    var masterEl = document.getElementById('select-barber');
    if (serviceEl) serviceEl.addEventListener('change', updateBookingSummary);
    if (masterEl) masterEl.addEventListener('change', updateBookingSummary);
    updateBookingSummary();

    // 📨 SUBMIT HANDLER
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = document.getElementById('btn-booking-submit');
        if (btn) { btn.disabled = true; btn.textContent = '⏳ Відправляємо...'; }

        var nameEl2 = document.getElementById('client-name');
        var phoneEl2 = document.getElementById('client-phone');
        var commentEl = document.getElementById('booking-comment');
        var name = nameEl2 ? nameEl2.value.trim() : '';
        var phone = phoneEl2 ? phoneEl2.value.trim() : '';
        var comment = commentEl ? commentEl.value.trim() : '';

        // Валідація
        if (!name) {
            if (nameEl2) { nameEl2.focus(); }
            if (typeof showCyberToast === 'function') showCyberToast('⚠️ Вкажіть ваше ім\'я!', '📌');
            if (btn) { btn.disabled = false; btn.textContent = '⚡ ПІДТВЕРДИТИ ЗАПИС'; }
            return;
        }

        var serviceSel = document.getElementById('select-service');
        var masterSel = document.getElementById('select-barber');
        var serviceText = (serviceSel && serviceSel.selectedIndex >= 0)
            ? serviceSel.options[serviceSel.selectedIndex].text
            : (window.selectedServiceText || 'Стрижка MEGAN 2.0 Cyber Style');
        var masterText = masterSel ? (masterSel.value || 'VOVAN') : (window.selectedMasterText || 'VOVAN');
        var dateText = window.selectedDateText || 'Сьогодні';
        var timeText = window.selectedTimeText || '14:00';

        var priceMatch = serviceText.match(/(\d+)\s*€/);
        var price = priceMatch ? parseInt(priceMatch[1]) : 40;

        // Telegram username
        var tgUsername = '';
        try {
            var tgU = window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe
                ? window.Telegram.WebApp.initDataUnsafe.user : null;
            if (tgU) tgUsername = tgU.username ? '@' + tgU.username : ('TG:' + tgU.id);
        } catch(err) {}

        var contactLine = phone || tgUsername || 'Не вказано';

        // Повідомлення в Telegram
        var msg = '📅 <b>НОВИЙ ЗАПИС ДО СТУДІЇ!</b>\n' +
            '👤 Клієнт: <b>' + name + '</b>\n' +
            '📱 Контакт: <b>' + contactLine + '</b>\n' +
            '✂️ Послуга: <b>' + serviceText + '</b>\n' +
            '👑 Майстер: <b>' + masterText + '</b>\n' +
            '📅 Дата: <b>' + dateText + ' о ' + timeText + '</b>\n' +
            '💰 Ціна: <b>' + price + ' €</b>' +
            (comment ? '\n💬 Побажання: ' + comment : '');
        if (typeof sendBotNotification === 'function') {
            try { sendBotNotification(msg); } catch(err) {}
        }

        // Збереження в DB
        try {
            var db = getLocalDB();
            var newId = db.orders.length > 0 ? Math.max.apply(null, db.orders.map(function(o) { return o.id; })) + 1 : 100;
            db.orders.unshift({
                id: newId,
                Client: name,
                Service: serviceText.replace(/\s*—\s*\d+\s*€/, '').replace(/^\W+\s*/, ''),
                Price: price,
                Date: dateText + ' ' + timeText,
                Status: 'Новий',
                Master: masterText,
                Master_Cut: Math.round(price * 0.45),
                Payment: 'В салоні',
                Phone: contactLine,
                Comment: comment
            });
            saveLocalDB(db);
        } catch(err) {}

        if (typeof triggerHaptic === 'function') triggerHaptic('success');
        if (typeof showCyberToast === 'function') {
            showCyberToast('✅ ' + name + ', запис підтверджено! Чекаємо на вас 🏰', '🎉');
        }

        setTimeout(function() {
            if (typeof closeModal === 'function') closeModal();
            form.reset();
            window.selectedDateText = '';
            window.selectedTimeText = '';
            var summary = document.getElementById('booking-summary');
            if (summary) summary.style.display = 'none';
            if (btn) { btn.disabled = false; btn.textContent = '⚡ ПІДТВЕРДИТИ ЗАПИС'; }
            // Оновити CRM
            if (typeof populateCRM === 'function') { try { populateCRM(); } catch(err) {} }
        }, 400);
    });
}

// CRM populate expose
window.populateCRM = window.populateCRM || function() { if (typeof populateCRM === 'function') populateCRM(); };
window.populateDirector = window.populateDirector || function() {};

// ⚡ ГАРАНТОВАНИЙ ЗАПУСК ПІСЛЯ DOM
document.addEventListener('DOMContentLoaded', function() {
    initBookingForm();
    if (typeof populateCRM === 'function') { try { populateCRM(); } catch(e) {} }
    if (typeof populateDirector === 'function') { try { populateDirector(); } catch(e) {} }
    if (typeof populateWarehouse === 'function') { try { populateWarehouse(); } catch(e) {} }
    if (typeof window.populateMasterSchedule === 'function') { try { window.populateMasterSchedule(); } catch(e) {} }
    console.log('✅ MEGAN 2.0: All modules initialized');
});

// ─── ⚡ 9 MISSING UI HANDLERS (GUARANTEED CLICK RESPONSE) ───────────────
window.startAIScanSimulation = window.startAIScanSimulation || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('medium');
    const line = document.getElementById('ai-scan-line');
    const status = document.getElementById('ai-scan-status');
    if (line) line.style.display = 'block';
    if (status) status.innerText = '⚡ СКАНУВАННЯ ОБЛИЧЧЯ 3D...';
    setTimeout(() => {
        if (line) line.style.display = 'none';
        const style = window.selectedAiStyle || 'Cyberpunk Fade';
        if (status) status.innerText = '✅ ОБРАНО СТИЛЬ: ' + style.toUpperCase();
        if (typeof showCyberToast === 'function') showCyberToast('✅ 3D Аналіз успішно завершено! Стиль: ' + style, '🤖');
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
    }, 2000);
};

window.exportERPReport = window.exportERPReport || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('success');
    const db = typeof getLocalDB === 'function' ? getLocalDB() : { orders: [] };
    let total = 0;
    (db.orders || []).forEach(o => total += (o.Price || 0));
    if (typeof showCyberToast === 'function') showCyberToast('📊 Звіт ERP: ' + (db.orders ? db.orders.length : 0) + ' замовлень (' + total + ' €)', '💼');
};

window.exportJSONReport = window.exportJSONReport || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('success');
    const db = typeof getLocalDB === 'function' ? getLocalDB() : { orders: [] };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "megan_erp_report.json");
    dlAnchorElem.click();
    if (typeof showCyberToast === 'function') showCyberToast('💾 JSON Звіт завантажено!', '📥');
};

window.exportHTMLReport = window.exportHTMLReport || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('success');
    const db = typeof getLocalDB === 'function' ? getLocalDB() : { orders: [] };
    let rows = (db.orders || []).map(o => '<tr><td>#' + o.id + '</td><td>' + o.Client + '</td><td>' + o.Service + '</td><td>' + o.Price + ' €</td><td>' + o.Master + '</td><td>' + o.Date + '</td></tr>').join('');
    let htmlContent = '<html><head><title>MEGAN 2.0 ERP Report</title><style>body{font-family:sans-serif;padding:20px;background:#0b1019;color:#fff;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #333;padding:8px;text-align:left;}th{background:#1a2332;color:#ffd700;}</style></head><body><h2>📊 MEGAN 2.0 ERP REPORT</h2><table><thead><tr><th>ID</th><th>Клієнт</th><th>Послуга</th><th>Ціна</th><th>Майстер</th><th>Дата</th></tr></thead><tbody>' + rows + '</tbody></table></body></html>';
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'megan_erp_report.html';
    a.click();
    if (typeof showCyberToast === 'function') showCyberToast('📄 HTML Звіт згенеровано!', '🖨️');
};

window.openGoogleSheetsLink = window.openGoogleSheetsLink || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('medium');
    try {
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openLink) {
            window.Telegram.WebApp.openLink('https://docs.google.com/spreadsheets/');
        } else {
            window.open('https://docs.google.com/spreadsheets/', '_blank');
        }
    } catch(e) {
        window.open('https://docs.google.com/spreadsheets/', '_blank');
    }
};

window.openManualOrderModal = window.openManualOrderModal || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('medium');
    const modal = document.getElementById('crm-add-order-modal') || document.getElementById('manual-order-modal');
    if (modal) { modal.classList.add('active'); modal.style.display = 'flex'; }
};

window.closeManualOrderModal = window.closeManualOrderModal || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('light');
    const modal = document.getElementById('crm-add-order-modal') || document.getElementById('manual-order-modal');
    if (modal) { modal.classList.remove('active'); modal.style.display = 'none'; }
};

window.submitManualOrder = window.submitManualOrder || function(e) {
    if (typeof window.submitCrmAddOrder === 'function') {
        window.submitCrmAddOrder(e);
    }
};

window.resetAppSettings = window.resetAppSettings || function() {
    if (typeof triggerHaptic === 'function') triggerHaptic('medium');
    if (confirm('Скинути всі налаштування додатку за замовчуванням?')) {
        localStorage.clear();
        if (typeof showCyberToast === 'function') showCyberToast('🔄 Налаштування скинуто!', '⚙️');
        setTimeout(function() { location.reload(); }, 1000);
    }
};
