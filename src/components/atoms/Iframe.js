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
        justify-content: center
      }

      @media (max-width: 600px) {
        iframe {
          width: 100%
        }
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
    iframe.style.width = item.width || "100%";
    iframe.style.height = item.height || "400px";
    iframe.style.border = "1px solid lightgray";
    iframe.style.borderRadius = "var(--border-radius)";
    iframe.style.boxShadow = "var(--box-shadow)";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );
    iframe.src = item.src;

    this.shadowRoot.append(iframe, cssImports);
  }
}

export default Iframe;
