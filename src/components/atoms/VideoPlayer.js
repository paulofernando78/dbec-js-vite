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

    // iframe-wrapper created so sticky can be applied
    const css = document.createElement("style"); /*css*/
    css.textContent = `
		.iframe-wrapper {
      display: block;
      width: 100%;
    }	
    
    iframe {
				aspect-ratio: 16 / 9;
        width: 100%;
        border-radius: var(--border-radius)
			}

      @media 
		`;

    const wrapper = document.createElement("div");
    wrapper.classList.add("iframe-wrapper")
    
    const iframe = document.createElement("iframe");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute(
      "allow",
      "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    );
    iframe.src = item.src;
    wrapper.appendChild(iframe)

    this.shadowRoot.append(cssImports, css, wrapper);
  }
}

export default VideoPlayer;
