// Atoms
import AudioPlayer from "./atoms/AudioPlayer";
import Note from "./atoms/Note";
import Button from "./atoms/Button";
import Iframe from "./atoms/Iframe";
import Image from "./atoms/Image";
import Ribbon from "./atoms/Ribbon";
import VideoPlayer from "./atoms/VideoPlayer";

// Molecules
import Board from "./molecules/Board";
import DateCard from "./molecules/DateCard";
import Exercise from "./molecules/Exercise";
import IconItem from "./molecules/IconItem";
import Text from "./molecules/Text";
import Whiteboard from "./molecules/Whiteboard";

//Organisms
import Card from "./organisms/Card";
import DictionarySearch from "./organisms/DictionarySearch";
import Footer from "./organisms/Footer";
import FourOhFour from "./organisms/404";
import GameEmulator from "./organisms/GameEmulator";
import Header from "./organisms/Header";
import Layout from "./organisms/Layout";
import NavBar from "./organisms/NavBar";
import StudentDashboard from "./organisms/StudentDashboard";
import UnderConstruction from "./organisms/UnderConstruction";

// Lessons
import TheAlphabet from "./organisms/Lessons/TheAlphabet";

//Templates
import Contents from "./templates/Contents";
import DictionaryContent from "./templates/DictionaryContent";

// Pages
import Feelings from "./organisms/Feelings";
import DataPage from "../pages/data-page";

// ******************************

// Atoms
customElements.define("wc-audio-player", AudioPlayer);
customElements.define("wc-note", Note);
customElements.define("wc-button", Button);
customElements.define("wc-iframe", Iframe);
customElements.define("wc-image", Image);
customElements.define("wc-ribbon", Ribbon);
customElements.define("wc-video-player", VideoPlayer);

// Molecules
customElements.define("wc-board", Board);
customElements.define("wc-date-card", DateCard);
customElements.define("wc-exercise", Exercise);
customElements.define("wc-icon-item", IconItem);
customElements.define("wc-text", Text);
customElements.define("wc-whiteboard", Whiteboard);

// Organisms
customElements.define("wc-card", Card);
customElements.define("wc-dictionary-search", DictionarySearch);
customElements.define("wc-footer", Footer);
customElements.define("wc-four-oh-four", FourOhFour);
customElements.define("wc-game-emulator", GameEmulator);
customElements.define("wc-header", Header);
customElements.define("wc-layout", Layout);
customElements.define("wc-nav-bar", NavBar);
customElements.define("wc-student-dashboard", StudentDashboard);
customElements.define("wc-under-construction", UnderConstruction);

// Lessons
customElements.define("wc-the-alphabet", TheAlphabet);

// Templates
customElements.define("wc-contents", Contents);
customElements.define("wc-dictionary-content", DictionaryContent);

// Pages
customElements.define("wc-feelings", Feelings);
customElements.define("wc-data-page", DataPage);
