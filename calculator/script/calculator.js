// CONSTANTS
const keys = document.querySelectorAll('.key');
const hisZone = document.querySelector('.history');
const expZone = document.querySelector('#exp');

// VARIABLES

// FUNCTION
function addToExpZone (elt)
{
	// TODO : check if it's possible
	expZone.value = expZone.value + elt;
}

function addToHistory (exp = 0, rslt = 0)
{
	const newHisElt = document.createElement('div');
	const expElt = document.createElement('span');
	const rsltElt = document.createElement('span');

	newHisElt.classList.add('history-elt');
	expElt.classList.add('history-exp');
	rsltElt.classList.add('history-rslt');

	expElt.textContent = exp;
	rsltElt.textContent = rslt;

	newHisElt.append(expElt);
	newHisElt.append(rsltElt);
	hisZone.append(newHisElt);
}

function endsByNumber ()
{
	const re = /\d$/;

	if (re.test(expZone.value)) {
		return true;
	}

	return false;
}

function processExp ()
{
	const expression = expZone.value;
	// TODO : test if possible return result, else throw error
	console.log(eval(expression)); // DEBUG
}

function btnHandler (evt)
{
	// Checking for special keys
	// back, equal, mod, pi, sq, sqrt, percentage, dot
	if (evt.target.id) {
		switch(evt.target.id)
		{
			case "back-key":
				if (expZone.value.length) {
					expZone.value = expZone.value.substring(0, expZone.value.length - 1);
				}
				break;

			case "equal-key":
				if (expZone.value.length) {
					// TODO : try catch and display error if fail 
					processExp();
				}
				break;

			case "mod-key":

				break;

			case "pi-key":
			
				break;

			case "sqrt-key":
				if (endsByNumber()) {
					addToExpZone("*");
				}
				addToExpZone("Math.sqrt(");
				break;

			case "percent-key":

				break;

			case "sq-key":

				break;

			case "dot-key":
				if(endsByNumber()) {
					addToExpZone(".");
				} else {
					addToExpZone("0.");
				}
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


// DEBUG
addToHistory();
addToHistory("Math.PI*2", Math.PI*2);