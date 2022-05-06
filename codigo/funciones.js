let numeroAgregar = 0;
// elegirTarget solo existe para que agregar lista pueda ser usado de mas formas
const elegirTarget = number => numeroAgregar = number;

// Guarda cada serie en sessionStorage para ser usado en TuLista y muestra un cartel de agregado
function agregarATuLista(e) {
    let seriesLista = JSON.parse(localStorage.getItem("serieLista")) || [];

    let busqueda = (numeroAgregar == 1)? e.target.innerHTML : e.target.className;

    if ((seriesLista.find(el => el.nombre == busqueda)) == undefined) {
        let cartelAgregarSerie = $(".cartelAgregarSerie");

        cartelAgregarSerie[0].outerHTML = `<div class="cartelAgregarSerie activo"> <p>${busqueda} a sido agruegada a tu lista </p> </div>`;

        cartelAgregarSerie.on("animationend", () => cartelAgregarSerie.removeClass("cartelAgregarSerie"));

        seriesLista.push(animes.find(obj => obj.nombre == busqueda));
        localStorage.setItem("serieLista", JSON.stringify(seriesLista));
    }
}
// Eliminar filtra el dato del local storage y lo guarda de vuelta
const eliminar = (itemStorage,num,e) => {  
    let array = JSON.parse(localStorage.getItem(itemStorage)) || [];

    let dato = num == 3 ? e.target.id.split("-") : "";
    
    array = (num == 1) ? array.filter(el => el.nombre !== e.target.id) 
    : ((num == 2) ? array.filter(el => !(el.includes(e.target.id.replace(/\s+/g, ''))))
    : array.filter(el => !(el[0].replace(/\s+/g, '').includes(dato[0]))));

    localStorage.setItem(itemStorage, JSON.stringify(array));
 }