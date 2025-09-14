import cssImportsPath from "/src/css/imports.css?inline";

class Hangman extends HTMLElement {
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
        flex-direction: column;
        align-items: center;
        gap: 30px
      }  
    
      .title {
        display: block;
        font-family: "Slackey";
        font-size: 2rem;
        text-align: center;
        margin-top: 23px;
        color: black;
        text-shadow:
        2px 2px 2px white,
        2px 2px 2px black
      }

      .image-letters-wrapper {
        display: grid;
        grid-template-columns: auto auto 
      }

      wc-image {
        margin: 0 auto
      }

      .letter-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-start;
      }
      
      .letter {
        padding: var(--padding);
      }

      .attempts-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px;
        margin-inline: 50px
      }

      .attempts {
        width: 30px;
      }

      .word-display {
        display: block;
        font-family: "Slackey";
        font-size: 1.3rem;
      }


      @media (width <= 500px) {
        .image-letters-wrapper {
          display: grid;
          grid-template-columns: 1fr
        }

        .letter-container {
          margin-top: 40px
        }
      }
    `;
    this.shadowRoot.appendChild(css);

    this.wordsArray = [];
    this.currentWordIndex = 0;

    const container = document.createElement("div");
    container.classList.add("container", "card");
    this.shadowRoot.appendChild(container);

    const title = document.createElement("span");
    title.classList.add("title");
    title.textContent = "Guess Word!";
    container.appendChild(title);

    const imageLettersWrapper = document.createElement("div");
    imageLettersWrapper.classList.add("image-letters-wrapper");
    container.appendChild(imageLettersWrapper);

    const image = document.createElement("wc-image");
    this.imageElement = image;
    imageLettersWrapper.appendChild(image);

    const hint = document.createElement("p");
    this.shadowRoot.appendChild(hint);

    this.letterContainer = document.createElement("div");
    this.letterContainer.classList.add("letter-container");
    imageLettersWrapper.appendChild(this.letterContainer);

    const letters = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );

    letters.forEach((ch) => {
      const letter = document.createElement("wc-button");
      letter.classList.add("letter");
      letter.setAttribute("data-label", ch);
      letter.setAttribute("data-font", "Slackey");

      letter.addEventListener("click", () => {
        const btn = letter.shadowRoot.querySelector("button");

        // Só desabilita o botão se a palavra ainda não estiver completa
        if (this.guessed.includes("_")) {
          btn.disabled = true;
        }

        // Atualiza o estado das letras e possivelmente muda de palavra
        this.handleGuess(ch);
      });

      this.letterContainer.appendChild(letter);
    });

    const attempts = document.createElement("div");
    attempts.classList.add("attempts-container");
    container.appendChild(attempts);
    this.attemptsElement = attempts;

    const wordDisplay = document.createElement("span");
    wordDisplay.classList.add("word-display");
    container.appendChild(wordDisplay);
    this.wordDisplay = wordDisplay;

    const reset = document.createElement("wc-button");
    reset.setAttribute("data-icon", "reset");
    reset.addEventListener("click", () => {
      // Reset erros
      this.errors = 0;
      this.renderAttempts();

      // Reset as letras adivinhadas
      this.guessed = Array(this.currentWord.length).fill("_");

      // Atualiza a exibição da palavra
      this.wordDisplay.textContent = this.guessed.join(" ");

      // Habilita novamente todos os buttons de letras
      const letters = this.shadowRoot.querySelectorAll("wc-button.letter");
      letters.forEach((letter) => {
        letter.shadowRoot.querySelector("button").disabled = false;
      });
    });
    container.appendChild(reset);
  }

  renderAttempts() {
    if (!this.attemptsElement) return;

    this.attemptsElement.innerHTML = "";

    for (let i = 0; i < this.maxAttempts; i++) {
      const heart = document.createElement("img");
      heart.classList.add("attempts");
      heart.src =
        i < this.maxAttempts - this.errors
          ? "/assets/images/general/pixel-heart-red.avif"
          : "/assets/images/general/pixel-heart-white.avif";
      this.attemptsElement.appendChild(heart);
    }
  }

  handleGuess(ch) {
    let correct = false;

    // Verifica se a letra clicada está na palavra atual e atualiza o estado das letras adivinhadas
    this.currentWord.split("").forEach((letter, index) => {
      if (letter === ch) {
        this.guessed[index] = ch;
        correct = true;
      }
    });

    if (!correct) {
      this.errors++;
      this.renderAttempts();
    }

    // Atualiza a exibição da palavra com as letras adivinhadas e underscores
    this.wordDisplay.textContent = this.guessed.join(" ");

    if (!this.guessed.includes("_")) {
      alert("Congrats"); // mantém o alert original
      this.currentWordIndex++;

      if (this.currentWordIndex < this.wordsArray.length) {
        // Carrega a próxima palavra normalmente
        this.loadWord(this.wordsArray[this.currentWordIndex]);
      } else {
        // Não há mais palavras → desabilita todos os botões
        this.disabledAllLetters();

        // Pode mostrar mensagem final, opcional
        alert("You completed all words!");
      }
    }

    if (this.errors >= this.maxAttempts) {
      alert("Not this time. Try again."); // mantém o alert original
      this.disabledAllLetters();
    }
  }

  disabledAllLetters() {
    const letters = this.shadowRoot.querySelectorAll("wc-button.letter");
    letters.forEach((letter) => {
      letter.shadowRoot.querySelector("button").disabled = true;
    });
  }

  loadWord(item) {
    if (!item) return;

    if (this.imageElement) {
      this.imageElement.data = null;
    }

    if (item.imageSrc && this.imageElement) {
      this.imageElement.data = {
        src: item.imageSrc,
        alt: item.alt || "Hangman image",
      };
    }

    this.currentWord = item.word.toUpperCase();
    this.maxAttempts = Math.min(Math.max(this.currentWord.length * 2, 4), 15);
    this.errors = 0;
    this.renderAttempts();

    this.guessed = Array(this.currentWord.length).fill("_");

    this.wordDisplay.textContent = this.guessed.join(" ");

    const lettersBtns = this.shadowRoot.querySelectorAll("wc-button.letter");
    lettersBtns.forEach((letter) => {
      const btn = letter.shadowRoot.querySelector("button");
      btn.disabled = false;
    });
  }

  set data(items) {
    if (!items || !items.length) return;

    // Embaralha as palavras
    this.wordsArray = [...items].sort(() => Math.random() - 0.5);
    this.currentWordIndex = 0;

    // Carrega a primeira palavra do array embaralhado
    this.loadWord(this.wordsArray[this.currentWordIndex]);
  }
}

export default Hangman;
