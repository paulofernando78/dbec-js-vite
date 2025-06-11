import cssImportsPath from "/src/css/imports.css?inline";

class Contents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.build();
  }

  build() {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);
  }

  set data(content) {
    this.render(content);
  }

  render(content) {
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("line-break");

    // Whiteboard
    const whiteboard = document.createElement("wc-whiteboard");
    whiteboard.data = content.whiteboard;
    contentContainer.appendChild(whiteboard);

    // Ribbon
    content.contents.forEach((section) => {
      if (section.ribbon) {
        const ribbon = document.createElement("wc-ribbon");
        ribbon.data = section.ribbon;
        contentContainer.appendChild(ribbon);
      }

      //Card
      if (section.card) {
        const card = document.createElement("wc-card");
        card.data = section.card;
        contentContainer.appendChild(card);
      }

      // Paragraph

      if (section.paragraphs) {
        section.paragraphs.forEach((p) => {
          const paragraph = document.createElement("wc-paragraph");
          paragraph.data = p;
          contentContainer.appendChild(paragraph);
        });
      }
    });

    this.shadowRoot.appendChild(contentContainer);
  }
}

export default Contents;
