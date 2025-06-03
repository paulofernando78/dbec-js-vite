import Header from "./organisms/Header";
import NavBar from "./organisms/NavBar"
import Layout from "./organisms/Layout"
import Contents from "./templates/Contents";
import Footer from "./organisms/Footer";

import Button from "./atoms/Button";
import IconItem from "./molecules/IconItem"
import Whiteboard from "./molecules/Whiteboard";
import Welcome from "./organisms/welcome";

// Courses
import BeginnerContentsPage from "../pages/courses/beginner/beginner-contents-page";

customElements.define("wc-header", Header);
customElements.define("wc-navbar", NavBar)
customElements.define("wc-layout", Layout)
customElements.define("wc-contents", Contents)
customElements.define("wc-footer", Footer);

customElements.define("wc-button", Button);
customElements.define("wc-icon-item", IconItem);
customElements.define("wc-whiteboard", Whiteboard);
customElements.define("wc-welcome", Welcome);

// Courses
customElements.define("wc-beginner-contents-page", BeginnerContentsPage)