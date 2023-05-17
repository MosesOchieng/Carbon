
const form = document.getElementById("myForm");
const input = document.getElementById("name-input");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  localStorage.setItem("name", input.value);
  window.location.href = "./index.html";
});
