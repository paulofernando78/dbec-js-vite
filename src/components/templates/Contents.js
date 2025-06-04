import cssImportsPath from "/src/css/imports.css?inline";

class Contents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);
  }

  set data(content) {
    this.render(content);
  }

  render(content) {
    
    // Whiteboard
    const whiteboard = document.createElement("wc-whiteboard");
    whiteboard.data = content.whiteboard;
    this.shadowRoot.appendChild(whiteboard);

    // Ribbon
    const ribbon = document.createElement("wc-ribbon");
    ribbon.data = content.ribbon;
    this.shadowRoot.appendChild(ribbon);
  }
}

export default Contents;
