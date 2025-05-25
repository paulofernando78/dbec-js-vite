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
        margin-left: 4px
      }

      @media (min-width: 768px) {
        #menu-button {
          display: none;
        }
      }
    `;

    this.shadowRoot.appendChild(style);

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <header>
        <div>
          
        <wc-button data-icon="menu" class="left-button" id="menu-button"></wc-button>
        </div>
        <span id="logo-name">DAILY BASIS ENGLISH COURSE</span>
        <div>
          <wc-button data-icon="darkMode" class="right-button"></wc-button>
          <wc-button data-icon="login" class="right-button"></wc-button>
          <wc-button data-icon="logout" class="right-button"></wc-button>
        </div>
      </header>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const login = this.shadowRoot.querySelector("[data-icon=login]");
    if (login && window.location.pathname === "/dashboard") {
      login.style.display = "none"
    }
  }
}

export default Header;
