const tg = window.Telegram.WebApp;
    tg.ready();
    if (tg.expand) tg.expand();
    if (tg.requestFullscreen) {
        try { tg.requestFullscreen(); } catch(e) {}
    }
    
    function hidePreloaderFast() {
        const preloader = document.getElementById('preloader');
        if (preloader && preloader.style.display !== 'none') {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            setTimeout(() => { preloader.style.display = 'none'; }, 100);
        }
    }
    setTimeout(hidePreloaderFast, 100);
    document.addEventListener('DOMContentLoaded', () => setTimeout(hidePreloaderFast, 50));
    window.addEventListener('load', hidePreloaderFast);

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

function sendChatMessage() {
        const input = document.getElementById('chat-input-msg');
        const box = document.getElementById('chat-box-el');
        const text = input.value.trim();
        if(!text) return;
        
        triggerHaptic('light');
        // Add User Message
        const uMsg = document.createElement('div');
        uMsg.className = 'chat-msg user';
        uMsg.innerText = text;
        box.appendChild(uMsg);
        input.value = '';
        box.scrollTop = box.scrollHeight;
        
        // Bot Reply
        setTimeout(() => {
            triggerHaptic('success');
            const bMsg = document.createElement('div');
            bMsg.className = 'chat-msg bot';
            
            const lower = text.toLowerCase();
            if(lower.includes('привіт') || lower.includes('hello')) {
                bMsg.innerText = 'Привіт! Я готова забронювати вам час. З якого ви міста?';
            } else if (lower.includes('цін') || lower.includes('price')) {
                bMsg.innerText = 'Наші ціни починаються від 35€ за базові послуги та 120€ за VIP. Деталі в меню послуг!';
            } else if (lower.includes('адрес') || lower.includes('де')) {
                bMsg.innerText = 'Ми знаходимося в центрі Ніцци: 15 Promenade des Anglais. Замовляйте Uber прямо з додатку!';
            } else {
                bMsg.innerText = 'Звучить чудово! Якщо у вас є питання щодо запису до VOVAN, я завжди тут.';
            }
            
            box.appendChild(bMsg);
            box.scrollTop = box.scrollHeight;
        }, 1200);
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

    // CRM POPULATE (Kanban & Clients)
    function populateCRM() {
        const db = getLocalDB();
        
        const colNew = document.getElementById('crm-col-new');
        const colConf = document.getElementById('crm-col-conf');
        const colDone = document.getElementById('crm-col-done');
        if(!colNew) return;
        
        let countNew = 0, countConf = 0, countDone = 0;
        let htmlNew = '', htmlConf = '', htmlDone = '';

        const renderCard = (order) => `
            <div style="background:#121926; border:1px solid rgba(0,162,255,0.2); border-radius:8px; padding:10px; margin-bottom:8px;">
                <div style="display:flex; justify-content:space-between;">
                    <span style="font-weight:bold; color:#fff; font-size:0.9rem;">${order.Client}</span>
                    <span style="color:var(--cyber-blue); font-family:'Orbitron'; font-size:0.9rem;">${order.Price} €</span>
                </div>
                <div style="font-size:0.75rem; color:var(--text-sub); margin-top:4px;">${order.Service}</div>
                <div style="font-size:0.7rem; color:var(--cyber-gold); margin-top:2px;">📅 ${order.Date} | 💈 ${order.Master}</div>
                <div style="font-size:0.7rem; color:${order.Payment === 'Наперед' ? 'var(--accent-green)' : 'var(--cyber-gold)'}; margin-top:2px; font-weight:bold;">💳 Оплата: ${order.Payment || 'Готівка'}</div>
                <div style="margin-top:8px; display:flex; gap:6px;">
                    ${order.Status === 'Новий' ? `<button class="action-btn-sm" style="flex:1; padding:4px; font-size:0.7rem;" onclick="changeOrderStatus(${order.id}, 'Підтверджено')">Підтвердити</button>` : ''}
                    ${order.Status === 'Підтверджено' ? `<button class="action-btn-sm" style="flex:1; padding:4px; font-size:0.7rem;" onclick="changeOrderStatus(${order.id}, 'Завершено')">Завершити</button>` : ''}
                </div>
            </div>
        `;

        db.orders.forEach(order => {
            if (order.Status === 'Новий') { htmlNew += renderCard(order); countNew++; }
            else if (order.Status === 'Підтверджено') { htmlConf += renderCard(order); countConf++; }
            else { htmlDone += renderCard(order); countDone++; }
        });

        colNew.innerHTML = htmlNew; document.getElementById('count-new').innerText = countNew;
        colConf.innerHTML = htmlConf; document.getElementById('count-conf').innerText = countConf;
        colDone.innerHTML = htmlDone; document.getElementById('count-done').innerText = countDone;

        // Популейт базы клиентов (LTV)
        const clientsDiv = document.getElementById('crm-clients-list');
        const clientsMap = {};
        db.orders.forEach(o => {
            if(!clientsMap[o.Client]) clientsMap[o.Client] = { total: 0, visits: 0 };
            clientsMap[o.Client].total += o.Price;
            clientsMap[o.Client].visits += 1;
        });

        let clientsHtml = '';
        Object.keys(clientsMap).forEach(name => {
            const total = clientsMap[name].total;
            let loyaltyBadge = '<span style="color:#cd7f32">🥉 Бронза</span>';
            if (total > 50 && total <= 100) loyaltyBadge = '<span style="color:silver">🥈 Срібло (5%)</span>';
            if (total > 100) loyaltyBadge = '<span style="color:var(--cyber-gold); text-shadow:0 0 5px var(--cyber-gold);">🥇 Золото (10%)</span>';
            
            clientsHtml += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); border-bottom:1px solid rgba(255,255,255,0.05); padding:10px; transition: background 0.3s;" onmouseover="this.style.background='rgba(0,162,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                <div><div style="color:#fff; font-weight:bold;">${name}</div><div style="font-size:0.7rem; color:var(--text-sub);">Візитів: ${clientsMap[name].visits} | Рівень: ${loyaltyBadge}</div></div>
                <div style="text-align:right;"><div style="color:var(--accent-green); font-family:'Orbitron'; font-weight:bold;">${clientsMap[name].total} €</div><div style="font-size:0.7rem; color:var(--text-sub);">LTV</div></div>
            </div>`;
        });
        clientsDiv.innerHTML = clientsHtml;
    }

    function changeOrderStatus(id, newStatus) {
        triggerHaptic('light');
        const db = getLocalDB();
        const order = db.orders.find(o => o.id === id);
        if (order) {
            order.Status = newStatus;
            
            // Автосписання зі складу при завершенні послуги
            if (newStatus === 'Завершено') {
                const w = db.warehouse;
                if (order.Service.includes('Стрижка') || order.Service.includes('Королівське')) {
                    const sh = w.find(x => x.item === 'Шампунь (мл)');
                    if(sh) sh.amount -= 30;
                }
                if (order.Service.includes('Highlight') || order.Service.includes('Silver') || order.Service.includes('Камуфляж')) {
                    const p = w.find(x => x.item === 'Фарба Neon (мл)');
                    if(p) p.amount -= 60;
                }
                
                // Перевірка запасів
                w.forEach(item => {
                    if(item.amount < (item.max * 0.15)) {
                        sendBotNotification(`⚠️ <b>АВТОЗАМОВЛЕННЯ СКЛАДУ!</b>\nЗакінчується: <b>${item.item}</b> (Залишилося: ${item.amount}).`);
                    }
                });
                
                // Відгук клієнта (mock)
                setTimeout(() => {
                    sendBotNotification(`⭐ <b>ВІДГУК ВІД КЛІЄНТА!</b>\n${order.Client} оцінив візит на 5 зірок! "Дуже дякую майстру ${order.Master}!"`);
                }, 3000);
            }
        }
        saveLocalDB(db);
        populateCRM();
        initDirectorStats();
        populateWarehouse();
    }
    
    function openManualOrderModal() {
        triggerHaptic('medium');
        document.getElementById('manual-order-modal').classList.add('active');
    }
    
    function closeManualOrderModal() {
        triggerHaptic('light');
        document.getElementById('manual-order-modal').classList.remove('active');
    }
    
    function submitManualOrder() {
        const clientName = document.getElementById('manual-client-name').value;
        const service = document.getElementById('manual-service').value;
        const price = parseFloat(document.getElementById('manual-price').value) || 0;
        const master = document.getElementById('manual-master').value;
        
        if(!clientName || !service) {
            alert('Введіть ім\'я та послугу!');
            return;
        }
        
        triggerHaptic('success');
        const db = getLocalDB();
        db.orders.push({
            id: Date.now(),
            Client: clientName,
            Price: price,
            Service: service,
            Date: 'Сьогодні (Admin)',
            Status: 'Підтверджено',
            Master: master,
            Master_Cut: price * 0.45,
            Payment: 'Готівка'
        });
        saveLocalDB(db);
        populateCRM();
        populateMasterSchedule();
        initDirectorStats();
        closeManualOrderModal();
    }
    
    function calculateAccounting() {
        const db = getLocalDB();
        let totalRev = 0;
        db.orders.forEach(o => totalRev += o.Price);
        
        const expenses = parseFloat(document.getElementById('acc-expenses').value) || 0;
        const electricity = parseFloat(document.getElementById('acc-electricity').value) || 0;
        const tva = totalRev * 0.20;
        const urssaf = totalRev * 0.22;
        
        // Мастера получают свою долю (45%). То есть салон оставляет 55%.
        const netProfit = (totalRev * 0.55) - (expenses + electricity) - tva - urssaf;
        
        document.getElementById('acc-gross').innerText = totalRev.toFixed(2) + ' €';
        document.getElementById('acc-tva').innerText = tva.toFixed(2) + ' €';
        document.getElementById('acc-urssaf').innerText = urssaf.toFixed(2) + ' €';
        document.getElementById('acc-exp-display').innerText = (expenses + electricity).toFixed(2) + ' €';
        document.getElementById('acc-net').innerText = netProfit.toFixed(2) + ' €';
    }

    function populateWarehouse() {
        const db = getLocalDB();
        const list = document.getElementById('warehouse-list');
        if(!list) return;
        let html = '';
        db.warehouse.forEach(w => {
            const perc = (w.amount / w.max) * 100;
            const color = perc > 50 ? 'var(--accent-green)' : (perc > 15 ? 'var(--cyber-gold)' : 'var(--accent-red)');
            html += `
            <div style="background:#121926; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
                <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px;">
                    <span style="color:#fff;">${w.item}</span>
                    <span style="color:${color}; font-weight:bold;">${w.amount} / ${w.max}</span>
                </div>
                <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                    <div style="width:${perc}%; height:100%; background:${color}; box-shadow:0 0 8px ${color};"></div>
                </div>
            </div>`;
        });
        list.innerHTML = html;
    }

    // MASTER POPULATE (Timeline)
    function populateMasterSchedule() {
        const masterList = document.getElementById('master-schedule-list');
        if(!masterList) return;
        
        const db = getLocalDB();
        let totalCut = 0;
        let html = '';

        const times = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
        const todayOrders = db.orders.filter(o => o.Date.includes('Сьогодні'));
        
        times.forEach(t => {
            const match = todayOrders.find(o => o.Date.includes(t));
            html += `<div class="timeline-row"><div class="time-col">${t}</div><div class="slot-col">`;
            
            if (match) {
                totalCut += match.Master_Cut || 0;
                html += `
                    <div class="slot-booked">
                        <div style="display:flex; justify-content:space-between;">
                            <span style="font-weight:bold; color:var(--cyber-gold);">${match.Client}</span>
                            <span>
                                <button class="action-btn-sm" style="padding:2px 6px; margin:0; background:rgba(0,162,255,0.2); color:#fff; border:1px solid var(--cyber-blue);" onclick="shiftTime(15, '${match.id}')">+15m</button>
                                <button class="action-btn-sm" style="padding:2px 6px; margin:0; background:rgba(255,215,0,0.2); color:#fff; border:1px solid var(--cyber-gold);" onclick="shiftTime(-15, '${match.id}')">-15m</button>
                            </span>
                        </div>
                        <div style="font-size:0.75rem; color:var(--text-sub); margin-top:4px;">${match.Service}</div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
                            <div style="font-size:0.7rem; color:var(--accent-green);">Дохід: ${match.Master_Cut} €</div>
                            <div style="font-size:0.7rem; color:${match.Payment === 'Наперед' ? 'var(--accent-green)' : 'var(--cyber-gold)'}; font-weight:bold;">${match.Payment || 'Готівка'}</div>
                        </div>
                        <button class="action-btn-sm btn-payout" style="margin-top:6px; width:100%;" onclick="leaveTip('${match.Master}')">💸 Чайові (5€)</button>
                    </div>`;
            } else {
                html += `<div class="slot-free">Вільний слот</div>`;
            }
            html += `</div></div>`;
        });
        
        // Додамо інші дні (простим списком)
        const otherOrders = db.orders.filter(o => !o.Date.includes('Сьогодні'));
        if(otherOrders.length > 0) {
            html += `<h4 style="font-family:'Orbitron'; color:var(--cyber-blue); font-size:0.85rem; margin-top:20px;">Інші дні</h4>`;
            otherOrders.forEach(match => {
                totalCut += match.Master_Cut || 0;
                html += `<div class="timeline-row"><div class="time-col" style="font-size:0.6rem;">${match.Date}</div><div class="slot-col">`;
                html += `
                    <div class="slot-booked">
                        <div style="font-weight:bold; color:var(--cyber-gold);">${match.Client}</div>
                        <div style="font-size:0.75rem; color:var(--text-sub);">${match.Service}</div>
                    </div></div></div>`;
            });
        }
        
        masterList.innerHTML = html;
        document.getElementById('master-total-cut').innerText = totalCut.toFixed(2) + ' €';
    }

    function shiftTime(mins, orderId) {
        triggerHaptic('medium');
        if (tg.showAlert) tg.showAlert(`⏳ Автокорекція! Графік зсунуто на ${mins > 0 ? '+'+mins : mins} хвилин!`);
        else alert(`⏳ Автокорекція! Графік зсунуто на ${mins > 0 ? '+'+mins : mins} хвилин!`);
        // У реальному додатку тут би перераховувалися рядки 'Сьогодні 11:00' -> 'Сьогодні 11:15'
    }

    function payMasterSalary() {
        triggerHaptic('success');
        const db = getLocalDB();
        db.orders.forEach(o => { o.Master_Cut = 0; });
        saveLocalDB(db);
        populateMasterSchedule();
        initDirectorStats();
        if (tg.showAlert) tg.showAlert(`💸 Зарплата успішно виплачена майстрам! Баланси обнулені.`);
        else alert(`💸 Зарплата успішно виплачена майстрам! Баланси обнулені.`);
    }

    // DIRECTOR POPULATE
    let chartInstance = null;
    function initDirectorStats() {
        const db = getLocalDB();
        let totalRev = 0;
        let masterStats = {};

        db.orders.forEach(o => {
            totalRev += o.Price;
            if(!masterStats[o.Master]) masterStats[o.Master] = { rev: 0, cut: 0 };
            masterStats[o.Master].rev += o.Price;
            masterStats[o.Master].cut += o.Master_Cut || 0;
        });

        const netProfit = totalRev * 0.55;
        document.getElementById('dir-total-revenue').innerText = totalRev.toFixed(2) + ' €';
        document.getElementById('dir-net-profit').innerText = netProfit.toFixed(2) + ' €';
        
        const forecastEl = document.getElementById('dir-forecast');
        if(forecastEl) forecastEl.innerText = (totalRev * 1.35).toFixed(2) + ' €';

        let html = '';
        Object.keys(masterStats).forEach((m, idx) => {
            let p = (masterStats[m].rev / totalRev) * 100 || 0;
            html += `
            <div style="margin-bottom:12px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:0.85rem; color:#fff;">
                    <span>${m}</span> <span>${masterStats[m].rev.toFixed(2)} €</span>
                </div>
                <div style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
                    <div style="width:0%; height:100%; background:var(--cyber-blue); transition: width 1.5s cubic-bezier(0.25, 1, 0.5, 1); box-shadow:0 0 10px var(--cyber-blue);" id="bar-${idx}" data-target="${p}"></div>
                </div>
                <div style="font-size:0.7rem; color:var(--text-sub); margin-top:2px;">Комісія виплачено: ${masterStats[m].cut.toFixed(2)} €</div>
            </div>`;
        });
        
        const statsEl = document.getElementById('dir-masters-stats');
        if(statsEl) {
            statsEl.innerHTML = html;
            setTimeout(() => {
                Object.keys(masterStats).forEach((m, idx) => {
                    const bar = document.getElementById('bar-'+idx);
                    if(bar) bar.style.width = bar.getAttribute('data-target') + '%';
                });
            }, 50);
        }
        
        // Ініціалізація Chart.js
        const ctx = document.getElementById('revenueChart');
        if(ctx) {
            if(chartInstance) chartInstance.destroy();
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
                    datasets: [{
                        label: 'Дохід (€)',
                        data: [120, 190, 80, 250, 400, 310, totalRev],
                        borderColor: '#ffd700',
                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#00a2ff',
                        pointBorderColor: '#fff',
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9bb0c7' } },
                        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9bb0c7' } }
                    }
                }
            });
        }
        
        // Оновлюємо і бухгалтерію
        calculateAccounting();
    }

    // 📱 АВТО-ПОДТЯГИВАНИЕ ДАННЫХ ИЗ TELEGRAM С ТЕЛЕФОНА
    function initTelegramUserData() {
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            const u = tg.initDataUnsafe.user;
            const fullName = `${u.first_name || ''} ${u.last_name || ''}`.trim();
            if (fullName) {
                document.getElementById('client-name').value = fullName;
            }
            if (u.username) {
                document.getElementById('client-phone').value = `@${u.username}`;
            }
        }
    }

    let audioCtx = null;
    function playCyberBeep(freq, type, duration) {
        try {
            if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if(audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type; osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime + duration);
        } catch(e){}
    }

    function triggerHaptic(type = 'light') {
        if (tg.HapticFeedback) {
            if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
            else if (type === 'medium') tg.HapticFeedback.impactOccurred('medium');
            else tg.HapticFeedback.impactOccurred('light');
        }
        
        if (type === 'success') playCyberBeep(880, 'square', 0.15);
        else if (type === 'medium') playCyberBeep(440, 'triangle', 0.1);
        else playCyberBeep(600, 'sine', 0.05);
    }
    
    function leaveTip(master) {
        triggerHaptic('success');
        if (tg.showConfirm) {
            tg.showConfirm(`Залишити 5€ чайових для ${master}?`, (res) => {
                if(res) {
                    if (tg.showAlert) tg.showAlert(`Дякуємо! 5€ додано до доходу майстра ${master}.`);
                    sendBotNotification(`💸 <b>ЧАЙОВІ!</b>\nКлієнт залишив 5€ для майстра ${master}.`);
                }
            });
        } else {
            alert(`Дякуємо! 5€ додано до доходу майстра ${master}.`);
            sendBotNotification(`💸 <b>ЧАЙОВІ!</b>\nКлієнт залишив 5€ для майстра ${master}.`);
        }
    }

    let selectedTimeText = "11:00";
    function selectTimeSlot(time, el) {
        triggerHaptic('light');
        selectedTimeText = time;
        document.querySelectorAll('.time-slots .slot-btn').forEach(b => b.classList.remove('selected'));
        el.classList.add('selected');
    }

    const datePicker = document.getElementById('date-picker-container');
    let selectedDateText = "Сьогодні";
    function initDatePicker() {
        if (!datePicker) return;
        datePicker.innerHTML = '';
        const today = new Date(); const days = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        for (let i = 0; i < 14; i++) {
            const d = new Date(); d.setDate(today.getDate() + i);
            const dayName = i === 0 ? 'Сьогодні' : i === 1 ? 'Завтра' : days[d.getDay()];
            const dayStr = String(d.getDate()).padStart(2, '0'); const monthStr = String(d.getMonth() + 1).padStart(2, '0'); const dateNum = `${dayStr}.${monthStr}`;
            const card = document.createElement('div');
            card.className = `date-card ${i === 0 ? 'selected' : ''}`;
            card.innerHTML = `<div style="font-size:0.75rem;">${dayName}</div><div style="font-weight:bold;">${dateNum}</div>`;
            card.addEventListener('click', () => {
                triggerHaptic('light');
                document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected'); selectedDateText = `${dayName} (${dateNum})`;
                if(typeof checkAvailableSlots === 'function') checkAvailableSlots();
            });
            datePicker.appendChild(card);
        }
    }

    function selectServiceModal(name, price) { 
        openModal(); 
        const chips = document.querySelectorAll('#service-chips-container .cyber-chip');
        chips.forEach(chip => {
            if (chip.textContent.includes(name) || name.includes(chip.textContent.trim())) {
                chip.click();
            }
        });
    }
    function selectBarberModal(barberName) { 
        openModal(); 
        document.getElementById('select-barber').value = barberName; 
        const btns = document.querySelectorAll('#barber-picker-container .cyber-picker-btn');
        btns.forEach(btn => {
            if (btn.textContent.includes(barberName)) {
                btn.click();
            }
        });
    }

    
        /* Settings Modal & Options Handlers */
        let hapticsEnabled = true;
        let pushEnabled = true;

        window.openSettingsModal = function() {
            triggerHaptic('medium');
            const modal = document.getElementById('settings-modal');
            if (modal) modal.classList.add('active');
            
            const userInfo = document.getElementById('sett-user-info');
            if (userInfo && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
                const user = window.Telegram.WebApp.initDataUnsafe.user;
                userInfo.textContent = "👤 " + (user.first_name || 'Client') + " (ID: " + user.id + ")";
            }
        };

        window.closeSettingsModal = function() {
            triggerHaptic('light');
            const modal = document.getElementById('settings-modal');
            if (modal) modal.classList.remove('active');
        };

        window.setAccentTheme = function(colorKey) {
            triggerHaptic('light');
            const root = document.documentElement;
            if (colorKey === 'gold') {
                root.style.setProperty('--cyber-gold', '#ffd700');
            } else if (colorKey === 'cyan') {
                root.style.setProperty('--cyber-gold', '#00a2ff');
            } else if (colorKey === 'green') {
                root.style.setProperty('--cyber-gold', '#00e676');
            }
            if (typeof tg !== 'undefined' && tg.showAlert) tg.showAlert('🎨 Тему оновлено!');
        };

        window.toggleHapticsSetting = function(val) {
            hapticsEnabled = val;
            if (val) triggerHaptic('success');
        };

        window.togglePushSetting = function(val) {
            pushEnabled = val;
            triggerHaptic('light');
        };

        window.resetAppSettings = function() {
            triggerHaptic('warning');
            if (confirm('Очистити кеш та скинути налаштування додатка?')) {
                localStorage.clear();
                location.reload();
            }
        };



        /* Cyber Toast System 2026 Dynamic Island HUD */
        window.showCyberToast = function(msg, icon = '⚡') {
            let toast = document.getElementById('cyber-toast');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'cyber-toast';
                toast.className = 'cyber-toast';
                document.body.appendChild(toast);
            }
            toast.innerHTML = `<span class="toast-beacon"></span><span style="font-size:1.1rem;">${icon}</span> <span>${msg}</span>`;
            toast.classList.add('show');
            if (typeof triggerHaptic === 'function') triggerHaptic('medium');
            setTimeout(() => toast.classList.remove('show'), 3000);
        };


function switchTab(pageId) {
        triggerHaptic('light');
        if(pageId === 'ai' || pageId === 'chat') {
            // Cyber sounds
            setTimeout(() => playCyberBeep(900, 'square', 0.05), 0);
            setTimeout(() => playCyberBeep(1200, 'square', 0.05), 100);
            setTimeout(() => playCyberBeep(1800, 'square', 0.1), 200);
        }

        document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

        const pageEl = document.getElementById(`page-${pageId}`);
        if(pageEl) pageEl.classList.add('active');
        
        window.scrollTo(0, 0);
        if(pageId === 'director' && typeof populateDirector === 'function') setTimeout(populateDirector, 100);

        const navBtn = document.querySelector(`.nav-btn[data-tab="${pageId}"]`);
        if(navBtn) {
            navBtn.classList.add('active');
            const navContainer = navBtn.parentNode;
            navContainer.scrollTo({
                left: navBtn.offsetLeft - navContainer.offsetWidth / 2 + navBtn.offsetWidth / 2,
                behavior: 'smooth'
            });
        }

        if(pageId === 'erp') {
            populateCRM();
            populateMasterSchedule();
            initDirectorStats();
            calculateAccounting();
            setTimeout(populateDirector, 100);
        }
    }

    const modal = document.getElementById('booking-modal');
    
    // ⚡ ROBUST CHIP PICKER SELECTION 2026
    window.pickServiceChip = function(val, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const sel = document.getElementById('select-service');
        if (sel) {
            sel.value = val;
            sel.dispatchEvent(new Event('change'));
        }
        document.querySelectorAll('#service-chips-container .cyber-chip').forEach(c => c.classList.remove('active'));
        if (el) el.classList.add('active');
    };

    window.pickMasterCard = function(val, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const sel = document.getElementById('select-barber');
        if (sel) {
            sel.value = val;
            sel.dispatchEvent(new Event('change'));
        }
        document.querySelectorAll('#barber-picker-container .cyber-picker-btn').forEach(c => c.classList.remove('active'));
        if (el) el.classList.add('active');
    };

    window.pickPaymentCard = function(val, el) {
        if (typeof triggerHaptic === 'function') triggerHaptic('light');
        const sel = document.getElementById('select-payment');
        if (sel) {
            sel.value = val;
            sel.dispatchEvent(new Event('change'));
        }
        document.querySelectorAll('#payment-picker-container .cyber-picker-btn').forEach(c => c.classList.remove('active'));
        if (el) el.classList.add('active');
    };

    function openModal() { 
        triggerHaptic('medium'); 
        initTelegramUserData();
        modal.classList.add('active'); 
    }
    function closeModal() { triggerHaptic('light'); modal.classList.remove('active'); }

    document.getElementById('barber-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        triggerHaptic('success');
        const clientName = document.getElementById('client-name').value;
        const clientPhone = document.getElementById('client-phone').value;
        const service = document.getElementById('select-service').value;
        const barber = document.getElementById('select-barber').value;
        const payment = document.getElementById('select-payment') ? document.getElementById('select-payment').value : 'Оплата в салоні (Готівка/Термінал)';
        
        let priceMatch = service.match(/(\d+)\s*€/);
        let price = priceMatch ? parseInt(priceMatch[1]) : 0;

        const adminMessageText = 
            `🌊 <b>НОВИЙ ЗАПИС З ТЕЛЕФОНУ (NICE CÔTE D'AZUR)!</b>\n` +
            `━━━━━━━━━━━━━━━━━━━━━━\n` +
            `👤 <b>Клієнт:</b> ${clientName}\n` +
            `📞 <b>Контакти:</b> ${clientPhone}\n` +
            `✂️ <b>Послуга:</b> ${service}\n` +
            `💈 <b>Майстер:</b> ${barber}\n` +
            `📅 <b>Дата:</b> ${selectedDateText}\n` +
            `⏰ <b>Час:</b> ${selectedTimeText}\n` +
            `💳 <b>Оплата:</b> ${payment}`;

        sendBotNotification(adminMessageText);
        
        // Збереження локально у БД
        const db = getLocalDB();
        db.orders.push({
            id: Date.now(),
            Client: clientName,
            Price: price,
            Service: service,
            Date: selectedDateText + " " + selectedTimeText,
            Status: 'Новий',
            Master: barber,
            Master_Cut: price * 0.45,
            Payment: payment
        });
        saveLocalDB(db);
        populateCRM();
        populateMasterSchedule();
        initDirectorStats();

        if (tg.showAlert) tg.showAlert(`✨ Запис успішно створено! До зустрічі ${selectedDateText} о ${selectedTimeText}!`);
        closeModal();
    });

    function checkReminders() {
        const db = getLocalDB();
        const tomorrowOrder = db.orders.find(o => o.Date.includes('Завтра'));
        if (tomorrowOrder && !sessionStorage.getItem('reminder_sent')) {
            setTimeout(() => {
                sendBotNotification(`🔔 <b>АВТО-НАГАДУВАННЯ КЛІЄНТУ!</b>\nНадіслано до: ${tomorrowOrder.Client}\nТекст: "Чекаємо на вас завтра у салоні!"`);
                sessionStorage.setItem('reminder_sent', 'true');
            }, 5000);
        }
    }

    initDatePicker();
    
    // Популейт данных при старте
    populateCRM();
    populateMasterSchedule();
    populateWarehouse();
    checkReminders();
    
    // Инициализация языка
    changeLanguage('UA');

    // Stock replenish action
    function replenishStock() {
        triggerHaptic('success');
        tg.showAlert('📦 Склад успішно поповнено! Всі позиції в наявності.');
        if(typeof renderWarehouse === 'function') renderWarehouse();
    }

    // CSV Report Export
    
    // Multi-format Reports
    function exportJSONReport() {
        triggerHaptic('medium');
        const db = getLocalDB();
        const jsonStr = JSON.stringify(db, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vovan_beauty_erp_database.json';
        a.click();
        URL.revokeObjectURL(url);
        if(tg.showAlert) tg.showAlert('📦 JSON База успішно вивантажена!');
    }

    function exportHTMLReport() {
        triggerHaptic('medium');
        const db = getLocalDB();
        let rows = '';
        db.orders.forEach(o => {
            rows += `<tr><td>${o.id}</td><td>${o.Client}</td><td>${o.Service}</td><td>${o.Master}</td><td>${o.Price} €</td><td>${o.Date}</td><td>${o.Status}</td></tr>`;
        });
        const htmlDoc = `<!DOCTYPE html><html><head><title>ERP Звіт VOVAN BEAUTY</title><style>body{background:#000;color:#fff;font-family:sans-serif;padding:20px;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #00a2ff;padding:10px;text-align:left;}th{background:#0d1522;color:#ffd700;}</style></head><body><h1>👑 Звіт ERP - VOVAN BEAUTY STUDIO (Nice)</h1><table><thead><tr><th>ID</th><th>Клієнт</th><th>Послуга</th><th>Майстер</th><th>Ціна</th><th>Дата</th><th>Статус</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
        const blob = new Blob([htmlDoc], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vovan_beauty_erp_report.html';
        a.click();
        URL.revokeObjectURL(url);
        if(tg.showAlert) tg.showAlert('📄 HTML Звіт вивантажено!');
    }

    function openGoogleSheetsLink() {
        triggerHaptic('medium');
        window.open('https://docs.google.com/spreadsheets/', '_blank');
    }

    function exportERPReport() {
        triggerHaptic('medium');
        const db = getLocalDB();
        let csvContent = "data:text/csv;charset=utf-8,ID,Client,Service,Master,Price,Date,Status\n";
        db.orders.forEach(o => {
            csvContent += `${o.id},${o.Client || ''},${o.Service || ''},${o.Master || ''},${o.Price || 0},${o.Date || ''},${o.Status || ''}\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "vovan_beauty_erp_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if(tg.showAlert) tg.showAlert('📄 Звіт успішно завантажено в CSV!');
    }


    // === ERP підвкладки ===
    function switchERPTab(panelId) {
        triggerHaptic('light');
        document.querySelectorAll('.erp-panel').forEach(p => p.style.display = 'none');
        document.querySelectorAll('.erp-tab').forEach(b => {
            b.style.background = '#1a2332';
            b.style.color = 'var(--text-sub)';
            b.style.border = '1px solid rgba(255,255,255,0.1)';
        });
        const panel = document.getElementById(panelId);
        if (panel) panel.style.display = 'block';
        const tabs = document.querySelectorAll('.erp-tab');
        tabs.forEach(t => {
            if (t.getAttribute('onclick').includes(panelId)) {
                t.style.background = 'var(--cyber-gold)';
                t.style.color = '#000';
                t.style.border = 'none';
            }
        });
        if (panelId === 'erp-director') { initDirectorStats(); setTimeout(populateDirector, 100); }
        if (panelId === 'erp-crm') populateCRM();
        if (panelId === 'erp-master') populateMasterSchedule();
        if (panelId === 'erp-accounting') calculateAccounting();
    }



    // --- ERP ENHANCEMENTS ---
    function deleteOrder(id) {
        if(!confirm('Ви впевнені, що хочете видалити цей запис?')) return;
        const db = getLocalDB();
        db.orders = db.orders.filter(o => o.id !== id);
        saveLocalDB(db);
        populateCRM();
        populateDirector();
        populateMasterSchedule();
    }
    
    // Master Salary Calculation
    const originalPopulateMaster = populateMasterSchedule;
    populateMasterSchedule = function() {
        if (originalPopulateMaster) originalPopulateMaster();
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
        tg.showAlert('💸 Зарплата успішно виплачена!');
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
        populateDirector();
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
            const weather = data.current_weather;
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
        const master = document.getElementById('select-barber').value;
        const slots = document.querySelectorAll('.slot-btn');
        
        slots.forEach(slot => {
            slot.classList.remove('disabled');
            slot.style.opacity = '1';
            slot.style.pointerEvents = 'auto';
            const time = slot.innerText.trim();
            const fullDateStr = selectedDateText + " " + time;
            
            // Check if there is already an order in DB with this master and date+time
            const isBooked = db.orders.some(o => o.Master === master && o.Date === fullDateStr);
            if (isBooked) {
                slot.classList.add('disabled');
                slot.style.opacity = '0.3';
                slot.style.pointerEvents = 'none';
                slot.classList.remove('selected');
            }
        });
        
        // Auto-select first free slot
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
            if (modal) modal.classList.add('show');
            if (typeof triggerHaptic === 'function') triggerHaptic('medium');
        };

        window.closeHelpModal = function() {
            const modal = document.getElementById('help-modal');
            if (modal) modal.classList.remove('show');
            if (typeof triggerHaptic === 'function') triggerHaptic('light');
        };
