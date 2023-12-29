class Player
{
	constructor (id, name = "Player")
	{
		this.id = id;
		this.name = name;
		this.score = 0;
	}

	add (score = 0)
	{
		this.score += score;
	}

	changeName ()
	{
		let newName = prompt("Enter the new name for the player", this.name);
		this.name = newName;
	}

	display (parent = null)
	{
		// Possible score modifiers
		const scoreModif = [-100, -10, -5, -1, 1, 5, 10, 100];

		// Creating the elements
		let playerCard = document.createElement('div');
		let playerName = document.createElement('div');
		let playerScore = document.createElement('div');
		let playerSCT = document.createElement('div'); // Player score change top
		let playerSCB = document.createElement('div'); // Player score change bottom

		// Content of elements
		playerCard.classList.add('playerCard');
		playerCard.id = "card"+this.id;

		playerName.classList.add('playerName');
		playerName.textContent = this.name;

		playerScore.classList.add('playerScore');
		playerScore.textContent = this.score;

		playerSCT.classList.add('scoreChange', 'scoreChangeTop');

		playerSCB.classList.add('scoreChange', 'scoreChangeBottom');
		
		// Creating score buttons
		scoreModif.forEach((value) => {
			let newScoreButton = document.createElement('button');
			newScoreButton.addEventListener('click', this.add);
			newScoreButton.value = value;
			if (value < 0) {
				newScoreButton.textContent = value;
				playerSCB.append(newScoreButton);
			} else {
				newScoreButton.textContent = "+" + value;
				playerSCT.append(newScoreButton);
			}
		});

		// Structuring
		playerCard.append(playerName, playerSCT, playerScore, playerSCB);
		parent.append(playerCard);


		console.log(playerCard); // DEBUG
	}

	updateDisplay ()
	{

	}
}