import styleImportsPath from "/src/css/imports.css?inline";
import styleTextPath from "/src/css/components/molecules/text.css?inline";
import * as icons from "/src/assets/images/svg-imports.js";

class Text extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImportsPath, styleTextPath].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.shadowRoot.appendChild(style);
    });

    this.container = document.createElement("div");
    this.shadowRoot.append(this.container);
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
      this.container.style.padding = "3px 5px 4px 5px";
      if (block.cardColor)
        this.container.style.backgroundColor = block.cardColor;
    }

    const hasImage = Array.isArray(block.images) && block.images.length > 0;

    let imageWrapper;
    if (hasImage) {
      imageWrapper = document.createElement("div");
      imageWrapper.className = "image-wrapper";
      block.images.forEach((img) => {
        const imageElement = document.createElement("wc-image");
        imageElement.data = {
          width: img.width || "200px",
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
      videoWrapper.className = "video-wrapper";

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
        wrapper.className = "audio-wrapper";

        const audioPlayer = document.createElement("wc-audio-player");
        audioPlayer.data = { src: item.audioPlayer.src };

        wrapper.appendChild(audioPlayer);
        textWrapper.appendChild(wrapper);
      }

      const blockElement = document.createElement("p");

      item.block.forEach((subItem) => {
        // Text Indent
        if (subItem.textIndent) {
          blockElement.style.textIndent = "1rem";
        }

        // Double Text Indent
        if (subItem.doubleTextIndent) {
          blockElement.style.textIndent = "2rem";
        }

        // Audio
        if (subItem.audioSrc) {
          const playIcon = document.createElement("wc-audio");
          playIcon.data = {
            audioSrc: subItem.audioSrc,
          };

          if (blockElement.style.textIndent === "1rem") {
            playIcon.style.marginLeft = "-1rem";
          } else if (blockElement.style.textIndent === "2rem") {
            playIcon.style.marginLeft = "-2rem";
          }

          blockElement.appendChild(playIcon);
        }

        // Icon
        if (subItem.icon) {
          const span = document.createElement("span");
          span.className = "icon";
          span.innerHTML = icons[subItem.icon];
          blockElement.appendChild(span);
        }

        // Bold Text
        if (subItem.boldText) {
          const boldText = document.createElement("b");
          boldText.textContent = subItem.boldText;
          blockElement.appendChild(boldText);
        }

        // Phonetics
        if (subItem.phonetics) {
          const phonetics = document.createElement("span");
          phonetics.textContent = subItem.phonetics;
          phonetics.className = "phonetics";
          blockElement.appendChild(phonetics);
        }

        // Part of Speech
        if (subItem.partOfSpeech) {
          const partOfSpeech = document.createElement("span");
          partOfSpeech.textContent = subItem.partOfSpeech;
          partOfSpeech.className = "part-of-speech";
          blockElement.appendChild(partOfSpeech);
        }

        // Text
        if (subItem.text) {
          const text = document.createElement("span");
          text.textContent = subItem.text;
          blockElement.appendChild(text);
        }

        // Collapsible
        if (subItem.collapsible) {
          const collapsible = document.createElement("wc-collapsible");
          collapsible.data = subItem.collapsible;
          blockElement.appendChild(collapsible);
        }

        // Pt Text
        if (subItem.ptText) {
          const ptText = document.createElement("span");
          ptText.textContent = subItem.ptText;
          ptText.style.color = "var(--gray-4)";
          blockElement.appendChild(ptText);
        }

        // Pt Bold Text
        if (subItem.ptBoldText) {
          const ptBoldText = document.createElement("b");
          ptBoldText.textContent = subItem.ptBoldText;
          ptBoldText.style.color = "var(--gray-4)";
          blockElement.appendChild(ptBoldText);
        }

        // Underlined Text
        if (subItem.underlinedText) {
          const underline = document.createElement("u");
          underline.textContent = subItem.underlinedText;
          blockElement.appendChild(underline);
        }

        // Bold Underlined Text
        if (subItem.boldUnderlinedText) {
          const bold = document.createElement("b");
          const underline = document.createElement("u");
          underline.textContent = subItem.boldUnderlinedText;
          bold.appendChild(underline);
          blockElement.appendChild(bold);
        }

        // Italic Text
        if (subItem.italicText) {
          const italic = document.createElement("i");
          italic.textContent = subItem.italicText;
          blockElement.appendChild(italic);
        }

        // Marked Text
        if (subItem.markedText) {
          const mark = document.createElement("mark");
          mark.style.backgroundColor = "var(--yellow-mark)";
          mark.textContent = subItem.markedText;
          blockElement.appendChild(mark);
        }

        // Marked Underlined Text
        if (subItem.markedUnderlinedText) {
          const mark = document.createElement("mark");
          mark.style.backgroundColor = "var(--yellow-mark)";
          const underline = document.createElement("u");
          underline.textContent = subItem.markedUnderlinedText;
          mark.appendChild(underline);
          blockElement.appendChild(mark);
        }

        // Links
        if (Array.isArray(subItem.links) && subItem.links.length) {
          const ul = document.createElement("ul");

          subItem.links.forEach((link) => {
            const li = document.createElement("li");

            const wcIconItem = document.createElement("wc-icon-item");
            wcIconItem.className = "link-text"
            wcIconItem.data = {
              icon: link.icon,
              link: link.link,
              target: link.target,
              label: link.label,
            };

            li.appendChild(wcIconItem);
            ul.appendChild(li);
          });

          blockElement.appendChild(ul);
        }
      });

      // Line Break
      if (item.lineBreak) {
        blockElement.style.marginBottom = "var(--line-break)";
      }

      // Hr
      if (item.hr) {
        const hr = document.createElement("hr");
        blockElement.appendChild(hr);
      }

      textWrapper.appendChild(blockElement);
    });

    // Image & Video Positisions
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
