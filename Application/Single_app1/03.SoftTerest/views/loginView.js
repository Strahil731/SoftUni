import { login } from "../api/userService.js";
import { setUser } from "../utils/userUtils.js";

const loginSection = document.querySelector("div[data-view-name='login']");
const form = loginSection.querySelector("form");
form.addEventListener("submit", onSubmit);

let ctx = null;
export function showLoginView(context) {
    ctx = context;
    ctx.render(loginSection);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
        return alert("Invalid username or password");
    }

    const userData = await login({ email, password });
    setUser(userData);
    ctx.updateNav();
    ctx.goTo("/home");
    form.reset();
}