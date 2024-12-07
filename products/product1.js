// Получаем элементы
const mainImage = document.getElementById('mainImage');
const zoom = document.getElementById('zoomIcon');
const thumbnails = document.querySelectorAll('.thumbnail');

// Добавляем обработчик событий для каждой миниатюры
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
        // Меняем src основного изображения на src выбранной миниатюры
        mainImage.src = this.src;
        zoom.setAttribute('data-large', this.src);
    });
});

// Функция для добавления товара в корзину
function addToCart(product) {
    // Получаем текущую корзину из localStorage или создаём пустую
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Добавляем товар в корзину
    cart.push(product);

    // Сохраняем корзину обратно в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Уведомление пользователя
    alert('Товар добавлен в корзину!');
}

// Логика для кнопки "Купить"
document.getElementById('buyButton').addEventListener('click', function () {
    // Получаем данные товара
    const product = {
        name: document.getElementById('productName').textContent,
        description: document.getElementById('productDescription').textContent,
        price: parseFloat(document.getElementById('productPrice').textContent),
        image: document.getElementById('mainImage').src
    };

    // Вызываем функцию добавления товара в корзину
    addToCart(product);
});

document.addEventListener('DOMContentLoaded', () => {
    const scrollTopButton = document.getElementById('scrollTop');
    const contentDiv = document.querySelector('.container');


    // Показ кнопки "Наверх" при прокрутке вниз
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
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
    });
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

function extractProductInfo() {
    // Находим контейнер с информацией о товаре
    const container = document.getElementById('game');

    // Извлекаем данные
    const name = container.querySelector('.product-header h1').textContent.trim();
    const priceText = container.querySelector('.product-header .price').textContent.trim();
    const price = parseInt(priceText.replace(/[^\d]/g, ''), 10); // Извлекаем только число
    const mainImage = container.querySelector('.image-container #mainImage').getAttribute('src').replace('../', '');
    const description = container.querySelector('.product-description p').textContent.trim();
    const genres = Array.from(container.querySelectorAll('.genres span')).map(span => span.textContent.trim());

    // Составляем JSON
    const product = {
        name: name,
        price: price,
        image: mainImage,
        description: description,
        genres: genres,
        url: window.location.href // Добавляем текущий URL страницы
    };

    return product;
}

document.addEventListener('DOMContentLoaded', () => {
    const buyButton = document.getElementById('buyButton');
    const cartKey = 'cart'; // Ключ для localStorage

    // Обработчик для кнопки "Купить"
    buyButton.addEventListener('click', function () {
        const product = extractProductInfo();

        // Получаем текущую корзину из localStorage
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        // Добавляем товар в корзину
        cart.push(product);

        // Сохраняем обновленную корзину в localStorage
        localStorage.setItem(cartKey, JSON.stringify(cart));

        alert('Товар успешно добавлен в корзину!');
    });
});
