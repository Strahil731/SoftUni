import { getAllCyberpunk } from "../services/dataService.js";

const catalogSection = document.getElementById("dashboard");
const h3 = document.querySelector(".heading");

let ctx = null;
export async function showDashboard(context) {
    h3.style.display = "block";
    ctx = context;
    catalogSection.innerHTML = "";
    ctx.render(h3, catalogSection);

    const cyberpunkData = await getAllCyberpunk();

    if (cyberpunkData.length === 0) {
        catalogSection.innerHTML = `<h3 class="empty">No Items Yet</h3>`;
    }

    cyberpunkData.forEach(el => {
        catalogSection.innerHTML += createCyberpunkTemp(el);
    });

    catalogSection.querySelectorAll("a").forEach(a => a.addEventListener("click", onDetails));
}

function onDetails(event) {
    event.preventDefault();

    const id = event.target.dataset.id;
    ctx.goTo("/details", id);
}

function createCyberpunkTemp(data) {
    return `<div class="item">
    <img src="${data.imageUrl}" alt="example1" />
    <h3 class="model">${data.item}</h3>
    <div class="item-info">
      <p class="price">Price: €${data.price}</p>
      <p class="availability">${data.availability}</p>
      <p class="type">Type: ${data.type}</p>
    </div>
    <a class="details-btn" href="details" data-id=${data._id}>Uncover More</a>
  </div>`;
}