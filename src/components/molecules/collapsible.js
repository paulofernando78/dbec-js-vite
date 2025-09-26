import cssImportsPath from "/src/css/imports.css?inline";
import { plus, minus } from "/src/assets/images/svg-imports";

class Collapsible extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
          /* remove marcador */
      summary {
        list-style: none
      }

      /* remove seta no Chrome/Safari */
      summary::webkit-details-marker {
        display: none
      }
      
      /* remove seta no Firefox */
      summary::marker {
        content: "";             
      }
      
      details {
        border: 1px solid gray;
        border-radius: var(--border-radius)
      }  
    
      summary {
        user-select: none;
        min-height: 31px;
        background-color: gray;
        color: white;
        font-weight: bold;
        padding: 1px 5px 1px 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 7px
      }

      .content {
        user-select: none;
        padding: 4px 5px 2px 5px
      }
    `;
    this.shadowRoot.appendChild(css);

    this.details = document.createElement("details");
    this.shadowRoot.appendChild(this.details);

    this.summary = document.createElement("summary");
    this.details.appendChild(this.summary);

    this.icon = document.createElement("span");
    this.icon.innerHTML = plus
    this.summary.prepend(this.icon)

    this.titleSpan = document.createElement("span");
    this.summary.appendChild(this.titleSpan)

    this.details.addEventListener("toggle", () => {
      this.icon.innerHTML = this.details.open ? minus : plus
    })

    this.content = document.createElement("p");
    this.content.classList.add("content");
    this.details.appendChild(this.content);
  }

  set data(value) {
    this.titleSpan.textContent = value.title;
    this.content.textContent = value.content;
  }
}

export default Collapsible;
