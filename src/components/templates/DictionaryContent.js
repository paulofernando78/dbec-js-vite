import cssImportsPath from "/src/css/imports.css?inline";

class DictionaryContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setData({
    word,
    phonetics,
    partOfSpeech,
    enDefinition,
    ptDefinition,
    examples,
    videoPlayer,
    synonyms,
    antonyms,
    notes,
  }) {
    this.word = word.replace(/[’']/g, "’");
    this.phonetics = phonetics;
    this.partOfSpeech = partOfSpeech;
    this.enDefinition = enDefinition;
    this.ptDefinition = ptDefinition;
    this.examples = examples;
    this.videoPlayer = videoPlayer;
    this.synonyms = synonyms;
    this.antonyms = antonyms;
    this.notes = notes;

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = "";

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;

    const css = document.createElement("style");
    /*css*/
    css.textContent = `

    wc-video-player.margin-top {
      display: block; /* ou inline-block */
      margin-top: 10px;
    }
    `;

    this.shadowRoot.append(cssImports, css);

    const wrapper = document.createElement("div");
    wrapper.style.padding = "var(--padding)";
    wrapper.style.border = "var(--border)";
    wrapper.style.borderRadius = "var(--border-radius)";
    wrapper.style.boxShadow = "var(--box-shadow)";
    wrapper.style.backgroundColor = "var(--yellow-0)";
    wrapper.style.color = "black";
    wrapper.style.marginBottom = "10px"

    const wordWrapper = document.createElement("div");
    wrapper.appendChild(wordWrapper);

    // word
    const word = document.createElement("span");
    word.textContent = this.word.replace(/'/g, "’");
    word.style.fontWeight = "bold";
    word.style.marginRight = "var(--margin-right)";
    wordWrapper.appendChild(word);

    // phonetics
    if (this.phonetics) {
      const phoneticsEl = document.createElement("span");
      phoneticsEl.textContent = this.phonetics;
      phoneticsEl.classList.add("phonetics");
      phoneticsEl.style.marginRight = "var(--margin-right)";
      wordWrapper.appendChild(phoneticsEl);
    }

    // partOfSpeech
    if (this.partOfSpeech) {
      const partOfSpeechEl = document.createElement("span");
      partOfSpeechEl.textContent = this.partOfSpeech;
      partOfSpeechEl.classList.add("part-of-speech");
      partOfSpeechEl.style.marginRight = "var(--margin-right)";
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
    ptDef.style.color = "var(--gray-4)";
    ptDef.textContent = this.ptDefinition;
    wordWrapper.appendChild(ptDef);

    const exampleList = document.createElement("ul");
    wrapper.appendChild(exampleList);

    this.examples.forEach((example) => {
      const item = document.createElement("li");
      item.style.marginTop = "var(--margin-top)";

      // enExample
      if (example.enExample) {
        const enExample = document.createElement("p");
        enExample.style.marginRight = "var(--margin-right)";
        enExample.style.display = "inline";
        enExample.textContent = "• " + example.enExample;
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

    // VideoPlayer

    let videoPlayer;

    if (this.videoPlayer) {
      videoPlayer = document.createElement("wc-video-player");
      word.style.marginTop = "var(--margin-top)";
      videoPlayer.data = this.videoPlayer;
    }
    if (videoPlayer) wrapper.appendChild(videoPlayer);

    const synonymsWrapper = document.createElement("div");
    wrapper.appendChild(synonymsWrapper)

    const synonymsTitle = document.createElement("span");
    synonymsTitle.style.display = "inline-block";
    synonymsTitle.textContent = "Synonyms:";
    synonymsTitle.style.fontFamily = "times-roman";
    synonymsTitle.style.marginTop = "var(--margin-top)";
    synonymsTitle.style.marginRight = "var(--margin-right)";
    synonymsWrapper.appendChild(synonymsTitle);

    const synonyms = document.createElement("span");
    synonyms.textContent = this.synonyms.join(", ");
    synonymsWrapper.appendChild(synonyms);

    const antonymsWrapper = document.createElement("div");
    wrapper.appendChild(antonymsWrapper)

    const antonymsTitle = document.createElement("span");
    antonymsTitle.textContent = "Antonyms:";
    antonymsTitle.style.fontFamily = "times-roman";
    antonymsTitle.style.marginRight = "var(--margin-right)";
    antonymsWrapper.appendChild(antonymsTitle);

    const antonyms = document.createElement("span");
    antonyms.textContent = this.antonyms.join(", ");
    antonymsWrapper.appendChild(antonyms);

    const notesList = document.createElement("ul");
    notesList.style.marginTop = "var(--margin-top)";
    wrapper.appendChild(notesList);

    if (Array.isArray(this.notes)) {
      this.notes.forEach((note) => {
        const item = document.createElement("li");
        item.classList.add("margin-top");

        const enNote = document.createElement("p");
        enNote.textContent = note.enNote;

        const ptNote = document.createElement("p");
        ptNote.style.color = "var(--gray-4)";
        ptNote.textContent = note.ptNote;

        item.appendChild(enNote);
        item.appendChild(ptNote);
        notesList.appendChild(item);
      });
    }

    this.shadowRoot.appendChild(wrapper);
  }
}

export default DictionaryContent;
