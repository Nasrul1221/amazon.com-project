import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {findProductById, loadProductsFetch} from "../data/products.js";
import {findOrder, findProductInOrder} from "./utils/finding.js";
import {cart} from "../data/cart.js";
import {orders} from "../data/orders.js";

console.log(orders);

function updateCartQuantity() {
    let cartTotal = 0;

    cart.forEach((item) => {
        cartTotal += item.quantity;
    })

    document.querySelector('.js-cart-total').innerHTML = cartTotal;
}

updateCartQuantity();

async function trackPage() {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get("orderId");
    const productId = url.searchParams.get("productId");
    const matchingOrder = findOrder(orderId);

    await loadProductsFetch();
    const product = findProductById(productId);
    const matchingProduct = findProductInOrder(orderId, productId);

    const deliveryDate = dayjs(matchingOrder.estimatedDeliveryTime).format('dddd, MMMM D');

    let html =
        `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          ${deliveryDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}"/>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"><span class="percent"></span></div>
        </div>
        `

    // progress bar width
    const currentTime = dayjs();
    const progressBarWidth = (currentTime - dayjs(matchingOrder.orderTime))
        / (dayjs(matchingProduct.estimatedDeliveryTime) - dayjs(matchingOrder.orderTime)) * 100;

    setTimeout(() => {
        const progressBar = document.querySelector('.js-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progressBarWidth}%`;
        }
    }, 10);

    document.querySelector('.order-tracking').innerHTML = html;
}

trackPage()