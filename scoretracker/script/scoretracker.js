// CONSTANTS
const addPlayerBtn = document.querySelector('#addPlayer');
const changeThemeBtn = document.querySelector('#changeTheme');
const resetScoresBtn = document.querySelector('#resetScores');
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

function resetScores ()
{
	players.forEach( (player) => {
		player.setScore(0);
	});
}

// EVENT LISTENERS
addPlayerBtn.addEventListener('click', addPlayer);
changeThemeBtn.addEventListener('click', changeTheme);
resetScoresBtn.addEventListener('click', resetScores);

// MAIN