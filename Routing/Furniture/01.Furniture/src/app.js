import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { showDashboardView } from "./views/dashboardView.js";
import { showRegisterView } from "./views/registerView.js";
import { userHelper } from "./utility/userHelper.js";
import { showLoginView } from "./views/loginView.js";
import { showLogoutView } from "./views/logoutView.js";
import { showDetailsView } from "./views/detailsView.js";
import { showCreateView } from "./views/createView.js";

const root = document.querySelector("div[data-id='root']");
const userNav = document.getElementById("user");
const guestNav = document.getElementById("guest");

page("/", updateCTX, showDashboardView);
page("/dashboard", updateCTX, showDashboardView);
page("/create", updateCTX, showCreateView);
page("/details/:id", updateCTX, showDetailsView);
page("/edit/:id", () => console.error("edit"));
page("/myFurniture", () => console.error("myFurniture"));
page("/login", updateCTX, showLoginView);
page("/register", updateCTX, showRegisterView);
page("/logout", updateCTX, showLogoutView);

page.start();
updateNav();

function loadingFunction(temp) {
    render(temp, root);
}

function updateCTX(ctx, next) {
    ctx.render = loadingFunction;
    ctx.updateNav = updateNav;
    ctx.goTo = goTo;
    next();
}

function updateNav() {
    const user = userHelper.getUserData();

    if (user) {
        userNav.style.display = "inline-block";
        guestNav.style.display = "none";
    }
    else {
        userNav.style.display = "none";
        guestNav.style.display = "inline-block";
    }
}

function goTo(path) {
    page.redirect(path);
}