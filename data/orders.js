export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addToOrders(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}