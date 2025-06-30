class VideoPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Sets the video source URL and renders the player.
   * @param {VideoPlayerData} item
   */
  set data(item) {
    this.render(item);
  }

  render(item) {
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

    const iframe = document.createElement("iframe");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );
    iframe.src = item;

    this.shadowRoot.append(cssImports, css, iframe);
  }
}

export default VideoPlayer;
