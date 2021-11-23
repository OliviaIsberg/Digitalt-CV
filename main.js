window.addEventListener('load', main);

function main() {
    addEventListeners();
}

function addEventListeners() {
    const hiddenMenuIcon = document.getElementById('hidden-menu-icon');
    const header = document.querySelector('header');
    hiddenMenuIcon.addEventListener('click', function(){
        header.classList.toggle('show-menu');
    })
}