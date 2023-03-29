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

const BOARD_LIMIT = 9;
const board = document.querySelector('.board');

/**
 * check the player that goes first marks first
 * only when they have picked three
 * if no availabe squares to pick (which needs to be determined/tracked)
 * this will signify a 'draw'
 * 
 * Need to determine player is marking squares
 * check why checkPlayersMarks is coming back at least seven times
 */
let P1 = [], P2 = [];
const possibleWins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
// console.log(possibleWins);
const checkPlayersMarks = () => {
    possibleWins.forEach(arr => {
        // console.log(arr.slice('').join('').includes(P1.slice('').join('')));
        if (arr.slice('').join('').includes(P1.slice('').join(''))) console.log('You won!')
        P1 = [];
        P2 = [];
    });
};


// track player's marked squares
const trackMarks = (e) => {
    // console.log(e.target.id);
    // console.log(P1.length);
    P1.push(e.target.id);
    if (P1.length === 3) checkPlayersMarks();
    
};

// draw board
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
        squareDiv.textContent = `${i}`;
        board.appendChild(squareDiv);
        // add event listener to each square
        squareDiv.addEventListener('click', trackMarks);
    }
}
// initize and draw game board
drawBoard();