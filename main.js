window.addEventListener('load', main);

/**Start of the program */
function main() {
    addEventListeners();
}

/**Function that add onclick event on buttons */
function addEventListeners() {
    let hiddenMenuIcon = document.getElementById('hidden-menu-icon');
    hiddenMenuIcon.onclick = hideMenuOnClick;
    
}
/**Function that hides sidemenu */
function hideMenuOnClick() {
    let aside = document.querySelector('aside');
    aside.classList.toggle('show-menu');
}

