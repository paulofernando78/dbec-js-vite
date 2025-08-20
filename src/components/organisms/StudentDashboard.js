import cssImportsPath from "/src/css/imports.css?inline";

class StudentDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);
  }

  set data(dashboard) {
    this.classList.add("line-break");

    const feelings = document.createElement("wc-feelings");

    const theAlphabet = document.createElement("wc-the-alphabet")

    const board = document.createElement("wc-board")
    board.data = dashboard.board

    const dateCard = document.createElement("wc-date-card");
    dateCard.data = dashboard.dateCard;

    this.shadowRoot.append(feelings, theAlphabet, board, dateCard);
  }
}

export default StudentDashboard;
