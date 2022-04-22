class Serie {
    constructor(nombre, generos, transmision) {
        this.nombre = nombre;
        this.generos = generos;
        this.transmision = transmision;
    }
}

function buscaNombre(nombre) {

    if (nombre.length > 1) {
        const serie = animes.find(obj => obj.nombre.toLowerCase().includes(nombre.toLowerCase()));

        if (serie !== undefined) {
            return serie;
        }
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
    let contenedorSerie = document.querySelector(".contenedorSeries");
    contenedorSerie.innerHTML = Escritor(animes, agregarClase);

    let botonSerie = document.querySelectorAll(".tituloAnime");
    botonSerie.forEach(element => element.addEventListener("click", agregarATuLista));

    let imagenSerie = document.querySelectorAll(".imagenAnime");
    for (let i = 0; i < imagenSerie.length; i++) {
        imagenSerie[i].className += ` imagenAnime${i+1}`;
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

let formularioFiltro = document.querySelector(".formulario");
formularioFiltro.addEventListener("submit", validarFormulario);

// validarFormulario: al tocar el filtrar la pagina se crea de vuelta y esconde todos sus items que no esten buscados.
function validarFormulario(e) {
    e.preventDefault();

    let formulario = e.target;
    // el creador de pagina le ponemos que agruegue la clase hideanime a nuestras series
    EscritorPagina(" hideAnime");

    let buscarSerie = buscaNombre(formulario.children[0].children[1].value);
    // si no hay nombre que buscar, se pone a fijarse que hay para filtrar
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

let seriesLista = JSON.parse(sessionStorage.getItem("serieLista")) || [];
// Guarda cada serie en sessionStorage para ser usado en TuLista y muestra un cartel de agregado
function agregarATuLista(e) {
    if ((seriesLista.find(el => el.nombre == e.target.innerHTML)) == undefined) {
        let cartelAgregarSerie = document.querySelector(".cartelAgregarSerie");

        cartelAgregarSerie.className = "cartelAgregarSerie activo";
        cartelAgregarSerie.innerHTML = `<p>${e.target.innerHTML} a sido agruegada a tu lista </p>`;

        cartelAgregarSerie.addEventListener("animationend", () => cartelAgregarSerie.className = "cartelAgregarSerie");

        seriesLista.push(buscaNombre(e.target.innerHTML));
        sessionStorage.setItem("serieLista", JSON.stringify(seriesLista));
    }
}

EscritorPagina("");