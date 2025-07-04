import cssImportsPath from "/src/css/imports.css?inline";

import {
  book,
  books,
  schedule,
  page,
  pages,
  song,
  snippet,
} from "@images/svg-imports";

const svgIcons = {
  book,
  books,
  schedule,
  page,
  pages,
  song,
  snippet,
};
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
        display: flex;
        align-items: center;
        gap: 6px;
        padding: var(--padding);
        border: var(--border);
        border-radius: 5px;
        background-color: #000;
        color: #fff;
        font-weight: bold;
      }

    `;
    this.container = document.createElement("div");
    this.shadowRoot.append(css, this.container);
  }

  set data(ribbon) {
    this.render(ribbon);
  }

  render(ribbon) {
    this.container.style.backgroundColor = ribbon.bgColor || "#000";
    this.container.style.color = ribbon.color || "#fff";

    if (ribbon.icon && svgIcons[ribbon.icon]) {
      const icon = document.createElement("span");
      icon.innerHTML = svgIcons[ribbon.icon];
      this.container.appendChild(icon);
      console.log(icon);
    }

    if (ribbon.label) {
      const label = document.createElement("span");
      label.textContent = ribbon.label;
      this.container.appendChild(label);
    }

    if (ribbon.subIcon && svgIcons[ribbon.subIcon]) {
      const subIcon = document.createElement("span");
      subIcon.innerHTML = svgIcons[ribbon.subIcon];
      this.container.appendChild(subIcon);
      console.log("subIcon:", ribbon.subIcon, svgIcons[ribbon.subIcon]);
    }

    if (ribbon.subLabel) {
      const subLabel = document.createElement("span");
      subLabel.textContent = ribbon.subLabel;
      this.container.appendChild(subLabel);
      console.log("subLabel:", ribbon.subLabel);
    }

    this.container.style.marginBottom = "var(--line-break)"
    
  }
}

export default Ribbon;
