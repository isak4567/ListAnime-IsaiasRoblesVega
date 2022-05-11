/*Codigo de pagina Anime. A traves de un dato la pagina se crea personalmente
 con la informacion del obj en cueston y saca los otros datos de su html,
 ya que esos datos solo sirven en esta pagina. Despues guarda una review con el 
 nombre del dato para ser puesta cuando entres de vuelta*/

// Mete los datos del obj en html
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
// Mete el evento para dejar una review y si hay, la remplaza en html
function creadorReview() {
    animeForm.on("submit", addReview);

    let reseña = (review.find(el => el[0] == objetoPagina.nombre));
    reseña && escritorReview(reseña[0], reseña[1]);
}
// Evento submit que manda el dato de la review a guardarse y despues lo pone en html
function addReview(e) {
    e.preventDefault();

    review = JSON.parse(localStorage.getItem("reviews")) || []

    if ((review.find(el => el[0] == objetoPagina.nombre)) == undefined) {
        review.push([objetoPagina.nombre, e.target.children[1].value]);
        localStorage.setItem("reviews", JSON.stringify(review));

        escritorReview(objetoPagina.nombre, e.target.children[1].value);
    }
}
// Escribe los datos de la review en html y oculta el lugar donde poner review
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
// Elimina la review y el ocultamiento de donde escribirla
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

llamarDatos();