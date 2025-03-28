import {loadProductsFetch, findProduct} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";
import {orders} from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {cart, saveToLocalStorageCart} from "../data/cart.js";

function updateCartQuantity() {
    let cartTotal = 0;

    cart.forEach((item) => {
        cartTotal += item.quantity;
    })

    document.querySelector('.js-cart-total').innerHTML = cartTotal;
}

async function loadPage() {
    await loadProductsFetch();

    let ordersHTML = '';

    orders.forEach((order) => {
        const orderTimeString = dayjs(order.orderTime).format('MMMM D');

        ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;
    });

    function productsListHTML(order) {
        let productsListHTML = '';

        order.products.forEach((productDetails) => {
            const product = findProduct(productDetails);

            productsListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${
                dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
            }
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary js-track">
              Track package
            </button>
          </a>
        </div>
      `;
        });

        return productsListHTML;
    }
    updateCartQuantity();

    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

    document.querySelectorAll('.js-buy-again').forEach((button) => {
        button.addEventListener('click', (event) => {
            const productId = button.dataset.productId;
            addToCartOrders(productId);
            updateCartQuantity();
        });
    })
}

function addToCartOrders(productId) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) matchingItem = item;
    })

    if (matchingItem) {
        matchingItem.quantity += 1;
    }
    else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1',
        });
    }

    saveToLocalStorageCart();
}

loadPage();