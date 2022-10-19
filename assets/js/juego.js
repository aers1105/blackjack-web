(() =>{
    'use strict'

    let deck              = [],
        puntosJugadores   = [];


    const 
        tipos                 = ['C','D','H','S'],
        especiales            = ['Q','J','K','A'],
        
        //Referencias
        btnPedir              = document.querySelector('#btnPedir'),
        btnDetener            = document.querySelector('#btnDetener'),
        btnNuevoJuego         = document.querySelector("#btnNuevo"),

        divCartasJugadores    = document.querySelectorAll('.divCartas'),        
        puntosHTML            = document.querySelectorAll('small');



    const inicializarJuego = (numJugadores = 2)=> {
        
        //deck = crearDeck();
        puntosJugadores = [0];
        for(let i = 1;i< numJugadores; i++){
            puntosJugadores.push(0);
        }
        console.log({puntosJugadores});

        divCartasJugadores.forEach(elem => elem.innerHTML='');
        puntosHTML.forEach(elem => elem.innerText=0);

        btnDetener.disabled = false;
        btnPedir.disabled   = false;
    }

    //Crea nueva baraja
    const crearDeck = () => {
        deck = [];
        for(let i= 2; i<=10;i++)
        {
            for(let tipo of tipos)
            {
                deck.push(i+tipo);
            }
        }
        for(let tipo of tipos)
        {
            for(let especial of especiales)
            {
                deck.push(especial+tipo);
            }
        }
        deck = _.shuffle(deck);
        
        return deck;
    }

    const pedirCarta = () => {
        if(deck.length===0){
            alert('No hay cartas');
            crearDeck();
            alert("Barajando.")
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? 
            (valor === 'A') ? 11:10
            : parseInt(valor);
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        setTimeout(() => {
            const [puntosMinimos,puntosComputadora] = puntosJugadores;


            if((puntosComputadora === puntosMinimos)){
                alert("Empate");
            }else if(puntosMinimos > 21){
                alert("Computadora gana");
            }else if(puntosComputadora > 21){
                alert("Jugador gana");
            }else{
                alert("Computadora gana");
            }
        }, 500);



    }


    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do{
            
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);


            crearCarta(carta, puntosJugadores.length - 1);

        }while( (puntosComputadora < puntosMinimos) && 
                (puntosMinimos <= 21 ));
        determinarGanador();
    }

    //0 = Jugador, 1 = Computadora.
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //Crear la baraja.
    //inicializarJuego();
    
    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);   

        if(puntosJugador>21){
            btnPedir.disabled = true;
            btnDetener.disabled=true;
            //Comienza a jugar la computadora
            setTimeout(() => {
                turnoComputadora(puntosJugador);
            }, 300);
            

        }else if (puntosJugador===21){
            btnPedir.disabled = true;
            btnDetener.disabled=true;
            //Comienza la computadora
            turnoComputadora(puntosJugador);
        }
    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora( puntosJugadores[0] );
    })

    btnNuevoJuego.addEventListener('click', () => {
        console.clear();
        inicializarJuego();

    })



})();