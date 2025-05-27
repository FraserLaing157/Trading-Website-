// Initialize cart variable
let cart = JSON.parse(localStorage.getItem('cart')) || {
    items: [],
    total: 0
};

// Add item to cart
function addToCart(item) {
    cart.items.push(item);
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
    saveCart();
}

// Remove item from cart
function removeFromCart(index) {
    cart.items.splice(index, 1);
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
    saveCart();
    renderCart();
}

// Clear cart
function clearCart() {
    cart = {
        items: [],
        total: 0
    };
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Update cart badge
function updateCartBadge() {
    const cartBadges = document.querySelectorAll('#cartCount');
    const count = cart.items.length;
    
    cartBadges.forEach(badge => {
        if (badge) {
            badge.textContent = count;
            // Remove and re-add animation class
            badge.classList.remove('animate-cartBadgeAppear');
            void badge.offsetWidth; // Trigger reflow
            badge.classList.add('animate-cartBadgeAppear');
        }
    });
}

// Render cart items
function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    if (!cartContainer) return;

    if (cart.items.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-8">
                <p class="text-gray-400">Your cart is empty</p>
                <a href="shop.html" class="text-[#3DB8F5] hover:text-[#3DB8F5]/80 mt-4 inline-block">
                    Browse Packages
                </a>
            </div>
        `;
        return;
    }

    cartContainer.innerHTML = cart.items.map((item, index) => `
        <div class="flex items-center justify-between p-4 rounded-lg bg-[#0D1225] border border-gray-800">
            <div>
                <h3 class="text-white font-medium">${item.name}</h3>
                <p class="text-gray-400 text-sm">${item.candles} Historical Data</p>
            </div>
            <div class="flex items-center space-x-4">
                <span class="text-white">$${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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