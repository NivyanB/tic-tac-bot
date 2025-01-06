import { Board, Cell, Move } from "./types";

export function isBoardFull(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell !== null));
}

export function checkWinner(board: Board): string | null {
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const line of lines) {
    if (line[0] !== null && line[0] === line[1] && line[1] === line[2]) {
      return line[0]; // Return the winner ('X' or 'O')
    }
  }

  return null; // No winner yet
}
export function getRandomMove(board: Board): Move {
  const availableMoves: Move[] = [];

  // Iterate over the board to find empty cells
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        availableMoves.push({ row, col });
      }
    }
  }

  // Log the available moves

  if (availableMoves.length === 0) {
  }

  // Select a random move
  const randomMove =
    availableMoves[Math.floor(Math.random() * availableMoves.length)];

  return randomMove;
}
