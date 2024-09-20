// CONSTANTS
const addPlayerButton = document.querySelector('#addPlayer');
const changeMode = document.querySelector('#changeTheme');
const playerZone = document.querySelector('#playerZone');

// VARIABLES
let players =  [];

// FUNCTIONS
function addPlayer ()
{
	let playerName = `Player n°+${players.length+1}`;
	players.push(new Player(players.length, playerName));
	players[players.length - 1].create(playerZone);
}

function changeTheme ()
{
	const body = document.body;
	console.log(body);
}

// EVENT LISTENERS
addPlayerButton.addEventListener('click', addPlayer);

// MAIN