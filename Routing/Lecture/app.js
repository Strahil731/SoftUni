const root = document.querySelector("main");
document.querySelector("nav").addEventListener("click", (event) => {
    if (event.target.tagName == "A") {
        event.preventDefault();

        history.pushState({}, "", event.target.href);
        updateContent();
    }
});

function showHome() {
    root.innerHTML = `<p>Home page</p>`;
}

function showCatalog() {
    root.innerHTML = `<p>Catalog page</p>`;
}

function showAbout() {
    root.innerHTML = `<p>About page</p>`;
}

updateContent();

function updateContent() {
    switch (location.pathname) {
        case "/": return showHome();
        case "/catalog": return showCatalog();
        case "/about": return showAbout();
    }
}