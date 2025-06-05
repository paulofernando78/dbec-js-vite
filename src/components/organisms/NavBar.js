import cssImportsPath from "/src/css/imports.css?inline";

import {
  dashboard,
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
        box-shadow: var(--box-shadow);
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
          <wc-icon-item svg='${dashboard}' link="/dashboard" item="Dashboard"></wc-icon-item>
          </li>

          <li class="section-title">COURSES</li>
          <li>
          <wc-icon-item svg='${beginner}' link="/courses/beginner" item="Beginner (A1)"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${elementary}' link="/courses/elementary" item="Elementary (A1-A2)"></wc-icon-item></a>
          </li>
          <li>
          <wc-icon-item svg='${preIntermediate}' link="/courses/pre-intermediate" item="Pre-Intermediate (A2)"></wc-icon-item></a>
          </li>
          <li>
          <wc-icon-item svg='${Intermediate}' link="/courses/intermediate" item="Intermediate (B1)"></wc-icon-item></a>
          </li>

          <li class="section-title">EXTRAS</li>
          <li>
          <wc-icon-item svg='${audiobook}' link="/courses/audiobooks" item="Audiobooks"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${grammar}' link="/courses/grammar" item="Grammar"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${pronunciation}' link="/pronunciation" item="Pronunciation"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${songs}' link="/courses/songs" item="Songs"></wc-icon-item>
          </li>

          <li class="section-title">SPECIFIC PURPOSES</li>
          <li>
          <wc-icon-item svg='${travel}' link="/courses/travel" item="Travel"></wc-icon-item>
          </li>
          <li>
          <wc-icon-item svg='${business}' link="/courses/business" item="Business"></wc-icon-item>
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
        this.classList.remove("open")
      }
    });
  }
}

export default NavBar;
