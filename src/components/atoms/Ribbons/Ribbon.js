import cssImportsPath from "/src/css/imports.css?inline";

class Ribbon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css */
    css.textContent = `
      div {
        padding: 3.5px;
        border: var(--border);
        border-radius: 5px;
        font-weight: bold;
      }

    `;
    this.shadowRoot.appendChild(css);
  }

  set data(ribbon) {
    const container = document.createElement("div");
    this.shadowRoot.append(container);

    container.style.backgroundColor = ribbon.bgColor || "#000";
    container.style.color = ribbon.textColor || "#fff";

    const wcIconItem = document.createElement("wc-icon-item");
    wcIconItem.data = {
      icon: ribbon.icon,
      label: ribbon.label
    };
    container.appendChild(wcIconItem);
  }
}

export default Ribbon;
