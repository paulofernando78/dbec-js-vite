import cssImportsPath from "/src/css/imports.css?inline";

class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })
    this.build();
  }

  build() {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);
    /*css*/
    cssImports.textContent += `
      audio {
        display: block;
        width: 100%;
        height: 40px
      }
    `

    this.audioPlayer = document.createElement("audio");
    this.shadowRoot.append(this.audioPlayer);
  }

  set data(audioPlayer) {
    this.render(audioPlayer);
  }

  render(audioPlayer) {
    this.audioPlayer.controls = true;
    this.audioPlayer.src = audioPlayer[0]?.src || "";
  }
}

export default AudioPlayer;
