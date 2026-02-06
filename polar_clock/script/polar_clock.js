const secondsArc = document.querySelector('#seconds');

function updateSeconds ()
{
	let date = new Date();
	let secondsValue = date.getSeconds();
	let millisecValue = date.getMilliseconds();
	let percentage = secondsValue / 60 * 100;

	secondsArc.setAttribute('stroke-dasharray', `${percentage}%, 100%`);
	setTimeout(updateSeconds, 1000 - millisecValue);
}

updateSeconds();