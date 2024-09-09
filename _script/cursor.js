const cursorImage = document.createElement('img');
const cursPos = {x: undefined, y: undefined};

// Handling cursor image.
cursorImage.src = "_media/images/cursors/basic_cursor.png";
cursorImage.className = "cursor-image";
document.body.appendChild(cursorImage);

// Making original cursor disappear
document.body.style.cursor = "none";

document.body.addEventListener('mousemove', (e) => {
    cursPos.x = e.x;
    cursPos.y = e.y;
	cursorImage.style.left = `${e.x + 5}px`;
	cursorImage.style.top = `${e.y + 5}px`;
});
