// Estado de la APP
let moveCat = false;
let pixelsMove = 10;
let volume = 0.5 // [0...1]
let walkForwards = true;

// Gestionar localStorage y sobreescribir las variables de estado que queramos
if (localStorage.pixelsMove) {
    pixelsMove = JSON.parse(localStorage.pixelsMove);
    document.forms["catConf"].elements["velocidad"].value = pixelsMove;
}


// Variables globales
const img = document.querySelector('img');
img.style.left = '0px';

// Música!
const audio = new Audio('./lambada.mp3');
audio.volume = volume;

if (localStorage.moveCat) {
    // JSON.parse va a convertir un string a un tipo de datos que entienda JavaScript; no solamente 'stirngs'
    moveCat = JSON.parse(localStorage.moveCat);
    audio.play();
}

if (localStorage.volume) {
    volume = JSON.parse(localStorage.volume);
    document.forms["catConf"].elements["volumen"].value = volume;
}

// escuchar evento submit de formulario
document.querySelector("form").addEventListener("submit", procesarValoresFormulario);

// evento click al botón Bailar!
// Ejercicio 1

// 1. Asociar el evento "click" al botón "Bailar"
// 2. Actualizar la variable de estado 'moveCat' a true
// 3. Ejecutar el método .play del objeto 'audio'


document.querySelector("#bailar").addEventListener("click", function () {
    moveCat = true;
    audio.play();

    // Actualizar el localStorage para indicar que la próxima vez que carguemos la App el gato debería moverse
    localStorage.moveCat = true;
});



// evento click al botón Parar!
// Ejercicio 1

// 1. Asociar el evento "click" al botón "Parar"
// 2. Actualizar la variable de estado 'moveCat' a false
// 3. Ejecutar el método .pause del objeto 'audio'

document.querySelector("#parar").addEventListener("click", function () {
    moveCat = false;
    audio.pause();
    // eliminar la key "moveCat"
    localStorage.removeItem("moveCat");
});




function catWalk() {

    let currentLeft = parseInt(img.style.left);

    if (walkForwards && (currentLeft > (window.innerWidth - img.width))) {
        walkForwards = false;
        img.style.transform = "rotateY(180deg)";
    }
    if (!walkForwards && (currentLeft <= 0)) {
        walkForwards = true;
        img.style.transform = "";

    }

    // Ejercicio 4

    if (walkForwards) {
        img.style.left = (currentLeft + pixelsMove) + 'px';
    } else {
        img.style.left = (currentLeft - pixelsMove) + 'px';
    }
}


function procesarValoresFormulario(event) {

    // no 'recargues' la página
    event.preventDefault();

    // acceder al input que tiene el name="velocidad"
    const velocidad = document.forms["catConf"].elements["velocidad"].value;
    console.log("nueva velocidad", velocidad);

    pixelsMove = parseInt(velocidad);

    localStorage.pixelsMove = pixelsMove;

    volume = document.forms["catConf"].elements["volumen"].value;
    console.log("nuevo volumen", volume);
    audio.volume = volume;
    localStorage.volume = volume;

}

// Ejecuta esta función cada 50 ms

setInterval(function () {
    // Ejercicio 1: Comprobar una variable de estado aquí y hacer un return inmediatamente sería una buena opción; si dicha variable nos dice que el gato no debe moverse.

    if (!moveCat) {
        return;
    }

    catWalk();
}, 50);