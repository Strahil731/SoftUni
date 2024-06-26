import { getAllMotors } from "../services/dataService.js";

const dashboardSection = document.getElementById("dashboard");
const h2 = document.createElement("h2");
h2.innerHTML = "Available Motorcycles";

let ctx = null;

export async function showDashboard(context) {
    ctx = context;
    dashboardSection.innerHTML = "";
    ctx.render(h2, dashboardSection);

    const motorData = await getAllMotors();

    if (motorData.length === 0) {
        dashboardSection.innerHTML = '<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>';
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