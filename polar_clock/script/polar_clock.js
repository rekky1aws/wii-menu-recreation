// CONSTANTS
const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const secondsArc = document.querySelector('#seconds');
const minutesArc = document.querySelector('#minutes');
const hoursArc = document.querySelector('#hours');
const daysArc = document.querySelector('#days');

// FUNCTIONS
function isYearBisextile (year)
{
	if (year % 4 != 0) {
		return false;
	}

	if (year % 100 == 0) {
		if (year % 400 == 0) {
			return false;
		}
	}

	return true;
}

function setDaysArcLength ()
{
	let date = new Date();
	let month = date.getMonth();
	let daysInMonth = daysPerMonth[month-1];
	if (month == 2 && isYearBisextile(date.getFullYear())) {
		daysInMonth++;
	}
	daysArc.setAttribute('pathLength', daysInMonth);
}

function updateSeconds (secondsValue = new Date().getSeconds())
{
	secondsArc.setAttribute('stroke-dasharray', `${secondsValue}, 200%`);
}

function updateMinutes (minutesValue = new Date().getMinutes())
{
	minutesArc.setAttribute('stroke-dasharray', `${minutesValue}, 200%`);
}

function updateHours (hoursValue = new Date().getHours())
{
	hoursArc.setAttribute('stroke-dasharray', `${hoursValue}, 200%`);
}

function updateDays (daysValue = new Date().getDate())
{
	daysArc.setAttribute('stroke-dasharray', `${daysValue}, 200%`);
}

function updateAll ()
{
	let date = new Date();
	let millisecValue = date.getMilliseconds();

	updateSeconds(date.getSeconds());
	updateMinutes(date.getMinutes());
	updateHours(date.getHours());
	updateDays(date.getDate());

	setTimeout(updateAll, 1000 - millisecValue);
}

// MAIN
setDaysArcLength();
updateAll();