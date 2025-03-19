export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        cart = [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
                productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a',
                quantity: 1,
                deliveryOptionId: '1'
            }
        ]
    }
}

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
            deliveryOptionId: '1',
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
        if (productId === item.productId) {
            item.quantity = parseInt(newValue);
        }
    })
    saveToLocalStorage();

    document.querySelector(`.quantity-label-${productId}`).innerHTML = newValue;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    cart.forEach((item) => {
        if (productId === item.productId) {
            item.deliveryOptionId = deliveryOptionId;
        }
    })
    saveToLocalStorage();
}