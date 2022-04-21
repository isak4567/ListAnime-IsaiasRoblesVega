function escritorLista(array) {
    let InfoPerfil = "";
    let i = 1;
    let divBtnCancelar = document.querySelector(".botonesCancelar");
    divBtnCancelar.innerHTML = "";

    array.forEach(element => {
        InfoPerfil +=
            `<tr class="fila"> 
            <td>${element.nombre}</td>
            <td>${element.generos.slice(1).join(" - ")}</td>
            <td>${element.transmision[1]}</td>
            <td class="rating-group">

                <input type="radio" value="${i}-1 star" class="star-group-${i}" name="star-${i}" id="star1-${i}">
                <label for="star1-${i}"><span class="fa fa-star checked"></span></label>

                <input type="radio" value="${i}-2 star" class="star-group-${i}" name="star-${i}" id="star2-${i}">
                <label for="star2-${i}"><span class="fa fa-star checked"></span></label>

                <input type="radio" value="${i}-3 star" class="star-group-${i}" name="star-${i}" id="star3-${i}">
                <label for="star3-${i}"><span class="fa fa-star checked"></span></label>

                <input type="radio" value="${i}-4 star" class="star-group-${i}" name="star-${i}" id="star4-${i}">
                <label for="star4-${i}"><span class="fa fa-star checked"></span></label>

                <input type="radio" value="${i}-5 star" class="star-group-${i}" name="star-${i}" id="star5-${i}">
                <label for="star5-${i}"><span class="fa fa-star checked"></span></label>

            </td>
        </tr> `;

        divBtnCancelar.innerHTML += `<i class="fa fa-times" id="${element.nombre}"></i>`;

        i++;
    })

    return InfoPerfil;
}

function CreadorLista() {
    let tuLista = JSON.parse(sessionStorage.getItem("serieLista"));

    let tablaCuerpo = document.querySelector(".tablaCuerpo");
    tablaCuerpo.innerHTML = escritorLista(tuLista);

    let cancelarSerie = document.querySelectorAll("i");
    cancelarSerie.forEach(el => el.addEventListener("click", borrarDeLista));
}

function borrarDeLista(e) {
    let tuListaBorrar = JSON.parse(sessionStorage.getItem("serieLista"));
    tuListaBorrar = tuListaBorrar.filter(el => el.nombre !== e.target.id);

    sessionStorage.setItem("serieLista", JSON.stringify(tuListaBorrar));

    CreadorLista();
}

CreadorLista();

let inputStar = document.querySelectorAll(`input`);
inputStar.forEach(element => {
    element.onclick = (e) => {
        sessionStorage.setItem(`${e.target.className}`,JSON.stringify(`${e.target.value}`));
    };
});


