import styleImports from "@css/imports.css?inline";
import styleTesteNivelamento from "@css/pages/teste-nivelamento.css?inline";

class TesteNivelamento extends HTMLElement {
  constructor() {
    super();

    [styleImports, styleTesteNivelamento].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports;
      this.appendChild(style);
    });

    //! Attributes
    const bgAttr = this.getAttribute("bg");
    const levelAttr = this.getAttribute("level");

    const taskAttr = this.getAttribute("task");
    const taskTypeAttr = this.getAttribute("task-type");
    const langFocusAttr = this.getAttribute("lang-focus");
    const examplesAttr = this.getAttribute("examples");

    //! Container
    const container = document.createElement("div");
    container.className = "container";
    container.style.backgroundColor = bgAttr;
    this.appendChild(container);

    const level = document.createElement("span");
    level.textContent = levelAttr;
    container.appendChild(level);

    //! Task Container
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    this.appendChild(taskContainer);

    //! Tasks

    //! Task Number Wrapper
    const taskNumberWrapper = document.createElement("div");
    taskContainer.appendChild(taskNumberWrapper);

    const taskBold = document.createElement("span");
    taskBold.className = "display-block";
    taskBold.textContent = "TASK";
    taskBold.className = "bold";
    taskNumberWrapper.appendChild(taskBold);

    const task = document.createElement("span");
    task.className = "display-block";
    task.textContent = taskAttr;
    taskNumberWrapper.appendChild(task);

    //! Task Type Wrapper
    const taskTypeWrapper = document.createElement("div");
    taskContainer.appendChild(taskTypeWrapper);

    const taskTypeBold = document.createElement("span");
    taskTypeBold.className = "display-block";
    taskTypeBold.textContent = "TASK TYPE";
    taskTypeBold.className = "bold";
    taskTypeWrapper.appendChild(taskTypeBold);

    const taskType = document.createElement("span");
    taskType.className = "display-block";
    taskType.textContent = taskTypeAttr;
    taskTypeWrapper.appendChild(taskType);

    //! Language Focus Wrapper
    const langFocusWrapper = document.createElement("div");
    taskContainer.appendChild(langFocusWrapper);

    const langFocusBold = document.createElement("span");
    langFocusBold.className = "display-block";
    langFocusBold.textContent = "LANGUAGE FOCUS";
    langFocusBold.className = "bold";
    langFocusWrapper.appendChild(langFocusBold);

    const langFocus = document.createElement("span");
    langFocus.className = "display-block";
    langFocus.textContent = langFocusAttr;
    langFocus.textContent = langFocusAttr.replace(/, /g, "\n")
    langFocusWrapper.appendChild(langFocus);

    //! Examples Wrapper
    const examplesWrapper = document.createElement("div");
    taskContainer.appendChild(examplesWrapper);

    const examplesBold = document.createElement("span");
    examplesBold.className = "display-block";
    examplesBold.textContent = "EXAMPLES";
    examplesBold.className = "bold";
    examplesWrapper.appendChild(examplesBold);

    const examples = document.createElement("span");
    examples.className = "display-block";;
    examples.textContent = examplesAttr;
    examples.textContent = examplesAttr.replace(/, /g, "\n")
    examplesWrapper.appendChild(examples);
  }
}

export default TesteNivelamento;
