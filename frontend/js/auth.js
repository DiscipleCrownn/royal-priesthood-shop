// Authentication Functions
const API_URL = "https://royal-priesthood-shop.onrender.com/api";
 // Change this to your backend URL

// Show Modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// Handle Signup
async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Signup successful! Please login.');
            closeModal('signup-modal');
            showModal('login-modal');
            document.getElementById('signup-form').reset();
        } else {
            alert(data.message || 'Signup failed. Please try again.');
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred. Please try again later.');
    }
}

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Check if first time login
            const knownUsers = JSON.parse(localStorage.getItem('knownUsers') || '[]');
            const isFirstTime = !knownUsers.includes(data.user.email);

            // If first time, add them to known users
            if (isFirstTime) {
                knownUsers.push(data.user.email);
                localStorage.setItem('knownUsers', JSON.stringify(knownUsers));
            }

            // Store user data
            localStorage.setItem('user', JSON.stringify(data.user));
            
            const greeting = isFirstTime 
                ? `Hi ${data.user.name}!` 
                : `Welcome back, ${data.user.name}!`;
            
            alert(greeting);
            closeModal('login-modal');
            updateUIForLoggedInUser(data.user);
            document.getElementById('login-form').reset();
        } else {
            alert(data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again later.');
    }
}

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    
    // Replace login/signup buttons with user greeting
    loginBtn.textContent = `Hi, ${user.name.split(' ')[0]}`;
    signupBtn.style.display = 'none';
    
    loginBtn.onclick = () => {
        if (confirm('Do you want to logout?')) {
            logout();
        }
    };
}

// Logout
function logout() {
    localStorage.removeItem('user');
    location.reload();
}

// Check if user is logged in on page load
function checkLoginStatus() {
    const user = localStorage.getItem('user');
    if (user) {
        updateUIForLoggedInUser(JSON.parse(user));
    }
}