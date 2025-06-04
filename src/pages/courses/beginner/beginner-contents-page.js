import cssImportsPath from "/src/css/imports.css?inline";

class BeginnerContentsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    fetch("/data/courses/beginner/contents.json")
      .then((res) => res.json())
      .then((data) => {
        const contents = document.createElement("wc-contents");
        contents.data = data;
        this.shadowRoot.appendChild(contents)
      });
  }
}

export default BeginnerContentsPage;
