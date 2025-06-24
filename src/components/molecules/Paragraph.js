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
      .displayBlock {
        display: block
      }
    `;

    this.container = document.createElement("div");

    this.image = document.createElement("wc-image");
    this.p = document.createElement("p");

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

    const marginLeft = ".4rem";

    paragraph.paragraph.forEach((item) => {
      if (item.breakLine) {
        const breakLine = document.createElement("div");
        breakLine.style.marginBottom = "var(--break-line)";
        textWrapper.appendChild(breakLine);
      } else if (
        item.enBoldText ||
        item.phonetics ||
        item.partOfSpeech ||
        item.enText ||
        item.ptBoldText ||
        item.ptText
      ) {
        const paragraphElement = document.createElement("p");

        if (item.enBoldText) {
          const enBoldText = document.createElement("b");
          enBoldText.textContent = item.enBoldText;
          paragraphElement.appendChild(enBoldText);
        }

        if (item.phonetics) {
          const phonetics = document.createElement("span");
          phonetics.textContent = item.phonetics;
          phonetics.classList.add("phonetics");
          phonetics.style.marginLeft = marginLeft;
          paragraphElement.appendChild(phonetics);
        }

        if (item.partOfSpeech) {
          const partOfSpeech = document.createElement("span");
          partOfSpeech.textContent = item.partOfSpeech;
          partOfSpeech.classList.add("part-of-speech");
          partOfSpeech.style.marginLeft = marginLeft;
          paragraphElement.appendChild(partOfSpeech);
        }

        if (item.enText) {
          const enText = document.createTextNode("p");
          enText.textContent = item.enText;
          paragraphElement.appendChild(enText);
        }

        if (item.ptBoldText) {
          const ptBoldText = document.createElement("b");
          ptBoldText.textContent = item.ptBoldText;
          ptBoldText.style.color = "var(--gray-4)";
          paragraphElement.appendChild(ptBoldText);
        }

        if (item.ptText) {
          const ptText = document.createElement("p");
          ptText.textContent = item.ptText;
          ptText.style.color = "var(--gray-4)";
          paragraphElement.appendChild(ptText);
        }

        textWrapper.appendChild(paragraphElement);
      }
    });

    if (paragraph.breakLine) {
      const breakLine = document.createElement("div");
      breakLine.style.marginBottom = "var(--break-line)";
      textWrapper.appendChild(breakLine);
    }

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
