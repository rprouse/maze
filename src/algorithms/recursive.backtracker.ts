import { Cell } from '../cell';
import { Maze } from '../maze';

export class RecursiveBacktracker {
  maze: Maze;
  stack: Array<Cell>;
  current: Cell;
  maze_complete: boolean;

  constructor(maze: Maze) {
    this.maze = maze;

    this.current = this.maze.get(0, 0);
    this.current.visited = true;
    this.stack = [];

    this.maze_complete = false;
  }

  step() {
    if(this.current.hasUnvisitedNeighboors()) {
      let next = this.current.randomNeighbor();
      this.stack.push(this.current);
      this.current.link(next);
      this.current = next;
      this.current.visited = true;
    } else if(this.stack.length > 0) {
      this.current = this.stack.pop();
    }
  }

  mazeComplete(): boolean {
    // Cache for efficiency
    if(this.maze_complete === true)
      return true;

    for(var y = 0; y < this.maze.rows; y++) {
      for(var x = 0; x < this.maze.columns; x++) {
        if(this.maze.get(x,y).visited === false)
          return false;
      }
    }
    //this.debugMazeLinks();
    this.maze_complete = true;
    return true;
  }

  private debugMazeLinks() {
    for(var y = 0; y < this.maze.rows; y++) {
      for(var x = 0; x < this.maze.columns; x++) {
        let cell = this.maze.get(x, y);
        console.log(cell + ' links:');
        cell.links.forEach(link => {
          console.log('  ' + link);
        });
      }
    }
  }
}