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

      .attempt-words {
        display: block;
        font-family: "Slackey";
        font-size: 1rem;
        text-align: center;
      }

      .image-letters-wrapper {
        display: grid;
        grid-template-columns: 300px auto
        
      }

      .letters-heart-display-wrapper {
        display: flex;
        flex-direction: column;
        gap: 30px
      }

      .letter-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-start;
        margin-left: 5.5px
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
        width: 25px;
      }

      .word-display {
        display: block;
        font-family: "Slackey";
        font-size: 1.3rem;
        text-align: center;
        letter-spacing: 8px
      }

      .messages {
        display: none;
        font-family: "Slackey";
        font-size: 1.3rem;
        text-align: center;
        color: #333;
      }

      .messages.show {
        display: block;
      }

      .messages.congrats {
        color: #28a745;
      }

      .messages.error {
        color: #dc3545;
      }

      .messages.complete {
        color: #007bff;
      }

      @media (width <= 500px) {
        .image-letters-wrapper {
          display: grid;
          grid-template-columns: 1fr
        }

        .letter-container {
          margin: 25px 0 0 0
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

    // Grid 2fr
    const Wrapper = document.createElement("div");
    Wrapper.classList.add("image-letters-wrapper");
    container.appendChild(Wrapper);

    // Left side -
    const wordNunmbersImageWrapper = document.createElement("div");
    wordNunmbersImageWrapper.classList.add("line-break");
    Wrapper.appendChild(wordNunmbersImageWrapper);

    const attemptWords = document.createElement("span");
    attemptWords.classList.add("attempt-words");
    attemptWords.textContent = "";
    wordNunmbersImageWrapper.appendChild(attemptWords);
    this.attemptWords = attemptWords;

    const image = document.createElement("wc-image");
    wordNunmbersImageWrapper.appendChild(image);
    this.imageElement = image;

    // Right side - lettersWrapper
    const lettersWrapper = document.createElement("div");
    lettersWrapper.classList.add("letters-heart-display-wrapper");
    Wrapper.appendChild(lettersWrapper);

    this.letterContainer = document.createElement("div");
    this.letterContainer.classList.add("letter-container");
    lettersWrapper.appendChild(this.letterContainer);

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

        const audio = new Audio(
          `/assets/audio/alphabet/${ch.toLowerCase()}.mp3`
        );
        audio.play();
        this.handleGuess(ch);
      });

      this.letterContainer.appendChild(letter);
    });

    // Hearts
    const attempts = document.createElement("div");
    attempts.classList.add("attempts-container");
    lettersWrapper.appendChild(attempts);
    this.attemptsElement = attempts;

    // "_"
    const wordDisplay = document.createElement("span");
    wordDisplay.classList.add("word-display");
    lettersWrapper.appendChild(wordDisplay);
    this.wordDisplay = wordDisplay;

    const congrats = document.createElement("span");
    congrats.classList.add("messages", "congrats");
    congrats.textContent = "Congrats!";
    lettersWrapper.appendChild(congrats);
    this.congratsMsg = congrats;

    const notThisTime = document.createElement("span");
    notThisTime.classList.add("messages", "error");
    notThisTime.textContent = "Not this time. Try again!";
    lettersWrapper.appendChild(notThisTime);
    this.notThisTimeMsg = notThisTime;

    const wordsCompleted = document.createElement("span");
    wordsCompleted.classList.add("messages", "complete");
    wordsCompleted.textContent = "You've completed all words!";
    lettersWrapper.appendChild(wordsCompleted);
    this.wordsCompletedMsg = wordsCompleted;

    const reset = document.createElement("wc-button");
    reset.setAttribute("data-icon", "reset");
    reset.addEventListener("click", () => {
      // Esconde mensagens
      this.hideAllMessages();

      // Reset erros
      this.errors = 0;
      this.renderAttempts();

      // Reset as letras adivinhadas - corrigido
      this.guessed = this.currentWord
        .split("")
        .map((char) => (char === " " ? " " : "_"));

      // Atualiza a exibição da palavra
      this.wordDisplay.textContent = this.guessed.join("");

      // Habilita novamente todos os buttons de letras
      const letters = this.shadowRoot.querySelectorAll("wc-button.letter");
      letters.forEach((letter) => {
        letter.shadowRoot.querySelector("button").disabled = false;
      });
    });
    container.appendChild(reset);
  }

  hideAllMessages() {
    this.congratsMsg.classList.remove("show");
    this.notThisTimeMsg.classList.remove("show");
    this.wordsCompletedMsg.classList.remove("show");
  }

  showMessage(messageElement, duration = 3000) {
    this.hideAllMessages();
    messageElement.classList.add("show");

    if (duration > 0) {
      setTimeout(() => {
        messageElement.classList.remove("show");
      }, duration);
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
    this.wordDisplay.textContent = this.guessed.join("");

    if (!this.guessed.includes("_")) {
      this.showMessage(this.congratsMsg, 2000);
      this.currentWordIndex++;

      if (this.currentWordIndex < this.wordsArray.length) {
        // Carrega a próxima palavra após um delay
        setTimeout(() => {
          this.loadWord(this.wordsArray[this.currentWordIndex]);
        }, 2000);
      } else {
        // Não há mais palavras → desabilita todos os botões
        this.disabledAllLetters();

        setTimeout(() => {
          this.showMessage(this.wordsCompletedMsg, 0); // 0 = não remove automaticamente
        }, 2000);
      }
    }

    // 0 = não remove automaticamente
    if (this.errors >= this.maxAttempts) {
      this.showMessage(this.notThisTimeMsg, 0);
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

    // Esconde mensagens ao carregar nova palavra
    this.hideAllMessages();

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

    this.guessed = this.currentWord
      .split("")
      .map((char) => (char === " " ? " " : "_"));

    this.wordDisplay.textContent = this.guessed.join("");

    const lettersBtns = this.shadowRoot.querySelectorAll("wc-button.letter");
    lettersBtns.forEach((letter) => {
      const btn = letter.shadowRoot.querySelector("button");
      btn.disabled = false;
    });

    if (this.attemptWords) {
      this.attemptWords.textContent = `Words: ${this.currentWordIndex + 1} / ${
        this.wordsArray.length
      }`;
    }
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
