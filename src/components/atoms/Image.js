import cssImportsPath from "/src/css/imports.css?inline";
import cssImagePath from "/src/css/components/atoms/image.css?inline";

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

    [cssImportsPath, cssImagePath].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

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
