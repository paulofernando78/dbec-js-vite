class Layout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open"})

    const style = document.createElement("style"); /*css*/
      style.textContent = `
      
      `;
    
    const template = document.createElement("template"); /*html*/
      template.innerHTML = `
        <nav>
          <p>Teste</p>
        </nav>
      `;
    
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default Layout