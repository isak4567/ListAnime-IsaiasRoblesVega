function creadorSerie(obj) {
    $(".AnimePrincipal").css("backgroundImage", `url(../imagenes/${serieACrear[1][1]}.jpg)`);

    $(".ladoDerecho h1").html(obj.nombre);

    $(".imagenColorFondo img")[0].src = `../imagenes/${serieACrear[1][1]}.jpg`;

    obj.generos.slice(1).forEach(element => {
        let li = document.createElement("li");
        li.innerHTML = element;
        $("#GenerosLista").append(li);
    });

    let infoAnime = $(`#${serieACrear[0].replace(/\s+/g, '')}Informacion p`);

    $(".sinopsis p").html(infoAnime[0].innerHTML);
    $("#InformacionTipo").html(obj.transmision[1]);
    $("#InformacionCaps").html(infoAnime[1].innerHTML);
    $("#InformacionEstudio").html(infoAnime[2].innerHTML);
}

function creadorReview() {
    animeForm.on("submit", addReview);

    let reseña = (review.find(el => el[0] == objetoPagina.nombre));
    reseña && escritorReview(reseña[0], reseña[1]);
}

function addReview(e) {
    e.preventDefault();

    review = JSON.parse(localStorage.getItem("reviews")) || []

    if ((review.find(el => el[0] == objetoPagina.nombre)) == undefined) {
        review.push([objetoPagina.nombre, e.target.children[1].value]);
        localStorage.setItem("reviews", JSON.stringify(review));

        escritorReview(objetoPagina.nombre, e.target.children[1].value);
    }
}

function escritorReview(nombre, review) {
    tuReview.html(
        `<div class="borrarReview"> 
            <h2> Tu Review </h2> 
            <i class="fa fa-times" id="${nombre.replace(/\s+/g, '')}-eliminar"></i> 
        </div>
        <p>${review}</p>`);

    $(`#${nombre.replace(/\s+/g, '')}-eliminar`).click(eliminarReview);

    animeForm.addClass("hideAnime");
}

function eliminarReview(e) {
    eliminar("reviews", 3, e);

    tuReview.html("");
    animeForm[0].className = "tuReview";
}

let serieACrear = JSON.parse(localStorage.getItem("SerieACrear"))
let agregarbtn = $(".ladoIzquierdo span");
agregarbtn[0].className = serieACrear[0];
agregarbtn.click(agregarATuLista);

let review = JSON.parse(localStorage.getItem("reviews")) || [];
let animeForm = $(".tuReview");
let tuReview = $(".serieReview");

elegirTarget(2);

let animes = [];
let objetoPagina = 0;
// llamo los datos.json y los guardo en una variable, despues inicio mi pagina
const llamarDatos = async () => {
    try {
        let respuesta = await fetch('../Json/datos.json');
        let resultado = await respuesta.json();
        animes = resultado;
        objetoPagina = animes.find(el => el.nombre == agregarbtn[0].className);
        creadorSerie(objetoPagina);
        creadorReview();;
    } catch (error) {console.error(error);}
};

llamarDatos();