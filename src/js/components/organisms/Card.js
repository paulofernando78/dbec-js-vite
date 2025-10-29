import cssImportsPath from "@css/imports.css?inline";

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
      }
      
    `;
    this.shadowRoot.appendChild(css);
  }

  set data(card) {
    const bgColor = card.bgColor || "#000";
    const textColor = card.textColor || "#fff";

    const container = document.createElement("div");
    container.classList.add("card-container");

    const cardLabel = document.createElement("div");
    cardLabel.style.height = "max-content";
    cardLabel.style.padding = "1px 6px 2px 1px";

    const wcIconItem = document.createElement("wc-icon-item");
    wcIconItem.style.fontWeight = "bold";
    wcIconItem.data = {
      icon: card.icon,
      label: card.label,
    };
    cardLabel.style.backgroundColor = card.bgColor;
    cardLabel.appendChild(wcIconItem);
    container.appendChild(cardLabel);

    const innerCard = document.createElement("div");
    innerCard.style.padding = "2px 4px 1px 4px";

    card.descriptions.forEach((descGroup) => {
      // Render description text if present
      if (Array.isArray(descGroup.description)) {
        const p = document.createElement("p");
        p.style.padding = "4px 2px 0 2px";
        descGroup.description.forEach((item) => {
          if (item.markedText) {
            const mark = document.createElement("mark");
            mark.textContent = item.markedText;
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

          p.append(span);
        });
        innerCard.appendChild(p);
      }

      if (descGroup.addHr) {
        const hr = document.createElement("hr");
        innerCard.appendChild(hr);
      }

      if (Array.isArray(descGroup.links)) {
        descGroup.links.forEach((item) => {
          if (item.icon) {
            const iconItem = document.createElement("wc-icon-item");
            iconItem.data = item;
            
            innerCard.appendChild(iconItem);
            if (item.notAvailable) {
              iconItem.className = "line-through";
            }

          }
        });
      }
    });

    container.appendChild(innerCard);

    this.shadowRoot.appendChild(container);
  }
}

export default Card;
