// create a new URLSearchParams wiht window.location.search to get orderId from backend.

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderedId = urlParams.get('orderedId');

// display confirmation id on confirmation page
const orderId = document.getElementById('orderId');
orderId.textContent = orderedId;