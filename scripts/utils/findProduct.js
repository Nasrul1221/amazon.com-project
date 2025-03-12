import {products} from "../../data/products.js";

export function findProduct(item) {
    let temp;
    products.forEach((product) => {
        if (item.productId === product.id) {
            temp = product;
        }
    });

    return temp;
}