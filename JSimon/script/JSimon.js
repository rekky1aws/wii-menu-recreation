// CONSTANTS
const buttons = {
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
let playbackInterval = 300;
let sequenceTimeout = undefined;
let level = 0;

// FUNCTIONS
function buttonPressed (evt) {
	let btnPressed = undefined;
	if (evt.target.localName == "span") {
		btnPressed = evt.target.parentNode;
	} else {
		btnPressed = evt.target;
	}

	playSound(btnPressed.id);
}

function simBtnPress (id) {
	playSound(id);
	lightButton(buttons[id]);
}

function playSound (soundID) {
	const audio = new Audio(sounds[soundID]);
	audio.play();
}

function lightButton (btn) {
	btn.classList.add('active');
	setTimeout( () => {
		btn.classList.remove('active');
	}, 100);
}

function sequencePlayback (i = 0) {
	if (i >= sequence.length) {
		clearInterval(sequenceTimeout);
	} else {
		simBtnPress(sequence[i]);
		setTimeout(sequencePlayback, playbackInterval, i+1);
	}
}

// EVENT LISTENERS
Object.keys(buttons).forEach( (e) => {
	buttons[e].addEventListener('click', buttonPressed);
});

//MAIN

////// TEST SEQUENCE
sequence = [
	'right',
	'right',
	'top',
	'bottom',
	'left',
	'bottom',
	'top'
];
sequencePlayback();

