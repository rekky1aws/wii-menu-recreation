// CONSTANTS
const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const body = document.querySelector('body');

const arcs = {
	seconds: document.querySelector('#seconds-arc'),
	minutes: document.querySelector('#minutes-arc'),
	hours: document.querySelector('#hours-arc'),
	days: document.querySelector('#days-arc'),
	months: document.querySelector('#months-arc')
};

const digits = {
	seconds: document.querySelector('#seconds-digit'),
	minutes: document.querySelector('#minutes-digit'),
	hours: document.querySelector('#hours-digit'),
	days: document.querySelector('#days-digit'),
	months: document.querySelector('#months-digit'),
	years: document.querySelector('#years-digit')
}

const colors = {
	seconds: "#8D021E",
	minutes: "#881600",
	hours: "#C16200",
	days: "#DBDB43",
	months: "#B6FF5C",
	years: "#BDFF6B",
	background: "#1D1D1D",
	foreground: "#E2E2E2"
}

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
	arcs.days.setAttribute('pathLength', daysInMonth);
}

function updateArc (key, value) {
	arcs[key].setAttribute('stroke-dasharray', `${value}, 200%`);
}

function updateDigit (key, value) {
	if (`${value}`.length < 2) {
		digits[key].textContent =  `0${value}`;
	} else {
		digits[key].textContent =  value;
	}
}

function updatePart (key, value) {
	updateArc(key, value);
	updateDigit(key, value);
}

function updateAll ()
{
	let date = new Date();
	let millisecValue = date.getMilliseconds();

	updatePart('seconds', date.getSeconds());
	if (date.getSeconds() == 0) {
		updatePart('minutes', date.getMinutes());
	}
	if (date.getMinutes() == 0) {
		updatePart('hours', date.getHours());
	}
	if (date.getHours() == 0) {
		updatePart('days', date.getDate());
	}
	if (date.getDate() == 1) {
		updatePart('months', date.getMonth());
	}
	if (date.getMonth() == 1) {
		updateDigit('years', date.getFullYear());
	}

	setTimeout(updateAll, 1000 - millisecValue);
}

function firstUpdate ()
{
	let date = new Date();
	let millisecValue = date.getMilliseconds();

	updatePart('seconds', date.getSeconds());
	updatePart('minutes', date.getMinutes());
	updatePart('hours', date.getHours());
	updatePart('days', date.getDate());
	updatePart('months', date.getMonth());
	updateDigit('years', date.getFullYear());

	setTimeout(updateAll, 1000 - millisecValue);
}

function updateColors ()
{
	Object.keys(colors).forEach((element) => {
		if (arcs[element]) {
			arcs[element].setAttribute('stroke', colors[element]);
		}
		if (digits[element]) {
			digits[element].style.color = colors[element];
		}
	});

	body.style.backgroundColor = colors.background;
	body.style.color = colors.foreground;
}

// MAIN
setDaysArcLength();
updateColors();
firstUpdate();