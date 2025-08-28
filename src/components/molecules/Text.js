import cssImportsPath from "/src/css/imports.css?inline";
import { play, stop } from "/src/assets/images/svg-imports.js";
import * as icons from "/src/assets/images/svg-imports.js";

class Text extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      .img-top {
        display: grid;
        grid-template-rows: auto auto;
        gap: 10px
      }

      .img-right {
        display: grid;
        grid-template-columns: 1fr 200px;
        gap: 10px
      } 

      .img-bottom {
        display: grid;
        grid-template-rows: auto auto ;
        gap: 10px
      }

      .img-left {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 10px
      }

      .image-wrapper, .video-wrapper {
        width: 100%;
        display: flex;
        justify-self: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 6px
      }

      .video-wrapper wc-video-player {
        width: 100%
      }

      .audio-wrapper {
        margin-bottom: 10px
      }

      .play-icon {
        display: inline-block;
        cursor: pointer;
        position: relative;
        bottom: 1px;
        right: 2px
      }

      .icon {
        margin-inline: 4px;
        position: relative;
        bottom: 1.8px
      }

      @media (max-width: 480px) {
        .img-top, .img-right, .img-bottom, .img-left {
          grid-template-columns: 1fr;
        }

        wc-image {
          width: 75%;
          height: auto;
          margin: 0 auto
        }

        .video-player {
          height: 100px;
        }

      }
    `;

    this.container = document.createElement("div");
    this.shadowRoot.append(css, this.container);
  }

  set data(block) {
    this.render(block);
  }

  connectedCallback() {
    // Aguarda estar conectado no DOM
    const parent = this.parentElement;
    const siblings = Array.from(parent?.children || []);
    const isLast = siblings[siblings.length - 1] === this;
    const hasMultiple =
      siblings.filter((el) => el.tagName === "WC-TEXT").length > 1;

    if (hasMultiple && !isLast) {
      this.container.style.marginBottom = "var(--line-break)";
    }
  }

  render(block) {
    if (block.card) {
      this.container.style.border = "var(--border)";
      this.container.style.borderRadius = "var(--border-radius)";
      this.container.style.boxShadow = "var(--box-shadow)";
      this.container.style.padding = "3px 5px 2px 5px";
      if (block.cardColor)
        this.container.style.backgroundColor = block.cardColor;
    }

    const hasImage = Array.isArray(block.images) && block.images.length > 0;

    let imageWrapper;
    if (hasImage) {
      imageWrapper = document.createElement("div");
      imageWrapper.classList.add("image-wrapper");
      block.images.forEach((img) => {
        const imageElement = document.createElement("wc-image");
        imageElement.data = {
          width: img.width || "100%",
          height: img.height || "auto",
          number: img.number || "",
          src: img.src || "",
          alt: img.alt || "",
        };
        imageWrapper.appendChild(imageElement);
      });
    }

    const hasVideo =
      Array.isArray(block.videoPlayer) && block.videoPlayer.length > 0;

    let videoWrapper;
    if (hasVideo) {
      videoWrapper = document.createElement("div");
      videoWrapper.classList.add("video-wrapper");

      block.videoPlayer.forEach((video) => {
        const videoElement = document.createElement("wc-video-player");
        videoElement.data = {
          src: video.src,
        };
        videoWrapper.appendChild(videoElement);
      });
    }

    const textWrapper = document.createElement("div");

    block.blocks.forEach((item) => {
      if (item.audioPlayer) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("audio-wrapper");

        const audioPlayer = document.createElement("wc-audio-player");
        audioPlayer.data = { src: item.audioPlayer.src };

        wrapper.appendChild(audioPlayer);
        textWrapper.appendChild(wrapper);
      }

      const blockElement = document.createElement("p");

      item.block.forEach((subItem) => {
        if (subItem.textIndent) {
          blockElement.style.textIndent = "1rem";
        }

        if (subItem.doubleTextIndent) {
          blockElement.style.textIndent = "2rem";
        }

        if (subItem.audioSrc) {
          const playIcon = document.createElement("span");
          playIcon.innerHTML = play; // icon from svg-imports
          playIcon.classList.add("play-icon");

          playIcon.addEventListener("click", () => {
            if (audio.paused) {
              audio.play();
              playIcon.innerHTML = stop;
            } else {
              audio.pause();
              playIcon.innerHTML = play;
            }
          });

          const audio = new Audio(subItem.audioSrc);

          audio.addEventListener("ended", () => {
            playIcon.innerHTML = play;
          });

          if (blockElement.style.textIndent === "1rem") {
            playIcon.style.marginLeft = "-1rem";
          } else if (blockElement.style.textIndent === "2rem") {
            playIcon.style.marginLeft = "-2rem";
          }

          blockElement.appendChild(playIcon);
        }

        if (subItem.icon) {
          const span = document.createElement("span");
          span.classList.add("icon");
          span.innerHTML = icons[subItem.icon];
          blockElement.appendChild(span);
        }

        if (subItem.boldText) {
          const boldText = document.createElement("b");
          boldText.textContent = subItem.boldText;
          blockElement.appendChild(boldText);
        }

        if (subItem.phonetics) {
          const phonetics = document.createElement("span");
          phonetics.textContent = subItem.phonetics;
          phonetics.classList.add("phonetics");
          blockElement.appendChild(phonetics);
        }

        if (subItem.partOfSpeech) {
          const partOfSpeech = document.createElement("span");
          partOfSpeech.textContent = subItem.partOfSpeech;
          partOfSpeech.classList.add("part-of-speech");
          blockElement.appendChild(partOfSpeech);
        }

        if (subItem.text) {
          const text = document.createElement("span");
          text.textContent = subItem.text;
          blockElement.appendChild(text);
        }

        if (subItem.ptText) {
          const ptText = document.createElement("span");
          ptText.textContent = subItem.ptText;
          ptText.style.color = "var(--gray-4)";
          blockElement.appendChild(ptText);
        }

        if (subItem.ptBoldText) {
          const ptBoldText = document.createElement("b");
          ptBoldText.textContent = subItem.ptBoldText;
          ptBoldText.style.color = "var(--gray-4)";
          blockElement.appendChild(ptBoldText);
        }

        if (subItem.underlinedText) {
          const underline = document.createElement("u");
          underline.textContent = subItem.underlinedText;
          blockElement.appendChild(underline);
        }

        if (subItem.boldUnderlinedText) {
          const bold = document.createElement("b");
          const underline = document.createElement("u");
          underline.textContent = subItem.boldUnderlinedText;
          bold.appendChild(underline);
          blockElement.appendChild(bold);
        }

        if (subItem.italicText) {
          const italic = document.createElement("i");
          italic.textContent = subItem.italicText;
          blockElement.appendChild(italic);
        }

        if (subItem.markedText) {
          const mark = document.createElement("mark");
          mark.textContent = subItem.markedText;
          blockElement.appendChild(mark);
        }

        if (subItem.markedUnderlinedText) {
          const mark = document.createElement("mark");
          const underline = document.createElement("u");
          underline.textContent = subItem.markedUnderlinedText;
          mark.appendChild(underline);
          blockElement.appendChild(mark);
        }

        if (subItem.links) {
          subItem.links.forEach((link) => {
            const wcIconItem = document.createElement("wc-icon-item");
            wcIconItem.data = {
              icon: link.icon,
              link: link.link,
              target: link.target,
              label: link.label,
            };
            blockElement.appendChild(wcIconItem);
          });
        }
      });

      if (item.lineBreak) {
        blockElement.style.marginBottom = "var(--line-break)";
      }

      if (item.hr) {
        const hr = document.createElement("hr");
        blockElement.appendChild(hr);
      }

      textWrapper.appendChild(blockElement);
    });

    const position = hasVideo
      ? block.videoPlayer[0].position || "top"
      : hasImage
      ? block.images[0].position || "top"
      : "top";
    const validPositions = ["top", "right", "bottom", "left"];
    const validPosition = validPositions.includes(position) ? position : "top";
    this.container.className =
      hasImage || hasVideo ? `img-${validPosition}` : "";

    if (hasImage || hasVideo) {
      if (validPosition === "right") {
        this.container.appendChild(textWrapper);
        if (hasImage) this.container.appendChild(imageWrapper);
        if (hasVideo) this.container.appendChild(videoWrapper);
      } else if (validPosition === "bottom") {
        this.container.appendChild(textWrapper);
        if (hasImage) this.container.appendChild(imageWrapper);
        if (hasVideo) this.container.appendChild(videoWrapper);
      } else if (validPosition === "left") {
        if (hasImage) this.container.appendChild(imageWrapper);
        if (hasVideo) this.container.appendChild(videoWrapper);
        this.container.appendChild(textWrapper);
      } else {
        if (hasImage) this.container.appendChild(imageWrapper);
        if (hasVideo) this.container.appendChild(videoWrapper);
        this.container.appendChild(textWrapper);
      }
    } else {
      if (hasVideo) this.container.appendChild(videoWrapper);
      this.container.appendChild(textWrapper);
    }
  }
}

export default Text;
