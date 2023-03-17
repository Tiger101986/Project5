/*
  Working with the API to request shopping product data entry 
*/
let productCache;

fetch('http://localhost:3000/api/products/')

    .then((response) => response.json())
    .then((data) => {
        initialProductCache(data);
        generateCartItem();
    });

let initialProductCache = (productData) => {
    productCache = productData;
}

/* 
  - PULL all ordered items from locaslStorage to display on cart page
*/
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Generate order card of each product  
let cartItems = document.getElementById('cart__items');

function generateCartItem() {
    if (cart.length !== 0) {

        cart.forEach((item) => {

            let search = productCache.find(items => items._id === item.id) || [];
            console.log(search);
            cartItems.innerHTML +=
                `
                    <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
                        <div class="cart__item__img">
                            <img src=${search.imageUrl} alt=${search.altTxt}>
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${search.name}</h2>
                                <p>${item.color}</p>
                                <p>€${search.price}</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                <p>Qté :  </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value= "${parseInt(item.quantity, 10)}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Delete</p>
                            </div>
                            </div>
                        </div>
                    </article>
                `;

            changeQuantity();
            removeItem();
            totalQuantityAndPrice();
        });
    }

}

// Use closest() method to change quantity item
let changeQuantity = () => {
    const itemQuantity = document.getElementsByClassName('itemQuantity');

    for (let i = 0; i < itemQuantity.length; i++) {

        let quantityChanged = itemQuantity[i];
        quantityChanged.addEventListener('change', (event) => {
            console.log(event.target.value);
            let article = event.target.closest('article');
            let itemId = article.getAttribute("data-id");
            let itemColor = article.getAttribute("data-color");
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id === itemId && cart[i].color === itemColor) {
                    cart[i].quantity = event.target.value;
                }
            }
            totalQuantityAndPrice();
            localStorage.setItem('cart', JSON.stringify(cart));
            cart = JSON.parse(localStorage.getItem('cart'));
        });
    }
}

// Calculate total quantity and price of ordered items
function totalQuantityAndPrice() {
    let totalOrderedItem = 0;
    let totalOrderedItemPrice = 0;
    const totalQuantity = document.getElementById('totalQuantity');
    const totalPrice = document.getElementById('totalPrice');

    cart.forEach((item) => {
        let search = productCache.find(items => items._id === item.id) || []
        totalOrderedItem += parseInt(item.quantity, 10);
        totalOrderedItemPrice += item.quantity * search.price;
        totalQuantity.innerHTML = totalOrderedItem;
        totalPrice.innerHTML = totalOrderedItemPrice;
    });

}

// Use closest() method to remove item
function removeItem() {
    let deleteItem = document.getElementsByClassName('deleteItem');
    for (let i = 0; i < deleteItem.length; i++) {
        let deleteButton = deleteItem[i];
        deleteButton.addEventListener('click', (event) => {

            let article = event.target.closest('article');
            let deleteItemId = article.getAttribute("data-id");
            let deleteItemColor = article.getAttribute("data-color");

            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id === deleteItemId && cart[i].color === deleteItemColor) {
                    cart.splice(i, 1);
                }
            }

            if (article) {
                article.remove();

            }

            totalQuantityAndPrice();
            localStorage.setItem('cart', JSON.stringify(cart));
            cart = JSON.parse(localStorage.getItem('cart'));
        });

    }

}

/*  
   Create validation and error messages input 
   firstName, lastName, address, city, and email functions
   to check if they are valid as requirement.
*/
let firstName = document.getElementById('firstName');
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
firstName.addEventListener('input', checkFirstName);
let validFirstName = '';

function checkFirstName() {
    let firstNameRegex = /^[A-Za-z -]{3,32}$/;
    if (firstNameRegex.test(firstName.value)) {
        firstNameErrorMsg.innerHTML = null;
        firstName.style.border = '2px solid green';
        validFirstName = true;
    } else if (firstNameRegex.test(firstName.value) === false || firstName.value === '') {
        firstNameErrorMsg.innerHTML = 'Please inter a valid first name';
        firstName.style.border = '2px solid red';
        validFirstName = false;
    }
}

let lastName = document.getElementById('lastName');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
lastName.addEventListener('input', checkLastName);
let validLastName = '';

function checkLastName() {
    let lastNameRegex = /^[A-Za-z -]{3,32}$/;
    if (lastNameRegex.test(lastName.value)) {
        lastNameErrorMsg.innerHTML = null;
        lastName.style.border = '2px solid green';
        validLastName = true;
    } else if (lastNameRegex.test(lastName.value) === false || lastName.value === '') {
        lastNameErrorMsg.innerHTML = 'Please inter a valid last name';
        lastName.style.border = '2px solid red';
        validLastName = false;
    }
}

let address = document.getElementById('address');
let addressErrorMsg = document.getElementById('addressErrorMsg');
address.addEventListener('input', checkAddress);
let validAddress = '';

function checkAddress() {
    let addressRegExp = /^[A-Za-z0-9 -]{7,32}$/;

    if (addressRegExp.test(address.value)) {
        addressErrorMsg.innerHTML = null;
        address.style.border = '2px solid green';
        validAddress = true;
    } else if (addressRegExp.test(address.value) === false || address.value === '') {
        addressErrorMsg.innerHTML = 'Please inter a valid address.';
        address.style.border = '2px solid red';
        validAddress = false;
    }
}

let city = document.getElementById('city');
let cityNameErrorMsg = document.getElementById('cityErrorMsg');
city.addEventListener('input', checkCity);
let validCityName = '';

function checkCity() {
    let cityNameRegex = /^[A-Za-z -]{3,32}$/;

    if (cityNameRegex.test(city.value)) {
        cityNameErrorMsg.innerHTML = null;
        city.style.border = '2px solid green';
        validCityName = true;
    } else if (cityNameRegex.test(city.value) === false || city.value === '') {
        cityNameErrorMsg.innerHTML = 'Please inter a valid city name';
        city.style.border = '2px solid red';
        validCityName = false;
    }
}


let email = document.getElementById('email');
let emailErrorMsg = document.getElementById('emailErrorMsg');
email.addEventListener('input', checkEmail);
let validEmail = '';

function checkEmail() {
    let emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (emailRegExp.test(email.value)) {
        emailErrorMsg.innerHTML = null;
        email.style.border = '2px solid green';
        validEmail = true;
    } else if (lastNameRegex.test(lastName.value) === false || lastName.value === '') {
        lastNameErrorMsg.innerHTML = 'Please inter a valid email';
        email.style.border = '2px solid red';
        validEmail = false;
    }
}

// Submit ordered data information to send to API backend
const order = document.getElementById('order');
order.addEventListener('click', (event) => {
    event.preventDefault();
    if (validFirstName === true && validLastName === true && validAddress === true && validCityName === true && validEmail === true) {
        let itemId = cart.map(item => item.id);
        console.log(itemId);
        let body =
        {
            contact:
            {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            },
            products: itemId
        }

        const orderData = {
            method: 'post',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(body),
        };
        fetch('http://localhost:3000/api/products/order', orderData)
            .then((response) => response.json())
            .then((data) => {
                let confirmationUrl = './confirmation.html?orderedId=' + data.orderId;
                window.location.href = confirmationUrl;
                localStorage.clear();
            })
            .catch(error => console.log(error));
    }
    else {
        alert('Please properly fill out the form');
    }
});













































