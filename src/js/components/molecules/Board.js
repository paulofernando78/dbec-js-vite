import styleImports from "@css/imports.css?inline";
import styleBoard from "@css/components/molecules/board.css?inline";

class Board extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, styleBoard].forEach((imports) => {
      const cssImports = document.createElement("style");
      cssImports.textContent = imports;
      this.shadowRoot.appendChild(cssImports);
    })
  }

  set data(board) {
    const boardId = board.id;
    this.dataset.boardId = boardId;

    const container = document.createElement("div");
    container.classList.add("line-break");
    this.shadowRoot.appendChild(container);

    const ribbon = document.createElement("wc-ribbon");
    ribbon.data = {
      icon: "board",
      label: "Board",
    };

    const boardDescription = document.createElement("p");
    boardDescription.textContent = board.description;

    const textArea = document.createElement("textarea");
    textArea.style.height = board?.height || "68px";

    // Fetching...
    const savedText = localStorage.getItem(`board-text-${boardId}`);
    if (savedText) {
      textArea.value = savedText;
    } else if (board.text) {
      textArea.value = board.text;
    }

    // Salving as type
    textArea.addEventListener("input", () => {
      localStorage.setItem(`board-text-${boardId}`, textArea.value);
    });

    container.append(ribbon, boardDescription, textArea);
  }
}

export default Board;
