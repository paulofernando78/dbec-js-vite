import cssImportsPath from "/src/css/imports.css?inline";

class GrammarContentsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const JSON_PATH = "/data/extras/grammar/contents.json"

    fetch(JSON_PATH)
      .then((res) => res.json())
      .then((data) => {
        const contents = document.createElement("wc-contents");
        contents.data = data;
        this.shadowRoot.appendChild(contents)
      });
  }
}

export default GrammarContentsPage;
