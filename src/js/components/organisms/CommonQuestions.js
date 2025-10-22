import cssImportsPath from "@css/imports.css?inline";

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

      .portuguese {
        color: var(--gray-4)
      }
    `;
    this.shadowRoot.appendChild(css);

    const phrases = [
      {
        audioSrc: "/assets/audio/common-phrases/i-have-a-question.mp3",
        phrase: "I have a question. ",
        portuguese: "Tenho uma dúvida.",
      },
      {
        audioSrc: "/assets/audio/common-phrases/can-i-ask-you-a-question.mp3",
        phrase: "Can I ask you a question? ",
        portuguese: "Posso fazer uma pergunta?",
      },
      {
        audioSrc: "/assets/audio/common-phrases/how-do-you-say.mp3",
        phrase: "A: How do you say “livro” in English? B: Book. ",
        portuguese: "Como se diz livro em Inglês?",
      },
      {
        audioSrc: "/assets/audio/common-phrases/how-do-you-spell.mp3",
        phrase: "A: How do you spell it? B: B-O-O-K. (B-double O-K) ",
        portuguese: "Como se soletra?",
      },
      {
        audioSrc: "/assets/audio/common-phrases/i-didnt-understand.mp3",
        phrase:
          "I didn’t (quite) understand. Can you say / pronounce / repeat / it again, please? ",
        portuguese:
          "Eu não entendi (muito bem). Pode dizer / pronunciar / repetir de novo, por favor?",
      },
      {
        audioSrc: "/assets/audio/common-phrases/can-i-go.mp3",
        phrase: "Can I go to the bathroom? ",
        portuguese: "Posso ir ao banheiro?",
      },
      {
        audioSrc: "/assets/audio/common-phrases/can-i-drink.mp3",
        phrase: "Can I drink / get some water? ",
        portuguese: "Posso beber / tomar um pouco de água?",
      },
      ,
      {
        audioSrc: "/assets/audio/common-phrases/brb.mp3",
        phrase: "Be right back. (BRB) ",
        portuguese: "Volto logo.",
      },
    ];

    const ribbon = document.createElement("wc-ribbon");
    ribbon.data = {
      icon: "snippet",
      label: "Common sentences",
    };
    this.shadowRoot.appendChild(ribbon);

    const phrasesContainer = document.createElement("div");
    phrasesContainer.classList.add("phrases-container");
    this.shadowRoot.appendChild(phrasesContainer);

    phrases.forEach((phrase) => {
      const p = document.createElement("p");

      const phraseAudio = document.createElement("wc-audio");
      phraseAudio.data = {
        audioSrc: phrase.audioSrc,
      };
      p.appendChild(phraseAudio);

      p.appendChild(document.createTextNode(phrase.phrase));
      const ptSpan = document.createElement("span");
      ptSpan.classList.add("portuguese");
      ptSpan.textContent = phrase.portuguese;
      p.appendChild(ptSpan);
      phrasesContainer.appendChild(p);
    });
  }
}

export default CommonQuestions;
