import { hasUser } from "./utils/userHelper.js";
import { showCreate } from "./views/createPage.js";
import { showDashboard } from "./views/dashboardPage.js";
import { showDetails } from "./views/detailsPage.js";
import { showEdit } from "./views/editPage.js";
import { showHome } from "./views/homePage.js";
import { showLogin } from "./views/loginPage.js";
import { showLogout } from "./views/logoutPage.js";
import { showRegister } from "./views/registerPage.js";
import { showSearch } from "./views/searchPage.js";

document.querySelectorAll("section").forEach(section => section.remove());
document.querySelectorAll("h2").forEach(h2 => h2.style.display = "none");

const main = document.querySelector("main");
const nav = document.querySelector("nav");
nav.addEventListener("click", onNavigate);

const routes = {
    "/": showHome,
    "/login": showLogin,
    "/logout": showLogout,
    "/register": showRegister,
    "/dashboard": showDashboard,
    "/details": showDetails,
    "/create": showCreate,
    "/edit": showEdit,
    "*": () => console.log("404 Page not found!")
}

updateNav();

export function updateNav() {
    const user = hasUser();
    const userNav = document.querySelector("div.user");
    const guestNav = document.querySelector("div.guest");

    if (user) {
        userNav.style.display = "block";
        guestNav.style.display = "none";
    }
    else {
        userNav.style.display = "none";
        guestNav.style.display = "block";
    }
}

function render(firstView, secondView) {
    main.replaceChildren(firstView, secondView);
}

function onNavigate(event) {
    event.preventDefault();

    const element = event.target;

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
    render,
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