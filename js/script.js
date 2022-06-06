import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";

const modalTimer = setTimeout(() => openModal(".modal", modalTimer), 500000);

calc();
cards();
forms("form", modalTimer);
modal("[data-modal]", ".modal", modalTimer);
slider({
  container: ".offer__slider",
  slide: ".offer__slide",
  nextArr: ".offer__slider-next",
  prevArr: ".offer__slider-prev",
  totalCounter: "#total",
  currentCounter: "#current",
  wrapper: ".offer__slider-wrapper",
  field: ".offer__slider-inner",
});
tabs(
  ".tabheader__item",
  ".tabcontent",
  ".tabheader__items",
  "tabheader__item_active"
);
timer(".timer", "2022-08-11");
