export const cart = [];

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) matchingItem = item;
    })

    let selectQuantity = document.querySelector(`.js-quantity-${productId}`).value;

    if (matchingItem) {
        matchingItem.quantity = matchingItem.quantity + parseInt(selectQuantity);
    }
    else {
        cart.push({
            productId,
            quantity: parseInt(selectQuantity),
        });
    }
}