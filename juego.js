// Espera a que todo el contenido del HTML se cargue antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const pantallas = {
        bienvenida: document.getElementById('pantalla-bienvenida'),
        modos: document.getElementById('pantalla-modos'),
        versusPalabra: document.getElementById('pantalla-versus-palabra'),
        juego: document.getElementById('pantalla-juego')
    };

    const botones = {
        iniciar: document.getElementById('btn-iniciar'),
        modoSolitario: document.getElementById('btn-modo-solitario'),
        modoVersus: document.getElementById('btn-modo-versus'),
        comenzarVersus: document.getElementById('btn-comenzar-versus'),
        volverModos: document.getElementById('btn-volver-modos'),
        probarLetra: document.getElementById('btn-probar-letra'),
        // --- AÑADIMOS LOS NUEVOS BOTONES ---
        reiniciar: document.getElementById('btn-reiniciar'),
        abandonar: document.getElementById('btn-abandonar')
    };
    
    // ... (El resto de tus selectores de UI se quedan igual)
    const imagenAhorcado = document.getElementById('imagen-ahorcado');
    const palabraSecretaContenedor = document.getElementById('palabra-secreta');
    const letrasIncorrectasContenedor = document.getElementById('letras-incorrectas');
    const mensajeJuego = document.getElementById('mensaje-juego');
    const inputPalabraVersus = document.getElementById('input-palabra-versus');
    const inputLetra = document.getElementById('input-letra');


    // --- 2. ESTADO Y DATOS DEL JUEGO ---
    let gameState = {};
    const palabras = ["CASA", "PAYASO", "CAMARA", "HOMERO", "PLATO", "TECLADO", "TRISTEZA", "MONITOR"];


    // --- 3. FUNCIONES PRINCIPALES ---
    // (Todas tus funciones como mostrarPantalla, iniciarJuego, renderizarJuego, probarLetra y verificarFinDeJuego se quedan exactamente igual)

    function mostrarPantalla(idDePantalla) {
        for (let key in pantallas) {
            pantallas[key].style.display = 'none';
        }
        pantallas[idDePantalla].style.display = 'flex';
    }

    function iniciarJuego(modo, palabra) {
        gameState = {
            palabraSecreta: palabra.toUpperCase(),
            letrasCorrectas: [],
            letrasIncorrectas: [],
            intentosRestantes: 7,
            modo: modo,
            juegoTerminado: false
        };
        console.log("Juego iniciado. Palabra:", gameState.palabraSecreta);
        
        inputLetra.value = '';
        inputPalabraVersus.value = '';
        
        renderizarJuego();
        mostrarPantalla('juego');
    }

    function renderizarJuego() {
        const palabraMostrada = gameState.palabraSecreta
            .split('')
            .map(letra => gameState.letrasCorrectas.includes(letra) ? letra : '_')
            .join(' ');
        palabraSecretaContenedor.textContent = palabraMostrada;

        letrasIncorrectasContenedor.textContent = gameState.letrasIncorrectas.join(' - ');

        const numeroImagen = 7 - gameState.intentosRestantes + 1;
        imagenAhorcado.src = `img/ahorcado_${numeroImagen}.png`;
        
        mensajeJuego.textContent = '';
        
        inputLetra.disabled = gameState.juegoTerminado;
        botones.probarLetra.disabled = gameState.juegoTerminado;
    }

    function probarLetra(letra) {
        letra = letra.toUpperCase();
        
        if (gameState.juegoTerminado || !letra.match(/^[A-ZÑ]$/)) {
            return;
        }

        if (gameState.letrasCorrectas.includes(letra) || gameState.letrasIncorrectas.includes(letra)) {
            mensajeJuego.textContent = `La letra '${letra}' ya fue ingresada. ¡Intenta con otra!`;
            return;
        }

        if (gameState.palabraSecreta.includes(letra)) {
            gameState.letrasCorrectas.push(letra);
        } else {
            gameState.letrasIncorrectas.push(letra);
            gameState.intentosRestantes--;
        }

        renderizarJuego();
        verificarFinDeJuego();
    }
    
    function verificarFinDeJuego() {
        const palabraAdivinada = gameState.palabraSecreta
            .split('')
            .every(letra => gameState.letrasCorrectas.includes(letra));

        if (palabraAdivinada) {
            mensajeJuego.textContent = "¡GANASTE! ¡Felicidades!";
            gameState.juegoTerminado = true;
            imagenAhorcado.src = 'img/ahorcadito_0.png';
        }

        if (gameState.intentosRestantes <= 0) {
            mensajeJuego.textContent = `GAME OVER. La palabra era: ${gameState.palabraSecreta}`;
            gameState.juegoTerminado = true;
        }
        
        if (gameState.juegoTerminado) {
            renderizarJuego();
        }
    }


    // --- 4. EVENT LISTENERS ---

    botones.iniciar.addEventListener('click', () => mostrarPantalla('modos'));
    botones.volverModos.addEventListener('click', () => mostrarPantalla('modos'));

    botones.modoSolitario.addEventListener('click', () => {
        const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
        iniciarJuego('solitario', palabraAleatoria);
    });

    botones.modoVersus.addEventListener('click', () => {
        inputPalabraVersus.value = '';
        mostrarPantalla('versusPalabra');
    });

    botones.comenzarVersus.addEventListener('click', () => {
        const palabra = inputPalabraVersus.value.trim();
        if (palabra.length < 4 || palabra.length > 8 || !palabra.match(/^[A-ZÑ]+$/i)) {
            alert("Por favor, ingresa una palabra de 4 a 8 letras, sin números ni símbolos.");
            return;
        }
        iniciarJuego('versus', palabra);
    });
    
    botones.probarLetra.addEventListener('click', () => {
        const letra = inputLetra.value;
        probarLetra(letra);
        inputLetra.value = '';
        inputLetra.focus();
    });
    
    inputLetra.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            botones.probarLetra.click();
        }
    });

    // --- NUEVOS EVENTOS PARA REINICIAR Y ABANDONAR ---

    botones.abandonar.addEventListener('click', () => {
        // Simplemente vuelve a la pantalla de bienvenida, reseteando el flujo.
        mostrarPantalla('bienvenida');
    });

    botones.reiniciar.addEventListener('click', () => {
        // La acción de reiniciar depende del modo de juego actual.
        if (gameState.modo === 'solitario') {
            // Si es solitario, simplemente iniciamos otro juego con una palabra nueva.
            botones.modoSolitario.click();
        } else if (gameState.modo === 'versus') {
            // Si es versus, volvemos a la pantalla para que el Jugador 1 ingrese una nueva palabra.
            mostrarPantalla('versusPalabra');
        }
    });


    // --- INICIO DE LA APLICACIÓN ---
    mostrarPantalla('bienvenida');
});