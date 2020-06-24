/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
   for (let i = 0; i < HEIGHT; i++) {
     const makeRow = []; 
     for (let i = 0; i < WIDTH; i++) {
       makeRow.push(null); 
     }
     board.push(makeRow);
   }
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

function revealBoard(){
  let startBtn = document.getElementById('start-game')
  console.log(startBtn)
  startBtn.addEventListener("click",function (){
    let hero = document.getElementById('hero')
    hero.setAttribute("class", "gameBoard")
  })
}
revealBoard();

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // TODO: add comment for this code
  // Variable top is creating the top table row
  const top = document.createElement("tr");
  // Giving top an id of column-top
  top.setAttribute("id", "column-top");
  // Adding event listner for click on the top row 
  top.addEventListener("click", handleClick);

  //Creating a for loop for width (which is 7)
  for (let x = 0; x < WIDTH; x++) {
    //Creates 7 data cells (This is the top part of the board!)
    let headCell = document.createElement("td");
    //Gives each data cell an ID (0-6)
    headCell.setAttribute("id", x);
    //Appends each headCell to the top row 
    top.append(headCell);
  }
  //appends top to HTML board 
  htmlBoard.append(top);

  // TODO: add comment for this code
  //Loop over height of board 
  for (let y = 0; y < HEIGHT; y++) {
  //Create 6 rows
    const row = document.createElement("tr");
  //Loop over width of the board (7)
    for (let x = 0; x < WIDTH; x++) {
    //creating a td for each cell hence creating the board
      const cell = document.createElement("td");
      //Each cell will have a unique ID the y and the x axis 
      cell.setAttribute("id", `${y}-${x}`);
      //Each cell is then appended to each row
      row.append(cell);
    }
    //Each row is appended to HTMLboard (Loop within a loop) 
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // For loop (y starts at 5 to account for 0, y is greater than or equal to 0, y decrementing)
  for (let y = HEIGHT - 1; y >= 0; y--) {
		if (board[y][x] === null) {
			board[y][x] = currPlayer;
			return y;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  const getSpot = document.getElementById(`${y}-${x}`)
  piece.classList.add('piece', `p${currPlayer}`);
  getSpot.appendChild(piece);
  console.log(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  window.alert(msg); 

  htmlBoard = document.getElementById('board'); 
  htmlBoard.innerHTML = ''; 
  board = []; 

  makeHtmlBoard(); 
  makeBoard();
  
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {

  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  (currPlayer === 1) ? (currPlayer = 2) : (currPlayer = 1);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
