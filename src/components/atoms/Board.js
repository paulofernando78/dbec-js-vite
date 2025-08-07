import cssImportsPath from "/src/css/imports.css?inline";

class Board extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.uniqueId = `board-text-${crypto.randomUUID}`

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);
  }

  set data(board) {
    const title = document.createElement("p");
    title.textContent = "Grab your English notebook.";
    title.style.marginBottom = "6px"

    const uniqueId = this.uniqueId

    const textArea = document.createElement("textarea");
    textArea.style.width = "100%";
    textArea.style.height = board.height || "250px";
    textArea.style.borderRadius = "var(--border-radius)";
    textArea.style.padding = "var(--padding)";

    // Fetching...
    const savedText = localStorage.getItem(uniqueId);
    if (savedText) {
      textArea.value = savedText;
    }

    // Salving as type
    textArea.addEventListener("input", () => {
      localStorage.setItem(uniqueId, textArea.value);
    });
    
 

    this.shadowRoot.append(title, textArea);
  }
}

export default Board;
