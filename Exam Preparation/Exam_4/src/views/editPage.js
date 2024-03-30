import { getSingleCyberpunk, updateCyberpunk } from "../services/dataService.js";

const editSection = document.getElementById("edit");
let ctx = null;

export async function showEdit(context, data) {
  ctx = context;
  ctx.render(editSection, "");

  const id = data[0];
  const detailsData = await getSingleCyberpunk(id);
  editSection.innerHTML = createEditTemp(detailsData);

  const submitBtn = document.querySelector("button[type='submit']");
  submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const item = document.getElementById("item").value;
    const imageUrl = document.getElementById("item-image").value;
    const price = document.getElementById("price").value;
    const availability = document.getElementById("availability").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;

    const data = { item, imageUrl, price, availability, type, description };
    await updateCyberpunk(id, data);
    ctx.goTo("/details", id);
  });
}

function createEditTemp(data) {
  return `<div class="form form-item">
    <h2>Edit Your Item</h2>
    <form class="edit-form">
      <input type="text" name="item" id="item" value="${data.item}" />
      <input
        type="text"
        name="imageUrl"
        id="item-image"
        value="${data.imageUrl}"
      />
      <input
        type="text"
        name="price"
        id="price"
        value="${data.price}"
      />
      <input
        type="text"
        name="availability"
        id="availability"
        value="${data.availability}"
      />
      <input
        type="text"
        name="type"
        id="type"
        value="${data.type}"
      />
      <textarea
        id="description"
        name="description"
        placeholder="More About The Item"
        rows="10"
        cols="50"
      >${data.description}</textarea>
      <button type="submit">Edit</button>
    </form>
  </div>`;
}