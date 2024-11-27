import { ProductService } from './services/ProductService.js';
import { CartService } from './services/CartService.js';
import { UIService } from './services/UIService.js';

class App {
    constructor() {
        this.productService = new ProductService();
        this.cartService = new CartService();
        this.uiService = new UIService();
        
        this.init();
    }

    init() {
        // Initialize products
        this.loadProducts();
        
        // Initialize UI event listeners
        this.uiService.initializeEventListeners(
            () => this.cartService.getCart(),
            (product) => this.cartService.addToCart(product),
            () => this.cartService.clearCart()
        );
    }

    async loadProducts() {
        const products = await this.productService.getProducts();
        this.uiService.displayProducts(products);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new App();
});