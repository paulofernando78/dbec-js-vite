import { deskCat } from "../../assets/images/image-imports";

class UnderConstruction extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.build();
  }

  build() {
    const css = document.createElement("style"); /*css*/
    css.innerText = `
      div {
        display: flex;
        flex-direction: column;
        align-items: center
      }

      h1 {
        font-size: 1.5rem
      }

      img {
        width: 250px
      }
    `
    this.shadowRoot.appendChild(css)

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <div>
        <h1>I'm trying to finish this site, but my cat won't let me.</h1>
        <img src=${deskCat} alt="An avatar saying sorry."/>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

export default UnderConstruction
