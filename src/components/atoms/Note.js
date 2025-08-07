import cssImportsPath from "/src/css/imports.css?inline";

class Note extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const textArea = document.createElement("textarea");
    textArea.style.width = "100%";
    textArea.style.height = "29px";
    textArea.style.borderRadius = "var(--border-radius)";
    textArea.style.padding = "var(--padding)";
    textArea.placeholder = "Class notes...";

    // Fetching...
    const savedText = localStorage.getItem("note-text");
    if (savedText) {
      textArea.value = savedText;
    }

    // Salving as type
    textArea.addEventListener("input", () => {
      localStorage.setItem("note-text", textArea.value);
    });
    this.shadowRoot.append(textArea);
  }
}

export default Note;
