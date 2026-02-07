# Codestyle

## Architecture
For each app, we have :
 + app_name
 	+ script
 		+ app_name.js
 	+ style
 		+ app_name.css
 	+ index.html

In `script` and `style` we can have more files to make it easier to read with a descriptive name.
We can have multiple HTML files too if needed.

## Inclusions
Every app should include :
 + styles :
  + `/_style/header.css`
  + `/_style/common.css`
 + script :
  + `/_script/header.js`

## Naming
HTML / CSS classes and id are in `snake_case`.
JS variables are in `camelCase`.

## Git
Commits for apps should start with `[XXX]`, XXX being the code corresponding to the app :
 + [BAR] Barrels
 + [CAL] Calculator
 + [DEV] Device Infos
 + [DVD] DVD
 + [SIM] JSimon
 + [PAI] JS-Paint
 + [KLO] Klondike
 + [MPR] Metallica Pinball Radio => git submodule, for any change code it in the corresponding repo
 + [MCA] Mister Coco Assistant
 + [SCO] Score Tracker
 + [STA] Static Generator
 + [PCL] Polar Clock