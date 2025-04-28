// CLASSES
class Game {
  constructor (name = 'No Game', imageName = null, gameLink = "#", status = null) {
    this.name = name;
    this.gameLink = gameLink;
    this.status = status;

    if (imageName != null) {
      this.imageLink = `_media/${imageName}`;
    } else {
      this.imageLink = null;
    }
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
    image.classList.add('game-image');
    image.draggable = "false";

    game.appendChild(image);

    if (this.status != null)
    {
      game.classList.add(this.status)
    }

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

// CONSTANTS
const games = new GameCollection (
  [
    new Game ('DVD', 'gifs/DVD.gif', 'dvd/'),
    new Game ('JS_Paint', 'gifs/paint.gif', 'JSPaint/'),
    new Game ('Static_Generator', 'gifs/static.gif', 'static_generator/'),
    new Game ('ScoreTracker', 'gifs/counter.gif', 'scoretracker/' ,'beta-game'),
    // new Game ('Klondike', 'gifs/klondike.gif', 'klondike/', 'beta-game'),
    // new Game ('Device_Infos', 'gifs/terminal.gif', 'device_infos/', 'alpha-game'),
    new Game ('Metallica Pinball Radio', 'gifs/metallica.gif', 'metallica_pinball_radio/'),
    new Game ('JSimon', 'gifs/jsimon.gif', 'JSimon/'),
    new Game ('Mister Coco', 'gifs/mister-coco.gif', 'mister-coco/'),
  ]
  );

// VARIABLES
let selectedItem;
let grabbingInterval;
let movingImage;


// FUNCTIONS
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

// MAIN
games.displayGames;

