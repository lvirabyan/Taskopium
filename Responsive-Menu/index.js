const checkbox = document.getElementById('check');
const navbar = document.querySelector('.navbar');

checkbox.addEventListener('change', function () {
    if (this.checked) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
});