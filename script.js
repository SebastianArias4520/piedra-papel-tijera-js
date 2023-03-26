const d = document

let startCombatButton = document.getElementById('button-combat')
startCombatButton.addEventListener('click', startCombat)

let inputRestart=document.getElementById('button-restart')
inputRestart.addEventListener('click', resetGame)

//Estas variables son definidas globalmente por lo tanto pueden ser utilizadas en cualquier función
let attackPC
let attackPlayer
let result
let wins = 0,loses = 0,drafts = 0
var msgWins = d.getElementById('wins')
var msgLoses = d.getElementById('loses')
var msgDrafts = d.getElementById('drafts')

function resetGame(){
    //Reseteamos los contadores 
    wins = 0
    loses = 0
    drafts = 0
    msgWins.innerHTML = wins
    msgDrafts.innerHTML = drafts
    msgLoses.innerHTML = loses
}

function startCombat(){ 

    //Primero el jugador elige su jugada, donde devuelve un numero del 0 al 3
    electionPlayer();
    
    //Condiciona el inicio, si el numero es diferente de 0, el resto del codigo se ejecuta
    if (attackPlayer != 0) {
        electionPC();
    }

    //En JS normalmente podemos usar las funciones antes de crearlas
    //Ya que el codigo no se lee de arriba hacia abajo como en HTML

    function electionPlayer(){ 
        let inputPiedra=d.getElementById('piedra');
        let inputPapel=d.getElementById('papel');
        let inputTijera=d.getElementById('tijera');
        //Conocer cual de las tres opciones seleccionó el attackPlayer a través del método "checked"
        if (inputPiedra.checked) {
            attackPlayer=1
        } else if(inputPapel.checked) {
            attackPlayer=2
        } else if(inputTijera.checked) {
            attackPlayer=3
        } else {
            alert('Selecciona una opción')
            attackPlayer=0
        }
    }
    function electionPC() {
        //Computador nos da un numero entre 1 y 3 (Piedra,Papel,Tijera)
        attackPC= Math.floor(Math.random() * (3) + 1)
        combat();
    }
    function combat(){
        //Se utiliza un algoritmo inteligente para resumir los if 
        //Recibimos el resultado como un string
        //Aumentamos el contador de victorias/empates/derrotas
        if (attackPlayer == attackPC) {
            result = 'EMPATE'
            drafts++
            msgDrafts.innerHTML = drafts
        } else if ((attackPlayer - attackPC) == 1) {
            result = 'GANASTE'
            wins++
            msgWins.innerHTML = wins
        } else if ((attackPlayer - attackPC) == -2) {
            result = 'GANASTE'
            wins++
            msgWins.innerHTML = wins
        } else {
            result = 'PERDISTE'
            loses++
            msgLoses.innerHTML = loses
        }
        elections();
    }
    function elections() {
        //Convertimos la elección en un string para mostrarlo mas adelante en pantalla
        switch (attackPC) {
            case 1:
                attackPC='Piedra ✊'
                break;
            case 2:
                attackPC='Papel ✋'
                break;
            case 3:
                attackPC='Tijera ✌'
                break;
        }
        switch (attackPlayer) {
            case 1:
                attackPlayer='Piedra ✊'
                break;
            case 2:
                attackPlayer='Papel ✋'
                break;
            case 3:
                attackPlayer='Tijera ✌'
                break;
        }
        resultMessage();
    }
    function resultMessage(){
        d.getElementById('result-combat').innerHTML = result + '. La maquina eligió ' + attackPC + ' y tu sacaste ' + attackPlayer
    }


//IDEA DE SIDE BAR PENDIENTE
    // function listMessages(){
    //     let resultmsg = document.getElementById('results-table').insertRow(1);
    //     let col1 = resultmsg.insertCell(0);
    //     let col2 = resultmsg.insertCell(1);
    //     let col3 = resultmsg.insertCell(2);
        
    //     col1.innerHTML = attackPlayer
    //     col2.innerHTML = attackPC
    //     col3.innerHTML = result
    // }
}



