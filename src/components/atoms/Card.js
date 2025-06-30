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

      .card-label {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 3px;
        height: 30px
      }

      .inner-card {
        padding: var(--padding);
        text-align: justify;

      }
      
    `;
    this.shadowRoot.appendChild(css);
  }

  set data(card) {
    this.render(card);
  }

  render(card) {
    const bgColor = card.bgColor || "#000";
    const textColor = card.textColor || "#fff";

    const container = document.createElement("div");
    container.classList.add("card-container");

    const cardLabel = document.createElement("div");
    cardLabel.classList.add("card-label");
    cardLabel.textContent = card.label;
    cardLabel.style.fontWeight = "bold";
    cardLabel.style.backgroundColor = card.bgColor;
    cardLabel.style.color = card.textColor;
    container.appendChild(cardLabel);

    const innerCard = document.createElement("div");
    innerCard.classList.add("inner-card");

    card.descriptions.forEach((descGroup) => {
      // Render description text if present
      if (Array.isArray(descGroup.description)) {
        const p = document.createElement("p");
        descGroup.description.forEach((item) => {
          if (item.mark) {
            const mark = document.createElement("mark");
            mark.textContent = item.mark;
            p.appendChild(mark);
            return;
          }

          const span = document.createElement("span");

          if (item.bold) {
            span.style.fontWeight = "bold";
            span.textContent = item.bold;
          }

          if (item.text) {
            span.textContent = item.text;
          }

          p.appendChild(span);
        });
        innerCard.appendChild(p);
      }

      if (descGroup.addHr) {
        const hr = document.createElement("hr");
        hr.style.margin = "10px";
        innerCard.appendChild(hr);
      }

      if (Array.isArray(descGroup.links)) {
        descGroup.links.forEach((item) => {
          if (item.icon) {
            const iconItem = document.createElement("wc-icon-item");
            iconItem.data = item;
            innerCard.appendChild(iconItem);
          }
        });
      }
    });

    container.appendChild(innerCard);

    this.shadowRoot.appendChild(container);
  }
}

export default Card;
