class VideoPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const cssImports = document.createElement("link");
    cssImports.rel = "stylesheet";
    cssImports.href = "/src/css/imports.css";
    this.shadowRoot.appendChild(cssImports);

    const css = document.createElement("style");
    css.textContent = `
			p {
				color: green; 
			}
		`;

    const videoPlayer = document.createElement("video");
    videoPlayer.src = item.src;
    videoPlayer.style.width = "100%";

    this.shadowRoot.appendChild(css);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default VideoPlayer;
