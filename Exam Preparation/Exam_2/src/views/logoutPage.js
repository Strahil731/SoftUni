import { updateNav } from "../app.js";
import { logout } from "../services/userService.js";
import { removeUser } from "../utils/userHelper.js";

let ctx = null;

export async function showLogout(context) {
    ctx = context;
    await logout();
    removeUser();
    updateNav();
    ctx.goTo("/");
}