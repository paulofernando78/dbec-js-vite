import cssImportsPath from "/src/css/imports.css?inline";

class Paragraph extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.build();
  }

  build() {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    this.p = document.createElement("p");
    this.shadowRoot.append(this.p);
  }

  set data(paragraph) {
    this.render(paragraph);
  }

  render(paragraph) {
    this.p.style.color = paragraph.textColor || "#000";
    this.p.innerHTML = paragraph.enText || paragraph.ptText || "";
  }
}

export default Paragraph;
