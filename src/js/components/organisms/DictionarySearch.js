import cssImportsPath from "@css/imports.css?inline";

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
    const dictionaryContainer = document.createElement("div");
    dictionaryContainer.style.backgroundColor = "var(--gray-3)";
    dictionaryContainer.style.display = "flex";
    dictionaryContainer.style.alignItems = "center";
    dictionaryContainer.style.gap = "6px";
    dictionaryContainer.style.marginBottom = "10px";
    dictionaryContainer.style.padding = "var(--padding)";
    dictionaryContainer.style.border = "var(--border)";
    dictionaryContainer.style.borderRadius = "var(--border-radius)";
    dictionaryContainer.style.boxShadow = "var(--box-shadow)";

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
        const pattern = new RegExp(`\\b${word}`, "i");

        const matchedList = allData.flatMap((item) =>
          item.definitions.filter(
            (def) =>
              (def.word && pattern.test(def.word)) ||
              (def.aliases && def.aliases.some((alias) => pattern.test(alias)))
          )
        );
        matchedList.sort(
          (a, b) => (a.word?.length || 0) - (b.word?.length || 0)
        );
        // Avoid searching for very short inputs
        if (word.length < 2) {
          this.showMessage("Please type at least 2 letters to search.");
          return;
        }

        // Show result or not found message
        if (matchedList.length === 0) {
          this.showMessage(`"${word}" hasn’t been added yet`);
        } else {
          this.showResults(matchedList, word);
        }
      });

      // Clear previous results and messages
      const previousResults =
        this.shadowRoot.querySelectorAll(".dictionary-card");
      previousResults.forEach((div) => div.remove());

      const previousMessage = this.shadowRoot.querySelector("p");
      if (previousMessage) previousMessage.remove();
    });

    // Pressing Enter triggers the search button
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        searchButton.click();
      }
    });

    // CLOSE Button
    // Button to close or clear results (currently not wired)
    const closeButton = document.createElement("wc-button");
    closeButton.setAttribute("data-icon", "close");
    closeButton.style.position = "relative";
    closeButton.style.top = "2px";

    closeButton.addEventListener("click", () => {
      const previousResults =
        this.shadowRoot.querySelectorAll(".dictionary-card");
      previousResults.forEach((div) => div.remove());

      const message = this.shadowRoot.querySelector("p");
      if (message) message.remove();
    });

    dictionaryContainer.append(this.input, searchButton, closeButton);
    this.shadowRoot.appendChild(dictionaryContainer);
  }

  // Displays multiple matching results (as many wc-dictionary-content components)
  showResults(results, word) {
    // Remove any previous results
    const existingContents = this.shadowRoot.querySelectorAll(
      "wc-dictionary-content"
    );
    existingContents.forEach((el) => el.remove());

    // Multiple results
    const multipleResults = document.createElement("div");
    multipleResults.classList.add("dictionary-card");
    multipleResults.style.maxHeight = "550px";
    multipleResults.style.backgroundColor = "var(--gray-3)";
    multipleResults.style.borderRadius = "var(--border-radius)";
    multipleResults.style.boxShadow = "var(--box-shadow)";
    multipleResults.style.padding = "var(--padding)";
    multipleResults.style.overflowY = "auto";

    results.forEach((result, index) => {
      const content = document.createElement("wc-dictionary-content");

      content.setData({
        word: result.word || word,
        phonetics: result.phonetics || "",
        partOfSpeech: result.partOfSpeech || "",
        enDefinition: result.enDefinition || "",
        ptDefinition: result.ptDefinition || "",
        examples: result.examples || [],
        videoPlayer: result.videoPlayer || null,
        synonyms: result.synonyms || [],
        antonyms: result.antonyms || [],
        seeAlso: result.seeAlso || [],
        notes: result?.notes || [],
      });

      const dictionaryCard = document.createElement("div");
      if (index !== results.length - 1) {
        dictionaryCard.style.marginBottom = "4px";
      }

      dictionaryCard.appendChild(content);
      multipleResults.appendChild(dictionaryCard);
    });
    this.shadowRoot.appendChild(multipleResults);
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
