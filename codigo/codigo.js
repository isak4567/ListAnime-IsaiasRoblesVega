// Arma tu propia lista de series que te gustan en tu perfil y ponele un puntaje.
/* Pasos del programa: 
1 - Agregas una serie al perfil.
2 - Le pones nota.
3 - Una ves que dejas de agregar series te muestra tu lista de animes con su nota.
*/

class Serie {
    constructor(nombre, generos, transmision, orden) {
        this.nombre = nombre;
        this.generos = generos;
        this.transmision = transmision;
        this.orden = orden;
        this.nota = 0;
    }
}

// listaDeSeries: Devuelve el array en texto ordenado.
function listaDeSeries(animes) {
    let acumulador = ``;

    animes.forEach(element => acumulador += `${element.orden} - ${element.nombre}\n`);

    return acumulador;
}

// comprobadorNumerico: Devuelve el prompt hasta que no sea NaN o numero fuera de los limites.
function comprobadorNumerico(mayorQue, textoPromt) {
    let numero = parseInt(prompt(textoPromt));

    while ((numero > mayorQue || numero < 0) || isNaN(numero)) {
        numero = parseInt(prompt(textoPromt));
    }
    return numero;
}

let tuPerfil = sessionStorage.getItem("InfoTuPerfilAnime");

if (tuPerfil == null) {
    let animes = [];

    animes.push(new Serie("Naruto", ["Accion", "Aventura", "Fantasia"], "Tv", 0));
    animes.push(new Serie("Dragon Ball Super", ["Accion", "Aventura", "Fantasia"], "Tv", 1));
    animes.push(new Serie("Shrek 2", ["Accion", "Comedia"], "Pelicula", 2));
    animes.push(new Serie("Boku no ....", ["Romance", "Misterio"], "Pelicula", 3));
    animes.push(new Serie("Hellsing Ultimate", ["Accion"], "Ova", 4));
    animes.push(new Serie("Soul Eater", ["Accion", "Aventura", "Fantasia"], "Tv", 5));
    animes.push(new Serie("Nichijou", ["Comedia"], "Tv", 6));
    animes.push(new Serie("Gintama", ["Comedia", "Fantasia"], "Tv", 7));
    animes.push(new Serie("Evangelion", ["Accion", "Drama"], "Tv", 8));
    animes.push(new Serie("Kino Journey", ["Aventura", "Fantasia"], "Tv", 9));

    alert("#### Bienvenido a ListAnime ####\n\n Esta pagina te mostrara un listado de animes, que podras meter en tu perfil y ponerle nota.");

    let perfil = [];
    let condicionBucle = "true";

    // En el while agregamos la serie y su nota, la metemos en perfil y preguntamos si hay que seguir con condicionBucle

    while (condicionBucle !== "esc" || perfil.length > 9) {

        let seriePorAgregar = comprobadorNumerico(9, `Pon el numero de la serie que quieres agregar a tu perfil.\n ${listaDeSeries(animes)}`);

        animes[seriePorAgregar].nota = comprobadorNumerico(10, `Nota de la Serie ${animes[seriePorAgregar].nombre}: `);

        perfil.push(animes[seriePorAgregar]);

        condicionBucle = prompt("Seguir agregando Series o 'ESC' para salir.").toLowerCase();
    }

    let infoPerfil = ``;
    let tbody = document.querySelector(".tablaCuerpo");

    for (let i = 0; i < perfil.length; i++) {
        let comprobadorRepeticion = 0;
        // Este for j es donde se eliminan las series repetidas.
        for (let j = 0; j < perfil.length; j++) {

            if (perfil[i].nombre === perfil[j].nombre) {
                comprobadorRepeticion++;

                if (comprobadorRepeticion > 1) {
                    perfil.splice(j, 1);
                }
            }
        }
        // Pone la informacion de perfil en formato tabla para el html
        infoPerfil += `<tr class="fila"> 
                            <td>${perfil[i].nombre}</td>
                            <td>${perfil[i].generos.join(" - ")}</td>
                            <td>${perfil[i].transmision}</td>
                            <td>${perfil[i].nota}</td>
                       </tr> `;
    }
    sessionStorage.setItem("InfoTuPerfilAnime", infoPerfil)
    tbody.innerHTML = `<br>${infoPerfil}`;
} 
else {
    tbody.innerHTML = `<br>${tuPerfil}`;
}

localStorage.clear();