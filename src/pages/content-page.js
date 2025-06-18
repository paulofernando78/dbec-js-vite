import cssImportsPath from "/src/css/imports.css?inline";

class ContentPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);
  }

  connectedCallback() {
    const path = this.getAttribute("path"); //ex: course/beginner
    const JSON_PATH = `/data/${path}/contents.json`;
    console.log("Current path:", path);

    fetch(JSON_PATH)
      .then((res) => res.json())
      .then((data) => {
        const contents = document.createElement("wc-contents");
        contents.data = data;
        this.shadowRoot.appendChild(contents);
      });
  }
}

export default ContentPage;
