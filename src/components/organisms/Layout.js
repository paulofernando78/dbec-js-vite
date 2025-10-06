import cssImportsPath from "/src/css/imports.css?inline";
import cssLayoutPath from "/src/css/components/organisms/layout.css?inline";

class Layout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImportsPath, cssLayoutPath].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

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
    layout.appendChild(scrollTop);

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
