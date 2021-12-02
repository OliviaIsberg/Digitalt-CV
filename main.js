window.addEventListener('load', main);

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
/**Function that hides sidemenu */
function toggleMenu(e) {
    let aside = document.querySelector('aside');
    aside.classList.toggle('show-menu');
    aside.classList.remove('show-contact');
	e.preventDefault();
}

function toggleContactForm(e) {
	let aside = document.querySelector('aside');
    aside.classList.toggle('show-contact');
	aside.classList.remove('show-menu');
	e.preventDefault();
}