import cssImportsPath from "@css/imports.css?inline";

class Board extends HTMLElement {
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
        padding: var(--padding);
        border-radius: var(--border-radius);
      }
    `;

    this.shadowRoot.appendChild(css);
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
