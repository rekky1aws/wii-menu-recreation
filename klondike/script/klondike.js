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
			try {
				Klondike.checkMovability(this.draggedCard, this.dragDestination);

				console.log('Moving Card'); // DEBUG
				this.dragDestination.append(this.draggedCard);

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
		// Checking if card is the last from the pile
		if (currentCard !== currentCard.parentNode.lastChild) {
			// TODO : check if card all cards after are movable

			throw new Error("Card can't be moved because it isn't the last one of the pile.");
			return false;
		}

		console.group('checkMovability'); // DEBUG

		const assocValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const assocSuit = ['♠', '♦', '♥', '♣'];

		const cardValue = assocValue.indexOf(currentCard.querySelector('.card-value').textContent) + 1;
		const cardSuit = assocSuit.indexOf(currentCard.querySelector('.card-suit').textContent);

		let destLastValue;
		let destLastSuit;

		// Getting infos about the last card in destination.
		if (destination.childNodes.length > 0 && !destination.lastChild.classList.contains('card-back')) {
			destLastValue = assocValue.indexOf(destination.lastChild.querySelector('.card-value').textContent) + 1;

			destLastSuit = assocSuit.indexOf(destination.lastChild.querySelector('.card-suit').textContent);
		}

		console.log("destLast value : " + destLastValue); // DEBUG

		// TODO detect if card is being dragged to a top row

		// If trying to place a king on a not empty row
		if (cardValue == 13 && destination.childNodes.length) {
			throw new Error("A king card can't be place on an non empty row.");
			return false;
		}

		if (cardValue != 13) {
			// If not a king and trying to be placed in an empty row
			if (destination.childNodes.length === 0) {
				throw new Error("Only a king card can be placed on an empty row.");
				return false;
			}

			// Placing only on a incorrect number
			if (destLastValue != cardValue + 1) {
				throw new Error("A card must be place on an other card with the value just above.");
				return false;
			}

			// Placing on a incorrect suit
			if (destLastSuit != (cardSuit + 1) % 2) {
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
