document.addEventListener('DOMContentLoaded', () => {
  const productListSection = document.querySelector('.product-list');

  // Загружаем данные из localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];

  // Функция для добавления товара в таблицу
  function addProductToTable(product) {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game');
    gameElement.setAttribute('data-url', product.url);
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


