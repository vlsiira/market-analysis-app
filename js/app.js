'use strict';

let boardClicked = 0;

function Product (name, filepath) {
    this.label = name;
    this.filepath = filepath;
    this.timesShown = 0;
    this.y = 0;
}

const render = function (filepath) {
    const images = document.createElement('img');
    images.src = filepath;
    // images.className = 'images';
    return images;
}

const analysis = {
    products: [],
    selectedProducts: [],
    start: function () {
        if (localStorage.getItem('clicks') == null) {
            analysis.products.push(
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
        } else {
            analysis.products = JSON.parse(localStorage.getItem('clicks'));
        }

        analysis.randomizeProducts();
        analysis.showProducts();

        const imagesContainer = document.getElementById('images-container');
        imagesContainer.addEventListener('click', registerImageClick);

        const buttonContainer = document.getElementById('button-container');
        buttonContainer.addEventListener('click', registerButtonClick);
    },

    randomizeProducts: function () {
        analysis.selectedProducts = [];
        while (analysis.selectedProducts.length < 3) {
            const randomNum = Math.floor(Math.random() * analysis.products.length);
            const product = analysis.products[randomNum];
            if (!analysis.selectedProducts.includes(product)) {
                analysis.selectedProducts.push(product);
                product.timesShown++;
            }
        }
        return analysis.selectedProducts;
    },

    showProducts: function () {
        const imagesContainer = document.getElementById('images-container');
        for (let i = 0; i < analysis.selectedProducts.length; i++) {
            imagesContainer.appendChild(render(analysis.selectedProducts[i].filepath));
        }
    },

    clearBoard: function () {
        const imagesContainer = document.getElementById('images-container');
        imagesContainer.textContent = '';
    }
}

function registerImageClick() {
    if (event.target.tagName === 'IMG') {
        const index = event.target.src.lastIndexOf('/') + 1;
        const strIndex = event.target.src.substring(index);
        const slicedIndex = strIndex.slice(0, -4);
        for (let i = 0; i < analysis.products.length; i++) {
            const product = analysis.products[i];
            if (slicedIndex === product.label) {
                product.y++;
                localStorage.setItem('clicks', JSON.stringify(analysis.products));
            }
        }

        console.log(boardClicked);

        // const images = document.getElementsByClassName('images');
        // function fade() {
        //     imgages.classList.add('opacity');
        // }

        analysis.clearBoard();
        analysis.randomizeProducts();
        analysis.showProducts();
        
        boardClicked++;
        if ((boardClicked % 15 === 0) && (boardClicked !== 0)) {
            const buttonContainer = document.getElementById('button-container');
            const button = document.createElement('button');
            button.id='button';
            button.textContent = 'See Totals';
            buttonContainer.appendChild(button);
            
        } else if ((boardClicked % 15 === 1) && (boardClicked !== 1)) {
            const buttonToRemove = document.getElementById('button');
            const imagesContainer = buttonToRemove.parentNode;
            imagesContainer.removeChild(buttonToRemove);
        }
        
    }
}

function registerButtonClick() {

    const buttonContainer = document.getElementById('chart-container');
    buttonContainer.innerHTML = '';
    buildChart();
}

function buildChart() {
	var chart = new CanvasJS.Chart("chart-container", {
		title:{
			text: "Totals"
		},
		data: [
		{
			type: "column",
			dataPoints: analysis.products
		}
		]
	});
	chart.render();

}

window.addEventListener("load", analysis.start)
