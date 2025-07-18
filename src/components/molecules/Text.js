import cssImportsPath from "/src/css/imports.css?inline";

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

      .img-top wc-image,
      .img-bottom wc-image {
        justify-self: center

      }

      @media (max-width:     480px) {
        .img-top, .img-right, .img-bottom, .img-left {
          grid-template-columns: 1fr;
        }

        wc-image {
          width: 75%;
          margin: 0 auto
        }

      }
    `;

    this.container = document.createElement("div");
    // this.container.style.marginBottom = "var(--line-break)";
    this.image = document.createElement("wc-image");

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
  const hasMultiple = siblings.filter(el => el.tagName === "WC-TEXT").length > 1;

  if (hasMultiple && !isLast) {
    this.container.style.marginBottom = "var(--line-break)";
  }
}

  render(block) {
    const hasImage = block.imgSrc || block.imgAlt;

    if (hasImage) {
      this.image.data = {
        src: block.imgSrc || "",
        alt: block.imgAlt || "",
        width: block.imgWidth || "100%",
      };
    }

    const textWrapper = document.createElement("div");

    block.blocks.forEach((item) => {
      const blockElement = document.createElement("p");

      item.block.forEach((subItem) => {
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

        if (subItem.ptBoldText) {
          const ptBoldText = document.createElement("b");
          ptBoldText.textContent = subItem.ptBoldText;
          ptBoldText.style.color = "var(--gray-4)";
          blockElement.appendChild(ptBoldText);
        }

        if (subItem.ptText) {
          const ptText = document.createElement("span");
          ptText.textContent = subItem.ptText;
          ptText.style.color = "var(--gray-4)";
          blockElement.appendChild(ptText);
        }

        if (subItem.markedText) {
          const mark = document.createElement("mark");
          mark.textContent = subItem.markedText;
          blockElement.appendChild(mark);
        }
      });

      if (item.lineBreak) {
        blockElement.style.marginBottom = "var(--line-break"
      }

      textWrapper.appendChild(blockElement);
    });

    const position = block.imgPosition || "top";
    const validPositions = ["top", "right", "bottom", "left"];
    const validPosition = validPositions.includes(position) ? position : "top";
    this.container.className = hasImage ? `img-${validPosition}` : "";

    if (block.imgPosition === "right") {
      this.container.appendChild(textWrapper);
      this.container.appendChild(this.image);
    } else if (block.imgPosition === "bottom") {
      this.container.appendChild(textWrapper);
      this.container.appendChild(this.image);
    } else if (block.imgPosition === "left") {
      this.container.appendChild(this.image);
      this.container.appendChild(textWrapper);
    } else {
      this.container.appendChild(this.image);
      this.container.appendChild(textWrapper);
    }

    if (block.card) {
      this.container.style.border = "var(--border)";
      this.container.style.borderRadius = "var(--border-radius)";
      this.container.style.boxShadow = "var(--box-shadow)";
      this.container.style.padding = "var(--padding)"
    }
  }
}

export default Text;
