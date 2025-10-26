// Atoms
import Audio from "@components/atoms/Audio";
import ScrollTop from "@components/atoms/ScrollTop";
import AudioPlayer from "@components/atoms/AudioPlayer";
import Note from "@components/atoms/Note";
import Button from "@components/atoms/Button";
import FloatingBoard from "@components/atoms/FloatingBoard";
import Iframe from "@components/atoms/Iframe";
import Image from "@components/atoms/Image";
// Ribbons
import Ribbon from "@components/atoms/Ribbons/Ribbon";
import WarmUp from "@components/atoms/Ribbons/WarmUp";
import Introduction from "@components/atoms/Ribbons/Introduction";
import Presentation from "@components/atoms/Ribbons/Presentation";
import MeaningPronunciation from "@components/atoms/Ribbons/MeaningPronunciation";
import Form from "@components/atoms/Ribbons/Form";
import Practice from "@components/atoms/Ribbons/Practice";
import LCWP from "@components/atoms/Ribbons/LCWP";
import HCWP from "@components/atoms/Ribbons/HCWP";
import LCOP from "@components/atoms/Ribbons/LCOP";
import HCOP from "@components/atoms/Ribbons/HCOP";
import Production from "@components/atoms/Ribbons/Production";

import Checking from "@components/molecules/Checking";
import Instructions from "@components/molecules/Instructions";

import VideoPlayer from "@components/atoms/VideoPlayer";

// Molecules
import Board from "@components/molecules/Board";
import Collapsible from "@components/molecules/collapsible";
import DateCard from "@components/molecules/DateCard";
import Exercise from "@components/molecules/Exercise";
import FlipCard from "@components/molecules/FlipCard";
import FlipCardBackImage from "../components/molecules/FlipCardBackImage";
import IconItem from "@components/molecules/IconItem";
import Text from "@components/molecules/Text";
import Whiteboard from "@components/molecules/Whiteboard";

//Organisms
import Card from "@components/organisms/Card";
import DictionarySearch from "@components/organisms/DictionarySearch";
import Footer from "@components/organisms/Footer";
import FourOhFour from "@components/organisms/404";
import GameEmulator from "@components/organisms/GameEmulator";
import GuessWord from "@components/organisms/GuessWord";
import Header from "@components/organisms/Header";
import Layout from "@components/organisms/Layout";
import Logo from "../components/organisms/Logo";
import NavBar from "@components/organisms/NavBar";
import TesteNivelamento from "../components/organisms/TesteNivelamento";
import StudentDashboard from "@components/organisms/StudentDashboard";
import UnderConstruction from "@components/organisms/UnderConstruction";

// Lessons
import CommonQuestions from "@components/organisms/CommonQuestions";
import PresentPerfect from "@components/organisms/Lessons/PresentTense/PresentPerfect";
import TheAlphabet from "@components/organisms/Lessons/TheAlphabet";

//Templates
import Contents from "@components/templates/Contents";
import DictionaryContent from "@components/templates/DictionaryContent";

// Pages
import Feelings from "@components/organisms/Feelings";
import DataPage from "/src/js/components/pages/data-page.js";

// ******************************

// Atoms
customElements.define("wc-audio", Audio);
customElements.define("wc-scroll-top", ScrollTop);
customElements.define("wc-audio-player", AudioPlayer);
customElements.define("wc-note", Note);
customElements.define("wc-button", Button);
customElements.define("wc-floating-board", FloatingBoard);
customElements.define("wc-iframe", Iframe);
customElements.define("wc-image", Image);
// Ribbons
customElements.define("wc-ribbon", Ribbon);
customElements.define("wc-warm-up", WarmUp);
customElements.define("wc-introduction", Introduction);
customElements.define("wc-presentation", Presentation);
customElements.define("wc-meaning-pronunciation", MeaningPronunciation);
customElements.define("wc-form", Form);
customElements.define("wc-practice", Practice);
customElements.define("wc-lcwp", LCWP);
customElements.define("wc-hcwp", HCWP);
customElements.define("wc-lcop", LCOP);
customElements.define("wc-hcop", HCOP);
customElements.define("wc-production", Production);

customElements.define("wc-checking", Checking);
customElements.define("wc-instruction", Instructions);

customElements.define("wc-video-player", VideoPlayer);

// Molecules
customElements.define("wc-board", Board);
customElements.define("wc-collapsible", Collapsible);
customElements.define("wc-date-card", DateCard);
customElements.define("wc-exercise", Exercise);
customElements.define("wc-flip-card", FlipCard);
customElements.define("wc-flip-card-back-image", FlipCardBackImage);
customElements.define("wc-icon-item", IconItem);
customElements.define("wc-text", Text);
customElements.define("wc-whiteboard", Whiteboard);

// Organisms
customElements.define("wc-card", Card);
customElements.define("wc-dictionary-search", DictionarySearch);
customElements.define("wc-footer", Footer);
customElements.define("wc-four-oh-four", FourOhFour);
customElements.define("wc-game-emulator", GameEmulator);
customElements.define("wc-guess-word", GuessWord);
customElements.define("wc-header", Header);
customElements.define("wc-layout", Layout);
customElements.define("wc-logo", Logo);
customElements.define("wc-nav-bar", NavBar);
customElements.define("wc-teste-nivelamento", TesteNivelamento);
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
