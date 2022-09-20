// Constantes globales
const header = document.querySelector('header');
const brushSizeSelector = document.querySelector('#brush-size-range');
const colorSelector = document.querySelector('#color-selector');
const cleanButton = document.querySelector('#clean-button');
const colorHistory = document.querySelector('#color-history');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const toolData = {
	brushSize: 5,
	color: '#000000',
}

// Variables globales
let drawInterval;
let mousePos = {
	x: undefined,
	y: undefined,
}

// Event Listeners
canvas.addEventListener('mousedown', startDrawInterval);
canvas.addEventListener('mouseup', endDrawInterval);
canvas.addEventListener('mouseleave', endDrawInterval);
canvas.addEventListener('mousemove', setMousePos);
brushSizeSelector.addEventListener('change', setBrushSize);
colorSelector.addEventListener('change', setBrushColor);
cleanButton.addEventListener('click', clearCanvas)

// Setting Canvas size
canvas.height = window.innerHeight - header.offsetHeight;
canvas.width = window.innerWidth;

// Functions
function draw() {
	ctx.beginPath();
	ctx.fillStyle = toolData.color;
	ctx.arc(mousePos.x, mousePos.y, toolData.brushSize, 0, 2 * Math.PI, false);
	ctx.fill();
}

function startDrawInterval () {
	drawInterval = setInterval(draw, 1);
}

function endDrawInterval () {
	clearInterval(drawInterval);
}

function setMousePos (e) {	
	mousePos.x = e.x;
	mousePos.y = e.y - header.offsetHeight;
}

function setBrushSize () {
	toolData.brushSize = brushSizeSelector.value;
}

function setBrushColor (e, color = null) {
	// Si on passe une couleur en paramètre.
	if (color) {
		// On met la bonne couleur pour peindre.
		toolData.color = color;
		// On remet la couleur dans le selecteur.
		colorSelector.value = color;
	} else {
		// On met la bonne couleur pour peindre.
		toolData.color = colorSelector.value;

		// Création de la div avec la couleur.
		let histColor = document.createElement('div');
		histColor.className = "color-history-part";
		histColor.style.backgroundColor = toolData.color;
		histColor.style.color = toolData.color;
		histColor.textContent = toolData.color;
		histColor.addEventListener('click', setColorFromHistory);

		// On ajoute la div de la couleur au début de la grille des couleurs.
		colorHistory.insertBefore(histColor, colorHistory.firstChild);

		// Si, après ajout, il y a plus de couleurs que ce que la grille pourrait contenir, on supprime la couleur la plus ancienne.
		if (colorHistory.childNodes.length > 15) {
			colorHistory.removeChild(colorHistory.lastChild)
		}
	}
}

function clearCanvas () {
	// Demander à l'utilisateur s'il est sur de vouloir nettoyer le canevas
	let userAccepted = window.confirm('Nettoyer le canevas ?');

	// S'il accepte
	if (userAccepted) {
		// On initialise nos varibales;
		let i = 0;
		let cleanerInterval;

		// Cette fonction se lancera en boucle jusqu'à ce que le canevas soit entierement nettoyé
		let cleaner = function () {
			if (i <= canvas.height) {
				// On efface un rectangle de plus en plus grand qui fait toute la largeur du canevas et qui commence en haut de celui ci.
				ctx.clearRect(0, 0, canvas.width, i);
				i += 5;
			} else {
				// Si on a effacé tout le canevas (i a atteint la hauteur du canevas), alors on arrete.
				clearInterval(cleanerInterval);
			}
		}

		// On lance la boucle qui va nettoyer le canevas.
		cleanerInterval = setInterval(cleaner, 1);
	}
}

function setColorFromHistory (e) {
	setBrushColor(e, e.target.textContent);
}

// Main