const ROWS = 6;
const COLS = 7;

let board = [];
let currentPlayer = "red";

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

// Create board
function createBoard() {
  for (let r = 0; r < ROWS; r++) {
    board[r] = [];
    for (let c = 0; c < COLS; c++) {
      board[r][c] = "";

      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;

      cell.addEventListener("click", handleClick);
      boardDiv.appendChild(cell);
    }
  }
}

// Handle click
function handleClick(e) {
  let col = parseInt(e.target.dataset.col);

  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === "") {
      board[r][col] = currentPlayer;

      updateUI();

      // Check win BEFORE switching player
      if (checkWin(r, col)) {
        statusText.innerText = currentPlayer.toUpperCase() + " WINS!";
        boardDiv.style.pointerEvents = "none";
        alert(currentPlayer.toUpperCase() + " WINS! 🎉");
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === "red" ? "yellow" : "red";

      statusText.innerText =
        currentPlayer === "red" ? "Red's Turn" : "Yellow's Turn";

      return;
    }
  }
}

// Update UI
function updateUI() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => {
    let r = parseInt(cell.dataset.row);
    let c = parseInt(cell.dataset.col);

    cell.classList.remove("red", "yellow");

    if (board[r][c]) {
      cell.classList.add(board[r][c]);
    }
  });
}

// Check win
function checkWin(row, col) {
  return (
    checkDirection(row, col, 0, 1) ||   // horizontal
    checkDirection(row, col, 1, 0) ||   // vertical
    checkDirection(row, col, 1, 1) ||   // diagonal \
    checkDirection(row, col, 1, -1)     // diagonal /
  );
}

function checkDirection(row, col, dr, dc) {
  let count = 1;

  count += countPieces(row, col, dr, dc);
  count += countPieces(row, col, -dr, -dc);

  return count >= 4;
}

function countPieces(row, col, dr, dc) {
  let r = row + dr;
  let c = col + dc;
  let count = 0;

  while (
    r >= 0 && r < ROWS &&
    c >= 0 && c < COLS &&
    board[r][c] === currentPlayer
  ) {
    count++;
    r += dr;
    c += dc;
  }

  return count;
}

// Start game
createBoard();