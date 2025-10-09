import cssImportsPath from "/src/css/imports.css?inline";
import cssIconItemPath from "/src/css/components/molecules/icon-item.css?inline";

class IconItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImportsPath, cssIconItemPath].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      :host {
        display: flex;
        // align-items: center;
        gap: 5px
      }

      :host(:not(:first-child)) {
      // margin-bottom: 5px
      }
    `;

    this.addEventListener("click", (e) => {
      // Só dispara se for um link anchor e se _data existe
      if (this._data?.link?.startsWith("#")) {
        e.preventDefault(); // Previne navegação padrão

        this.dispatchEvent(
          new CustomEvent("anchor-clicked", {
            detail: { anchor: this._data.link.replace("#", "") },
            bubbles: true,
            composed: true,
          })
        );
      }
    });

    this.shadowRoot.append(css);
  }

  set data({ icon, link, target, label }) {
    this._data = { icon, link, target, label }; // Salva internamente

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
      const desc = document.createElement("span");
      desc.className = "label"
      desc.textContent = label;
      // desc.classList.add("link-shifted");
      textElement = desc;
    }

    this.shadowRoot.append(svgSpan, textElement);
  }
}

export default IconItem;
