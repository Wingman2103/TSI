// Найти все миниатюры
const thumbnails = document.querySelectorAll(".thumbnail");

// Добавить обработчик событий для каждой миниатюры
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    // Найти основное изображение, связанное с миниатюрой
    const mainImage = thumbnail.closest(".product").querySelector("img");
    // Заменить изображение в основном блоке на выбранное
    const newSrc = thumbnail.getAttribute("data-src");
    mainImage.setAttribute("src", newSrc);
  });
});

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

      localStorage.clear();
      alert('localStorage очищен!');
  });
});

document.querySelectorAll('.game').forEach(game => {
  game.addEventListener('click', function () {
      const url = this.dataset.url; // Получить URL из атрибута data-url
      window.location.href = url;
  });
});