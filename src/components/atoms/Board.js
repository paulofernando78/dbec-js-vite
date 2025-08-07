import cssImportsPath from "/src/css/imports.css?inline";

class Board extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);
  }

  set data(board) {
    const textArea = document.createElement("textarea");
    textArea.style.width = "100%";
    textArea.style.height = (board?.height) || "68px";
    textArea.style.borderRadius = "var(--border-radius)";
    textArea.style.padding = "var(--padding)";

    // Fetching...
    const savedText = localStorage.getItem("board-text");
    if (savedText) {
      textArea.value = savedText;
    }

    // Salving as type
    textArea.addEventListener("input", () => {
      localStorage.setItem("board-text", textArea.value);
    });

    this.shadowRoot.append(textArea);
  }
}

export default Board;
