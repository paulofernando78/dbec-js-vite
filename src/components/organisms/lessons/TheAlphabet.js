import cssImportsPath from "/src/css/imports.css?inline";

class TheAlphabet extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    /*css*/
    const css = document.createElement("style");
    css.textContent = ` 
    
    .letter-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
      }

      .letter-wrapper {
        width: 86.66px;
        padding: var(--padding);
        display: flex;
        flex-direction: column;
        gap: 5px;
        border: var(--border); 
        border-radius: var(--border-radius);
        text-align: center
      }

      .number {
        font-size: .8rem
      }

      .letter {
        font-weight: bold
      }

      .letter-audio {
        position: relative;
        left: 2px
      }

      .tip-container {
        padding: var(--padding);
        border: var(--border);
        border-radius: var(--border-radius);
        width: max-content
      }

      .bullet {
        font-weight: bold;
      }
		`;
    this.shadowRoot.appendChild(css);

    const container = document.createElement("div");
    container.classList.add("line-break");
    this.shadowRoot.appendChild(container);

    const ribbon = document.createElement("wc-ribbon");
    ribbon.classList.add("ribbon");
    ribbon.data = {
      icon: "board",
      label: "The Alphabet",
    };
    this.shadowRoot.appendChild(ribbon);

    const title = document.createElement("span");
    title.textContent = "Listen to the alphabet.";
    title.classList.add("title");
    this.shadowRoot.appendChild(title);

    const letterContainer = document.createElement("div");
    letterContainer.classList.add("letter-container");
    this.shadowRoot.appendChild(letterContainer);

    const alphabet = [
      {
        number: "1",
        letter: "A",
        phonetics: "/eɪ/",
        audio: "/assets/audio/alphabet/a.mp3",
      },
      {
        number: "2",
        letter: "B",
        phonetics: "/biː/",
        audio: "/assets/audio/alphabet/b.mp3",
      },
      {
        number: "3",
        letter: "C",
        phonetics: "/siː/",
        audio: "/assets/audio/alphabet/c.mp3",
      },
      {
        number: "4",
        letter: "D",
        phonetics: "/diː/",
        audio: "/assets/audio/alphabet/d.mp3",
      },
      {
        number: "5",
        letter: "E",
        phonetics: "/iː/",
        audio: "/assets/audio/alphabet/e.mp3",
      },
      {
        number: "6",
        letter: "F",
        phonetics: "/ef/",
        audio: "/assets/audio/alphabet/f.mp3",
      },
      {
        number: "7",
        letter: "G",
        phonetics: "/dʒiː/",
        audio: "/assets/audio/alphabet/g.mp3",
      },
      {
        number: "8",
        letter: "H",
        phonetics: "/eɪtʃ/",
        audio: "/assets/audio/alphabet/h.mp3",
      },
      {
        number: "9",
        letter: "I",
        phonetics: "/aɪ/",
        audio: "/assets/audio/alphabet/i.mp3",
      },
      {
        number: "10",
        letter: "J",
        phonetics: "/dʒeɪ/",
        audio: "/assets/audio/alphabet/j.mp3",
      },
      {
        number: "11",
        letter: "K",
        phonetics: "/keɪ/",
        audio: "/assets/audio/alphabet/k.mp3",
      },
      {
        number: "12",
        letter: "L",
        phonetics: "/el/",
        audio: "/assets/audio/alphabet/l.mp3",
      },
      {
        number: "13",
        letter: "M",
        phonetics: "/en/",
        audio: "/assets/audio/alphabet/m.mp3",
      },
      {
        number: "14",
        letter: "N",
        phonetics: "/em/",
        audio: "/assets/audio/alphabet/n.mp3",
      },
      {
        number: "15",
        letter: "O",
        phonetics: "/oʊ/",
        audio: "/assets/audio/alphabet/o.mp3",
      },
      {
        number: "16",
        letter: "P",
        phonetics: "/piː/",
        audio: "/assets/audio/alphabet/p.mp3",
      },
      {
        number: "17",
        letter: "Q",
        phonetics: "/kjuː/",
        audio: "/assets/audio/alphabet/q.mp3",
      },
      {
        number: "18",
        letter: "R",
        phonetics: "/ɑːr/",
        audio: "/assets/audio/alphabet/r.mp3",
      },
      {
        number: "19",
        letter: "S",
        phonetics: "/es/",
        audio: "/assets/audio/alphabet/s.mp3",
      },
      {
        number: "20",
        letter: "T",
        phonetics: "/tiː/",
        audio: "/assets/audio/alphabet/t.mp3",
      },
      {
        number: "21",
        letter: "U",
        phonetics: "/juː/",
        audio: "/assets/audio/alphabet/u.mp3",
      },
      {
        number: "22",
        letter: "V",
        phonetics: "/viː/",
        audio: "/assets/audio/alphabet/v.mp3",
      },
      {
        number: "23",
        letter: "W",
        phonetics: "/ˈdʌb.əl.juː/",
        audio: "/assets/audio/alphabet/w.mp3",
      },
      {
        number: "24",
        letter: "X",
        phonetics: "/eks/",
        audio: "/assets/audio/alphabet/x.mp3",
      },
      {
        number: "25",
        letter: "Y",
        phonetics: "/waɪ/",
        audio: "/assets/audio/alphabet/y.mp3",
      },
      {
        number: "26",
        letter: "Z",
        phonetics: "/ziː/",
        audio: "/assets/audio/alphabet/z.mp3",
      },
    ];

    alphabet.forEach((item) => {
      const letterWrapper = document.createElement("div");
      letterWrapper.classList.add("letter-wrapper");
      letterContainer.appendChild(letterWrapper);

      // letterWrapper.addEventListener("click", () => {
      //   const audio = new Audio(item.audio);
      //   audio.play();
      // });

      const number = document.createElement("span");
      number.textContent = item.number;
      number.classList.add("number");
      letterWrapper.appendChild(number);

      const letter = document.createElement("span");
      letter.textContent = item.letter;
      letter.classList.add("letter");
      letterWrapper.appendChild(letter);

      const phonetics = document.createElement("span");
      phonetics.textContent = item.phonetics;
      phonetics.classList.add("phonetics");
      letterWrapper.appendChild(phonetics);

      const letterAudio = document.createElement("wc-audio");
      letterAudio.classList.add("letter-audio");
      letterAudio.data = { audioSrc: item.audio };
      letterWrapper.appendChild(letterAudio);
    });

    const tips = [
      {
        tip: "Spell the vowels: E, I, A, I, E, A, E, I, A, I",
      },
      {
        audioSrc: "/assets/audio/alphabet/t-tea.mp3",
        tip: "“T” has the same sound as in “tea”",
      },
      {
        audioSrc: "/assets/audio/alphabet/u-you.mp3",
        tip: "“U” has the same sound as in “you”",
      },
      {
        audioSrc: "/assets/audio/alphabet/zed.mp3",
        tip: "“Z” in British is pronounced “zed”",
      }
    ];

    const tipContainer = document.createElement("div");
    tipContainer.classList.add("tip-container");

    tips.forEach((item) => {
      const tip = document.createElement("p");

      if (item.audioSrc) {
        const tipAudio = document.createElement("wc-audio");
        tipAudio.data = { audioSrc: item.audioSrc };
        tip.appendChild(tipAudio);
      }

      const bullet = document.createElement("span");
      bullet.textContent = "• ";
      bullet.classList.add("bullet");
      tip.appendChild(bullet);

      const text = document.createTextNode(item.tip);
      tip.appendChild(text);

      tipContainer.appendChild(tip);
    });

    container.append(ribbon, title, letterContainer, tipContainer);
  }
}

export default TheAlphabet;
