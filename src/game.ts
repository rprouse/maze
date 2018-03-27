import { Cell } from './cell';
import { Canvas } from './canvas';

export class Game {
  canvas: Canvas;

  maze: Array<Array<number>>;
  maze_visited: Array<Array<boolean>>; // have cells been visited or not
  stack: Array<Cell>;
  current: Cell;
  maze_complete: boolean;

  readonly MAZE_SIZE: number = 64;
  readonly FRAMES_PER_SECOND: number = 500;

  // Cell sides. If the flag is on, it indicates that direction is open.
  readonly LEFT: number   = 1;
  readonly TOP: number    = 2;
  readonly RIGHT: number  = 4;
  readonly BOTTOM: number = 8;

  constructor() {
    this.canvas = new Canvas('game');
    this.init();
    setInterval(this.gameLoop.bind(this), 1000/this.FRAMES_PER_SECOND);
  }

  init() {
    this.canvas.init(this.MAZE_SIZE);

    // Initialize the Maze
    this.maze = [];
    this.maze_visited = [];
    for(var y = 0; y < this.MAZE_SIZE; y++) {
      let row = [];
      let visited_row = [];
      for(var x = 0; x < this.MAZE_SIZE; x++) {
        row.push(0);
        visited_row.push(false);
      }
      this.maze.push(row);
      this.maze_visited.push(visited_row);
    }

    this.current = new Cell(0, 0);
    this.stack = [];

    this.maze_complete = false;
    this.visited(0, 0);
  }

  gameLoop() {
    this.draw();
    if(!this.mazeComplete()) {
      this.recursiveBacktracker();
    }
  }

  recursiveBacktracker() {
    if(this.hasUnvisitedNeighboors(this.current.x, this.current.y)) {
      let next = this.randomNeighbor(this.current.x, this.current.y);
      this.stack.push(this.current);
      this.removeWall(this.current, next);
      this.current = next;
      this.visited(this.current.x, this.current.y);
    } else if(this.stack.length > 0) {
      this.current = this.stack.pop();
    }
  }

  draw() {
    this.canvas.drawBackground();
    this.canvas.drawBorder();
    this.canvas.drawCurrentCell(this.current, this.maze_complete);
    this.canvas.drawMaze(this.maze);
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  visited (x, y) {
    this.maze_visited[x][y] = true;
  }

  mazeComplete() {
    // Cache for efficiency
    if(this.maze_complete === true)
      return true;

    for(var y = 0; y < this.MAZE_SIZE; y++) {
      for(var x = 0; x < this.MAZE_SIZE; x++) {
        if(this.maze_visited[x][y] === false)
          return false;
      }
    }
    this.maze_complete = true;
    return true;
  }

  hasUnvisitedNeighboors(x, y) {
    if(this.leftUnvisited(x, y)) return true;
    if(this.rightUnvisited(x, y)) return true;
    if(this.topUnvisited(x, y)) return true;
    if(this.bottomUnvisited(x, y)) return true;

    return false;
  }

  randomNeighbor(x, y) {
    while(true) {
      let i = this.getRandomIntInclusive(0,3);
      if(i === 0 && this.leftUnvisited(x, y)) {
        return { x: x - 1, y: y };
      } else if(i === 1 && this.topUnvisited(x, y)) {
        return { x: x, y: y - 1 };
      } else if(i === 2 && this.rightUnvisited(x, y)) {
        return { x: x + 1, y: y };
      } else if(i === 3 && this.bottomUnvisited(x, y)) {
        return { x: x, y: y + 1 };
      }
    }
  }

  leftUnvisited(x, y) {
    return x > 0 && this.maze_visited[x-1][y] === false;
  }

  rightUnvisited(x, y) {
    return x < (this.MAZE_SIZE - 1) && this.maze_visited[x+1][y] === false;
  }

  topUnvisited(x, y) {
    return y > 0 && this.maze_visited[x][y-1] === false;
  }

  bottomUnvisited(x, y) {
    return y < (this.MAZE_SIZE - 1) && this.maze_visited[x][y+1] === false;
  }

  removeWall(one, two) {
    if(one.x < two.x) { // one is left of two
      this.maze[one.x][one.y] |= this.RIGHT;
      this.maze[two.x][two.y] |= this.LEFT;
    } else if(one.x > two.x) { // one is right of two
      this.maze[one.x][one.y] |= this.LEFT;
      this.maze[two.x][two.y] |= this.RIGHT;
    } if(one.y < two.y) { // one is above two
      this.maze[one.x][one.y] |= this.BOTTOM;
      this.maze[two.x][two.y] |= this.TOP;
    } if(one.y > two.y) { // one is below two
      this.maze[one.x][one.y] |= this.TOP;
      this.maze[two.x][two.y] |= this.BOTTOM;
    }
  }
}