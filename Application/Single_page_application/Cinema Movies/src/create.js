import { showDetailsView } from "./details.js";
import { showView } from "./nav.js";
import { post } from "./request.js";
import { createSubmitHandler, getUserData } from "./util.js";

start();

function start() {
    document.getElementById("create-form").addEventListener("submit",createSubmitHandler(onPublic));
}

async function onPublic({title, img, description}) {
    const URL = "http://localhost:3030/data/movies";
    const userData = getUserData();

    if (!userData) {
        alert("You must be logged in to public movies!");
        return;
    }
    const movie = post(URL, { title, img, description });

    showView("details-view", showDetailsView, undefined, movie._id);
}