import { showDetailsView } from "./details.js";
import { showView } from "./nav.js";
import { get } from "./request.js";

export function showHomePage() {
    document.querySelectorAll("section").forEach(s => s.style.display = "none");
    document.getElementById("home-page").style.display = "block";
    start();
}

async function start() {
    const list = document.getElementById('list');
    const movies = await getMovies();

    list.replaceChildren(...movies.map(createMoviesPrevies));
}

async function getMovies() {
    const URL = "http://localhost:3030/data/movies?select=_id%2Ctitle%2Cimg";

    return get(URL);
}

function createMoviesPrevies(movie) {
    const element = document.createElement('li');
    element.innerHTML = `<a href="/details/${movie._id}">${movie.title}</a>`;

    element.querySelector("a").addEventListener('click', event => showView("details-view", showDetailsView, event, movie._id));
    return element;
}