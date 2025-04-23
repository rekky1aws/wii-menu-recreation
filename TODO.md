# TO DO

## General
 + Add a master js to generate common elements
  + Header
  + Home Button
  + Home Menu on press of escape

 + TO FINISH
  + Klondike

 + Imports
  + Synclap
  + Perfect Pitch
  + Letter Frequency
  + Chmod Calculator

 + Complete README
  + Klondike
  + (Imports when done)

## Main Menu
 + Add Favicon
 + +/- buttons
  + positions
  + Navigating through the different pages
 + Dynamic aspect ratio for apps
 + Add modals for warnings (photosensitivity and app status) 
 + Channel prompt before opening
 + Loader

---

## Started Apps
### JSPaint
 + Add favicon
 + Replace Gif by a custom one

### DVD
 + Add favicon

### Klondike
 + Add favicon
 + Add Burger Menu
    + Content
    + f changeState
 + Gameplay :
   + Movable Cards
   + Check placable card
   + Card distribution

### Static Generator
+ Add Favicon
 + Optimize to generate each frame faster
 + Header with sliders and buttons
   + pause button style
   + control the ratio of black pixels
   + number of pixels

### JSimon
 + Different Sounds for each buttons
 + localStorage
  + last score
  + best score
 + Start to rotate the game after 100pts
  + Speed Up every 10pts after

### Score Tracker
 + Style
   + playerCards
     + polish
   + Dark Mode
 + Add Favicon
 + Player Class
   + @ updateDisplay (to prevent from regenerating everything)
 + localStorage to save data between sessions
   + f saveLocal : Saves data in localStorage
   + f loadLocal : Load data from the localStorage
 + f changeTheme
 + Rounds
  + Confirm Scores for this round
  + Save round to players and save players state to localStorage
 + Display game stats

### MisterCoco Web Helper
 + Icons
 + Filter player better
  + Removes empty spaces and weird characters before analyzing names.
 + More verifications
  + No double names (use nickname or first letter of lastname to differentiate).
 + Flash messages to display errors.
 + Save Player names to localStorage
 + If players names are in localStorage load them  and ask user if they want to use it

 + Change end text to let players know that now is the time to use the cards to play
    + Each player put a card on the table for two turns (resulting in two cards per player).
 + Reload Button

---

## Coming Apps
### Polar Clock
 + Concentric circles progressing to show time span.

### Game of Life
 + Playable conway's game of life
  + grid
  + calculate cell next stage

### Ovo
 + One and two player version of the game OVO
  + 6x6 board
  + movable eggs with a color "underneath"

### Arkanoid
 + Clasic brick breaker
  + moving ball
  + bricks on top of the screen
  + a bar to throw the ball back to the bricks
 + Menu to start a new game

### Minesweeper
 + Classic Minesweeper game
  + Generating a grid with mines
  + Clicking a box shows numbers of mines in the 8 surrounding boxes
  + If there's no mine around, show boxes until there is

### Tetrjs
 + Tetris Game
  + Gamezone
  + keyboard controls
  + xinput controls

### QuizMaker
 + A simple app to create quiz and share it with your friends using a string
  + Create a quiz
    + Create a question
      + Add choices
      + Choose possible answers
    + Save a quiz
      + Export JSON of questions to a base64 string
  + Play a quiz
    + Enter a base64 string
    + Play pre-made quizs

### Jsaac
 + A simplier version of the binding of isaac

### Double pendulum
 + A double pendulum simulation to demonstrate chaos theory

### Device Infos
 + Add favicon
 + !!! Find a way to limit infinite loop on the recursion
 + Displays all the infos the browser can get from your device

### Notepad
 + App to take notes
  + Add a new tab
  + Close a tab
  + Write things
  + Save current content to localStorage
  + Save file to computer
  + (Bonus : handle markdown syntax highlighting)
  + (Bonus : handle markdown rendering)
  + (Bonus Bonus : handle many languages syntax highlighting)

### Guitar Wiiro
 + 3 tracks
 + default keyboard config
 + menu
  + song selection
  + keyboard settings

### TodoList
 + Todo list
 + Save and Load in localStorage

### Chrono
 + Start Time
 + End Time
 + Reset Time
 + Laps

### Tic Tac Toe

### Calculator
 + Hidden animation on special code entry

