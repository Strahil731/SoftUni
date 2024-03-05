export function showHomeView() {
    document.querySelectorAll("section").forEach(s => s.style.display = "none");
    document.getElementById("home-page").style.display = "block";
    start();
}

async function start() {
    const list = document.getElementById("list");
    const movies = await getMovies();

    list.replaceChildren(...movies.map(createMoviesPreview));
}

async function getMovies() {
    const url = "http://localhost:3030/data/movies?select=_id%2Ctitle%2Cimg";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message);
        }

        const movies = await response.json();
        return movies;
    }
    catch (err) {
        alert(err.message);
    }
}

function createMoviesPreview(movie) {
    const element = document.createElement("li");
    element.innerHTML = `<a href="/details/${movie._id}">${movie.title}</a>`;

    return element;
}