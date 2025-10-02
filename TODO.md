# TO DO

## Pending
 + Common elements
  + Use header everywhere

 + Trello
  + Clean Update

 + ScoreTracker
  + controls style

 + Mister coco
  + Filter names

 + Barrels Game

 + Klondike
  + checkMovability
   + Add a better way to calculate suit 
   + Add a class to check if card can move
    + Use it in drag eventListener
   + Check card destination validity
   + Better cards superposition

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
 + Settings
 + Use HTML default drag' n' drop API for more compatibility with mobile

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
   + Check placable card
   + Check Victory conditions
    + Every suit has all of it's cards

### Static Generator
+ Add Favicon
 + Optimize to generate each frame faster
 + Header with sliders and buttons
   + pause button style

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
 + Icon
 + Filter players names better
  + Removes empty spaces and weird characters before analyzing names.
 + More verifications
  + No double names (use nickname or first letter of lastname to differentiate).
 + Flash messages to display errors.
 + Add a way for players to input a list of their own events

### Calculator
 + Handle all special keys
 + f processExp
 + f addToExpZone
  + Add verification before effectively adding to the expZone
 + Flash messages
 + Hidden animation on special code entry
 + Add long press on back btn to delete all expression
  + animation
  + function

### Barrels
 + Reproduce barrel game from Mario & Luigi Superstar Saga
 + 6x6 Grid 

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
 + 3x3 grid
 + 2 players
  + each round is another players
 + check victory
 + check end

### Turret defender idle
 + Turret in the center
 + Ennemies come from outside of the screen in a circle
 + After every number of ennemies killed, make player choose beetween cards to upgrade
 + HP bar going down for each ennemy hitting the turret
 + Prestige to augment base damage based on how many ennemies killed in total
  + loose all prestige points  if killed to make  the player prestige at the right timing

### Gamepad Tester
 + See all input values from a gamepad

