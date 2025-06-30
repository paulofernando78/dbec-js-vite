import { login, logout, menu, darkMode, lightMode, check, visibility, visibilityOff, reset } from "@images/svg-imports";

const svgIcons = {
  login: login,
  logout: logout,
  menu: menu,
  darkMode: darkMode,
  lightMode: lightMode,
  check: check,
  visibility: visibility,
  visibilityOff: visibilityOff,
  reset: reset
};

class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.build();
  }

  build() {
    const css = document.createElement("style"); /*css*/
    css.textContent = `
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
    this.shadowRoot.appendChild(css);

    this.button = document.createElement("button");
    this.shadowRoot.appendChild(this.button);
  }

  connectedCallback() {
    const icon = this.getAttribute("data-icon");

    if (!svgIcons[icon]) {
      throw new error(`Unknown icon: ${icon}`);
    }
    this.button.innerHTML = svgIcons[icon];

    // blur
    this.button.addEventListener("blur", () => {
      this.button.classList.remove("active");
    });

    this.button.addEventListener("keydown", () => {
      this.button.classList.add("active");
    });

    this.button.addEventListener("keyup", () => {
      this.button.classList.remove("active");
    });

    this.button.addEventListener("mousedown", () => {
      this.button.classList.add("active");
    });

    this.button.addEventListener("mouseup", () => {
      this.button.classList.remove("active");
    });

    this.button.addEventListener("touchstart", () => {
      this.button.classList.add("active");
    });

    this.button.addEventListener("touchend", () => {
      this.button.classList.remove("active");
    });
  }

  setIcon(iconName) {
    if (!svgIcons[iconName]) {
      throw new Error(`Unknown icon: $(iconName)`);
    }
    this.button.innerHTML = svgIcons[iconName];
    this.setAttribute("data-icon", iconName);
  }
}

export default Button;
