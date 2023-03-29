/**
  Technical Requirements
    Your Tic Tac Toe app must:

        Render a game board in the browser
        Switch turns between X and O (or whichever markers you select)
        Visually display which side won if a player gets three in a row, or show a draw if neither player wins
        Include separate HTML / CSS / JavaScript files
        Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
        Use JavaScript for DOM manipulation
        Deploy your game online, where the rest of the world can access it
        You can use GitHub Pages for deploying your project
        Use semantic markup for HTML and CSS (adhere to best practices)
        Have well-formatted, and well-commented code
User Stories
        As a user, I should be able to start a new tic tac toe game
        As a user, I should be able to click on a square to add X first and then O, and so on
        As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
        As a user, I should not be able to click the same square twice
        As a user, I should be shown a message when I win, lose or tie
        As a user, I should not be able to continue playing once I win, lose, or tie
        As a user, I should be able to play the game again without refreshing the page
Potential Extra Tic Tac Toe Features
        Keep track of multiple game rounds with a win, lose and tie counter
        Allow players to customize their tokens (X, O, name, picture, etc)
        Use localStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity
        Involve Audio in your game
        Create an AI opponent: teach JavaScript to play an unbeatable game against you
        Make your site fully responsive so that it is playable from a mobile phone
        Get inventive with your styling e.g. use hover effects or animations

 */
// obtain board elememts
const BOARD_LIMIT = 9;
const board = document.querySelector('.board');
// obtain players buttons
const p1Btn = document.querySelector('#p1');
const p2Btn = document.querySelector('#p2');
// obtain play/reset button
const playResetBtn = document.querySelector('#play-reset');


//  track game in play
let isPlaying = false;

/**
 * check the player that goes first marks first
 * only when they have picked three
 * if no availabe squares to pick (which needs to be determined/tracked)
 * this will signify a 'draw'
 * 
 * Need to determine player is marking squares
 * check why checkPlayersMarks is coming back at least seven times
 */
// initialize players
let P1 = [], P2 = [];
let isPlayerX = '', isPlayerO = '', activePlayer = '';


// initialize and define possible wins
const possibleWins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


// reset game
const resetGame = () => {
    P1 = [];
    P2 = [];
    isPlayerX = '';
    isPlayerO = '';
    activePlayer = '';
    isPlaying = false;
    p1Btn.style.backgroundColor = '';
    p2Btn.style.backgroundColor = '';
    playResetBtn.textContent = 'Play';

    // reset game board
    const board = document.querySelectorAll('.square');
    board.forEach(square => square.textContent = '');
};

// this function will check player mark against possible wins
const checkPlayersMarks = (playerMarks, player) => {
    console.log({checkingMarks: playerMarks.slice('').sort((a,b) => a - b).join('')})
    possibleWins.forEach(arr => {
        if (arr.slice('').join('').includes(playerMarks.slice('').sort((a,b) => a - b).join('')) || 
            playerMarks.slice('').sort((a,b) => a - b).join('').includes(arr.slice('').join(''))) {
            console.log(`${player} won!`);
            resetGame();
        }
    });
};

// set player 1 and player 2 default colors
const setPlayerColor = (player) => {
    if (player === 'p1') {
        p1Btn.style.backgroundColor = 'red';
        p2Btn.style.backgroundColor = '';
    } else {
        p2Btn.style.backgroundColor = 'purple';
        p1Btn.style.backgroundColor = '';
    }  
}

// set the player's mark on the game board
const setPlayerMark = (player, squareLoc, plays) => {
    // obtain element & set in appropriate player's marked square
    const markedSquare = document.querySelector(`[id='${squareLoc}']`);
    // check if marked/played
    if (markedSquare.textContent.length === 0) {
        plays.push(squareLoc);
        markedSquare.textContent = player === isPlayerX ? 'X' : 'O';
    } else {
        alert(`This square has already been played.`);
        return;
    }
}

// track player's marked squares
const trackMarks = (e) => {
    if (!isPlayerX) {
        alert(`Please select the first player...`);
        return;
    }
    if (isPlaying) {
        let squareId = e.target.id;
        switch (activePlayer) {
            case 'p1':
                // call function to set playere marks and check them
                setPlayerMark(activePlayer, squareId, P1);
                if (P1.length >= 3) checkPlayersMarks(P1, activePlayer);
                if (isPlaying) activePlayer = 'p2';
                console.log('Player 1 Marks: ', P1);
                break;
            case 'p2':
                // 
                setPlayerMark(activePlayer, squareId, P2);
                if (P2.length >= 3) checkPlayersMarks(P2, activePlayer);
                if (isPlaying) activePlayer = 'p1';
                console.log('Player 2 Marks: ', P2);
                break;
            default:
                alert(`No player on the Tic...`)
                break;
        }
        if (isPlaying) setPlayerColor(activePlayer);
    } 
};

// put active player in play
const startPlayer = (currPlayer) => {
    // set game into play mode and playerX and playerO
    if (isPlaying === false) {
        isPlaying = true;
        isPlayerX = currPlayer;
        isPlayerO = isPlayerX === 'p2' ? 'p1' : 'p2';
        playResetBtn.textContent = 'Reset';
        setPlayerColor(isPlayerX);
    } 
    // set activePlayer only once per game play
    if (activePlayer.length === 0) activePlayer = currPlayer;
};

// draw game board
const drawBoard = () => {
    for (let i = 0; i < BOARD_LIMIT; i++) {
        const squareDiv = document.createElement('div');
        // set class and id attributes
        const squareDivAttr = document.createAttribute('class');
        squareDivAttr.value = 'square';
        squareDiv.setAttributeNode(squareDivAttr);
        const squareDivAttrId = document.createAttribute('id');
        squareDivAttrId.value = `${i}`;
        squareDiv.setAttributeNode(squareDivAttrId);
        // squareDiv.textContent = `${i}`;
        board.appendChild(squareDiv);
        // add event listener to each square
        squareDiv.addEventListener('click', trackMarks);
    }
};

// initize and draw game board
drawBoard();

// listen for who goes first
p1Btn.addEventListener('click', () => {
    // mark as playerX or playerO
    startPlayer('p1');
});

p2Btn.addEventListener('click', () => {
    // mark as playerX or playerO
    startPlayer('p2');
});

playResetBtn.addEventListener('click', () => {
    if (!isPlayerX) {
        alert(`Please select the first player...`);
        return;
    }
    // toggle play/reset mode
    isPlaying = !isPlaying;
    if (isPlaying) {
        playResetBtn.textContent = 'Reset';
    } else {
        playResetBtn.textContent = 'Play';
        // need to reset gameboard and players
        resetGame();
    }
});