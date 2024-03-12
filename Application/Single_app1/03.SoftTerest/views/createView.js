import { dataService } from "../api/dataService.js";

const view = document.querySelector("div[data-view-name='create']");
const form = view.querySelector("form");
form.addEventListener("submit", onSubmit);

let ctx = null;
export function showCreateView(context) {
    ctx = context;
    ctx.render(view);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { title, description, imageURL } = Object.fromEntries(formData);

    if (title.length < 6 || description.length < 10 || imageURL < 5) {
        return alert("Error create");
    }

    await dataService.createIdea({ title, description, imageURL });
    ctx.goTo("/dashboard");
    form.reset();
}