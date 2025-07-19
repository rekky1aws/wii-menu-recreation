// CONSTANTS
const keys = document.querySelectorAll('.key');

// VARIABLES

// FUNCTION
function btnHandler (evt)
{
	console.log(evt.target.textContent);
}

// EVENT LISTENERS
keys.forEach((e) => {
	e.addEventListener("click", btnHandler);
});

// MAIN