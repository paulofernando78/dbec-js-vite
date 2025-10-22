import cssImportsPath from "@css/imports.css?inline";
import cssContentPath from "@css/components/templates/contents.css?inline";

class Contents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImportsPath, cssContentPath].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

    this.addEventListener("anchor-clicked", (e) => {
      const anchor = e.detail.anchor;

      const el = this.shadowRoot.getElementById(anchor);

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  set data(content) {
    this.render(content);
  }

  render(content) {
    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";
    contentContainer.className = "line-break content-container";

    // Whiteboard
    const whiteboard = document.createElement("wc-whiteboard");
    whiteboard.data = content.whiteboard;
    contentContainer.appendChild(whiteboard);

    // Dictionary
    const dictionary = document.createElement("wc-dictionary-search");
    contentContainer.appendChild(dictionary);

    content.contents.forEach((section) => {
      // Board
      if (section.board) {
        const board = document.createElement("wc-board");
        board.data = section.board;
        contentContainer.appendChild(board);
      }

      // Student Dashboard
      if (section.studentDashboard) {
        const studentDashboard = document.createElement("wc-student-dashboard");
        studentDashboard.data = section.studentDashboard;
        contentContainer.appendChild(studentDashboard);
      }

      // Ribbon
      if (section.ribbon) {
        const anchorWrapper = document.createElement("div");

        let anchorId = section.anchor;

        if (!anchorId && section.ribbon && section.ribbon.label) {
          // O ! (negação) transforma qualquer valor falsy em true.
          // Então !anchorId será verdadeiro quando anchorId for: undefined,	null, false, 0, NaN ou uma string vazia ("").
          // !anchorId → verifica se a variável anchorId está vazia (ou seja, undefined, null, "", etc.);
          // Ou seja, “não há anchorId definido” e passa a ser "true". Sendo isso aplicar o que está dentro do if... -> gerar o anchor automaticamente

          anchorId = section.ribbon.label
            .toLowerCase() // Converte todas as letras do texto para minúsculas

            .replace(/\s+/g, "-")
            // \s = espaço, tab, quebra de linha, etc.
            // + = um ou mais desses.
            // g = global, ou seja, em todo o texto.

            .replace(/[^\w-]/g, "");
          // Esse remove tudo que não for uma letra, número, underscore (_) ou hífen (-).
          // [^\w-] = qualquer caractere que não seja (^) uma palavra (\w) ou um hífen.
        }

        if (anchorId) {
          anchorWrapper.id = anchorId;
          anchorWrapper.className = "scroll-anchor";
        }

        // if (section.anchor) {
        //   anchorWrapper.id = section.anchor;
        //   anchorWrapper.className = "scroll-anchor";
        // }

        const ribbon = document.createElement("wc-ribbon");
        ribbon.data = section.ribbon;

        anchorWrapper.appendChild(ribbon);
        contentContainer.appendChild(anchorWrapper);
      }

      //Card
      if (section.card) {
        const card = document.createElement("wc-card");
        card.data = section.card;
        contentContainer.appendChild(card);
      }

      // Text
      if (section.text) {
        const wrapper = document.createElement("div");
        if (section.grid) {
          wrapper.classList.add("text-container");
        }

        section.text.forEach((t) => {
          const text = document.createElement("wc-text");
          text.data = t;
          wrapper.appendChild(text);
        });

        contentContainer.appendChild(wrapper);
      }

      if (section.anchorLink) {
      }

      // Collapsible
      if (section.collapsible) {
        const collapsible = document.createElement("wc-collapsible");
        collapsible.data = section.collapsible;
        contentContainer.appendChild(collapsible);
      }

      // Checking
      if (section.checking) {
        const checkingElement = document.createElement("wc-checking");
        checkingElement.data = section.checking;
        contentContainer.appendChild(checkingElement);
      }

      // Instruction
      if (section.instructions) {
        const instructionElement = document.createElement("wc-instruction");
        instructionElement.data = section.instructions;
        contentContainer.appendChild(instructionElement);
      }

      //Image
      if (section.images) {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("image-wrapper");

        section.images.forEach((img) => {
          const image = document.createElement("wc-image");
          image.data = img;
          imageWrapper.appendChild(image);
        });

        contentContainer.appendChild(imageWrapper);
      }

      //Iframe
      if (section.iframe) {
        const iframe = document.createElement("wc-iframe");

        if (section.iframe.sticky) {
          iframe.classList.add("sticky");
        }
        if (section.iframe.bottomSticky) {
          iframe.classList.add("bottom-sticky");
        }
        iframe.data = section.iframe;
        contentContainer.appendChild(iframe);
      }

      // Audioplayer
      if (section.audioPlayer) {
        const audioPlayer = document.createElement("wc-audio-player");

        if (section.audioPlayer.sticky) {
          audioPlayer.classList.add("sticky");
        }
        audioPlayer.data = section.audioPlayer;
        contentContainer.appendChild(audioPlayer);
      }

      // VideoPlayer
      if (section.videoPlayer) {
        const videoPlayer = document.createElement("wc-video-player");

        if (section.videoPlayer.sticky) {
          videoPlayer.classList.add("sticky");
        }
        videoPlayer.data = section.videoPlayer;
        contentContainer.appendChild(videoPlayer);
      }

      // Component
      if (section.component) {
        const element = document.createElement(section.component);
        contentContainer.appendChild(element);
      }

      // Flip Cards
      if (section.flipCard) {
        const flipCardWrapper = document.createElement("div");
        flipCardWrapper.classList.add("flip-card-container");
        contentContainer.appendChild(flipCardWrapper);

        const p = document.createElement("p");
        p.className = "bold";
        p.textContent = section.flipCard.statement;
        contentContainer.appendChild(p);

        section.flipCard.forEach((item) => {
          const flip = document.createElement("wc-flip-card");
          flip.data = item;
          flipCardWrapper.appendChild(flip);
        });
      }

      // Flip Cards
      if (section.flipCardText) {
        const flipCardWrapper = document.createElement("div");
        flipCardWrapper.classList.add("flip-card-container");
        contentContainer.appendChild(flipCardWrapper);

        const p = document.createElement("p");
        p.className = "bold";
        p.textContent = section.flipCard.statement;
        contentContainer.appendChild(p);

        section.flipCard.forEach((item) => {
          const flip = document.createElement("wc-flip-card");
          flip.data = item;
          flipCardWrapper.appendChild(flip);
        });
      }

      // Flip Cards Retell
      if (section.flipCardBackImage) {
        const p = document.createElement("p");
        p.className = "bold";
        p.textContent =
          "Click or tap to flip the cards to see each part of the story. Can you remember what happened? Retell the story in your own words. Take notes if you like!";
        contentContainer.appendChild(p);

        const flipCardWrapper = document.createElement("div");
        flipCardWrapper.classList.add("flip-card-container");
        contentContainer.appendChild(flipCardWrapper);

        section.flipCardBackImage.forEach((item, index) => {
          const flip = document.createElement("wc-flip-card-back-image");
          flip.data = { ...item, index };
          flipCardWrapper.appendChild(flip);
        });
      }

      // Exercises
      if (section.exercises) {
        const exercise = document.createElement("wc-exercise");
        exercise.data = section.exercises;
        contentContainer.appendChild(exercise);
      }

      // Guess Word
      if (section.guessWord) {
        const guess = document.createElement("wc-guess-word");
        guess.data = section.guessWord;
        contentContainer.appendChild(guess);
      }

      // Hr tag
      if (section.hr) {
        const hr = document.createElement("hr");
        contentContainer.appendChild(hr);
      }

      if (section.dashedHr) {
        const dashedHr = document.createElement("hr");
        dashedHr.className = "dashed-hr";
        contentContainer.appendChild(dashedHr);
      }

      // Game Emulator
      // if (section.gameSrc) {
      //   const game = document.createElement("wc-game-emulator");
      //   game.data = { gameSrc: section.gameSrc };
      //   contentContainer.appendChild(game);
      // }
    });

    this.shadowRoot.appendChild(contentContainer);
  }
}

export default Contents;
