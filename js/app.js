'use strict';

// TODO -
//    - 

var boardClicked = 0;

function Product (name, filepath) {
    this.name = name;
    this.filepath = filepath;
    this.timesShown = 0;
    this.timesClicked = 0;
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
            new Product('water_can', 'img/water_can.jpg'),
            new Product('wine_glass', 'img/wine_glass.jpg'),
        );
        
        this.randomizeProducts();
        this.showProducts();
        
        const elContainer = document.getElementById('images-container');
        elContainer.addEventListener('click', registerImageClick);
    },

    randomizeProducts: function () {
        this.selectedProducts = [];
        while (this.selectedProducts.length < 3) {
            const randomNum = Math.floor(Math.random() * this.products.length);
            const product = this.products[randomNum];
            if (!this.selectedProducts.includes(product)) {
                product.timesShown++;
                this.selectedProducts.push(product);
            }
        }
        return this.selectedProducts;
    },

    showProducts: function () {
        const elContainer = document.getElementById('images-container');
        for (let i = 0; i < this.selectedProducts.length; i++) {
            elContainer.appendChild(this.selectedProducts[i].render());
        }
    },

    clearBoard: function () {
        const elContainer = document.getElementById('images-container');
        elContainer.textContent = '';
    }
}

function registerImageClick() {
    console.log(boardClicked);    
    analysis.clearBoard();
    analysis.randomizeProducts();
    analysis.showProducts();

    boardClicked++;
    if ((boardClicked % 15 === 0) && (boardClicked !== 0)) {
        const elContainer = document.getElementById('button-container');
        const elButton = document.createElement('button');
        elButton.id='button';
        elButton.textContent = 'See Totals';
        elContainer.appendChild(elButton);
    } else if ((boardClicked % 15 === 1) && (boardClicked !== 1)) {
        const buttonToRemove = document.getElementById('button');
        const elContainer = document.getElementById('button-container');
        elContainer = buttonToRemove.parentNode;
        elContainer.removeChild(buttonToRemove);
    }

    if (event.target.tagName === 'IMG') {
        const index = event.target.src.lastIndexOf('/') + 1;
        const strIndex = event.target.src.substring(index);
        const slicedIndex = strIndex.slice(0, -4);
        //console.log(strIndex.slice(0, -4));
        for (let i = 0; i < analysis.products.length; i++) {
            const product = analysis.products[i];
            if (slicedIndex === product.name) {
                product.timesClicked++;
                //console.log(product.timesClicked);
            }
        }
    }
}

analysis.start();
