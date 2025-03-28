import {loadProducts, products} from "../data/products.js";

document.querySelector('.search-button').addEventListener('click', () => {
    window.location.href = "amazon.html?search=" + document.querySelector('.search-bar').value;

})

export function filterProductsPage() {
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    let filteredProducts = products;

    if (search) {
        filteredProducts = products.filter(product => {
            let matchingKeyword = false;

            product.keywords.forEach((keyword) => {
                if (keyword.toLowerCase().includes(search.toLowerCase())) {
                    matchingKeyword = true;
                }
            });

            return matchingKeyword ||
                product.name.toLowerCase().includes(search.toLowerCase());
        })
    }

    return filteredProducts;
}