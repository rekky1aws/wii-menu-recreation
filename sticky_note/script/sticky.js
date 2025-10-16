// CONSTANT
const newNote = document.querySelector('#new-note');
const notesContainer = document.querySelector('#notes-container');

// FUNCTIONS
function createNewNote (content)
{
  const newNoteElt = document.createElement('div');
  newNoteElt.classList.add('note');
  newNoteElt.textContent = content;

  notesContainer.append(newNoteElt);
}

function newNoteHandler (evt)
{
  // console.log(evt.key); // DBEUG
  
  if (evt.key == "Enter") {
    createNewNote(newNote.value);
    newNote.value = "";
  }
}

// EVENT LISTENERS
newNote.addEventListener('keyup', newNoteHandler);