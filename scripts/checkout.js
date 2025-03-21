import {renderOrder} from "./checkout/orderSummary.js";
import {renderPayment} from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from "../data/products.js";
import {loadCart} from "../data/cart.js";

Promise.all([
    loadProductsFetch(),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })

]).then(() => {
    renderOrder();
    renderPayment();
});

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