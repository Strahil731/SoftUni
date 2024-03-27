import { logout } from "../api/userService.js";
import { updateNav } from "../app.js";
import { removeUser } from "../utils/userUtils.js";
import { showHome } from "./homeView.js";

export async function showLogout() {
    await logout();
    removeUser();
    updateNav();
    ctx.goTo("/home");
}