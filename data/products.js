import {formatCurrency} from "../scripts/utils/money.js";

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  calculatePrice() {
    return `$${formatCurrency(this.priceCents)}`
  }

  findRating() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

    extraInfoHTML() {
        return '';
    }
}

export class Clothing extends Product {
    sizeChartLink;

    constructor(productDetails) {
        super(productDetails);
        this.sizeChartLink = productDetails.sizeChartLink;
    }

    extraInfoHTML() {
        return `<a class="size-link" href="${this.sizeChartLink}" target="_blank">Size Link</a>`;
    }
}

export let products = [];

export function loadProductsFetch() {
    const promise = fetch('https://supersimplebackend.dev/products').then((response) => {
        return response.json()
    }).then((productsData) => {
        products = productsData.map((product) => {
            return product.type === 'clothing' ? new Clothing(product) : new Product(product);
        });
    })

    return promise;
}

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((product) => {
      return product.type === 'clothing' ? new Clothing(product) : new Product(product);
    });

    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}