/*Hola, bienvenido a mi pagina, ListAnime. La Pagina cumple 2 funciones. 
- Un Buscador de series para agregar a tu lista y ponerle una nota.
- Y una pagina que se crea con la informacion de la serie que queres ver donde podes dejar una review.
*/

function buscaNombre(nombre) {
    let serie = animes.filter(obj => obj.nombre.toLowerCase().includes(nombre.toLowerCase()));

    if (serie !== undefined) {
        return serie;
    }
}

function filtrarSerie(metodoBusqueda, dato) {
    let serie = (metodoBusqueda == 1) ? animes.filter(obj => obj.generos.includes(dato)) : animes.filter(obj => obj.transmision.includes(dato))

    return serie;
}

function obtenerIguales(array1, array2) {
    return array1.filter(obj1 => {
        return array2.some(obj2 => {
            return obj1.nombre === obj2.nombre;
        });
    });
}

function escritor(array, string) {
    let acumulador = "";

    for (let i = 0; i < array.length; i++) {
        acumulador +=
            `<div class="anime ${array[i].nombre.replace(/\s+/g, '')}${string}">
            <a class="linkAnime" href="./paginas/anime.html">
                <div class="animeContenedor">
                    <div class="imagenAnime">${array[i].nombre}</div>
                </div>
            </a>
            <button class="tituloAnime">${array[i].nombre}</button>
        </div>`;
    }

    return acumulador;
}

function escritorPagina(agregarClase) {
    $(".contenedorSeries").html(escritor(animes, agregarClase));

    $(".tituloAnime").click(agregarATuLista);

    let imagenSerie = $(".imagenAnime");
    imagenSerie.mousedown(linkEvento);

    for (let i = 0; i < imagenSerie.length; i++) {
        imagenSerie[i].className += ` anime${i+1}`;
    }
}

function linkEvento(e) {
    localStorage.setItem("SerieACrear", JSON.stringify([e.target.innerHTML, e.target.className.split(" ")]));
}

$(".formulario").submit(validarFormulario);

// validarFormulario: al tocar el filtrar la pagina se crea de vuelta y esconde todos sus items que no esten buscados.
function validarFormulario(e) {
    e.preventDefault();

    let formulario = e.target;
    // el creador de pagina le ponemos que agruegue la clase hideanime a nuestras series
    escritorPagina(" hideAnime");

    let arrayGenerosYTipos = obtenerIguales(filtrarSerie(1, formulario.children[1].children[1].value), filtrarSerie(2, formulario.children[2].children[1].value));

    let arraySeries = obtenerIguales(arrayGenerosYTipos, buscaNombre(formulario.children[0].children[1].value));

    arraySeries.forEach(elemento => {
        $(`.${elemento.nombre.replace(/\s+/g, '')}`).addClass(`displayAnime`);
    })
}

elegirTarget(1);
// llamo los datos.json y los guardo en una variable, despues inicio mi pagina
let animes = [];

const llamarDatos = async () => {
    try {
        let respuesta = await fetch('../Json/datos.json');
        let resultado = await respuesta.json();
        animes = resultado;
        escritorPagina("");
    } catch (error) {
        console.error(error);
    }
};

llamarDatos();
//Funcion para que la pantalla de carga no se repita
setTimeout(() => {
    if (sessionStorage.getItem("cargaPantalla")) {
        $(".pantallaCarga")[0].className = "hideAnime";
    } else {sessionStorage.setItem("cargaPantalla","true")}
},0);