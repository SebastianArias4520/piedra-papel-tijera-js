let startCombatButton = document.getElementById('button-combat')
startCombatButton.addEventListener('click', startCombat)

//Estas variables son definidas globalmente por lo tanto pueden ser utilizadas en cualquier función
let attackPC
let attackPlayer

function startCombat(){

    //Primero el jugador elige su jugada, donde devuelve un numero del 0 al 3
    electionPlayer();
    
    //Si el numero es diferente de 0, osea que eligió cualquier oattackPCion se ejecuta el demás código
    if (attackPlayer != 0) {
        electionPC();
        resultInformation(attackPC,attackPlayer);
        combat(attackPC,attackPlayer)
    }



    //En JS normalmente podemos usar las funciones antes de 
    //Ya qe el codigo no se lee de arriba hacia como en HTML

    function electionPC() {
        //Computador nos da un numero entre 1 y 3 (Piedra,Papel,Tijera)
        attackPC= Math.floor(Math.random() * (3) + 1)
    }
    function electionPlayer(){
        let inputPiedra=document.getElementById('piedra');
        let inputPapel=document.getElementById('papel');
        let inputTijera=document.getElementById('tijera');
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
    function resultInformation() {
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
        document.getElementById('complete-result-fight').innerHTML = 'La maquina eligió ' + attackPC + ' y tu sacaste ' + attackPlayer 
    }
    function combat(){
        //Se utiliza un algoritmo inteligente para resumir los if
        if (attackPlayer == attackPC) {
            alert('EMPATE')
            document.getElementById('drafts').innerHTML = +1
        } else if ((attackPlayer - attackPC) == 1) {
            alert('GANASTE')
            document.getElementById('wins').innerHTML = +1
        } else if ((attackPlayer - attackPC) == -2) {
            alert('GANASTE')
            document.getElementById('wins').innerHTML = +1
        } else {
            alert('PERDISTE')
            document.getElementById('loses').innerHTML = +1
        }
        
    }

}



