import styleImports from "@css/imports.css?inline";
import styleButton from "@css/components/atoms/button.css?inline";

import {
  home,
  login,
  logout,
  menu,
  darkMode,
  lightMode,
  search,
  check,
  visibility,
  visibilityOff,
  reset,
  close,
  save,
} from "@images/svg-imports";

const svgIcons = {
  login: login,
  logout: logout,
  menu: menu,
  darkMode: darkMode,
  lightMode: lightMode,
  search,
  check: check,
  visibility: visibility,
  visibilityOff: visibilityOff,
  reset: reset,
  close: close,
  save: save,
  home: home
};

class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, styleButton].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

    this.button = document.createElement("button");
    this.shadowRoot.appendChild(this.button);
  }

  connectedCallback() {
    const icon = this.getAttribute("data-icon");
    const label = this.getAttribute("data-label");
    const font = this.getAttribute("data-font")
    this.button.textContent = label;
    this.button.style.fontFamily = font

    if (icon && svgIcons[icon]) {
      this.button.innerHTML = svgIcons[icon];
    } else if (label) {
      this.button.textContent = label;
    }

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
