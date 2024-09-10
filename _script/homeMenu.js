// CLASSES
class HomeMenu {
  constructor ()
  {
    // console.log("Creating Home Menu"); // DEBUG
    this.createElts();
    this.addButtons();
  }

  createElts ()
  {
    // Creating div for thr home menu
    this.menuDiv = document.createElement('div');
    this.menuDiv.className = 'homeMenu hidden';
    document.body.append(this.menuDiv);
  }

  addButtons ()
  {
    // Adding buttons combo to trigger the menu
    document.body.addEventListener('keydown', saveKeyDown);
    document.body.addEventListener('keyup', saveKeyUp);
  }

  display ()
  {
    // Showing menu
    this.menuDiv.classList.toggle('hidden');
    console.log("Showing menu");
  }
}

// CONSTANTS
const hm = new HomeMenu();

// VARIABLES
let keysDown = [];

// FUNCTIONS
function saveKeyUp (evt)
{
  keysDown[evt.key] = false;
}

function saveKeyDown (evt)
{
  keysDown[evt.key] = true;
  if (keysDown['h'] && keysDown['o'] && keysDown['m'] && keysDown['e']) {
    hm.display();
  }
}