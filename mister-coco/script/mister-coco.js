// CONSTANTS
const minPlayerNb = 3;
const maxPlayerNb = 8;

const playerNamesContainer = document.querySelector('#player-entries');
const playerNameElts = document.querySelectorAll('.player-name');
const playerDelBtns = document.querySelectorAll('.del-player');
const startBtn = document.querySelector('#start-button');
const mainElt = document.querySelector('main');
const secretElt = document.querySelector('#secret');
const eventElt = document.querySelector('#event');
const newGameBtn = document.querySelector('#new-btn');

// VARIABLES
let undercover;
let playerList;
let playerIndex = 0;
let normalEvent;
let undercoverEvent;

// FUNCTIONS
function playerNameAction (evt)
{
	// Removing input field if it's empty and there are still enough
	// fields for a playable game.
	// Not doing this if key is Tab to allow tab navigation.  
	if (evt.target.value === "" && evt.target.parentNode.children.length > minPlayerNb && evt.key !== "Tab") {
		evt.target.parentNode.remove();
	}

	// As soon as there is text in the last field, add a new one.
	// Don't add a field if there is alreaddy enough players il the game.
	if (evt.target.value !== "" && evt.target.parentNode.lastElementChild.value !== "" && evt.target.parentNode.children.length < maxPlayerNb) {
			createNameInput();		
	}
}

function playerDelAction(evt)
{
	const playerContainer = evt.target.parentNode;
	const playerName = playerContainer.querySelector('.player-name').value;

	// console.log(playerContainer); // DEBUG
	// console.log(playerName); // DBEUG

	if (confirm(`Êtes-vous sur de vouloir supprimer '${playerName}' de la liste de joueurs ?`)) {
		if (playerContainer.parentNode.children.length > minPlayerNb) {
			// console.log(`suppression de '${playerName}'`); // DEBUG
			
			playerContainer.remove();
		} else {
			playerContainer.querySelector('.player-name').value = "";
		}
	}
}

function createNameInput (name = null)
{
	/*
	<div class="player-container">
		<input type="text" name="player-name" placeholder="Nom du joueur" class="player-name">
		<button class="del-player clickable">X</button>
	</div>
	*/

	const newContainer = document.createElement('container');
	newContainer.classList.add("player-container");

	const newInput = document.createElement('input');
	newInput.type = "text";
	newInput.name = "player-name";
	newInput.placeholder = "Nom du Joueur";
	newInput.classList.add("player-name");

	const newDelBtn = document.createElement('button');
	newDelBtn.classList.add("del-player");
	newDelBtn.classList.add("clickable");
	newDelBtn.textContent = "X";

	if (name) {
		newInput.value = name;
	}

	newInput.addEventListener('keyup', playerNameAction);
	newDelBtn.addEventListener('click', playerDelAction);

	newContainer.append(newInput);
	newContainer.append(newDelBtn);
	playerNamesContainer.append(newContainer);
}

function getPlayerList ()
{
	const playerEntries = document.querySelectorAll('.player-name');
	const players = Array.from(playerEntries).filter((e) => { // Removing empty fields.
		if (e.value != "") {
			return e;
		}
	}).map((e) => { // Getting values
		return e.value;
	});
	return players;
}

function canGameStart (playerList)
{
	if (playerList.length < minPlayerNb) {
		throw new Error(`Pas assez de joueurs, il devrait y en avoir un minimum de ${minPlayerNb}`);
	}

	if (playerList.length > maxPlayerNb) {
		throw new Error(`Trop de joueurs, il devrait y en avoir au plus ${maxPlayerNb}`);
	}
}

function playRound ()
{
	const viewBtn = document.querySelector('#view-btn');
	const currentPlayer = document.querySelector('#current-player');

	// Resetting secret to avoid cheating
	secretElt.classList.add('hidden');
	eventElt.classList.add('hidden');
	viewBtn.classList.remove('hidden');
	eventElt.textContent = "";

	currentPlayer.textContent = playerList[playerIndex];
	viewBtn.addEventListener('click', showEvent);
	
}

function chooseEvents ()
{
	const normalEventInd = Math.floor(Math.random() * events.length);
	normalEvent = events[normalEventInd];
	let undercoverEventInd;
	do {
		undercoverEventInd = Math.floor(Math.random() * events.length);
	} while (undercoverEventInd === normalEventInd);
	undercoverEvent = events[undercoverEventInd];
}

function showEvent ()
{
	const nextBtn = document.querySelector('#next-btn');
	const viewBtn = document.querySelector('#view-btn');

	if (playerList[playerIndex] == undercover) {
		eventElt.textContent = undercoverEvent;
	} else {
		eventElt.textContent = normalEvent;
	}
	eventElt.classList.remove('hidden');
	viewBtn.classList.add('hidden');
	secretElt.classList.remove('hidden');

	playerIndex++;
	if (playerIndex < playerList.length) {
		nextBtn.addEventListener('click', playRound);
		return 0;
	} else {
		nextBtn.addEventListener('click', () => {
			mainElt.classList.remove('ingame');
			mainElt.classList.add('postgame');
		});
	}
}

function startGame ()
{
	playerList =  getPlayerList();

	try {
		canGameStart(playerList);
		savePlayers(playerList);

	} catch (err) {
		console.error(err);
		return  0;
	}

	// Pick random undercover player.
	undercover = playerList[Math.floor(Math.random() * playerList.length)];

	// Choosing events
	chooseEvents();

	// Changing the status of the game
	mainElt.classList.remove('pregame');
	mainElt.classList.add('ingame');

	
	playRound();
}

function newGame ()
{
	window.location.reload(true);
}

function savePlayers (playerList)
{
	window.localStorage.setItem("mister-coco-names", JSON.stringify(playerList));
}

function loadPlayers ()
{
	const players = window.localStorage.getItem("mister-coco-names");

	if (players) {
		const playersList = JSON.parse(players);
		return playersList;
	}

	return null;
}

function injectPlayers ()
{
	for (let i = 0; i < playerList.length; i++) {
		if (playerNameElts[i]) {
			playerNameElts[i].value = playerList[i];
		} else {
			if (i < maxPlayerNb) {
				createNameInput(playerList[i]);
			}
		}
	}
	if (playerList.length < maxPlayerNb) {
		createNameInput();
	}
}

// TODO : Inject loaded player names in DOM

// EVENT LISTENERS
playerNameElts.forEach((elt) => {
	elt.addEventListener("keyup", playerNameAction);
});

playerDelBtns.forEach((elt) => {
	elt.addEventListener("click", playerDelAction);
});


newGameBtn.addEventListener("click", newGame);

startBtn.addEventListener("click", startGame);

// MAIN
playerList = loadPlayers();
if (playerList) {
	injectPlayers();
}