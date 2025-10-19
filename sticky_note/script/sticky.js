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

function refreshCD (container)
{

}

function createNewNoteElt (content, date='')
{
  // Creating HTML tags.
  const newNoteElt = document.createElement('li');
  const newNoteContent = document.createElement('div');
  const newNoteDate = document.createElement('div');
  const newNoteCD = document.createElement('div');
  const newNoteDelBtn = document.createElement('button');

  // HTML tags classes
  newNoteElt.classList.add('note');
  newNoteContent.classList.add('note-content');
  newNoteDelBtn.classList.add('clickable', 'note-del');
  newNoteDate.classList.add('note-date', 'hidden');
  newNoteCD.classList.add('note-countdown');

  // Handling dates
  let noteDate;
  if (date) { // If task already exists and has a date
    noteDate = new Date(date);
  } else { // Else add date to 24h after creation
    noteDate = new Date(new Date().getTime() + (60 * 60 * 24 * 1000));
  }
  const countdownDate = new Date(noteDate.getTime() - new Date().getTime());
  // Pre-pending a 0 if the number is only one character long
  let countdownHours = `${countdownDate.getTime() / (60 * 60 * 1000)}`;
  if (countdownHours.length == 1) {
    countdownHours = "0" + countdownHours;
  }
  let countdownMinutes = `${(countdownDate.getTime() / (60 * 1000)) % 60}`;
  if (countdownMinutes.length == 1) {
    countdownMinutes = "0" + countdownMinutes;
  }
  let countdownSeconds = `${(countdownDate.getTime() / (1000)) % 60}`;
  console.log(countdownSeconds.length);
  if (countdownSeconds.length == 1) {
    countdownSeconds = "0" + countdownSeconds;
  }

  // Setting HTML tags content
  newNoteContent.textContent = content;
  newNoteDate.textContent = noteDate.toISOString();
  newNoteCD.textContent = countdownHours + ":" + countdownMinutes + ":" + countdownSeconds;

  // Deletion button interaction
  newNoteDelBtn.addEventListener('click', deleteNote);

  // Adding tags to the DOM
  newNoteElt.append(newNoteContent, newNoteDate, newNoteCD, newNoteDelBtn);
  notesContainer.append(newNoteElt);
}

function newNoteHandler (evt)
{
  // console.log(evt.key); // DBEUG
  
  if (evt.key == "Enter") {
    createNewNoteElt(newNote.value);
    // saveNotes();
    newNote.value = "";
  }
}

// EVENT LISTENERS
newNote.addEventListener('keyup', newNoteHandler);