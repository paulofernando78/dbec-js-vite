import cssImportsPath from "/src/css/imports.css?inline";

class Note extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);
  }

  set data(note) {
    this.textArea = document.createElement("textarea");
    this.textArea.style.width = "100%";
    this.textArea.style.borderRadius = "var(--border-radius)";
    this.textArea.style.padding = "var(--padding)";
    this.textArea.style.height = note.height || "29px";
    this.textArea.placeholder = note.placeholder;
    this.textArea.value = note.value || "";

    
    this.shadowRoot.append(this.textArea);
  }

  get value() {
    return this.textArea.value;
  }

  set value(val) {
    if (this.textArea) {
      this.textArea.value = val
    }
  }
}

export default Note;
