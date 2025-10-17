// CONSTANT
const newNote = document.querySelector('#new-note');
const notesContainer = document.querySelector('#notes-container');

// FUNCTIONS
function deleteNote (evt)
{
  if (confirm('Are you sure you want to delete this note ?')) {
    evt.target.parentNode.remove();
  }
}

function createNewNote (content)
{
  const newNoteElt = document.createElement('div');
  const newNoteContent = document.createElement('div');
  const newNoteDelBtn = document.createElement('button');

  newNoteElt.classList.add('note');
  newNoteContent.classList.add('note-content');
  newNoteDelBtn.classList.add('clickable', 'note-del');

  newNoteContent.textContent = content;
  newNoteDelBtn.textContent = "X";

  newNoteDelBtn.addEventListener('click', deleteNote);

  newNoteElt.append(newNoteContent);
  newNoteElt.append(newNoteDelBtn);
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