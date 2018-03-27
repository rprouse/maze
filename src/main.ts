import { Game } from './game';

function init() {

  let game = new Game();
  game.init(getMazeSize());
  document.getElementById('reset').onclick = () => game.init(getMazeSize());
}

function getMazeSize(): number {
  let select = <HTMLSelectElement> document.getElementById('size');
  return parseInt(select.options[select.selectedIndex].value);
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