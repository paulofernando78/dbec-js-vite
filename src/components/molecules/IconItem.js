import cssImportsPath from "/src/css/imports.css?inline";
class IconItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      .link-shifted {
        position: relative;
        top: 4.5px
      }
    `;

    this.shadowRoot.append(cssImports, css);
  }

  set data({ icon, link, target, label }) {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "5px";

    const svgSpan = document.createElement("span");

    import("/src/assets/images/svg-imports.js").then((svgIcons) => {
      svgSpan.innerHTML = svgIcons[icon] || "";
    });

    let textElement;

    if (link && label) {
      const anchor = document.createElement("a");
      anchor.href = link;
      if (target) {
        anchor.target = target;
        anchor.rel = "noopener noreferrer";
      }
      anchor.textContent = label;
      // anchor.classList.add("link-shifted");
      textElement = anchor;
    } else {
      const desc = document.createElement("p");
      desc.textContent = label;
      // desc.classList.add("link-shifted");
      textElement = desc;
    }

    li.append(svgSpan, textElement);
    this.shadowRoot.append(li);
  }
}

export default IconItem;
