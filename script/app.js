// Classes
class Game {
    constructor (name = 'No Game', imageLink = null, gameLink = "#") {
        this.name = name;
        this.imageLink = imageLink;
        this.gameLink = gameLink;
    }

    display () {
        let game = document.createElement('a');
        game.href = this.gameLink;
        game.draggable = "false";
        game.className="game hover-light";
        let image;
        if (this.imageLink !== null) {
            image = document.createElement('img');
            image.alt = this.name;
            image.src = this.imageLink;
        } else {
            image = document.createElement('div');
        }
        image.className = 'game-image';
        image.draggable = "false";
        game.appendChild(image);
        return game;
    }
}

class GameCollection {
    constructor (games = [])
    {
        this.collection = [];
        for (let i = 0; i < games.length + (12 - (games.length % 12)); i++) {
            if (i < games.length) {
                this.collection.push(games[i]);
            } else {
                this.collection.push(new Game());
            }
        }
    }

    get displayGames () 
    {
        const mainElement = document.querySelector('main');
        for (let i = 0; i < Math.floor(this.collection.length / 12); i++) {
            let sectionElement = document.createElement('section');
            for (let j = i*12; j < 12 * (i + 1); j++) {
                sectionElement.appendChild(this.collection[j].display());
            }
            mainElement.appendChild(sectionElement);
        }
    }
}

// Constantes
const games = new GameCollection (
    [
        new Game ('DVD', 'media/gifs/DVD.gif', 'dvd/'),
        new Game ('JS_Paint', 'media/gifs/loop2.gif', 'JSPaint/')
    ]
);


// Fonctions
function swapItems (sourceA, sourceB)
{
    if (sourceA !== sourceB)
    {
        // Getting parents
        const parentA = sourceA.parentNode;
        const parentB = sourceB.parentNode;

        // Deleting original
        parentA.removeChild(sourceA);
        parentB.removeChild(sourceB);

        // Adding new
        parentA.appendChild(sourceB);
        parentB.appendChild(sourceA);
    }
}

function placeImageOnCursor()
{
    movingImage.style.left = `${cursPos.x + 5}px`;
    movingImage.style.top = `${cursPos.y + 5}px`;
}

// Main
games.displayGames;

let selectedItem;
let grabbingInterval;
let movingImage;

document.body.addEventListener('mousedown', (e) => {
    if (e.target.className.split(' ').indexOf('game-image') !== -1) {
        selectedItem = e.target;
        if (selectedItem.src) {
            movingImage = document.createElement('img');
            movingImage.src = selectedItem.src;
            movingImage.className = 'moving-image';
            cursorImage.src = "/media/images/cursors/grabbing_cursor.png";
        } else {
            movingImage = document.createElement('div');
            movingImage.className = 'moving-image empty-moving-image';
        }
        document.body.appendChild(movingImage);
        grabbingInterval = setInterval(placeImageOnCursor, 10);
    }
});

document.body.addEventListener('mouseup', (e) => {
    document.body.removeAttribute('style');
    if (e.target.className.split(' ').indexOf('game-image') !== -1 && selectedItem) {
        swapItems(e.target, selectedItem);
        clearInterval(grabbingInterval);
        cursPos.x = null;
        cursPos.y = null;
    }
    selectedItem = null;
    if (movingImage && movingImage.parentNode) {
        movingImage.parentNode.removeChild(movingImage);
    }

});

document.querySelectorAll('.game-image').forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (selectedItem === null || selectedItem === undefined) {
            cursorImage.src = "/media/images/cursors/grabbable_cursor.png";
        }
    });

    element.addEventListener('mouseleave', () => {
        if (selectedItem === null || selectedItem === undefined) {
            cursorImage.src = "/media/images/cursors/basic_cursor.png";
        }
    })
});