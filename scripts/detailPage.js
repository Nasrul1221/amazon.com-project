import {findProductById, loadProductsFetch} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";
import {addToCart, cart} from "../data/cart.js";

function updateCartQuantity() {
    let cartTotal = 0;

    cart.forEach((item) => {
        cartTotal += item.quantity;
    })

    document.querySelector('.js-cart-total').innerHTML = cartTotal;
}

updateCartQuantity();

async function renderPage() {
    const url = new URL(window.location.href);
    const productId = url.searchParams.get('id');

    await loadProductsFetch();
    const product = findProductById(productId);

    const html =
        `
            <div class="left-side">
              <img class="product-image" src="${product.image}">
            </div>
    
            <div class="right-side">
              <h2 class="product-name">${product.name}</h2>
              <p class="product-price">$${formatCurrency(product.priceCents)}</p>
    
              <div class="product-quantity-container">
                <select class="js-quantity-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
    
              <div class="rating">
                <img class="rating-image" src="images/ratings/rating-${product.rating.stars * 10}.png">
                <a class="rating-count">${product.rating.count}</a>
              </div>
    
              <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>
        `

    document.querySelector('.js-details-container').innerHTML = html;

    document.querySelectorAll(".js-add-to-cart").forEach((button, index) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);

            updateCartQuantity();
        })
    })
}

renderPage();