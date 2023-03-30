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
        Use localStorage to persist data locally to allow games to continue after page refresh or loss of 
            internet connectivity
        Involve Audio in your game
        Create an AI opponent: teach JavaScript to play an unbeatable game against you
        Make your site fully responsive so that it is playable from a mobile phone
        Get inventive with your styling e.g. use hover effects or animations

 */

// define and set variables
const BOARD_LIMIT = 9;
const player1BtnColor = '#FDB9FC';
const player2BtnColor = '#77ACF1';
// obtain board elememts
const board = document.querySelector('.board');
// obtain players buttons
const p1Btn = document.querySelector('#p1');
const p2Btn = document.querySelector('#p2');
// obtain play/reset button
const playResetBtn = document.querySelector('#play-reset');
// track game in play
let isPlaying = false, reset = false;
// initialize players
let P1 = [], P2 = [];
let isPlayerX = '', isPlayerO = '', activePlayer = '';
// track player's wins and draws count
let playerOneWins = 0, playerOneLoses = 0;
let playerTwoWins = 0, playerTwoLoses = 0;
let playerTie = 0;
let playsCount = 0;
let errDisplayed = false;
// obtain game status elements
const playerOneStats = document.querySelector("#p1-wins");
const playerTwoStats = document.querySelector("#p2-wins");
const drawStats = document.querySelector("#draws");
// obtain display message element
const messageEl = document.querySelector('#message');

// initialize and define possible wins
const possibleWins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// setup for play
const replay = () => {
    P1 = [];
    P2 = [];
    isPlayerX = '';
    isPlayerO = '';
    activePlayer = '';
    isPlaying = false;
    reset = true;
    playsCount = 0;
    p1Btn.style.backgroundColor = '';
    p2Btn.style.backgroundColor = '';
};

// reset game
const resetGame = () => {
    // set for play
    replay();
    reset = false;
    // reset game board
    const board = document.querySelectorAll('.square');
    board.forEach(square => square.textContent = '');
    playResetBtn.textContent = 'Play';
};

// handle error messages
const alertMessage = (type, forWhom) => {
    let messageText = '';
    switch (type) {
        case 'W':
            messageText = `${forWhom} has WON!`;
            break;
        case 'D':
            messageText = `Looks like this will be a Tie/Draw!`;
            playerTie++;
            break;
        case 'Played':
            if (reset === true) {
                messageText = `Please reset the board to play again.`;
            } else {
                messageText = `This square has already been played.`;
            }
            errDisplayed = !errDisplayed;
            break;
        case 'First':
            if (!reset) messageText = 'Please select the first player before beginning to play game.';

        default:
            break;
    }
    messageEl.textContent = messageText;
};

const gameWinDrawLose = (player, status) => {
    if (status !== 'D') {
        if (player === 'p1') {
            alertMessage('W', 'Player 1');  
        } else {
            alertMessage('W', 'Player 2');
        }
     
        if (player === 'p1') {
            playerOneWins++;
            playerTwoLoses++;
        } else if (player === 'p2') {
            playerTwoWins++;
            playerOneLoses++;
        }
        playerOneStats.textContent = `Player 1 Stats: Wins ${playerOneWins} Loses: ${playerOneLoses}`;
        playerTwoStats.textContent = `Player 2 Stats: Wins ${playerTwoWins} Loses: ${playerTwoLoses}`;
    } else {
        if (playerTie > 0) drawStats.textContent = `Tie Count is: ${playerTie}`;
    }
    // reset for another game
    replay();
};

// this function will check player mark against possible wins
const checkPlayersMarks = (playerMarks, player) => {
    let winner = false;
    possibleWins.forEach(arr => {
        if (arr.every((num) => playerMarks.sort((a,b) => a - b).includes(num))) {
            winner = true;
            gameWinDrawLose(player, 'W');
        } 
    });
    // need to check if lose for other player or tie (playerTie get's this one)
    if (!winner) {
        if (playsCount === BOARD_LIMIT) {
            alertMessage('D', '');
            gameWinDrawLose('tie', 'D');
        }
    }
};

// set player 1 and player 2 default colors
const setPlayerColor = (player) => {
    if (player === 'p1') {
        p1Btn.style.backgroundColor = player1BtnColor;
        p2Btn.style.backgroundColor = '';
    } else {
        p2Btn.style.backgroundColor = player2BtnColor;
        p1Btn.style.backgroundColor = '';
    }  
}

// set the player's mark on the game board
const setPlayerMark = (player, squareLoc, plays) => {
    // obtain element & set in appropriate player's marked square
    const markedSquare = document.querySelector(`[id='${squareLoc}']`);
    // check if marked/played
    if (markedSquare.textContent.length === 0) {
        plays.push(Number(squareLoc));
        markedSquare.textContent = player === isPlayerX ? 'X' : 'O';
        playsCount++;  // increment the plays counter
    } else {
        alertMessage('Played', player);
    }
};

// track player's marked squares
const trackMarks = (e) => {
    if (!isPlayerX) alertMessage('First', '');
    
    if (isPlaying) {
        let squareId = e.target.id;
        switch (activePlayer) {
            case 'p1':
                // call function to set player's marks and check them
                setPlayerMark(activePlayer, squareId, P1);
                if (P1.length >= 3) checkPlayersMarks(P1, activePlayer);
                if (isPlaying && !errDisplayed) activePlayer = 'p2';
                errDisplayed = false;
                break;
            case 'p2':
                // call function to set player's marks and check them
                setPlayerMark(activePlayer, squareId, P2);
                if (P2.length >= 3) checkPlayersMarks(P2, activePlayer);
                if (isPlaying && !errDisplayed) activePlayer = 'p1';
                errDisplayed = false;
                break;
            default:
                break;
        }
        // game in play; call function to set next player's button w/ color indicator
        if (isPlaying) setPlayerColor(activePlayer);
    } 
};

// put active player in play
const startPlayer = (currPlayer) => {
    // clear message; if any
    if (messageEl.textContent.length > 0) messageEl.textContent = '';
    // set game into play mode and playerX and playerO
    if (isPlaying === false && reset === false) {
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
        board.appendChild(squareDiv);
        // add event listener to each square
        squareDiv.addEventListener('click', trackMarks);
    }
};

// call function to initize and draw game board
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
// listen for game mode
playResetBtn.addEventListener('click', () => {
    // if (messageEl.textContent.length > 0) messageEl.textContent = '';
    messageEl.textContent = '';
    if (!isPlayerX) alertMessage('First', '');
    // toggle play/reset mode
    if (isPlayerX) isPlaying = !isPlaying;
    if (isPlaying) {
        playResetBtn.textContent = 'Reset';
    } else {
        // need to reset gameboard and players
        resetGame();
    }
});