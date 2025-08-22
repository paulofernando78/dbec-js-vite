class GameEmulator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.emulatorInstance = null;

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      div {
        border: var(--border)
      }
    `;
    this.shadowRoot.appendChild(css);

    this.container = document.createElement("div");
    this.shadowRoot.appendChild(this.container);
  }

   // Setter para receber o objeto de dados
  set data(gameData) {
    this._gameData = gameData;
    if (gameData && gameData.gameSrc) {
      this.loadJSDOS(gameData.gameSrc)
    }
  }

  // Função para inicializar o JS-DOS
  async loadJSDOS(gameSrc) {
    const script = document.createElement("script");
    script.src = "https://js-dos.com/6.22/current/js-dos.js";
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script)
    })

    this.emulatorInstance = await Dos(this.container, {
      wdosboxUrl: "https://js-dos.com/6.22/current/wdosbox.js",
      autoload: gameSrc
    })
  }
}

export default GameEmulator
