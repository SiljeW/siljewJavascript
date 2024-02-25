
export function getCart () {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
}


export function addToCart(jacket) {
    const cart = getCart();
    const itemIndex = cart.findIndex(function(currentJacket) {
        console.log(currentJacket);
        if (jacket.id === currentJacket.id) {
            return true;
        }
        return false;
    });

    if (itemIndex === -1) {
        cart.push({ ...jacket, quantity: 1 });
    } else {
        cart[itemIndex].quantity += 1;
    }
    console.log('itemIndex', itemIndex);

    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(jacket) {
    const cart = getCart();
    const jacketIdToRemove = jacket.id;

    const idInCart = cart.findIndex((currentItem) => {
        if (currentItem.id === jacketIdToRemove) {
            return true;
        }
        return false;
    });
    

    if (cart[idInCart].quantity > 1) {
        cart[idInCart].quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        const newCart = cart.filter((_, index) => {
            if (idInCart === index) {
                return false;
            }
            return true;
        });
        localStorage.setItem('cart', JSON.stringify(newCart));
    }
}

export function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
}

export function getTotalNumberOfItemsInCart() {
    const cart = getCart();
    const getTotalNumberOfItemsInCart = cart.reduce((total, item) => {
        total += item.quantity;
        return total;
    }, 0);
    return getTotalNumberOfItemsInCart;
}