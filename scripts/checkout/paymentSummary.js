import {cart} from '../../data/cart.js';
import {findProduct} from "../utils/findProduct.js";
import {deliveryOptions, findDeliveryId} from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js";

export function renderPayment() {
    let summaryHTML = '';
    let quantity = 0;
    let totalPriceCents = 0;
    let deliveryPrice = 0;

    cart.forEach((item) => {
        const temp = findProduct(item);

        quantity += item.quantity;
        totalPriceCents += parseInt(item.quantity) * parseInt(temp.priceCents);
        deliveryPrice += findDeliveryId(item.deliveryOptionId).priceCents;
    })
    const totalBeforeTax =(totalPriceCents + deliveryPrice) / 100;
    const tax = (totalBeforeTax * 0.1).toFixed(2);
    const total = (totalBeforeTax + parseFloat(tax)).toFixed(2);
    deliveryPrice = deliveryPrice === 0 ? 'FREE Shipping' : `$${formatCurrency(deliveryPrice)}`;

    summaryHTML += `
              <div class="payment-summary-title">
                Order Summary
              </div>
    
              <div class="payment-summary-row">
                <div>Items (${quantity}):</div>
                <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
              </div>
    
              <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">${deliveryPrice}</div>
              </div>
    
              <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${totalBeforeTax}</div>
              </div>
    
              <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${tax}</div>
              </div>
    
              <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${total}</div>
              </div>
    
              <button class="place-order-button button-primary">
                Place your order
              </button>`

    document.querySelector('.js-payment-summary').innerHTML = summaryHTML;
}