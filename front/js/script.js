const getAllUrl = 'http://localhost:3000/api/products/';
fetch(getAllUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    addCard(data);
    
  });

    // CALL a functions that uses the data
    // ARGUMENTS are the actual info you PASS into the function
        


// DECLARE(create) the functions outside of the fetch!!!
// PARAMETERS are like variables
function addCard(dataArray) 
{
  // where to put the cards when done making them?
  // getting a REFERENCE to a spot in the DOM - the actual ELEMENT!!!!!!
  const items = document.getElementById('items');
  // console.log('items', items);

  // we have an array of objects - iterate to make one card at a time
  // iterate using a for-loop
  for (let i = 0; i < dataArray.length; i++) {
    // this code will run for each and every object in the dataArray
    // create a variable for a card - assign to it the return value of makeCard
    const card = makeCard(dataArray[i]);

    // append card to the DOM
    items.appendChild(card);

  }
}

//create a function to build each card of each product    
function makeCard(dataCard)
{
  //create elements
  const anchorCard = document.createElement("a");
  const article = document.createElement("article");
  const image = document.createElement("img");
  const name = document.createElement("h3");
  const description = document.createElement("p");

  // add classes - for h3, p
  name.classList.add('productName');
  description.classList.add('productDescription');

  // add content - h3, p
  name.innerText = dataCard.name;
  description.innerText = dataCard.description;


  // set attributes - for img, a
  image.setAttribute('src', dataCard.imageUrl);
  image.setAttribute('alt', dataCard.altTxt);
  

  // get each production id(_id) into the href for each anchor (a) tag
  let cardHref = './product.html?id=' + dataCard._id;
  anchorCard.setAttribute('href', cardHref);

  // append children into parents
  article.appendChild(image);
  article.appendChild(name);
  article.appendChild(description);
  anchorCard.appendChild(article);
  
  console.log(anchorCard);
  return anchorCard;
  
}
