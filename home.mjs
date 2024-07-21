import { API_JACKETS_URL } from "./scripts/constants.mjs";
import { addToCart, clearCart, getTotalNumberOfItemsInCart } from "./scripts/utils/cart.mjs";
import { doFetch } from "./scripts/utils/doFetch.mjs";



function createCart() {
    const cart = localStorage.getItem('cart');
    if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}


function generateJacketHtml(jacket) {
    const jacketWrapper = document.createElement('div');
    jacketWrapper.classList.add('jacket-wrapper');
    
    const jacketContainer = document.createElement('div');
    jacketContainer.classList.add('jacket-container');

    jacketContainer.addEventListener('click', () => {
        window.location.href = `/products/index.html`;
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

    jacketPriceContainer.append(jacketPrice);
    jacketContainer.append(jacketTitle, jacketImage, jacketPriceContainer);
    jacketWrapper.appendChild(jacketContainer);
    return jacketWrapper;
}

function displayJacketsList(jackets) {
    const displayContainer = document.querySelector('#display-container');
    displayContainer.textContent = '';
    jackets.forEach((jacket) => {
        const jacketHtml = generateJacketHtml(jacket);
        displayContainer.appendChild(jacketHtml);
    });
}


async function renderHomePage() {
    const responseData = await doFetch(API_JACKETS_URL);
    const jackets = responseData.data;
    displayJacketsList(jackets);
}

async function main() {
    createCart();
    await renderHomePage();
}

main();