// Product Data
const products = {
    'kngdm-shirts': [
        { name: 'KNGDM Shirt', color: 'Black', price: 399, image: 'black.png' },
        { name: 'KNGDM Shirt', color: 'White', price: 399, image: 'white.png' }
    ],
    'limited-edition': [
        { name: 'Priesthood Collection', color: 'Limited', price: 999, image: 'priesthood collection.png' }
    ],
    'men-regular': [
        { name: 'Regular Fit Tee', color: 'Black', price: 599, image: 'black.png' },
        { name: 'Regular Fit Tee', color: 'Grey', price: 599, image: 'grey.png' },
        { name: 'Regular Fit Tee', color: 'Tan', price: 599, image: 'tan.png' },
        { name: 'Regular Fit Tee', color: 'White', price: 599, image: 'white.png' }
    ],
    'pants-kngdm': [
        { name: 'KNGDM Pants', color: 'Black', price: 799, image: 'black.png' },
        { name: 'KNGDM Pants', color: 'White', price: 799, image: 'white.png' }
    ],
    'plain-collection': [
        { name: 'Plain Collection Tee', color: 'Black', price: 599, image: 'black.png' },
        { name: 'Plain Collection Tee', color: 'Grey', price: 599, image: 'grey.png' },
        { name: 'Plain Collection Tee', color: 'Tan', price: 599, image: 'tan.png' },
        { name: 'Plain Collection Tee', color: 'White', price: 599, image: 'white.png' }
    ],
    'royal-chosen': [
        { name: 'Royalty Tee', color: 'Black', price: 549, image: 'black.png' },
        { name: 'Royalty Tee', color: 'Grey', price: 549, image: 'grey.png' },
        { name: 'Royalty Tee', color: 'Tan', price: 549, image: 'tan.png' },
        { name: 'Royalty Tee', color: 'White', price: 549, image: 'white.png' }
    ],
    'shadow-wings': [
        { name: 'Shadow Wings Tee', color: 'Black', price: 549, image: 'black.png' },
        { name: 'Shadow Wings Tee', color: 'Grey', price: 549, image: 'grey.png' },
        { name: 'Shadow Wings Tee', color: 'Tan', price: 549, image: 'tan.png' },
        { name: 'Shadow Wings Tee', color: 'White', price: 549, image: 'white.png' }
    ]
};

// Render Products
function renderProducts() {
    Object.keys(products).forEach(category => {
        const container = document.getElementById(category);
        if (!container) return;

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
        <div class="size-selector">
            <button class="size-btn" data-size="S">S</button>
            <button class="size-btn" data-size="M">M</button>
            <button class="size-btn" data-size="L">L</button>
            <button class="size-btn" data-size="XL">XL</button>
        </div>
        <p class="size-warning">Please select a size</p>
        <button class="add-to-cart" data-category="${category}" data-index="${index}">
            <span>Add to Cart</span>
        </button>
    </div>
`;

            // Size button selection
            card.querySelectorAll('.size-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    card.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    card.querySelector('.size-warning').classList.remove('visible');
                });
            });
            container.appendChild(card);
        });
    });
}
