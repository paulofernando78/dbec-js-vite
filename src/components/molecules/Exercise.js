import cssImportsPath from "/src/css/imports.css?inline";
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
      container.style.marginBottom = ".625rem"

      const title = document.createElement("p");
      title.textContent = item.title;
      title.style.fontWeight = "bold";
      container.appendChild(title);

      if (item.description) {
        const description = document.createElement("p");
        description.textContent = item.description;
        description.style.fontStyle = "italic";
        container.appendChild(description);
      }

      item.options.forEach((option, qIdx) => {
        const optionWrapper = document.createElement("div");
        optionWrapper.style.display = "flex";
        optionWrapper.style.alignItems = "center";
        optionWrapper.style.gap = "8px";
        optionWrapper.style.marginTop = ".625rem";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = `radio-${idx}`;
        input.value = option.option;
        optionWrapper.appendChild(input);

        const label = document.createElement("label")
        label.textContent = option.option;
        optionWrapper.appendChild(label)

        const result = document.createElement("span");
        result.innerHTML = "Teste";
        optionWrapper.appendChild(result);

        container.appendChild(optionWrapper)
      });

      const buttonsWrapper = document.createElement("div")
      buttonsWrapper.style.display = "flex"
      buttonsWrapper.style.gap = "8px"
      buttonsWrapper.style.marginLeft = "3px"
      buttonsWrapper.style.marginBlock = ".625rem"
      const checkAnswersButton = document.createElement("wc-button")
      checkAnswersButton.setAttribute("data-icon", "check")
      const showAnswersButton = document.createElement("wc-button")
      showAnswersButton.setAttribute("data-icon", "visibility")
      const resetButton = document.createElement("wc-button")
      resetButton.setAttribute("data-icon", "reset")
      buttonsWrapper.append(checkAnswersButton, showAnswersButton, resetButton)

      this.shadowRoot.appendChild(container);
      this.shadowRoot.appendChild(buttonsWrapper)
    });


    // Checkbox

    // Dropdown

    // Fill in the blanks
  }
}

export default Exercise;
