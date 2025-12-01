// CONSTANT
const newNote = document.querySelector('#new-note');
const notesContainer = document.querySelector('#notes-container');
const delAllBtn = document.querySelector('#del-all-btn');

// VARIABLES
let cdRefreshIntvl;

// FUNCTIONS
function deleteNote (evt)
{
  if (confirm('Are you sure you want to delete this note ?')) {
    evt.target.parentNode.remove();
  }
}

function deleteAllNotes ()
{
  if (confirm('Are you sure you want to delete ALL the notes ? (This will clear them in memory too)')) {
    notesContainer.innerHTML = "";
    localStorage.removeItem('storedNotes');
  }
}

function saveNotes ()
{
  console.log("saving notes"); // DEBUG
  const data = [];
  notesContainer.childNodes.forEach(note => {
    let noteData = {
      content: note.querySelector('.note-content').textContent,
      date: note.querySelector('.note-date').textContent
    };
    data.push(noteData);
  });

  localStorage.setItem('storedNotes', JSON.stringify(data));
  console.log("notes saved to localStorage"); // DEBUG
}

function loadNotes ()
{
  console.log("loading notes"); // DEBUG
  // No notes in localStorage => nothing to load
  if (!localStorage.getItem('storedNotes')) {
    return false;
  }

  const data = JSON.parse(localStorage.getItem('storedNotes'));;
  console.log(data); // DEBUG

  data.forEach(note => {
    // TODO : check countdown < 0 => dont display and put it in separate list
    createNewNoteElt(note.content, note.date);
  });
}

function refreshCountdowns (container)
{
  console.log("refreshing countdowns");
  // No notes => no countdown to refresh
  if (!notesContainer.childNodes.length) {
    return false;
  }
  notesContainer.childNodes.forEach(noteElt => {
    const date = noteElt.querySelector('.note-date').textContent;
    const cdElt = noteElt.querySelector('.note-countdown');

    // Date TIMED OUT => no need to calculate more.
    if (cdElt.textContent == "TIMED OUT") {
      return false;
    }

    // Handling dates
    let noteDate = new Date(date);
    const countdownInSecs = new Date(noteDate.getTime() - new Date().getTime()).getTime() / 1000;

    if (countdownInSecs <= 0) {
      cdElt.textContent = "TIMED OUT";
      cdElt.classList.add('timed-out');
      return false;
    }

    // Pre-pending a 0 if the number is only one character long
    let countdownHours = `${Math.floor(countdownInSecs / (60 * 60))}`;
    if (countdownHours.length == 1) {
      countdownHours = "0" + countdownHours;
    }
    let countdownMinutes = `${Math.floor((countdownInSecs / (60)) % 60)}`;
    if (countdownMinutes.length == 1) {
      countdownMinutes = "0" + countdownMinutes;
    }
    let countdownSeconds = `${Math.floor(countdownInSecs % 60)}`;
    // console.log(countdownSeconds.length); // DEBUG
    if (countdownSeconds.length == 1) {
      countdownSeconds = "0" + countdownSeconds;
    }

    const countdownFinal = `${countdownHours}:${countdownMinutes}:${countdownSeconds}`;
    cdElt.textContent = countdownFinal;
  });
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

  let noteDate;
  if (date) { // If task already exists and has a date
    noteDate = new Date(date);
  } else { // Else add date to 24h after creation
    noteDate = new Date(new Date().getTime() + (60 * 60 * 24 * 1000));
  }

  // Setting HTML tags
  newNoteContent.textContent = content;
  newNoteDate.textContent = noteDate.toISOString();
  newNoteCD.textContent = "XX:XX:XX";

  // Deletion button interaction
  newNoteDelBtn.addEventListener('click', deleteNote);

  // Adding tags to the DOM
  newNoteElt.append(newNoteContent, newNoteDate, newNoteCD, newNoteDelBtn);
  notesContainer.append(newNoteElt);

  console.log("created note element"); // DEBUG
}

function newNoteHandler (evt)
{
  // console.log(evt.key); // DBEUG

  if (evt.key == "Enter") {
    createNewNoteElt(newNote.value);
    saveNotes();
    newNote.value = "";
  }
}

// EVENT LISTENERS
newNote.addEventListener('keyup', newNoteHandler);
delAllBtn.addEventListener('click', deleteAllNotes);

// MAIN
loadNotes();
refreshCountdowns();
cdRefreshIntvl = setInterval(refreshCountdowns, 1000);
