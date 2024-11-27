export class ProductService {
    constructor() {
        this.products = [
            {
                id: 1,
                name: "Wireless Headphones",
                price: 99.99,
                image: "https://picsum.photos/id/1/300/200",
                description: "High-quality wireless headphones with noise cancellation"
            },
            {
                id: 2,
                name: "Smartwatch",
                price: 199.99,
                image: "https://picsum.photos/id/2/300/200",
                description: "Feature-rich smartwatch with health tracking"
            },
            {
                id: 3,
                name: "Laptop Backpack",
                price: 49.99,
                image: "https://picsum.photos/id/3/300/200",
                description: "Durable laptop backpack with multiple compartments"
            },
            {
                id: 4,
                name: "Coffee Maker",
                price: 79.99,
                image: "https://picsum.photos/id/4/300/200",
                description: "Programmable coffee maker with thermal carafe"
            }
        ];
    }

    async getProducts() {
        // Simulate API call
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.products);
            }, 500);
        });
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
}