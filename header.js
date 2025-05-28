// Initialize Auth0 client
let auth0Client = null;

function configureClient() {
    auth0Client = new auth0.WebAuth({
        domain: 'dev-nqri4nz4x4oogsjx.us.auth0.com',
        clientID: 'Yq3CJuF67GyOygYVl7XAkjvJTGUdT9oK',
        redirectUri: 'https://fraserlaing157.github.io/Trading-Website-/callback.html',
        responseType: 'token id_token',
        scope: 'openid profile email'
    });
}

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
    if (!auth0Client) {
        configureClient();
    }
    auth0Client.authorize();
}

// Function to handle logout
function logout() {
    if (!auth0Client) {
        configureClient();
    }
    
    // Clear all auth-related items from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_email');
    
    auth0Client.logout({
        returnTo: 'https://fraserlaing157.github.io/Trading-Website-/',
        clientID: 'Yq3CJuF67GyOygYVl7XAkjvJTGUdT9oK'
    });
}

// Function to handle authentication callback
function handleAuthentication() {
    if (!auth0Client) {
        configureClient();
    }

    return new Promise((resolve, reject) => {
        auth0Client.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                const expiresAt = JSON.stringify(
                    authResult.expiresIn * 1000 + new Date().getTime()
                );
                
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);
                
                auth0Client.client.userInfo(authResult.accessToken, (error, user) => {
                    if (!error && user) {
                        localStorage.setItem('user_email', user.email);
                        window.location.href = 'https://fraserlaing157.github.io/Trading-Website-/';
                    } else {
                        localStorage.setItem('user_email', 'User');
                        window.location.href = 'https://fraserlaing157.github.io/Trading-Website-/';
                    }
                    resolve(true);
                });
            } else if (err) {
                console.error('Authentication error:', err);
                window.location.href = 'https://fraserlaing157.github.io/Trading-Website-/';
                resolve(false);
            } else {
                resolve(false);
            }
        });
    });
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    configureClient();
    
    // Check if we're on the callback page
    if (window.location.pathname.includes('callback.html')) {
        handleAuthentication();
        return;
    }
    
    // Check for hash on main page (in case callback failed to process)
    if (window.location.hash) {
        handleAuthentication();
    }
    
    updateAuthUI();
    
    // Add click handlers
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) loginBtn.addEventListener('click', login);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    
    // Handle auth state changes across tabs
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