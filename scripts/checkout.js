import {renderOrder} from "./checkout/orderSummary.js";
import {renderPayment} from "./checkout/paymentSummary.js";
import {loadProducts} from "../data/products.js";

loadProducts(() => {
    renderOrder();
    renderPayment();
});