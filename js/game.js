let canvas;
let ctx;

let xBlockSize;
let yBlockSize;

let maze;
let maze_visited; // have cells been visited or not
let stack;
let current;
let maze_complete;

const MAZE_SIZE = 32;
const FRAMES_PER_SECOND = 500;

// Cell sides. If the flag is on, it indicates that direction is open.
const LEFT   = 1;
const TOP    = 2;
const RIGHT  = 4;
const BOTTOM = 8;

window.onload = function() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');

  init();
  setInterval(gameLoop, 1000/FRAMES_PER_SECOND);
}

function init() {
  xBlockSize = canvas.width / MAZE_SIZE;
  yBlockSize = canvas.height / MAZE_SIZE;

  // Initialize the Maze
  maze = [];
  maze_visited = [];
  for(var y = 0; y < MAZE_SIZE; y++) {
    row = [];
    visited_row = [];
    for(var x = 0; x < MAZE_SIZE; x++) {
      row.push(0);
      visited_row.push(false);
    }
    maze.push(row);
    maze_visited.push(visited_row);
  }

  current = { x: 0, y: 0 };
  stack = [];

  maze_complete = false;
  visited(0, 0);
}

function gameLoop() {
  draw();
  if(!mazeComplete()) {
    recursiveBacktracker();
  }
}

function recursiveBacktracker() {
  if(hasUnvisitedNeighboors(current.x, current.y)) {
    let next = randomNeighbor(current.x, current.y);
    stack.push(current);
    removeWall(current, next);
    current = next;
    visited(current.x, current.y);
  } else if(stack.length > 0) {
    current = stack.pop();
  }
}

function draw() {
  drawBackground();
  drawCurrentCell();
  drawMaze();
}

function drawBackground() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
}

function drawCurrentCell() {
  if(!maze_complete) {
    colorRect(xBlockSize * current.x, yBlockSize * current.y, xBlockSize, yBlockSize, 'green');
  }
}

function drawMaze() {
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for(var y = 0; y < MAZE_SIZE; y++) {
    for(var x = 0; x < MAZE_SIZE; x++) {
      drawCell(x, y);
    }
  }
  ctx.stroke();
}

function drawCell(x, y) {
  var x0 = xBlockSize * x;
  var x1 = xBlockSize + x0;
  var y0 = yBlockSize * y;
  var y1 = yBlockSize + y0;
  var cell = maze[x][y];
  if((cell & LEFT) === 0) {
    drawLine(x0, y1, x0, y0);
  }
  if((cell & TOP) === 0) {
    drawLine(x0, y0, x1, y0);
  }
  if((x + 1 == MAZE_SIZE) || ((cell & RIGHT) === 0)) {
    drawLine(x1, y0, x1, y1);
  }
  if((y + 1 == MAZE_SIZE) || ((cell & BOTTOM) === 0)) {
    drawLine(x1, y1, x0, y1);
  }
}

function drawLine(x0, y0, x1, y1) {
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
}

function colorRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function visited (x, y) {
  maze_visited[x][y] = true;
}

function mazeComplete() {
  // Cache for efficiency
  if(maze_complete === true)
    return true;

  for(var y = 0; y < MAZE_SIZE; y++) {
    for(var x = 0; x < MAZE_SIZE; x++) {
      if(maze_visited[x][y] === false)
        return false;
    }
  }
  maze_complete = true;
  return true;
}

function hasUnvisitedNeighboors(x, y) {
  if(leftUnvisited(x, y)) return true;
  if(rightUnvisited(x, y)) return true;
  if(topUnvisited(x, y)) return true;
  if(bottomUnvisited(x, y)) return true;

  return false;
}

function randomNeighbor(x, y) {
  while(true) {
    let i = getRandomIntInclusive(0,3);
    if(i === 0 && leftUnvisited(x, y)) {
      return { x: x - 1, y: y };
    } else if(i === 1 && topUnvisited(x, y)) {
      return { x: x, y: y - 1 };
    } else if(i === 2 && rightUnvisited(x, y)) {
      return { x: x + 1, y: y };
    } else if(i === 3 && bottomUnvisited(x, y)) {
      return { x: x, y: y + 1 };
    }
  }
}

function leftUnvisited(x, y) {
  return x > 0 && maze_visited[x-1][y] === false;
}

function rightUnvisited(x, y) {
  return x < (MAZE_SIZE - 1) && maze_visited[x+1][y] === false;
}

function topUnvisited(x, y) {
  return y > 0 && maze_visited[x][y-1] === false;
}

function bottomUnvisited(x, y) {
  return y < (MAZE_SIZE - 1) && maze_visited[x][y+1] === false;
}

function removeWall(one, two) {
  if(one.x < two.x) { // one is left of two
    maze[one.x][one.y] |= RIGHT;
    maze[two.x][two.y] |= LEFT;
  } else if(one.x > two.x) { // one is right of two
    maze[one.x][one.y] |= LEFT;
    maze[two.x][two.y] |= RIGHT;
  } if(one.y < two.y) { // one is above two
    maze[one.x][one.y] |= BOTTOM;
    maze[two.x][two.y] |= TOP;
  } if(one.y > two.y) { // one is below two
    maze[one.x][one.y] |= TOP;
    maze[two.x][two.y] |= BOTTOM;
  }
}