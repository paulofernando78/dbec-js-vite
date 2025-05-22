class Whiteboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const imports = document.createElement("link");
    imports.rel = "stylesheet";
    imports.href = "/css/imports.css";
    this.shadowRoot.appendChild(imports);

    const style = document.createElement("style"); /*css*/
    style.textContent = `
      div {
        padding: 10px;
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

  set items(data) {
    this.render(data);
  }

  render(data) {
    const title = document.createElement("h1");
    title.textContent = data.title;
    this.container.appendChild(title);

    const subtitle = document.createElement("h2");
    subtitle.textContent = data.subtitle;
    this.container.appendChild(subtitle);

    const description = document.createElement("p");
    description.textContent = data.description;
    this.container.appendChild(description);

    const time = document.createElement("span");
    time.textContent = data.time;
    this.container.appendChild(time);

    const americanEnglish = document.createElement("span");
    americanEnglish.textContent = data.americanEnglish;
    this.container.appendChild(americanEnglish);

    const britishEnglish = document.createElement("span");
    britishEnglish.textContent = data.britishEnglish;
    this.container.appendChild(britishEnglish);
  }
}

export default Whiteboard;
