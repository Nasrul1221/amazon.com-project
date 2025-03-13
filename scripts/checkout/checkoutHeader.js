import {cart} from "../../data/cart.js";

export function updateCheckoutTotal() {
    let cartTotal = 0;
    cart.forEach((item) => {
        cartTotal += item.quantity;
    })

    document.querySelector('.js-amount-of-items').innerHTML = cartTotal;
}