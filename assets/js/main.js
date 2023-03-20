import scrollTopButton from "./boton.js";
import contactForm from "./conctactme.js";
import hanburgerMenu from "./menu.js";
import darkTheme from "./tema_oscuro.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  hanburgerMenu(".panel-btn", ".panel", ".menu a");
  contactForm();
  scrollTopButton(".scroll-top-btn");
});

darkTheme(".dark-theme-btn", "dark-mode");
