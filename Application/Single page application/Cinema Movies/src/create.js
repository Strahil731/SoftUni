import { showDetailsView } from "./details.js";
import { showView } from "./nav.js";
import { request } from "./request.js";

start();

function start() {
    document.getElementById("create-form").addEventListener("submit", onPublic);
}

async function onPublic(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const title = data.title.trim();
    const img = data.img.trim();
    const description = data.description.trim();

    const URL = "http://localhost:3030/data/movies";
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
        alert("You must be logged in to public movies!");
        return;
    }
    try {
        const movie = request(URL, {
            methods: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": userData.accessToken
            },
            body: JSON.stringify({ title, img, description })
        });

        showView("details-view", showDetailsView, undefined, movie._id);
    } catch (error) {
        // Do nothing
        // TODO show validation errors
    }
}