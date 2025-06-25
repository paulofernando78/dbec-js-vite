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
    const lesson = this.getAttribute("lesson");
    const part = this.getAttribute("part");
    const unit = this.getAttribute("unit");
    const book = this.getAttribute("book");
    const letter = this.getAttribute("letter");
    console.log("🔍 path:", path);
    console.log("📘 lesson:", lesson);
    console.log("📎 part:", part);
    console.log("📎 unit:", unit);
    console.log("📚 book:", book);
    console.log("📚 letter:", letter);
    
    if (lesson && part) {
      // Courses
      JSON_PATH = `/data/${path}/lesson-${lesson}/${part}.json`;
    } else if (lesson) {
      JSON_PATH = `/data/${path}/lesson-${lesson}.json`;
    } else if (unit) {
      // Audiobooks
      JSON_PATH = `/data/${path}/unit-${unit}.json`;
    } else if (book) {
      JSON_PATH = `/data/${path}/book.json`;
      // Pronunciation
    } else if (letter) {
      JSON_PATH = `/data/${path}/letter.json`;
      // Contents
    } else {
      JSON_PATH = `/data/${path}/contents.json`;
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
        this.shadowRoot.appendChild(contents);
      });
  }
}

export default DataPage;
