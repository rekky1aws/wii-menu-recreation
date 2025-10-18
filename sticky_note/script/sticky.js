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

function createNewNoteElt (content)
{
  const newNoteElt = document.createElement('li');
  const newNoteContent = document.createElement('div');
  const newNoteDate = document.createElement('div');
  const newNoteDelBtn = document.createElement('button');

  newNoteElt.classList.add('note');
  newNoteContent.classList.add('note-content');
  newNoteDelBtn.classList.add('clickable', 'note-del');
  newNoteDate.classList.add('note-date');

  newNoteContent.textContent = content;
  newNoteDate.textContent = new Date().toString()

  newNoteDelBtn.addEventListener('click', deleteNote);

  newNoteElt.append(newNoteContent, newNoteDate, newNoteDelBtn);
  notesContainer.append(newNoteElt);
}

function newNoteHandler (evt)
{
  // console.log(evt.key); // DBEUG
  
  if (evt.key == "Enter") {
    createNewNoteElt(newNote.value);
    newNote.value = "";
  }
}

// EVENT LISTENERS
newNote.addEventListener('keyup', newNoteHandler);