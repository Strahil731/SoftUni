import { register } from "../api/userService.js";
import { setUser } from "../utils/userUtils.js";

const registerSection = document.querySelector("div[data-view-name='register']");
const form = registerSection.querySelector("form");
form.addEventListener("submit", onSubmit);

let ctx = null;
export function showRegisterView(context) {
    ctx = context;
    ctx.render(registerSection);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const { email, password, repeatPassword } = Object.fromEntries(formData);

    if (email.length < 3 || password.length < 3 || password !== repeatPassword) {
        return alert("Invalid input!");
    }

    const userData = register({ email, password });
    setUser(userData);
    ctx.goTo("/home");
    ctx.updateNav();
    form.reset()
}