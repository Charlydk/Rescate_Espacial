# 🚀 Rescate Espacial (Juego del Ahorcado con Vanilla JS)

"Rescate Espacial" es una reinvención temática y una refactorización completa de uno de mis primeros proyectos de programación. El objetivo fue transformar un juego del ahorcado funcional pero básico en una aplicación web moderna, organizada y robusta, utilizando únicamente **JavaScript puro (Vanilla JS), HTML5 y CSS3**.

**➡️ [Juega la demo en vivo aquí](https://charlydk.github.io/Rescate_Espacial/)**

![Captura de pantalla del juego Rescate Espacial](URL_DE_TU_IMAGEN_AQUÍ)
*(Recuerda subir una captura de pantalla a tu repositorio y enlazarla aquí)*

---

## ✨ Características Principales

* **Temática Espacial Inmersiva:** Todos los recursos visuales, textos y estilos fueron rediseñados para crear una nueva experiencia.
* **Dos Modos de Juego:**
    * **Solitario:** Adivina una palabra aleatoria del sistema para salvar al astronauta.
    * **Versus Local:** Un jugador introduce una palabra secreta para que otro la adivine.
* **Diseño Totalmente Responsivo:** La interfaz se adapta perfectamente a cualquier dispositivo, desde móviles hasta ordenadores de escritorio.

---

## 🌱 El Viaje de la Refactorización

Este proyecto fue un ejercicio práctico de modernización de código:

* **Antes:** El código original estaba distribuido en múltiples archivos HTML, utilizaba variables globales para gestionar el estado y manejaba los eventos directamente en el HTML (`onclick`). puedes ver ese proyecto en este repositorio: (https://github.com/Charlydk/Juego_ahorcadito.git)

* **Después:** La aplicación fue reconstruida como una **Single Page Application (SPA)** en un único `index.html`. Se implementó un **objeto de estado (`gameState`) centralizado** para gestionar toda la lógica del juego de forma limpia y predecible. Todos los eventos se manejan ahora con `addEventListener` en un archivo `juego.js` unificado.

---

## 🛠️ Stack Tecnológico

* **HTML5**
* **CSS3** (con Flexbox para el layout y animaciones)
* **Vanilla JavaScript (ES6+)**

---

## ⚙️ Cómo Jugar Localmente

Como es un proyecto de frontend puro, no requiere instalación.
1.  Clona el repositorio.
2.  Abre el archivo `index.html` en tu navegador web.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.