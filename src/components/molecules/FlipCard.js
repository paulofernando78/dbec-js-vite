import cssImportsPath from "/src/css/imports.css?inline";
import flipCardCssPath from "/src/css/components/molecules/flip-card.css?inline";

class FlipCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    [cssImportsPath, flipCardCssPath].forEach((css) => {
      const style = document.createElement("style");
      style.textContent = css;
      this.shadowRoot.appendChild(style);
    });

    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    flipCard.addEventListener("click", () => {
      flipCard.classList.toggle("flipped");
    });

    this.shadowRoot.appendChild(flipCard);

    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");
    flipCard.appendChild(flipCardInner);

    // Front Card
    const flipCardFront = document.createElement("div");
    flipCardFront.classList.add("flip-card-front");
    flipCardInner.appendChild(flipCardFront);

    const frontImage = document.createElement("img");
    frontImage.classList.add("front-image");
    flipCardFront.appendChild(frontImage);

    const frontText = document.createElement("span");
    frontText.classList.add("front-text");
    frontText.textContent = "Front";
    flipCardFront.appendChild(frontText);

    // Back Card
    const flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardInner.appendChild(flipCardBack);

    const backImage = document.createElement("img");
    flipCardBack.appendChild(backImage);

    const backText = document.createElement("span");
    backText.classList.add("back-text");
    backText.textContent = "Back";
    flipCardBack.appendChild(backText);
  }

  set data({front, back }) {
  
    const frontElem = this.shadowRoot.querySelector(".flip-card-front");
    const backElem = this.shadowRoot.querySelector(".flip-card-back");

    if (front) {
      frontElem.querySelector("img").src = front.img || "";
      frontElem.querySelector(".front-image").style.width =
        front.imgWidth || "100px";
      frontElem.querySelector("span").textContent = front.text || "";
    }

    if (back) {
      backElem.querySelector("img").src = back.img || "";
      backElem.querySelector("span").textContent = back.text || "";
    }
  }
}

export default FlipCard;
