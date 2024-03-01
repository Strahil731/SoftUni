document.querySelector("a[id='home']").className = "active";
document.getElementById("logout").addEventListener("click", onLogout);
document.querySelector(".load").addEventListener("click", onLoadCatch);
document.getElementById("addForm").addEventListener("submit", onCreate);

let userData = JSON.parse(sessionStorage.getItem("userData"));

const userNav = document.getElementById("user");
const guestNav = document.getElementById("guest");
const addBtn = document.querySelector(".add");
const catchesContainer = document.getElementById("catches");

const endPoints = {
    logout: "http://localhost:3030/users/logout",
    catches: "http://localhost:3030/data/catches"
};

function hasOwner(id) {
    return userData?._id === id;
}

// update nav
updateNav();
function updateNav() {
    if (userData) {
        document.querySelector("nav p span").textContent = userData.email;
        userNav.style.display = "inline-block";
        guestNav.style.display = "none";
        addBtn.disabled = false;
    }
    else {
        document.querySelector("nav p span").textContent = "guest";
        userNav.style.display = "none";
        guestNav.style.display = "inline-block";
        addBtn.disabled = true;
    }
}

async function onLogout(e) {
    let option = {
        method: "GET",
        headers: {
            "x-Authorization": userData.accessToken
        }
    }
    await fetch(endPoints.logout, option);
    sessionStorage.clear();
    userData = null;
    await onLoadCatch();
    updateNav();
}

async function onLoadCatch() {
    const response = await fetch(endPoints.catches);
    const data = await response.json();

    catchesContainer.innerHTML = "";

    data.forEach(element => {
        let div = listAllCatches(element);
        catchesContainer.appendChild(div);
    });
}

function listAllCatches(data) {
    let isOwner = hasOwner(data._ownerId);
    let div = document.createElement("div");
    div.className = "catch";

    div.innerHTML += '<label>Angler</label>';
    div.innerHTML += `<input type="text" class="angler" value="${data.angler}">`;
    div.innerHTML += '<label>Weight</label>';
    div.innerHTML += `<input type="text" class="weight" value="${data.weight}">`;
    div.innerHTML += '<label>Species</label>';
    div.innerHTML += `<input type="text" class="species" value="${data.species}">`;
    div.innerHTML += '<label>Location</label>';
    div.innerHTML += `<input type="text" class="location" value="${data.location}">`;
    div.innerHTML += '<label>Bait</label>';
    div.innerHTML += `<input type="text" class="bait" value="${data.bait}">`;
    div.innerHTML += '<label>Capture Time</label>';
    div.innerHTML += `<input type="number" class="captureTime" value="${data.captureTime}">`;

    const updateBtn = document.createElement("button");
    updateBtn.className = "update";
    updateBtn.dataset.id = data._id;
    updateBtn.textContent = "Update";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.dataset.id = data._id;
    deleteBtn.textContent = "Delete";

    if (!hasOwner(data._ownerId)) {
        updateBtn.disabled = true;
        deleteBtn.disabled = true;
    }

    div.appendChild(updateBtn);
    div.appendChild(deleteBtn);

    updateBtn.addEventListener("click", onUpdate);
    deleteBtn.addEventListener("click", onDelete);

    return div;
}

async function onCreate(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let angler = formData.get("angler");
    let weight = formData.get("weight");
    let species = formData.get("species");
    let location = formData.get("location");
    let bait = formData.get("bait");
    let captureTime = formData.get("captureTime");
    let _ownerId = userData._id;

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        return; // TODO error
    }

    let data = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime,
        _ownerId
    }

    const option = createOption("POST", data);
    await fetch(endPoints.catches, option);
    onLoadCatch();
}

async function onUpdate(e) {
    const id = e.target.dataset.id;

    let angler = document.querySelector("input[name='angler']").value;
    let weight = document.querySelector("input[name='weight']").value;
    let species = document.querySelector("input[name='species']").value;
    let location = document.querySelector("input[name='location']").value;
    let bait = document.querySelector("input[name='bait']").value;
    let captureTime = document.querySelector("input[name='captureTime']").value;

    const data = {
        angler,
        weight,
        species,
        location,
        bait,
        captureTime
    }

    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    await fetch(endPoints.catches + "/" + id, option);
    onLoadCatch();
}

async function onDelete(e) {
    const id = e.target.dataset.id;
    const option = {
        method: "DELETE",
        headers: {
            "X-Authorization": userData.accessToken
        }
    }
    await fetch(endPoints.catches + "/" + id, option);
    onLoadCatch();
}

function createOption(method, data) {
    return {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": userData.accessToken
        },
        body: JSON.stringify(data)
    }
}