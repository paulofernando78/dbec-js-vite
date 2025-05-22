const template = document.createElement("template"); /*html*/
template.innerHTMK = `
  <div class="ribbon">${ribbon}</div>

`;

class contents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createLElement("style"); /*css*/
    style.textContent = `
      .ribbon {
        border: 1px solid #000;
        border-radius: 5px;
        padding: 10px;
        background-color: #f0f0f0;
      }  
    `;

    this.shadowRoot.appendChild(template.content.clodeNode(true));
  }
}
