import cssImportsPath from "/src/css/imports.css?inline";

import {
  book,
  beginner,
  elementary,
  preIntermediate,
  Intermediate,
  audiobook,
  grammar,
  vocabulary,
  pronunciation,
  songs,
  travel,
  business,
} from "@images/svg-imports";

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

      .section-title {
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
          <li>
          <wc-icon-item svg='${book}' width="30" link="#" item="Placement Test"></wc-icon-item>
          </li>

          <li class="section-title">COURSES</li>
          <li>
          <wc-icon-item svg='${beginner}' link="#" item="Beginner (A1)"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${elementary}' link="#" item="Elementary (A1-A2)"></wc-icon-item></a>
          </li>
          <li>
          <wc-icon-item svg='${preIntermediate}' link="#" item="Pre-Intermediate (A2)"></wc-icon-item></a>
          </li>
          <li>
          <wc-icon-item svg='${Intermediate}' link="#" item="Intermediate (B1)"></wc-icon-item></a>
          </li>

          <li class="section-title">EXTRAS</li>
          <li>
          <wc-icon-item svg='${audiobook}' link="#" item="Audiobooks"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${grammar}' link="#" item="Grammar"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${pronunciation}' link="#" item="Pronunciation"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${songs}' link="#" item="Songs"></wc-icon-item>
          </li>

          <li class="section-title">SPECIFIC PURPOSES</li>
          <li>
          <wc-icon-item svg='${travel}' link="#" item="Travel"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${business}' link="#" item="Business"></wc-icon-item>
          </li>
        </ul>
      </nav>
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default NavBar;
