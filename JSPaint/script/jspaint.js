// Constantes globales
const header = document.querySelector('header');
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

// Setting Canvas size
canvas.height = window.innerHeight - header.offsetHeight;
canvas.width = window.innerWidth;

// Functions
function draw() {
	console.log(mousePos.x, mousePos.y);
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

// Main