class contents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const css = document.createLElement("style"); /*css*/
    css.textContent = `
      .ribbon {
        border: 1px solid #000;
        border-radius: 5px;
        padding: 10px;
        background-color: #f0f0f0;
      }  
    `;
    
    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
    <div class="ribbon">${ribbon}</div>
    `;
    
    this.shadowRoot.appendChild(css);
    this.shadowRoot.appendChild(template.content.clodeNode(true));
  }
}
