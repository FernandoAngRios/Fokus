const html = document.querySelector('html');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo  = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const enfoqueMusica = document.getElementById('alternar-musica');
const botonIniciarPausar = document.getElementById('start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const imgIniciarPausar = document.querySelector('#start-pause img');
const tiempoPantalla = document.getElementById('timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const playSonido = new Audio('./sonidos/play.wav');
const pausaSonido = new Audio('./sonidos/pause.mp3');
const finalSonido = new Audio('./sonidos/beep.mp3');


let tiempoTranscurrido = 1500;
let idIntervalo = null;

musica.loop = true;

enfoqueMusica.addEventListener('change', ()=> {
    if (musica.paused){
        musica.play();      
    }else{
        musica.pause();
    }
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurrido = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
});
botonCorto.addEventListener('click', () => {
    tiempoTranscurrido = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
});
botonLargo.addEventListener('click', () => {
    tiempoTranscurrido = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
});

const cuentaRegresiva = () => {
    if (tiempoTranscurrido <= 0) {
        finalSonido.play();
        alert('Tiempo Finalizo');
        reiniciar();
        return;     
    }
    imgIniciarPausar.setAttribute('src','./imagenes/pause.png');
    textoIniciarPausar.textContent = "Pausar";
    tiempoTranscurrido -=1;
    console.log(tiempoTranscurrido);  
    mostrarTiempo();
}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if (idIntervalo) { 
        pausaSonido.play();    
        reiniciar();
        return;
    }
    playSonido.play();  
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}

function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    imgIniciarPausar.setAttribute('src','./imagenes/play_arrow.png');

    textoIniciarPausar.textContent = "Comenzar";  
}
function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurrido * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'});
    tiempoPantalla.innerHTML = `${tiempoFormateado}`;
}
mostrarTiempo();

function cambiarContexto(contexto){

    mostrarTiempo();
    
    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`./imagenes/${contexto}.png`);

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `
                Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `
                ¿Que tal tomar un respiro?<br>
                <strong class="app__title-strong">Haz una pausa corta.</strong>`
            break;
        case "descanso-largo":
            titulo.innerHTML = `
                Hora de volver a la superficie,<br>
                <strong class="app__title-strong">Haz una pausa laaaargaaaa.</strong>`
            break;
    
        default:
            break;
    }
}