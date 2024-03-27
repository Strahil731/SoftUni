import { getIdea, removeIdea } from "../api/dataService.js";
import { hasOwner } from "../utils/userUtils.js";

const detailsSection = document.getElementById("details");
let ctx = null;

export async function showDetails(context, data) {
  ctx = context;
  detailsSection.innerHTML = "";
  context.render(detailsSection);

  const id = data[0];
  const idea = await getIdea(id);
  const isOwner = hasOwner(idea._ownerId);

  detailsSection.innerHTML = createIdeaTemp(idea, isOwner);

  const deleteBtn = document.getElementById("delete-btn");
  deleteBtn.addEventListener("click", onDelete);

  const editBtn = document.getElementById("edit-btn");
  editBtn.addEventListener("click", onEdit);
}

function onEdit(event) {
  event.preventDefault();
  const data = event.target.dataset.id;
  ctx.goTo("/edit", data);
}

async function onDelete(event) {
  event.preventDefault();

  const id = event.target.dataset.id;
  await removeIdea(id);
  ctx.goTo("/event");
}

function createIdeaTemp(data, isOwner) {

  return `
  <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.name}</p>
            <p id="details-category">
              Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${data.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${data.description}</span>
              </div>
            </div>
            <h3>Going: <span id="go">0</span> times.</h3>
            <div id="action-buttons">
              ${isOwner ? `<a href="" id="edit-btn" data-id=${data._id}>Edit</a>
              <a href="" id="delete-btn" data-id=${data._id}>Delete</a>` : `<a href="" id="go-btn">Going</a>`}
            </div>
          </div>`;
}         