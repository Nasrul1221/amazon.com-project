import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {formatCurrency} from "../utils/money.js";
import { deliveryOptions, findDeliveryId } from '../../data/deliveryOptions.js';
import { renderPayment } from './paymentSummary.js';
import {findProduct} from "../utils/findProduct.js";
import {updateCheckoutTotal} from "./checkoutHeader.js";
import {calculateDeliveryDate} from "../utils/calculateDeliveryDate.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderOrder() {
    let cartList = '';

    cart.forEach((item) => {
        const temp = findProduct(item)

        const deliveryOption = findDeliveryId(item.deliveryOptionId);
        const deliveryDate = calculateDeliveryDate(deliveryOption);

        cartList += `
              <div class="cart-item-container js-${temp.id}">
                <div class="delivery-date">
                  Delivery date: ${deliveryDate.format('dddd, MMMM D')}
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
                        Quantity: <span class="quantity-label-${temp.id}">${item.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-link-${temp.id}" data-product-id="${temp.id}">
                        Update
                      </span>
                      <div class="update-${temp.id} hidden">
                        <input type="number" class="quantity-input-${temp.id}" min="1" max="100" value="1" oninput="validateInput(this)">
                        <span class="save-quantity-link link-primary js-save-link" data-product-id="${temp.id}">Save</span>
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
    
                    ${deliveryOptionsHTML(temp, item)}
                    
                  </div>
                </div>
              </div>`;

        updateCheckoutTotal();
    });
    document.querySelector('.js-order-summary').innerHTML = cartList;

    function deliveryOptionsHTML(temp, cartItem) {
        let html = '';


        deliveryOptions.forEach((item) => {
            const isChecked = item.id === cartItem.deliveryOptionId;

            const deliveryDate = calculateDeliveryDate(item);
            const deliveryPrice = item.priceCents === 0 ? 'FREE Shipping' : `$${formatCurrency(item.priceCents)} - Shipping`;

            html += ` <div class="delivery-option">
                      <input type="radio" class="delivery-option-input js-radio" ${isChecked ? 'checked' : ''}
                        name="delivery-option-${temp.id}" data-product-id="${temp.id}" data-delivery-option-id="${item.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${deliveryDate.format('dddd, MMMM D')}
                        </div>
                        <div class="delivery-option-price">
                            ${deliveryPrice}
                        </div>
                      </div>
                    </div>`
        })

        return html;
    }

    document.querySelectorAll('.js-delete-link').forEach((link, index) => {
        link.addEventListener('click', () => {
            const productId = link.getAttribute('data-product-id');
            removeFromCart(productId);

            renderOrder()
            updateCheckoutTotal();
            renderPayment();
        })
    });

    document.querySelectorAll('.update-quantity-link').forEach((link, index) => {
        link.addEventListener('click', () => {
            const productId = link.getAttribute('data-product-id');
            document.querySelector(`.update-${productId}`).style.display = 'initial';
            document.querySelector(`.js-update-link-${productId}`).style.display = 'none';
            document.querySelector(`.quantity-label-${productId}`).style.display = 'none';
        });
    });

    document.querySelectorAll('.save-quantity-link').forEach((link) => {
        link.addEventListener('click', (event) => {
            handleInput(link);
            renderPayment();
        });
    });

    function handleInput(link) {
        const productId = link.getAttribute('data-product-id');

        const newValue = document.querySelector(`.quantity-input-${productId}`).value;

        document.querySelector(`.update-${productId}`).style.display = 'none';
        document.querySelector(`.js-update-link-${productId}`).style.display = 'initial';
        document.querySelector(`.quantity-label-${productId}`).style.display = 'initial';

        updateQuantity(productId, newValue);
        updateCheckoutTotal();
    }

    document.querySelectorAll('.js-radio').forEach((item) => {
        item.addEventListener('click', () => {
            const {productId, deliveryOptionId} = item.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrder();
            renderPayment();
        })
    })
}