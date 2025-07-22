// CONSTANTS
const keys = document.querySelectorAll('.key');
const expZone = document.querySelector('#exp');

// VARIABLES

// FUNCTION
function addToExpZone (elt)
{
	expZone.value = expZone.value + elt;
}

function btnHandler (evt)
{
	// Checking for special keys
	// back, equal, mod, pi, sq, sqrt, percentage, dot
	if (evt.target.id) {
		switch(evt.target.id)
		{
			case "back-key":

				break;

			case "equal-key":

				break;

			case "mod-key":

				break;

			case "pi-key":
			
				break;

			case "sqrt-key":

				break;

			case "percent-key":

				break;

			case "sq-key":

				break;

			case "dot-key":

				break;
		}

		return false;
	}

	// Other keys ave the correct value in them
	addToExpZone(evt.target.textContent)
}

// EVENT LISTENERS
keys.forEach((e) => {
	e.addEventListener("click", btnHandler);
});

// MAIN
