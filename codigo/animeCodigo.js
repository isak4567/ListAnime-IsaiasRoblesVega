function creadorSerie(obj) {
    document.querySelector(".AnimePrincipal").style.backgroundImage = `url(../imagenes/${serieACrear[1][1]}.jpg)`;

    document.querySelector(".ladoDerecho h1").innerHTML = obj.nombre;

    document.querySelector(".imagenColorFondo img").src = `../imagenes/${serieACrear[1][1]}.jpg`;

    obj.generos.slice(1).forEach(element => {
        let li = document.createElement("li");
        li.innerHTML = element;
        document.querySelector("#GenerosLista").append(li);
    });

    let infoAnime = document.querySelectorAll(`#${serieACrear[0].replace(/\s+/g, '')}Informacion p`);

    document.querySelector(".sinopsis p").innerHTML = infoAnime[0].innerHTML;
    document.getElementById("InformacionTipo").innerHTML = obj.transmision[1];
    document.querySelector("#InformacionCaps").innerHTML = infoAnime[1].innerHTML;
    document.querySelector("#InformacionEstudio").innerHTML = infoAnime[2].innerHTML;
}

let serieACrear = JSON.parse(localStorage.getItem("SerieACrear"))
let agregarbtn = document.querySelector(".ladoIzquierdo span");
agregarbtn.className = serieACrear[0];
agregarbtn.addEventListener("click", agregarATuLista);

elegirTarget(2);

let objetoPagina = animes.find(el => el.nombre == agregarbtn.className);

creadorSerie(objetoPagina);

function creadorReview() {
    animeForm.addEventListener("submit", addReview);

    let reseña = (review.find(el => el[0] == objetoPagina.nombre));
    reseña && escritorReview(reseña[0],reseña[1]);
}

function addReview(e) {
    e.preventDefault();

    review = JSON.parse(localStorage.getItem("reviews")) || []

    console.log(review.find(el => el[0] == objetoPagina.nombre));

    if ((review.find(el => el[0] == objetoPagina.nombre)) == undefined) {
        review.push([objetoPagina.nombre, e.target.children[1].value]);
        localStorage.setItem("reviews", JSON.stringify(review));

        escritorReview(objetoPagina.nombre, e.target.children[1].value);
    }
}

function escritorReview (nombre,review){
    tuReview.innerHTML =
        `<div class="borrarReview"> 
            <h2> Tu Review </h2> 
            <i class="fa fa-times" id="${nombre.replace(/\s+/g, '')}-eliminar"></i> 
        </div>
        <p>${review}</p>`;

    document.querySelector(`#${nombre.replace(/\s+/g, '')}-eliminar`).addEventListener("click", eliminarReview);

    animeForm.classList.add("hideAnime");
}

function eliminarReview(e) {
    eliminar("reviews",3,e);

    tuReview.innerHTML = "";
    animeForm.className = "tuReview";
}

let review = JSON.parse(localStorage.getItem("reviews")) || [];
let animeForm = document.querySelector(".tuReview");
let tuReview = document.querySelector(".serieReview");

creadorReview();