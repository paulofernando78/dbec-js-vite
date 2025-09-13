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
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }  
    
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

      .answer {
        display: block;
        margin: 20px;
        font-family: "Slackey";
        font-size: 1.5rem;
      }
    `;
    this.shadowRoot.appendChild(css);

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("card");
    this.shadowRoot.appendChild(container);

    const title = document.createElement("span");
    title.classList.add("title");
    title.textContent = "Hangman";
    container.appendChild(title);

    const letterContainer = document.createElement("div");
    letterContainer.classList.add("letter-container");
    container.appendChild(letterContainer);

    const letters = Array.from({ length: 26 }, (_, i) => {
      return String.fromCharCode(65 + i);
    });

    letters.forEach((ch) => {
      const letter = document.createElement("wc-button");
      letter.classList.add("letter");
      letter.setAttribute("data-label", ch);
      letter.setAttribute("data-font", "Slackey");
      letterContainer.appendChild(letter);
    });

    const answer = document.createElement("span");
    answer.classList.add("answer");
    container.appendChild(answer);
    this.answer = answer;
  }

  set data(value) {
    this.words = value.map((item) => item.word).filter(Boolean);
    if (!this.words.length) return;

    this.currentWord = this.words[0].toUpperCase();

    this.guessed = Array(this.currentWord.length).fill("_");

    this.answer.textContent = this.guessed.join(" ");
  }
}

export default Hangman;
