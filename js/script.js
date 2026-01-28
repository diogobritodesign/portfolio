// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

console.log('%c Design To Impress ', 'background: #00FFA3; color: #000; font-size: 16px; padding: 8px; font-weight: bold;');
