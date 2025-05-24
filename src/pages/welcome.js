import cssImportsPath from "/src/css/imports.css?inline";

class Welcome extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const style = document.createElement("style"); /*css*/
    style.textContent = `
      p {
          font-weight: bold;
      }

      .gifs-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, 120px);
        justify-content: center;
        gap: 10px;
      }
      
      .gif-card {
        border: var(--border);
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: max-content;
        padding-bottom: 5px
      }

      .emoji-img {
        width: 60px
      }
    `;
    this.shadowRoot.appendChild(style);

    const board = document.createElement("wc-whiteboard");
    board.items = {
      title: "Dashboard",
    };
    this.shadowRoot.appendChild(board);

    const container = document.createElement("div");
    container.classList.add("line-break");
    this.shadowRoot.appendChild(container);

    const texts = [
      {
        item: "Welcome to the Daily Basis English Course. Here you'll find a lot of interesting materials. Use it wisely.",
      },
      {
        item: "How are you feeling today? I'm / I'm feeling...",
      },
    ];

    texts.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text.item;
      container.appendChild(p);
    });

    const gifsContainer = document.createElement("div");
    gifsContainer.classList.add("gifs-container");
    container.appendChild(gifsContainer);

    const emojis = [
      {
        img: "/src/assets/images/gifs/emoji/good.gif",
        word: "good",
      },
      {
        img: "/src/assets/images/gifs/emoji/happy.gif",
        word: "happy",
      },
      {
        img: "/src/assets/images/gifs/emoji/sad.gif",
        word: "sad",
      },
      {
        img: "/src/assets/images/gifs/emoji/angry.gif",
        word: "angry",
      },
      {
        img: "/src/assets/images/gifs/emoji/annoyed.gif",
        word: "annoyed",
      },
      {
        img: "/src/assets/images/gifs/emoji/calm.gif",
        word: "calm",
      },
      {
        img: "/src/assets/images/gifs/emoji/crazy.gif",
        word: "crazy",
      },
      {
        img: "/src/assets/images/gifs/emoji/tired.gif",
        word: "tired",
      },
      {
        img: "/src/assets/images/gifs/emoji/anxious.gif",
        word: "anxious",
      },
      {
        img: "/src/assets/images/gifs/emoji/bored.gif",
        word: "bored",
      },
      {
        img: "/src/assets/images/gifs/emoji/silly.gif",
        word: "silly",
      },
      {
        img: "/src/assets/images/gifs/emoji/scared.gif",
        word: "scared",
      },
      {
        img: "/src/assets/images/gifs/emoji/thoughtful.gif",
        word: "thoughtful",
      },
      {
        img: "/src/assets/images/gifs/emoji/frustrated.gif",
        word: "frustrated",
      },
      {
        img: "/src/assets/images/gifs/emoji/disappointed.gif",
        word: "disappointed",
      },
      {
        img: "/src/assets/images/gifs/emoji/embarrassed.gif",
        word: "embarrassed",
      },
      {
        img: "/src/assets/images/gifs/emoji/sleepy.gif",
        word: "sleepy",
      },
      {
        img: "/src/assets/images/gifs/emoji/peaceful.gif",
        word: "peaceful",
      },
      {
        img: "/src/assets/images/gifs/emoji/thankful.gif",
        word: "thankful",
      },
      {
        img: "/src/assets/images/gifs/emoji/sick.gif",
        word: "sick",
      },
      {
        img: "/src/assets/images/gifs/emoji/i-dont-know.gif",
        word: "I don't know",
      },
    ];

    emojis.forEach((emoji) => {
      const gifCard = document.createElement("div");
      gifCard.classList.add("gif-card");
      gifsContainer.appendChild(gifCard);

      const img = document.createElement("img");
      img.classList.add("emoji-img");
      img.src = emoji.img;
      gifCard.appendChild(img);

      const emojiName = document.createElement("span");
      // emojiName.classList.add("emoji-name")
      emojiName.textContent = emoji.word;
      gifCard.appendChild(emojiName);
    });
  }
}

export default Welcome;

customElements.define("wc-welcome", Welcome);
