// VARIABLES
let staticInterval;

let settings = {
	timeInterval: 1,
	divRatio: 30,
};

// CONSTANTS
const viewHeight = Math.floor(window.innerHeight / settings.divRatio);
const viewWidth = Math.floor(window.innerWidth / settings.divRatio);

const mainElt = document.querySelector('main');
const gridSizeElt = document.querySelector('#grid-size');

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
	// Number between 0 and 1
	const blackRatio = 3/5
	if (Math.random() < blackRatio) {
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

// MAIN
setGridSize();
generateGrid();

staticInterval = setInterval(refreshGrid, settings.timeInterval);