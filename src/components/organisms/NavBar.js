class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open"})

    const css = document.createElement("style") /*css*/
    css.textContent = `
      nav {
        
      }
    `
  }
}

export default NavBar