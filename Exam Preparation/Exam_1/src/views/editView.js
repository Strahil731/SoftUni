import { getIdea, updateIdea } from "../api/dataService.js";

const editSection = document.getElementById("edit");

let ctx = null;

export async function showEdit(context, data) {
    ctx = context;
    editSection.innerHTML = "";
    ctx.render(editSection);

    const id = data[0];
    const dataDetails = await getIdea(id);
    editSection.innerHTML = createEditFunction(dataDetails);

    const submitBtn = document.querySelector("button[type='submit']");
    submitBtn.addEventListener("click", async (event) => {
        event.preventDefault();


        const name = document.getElementById("name").value;
        const imageUrl = document.getElementById("event-image").value;
        const category = document.getElementById("event-category").value;
        const description = document.getElementById("event-description").value;
        const date = document.getElementById("date").value;

        const item = { name, imageUrl, category, description, date };
        await updateIdea(id, item);
        ctx.goTo("/event");
    });
}

function createEditFunction(data) {
    return `<div class="form">
    <h2>Edit Event</h2>
    <form class="edit-form">
      <input
        type="text"
        name="name"
        id="name"
        value=${data.name}
      />
      <input
        type="text"
        name="imageUrl"
        id="event-image"
        value=${data.imageUrl}
      />
      <input
        type="text"
        name="category"
        id="event-category"
       value=${data.category}
      />
      <textarea
        id="event-description"
        name="description"
        placeholder="Description"
        rows="5"
        cols="50"
      >${data.description}</textarea>
      <label for="date-and-time">Event Time:</label>
      <input
      type="text"
      name="date"
      id="date"
      value=${data.date}
    />
      <button type="submit">Edit</button>
    </form>
  </div>`;
}