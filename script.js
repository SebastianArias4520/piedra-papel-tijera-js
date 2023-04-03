//Constante que será utilizado para reducir codigo
const d = document

//Se definen todas las acciones de los botones al dar click
let electConfigureGame = d.getElementById('button-configuration')
electConfigureGame.addEventListener('click', configureGame)

let electPlayerOne = d.getElementById('button-elect-one')
electPlayerOne.addEventListener('click', firstPlayer)

let electPlayerTwo = d.getElementById('button-elect-two')
electPlayerTwo.addEventListener('click', secondPlayer)

let startCombatButton = d.getElementById('button-combat')
startCombatButton.addEventListener('click', combat)

let inputRestart=d.getElementById('button-restart')
inputRestart.addEventListener('click', resetGame)

let inputReplay = d.getElementById('button-replay')
inputReplay.addEventListener('click', nextRound)

//Seleccionamos las diferentes secciones y se configura el display para mostrar o no alguna parte 
let sectionFirstWindow = document.getElementById('first-window')
sectionFirstWindow.style.display = 'flex'
let sectionPlayOne = d.getElementById('playone')
sectionPlayOne.style.display = 'none'
let sectionPlayTwo = d.getElementById('playtwo')
sectionPlayTwo.style.display = 'none'
let sectionButtonCombat = d.getElementById('combat')
sectionButtonCombat.style.display = 'none'
let sectionConclusion = d.getElementById('conclusion')
sectionConclusion.style.display = 'none'
let sectionInformation = d.getElementById('information')
sectionInformation.style.display = 'none'
let sectionRestartButton = d.getElementById('restart')
sectionRestartButton.style.display = 'none'
let sectionReplayButton = d.getElementById('replay')
sectionReplayButton.style.display = 'none'


//Estas variables son definidas globalmente por lo tanto pueden ser utilizadas en cualquier función
let namePlayerOne, namePlayerTwo, rounds
let attackPlayerOne, attackPlayerTwo, result
let winsOne = 0,drafts = 0,winsTwo = 0, currentRound = 1
var msgWinsOne = d.getElementById('wins-player-one')
var msgDrafts = d.getElementById('drafts')
var msgWinsTwo = d.getElementById('wins-player-two')
var msgCurrentRound = d.getElementById('current-round')

function resetGame(){
    //Reseteamos los contadores y mostramos la sección inicial
    winsOne = 0
    winsTwo = 0
    drafts = 0
    currentRound = 1
    msgCurrentRound = currentRound
    msgWinsOne.innerHTML = winsOne
    msgDrafts.innerHTML = drafts
    msgWinsTwo.innerHTML = winsTwo
    sectionConclusion.style.display = 'none'
    sectionInformation.style.display = 'none'
    sectionRestartButton.style.display = 'none'
    sectionFirstWindow.style.display= 'flex'
}

function nextRound(){
    //Habilitamos o deshabilitamos las secciones a conveniencia cuando el usuario de click en 'Jugar de Nuevo'
    sectionConclusion.style.display = 'none'
    sectionInformation.style.display = 'none'
    sectionReplayButton.style.display = 'none'
    sectionPlayOne.style.display = 'flex'

}

function configureGame(){
    namePlayerOne = d.getElementById('name-player-one').value;
    colorPlayerOne = d.getElementById('color-player-one').value;
    namePlayerTwo = d.getElementById('name-player-two').value;
    colorPlayerTwo = d.getElementById('color-player-two').value;
    if (namePlayerOne != '' && namePlayerTwo != ''){
        //Configurar los nombres y colores de la sección de información despues de cada ronda
        d.getElementById('name-player-1').innerHTML= namePlayerOne;
        d.getElementById('name-player-1').style.color = colorPlayerOne
        d.getElementById('name-player-2').innerHTML= namePlayerTwo;
        d.getElementById('name-player-2').style.color = colorPlayerTwo
        //Configurar los nombres y colores de cada sección de elección con los labels
        d.getElementById('name-play-one').innerHTML= namePlayerOne;
        d.getElementById('name-play-one').style.color = colorPlayerOne
        d.getElementById('name-play-two').innerHTML= namePlayerTwo;
        d.getElementById('name-play-two').style.color = colorPlayerTwo
        //Configurar el total de rondas
        rounds = d.getElementById('number-rounds').value;
        d.getElementById('total-rounds').innerHTML= rounds;
        //Secciones a mostrar despues de configurar
        sectionFirstWindow.style.display = 'none'
        sectionPlayOne.style.display = 'flex'
    } else {
        alert('Debe elegir nombres para los jugadores')
    }
}

function firstPlayer(){
    let inputPiedra=d.getElementById('piedra-one');
    let inputPapel=d.getElementById('papel-one');
    let inputTijera=d.getElementById('tijera-one');
    //Conocer cual de las tres opciones seleccionó el attackPlayer a través del método "checked"
    if (inputPiedra.checked) {
        attackPlayerOne=1
    } else if(inputPapel.checked) {
        attackPlayerOne=2
    } else if(inputTijera.checked) {
        attackPlayerOne=3
    } else {
        alert('Selecciona una opción')
        attackPlayerOne=0
    }
    //Hacemos una validación para que el usuario deba elegir alguna opcion si quiere continuar
    if (attackPlayerOne != 0){ 
        sectionPlayOne.style.display = 'none'
        sectionPlayTwo.style.display = 'flex'
    }
}

function secondPlayer(){
    let inputPiedra=d.getElementById('piedra-two');
    let inputPapel=d.getElementById('papel-two');
    let inputTijera=d.getElementById('tijera-two');
    //Conocer cual de las tres opciones seleccionó el attackPlayer a través del método "checked"
    if (inputPiedra.checked) {
        attackPlayerTwo=1
    } else if(inputPapel.checked) {
        attackPlayerTwo=2
    } else if(inputTijera.checked) {
        attackPlayerTwo=3
    } else {
        alert('Selecciona una opción')
        attackPlayerTwo=0
    }
    //Hacemos una validación para que el usuario deba elegir alguna opcion si quiere continuar
    if (attackPlayerTwo != 0) {
        sectionPlayTwo.style.display = 'none'
        sectionButtonCombat.style.display = 'flex'
    }
}
    
    //Condiciona el inicio, si el numero es diferente de 0, el resto del codigo se ejecuta
    //En JS normalmente podemos usar las funciones antes de crearlas
    //Ya que el codigo no se lee de arriba hacia abajo como en HTML

function combat(){
    //Se utiliza un algoritmo inteligente para resumir los if 
    //Recibimos el resultado como un string
    //Aumentamos el contador de jugador1/empates/jugador2
    if (attackPlayerOne == attackPlayerTwo) {
        result = 'EMPATE'
        drafts++
        msgDrafts.innerHTML = drafts
    } else if ((attackPlayerOne - attackPlayerTwo) == 1) {
        result = '+1 para '+namePlayerOne
        winsOne++
        msgWinsOne.innerHTML = winsOne
    } else if ((attackPlayerOne - attackPlayerTwo) == -2) {
        result = '+1 para '+namePlayerOne
        winsOne++
        msgWinsOne.innerHTML = winsOne
    } else {
        result = '+1 para '+namePlayerTwo
        winsTwo++
        msgWinsTwo.innerHTML = winsTwo
    }
    elections();
    sectionButtonCombat.style.display = 'none'
    sectionConclusion.style.display = 'flex'
    sectionInformation.style.display = 'flex'
}
function elections() {
    //Convertimos la elección en un string para mostrarlo mas adelante en pantalla
    switch (attackPlayerOne) {
        case 1:
            attackPlayerOne='Piedra ✊'
            break;
        case 2:
            attackPlayerOne='Papel ✋'
            break;
        case 3:
            attackPlayerOne='Tijera ✌'
            break;
    }
    switch (attackPlayerTwo) {
        case 1:
            attackPlayerTwo='Piedra ✊'
            break;
        case 2:
            attackPlayerTwo='Papel ✋'
            break;
        case 3:
            attackPlayerTwo='Tijera ✌'
            break;
    }
    resultMessage();
    //Indicar cuando ganó una persona y habilitar boton de reiniciar
    //De lo contratio mostrar el boton de jugar de nuevo
    if (winsOne == rounds){
        alert('¡¡Felicitaciones!! Ganó '+namePlayerOne+'. Pulsa reiniciar para comenzar otra partida')
        sectionRestartButton.style.display = 'block'
    } else if (winsTwo == rounds) {
        alert('¡¡Felicitaciones!! Ganó '+namePlayerTwo+'. Pulsa reiniciar para comenzar otra partida')
        sectionRestartButton.style.display = 'flex'       
    } else {
        sectionReplayButton.style.display = 'flex'
    }
}
function resultMessage(){
    //Mostrar el resultado de combate en texto
    d.getElementById('result-combat').innerHTML = result + '. '+ namePlayerOne + ' eligió ' + attackPlayerOne + ' y ' + namePlayerTwo + ' eligió ' + attackPlayerTwo
    //Mostrar la ronda actual
    msgCurrentRound.innerHTML= currentRound
    currentRound ++
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

let range = d.getElementById('number-rounds')
range.addEventListener('mousemove', function(){
    rangeValor = range.value
    d.getElementById('range-value').innerHTML = rangeValor
})
range.addEventListener('touchmove', function(){
    rangeValor = range.value
    d.getElementById('range-value').innerHTML = rangeValor
})







