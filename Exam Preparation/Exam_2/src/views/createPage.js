import { createMotor } from "../services/dataService.js";

const addSection = document.getElementById("create");
const addForm = document.querySelector(".create-form");
addForm.addEventListener("submit", onCreate);

let ctx = null;
export function showCreate(context) {
    ctx = context;
    ctx.render(addSection,  "");
}

async function onCreate(event) {
    event.preventDefault();

    const model = document.getElementById("model").value;
    const imageUrl = document.getElementById("moto-image").value;
    const year = document.getElementById("year").value;
    const mileage = document.getElementById("mileage").value;
    const contact = document.getElementById("contact").value;
    const about = document.getElementById("about").value;

    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
        return;
    }

    await createMotor({ model, imageUrl, year, mileage, contact, about });
    ctx.goTo("/dashboard");
    addForm.reset();
}