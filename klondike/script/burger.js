// Fonctions
function toggleBurger ()
{

}

// Permet de faire automatiquement le burger menu
function addBurgerDesign (containerElt)
{
	for (let i=0; i<3; i++) {
		const burgerPart = document.createElement('div');
		burgerPart.className = "burger-part";
		containerElt.appendChild(burgerPart);
	}
}

// Elements HTML
const burgerContainers = document.querySelectorAll('.burger-container');

// EventListeners
console.log(burgerContainers);
for (let i=0; i<burgerContainers.length; i++) {
	addBurgerDesign(burgerContainers[i]);
	burgerContainers[i].addEventListener('click', 'toggleBurger');
}
