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

// Detecting the start of a mouse click
document.body.addEventListener('mousedown', (e) => {
    // Checking if user clicked on a game image
    if (e.target.className.split(' ').indexOf('game-image') !== -1) {
        
        selectedItem = e.target;
        
        // If we have a src for an img => image copy that follows mouse
        if (selectedItem.src) {
            movingImage = document.createElement('img');
            movingImage.src = selectedItem.src;
            movingImage.className = 'moving-image';
            cursorImage.src = "/_media/images/cursors/grabbing_cursor.png";
        // Else => div that follows mouse with empty game design
        } else {
            movingImage = document.createElement('div');
            movingImage.className = 'moving-image empty-moving-image';
        }

        // Adding img to body to make it visible
        document.body.appendChild(movingImage);

        // Interval to move img/div every 10ms to make it follow the cursor
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