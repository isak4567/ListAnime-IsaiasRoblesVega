class Serie {
    constructor(nombre, generos, transmision, orden) {
        this.nombre = nombre;
        this.generos = generos;
        this.transmision = transmision;
    }
}

function buscaNombre(nombre) {
    const serie = animes.find(obj => obj.nombre == nombre);

    if (serie !== undefined) {
        return serie;
    }
}

function filtrarSerie(metodoBusqueda, dato) {
    let serie;

    if (metodoBusqueda == 1) {
        serie = animes.filter(obj => obj.generos.includes(dato));
    } else {
        serie = animes.filter(obj => obj.transmision.includes(dato));
    }
    return serie;
}

function Escritor(array, string) {
    let acumulador = "";

    for (let i = 0; i < array.length; i++) {
        acumulador += 
    `<div class="anime ${array[i].nombre.replace(/\s+/g, '')}${string}">
        <a class="linkAnime" href="#">
            <div class="animeContenedor">
                <div class="imagenAnime"></div>
            </div>
        </a>
        <button class="tituloAnime">${array[i].nombre}</button>
    </div>`;
    }

    return acumulador;
}

function EscritorPagina(agregarClase) {
    contenedorSerie.innerHTML = Escritor(animes, agregarClase);

    let imagenSerie = document.querySelectorAll(".imagenAnime");

    for (let i = 0; i < imagenSerie.length; i++) {
        imagenSerie[i].className += ` imagenAnime${i+1}`;
    }
}
// validarFormulario: al tocar el filtrar la pagina se crea de vuelta y esconde todos sus items que no esten buscados.
function validarFormulario(e) {
    e.preventDefault();

    let formulario = e.target;
    // el creador de pagina le ponemos que agruegue la clase hideanime a nuestras series
    EscritorPagina(" hideAnime");

    let buscarSerie = buscaNombre(formulario.children[0].children[1].value);
    // si no hay nombre que buscar, se pone ah fijarse que hay para filtrar
    if (buscarSerie === undefined) {
        let arraySeriesGenero = filtrarSerie(1, formulario.children[1].children[1].value);
        let arraySeriesTipo = filtrarSerie(2, formulario.children[2].children[1].value);
        let arraySeries = [];
        // mete las series en un nuevo array y le pone otra clase para que se muestre.
        arraySeriesGenero.forEach(element1 => {
            arraySeriesTipo.forEach(element2 => {
                if (element1.nombre === element2.nombre) {
                    arraySeries.push(element1);
                    let animeClass = document.querySelector(`.${element1.nombre.replace(/\s+/g, '')}`);
                    animeClass.className += ` displayAnime`;
                }
            });
        });

    } else {
        let animeClass = document.querySelector(`.${buscarSerie.nombre.replace(/\s+/g, '')}`);
        animeClass.className += ` displayAnime`;;
    }
}

let animes = [
    new Serie("Naruto Shippuden", ["Todos", "Accion", "Aventura", "Fantasia"], ["Todos", "Tv"]),
    new Serie("Dragon Ball Super", ["Todos", "Accion", "Aventura", "Fantasia"], ["Todos", "Tv"]),
    new Serie("Shrek 2", ["Todos", "Accion", "Comedia"], ["Todos", "Pelicula"]),
    new Serie("Boku no p", ["Todos", "Romance", "Misterio"], ["Todos", "Pelicula"]),
    new Serie("Hellsing Ultimate", ["Todos", "Accion"], ["Todos", "Ova"]),
    new Serie("Soul Eater", ["Todos", "Accion", "Aventura", "Fantasia"], ["Todos", "Tv"]),
    new Serie("Nichijou", ["Todos", "Comedia"], ["Todos", "Tv"]),
    new Serie("Gintama", ["Todos", "Comedia", "Fantasia"], ["Todos", "Tv"]),
    new Serie("Evangelion", ["Todos", "Accion", "Drama"], ["Todos", "Tv"]),
    new Serie("Kino Journey", ["Todos", "Aventura", "Fantasia"], ["Todos", "Tv"])
];

let contenedorSerie = document.querySelector(".contenedorSeries");
let formularioFiltro = document.querySelector(".formulario");

formularioFiltro.addEventListener("submit", validarFormulario);

EscritorPagina("");

let botonSerie = document.querySelectorAll(".tituloAnime");
let tablaCuerpo = document.querySelector(".tablaCuerpo");
let serieLista = [];

botonSerie.forEach(element => element.addEventListener("click", agregarLista));

function agregarLista(e) {
    if ((serieLista.find(element => element.nombre == e.target.innerHTML)) == undefined) {
        serieLista.push(buscaNombre(e.target.innerHTML));
    }
    
    tablaCuerpo.innerHTML = escritorLista(serieLista);
}

function iterador(array) {
    return array.slice(1);
}

function escritorLista(array) {
    let InfoPerfil = "";

    array.forEach( element => {
        InfoPerfil+= `<tr class="fila"> 
                            <td>${element.nombre}</td>
                            <td>${iterador(element.generos).join(" - ")}</td>
                            <td>${element.transmision[1]}</td>
                            <td class="notaSerie"> espera </td>
                       </tr> `;
    })
    console.log(InfoPerfil);
    return InfoPerfil;
}
