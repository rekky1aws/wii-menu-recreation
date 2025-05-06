/*
This needs to be imported after the cards.js files with Card and CardDeck classes.
*/

class Klondike
{
	constructor (playfield)
	{
		this.deck = new CardDeck();

		this.playfield = {
			main: playfield,
			scored: {
				spades: playfield.querySelector('#scored-spades'),
				diamonds: playfield.querySelector('#scored-diamonds'),
				clubs: playfield.querySelector('#scored-clubs'),
				hearts: playfield.querySelector('#scored-hearts')
			},
			draw: {
				pile: playfield.querySelector('#pile'),
				visibleCard: playfield.querySelector('#visible_card')
			},
			rows: []
		};

		for (let i = 0; i < 7; i++) {
			this.playfield.rows[i] = playfield.querySelector('#row' + (i+1));
		}

		this.values = {
			scored: {
				spades: [],
				diamonds: [],
				clubs:[],
				hearts: []
			},
			draw: {
				pile: [],
				visibleCard: []
			},
			rows: []
		};

		this.playfield.main.addEventListener('dragstart', this.startDrag);
		this.playfield.main.addEventListener('dragend', this.endDrag);
		this.playfield.main.addEventListener('dragover', this.dragoverHandler);

		this.draggedCard = null;
		this.dragDestination = null;

	}

	startDrag (evt)
	{
		// console.group('startDrag'); // DEBUG
		if (evt.target.classList.contains('card')) {
			this.draggedCard = evt.target;
		}

		// console.groupEnd('startDrag'); // DEBUG
	}

	endDrag (evt)
	{
		console.group('endDrag'); // DEBUG
		if (this.dragDestination) {
			// TODO : Check if this move is valid
			console.log('Moving Card'); // DEBUG
			this.dragDestination.append(this.draggedCard);
		}

		console.groupEnd('endDrag'); // DEBUG

	}

	dragoverHandler (evt)
	{
		// console.group('dropHandler'); // DEBUG
		if (evt.target.classList.contains('card-reciever')) {
			this.dragDestination = evt.target;
		} else {
			this.dragDestination = null;
		}
		// console.groupEnd('dropHandler'); // DEBUG
	}

	setup ()
	{
		/* Initializes cards at the starting position for the game */
	}
}

const gameZone = document.querySelector('main');
const game = new Klondike(gameZone);


// DEBUG
console.log(gameZone);
console.log(game);

const displayZone = document.querySelector('section#test')
game.deck.shuffle();
game.deck.cards.forEach((element) => {
	element.display(displayZone);
});
