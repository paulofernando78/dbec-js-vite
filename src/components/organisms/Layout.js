import cssImportsPath from "/src/css/imports.css?inline";
import cssLayoutPath from "/src/css/components/organisms/Layout.css?inline";

class Layout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImportsPath, cssLayoutPath].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

    const style = document.createElement("style"); /*css*/
    style.textContent = `
      .layout {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr auto;
        gap: 10px;
        height: calc(100dvh - 20px)
      }

      .grid-span {
        grid-column: 1 / 3
      }

      #app {
        grid-column: 2;
        grid-row: 2;
        overflow-y: auto;
        padding-right: 8px
      }

      @media (max-width: 768px) {
        .layout {
          display: flex;
          flex-direction: column
        }

        wc-nav-bar {
          display: none;
        }

        wc-nav-bar.open {
          display: block;
        }
      }
    `;
    this.shadowRoot.appendChild(style);

    const layout = document.createElement("div");
    layout.classList.add("layout");

    const header = document.createElement("wc-header");
    header.classList.add("grid-span");
    layout.appendChild(header);

    const aside = document.createElement("aside");
    const navBar = document.createElement("wc-nav-bar");
    aside.appendChild(navBar);
    layout.appendChild(aside);

    const app = document.createElement("div");
    app.id = "app";
    layout.appendChild(app);

    const scrollTop = document.createElement("wc-scroll-top");
    this.shadowRoot.appendChild(scrollTop);

    // Referência ao container com scroll
    const scrollContainer = app; // já criado anteriormente

    scrollContainer.addEventListener("scroll", () => {
  if (scrollContainer.scrollTop > 300) {
    scrollTop.classList.add("visible");
  } else {
    scrollTop.classList.remove("visible");
  }
});

    scrollTop.addEventListener("click", () => {
      app.scrollTo({ top: 0, behavior: "smooth" });
    });

    const footer = document.createElement("wc-footer");
    footer.classList.add("grid-span");
    layout.appendChild(footer);

    this.shadowRoot.appendChild(layout);
  }
}

export default Layout;
