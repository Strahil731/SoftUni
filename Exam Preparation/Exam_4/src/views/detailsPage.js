import { getSingleCyberpunk, removeCyberpunk } from "../services/dataService.js";
import { hasOwner } from "../utils/userHelper.js";

const detailsSection = document.getElementById("details");
let ctx = null;

export async function showDetails(context, data) {
    ctx = context;
    detailsSection.innerHTML = "";
    ctx.render(detailsSection, "");

    const id = data[0];
    const cyberpunk = await getSingleCyberpunk(id);
    const isOwner = hasOwner(cyberpunk._ownerId);

    detailsSection.innerHTML = createDetailsTemp(cyberpunk, isOwner);

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
    const choise = confirm("Are you sure you want delete this cyberpunk?");

    if (choise) {
        await removeCyberpunk(id);
        ctx.goTo("/dashboard");
    }
}

async function onEdit(event) {
    event.preventDefault();
    const data = event.target.dataset.id;
    ctx.goTo("/edit", data);
}

function createDetailsTemp(data, isOwner) {
    return `<div id="details-wrapper">
    <div>
      <img id="details-img" src="${data.imageUrl}" alt="example1" />
      <p id="details-title">${data.item}</p>
    </div>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="details-price">Price: €${data.price}</p>
        <p class="details-availability">${data.availability}</p>
        <p class="type">Type: ${data.type}</p>
        <p id="item-description">${data.description}</p>
      </div>
      <div id="action-buttons">
        ${isOwner ? `<a href="" id="edit-btn" data-id=${data._id}>Edit</a>
        <a href="" id="delete-btn" data-id=${data._id}>Delete</a>` : ""}
      </div>
    </div>
  </div>`;
}