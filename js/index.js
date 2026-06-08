const filter_btns = document.querySelectorAll('.filter-btn');
const skills_wrap = document.querySelector(".skills");
const skills_bars = document.querySelectorAll(".skill-progress");
const records_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const footer_input = document.querySelector(".footer-input");
const hamburger_menu = document.querySelector(".hamburger-menu");
const navbar = document.querySelector("header nav");
const links = document.querySelectorAll(".links a");
let numbersStarted = false;

if (footer_input) {
  footer_input.addEventListener("focus", () => {
    footer_input.classList.add("focus");
  });

  footer_input.addEventListener("blur", () => {
    if (footer_input.value !== "") return;
    footer_input.classList.remove("focus");
  });
}

function closeMenu() {
  if (!navbar) return;
  navbar.classList.remove("open");
  document.body.classList.remove("stop-scrolling");
  if (hamburger_menu) hamburger_menu.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (!navbar) return;

  if (!navbar.classList.contains("open")) {
    navbar.classList.add("open");
    document.body.classList.add("stop-scrolling");
    if (hamburger_menu) hamburger_menu.setAttribute("aria-expanded", "true");
  } else {
    closeMenu();
  }
}

if (hamburger_menu) {
  hamburger_menu.addEventListener("click", toggleMenu);
}

links.forEach((link) => link.addEventListener("click", closeMenu));

filter_btns.forEach((btn) =>
   btn.addEventListener("click", () =>{
      filter_btns.forEach((button) => button.classList.remove("active"));
        btn.classList.add("active" );

        let filterValue = btn.dataset.filter;
          if (window.jQuery && window.jQuery.fn.isotope) {
            $(".grid").isotope({ filter: filterValue});
          }
    })
);

if (window.jQuery && window.jQuery.fn.isotope) {
  $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    transitionDuration: '0.6s'
  });
}

window.addEventListener("scroll", ()=> {
    skillsEffect();
    countUp();
});

function checkScroll(el){
    if (!el) return false;
    let rect = el.getBoundingClientRect();
    if (window.innerHeight >= rect.top + el.offsetHeight) return true;
     return false;
}

function skillsEffect(){
    if(!checkScroll(skills_wrap)) return;
     skills_bars.forEach((skill) => (skill.style.width = skill.dataset.progress))
}

function countUp(){
    if(numbersStarted || !checkScroll(records_wrap)) return;
    numbersStarted = true;
    records_numbers.forEach((numb) => {
        const updateCount = () => {
            let currentNum = +numb.innerText;
            let maxNum = +numb.dataset.num;
            let speed = 100;
            const increment = Math.ceil(maxNum / speed);

            if (currentNum < maxNum) {
                numb.innerText = currentNum + increment;
                setTimeout(updateCount, 1)
            } else{
                numb.innerText = maxNum;
            }
        };

        updateCount();
    });
}

if (typeof Swiper !== "undefined" && document.querySelector(".reviews-slider")) {
  var mySwiper = new Swiper(".reviews-slider", {
    speed: 1100,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
  });
}
