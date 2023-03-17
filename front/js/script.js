/*
  Working with the API to insert the products into the homepage and 
  making Links between the products on the homepage and on the product page
*/
const getAllUrl = 'http://localhost:3000/api/products/';
fetch(getAllUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    addCard(data);
  });

// Create function to add product cards on homepage
function addCard(dataArray) {
  const items = document.getElementById('items');
  for (let i = 0; i < dataArray.length; i++) {
    const card = makeCard(dataArray[i]);
    // append card to the DOM
    items.appendChild(card);
  }
}

/**
 * create a function to build each card of each product 
 * 
 * @param {Object} dataCard - product  
 * @returns product card element
 */
function makeCard(dataCard) {
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

  return anchorCard;
}
