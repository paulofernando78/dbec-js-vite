import cssImportsPath from "/src/css/imports.css?inline";

class FliCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      
    `;
    this.shadowRoot.appendChild(css);
  }
}

export default FliCard;