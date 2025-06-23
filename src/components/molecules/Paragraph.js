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

    paragraph.enText.forEach((item) => {
      if (item.breakLine) {
        const breakLine = document.createElement("div");
        breakLine.style.marginBottom = "var(--break-line)";
        textWrapper.appendChild(breakLine);
      } else if (item.text || item.boldText || item.phonetics) {
        const enP = document.createElement("p");
        enP.style.display = "inline";

        if (item.text) {
          const text = document.createTextNode(item.text);
          enP.appendChild(text);
        }

        if (item.boldText) {
          const bold = document.createElement("b");
          bold.textContent = item.boldText;
          enP.appendChild(bold);
        }

        if (item.phonetics) {
          const phonetics = document.createElement("span");
          phonetics.textContent = item.phonetics;
          phonetics.classList.add("phonetics");
          enP.appendChild(phonetics);
        }

        textWrapper.appendChild(enP);
      }
    });

    if (paragraph.breakLine) {
      const breakLine = document.createElement("div");
      breakLine.style.marginBottom = "var(--break-line)";
      textWrapper.appendChild(breakLine);
    }

    if (paragraph.ptText) {
      paragraph.ptText.forEach((item) => {
        if (item.breakLine) {
          const breakLine = document.createElement("div");
          breakLine.style.marginBottom = "var(--break-line)";
          textWrapper.appendChild(breakLine);
        } else if (item.text) {
          const ptP = document.createElement("p");
          ptP.innerHTML = item.text;
          ptP.style.color = "var(--gray-4)";
          textWrapper.appendChild(ptP);
        }
      });
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
