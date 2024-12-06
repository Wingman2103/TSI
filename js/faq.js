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