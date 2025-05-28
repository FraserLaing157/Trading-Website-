// Initialize Auth0 client
const auth0Client = new auth0.WebAuth({
    domain: 'dev-nqri4nz4x4oogsjx.us.auth0.com',
    clientID: 'Yq3CJuF67GyOygYVl7XAkjvJTGUdT9oK',
    redirectUri: 'https://fraserlaing157.github.io/Trading-Website-/callback.html',
    responseType: 'token id_token',
    scope: 'openid profile email'
});

// Check if user is authenticated
function isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '0');
    return new Date().getTime() < expiresAt;
}

// Login function
function login() {
    auth0Client.authorize();
}

// Logout function
function logout() {
    // Clear all auth-related items from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    
    // Update UI
    updateAuthUI();
    
    // Redirect to home page
    window.location.href = '/';
}

// Update UI based on authentication state
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userProfileLink = document.getElementById('userProfileLink');
    const profileLink = document.getElementById('profileLink');
    const userNameSpan = document.getElementById('userName');
    
    if (isAuthenticated()) {
        // User is authenticated
        const userEmail = localStorage.getItem('user_email');
        const userName = localStorage.getItem('user_name');
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (userProfileLink) userProfileLink.style.display = 'block';
        if (profileLink) profileLink.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = userName || userEmail || 'User';
    } else {
        // User is not authenticated
        if (loginBtn) loginBtn.style.display = 'block';
        if (userProfileLink) userProfileLink.style.display = 'none';
        if (profileLink) profileLink.style.display = 'none';
        if (userNameSpan) userNameSpan.textContent = '';
    }
}

// Get user info and update UI
function getUserInfo() {
    if (isAuthenticated()) {
        const accessToken = localStorage.getItem('access_token');
        auth0Client.client.userInfo(accessToken, (err, user) => {
            if (err) {
                console.error('Error getting user info:', err);
                return;
            }
            
            // Store user info in localStorage
            localStorage.setItem('user_email', user.email);
            localStorage.setItem('user_name', user.name || user.email);
            
            // Update UI
            updateAuthUI();
        });
    }
}

// Initialize auth state when page loads
document.addEventListener('DOMContentLoaded', function() {
    // First update UI based on existing localStorage data
    updateAuthUI();
    
    // Then get fresh user info if authenticated
    getUserInfo();
    
    // Handle authentication result if we're on a callback
    if (window.location.hash) {
        auth0Client.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                const expiresAt = JSON.stringify(
                    authResult.expiresIn * 1000 + new Date().getTime()
                );
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);
                
                // Get user info
                getUserInfo();
            } else if (err) {
                console.error('Auth error:', err);
            }
        });
    }
}); 