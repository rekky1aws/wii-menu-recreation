// VARIABLES
let staticInterval;

let settings = {
	timeInterval: 10, 
	divRatio: 30,
	blackRatio: 3/5, // Float beatween 0 and 1
	isPaused: true,
};

// CONSTANTS

const mainElt = document.querySelector('main');
const gridSizeElt = document.querySelector('#grid-size');
const pauseBtn = document.querySelector('#pause-button');
const sliders = document.querySelectorAll('.slider');

// FUNCTIONS
function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}

function setGridSize (parent = gridSizeElt)
{
	const viewHeight = Math.floor(window.innerHeight / settings.divRatio);
	const viewWidth = Math.floor(window.innerWidth / settings.divRatio);

	const text = `
		main {
			grid-template-rows: repeat(${viewHeight}, 1fr);
			grid-template-columns: repeat(${viewWidth}, 1fr);
		}
	`
	parent.innerHTML = text;
}

function getColor ()
{
	if (Math.random() < settings.blackRatio) {
		return "black";
	}

	return "white";
}

function emptyGrid (parent = mainElt)
{
	parent.innerHTML = null;
}

function generateGrid (parent = mainElt)
{
	const viewHeight = Math.floor(window.innerHeight / settings.divRatio);
	const viewWidth = Math.floor(window.innerWidth / settings.divRatio);

	for (let x = 0; x<(viewHeight * viewWidth); x++) {
		const elt = document.createElement('div');
		
		elt.classList.add('box');
		elt.classList.add(getColor());
		
		// console.log(elt);
		parent.append(elt);
	}

	return true;
}

function refreshGrid (parent = mainElt)
{
	for (const child of mainElt.children) {
		child.classList.remove("white", "black");
		child.classList.add(getColor());
	}
}

function playPause ()
{
	// Unpause
	if (settings.isPaused) {
		staticInterval = setInterval(refreshGrid, settings.timeInterval);
		settings.isPaused = false;
		pauseBtn.innerHTML = "&#x23F8;";
		
	// Pause
	} else {
		clearInterval(staticInterval);
		settings.isPaused = true;
		pauseBtn.innerHTML = "&#x23EF;";
	}
}

function keyEventHandler (evt)
{
	switch (evt.code) {
		case "Space":
			playPause();
			break;
			
		default:
			// statements_def
			break;
	}
}

function updateSetting (evt)
{
	settings[toCamelCase(evt.target.id)] = evt.target.value;
	start();
}

// This function takes a kebab-case string and translates it to camelCase
function toCamelCase (str)
{
	let splArr = str.split('-');
	splArr = splArr.map( (e) => {
		return e.charAt(0).toUpperCase() + e.slice(1)
	})
	let splJoined = splArr.join("")
	return splJoined.charAt(0).toLowerCase() + splJoined.slice(1)
}

// MAIN FUNCTION
function start ()
{
	emptyGrid();
	setGridSize();
	generateGrid();
}

// EVENT LISTENERS
addEventListener("keypress", keyEventHandler);
pauseBtn.addEventListener("click", playPause);

addEventListenerList(sliders, "change", updateSetting);

// MAIN
start();
// playPause();
