class Card 
{
/*
A class to handle the behavior of a playing card.
*/
	constructor (value, suit) 
	/*
		value: 1 <= int <= 13
		suit: 0 (spades), 1 (diamonds), 2 (clubs), 3 (hearts) 
	*/
	{
		this.assocValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
		this.assocSuit = ['♠', '♦', '♣', '♥'];

		// Throwing Errors if inputed values are wrong
		if ((value < 1) || (value > 13)) {
			throw new Error('Value must be an integer beetween 1 and 13 included');
		}
		if ((suit < 0) || (suit > 3)) {
			throw new Error('Suit must be an integer beetween 0 and 3 included. 0: Spades, 1: Diamonds, 2: Clubs and 3: Hearts');
		}

		this.value = value;
		this.suit = suit;

		return this;
	}

	display (parentElt)
	{
			// Creating HTML elements
		let cardElt = document.createElement('div');
		let cardValue = document.createElement('div');
		let cardSuit = document.createElement('div');
		
			// Making card draggable
		cardElt.draggable = true;

			// Adding classes to HTML elements
		cardElt.classList.add('card', 'hover-grow');
		cardValue.classList.add('card-value');
		cardSuit.classList.add('card-suit');

			// Setinng values up
		cardElt.setAttribute('numvalue', this.value);
		cardElt.setAttribute('numsuit', this.suit);
		cardValue.textContent = this.assocValue[this.value - 1];
		cardSuit.textContent = this.assocSuit[this.suit];

			// Adding class to display correct color
		if (this.suit % 2 == 0) {
			cardElt.classList.add('black');
		} else {
			cardElt.classList.add('red');
		}

			// Adding class to displau the back of the card
			// Cards are showing they're back by default
		cardElt.classList.add('card-back');

			// Appending all sub elements to cardElt
		cardElt.appendChild(cardValue);
		cardElt.appendChild(cardSuit);
		
			// Appending the cardElt to the given parent element
		parentElt.appendChild(cardElt);

		return true;
	}

	get textDisplay ()
	{
		return this.assocSuit[this.suit] + " " + this.assocValue[this.value - 1];
	}
}

class CardDeck
{
/*
A class using the previous one (Card) to handle the behavior of a deck of playing cards.
*/
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

	displayAll (destination)
	{
		this.cards.forEach((card) => {
			card.display(destination);
		});
	}
}