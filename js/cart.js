document.addEventListener('DOMContentLoaded', () => {
    const scrollTopButton = document.getElementById('scrollTop');
    const contentDiv = document.querySelector('.content');


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

document.addEventListener("DOMContentLoaded", function () {
    const productListSection = document.querySelector('.product-list');
    const cartKey = "cart";

    // Функция для загрузки товаров из localStorage
    function loadCart() {
        const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        
        
        if (cartItems.length === 0) {
            productListSection.innerHTML = `<h2>КОРЗИНА ПУСТА</h2>`;
            return;
        }
        else {
            productListSection.innerHTML = `<h2>ВАШИ ТОВАРЫ В КОРЗИНЕ</h2>`;
        }

        cartItems.forEach((item, index) => {
            const gameElement = document.createElement('div');
            gameElement.classList.add('game');
            gameElement.setAttribute('data-url', item.url);
            gameElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="game-thumbnail">
                <div class="game-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p><strong>Цена:</strong> ${item.price} руб.</p>
                    <p><strong>Жанр:</strong> ${item.genres.join(', ')}</p>
                </div>
                <button class="buy-button" data-index="${index}">Удалить из корзины</button>
            `;
            productListSection.appendChild(gameElement);
            

            productListSection.querySelectorAll('.game').forEach(game => {
                game.addEventListener('click', function (event) {
                  if (!event.target.classList.contains("buy-button")) { // Если клик не по кнопке "Купить"
                    const url = this.dataset.url; // Получить URL из атрибута data-url
                    window.location.href = url;
                  }
                });
              });
        });
    }

    // Функция для удаления товара из корзины
    function removeFromCart(index) {
        let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        cartItems.splice(index, 1);
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
        loadCart(); // Перезагрузка списка товаров
    }


    productListSection.addEventListener("click", function (event) {
    if (event.target.classList.contains("buy-button")) {
        event.stopPropagation(); // Предотвратить распространение события (чтобы не было перехода на страницу товара)
        const index = event.target.dataset.index;
        alert(`Товар удален из корзины:(`);
        removeFromCart(index);
    }
    });


    // Загружаем товары при загрузке страницы
    loadCart();
});
