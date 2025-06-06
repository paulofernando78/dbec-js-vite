import cssImportsPath from "/src/css/imports.css?inline";

import {
  dashboard,
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
    this.build();
  }

  build() {
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

    const navLinks = [
      { svg: dashboard, link: "/dashboard", label: "Dashboard" },

      { title: "COURSES" },
      { svg: beginner, link: "/courses/beginner", label: "Beginner (A1)" },
      {
        svg: elementary,
        link: "/courses/elementary",
        label: "Elementary (A1-A2)",
      },
      {
        svg: preIntermediate,
        link: "/courses/pre-intermediate",
        label: "Pre-Intermediate (A2)",
      },
      {
        svg: Intermediate,
        link: "/courses/intermediate",
        label: "Intermediate (B1)",
      },

      { title: "EXTRAS" },
      { svg: audiobook, link: "/courses/audiobooks", label: "Audiobooks" },
      { svg: grammar, link: "/courses/grammar", label: "Grammar" },
      { svg: pronunciation, link: "/pronunciation", label: "Pronunciation" },
      { svg: songs, link: "/courses/songs", label: "Songs" },

      { title: "SPECIFIC PURPOSES" },
      { svg: travel, link: "/courses/travel", label: "Travel" },
      { svg: business, link: "/courses/business", label: "Business" },
    ];

    const template = document.createElement("template"); /*html*/
    template.innerHTML = `
      <nav>
        <ul>
        ${navLinks
          .map((item) =>
            item.title
              ? `<li class="section-title">${item.title}</li>`
              : `<li>
          <wc-icon-item svg='${item.svg}' link="${item.link}" label="${item.label}"></wc-icon-item>
          </li>
        `
          )
          .join("")}
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
        this.classList.remove("open");
      }
    });
  }
}

export default NavBar;
