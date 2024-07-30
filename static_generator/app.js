// CONSTANTS
const viewHeight = Math.floor(window.innerHeight / 10);
const viewWidth = Math.floor(window.innerWidth / 10);

const mainElt = document.querySelector('main');
const gridSizeElt = document.querySelector('#grid-size');

// VARIABLES
let staticInterval;

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
	// Number between 0 and 100
	const blackRatio = 55
	const colorNum = Math.floor(Math.random() * 100)
	if (colorNum < 55) {
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

staticInterval = setInterval(refreshGrid, 50);