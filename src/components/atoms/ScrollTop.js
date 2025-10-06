import cssImportsPath from "/src/css/imports.css?inline";
import cssScrollTopPath from "/src/css/components/atoms/ScrollTop.css?inline";

import { arrowCircleUp } from "../../assets/images/svg-imports";

class ScrollTop extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImportsPath, cssScrollTopPath].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

    const svgSpan = document.createElement("span");
    svgSpan.className = "scroll-top"
    svgSpan.innerHTML = arrowCircleUp;
    this.shadowRoot.appendChild(svgSpan);
  }
}

export default ScrollTop;
