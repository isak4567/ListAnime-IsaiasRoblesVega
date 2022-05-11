let numeroAgregar = 0;
// elegirTarget solo existe poner condiciones en las funciones
const elegirTarget = number => numeroAgregar = number;
// llamo los datos.json y los guardo en una variable, despues inicio la pagina
const llamarDatos = async () => {
    try {
        /*Si quieres que funcione el fecht sin live server o online, remplazar la linea de codigo de abajo con esta:
        let respuesta = await fetch('https://raw.githubusercontent.com/isak4567/ListAnime-IsaiasRoblesVega/master/listaAnime.json');*/
        let respuesta = numeroAgregar ==1? await fetch('./listaAnime.json', {mode: 'no-cors'}): await fetch('https://raw.githubusercontent.com/isak4567/ListAnime-IsaiasRoblesVega/master/listaAnime.json');
        let resultado = await respuesta.json();
        animes = resultado;

        if (numeroAgregar == 1) {
            creadorPagina("");
        } else {
            objetoPagina = animes.find(el => el.nombre == agregarbtn[0].className);
            creadorSerie(objetoPagina);
            creadorReview();
        }
    } catch (error) {
        console.error(error);
    }
};
// Guarda cada serie en sessionStorage para ser usado en TuLista y muestra un cartel de agregado
function agregarATuLista(e) {
    let seriesLista = JSON.parse(localStorage.getItem("serieLista")) || [];

    let busqueda = (numeroAgregar == 1) ? e.target.innerHTML : e.target.className;

    if ((seriesLista.find(el => el.nombre == busqueda)) == undefined) {
        let cartelAgregarSerie = $(".cartelAgregarSerie");

        cartelAgregarSerie[0].outerHTML = `<div class="cartelAgregarSerie activo"> <p>${busqueda} a sido agruegada a tu lista </p> </div>`;

        cartelAgregarSerie.on("animationend", () => cartelAgregarSerie.removeClass("cartelAgregarSerie"));

        seriesLista.push(animes.find(obj => obj.nombre == busqueda));
        localStorage.setItem("serieLista", JSON.stringify(seriesLista));
    }
}
// Eliminar filtra el dato del local storage y lo guarda de vuelta
const eliminar = (itemStorage, num, e) => {
    let array = JSON.parse(localStorage.getItem(itemStorage)) || [];

    let dato = num == 3 ? e.target.id.split("-") : "";

    array = (num == 1) ? array.filter(el => el.nombre !== e.target.id) :
        ((num == 2) ? array.filter(el => !(el.includes(e.target.id.replace(/\s+/g, '')))) :
            array.filter(el => !(el[0].replace(/\s+/g, '').includes(dato[0]))));

    localStorage.setItem(itemStorage, JSON.stringify(array));
}