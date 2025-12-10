// SMOOTH SCROLL ACTIVE LINK
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

function updateActiveLink() {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        const id = section.getAttribute("id");

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = id;
        }
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === "#" + current) {
            a.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);


// MOBILE MENU
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");

if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("bx-x");
        navbar.classList.toggle("active");
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    });
});


// RESUME TAB SWITCH
const resumeBtns = document.querySelectorAll('.resume-btn');

if (resumeBtns.length) {
    resumeBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const resumeDetails = document.querySelectorAll('.resume-detail');

            resumeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            resumeDetails.forEach(detail => detail.classList.remove('active'));
            if (resumeDetails[idx]) resumeDetails[idx].classList.add('active');
        });
    });
}


// PORTFOLIO SLIDER
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
const portfolioDetails = document.querySelectorAll('.portfolio-detail');

function activePortfolio() {
    if (!imgSlide) return;
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
    portfolioDetails.forEach(detail => detail.classList.remove('active'));
    if (portfolioDetails[index]) portfolioDetails[index].classList.add('active');

    // update disabled state
    if (arrowLeft) {
        if (index <= 0) arrowLeft.classList.add('disabled'); else arrowLeft.classList.remove('disabled');
    }
    if (arrowRight) {
        if (index >= portfolioDetails.length - 1) arrowRight.classList.add('disabled'); else arrowRight.classList.remove('disabled');
    }
}

if (arrowRight) {
    arrowRight.addEventListener('click', () => {
        if (index < (portfolioDetails.length - 1)) index++;
        activePortfolio();
    });
}

if (arrowLeft) {
    arrowLeft.addEventListener('click', () => {
        if (index > 0) index--;
        activePortfolio();
    });
}

// init portfolio state
activePortfolio();
