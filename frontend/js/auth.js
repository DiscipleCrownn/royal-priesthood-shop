// Authentication Functions
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : 'https://royal-priesthood-shop.onrender.com/api';

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

    const name            = document.getElementById('signup-name').value;
    const email           = document.getElementById('signup-email').value;
    const phone           = document.getElementById('signup-phone').value;
    const password        = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

    const email    = e.target[0].value;
    const password = e.target[1].value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // First time greeting
            const knownUsers  = JSON.parse(localStorage.getItem('knownUsers') || '[]');
            const isFirstTime = !knownUsers.includes(data.user.email);

            if (isFirstTime) {
                knownUsers.push(data.user.email);
                localStorage.setItem('knownUsers', JSON.stringify(knownUsers));
            }

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
    const loginBtn  = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    loginBtn.textContent      = `Hi, ${user.name.split(' ')[0]}`;
    signupBtn.style.display   = 'none';

    loginBtn.onclick = () => {
        if (confirm('Do you want to logout?')) logout();
    };
}

// Logout
function logout() {
    localStorage.removeItem('user');
    location.reload();
}

// Check login status on page load
function checkLoginStatus() {
    const user = localStorage.getItem('user');
    if (user) updateUIForLoggedInUser(JSON.parse(user));
}

// ── CHECKOUT ──────────────────────────────────────────────────────────────────

function openCheckout() {
    const user = localStorage.getItem('user');
    if (!user) {
        alert('Please login to checkout.');
        showModal('login-modal');
        return;
    }
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    showModal('checkout-modal');
}

async function handleCheckout(e) {
    e.preventDefault();

    const user   = JSON.parse(localStorage.getItem('user'));
    const street = document.getElementById('checkout-street').value;
    const suburb = document.getElementById('checkout-suburb').value;
    const city   = document.getElementById('checkout-city').value;
    const postal = document.getElementById('checkout-postal').value;
    
    const delivery_address = `${street}, ${suburb}, ${city}, ${postal}`;
    const email_confirm    = document.getElementById('checkout-email-confirm').value;
    const order_notes      = document.getElementById('checkout-notes').value;
    const total            = cart.reduce((sum, item) => sum + item.price, 0);

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id:          user.id,
                user_name:        user.name,
                user_email:       user.email,
                delivery_address,
                email_confirm,
                order_notes,
                cart_items:       cart,
                total
            })
        });

        const data = await response.json();

        if (response.ok) {
            closeModal('checkout-modal');
            closeCart();
            cart = [];
            updateCart();
            saveCart();
            document.getElementById('checkout-form').reset();
            alert(`Order placed! 🎉\n\nOrder #${data.orderId}\nWe'll be in touch soon.`);
        } else {
            alert(data.message || 'Checkout failed. Please try again.');
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('An error occurred. Please try again.');
    }
}