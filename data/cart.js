export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) matchingItem = item;
    })

    let selectQuantity = document.querySelector(`.js-quantity-${productId}`).value;

    if (matchingItem) {
        matchingItem.quantity += parseInt(selectQuantity);
    }
    else {
        cart.push({
            productId,
            quantity: parseInt(selectQuantity),
        });
    }

    saveToLocalStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((item, index) => {
        if (item.productId !== productId) {
            newCart.push(item);
        }
    })

    cart = newCart;


    saveToLocalStorage();
}

export function updateQuantity(productId, newValue) {
    cart.forEach((item) => {
        if (productId === item.id) {
            item.quantity = parseInt(newValue);
        }
    })
    saveToLocalStorage();
    console.log(cart);

    document.querySelector('.quantity-label').innerHTML = newValue;
}