import {
  login,
  logout,
  menu,
  darkMode,
  lightMode,
} from "../../assets/images/svg-icons";

class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const icon = this.getAttribute("data-icon");
    
    const button = document.createElement("button");
    button.style.width = "35px";
    button.style.height = "35px";
    button.style.borderRadius = "100%";
    button.style.backgroundColor = "var(--button-color)";
    button.style.boxShadow = "var(--neumorphism)";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.textContent = "";

    // const svg = document.createElement("svg")
    // this.shadowRoot.appendChild(svg)


    this.shadowRoot.appendChild(button);
  }
}

export default Button;
