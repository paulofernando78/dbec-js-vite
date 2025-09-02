import cssImportsPath from "/src/css/imports.css?inline";
import { play, stop } from "/src/assets/images/svg-imports.js";

class Audio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      .play-icon {
        display: inline-block;
        cursor: pointer;
        position: relative;
        bottom: 1px;
        right: 2px
      }
    `;
    this.shadowRoot.appendChild(css);
  }

  set data({ audioSrc }) {
    const playIcon = document.createElement("span");
    playIcon.innerHTML = play;
    playIcon.classList.add("play-icon");

    const audio = new window.Audio(audioSrc);

    playIcon.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playIcon.innerHTML = stop;
      } else {
        audio.pause();
        playIcon.innerHTML = play;
      }
    });

    audio.addEventListener("ended", () => {
      playIcon.innerHTML = play;
    });

    this.shadowRoot.appendChild(playIcon);
  }
}

export default Audio;
