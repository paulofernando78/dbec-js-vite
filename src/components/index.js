
// Atoms
import AudioPlayer from "./atoms/AudioPlayer";
import Button from "./atoms/Button";
import Card from "./atoms/Card";
import Iframe from "./atoms/Iframe";
import Image from "./atoms/Image";
import Ribbon from "./atoms/Ribbon"
import VideoPlayer from "./atoms/VideoPlayer";


// Molecules
import Exercise from "./molecules/Exercise";
import IconItem from "./molecules/IconItem"
import Text from "./molecules/Text";
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
import Dashboard from "./organisms/dashboard";
import DataPage from "../pages/data-page";

// ******************************

// Atoms
customElements.define("wc-audio-player", AudioPlayer)
customElements.define("wc-button", Button);
customElements.define("wc-card", Card)
customElements.define("wc-iframe", Iframe)
customElements.define("wc-image", Image);
customElements.define("wc-ribbon", Ribbon);
customElements.define("wc-video-player", VideoPlayer)

// Molecules
customElements.define("wc-exercise", Exercise);
customElements.define("wc-icon-item", IconItem);
customElements.define("wc-text", Text)
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
customElements.define("wc-dashboard", Dashboard);
customElements.define("wc-data-page", DataPage)