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
        reiniciar: document.getElementById('btn-reiniciar'),
        abandonar: document.getElementById('btn-abandonar')
    };
    
    const imagenAhorcado = document.getElementById('imagen-ahorcado');
    const palabraSecretaContenedor = document.getElementById('palabra-secreta');
    const letrasIncorrectasContenedor = document.getElementById('letras-incorrectas');
    const mensajeJuego = document.getElementById('mensaje-juego');
    const inputPalabraVersus = document.getElementById('input-palabra-versus');
    const inputLetra = document.getElementById('input-letra');

    // --- 2. ESTADO Y DATOS DEL JUEGO ---
    let gameState = {};
    const palabras = ["PLANETA", "GALAXIA", "COHETE", "ESTRELLA", "NEBULOSA", "ORBITA", "SATELITE", "COMETA"];

    // --- 3. FUNCIONES PRINCIPALES ---

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

        if (gameState.juegoTerminado) {
            const palabraAdivinada = gameState.palabraSecreta.split('').every(letra => gameState.letrasCorrectas.includes(letra));
            if (palabraAdivinada) {
                imagenAhorcado.src = 'img/ahorcadito_0.png';
            } else {
                imagenAhorcado.src = 'img/ahorcadito_8.png';
            }
        } else {
            const numeroImagen = 7 - gameState.intentosRestantes + 1;
            imagenAhorcado.src = `img/ahorcadito_${numeroImagen}.png`;
        }
        
        inputLetra.disabled = gameState.juegoTerminado;
        botones.probarLetra.disabled = gameState.juegoTerminado;
    }

    // --- LA FUNCIÓN QUE FALTABA ---
    function probarLetra(letra) {
        letra = letra.toUpperCase();
        
        if (gameState.juegoTerminado || !letra.match(/^[A-ZÑ]$/)) {
            return;
        }

        if (gameState.letrasCorrectas.includes(letra) || gameState.letrasIncorrectas.includes(letra)) {
            mensajeJuego.textContent = `La letra '${letra}' ya fue ingresada. ¡Intenta con otra!`;
            return;
        }

        mensajeJuego.textContent = ''; // Limpia el mensaje anterior

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
            mensajeJuego.textContent = "¡SISTEMAS RESTAURADOS! Misión Exitosa.";
            gameState.juegoTerminado = true;
        }

        if (gameState.intentosRestantes <= 0) {
            mensajeJuego.textContent = `¡OXÍGENO AGOTADO! La palabra clave era: ${gameState.palabraSecreta}`;
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

    botones.abandonar.addEventListener('click', () => {
        mostrarPantalla('bienvenida');
    });

    botones.reiniciar.addEventListener('click', () => {
        if (gameState.modo === 'solitario') {
            botones.modoSolitario.click();
        } else if (gameState.modo === 'versus') {
            mostrarPantalla('versusPalabra');
        }
    });

    // --- INICIO DE LA APLICACIÓN ---
    mostrarPantalla('bienvenida');
});