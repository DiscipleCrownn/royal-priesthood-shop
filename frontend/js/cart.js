// Cart State
let cart = [];

// Add to Cart
function addToCart(category, index, size) {
    const product = products[category][index];
    cart.push({ ...product, category, index, size });
    updateCart();

    const cartCount = document.getElementById('cart-count');
    cartCount.style.transform = 'scale(1.5)';
    setTimeout(() => { cartCount.style.transform = 'scale(1)'; }, 300);

    saveCart();
}

// Update Cart Display
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');


    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
        cartTotal.textContent = 'R0.00';
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `R${total.toFixed(2)}`;

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="images/${item.category}/${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='${item.color}'">
            </div>
            <div class="cart-item-details">

                <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-color">${item.color} — Size: ${item.size}</div>
                <div class="cart-item-price">R${item.price.toFixed(2)}</div>
                <button class="cart-item-remove" data-index="${index}">Remove</button>
            </div>
        </div>
    `).join('');
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('royalPriesthoodCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('royalPriesthoodCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
}

function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.remove('open');
}
