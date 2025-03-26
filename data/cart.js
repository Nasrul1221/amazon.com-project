import {Clothing, products} from "./products.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveToLocalStorageCart() {
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

    saveToLocalStorageCart();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((item, index) => {
        if (item.productId !== productId) {
            newCart.push(item);
        }
    })

    cart = newCart;


    saveToLocalStorageCart();
}

export function updateQuantity(productId, newValue) {
    cart.forEach((item) => {
        if (productId === item.productId) {
            item.quantity = parseInt(newValue);
        }
    })
    saveToLocalStorageCart();

    document.querySelector(`.quantity-label-${productId}`).innerHTML = newValue;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    cart.forEach((item) => {
        if (productId === item.productId) {
            item.deliveryOptionId = deliveryOptionId;
        }
    })
    saveToLocalStorageCart();
}

export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart').then((response) => {
        return response;
    });
    const data = await response.text();
}