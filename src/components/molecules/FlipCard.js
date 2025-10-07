import cssImportsPath from "/src/css/imports.css?inline";
import cssFlipCardPath from "/src/css/components/molecules/flip-card.css?inline";

class FlipCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImportsPath, cssFlipCardPath].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

    // Container
    const container = document.createElement("div");
    container.className = "container"
    this.shadowRoot.appendChild(container);

    const flipCard = document.createElement("div");
    flipCard.className = "flip-card";

    flipCard.addEventListener("click", () => {
      flipCard.classList.toggle("flipped");
    });

    container.appendChild(flipCard);

    const flipCardInner = document.createElement("div");
    flipCardInner.className = "flip-card-inner";
    flipCard.appendChild(flipCardInner);

    // Front Card
    const flipCardFront = document.createElement("div");
    flipCardFront.className = "flip-card-front";
    flipCardInner.appendChild(flipCardFront);

    const frontImage = document.createElement("img");
    frontImage.className = "front-image";
    flipCardFront.appendChild(frontImage);

    const frontText = document.createElement("span");
    frontText.className = "front-text";
    frontText.textContent = "Front";
    flipCardFront.appendChild(frontText);

    // Back Card
    const flipCardBack = document.createElement("div");
    flipCardBack.className = "flip-card-back";
    flipCardInner.appendChild(flipCardBack);

    const backImage = document.createElement("img");
    flipCardBack.appendChild(backImage);

    const backText = document.createElement("span");
    backText.className = "back-text";
    backText.textContent = "Back";
    flipCardBack.appendChild(backText);

    const board = document.createElement("wc-board");
    container.appendChild(board);
  }

  set data({ ratio, front, back }) {

    const flipCard = this.shadowRoot.querySelector(".flip-card");
    
    if (ratio) {
      flipCard.classList.add(ratio);
    } else {
      flipCard.classList.add("square");
    }

    const frontEl = this.shadowRoot.querySelector(".flip-card-front");
    const backEl = this.shadowRoot.querySelector(".flip-card-back");

    if (front) {
      frontEl.querySelector("img").src =
        front.img || "/assets/images/general/question-mark.gif";
      frontEl.querySelector(".front-image").style.width =
        front.imgWidth || "80px";
      frontEl.querySelector("span").textContent = front.text || "";
    }

    if (back) {
      backEl.querySelector("img").src = back.img || "";
      backEl.querySelector("span").textContent = back.text || "";
    }
  }
}

export default FlipCard;
