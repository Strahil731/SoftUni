document.querySelector("form").addEventListener("submit", onSubmit);
document.querySelector("a[id='logout']").style.display = "none";
document.querySelector("a[id='login']").className = "active";

const loginURL = "http://localhost:3030/users/login";

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        return; // TODO error state
    }

    await loginUser({ email, password });
    e.target.reset();
    window.location = "index.html";
}

async function loginUser(data) {
    const option = createOption("POST", data);

    const response = await fetch(loginURL, option);
    const userData = await response.json();
    sessionStorage.setItem("userData", JSON.stringify(userData));
}

function createOption(method, data) {
    return {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
}