import {cart} from '../../data/cart.js';
import {products} from '../../data/products.js';

export function renderPayment() {
    let summaryHTML = '';
    let quantity = 0;
    let totalPriceCents = 0;

    cart.forEach((item) => {
        let temp;
        products.forEach((product) => {
            if (item.productId === product.id) {
                temp = product;
            }
        });

        quantity += item.quantity;
        totalPriceCents += parseInt(quantity) * parseInt(temp.priceCents);
    })

    summaryHTML += `
              <div class="payment-summary-title">
                Order Summary
              </div>
    
              <div class="payment-summary-row">
                <div>Items (${quantity}):</div>
                <div class="payment-summary-money">$${totalPriceCents / 100}</div>
              </div>
    
              <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$4.99</div>
              </div>
    
              <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$47.74</div>
              </div>
    
              <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$4.77</div>
              </div>
    
              <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$52.51</div>
              </div>
    
              <button class="place-order-button button-primary">
                Place your order
              </button>`

    document.querySelector('.payment-summary').innerHTML = summaryHTML;
}