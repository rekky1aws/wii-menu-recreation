// Parameters.
const params = {
	nbFixed: 1,
	nbAverage: 10,
	radiusAverage: 50,
	moveCoeffAverage: 1,
}

// Class for bubbles instances.
class Bubbles {
	constructor(canvas, radius = 50, moveCoeff = 0.5)
	{
		this.canvas = canvas;
		this.possibleColors = ['red', 'blue', 'cyan', 'lime', 'yellow', 'orange', 'indigo', 'purple', 'magenta', 'lightblue', 'maroon', 'lightgrey', 'lightsalmon', 'cornsilk', 'salmon', 'coral', 'lightcoral', 'pink'];
		this.possibleSounds = [
		  'alertecorona.mp3',
		  'amogus.mp3',
		  'arara.mp3',
		  'bababooey.mp3',
		  'bebou.mp3',
		  'benvoyons.mp3',
		  'bonk.mp3',
		  'coin.mp3',
		  'coucou.mp3',
		  'ding.mp3',
		  'discordjoin.mp3',
		  'discordleave.mp3',
		  'discordnotif.mp3',
		  'hellothere.mp3',
		  'hitmarker.mp3',
		  'jevousdemandedevousarreter.mp3',
		  'mariojump.mp3',
		  'mariooof.mp3',
		  'minecraftclick.mp3',
		  'minecraftmiam.mp3',
		  'minecraftoof.mp3',
		  'minecraftvillager.mp3',
		  'mvconnard.mp3',
		  'nootnoot.mp3',
		  'oecpafo.mp3',
		  'olivierdecarglass.mp3',
		  'pablo.mp3',
		  'pegi.mp3',
		  'pew.mp3',
		  'poi.mp3',
		  'reverbfart.mp3',
		  'steammessage.mp3',
		  'tacobell.mp3',
		  'tuturu.mp3',
		  'userdisconnected.mp3',
		  'uwu.mp3',
		  'xperror.mp3',
		  'yoshimlam.mp3',
		  'zeldaheylisten.mp3',
		  'zeldaitem.mp3',
		  'zemmourtousse.mp3'
		];
	}

	changeColor()
	{
		this.color = this.possibleColors[Math.floor(Math.random() * this.possibleColors.length)];
	}

	changeSound()
	{
		this.sound = this.possibleSounds[Math.floor(Math.random() * this.possibleSounds.length)];
	}

	randomCoordinates ()
	{
		this.x = this.radius + Math.floor(Math.random() * (this.canvas.width - (2 * this.radius)));
		this.y = this.radius + Math.floor(Math.random() * (this.canvas.height - (2 * this.radius)));
	}

	randomDirection ()
	{
		this.direction = Math.floor(Math.random() * 4);
		/*
			0 : haut gauche
			1 : haut droite
			2 : bas gauche
			3 : bas droite
		*/
	}

	randomRadius (average)
	{
		this.radius = (average / 2) + Math.floor(Math.random() * average);
	}

	randomMoveCoeff (average)
	{
		this.moveCoeff = Math.max(0.1, (average / 2) + Math.floor(Math.random() * average) / 5);
	}

	move ()
	{
		let moveX, moveY;
		switch (this.direction) {
			case 0:
				moveX = -1 * this.moveCoeff;
				moveY = -1 * this.moveCoeff;
			break;

			case 1:
				moveX = 1 * this.moveCoeff;
				moveY = -1 * this.moveCoeff;
			break;

			case 2:
				moveX = -1 * this.moveCoeff;
				moveY = 1 * this.moveCoeff;
			break;

			case 3:
				moveX = 1 * this.moveCoeff;
				moveY = 1 * this.moveCoeff;
			break;
		}

		this.x += moveX;
		this.y += moveY;
	}

	makeSound() {
		let ballSound = new Audio();
		ballSound.src = 'sounds/' + this.sound;
		ballSound.volume = 0.5;
		ballSound.play();
	}


}

const startButton = document.querySelector('.start-button');
const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');

const bubbleNumber = params.nbFixed ? params.nbFixed : params.nbAverage / 2 + Math.floor(Math.random() * params.nbAverage);
const ballArr = generateBubblesArray(bubbleNumber, canvas);

startButton.addEventListener('click', loader);

console.table(ballArr);

function generateBubblesArray (n, canvas) {
	let result = [];
	for(let i = 0; i < n; i++) {
		let newBubbles = new Bubbles(canvas);
		newBubbles.randomRadius(params.radiusAverage);
		newBubbles.randomMoveCoeff(params.moveCoeffAverage);
		newBubbles.randomCoordinates();
		newBubbles.randomDirection();
		newBubbles.changeColor();
		newBubbles.changeSound();
		result.push(newBubbles);
	}
	return result;
}

function moveBubbles () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ballArr.forEach((ball) => {
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = ball.color;
		ctx.fill();

		ball.move();

		if (ball.x <= 0 + ball.radius) {
			ball.direction += 1;
			ball.changeColor();
			ball.makeSound();
			ball.changeSound();
		}
		if (ball.x >= canvas.width - ball.radius) {
			ball.direction -= 1;
			ball.changeColor();
			ball.makeSound();
			ball.changeSound();
		}
		if (ball.y <= 0 + ball.radius || ball.y >= canvas.height - ball.radius) {
			ball.direction = (ball.direction + 2) % 4;
			ball.changeColor();
			ball.makeSound();
			ball.changeSound();
		}
	});
}

function loader ()
{
	console.log('loader');
	canvas.classList.toggle('invisible')
	startButton.classList.toggle('invisible');
	setInterval(moveBubbles, 10);
}
