import cssImportsPath from "/src/css/imports.css?inline";

class Introduction extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css */
    css.textContent = `
      .container {
        padding: 3.5px;
        border: var(--border);
        border-radius: 5px;
        font-weight: bold;
      }

    `;
    this.shadowRoot.appendChild(css);

    const container = document.createElement("div");
    container.classList.add("container")
    this.shadowRoot.append(container);

    container.style.backgroundColor = "#000";
    container.style.color = "#fff";

    const wcIconItem = document.createElement("wc-icon-item");
    wcIconItem.data = {
      icon: "snippet",
      label: "Introduction"
    };
    container.appendChild(wcIconItem);
  }
}

export default Introduction;
