// =============================
// TABS
// =============================
document.querySelectorAll(".tab-btn").forEach(btn=>{
btn.addEventListener("click",()=>{
document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
document.querySelectorAll(".tab-content").forEach(c=>c.classList.remove("active"));

btn.classList.add("active");
document.getElementById(btn.dataset.tab).classList.add("active");
});
});

// =============================
// MODAL IMAGEN
// =============================
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");

document.querySelectorAll(".ticket-card img").forEach(img=>{
img.addEventListener("click",()=>{
modal.style.display="block";
modalImg.src=img.src;
});
});

document.querySelector(".close").onclick=()=>modal.style.display="none";
window.onclick=e=>{ if(e.target===modal) modal.style.display="none"; };

// =============================
// FIREBASE
// =============================
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const eventosRef = db.ref("eventos");
const pagosRef = db.ref("pagos");

let totalNecesario=0;
let totalPagado=0;

document.addEventListener("DOMContentLoaded",()=>{

const calendar=new FullCalendar.Calendar(
document.getElementById("calendar"),
{ initialView:"dayGridMonth" }
);
calendar.render();

function actualizarUI(eventos){
const tbody=document.getElementById("eventos-table");
tbody.innerHTML="";
calendar.removeAllEvents();
totalNecesario=0;

eventos.forEach(e=>{
if(e.ir) totalNecesario+=e.precio;

const row=document.createElement("tr");
row.innerHTML=`
<td>${e.fecha}</td>
<td>${e.nombre}</td>
<td>${e.lugar}</td>
<td>$${e.precio.toFixed(2)}</td>
<td><input type="checkbox" ${e.ir?"checked":""}></td>
`;

row.querySelector("input").addEventListener("change",ev=>{
eventosRef.child(e.id).update({ir:ev.target.checked});
});

tbody.appendChild(row);

calendar.addEvent({
title:e.nombre,
start:e.fecha,
allDay:true
});
});

document.getElementById("total").textContent=totalNecesario.toFixed(2);
document.getElementById("falta").textContent=(totalNecesario-totalPagado).toFixed(2);
}

eventosRef.on("value",snap=>{
const data=snap.val()||{};
const eventos=Object.keys(data).map(id=>({id,...data[id]}));
actualizarUI(eventos);
});

document.getElementById("evento-form").addEventListener("submit",e=>{
e.preventDefault();
eventosRef.push({
nombre:nombre.value,
fecha:fecha.value,
lugar:lugar.value,
precio:parseFloat(precio.value)||0,
ir:false
});
e.target.reset();
});

pagosRef.on("value",snap=>{
const data=snap.val()||{};
totalPagado=Object.values(data).reduce((a,p)=>a+p.monto,0);
document.getElementById("pagado").textContent=totalPagado.toFixed(2);
document.getElementById("falta").textContent=(totalNecesario-totalPagado).toFixed(2);
});

document.getElementById("agregar-pago").addEventListener("click",()=>{
const input=document.getElementById("pago-input");
const monto=parseFloat(input.value);
if(!isNaN(monto)&&monto>0){
pagosRef.push({monto,fecha:new Date().toISOString()});
input.value="";
}
});

});