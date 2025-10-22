// Apenas importa para executar o UMD no bundle
class GameEmulator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.emulatorInstance = null;

    // Canvas para o jogo
    this.canvas = document.createElement("canvas");
    this.shadowRoot.appendChild(this.canvas);

    // Estilo do canvas
    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 400px;
      }
      canvas {
        width: 100%;
        height: 100%;
        border: 1px solid #000;
        border-radius: var(--border-radius);
        display: block;
      }
    `;
    this.shadowRoot.appendChild(css);
  }

  set data(gameData) {}
}

export default GameEmulator;
