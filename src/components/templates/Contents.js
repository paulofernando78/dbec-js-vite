import cssImportsPath from "/src/css/imports.css?inline";

class Contents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const style = document.createElement("style")
    /*css*/
    style.textContent = `
      wc-audio-player.audio-player {
        position: sticky;
        top: 0;
        z-index: 999
      }
    `
    this.shadowRoot.appendChild(style)
  }

  set data(content) {
    this.render(content);
  }

  render(content) {
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("line-break");

    // Whiteboard
    const whiteboard = document.createElement("wc-whiteboard");
    whiteboard.data = content.whiteboard;
    contentContainer.appendChild(whiteboard);

    // Ribbon
    content.contents.forEach((section) => {
      if (section.ribbon) {
        const ribbon = document.createElement("wc-ribbon");
        ribbon.data = section.ribbon;
        contentContainer.appendChild(ribbon);
      }

      //Card
      if (section.card) {
        const card = document.createElement("wc-card");
        card.data = section.card;
        contentContainer.appendChild(card);
      }

      // Paragraph
      if (section.paragraphs) {
        section.paragraphs.forEach((p) => {
          const paragraph = document.createElement("wc-paragraph");
          paragraph.data = p;
          contentContainer.appendChild(paragraph);
        });
      }

      //Image
      if (section.images) {
        section.images.forEach((img) => {
          const image = document.createElement("wc-image");
          image.data = img;
          contentContainer.appendChild(image)
        });
      }

      // Audioplayer
      if (section.audioPlayer) {
        const audioPlayer = document.createElement("wc-audio-player");
        audioPlayer.classList.add("audio-player")
        audioPlayer.data = section.audioPlayer;
        contentContainer.appendChild(audioPlayer);
      }
    });

    this.shadowRoot.appendChild(contentContainer);
  }
}

export default Contents;
