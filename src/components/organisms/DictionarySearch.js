import cssImportsPath from "/src/css/imports.css?inline";

class Dictionary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    this.render();
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.style.backgroundColor = "var(--gray-3)";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "6px";
    wrapper.style.marginBottom = "10px";

    wrapper.style.padding = "var(--padding)";
    wrapper.style.border = "var(--border)";
    wrapper.style.borderRadius = "var(--border-radius)";
    wrapper.style.boxShadow = "var(--box-shadow)";

    this.input = document.createElement("input");
    this.input.style.width = "100%";
    this.input.style.borderRadius = "var(--border-radius)";
    this.input.style.border = "none";
    this.input.placeholder = "Search word";
    this.input.style.margin = "0 6px 0 4px";
    this.input.style.padding = "4px";

    const searchButton = document.createElement("wc-button");
    searchButton.setAttribute("data-icon", "search");
    searchButton.style.position = "relative";
    searchButton.style.top = "2px";
    searchButton.style.marginRight = "2px";

    searchButton.addEventListener("click", () => {
      const word = this.input.value.trim().toLowerCase();

      const letter = word[0];

      fetch(`/data/dictionary/${letter}.json`)
        .then((res) => res.json())
        .then((data) => {
          const entry = data.find((item) =>
            item.definitions.some((def) =>
              def.word.toLowerCase().includes(word)
            )
          );

          if (!entry) {
            this.showResult(null, word);
            return;
          }
          const matched = entry.definitions.find((def) =>
            def.word.toLowerCase().includes(word)
          );
          this.showResult(matched, word);
        });
    });

    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        searchButton.click();
      }
    });

    const closeButton = document.createElement("wc-button");
    closeButton.setAttribute("data-icon", "close");
    closeButton.style.position = "relative";
    closeButton.style.top = "2px";

    wrapper.append(this.input, searchButton, closeButton);
    this.shadowRoot.appendChild(wrapper);
  }

  showResult(result, word) {
    const existing = this.shadowRoot.querySelector("wc-dictionary-content");

    if (existing) existing.remove();

    const content = document.createElement("wc-dictionary-content");

    content.setData({
      word: result?.word || word,
      phonetics: result?.phonetics || "",
      partOfSpeech: result?.partOfSpeech || "",
      enDefinition: result?.enDefinition || "",
      ptDefinition: result?.ptDefinition || "",
      examples: result?.examples || [],
      videoPlayer: result?.videoPlayer || null,
    });

    this.shadowRoot.appendChild(content);
  }
}

export default Dictionary;
