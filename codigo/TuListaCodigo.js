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

                <input type="radio" name="star-${i}" id="${element.nombre.replace(/\s+/g, '')}-star1">
                <label for="${element.nombre.replace(/\s+/g, '')}-star1"><span class="fa fa-star"></span></label>

                <input type="radio" name="star-${i}" id="${element.nombre.replace(/\s+/g, '')}-star2">
                <label for="${element.nombre.replace(/\s+/g, '')}-star2"><span class="fa fa-star"></span></label>

                <input type="radio" name="star-${i}" id="${element.nombre.replace(/\s+/g, '')}-star3">
                <label for="${element.nombre.replace(/\s+/g, '')}-star3"><span class="fa fa-star"></span></label>

                <input type="radio" name="star-${i}" id="${element.nombre.replace(/\s+/g, '')}-star4">
                <label for="${element.nombre.replace(/\s+/g, '')}-star4"><span class="fa fa-star"></span></label>

                <input type="radio" name="star-${i}" id="${element.nombre.replace(/\s+/g, '')}-star5">
                <label for="${element.nombre.replace(/\s+/g, '')}-star5"><span class="fa fa-star"></span></label>

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

    if (sessionStorage.getItem("notaLista") !== null) {
        let notaLista = JSON.parse(sessionStorage.getItem("notaLista"));

        notaLista.forEach(element => document.getElementById(element).checked = true);
    }
}

function borrarDeLista(e) {
    let tuListaBorrar = JSON.parse(sessionStorage.getItem("serieLista"));
    tuListaBorrar = tuListaBorrar.filter(el => el.nombre !== e.target.id);

    sessionStorage.setItem("serieLista", JSON.stringify(tuListaBorrar));

    let notaBorrar = JSON.parse(sessionStorage.getItem("notaLista")) || [];
    notaBorrar = notaBorrar.filter(el => !(el.includes(e.target.id.replace(/\s+/g, ''))));

    sessionStorage.setItem("notaLista", JSON.stringify(notaBorrar));

    CreadorLista();
    notaEstrellas();
}

function notaEstrellas() {
    let notaLista = JSON.parse(sessionStorage.getItem("notaLista")) || [];

    let inputStar = document.querySelectorAll(`input`);

    inputStar.forEach(element => {

        element.onclick = (e) => {
            notaLista.push(e.target.id);
            sessionStorage.setItem("notaLista", JSON.stringify(notaLista));
        };
    });
}

CreadorLista();
notaEstrellas();
