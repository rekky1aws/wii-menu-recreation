// CONSTANTS
const gameContainer = document.querySelector('#game');
const startBtn = document.querySelector('.game-button#start');
const gameBtns = {
	top: document.querySelector('.game-button#top'),
	left: document.querySelector('.game-button#left'),
	right: document.querySelector('.game-button#right'),
	bottom: document.querySelector('.game-button#bottom'),
};

const sounds = {
	top: './media/beep-B.mp3',
	left: './media/beep-C.mp3',
	right: './media/beep-D.mp3',
	bottom: './media/beep-E.mp3',
	wrong: './media/wrong.mp3',
};

// VARIABLES
let sequence = [];
let curSeqInd = 0;
let pbItvl = 300;
let seqTO = undefined;
let lvl = 0;
let gameStarted = false;

// FUNCTIONS
function buttonPressed (evt) {
	// Don't do anything if game hasn't started
	if (!gameStarted) {
		return null;
	}

	let btnPressed = undefined;
	if (evt.target.localName == "span") {
		btnPressed = evt.target.parentNode;
	} else {
		btnPressed = evt.target;
	}

	const result = chckSeq(btnPressed.id);
}

function simBtnPress (id) {
	playSound(id);
	lightBtn(gameBtns[id]);
}

function playSound (soundID) {
	const audio = new Audio(sounds[soundID]);
	audio.play();
}

function lightBtn (btn) {
	btn.classList.add('active');
	setTimeout( () => {
		btn.classList.remove('active');
	}, 100);
}

function seqPb (i = 0) {
	if (i >= sequence.length) { // Sequence end
		clearInterval(seqTO);
		gameContainer.classList.add('player-turn'); // Player can use the buttons.
	} else { // Rest of the sequence
		if ('player-turn' in gameContainer.classList) {
			gameContainer.classList.remove('player-turn'); // Player can't use the buttons.
		}
		simBtnPress(sequence[i]);
		seqTO = setTimeout(seqPb, pbItvl, i+1);
	}
}

function startGame () {
	startBtn.style.display = 'none';
	gameContainer.classList.add('game-started');
	gameStarted = true;
	genNextSeqElt();

	seqTO = setTimeout(seqPb, pbItvl);
}

function genNextSeqElt () {
	const values = Object.keys(gameBtns);
	const key =  Math.floor(Math.random() * values.length);

	sequence.push(values[key]);
}

function chckSeq (btnId) {
	if (btnId === sequence[curSeqInd]) {
		playSound(btnId);
		if (curSeqInd+1 < sequence.length) {
			curSeqInd++;
		} else {
			curSeqInd = 0;
			genNextSeqElt();
			setTimeout(seqPb, 1000);
		}
	} else {
		playSound('wrong');
		resetGame();
	}
}

function resetGame () {
	sequence = [];
	curSeqInd = 0;
	pbItvl = 300;
	lvl = 0;
}

// EVENT LISTENERS
startBtn.addEventListener('click', startGame);

Object.keys(gameBtns).forEach( (e) => {
	gameBtns[e].addEventListener('click', buttonPressed);
});

//MAIN

