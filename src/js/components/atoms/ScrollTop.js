import cssImportsPath from "@css/imports.css?inline";
import cssScrollTopPath from "@css/components/atoms/scroll-top.css?inline";

import { arrowUp } from "@images/svg-imports";

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
    svgSpan.innerHTML = arrowUp;
    this.shadowRoot.appendChild(svgSpan);
  }
}

export default ScrollTop;
