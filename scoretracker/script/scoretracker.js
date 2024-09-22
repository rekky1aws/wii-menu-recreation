// CONSTANTS
const addPlayerButton = document.querySelector('#addPlayer');
const changeMode = document.querySelector('#changeTheme');
const playerZone = document.querySelector('#playerZone');

// VARIABLES
let players =  [];

// FUNCTIONS
function addPlayer ()
{
	let playerName = `Player n°${players.length+1}`;
	players.push(new Player(players.length, playerName));
	players[players.length - 1].create(playerZone);
}

function changeTheme ()
{
	const body = document.body;
	if (Array.from(body.classList).includes('dark')) {
		body.classList.remove('dark');
	} else {
		body.classList.add('dark');
	}
}

// EVENT LISTENERS
addPlayerButton.addEventListener('click', addPlayer);
changeMode.addEventListener('click', changeTheme);

// MAIN