const searchSection = document.getElementById("search");
const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", onSearch);

const searchResult = document.querySelector(".search-result");
let ctx = null;

export function showSearch(context) {
    ctx = context;
    ctx.render(searchSection, "");
    searchResult.innerHTML = '<p class="no-result">No result.</p>';
}

async function onSearch(event) {
    event.preventDefault();

    const searchInput = document.getElementById("search-input").value;

    if (!searchInput) {
        return alert("Invalid input!");
    }

    const response = await fetch(`http://localhost:3030/data/fruits?where=name%20LIKE%20%22${searchInput}%22`, {
        method: "GET"
    });

    const data = await response.json();
    searchResult.innerHTML = "";

    if (data.length === 0) {
        searchResult.innerHTML = '<p class="no-result">No result.</p>';
    }

    for (let el of data) {
        searchResult.innerHTML += createSearchResult(el);
    }

    searchForm.reset();

    const detailsBtn = searchResult.querySelector("a.details-btn");
    detailsBtn.addEventListener("click", onDetails);
}

function onDetails(event) {
    event.preventDefault();

    const data = event.target.dataset.id;
    ctx.goTo("/details", data);
}

function createSearchResult(data) {
    return `<div class="fruit">
    <img src="${data.imageUrl}" alt="example1" />
    <h3 class="title">${data.name}</h3>
    <p class="description">${data.description}</p>
    <a class="details-btn" href="details" data-id=${data._id}>More Info</a>
  </div>`;
}