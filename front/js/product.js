/* 
    Using new URLSearchParams(window.location.search) to collect the ID of a product to display on product page.
*/

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
console.log(id);

const getOneUrlById = 'http://localhost:3000/api/products/' + id;
fetch(getOneUrlById)
  .then((response) => response.json())
  .then((data) => {
    
    /* console.log(data); */
    productionCard (data);
    
  });  



// assign cart array variable to get data item in localStorage 
let cart = JSON.parse(localStorage.getItem('cart')) || [] ;

//this obj represents the product that user selected
const productObj = {
    id: '',
    color: '',
    quantity: 1 
};



// generate product card 
function productionCard (productData)
{
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
    for ( let color of productData.colors)
    {
        const option = document.createElement('option');
       
        option.setAttribute('value', color);
        option.textContent = color;
        console.log(option);
        
       colors.appendChild(option); 

    
    } 

    // add addEventListener function to select amount of product  
    quantity.addEventListener('change', function quantityChanged(event){
        
        let input = event.target.value;
        productObj.quantity = parseInt(input, 10);
        console.log(productObj);
    });
    // add addEventListener function to select color option 
    colors.addEventListener('change', function selectedColor(event){
       
        let selectedColor = event.target.value;
        productObj.color = selectedColor;
        console.log(productObj);
    });   
    

    // adding product to Cart and save in localStorage 
    addToCart.addEventListener('click', addItemToCart);

    
    initialProductObj(productData);
            
}   

// initial productObj 
function initialProductObj(productData)
{
    productObj.id = productData._id;
    productObj.color = productData.colors;
}

/* Verify Conditions of products in cart.
1- same id & color
2- same id & different color
3- different id & same color */

function addItemToCart ()
{
   
   // event.preventDefault();
/*    if (cart.length === 0 )
   {
       cart.push(productObj);
   }
   else 
   {
        let search = cart.find((product) => product.id === productObj.id && product.color === productObj.color); 
        if (search === undefined)
        {
            cart.push(productObj);   
        }
        else 
        {
            search.quantity += productObj.quantity;
        }
   }
 */
    if (productObj.color === '')
    {
        return ;
    }
    let selectedId = true; 
    for ( let product of cart)
    {   
        if(product.id === productObj.id && product.color === productObj.color)
        {
            console.log("before", product.quantity);
            product.quantity += productObj.quantity;
            selectedId  = false;   
            console.log("after", product.quantity);
        }
                           
    }
    //console.log (cart);
    if (selectedId === true){

        cart.push(productObj);
    } 

    //setting localStorage
    localStorage.setItem('cart', JSON.stringify(cart));     
    cart = JSON.parse(localStorage.getItem('cart'));
    resetProduct();
    
}

// reset or refresh the page after clicked addToCard button 
function resetProduct()
{
    const colors = document.getElementById('colors');
    const quantity = document.getElementById('quantity');

    colors.value = '';
    quantity.value = 1;
   
    productObj.color = '';
    productObj.quantity = 1;
  
}





























/* function decrement (id, color)
{
    let selectedId = id;
    let selectedColor = color;
    let search = cart.find((x, y) => x.id === selectedId && y.electedColor === color);
    if (search === undefined) return;// prevent error happens
    else if (search.quantity === 0) 
    {
        return;
    }    
    else
    {
        search.quantity -= 1;
    }        
    
    update(selectedId.id, selectedColor.color);
    //select quantity that not equal zero to save in localStorage only then delect quantiy = 0.
    cart = cart.filter( (x) => x.quantity !== 0);
    console.log(cart);
    
    localStorage.setItem('cart', JSON.stringify(cart));  
}

function increment (id, color)
{    
    let selectedId = id;
    let selectedColor = color;
    let search = cart.find((x) => x.id === selectedId && x.color === selectedColor);
    if (search === undefined)
    {
        cart.push({ id: id, color: color, quantity: 1});
    }
    else 
    {
        search.quantity += 1;
    } 
    
    update(selectedId.id, selectedColor.color)
    localStorage.setItem('product', JSON.stringify(cart));  
    
} */





    




   




