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

// Detecting the end of a mouse click
document.body.addEventListener('mouseup', (e) => {
    // Resetting body style to remove inline
    document.body.removeAttribute('style');
    
    // Checking where the user stopped clicking
    if (e.target.className.split(' ').indexOf('game-image') !== -1 && selectedItem) {
        
        swapItems(e.target, selectedItem);
        
        // Removing interval that moved element with the cursor
        clearInterval(grabbingInterval);

        cursPos.x = null;
        cursPos.y = null;
    }

    selectedItem = null;
    
    // Removing image that followed the mouse
    if (movingImage && movingImage.parentNode) {
        movingImage.parentNode.removeChild(movingImage);
    }

});

// FUNCTIONS
function placeImageOnCursor()
{
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

// Changing fake cursor when hovering app
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