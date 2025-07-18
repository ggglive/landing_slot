// Создаем звёздное небо
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = window.innerWidth < 480 ? 70 : 120;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 2 + 1;
        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: twinkle ${Math.random() * 3 + 2}s infinite alternate ${Math.random() * 5}s;
            background-color: #71ffdf;
        `;
        
        starsContainer.appendChild(star);
    }
}

// Анимация онлайн-счётчика
function animateOnlineCounter() {
    const counter = document.getElementById('onlineCounter');
    let current = parseInt(counter.textContent);
    const target = Math.floor(Math.random() * 101) + 200; // 200-300
    
    const duration = 3000; // 3 секунды
    const startTime = performance.now();
    
    function updateCounter(timestamp) {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const increment = Math.floor((target - current) * progress);
        const newValue = current + increment;
        
        counter.textContent = newValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            setTimeout(animateOnlineCounter, 3000); // Повтор каждые 3 секунды
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Кастомный селект
const selectHeader = document.getElementById('selectHeader');
const selectCurrent = document.getElementById('selectCurrent');
const selectOptions = document.getElementById('selectOptions');
const selectItems = document.querySelectorAll('.select-option');
const uploadContainer = document.getElementById('uploadContainer');
const uploadLabel = document.getElementById('uploadLabel');
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const analysis = document.getElementById('analysis');
const result = document.getElementById('result');
const resultStats = document.getElementById('resultStats');
const resetBtn = document.getElementById('resetBtn');

selectHeader.addEventListener('click', function() {
    selectOptions.classList.toggle('active');
    selectHeader.classList.toggle('active');
    document.querySelector('.select-icon').classList.toggle('rotate');
});

selectItems.forEach(item => {
    item.addEventListener('click', function() {
        const slotName = this.querySelector('span').textContent;
        selectCurrent.textContent = slotName;
        selectOptions.classList.remove('active');
        selectHeader.classList.remove('active');
        document.querySelector('.select-icon').classList.remove('rotate');
        
        // Показываем загрузку скриншота
        uploadContainer.style.display = 'block';
        uploadLabel.textContent = `Загрузите скриншот слота ${slotName}:`;
        analysis.style.display = 'none';
        result.style.display = 'none';
        resetBtn.style.display = 'none';
        uploadContainer.classList.remove('active');
    });
});

// Закрытие селекта при клике вне его
document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-select')) {
        selectOptions.classList.remove('active');
        selectHeader.classList.remove('active');
        document.querySelector('.select-icon').classList.remove('rotate');
    }
});

// При наведении на область загрузки
uploadContainer.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('active');
});

uploadContainer.addEventListener('dragleave', function() {
    this.classList.remove('active');
});

// При выборе файла
fileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadLabel.style.display = 'none';
            document.querySelector('.custom-upload-btn').style.display = 'none';
            uploadContainer.classList.add('active');
        }
        
        reader.readAsDataURL(this.files[0]);
        startAnalysis();
    }
});

// Функция анализа
function startAnalysis() {
    analysis.style.display = 'block';
    result.style.display = 'none';
    resetBtn.style.display = 'none';
    
    // Увеличено время анализа до 5 секунд
    setTimeout(showResult, 5000);
}

// Показать результат
function showResult() {
    analysis.style.display = 'none';
    
    // Генерируем случайные числа
    const spins = Math.floor(Math.random() * 21) + 35; // 35-55
    const chance = Math.floor(Math.random() * 14) + 85; // 85-98
    
    resultStats.innerHTML = `
        БОНУС ЧЕРЕЗ <span>${spins}</span> СПИНОВ<br>
        С ШАНСОМ <span>${chance}%</span>
    `;
    
    result.style.display = 'block';
    resetBtn.style.display = 'block';
}

// Кнопка "ЕЩЕ РАЗ"
resetBtn.addEventListener('click', function() {
    selectCurrent.textContent = 'Выберите слот';
    fileInput.value = '';
    imagePreview.src = '';
    imagePreview.style.display = 'none';
    uploadLabel.style.display = 'block';
    document.querySelector('.custom-upload-btn').style.display = 'inline-flex';
    uploadContainer.style.display = 'none';
    analysis.style.display = 'none';
    result.style.display = 'none';
    this.style.display = 'none';
    uploadContainer.classList.remove('active');
});

// Адаптация звёзд при изменении размера окна
window.addEventListener('resize', function() {
    const starsContainer = document.getElementById('stars');
    starsContainer.innerHTML = '';
    createStars();
});

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    setTimeout(animateOnlineCounter, 3000);
});