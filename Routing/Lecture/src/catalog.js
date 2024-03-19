// Взимане на main селектора от документа
const main = document.querySelector("main");

// Създаване на масия от обекти, за дадени продукти, които имат id и name
const item = [
    {
        id: "1",
        name: "ACER NITRO 5"
    },
    {
        id: "2",
        name: "XIAOMI 13 LITE"
    },
    {
        id: "3",
        name: "DJI SE 2 MINI"
    }
];

// Chainig Route Handlers, което е известно и като middleware patern, като може при
// page("/catalog", showCatalog) да се извърши повече от една функция, като например зареждане от сървър.

async function loadData(ctx, next) {
    main.innerHTML = `<p>Loading...</p>`;

    // Създаване на нов Promise, което изчаква 1сек. след което показва листа с продукти
    await new Promise(r => setTimeout(r, 1000));

    ctx.data = item;

    // Чрез извикването на next, се извиква следвашият page handler, защото ако не се извика next,
    // следващата функция няма да се изпълни.
    next();
}

// Функция, която създава списък с продукти от масива, с прикачена хипервръзка и ги показва в браузъра
function showCatalog(ctx) {
    main.innerHTML = `<p>Catalog Page!!!</p>
    <ul>
        ${ctx.data.map(i => `<li><a href="/catalog/${i.id}">${i.name}</a></li>`).join('\n')}
    </ul>`;
}

// Функция, която показва на екрана, че продуктът не е намерен
function itemFotFound() {
    main.innerHTML = "<p>Item not found!!!</p>";
}

// Функция, показваща детайлите на даденият продукт, като трябва да и се зададе context.
// В този случай context се равнява като event. Взимаме id на продукта от URL чрез ctx.params.id,
// като id може да бъде всякакво име. То се взима от page("/catalog/:id") и го показва на екрана
function showDetails(ctx) {
    const productId = ctx.params.id;
    const currentItem = item.find(i => i.id == productId);

    main.innerHTML = `<h5>Product Details</h5>
    <p>${currentItem.name}</p>
    <button>CLICK TO BACK</button>`;

    // Взимане на бутона създаден по-горе, прикачване на събитие, което при натискане на бутона,
    // чрез командата ctx.page.redirect("/catalog"), директно да ме върне на /catalog.
    main.querySelector("button").addEventListener("click", () => {
        ctx.page.redirect("/catalog");
    })
}

export {
    showCatalog,
    itemFotFound,
    showDetails,
    loadData
}