import {renderOrder} from "./checkout/orderSummary.js";
import {renderPayment} from "./checkout/paymentSummary.js";
import {loadProductsFetch} from "../data/products.js";
import {loadCartFetch} from "../data/cart.js";

async function loadPage() {
    try {
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ])
    } catch (error) {
        console.log(error)
    }

    renderOrder();
    renderPayment();
}

loadPage()

// Promise.all([
//     loadProductsFetch(),
//
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })
//     })
//
// ]).then(() => {
//     renderOrder();
//     renderPayment();
// });

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });
// }).then(() => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })
//     });
// }).then(() => {
//     renderOrder();
//     renderPayment();
// });


// loadProducts(() => {
//     loadCart(() => {
//         renderOrder();
//         renderPayment();
//     });
// });