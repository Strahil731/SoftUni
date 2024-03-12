import { dataService } from "../api/dataService.js";
import { hasOnwer } from "../utils/userUtils.js";

const view = document.querySelector("div[data-view-name='details']");

let ctx = null;
export async function showDetailsView(context, data) {
    ctx = context;
    view.innerHTML = "";
    context.render(view);
    const id = data[0];

    const idea = await dataService.getIdea(id);
    const isOnwer = hasOnwer(idea._ownerId);
    view.innerHTML = createIdeaTemp(idea, isOnwer);
    view.querySelector("a").addEventListener("click", onDelete);
}

async function onDelete(event) {
    event.preventDefault();
    const id = event.target.dataset.id;
    await dataService.removeIdea(id);
    ctx.goTo("/dashboard");
}

function createIdeaTemp(data, isOnwer) {
    return `
    <img class="det-img" src="${data.img}" />
        <div class="desc">
            <h2 class="display-5">${data.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${data.description}</p>
        </div>
        <div class="text-center">
            ${isOnwer ? `<a class="btn detb" data-id=${data._id} href="">Delete</a>` : ""}
        </div>`
}