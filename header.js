// Initialize Auth0 client
const auth0Client = new auth0.WebAuth({
    domain: 'dev-nqri4nz4x4oogsjx.us.auth0.com',
    clientID: 'Yq3CJuF67GyOygYVl7XAkjvJTGUdT9oK',
    redirectUri: window.location.origin + '/callback.html',
    responseType: 'token id_token',
    scope: 'openid profile email'
});

// Function to check if user is authenticated
function isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '0');
    return new Date().getTime() < expiresAt;
}

// Function to update UI based on auth state
function updateAuthUI() {
    const isAuthed = isAuthenticated();
    const userEmail = localStorage.getItem('user_email');
    
    // Get all relevant elements
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLink = document.getElementById('profileLink');
    const userWelcome = document.getElementById('userWelcome');
    const authContainer = document.getElementById('authContainer');
    
    if (isAuthed && userEmail) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (profileLink) profileLink.style.display = 'block';
        if (userWelcome) {
            userWelcome.textContent = `Welcome, ${userEmail}`;
            userWelcome.style.display = 'block';
        }
        if (authContainer) authContainer.classList.add('logged-in');
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (profileLink) profileLink.style.display = 'none';
        if (userWelcome) userWelcome.style.display = 'none';
        if (authContainer) authContainer.classList.remove('logged-in');
    }

    // Apply consistent button styles
    const buttons = document.querySelectorAll('#loginBtn, #logoutBtn');
    buttons.forEach(button => {
        button.style.minWidth = '100px';
        button.style.padding = '0.5rem 1.5rem';
        button.style.fontSize = '0.875rem';
        button.style.fontWeight = '600';
    });

    // Apply consistent nav styles
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.padding = '0.5rem 1rem';
        link.style.fontSize = '0.875rem';
        link.style.fontWeight = '500';
    });
}

// Function to handle login
function login() {
    auth0Client.authorize({
        prompt: 'login'
    });
}

// Function to handle logout
function logout() {
    // Clear all auth-related items from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_email');
    
    // Use Auth0's logout method
    auth0Client.logout({
        returnTo: window.location.origin,
        clientID: 'Yq3CJuF67GyOygYVl7XAkjvJTGUdT9oK'
    });
}

// Function to handle authentication callback
function handleAuthentication() {
    return new Promise((resolve, reject) => {
        auth0Client.parseHash((err, authResult) => {
            if (err) {
                // Check if this is a login_required error, which isn't really an error
                if (err.error === 'login_required') {
                    resolve(null);
                    return;
                }
                console.error('Authentication error:', err);
                reject(err);
                return;
            }
            
            if (authResult && authResult.accessToken && authResult.idToken) {
                const expiresAt = JSON.stringify(
                    authResult.expiresIn * 1000 + new Date().getTime()
                );
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);
                
                // Get user info using the access token
                auth0Client.client.userInfo(authResult.accessToken, (error, user) => {
                    if (error) {
                        console.error('Error getting user info:', error);
                        reject(error);
                        return;
                    }
                    
                    localStorage.setItem('user_email', user.email);
                    resolve(user);
                });
            } else {
                // No auth result but also no error means we're just not logged in
                resolve(null);
            }
        });
    });
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Clear any error parameters from the URL
    if (window.location.search.includes('error=')) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete('error');
        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
        window.history.replaceState({}, '', newUrl);
    }
    
    // Check if we're on the callback page
    if (window.location.pathname === '/callback.html') {
        handleAuthentication()
            .then((user) => {
                if (user) {
                    window.location.href = '/';
                } else {
                    // Not logged in, redirect to home page
                    window.location.href = '/';
                }
            })
            .catch(error => {
                console.error('Error during authentication:', error);
                window.location.href = '/?error=' + encodeURIComponent(error.message);
            });
        return;
    }

    // Update UI based on current auth state
    updateAuthUI();

    // Add click handlers for login/logout buttons
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', login);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Listen for storage events to sync auth state across tabs
    window.addEventListener('storage', function(e) {
        if (e.key === 'user_email' || e.key === 'expires_at') {
            updateAuthUI();
        }
    });

    // Add consistent header styles
    const header = document.querySelector('nav');
    if (header) {
        header.style.height = '80px';
        header.style.borderBottom = '1px solid rgba(61, 184, 245, 0.1)';
    }
}); 