import { Cell } from './cell';
import { Maze } from './maze';

export class Canvas {
  readonly background: string = '#1E2324';
  readonly foreground: string = '#F1F2F3';
  readonly cursor: string = '#93C763';

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
    this.colorRect(0, 0, this.canvas.width, this.canvas.height, this.background);
  }

  drawBorder() {
    this.ctx.strokeStyle = this.foreground;
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
      this.colorRect(this.xBlockSize * current.x, this.yBlockSize * current.y, this.xBlockSize, this.yBlockSize, this.cursor);
    }
  }

  drawMaze(maze: Maze) {
    this.ctx.strokeStyle = this.foreground;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    maze.eachCell(c => this.drawCell(c, maze));
    this.ctx.stroke();
  }

  drawCell(cell: Cell, maze: Maze) {
    let x0 = this.xBlockSize * cell.x;
    let x1 = this.xBlockSize + x0;
    let y0 = this.yBlockSize * cell.y;
    let y1 = this.yBlockSize + y0;
    // East Wall
    let east = maze.get(cell.x+1, cell.y);
    if(!cell.linked(east)) {
      this.drawLine(x1, y0, x1, y1);
    }
    // South Wall
    let south = maze.get(cell.x, cell.y+1)
    if(!cell.linked(south)) {
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