import cssImportsPath from "/src/css/imports.css?inline";
class IconItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data({ icon, link, label }) {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const li = document.createElement("li");
    li.classList.add("alignment");
    li.style.display = "flex"
    li.style.gap = "5px"
    li.style.alignItems = "center"

    const svgSpan = document.createElement("span");
    svgSpan.style.position = "relative";
    svgSpan.style.top = "3px"

    import("/src/assets/images/svg-imports.js").then((svgIcons) => {
      svgSpan.innerHTML = svgIcons[icon] || "";
    });

    let textElement;

    if (link && label) {
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.textContent = label;
      textElement = anchor;
    } else {
      const desc = document.createElement("p");
      desc.textContent = label;
      textElement = desc
    }

    li.append(svgSpan, textElement);
    this.shadowRoot.append(cssImports, li);
  }
}

export default IconItem;
