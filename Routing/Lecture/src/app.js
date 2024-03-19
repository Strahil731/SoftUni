// Импортиране на функции от друг файл
import { itemFotFound, loadData, showCatalog, showDetails } from "./catalog.js";

// Импортиране на page библиотеката
import page from "//unpkg.com/page/page.mjs";

// Взимане на main селектора от документа
const main = document.querySelector("main");

// Създаване на page, която приема 2 параметъра (URL, функцията, която да изпълни)
page("/", showHome);
// Функция, която приема първо данните от сървър и след това изпълнява другата функция.
page("/catalog", loadData, showCatalog);
page("/catalog/:id", showDetails);
page("/catalog/*", itemFotFound);
page("/about", showAbout);
page("*", notFound);

// Извикване на page библиотеката
page();

// Създаване на функциите, които се прикачват чрез innerHTML към main селектора и се визуализират
function showHome() {
    main.innerHTML = "<p>Home Page!!!</p>";
}

function showAbout() {
    main.innerHTML = "<p>About Page!!!</p>";
}

function notFound() {
    main.innerHTML = "<p>404 Page not found!</p>";
}