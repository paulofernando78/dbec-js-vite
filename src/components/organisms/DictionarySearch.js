import cssImportsPath from "/src/css/imports.css?inline";

class DictionarySearch extends HTMLElement {
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
    this.input.placeholder = "Dictionary";
    this.input.style.margin = "0 6px 0 4px";
    this.input.style.padding = "4px";

    const searchButton = document.createElement("wc-button");
    searchButton.setAttribute("data-icon", "search");
    searchButton.style.position = "relative";
    searchButton.style.top = "2px";
    searchButton.style.marginRight = "2px";

    searchButton.addEventListener("click", () => {
      const word = this.input.value.trim().toLowerCase();

      // Load all dictionary files (a.json to z.json)
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      const fetches = alphabet.map((letter) =>
        fetch(`/data/dictionary/${letter}.json`)
          .then((res) => (res.ok ? res.json() : []))
          .catch(() => [])
      );

      // Wait for all files to load and search through all definitions
      Promise.all(fetches).then((results) => {
        const allData = results.flat(); // Merge all results into a single array

        // Find all definitions or aliases that match the search word using RegExp for accuracy
        const pattern = new RegExp(`\\b${word}\\b`, "i");

        const matchedList = allData.flatMap((item) =>
          item.definitions.filter(
            (def) =>
              (def.word && pattern.test(def.word)) ||
              (def.aliases && def.aliases.some((alias) => pattern.test(alias)))
          )
        );

        // Avoid searching for very short inputs
        if (word.length < 2) {
          this.showMessage("Please type at least 2 letters to search.");
          return;
        }

        // Show result or not found message
        if (matchedList.length === 0) {
          this.showMessage(`"${word}" not found :(`);
        } else {
          this.showResults(matchedList, word);
        }
      });

      const previousContents = this.shadowRoot.querySelectorAll("wc-dictionary-content");
      previousContents.forEach((el) => el.remove);

      const previuosMessage = this.shadowRoot.querySelector("p") 
      if (previuosMessage) previuosMessage.remove();
    });

    // Pressing Enter triggers the search button
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        searchButton.click();
      }
    });

    // Button to close or clear results (currently not wired)
    const closeButton = document.createElement("wc-button");
    closeButton.setAttribute("data-icon", "close");
    closeButton.style.position = "relative";
    closeButton.style.top = "2px";

    closeButton.addEventListener("click", () => {
      const contents = this.shadowRoot.querySelectorAll(
        "wc-dictionary-content"
      );
      contents.forEach((el) => el.remove());

      const message = this.shadowRoot.querySelector("p");
      if (message) message.remove();
    });

    wrapper.append(this.input, searchButton, closeButton);
    this.shadowRoot.appendChild(wrapper);
  }

  // Displays multiple matching results (as many wc-dictionary-content components)
  showResults(results, word) {
    // Remove any previous results
    const existingContents = this.shadowRoot.querySelectorAll(
      "wc-dictionary-content"
    );
    existingContents.forEach((el) => el.remove());

    // Add each result to the shadow DOM
    results.forEach((result) => {
      const content = document.createElement("wc-dictionary-content");
      content.setData({
        word: result.word || word,
        phonetics: result.phonetics || "",
        partOfSpeech: result.partOfSpeech || "",
        enDefinition: result.enDefinition || "",
        ptDefinition: result.ptDefinition || "",
        examples: result.examples || [],
        videoPlayer: result.videoPlayer || null,
      });
      this.shadowRoot.appendChild(content);
    });
  }

  // Displays a message when no result is found or there's an issue
  showMessage(message) {
    // Remove previous result (if any)
    const existing = this.shadowRoot.querySelector("wc-dictionary-content");
    if (existing) existing.remove();

    // Create and style the message element
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.style.color = "var(--red-4)";
    messageElement.style.fontWeight = "bold";
    messageElement.style.padding = "10px";
    messageElement.style.backgroundColor = "var(--yellow-1)";
    messageElement.style.borderRadius = "var(--border-radius)";
    messageElement.style.marginTop = "10px";

    this.shadowRoot.appendChild(messageElement);
  }
}

export default DictionarySearch;
