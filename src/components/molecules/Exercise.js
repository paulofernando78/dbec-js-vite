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

      if (section.fillExercises) {
        this._renderFillExercises(section.fillExercises);
      }
    });

    this.renderButtons();
  }

  _renderTitleDescription(title, description) {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "var(--line-break)";

    if (title) {
      const titleElement = document.createElement("p");
      titleElement.textContent = title;
      titleElement.style.fontWeight = "bold";
      wrapper.appendChild(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = description;
      descriptionElement.style.fontStyle = "italic";
      wrapper.appendChild(descriptionElement);
    }
    this.shadowRoot.appendChild(wrapper);
  }

  // RADIO
  _renderRadioExercises(items, idxOffset) {
    items.forEach((item, idx) => {
      const radioContainer = document.createElement("div");
      radioContainer.style.marginBottom = "var(--line-break)"
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

      this.shadowRoot.appendChild(radioContainer);
    });
  }

  renderButtons() {
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.style.display = "flex";
    buttonsWrapper.style.gap = "8px";
    buttonsWrapper.style.marginLeft = "3px";
    buttonsWrapper.style.marginBlock = ".625rem";

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
    this.shadowRoot.appendChild(buttonsWrapper);
  }
}

export default Exercise;
