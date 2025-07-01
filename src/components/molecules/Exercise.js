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
      titleDescWrapper.style.marginBottom = "var(--break-line)";
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
      question.style.fontWeight = "bold";
      container.appendChild(question);

      item.options.forEach((option) => {
        const optionWrapper = document.createElement("div");
        optionWrapper.style.display = "flex";
        optionWrapper.style.alignItems = "start";
        optionWrapper.style.gap = "8px";
        optionWrapper.style.marginTop = "10px";

        const input = document.createElement("input");
        input.style.appearance = "none";
        input.style.WebkitAppearance = "none"; // ???
        input.style.MozAppearance = "none";

        input.style.backgroundColor = "var(--button-color)";
        input.style.boxShadow = "var(--neumorphism)";
        input.style.cursor = "pointer";
        input.style.minWidth = "20px";
        input.style.minHeight = "20px";
        input.style.borderRadius = "50%";
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

        const point = document.createElement("span");
        point.style.position = "absolute";
        point.style.top = "1px";
        point.style.left = "5px";
        point.style.width = "15px";
        point.style.height = "15px";
        point.style.borderRadius = "50%";
        point.style.backgroundColor = "#A8A8A8";
        point.style.display = "none";

        input.style.position = "relative";

        input.addEventListener("change", () => {
          const container = input.closest(".radio-exercise-group");
          const allPoints = container.querySelectorAll(".radio-point");
          allPoints.forEach((p) => (p.style.display = "none"));
          point.style.display = "block";
        });

        point.classList.add("radio-point");
        optionWrapper.style.position = "relative";
        optionWrapper.appendChild(point);

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
        label.appendChild(result);

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
      const containers = this.shadowRoot.querySelectorAll(
        ".radio-exercise-group"
      );
      containers.forEach((container, idx) => {
        const inputs = container.querySelectorAll("input[type='radio']");
        const results = container.querySelectorAll("span.result");

        inputs.forEach((input, i) => {
          const isChecked = input.checked;
          const isCorrect = radio[idx].options[i].iscorrect === true;

          // Result
          const resultSpan = results[i];
          if (isChecked && isCorrect) {
            resultSpan.innerHTML = svgIcons.correct;
            const svg = resultSpan.querySelector("svg");
            resultSpan.style.display = "inline";
            svg.style.verticalAlign = "top";
            resultSpan.style.position = "relative";
            resultSpan.style.bottom = "3px"
          } else if (isChecked) {
            resultSpan.innerHTML = svgIcons.incorrect;
            const svg = resultSpan.querySelector("svg");
            resultSpan.style.display = "inline";
            svg.style.verticalAlign = "top";
            resultSpan.style.position = "relative";
            resultSpan.style.bottom = "1px"
          } else {
            resultSpan.innerHTML = "";
            resultSpan.style.display = "";
          }
        });
      });
    });

    // const showAnswersButton = document.createElement("wc-button");
    // showAnswersButton.setAttribute("data-icon", "visibility");

    const resetButton = document.createElement("wc-button");
    resetButton.setAttribute("data-icon", "reset");
    resetButton.addEventListener("click", () => {
  const containers = this.shadowRoot.querySelectorAll(".radio-exercise-group");

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

    const points = container.querySelectorAll(".radio-point");
    points.forEach((point) => {
      point.style.display = "none";
    });
  });
});

    buttonsWrapper.append(checkAnswersButton, resetButton);
    this.shadowRoot.appendChild(buttonsWrapper);

    // Checkbox

    // Dropdown

    // Fill in the blanks
  }
}

export default Exercise;
