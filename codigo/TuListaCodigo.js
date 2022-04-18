
let tablaCuerpo = document.querySelector(".tablaCuerpo");
let tuLista = JSON.parse(sessionStorage.getItem("TuLista"));

tablaCuerpo.innerHTML = escritorLista(tuLista);

console.log(serieLista);

function escritorLista(array) {
    let InfoPerfil = "";
    let i = 1;

    array.forEach( element => {
        InfoPerfil+=
        `<tr class="fila"> 
            <td>${element.nombre}</td>
            <td>${element.generos.slice(1).join(" - ")}</td>
            <td>${element.transmision[1]}</td>
            <td class="rating-group-${i}">

                <input type="radio" name="star-${i}" id="star1-${i}">
                <label for="star1-${i}"><span class="fa fa-star checked"></span></label>

                <input type="radio" name="star-${i}" id="star2-${i}">
                <label for="star2-${i}"><span class="fa fa-star checked"></span></label>

                <input type="radio" name="star-${i}" id="star3-${i}">
                <label for="star3-${i}"><span class="fa fa-star checked"></span></label>

                <input type="radio" name="star-${i}" id="star4-${i}">
                <label for="star4-${i}"><span class="fa fa-star checked"></span></label>

                <input type="radio" name="star-${i}" id="star5-${i}">
                <label for="star5-${i}"><span class="fa fa-star checked"></span></label>

            </td>
        </tr> `;
        i++;
    })
    
    return InfoPerfil;
}