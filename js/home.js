// Общие функции (звёзды и счётчик)
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    setTimeout(animateOnlineCounter, 3000);
    startWinnersRotation();
});

// Создаем звёздное небо
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = window.innerWidth < 480 ? 50 : 80;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.opacity = opacity;
        
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
    const digits = '0123456789';
    let randomDigits = '';
    for (let i = 0; i < 4; i++) {
        randomDigits += digits[Math.floor(Math.random() * digits.length)];
    }
    return `****${randomDigits}`;
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