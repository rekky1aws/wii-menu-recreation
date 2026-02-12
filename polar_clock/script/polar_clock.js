const secondsArc = document.querySelector('#seconds');
const minutesArc = document.querySelector('#minutes');
const hoursArc = document.querySelector('#hours');

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

function updateAll ()
{
	let date = new Date();
	let millisecValue = date.getMilliseconds();

	updateSeconds(date.getSeconds());
	updateMinutes(date.getMinutes());
	updateHours(date.getHours())

	setTimeout(updateAll, 1000 - millisecValue);
}

updateAll();