// CONST
const mainElt = document.querySelector('main');

// FUNCTIONS
function makeDiv (title, content, parent = mainElt)
{
	if(typeof(content) === "function") {
		return;
	}

	// console.group();
	console.log(title, content);

	const newElt = document.createElement('div');
	const newEltTitle = document.createElement('span');
	const newEltContent = document.createElement('span');

	newElt.classList.add('element');
	newEltTitle.classList.add('title');
	newEltContent.classList.add('content');

	newEltTitle.textContent = title;

	if(typeof(content) === 'object') {
		for (const element in content) {
			makeDiv(element, content[element], newEltContent)
		}

	} else {
		newEltContent.textContent = content;
	}

	newElt.append(newEltTitle, newEltContent);
	parent.append(newElt);

	// console.groupEnd();
}

function displayInfos (parent = mainElt)
{
	const infos = window.clientInformation;

	for (const element in infos) {
		makeDiv(element, infos[element])
	}
}

// MAIN
displayInfos();