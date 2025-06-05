import cssImportsPath from "/src/css/imports.css?inline";

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

      .card-header {
        background-color: var(--beginner);
        padding: 2px 0 0 5px;
        color: #000;
        font-weight: bold;
      }

      .card-description {
        padding: 2px 0 0 5px;
      }

      .hr {
        margin: 5px
      }
    `;

    this.shadowRoot.appendChild(css);
  }

  set data(card) {
    this.render(card);
  }

  render(card) {
    // Card Container
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    // Card Header
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    const cardHeadertext = document.createElement("p");
    cardHeadertext.textContent = card.headerText;
    cardHeader.appendChild(cardHeadertext);
    cardContainer.appendChild(cardHeader);

    // Card Description
    const cardDescription = document.createElement("div");
    cardDescription.classList.add("card-description");
    const cardDescriptiontext = document.createElement("p");
    cardDescriptiontext.textContent = card.descriptionText;
    cardDescription.appendChild(cardDescriptiontext);
    const hr = document.createElement("hr");
    hr.classList.add("hr");
    cardDescription.appendChild(hr);
    cardContainer.appendChild(cardDescription);

    // Card Links
    const cardLink = document.createElement("wc-icon-item");
    cardLink.setAttribute("svg", card.svg);
    cardLink.setAttribute("link", card.link);
    cardLink.setAttribute("item", card.item);
    cardContainer.appendChild(cardLink);

    this.shadowRoot.appendChild(cardContainer)
  }
}

export default Card;
