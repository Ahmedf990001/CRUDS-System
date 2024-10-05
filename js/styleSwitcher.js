// ------------------------------
// Toggle Style Switcher
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.onclick = () => {
  document.querySelector(".style-switcher").classList.toggle("open");
};


// ------------------------------
// hide and show - style-switcher and scroll-up
const styleSwitcher = document.querySelector('.style-switcher');
const scrollUp = document.querySelector('.scroll-up');

// ------------------------------
window.onscroll = () => {
  if(styleSwitcher.classList.contains("open")) {
    styleSwitcher.classList.remove("open");
  };
  if(scrollY >= 300) {
    scrollUp.classList.add('open');
  }else {
    scrollUp.classList.remove('open');
  };
};
// ------------------------------
scrollUp.onclick = () => {
  scroll(0,0)
};

// ------------------------------
const body = document.body;
const darkMode = document.querySelector(".dark-mode");
const activeStile = localStorage.activeStile;
// ------------------------------
window.onload = () => {
  if(localStorage.darkMode != null) {
    body.classList.add('dark')
    darkMode.innerHTML = '<i class="fa-regular fa-sun"></i>'
  }else {
    darkMode.innerHTML = '<i class="fa-regular fa-moon"></i>';
  };

  if(activeStile) {
    setActiveStyle(activeStile)
  }else {
    setActiveStyle('color-3')
  };
};

// ------------------------------
// Theme Light And Dark Mode
darkMode.onclick = () => {
  if(body.classList.contains('dark')) {
    darkMode.innerHTML = '<i class="fa-regular fa-moon"></i>';
  }else {
    darkMode.innerHTML = '<i class="fa-regular fa-sun"></i>';
  }
  body.classList.toggle("dark");
  if(body.classList.contains('dark')) {
    localStorage.darkMode = 'active';
  }else {
    localStorage.removeItem('darkMode')
  }
console.log(body.classList.contains('dark'))
};

// ------------------------------
// Theme Colors
const alternateStyle = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
  alternateStyle.forEach((style) => {
    if(color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
      localStorage.activeStile = color;
    }else {
      style.setAttribute("disabled","true");
    };
  });
};

