class Ribbon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const css = document.createElement("style"); /*css */
    css.textContent = `
      div {
        padding: var(--padding);
        border: var(--border);
        border-radius: 5px;
        background-color: #000;
        color: #fff;
        font-weight: bold;
      }
    `;
    
    this.shadowRoot.appendChild(css);
  }

  set data(ribbon) {
    this.render(ribbon);
  }

  render(ribbon) {
    const div = document.createElement("div");
    div.textContent = ribbon.label;

    this.shadowRoot.appendChild(div);
  }
}

export default Ribbon;
