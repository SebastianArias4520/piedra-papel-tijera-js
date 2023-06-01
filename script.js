//Constante que será utilizado para reducir codigo
const d = document

//Estamos llamando los elementos html como constantes porque su valor no van a variar
//Se definen todas las acciones de los botones al dar click
const electConfigureGame = d.getElementById('button-configuration')
electConfigureGame.addEventListener('click', configureGame)

const electPlayerOne = d.getElementById('button-elect-one')
electPlayerOne.addEventListener('click', firstPlayer)

const electPlayerTwo = d.getElementById('button-elect-two')
electPlayerTwo.addEventListener('click', secondPlayer)

const startCombatButton = d.getElementById('button-combat')
startCombatButton.addEventListener('click', combat)

const inputRestart = d.getElementById('button-restart')
inputRestart.addEventListener('click', resetGame)

const inputReplay = d.getElementById('button-replay')
inputReplay.addEventListener('click', nextRound)

//Seleccionamos las diferentes secciones y se configura el display para mostrar o no alguna parte 
const sectionFirstWindow = document.getElementById('first-window')
sectionFirstWindow.style.display = 'flex'
const sectionPlayOne = d.getElementById('playone')
sectionPlayOne.style.display = 'none'
const sectionPlayTwo = d.getElementById('playtwo')
sectionPlayTwo.style.display = 'none'
const sectionButtonCombat = d.getElementById('combat')
sectionButtonCombat.style.display = 'none'
const sectionConclusion = d.getElementById('conclusion')
sectionConclusion.style.display = 'none'
const sectionRestartButton = d.getElementById('restart')
sectionRestartButton.style.display = 'none'
const sectionReplayButton = d.getElementById('replay')
sectionReplayButton.style.display = 'none'


//Estas variables son definidas globalmente por lo tanto pueden ser utilizadas en cualquier función
let namePlayerOne, namePlayerTwo, rounds
let attackPlayerOne, attackPlayerTwo, nameAtackPlayerOne, nameAtackPlayerTwo, result
let winsOne = 0, drafts = 0, winsTwo = 0, currentRound = 1
var msgWinsOne = d.getElementById('wins-player-one')
var msgDrafts = d.getElementById('drafts')
var msgWinsTwo = d.getElementById('wins-player-two')
var msgCurrentRound = d.getElementById('current-round')
let elections = []
let typeOfElectionsOne, typeOfElectionsTwo
const optionsOfElectionOne = d.getElementById('elections-for-one')
const optionsOfElectionTwo = d.getElementById('elections-for-two')

//Cada una de las elecciones será un objeto de la clase Election
//Que tendra ciertos atributos característicos
class Election {
    constructor(id, text, photo) {
        this.id = id
        this.text = text
        this.photo = photo
    }
}
//Creamos un objeto para cada una de las elecciónes dando los atributos solicitados por el constructor
let piedra = new Election('piedra', 'PIEDRA', './assets/imgs/Cobblestone.png')
let papel = new Election('papel', 'PAPEL', './assets/imgs/Paper.png')
let tijera = new Election('tijera', 'TIJERA', './assets/imgs/Shears.png')

//Estos objetos los inyectamos en el array "elections"
elections.push(piedra, papel, tijera)

//Ahora a cada objeto de la clase 'elections' vamos a inyectarle codigo html
//En este caso lo inyectamos en dos lugares porque tenemos dos jugadores y cambian algunas clases (one-two)
elections.forEach((Election) => {
    typeOfElectionsOne = `
    <input type="radio" class="button-choice" id="${Election.id}-one" name="opciones-one" />
    <label for="${Election.id}-one"> <img src="${Election.photo}" alt="Imagen de ${Election.text} en Minecraft" title="${Election.text} de Minecraft">${Election.text}</label>
    `
    typeOfElectionsTwo = `
    <input type="radio" class="button-choice" id="${Election.id}-two" name="opciones-two" />
    <label for="${Election.id}-two"> <img src="${Election.photo}" alt="Imagen de ${Election.text} en Minecraft" title="${Election.text} de Minecraft">${Election.text}</label>
    `
    //Definimos unas variables con el html a introducir y las anexamos a su div correspondiente
    optionsOfElectionOne.innerHTML += typeOfElectionsOne
    optionsOfElectionTwo.innerHTML += typeOfElectionsTwo

})

function resetGame() {
    //Por el momento vamos a utilizar la funcion reload() del  elemento location del BOM pero podriamos reiniciar el juego, con el display
    location.reload()
    //Reseteamos los contadores y mostramos la sección inicial
    winsOne = 0
    winsTwo = 0
    drafts = 0
    currentRound = 1
    msgCurrentRound = currentRound
    msgWinsOne.innerHTML = winsOne
    msgDrafts.innerHTML = drafts
    msgWinsTwo.innerHTML = winsTwo
    // sectionConclusion.style.display = 'none'
    // sectionRestartButton.style.display = 'none'
    // sectionFirstWindow.style.display= 'flex'
}

function nextRound() {
    //Habilitamos o deshabilitamos las secciones a conveniencia cuando el usuario de click en 'Jugar de Nuevo'
    sectionConclusion.style.display = 'none'
    sectionReplayButton.style.display = 'none'
    sectionPlayOne.style.display = 'flex'

}

function configureGame() {
    namePlayerOne = d.getElementById('name-player-one').value;
    colorPlayerOne = d.getElementById('color-player-one').value;
    namePlayerTwo = d.getElementById('name-player-two').value;
    colorPlayerTwo = d.getElementById('color-player-two').value;
    // if (namePlayerOne != '' && namePlayerTwo != '') {
    //Configurar los nombres y colores de la sección de información despues de cada ronda
    d.getElementById('name-player-1').innerHTML = namePlayerOne;
    d.getElementById('name-player-1').style.color = colorPlayerOne
    d.getElementById('name-player-2').innerHTML = namePlayerTwo;
    d.getElementById('name-player-2').style.color = colorPlayerTwo
    //Configurar los nombres y colores de cada sección de elección con los labels
    d.getElementById('name-play-one').innerHTML = namePlayerOne;
    d.getElementById('name-play-one').style.color = colorPlayerOne
    d.getElementById('name-play-two').innerHTML = namePlayerTwo;
    d.getElementById('name-play-two').style.color = colorPlayerTwo
    //Configurar el total de rondas
    rounds = d.getElementById('number-rounds').value;
    d.getElementById('total-rounds').innerHTML = rounds;
    //Secciones a mostrar despues de configurar
    sectionFirstWindow.style.display = 'none'
    sectionPlayOne.style.display = 'flex'
    // } else {
    // alert('Debe elegir nombres para los jugadores')
    // }
}

//Necesitamos mostrar qué elección se eligió independientemente de cuantas opciones existan
function firstPlayer() {
    //CODIGO ANTERIOR
    //Debia definir cada uno de los elementos con texto literal y no estaba cumpliento con la practica de una sola fuente de verdad por eso pasamos a utilizar el array con cada eleccion

    /*  let inputPiedra = d.getElementById('piedra-one');
        let inputPapel = d.getElementById('papel-one');
        let inputTijera = d.getElementById('tijera-one');
        //Conocer cual de las tres opciones seleccionó el attackPlayer a través del método "checked"
        if (inputPiedra.checked) {
            attackPlayerOne = 1
        } else if (inputPapel.checked) {
            attackPlayerOne = 2
        } else if (inputTijera.checked) {
            attackPlayerOne = 3
        } else {
            alert('Selecciona una opción')
            attackPlayerOne = 0
        }
     */

    //No pudimos utilizar este tipo de for, porque me generaba variables 
    //momentaneas y además debiamos hallar el attackPlayerOne a través del
    //indexOf o con un nuevo atributo  mientras que en el for tradicional ya tenemos un 'i' que me puede servir.
    // elections.forEach((Election) => {
    //     let inputElectionOne = d.getElementById(Election.id+"-one")
    //     if (inputElectionOne.checked){
    //         attackPlayerOne = elections.indexOf(Election.id)+1
    //     }
    // })
    //Primero definimos el ataque en '0' para que deba elegir alguna opción
    attackPlayerOne = 0;

    //Vamos a utilizar el array con las elecciones para darle numero de ataque a cada eleccion
    for (let i = 0; i < elections.length; i++) {
        const inputElectionOne = d.getElementById(elections[i].id + '-one');
        if (inputElectionOne.checked) {
            attackPlayerOne = i + 1;
            nameAtackPlayerOne = elections[i].text;
        }
    }
    //Hacemos una validación para que el usuario deba elegir alguna opcion si quiere continuar
    if (attackPlayerOne != 0) {
        sectionPlayOne.style.display = 'none'
        sectionPlayTwo.style.display = 'flex'
    }
}

function secondPlayer() {
    //Primero definimos el ataque en '0' para que deba elegir alguna opción
    attackPlayerTwo = 0;

    //Vamos a utilizar el array con las elecciones para darle numero de ataque a cada eleccion
    for (let i = 0; i < elections.length; i++) {
        const inputElectionTwo = d.getElementById(elections[i].id + '-two');
        if (inputElectionTwo.checked) {
            attackPlayerTwo = i + 1;
            nameAtackPlayerTwo = elections[i].text;
        }
    }
    //Hacemos una validación para que el usuario deba elegir alguna opcion si quiere continuar
    if (attackPlayerTwo != 0) {
        sectionPlayTwo.style.display = 'none'
        sectionButtonCombat.style.display = 'flex'
    }
}

//En JS normalmente podemos usar las funciones antes de crearlas
//Ya que el codigo no se lee de arriba hacia abajo como en HTML

function combat() {
    //Se utiliza un algoritmo inteligente para resumir los if 
    //Recibimos el resultado como un string
    //Aumentamos el contador de jugador1/empates/jugador2
    if (attackPlayerOne == attackPlayerTwo) {
        result = '¡EMPATE!'
        drafts++
        msgDrafts.innerHTML = drafts
    } else if ((attackPlayerOne - attackPlayerTwo) == 1) {
        result = '+1 para ¡' + namePlayerOne + '!'
        winsOne++
        msgWinsOne.innerHTML = winsOne
    } else if ((attackPlayerOne - attackPlayerTwo) == -2) {
        result = '+1 para ¡' + namePlayerOne + '!'
        winsOne++
        msgWinsOne.innerHTML = winsOne
    } else {
        result = '+1 para ¡' + namePlayerTwo + '!'
        winsTwo++
        msgWinsTwo.innerHTML = winsTwo
    }
    sectionButtonCombat.style.display = 'none'
    sectionConclusion.style.display = 'flex'
    // convertElections();
    verifyWinner();
}

//Como en el for de cada player ya estamos definiendo el nombre de la elección

// function convertElections() {
//     //Como ya utilizamos los numeros para decidir quien suma punto, ahora convertimos esa elección en un string para mostrarlo mas adelante en pantalla
//     switch (attackPlayerOne) {
//         case 1:
//             attackPlayerOne = 'Piedra ✊'
//             break;
//         case 2:
//             attackPlayerOne = 'Papel ✋'
//             break;
//         case 3:
//             attackPlayerOne = 'Tijera ✌'
//             break;
//     }
//     switch (attackPlayerTwo) {
//         case 1:
//             attackPlayerTwo = 'Piedra ✊'
//             break;
//         case 2:
//             attackPlayerTwo = 'Papel ✋'
//             break;
//         case 3:
//             attackPlayerTwo = 'Tijera ✌'
//             break;
//     }
//     verifyWinner();
// }
function verifyWinner() {
    //Indicar cuando ganó una persona al comparar victorias de los jugadores y victorias elegidas
    //Devuelve un string que será mostrado más adelante
    //Habilita boton de reiniciar a través del display (Esto mismo se podria realizar con el atributo "disabled": "button.disabled = true")
    //De lo contrario muestra el boton de jugar de nuevo

    if (winsOne == rounds) {
        result = ('¡¡Felicitaciones!! Ganó ' + namePlayerOne)
        sectionRestartButton.style.display = 'flex'
    } else if (winsTwo == rounds) {
        result = ('¡¡Felicitaciones!! Ganó ' + namePlayerTwo)
        sectionRestartButton.style.display = 'flex'
    } else {
        sectionReplayButton.style.display = 'flex'
    }
    resultMessage();
}

function resultMessage() {
    //Mostrar el resultado de combate en texto
    d.getElementById('msg-combat').innerHTML = result
    d.getElementById('result-combat').innerHTML = namePlayerOne + ' eligió ' + nameAtackPlayerOne + ' y ' + namePlayerTwo + ' eligió ' + nameAtackPlayerTwo
    //Mostrar la ronda actual
    msgCurrentRound.innerHTML = currentRound
    currentRound++
}


//IDEA DE SIDE BAR PENDIENTE
// function listMessages(){
//     let resultmsg = d.getElementById('results-table').insertRow(1);
//     let col1 = resultmsg.insertCell(0);
//     let col2 = resultmsg.insertCell(1);
//     let col3 = resultmsg.insertCell(2);

//     col1.innerHTML = attackPlayer
//     col2.innerHTML = attackPC
//     col3.innerHTML = result
// }


//Detectar el movimiento del range en pagina inicio
let range = d.getElementById('number-rounds')
range.addEventListener('mousemove', function () {
    rangeValor = range.value
    d.getElementById('range-value').innerHTML = rangeValor
})
range.addEventListener('touchmove', function () {
    rangeValor = range.value
    d.getElementById('range-value').innerHTML = rangeValor
})