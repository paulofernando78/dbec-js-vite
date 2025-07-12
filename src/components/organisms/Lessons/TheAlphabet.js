class TheAlphabet extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("link");
    cssImports.rel = "stylesheet";
    cssImports.href = "/src/css/imports.css";
    this.shadowRoot.appendChild(cssImports);

    /*css*/
    const css = document.createElement("style");
    css.textContent = `
			p {
				color: green; 
			}
		`;

    
    const template = document.createElement("template");
    /*html*/
    template.innerHTML = `
			<p>Text via template</p>
		`;

    this.shadowRoot.appendChild(css);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default TheAlphabet;
