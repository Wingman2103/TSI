document.addEventListener('DOMContentLoaded', () => {
    const scrollTopButton = document.getElementById('scrollTop');
    const contentDiv = document.querySelector('.content');


    // Показ кнопки "Наверх" при прокрутке вниз
    window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    // Прокрутка вверх при нажатии на кнопку
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        localStorage.clear();
        alert('localStorage очищен!');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const gamesTable = document.getElementById('gamesTable').querySelector('tbody');

    // Загружаем данные из localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Функция для добавления товара в таблицу
    function addProductToTable(product) {
        const newCell = document.createElement('td');
        newCell.innerHTML = `
            <div class="game">
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}" class="thumbnail">
                </div>
                <h3>${product.name}</h3>
                <p>Описание: ${product.description}
                Цена: ${product.price} руб.</p>
                <button>Купить</button>
            </div>
        `;

        // Добавляем ячейку в таблицу
        let lastRow = gamesTable.lastElementChild;
        if (!lastRow || lastRow.children.length === 3) {
            // Если последняя строка пуста или уже заполнена, создаём новую строку
            const newRow = document.createElement('tr');
            newRow.appendChild(newCell);
            gamesTable.appendChild(newRow);
        } else {
            // Иначе добавляем в последнюю строку
            lastRow.appendChild(newCell);
        }
    }

    // Добавляем все товары из localStorage
    products.forEach(product => addProductToTable(product));
});

document.querySelectorAll('.game').forEach(game => {
    game.addEventListener('click', function () {
        const url = this.dataset.url; // Получить URL из атрибута data-url
        window.location.href = url;
    });
});

// Обработчик для кнопок "Купить"
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Остановить всплытие события, чтобы не активировался родительский клик

        // Получение данных о товаре из кнопки
        const product = JSON.parse(this.dataset.product);

        // Добавление товара в корзину (localStorage)
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Товар добавлен в корзину!');
    });
});
