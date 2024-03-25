import { updateNav } from "./app.js";
import { showHomePage } from "./homeView.js";
import { setUserData } from "./userHelper.js";
import { register } from "./userService.js";

document.querySelector(".register-form").addEventListener("submit", onRegister);

export function showRegisterPage() {
    document.querySelectorAll("section").forEach(section => section.style.display = "none");
    document.querySelector("h2").style.display = "none";
    document.querySelector("h4").style.display = "none";
    document.getElementById("register").style.display = "block";
}

async function onRegister(event) {
    event.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const rePassword = document.getElementById("repeat-password").value;

    if (!email || !password || password !== rePassword) {
        return alert("Invali input!");
    }

    const userData = await register({ email, password, rePassword });
    setUserData(userData);
    updateNav();
    showHomePage();
}