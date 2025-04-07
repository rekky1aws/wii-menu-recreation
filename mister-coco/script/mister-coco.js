// CONSTANTS
const playerNameElts = document.querySelectorAll('.player-name');

// VARIABLES

// FUNCTIONS
function playerNameAction (evt) {
	if (evt.target.value === "" && evt.target.parentNode.children.length > 3 && evt.key !== "Tab") {
		evt.target.remove();
	}

	if (evt.target.value !== "" && evt.target.parentNode.lastElementChild.value !== "") {

		const newInput = document.createElement('input');
		newInput.type = "text";
		newInput.name = "player-name";
		newInput.placeholder = "Enter player name here";
		newInput.classList.add("player-name");

		newInput.addEventListener('keyup', playerNameAction);
		evt.target.parentNode.append(newInput);
	}
}

// EVENT LISTENERS
playerNameElts.forEach((elt) => {
	elt.addEventListener("keyup", playerNameAction);
});

// MAIN