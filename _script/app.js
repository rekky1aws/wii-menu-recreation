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

        // Common element attributes
    game.href = this.gameLink;
    game.draggable = "false";
    game.className="game hover-light";

        // If there's an app, create img
    if (this.imageLink !== null) {
      image = document.createElement('img');
      image.alt = this.name;
      image.src = this.imageLink;
        // Else create div
    } else {
      image = document.createElement('div');
    }

        // Adding element attributes
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
    // A GameCollection represents the games grid on a page.
    // It automatically handles the grid displaying on a 3*4 size
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
    new Game ('Mister Coco', 'gifs/mister-coco.gif', 'mister-coco/', 'beta-game'),
  ]
  );

// VARIABLES
let selectedItem;
let grabbingInterval;
let movingImage;


// FUNCTIONS
function swapItems (sourceA, sourceB)
{
    // Swapping two apps
  if (sourceA !== sourceB)
  {
        // Getting parents
    const parentA = sourceA.parentNode;
    const parentB = sourceB.parentNode;

      // Saving parent classes
    let parentClassSwpA = [...parentA.classList]
    let parentClassSwpB = [...parentB.classList];

      // Removing previous parent classes
    parentA.classList.remove(...parentA.classList);
    parentB.classList.remove(...parentB.classList);

      // Applying new parent classes
    parentA.classList.add(...parentClassSwpB);
    parentB.classList.add(...parentClassSwpA);

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

