import Header from "./organisms/Header";
import NavBar from "./organisms/NavBar"
import Layout from "./organisms/Layout"
import Footer from "./organisms/Footer";

import Button from "./atoms/Button";
import IconItem from "./molecules/IconItem"

customElements.define("wc-header", Header);
customElements.define("wc-navbar", NavBar)
customElements.define("wc-layout", Layout)
customElements.define("wc-footer", Footer);

customElements.define("wc-button", Button);
customElements.define("wc-icon-item", IconItem);