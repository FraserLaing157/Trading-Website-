// Device detection and redirection
function isMobileDevice() {
    return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
}

function redirectToAppropriateVersion() {
    const currentPath = window.location.pathname;
    const isMobile = isMobileDevice();
    
    // If we're not already on the correct version, redirect
    if (isMobile && currentPath !== "/mobile.html") {
        window.location.href = "/mobile.html";
    }
}

// Run the redirection check when the page loads
window.addEventListener('load', redirectToAppropriateVersion); 