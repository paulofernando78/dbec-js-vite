import cssImportsPath from "/src/css/imports.css?inline";

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const style = document.createElement("style"); /*css*/
    style.textContent = `
      nav {
        border: var(--border);
        border-radius: var(--border-radius);
        padding: var(--padding);
        width: max-content;
        height: 100dvh
      }

      h1 {
        font-size: 1.1rem;
        margin-top: 20px
      }

      @media (max-width: 768px) {
        nav {
          width: 100%;
          height: max-content
        } 
      }
    `;

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <nav>
        <ul>
          <li><a href="">Placement Test</a></li>
          <h1>COURSES</h1>
          <li><a href="/beginner">Beginner (A1)</a></li>
          <li><a href="/elementary">Elementary (A1-A2)</a></li>
          <li><a href="/pre-intermediate">Pre-Intermediate (A2)</a></li>
          <li><a href="/intermediate">Intermediate (B1)</a></li>
          <h1>EXTRAS</h1>
          <li><a href="/audiobooks">Audiobooks</a></li>
          <li><a href="/grammar">Grammar</a></li>
          <li><a href="/pronunciation">Pronunciation</a></li>
          <li><a href="/songs">Songs</a></li>
          <h1>SPECIFIC PURPOSES</h1>
          <li><a href="/travel">Travel</a></li>
          <li><a href="/business">Business</a></li>
        </ul>
      </nav>
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default NavBar;
