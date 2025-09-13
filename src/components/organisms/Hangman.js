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
      }  
    
      .title {
        display: block;
        margin-bottom: var(--margin-bottom);
        font-family: "Slackey";
        font-size: 2rem;
        text-align: center;
        margin: 30px;
        color: black;
        text-shadow:
        2px 2px 2px white,
        2px 2px 2px black
      }

      .letter-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center
      }

      .letter {
        padding: var(--padding);
      }

      .word-display {
        display: block;
        margin: 40px;
        font-family: "Slackey";
        font-size: 1.3rem;
      }
    `;
    this.shadowRoot.appendChild(css);

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("card");
    this.shadowRoot.appendChild(container);

    const title = document.createElement("span");
    title.classList.add("title");
    title.textContent = "Guess Word!";
    container.appendChild(title);

    const letterContainer = document.createElement("div");
    letterContainer.classList.add("letter-container");
    container.appendChild(letterContainer);

    // Cria um array com as letras de A a Z para os botões
    const letters = Array.from({ length: 26 }, (_, i) => {
      return String.fromCharCode(65 + i);
    });

    // Para cada letra, cria um botão personalizado 'wc-button' com eventos de clique
    letters.forEach((ch) => {
      const letter = document.createElement("wc-button");
      letter.classList.add("letter");
      letter.setAttribute("data-label", ch);
      letter.setAttribute("data-font", "Slackey");

      // Quando o botão for clicado, chama o método handleGuess passando a letra
      letter.addEventListener("click", () => {
        this.handleGuess(ch);
        const btn = letter.shadowRoot.querySelector("button");
        btn.disabled = true;
      });

      letterContainer.appendChild(letter);
    });

    const wordDisplay = document.createElement("span");
    wordDisplay.classList.add("word-display");
    container.appendChild(wordDisplay);
    this.wordDisplay = wordDisplay;

    const reset = document.createElement("wc-button");
    reset.setAttribute("data-icon", "reset");
    reset.addEventListener("click", () => {
      // Reset erros
      this.errors = 0;

      // Reset as letras adivinhadas
      this.guessed = Array(this.currentWord.length).fill("_");

      // Atualiza a exibição da palavra
      this.wordDisplay.textContent = this.guessed.join(" ");

      // Habilita novamente todos os buttons de letras
      const letters = this.shadowRoot.querySelectorAll("wc-button");
      letters.forEach((letter) => {
        letter.shadowRoot.querySelector("button").disabled = false;
      });
    });
    container.appendChild(reset);
  }

  // Método chamado quando o usuário tenta adivinhar uma letra
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
    }

    // Atualiza a exibição da palavra com as letras adivinhadas e underscores
    this.wordDisplay.textContent = this.guessed.join(" ");

    if (this.errors >= this.maxAttempts) {
      alert("Not this time. Try again.");
      disabledAllLetters();
    }

    if (!this.guessed.includes("_")) {
      alert("Congrats");
    }
  }

  disabledAllLetters() {
    const letters = this.shadowRoot.querySelectorAll("wc-button");
    letters.forEach((letter) => {
      letter.shadowRoot.querySelector("button").disabled = true;
    });
  }

  set data(value) {
    // Extrai as palavras válidas do array de objetos recebidos
    this.words = value.map((item) => item.word).filter(Boolean);
    if (!this.words.length) return;

    // Define a palavra atual em maiúsculas
    this.currentWord = this.words[0].toUpperCase();

    this.maxAttempts = Math.min(Math.max(this.currentWord.length * 2, 6), 15);
    this.errors = 0;

    // Inicializa o array de letras adivinhadas com underscores
    this.guessed = Array(this.currentWord.length).fill("_");

    // Exibe a palavra inicial com underscores
    this.wordDisplay.textContent = this.guessed.join(" ");
  }
}

export default Hangman;
