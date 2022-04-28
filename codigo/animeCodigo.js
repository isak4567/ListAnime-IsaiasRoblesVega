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