import { getSingleMotor, updateMotor } from "../services/dataService.js";

const editSection = document.getElementById("edit");
let ctx = null;

export async function showEdit(context, data) {
    ctx = context;
    editSection.innerHTML = "";
    ctx.render(editSection,  "");

    const id = data[0];
    const dataDetails = await getSingleMotor(id);
    editSection.innerHTML = createEditFunction(dataDetails);

    const submitBtn = document.querySelector("button[type='submit']");
    submitBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const model = document.getElementById("model").value;
        const imageUrl = document.getElementById("moto-image").value;
        const year = document.getElementById("year").value;
        const mileage = document.getElementById("mileage").value;
        const contact = document.getElementById("contact").value;
        const about = document.getElementById("about").value;

        const item = { model, imageUrl, year, mileage, contact, about };
        await updateMotor(id, item);
        ctx.goTo("/details", id)
    });
}

function createEditFunction(data) {
    return `<h2>Edit Motorcycle</h2>
    <div class="form">
      <h2>Edit Motorcycle</h2>
      <form class="edit-form">
        <input type="text" name="model" id="model" value="${data.model}" />
        <input type="text" name="imageUrl" id="moto-image" value="${data.imageUrl}" />
        <input type="number" name="year" id="year" value="${data.year}" />
        <input type="number" name="mileage" id="mileage" value="${data.mileage}" />
        <input type="number" name="contact" id="contact" value="${data.contact}" />
        <textarea id="about" name="about" value="" rows="10" cols="50">${data.about}</textarea>
        <button type="submit">Edit Motorcycle</button>
      </form>
    </div>`;
}