import cssImportsPath from "@css/imports.css?inline";
import cssComponentPath from "@css/components/atoms/floating-board.css?inline";

import { write } from "@images/svg-imports";

class FloatingBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImportsPath, cssComponentPath].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    this.shadowRoot.appendChild(wrapper);

    const openClose = document.createElement("div");
    openClose.innerHTML = write;
    openClose.className = "open-close";

    openClose.addEventListener("click", () => {
      const isHidden = getComputedStyle(floatingBoard).display === "none";
      floatingBoard.style.display = isHidden ? "block" : "none";
      // openClose.innerHTML = isHidden ? arrowDropDown : arrowDropUp;

      if (isHidden) {
        wrapper.classList.add("wrapper-extended");
      } else {
        wrapper.classList.remove("wrapper-extended");
      }
    });

    wrapper.appendChild(openClose);

    const floatingBoard = document.createElement("textarea");
    floatingBoard.placeholder = "Note taking";

    // Load saved note from localStorage
    const savedNote = localStorage.getItem("floatingBoardNote");
    if (savedNote) {
      floatingBoard.value = savedNote;
    }
    // Save note to localStorage on input
    floatingBoard.addEventListener("input", () => {
      localStorage.setItem("floatingBoardNote", floatingBoard.value);
    });
    wrapper.appendChild(floatingBoard);
  }
}

export default FloatingBoard;
