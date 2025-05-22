class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style"); /*css*/
    style.textContent = `
      header {
        border: var(--border);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--padding);
        margin-bottom: .625rem;
      }

      span {
        display: inline-block;
        font-family: "Anton", sans-serif;
        font-size: 1.25rem;
        text-align: center;
      }

      .left-button {
        position: relative;
        top: 2px;
        left: 2px;
      }
      .right-button {
        position: relative;
        top: 2px;
        right: 2px;
      }

      .menu-button.hidden {
        left: 6px;
        display: none;
      }

      @media (max-width: 768px) {
        .menu-button.visible {
          display: inline-block;
        }
      }
    `;

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <header>
        <div>
          <wc-button data-icon="login"></wc-button>
          <wc-button data-icon="logout"></wc-button>
          <wc-button data-icon="menu"></wc-button>
        </div>
          <span>DAILY BASIS ENGLISH COURSE</span>
          <wc-button data-icon="darkMode"></wc-button>
      </header>
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Header;
