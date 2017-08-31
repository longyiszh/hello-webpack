// css
import 'bootstrap/dist/css/bootstrap.min.css';

import "./css/lrtHP.css";
import "./css/mapFO4.css";
import "./css/mapWitcher3.css";

// scss
import "./scss/main.scss";

// js
import * as bootstrap from 'bootstrap';
import * as timer from './js/timer.jquery.min';
import * as $ from "jquery";

import { gaoxiao, hahaha } from "./js/testGaoxiao";
import { dom, hideTip } from "./js/mapFO4";

const a4 = 2;

const count = function () {
    console.log(gaoxiao + a4);
}

count();
hahaha();

if (document.getElementsByTagName("title")[0].innerHTML === "FO4 Map" || "Witcher3 Map") {
    dom();
    hideTip();
}