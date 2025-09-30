import cssImportsPath from "/src/css/imports.css?inline";

class Instructions extends HTMLElement {
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
        background-color: var(--red-1)
      }

      .title {
        display: block;
        font-weight: bold;
        margin-bottom: var(--margin-bottom)
      }

      .points {
        display: block;
        margin-left: 3px
      }
    `;
    this.shadowRoot.appendChild(css);
  }

  set data(instruction) {
    const container = document.createElement("div");
    container.classList.add("container");
    this.shadowRoot.append(container);

    const icon = document.createElement("wc-icon-item");
    icon.classList.add("title")
    icon.data = {
      icon: "instructions",
      label: "Instructions"
    }
    container.appendChild(icon);

    instruction.forEach((point) => {
      const points = document.createElement("span");
      points.classList.add("points");

      const bullet = document.createElement("b");
      bullet.textContent = "• ";

      const text = document.createTextNode(point.point);

      points.appendChild(bullet);
      points.appendChild(text);
      container.appendChild(points);
    });
  }
}

export default Instructions;
