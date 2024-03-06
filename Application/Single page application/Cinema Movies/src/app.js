import { showHomePage } from "./home.js";
import { showLohinPage } from "./login.js";
import { showView } from "./nav.js";

const views = {
    "home-link": ["home-page", showHomePage],
    "login-link": ["login-page", showLohinPage]
};

for (let linkId in views) {
    const [sectionId, callback] = views[linkId];
    document.getElementById(linkId).addEventListener('click', event => showView(sectionId, callback, event));
}

document.getElementById("loading").remove();
showView("home-page", showHomePage);