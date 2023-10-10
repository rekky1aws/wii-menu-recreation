class Card 
{
/*
A class to handle the behavior of à playing card
*/
	constructor(value, suit, visible = false) 
	/*
		value: 1 <= int <= 13
		suit: 0 (spades), 1 (diamonds), 2 (clubs), 3 (hearts) 
	*/
	{
		// Throwing Errors if inputed values are wrong
		if ((value < 1) || (value > 13)) {
			throw new Error('Value must be an integer beetween 1 and 13 included');
		}
		if ((suit < 0) || (suit > 3)) {
			throw new Error('Suit must be an integer beetween 0 and 3 included. 0: Spades, 1: Diamonds, 2: Clubs and 3: Hearts');
		}

		this.value = value;
		this.suit = suit;
		this.visible = false;

		return this;
	}

	display (parentElt)
	{
		// Association table
		const assocValue = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const assocSuit = ['♠', '♦', '♥', '♣'];

		// Creating HTML elements
		let cardElt = document.createElement('div');
		let cardValue = document.createElement('div');
		let cardSuit = document.createElement('div');

		// Adding classes to HTML elements
		cardElt.classList.add('card');
		cardValue.classList.add('card-value');
		cardSuit.classList.add('card-suit');

		// Adding class to display correct color
		if (this.suit % 2 == 0) {
			cardElt.classList.add('red');
		} else {
			cardElt.classList.add('black');
		}

		// Setinng values up
		cardValue.textContent = assocValue[this.value - 1];
		cardSuit.textContent = assocSuit[this.suit];

		// Appending all sub elements to cardElt
		cardElt.appendChild(cardValue);
		cardElt.appendChild(cardSuit);

		// Appending the cardElt to the given parent element
		parentElt.appendChild(cardElt);

		return true;
	}

	get textDisplay ()
	{
		// Association table
		const assocValue = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		const assocSuit = ['♠', '♦', '♥', '♣'];

		return assocSuit[this.suit] + " " + assocValue[this.value - 1];
	}
}

class CardDeck
{
	constructor ()
	{
		this.cards = [];
		for(let i=0; i<4; i++) { // Each Suit
			for(let j=1; j<=13; j++) { // Each Value
				this.cards.push(new Card(j, i));
			}
		}

		return this;
	}

	shuffle ()
	{
		let newCards = [];
		while (this.cards.length > 0)
		{
			// Choosing a card
			let rnd = Math.floor(Math.random() * this.cards.length);
			newCards.push(this.cards[rnd]);

			// Removing it from the main deck
			let part1 = this.cards.slice(0,rnd);
			let part2 = this.cards.slice(rnd+1);
			this.cards = part1.concat(part2);
		}
		this.cards = newCards;
	}
}


export

// Debug code to test
let testSection = document.querySelector('section#test');
let deck = new CardDeck();
deck.shuffle();
deck.cards.forEach((element) => {
	element.display(testSection);
})