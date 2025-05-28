document.addEventListener('DOMContentLoaded', function() {
    // Inject login modal HTML
    const modalHTML = `
        <div id="loginModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm hidden items-center justify-center z-50">
            <div class="bg-[#0D1225] rounded-xl p-8 w-full max-w-md mx-4 relative">
                <button onclick="toggleLogin()" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
                
                <!-- Login Form -->
                <div id="loginForm">
                    <h2 class="text-2xl font-bold mb-6 gradient-text">Sign In to Your Account</h2>
                    <form onsubmit="handleLogin(event)" class="space-y-4">
                        <div>
                            <label class="block text-gray-300 mb-2" for="loginEmail">Email</label>
                            <input type="email" id="loginEmail" class="w-full bg-[#1E293B] rounded-lg border border-gray-600 p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary" required>
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2" for="loginPassword">Password</label>
                            <input type="password" id="loginPassword" class="w-full bg-[#1E293B] rounded-lg border border-gray-600 p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary" required>
                        </div>
                        <button type="submit" class="w-full bg-[#3DB8F5] hover:bg-[#3DB8F5]/90 text-white py-3 rounded-lg font-semibold transition-colors">
                            Sign In
                        </button>
                    </form>
                    <p class="mt-4 text-center text-gray-400">
                        Don't have an account? 
                        <button onclick="showRegister()" class="text-[#3DB8F5] hover:text-[#3DB8F5]/80">Register</button>
                    </p>
                </div>

                <!-- Register Form -->
                <div id="registerForm" class="hidden">
                    <h2 class="text-2xl font-bold mb-6 gradient-text">Create Your Account</h2>
                    <form onsubmit="handleRegister(event)" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-gray-300 mb-2" for="firstName">First Name</label>
                                <input type="text" id="firstName" class="w-full bg-[#1E293B] rounded-lg border border-gray-600 p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary" required>
                            </div>
                            <div>
                                <label class="block text-gray-300 mb-2" for="lastName">Last Name</label>
                                <input type="text" id="lastName" class="w-full bg-[#1E293B] rounded-lg border border-gray-600 p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary" required>
                            </div>
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2" for="registerEmail">Email</label>
                            <input type="email" id="registerEmail" class="w-full bg-[#1E293B] rounded-lg border border-gray-600 p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary" required>
                        </div>
                        <div>
                            <label class="block text-gray-300 mb-2" for="registerPassword">Password</label>
                            <input type="password" id="registerPassword" class="w-full bg-[#1E293B] rounded-lg border border-gray-600 p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary" required>
                        </div>
                        <button type="submit" class="w-full bg-[#3DB8F5] hover:bg-[#3DB8F5]/90 text-white py-3 rounded-lg font-semibold transition-colors">
                            Create Account
                        </button>
                    </form>
                    <p class="mt-4 text-center text-gray-400">
                        Already have an account? 
                        <button onclick="showLogin()" class="text-[#3DB8F5] hover:text-[#3DB8F5]/80">Sign In</button>
                    </p>
                </div>
            </div>
        </div>
    `;

    // Create a container and inject the modal HTML
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstChild);

    // Initialize login button click handler
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', toggleLogin);
    }

    // Check login state
    checkLoginState();
}); 