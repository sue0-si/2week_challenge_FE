const toggleBtn = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});