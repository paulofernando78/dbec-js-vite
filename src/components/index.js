// Atoms
import Button from "./atoms/Button";
import Ribbon from "./atoms/Ribbon"
import Card from "./atoms/Card";


// Molecules
import IconItem from "./molecules/IconItem"
import Whiteboard from "./molecules/Whiteboard";

//Organisms
import Footer from "./organisms/Footer";
import Header from "./organisms/Header";
import Layout from "./organisms/Layout"
import NavBar from "./organisms/NavBar"

//Templates
import Contents from "./templates/Contents";

// Pages
import Welcome from "./organisms/welcome";

// Courses - Beginner
import BeginnerContentsPage from "../pages/courses/beginner/beginner-contents-page";

// Courses - Elementary

// Courses - Pre-Intermediate

// Courses - Intermmediate

// Extras - Audiobooks

// Extras - Grammar

// Extras - Pronunciation

// Extras - Songs

// Specific Purposes - Travel

// Specific Purposes - Speak Business English like an American

// ******************************

// Atoms
customElements.define("wc-button", Button);
customElements.define("wc-ribbon", Ribbon);
customElements.define("wc-card", Card)

// Molecules
customElements.define("wc-icon-item", IconItem);
customElements.define("wc-whiteboard", Whiteboard);

// Organisms
customElements.define("wc-footer", Footer);
customElements.define("wc-header", Header);
customElements.define("wc-layout", Layout)
customElements.define("wc-navbar", NavBar)

// Templates
customElements.define("wc-contents", Contents)

// Pages
customElements.define("wc-welcome", Welcome);

// Courses - Beginner
customElements.define("wc-beginner-contents-page", BeginnerContentsPage)

// Courses - Elementary

// Courses - Pre-Intermediate

// Courses - Intermmediate

// Extras - Audiobooks

// Extras - Grammar

// Extras - Pronunciation

// Extras - Songs

// Specific Purposes - Travel

// Specific Purposes - Speak Business English like an American