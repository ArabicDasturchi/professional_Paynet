/* DOM Elements */
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('closeSidebar');
const overlay = document.getElementById('overlay');
const paymentForm = document.getElementById('paymentForm');
const contactForm = document.getElementById('contactForm');
const simcardGrid = document.getElementById('simcardGrid');
const tabButtons = document.querySelectorAll('.tab-btn');
const dropdownMenus = document.querySelectorAll('.has-submenu');

/* Mobile Menu Functionality */
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeSidebar.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/* Sidebar Submenu Toggle */
dropdownMenus.forEach(menu => {
    const link = menu.querySelector('a');
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            menu.classList.toggle('active');
        }
    });
});

/* Smooth Scrolling */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            closeMobileMenu();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* SIM Cards Data */
const simCardsData = {
    all: [
        {
            id: 1,
            operator: 'Uzmobile',
            name: 'Start',
            type: 'prepaid',
            price: '10,000',
            data: '5 GB',
            minutes: '500',
            sms: '500',
            features: ['4G LTE', 'Yangi raqam', 'Bonuslar']
        },
        {
            id: 2,
            operator: 'Mobiuz',
            name: 'Oddiy 10',
            type: 'prepaid',
            price: '15,000',
            data: '10 GB',
            minutes: '1000',
            sms: '1000',
            features: ['4G+', 'Cheksiz tarmoq ichida', 'Keshbek']
        },
        {
            id: 3,
            operator: 'Beeline',
            name: 'Status Gold',
            type: 'postpaid',
            price: '50,000',
            data: '30 GB',
            minutes: 'Cheksiz',
            sms: 'Cheksiz',
            features: ['5G', 'Roaming', 'VIP xizmat']
        },
        {
            id: 4,
            operator: 'Ucell',
            name: 'Ishbilarmon',
            type: 'postpaid',
            price: '40,000',
            data: '25 GB',
            minutes: '2000',
            sms: '1500',
            features: ['4G LTE', 'Biznes tarif', 'Guruh aloqasi']
        },
        {
            id: 5,
            operator: 'UMS',
            name: 'Internet PRO',
            type: 'data',
            price: '30,000',
            data: '50 GB',
            minutes: '100',
            sms: '50',
            features: ['4G+', 'Tungi cheksiz', 'YouTube bonus']
        },
        {
            id: 6,
            operator: 'Uzmobile',
            name: 'Bolajon',
            type: 'prepaid',
            price: '5,000',
            data: '2 GB',
            minutes: '200',
            sms: '100',
            features: ['Bolalar uchun', 'Nazorat', 'Ta\'lim portali']
        },
        {
            id: 7,
            operator: 'Humans',
            name: 'Foydali',
            type: 'prepaid',
            price: '20,000',
            data: '15 GB',
            minutes: '1500',
            sms: '1000',
            features: ['4G+', 'Cheksiz ijtimoiy tarmoqlar', 'Keshbek']
        },
        {
            id: 8,
            operator: 'Humans',
            name: 'Premium',
            type: 'postpaid',
            price: '60,000',
            data: '50 GB',
            minutes: 'Cheksiz',
            sms: 'Cheksiz',
            features: ['5G', 'Xalqaro qo\'ng\'iroqlar', 'VIP xizmat']
        }
    ]
};

/* Render SIM Cards */
function renderSimCards(filter = 'all') {
    const cards = filter === 'all' 
        ? simCardsData.all 
        : simCardsData.all.filter(card => card.type === filter);
    
    simcardGrid.innerHTML = cards.map(card => `
        <div class="simcard-item" data-aos="fade-up">
            <div class="simcard-header">
                <span class="operator-badge ${card.operator.toLowerCase()}">${card.operator}</span>
                <span class="card-type">${getCardTypeLabel(card.type)}</span>
            </div>
            <h3>${card.name}</h3>
            <div class="simcard-price">
                <span class="price">${card.price}</span>
                <span class="period">so'm/oy</span>
            </div>
            <div class="simcard-features">
                <div class="feature">
                    <i class="icon-data"></i>
                    <span>${card.data}</span>
                </div>
                <div class="feature">
                    <i class="icon-call"></i>
                    <span>${card.minutes} daq</span>
                </div>
                <div class="feature">
                    <i class="icon-sms"></i>
                    <span>${card.sms} SMS</span>
                </div>
            </div>
            <ul class="simcard-benefits">
                ${card.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="btn btn-primary btn-block" onclick="selectSimCard(${card.id})">
                Tanlash
            </button>
        </div>
    `).join('');
}

function getCardTypeLabel(type) {
    const labels = {
        'prepaid': 'Oldindan to\'lov',
        'postpaid': 'Keyingi to\'lov',
        'data': 'Internet paket'
    };
    return labels[type] || type;
}

/* Tab Functionality */
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderSimCards(button.dataset.tab);
    });
});

/* Initialize SIM Cards */
renderSimCards();

/* Select SIM Card */
function selectSimCard(id) {
    const card = simCardsData.all.find(c => c.id === c.id);
    if (card) {
        document.getElementById('operator').value = card.operator.toLowerCase();
        document.getElementById('amount').value = parseInt(card.price.replace(/,/g, ''));
        document.querySelector('#payment').scrollIntoView({ behavior: 'smooth' });
        showNotification(`${card.name} tarifi tanlandi!`, 'success');
    }
}

/* Phone Number Formatting */
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('998')) {
        value = value.substring(3);
    }
    
    if (value.length > 0) {
        if (value.length <= 2) {
            value = value;
        } else if (value.length <= 5) {
            value = value.slice(0, 2) + ' ' + value.slice(2);
        } else if (value.length <= 7) {
            value = value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5);
        } else {
            value = value.slice(0, 2) + ' ' + value.slice(2, 5) + ' ' + value.slice(5, 7) + ' ' + value.slice(7, 9);
        }
    }
    
    e.target.value = value ? '+998 ' + value : '';
});

/* Amount Formatting */
const amountInput = document.getElementById('amount');
amountInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value) {
        value = parseInt(value).toLocaleString('uz-UZ');
    }
    e.target.value = value;
});

/* Payment Form Submission */
paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(paymentForm);
    const data = Object.fromEntries(formData);
    
    /* Validate phone number */
    const phoneNumber = data.phone.replace(/\D/g, '');
    if (phoneNumber.length !== 12) {
        showNotification('Telefon raqamini to\'liq kiriting!', 'error');
        return;
    }
    
    /* Show loading */
    const submitBtn = paymentForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Jarayonda...';
    
    /* Simulate API call */
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    /* Show success */
    showNotification('To\'lov muvaffaqiyatli amalga oshirildi!', 'success');
    paymentForm.reset();
    
    /* Reset button */
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
});

/* Contact Form Submission */
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    /* Validate email */
    if (!isValidEmail(data.email)) {
        showNotification('Email manzilini to\'g\'ri kiriting!', 'error');
        return;
    }
    
    /* Show loading */
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Yuborilmoqda...';
    
    /* Simulate API call */
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    /* Show success */
    showNotification('Xabaringiz yuborildi! Tez orada bog\'lanamiz.', 'success');
    contactForm.reset();
    
    /* Reset button */
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
});

/* Email Validation */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* Notification System */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="icon-${type}"></i>
        <span>${message}</span>
        <button class="notification-close">×</button>
    `;
    
    document.body.appendChild(notification);
    
    /* Animate in */
    setTimeout(() => notification.classList.add('show'), 10);
    
    /* Auto remove after 5 seconds */
    const timeout = setTimeout(() => removeNotification(notification), 5000);
    
    /* Manual close */
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(timeout);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
}

/* Scroll Effects */
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

/* Intersection Observer for Animations */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/* Observe elements */
document.querySelectorAll('.company-card, .simcard-item, .news-card, .service-card, .review-card').forEach(el => {
    observer.observe(el);
});

/* Number Counter Animation */
function animateCounter(el, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            el.textContent = end + (el.dataset.suffix || '');
        }
    };
    window.requestAnimationFrame(step);
}

/* Animate stats on scroll */
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-item h3');
            statNumbers.forEach(num => {
                const value = num.textContent;
                if (value.includes('M+')) {
                    num.dataset.suffix = 'M+';
                    animateCounter(num, 0, parseFloat(value), 2000);
                } else if (value.includes('/')) {
                    num.textContent = '24/7';
                } else if (value.includes('%')) {
                    num.dataset.suffix = '%';
                    animateCounter(num, 0, parseFloat(value), 2000);
                } else {
                    animateCounter(num, 0, parseInt(value), 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

/* Review Slider */
const reviewSlider = document.querySelector('.review-slider');
if (reviewSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    reviewSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - reviewSlider.offsetLeft;
        scrollLeft = reviewSlider.scrollLeft;
    });

    reviewSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    reviewSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    reviewSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
