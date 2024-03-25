export function showHomePage() {
  document.querySelectorAll("section").forEach(section => section.style.display = "none");
  document.querySelector("h2").style.display = "none";
  document.querySelector("h4").style.display = "none";
  document.getElementById("home").style.display = "block";
}