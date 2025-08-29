import cssImportsPath from "/src/css/imports.css?inline";

class PresentPerfect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      .container {
        border: 1px solid red
      }

      .tense-wrapper {
        display: flex;
        justify-content: space-between
      }

      .tenses {
        display: inline-block;
      }
    `;
    this.shadowRoot.appendChild(css);

    const container = document.createElement("div");
    container.classList.add("card");
    this.shadowRoot.appendChild(container);

    const tenseWrapper = document.createElement("div");
    tenseWrapper.classList.add("tense-wrapper")
    container.appendChild(tenseWrapper);

    const past = document.createElement("span");
    past.classList.add("tense")
    past.textContent = "Past"
    tenseWrapper.appendChild(past);

    const present = document.createElement("span");
    present.classList.add("tense")
    present.textContent = "Present"
    tenseWrapper.appendChild(present);

    const future = document.createElement("span");
    future.classList.add("tense")
    future.textContent = "Future"
    tenseWrapper.appendChild(future);

  }
}

export default PresentPerfect;
