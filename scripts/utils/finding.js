import {orders} from "../../data/orders.js";

export function findOrder(orderId) {
    let matchingProduct = null;
    orders.forEach(order => {
        if (order.id === orderId) {
            matchingProduct = order;
        }
    });

    return matchingProduct;
}

export function findProductInOrder(orderId, productId) {
    let matchingOrder;
    let matchingProduct;
    orders.forEach(order => {
        if(order.id === orderId) {
            matchingOrder = order;
        }
    })

    matchingOrder.products.forEach(product => {
        if(product.productId === productId) {
            matchingProduct = product;
        }
    });

    return matchingProduct;
}