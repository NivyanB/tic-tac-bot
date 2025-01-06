
# Tic Tac Bot

**Tic Tac Bot** is a lightweight and versatile JavaScript/TypeScript package for building Tic Tac Toe games with AI opponents. Whether you need a basic or advanced AI, this package offers flexible options to suit your needs.

## Features

1.  **AI Strategies**:
    
    -   **Minimax**: Implements the optimal strategy for Tic Tac Toe.
    -   **Medium AI**: Blocks opponent moves and finds winning opportunities.
    -   **Random AI**: Chooses a random valid move.
2.  **Utility Functions**:
    
    -   `checkWinner`: Identifies if there’s a winner on the board.
    -   `isBoardFull`: Checks if the board is completely filled.
    -   `getRandomMove`: Returns a random valid move.

## Installation

Install the package via npm or yarn:

Copy code

`npm install tic-tac-bot` 

or

csharp

Copy code

`yarn add tic-tac-bot` 

## Functions

### 1. `getMinimaxMove(board, player)`

Uses the Minimax algorithm to calculate the best possible move for the given player.

**Parameters**:

-   `board` (array): The current state of the board.
-   `player` (string): The player's marker (`"X"` or `"O"`).

**Returns**:

-   An object `{ row, col }` representing the optimal move.

----------

### 2. `getMediumMove(board, player)`

A medium-level AI that checks for winning moves and blocks opponent strategies.

**Parameters**:

-   `board` (array): The current state of the board.
-   `player` (string): The player's marker (`"X"` or `"O"`).

**Returns**:

-   An object `{ row, col }` representing the chosen move.

----------

### 3. `getRandomMove(board)`

Selects a random valid move.

**Parameters**:

-   `board` (array): The current state of the board.

**Returns**:

-   An object `{ row, col }` representing the random move.

----------

### 4. `checkWinner(board)`

Checks for a winner on the current board.

**Parameters**:

-   `board` (array): The current state of the board.

**Returns**:

-   `"X"`, `"O"`, or `null` if there’s no winner yet.

----------

### 5. `isBoardFull(board)`

Checks if all cells on the board are filled.

**Parameters**:

-   `board` (array): The current state of the board.

**Returns**:

-   `true` if the board is full, otherwise `false`.

----------



## Example Usage

```javascript
import { getMinimaxMove, getMediumMove, getRandomMove, checkWinner, isBoardFull } from "tic-tac-bot";

// Initialize a board
const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Make a move using Minimax AI
const bestMove = getMinimaxMove(board, "X");
console.log(bestMove); // { row: 0, col: 0 }

// Check if a player has won
const winner = checkWinner(board);
console.log(winner); // null

// Check if the board is full
const isFull = isBoardFull(board);
console.log(isFull); // false
````

## License

Tic Tac Bot is licensed under the MIT License. Feel free to use and modify it as needed.

----------