// Apenas importa para executar o UMD no bundle
import "js-dos/dist/js-dos.js";

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

    // Permite foco no canvas
    this.canvas.tabIndex = 0;
  }

  set data(gameData) {
    if (!window.Dos) {
      console.error("Dos não carregado!");
      return;
    }

    // Inicializa o emulador com o ZIP
    this.emulatorInstance = window.Dos(this.canvas, {
      wdosboxUrl: "https://v8.js-dos.com/current/wdosbox.js",
      gameUrl: gameData.gameSrc // caminho do ZIP
    });
  }
}

export default GameEmulator;