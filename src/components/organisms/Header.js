class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style"); /*css*/
    style.textContent = `
      header {
        margin-bottom: .625rem;
        padding: var(--padding);
        border: var(--border);
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
          <wc-button data-icon="login" class="left-button"></wc-button>
          <wc-button data-icon="logout" class="left-button"></wc-button>
          <wc-button data-icon="menu" class="left-button"></wc-button>
        </div>
          <span>DAILY BASIS ENGLISH COURSE</span>
          <wc-button data-icon="darkMode" class="right-button"></wc-button>
      </header>
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Header;
