const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".ticket-card img").forEach(img => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  });
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
  const filter = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".ticket-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();

    if (text.includes(filter)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});