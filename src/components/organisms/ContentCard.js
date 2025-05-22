class ContentCard extends HTMLElement {
  constructor(parameters) {
    super();
    this.attachShadow({ mode: "open"});
  }
}

export default ContentCard;