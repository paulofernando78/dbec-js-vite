import cssImportsPath from "/src/css/imports.css?inline";

class Image extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(img) {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";

    const image = document.createElement("img");
    image.style.position = "relative";
    image.style.width = img.width || "100%";
    image.style.border = "var(--img-border)";
    image.style.borderRadius = "var(--border-radius)";
    image.src = img.src;
    image.alt = img.alt || "";
    wrapper.appendChild(image);

    if (img.number) {
      const number = document.createElement("span");
      number.style.position = "absolute";
      number.style.border = "1px solid black";
      number.style.background = "white",
      number.style.fontFamily = "courier",
      number.style.fontSize = ".75rem",
      number.style.borderRadius = "4px",
      number.style.padding = "2px 5px",
      number.style.top = "8px",
      number.style.left = "8px",
      number.textContent = img.number;
      wrapper.appendChild(number);
    }

    this.shadowRoot.appendChild(wrapper);
  }
}

export default Image;
