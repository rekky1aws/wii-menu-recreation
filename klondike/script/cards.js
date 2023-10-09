class Card {
	/*
		value: 1 <= int <= 13
		suit: 0 (spades), 1 (diamonds), 2 (clubs), 3 (hearts) 
	*/
	constructor(value, suit) {
		if ((value < 1) || (value > 13))
		{
			throw new Error('Value must be an integer beetween 1 and 13 included');
		}
		if ((suit < 0) || (suit > 3))
		{
			throw new Error('Suit must be an integer beetween 0 and 3 included. 0: Spades, 1: Diamonds, 2: Clubs and 3: Hearts');
		}

		this.value = value;
		this.suit = suit;

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
		if (this.suit % 2 == 0)
		{
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
}

class CardDeck {

}

let cardArr = [
	new Card(11, 0), // J of Spades
];

let row1 = document.querySelector('#row1');
cardArr[0].display(row1);