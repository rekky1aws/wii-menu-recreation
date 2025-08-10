// CONSTANTS
const minPlayerNb = 3;
const maxPlayerNb = 8;

const playerNameElts = document.querySelectorAll('.player-name');
const playerDelBtns = document.querySelectorAll('.del-player');
const playerNamesContainer = document.querySelector('#player-entries');
const startBtn = document.querySelector('#start-button');
const mainElt = document.querySelector('main');
const secretElt = document.querySelector('#secret');
const eventElt = document.querySelector('#event');
const newGameBtn = document.querySelector('#new-btn');
const nameGrid = document.querySelector('#name-grid');
const delAllBtn = document.querySelector('#del-all-btn');
const gameElt = document.querySelector('#game');
const viewBtn = document.querySelector('#view-btn');
const currPlayerElt = document.querySelector("#current-player");

// VARIABLES
let playerList;
let playerIndex = 0;
let undercover;
let normalEvent;
let undercoverEvent;

// FUNCTIONS
function playerNameAction (evt)
{
	const trgt = evt.target;
	const container = trgt.parentNode;

	// Removing input field if it's empty and there are still enough
	// fields for a playable game.
	// Not doing this if key is Tab to allow tab navigation.  
	if (trgt.value === "" && playerNamesContainer.children.length > minPlayerNb && evt.key !== "Tab") {
		container.remove();
	}

	// As soon as there is text in the last field, add a new one.
	// Don't add a field if there is alreaddy enough players il the game.
	if (trgt.value !== "" && playerNamesContainer.lastElementChild.querySelector(".player-name").value !== "" && playerNamesContainer.children.length < maxPlayerNb) {
		createNameInput();		
	}
}

function playerDelAction(evt)
{
	const player = evt.target.parentNode;
	const playerName = player.querySelector('.player-name').value;

	// console.log(player); // DEBUG
	// console.log(playerName); // DBEUG

	if (!confirm(`Êtes-vous sur de vouloir supprimer '${playerName}' de la liste de joueurs ?`)) {
		return false;
	}
	
	if (player.parentNode.children.length > minPlayerNb) {
		// console.log(`suppression de '${playerName}'`); // DEBUG
		// TODO : S'il n'y a pas d'autre entrée vide, supprimer uniquement le contenu sans suprimer toute la ligne
		player.remove();
	} else {
		player.querySelector('.player-name').value = "";
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
	const viewBtn = document.querySelector('#view-btn');

	if (playerList[playerIndex] == undercover) {
		eventElt.textContent = undercoverEvent;
	} else {
		eventElt.textContent = normalEvent;
	}
	eventElt.classList.remove('hidden');
	viewBtn.classList.add('hidden');
	secretElt.classList.remove('hidden');
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

	createNameGrid();

	/*
	playRound();
	*/
}

function delAllPlayers ()
{
	if (!confirm("Suprimer tous les joueurs ? (Cet action supprimera aussi les joueurs chargés automatiquement depuis la mémoire de l'appareil)")) {
		return false;
	}

	window.localStorage.removeItem("mister-coco-names");
	newGame();
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

function createNameGrid ()
{
	playerList.forEach((name) => {
		const playerElt = document.createElement('div');
		playerElt.textContent = name;
		playerElt.classList.add("clickable");
		playerElt.addEventListener("click", displayGameElt);
		nameGrid.append(playerElt);
	});
}

function displayGameElt (evt)
{
	gameElt.classList.add('show');
	currPlayerElt.textContent = evt.target.textContent;

	if (evt.target.textContent == undercover) {
		eventElt.textContent = undercoverEvent;
	} else {
		eventElt.textContent = normalEvent;
	}
}

function clearGameElt (evt)
{
	if(evt.target !== gameElt && evt.target !== gameElt.firstElementChild) {
		return false;
	}
	gameElt.classList.remove('show');
	secretElt.classList.add('hidden');
	eventElt.classList.add('hidden');
	eventElt.textContent = "Event placeholder";
	viewBtn.classList.remove('hidden');
}

// EVENT LISTENERS
playerNameElts.forEach((elt) => {
	elt.addEventListener("keyup", playerNameAction);
});

playerDelBtns.forEach((elt) => {
	elt.addEventListener("click", playerDelAction);
});

newGameBtn.addEventListener("click", newGame);
startBtn.addEventListener("click", startGame);
delAllBtn.addEventListener("click", delAllPlayers);
gameElt.addEventListener("click", clearGameElt);
viewBtn.addEventListener('click', showEvent);
// MAIN
playerList = loadPlayers();
if (playerList) {
	injectPlayers();
}