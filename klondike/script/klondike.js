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
			try {
				Klondike.checkMovability(this.draggedCard, this.dragDestination);

				console.log('Moving Card'); // DEBUG
				
				const source = this.draggedCard.parentNode;

				this.dragDestination.append(this.draggedCard);
				
				// Flipping the next card in pile if it exists.
				if (source.lastChild) {
					source.lastChild.classList.remove('card-back');
				}

			} catch (e) {
				// console.error("This card can't be moved here"); // DEBUG
				console.error(e.message);
				console.groupEnd('endDrag'); // DEBUG
				return false;
			}
		}

		console.groupEnd('endDrag'); // DEBUG

	}

	static checkMovability (currentCard, destination)
	{
		// Checking if card is visible
		if (currentCard.classList.contains('card-back')) {
			if (currentCard.parentNode.id !== 'pile') {
				throw new Error("Can't move a card that is not revealed.");
				return false;
			}
		}

		// Checking if card is the last from the pile
		if (currentCard !== currentCard.parentNode.lastChild) {
			// TODO : check if card all cards after are movable

			throw new Error("Card can't be moved because it isn't the last one of the pile.");
			return false;
		}

		console.group('checkMovability'); // DEBUG

		console.log(destination); // DEBUG

		const cardValue = parseInt(currentCard.getAttribute('numvalue'));
		const cardSuit = parseInt(currentCard.getAttribute('numsuit'));

		let destLastValue;
		let destLastSuit;

		// Getting infos about the last card in destination.
		if (destination.children.length > 0) {
			if (!destination.lastChild.classList.contains('card-back')) {
				destLastValue = parseInt(destination.lastChild.getAttribute('numvalue'));
				destLastSuit = parseInt(destination.lastChild.getAttribute('numsuit'));
			}
		}

		// If card is being dragged to a top row
		if (destination.classList.contains('scored-row')) {
			console.log('Top row'); // DEBUG

			// If destination is empty and card is not an Ace
			if(destination.children.length == 0 && cardValue != 1) {
				throw new Error("Only an ace card can be placed first on the top rows.");
				return false;
			}

			// If destination is not empty
			if (destination.children.length) {
				// If draggedCard is an Ace
				if (cardValue == 1) {
					throw new Error("An ace card can't be placed in a top row if there already is an another card there.")
					return false;
				}

				// If the card doesn't have the correct suit
				if (cardSuit != destLastSuit) {
					throw	new Error("Only cards with the same suit can be placed on a single top row.");
				}

				// If the card doesn't have the correct value
				if (cardValue != destLastValue + 1)
				{
					throw new Error("Only a card with the value just above can be placed on a top row.");
					return false;
				}
			}
		
			return true;
		}

		// If trying to place a king on a not empty row
		if (cardValue == 13 && destination.children.length) {
			throw new Error("A king card can't be place on an non empty row.");
			return false;
		}

		if (cardValue != 13) {
			// If not a king and trying to be placed in an empty row
			if (destination.children.length === 0) {
				throw new Error("Only a king card can be placed on an empty row.");
				return false;
			}

			// Placing only on a incorrect number
			if (destLastValue != cardValue + 1) {
				throw new Error("A card must be place on an other card with the value just above.");
				return false;
			}

			// Placing on a incorrect suit
			if (destLastSuit % 2 != (cardSuit + 1) % 2) {
				throw new Error("A red card can be placed only on a black card, and a black card can only be placed on a red card.");
				return false;
			}

		}
		
		console.groupEnd('checkMovability'); // DEBUG

		return true;
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
