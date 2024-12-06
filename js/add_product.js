document.addEventListener('DOMContentLoaded', () => {
    const scrollTopButton = document.getElementById('scrollTop');
    // const contentDiv = document.querySelector('.content');


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

document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Валидация полей
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value.trim();
    const quantity = document.getElementById('quantity').value.trim();
    const manufacturer = document.getElementById('manufacturer').value;
    const category = document.getElementById('category').value;
    const platform = document.getElementById('platform').value;
    const supplier = document.getElementById('supplier').value;
    const imageInput = document.getElementById('image');
    const url = "products/product2.html";
    
    if (!name || !price || !quantity || !manufacturer || !category || !platform || !supplier || !imageInput.files.length) {
        alert('Пожалуйста, заполните все обязательные поля!');
        return;
    }

    // Загрузка файла
    const imageFile = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const imageData = e.target.result; // Это содержимое изображения в формате base64

        // Добавление товара (пока просто вывод в консоль)
        const newProduct = {
            name,
            description,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            manufacturer,
            category,
            platform,
            supplier,
            image: imageData, // Содержимое изображения
            url
        };

        // Сохраняем товар в localStorage
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        existingProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(existingProducts));

        console.log('Добавлен товар:', newProduct);
        alert('Товар успешно добавлен!');
    };

    reader.onerror = function () {
        alert('Ошибка при загрузке изображения!');
    };

    // Чтение содержимого файла
    reader.readAsDataURL(imageFile);

    this.reset(); // Сброс формы
});

document.getElementById('backButton').addEventListener('click', function () {
    window.location.href = 'index.html';
});

