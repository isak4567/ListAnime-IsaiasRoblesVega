
let tablaCuerpo = document.querySelector(".tablaCuerpo");
let tuLista = JSON.parse(sessionStorage.getItem("TuLista"));

tablaCuerpo.innerHTML = escritorLista(tuLista);

console.log(serieLista);

function escritorLista(array) {
    let InfoPerfil = "";

    array.forEach( element => {
        InfoPerfil+= `<tr class="fila"> 
                            <td>${element.nombre}</td>
                            <td>${element.generos.slice(1).join(" - ")}</td>
                            <td>${element.transmision[1]}</td>
                            <td class="notaSerie"> espera </td>
                       </tr> `;
    })
    
    return InfoPerfil;
}