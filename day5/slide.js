let currentIndex = 0;

function showSlide(index) {
    const carousel = document.querySelector('.images');
    const slides = document.querySelectorAll('.image');
    const slideWidth = slides[0].offsetWidth;

    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    carousel.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
}

function prevSlide() {
    showSlide(currentIndex - 1);
}
function nextSlide() {
    showSlide(currentIndex + 1);
}