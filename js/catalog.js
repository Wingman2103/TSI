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