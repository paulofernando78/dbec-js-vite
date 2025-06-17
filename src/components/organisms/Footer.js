class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style"); /*css*/
    style.textContent = `
      footer {
        text-align: center;
        border: var(--border);
        border-radius: var(--border-radius);

      small {
        font-family: "Anton", sans-serif;
        font-size: 1rem;
}
      }
    `;

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <footer>
        <small>© 2025 DAILY BASIS ENGLISH COURSE</small>
      </footer>
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Footer;
