let canvas;
let ctx;

let xBlockSize;
let yBlockSize;

let maze;

const MAZE_SIZE = 10;
const FRAMES_PER_SECOND = 10;

window.onload = function() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

  init();
  setInterval(gameLoop, 1000/FRAMES_PER_SECOND);
}

function init() {
  // Initialize the Maze
  maze = [];
  for(var y = 0; y < MAZE_SIZE; y++) {
    row = [];
    for(var x = 0; x < MAZE_SIZE; x++) {
      row.push(0);
    }
    maze.push(row);
  }
  xBlockSize = canvas.width / MAZE_SIZE;
  yBlockSize = canvas.height / MAZE_SIZE;
}

function gameLoop() {
  draw();
}

function draw() {
  drawBackground();
  drawMaze();
}

function drawBackground() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawMaze() {
  for(var y = 0; y < MAZE_SIZE; y++) {
    for(var x = 0; x < MAZE_SIZE; x++) {
      drawCell(x, y);
    }
  }
}

function drawCell(x, y) {
  var x0 = xBlockSize * x;
  var x1 = xBlockSize + x0;
  var y0 = yBlockSize * y;
  var y1 = yBlockSize + y0;
  drawLine(x0, y1, x0, y0);
  drawLine(x0, y0, x1, y0);
  if(x + 1 == MAZE_SIZE) {
    drawLine(x1, y0, x1, y1);
  }
  if(y + 1 == MAZE_SIZE) {
    drawLine(x1, y1, x0, y1);
  }
}

function drawLine(x0, y0, x1, y1) {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function colorRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}