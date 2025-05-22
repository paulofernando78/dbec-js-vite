import {
  login,
  logout,
  menu,
  darkMode,
  lightMode,
} from "../../assets/images/svg-icons";

const svgIcons = {
  login: login,
  logout: logout,
  menu: menu,
  darkMode: darkMode,
  lightMode: lightMode,
};

class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // CSS
    const style = document.createElement("style"); /*css*/
    style.textContent = `
      button {
        width: 33px;
        height: 33px;
        border-radius: 20%;
        background-color: var(--button-color);
        box-shadow: var(--neumorphism);
        border: none;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
      }

      button.active {
        box-shadow: var(--neumorphism-active);
      }

      button svg {
        width: 100%;
        height: 100%;
      }

      button.active svg {
        transform: scale(0.950);
      }
    `;
    this.shadowRoot.appendChild(style);

    // Button
    this.button = document.createElement("button");    
    this.shadowRoot.appendChild(this.button);
  }
  
  connectedCallback() {
    const icon = this.getAttribute("data-icon");
    
    if (!svgIcons[icon]) {
      throw new error(`Unknown icon: ${icon}`)
    }
    this.button.innerHTML = svgIcons[icon];

    this.button.addEventListener("mousedown", () => {
      this.button.classList.add("active");
    });

    this.button.addEventListener("mouseup", () => {
      this.button.classList.remove("active");
    });
  }
}

export default Button;
