
// Atoms
import AudioPlayer from "./atoms/AudioPlayer";
import Button from "./atoms/Button";
import Ribbon from "./atoms/Ribbon"
import Card from "./atoms/Card";
import Paragraph from "./molecules/Paragraph";
import VideoPlayer from "./atoms/VideoPlayer";
import Image from "./atoms/Image";


// Molecules
import IconItem from "./molecules/IconItem"
import Whiteboard from "./molecules/Whiteboard";
import Exercise from "./molecules/Exercise";

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
import Dashboard from "./organisms/dashboard";
import DataPage from "../pages/data-page";

// ******************************

// Atoms
customElements.define("wc-audio-player", AudioPlayer)
customElements.define("wc-button", Button);
customElements.define("wc-ribbon", Ribbon);
customElements.define("wc-card", Card)
customElements.define("wc-paragraph", Paragraph)
customElements.define("wc-video-player", VideoPlayer)
customElements.define("wc-image", Image);

// Molecules
customElements.define("wc-icon-item", IconItem);
customElements.define("wc-whiteboard", Whiteboard);
customElements.define("wc-exercise", Exercise);

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
customElements.define("wc-dashboard", Dashboard);
customElements.define("wc-data-page", DataPage)