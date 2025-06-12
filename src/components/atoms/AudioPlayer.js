import cssImportsPath from "/src/css/imports.css?inline";

class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })
    this.build();
  }b

  build() {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    this.audioPlayer = document.createElement("audio");
    this.shadowRoot.append(this.audioPlayer);
  }

  set data(audioPlayer) {
    this.render(audioPlayer);
  }

  render(audioPlayer) {
    this.p.innerHTML = audioPlayer.ptText;
  }
}

export default AudioPlayer;
