import cssImportsPath from "/src/css/imports.css?inline";

class Image extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(img) {
    if (!img) {
      this.shadowRoot.innerHTML = "";
      return;
    }

    this.shadowRoot.innerHTML = "";

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css*/
    css.textContent = `
    .wrapper {
      position: relative;
      display: inline-block;
    } 
    
    img {
      position: relative;
      height: auto;
    }

    .wrapper img {
      margin: 0 auto;
      border: var(--img-border);
      border-radius: var(--border-radius);
    }

    figcaption {
      font-size: 0.85rem;
      font-style: italic;
      text-align: center;
      margin-top: 6px;
      color: #555
    }

    .number {
      position: absolute;
      border: 1px solid black;
      background: white;
      font-family: courier;
      font-size: .75rem;
      border-radius: 4px;
      padding: 2px 5px;
      top: 8px;
      left: 8px;
      color: black;
    }

      @media (max-width: 500px) {
        img {
          width: 100% !important;
        }
    }
  }
    `;
    this.shadowRoot.appendChild(css);

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    const image = document.createElement("img");
    if (img.width) {
      image.style.setProperty("width", img.width);
    }

    image.src = img.src;
    image.alt = img.alt || "";
    wrapper.appendChild(image);

    if (img.caption) {
      const caption = document.createElement("figcaption");
      caption.textContent = img.caption;
      wrapper.appendChild(caption);
    }

    if (img.number) {
      const number = document.createElement("span");
      number.classList.add("number");
      number.textContent = img.number;
      wrapper.appendChild(number);
    }

    this.shadowRoot.appendChild(wrapper);
  }
}

export default Image;
