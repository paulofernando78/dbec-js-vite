import "./components/index";

// let header = document.querySelector("wc-header");

// const login = header.shadowRoot.querySelector("[data-icon=login]")
// login.addEventListener("click", () => {
//   const layout = document.createElement("wc-layout");
//   document.body.appendChild(layout)
// })

// const logout = header.shadowRoot.querySelector("[data-icon=logout]");
// logout.style.display = "none"

// const menu = header.shadowRoot.querySelector("[data-icon=menu]")
// menu.style.display = "none";

const phrases = document.querySelector("#home-phrases-display");

const ul = document.createElement("ul");
const li = document.createElement("li");
li.classList.add("greetings");

const style = document.createElement("style"); /*css*/
style.textContent = `
  .greetings {
    list-style-type: none;
    font-family: "Slackey", sans-serif;
    font-size: 1.4rem;
    font-weight: bold;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }
`;

const phraseList = [
  "Hi there!",
  "How are you doing?",
  "How's it going?",
  "What's up?",
  "How are you?",
  "How are you feeling?",
];

let index = 0; //Current index phrase

document.head.appendChild(style);
ul.appendChild(li);
phrases.appendChild(ul);

li.textContent = phraseList[index]; //Updates content

function updatePhrase() {
  // Start with fade out
  li.style.opacity = 0;

  //Wait for the transition to finish (500ms) before changing the text.
  setTimeout(() => {
    index = (index + 1) % phraseList.length; //Displays next phrase
    li.textContent = phraseList[index]; //Updates content
    li.style.opacity = 1; //Fade in new phrase
  }, 500);

}


setInterval(updatePhrase, 2000);
