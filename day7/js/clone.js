let currentIndex = 0;

const toggle = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');
const login = document.querySelector('.login');


function showSlide(index) {
    const carousel = document.querySelector('.slide');
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

setInterval(nextSlide, 2000)

toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    login.classList.toggle('active');
});