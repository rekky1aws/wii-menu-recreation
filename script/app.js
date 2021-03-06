// Classes
class Game {
    constructor (name = 'No Game', imageLink = 'media/image/game-placeholder.jpg') {
        this.name = name;
        this.imageLink = imageLink;
    }

    display () {
        let game = document.createElement('div');
        game.className="game hover-light";
        let image = document.createElement('img');
        image.alt = this.name;
        image.src = this.imageLink;
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
        new Game ('Test 1', 'media/gifs/3d1.gif'),
        new Game ('Test 2', 'media/gifs/loop2.gif')
    ]
);

// Fonctions


// Main
games.displayGames;