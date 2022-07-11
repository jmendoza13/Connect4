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
let winner;

/*----- cached element references -----*/

const markerEls = [...document.querySelectorAll('#markers > div')];
const msgEl = document.querySelector('h2');
const replayBtn = document.getElementById('replay');

/*----- event listeners -----*/

document.getElementById('markers').addEventListener('click', handleDrop);
let test = replayBtn.addEventListener('click', init);

/*----- functions -----*/
init(); // utilizing init to initialize for a function
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
    gameStatus = null;
    winner = 0;
    render();
}

function render() {
    //iterating over the column arrays (defined by 'board')
    board.forEach(function (colArr, colIdx) {
        colArr.forEach(function (cellVal, rowIdx) {
            let cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
            cellEl.style.backgroundColor = COLORS[cellVal];
        });
    });
    // hide or show markers if no 0s exist in a particular column
    renderMarkers();
    renderMessage();
}

function renderMarkers() {
    markerEls.forEach(function (markerEl, colIdx) {
        markerEl.style.visibility = board[colIdx].includes(0) ? "visible" : "hidden";
        if (winner === -1 || winner === 1) {
            markerEl.style.visibility = "hidden"
        };
    });
}


//update all impacted state, then call render
function handleDrop(evt) {
    const colIdx = markerEls.indexOf(evt.target);
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    colArr[rowIdx] = turn;
    turn *= -1;
    winner = checkWinner(colIdx, rowIdx);
    render();
}

function vertWin(colIdx, rowIdx, player) {
    const color = board[colIdx][rowIdx];
    let amountOfColors = 1;
    rowIdx--;
    while (board[colIdx][rowIdx] === player && rowIdx >= 0) {
        amountOfColors++
        rowIdx--
    }
    return amountOfColors >= 4 ? winner = turn * -1 : 0
}




function horizWin(colIdx, rowIdx) {
    const color = board[colIdx][rowIdx];
    let amountOfColors = 1;
    let position = colIdx + 1;
    // this while loop represents the left side of the board
    while (position < board.length && board[position][rowIdx] === color) {
        amountOfColors++
        position++
    }
    position = colIdx - 1;
    // this while loop represents the right side of the board
    while ((position >= 0) && board[position][rowIdx] === color) {
        amountOfColors++
        position--
    }
    return amountOfColors >= 4 ? winner = turn * -1 : 0
}



function diagWinLeft(colIdx, rowIdx) {
    const color = board[colIdx][rowIdx];
    let amountOfColors = 1;
    let position = colIdx - 1;
    let position2 = rowIdx + 1;

    while (position >= 0 && position2 < board[0].length && board[position][position2] === color) {
        amountOfColors++;
        position--;
        position2++;
    }
    position = colIdx + 1;
    currRowIdx = rowIdx - 1;

    while (position < board.length && currRowIdx >= 0 && board[position][currRowIdx] === color) {
        amountOfColors++
        position++;
        currRowIdx--;
    }
    return amountOfColors >= 4 ? winner = turn * -1 : 0
}


function diagWinRight(colIdx, rowIdx) {
    const color = board[colIdx][rowIdx];
    let amountOfColors = 1;
    let position = colIdx + 1;
    let currRowIdx = rowIdx + 1;
    while (position < board.length && currRowIdx >= 0 && board[position][currRowIdx] === color) {
        amountOfColors++;
        position++;
        currRowIdx++;
    }
    position = colIdx - 1;
    currRowIdx = rowIdx - 1;
    while (position >= 0 && currRowIdx < board[0].length && board[position][currRowIdx] === color) {
        amountOfColors++
        position--;
        currRowIdx--;
    }
    return amountOfColors >= 4 ? winner = turn * -1 : 0
}


function renderMessage() {
    if (winner === 'T') {
        //tie game
        msgEl.textContent = "It's a Draw! No one wins!";
    } else if (winner === 1 || winner === -1) {
        // winner
        msgEl.innerHTML = `PLAYER <span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> WINS!`;
    } else {
        //turn
        msgEl.innerHTML = `PLAYER <span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s TURN`;
    }
}


function checkWinner(colIdx, rowIdx) {
    const player = board[colIdx][rowIdx]
    return vertWin(colIdx, rowIdx, player) ||
        horizWin(colIdx, rowIdx, player) ||
        diagWinLeft(colIdx, rowIdx, player) ||
        diagWinRight(colIdx, rowIdx, player)
}

//