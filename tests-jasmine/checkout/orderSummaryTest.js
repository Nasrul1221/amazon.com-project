import {renderOrder} from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage} from "../../data/cart.js";

describe("test suite: renderOrder", () => {
    it("displays the cart", () => {
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
        `

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                },
                {
                    productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });
        loadFromStorage();

        renderOrder();
    })
})