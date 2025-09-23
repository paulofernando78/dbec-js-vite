// Atoms
import Audio from "./atoms/Audio";
import AudioPlayer from "./atoms/AudioPlayer";
import Note from "./atoms/Note";
import Button from "./atoms/Button";
import Iframe from "./atoms/Iframe";
import Image from "./atoms/Image";
// Ribbons
import Ribbon from "./atoms/Ribbons/Ribbon";
import Introduction from "./atoms/Ribbons/Introduction";
import Presentation from "./atoms/Ribbons/Presentation";
import MeaningPronunciation from "./atoms/Ribbons/MeaningPronunciation";
import Form from "./atoms/Ribbons/Form";
import Practice from "./atoms/Ribbons/Practice";
import LCWP from "./atoms/Ribbons/LCWP";
import LCOP from "./atoms/Ribbons/LCOP";

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
import Hangman from "./organisms/Hangman";
import Header from "./organisms/Header";
import Layout from "./organisms/Layout";
import NavBar from "./organisms/NavBar";
import StudentDashboard from "./organisms/StudentDashboard";
import UnderConstruction from "./organisms/UnderConstruction";

// Lessons
import CommonQuestions from "./organisms/CommonQuestions";
import PresentPerfect from "./organisms/Lessons/PresentTense/PresentPerfect";
import TheAlphabet from "./organisms/Lessons/TheAlphabet";

//Templates
import Contents from "./templates/Contents";
import DictionaryContent from "./templates/DictionaryContent";

// Pages
import Feelings from "./organisms/Feelings";
import DataPage from "../pages/data-page";

// ******************************

// Atoms
customElements.define("wc-audio", Audio);
customElements.define("wc-audio-player", AudioPlayer);
customElements.define("wc-note", Note);
customElements.define("wc-button", Button);
customElements.define("wc-iframe", Iframe);
customElements.define("wc-image", Image);
// Ribbons
customElements.define("wc-ribbon", Ribbon);
customElements.define("wc-instruction", Introduction);
customElements.define("wc-presentation", Presentation);
customElements.define("wc-meaning-pronunciation", MeaningPronunciation);
customElements.define("wc-form", Form);
customElements.define("wc-practice", Practice);
customElements.define("wc-lcwp", LCWP);
customElements.define("wc-lcop", LCOP);

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
customElements.define("wc-hangman", Hangman);
customElements.define("wc-header", Header);
customElements.define("wc-layout", Layout);
customElements.define("wc-nav-bar", NavBar);
customElements.define("wc-student-dashboard", StudentDashboard);
customElements.define("wc-under-construction", UnderConstruction);

// Lessons
customElements.define("wc-common-questions", CommonQuestions);
customElements.define("wc-present-perfect", PresentPerfect);
customElements.define("wc-the-alphabet", TheAlphabet);

// Templates
customElements.define("wc-contents", Contents);
customElements.define("wc-dictionary-content", DictionaryContent);

// Pages
customElements.define("wc-feelings", Feelings);
customElements.define("wc-data-page", DataPage);
