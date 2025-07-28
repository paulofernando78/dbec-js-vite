import cssImportsPath from "/src/css/imports.css?inline";

class Dictionary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    this.render();
  }

  render() {
    const wrapper = document.createElement("div")
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center"
    wrapper.style.gap = "6px"

    wrapper.style.padding = "var(--padding)"
    wrapper.style.border = "var(--border)"
    wrapper.style.borderRadius = "var(--border-radius)"
    wrapper.style.boxShadow = "var(--box-shadow)"
    
    const svgSpan = document.createElement("span")
    import("/src/assets/images/svg-imports.js").then((svgIcons) => {
      svgSpan.innerHTML = svgIcons.search
    })
    
    const input = document.createElement("input")
    input.style.width = "100%"
    input.style.borderRadius = "var(--border-radius)"
    input.placeholder = "Search word"
    input.style.padding = "2px 0 0 4px"
    
    wrapper.appendChild(svgSpan)
    wrapper.appendChild(input)
    this.shadowRoot.appendChild(wrapper)
  }
}

export default Dictionary
