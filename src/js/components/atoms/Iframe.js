class Iframe extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .background {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: black;
        border-radius: var(--border-radius);
      }

      iframe {
        border-radius: var(--border-radius);
      }
  `;
    this.shadowRoot.appendChild(css);
  }

  set data(item) {
    const cssImports = document.createElement("link");
    cssImports.rel = "stylesheet";
    cssImports.href = "/src/css/imports.css";
    this.shadowRoot.appendChild(cssImports);

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = item.height || "400px";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );
    iframe.src = item.src;

    this.shadowRoot.append(cssImports, iframe);
  }
}

export default Iframe;
