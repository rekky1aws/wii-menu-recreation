// CONSTANTS
const cursorImage = document.createElement('img');
const cursPos = {x: undefined, y: undefined};

// EVENT LISTENER
document.body.addEventListener('mousemove', (e) => {
    cursPos.x = e.x;
    cursPos.y = e.y;
	cursorImage.style.left = `${e.x + 5}px`;
	cursorImage.style.top = `${e.y + 5}px`;
});

// Detection du début du clic de la souris
document.body.addEventListener('mousedown', (e) => {
    // On vérifie si l'endoroit cliqué est une image d'app
    if (e.target.className.split(' ').indexOf('game-image') !== -1) {
        
        selectedItem = e.target;
        
        // Si on a une src pour une image, on crée un dupliqué de l'image qui va suivre la souris jusqu'au relachement 
        if (selectedItem.src) {
            movingImage = document.createElement('img');
            movingImage.src = selectedItem.src;
            movingImage.className = 'moving-image';
            cursorImage.src = "/_media/images/cursors/grabbing_cursor.png";
        // Sinon on crée une div qui aura le même comportement, avec le fond par défaut
        } else {
            movingImage = document.createElement('div');
            movingImage.className = 'moving-image empty-moving-image';
        }

        // On ajoute l'image au body pour qu'elle soit visible
        document.body.appendChild(movingImage);

        // On crée un intervale qui va déplacer l'image toutes les 10ms pour qu'elle suive le curseur
        grabbingInterval = setInterval(placeImageOnCursor, 10);
    }
});

// Detection de la fin du clic de la souris
document.body.addEventListener('mouseup', (e) => {
    // On reset le style inline du body
    document.body.removeAttribute('style');
    
    // On vérifie la nature de l'endroit ou l'on arrete le clic
    if (e.target.className.split(' ').indexOf('game-image') !== -1 && selectedItem) {
        // Echange des images et des liens des apps
        swapItems(e.target, selectedItem);
        
        // Suppression de l'intervalle pour le déplacement de la copie d'image
        clearInterval(grabbingInterval);

        cursPos.x = null;
        cursPos.y = null;
    }

    selectedItem = null;
    
    // Suppression de la copie d'image
    if (movingImage && movingImage.parentNode) {
        movingImage.parentNode.removeChild(movingImage);
    }

});

// FUNCTIONS
function placeImageOnCursor()
{
    // Permet de faire suivre l'image du curseur wii par rapport au curseur réel
    movingImage.style.left = `${cursPos.x + 5}px`;
    movingImage.style.top = `${cursPos.y + 5}px`;
}

// MAIN
// Handling cursor image.
cursorImage.src = "_media/images/cursors/basic_cursor.png";
cursorImage.className = "cursor-image";
document.body.appendChild(cursorImage);

// Making original cursor disappear
document.body.style.cursor = "none";

// Changement visuel du curseur lorsqu'on le passe sur un emplcement d'app
document.querySelectorAll('.game-image').forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (selectedItem === null || selectedItem === undefined) {
            cursorImage.src = "/_media/images/cursors/grabbable_cursor.png";
        }
    });

    element.addEventListener('mouseleave', () => {
        if (selectedItem === null || selectedItem === undefined) {
            cursorImage.src = "/_media/images/cursors/basic_cursor.png";
        }
    })
});