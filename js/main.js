/*----- constants -----*/
const COLORS = {
    '1': 'blue',
    '-1': 'red',
    '0': 'white' 
};

/*----- app's state (variables) -----*/

let board; // utilize nested arrays to represent the columns in the board
let turn; // 1 or -1; 0 for no movement
let gameStatus; // null = game in progress; 1/-1 player win; 'T' = tie;

/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
const msgEl = document.querySelector('h2');

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);

/*----- functions -----*/
init (); // utilizing init to initialize for a function
function init() {
    // board represents the outer array
    board = [
        [0, 0, 0, 0, 0, 0], // Each 0 represents a row; this array represents column 1 [index 0]
        [0, 0, 0, 0, 0, 0], // column 2 [index 1]
        [0, 0, 0, 0, 0, 0], // column 3 [index 2]
        [0, 0, 0, 0, 0, 0], // column 4 [index 3]
        [0, 0, 0, 0, 0, 0], // column 5 [index 4]
        [0, 0, 0, 0, 0, 0], // column 6 [index 5]
        [0, 0, 0, 0, 0, 0], // column 7 [index 6]
    ];
    turn = 1;
    gameStatus= null;
    render();
}

function render() {
    //iterating over the column arrays (defined by 'board')
    board.forEach(function(colArr, colIdx) {
       colArr.forEach(function(cellVal, rowIdx) {
        let cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
        cellEl.style.backgroundColor = COLORS[cellVal];
        });
    });
    // hide or show markers if no 0s exist in a particular column
    renderMarkers();
    renderMessage();
}

function renderMarkers() {
    markerEls.forEach(function(markerEl, colIdx) {
        markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
    });
}


//update all impacted state, then call render
function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    if (colIdx === -1)return; 
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    turn *= -1;
    //getWinner(colIdx, rowIdx);
    vertWin(colIdx, rowIdx);
    horizWin(colIdx, rowIdx);
    diagWinLeft(colIdx, rowIdx);
    diagWinRight(colIdx, rowIdx);
    render();
}

function vertWin(colIdx, rowIdx) {
    const color = board[colIdx][rowIdx];
    let amountOfColors = 0;
    let currRowIdx = rowIdx;
    while (currRowIdx >= 0 && board[colIdx][currRowIdx] == color) {
        amountOfColors++
        currRowIdx--
    }
    if (amountOfColors == 4) {
        alert(color + ' has won')
    }
}

    
function horizWin(colIdx, rowIdx) {
    const color = board[colIdx][rowIdx];
    let amountOfColors = 0;
    let position = colIdx;
    while (position >= 0 && board[position][rowIdx] == color) {
        amountOfColors++
        position--
    }
    position = colIdx;
    while (position != board[0].length && board[position][rowIdx] == color) {
        amountOfColors++
        position++
    }
    // We check for 5 because we check over the same position twice
    if (amountOfColors >= 5)  {
        alert(color + ' has won')
    } 
}


function diagWinLeft(colIdx, rowIdx) {
    const color = board[colIdx][rowIdx];
    let amountOfColors = 1;
    let position = colIdx - 1;
    let currRowIdx = rowIdx + 1;

    while (position != board[0].length && position >=0 && currRowIdx < board[0].length && board[position][currRowIdx] == color) {
        amountOfColors++;
        position--;
        currRowIdx++;
        //debugger;
    }
    position = colIdx + 1;
    currRowIdx = rowIdx -1;
    while (position != board[0].length && position < board.length &&  currRowIdx >= 0 && board[position][currRowIdx] == color) {
        amountOfColors++
        position++;
        currRowIdx--;
    }
    // We check for 5 because we check over the same position twice
    if (amountOfColors >= 4)  {
        alert(color + ' has won')
    } 
    console.log('diagWinLeft', amountOfColors)
}

 function diagWinRight(colIdx, rowIdx) {
    const color = board[colIdx][rowIdx];
    let amountOfColors = 1;
    let position = colIdx + 1;
    let currRowIdx = rowIdx + 1; 
    while (position != board[0].length && position <board.length && currRowIdx < board[0].length && board[position][currRowIdx] == color) {
        amountOfColors++;
        position++;
        currRowIdx++;
    }
    position = colIdx - 1;
    currRowIdx = rowIdx -1;
    while (position != board[0].length && position >=0 && currRowIdx >= 0 && board[position][currRowIdx] == color) {
        amountOfColors++
        position--;
        currRowIdx--;
    }
   // We check for 5 because we check over the same position twice
    if (amountOfColors >= 5)  {
        alert(color + ' has won')
    } 
}


function renderMessage() {
    if(gameStatus === null) {
        msgEl.innerHTML = `Player <span style="color: ${COLORS[turn]}">${COLORS[turn]}</span>'s Turn`;
    }else if(gameStatus === 'T') {
        //Tie game
        msgEl.textContent = "It's a Draw! No one wins!";
    }else {
        //player 'x' wins
        msgEl.innerHTML = `Player <span style="color: ${COLORS[gameStatus]}">${COLORS[turn]}</span>'s Wins!`;
    }
}


//function getWinner(colIdx, rowIdx) {
    // look to the left or right for current turn, 4 or more times, return true/win; victory
    // look below for current turn 4 or more times, return true/win; victory
    // look up to the left or down to the right for current turn 4 or more times, return true; victory
//}
