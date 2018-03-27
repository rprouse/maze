import { Cell } from './cell';
import { Canvas } from './canvas';
import { Maze } from './maze';
import { RecursiveBacktracker } from './algorithms/recursive.backtracker';

export class Game {
  canvas: Canvas;
  maze: Maze;
  algorithm: RecursiveBacktracker;

  readonly MAZE_SIZE: number = 32;
  readonly FRAMES_PER_SECOND: number = 100;

  constructor() {
    console.log('Constructing Game');
    this.canvas = new Canvas('game');
    this.init();
    setInterval(this.gameLoop.bind(this), 1000/this.FRAMES_PER_SECOND);
  }

  init() {
    this.canvas.init(this.MAZE_SIZE);
    this.maze = new Maze(this.MAZE_SIZE, this.MAZE_SIZE);
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