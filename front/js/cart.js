
/* TODO: 
  - PULL all ordered items from locaslStorage to display on cart page
*/

let cart = JSON.parse(localStorage.getItem('cart')) || [] ;
console.log(cart);

let cartItems = document.getElementById('cart__items');
console.log(cartItems);


function generateCartItem()
{     
    if (cart.length !== 0)
    {
        cart.forEach((item) => 
        {
            cartItems.innerHTML += 
                `
                    <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
                        <div class="cart__item__img">
                            <img src=${item.imageUrl} alt=${item.altTxt}>
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${item.name}</h2>
                                <p>${item.color}</p>
                                <p>€${item.price}</p>
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
            removeItem (item)    
        });
    }  
}
generateCartItem();

/*
    How to change quantity input in localStorage??????????
    Changing Quantity in Cart page before submit to order
*/



let article = cartItems.querySelector('article');
console.log(article);
/* let id = article.dataset.id;
console.log(id);
let color = article.dataset.color; */

const itemQuantity = document.getElementsByClassName('itemQuantity');
console.log(itemQuantity)
for (let i = 0; i < itemQuantity.length; i++)
{
    
    let quantityChanged = itemQuantity[i];
    quantityChanged.addEventListener('change', (event) =>{
        console.log(event.target.value);
        let  article = event.target.closest('article');
        let itemId = article.getAttribute("data-id");
        let itemColor = article.getAttribute("data-color");
       for (let i = 0; i < cart.length; i++)
       {   
           if ( cart[i].id === itemId  && cart[i].color === itemColor)
           {
                cart[i].quantity = event.target.value;              
           }               
       }  
       totalQuantityAndPrice();  
       localStorage.setItem('cart', JSON.stringify(cart));     
       cart = JSON.parse(localStorage.getItem('cart'));
    });
}




// Calculate total quantity and price of ordered items

function totalQuantityAndPrice () 
{
    let totalOrderedItem = 0;
    let totalOrderedItemPrice = 0; 
    const totalQuantity = document.getElementById('totalQuantity');
    const totalPrice = document.getElementById('totalPrice');

    cart.forEach((item) => 
    {
        totalOrderedItem += parseInt(item.quantity, 10);
        totalOrderedItemPrice += totalOrderedItem * item.price; 
        totalQuantity.innerHTML = totalOrderedItem;
        totalPrice.innerHTML = totalOrderedItemPrice; 
    }); 
   
}
totalQuantityAndPrice();

// Use match() method to remove item
function removeItem ()
{
    let deleteItem = document.getElementsByClassName('deleteItem');
    for ( let i = 0; i < deleteItem.length; i++)
    {
        let deleteButton = deleteItem[i];
        deleteButton.addEventListener('click', (event) =>{
            
            let article = event.target.closest('article');
            let deleteItemId = article.getAttribute("data-id");
            let deleteItemColor = article.getAttribute("data-color");
            cart = JSON.parse(localStorage.getItem('cart'));
            for (let i = 0; i < cart.length; i++)
            {   
                if ( cart[i].id === deleteItemId  && cart[i].color === deleteItemColor )
                {
                    cart.splice(i, 1);            
                }               
            }  
            //deletItem.remove();
           if (article)
           {
                article.remove();
               
           }
        
        totalQuantityAndPrice();
        localStorage.setItem('cart', JSON.stringify(cart));  
        cart = JSON.parse(localStorage.getItem('cart'));   
    });  
         
    }
    
} 
removeItem();




/* TODO: Create validation and error messages input 
   firstName, lastName, address, city, and email functions
   to check if they are valid as requirement.
*/


let firstName = document.getElementById('firstName');
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
firstName.addEventListener('input', checkFirstName);
let validFirstName = '';

function checkFirstName ()
{
    
    let firstNameRegex = /^[A-Za-z -]{3,32}$/;
    if (firstNameRegex.test(firstName.value))
    {
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

function checkLastName ()
{
    
    let lastNameRegex = /^[A-Za-z -]{3,32}$/;
    if (lastNameRegex.test(lastName.value))
    {
        lastNameErrorMsg.innerHTML = null;
        lastName.style.border = '2px solid green';
        validLastName = true;
    } else if (lastNameRegex.test(lastName.value) === false || lastName.value === '') 
    {
        lastNameErrorMsg.innerHTML = 'Please inter a valid last name';
        lastName.style.border = '2px solid red';
        validLastName = false;  
    }

}

let address = document.getElementById('address');
let addressErrorMsg = document.getElementById('addressErrorMsg');
address.addEventListener('input', checkAddress);
let validAddress = '';

function checkAddress ()
{
    
    let addressRegExp = /^[A-Za-z0-9 -]{7,32}$/;
    
    if (addressRegExp.test(address.value)){
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
let validCityName= '';

function checkCity ()
{
    
    let cityNameRegex = /^[A-Za-z -]{3,32}$/;
    
    if (cityNameRegex.test(city.value)){
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

function checkEmail ()
{
    
    let emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
    //add pattern attribute in email DOM pattern=".+@.+\..+"
    if (emailRegExp.test(email.value))
    {
        emailErrorMsg.innerHTML = null;
        email.style.border = '2px solid green';
        validEmail = true;
    } else if (lastNameRegex.test(lastName.value) === false || lastName.value === '') 
    {
        lastNameErrorMsg.innerHTML = 'Please inter a valid email';
        email.style.border = '2px solid red';
        validEmail = false;  
    }

}

// Submit ordered data information to send to API backend


const order = document.getElementById('order');
order.addEventListener('click', (event) => {

    event.preventDefault();
    
    if ( validFirstName === true && validLastName === true && validAddress === true && validCityName === true && validEmail === true )
    {
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
        console.log(body);
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
                //localStorage.clear();
            })
            .catch(error => console.log(error));
    } 
    else
    {
        alert('Please properly fill out the form');
    }

} );













































//let cartItems = document.getElementById('cart__items');
        
        /* return (cartItems.innerHTML = orderedItems.map((orderItem) => 
        {
            let {color, id, quantiy} = orderItem;
            let search = productData.find((dataItem) => { dataItem._id === id && dataItem.colors === color || [] })
                return
                    `
                    <article class="cart__item" data-id="${search._id}" data-color="${search.colors}">
                        <div class="cart__item__img">
                            <img src=${search.imageUrl} alt=${search.altTxt}>
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${search.name}</h2>
                                <p>${search.colors}</p>
                                <p>€${search.price}</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                <p>Qté : ${quantiy}</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Delete</p>
                            </div>
                            </div>
                        </div>
                    </article>
                    `;
            })  
        .join("")); 
          
    };*/ 
/*
<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
        <img src="../images/product01.jpg" alt="Photo of a sofa">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>Name of the product</h2>
        <p>Green</p>
        <p>€42.00</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Delete</p>
        </div>
        </div>
    </div>
</article> */

// Create decrement() and increment() functions
/* let cart = JSON.parse(localStorage.getItem(product)) || [];
let search = cart.find((x) => x.id === id) || [];//write it inside generatecart ${search.quantity === undefined ? 0 : search.quantity} 
function decrement (id, color)
{
    let selectedItem = id;
    let selectedColor = color;
    let search = cart.find((x) => x.id === selectedItem.id && x.color === selectedColor);
    if (search === undefined) return;// prevent error happens
    else if (search.quantity === 0) 
    {
        return;
    }    
    else
    {
        search.quantity -= 1;
    }        
    
    update(selectedItem.id);
    //select quantity that not equal zero to save in localStorage only then delect quantiy = 0.
    cart = cart.filter( (x) => x.quantity !== 0);
    console.log(cart);
    
    localStorage.setItem('product', JSON.stringify(cart));  
}

function increment (id, color){
    let selectedItem = id;
    let selectedColor = color;
    let search = cart.find((x) => x.id === selectedId.id && x.color === selectedColor);
    if (search === undefined)
    {
        cart.push({ id: selectedItem.id, color: selectedColor, quantity: 1});
    }
    else 
    {
        search.quantity += 1;
    } 
    
    update(selectedId.id, selectedColor.color)
    localStorage.setItem('product', JSON.stringify(cart));  
    
}

let update = (id) => { let search = cart.find( (x) => x.id === id);
    console.log(search.quantity);
    document.getElementById(id).innerHTML = search.quantity;
    calculation();
}

let calculation = () => { 
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = cart.map( (x) => x.quantity).reduce((x, y) => x + y, 0);
}
calculation(); // to keep amount of selected item in cart run fast 

let generateCartItem = () => {
    if (cart.length !== 0)
    {
        return (shoppingCart.innerHTML = cart.map((x) => {
            console.log(x);
            let {id, color, quantity} = x;
            let search = shopItemsData.find( (y) => y._id === id) || [];
            return `
            <div> calss
            `
        }))
    }
} 
*/