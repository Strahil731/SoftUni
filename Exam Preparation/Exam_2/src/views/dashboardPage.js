import { getAllMotors } from "../services/dataService.js";

const main = document.querySelector("main");
const noValible = document.querySelector(".no-valible");
const dashboardSection = document.getElementById("dashboard");

let ctx = null;

export async function showDashboard(context) {
    ctx = context;
    dashboardSection.innerHTML = "";
    ctx.render(dashboardSection);

    const motorData = await getAllMotors();

    if (!motorData) {
        dashboardSection.innerHTML += noValible;
    }

    motorData.forEach(motor => {
        dashboardSection.innerHTML += createMotorTemp(motor);
    });

    dashboardSection.querySelectorAll("a").forEach(a => a.addEventListener("click", onDetailsHendler));
}

function onDetailsHendler(event) {
    event.preventDefault();

    const data = event.target.dataset.id;
    ctx.goTo("/details", data);
}

function createMotorTemp(motorData) {
    return `<div class="motorcycle">
    <img src="${motorData.imageUrl}" alt="example1" />
    <h3 class="model">${motorData.model}</h3>
    <p class="year">Year: ${motorData.year}</p>
    <p class="mileage">Mileage: ${motorData.mileage} km.</p>
    <p class="contact">Contact Number: ${motorData.contact}</p>
    <a class="details-btn" href="details" data-id="${motorData._id}">More Info</a>
  </div>`;
}