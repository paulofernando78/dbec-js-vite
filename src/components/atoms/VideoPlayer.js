class VideoPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("link");
    cssImports.rel = "stylesheet";
    cssImports.href = "/src/css/imports.css";
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style"); /*css*/
    css.textContent = `
			iframe {
				aspect-ratio: 16 / 9;
        width: 100%;
        // border: none;
        border-radius: var(--border-radius)

			}
		`;

    this.videoPlayer = document.createElement("iframe");
    this.videoPlayer.setAttribute("frameborder", "0");
    this.videoPlayer.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );

    this.shadowRoot.append(cssImports, css, this.videoPlayer);
  }

  set data(item) {
    this.render(item);
  }

  render(item) {
    this.videoPlayer.src = item;
  }
}

export default VideoPlayer;
