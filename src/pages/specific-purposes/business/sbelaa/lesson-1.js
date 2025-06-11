import cssImportsPath from "/src/css/imports.css?inline";

class SbelaaLesson1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const JSON_PATH = "/data/specific-purposes/business/sbelaa/lesson-1.json";

    fetch(JSON_PATH)
      .then((res) => res.json())
      .then((data) => {
        const contents = document.createElement("wc-contents");
        contents.data = data;
        this.shadowRoot.appendChild(contents);
      });
  }
}

export default SbelaaLesson1;
