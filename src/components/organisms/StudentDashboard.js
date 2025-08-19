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

    const boardTitle = document.createElement("wc-ribbon");
    boardTitle.data = {
      icon: "board",
      label: "Board",
    };

    const theAlphabet = document.createElement("wc-the-alphabet")

    const board = document.createElement("wc-board")
    board.data = dashboard.board

    const ribbonDate = document.createElement("wc-ribbon");
    ribbonDate.data = {
      icon: "date",
      label: "Schedule",
    };


    const dateCard = document.createElement("wc-date-card");
    dateCard.data = dashboard.dateCard;

    this.shadowRoot.append(feelings, boardTitle, theAlphabet, board, ribbonDate, dateCard);
  }
}

export default StudentDashboard;
