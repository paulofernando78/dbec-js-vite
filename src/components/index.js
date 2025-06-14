
// Atoms
import AudioPlayer from "./atoms/AudioPlayer";
import Button from "./atoms/Button";
import Ribbon from "./atoms/Ribbon"
import Card from "./atoms/Card";
import Paragraph from "./atoms/Paragraph";


// Molecules
import IconItem from "./molecules/IconItem"
import Whiteboard from "./molecules/Whiteboard";

//Organisms
import Footer from "./organisms/Footer";
import Header from "./organisms/Header";
import Layout from "./organisms/Layout"
import NavBar from "./organisms/NavBar"
import FourOhFour from "./organisms/404";
import UnderConstruction from "./organisms/UnderConstruction";

//Templates
import Contents from "./templates/Contents";

// Pages
import Welcome from "./organisms/welcome";

// Courses
import BeginnerContentsPage from "../pages/courses/beginner/beginner-contents-page";
import ElementaryContentsPage from "../pages/courses/elementary/elementary-contents-page";
import PreIntermediateContentsPage from "../pages/courses/pre-intermediate/pre-intermediate-contents-page";
import IntermediateContentsPage from "../pages/courses/intermediate/intermediate-contents-page";

// Extras
import AudiobooksContentsPage from "../pages/extras/audiobooks/audiobooks-contents-page";
import AudiobooksANewZealandAdventure from "../pages/extras/audiobooks/starter/young-learners-adults/a-new-zealand-adventure"

// Grammar
import GrammarContentsPage from "../pages/extras/grammar/grammar-contents-page";
// Elementary
import GrammarElementary from "../pages/extras/grammar/elementary/grammar-elementary";
// Intermediate
import GrammarIntermediate from "../pages/extras/grammar/intermediate/grammar-intermediate"

// Specific Purposes
import BusinessContentsPage from "../pages/specific-purposes/business/business-contents-page";

// Speak Business English Like an American
import SbelaaContentsPage from "../pages/specific-purposes/business/sbelaa/sbelaa-contents-page";
import SbelaaLesson1 from "../pages/specific-purposes/business/sbelaa/lesson-1";

// ******************************


// Atoms
customElements.define("wc-audio-player", AudioPlayer)
customElements.define("wc-button", Button);
customElements.define("wc-ribbon", Ribbon);
customElements.define("wc-card", Card)
customElements.define("wc-paragraph", Paragraph)

// Molecules
customElements.define("wc-icon-item", IconItem);
customElements.define("wc-whiteboard", Whiteboard);

// Organisms
customElements.define("wc-footer", Footer);
customElements.define("wc-header", Header);
customElements.define("wc-layout", Layout)
customElements.define("wc-navbar", NavBar)
customElements.define("wc-four-oh-four", FourOhFour)
customElements.define("wc-under-construction", UnderConstruction)

// Templates
customElements.define("wc-contents", Contents)

// Pages
customElements.define("wc-welcome", Welcome);

// Courses
customElements.define("wc-beginner-contents-page", BeginnerContentsPage)
customElements.define("wc-elementary-contents-page", ElementaryContentsPage)
customElements.define("wc-pre-intermediate-contents-page", PreIntermediateContentsPage)
customElements.define("wc-intermediate-contents-page", IntermediateContentsPage)

// Extras
customElements.define("wc-audiobooks-contents-page", AudiobooksContentsPage)
customElements.define("wc-audiobooks-a-new-zealand-adventure", AudiobooksANewZealandAdventure)


// Grammar
customElements.define("wc-grammar-contents-page", GrammarContentsPage)
// Elementary
customElements.define("wc-grammar-elementary", GrammarElementary)
// Intermediate
customElements.define("wc-grammar-intermediate", GrammarIntermediate)

// Specific Purposes
customElements.define("wc-business-contents-page", BusinessContentsPage)

// Speak Business English Like an American
customElements.define("wc-sbelaa-contents-page", SbelaaContentsPage)
customElements.define("wc-sbelaa-lesson-1", SbelaaLesson1)