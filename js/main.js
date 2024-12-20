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
            <div class="game" data-url=${product.url}>
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}" class="thumbnail">
                </div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>Жанры:</strong> ${product.category}.</p>
                <p><strong>Цена:</strong> ${product.price} руб.</p>
                <button class="buy-button">Купить</button>
            </div>
        `;

        // Добавляем ячейку в таблицу
        let lastRow = gamesTable.lastElementChild;
        if (!lastRow || lastRow.children.length === 3) {
            const newRow = document.createElement('tr');
            newRow.appendChild(newCell);
            gamesTable.appendChild(newRow);
        } else {
            lastRow.appendChild(newCell);
        }
    }

    // Добавляем все товары из localStorage
    products.forEach(product => addProductToTable(product));

    gamesTable.querySelectorAll('.game').forEach(game => {
        game.addEventListener('click', function () {
            const url = this.dataset.url; // Получить URL из атрибута data-url
            window.location.href = url;
        });
    });

    gamesTable.querySelectorAll('.game').forEach(gameDiv => {
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


function extractProductInfo(gameDiv) {
    const name = gameDiv.querySelector('h3').textContent.trim();
    const image = gameDiv.querySelector('img').getAttribute('src'); 
    const description = gameDiv.querySelector('p').textContent.trim();
    const priceMatch = description.match(/Цена:\s*(\d+)\s*руб\./); 
    const price = priceMatch ? parseInt(priceMatch[1], 10) : 0; 

     let genres = [];
     const genreStartIndex = description.indexOf("Жанры:");
     if (genreStartIndex !== -1) {
         const genreText = description.substring(genreStartIndex + 6).split('.')[0]; 
         genres = genreText.split(',').map(genre => genre.trim()); 
     }


    return {
        name: name,
        image: image,
        description: description.split('Жанры:')[0].trim(), 
        genres: genres, 
        price: price, 
        url: gameDiv.getAttribute('data-url') 
    };
}



