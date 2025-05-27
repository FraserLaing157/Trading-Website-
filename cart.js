// Initialize cart variable
let cart = JSON.parse(localStorage.getItem('cart')) || {
    items: [],
    total: 0
};

// Update cart badge function
function updateCartBadge() {
    // Try both possible IDs
    const cartBadges = [
        document.getElementById('cartCount'),
        document.getElementById('cartBadge')
    ];
    
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

// Initialize cart functionality
function initializeCart() {
    // Initialize cart from localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || {
        items: [],
        total: 0
    };
    
    updateCartBadge();
    
    // Add storage event listener to update cart badge when cart changes in other tabs/pages
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            cart = JSON.parse(e.newValue || '{"items":[],"total":0}');
            updateCartBadge();
        }
    });

    // Update cart badge every time the page is focused
    window.addEventListener('focus', function() {
        cart = JSON.parse(localStorage.getItem('cart')) || {
            items: [],
            total: 0
        };
        updateCartBadge();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCart); 