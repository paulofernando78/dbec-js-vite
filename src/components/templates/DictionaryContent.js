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
  }) {
    this.word = word;
    this.phonetics = phonetics;
    this.partOfSpeech = partOfSpeech;
    this.enDefinition = enDefinition;
    this.ptDefinition = ptDefinition;
    this.examples = examples;

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

    const word = document.createElement("span");
    word.textContent = this.word;
    word.style.fontWeight = "bold";
    word.classList.add("word-margin");

    const phonetics = document.createElement("span");
    phonetics.textContent = this.phonetics;
    phonetics.classList.add("phonetics");
    phonetics.classList.add("word-margin");

    const partOfSpeech = document.createElement("span");
    partOfSpeech.textContent = this.partOfSpeech;
    partOfSpeech.classList.add("part-of-speech");
    partOfSpeech.classList.add("word-margin");

    wordWrapper.append(word, phonetics, partOfSpeech);

    const enDefinition = document.createElement("span");
    enDefinition.style.display = "block";
    enDefinition.textContent = this.enDefinition;

    const ptDefinition = document.createElement("span");
    ptDefinition.style.display = "block";
    ptDefinition.style.color = "var(--gray-4)";
    ptDefinition.textContent = this.ptDefinition;

    const exampleList = document.createElement("ul");
    
    this.examples.forEach((example) => {
      const item = document.createElement("li");
      item.classList.add("margin-top");

      const enExample = document.createElement("p");
      enExample.textContent = example.enExample;

      const ptExample = document.createElement("p");
      ptExample.style.color = "var(--gray-4)";
      ptExample.textContent = example.ptExample;

      item.appendChild(enExample);
      item.appendChild(ptExample);
      exampleList.appendChild(item);
    });

    wrapper.append(
      word,
      phonetics,
      partOfSpeech,
      enDefinition,
      ptDefinition,
      exampleList
    );

    this.shadowRoot.appendChild(wrapper);
  }
}

export default DictionaryContent;
