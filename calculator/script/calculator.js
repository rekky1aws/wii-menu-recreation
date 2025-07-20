// CONSTANTS
const keys = document.querySelectorAll('.key');
const expZone = document.querySelector('#exp');

// VARIABLES

// FUNCTION
function btnHandler (evt)
{
	if (evt.target.id) {
		console.log(evt.target.id);

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
		}

		return false;
	}

	expZone.value = expZone.value + evt.target.textContent
}

// EVENT LISTENERS
keys.forEach((e) => {
	e.addEventListener("click", btnHandler);
});

// MAIN
