import { sorry } from "../../assets/images/image-imports";

class fourOhfour extends HTMLElement {
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
        <h1>Oops! Page not found!</h1>
        <img src=${sorry} alt="An avatar saying sorry."/>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

export default fourOhfour
