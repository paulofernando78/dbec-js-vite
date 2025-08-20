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

class Feelings extends HTMLElement {
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
        padding-bottom: 5px;
        cursor: pointer
      }

      .emoji-img {
        width: 60px
      }

      textarea {
        padding: var(--padding)
      }
    `;
    this.shadowRoot.appendChild(css);

    const container = document.createElement("div");
    container.classList.add("line-break");
    this.shadowRoot.appendChild(container);

    const welcomeAudio = document.createElement("wc-audio-player");
    welcomeAudio.data = { src: "/assets/audio/welcome.mp3" };
    container.appendChild(welcomeAudio);

    const welcome = document.createElement("p");
    welcome.textContent = "Welcome to the Daily Basis English Course. Here you'll find a lot of interesting materials. Use it wisely.";
    container.appendChild(welcome);

    const feelingAudio = document.createElement("wc-audio-player");
    feelingAudio.data = { src: "/assets/audio/how-you-feeling.mp3" };
    container.appendChild(feelingAudio);

    const howYouFeeling = document.createElement("p");
    howYouFeeling.textContent = "How are you feeling today? I'm feeling pretty good. Thanks for asking.";
    container.appendChild(howYouFeeling);

    const emoji = document.createElement("p");
    emoji.textContent = "Click on the emoji to hear the sound.";
    container.appendChild(emoji);

    const gifsContainer = document.createElement("div");
    gifsContainer.classList.add("gifs-container");
    container.appendChild(gifsContainer);

    const emojis = [
      {
        img: GifGood,
        word: "good",
        audio: "/assets/audio/dictionary/good.mp3",
      },
      {
        img: GifHappy,
        word: "happy",
        audio: "/assets/audio/dictionary/happy.mp3",
      },
      {
        img: GifSad,
        word: "sad",
        audio: "/assets/audio/dictionary/sad.mp3",
      },
      {
        img: GifAngry,
        word: "angry",
        audio: "/assets/audio/dictionary/angry.mp3",
      },
      {
        img: GifAnnoyed,
        word: "annoyed",
        audio: "/assets/audio/dictionary/annoyed.mp3",
      },
      {
        img: GifCalm,
        word: "calm",
        audio: "/assets/audio/dictionary/calm.mp3",
      },
      {
        img: GifCrazy,
        word: "crazy",
        audio: "/assets/audio/dictionary/crazy.mp3",
      },
      {
        img: GifTired,
        word: "tired",
        audio: "/assets/audio/dictionary/tired.mp3",
      },
      {
        img: GifAnxious,
        word: "anxious",
        audio: "/assets/audio/dictionary/anxious.mp3",
      },
      {
        img: GifBored,
        word: "bored",
        audio: "/assets/audio/dictionary/bored.mp3",
      },
      {
        img: GifSilly,
        word: "silly",
        audio: "/assets/audio/dictionary/silly.mp3",
      },
      {
        img: GifScared,
        word: "scared",
        audio: "/assets/audio/dictionary/scared.mp3",
      },
      {
        img: GifThoughtful,
        word: "thoughtful",
        audio: "/assets/audio/dictionary/thoughtful.mp3",
      },
      {
        img: GifFrustrated,
        word: "frustrated",
        audio: "/assets/audio/dictionary/frustrated.mp3",
      },
      {
        img: GifDisappointed,
        word: "disappointed",
        audio: "/assets/audio/dictionary/disappointed-2.mp3",
      },
      {
        img: GifEmbarrassed,
        word: "embarrassed",
        audio: "/assets/audio/dictionary/embarrassed.mp3",
      },
      {
        img: GifSleepy,
        word: "sleepy",
        audio: "/assets/audio/dictionary/sleepy.mp3",
      },
      {
        img: GifPeaceful,
        word: "peaceful",
        audio: "/assets/audio/dictionary/peaceful.mp3",
      },
      {
        img: GifSick,
        word: "sick",
        audio: "/assets/audio/dictionary/sick.mp3",
      },
      {
        img: GifThankful,
        word: "thankful",
        audio: "/assets/audio/dictionary/thankful.mp3",
      },
      {
        img: GifIDK,
        word: "I don't know",
        audio: "/assets/audio/dictionary/i-dont-know.mp3",
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

      gifCard.addEventListener("click", () => {
        const audio = new Audio(emoji.audio);
        audio.play();
      });
    });
  }
}

export default Feelings;
