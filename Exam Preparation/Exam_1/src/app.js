import { hasUser } from "./utils/userUtils.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginView.js";
import { showLogout } from "./views/logoutView.js";

document.querySelectorAll("section").forEach(section => section.remove());
document.querySelector("h2").style.display = "none";
document.querySelector("h4").style.display = "none";

const main = document.querySelector("main");
const nav = document.querySelector("nav");
nav.addEventListener("click", onNavigation);

updateNav();

const routes = {
    "/": showHome,
    "/login": showLogin,
    "/logout": showLogout,
    "*": () => console.error("404 Page not found!")
}

export function updateNav() {
    const isUserExist = hasUser();
    const userNav = document.querySelector("div.user");
    const guestNav = document.querySelector("div.guest");

    if (isUserExist) {
        userNav.style.display = "block";
        guestNav.style.display = "none";
    }
    else {
        userNav.style.display = "none";
        guestNav.style.display = "block";
    }
}

function render(view) {
    main.replaceChildren(view);
}

function onNavigation(event) {
    event.preventDefault();

    let element = event.target;

    if (event.target.tagName !== "A" && event.target.tagName !== "IMG") {
        return;
    }

    if (event.target.tagName === "IMG") {
        element = event.target.parentElement;
    }

    const url = new URL(element.href).pathname;
    goTo(url);
}

let context = {
    render: render,
    goTo,
    updateNav
}

function goTo(name, ...params) {
    const handler = routes[name];

    if (typeof (handler) !== "function") {
        return routes["*"]();
    }

    handler(context, params);
}