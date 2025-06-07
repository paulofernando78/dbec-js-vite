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
        padding: 2px 0 2px 5px;
        color: #000;
        font-weight: bold;
      }

      h1 {
        font-size: 1.1rem
      }

      .card-description {
        padding: 2px 0 0 5px;
      }

      hr {
        margin: 10px
      }

      wc-icon-item.last {
        display: block;
        margin-bottom: 5px
      }
    `;
    this.shadowRoot.appendChild(css);
  }

  set data(card) {
    this.render(card);
  }

  render(card) {
    const bgColor = bookBgColors[card.bgColor];

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <div class="card-container">
        <h1 class="card-header" style="background-color: ${bgColor}">${
      card.headerText
    }</h1>
        ${card.descriptions
          .map(
            (description) => `
          <p class="card-description">
            ${description.descriptionText}
          </p>
        `
          )
          .join("")}
        
        
        ${
          card.links && Array.isArray(card.links)
            ? `<hr/> ${card.links
                .map(
                  (link, index, array) => `
              <wc-icon-item
                svg='${svgIcons[link.svg]}'
                link="${link.link}"
                label="${link.label}"
                class="${index === array.length - 1 ? "last" : ""}"
              ></wc-icon-item>
              `
                )
                .join("")}
            `
            : ""
        }
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Card;
