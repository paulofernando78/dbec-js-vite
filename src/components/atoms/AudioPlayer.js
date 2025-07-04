import cssImportsPath from "/src/css/imports.css?inline";

class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(audioPlayer) {
    /*css imports*/
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;

    const css = document.createElement("style");
    /*css */
    css.textContent = `
    audio {
        display: block;
        width: 100%;
        height: 40px
      }
    `;

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = audioPlayer || "";

    audio.style.marginBottom = "var(--line-break)";

    this.shadowRoot.append(cssImports, audio, css);
  }
}

export default AudioPlayer;
