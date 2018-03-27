import { Cell } from './cell';
import { Random } from './random';

export class Maze {
  rows: number;
  columns: number;
  private grid: Array<Array<Cell>>;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.prepareGrid();
    this.configureCells();
  }

  // Returns Cell at x,y
  get(x: number, y: number): Cell {
    if(x < 0 || x >= this.columns || y < 0 || y >= this.rows) {
      return undefined;
    }
    return this.grid[x][y];
  }

  // Total number of cells
  size(): number {
    return this.rows * this.columns;
  }

  random(): Cell {
    let x = Random.getInt(0, this.columns);
    let y = Random.getInt(0, this.rows);
    return this.get(x, y);
  }

  eachCell(func: (cell: Cell) => void ) {
    for(var y = 0; y < this.rows; y++) {
      for(var x = 0; x < this.columns; x++) {
        func(this.get(x,y));
      }
    }
  }

  private prepareGrid() {
    this.grid = new Array<Array<Cell>>();
    for(var x = 0; x < this.rows; x++) {
      let row = new Array<Cell>();
      for(var y = 0; y < this.columns; y++) {
        row.push(new Cell(x, y));
      }
      this.grid.push(row);
    }
  }

  private configureCells() {
    for(var y = 0; y < this.rows; y++) {
      for(var x = 0; x < this.columns; x++) {
        var cell = this.get(x, y);
        if(y > 0) cell.north = this.get(x, y-1);
        if(y < this.rows - 1) cell.south = this.get(x, y+1);
        if(x > 0) cell.west = this.get(x-1, y);
        if(x < this.columns - 1) cell.east = this.get(x+1, y);
      }
    }
    //this.debugMazeLinks();
  }

  private debugMazeLinks() {
    for(var y = 0; y < this.rows; y++) {
      for(var x = 0; x < this.columns; x++) {
        let cell = this.get(x, y);
        console.log(x + "," + y + " => "+ cell + " N:" + cell.north + " S:" + cell.south + " E:" + cell.east + " W:" + cell.west  );
      }
    }
  }
}