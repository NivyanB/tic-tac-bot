import { Board, Cell, Move } from "./types";
import { checkWinner, getRandomMove, isBoardFull } from "./utils";

/**
 * Iterates through every row and column on the board, simulating the player's move
 * in each empty cell. If this simulated move results in a win, returns the
 * position of the winning move. If no winning move is found, returns null.
 *
 * @param board The current state of the game board
 * @param player The player's marker (X or O)
 * @returns The position of the winning move, or null if no winning move was found
 */
function findWinningMove(board: Board, player: Cell): Move | null {
  // Iterate through every row and column on the board
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      // If the current cell is empty (null), simulate the player's move
      if (board[row][col] === null) {
        // Simulate the move by placing the player's marker on the empty cell
        board[row][col] = player;

        // Check if this move results in a win for the player
        const winner = checkWinner(board);

        // Undo the move (set the cell back to null) for further evaluation
        board[row][col] = null;

        // If this simulated move results in a win, return the current position as the winning move
        if (winner === player) {
          return { row, col };
        }
      }
    }
  }

  // If no winning move is found, log that no winning move was found and return null
  return null;
}

/**
 * Determines the best move for the player using a medium difficulty strategy.
 * The strategy checks for a winning move, blocks the opponent's winning move,
 * and defaults to a random move if no immediate win or block is possible.
 *
 * @param board The current state of the game board
 * @param player The player's marker (X or O)
 * @returns The chosen move for the player
 */

function getMediumMove(board: Board, player: Cell): Move {
  const opponent: Cell = player === "X" ? "O" : "X";

  // Check if the player can win
  const winningMove = findWinningMove(board, player);
  if (winningMove) {
    return winningMove;
  }

  // Check if the opponent can win and block it
  const blockMove = findWinningMove(board, opponent);
  if (blockMove) {
    return blockMove;
  }

  // No winning or blocking move, so pick a random move
  const randomMove = getRandomMove(board);

  return randomMove;
}

/**
 * Determines the best move for the player using the Minimax algorithm.
 * The algorithm evaluates all possible moves to choose the optimal one,
 * considering both the player's and opponent's potential strategies.
 *
 * @param board The current state of the game board
 * @param player The player's marker (X or O)
 * @returns The optimal move for the player
 */

function getMinimaxMove(board: Board, player: Cell): Move {
  // Determine the opponent's symbol based on the current player
  const opponent: Cell = player === "X" ? "O" : "X";

  /**
   * Implements the Minimax algorithm to evaluate the optimal move for the player.
   * This function recursively considers all possible moves, alternating between
   * maximizing the player's score and minimizing the opponent's score, to determine
   * the best possible outcome.
   *
   * @param board The current state of the game board.
   * @param depth The current depth in the game tree, used for scoring.
   * @param isMaximizing A boolean indicating whether the current move is for
   *                     the maximizing player (true) or minimizing player (false).
   * @returns A numeric score representing the evaluation of the board state.
   *          Positive values favor the player, negative values favor the opponent,
   *          and zero indicates a draw.
   */

  function minimax(board: Board, depth: number, isMaximizing: boolean): number {
    // Check if the game has ended (win or draw)
    const winner = checkWinner(board);
    if (winner === player) return 10 - depth; // Positive score for a win
    if (winner === opponent) return depth - 10; // Negative score for a loss
    if (isBoardFull(board)) return 0; // Zero score for a draw

    // Maximizing player's turn (AI player)
    if (isMaximizing) {
      let maxEval = -Infinity; // Start with a very low score
      let bestMove: Move | null = null; // Placeholder for the best move

      // Try all possible moves
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            // If the cell is empty
            board[row][col] = player; // Simulate the move
            const evaluation = minimax(board, depth + 1, false); // Recursively evaluate the move
            board[row][col] = null; // Undo the move

            // Update the best move if the evaluation is better
            if (evaluation > maxEval) {
              maxEval = evaluation;
              bestMove = { row, col };
            }
          }
        }
      }
      return maxEval;
    } else {
      // Minimizing player's turn (opponent)
      let minEval = Infinity; // Start with a very high score
      let bestMove: Move | null = null; // Placeholder for the best move

      // Try all possible moves
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            // If the cell is empty
            board[row][col] = opponent; // Simulate the move
            const evaluation = minimax(board, depth + 1, true); // Recursively evaluate the move
            board[row][col] = null; // Undo the move

            // Update the best move if the evaluation is better
            if (evaluation < minEval) {
              minEval = evaluation;
              bestMove = { row, col };
            }
          }
        }
      }
      return minEval;
    }
  }

  // Variables to store the best move and its score
  let bestMove: Move | null = null;
  let bestScore = -Infinity; // Start with a very low score

  // Try all possible moves for the current player
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        // If the cell is empty
        board[row][col] = player; // Simulate the move
        const score = minimax(board, 0, false); // Evaluate the move using Minimax
        board[row][col] = null; // Undo the move

        // Update the best move if this move has a better score
        if (score > bestScore) {
          bestScore = score;
          bestMove = { row, col };
        }
      }
    }
  }

  // Return the best move found
  return bestMove!;
}

export { getRandomMove, getMediumMove, getMinimaxMove };
