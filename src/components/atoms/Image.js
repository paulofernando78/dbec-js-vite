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
    this.shadowRoot.appendChild(cssImports);

    const image = document.createElement("img");
    image.style.width = img.width || "100%";
    image.style.border = "var(--img-border)";
    image.style.borderRadius = "var(--border-radius)";
    image.src = img.src;
    image.alt = img.alt || "";

    this.shadowRoot.appendChild(image);
  }
}

export default Image;
