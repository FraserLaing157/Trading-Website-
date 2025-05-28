let auth0Client = null;

// Initialize Auth0 client
const initAuth0 = () => {
    auth0Client = new auth0.WebAuth({
        domain: 'dev-nqri4nz4x4oogsjx.us.auth0.com',
        clientID: 'Yq3CJuF67GyOygYVl7XAkjvJTGUdT9oK',
        redirectUri: window.location.origin + '/callback.html',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });
};

// Handle login
const login = () => {
    auth0Client.authorize();
};

// Handle logout
const logout = () => {
    // Clear all auth-related items from localStorage
    localStorage.clear(); // Clear all localStorage items to ensure complete logout
    
    // Force UI update before redirect
    updateAuthUI();
    
    // Determine the return URL based on environment
    const isLocalDev = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    const returnTo = isLocalDev 
        ? 'http://127.0.0.1:8080/index.html'
        : 'https://fraserlaing157.github.io/Trading-Website-/index.html';

    // Redirect to Auth0 logout endpoint
    window.location.href = `https://${auth0Client.baseOptions.domain}/v2/logout?client_id=${auth0Client.baseOptions.clientID}&returnTo=${encodeURIComponent(returnTo)}`;
};

// Check if user is authenticated
const isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '0');
    return new Date().getTime() < expiresAt;
};

// Update UI based on authentication state
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLink = document.getElementById('profileLink');
    
    if (isAuthenticated()) {
        // User is authenticated
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (profileLink) profileLink.style.display = 'block';
    } else {
        // User is not authenticated
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (profileLink) profileLink.style.display = 'none';
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initAuth0();

    // Add click handlers for both login and logout buttons
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Update UI based on authentication state
    updateAuthUI();
}); 