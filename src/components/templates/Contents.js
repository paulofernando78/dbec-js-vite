class Contents extends HTMLElement {
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
    
    this.shadowRoot.appendChild(css);

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <wc-whiteboard title="Contents"></wc-whiteboard>
      <div class="ribbon">Ribbon</div>
    `;

    this.shadowRoot.appendChild(template.content.clodeNode(true));
  }
}

export default Contents;
