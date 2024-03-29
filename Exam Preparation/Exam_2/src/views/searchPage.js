const searchSection = document.getElementById("search");
const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", onSearch);

const searchResult = document.querySelector(".search-result");

let ctx = null;

export function showSearch(context) {
    ctx = context;
    ctx.render(searchSection, "");
    searchResult.innerHTML = '<h2 class="no-avaliable">No result.</h2>';
}

async function onSearch(event) {
    event.preventDefault();

    const searchInput = document.getElementById("search-input").value;

    if (!searchInput) {
        return alert("Please check your input!");
    }

    const response = await fetch(`http://localhost:3030/data/motorcycles?where=model%20LIKE%20%22${searchInput}%22`, {
        method: "GET"
    });

    const data = await response.json();
    searchResult.innerHTML = "";

    if (data.length === 0) {
        searchResult.innerHTML = '<h2 class="no-avaliable">No result.</h2>';
    }

    for (let el of data) {
        searchResult.innerHTML += createResultTemp(el);
    }

    searchForm.reset();

    const moreInfoBtn = searchResult.querySelectorAll("a.details-btn");
    moreInfoBtn.forEach(a => a.addEventListener("click", onDetails));
}

function onDetails(event) {
    event.preventDefault();

    const id = event.target.dataset.id;
    ctx.goTo("/details", id);
}

function createResultTemp(data) {
    return `<div class="motorcycle">
    <img src="${data.imageUrl}" alt="example1" />
    <h3 class="model">${data.model}</h3>
    <a class="details-btn" href="details" data-id=${data._id}>More Info</a>
  </div>`;
}