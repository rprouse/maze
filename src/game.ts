import { Cell } from './cell';
import { Canvas } from './canvas';
import { Maze } from './maze';
import { RecursiveBacktracker } from './algorithms/recursive.backtracker';

export class Game {
  canvas: Canvas;
  maze: Maze;
  algorithm: RecursiveBacktracker;

  readonly FRAMES_PER_SECOND: number = 100;

  constructor() {
    console.log('Constructing Game');
    this.canvas = new Canvas('game');
    setInterval(this.gameLoop.bind(this), 1000/this.FRAMES_PER_SECOND);
  }

  init(size: number) {
    this.canvas.init(size);
    this.maze = new Maze(size, size);
    this.algorithm = new RecursiveBacktracker(this.maze);
  }

  gameLoop() {
    this.draw();
    if(!this.algorithm.mazeComplete()) {
      this.algorithm.step();
    }
  }

  draw() {
    this.canvas.drawBackground();
    this.canvas.drawBorder();
    this.canvas.drawCurrentCell(this.algorithm.current, this.algorithm.maze_complete);
    this.canvas.drawMaze(this.maze);
  }
}