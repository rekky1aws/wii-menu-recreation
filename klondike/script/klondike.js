/*
This needs to be imported after the cards.js files with Card and CardDeck classes.
*/

class Klondike
{
	constructor (playfield)
	{
		this.deck = new CardDeck();

		this.playfield = {
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
console.log(game.playfield);

const displayZone = document.querySelector('section#test')
const deck = new CardDeck();
deck.shuffle();
deck.cards.forEach((element) => {
	element.display(displayZone);
});