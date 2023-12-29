// CONSTANTS
const addPlayerButton = document.querySelector('#addPlayer');
const playerZone = document.querySelector('#playerZone');

// VARIABLES
let players =  [];

// FUNCTIONS
function addPlayer ()
{
	let playerName = prompt("Name your player", "Player n°"+(players.length+1));
	players.push(new Player(players.length, playerName));
	players[players.length - 1].display(playerZone);
}

// EVENT LISTENERS
addPlayerButton.addEventListener('click', addPlayer);

// MAIN