import { Cell } from './cell';

export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  xBlockSize: number;
  yBlockSize: number;

  constructor(id: string) {
    this.canvas = <HTMLCanvasElement> document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
  }

  init(maze_size: number) {
    this.xBlockSize = this.canvas.width / maze_size;
    this.yBlockSize = this.canvas.height / maze_size;
  }

  drawBackground() {
    this.colorRect(0, 0, this.canvas.width, this.canvas.height, 'black');
  }

  drawBorder() {
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(this.canvas.width, 0);
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.lineTo(0, 0);
    this.ctx.stroke();
  }

  drawCurrentCell(current: Cell, complete: boolean) {
    if(!complete) {
      this.colorRect(this.xBlockSize * current.x, this.yBlockSize * current.y, this.xBlockSize, this.yBlockSize, 'lightgreen');
    }
  }

  drawMaze(maze: Array<Array<number>>) {
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    for(let y = 0; y < maze.length; y++) {
      for(let x = 0; x < maze[y].length; x++) {
        this.drawCell(x, y, maze);
      }
    }
    this.ctx.stroke();
  }

  drawCell(x: number, y: number, maze: Array<Array<number>>) {
    // TODO: Refactor into the Maze
    const RIGHT = 4;
    const BOTTOM = 8;
    let x0 = this.xBlockSize * x;
    let x1 = this.xBlockSize + x0;
    let y0 = this.yBlockSize * y;
    let y1 = this.yBlockSize + y0;
    let cell = maze[x][y];
    if((x + 1 == maze[y].length) || ((cell & RIGHT) === 0)) {
      this.drawLine(x1, y0, x1, y1);
    }
    if((y + 1 == maze.length) || ((cell & BOTTOM) === 0)) {
      this.drawLine(x1, y1, x0, y1);
    }
  }

  drawLine(x0, y0, x1, y1) {
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
  }

  colorRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }
}