// بيانات المنتجات التجريبية
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        brand: "Apple",
        price: 5499,
        oldPrice: 5999,
        image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        price: 4999,
        oldPrice: 5499,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400"
    },
    {
        id: 3,
        name: "AirPods Pro 2nd Generation",
        brand: "Apple",
        price: 899,
        oldPrice: 1099,
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400"
    },
    {
        id: 4,
        name: "Apple Watch Series 9",
        brand: "Apple",
        price: 1699,
        oldPrice: 1899,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
    }
];

// دالة لعرض المنتجات في الصفحة
function displayProducts() {
    const container = document.getElementById('products-container');
    
    products.forEach(product => {
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        
        const productHTML = `
            <a href="product.html?id=${product.id}" style="text-decoration: none; color: inherit;">
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">${product.price} ريال</span>
                        <span class="old-price">${product.oldPrice} ريال</span>
                    </div>
                    <button class="add-to-cart" onclick="event.preventDefault(); addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> أضف للسلة
                    </button>
                </div>
            </div>
            </a>
        `;
        
        container.innerHTML += productHTML;
    });
}

// دالة إضافة للسلة (مبدئية)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    alert(`تمت إضافة ${product.name} إلى السلة!`);
    
    // تحديث عداد السلة
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = parseInt(cartCount.textContent) + 1;
}

// تشغيل الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayProducts);
