import { showEventPage } from "./eventView.js";
import { showHomePage } from "./homeView.js";
import { showLoginPage } from "./loginView.js";
import { showLogoutView } from "./logoutView.js";
import { showRegisterPage } from "./registerView.js";
import { getUserData } from "./userHelper.js";

document.querySelectorAll("section").forEach(section => section.style.display = "none");
document.querySelector("nav").addEventListener("click", onNavigate);
const userNav = document.querySelector("div.user");
const guestNav = document.querySelector("div.guest");

const routes = {
    "/": showHomePage,
    "/login": showLoginPage,
    "/register": showRegisterPage,
    "/logout": showLogoutView,
    "/event": showEventPage
}

function onNavigate(event) {
    event.preventDefault();

    const url = new URL(event.target.href);
    const path = url.pathname;
    routes[path]();
}

export function updateNav() {

    const user = getUserData();

    if (user) {
        userNav.style.display = "block";
        guestNav.style.display = "none";
    }
    else {
        userNav.style.display = "none";
        guestNav.style.display = "block";
    }
}

updateNav();
showHomePage();