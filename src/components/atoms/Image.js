import cssImportsPath from "/src/css/imports.css?inline";

class Image extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(img) {
    // CSS imports
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;

    const image = document.createElement("img");
    image.src = img.src || "";
    image.alt = img.alt || "";
    image.style.width = img.width || "100%";
    image.style.border = "var(--img-border)"
    image.style.borderRadius = "var(--border-radius)"

    this.shadowRoot.appendChild(cssImports);
    this.shadowRoot.appendChild(image);
  }
}

export default Image;
