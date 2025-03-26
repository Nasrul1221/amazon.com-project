import {cart, addToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {filterProductsPage} from './searchBar.js';

loadProducts(renderProductsGrid);

export function renderProductsGrid() {
    let productsList = ''

    const filteredProducts = filterProductsPage();

    /* Products */
    filteredProducts.forEach((product) => {
        productsList += `<div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
                 src="${product.image}"/>
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars"
                 src="${product.findRating()}"/>
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
        </div>

        <div class="product-price">
            ${product.calculatePrice()}
        </div>

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
        
        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
            <img src="images/icons/checkmark.png"/>
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
        </button>
    </div>`

    })

    document.querySelector('.js-products-grid').innerHTML = productsList;

    function updateCartQuantity() {
        let cartTotal = 0;

        cart.forEach((item) => {
            cartTotal += item.quantity;
        })

        document.querySelector('.js-cart-total').innerHTML = cartTotal;
    }

    /* Add to Cart */
    updateCartQuantity();
    const addedMessageTimeouts = {};
    document.querySelectorAll(".js-add-to-cart").forEach((button, index) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId);

            // Show added message
            const previousTimeoutId = addedMessageTimeouts[productId];

            document.querySelectorAll(".added-to-cart")[index].style.opacity = 1;

            if (previousTimeoutId) {
                clearTimeout(previousTimeoutId);
            }

            const timeoutId = setTimeout(() => {
                document.querySelectorAll(".added-to-cart")[index].style.opacity = 0;
            }, 2000);
            addedMessageTimeouts[productId] = timeoutId;

            updateCartQuantity();
        })
    })

    document.querySelector('.search-button').addEventListener('click', () => {
        window.location.href = "amazon.html?search=" + document.querySelector('.search-bar').value;
    })
}