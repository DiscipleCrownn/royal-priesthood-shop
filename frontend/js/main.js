// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render products
    renderProducts();
    
    // Load cart from localStorage
    loadCart();
    
    // Check login status
    checkLoginStatus();
    
    // Event Listeners for Cart
    document.addEventListener('click', (e) => {
        // Add to cart
        if (e.target.closest('.add-to-cart')) {
            const btn = e.target.closest('.add-to-cart');
            const category = btn.dataset.category;
            const index = parseInt(btn.dataset.index);
            addToCart(category, index);
        }

        // Remove from cart
        if (e.target.closest('.cart-item-remove')) {
            const btn = e.target.closest('.cart-item-remove');
            const index = parseInt(btn.dataset.index);
            removeFromCart(index);
        }

        // Toggle cart
        if (e.target.id === 'cart-toggle' || e.target.closest('#cart-toggle')) {
            toggleCart();
        }

        // Close cart
        if (e.target.id === 'close-cart' || e.target.closest('#close-cart')) {
            closeCart();
        }
        
        // Close modal
        if (e.target.classList.contains('close-modal')) {
            const modalId = e.target.dataset.modal;
            closeModal(modalId);
        }
        
        // Close modal when clicking outside
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Login button
    document.getElementById('login-btn').addEventListener('click', () => {
        showModal('login-modal');
    });
    
    // Signup button
    document.getElementById('signup-btn').addEventListener('click', () => {
        showModal('signup-modal');
    });
    
    // Switch between login and signup
    document.getElementById('show-signup').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('login-modal');
        showModal('signup-modal');
    });
    
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('signup-modal');
        showModal('login-modal');
    });
    
    // Form submissions
    document.getElementById('signup-form').addEventListener('submit', handleSignup);
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Contact form
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    });
});
