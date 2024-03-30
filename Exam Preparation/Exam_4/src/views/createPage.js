import { createCyberpunk } from "../services/dataService.js";

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

    const item = document.getElementById("item").value;
    const imageUrl = document.getElementById("item-image").value;
    const price = document.getElementById("price").value;
    const availability = document.getElementById("availability").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;

    if (!item || !imageUrl || !price || !availability || !type || !description) {
        return alert("Share item error!");
    }

    await createCyberpunk({ item, imageUrl, price, availability, type, description });
    ctx.goTo("/dashboard");
    createForm.reset();
}