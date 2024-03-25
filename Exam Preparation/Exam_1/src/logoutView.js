import { updateNav } from "./app.js";
import { showHomePage } from "./homeView.js";
import { clearUserData } from "./userHelper.js";
import { logout } from "./userService.js";

export async function showLogoutView(){
    await logout;
    clearUserData();
    updateNav();
    showHomePage();
}