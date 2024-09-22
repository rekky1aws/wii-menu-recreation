class Player
{
	constructor (id, name = "Player", score = 0)
	{
		this.id = id;
		this.name = Player.validateName(name);
		this.score = score;
	}

	add (score = 0)
	{
		this.score += score;
		this.playerCard.childNodes[2].textContent = this.score
	}

	changeName (elt)
	{
		const id = parseInt(elt.target.parentNode.id.split('card')[1]); // Getting {id} for id="card{id}" in HTML

		let newName = Player.validateName();
		
		players[id].name = newName;
		players[id].updateName();
	}

	create (parent = null)
	{
		// Possible score modifiers
		const scoreModif = [-100, -10, -5, -1, 1, 5, 10, 100];

		// Creating the elements
		let playerCard = document.createElement('div');
		let playerName = document.createElement('div');
		let playerScore = document.createElement('div');
		let playerSCT = document.createElement('div'); // Player score change top
		let playerSCB = document.createElement('div'); // Player score change bottom
		let playerScoreContainer = document.createElement('div'); 
		let removeButton = document.createElement('button');

		// Content of elements
		playerCard.classList.add('playerCard');
		playerCard.id = "card"+this.id;

		playerName.classList.add('playerName');
		playerName.addEventListener('click', this.changeName);
		playerName.textContent = this.name;

		playerScore.classList.add('playerScore');
		playerScore.textContent = this.score;

		playerSCT.classList.add('scoreChange', 'scoreChangeTop');

		playerSCB.classList.add('scoreChange', 'scoreChangeBottom');

		playerScoreContainer.classList.add('scoreContainer')

		removeButton.classList.add('removePlayer');
		removeButton.addEventListener('click', this.remove);
		removeButton.textContent = "-";
		
		// Creating score buttons
		scoreModif.forEach((value) => {
			let newScoreButton = document.createElement('button');
			newScoreButton.addEventListener('click', () => this.add(value));
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
		playerScoreContainer.append(playerSCT, playerScore, playerSCB)
		playerCard.append(playerName, playerScoreContainer, removeButton);
		parent.append(playerCard);

		this.playerCard = playerCard;

		// console.log(this); // DEBUG
	}

	updateName ()
	{
		const playerNameElt = this.playerCard.querySelector('.playerName');
		console.log(playerNameElt)
		this.playerCard.querySelector('.playerName').textContent = this.name;
	}

	remove (elt)
	{
		console.log(elt);
		const htmlElt = elt.target.parentNode;
		const id = parseInt(htmlElt.id.split('card')[1]); // Getting {id} for id="card{id}" in HTML
		players = players.filter((player) => player.id != id);
		// delete players[id];
		
		if (confirm("Are you sure you want to delete this player (all its data will be lost) ?")) {
			htmlElt.parentNode.removeChild(htmlElt);
		}
	}

	static validateName (newName = "")
	{
		let nameIsCorrect = false;
		while(!nameIsCorrect) {
			newName = prompt("Enter the new name for the player", newName);
			if (newName.replace(/\s+/g, '') == "") {
				alert("Player name can't be empty");
			} else {
				nameIsCorrect = true;
			}
		}

		return newName;
	}
}