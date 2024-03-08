import { showRegisterView } from "./register.js";
import { showHome } from "./home.js";
import { getUserData } from "./userHelper.js";
import { showLogin } from "./login.js";
import { showLogout } from "./logout.js";

document.querySelectorAll("section").forEach(section => section.style.display = "none");
document.querySelector("nav").addEventListener("click", onNavigate);
const userMSG = document.getElementById("welcome-msg");

const userNav = document.querySelectorAll("li.user");
const guestNav = document.querySelectorAll("li.guest");

const routes = {
    "/": showHome,
    "/home": showHome,
    "/register": showRegisterView,
    "/login": showLogin,
    "/logout": showLogout,
    "/addMovie": () => console.log("add"),
    "/details/:id": () => console.log("add")
};

export function onNavigate(event) {

    if (event.target.tagName !== "A" || !event.target.href) {
        return;
    }

    event.preventDefault();

    const url = new URL(event.target.href);
    const path = url.pathname;
    routes[path]();
}

export function updateNav() {
    const userData = getUserData();

    if (userData) {
        userNav.forEach(li => li.style.display = "block");
        guestNav.forEach(li => li.style.display = "none");
        userMSG.textContent = `Welcome, ${userData.email}`;
    }
    else {
        userNav.forEach(li => li.style.display = "none");
        guestNav.forEach(li => li.style.display = "block");
        userMSG.textContent = "";
    }
}

updateNav();
showHome();