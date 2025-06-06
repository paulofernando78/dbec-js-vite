import cssImportsPath from "/src/css/imports.css?inline";

class Whiteboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.build();
  }

  build() {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const style = document.createElement("style"); /*css*/
    style.textContent = `
      div {
        padding: var(--padding);
        border: 8px solid gray;
        border-radius: 5px;
        background-image: url("/assets/img/whiteboard.png");
        background-size: cover;
        background-position: center;
        margin-bottom: 20px;
      }

      span {
        display: block;
      }
    `;
    this.shadowRoot.appendChild(style);

    this.container = document.createElement("div");
    this.container.classList.add("container");
    this.shadowRoot.appendChild(this.container);
  }

  set data(whiteboard) {
    this.render(whiteboard);
  }

  render(whiteboard) {
    const title = document.createElement("h1");
    title.textContent = whiteboard.title;
    this.container.appendChild(title);

    const subtitle = document.createElement("h2");
    subtitle.textContent = whiteboard.subtitle ?? "";
    this.container.appendChild(subtitle);

    whiteboard.description?.forEach((desc) => {
      const description = document.createElement("p");
      description.textContent = desc;
      this.container.appendChild(description);
    });

    const time = document.createElement("span");
    time.textContent = whiteboard.time ?? "";
    this.container.appendChild(time);

    const americanEnglish = document.createElement("span");
    americanEnglish.textContent = whiteboard.americanEnglish ?? "";
    this.container.appendChild(americanEnglish);

    const britishEnglish = document.createElement("span");
    britishEnglish.textContent = whiteboard.britishEnglish ?? "";
    this.container.appendChild(britishEnglish);
  }
}

export default Whiteboard;
