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

    this.classList.add("line-break")

    // const button = document.createElement("wc-button");
    // button.setAttribute("data-icon", "save");
    // button.style.marginLeft = "3px";
    // button.addEventListener("click", () => {
    //   localStorage.setItem("board-text", textArea.value);
    // });

    const ribbonBoard = document.createElement("wc-ribbon");
    ribbonBoard.data = {
      icon: "board",
      label: "Board",
    };

    const board = document.createElement("wc-board");
    board.data = dashboard.board;

    const ribbonDate = document.createElement("wc-ribbon");
    ribbonDate.data = {
      icon: "date",
      label: "Schedule",
    };

    const importantNotes = document.createElement("wc-note");
    importantNotes.data = dashboard.note;

    const dateCard = document.createElement("wc-date-card");
    dateCard.data = dashboard.dateCard;

    this.shadowRoot.append(ribbonBoard, board, ribbonDate, importantNotes,  dateCard);
  }
}

export default StudentDashboard;
