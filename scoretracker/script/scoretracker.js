// CONSTANTS
const addPlayerBtn = document.querySelector('#addPlayer');
const resetScoresBtn = document.querySelector('#resetScores');
const removeAllPlayersBtn = document.querySelector('#removeAllPlayers');
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

function removeAllPlayers ()
{
	if (confirm("This will delete all the players and their scores. Are you sure you want to do this ?")) {
		players = [];
		playerZone.innerHTML = "";
	}
}

function saveLocal ()
{
	const gameState = {
		players: players,
	}
	localStorage.setItem("scoretracker", JSON.stringify(gameState));
}

// EVENT LISTENERS
addPlayerBtn.addEventListener('click', addPlayer);
resetScoresBtn.addEventListener('click', resetScores);
removeAllPlayersBtn.addEventListener('click', removeAllPlayers);

// MAIN