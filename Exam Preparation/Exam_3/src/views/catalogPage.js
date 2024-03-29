import { getAllFruit } from "../services/dataService.js";

const catalogSection = document.getElementById("dashboard");
const h2 = document.querySelector("h2");
h2.innerHTML = "Fruits";

let ctx = null;

export async function showCatalog(context) {
    ctx = context;
    catalogSection.innerHTML = "";
    ctx.render(h2, catalogSection);

    const fruitData = await getAllFruit();

    if (fruitData.length === 0) {
        catalogSection.innerHTML = '<h2>No fruit info yet.</h2>';
    }

    fruitData.forEach(fruit => {
        catalogSection.innerHTML += createFruitTemp(fruit);
    });

    catalogSection.querySelectorAll("a").forEach(a => a.addEventListener("click", onDetails));
}

function onDetails(event) {
    event.preventDefault();

    const data = event.target.dataset.id;
    ctx.goTo("/details", data);
}

function createFruitTemp(data) {
    return `<div class="fruit">
    <img src="${data.imageUrl}" alt="example1" />
    <h3 class="title">${data.name}</h3>
    <p class="description">${data.description}</p>
    <a class="details-btn" href="details" data-id=${data._id}>More Info</a>
  </div>`;
}