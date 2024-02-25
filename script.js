import { API_JACKETS_URL } from "./scripts/constants.mjs";
import { addToCart, clearCart, getTotalNumberOfItemsInCart } from "./scripts/utils/cart.mjs";
import { doFetch } from "./scripts/utils/doFetch.mjs";


const maleGenderButton = document.getElementById('gender-male');
const femaleGenderButton = document.getElementById('gender-female');
const genderClearButton = document.getElementById('gender-clear');

let chosenGender = '';

maleGenderButton.addEventListener('click', () => {
    chosenGender = 'Male';
    renderHomePage();
});
femaleGenderButton.addEventListener('click', () => {
    chosenGender = 'Female';
    renderHomePage();
});
genderClearButton.addEventListener('click', () => {
    chosenGender = '';
    renderHomePage();
});

const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    clearCart();
})

function createCart() {
    const cart = localStorage.getItem('cart');
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}


function generateJacketHtml(jacket) {
    //return jacket html
    const jacketWrapper = document.createElement('div');
    jacketWrapper.classList.add('jacket-wrapper');
    
    const jacketContainer = document.createElement('div');
    jacketContainer.classList.add('jacket-container');
    jacketContainer.addEventListener('click', () => {
        showJacketDetails(jacket);
    });

    const jacketTitle = document.createElement('h3');
    jacketTitle.textContent = jacket.title;

    const imageUrl = 'https://static.noroff.dev/api/rainy-days';
    const jacketImage = document.createElement('img');
    jacketImage.src = jacket.image.url;

    const jacketPriceContainer = document.createElement('div');
    jacketPriceContainer.classList.add('jacket-price-container');
    
    const jacketPrice = document.createElement('div');
    jacketPrice.textContent = jacket.price;

    const jacketDescription = document.createElement('div');
    jacketDescription.textContent = jacket.description;

    const jacketDiscountedPrice = document.createElement('div');
    jacketDiscountedPrice.textContent = jacket.discountedPrice;

    const jacketBuyButton = document.createElement('button');
    jacketBuyButton.textContent = 'Buy';
    jacketBuyButton.classList.add('jacket-buy-button');
    jacketBuyButton.addEventListener('click', () => {
        addToCart(jacket);
    })

    const jacketDetails = document.createElement('div');
    jacketDetails.classList.add('jacket-details');
    jacketDetails.style.display = 'none';

    const detailTitle = document.createElement('h2');
    detailTitle.textContent = jacket.title;
    const detailImage = document.createElement('img');
    detailImage.src = jacket.image.url;
    detailImage.alt = jacket.title;

    jacketDetails.append(detailTitle, detailImage);
    jacketPriceContainer.append(jacketPrice, jacketDiscountedPrice);
    jacketContainer.append(jacketTitle, jacketImage, jacketDescription, jacketPriceContainer, jacketBuyButton);
    jacketWrapper.appendChild(jacketContainer);
    return jacketWrapper;
}

function displayJacketsList(jackets) {
    const displayContainer = document.querySelector('#display-container');
    displayContainer.textContent = '';
    jackets
        .filter((jacket) => {
            if (jacket.gender === chosenGender || chosenGender === '') {
                return true;
            }
        })
        .forEach((jacket) => {
        const jacketHtml = generateJacketHtml(jacket);
        displayContainer.appendChild(jacketHtml);
        });
}

function showJacketDetails(jacket) {
    const modal = document.getElementById('jacketDetailModal');
    const detailView = document.getElementById('modalDetail');
    const closeBtn = document.querySelector('.modal .close');

    detailView.innerHTML = 'jacketDetails';

    modal.style.display = "block";

    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function displayCartCounter() {
    const cartCounterContainer = document.getElementById('cart-counter');
    console.log(cartCounterContainer);
    const totalNumberOfItems = getTotalNumberOfItemsInCart();
    cartCounterContainer.textContent = totalNumberOfItems;
}

function renderCheckoutPage() {
    displayCartCounter();
}

async function renderHomePage() {
    const responseData = await doFetch(API_JACKETS_URL);
    const jackets = responseData.data;
    displayJacketsList(jackets);
}

async function main() {
    createCart();
    await renderHomePage();
    renderCheckoutPage();
}

main();