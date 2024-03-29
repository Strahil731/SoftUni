import { getUser } from "./utils/userHelper.js";
import { showCatalog } from "./views/catalogPage.js";
import { showCreate } from "./views/createPage.js";
import { showDetails } from "./views/detailsPage.js";
import { showEdit } from "./views/editView.js";
import { showHome } from "./views/homePage.js";
import { showLogin } from "./views/loginPage.js";
import { showLogout } from "./views/logoutView.js";
import { showRegister } from "./views/registerPage.js";
import { showSearch } from "./views/searchPage.js";

document.querySelectorAll("section").forEach(section => section.remove());
document.querySelectorAll("h2").forEach(h2 => h2.style.display = "none");

const main = document.querySelector("main");
const nav = document.querySelector("nav");
nav.addEventListener("click", onNavigate);

const userNav = document.querySelector(".user");
const guestNav = document.querySelector(".guest");

updateNav();

const routes = {
    "/": showHome,
    "/login": showLogin,
    "/logout": showLogout,
    "/register": showRegister,
    "/catalog": showCatalog,
    "/details": showDetails,
    "/edit": showEdit,
    "/create": showCreate,
    "/search": showSearch
}

export function updateNav() {
    const user = getUser();

    if (user) {
        userNav.style.display = "block";
        guestNav.style.display = "none";
    }
    else {
        userNav.style.display = "none";
        guestNav.style.display = "block";
    }
}

function render(firstView, secondVuew) {
    main.replaceChildren(firstView, secondVuew);
}

function onNavigate(event) {
    event.preventDefault();

    const element = event.target;

    if (event.target.tagName !== "A" && event.target.tagName !== "IMG") {
        return;
    }

    if (event.target.tagName === "IMG") {
        element = event.tagName.parentElement;
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