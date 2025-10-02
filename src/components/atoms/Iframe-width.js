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

      @media (max-width: 600px) {
        iframe {
          height: 300px!important
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

    const background = document.createElement("div")
    background.classList.add("background")

    const iframe = document.createElement("iframe");
    iframe.style.width = item.width;
    iframe.style.height = item.height || "400px";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );
    iframe.src = item.src;
    background.appendChild(iframe)

    this.shadowRoot.append(cssImports, background);
  }
}

export default Iframe;
