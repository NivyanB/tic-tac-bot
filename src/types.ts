/** Represents a single cell on the Tic Tac Toe board */
export type Cell = "X" | "O" | null;

/** Represents the Tic Tac Toe board as a 2D array */
export type Board = Cell[][];

/** Represents a move on the board */
export interface Move {
  row: number;
  col: number;
}
