import { getSingleFruit, updateFruit } from "../services/dataService.js";

const editSection = document.getElementById("edit");

let ctx = null;
export async function showEdit(context, data) {
    ctx = context;
    ctx.render(editSection, "");

    const id = data[0];
    const dataDetails = await getSingleFruit(id);
    editSection.innerHTML = createEditTemp(dataDetails);

    const submitBtn = document.querySelector("button[type='submit']");
    submitBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const imageUrl = document.getElementById("Fruit-image").value;
        const description = document.getElementById("fruit-description").value;
        const nutrition = document.getElementById("fruit-nutrition").value;

        const item = { name, imageUrl, description, nutrition };
        await updateFruit(id, item);
        ctx.goTo("/details", id);
    });
}

function createEditTemp(data) {
    return `<div class="form">
    <h2>Edit Fruit</h2>
    <form class="edit-form">
      <input
        type="text"
        name="name"
        id="name"
        value="${data.name}"
      />
      <input
        type="text"
        name="imageUrl"
        id="Fruit-image"
        value="${data.imageUrl}"
      />
      <textarea
        id="fruit-description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      >${data.description}</textarea>
      <textarea
        id="fruit-nutrition"
        name="nutrition"
        placeholder="Nutrition"
        rows="10"
        cols="50"
      >${data.nutrition}</textarea>
      <button type="submit">post</button>
    </form>
  </div>`;
}