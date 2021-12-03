/*
 * Adds event listener to window DOMContentLoaded Event to execute main-function
 * Listens to Window DOMContentLoaded instead of Window Load to execute the function
 * as soon as the DOM is ready instead of waiting for every resource to finish loading and rendering. 
 */
window.addEventListener('DOMContentLoaded', main);

/**Start of the program */
function main() {
    addEventListeners();
}

/**Function that add onclick event on buttons */
function addEventListeners() {
    let menuToggle = document.getElementById('menu-toggle');
    menuToggle.onclick = toggleMenu;

    let contact = document.getElementById('contact');
	contact.onclick = toggleContactForm;
}

/**
 * Event listener that toggles the sideemnu
 *
 * @param {MouseEvent} e - The MouseEvent click event.
 * @listens MouseEvent
 */
function toggleMenu(e) {
    let aside = document.querySelector('aside');
    document.body.classList.remove('modal');
    aside.classList.toggle('show-menu');
    aside.classList.remove('show-contact');
	e.preventDefault();
}

/**
 * Event listener that toggles the contact form
 *
 * @param {MouseEvent} e - The MouseEvent click event.
 * @listens MouseEvent
 */
function toggleContactForm(e) {
	let aside = document.querySelector('aside');
    document.body.classList.toggle('modal');
    aside.classList.toggle('show-contact');
	aside.classList.remove('show-menu');
	e.preventDefault();
}