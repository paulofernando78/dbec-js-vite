import cssImportsPath from "/src/css/imports.css?inline";

import {
  GifGood,
  GifHappy,
  GifSad,
  GifAngry,
  GifAnnoyed,
  GifCalm,
  GifCrazy,
  GifTired,
  GifAnxious,
  GifBored,
  GifSilly,
  GifScared,
  GifThoughtful,
  GifFrustrated,
  GifDisappointed,
  GifEmbarrassed,
  GifSleepy,
  GifPeaceful,
  GifSick,
  GifThankful,
  GifIDK,

} from "@images/image-imports";

class Welcome extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css*/
    css.textContent = `
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
    this.shadowRoot.appendChild(css);

    // Whiteboard
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
        item: "How are you feeling today? I'm... / I'm feeling...",
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
        img: GifGood,
        word: "good",
      },
      {
        img: GifHappy,
        word: "happy",
      },
      {
        img: GifSad,
        word: "sad",
      },
      {
        img: GifAngry,
        word: "angry",
      },
      {
        img: GifAnnoyed,
        word: "annoyed",
      },
      {
        img: GifCalm,
        word: "calm",
      },
      {
        img: GifCrazy,
        word: "crazy",
      },
      {
        img: GifTired,
        word: "tired",
      },
      {
        img: GifAnxious,
        word: "anxious",
      },
      {
        img: GifBored,
        word: "bored",
      },
      {
        img: GifSilly,
        word: "silly",
      },
      {
        img: GifScared,
        word: "scared",
      },
      {
        img: GifThoughtful,
        word: "thoughtful",
      },
      {
        img: GifFrustrated,
        word: "frustrated",
      },
      {
        img: GifDisappointed,
        word: "disappointed",
      },
      {
        img: GifEmbarrassed,
        word: "embarrassed",
      },
      {
        img: GifSleepy,
        word: "sleepy",
      },
      {
        img: GifPeaceful,
        word: "peaceful",
      },
      {
        img: GifSick,
        word: "sick",
      },
      {
        img: GifThankful,
        word: "thankful",
      },
      {
        img: GifIDK,
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

