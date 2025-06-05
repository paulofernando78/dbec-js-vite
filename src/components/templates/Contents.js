import cssImportsPath from "/src/css/imports.css?inline";

class Contents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css*/
    css.textContent = `
      
    `
    this.shadowRoot.appendChild(css)

  }

  set data(content) {
    this.render(content);
  }

  render(content) {
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("line-break")

    // Whiteboard
    const whiteboard = document.createElement("wc-whiteboard");
    whiteboard.data = content.whiteboard;
    contentContainer.appendChild(whiteboard)

    // Ribbon
    const ribbon = document.createElement("wc-ribbon");
    ribbon.data = content.ribbon;
    contentContainer.appendChild(ribbon)

    //Card
    const card = document.createElement("wc-card");
    card.data = content.card;
    contentContainer.appendChild(card)

    this.shadowRoot.appendChild(contentContainer)
  }
}

export default Contents;
