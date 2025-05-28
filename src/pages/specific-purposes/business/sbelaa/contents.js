import cssImportsPath from "/src/css/imports.css?inline";

class BeginnerContents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    /*css*/
    const css = document.createElement("style");
    css.textContent = `
			p {
				color: green; 
			}
		`;

    /*html*/
    const template = document.createElement("template");
    template.innerHTML = `
      <wc-whiteboard></wc-whiteboard>
			<wc-icon-item><wc-icon-item>
      <p>Test</p>
		`;

    this.shadowRoot.appendChild(css);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default BeginnerContents;
