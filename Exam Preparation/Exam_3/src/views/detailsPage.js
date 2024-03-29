import { getSingleFruit, removeFruit } from "../services/dataService.js";
import { hasOwner } from "../utils/userHelper.js";

const detailsSection = document.getElementById("details");

let ctx = null;

export async function showDetails(context, data) {
    ctx = context;
    detailsSection.innerHTML = "";
    ctx.render(detailsSection, "");

    const id = data[0];
    const fruit = await getSingleFruit(id);
    const isOwner = hasOwner(fruit._ownerId);

    detailsSection.innerHTML = createDetailsTemp(fruit, isOwner);

    if (isOwner) {
        const deleteBtn = document.getElementById("delete-btn");
        deleteBtn.addEventListener("click", onDelete);

        const editBtn = document.getElementById("edit-btn");
        editBtn.addEventListener("click", onEdit);
    }
}

async function onDelete(event) {
    event.preventDefault();

    const id = event.target.dataset.id;
    const choise = confirm("Are you sure you want delete this bike?");

    if (choise) {
        await removeFruit(id);
        ctx.goTo("/catalog");
    }
}

async function onEdit(event) {
    event.preventDefault();
    const data = event.target.dataset.id;
    ctx.goTo("/edit", data);
}

function createDetailsTemp(fruit, isOwner) {
    return `<div id="details-wrapper">
    <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
    <p id="details-title">${fruit.name}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p>${fruit.description}</p>
            <p id="nutrition">Nutrition</p>
           <p id = "details-nutrition">${fruit.nutrition}</p>
      </div>
  <div id="action-buttons">
    ${isOwner ? `<a href="" id="edit-btn" data-id=${fruit._id}>Edit</a>
    <a href="" id="delete-btn" data-id=${fruit._id}>Delete</a>` : ""}
  </div>
    </div>
</div>`;
}