// Placeholder for authentication logic. No Auth0 code present.

let auth0Client = null;

function configureClient() {
    console.log('Configuring Auth0 client...');
    // Determine if we're in local development or production
    const isLocalDev = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    const baseUrl = isLocalDev ? 'http://127.0.0.1:8000' : 'https://fraserlaing157.github.io/Trading-Website-';
    
    console.log('Base URL:', baseUrl);
    console.log('Auth0 object available:', typeof auth0 !== 'undefined');
    
    try {
        auth0Client = new auth0.WebAuth({
            domain: 'dev-nqri4nz4x4oogsjx.us.auth0.com',
            clientID: 'Yq3CJuF67GyOygYVl7XAkjvJTGUdT9oK',
            redirectUri: `${baseUrl}/callback.html`,
            responseType: 'token id_token',
            scope: 'openid profile email'
        });
        console.log('Auth0 client configured successfully:', auth0Client);
    } catch (error) {
        console.error('Error configuring Auth0 client:', error);
    }
}

function setSession(authResult) {
    const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
}

function isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '0');
    console.log('Auth check:', {
        access_token: localStorage.getItem('access_token'),
        id_token: localStorage.getItem('id_token'),
        expiresAt,
        now: new Date().getTime(),
        valid: new Date().getTime() < expiresAt
    });
    return new Date().getTime() < expiresAt;
}

function updateAuthUI() {
    const authenticated = isAuthenticated();
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLink = document.getElementById('profileLink');
    const profileEmail = document.getElementById('profileEmail');
    
    console.log('updateAuthUI called - authenticated:', authenticated);
    console.log('Found elements - loginBtn:', !!loginBtn, 'logoutBtn:', !!logoutBtn, 'profileLink:', !!profileLink, 'profileEmail:', !!profileEmail);
    
    if (loginBtn) loginBtn.style.display = !authenticated ? 'block' : 'none';
    if (logoutBtn) logoutBtn.style.display = authenticated ? 'block' : 'none';
    
    if (profileLink) {
        if (authenticated) {
            profileLink.style.display = 'block';
            profileLink.textContent = 'Profile';
            profileLink.href = 'profile.html';
            if (profileEmail) profileEmail.style.display = 'none';
            // No tooltip logic needed, email will be on profile page
        } else {
            profileLink.style.display = 'none';
            profileLink.textContent = '';
            if (profileEmail) profileEmail.style.display = 'none';
        }
    } else {
        console.log('Profile link element not found!');
    }
}

function login() {
    console.log('Login function called');
    console.log('Auth0 client:', auth0Client);
    if (!auth0Client) {
        console.error('Auth0 client not initialized');
        return;
    }
    try {
        auth0Client.authorize();
        console.log('Auth0 authorize called successfully');
    } catch (error) {
        console.error('Error calling auth0Client.authorize():', error);
    }
}

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    
    const isLocalDev = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    const baseUrl = isLocalDev ? 'http://127.0.0.1:8000' : 'https://fraserlaing157.github.io/Trading-Website-';
    
    auth0Client.logout({
        returnTo: baseUrl,
        clientID: 'Yq3CJuF67GyOygYVl7XAkjvJTGUdT9oK'
    });
}

function handleAuthentication() {
    return new Promise((resolve) => {
        auth0Client.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                setSession(authResult);
                const expiresAt = JSON.stringify(
                    authResult.expiresIn * 1000 + new Date().getTime()
                );
                localStorage.setItem('expires_at', expiresAt);
                
                auth0Client.client.userInfo(authResult.accessToken, (error, user) => {
                    const isLocalDev = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
                    const baseUrl = isLocalDev ? 'http://127.0.0.1:8000' : 'https://fraserlaing157.github.io/Trading-Website-';
                    
                    if (!error && user) {
                        localStorage.setItem('user_email', user.email);
                        window.location.href = baseUrl;
                    } else {
                        localStorage.setItem('user_email', 'User');
                        window.location.href = baseUrl;
                    }
                    resolve(true);
                });
            } else if (err) {
                console.error('Authentication error:', err);
                const isLocalDev = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
                const baseUrl = isLocalDev ? 'http://127.0.0.1:8000' : 'https://fraserlaing157.github.io/Trading-Website-';
                window.location.href = baseUrl;
                resolve(false);
            } else {
                resolve(false);
            }
        });
    });
}

function setupHeaderAuthListeners() {
    configureClient();
    
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLink = document.getElementById('profileLink');
    const profileEmail = document.getElementById('profileEmail');
    
    if (loginBtn) loginBtn.onclick = login;
    if (logoutBtn) logoutBtn.onclick = logout;
    
    // Highlight active nav link
    const path = window.location.pathname;
    if (path.endsWith('index.html') || path === '/' || path === '') {
        const navHome = document.getElementById('nav-home');
        if (navHome) navHome.classList.add('active');
    } else if (path.endsWith('shop.html')) {
        const navPricing = document.getElementById('nav-pricing');
        if (navPricing) navPricing.classList.add('active');
    } else if (path.endsWith('contact.html')) {
        const navContact = document.getElementById('nav-contact');
        if (navContact) navContact.classList.add('active');
    }
    
    updateAuthUI();
}

window.setupHeaderAuthListeners = setupHeaderAuthListeners;

// Cart badge update function
function updateCartBadge() {
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
        let cart = { items: [], total: 0 };
        try {
            cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
        } catch {}
        cartBadge.textContent = cart.items.length;
    }
}

// Call on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCartBadge);
} else {
    updateCartBadge();
}

// Listen for cart changes in other tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartBadge();
    }
});

// Also update cart badge when the page/tab regains focus
window.addEventListener('focus', function() {
    updateCartBadge();
}); 