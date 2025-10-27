import styleImports from "@css/imports.css?inline";
import styleWhiteboard from "@css/components/molecules/whiteboard.css?inline";

class Whiteboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [styleImports, styleWhiteboard].forEach((imports) => {
      const style = document.createElement("style");
      style.textContent = imports
      this.shadowRoot.appendChild(style);
    });
  }

  set data(whiteboard) {
    const container = document.createElement("div");
    container.className = "container";

    const title = document.createElement("h1");
    title.textContent = whiteboard.title;
    title.style.fontSize = "1.8rem";
    container.appendChild(title);

    const ul = document.createElement("ul");
    container.appendChild(ul);

    // Description
    whiteboard.descriptions?.forEach((desc) => {
      const li = document.createElement("li");
      li.classList.add("wc-icon-item");
      ul.appendChild(li);

      const wcIconItem = document.createElement("wc-icon-item");
      wcIconItem.data = {
        icon: desc.icon,
        label: desc.description,
      };

      li.appendChild(wcIconItem);
    });

    this.shadowRoot.appendChild(container);
  }
}

export default Whiteboard;
