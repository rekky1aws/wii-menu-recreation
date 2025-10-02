const htmlBody = document.querySelector('body');
const htmlHead = document.querySelector('head');

console.log('header.js loaded'); // DEBUG

// Checking for already present header
if (!Object.values(htmlBody.children).map(x => x.tagName).includes('HEADER')) {
	// Creating all elements
	const header = document.createElement('header');
	const title = document.createElement('h1');
	const backBtn = document.createElement('a');
	const menuBtn = document.createElement('button');

	// Title
	title.textContent = htmlHead.querySelector('title').textContent;

	// Back Button
	backBtn.textContent = "←";
	backBtn.classList.add('clickable', 'header-btn');
	backBtn.href = "/";

	// Menu Button
	menuBtn.textContent = "⌂";
	menuBtn.classList.add('clickable', 'header-btn');
	// menuBtn.addEventListener('click', showHomeMenu); // TODO

	// Adding elements
	header.append(backBtn, title, menuBtn);
	htmlBody.prepend(header);
}
