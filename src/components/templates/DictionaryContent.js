import cssImportsPath from "/src/css/imports.css?inline";

class DictionaryContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  setData({
    word,
    partOfSpeech,
    phonetics,
    enDefinition,
    ptDefinition,
    examples,
  }) {
    this.word = word;
    this.partOfSpeech = partOfSpeech;
    this.phonetics = phonetics;
    this.enDefinition = enDefinition;
    this.ptDefinition = ptDefinition;
    this.examples = examples;

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = "";
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const wrapper = document.createElement("div");
    wrapper.style.padding = "var(--padding)";
    wrapper.style.border = "var(--border)";
    wrapper.style.borderRadius = "var(--border-radius)";
    wrapper.style.boxShadow = "var(--box-shadow)";

    const word = document.createElement("span");
    word.textContent = this.word;

    const phonetics = document.createElement("span");
    phonetics.textContent = this.phonetics;

    const enDefinition = document.createElement("span");
    enDefinition.textContent = this.enDefinition;

    const ptDefinition = document.createElement("span");
    ptDefinition.style.color = "var(--gray-4)";
    ptDefinition.textContent = this.ptDefinition;

    const exampleList = document.createElement("ul");

    this.examples.forEach((example) => {
      const item = document.createElement("li");

      const enExample = document.createElement("p");
      enExample.textContent = example.enExample;

      const ptExample = document.createElement("p");
      ptExample.style.color = "var(--gray-4)";
      ptExample.textContent = example.ptExample;

      item.appendChild(enExample);
      item.appendChild(ptExample);
      exampleList.appendChild(item);
    });

    wrapper.append(word, enDefinition, ptDefinition, phonetics, exampleList);

    this.shadowRoot.appendChild(wrapper);
  }
}

export default DictionaryContent;
