let num = 0;
const elegirTarget = number => num = number;

// Guarda cada serie en sessionStorage para ser usado en TuLista y muestra un cartel de agregado
function agregarATuLista(e) {
    let seriesLista = JSON.parse(sessionStorage.getItem("serieLista")) || [];

    let busqueda = (num == 1)? e.target.innerHTML : e.target.className;

    if ((seriesLista.find(el => el.nombre == busqueda)) == undefined) {
        let cartelAgregarSerie = document.querySelector(".cartelAgregarSerie");

        cartelAgregarSerie.outerHTML = `<div class="cartelAgregarSerie activo"> <p>${busqueda} a sido agruegada a tu lista </p> </div>`;

        cartelAgregarSerie.addEventListener("animationend", () => cartelAgregarSerie.className = "cartelAgregarSerie");

        seriesLista.push(animes.find(obj => obj.nombre == busqueda));
        sessionStorage.setItem("serieLista", JSON.stringify(seriesLista));
    }
}