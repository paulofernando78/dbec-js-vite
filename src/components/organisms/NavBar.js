import cssImportsPath from "/src/css/imports.css?inline";

import {
  dashboard,
  beginner,
  elementary,
  preIntermediate,
  intermediate,
  audiobooks,
  assignment,
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
    // css Imports
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    /*css*/
    const css = `
      nav {
        border: var(--border);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        padding: var(--padding);
        height: 100%;
        overflow: auto
      }

      .section-title {
        font-size: 1.1rem;
        margin-top: 20px;
        padding-left: 2px
      }

      wc-icon-item {
        font-weight: bold
      }

      li.songs-item {
        position: relative;
        top: 5px
      }

      @media (max-width: 768px) {
        nav {
          width: 100%;
          height: max-content;
        }
      }
    `;

    // link list
    const navLinks = [
      {
        svg: dashboard,
        link: "/dashboard",
        label: "Dashboard",
      },
      { title: "<b>COURSES</b>" },
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
        svg: intermediate,
        link: "/courses/intermediate",
        label: "Intermediate (B1)",
      },
      { title: "<b>EXTRAS</b>" },
      {
        svg: audiobooks,
        link: "/extras/audiobooks",
        label: "Audiobooks",
      },
      {
        svg: assignment,
        link: "/extras/grammar",
        label: "Grammar",
      },
      {
        svg: pronunciation,
        link: "/extras/pronunciation",
        label: "Pronunciation",
      },
      {
        svg: songs,
        link: "/extras/songs",
        label: "Songs",
        variant: "songs-svg",
      },
      { title: "<b>SPECIFIC PURPOSES</b>" },
      {
        svg: travel,
        link: "/specific-purposes/travel",
        label: "Travel",
      },
      { svg: business, link: "/specific-purposes/business", label: "Business" },
    ];

    /*html*/
    this.shadowRoot.innerHTML = `
    <style>${cssImportsPath}</style>
    <style>${css}</style>
      <nav>
        <ul>
        ${navLinks
          .map((item) =>
            item.title
              ? `<li class="section-title">${item.title}</li>`
              : `<li class="${item.className || ""}"><wc-icon-item svg='${
                  item.svg
                }' variant=${item.variant} link="${item.link}" label="${
                  item.label
                }"></wc-icon-item></li>
          `
          )
          .join("")}
         </ul>
      </nav>
    `;
  }

  connectedCallback() {
    const currentPath = window.location.pathname;
    
     const allItems = this.shadowRoot.querySelectorAll("wc-icon-item");
        allItems.forEach((item) => {
          const href = item.getAttribute("link");
          if (href === currentPath) {
            item.style.textDecoration = "underline";
          } else {
            item.style.textDecoration = "none";
          }
        });

    this.shadowRoot.addEventListener("click", (e) => {
      const iconItem = e.target.closest("wc-icon-item");
      if (iconItem) {
        e.preventDefault?.();

        allItems.forEach((item) => item.style.textDecoration = "none");
        iconItem.style.textDecoration = "underline"

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
