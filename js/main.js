/*----- constants -----*/
const COLORS = {
    '1': 'blue',
    '-1': 'red',
    '0': 'white' 
};

/*----- app's state (variables) -----*/
let board; // utilize nested arrays to represent the columns in the board
let turn; // 1 or -1; 0 for no movement

/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];
 
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
    render();
}

