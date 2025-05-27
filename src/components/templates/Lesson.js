class Lesson extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    /*css*/
    const css = document.createElement("style");
    css.textContent = `
      

    `;

    this.shadowRoot.appendChild(css);

    const ribbon = this.getAttribute("ribbon")
    const text = this.getAttribute("text")

    /*html*/
    const template = document.createElement("template");
    template.innerHTML = `
      <wc-whiteboard></wc-whiteboard>
      <div>
      <h1>${ribbon}</h1>
      </div>
      <p>${text}</p>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
