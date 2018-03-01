'use strict';

// TODO
// - show images dynamically
//    - show all through render function, remove from html

function Product (name, filepath) {
    this.name = name;
    this.filepath = filepath;
}

Product.prototype.render = function () {
    const elImages = document.createElement('img');
    elImages.src = this.filepath;
    return elImages;
}

const analysis = {
    products: [],
    selectedProducts: [],
    start: function () {
        this.products.push(
            new Product ('bag', 'img/bag.jpg'),
            new Product('banana', 'img/banana.jpg'),
            new Product('boots', 'img/boots.jpg'),
            new Product('chair', 'img/chair.jpg'),
            new Product('cthulhu', 'img/cthulhu.jpg'),
            new Product('dragon', 'img/dragon.jpg'),
            new Product('pen', 'img/pen.jpg'),
            new Product('scissors', 'img/scissors.jpg'),
            new Product('shark', 'img/shark.jpg'),
            new Product('sweep', 'img/sweep.jpg'),
            new Product('unicorn', 'img/unicorn.jpg'),
            new Product('usb', 'img/usb.jpg'),
            new Product('water-can', 'img/water_can.jpg'),
            new Product('wine-glass', 'img/wine_glass.jpg'),
        );
        
        this.showProducts();
        
        const elContainer = document.getElementById('images-container');
        elContainer.addEventListener('click', registerImageClick);
    },

    showProducts: function () {
        const elContainer = document.getElementById('images-container');
        for (let i = 0; i < this.products.length; i++) {
            elContainer.appendChild(this.products[i].render());
        }
    }
}

function registerImageClick() {
    if (event.target.tagName === 'IMG') {
        const index = event.target.src.lastIndexOf('/');
        console.log(event.target.src.substring(index + 1));
    }
}

analysis.start();


// function addListeners() {
//     document.getElementById("pictures").addEventListener("click", registerImageClick);
//     console.log('listening');
// }

// function registerImageClick(event) {

// }

// window.addEventListener("load", addListeners);