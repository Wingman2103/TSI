document.addEventListener('DOMContentLoaded', () => {
    const scrollTopButton = document.getElementById('scrollTop');


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
    event.preventDefault(); // Предотвращаем отправку формы

    // Получение данных из полей
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value.trim();
    const quantity = document.getElementById('quantity').value.trim();
    const manufacturer = document.getElementById('manufacturer').value;
    const category = document.getElementById('category').value;
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const imageInput = document.getElementById('image');
    const url = "products/product2.html";

    // Валидация: Наименование
    if (name.length < 5 || name.length > 20) {
        alert('Наименование должно быть от 5 до 20 символов.');
        document.getElementById('name').focus();
        return;
    }

    // Валидация: Описание
    if (description.length < 20 || description.length > 100) {
        alert('Описание должно быть от 20 до 100 символов.');
        document.getElementById('description').focus();
        return;
    }

    // Валидация: Цена
    if (price <= 0) {
        alert('Цена должна быть больше 0.');
        document.getElementById('price').focus();
        return;
    }

    // Валидация: Количество
    if (quantity < 1) {
        alert('Количество должно быть не менее 1.');
        document.getElementById('quantity').focus();
        return;
    }

    // Валидация: Производитель
    if (!manufacturer) {
        alert('Выберите производителя.');
        document.getElementById('manufacturer').focus();
        return;
    }

    // Валидация: Категория
    if (!category) {
        alert('Выберите категорию.');
        document.getElementById('category').focus();
        return;
    }

    // Валидация: Телефон
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(phone)) {
        alert('Телефон должен быть в формате: +7 (123) 456-78-90.');
        document.getElementById('phone').focus();
        return;
    }

    // Валидация: Email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert('Введите корректный email в формате example@domain.com.');
        document.getElementById('email').focus();
        return;
    }

    // Валидация: Изображение
    if (!imageInput.files.length) {
        alert('Пожалуйста, загрузите изображение.');
        document.getElementById('image').focus();
        return;
    }

    const imageFile = imageInput.files[0];
    const allowedExtensions = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedExtensions.includes(imageFile.type)) {
        alert('Файл должен быть изображением (png, jpg, jpeg).');
        document.getElementById('image').focus();
        return;
    }

    // Чтение файла изображения
    const reader = new FileReader();
    reader.onload = function (e) {
        const imageData = e.target.result;

        // Создание объекта нового товара
        const newProduct = {
            name,
            description,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            manufacturer,
            category,
            phone,
            email,
            image: imageData, // Содержимое изображения в виде base64
            url,
        };

        // Сохранение товара в localStorage
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        existingProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(existingProducts));

        console.log('Добавлен товар:', newProduct);
        alert('Товар успешно добавлен!');
        document.getElementById('addProductForm').reset(); // Сброс формы
    };

    reader.onerror = function () {
        alert('Ошибка при загрузке изображения!');
    };

    reader.readAsDataURL(imageFile); // Чтение файла изображения
});


document.getElementById('backButton').addEventListener('click', function () {
    window.location.href = 'index.html';
});

