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