const conciertos = [
  {
    artista: "Radiohead",
    fecha: "14 Noviembre 2018",
    lugar: "Estadio Único de La Plata",
    plataforma: "TuEntrada",
    imagen: "img/radiohead.jpg"
  }
];

const album = document.getElementById("album");

conciertos.forEach(concierto => {
  const card = document.createElement("div");
  card.classList.add("ticket-card");

  card.innerHTML = `
    <img src="${concierto.imagen}" alt="${concierto.artista}">
    <div class="ticket-info">
      <h2>${concierto.artista}</h2>
      <p>${concierto.fecha}</p>
      <p>${concierto.lugar}</p>
      <span class="platform">${concierto.plataforma}</span>
    </div>
  `;

  album.appendChild(card);
});

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
