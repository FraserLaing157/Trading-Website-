// Cart management system
let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };

// Add item to cart
function addToCart(item) {
    cart.items.push(item);
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
    saveCart();
    updateCartBadge();
}

// Remove item from cart
function removeFromCart(index) {
    cart.items.splice(index, 1);
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
    saveCart();
    updateCartBadge();
    renderCart();
}

// Clear cart
function clearCart() {
    cart = { items: [], total: 0 };
    saveCart();
    updateCartBadge();
    renderCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Dispatch storage event for other tabs
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'cart',
        newValue: JSON.stringify(cart)
    }));
}

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        cartBadge.textContent = cart.items.length;
        // Add animation
        cartBadge.classList.remove('animate-cartBadgeAppear');
        void cartBadge.offsetWidth; // Trigger reflow
        cartBadge.classList.add('animate-cartBadgeAppear');
    }
}

// Render cart items on cart page
function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return; // Not on cart page

    if (cart.items.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                <p class="text-gray-400 text-lg mb-4">Your cart is empty</p>
                <a href="shop.html" class="text-[#3DB8F5] hover:text-[#3DB8F5]/80 font-medium">
                    Browse Packages
                </a>
            </div>
        `;
        return;
    }

    cartContainer.innerHTML = cart.items.map((item, index) => `
        <div class="flex items-center justify-between p-6 rounded-lg bg-[#0D1225] border border-gray-800 hover:border-[#3DB8F5]/30 transition-all duration-300">
            <div class="flex-1">
                <h3 class="text-white font-semibold text-lg">${item.name} Package</h3>
                <p class="text-gray-400 text-sm">${item.candles} of Historical Data</p>
            </div>
            <div class="flex items-center space-x-6">
                <span class="text-white font-semibold text-lg">$${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-400 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    // Update total
    const totalElement = document.getElementById('cartTotal');
    if (totalElement) {
        totalElement.textContent = `$${cart.total.toFixed(2)}`;
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderCart();
});

// Listen for storage events to sync cart across tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'cart') {
        cart = JSON.parse(e.newValue) || { items: [], total: 0 };
        updateCartBadge();
        renderCart();
    }
});

// Update cart when page regains focus
window.addEventListener('focus', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
    updateCartBadge();
    renderCart();
}); 