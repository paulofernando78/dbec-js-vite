import cssImportsPath from "/src/css/imports.css?inline";

class DictionaryContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    this.render();
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.style.padding = "var(--padding)";
    wrapper.style.border = "var(--border)";
    wrapper.style.borderRadius = "var(--border-radius)";
    wrapper.style.boxShadow = "var(--box-shadow)";

    const word = document.createElement("span");
    word.textContent = "teste"

    this.shadowRoot.appendChild(wrapper)
  }
}

export default DictionaryContent;
