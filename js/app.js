'use strict';

// TODO
// - get click event to console log which img was clicked
//    - use event.target.tagName?

function registerImageClick() {
    if (event.target.tagName === 'IMG') {
        const index = event.target.src.lastIndexOf('/');
        console.log(event.target.src.substring(index + 1));
    }
}

const elImages = document.getElementById('images');
elImages.addEventListener('click', registerImageClick);


// function addListeners() {
//     document.getElementById("pictures").addEventListener("click", registerImageClick);
//     console.log('listening');
// }

// function registerImageClick(event) {

// }

// window.addEventListener("load", addListeners);