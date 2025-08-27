import cssImportsPath from "/src/css/imports.css?inline";

class Contents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("style");
    cssImports.textContent = cssImportsPath;
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    /*css*/
    css.textContent = `
      wc-dictionary-search {
        position: sticky;
        top: 0;
        z-index: 2
      }

      wc-audio-player.sticky, wc-video-player.sticky, wc-iframe.sticky {
        position: sticky;
        top: 58px;
        z-index: 1
      }

      // wc-iframe {
      //   margin: 0 auto
      // }

      .image-wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 6px
      }

      .text-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, 250px);
        justify-content: center;
        gap: 6px
      }

      @media () {
        .paragraph-flex {
        display: grid;
        grid-template-columns: 1fr;
      }
      }
    `;
    this.shadowRoot.appendChild(css);
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

      // Text
      if (section.text) {
        const wrapper = document.createElement("div");
        if (section.grid) {
          wrapper.classList.add("text-grid");
        }

        section.text.forEach((t) => {
          const text = document.createElement("wc-text");
          text.data = t;
          wrapper.appendChild(text);
        });

        contentContainer.appendChild(wrapper);
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

      // Exercises
      if (section.exercises) {
        const exercise = document.createElement("wc-exercise");
        exercise.data = section.exercises;
        contentContainer.appendChild(exercise);
      }

      if (section.component) {
        const element = document.createElement(section.component);
        contentContainer.appendChild(element);
      }

      // Game Emulator
      // if (section.gameSrc) {
      //   const game = document.createElement("wc-game-emulator");
      //   game.data = { gameSrc: section.gameSrc };
      //   contentContainer.appendChild(game);
      // }

      // Hr tag
      if (section.hr) {
        const hr = document.createElement("hr");
        contentContainer.appendChild(hr);
      }
    });

    this.shadowRoot.appendChild(contentContainer);
  }
}

export default Contents;
