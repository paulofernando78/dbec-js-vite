import cssImportsPath from "/src/css/imports.css?inline";

class Note extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      textarea {
        width: 100%;
        border-radius: var(--border-radius);
        padding: var(--padding);
        margin-bottom: 0
      }
    `;
    this.shadowRoot.appendChild(css);
  }
  

  set data(note) {
    this.textArea = document.createElement("textarea");
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
