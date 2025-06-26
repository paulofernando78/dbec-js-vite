import cssImportsPath from "/src/css/imports.css?inline";

class DataPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const loading = document.createElement("p");
    loading.textContent = "Loading...";
    loading.style.fontWeight = "bold";
    this.shadowRoot.appendChild(loading);
  }

  connectedCallback() {
    let JSON_PATH;
    const path = this.getAttribute("path");
    const page = this.getAttribute("page");
    console.log("🔍 path:", path);
    console.log("📘 page:", page);
    
    if (page) {
      JSON_PATH = `/data/${path}/page.json`;
    }
    console.log("📥 JSON_PATH:", JSON_PATH);
    
    fetch(JSON_PATH)
      .then((res) => res.json())
      .then((data) => {
        this.shadowRoot.innerHTML = "";

        const cssImports = document.createElement("style");
        cssImports.textContent = cssImportsPath;
        this.shadowRoot.appendChild(cssImports);

        const contents = document.createElement("wc-contents");
        contents.data = data;

        if (data.meta?.type) {
          contents.setAttribute("data-type", data.meta.type)
        }

        this.shadowRoot.appendChild(contents);
      });
  }
}

export default DataPage;
