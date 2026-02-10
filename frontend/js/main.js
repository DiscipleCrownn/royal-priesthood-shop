   // Product Data
        const products = {
            'kngdm-shirts': [
                { name: 'KNGDM Shirt', color: 'Black', price: 899, image: 'black.png' },
                { name: 'KNGDM Shirt', color: 'White', price: 899, image: 'white.png' }
            ],
            'limited-edition': [
                { name: 'Priesthood Collection', color: 'Limited', price: 1499, image: 'priesthood collection.png' }
            ],
            'men-regular': [
                { name: 'Regular Fit Tee', color: 'Black', price: 699, image: 'black.png' },
                { name: 'Regular Fit Tee', color: 'Grey', price: 699, image: 'grey.png' },
                { name: 'Regular Fit Tee', color: 'Tan', price: 699, image: 'tan.png' },
                { name: 'Regular Fit Tee', color: 'White', price: 699, image: 'white.png' }
            ],
            'pants-kngdm': [
                { name: 'KNGDM Pants', color: 'Black', price: 1299, image: 'black.png' },
                { name: 'KNGDM Pants', color: 'White', price: 1299, image: 'white.png' }
            ],
            'plain-collection': [
                { name: 'Plain Collection Tee', color: 'Black', price: 599, image: 'black.png' },
                { name: 'Plain Collection Tee', color: 'Grey', price: 599, image: 'grey.png' },
                { name: 'Plain Collection Tee', color: 'Tan', price: 599, image: 'tan.png' },
                { name: 'Plain Collection Tee', color: 'White', price: 599, image: 'white.png' }
            ],
            'royal-chosen': [
                { name: 'Royal Chosen Tee', color: 'Black', price: 849, image: 'black.png' },
                { name: 'Royal Chosen Tee', color: 'Grey', price: 849, image: 'grey.png' },
                { name: 'Royal Chosen Tee', color: 'Tan', price: 849, image: 'tan.png' },
                { name: 'Royal Chosen Tee', color: 'White', price: 849, image: 'white.png' }
            ],
            'shadow-wings': [
                { name: 'Shadow Wings Tee', color: 'Black', price: 849, image: 'black.png' },
                { name: 'Shadow Wings Tee', color: 'Grey', price: 849, image: 'grey.png' },
                { name: 'Shadow Wings Tee', color: 'Tan', price: 849, image: 'tan.png' },
                { name: 'Shadow Wings Tee', color: 'White', price: 849, image: 'white.png' }
            ]
        };

        // Cart State
        let cart = [];

        // Render Products
        function renderProducts() {
            Object.keys(products).forEach(category => {
                const container = document.getElementById(category);
                products[category].forEach((product, index) => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <div class="product-image">
                            <img src="images/${category}/${product.image}" alt="${product.name} - ${product.color}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'product-placeholder\\'>${product.color.toUpperCase()}</div>'">
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-color">${product.color}</p>
                            <p class="product-price">R${product.price.toFixed(2)}</p>
                            <button class="add-to-cart" data-category="${category}" data-index="${index}">
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    `;
                    container.appendChild(card);
                });
            });
        }

        // Add to Cart
        function addToCart(category, index) {
            const product = products[category][index];
            cart.push({ ...product, category, index });
            updateCart();
            
            // Animation feedback
            const cartCount = document.getElementById('cart-count');
            cartCount.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 300);
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
                        <div class="cart-item-color">${item.color}</div>
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
        }

        // Event Listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart')) {
                const btn = e.target.closest('.add-to-cart');
                const category = btn.dataset.category;
                const index = parseInt(btn.dataset.index);
                addToCart(category, index);
            }

            if (e.target.closest('.cart-item-remove')) {
                const btn = e.target.closest('.cart-item-remove');
                const index = parseInt(btn.dataset.index);
                removeFromCart(index);
            }

            if (e.target.id === 'cart-toggle' || e.target.closest('#cart-toggle')) {
                document.getElementById('cart-sidebar').classList.add('open');
            }

            if (e.target.id === 'close-cart' || e.target.closest('#close-cart')) {
                document.getElementById('cart-sidebar').classList.remove('open');
            }
        });

        // Initialize
        renderProducts();