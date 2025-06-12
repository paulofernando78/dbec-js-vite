import cssImportsPath from "/src/css/imports.css?inline";

import * as svgIcons from "@images/svg-imports";

const bookBgColors = {
  beginner: "#FBC519",
  elementary: "#EC3B3C",
  preIntermediate: "#1E8FEB",
  intermediate: "#82C122",
};

class Card extends HTMLElement {
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
      .card-container {
        border: var(--border);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        overflow: hidden;
      }

      .card-header {
        padding: var(--padding);
        color: #000;
        font-weight: bold;
      }

      h1 {
        font-size: 1rem
      }

      .inner-card {
        padding: var(--padding);

      }

      .card-description {
        text-align: justify;
      }

      hr {
        margin: 10px
      }

      
    `;
    this.shadowRoot.appendChild(css);
  }

  set data(card) {
    this.render(card);
  }

  render(card) {
    const bgColor = bookBgColors[card.bgColor] || card.bgColor || "#000";
    const textColor = card.textColor || "#fff"

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <div class="card-container">
        <h1 class="card-header" style="background-color: ${bgColor}; color: ${textColor}">${card.headerText}</h1>
        <div class="inner-card">
        ${card.descriptions && Array.isArray(card.descriptions)
          ? card.descriptions.map((description) => `
            <p class="card-description">
            ${description.descriptionText}
            </p>
          `
          ).join(""): ""}
        ${card.hr ? "<hr />" : ""}
        ${card.items && Array.isArray(card.items)
            ? `${card.items.map((item) => `
              <wc-icon-item
                svg='${item.svg ? svgIcons[item.svg] : ""}'
                link="${item.link || ""}"
                label="${item.label || ""}" 
              ></wc-icon-item>`
                ).join("")}`: ""
        }
        </div>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Card;
