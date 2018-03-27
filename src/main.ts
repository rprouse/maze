import { Game } from './game';

function init() {
  let game = new Game();
  document.getElementById('reset').onclick = () => game.init();
}

if(document.readyState === "complete") {
  console.log("readyState complete");
  init();
} else {
  window.onload = () => {
    console.log("window.onload");
    init();
  };
}