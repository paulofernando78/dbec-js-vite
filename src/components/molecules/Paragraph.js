import cssImportsPath from "/src/css/imports.css?inline";

class Paragraph extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      .img-left {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 10px
      }

      .img-right {
        display: grid;
        grid-template-columns: 1fr 200px;
        gap: 10px
      } 

      .display-block {
        display: block
      }

      @media (max-width:     480px) {
        .img-left, .img-right {
          grid-template-columns: 1fr;
        }

        wc-image {
          width: 75%;
          margin: 0 auto
        }

      }
    `;

    this.container = document.createElement("div");
    this.image = document.createElement("wc-image");

    this.shadowRoot.append(css, this.container);
  }

  set data(paragraph) {
    this.render(paragraph);
  }

  render(paragraph) {
    const hasImage = paragraph.imgSrc || paragraph.imgAlt;

    if (hasImage) {
      this.image.data = {
        src: paragraph.imgSrc || "",
        alt: paragraph.imgAlt || "",
        width: paragraph.imgWidth || "100%",
      };
    }

    const textWrapper = document.createElement("div");

    paragraph.paragraph.forEach((item) => {
      const paragraphElement = document.createElement("p");

      item.line.forEach((subItem) => {
        if (subItem.boldText) {
          const boldText = document.createElement("b");
          boldText.textContent = subItem.boldText;
          paragraphElement.appendChild(boldText);
        }

        if (subItem.phonetics) {
          const phonetics = document.createElement("span");
          phonetics.textContent = subItem.phonetics;
          phonetics.classList.add("phonetics");
          paragraphElement.appendChild(phonetics);
        }

        if (subItem.partOfSpeech) {
          const partOfSpeech = document.createElement("span");
          partOfSpeech.textContent = subItem.partOfSpeech;
          partOfSpeech.classList.add("part-of-speech");
          paragraphElement.appendChild(partOfSpeech);
        }

        if (subItem.text) {
          const text = document.createElement("span");
          text.textContent = subItem.text;
          paragraphElement.appendChild(text);
        }

        if (subItem.ptBoldText) {
          const ptBoldText = document.createElement("b");
          ptBoldText.textContent = subItem.ptBoldText;
          ptBoldText.style.color = "var(--gray-4)";
          paragraphElement.appendChild(ptBoldText);
        }

        if (subItem.ptText) {
          const ptText = document.createElement("span");
          ptText.textContent = subItem.ptText;
          ptText.style.color = "var(--gray-4)";
          paragraphElement.appendChild(ptText);
        }

        if (subItem.markedText) {
          const mark = document.createElement("mark");
          mark.textContent = subItem.markedText;
          paragraphElement.appendChild(mark);
        }
      });

      textWrapper.appendChild(paragraphElement);
    });

    const position = paragraph.imgPosition || "left";
    const validPosition =
      position === "left" || position === "right" ? position : "left";
    this.container.className = hasImage ? `img-${validPosition}` : "";

    if (paragraph.imgPosition === "right") {
      this.container.appendChild(textWrapper);
      this.container.appendChild(this.image);
    } else {
      this.container.appendChild(this.image);
      this.container.appendChild(textWrapper);
    }
  }
}

export default Paragraph;
