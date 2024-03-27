const editSection = document.getElementById("edit");
const editForm = document.querySelector(".edit-form");
editForm.addEventListener("submit", onEdit);

let ctx = null;
export function showEdit(context) {
    ctx = context;
    ctx.render(editSection);
}

async function onEdit(event) {
    event.preventDefault();
}