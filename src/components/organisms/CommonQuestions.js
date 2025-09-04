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
        audioSrc: "/assets/audio/common-phrases/i-have-a-question.mp3",
        phrase: "I have a question.",
      },
      {
        audioSrc: "/assets/audio/common-phrases/can-i-ask-you-a-question.mp3",
        phrase: "Can I ask you a question?",
      },
      {
        audioSrc: "/assets/audio/common-phrases/how-do-you-say.mp3",
        phrase: "A: How do you say “livro” in English? B: Book.",
      },
      {
        audioSrc: "/assets/audio/common-phrases/how-do-you-spell.mp3",
        phrase: "A: How do you spell it? B: B-O-O-K. (B-double O-K)",
      },
      {
        audioSrc: "/assets/audio/common-phrases/i-didnt-understand.mp3",
        phrase: "I didn’t (quite) undertand. Can you say / pronounce / repeat it, please?",
      },
      {
        audioSrc: "/assets/audio/common-phrases/can-i-go.mp3",
        phrase: "Can I go to the bathroom?",
      },
      {
        audioSrc: "/assets/audio/common-phrases/can-i-drink.mp3",
        phrase: "Can I drink / get some water?",
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
       
      const phraseAudio = document.createElement("wc-audio");
      phraseAudio.data = {
        audioSrc: phrase.audioSrc
      }
      p.appendChild(phraseAudio);

      p.appendChild(document.createTextNode(phrase.phrase));
      phrasesContainer.appendChild(p);
    });
  }
}

export default CommonQuestions;
