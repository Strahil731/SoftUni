import { createIdea } from "../api/dataService.js";

const createSection = document.getElementById("create");
const createForm = document.querySelector(".create-form");
createForm.addEventListener("submit", onCreate);

let ctx = null;
export function showCreate(context) {
    ctx = context;
    ctx.render(createSection);
}

async function onCreate(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const imageUrl = document.getElementById("event-image").value;
    const category = document.getElementById("event-category").value;
    const description = document.getElementById("event-description").value;
    const date = document.getElementById("date").value;

    if (!name || !imageUrl || !category || !description || !date) {
        return alert("Invalid inputs!");
    }

    await createIdea({ name, imageUrl, category, description, date });
    ctx.goTo("/event");
    createForm.reset();
}