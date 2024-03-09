import { get } from "./request.js";

export async function showDetailsView(movieId) {
    displayDetails({
        title: "",
        img: "",
        description: ""
    })
    const movie = await getMovieById(movieId);
    displayDetails(movie);
}

async function getMovieById(id) {
    const URL = `http://localhost:3030/data/movies/${id}`;

    return get(URL);
}

function displayDetails(movie) {
    const section = document.getElementById("details-view");
    section.querySelector('h1').textContent = movie.title;
    section.querySelector('img').src = movie.img;
    section.querySelector('p').textContent = movie.description;
}