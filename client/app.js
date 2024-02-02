// some extras!

const logo = document.getElementById("logoBox")
const meaning = document.getElementById("meaning");

logo.addEventListener("mouseover", function () {
  meaning.textContent = 'in Esperanto means "To speak"';
  meaning.style.display = "block";
});

logo.addEventListener("mouseout", function () {
  meaning.style.display = "none";
});
