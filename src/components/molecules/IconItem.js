import cssImportsPath from "/src/css/imports.css?inline";
class IconItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data({ icon, link, label, variant }) {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css*/
    css.textContent = `
    .alignment {
      display: flex;
      gap: 5px;
      // align-items: center;
    }

    .svg {
      min-width: 24px;
    }

    a {
      position: relative;
      top: 1px
    }

    .svg.songs-svg {
      position: relative;
      top: 2px
    }
  `;
    this.shadowRoot.appendChild(css);

    const li = document.createElement("li");
    li.classList.add("alignment");

    const svgSpan = document.createElement("span");
    svgSpan.className = `svg ${variant || ""}`;

    import("/src/assets/images/svg-imports.js").then((svgIcons) => {
      // console.log("icon:", icon, svgIcons[icon]);
      svgSpan.innerHTML = svgIcons[icon] || "";
    });

    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.textContent = label;

    li.append(svgSpan, anchor);
    this.shadowRoot.append(cssImports, css, li);
  }
}

export default IconItem;
