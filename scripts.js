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

