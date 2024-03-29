/* 
    Using new URLSearchParams(window.location.search) to collect the ID of a product to display on product page.
*/
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const getOneUrlById = 'http://localhost:3000/api/products/' + id;
fetch(getOneUrlById)
    .then((response) => response.json())
    .then((data) => {
        productionCard(data);
    });

// assign cart array variable to get data item in localStorage 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//this obj represents the product that user selected
const productObj = {
    id: '',
    color: '',
    quantity: 1
};



// generate product card 
function productionCard(productData) {
    // access to dom
    const itemImg = document.getElementsByClassName('item__img')[0];
    const title = document.querySelector('#title');
    const price = document.querySelector('#price');
    const description = document.querySelector('#description');
    const colors = document.getElementById('colors');
    const quantity = document.getElementById('quantity');
    const addToCart = document.getElementById('addToCart');

    // modify element by adding textContent
    title.textContent = productData.name;
    price.textContent = productData.price;
    description.textContent = productData.description;

    // create image element and setAttributes of source and alternative text
    const img = document.createElement('img');
    img.setAttribute('src', productData.imageUrl);
    img.setAttribute('alt', productData.altTxt);

    //appendChild 
    itemImg.appendChild(img);

    // Creating option elements to select colors of item 
    for (let color of productData.colors) {
        const option = document.createElement('option');
        option.setAttribute('value', color);
        option.textContent = color;
        colors.appendChild(option);
    }

    // add addEventListener function to select amount of product  
    quantity.addEventListener('change', function quantityChanged(event) {
        let input = event.target.value;
        productObj.quantity = parseInt(input, 10);
        console.log(productObj);
    });

    // add addEventListener function to select color option 
    colors.addEventListener('change', function selectedColor(event) {
        let selectedColor = event.target.value;
        productObj.color = selectedColor;
        console.log(productObj);
    });

    // adding product to Cart and save in localStorage 
    addToCart.addEventListener('click', addItemToCart);

    initialProductObj(productData);
}

// initial productObj 
function initialProductObj(productData) {
    productObj.id = productData._id;
    productObj.color = productData.colors;
}

/*  
    Create addItemToCart function to add ordered product into cart
    Verify Conditions of products in cart.
    1- same id & color
    2- same id & different color
    3- different id & same color
*/
function addItemToCart() {

    if (productObj.color === '') {
        return;
    }
    let selectedId = true;
    for (let product of cart) {
        if (product.id === productObj.id && product.color === productObj.color) {
            console.log("before", product.quantity);
            product.quantity += productObj.quantity;
            selectedId = false;
            console.log("after", product.quantity);
        }

    }

    if (selectedId === true) {

        cart.push(productObj);
    }

    //setting localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    cart = JSON.parse(localStorage.getItem('cart'));
    resetProduct();

}

/* 
    reset or refresh the page after clicked addToCard button to identify 
    item have added to cart after click button "Add to Cart".

*/
function resetProduct() {
    const colors = document.getElementById('colors');
    const quantity = document.getElementById('quantity');

    colors.value = '';
    quantity.value = 1;

    productObj.color = '';
    productObj.quantity = 1;

}





























