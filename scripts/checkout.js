import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from "./utils/money.js";
import {updateQuantity} from "../data/cart.js";

let cartList = '';

cart.forEach((item, index) => {
    let temp;
    products.forEach((product) => {
        if (item.productId === product.id) {
            temp = product;
        }
    });
    cartList += `
          <div class="cart-item-container js-${temp.id}">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${temp.image}"/>

              <div class="cart-item-details">
                <div class="product-name">
                  ${temp.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(temp.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link">
                    Update
                  </span>
                  <div class="update">
                    <input type="number" class="quantity-input-${temp.id}" data-product-id="${temp.id}" min="1" value="1">
                    <span class="update-quantity-link link-primary js-save-link">Save</span>
                  </div>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${temp.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${temp.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-${temp.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${temp.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

    updateCheckoutTotal();
});

function updateCheckoutTotal() {
    let cartTotal = 0;
    cart.forEach((item) => {
        cartTotal += item.quantity;
    })

    document.querySelector('.js-amount-of-items').innerHTML = cartTotal;
}

document.querySelector('.order-summary').innerHTML = cartList;

document.querySelectorAll('.js-delete-link').forEach((link, index) => {
    link.addEventListener('click', () => {
        const productId = link.getAttribute('data-product-id');
        removeFromCart(productId);
        document.querySelector(`.js-${productId}`).remove();

        updateCheckoutTotal();
    })


});

let isToggle = false;
document.querySelectorAll('.js-update-link').forEach((link, index) => {
    link.addEventListener('click', () => {
        if (!isToggle) {
            document.querySelector('.update').style.display = 'inline-block';
            document.querySelector('.js-update-link').style.display = 'none';
            document.querySelector('.quantity-label').style.display = 'none';
            isToggle = true;
        }
        else {
            document.querySelector('.update').style.display = 'none';
            document.querySelector('.js-update-link').style.display = 'initial';
            document.querySelector('.quantity-label').style.display = 'initial';
            isToggle = false;
        }
    });
});

document.querySelectorAll('.js-save-link').forEach((link, index) => {
    link.addEventListener('click', () => {
        const productId = link.previousElementSibling.getAttribute('data-product-id');

        const newValue = document.querySelector(`.quantity-input-${productId}`).value;

        document.querySelector('.update').style.display = 'none';
        document.querySelector('.js-update-link').style.display = 'initial';
        document.querySelector('.quantity-label').style.display = 'initial';

        updateQuantity(productId, newValue);
        updateCheckoutTotal();
    });
});