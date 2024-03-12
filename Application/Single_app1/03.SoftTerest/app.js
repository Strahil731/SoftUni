import { logout } from "./api/userService.js";
import { hasUser, removeUser } from "./utils/userUtils.js";
import { showCreateView } from "./views/createView.js";
import { showDashboardView } from "./views/dashboardView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showHomeView } from "./views/homeView.js";
import { showLoginView } from "./views/loginView.js";
import { showRegisterView } from "./views/registerView.js";

document.querySelectorAll("div[data-selection='section']").forEach(section => section.remove());
const main = document.querySelector("main");
const nav = document.querySelector("nav");
nav.addEventListener("click", onNavigation);

updateNav();

const routes = {
    "/home": showHomeView,
    "/dashboard": showDashboardView,
    "/create": showCreateView,
    "/login": showLoginView,
    "/register": showRegisterView,
    "/details": showDetailsView,
    "/logout": async () => {
        await logout();
        removeUser();
        updateNav();
        goTo("/home");
    },
    "*": () => console.error("404 Page not found")
};

function updateNav() {
    const isUserExist = hasUser();
    const guestA = document.querySelectorAll("a[data-permission='guest']");
    const userA = document.querySelectorAll("a[data-permission='user']");

    if (isUserExist) {
        guestA.forEach(a => a.style.display = "none");
        userA.forEach(a => a.style.display = "block");
    }
    else {
        guestA.forEach(a => a.style.display = "block");
        userA.forEach(a => a.style.display = "none");
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
        element = e.target.parentElement;
    }

    const viewName = new URL(element.href).pathname;
    goTo(viewName);
}

let context = {
    render: render,
    goTo,
    updateNav
};

function goTo(name, ...params) {
    const handler = routes[name];

    if (typeof (handler) !== "function") {
        return routes["*"]();
    }
    handler(context, params);
}