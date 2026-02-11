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
                    <button class="add-to-cart" data-category="${category}" data-index="${index}">
                        <span>Add to Cart</span>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    });
}
