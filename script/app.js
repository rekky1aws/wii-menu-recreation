// Classes
class Game {
    constructor (name = 'No Game', imageLink = null, gameLink = "#") {
        this.name = name;
        this.imageLink = imageLink;
        this.gameLink = gameLink;
    }

    display () {
        // Variables
        let game = document.createElement('a');
        let image;

        // Ajout des propriétés à l'element
        game.href = this.gameLink;
        game.draggable = "false";
        game.className="game hover-light";

        // On crée une image si on a une app
        if (this.imageLink !== null) {
            image = document.createElement('img');
            image.alt = this.name;
            image.src = this.imageLink;
        // Sinon on crée une div
        } else {
            image = document.createElement('div');
        }

        // Propriétés de l'element
        image.className = 'game-image';
        image.draggable = "false";

        game.appendChild(image);
        
        return game;
    }
}

class GameCollection {
    // Une GameCollection représente une grille de jeux sur un écran.
    // Elle permet de gérer automatiquement le fait que les jeux s'affichent par grilles de 3*4
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
        new Game ('JS_Paint', 'media/gifs/loop2.gif', 'JSPaint/'),
        new Game ('Klondike', 'media/gifs/klondike.gif', 'klondike/')
    ]
);


// Fonctions
function swapItems (sourceA, sourceB)
{
    // Permet de procéder à l'échange entre deux app
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
    // Permet de faire suivre l'image du curseur wii par rapport au curseur réel
    movingImage.style.left = `${cursPos.x + 5}px`;
    movingImage.style.top = `${cursPos.y + 5}px`;
}

// Main
games.displayGames;

// Variables Globales
let selectedItem;
let grabbingInterval;
let movingImage;

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
            cursorImage.src = "media/images/cursors/grabbing_cursor.png";
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

// Changement visuel du curseur lorsqu'on le passe sur un emplcement d'app
document.querySelectorAll('.game-image').forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (selectedItem === null || selectedItem === undefined) {
            cursorImage.src = "media/images/cursors/grabbable_cursor.png";
        }
    });

    element.addEventListener('mouseleave', () => {
        if (selectedItem === null || selectedItem === undefined) {
            cursorImage.src = "media/images/cursors/basic_cursor.png";
        }
    })
});
