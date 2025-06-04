class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const css = document.createElement("style"); /*css */
    css.textContent = `
      div {
        border: var(--border);
        border-radius: 5px;
        background-color: #000;
        color: #fff;
        padding: 10px;
        font-weight: bold;
      }
    `;

    const cards = JSON.parse(this.getAttribute("data"));

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      ${cards
        .map(
          (card) => ` 
        <p>${card.text}</p>
        `
        )
        .join("")}
    `;

    this.shadowRoot.appendChild(css);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
