/*Codigo de pagina TuLista. 
En esta pagina podras ver las series que agregaste y ponerle una nota. */

//// Escribe los datos del array en html para la tabla y crea los botones de borrar serie
function escritorLista(array) {
    let InfoPerfil = "";
    let i = 1;
    let divBtnCancelar = document.querySelector(".botonesCancelar");
    divBtnCancelar.innerHTML = `<span class="borrarTodo fa fa-times"></span>`;

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
// Mete los datos de escritor en html y pone los eventos para el resto de la pagina
function creadorLista() {
    let tuLista = JSON.parse(localStorage.getItem("serieLista")) || [];

    $(".tablaCuerpo").html(escritorLista(tuLista) ? escritorLista(tuLista) : "Lista vacia");

    $("i").click(borrarDeLista);
    //Evento de botonBorrarTodo SwalFire, despues de borrar crea de vuelta la pagina
    $(".botonesCancelar span").click(() => {
        Swal.fire({
            title: '¿Borrar todas las series de la lista?',
            color: 'orangered',
            background: 'black',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'blue',
            cancelButtonColor: 'orangered',
            confirmButtonText: 'Borrar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("serieLista");
                localStorage.removeItem("notaLista");
                creadorLista();
                notaEstrellas();
                Swal.fire({title:'La lista fue borrada',color: 'orangered',background:'black',confirmButtonColor: 'blue'});
            }
        })
    });

    if (localStorage.getItem("notaLista") !== null) {
        let notaLista = JSON.parse(localStorage.getItem("notaLista"));
        // Si hay algo en notaLista agarra ese dato y le pone check al input del dato
        notaLista.forEach(element => document.getElementById(element).checked = true);
    }
}
// Borra la serie y la nota que puso. Despues crea de vuelta la lista con su nota
function borrarDeLista(e) {
    eliminar("serieLista", 1, e);
    eliminar("notaLista", 2, e);

    creadorLista();
    notaEstrellas();
}
// Pone el evento al input estrella de guardar el dato de su nota
function notaEstrellas() {
    let notaLista = JSON.parse(localStorage.getItem("notaLista")) || [];

    $(`input`).click((e) => {
        notaLista.push(e.target.id);
        localStorage.setItem("notaLista", JSON.stringify(notaLista));
    });
}

creadorLista();
notaEstrellas();