import cssImportsPath from "/src/css/imports.css?inline";

class Ribbon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.build();
  }

  build() {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css */
    css.textContent = `
      div {
        padding: 5px 5px 5px 6px;
        border: var(--border);
        border-radius: 5px;
        background-color: #000;
        color: #fff;
        font-weight: bold;
      }
    `;

    this.div = document.createElement("div");
    this.shadowRoot.append(css, this.div);
  }

  set data(ribbon) {
    this.render(ribbon);
  }

  render(ribbon) {
    this.div.textContent = ribbon.label;
    this.div.style.backgroundColor = ribbon.bgColor || "#000";
    this.div.style.color = ribbon.textColor || "#fff";
  }
}

export default Ribbon;
