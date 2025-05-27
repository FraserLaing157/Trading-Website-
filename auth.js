// Authentication state management
function checkLoginState() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const dashboardButton = document.getElementById('dashboardButton');
    const logoutButton = document.getElementById('logoutButton');
    const profileLink = document.getElementById('profileLink');
    const signInBtn = document.getElementById('loginBtn');

    if (user) {
        // User is logged in
        if (loginButton) loginButton.style.display = 'none';
        if (signupButton) signupButton.style.display = 'none';
        if (dashboardButton) {
            dashboardButton.style.display = 'block';
            dashboardButton.href = 'dashboard.html';
        }
        if (logoutButton) {
            logoutButton.style.display = 'block';
            logoutButton.onclick = function() {
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            };
        }
        if (profileLink) profileLink.style.display = 'block';
        if (signInBtn) signInBtn.style.display = 'none';
    } else {
        // User is not logged in
        if (loginButton) loginButton.style.display = 'block';
        if (signupButton) signupButton.style.display = 'block';
        if (dashboardButton) dashboardButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'none';
        if (profileLink) profileLink.style.display = 'none';
        if (signInBtn) signInBtn.style.display = 'block';
    }
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', checkLoginState); 