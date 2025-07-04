import cssImportsPath from "/src/css/imports.css?inline";

class Whiteboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(whiteboard) {
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css*/
    css.textContent = `
      .container {
        color: black;
        padding: var(--padding);
        border: 8px solid gray;
        border-radius: 5px;
        box-shadow: var(--box-shadow);
        background-image: url("/assets/images/general/whiteboard.png");
        background-size: cover;
        background-position: center;
        margin-bottom: 20px;
      }

      span {
        display: block;
      }
    `;
    this.shadowRoot.appendChild(css);

    const container = document.createElement("div");
    container.classList.add("container");

    const title = document.createElement("h1");
    title.textContent = whiteboard.title;
    title.style.fontSize = "1.8rem"
    container.appendChild(title);

    // Description
    whiteboard.descriptions?.forEach((desc) => {
      const wcIconItem = document.createElement("wc-icon-item");
      wcIconItem.data = {
        icon: desc.icon,
        label: desc.description,
      };

      container.appendChild(wcIconItem)

      // const descriptionWrapper = document.createElement("div");
      // descriptionWrapper.style.display = "flex"
      // descriptionWrapper.style.alignItems = "center"
      // descriptionWrapper.style.gap = "8px"
      // container.appendChild(descriptionWrapper);

      // const icon = document.createElement("span");
      // icon.innerHTML = svgIcons[desc.icon];
      // descriptionWrapper.appendChild(icon);

      // const description = document.createElement("p");
      // description.textContent = desc.description;
      // descriptionWrapper.appendChild(description);
    });

    this.shadowRoot.appendChild(container);
  }
}

export default Whiteboard;
