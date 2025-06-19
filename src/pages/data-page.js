import cssImportsPath from "/src/css/imports.css?inline";

class DataPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const loading = document.createElement("p")
    loading.textContent = "Loading...";
    loading.style.fontWeight = "bold"
    this.shadowRoot.appendChild(loading)
  }

  connectedCallback() {
    const path = this.getAttribute("path");
    let JSON_PATH;
    const lesson = this.getAttribute("lesson");
    const part = this.getAttribute("part");
    console.log("🚀 Atributos recebidos:", { path, lesson, part });
    

    if (lesson && part) {
      JSON_PATH = `/data/${path}/lesson-${lesson}/${part}.json`;
    } else {
      JSON_PATH = `/data/${path}/contents.json`;
    }

    fetch(JSON_PATH)
      .then((res) => res.json())
      .then((data) => {
        this.shadowRoot.innerHTML = "";

        const cssImports = document.createElement("style");
        cssImports.textContent = cssImportsPath;
        this.shadowRoot.appendChild(cssImports)

        const contents = document.createElement("wc-contents");
        contents.data = data;
        this.shadowRoot.appendChild(contents);
      });
  }
}

export default DataPage;
