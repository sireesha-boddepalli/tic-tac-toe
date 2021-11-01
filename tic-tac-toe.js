const playerTurn = document.getElementById('playerTurn');
const cells = document.querySelectorAll('.cell');
const grid = document.getElementById('grid');
const replayBtn = document.getElementById('replay-btn');
const resetBtn = document.getElementById('reset-btn');


let currentPlayer = 'X';
let matchFinished = false;

// keeps track of the current state of the match
function decision() {

    // all posibilities for winning
    const directions = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // check through all possibiilties
    for (let direction of directions) {
        let i1 = direction[0], i2 = direction[1], i3 = direction[2];
        let val1 = cells[i1].innerText;
        let val2 = cells[i2].innerText;
        let val3 = cells[i3].innerText;
        if (val1 === val2 && val2 === val3 && val1 !== '')   return val1;
    }

    // check if match is a draw
    for (let cell of cells)
        if (cell.innerText === '')
            return 'continue';
    
    // if there is no empty cell
    // and nobody has won
    // then it is a draw
    return 'draw';
}

function onClickCell(event){
    // if match is already finished - no action is taken
    if (matchFinished)  return;

    // take an action
    let cell = event.target;
    let oldValue = cell.innerText;
    if(oldValue === ''){
        cell.innerText = currentPlayer
        currentPlayer = (currentPlayer === 'X' ? 'O' : 'X');
        playerTurn.innerText = (currentPlayer === 'X' ? 'Player1' : 'Player2');   
        
        // check the state of the match
        let result = decision();
        if(result === 'continue')   return;
        if(result === 'X'){
            playerTurn.innerText = 'Player1 won!!!'
        }else if(result === 'O'){
            playerTurn.innerText = 'Player2 won!!!'
        }else{
            playerTurn.innerText = 'Its a draw :('
        }
        // match is over
        matchFinished = true;
        // fade the grid
        grid.classList.add('game-over-grid-container');  
        // Display the replay button
        replayBtn.classList.remove('hide');     
        // hide the reset button
        resetBtn.classList.add('hide'); 
    }else{
        alert('Invalid Move!');
    }
}


// Resets the game to play again
function resetGame(){
    // make every cell empty
    for(let cell of cells)  cell.innerText = '';
    // Player1 plays the first chance
    currentPlayer = 'X';
    playerTurn.innerText = 'Player1';
    // Match is not finished
    matchFinished = false;
    // Hide the replay button until the match is finished
    replayBtn.classList.add('hide');
    resetBtn.classList.remove('hide');
    // Restore the grid
    grid.classList.remove('game-over-grid-container');
}



// Add click Listener to the cells
for(let i = 0; i < cells.length; i++){
    let cell = cells[i];
    cell.addEventListener('click', onClickCell);
}

// Add clickListener to replay button
replayBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

