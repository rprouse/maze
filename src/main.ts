import { Game } from './game';

if(document.readyState === "complete") {
  console.log("readyState complete");
  new Game();
} else {
  window.onload = () => {
    console.log("window.onload");
    new Game();
  };
}