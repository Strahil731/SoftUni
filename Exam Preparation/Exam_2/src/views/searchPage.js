import { getAllMotors } from "../services/dataService.js";

const searchSection = document.getElementById("search");
const searchResult = document.querySelector(".search-result");
let ctx = null;

const searchINput = document.getElementById("search-input");

export async function showSearch(context) {
    ctx = context;
    searchResult.innerHTML = "";
    ctx.render(searchSection);

    const findData = await getAllMotors();
    console.log(findData);
}