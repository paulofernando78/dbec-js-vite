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

      .card-header-container {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 3px;
        height: 30px
      }

      .card-header {
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
        <div class="card-header-container" style="background-color: ${bgColor}; color: ${textColor}">
          ${card.icon ? `<p class="card-description">
            ${svgIcons[card.icon]}
          </p>` : ""}
          <h1 class="card-header">${card.headerText}</h1>
        </div>
        <div class="inner-card">
        ${card.descriptions && Array.isArray(card.descriptions)
          ? card.descriptions.map((description) => `
            <p class="card-description">
            ${description.description}
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
