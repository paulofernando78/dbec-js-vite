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
  }

  set data(radio) {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    // Radio
    radio.forEach((item, idx) => {
      const container = document.createElement("div");
      container.classList.add("radio-exercise-group");
      container.style.marginBottom = "var(--break-line)";

      const titleDescWrapper = document.createElement("div");
      titleDescWrapper.style.marginBottom = "var(--break-line)"
      container.appendChild(titleDescWrapper);

      const title = document.createElement("p");
      title.textContent = item.title;
      title.style.fontWeight = "bold";
      titleDescWrapper.appendChild(title);

      if (item.description) {
        const description = document.createElement("p");
        description.textContent = item.description;
        description.style.fontStyle = "italic";
        titleDescWrapper.appendChild(description);
      }

      const question = document.createElement("p");
      question.textContent = item.question;
      container.appendChild(question);

      item.options.forEach((option,) => {
        const optionWrapper = document.createElement("div");
        optionWrapper.style.display = "flex";
        optionWrapper.style.alignItems = "center";
        optionWrapper.style.gap = "8px";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `radio-${idx}`;
        input.value = option.option;
        optionWrapper.appendChild(input);

        const label = document.createElement("label");
        label.textContent = option.option;
        optionWrapper.appendChild(label);

        const result = document.createElement("span");
        result.classList.add("result");
        result.style.display = "none";
        optionWrapper.appendChild(result);

        container.appendChild(optionWrapper);
      });

      this.shadowRoot.appendChild(container);
    });

    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.style.display = "flex";
    buttonsWrapper.style.gap = "8px";
    buttonsWrapper.style.marginLeft = "3px";
    buttonsWrapper.style.marginBlock = ".625rem";

    const checkAnswersButton = document.createElement("wc-button");
    checkAnswersButton.setAttribute("data-icon", "check");
    checkAnswersButton.addEventListener("click", () => {
      const containers = this.shadowRoot.querySelectorAll(".radio-exercise-group");
      containers.forEach((container, idx) => {
        const inputs = container.querySelectorAll("input[type='radio']");
        const results = container.querySelectorAll("span.result");

        inputs.forEach((input, i) => {
          const isChecked = input.checked;
          const isCorrect = radio[idx].options[i].iscorrect === true;

          const resultSpan = results[i];
          if (isChecked && isCorrect) {
            resultSpan.innerHTML = svgIcons.correct;
            resultSpan.style.display = "inline";
          } else if (isChecked) {
            resultSpan.innerHTML = svgIcons.incorrect;
            resultSpan.style.display = "inline";
          } else {
            resultSpan.innerHTML = "";
            resultSpan.style.display = "";
          }
        });
      });
    });

    const showAnswersButton = document.createElement("wc-button");
    showAnswersButton.setAttribute("data-icon", "visibility");

    const resetButton = document.createElement("wc-button");
    resetButton.setAttribute("data-icon", "reset");

    buttonsWrapper.append(checkAnswersButton, showAnswersButton, resetButton);
    this.shadowRoot.appendChild(buttonsWrapper);

    // Checkbox

    // Dropdown

    // Fill in the blanks
  }
}

export default Exercise;
