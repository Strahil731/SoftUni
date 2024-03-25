export function showEventPage() {
    document.querySelectorAll("section").forEach(section => section.style.display = "none");
    document.querySelector("h2").style.display = "none";
    document.querySelector("h4").style.display = "none";
    document.getElementById("dashboard").style.display = "flex";
  }