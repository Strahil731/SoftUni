const main = document.getElementById("main-element");
const errorMsg = document.getElementById("notifications");

let ctx = null;
export function showError(context, error) {
    ctx = context;
    errorMsg.innerHTML = `<div id="errorBox" class="notification">
    <span class="msg">${error.message}</span>
  </div`;
    
}
