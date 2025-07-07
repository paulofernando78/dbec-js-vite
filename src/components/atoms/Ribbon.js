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
        border: var(--border);
        border-radius: 5px;
        font-weight: bold;
      }

    `;
    this.shadowRoot.appendChild(css);
  }

  set data(ribbon) {
    const container = document.createElement("div");
    container.style.padding = "2px 6px 2px 6px"

    this.shadowRoot.append(container);

    container.style.backgroundColor = ribbon.bgColor || "#000";
    container.style.color = ribbon.color || "#fff";

    const wcIconItem = document.createElement("wc-icon-item")
    wcIconItem.data = {
      icon: ribbon.icon,
      label: ribbon.label,
      subIcon: ribbon.subIcon,
      subLabel: ribbon.subLabel
    }
    container.appendChild(wcIconItem);

    // if (ribbon.icon && svgIcons[ribbon.icon]) {
    //   const icon = document.createElement("span");
    //   icon.innerHTML = svgIcons[ribbon.icon];
    //   container.appendChild(icon);
    //   console.log(icon);
    // }

    // if (ribbon.label) {
    //   const label = document.createElement("span");
    //   label.textContent = ribbon.label;
    //   container.appendChild(label);
    // }

    // if (ribbon.subIcon && svgIcons[ribbon.subIcon]) {
    //   const subIcon = document.createElement("span");
    //   subIcon.innerHTML = svgIcons[ribbon.subIcon];
    //   container.appendChild(subIcon);
    // }

    // if (ribbon.subLabel) {
    //   const subLabel = document.createElement("span");
    //   subLabel.textContent = ribbon.subLabel;
    //   container.appendChild(subLabel);
    //   console.log("subLabel:", ribbon.subLabel);
    // }

    container.style.marginBottom = "var(--line-break)";
  }
}

export default Ribbon;
