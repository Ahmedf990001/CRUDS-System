/* ========== Toggle Style Switcher ========== */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.onclick = function() {
  document.querySelector(".style-switcher").classList.toggle("open");
};

/*  Hide Style - Switcher On Scroll  */
window.onscroll = function() {
  if(document.querySelector(".style-switcher").classList.contains("open")) {
    document.querySelector(".style-switcher").classList.remove("open");
  }
}

/* ========== Theme Colors ========== */
const alternateStyle = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
  alternateStyle.forEach((style) => {
    if(color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    }else {
      style.setAttribute("disabled","true");
    }
  })
};

/* ========== Theme Light And Dark Mode ========== */
const dayNight = document.querySelector(".dark-mode");
dayNight.onclick = function() {
  dayNight.querySelector("svg").classList.toggle("fa-sun");
  dayNight.querySelector("svg").classList.toggle("fa-moon");
  document.body.classList.toggle("dark");
};

window.onload = function() {
  if(document.body.classList.contains("dark")) {
    dayNight.querySelector("svg").classList.add("fa-sun");
  }else {
    dayNight.querySelector("svg").classList.add("fa-moon");
  }
};