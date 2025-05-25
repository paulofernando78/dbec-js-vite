import cssImportsPath from "/src/css/imports.css?inline";
class IconItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css*/
    css.textContent = `
    .alignment {
      display: flex;
      gap: 8px
    }
  `;

    const svg = this.getAttribute("svg");
    const link = this.getAttribute("link") || "";
    const item = this.getAttribute("item") || "";

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
    <div class="alignment">
      <span class="icon"></span>
      <a href="${link}">${item}</a>
    </div>
  `;

    const clone = template.content.cloneNode(true);
    clone.querySelector("span.icon").innerHTML = svg;

    this.shadowRoot.appendChild(css);
    this.shadowRoot.appendChild(clone);
  }
}

export default IconItem;
