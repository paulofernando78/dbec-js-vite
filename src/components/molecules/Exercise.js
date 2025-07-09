import cssImportsPath from "/src/css/imports.css?inline";
import { correct, incorrect } from "@images/svg-imports";

const svgIcons = {
  correct: correct,
  incorrect: incorrect,
};
class Exercise extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    this.exerciseContainer = document.createElement("div");
    this.exerciseContainer.classList.add("line-break");
    this.shadowRoot.appendChild(this.exerciseContainer);
  }

  set data(exercises) {
    exercises.forEach((section, idx) => {
      if (section.title) {
        this._renderTitleDescription(section.title, section.description);
      }

      if (section.radioExercises) {
        console.log("Recebido?:", section.radioExercises);
        this._renderRadioExercises(section.radioExercises, idx);
      }

      if (section.checkboxExercises) {
        console.log("Recebido?:", section.checkboxExercises);
        this._renderCheckboxExercises(section.checkboxExercises, idx);
      }

      if (section.dropdownExercises) {
        console.log("Recebido?:", section.dropdownExercises);
        this._renderDropdownExercises(section.dropdownExercises, idx);
      }

      if (section.fillExercises) {
        this._renderFillExercises(section.fillExercises);
      }
    });

    this.renderButtons();
  }

  // Title / Description
  _renderTitleDescription(title, description) {
    const titleWrapper = document.createElement("div");

    if (title) {
      const titleElement = document.createElement("p");
      titleElement.textContent = title;
      titleElement.style.fontWeight = "bold";
      titleWrapper.appendChild(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = description;
      descriptionElement.style.fontStyle = "italic";
      titleWrapper.appendChild(descriptionElement);
    }
    this.exerciseContainer.appendChild(titleWrapper);
  }

  // Radio
  _renderRadioExercises(items, idxOffset) {
    items.forEach((item, idx) => {
      const radioContainer = document.createElement("div");
      // radioContainer.style.marginBottom = "var(--line-break)";
      radioContainer.classList.add("radio-exercise-group");

      if (item.question) {
        const question = document.createElement("p");
        item.question.forEach((q) => {
          if (q.boldText) {
            const questionBold = document.createElement("span");
            questionBold.textContent = q.boldText;
            questionBold.style.fontWeight = "bold";
            question.appendChild(questionBold);
          }
          if (q.text) {
            const questionText = document.createElement("span");
            questionText.textContent = q.text;
            question.appendChild(questionText);
          }

          if (q.markedText) {
            const questionMark = document.createElement("mark");
            questionMark.textContent = q.markedText;
            question.appendChild(questionMark);
          }
        });
        radioContainer.appendChild(question);
      }

      if (item.options) {
        item.options.forEach((option) => {
          const optionWrapper = document.createElement("div");
          optionWrapper.style.display = "flex";
          optionWrapper.style.alignItems = "start";
          optionWrapper.style.gap = "8px";
          optionWrapper.style.marginTop = "10px";

          // input
          const input = document.createElement("input");
          input.dataset.correct = option.isCorrect === true ? "true" : "false";
          input.style.appearance = "none";
          input.style.WebkitAppearance = "none"; // ???
          input.style.MozAppearance = "none";

          input.style.backgroundColor = "var(--button-color)";
          input.style.boxShadow = "var(--neumorphism)";
          input.style.cursor = "pointer";
          input.style.minWidth = "20px";
          input.style.minHeight = "20px";
          input.style.borderRadius = "50%";
          input.style.marginTop = "1px";
          input.style.marginLeft = "3px";

          input.style.position = "relative";
          input.style.bottom = "1px";

          input.addEventListener("mousedown", () => {
            input.style.boxShadow = "var(--neumorphism-active)";
            input.style.transform = "scale(0.95)";
          });

          input.addEventListener("mouseup", () => {
            input.style.boxShadow = "var(--neumorphism)";
            input.style.transform = "scale(1)";
          });

          // dot
          const dot = document.createElement("span");
          dot.style.position = "absolute";
          dot.style.top = "2px";
          dot.style.left = "5px";
          dot.style.width = "15px";
          dot.style.height = "15px";
          dot.style.borderRadius = "50%";
          dot.style.backgroundColor = "#A8A8A8";
          dot.style.display = "none";

          input.style.position = "relative";

          input.addEventListener("change", () => {
            const group = input.closest(".radio-exercise-group");
            const alldots = group.querySelectorAll(".radio-dot");
            alldots.forEach((p) => (p.style.display = "none"));
            dot.style.display = "block";
          });

          dot.classList.add("radio-dot");
          optionWrapper.style.position = "relative";
          optionWrapper.appendChild(dot);

          input.type = "radio";
          input.name = `radio-${idx + idxOffset}`;
          input.value = option.option;
          optionWrapper.appendChild(input);

          const label = document.createElement("label");
          label.textContent = option.option;
          optionWrapper.appendChild(label);

          const result = document.createElement("span");
          result.classList.add("result");
          result.style.display = "none";
          label.appendChild(result);

          radioContainer.appendChild(optionWrapper);
        });
      }

      this.exerciseContainer.appendChild(radioContainer);
    });
  }

  // Checkbox
  _renderCheckboxExercises(items) {
    items.forEach((item) => {
      const checkboxContainer = document.createElement("div");
      this.exerciseContainer.appendChild(checkboxContainer);
    });
  }

  // Dropdown
  _renderDropdownExercises(items) {
    items.forEach((item) => {
      const dropdownContainer = document.createElement("div");
      this.exerciseContainer.appendChild(dropdownContainer);
    });
  }

  // Fill in the blanks
  _renderFillExercises(items) {
    const fillContainer = document.createElement("div")
    // fillContainer.classList.add("fill-exercise-group")

    items.forEach((item) => {
      const fillWrapper = document.createElement("div");
      fillWrapper.style.display = "inline"
      if (item.displayBlock) {
        fillWrapper.style.display = "block"
      }

      const beforeBlank = document.createElement("span");
      beforeBlank.textContent = item.beforeBlank;
      const blank = document.createElement("input");
      blank.style.width = item.width || "";
      blank.type = "text";
      blank.style.marginInline = "6px";
      blank.style.borderRadius = "var(--border-radius)";
      blank.style.border = "1px solid lightgray";
      blank.style.marginBottom = "2px";
      const fillResult = document.createElement("span");
      const afterBlank = document.createElement("span");
      afterBlank.textContent = item.afterBlank;
      fillWrapper.append(beforeBlank, blank, afterBlank);
      fillContainer.appendChild(fillWrapper)

    });
    this.exerciseContainer.appendChild(fillContainer)
  }

  renderButtons() {
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.style.display = "flex";
    buttonsWrapper.style.gap = "8px";
    buttonsWrapper.style.padding = "5px";

    // Check answers
    const checkAnswersButton = document.createElement("wc-button");
    checkAnswersButton.setAttribute("data-icon", "check");
    checkAnswersButton.addEventListener("click", () => {
      const containers = this.shadowRoot.querySelectorAll(
        ".radio-exercise-group"
      );
      containers.forEach((container) => {
        const inputs = container.querySelectorAll("input[type='radio']");
        const results = container.querySelectorAll("span.result");

        inputs.forEach((input, i) => {
          const isChecked = input.checked;
          const isCorrect = input.dataset.correct === "true";

          // Result
          const resultSpan = results[i];
          if (isChecked && isCorrect) {
            resultSpan.innerHTML = svgIcons.correct;
            const svg = resultSpan.querySelector("svg");
            resultSpan.style.display = "inline";
            svg.style.verticalAlign = "top";
            resultSpan.style.position = "relative";
            resultSpan.style.bottom = "3px";
          } else if (isChecked) {
            resultSpan.innerHTML = svgIcons.incorrect;
            const svg = resultSpan.querySelector("svg");
            resultSpan.style.display = "inline";
            svg.style.verticalAlign = "top";
            resultSpan.style.position = "relative";
          } else {
            resultSpan.innerHTML = "";
            resultSpan.style.display = "";
          }
        });
      });
    });

    // const showAnswersButton = document.createElement("wc-button");
    // showAnswersButton.setAttribute("data-icon", "visibility");

    // Reset button
    const resetButton = document.createElement("wc-button");
    resetButton.setAttribute("data-icon", "reset");
    resetButton.addEventListener("click", () => {
      const containers = this.shadowRoot.querySelectorAll(
        ".radio-exercise-group"
      );

      containers.forEach((container) => {
        const inputs = container.querySelectorAll("input[type='radio']");
        inputs.forEach((input) => {
          input.checked = false;
        });

        const results = container.querySelectorAll("span.result");
        results.forEach((resultSpan) => {
          resultSpan.innerHTML = "";
          resultSpan.style.display = "none";
        });

        const dots = container.querySelectorAll(".radio-dot");
        dots.forEach((dot) => {
          dot.style.display = "none";
        });
      });
    });

    buttonsWrapper.append(checkAnswersButton, resetButton);
    this.exerciseContainer.appendChild(buttonsWrapper);
  }
}

export default Exercise;
