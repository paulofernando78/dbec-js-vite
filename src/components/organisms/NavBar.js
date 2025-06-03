import cssImportsPath from "/src/css/imports.css?inline";

import {
  book,
  beginner,
  elementary,
  preIntermediate,
  Intermediate,
  audiobook,
  grammar,
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

    const css = document.createElement("style"); /*css*/
    css.textContent = `
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

    this.shadowRoot.appendChild(css);

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <nav>
        <ul>
          <li>
          <wc-icon-item svg='${book}' width="30" link="#" item="Placement Test"></wc-icon-item>
          </li>

          <li class="section-title">COURSES</li>
          <li>
          <wc-icon-item svg='${beginner}' link="/courses/beginner" item="Beginner (A1)"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${elementary}' link="/elementary" item="Elementary (A1-A2)"></wc-icon-item></a>
          </li>
          <li>
          <wc-icon-item svg='${preIntermediate}' link="/pre-intermediate" item="Pre-Intermediate (A2)"></wc-icon-item></a>
          </li>
          <li>
          <wc-icon-item svg='${Intermediate}' link="/intermediate" item="Intermediate (B1)"></wc-icon-item></a>
          </li>

          <li class="section-title">EXTRAS</li>
          <li>
          <wc-icon-item svg='${audiobook}' link="/audiobooks" item="Audiobooks"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${grammar}' link="/grammar" item="Grammar"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${pronunciation}' link="/pronunciation" item="Pronunciation"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${songs}' link="/songs" item="Songs"></wc-icon-item>
          </li>

          <li class="section-title">SPECIFIC PURPOSES</li>
          <li>
          <wc-icon-item svg='${travel}' link="/travel" item="Travel"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${business}' link="/business" item="Business"></wc-icon-item>
          </li>
        </ul>
      </nav>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.addEventListener("click", (e) => {
      const iconItem = e.target.closest("wc-icon-item");
      if (iconItem) {
        e.preventDefault?.();

        const href = iconItem.getAttribute("link");

        this.dispatchEvent(
          new CustomEvent("navigate", {
            detail: href,
            bubbles: true,
            composed: true,
          })
        );
      }
    });
  }
}

export default NavBar;
