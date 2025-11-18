let yesCount = 0;
let noCount = 0;
const history = [];

// Получаем элементы DOM
const questionInput = document.getElementById('questionInput');
const generateBtn = document.getElementById('generateBtn');
const result = document.getElementById('result');
const historyList = document.getElementById('historyList');
const yesCountElement = document.getElementById('yesCount');
const noCountElement = document.getElementById('noCount');

// Функция генерации ответа
function generateAnswer() {
    // Проверяем, есть ли вопрос
    const question = questionInput.value.trim();
    if (!question) {
        alert('Пожалуйста, введите ваш вопрос!');
        return;
    }

    // Добавляем вопросительный знак если его нет
    const formattedQuestion = question.endsWith('?') ? question : question + '?';

    // Генерируем случайный ответ (50/50)
    const randomAnswer = Math.random() < 0.5 ? 'Да' : 'Нет';
    
    // Обновляем счетчики и внешний вид
    if (randomAnswer === 'Да') {
        yesCount++;
        result.className = 'result yes animation';
        yesCountElement.textContent = yesCount;
    } else {
        noCount++;
        result.className = 'result no animation';
        noCountElement.textContent = noCount;
    }

    // Показываем результат
    result.textContent = randomAnswer;

    // Добавляем в историю
    const historyItem = {
        question: formattedQuestion,
        answer: randomAnswer,
        timestamp: new Date().toLocaleTimeString()
    };
    
    history.unshift(historyItem);
    
    // Обновляем историю на экране
    updateHistory();

    // Очищаем поле ввода
    questionInput.value = '';

    // Убираем анимацию
    setTimeout(() => {
        result.classList.remove('animation');
    }, 500);
}

// Функция обновления истории
function updateHistory() {
    historyList.innerHTML = history.slice(0, 10).map(item => 
        `<div class="history-item">
            <strong>${item.question}</strong> - 
            <span class="${item.answer === 'Да' ? 'yes' : 'no'}">${item.answer}</span>
            <small style="color: #666; float: right;">${item.timestamp}</small>
        </div>`
    ).join('');
}

// Назначаем обработчики событий
generateBtn.addEventListener('click', generateAnswer);

questionInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateAnswer();
    }
});

// Фокусируемся на поле ввода при загрузке
document.addEventListener('DOMContentLoaded', function() {
    questionInput.focus();
});