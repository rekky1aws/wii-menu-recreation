// VARIABLES
let staticInterval;

let settings = {
	timeInterval: 10, 
	divRatio: 30,
	blackRatio: 3/5, // Float beatween 0 and 1
	isPaused: true,
};

// CONSTANTS
const viewHeight = Math.floor(window.innerHeight / settings.divRatio);
const viewWidth = Math.floor(window.innerWidth / settings.divRatio);

const mainElt = document.querySelector('main');
const gridSizeElt = document.querySelector('#grid-size');
const pauseBtn = document.querySelector('#pause-button');

// FUNCTIONS
function setGridSize (parent = gridSizeElt)
{
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

function generateGrid (parent = mainElt)
{
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
	console.log(`playPause : ${settings.isPaused}`);

	if (settings.isPaused) {
		staticInterval = setInterval(refreshGrid, settings.timeInterval);
		settings.isPaused = false;
	} else {
		clearInterval(staticInterval);
		settings.isPaused = true;
	}
}

// EVENT LISTENERS
pauseBtn.addEventListener("click", playPause);

// MAIN
setGridSize();
generateGrid();
playPause();
