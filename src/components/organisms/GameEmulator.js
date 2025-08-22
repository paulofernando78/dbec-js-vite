class GameEmulator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.emulatorInstance = null;

    // Canvas para js-dos
    this.canvas = document.createElement("canvas");
    this.shadowRoot.appendChild(this.canvas);

    // Estilo do canvas
    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      canvas {
        border: var(--border, 1px solid #000);
        width: 100%;
        height: 100%;
        display: block;
      }
    `;
    this.shadowRoot.appendChild(css);
  }

  // Setter para receber dados
  set data(gameData) {
    
    }
  }

// Registra o componente
export default GameEmulator;