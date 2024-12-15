document.addEventListener('DOMContentLoaded', () => {
  const productListSection = document.querySelector('.product-list');

  // Загружаем данные из localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];

  // Функция для добавления товара в таблицу
  function addProductToTable(product) {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game');
    gameElement.setAttribute('data-url', product.url);
    gameElement.setAttribute('data-genres', product.category);
    gameElement.setAttribute('data-price', product.price);
    gameElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="game-thumbnail">
                <div class="game-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Жанр: ${product.category}</p>
                    <p>Цена: ${product.price} руб.</p>
                </div>
                <button class="buy-button">Купить</button>
      `;
    productListSection.appendChild(gameElement);
  }

  // Добавляем все товары из localStorage
  products.forEach(product => addProductToTable(product));

  productListSection.querySelectorAll('.game').forEach(game => {
    game.addEventListener('click', function () {
        const url = this.dataset.url; // Получить URL из атрибута data-url
        window.location.href = url;
    });
  });

  productListSection.querySelectorAll('.game').forEach(gameDiv => {
    // Добавляем обработчик события на кнопку Купить
    gameDiv.querySelector('.buy-button').addEventListener('click', function () {
        event.stopPropagation(); // Остановить всплытие события, чтобы не активировался родительский клик
        const product = extractProductInfo(gameDiv); // Извлекаем информацию о товаре
  
        // Добавление товара в localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Загружаем корзину из localStorage
        cart.push(product); // Добавляем новый товар
        localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем обновленную корзину
  
        alert(`${product.name} добавлен в корзину!`);
    });
  });
});

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


function extractProductInfo(gameDiv) {

  const productName = gameDiv.querySelector('h3').textContent.trim();
  const productDescription = gameDiv.querySelector('.game-info p:nth-child(2)').textContent.trim();
  const productGenres = gameDiv.querySelector('.game-info p:nth-child(3)').textContent.replace('Жанр:', '').trim();
  const productPriceText = gameDiv.querySelector('.game-info p:nth-child(4)').textContent.trim();
  const productPrice = parseInt(productPriceText.replace('Цена:', '').replace('руб.', '').trim(), 10);
  const productImage = gameDiv.querySelector('img').getAttribute('src');
  const productUrl = gameDiv.dataset.url;

  const productJson = {
      name: productName,
      description: productDescription,
      genres: productGenres.split(',').map(genre => genre.trim()), 
      price: productPrice,
      image: productImage,
      url: productUrl
  };

  return productJson

}

document.addEventListener("DOMContentLoaded", function () {
  const categories = document.querySelectorAll(".category"); // Получаем все категории
  const games = document.querySelectorAll(".game"); // Получаем все товары
  const resetButton = document.getElementById("resetFilters"); // Кнопка сброса фильтров
  const priceRange = document.getElementById("price-range"); // Ползунок для цены
  const priceDisplay = document.getElementById("price-display"); // Текст, показывающий диапазон цены

  let selectedCategories = []; // Массив выбранных категорий

  // Обработчик для каждого элемента категории
  categories.forEach(function (category) {
      category.addEventListener("click", function (e) {
          e.preventDefault(); // Отменяем стандартное поведение ссылки

          // Убираем класс 'active' у всех категорий
          category.classList.toggle("active");

          const selectedCategory = category.getAttribute("data-category"); // Получаем выбранную категорию
          if (category.classList.contains("active")) {
              selectedCategories.push(selectedCategory); // Добавляем категорию в массив
          } else {
              selectedCategories = selectedCategories.filter(function (cat) {
                  return cat !== selectedCategory;
              }); // Убираем категорию из массива
          }

          filterGames(); // Применяем фильтрацию
      });
  });

  // Обработчик для изменения значения ползунка
  priceRange.addEventListener("input", function () {
      const maxPrice = priceRange.value;
      priceDisplay.textContent = `До ${maxPrice} руб.`;
      filterGames(); // Применяем фильтрацию
  });

  // Обработчик для кнопки сброса фильтров
  resetButton.addEventListener("click", function () {
      // Снимаем выделение с категорий
      categories.forEach(function (category) {
          category.classList.remove("active");
      });

      // Сбрасываем ползунок
      priceRange.value = 5000;
      priceDisplay.textContent = "До 5000 руб.";

      // Очищаем массив выбранных категорий
      selectedCategories = [];

      // Показываем все товары
      games.forEach(function (game) {
          game.style.display = "flex";
      });
  });

  // Функция для фильтрации товаров по категориям и цене
  function filterGames() {
      const maxPrice = priceRange.value;

      games.forEach(function (game) {
          const gameGenres = game.getAttribute("data-genres").split(", ");
          const gamePrice = parseInt(game.getAttribute("data-price"), 10);

          const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.some(category => gameGenres.includes(category));
          const isPriceMatch = gamePrice <= maxPrice;

          if (isCategoryMatch && isPriceMatch) {
              game.style.display = "flex"; // Показываем товар
          } else {
              game.style.display = "none"; // Скрываем товар
          }
      });
  }
});





