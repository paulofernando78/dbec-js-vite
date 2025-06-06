import cssImportsPath from "/src/css/imports.css?inline";
class IconItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.build();
  }

  build() {
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
    this.shadowRoot.appendChild(css);

    const svg = this.getAttribute("svg");
    const link = this.getAttribute("link") || "";
    const label = this.getAttribute("label") || "";

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
    <div class="alignment">
      <span class="icon"></span>
      <a href="${link}">${label}</a>
    </div>
  `;

    const clone = template.content.cloneNode(true);
    clone.querySelector("span.icon").innerHTML = svg;

    this.shadowRoot.appendChild(clone);
  }
}

export default IconItem;
