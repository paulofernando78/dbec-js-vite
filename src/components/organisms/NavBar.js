import cssImportsPath from "/src/css/imports.css?inline";

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

    const css = document.createElement("style"); /*css*/
    css.textContent = `
    nav {
        border: var(--border);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        padding: var(--padding);
        height: 100%;
        overflow: auto
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
    this.shadowRoot.appendChild(css);

    // link list
    const navLinks = [
      {
        icon: "dashboard",
        link: "/dashboard",
        label: "Dashboard",
      },
      { title: "COURSES" },
      {
        icon: "book",
        link: "/courses/beginner",
        label: "Beginner (A1)",
      },
      {
        icon: "book",
        link: "/courses/elementary",
        label: "Elementary (A1-A2)",
      },
      {
        icon: "book",
        link: "/courses/pre-intermediate",
        label: "Pre-Intermediate (A2)",
      },
      {
        icon: "book",
        link: "/courses/intermediate",
        label: "Intermediate (B1)",
      },
      { title: "EXTRAS" },
      {
        icon: "audiobooks",
        link: "/extras/audiobooks",
        label: "Audiobooks",
      },
      {
        icon: "book",
        link: "/extras/grammar",
        label: "Grammar",
      },
      {
        icon: 'vocabulary',
        link: "/extras/vocabulary",
        label: "Vocabulary",
      },
      {
        icon: "pronunciation",
        link: "/extras/pronunciation",
        label: "Pronunciation",
      },
      {
        icon: "songs",
        link: "/extras/songs",
        label: "Songs",
        variant: "songs-svg",
      },
      { title: "SPECIFIC PURPOSES" },
      {
        icon: "travel",
        link: "/specific-purposes/travel",
        label: "Travel",
      },
      {
        icon: "business",
        link: "/specific-purposes/business",
        label: "Business",
      },
    ];

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    navLinks.forEach((item) => {
      if (item.title) {
        const title = document.createElement("li");
        title.style.fontWeight = "bold"
        title.style.marginTop = "20px"
        title.style.paddingLeft = "2px"
        title.textContent = item.title
        ul.appendChild(title)
      } else {
        const li = document.createElement("li")
        if (item.variant === "songs-item") {
          li.classList.add("songs-item")
        }

        const iconItem = document.createElement("wc-icon-item");
        iconItem.setAttribute("link", item.link)
        iconItem.style.fontWeight = "bold"
        iconItem.data = item
        li.appendChild(iconItem);
        ul.appendChild(li)
      }
    })
    

    nav.append(ul)
    this.shadowRoot.appendChild(nav);
  }

  connectedCallback() {
    const currentPath = window.location.pathname;

    const allItems = this.shadowRoot.querySelectorAll("wc-icon-item");
    allItems.forEach((item) => {
      const href = item.getAttribute("link");
      if (href === currentPath) {
        item.style.textDecoration = "underline";
        item.style.textDecorationThickness = "2px";
        item.style.textUnderlineOffset = "2px";
      } else {
        item.style.textDecoration = "none";
      }
    });

    this.shadowRoot.addEventListener("click", (e) => {
      const iconItem = e.target.closest("wc-icon-item");
      if (iconItem) {
        e.preventDefault?.();

        allItems.forEach((item) => (item.style.textDecoration = "none"));
        iconItem.style.textDecoration = "underline";
        iconItem.style.textDecorationThickness = "2px";
        iconItem.style.textUnderlineOffset = "2px";

        const href = iconItem.getAttribute("link");
        // const href = item.data?.link;

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
