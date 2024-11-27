export class UIService {
    constructor() {
        this.productsGrid = document.getElementById('productsGrid');
        this.cartModal = document.getElementById('cartModal');
        this.cartItems = document.getElementById('cartItems');
        this.cartTotal = document.getElementById('cartTotal');
        this.cartIcon = document.getElementById('cartIcon');
        this.closeBtn = document.querySelector('.close');
        this.checkoutBtn = document.getElementById('checkoutBtn');
        this.addToCartCallback = null;
    }

    initializeEventListeners(getCart, addToCart, clearCart) {
        this.addToCartCallback = addToCart;
        
        // Cart modal
        this.cartIcon.addEventListener('click', () => this.showCart(getCart()));
        this.closeBtn.addEventListener('click', () => this.hideCart());
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.cartModal) {
                this.hideCart();
            }
        });

        // Checkout
        this.checkoutBtn.addEventListener('click', () => {
            alert('Thank you for your purchase!');
            clearCart();
            this.hideCart();
        });
    }

    displayProducts(products) {
        this.productsGrid.innerHTML = products.map(product => this.createProductCard(product)).join('');
        
        // Add event listeners to all "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = parseInt(button.dataset.id);
                const product = products.find(p => p.id === productId);
                if (this.addToCartCallback) {
                    this.addToCartCallback(product);
                }
            });
        });
    }

    createProductCard(product) {
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
    }

    showCart(cartItems) {
        this.updateCartDisplay(cartItems);
        this.cartModal.style.display = 'block';
    }

    hideCart() {
        this.cartModal.style.display = 'none';
    }

    updateCartDisplay(cartItems) {
        this.cartItems.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="50">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
            </div>
        `).join('');

        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.cartTotal.textContent = total.toFixed(2);
    }
}