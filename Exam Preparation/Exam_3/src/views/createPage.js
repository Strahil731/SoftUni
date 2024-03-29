import { createFruit } from "../services/dataService.js";

const createSection = document.getElementById("create");
const createForm = document.querySelector(".create-form");
createForm.addEventListener("submit", onCreate);

let ctx = null;
export function showCreate(context) {
    ctx = context;
    ctx.render(createSection, "");
}

async function onCreate(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const imageUrl = document.getElementById("Fruit-image").value;
    const description = document.getElementById("fruit-description").value;
    const nutrition = document.getElementById("fruit-nutrition").value;

    if (!name || !imageUrl || !description || !nutrition) {
        return alert("Invalid input!");
    }

    await createFruit({ name, imageUrl, description, nutrition });
    ctx.goTo("/catalog");
    createForm.reset();
}