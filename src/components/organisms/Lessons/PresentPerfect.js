import cssImportsPath from "/src/css/imports.css?inline";

class PresentPerfect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `

    .container {
      display: flex;
      gap: 8px

    }
      .title {
        display: block;
        font-weight: bold;
        margin-bottom: 16px
      }
    `;
    this.shadowRoot.appendChild(css);

    const container = document.createElement("div");
    container.classList.add("container")
    this.shadowRoot.appendChild(container);

    const form = [
      {
        title: "Present",
        examples: [
          {
            text: "I have...",
          },
          {
            text: "you have...",
          },
          {
            text: "he has...",
          },
          {
            text: "she has...",
          },
          {
            text: "it has...",
          },
          {
            text: "we have...",
          },
          {
            text: "you have...",
          },
          {
            text: "they have...",
          },
        ],
      },
      {
        title: "Negative",
        examples: [
          {
            text: "I have not / haven’t...",
          },
          {
            text: "you havenot / haven’t...",
          },
          {
            text: "he has not / hasn’t...",
          },
          {
            text: "she has not / hasn’t...",
          },
          {
            text: "it has not / hasn’t...",
          },
          {
            text: "we havenot / haven’t...",
          },
          {
            text: "you havenot / haven’t...",
          },
          {
            text: "they havenot / haven’t...",
          },
        ],
      },
      {
        title: "Negative",
        examples: [
          {
            text: "Have you... ?",
          },
          {
            text: "Has he.. ?.",
          },
          {
            text: "Has she... ?",
          },
          {
            text: "Has it... ?",
          },
          {
            text: "Have we... ?",
          },
          {
            text: "Have you... ?",
          },
          {
            text: "Have they... ?",
          },
        ],
      },
    ];

    form.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      this.shadowRoot.appendChild(card);
      container.appendChild(card)

      const title = document.createElement("span");
      title.classList.add("title");
      title.textContent = item.title;
      card.appendChild(title);

      item.examples.forEach((subItems) => {
        const text = document.createElement("p");
        text.textContent = subItems.text;
        card.appendChild(text);
      });
    });
  }
}

export default PresentPerfect;
