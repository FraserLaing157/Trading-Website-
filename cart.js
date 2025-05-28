// Initialize cart variable
let cart = JSON.parse(localStorage.getItem('cart')) || {
    items: [],
    total: 0
};

// Update cart badge function
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

// Save cart to localStorage and update all pages
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    // Dispatch storage event for other tabs/pages
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'cart',
        newValue: JSON.stringify(cart)
    }));
}

// Update cart display in cart page
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return; // Not on cart page

    // Clear existing items
    cartItems.innerHTML = '';

    // Add each item
    cart.items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'payment-option rounded-xl p-4 flex items-center justify-between';
        
        // Format the package name and details
        const packageName = item.name || item.package.charAt(0).toUpperCase() + item.package.slice(1);
        const candlesText = item.candles ? `${item.candles}` : '';
        const packageDetails = candlesText ? `${candlesText} of Historical Data` : '';
        
        itemElement.innerHTML = `
            <div>
                <h4 class="font-medium">${packageName} Package</h4>
                <p class="text-sm text-gray-400">${packageDetails}</p>
            </div>
            <div class="flex items-center space-x-4">
                <span>$${item.price.toFixed(2)}</span>
                <button onclick="removeItem(${index})" class="text-gray-400 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });

    // Update total
    const totalElement = document.getElementById('total');
    if (totalElement) {
        const totalAmount = cart.items.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
        totalElement.textContent = `$${totalAmount.toFixed(2)}`;
    }
}

// Remove item from cart
function removeItem(index) {
    cart.items.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// Add item to cart
function addToCart(item) {
    cart.items.push(item);
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
    saveCart();
    updateCartDisplay();
}

// Initialize cart functionality
function initializeCart() {
    // Initialize cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || {
        items: [],
        total: 0
    };
    
    updateCartBadge();
    updateCartDisplay();
    
    // Add storage event listener to update cart when changed in other tabs/pages
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            cart = JSON.parse(e.newValue || '{"items":[],"total":0}');
            updateCartBadge();
            updateCartDisplay();
        }
    });

    // Update cart every time the page is focused
    window.addEventListener('focus', function() {
        cart = JSON.parse(localStorage.getItem('cart')) || {
            items: [],
            total: 0
        };
        updateCartBadge();
        updateCartDisplay();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCart); 