import cssImportsPath from "/src/css/imports.css?inline";

class Hangman extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      .title {
        display: block;
        margin-bottom: var(--margin-bottom);
        font-family: "Slackey";
        font-size: 1.5rem;
        text-align: center;
        margin-top: 12px
      }

      .letter-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center
      }

      .letter {
        padding: var(--padding);
      }
    `;
    this.shadowRoot.appendChild(css);

    const container = document.createElement("div");
    container.classList.add("card");
    this.shadowRoot.appendChild(container);

    const title = document.createElement("span");
    title.classList.add("title");
    title.textContent = "Hangman";
    container.appendChild(title);

    const letterContainer = document.createElement("div");
    letterContainer.classList.add("letter-container");
    container.appendChild(letterContainer);

    const letters = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );

    letters.forEach((ch) => {
      const letter = document.createElement("wc-button");
      letter.classList.add("letter");
      letter.setAttribute("data-label", ch);
      letter.setAttribute("data-font", "Slackey")
      letterContainer.appendChild(letter);
    });

    const answer = document.createElement("span");
    this.shadowRoot.appendChild(answer);
  }
}

export default Hangman;
