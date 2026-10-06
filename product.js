// بيانات المنتج الحالي (يمكن لاحقاً جلبها من Firebase)
const currentProduct = {
    id: 1,
    name: "iPhone 15 Pro Max 256GB - تيتانيوم طبيعي",
    brand: "Apple",
    category: "جوالات",
    price: 5499,
    oldPrice: 5999,
    discount: 8,
    shortDesc: "هاتف آيفون 15 برو ماكس بتصميم تيتانيوم فاخر، شريحة A17 Pro الأقوى في عالم الهواتف، وكاميرا احترافية بدقة 48 ميجابكسل.",
    fullDesc: "يتميز iPhone 15 Pro Max بتصميم من التيتانيوم المتين والخفيف، مع شاشة Super Retina XDR مقاس 6.7 بوصة. يأتي بمعالج A17 Pro الجديد الذي يقدم أداءً خارقاً في الألعاب والتطبيقات الثقيلة. الكاميرا الرئيسية بدقة 48 ميجابكسل تلتقط صوراً مذهلة بتفاصيل دقيقة، مع دعم التصوير السينمائي بدقة 4K.",
    images: [
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600",
        "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=600"
    ]
};

// تحميل بيانات المنتج عند فتح الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // ملء البيانات في الصفحة
    document.getElementById('product-title').textContent = currentProduct.name;
    document.getElementById('breadcrumb-product-name').textContent = currentProduct.name;
    document.getElementById('product-brand').textContent = currentProduct.brand;
    document.getElementById('spec-brand').textContent = currentProduct.brand;
    document.getElementById('product-category').textContent = currentProduct.category;
    document.getElementById('product-price').textContent = currentProduct.price + ' ريال';
    document.getElementById('product-old-price').textContent = currentProduct.oldPrice + ' ريال';
    document.getElementById('product-discount').textContent = 'خصم ' + currentProduct.discount + '%';
    document.getElementById('product-short-desc').textContent = currentProduct.shortDesc;
    document.getElementById('product-full-desc').textContent = currentProduct.fullDesc;
    
    // تحميل الصور
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = currentProduct.images[0];
    
    const thumbnailContainer = document.getElementById('thumbnail-container');
    currentProduct.images.forEach((img, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail' + (index === 0 ? ' active' : '');
        thumb.innerHTML = `<img src="${img}" alt="صورة مصغرة ${index + 1}">`;
        thumb.onclick = function() {
            mainImage.src = img;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        };
        thumbnailContainer.appendChild(thumb);
    });
    
    // تحميل المنتجات المشابهة
    loadRelatedProducts();
});

// تغيير الكمية
function changeQty(change) {
    const qtyInput = document.getElementById('product-qty');
    let newQty = parseInt(qtyInput.value) + change;
    if (newQty >= 1 && newQty <= 10) {
        qtyInput.value = newQty;
    }
}

// إضافة للسلة من صفحة التفاصيل
function addToCartFromDetails() {
    const qty = parseInt(document.getElementById('product-qty').value);
    alert(`تمت إضافة ${qty} من ${currentProduct.name} إلى السلة!`);
    
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = parseInt(cartCount.textContent) + qty;
}

// التبويبات (Tabs)
function openTab(event, tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    const tabBtns = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove('active');
    }
    
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// تحميل المنتجات المشابهة
function loadRelatedProducts() {
    const relatedProducts = [
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
            name: "iPhone 14 Pro 256GB",
            brand: "Apple",
            price: 4299,
            oldPrice: 4799,
            image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400"
        },
        {
            id: 4,
            name: "Xiaomi 14 Pro",
            brand: "Xiaomi",
            price: 3499,
            oldPrice: 3899,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400"
        }
    ];
    
    const container = document.getElementById('related-products-container');
    relatedProducts.forEach(product => {
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        const productHTML = `
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
                    <a href="product.html?id=${product.id}" class="add-to-cart" style="display:block; text-align:center; text-decoration:none;">
                        عرض التفاصيل
                    </a>
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}
