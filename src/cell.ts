import { Random } from './random';

export class Cell {
  x: number;
  y: number;

  north: Cell;
  south: Cell;
  east: Cell;
  west: Cell;

  visited: boolean;

  links: Array<Cell>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.links = [];
  }

  link(cell: Cell, bidi: boolean = true) {
    if(cell === undefined) {
      return;
    }
    if(!this.linked(cell)){
      this.links.push(cell);
    }
    if(bidi) {
      cell.link(this, false);
    }
  }

  unlink(cell: Cell, bidi: boolean = true) {
    if(cell === undefined) {
      return;
    }
    this.links = this.links.filter(c => c.x !== cell.x && c.y !== cell.y);
    if(bidi) {
      cell.unlink(this, false);
    }
  }

  linked(cell: Cell): boolean {
    return cell !== undefined && this.links.filter(c => c.x === cell.x && c.y === cell.y).length > 0;
  }

  hasUnvisitedNeighboors(): boolean {
    return this.neighbors().filter(c => c.visited === false).length > 0;
  }

  randomNeighbor(): Cell {
    let list = this.neighbors().filter(c => c.visited === false);
    let r = Random.getInt(0, list.length);
    let cell = list[r];
    if(cell === undefined) {
      console.error('returning undefined random cell ' + r + ' in list length ' + list.length);
    }
    return cell;
  }

  neighbors(): Array<Cell> {
    let list = new Array<Cell>();
    if(this.north !== undefined) list.push(this.north)
    if(this.south !== undefined) list.push(this.south)
    if(this.east !== undefined) list.push(this.east)
    if(this.west !== undefined) list.push(this.west)
    return list;
  }

  toString(): string {
    return this.x + "," + this.y;
  }
}