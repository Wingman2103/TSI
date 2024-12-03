document.addEventListener('DOMContentLoaded', () => {
    const scrollTopButton = document.getElementById('scrollTop');
    const contentDiv = document.querySelector('.content');


    // Показ кнопки "Наверх" при прокрутке вниз
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
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
                <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;">
                <h3>${product.name}</h3>
                <p>Описание: ${product.description} Цена: ${product.price} руб.</p>
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

document.addEventListener('DOMContentLoaded', () => {
    const zoomIcons = document.querySelectorAll('.zoom-icon'); // Все пиктограммы луп
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    // Навешиваем обработчик на каждую лупу
    zoomIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const largeImageSrc = icon.getAttribute('data-large'); // Получаем путь к большому изображению
            modalImage.src = largeImageSrc; // Устанавливаем его в модальное окно
            modal.style.display = 'flex'; // Показываем модальное окно
        });
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Закрытие при клике вне изображения
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
