import cssImportsPath from "/src/css/imports.css?inline";

class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    /*css imports*/
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css */
    css.textContent = `
    audio {
        display: block;
        width: 100%;
        height: 40px
      }
    `;

    this.audioPlayer = document.createElement("audio");
    this.shadowRoot.append(this.audioPlayer, css);
  }

  set data(audioPlayer) {
    this.render(audioPlayer);
  }

  render(audioPlayer) {
    this.audioPlayer.controls = true;
    this.audioPlayer.src = audioPlayer || "";
  }
}

export default AudioPlayer;
