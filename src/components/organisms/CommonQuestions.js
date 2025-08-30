import cssImportsPath from "/src/css/imports.css?inline";

class CommonQuestions extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      .phrases-container {
        margin-top: var(--margin-top)
      }
    `;
    this.shadowRoot.appendChild(css);

    const phrases = [
      {
        audio: "",
        phrase: "How do you say “...” in English?",
      },
      {
        audio: "",
        phrase: "How do you pronounce “...”?",
      },
      {
        audio: "",
        phrase: "How do you spell “...”?",
      },
      {
        audio: "",
        phrase: "I didn’t undertand. Can you repeat it, please?",
      },
    ];

    const ribbon = document.createElement("wc-ribbon");
    ribbon.data = {
      icon: "snippet",
      label: "Common questions and answers",
    };
    this.shadowRoot.appendChild(ribbon);

    const phrasesContainer = document.createElement("div");
    phrasesContainer.classList.add("phrases-container")
    this.shadowRoot.appendChild(phrasesContainer);
    
    phrases.forEach((phrase) => {
      const p = document.createElement("p");
      p.textContent = phrase.phrase;
      phrasesContainer.appendChild(p);
    });
  }
}

export default CommonQuestions;
