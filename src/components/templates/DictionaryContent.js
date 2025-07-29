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
  }) {
    this.word = word.replace(/[’']/g, "’");
    this.phonetics = phonetics;
    this.partOfSpeech = partOfSpeech;
    this.enDefinition = enDefinition;
    this.ptDefinition = ptDefinition;
    this.examples = examples;
    this.videoPlayer = videoPlayer;

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = "";

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      .word-margin {
        margin-right: 5px
      }

      .margin-top {
        margin-top: 10px
      }
    `;

    this.shadowRoot.append(cssImports, css);

    const wrapper = document.createElement("div");
    wrapper.style.padding = "var(--padding)";
    wrapper.style.border = "var(--border)";
    wrapper.style.borderRadius = "var(--border-radius)";
    wrapper.style.boxShadow = "var(--box-shadow)";

    const wordWrapper = document.createElement("div");

    // word
    const word = document.createElement("span");
    word.textContent = this.word.replace(/'/g, "’");
    word.style.fontWeight = "bold";
    word.classList.add("word-margin");

    // phonetics
    const phonetics = document.createElement("span");
    phonetics.textContent = this.phonetics;
    phonetics.classList.add("phonetics");
    phonetics.classList.add("word-margin");

    // partOfSpeech
    const partOfSpeech = document.createElement("span");
    partOfSpeech.textContent = this.partOfSpeech;
    partOfSpeech.classList.add("part-of-speech");
    partOfSpeech.classList.add("word-margin");

    wordWrapper.append(word, phonetics, partOfSpeech);

    // enDefinition
    const enDefinition = document.createElement("span");
    enDefinition.style.display = "block";
    enDefinition.textContent = this.enDefinition;

    // ptDefinition
    const ptDefinition = document.createElement("span");
    ptDefinition.style.display = "block";
    ptDefinition.style.color = "var(--gray-4)";
    ptDefinition.textContent = this.ptDefinition;

    const exampleList = document.createElement("ul");

    this.examples.forEach((example) => {
      const item = document.createElement("li");
      item.classList.add("margin-top");

      // enExample
      const enExample = document.createElement("p");
      enExample.textContent = example.enExample;

      // ptExample
      const ptExample = document.createElement("p");
      ptExample.style.color = "var(--gray-4)";
      ptExample.textContent = example.ptExample;

      item.appendChild(enExample);
      item.appendChild(ptExample);
      exampleList.appendChild(item);
    });

    // VideoPlayer

    let videoPlayer;

    if (this.videoPlayer) {
      videoPlayer = document.createElement("wc-video-player");
      videoPlayer.data = this.videoPlayer;
    }

    const children = [wordWrapper, enDefinition, ptDefinition, exampleList];

    if (videoPlayer) {
      children.push(videoPlayer);
    }

    const synonyms = document.createElement("span");

    const antonyms = document.createElement("span");

    const notes = document.createElement("p");

    wrapper.append(...children);

    this.shadowRoot.appendChild(wrapper);
  }
}

export default DictionaryContent;
