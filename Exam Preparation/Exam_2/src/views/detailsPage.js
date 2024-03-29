import { getSingleMotor, removeMotor } from "../services/dataService.js";
import { hasOwner } from "../utils/userHelper.js";

const detailsSection = document.getElementById("details");
let ctx = null;

export async function showDetails(context, data) {
  ctx = context;
  detailsSection.innerHTML = "";
  ctx.render(detailsSection, "");

  const id = data[0];
  const motor = await getSingleMotor(id);
  const isOwner = hasOwner(motor._ownerId);

  detailsSection.innerHTML = createDetailsTemp(motor, isOwner);

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
    await removeMotor(id);
    ctx.goTo("/dashboard");
  }
}

async function onEdit(event) {
  event.preventDefault();
  const data = event.target.dataset.id;
  ctx.goTo("/edit", data);
}

function createDetailsTemp(motor, isOwner) {
  return `<div id="details-wrapper">
    <img id="details-img" src="${motor.imageUrl}" alt="example1" />
    <p id="details-title">${motor.model}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="year">Year: ${motor.year}</p>
        <p class="mileage">Mileage: ${motor.mileage} km.</p>
        <p class="contact">Contact Number: ${motor.contact}</p>
        <p id="motorcycle-description">${motor.about}</p>
      </div>
      <div id="action-buttons">
        ${isOwner ? `<a href="" id="edit-btn" data-id=${motor._id}>Edit</a>
        <a href="" id="delete-btn" data-id=${motor._id}>Delete</a>` : ""}
      </div>
    </div>
  </div>`;
}