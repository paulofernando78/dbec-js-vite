import cssImportsPath from "@css/imports.css?inline";
import cssFlipCardPath from "@css/components/molecules/flip-card.css?inline";

class FlipCardBackImage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImportsPath, cssFlipCardPath].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

    // Flip Card
    const flipCard = document.createElement("div");
    flipCard.className = "flip-card";

    flipCard.addEventListener("click", () => {
      flipCard.classList.toggle("flipped");
    });

    this.shadowRoot.appendChild(flipCard);

    const flipCardInner = document.createElement("div");
    flipCardInner.className = "flip-card-inner";
    flipCard.appendChild(flipCardInner);

    // Front Card
    const flipCardFront = document.createElement("div");
    flipCardFront.className = "flip-card-front";
    flipCardInner.appendChild(flipCardFront);

    const frontImage = document.createElement("img");
    frontImage.className = "front-image";
    frontImage.src = "/assets/images/general/question-mark.gif";
    flipCardFront.appendChild(frontImage);

    const frontText = document.createElement("span");
    frontText.className = "front-text";
    flipCardFront.appendChild(frontText);

    // Back Card
    const flipCardBack = document.createElement("div");
    flipCardBack.className = "flip-card-back";
    flipCardInner.appendChild(flipCardBack);

    const backImage = document.createElement("img");
    backImage.className = "back-image";
    flipCardBack.appendChild(backImage);
  }

  set data({ index, img }) {
    const flipCard = this.shadowRoot.querySelector(".flip-card");
    flipCard.classList.add("portrait");

    const frontText = this.shadowRoot.querySelector(".front-text");
    const backImage = this.shadowRoot.querySelector(".back-image");

    if (frontText) frontText.textContent = `${index + 1}`;
    if (backImage) backImage.src = img;
  }
}

export default FlipCardBackImage;
