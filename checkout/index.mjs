import { addToCart, clearCart, getCart, getTotalNumberOfItemsInCart, removeFromCart } from "../scripts/utils/cart.mjs";
import { formatCurrency } from "../scripts/utils/formatCurrency.mjs";


const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    clearCart();
    renderCheckoutPage();
});



function generateHtmlForJacket(jacket) {
    const jacketWrapper = document.createElement('div');

    const imageUrl = 'https://static.noroff.dev/api/rainy-days';
    const jacketImage = document.createElement('img');
    jacketImage.src = jacket.image.url;

    const jacketTitle = document.createElement('h3');
    jacketTitle.textContent = jacket.title;

    const jacketQuantity = document.createElement('div');
    jacketQuantity.textContent = 'Qty: ' + jacket.quantity;

    const jacketPrice = document.createElement('div');
    jacketPrice.textContent = 'Price: ' +  jacket.price;

    const jacketPriceTotal = document.createElement('div');
    jacketPriceTotal.textContent = 'Total Price: ' + formatCurrency (jacket.price * jacket.quantity);

    const quantityAdjustmentContainer = document.createElement('div');

    const incrementButton = document.createElement('button');
    incrementButton.textContent = "+";
    incrementButton.addEventListener('click', () => {
        console.log('Increment the total');
        addToCart(jacket);
        renderCheckoutPage();
    });

    const decrementButton = document.createElement('button');
    decrementButton.textContent = "-";
    decrementButton.addEventListener('click', () => {
        removeFromCart(jacket);
        renderCheckoutPage();
    });

    quantityAdjustmentContainer.append(incrementButton, decrementButton);

    jacketWrapper.append(
        jacketImage, 
        jacketTitle, 
        jacketPrice, 
        jacketQuantity, 
        jacketPriceTotal, 
        quantityAdjustmentContainer
    );
    return jacketWrapper;
}


function displayCartItems() {
    const displayContainer = document.getElementById('cart-items-display');
    displayContainer.textContent = '';
    const cart = JSON.parse(localStorage.getItem('cart'));

    cart.forEach(function (currentJacket) {
        const itemHtml = generateHtmlForJacket(currentJacket);
        displayContainer.appendChild(itemHtml);
    });
}

function displayCartCounter() {
    const cartCounterContainer = document.getElementById('cart-counter');
    console.log(cartCounterContainer);
    const totalNumberOfItems = getTotalNumberOfItemsInCart();
    cartCounterContainer.textContent = totalNumberOfItems;
}

function renderCheckoutPage() {
    displayCartCounter();
    displayCartItems();
}

function main() {
    renderCheckoutPage();
}

main();