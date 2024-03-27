import { hasUser } from "./utils/userUtils.js";
import { showCreate } from "./views/createView.js";
import { showDetails } from "./views/detailsView.js";
import { showEdit } from "./views/editView.js";
import { showDashboard } from "./views/eventView.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginView.js";
import { showLogout } from "./views/logoutView.js";
import { showRegister } from "./views/registerView.js";

document.querySelectorAll("section").forEach(section => section.remove());

const main = document.querySelector("main");
const nav = document.querySelector("nav");
nav.addEventListener("click", onNavigation);

updateNav();

const routes = {
    "/home": showHome,
    "/login": showLogin,
    "/logout": showLogout,
    "/register": showRegister,
    "/addEvent": showCreate,
    "/event": showDashboard,
    "/details": showDetails,
    "/edit": showEdit,
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

showHome(context);