function escritorLista(array) {
    let InfoPerfil = "";
    let i = 1;
    let divBtnCancelar = document.querySelector(".botonesCancelar");
    divBtnCancelar.innerHTML = "";

    array.forEach(element => {
        let nombreResumido = element.nombre.replace(/\s+/g, '');
        InfoPerfil +=
        `<tr class="fila"> 
            <td>${element.nombre}</td>
            <td>${element.generos.slice(1).join(" - ")}</td>
            <td>${element.transmision[1]}</td>
            <td class="rating-group">

                <input type="radio" name="star-${i}" id="${nombreResumido}-star1">
                <label for="${nombreResumido}-star1"><span class="fa fa-star"></span></label>

                <input type="radio" name="star-${i}" id="${nombreResumido}-star2">
                <label for="${nombreResumido}-star2"><span class="fa fa-star"></span></label>

                <input type="radio" name="star-${i}" id="${nombreResumido}-star3">
                <label for="${nombreResumido}-star3"><span class="fa fa-star"></span></label>

                <input type="radio" name="star-${i}" id="${nombreResumido}-star4">
                <label for="${nombreResumido}-star4"><span class="fa fa-star"></span></label>

                <input type="radio" name="star-${i}" id="${nombreResumido}-star5">
                <label for="${nombreResumido}-star5"><span class="fa fa-star"></span></label>

            </td>
        </tr> `;

        divBtnCancelar.innerHTML += `<i class="fa fa-times" id="${element.nombre}"></i>`;

        i++;
    })

    return InfoPerfil;
}

function creadorLista() {
    let tuLista = JSON.parse(localStorage.getItem("serieLista")) || [];

    let tablaCuerpo = document.querySelector(".tablaCuerpo");
    tablaCuerpo.innerHTML = escritorLista(tuLista)? escritorLista(tuLista) : "Lista vacia";

    let cancelarSerie = document.querySelectorAll("i");
    cancelarSerie.forEach(el => el.addEventListener("click", borrarDeLista));

    if (localStorage.getItem("notaLista") !== null) {
        let notaLista = JSON.parse(localStorage.getItem("notaLista"));

        notaLista.forEach(element => document.getElementById(element).checked = true);
    }
}

function borrarDeLista(e) {
    eliminar("serieLista",1,e);
    eliminar("notaLista",2,e);

    creadorLista();
    notaEstrellas();
}

function notaEstrellas() {
    let notaLista = JSON.parse(localStorage.getItem("notaLista")) || [];

    let inputStar = document.querySelectorAll(`input`);

    inputStar.forEach(element => {

        element.onclick = (e) => {
            notaLista.push(e.target.id);
            localStorage.setItem("notaLista", JSON.stringify(notaLista));
        };
    });
}

creadorLista();
notaEstrellas();