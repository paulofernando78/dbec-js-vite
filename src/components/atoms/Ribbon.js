import cssImportsPath from "/src/css/imports.css?inline";

import { book, books, schedule, page, pages, songs, snippet } from "@images/svg-imports";

const svgIcons = {
  book,
  books,
  schedule,
  page,
  pages,
  songs,
  snippet
};
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

    this.div = document.createElement("div");
    this.shadowRoot.append(css, this.div);
  }

  set data(ribbon) {
    this.render(ribbon);
  }

  render(ribbon) {
    this.div.style.backgroundColor = ribbon.bgColor || "#000";
    this.div.style.color = ribbon.textColor || "#fff";

    if (ribbon.icon && svgIcons[ribbon.icon]) {
      const icon = document.createElement("span");
      icon.innerHTML = svgIcons[ribbon.icon];
      this.div.appendChild(icon);
      console.log(icon)
    }

    if (ribbon.iconLabel) {
      const iconLabel = document.createElement("span");
      iconLabel.textContent = ribbon.iconLabel;
      this.div.appendChild(iconLabel);
    }

    if (ribbon.subIcon && svgIcons[ribbon.subIcon]) {
      const subIcon = document.createElement("span");
      subIcon.innerHTML = svgIcons[ribbon.subIcon];
      this.div.appendChild(subIcon);
      console.log('subIcon:', ribbon.subIcon, svgIcons[ribbon.subIcon]);
    }


    if (ribbon.subLabel) {
      const subLabel = document.createElement("span");
      subLabel.textContent = ribbon.subLabel;
      this.div.appendChild(subLabel);
      console.log('subLabel:', ribbon.subLabel);
    }
  }
}

export default Ribbon;
