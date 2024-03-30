import { updateNav } from "../app.js";
import { logout } from "../services/userService.js";
import { removeUser } from "../utils/userHelper.js";

export async function showLogout(context){
    await logout();
    removeUser();
    updateNav();
    context.goTo("/");
}