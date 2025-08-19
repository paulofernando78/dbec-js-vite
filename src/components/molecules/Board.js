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
    const boardId = board.id;
    this.dataset.boardId = boardId

    const boardDescription = document.createElement("p");
    boardDescription.textContent = board.description;
    boardDescription.style.marginBottom = "var(--line-break)";

    const textArea = document.createElement("textarea");
    textArea.style.width = "100%";
    textArea.style.height = board?.height || "68px";
    textArea.style.borderRadius = "var(--border-radius)";
    textArea.style.padding = "var(--padding)";


    // Fetching...
    const savedText = localStorage.getItem(`board-text-${boardId}`);
    if (savedText) {
      textArea.value = savedText;
    } else if (board.text) {
      textArea.value = board.text
    }

    // Salving as type
    textArea.addEventListener("input", () => {
      localStorage.setItem(`board-text-${boardId}`, textArea.value);
    });

    this.shadowRoot.append(boardDescription, textArea);
  }
}

export default Board;
