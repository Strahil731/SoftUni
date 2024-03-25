import { updateNav } from "./app.js";
import { showHomePage } from "./homeView.js";
import { setUserData } from "./userHelper.js";
import { login } from "./userService.js";

document.querySelector(".login-form").addEventListener("submit", onLogin);

export function showLoginPage() {
  document.querySelectorAll("section").forEach(section => section.style.display = "none");
  document.querySelector("h2").style.display = "none";
  document.querySelector("h4").style.display = "none";
  document.getElementById("login").style.display = "block";
}

async function onLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    return alert("Invali email or password!");
  }

  const userData = await login({ email, password });
  setUserData(userData);
  updateNav();
  showHomePage();
}