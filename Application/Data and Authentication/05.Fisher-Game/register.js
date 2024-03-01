document.querySelector("form").addEventListener("submit", onSubmit);
document.querySelector("a[id='logout']").style.display = "none";
document.querySelector("a[id='register']").className = "active";

const registerURL = "http://localhost:3030/users/register";

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let email = formData.get("email");
    let password = formData.get("password");
    let rePass = formData.get("rePass");

    if (!email || !password || !rePass || password !== rePass) {
        return; // TODO load error msg
    }

    await createUser({ email, password });
    e.target.reset();
    window.location = "index.html";
}

async function createUser(data) {
    const options = createOption("POST", data);

    const response = await fetch(registerURL, options);
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