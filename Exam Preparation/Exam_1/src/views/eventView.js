import { getAllIdeas } from "../api/dataService.js";

const dashboardSection = document.getElementById("dashboard");
let ctx = null;

export async function showDashboard(context) {
    ctx = context;
    dashboardSection.innerHTML = "";
    ctx.render(dashboardSection);

    const data = await getAllIdeas();

    if (!data) {
        dashboardSection.innerHTML = "<h4>No Events yet.</h4>";
    }

    data.forEach(idea => {
        dashboardSection.innerHTML += createIdeaTemp(idea);
    });

    dashboardSection.querySelectorAll("a").forEach(a => a.addEventListener("click", onDetailsHandler));
}

function onDetailsHandler(event) {
    event.preventDefault();

    const data = event.target.dataset.id;
    ctx.goTo("/details", data);
}

function createIdeaTemp(data) {
    return `<div class="event">
    <img src="${data.imageUrl}" alt="example1" />
    <p class="title">
      ${data.name}
    </p>
    <p class="date">${data.date}</p>
    <a class="details-btn" href="details" data-id="${data._id}">Details</a>
  </div>`;
}