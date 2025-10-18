import cssImportsPath from "/src/css/imports.css?inline";

class DictionaryContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setData(data) {
    // copia todas as propriedades de data para this
    Object.assign(this, data);

    // tratamento especial para word
    if (this.word) {
      this.word = this.word.replace(/[’']/g, "’");
    }

    this.shadowRoot.innerHTML = "";

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;

    const css = document.createElement("style");
    /*css*/
    css.textContent = `

    .dictionary-card {
      padding: var(--padding);
      border: var(--border);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      background-color: var(--yellow-0);
      color: black;
    }

    .word {
      font-weight: bold;
      margin-right: var(--margin-right)
    }

    .phonetics {
      margin-right: var(--margin-right)
    }

    .pt-defitinion {
      color: var(--gray-4)
    }

    wc-video-player.margin-top {
      display: block; /* ou inline-block */
    }
    `;

    this.shadowRoot.append(cssImports, css);

    const dictionaryCard = document.createElement("div");
    dictionaryCard.classList.add("dictionary-card");
    dictionaryCard.classList.add("line-break");

    const wordWrapper = document.createElement("div");
    dictionaryCard.appendChild(wordWrapper);

    // word
    const word = document.createElement("span");
    word.textContent = this.word.replace(/'/g, "’");
    word.classList.add("word");
    wordWrapper.appendChild(word);

    // phonetics
    if (this.phonetics) {
      const phoneticsEl = document.createElement("span");
      phoneticsEl.textContent = this.phonetics;
      phoneticsEl.classList.add("phonetics");
      wordWrapper.appendChild(phoneticsEl);
    }

    // partOfSpeech
    if (this.partOfSpeech) {
      const partOfSpeechEl = document.createElement("span");
      partOfSpeechEl.textContent = this.partOfSpeech;
      partOfSpeechEl.classList.add("part-of-speech");
      wordWrapper.appendChild(partOfSpeechEl);
    }

    // enDefinition
    if (this.enDefinition) {
      const enDef = document.createElement("p");
      enDef.textContent = this.enDefinition;
      wordWrapper.appendChild(enDef);
    }

    // ptDefinition
    const ptDef = document.createElement("p");
    ptDef.classList.add("pt-defitinion");
    ptDef.textContent = this.ptDefinition;
    wordWrapper.appendChild(ptDef);

    const exampleList = document.createElement("ul");
    dictionaryCard.appendChild(exampleList);

    this.examples.forEach((example) => {
      const item = document.createElement("li");

      // enExample
      if (example.enExample) {
        const enExample = document.createElement("p");
        enExample.style.marginRight = "var(--margin-right)";
        enExample.style.display = "inline";

        const bullet = document.createElement("b");
        bullet.textContent = "• ";

        const text = document.createTextNode(example.enExample);

        enExample.appendChild(bullet);
        enExample.appendChild(text);

        item.appendChild(enExample);
      }

      // ptExample
      if (example.ptExample) {
        const ptExample = document.createElement("p");
        ptExample.style.display = "inline";
        ptExample.style.color = "var(--gray-4)";
        ptExample.textContent = example.ptExample;
        item.appendChild(ptExample);
      }

      exampleList.appendChild(item);
    });

    // Images
    if (Array.isArray(this.images) && this.images.length > 0) {
      this.images.forEach((img) => {
        const image = document.createElement("wc-image");
        image.data = img;
        dictionaryCard.appendChild(image);
      });
    }

    // VideoPlayer
    let videoPlayer;

    if (this.videoPlayer) {
      videoPlayer = document.createElement("wc-video-player");
      videoPlayer.data = this.videoPlayer;
    }
    if (videoPlayer) dictionaryCard.appendChild(videoPlayer);

    // 
    const innerContainer = document.createElement("div");
    dictionaryCard.appendChild(innerContainer);

    // synonyms
    if (Array.isArray(this.synonyms) && this.synonyms.length > 0) {
      const synonymsWrapper = document.createElement("div");
      innerContainer.appendChild(synonymsWrapper);

      const synonymsTitle = document.createElement("span");
      synonymsTitle.style.display = "inline-block";
      synonymsTitle.textContent = "Synonyms:";
      synonymsTitle.style.fontFamily = "times-roman";
      synonymsTitle.style.marginRight = "var(--margin-right)";
      synonymsWrapper.appendChild(synonymsTitle);

      const synonyms = document.createElement("span");
      synonyms.textContent = this.synonyms.join(", ");
      synonymsWrapper.appendChild(synonyms);
    }

    // antonyms
    if (Array.isArray(this.antonyms) && this.antonyms.length > 0) {
      const antonymsWrapper = document.createElement("div");
      innerContainer.appendChild(antonymsWrapper);

      const antonymsTitle = document.createElement("span");
      antonymsTitle.style.fontFamily = "times-roman";
      antonymsTitle.textContent = "Antonyms:";
      antonymsTitle.style.marginRight = "var(--margin-right)";
      antonymsWrapper.appendChild(antonymsTitle);

      const antonyms = document.createElement("span");
      antonyms.textContent = this.antonyms.join(", ");
      antonymsWrapper.appendChild(antonyms);
    }

    // seeAlso
    if (Array.isArray(this.seeAlso) && this.seeAlso.length > 0) {
      const seeAlsoWrapper = document.createElement("div");
      innerContainer.appendChild(seeAlsoWrapper);

      const seeAlsoTitle = document.createElement("span");
      seeAlsoTitle.style.fontFamily = "times-roman";
      seeAlsoTitle.textContent = "See also:";
      seeAlsoTitle.style.marginRight = "var(--margin-right)";
      seeAlsoWrapper.appendChild(seeAlsoTitle);

      const seeAlsoContent = document.createElement("span");
      seeAlsoContent.textContent = this.seeAlso.join(", ");
      seeAlsoWrapper.appendChild(seeAlsoContent);
    }

    // notes
    if (Array.isArray(this.notes) && this.notes.length > 0) {
      const notesList = document.createElement("ul");
      dictionaryCard.appendChild(notesList);
      
      this.notes.forEach((note) => {
        const item = document.createElement("li");
        item.style.display = "inline";
        item.classList.add("margin-top");
        
        const noteTitle = document.createElement("span");
        noteTitle.style.fontFamily = "times-roman";
        (noteTitle.textContent = "Notes:"),
          (noteTitle.style.marginRight = "var(--margin-right)");

        const enNote = document.createElement("p");
        enNote.style.display = "inline";
        enNote.textContent = note.enNote;
        enNote.style.marginRight = "var(--margin-right)";
        item.appendChild(enNote);

        const ptNote = document.createElement("p");
        ptNote.style.display = "inline";
        ptNote.style.color = "var(--gray-4)";
        ptNote.textContent = note.ptNote;
        item.appendChild(ptNote);

        notesList.append(noteTitle, item);
      });
    }

    this.shadowRoot.appendChild(dictionaryCard);
  }
}

export default DictionaryContent;
