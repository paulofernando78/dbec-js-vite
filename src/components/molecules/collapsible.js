import cssImportsPath from "/src/css/imports.css?inline";

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
        background-color: black;
        color: white;
        padding: 2px 5px 2px 7px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 7px
      }

      summary::before {
        display: inline-block;
        content: "➕";
        transition: transform 0.3s ease
      }

      details[open] summary:before {
        content: "➖"
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

    this.content = document.createElement("p");
    this.content.classList.add("content");
    this.details.appendChild(this.content);
  }

  set data(value) {
    this.summary.textContent = value.title;
    this.content.textContent = value.content;
  }
}

export default Collapsible;
