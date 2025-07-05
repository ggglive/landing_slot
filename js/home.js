// Общие функции (звёзды и счётчик)
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    setTimeout(animateOnlineCounter, 3000);
    startWinnersRotation();
});

// Создаем звёздное небо
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = window.innerWidth < 480 ? 80 : 150;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 2 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 5 + 3 + 's';
        const delay = Math.random() * 5 + 's';
        const brightness = Math.random() * 0.7 + 0.3;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.opacity = brightness;
        star.style.setProperty('--duration', duration);
        star.style.animationDelay = delay;
        
        starsContainer.appendChild(star);
    }
}

// Анимация онлайн-счётчика
function animateOnlineCounter() {
    const counter = document.getElementById('onlineCounter');
    let current = parseInt(counter.textContent);
    const target = Math.floor(Math.random() * 101) + 200; // 200-300
    
    const duration = 3000;
    const startTime = performance.now();
    
    function updateCounter(timestamp) {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const increment = Math.floor((target - current) * progress);
        const newValue = current + increment;
        
        counter.textContent = newValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            setTimeout(animateOnlineCounter, 3000);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Генерация случайных юзернеймов
function generateRandomUsername() {
    const prefixes = ['кот', 'лис', 'волк', 'медведь', 'орёл', 'тигр', 'ястреб', 'сокол', 'барс', 'рысь'];
    const suffixes = ['1991', '1985', '2000', '2020', '007', '123', '777', '888', '999', '333'];
    const adjectives = ['красный', 'синий', 'быстрый', 'умный', 'хитрый', 'смелый', 'гордый', 'яркий', 'тёмный', 'серебряный'];
    
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    // Случайно выбираем формат username
    const formats = [
        `${randomPrefix}_${randomSuffix}`,
        `${randomAdjective}_${randomPrefix}`,
        `${randomPrefix}${randomSuffix}`,
        `${randomPrefix}${Math.floor(Math.random() * 50) + 1}`,
        `${randomAdjective}${randomPrefix}`
    ];
    
    return '@' + formats[Math.floor(Math.random() * formats.length)];
}

// Генерация случайной суммы выигрыша
function generateRandomAmount() {
    return Math.floor(Math.random() * 2601) + 400; // 400-3000
}

// Отображение списка победителей
function startWinnersRotation() {
    const winnersList = document.getElementById('winnersList');
    const maxWinners = 5;
    
    // Первоначальное заполнение
    for (let i = 0; i < maxWinners; i++) {
        addWinner(winnersList);
    }
    
    // Обновление каждые 3-6 секунд
    setInterval(() => {
        addWinner(winnersList);
        
        // Удаляем самый старый элемент, если их больше maxWinners
        if (winnersList.children.length > maxWinners) {
            const oldestWinner = winnersList.children[0];
            oldestWinner.style.animation = 'fadeOut 0.5s ease-out';
            
            setTimeout(() => {
                winnersList.removeChild(oldestWinner);
            }, 500);
        }
    }, Math.random() * 3000 + 3000); // 3-6 секунд
}

// Добавление нового победителя
function addWinner(container) {
    const winnerItem = document.createElement('div');
    winnerItem.className = 'winner-item';
    
    const username = document.createElement('div');
    username.className = 'winner-username';
    username.textContent = generateRandomUsername();
    
    const amount = document.createElement('div');
    amount.className = 'winner-amount';
    amount.textContent = `${generateRandomAmount()} USD`;
    
    winnerItem.appendChild(username);
    winnerItem.appendChild(amount);
    
    container.appendChild(winnerItem);
}

// Адаптация звёзд при изменении размера окна
window.addEventListener('resize', function() {
    const starsContainer = document.getElementById('stars');
    starsContainer.innerHTML = '';
    createStars();
});