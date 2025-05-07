/*
This needs to be imported after the cards.js files with Card and CardDeck classes.
*/

class Klondike
{
	constructor (playfield)
	{
		this.deck = new CardDeck();
		this.draggedCard = null;
		this.dragDestination = null;

		this.pf = {
			main: playfield,
			scored: {
				spades: playfield.querySelector('#scored-spades'),
				diamonds: playfield.querySelector('#scored-diamonds'),
				clubs: playfield.querySelector('#scored-clubs'),
				hearts: playfield.querySelector('#scored-hearts')
			},
			draw: {
				pile: playfield.querySelector('#pile'),
				visibleCard: playfield.querySelector('#visible-card')
			},
			rows: []
		};

		// Getting all rows
		for (let i = 0; i < 7; i++) {
			this.pf.rows[i] = playfield.querySelector('#row' + (i+1));
		}

		this.pf.main.addEventListener('dragstart', this.startDrag);
		this.pf.main.addEventListener('dragend', this.endDrag);
		this.pf.main.addEventListener('dragover', this.dragoverHandler);
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
		} else if (evt.target.classList.contains('card')) {
			if (evt.target.parentNode.classList.contains('card-reciever')) {
				this.dragDestination = evt.target.parentNode;
			}
		} else {
			this.dragDestination = null;
		}
		// console.groupEnd('dropHandler'); // DEBUG
	}

	setup () // Initializes cards at the starting position for the game
	{
		this.deck.shuffle();

		// Displaying all cards unrevealed to the pile.
		this.deck.displayAll(this.pf.draw.pile);

		// Serving rows
		for (let i=0; i<this.pf.rows.length; i++) {
			for (let j=0; j<i+1; j++) {
				this.pf.rows[i].append(this.drawOne);
			}
			this.revealLast(this.pf.rows[i]);
		}

		// Moving a card to be visible
		this.pf.draw.visibleCard.append(this.drawOne);
		this.revealLast(this.pf.draw.visibleCard);
	}

	get drawOne ()
	{
		return this.pf.draw.pile.lastChild;
	}

	revealLast (zone)
	{
		zone.lastChild.classList.remove('card-back');
	}
}

// DEBUG
const gameZone = document.querySelector('main');
const game = new Klondike(gameZone);

console.log(gameZone); // DEBUG
console.log(game); // DEBUG

game.setup();
