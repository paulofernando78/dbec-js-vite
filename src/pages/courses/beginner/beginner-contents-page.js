import cssImportsPath from "/src/css/imports.css?inline";

class BeginnerContentsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    this.style.textContent = `

    `;

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <p>Beginner contents</p>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default BeginnerContentsPage;
